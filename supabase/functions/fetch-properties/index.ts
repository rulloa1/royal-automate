
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { JWT } from "https://deno.land/x/google_deno_integration@v0.2/mod.ts";

/**
 * FETCH PROPERTIES
 * ----------------
 * securely fetches property data from a Google Sheet.
 * 
 * Env Vars Required:
 * - GOOGLE_SERVICE_ACCOUNT: The content of your service-account.json (minified JSON string)
 * - SHEET_ID: The ID of your Google Sheet
 */

serve(async (req) => {
    // CORS Helper
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { slug } = await req.json();

        // 1. Get Credentials
        const serviceAccountStr = Deno.env.get("GOOGLE_SERVICE_ACCOUNT");
        const sheetId = Deno.env.get("SHEET_ID");

        if (!serviceAccountStr || !sheetId) {
            throw new Error("Missing configuration (GOOGLE_SERVICE_ACCOUNT or SHEET_ID)");
        }

        const serviceAccount = JSON.parse(serviceAccountStr);

        // 2. Authenticate with Google
        const client = new JWT({
            email: serviceAccount.client_email,
            key: serviceAccount.private_key,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        await client.authorize();

        // 3. Fetch Data using Raw Sheets API
        // We fetch the whole sheet data (assuming it's small enough: < 10k rows is usually fine)
        // If it gets huge, we might want to cache this or use a more specific query if possible (but sheets API logic is limited)
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:Z?majorDimension=ROWS`; // Adjust range as needed

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${client.key}`, // JWT client handles the token storage internally, but wait...
                // actually the library usually gives us a token.
                // Let's use the access token.

            },
        });

        // Correction: The JWT library for Deno works a bit differently.
        // Let's use a standard fetch with the token.
        const token = (await client.getAccessToken()).access_token;

        const sheetResponse = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!sheetResponse.ok) {
            const txt = await sheetResponse.text();
            throw new Error(`Google Sheets API Error: ${sheetResponse.status} ${txt}`);
        }

        const data = await sheetResponse.json();
        const rows = data.values;

        if (!rows || rows.length === 0) {
            return new Response(JSON.stringify({ error: "No data found in sheet" }), { headers: corsHeaders, status: 404 });
        }

        // 4. Parse Headers (Row 1)
        const headers = rows[0].map((h: string) => h.toLowerCase()); // Normalize to lowercase

        // Helper to turn row array into object
        const parseRow = (row: string[]) => {
            const obj: any = {};
            headers.forEach((header: string, index: number) => {
                obj[header] = row[index];
            });
            return obj;
        };

        // 5. Filter for Slug
        const allProperties = rows.slice(1).map(parseRow);
        const property = allProperties.find((p: any) => p.slug === slug);

        if (!property) {
            return new Response(JSON.stringify({ error: "Property not found" }), { headers: corsHeaders, status: 404 });
        }

        return new Response(JSON.stringify(property), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
});

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
