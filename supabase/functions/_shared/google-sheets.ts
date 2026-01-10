import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export class SheetService {
  private doc: GoogleSpreadsheet;
  private sheetId: string;
  private initialized: boolean = false;

  constructor(sheetId: string) {
    this.sheetId = sheetId;
    
    // Get credentials from Env
    const serviceAccountJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT");
    if (!serviceAccountJson) {
      throw new Error("Missing GOOGLE_SERVICE_ACCOUNT environment variable");
    }

    const creds = JSON.parse(serviceAccountJson);
    
    const serviceAccountAuth = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    this.doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
  }

  async init() {
    if (!this.initialized) {
      await this.doc.loadInfo();
      this.initialized = true;
    }
  }

  async getNewLeads(sheetName: string = "Sheet1") {
    await this.init();
    const sheet = this.doc.sheetsByTitle[sheetName];
    if (!sheet) throw new Error(`Sheet ${sheetName} not found`);

    const rows = await sheet.getRows();
    
    // Assuming 'Status' column exists. If not, we might need to rely on column index or other headers.
    // Based on user prompt: "Monitor Google Sheet for new rows"
    // We filter for rows where Status is empty or 'New Lead'
    
    // IMPORTANT: The user mentioned n8n checks for "New Lead".
    // We will look for rows where 'status' column is 'New Lead' OR empty.
    
    return rows.filter(row => {
      const status = row.get('status') || row.get('Status');
      return status === 'New Lead' || !status;
    }).map(row => ({
      rowIndex: row.rowNumber,
      agent_name: row.get('Agent Name') || row.get('Name') || row.get('name'),
      email: row.get('Email') || row.get('email'),
      phone: row.get('Phone') || row.get('phone'),
      linkedin_url: row.get('LinkedIn') || row.get('Website URL') || row.get('website'),
      brokerage: row.get('Brokerage') || row.get('brokerage'),
      city: row.get('City') || row.get('city'),
      row_object: row
    }));
  }

  async updateRowStatus(rowIndex: number, status: string, sheetName: string = "Sheet1", extraData?: Record<string, string>) {
    await this.init();
    const sheet = this.doc.sheetsByTitle[sheetName];
    // getRows returns a subset. We need to be careful.
    // GoogleSpreadsheet doesn't have a "getRowByIndex" easily without fetching.
    // Efficient way: load cells for that row? Or just fetch all rows (easiest for small sheets).
    
    // Actually, if we pass the row object from getNewLeads, we can call save() on it.
    // But since we are likely calling this in a separate execution step (async), we might need to refetch.
    // For now, let's fetch the specific row range.
    
    // 0-indexed in API, 1-indexed in rowNumber property.
    const row = (await sheet.getRows({ offset: rowIndex - 2, limit: 1 }))[0]; // -2 because: header is row 1, API offset 0 is data row 1.
    // Wait, getRows offset is data rows.
    // If rowNumber is 2 (first data row), offset should be 0.
    // So offset = rowIndex - 2.
    
    if (row) {
      row.assign({ status: status, ...extraData });
      await row.save();
    }
  }
}
