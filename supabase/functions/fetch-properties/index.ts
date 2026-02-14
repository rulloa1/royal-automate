
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleSpreadsheet } from "npm:google-spreadsheet@4.1.4";
import { JWT } from "npm:google-auth-library@9.0.0";

/**
 * FETCH PROPERTIES
 * ----------------
 * securely fetches property data from a Google Sheet.
 * 
 * Env Vars Required:
 * - GOOGLE_SERVICE_ACCOUNT: The content of your service-account.json (minified JSON string)
 * - SHEET_ID: The ID of your Google Sheet
 * OR
 * - GOOGLE_SERVICE_ACCOUNT_EMAIL: Your service account email
 * - GOOGLE_PRIVATE_KEY: Your private key (with \n or real newlines)
 */

serve(async (req) => {
    // CORS Helper
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { slug } = await req.json();

        // 1. Get Credentials
        const sheetId = Deno.env.get("SHEET_ID");
        const serviceAccountStr = Deno.env.get("GOOGLE_SERVICE_ACCOUNT");
        const clientEmail = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL") || Deno.env.get("CLIENT_EMAIL");
        const privateKey = Deno.env.get("GOOGLE_PRIVATE_KEY") || Deno.env.get("PRIVATE_KEY");

        if (!sheetId) {
            throw new Error("Missing SHEET_ID environment variable");
        }

        let auth;

        // 2. Initialize Auth
        if (serviceAccountStr) {
            const parsed = JSON.parse(serviceAccountStr);
            auth = new JWT({
                email: parsed.client_email,
                key: parsed.private_key,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
        } else if (clientEmail && privateKey) {
            auth = new JWT({
                email: clientEmail,
                key: privateKey.replace(/\\n/g, '\n'),
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
        } else {
            throw new Error("Missing Google configuration. Provide either GOOGLE_SERVICE_ACCOUNT (json) OR GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY.");
        }

        // 3. Load Doc
        const doc = new GoogleSpreadsheet(sheetId, auth);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        // 4. Find Row
        // Assuming column headers are title-cased or whatever, we convert to simple object properties
        // google-spreadsheet returns row objects where properties match headers

        const property = rows.find((row) => row.get('Slug') === slug || row.get('slug') === slug); // Handle Case Sens

        if (!property) {
            return new Response(JSON.stringify({ error: "Property not found" }), { headers: corsHeaders, status: 404 });
        }

        // Convert to plain object and normalize logic
        const responseData = {
            title: property.get('Title') || property.get('title'),
            description: property.get('Description') || property.get('description'),
            image: property.get('Image') || property.get('image') || property.get('imageUrl') || property.get('ImageUrl'),
            price: property.get('Price') || property.get('price'),
            ...property.toObject() // Include everything else just in case
        };

        return new Response(JSON.stringify(responseData), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error:", error);
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
