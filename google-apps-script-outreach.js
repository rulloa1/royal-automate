/**
 * REAL ESTATE AGENT OUTREACH AUTOMATION
 * =====================================
 * This script automatically sends personalized emails to agents
 * based on their Web Status and updates the "Sent Email" column.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Click Extensions > Apps Script
 * 3. Delete any code in the editor
 * 4. Paste this entire script
 * 5. Click Save (disk icon)
 * 6. Click Run > sendEmailsToNewLeads (first time will ask for permissions)
 * 7. Authorize the app when prompted
 * 
 * TO SET UP AUTOMATIC TRIGGER:
 * 1. In Apps Script, click the clock icon (Triggers) on the left
 * 2. Click "+ Add Trigger"
 * 3. Choose: sendEmailsToNewLeads | Head | Time-driven | Minutes timer | Every 5 minutes
 * 4. Click Save
 * 
 * Or use the custom menu: Outreach > Send Emails to New Leads
 */

// ============================================
// CONFIGURATION - EDIT THESE VALUES
// ============================================

const CONFIG = {
  // Your info
  yourName: "Roy Ulloa",
  yourCompany: "RoysCompany",
  yourPhone: "(346) 298-5038",
  yourEmail: "roy@royscompany.com", // Your Gmail address

  // THE CHECKOUT LINK for all agents in this sheet
  checkoutLink: "https://buy.stripe.com/YOUR_STRIPE_LINK_HERE",

  // Column positions (A=1, B=2, etc.) - Adjust if your columns are different
  columns: {
    name: 1,           // A - Business / Agent Name
    address: 2,        // B - Address / Location
    phone: 3,          // C - Phone
    email: 4,          // D - Email (Direct)
    webStatus: 5,      // E - Web Status
    websiteLink: 6,    // F - Website Link (The "Preview Link")
    sentEmail: 7       // G - Sent Email
  },

  // Sheet name
  sheetName: "Table1",

  // Set to true to test without actually sending emails
  testMode: false
};

// ============================================
// EMAIL TEMPLATES
// ============================================

function getEmailTemplate(status, agentData) {
  const { name, websiteLink } = agentData;
  const firstName = name.split(' ')[0].split('(')[0].trim();

  // Use the specific template for everyone
  const subject = `I built a website for you (Preview inside)`;
  const body = `Hi ${firstName},

I built a modern, high-conversion website specifically for agents who don’t currently have an optimized online presence — and I already created yours.

Here is your private live preview:
${websiteLink}

If you want to secure it immediately, here is instant checkout:
${CONFIG.checkoutLink}

Once checkout is completed, your site enters a **60-minute provisioning window** — during that time your branding, contact info, domain routing, and analytics are fully configured. You receive a ready-to-use live site shortly after.

This is a limited, first-come build batch. If you’d like to lock your site, use the checkout link above.

– ${CONFIG.yourName}
${CONFIG.yourCompany}`;

  return { subject, body };
}

// ============================================
// MAIN FUNCTIONS
// ============================================

/**
 * Sends emails to all new leads (rows without a "Sent Email" timestamp)
 */
function sendEmailsToNewLeads() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.sheetName);
  if (!sheet) {
    Logger.log("Sheet not found: " + CONFIG.sheetName);
    return;
  }

  const data = sheet.getDataRange().getValues();
  const cols = CONFIG.columns;
  let emailsSent = 0;

  // Skip header row (i = 1)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const email = row[cols.email - 1];
    const sentEmail = row[cols.sentEmail - 1];
    const webStatus = row[cols.webStatus - 1];
    const name = row[cols.name - 1];

    // Skip if no email, already sent, or no name
    if (!email || sentEmail || !name) {
      continue;
    }

    // Skip if email doesn't look valid
    if (!email.includes('@')) {
      continue;
    }

    const agentData = {
      name: row[cols.name - 1],
      address: row[cols.address - 1] || "your area",
      phone: row[cols.phone - 1],
      email: email,
      webStatus: webStatus,
      websiteLink: row[cols.websiteLink - 1]
    };

    const template = getEmailTemplate(webStatus, agentData);

    if (CONFIG.testMode) {
      Logger.log("TEST MODE - Would send to: " + email);
      Logger.log("Subject: " + template.subject);
      Logger.log("Body: " + template.body);
    } else {
      try {
        GmailApp.sendEmail(email, template.subject, template.body, {
          name: CONFIG.yourName
        });

        // Update "Sent Email" column with timestamp
        const timestamp = new Date().toLocaleString();
        sheet.getRange(i + 1, cols.sentEmail).setValue(timestamp);

        emailsSent++;
        Logger.log("Email sent to: " + email);

        // Small delay to avoid rate limits
        Utilities.sleep(2000);

      } catch (error) {
        Logger.log("Error sending to " + email + ": " + error.message);
      }
    }
  }

  Logger.log("Total emails sent: " + emailsSent);

  if (emailsSent > 0) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      emailsSent + " email(s) sent successfully!",
      "Outreach Complete",
      5
    );
  }
}

/**
 * Sends email to a single row (for manual triggering)
 */
function sendEmailToCurrentRow() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row = sheet.getActiveRange().getRow();

  if (row <= 1) {
    SpreadsheetApp.getUi().alert("Please select a data row (not the header).");
    return;
  }

  const cols = CONFIG.columns;
  const data = sheet.getRange(row, 1, 1, 7).getValues()[0];

  const email = data[cols.email - 1];
  const sentEmail = data[cols.sentEmail - 1];
  const name = data[cols.name - 1];
  const webStatus = data[cols.webStatus - 1];

  if (!email || !email.includes('@')) {
    SpreadsheetApp.getUi().alert("No valid email in this row.");
    return;
  }

  if (sentEmail) {
    const confirm = SpreadsheetApp.getUi().alert(
      "Email already sent on " + sentEmail + ". Send again?",
      SpreadsheetApp.getUi().ButtonSet.YES_NO
    );
    if (confirm !== SpreadsheetApp.getUi().Button.YES) {
      return;
    }
  }

  const agentData = {
    name: name,
    address: data[cols.address - 1] || "your area",
    phone: data[cols.phone - 1],
    email: email,
    webStatus: webStatus,
    websiteLink: data[cols.websiteLink - 1]
  };

  const template = getEmailTemplate(webStatus, agentData);

  try {
    GmailApp.sendEmail(email, template.subject, template.body, {
      name: CONFIG.yourName
    });

    const timestamp = new Date().toLocaleString();
    sheet.getRange(row, cols.sentEmail).setValue(timestamp);

    SpreadsheetApp.getUi().alert("Email sent to " + email + "!");

  } catch (error) {
    SpreadsheetApp.getUi().alert("Error: " + error.message);
  }
}

/**
 * Preview email for current row without sending
 */
function previewEmailForCurrentRow() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row = sheet.getActiveRange().getRow();

  if (row <= 1) {
    SpreadsheetApp.getUi().alert("Please select a data row (not the header).");
    return;
  }

  const cols = CONFIG.columns;
  const data = sheet.getRange(row, 1, 1, 7).getValues()[0];

  const agentData = {
    name: data[cols.name - 1] || "Agent",
    address: data[cols.address - 1] || "your area",
    phone: data[cols.phone - 1],
    email: data[cols.email - 1],
    webStatus: data[cols.webStatus - 1],
    websiteLink: data[cols.websiteLink - 1]
  };

  const template = getEmailTemplate(agentData.webStatus, agentData);

  const preview = `TO: ${agentData.email}
STATUS: ${agentData.webStatus}

SUBJECT: ${template.subject}

BODY:
${template.body}`;

  SpreadsheetApp.getUi().alert(preview);
}

/**
 * Creates custom menu when spreadsheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 Outreach')
    .addItem('📧 Send Emails to All New Leads', 'sendEmailsToNewLeads')
    .addItem('📤 Send Email to Current Row', 'sendEmailToCurrentRow')
    .addItem('👁️ Preview Email for Current Row', 'previewEmailForCurrentRow')
    .addSeparator()
    .addItem('⚙️ Test Mode ON', 'enableTestMode')
    .addItem('⚙️ Test Mode OFF', 'disableTestMode')
    .addToUi();
}

/**
 * Enable test mode (logs emails instead of sending)
 */
function enableTestMode() {
  PropertiesService.getScriptProperties().setProperty('testMode', 'true');
  SpreadsheetApp.getUi().alert("Test Mode ENABLED. Emails will be logged but not sent.");
}

/**
 * Disable test mode (actually sends emails)
 */
function disableTestMode() {
  PropertiesService.getScriptProperties().setProperty('testMode', 'false');
  SpreadsheetApp.getUi().alert("Test Mode DISABLED. Emails will be sent for real.");
}

// ============================================
// OPTIONAL: AUTO-TRIGGER ON EDIT
// ============================================

/**
 * Uncomment the function below if you want emails to send
 * automatically when you add a new row. Be careful with this!
 */

/*
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  
  // Only trigger if editing the email column and it's a new entry
  if (range.getColumn() === CONFIG.columns.email) {
    const row = range.getRow();
    const sentEmail = sheet.getRange(row, CONFIG.columns.sentEmail).getValue();
    
    if (!sentEmail && range.getValue().includes('@')) {
      // Wait a moment for other data to be entered
      Utilities.sleep(5000);
      sendEmailToRow(row);
    }
  }
}
*/
