import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * FETCH PROPERTIES
 * ----------------
 * Securely fetches property data from a Google Sheet.
 * 
 * Note: This function requires google-spreadsheet and google-auth-library
 * which have compatibility issues with Deno edge runtime.
 * Consider using the Google Sheets REST API directly instead.
 * 
 * Env Vars Required:
 * - GOOGLE_SERVICE_ACCOUNT: The content of your service-account.json (minified JSON string)
 * - SHEET_ID: The ID of your Google Sheet
 * OR
 * - GOOGLE_SERVICE_ACCOUNT_EMAIL: Your service account email
 * - GOOGLE_PRIVATE_KEY: Your private key (with \n or real newlines)
 */

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // CORS Helper
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { slug } = await req.json();

        // Get Credentials
        const sheetId = Deno.env.get("SHEET_ID") || "1WJZdVXF14QkbVWUwYV1xwtBWjRis3ag-";
        const clientEmail = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL") || Deno.env.get("CLIENT_EMAIL");
        const privateKey = Deno.env.get("GOOGLE_PRIVATE_KEY") || Deno.env.get("PRIVATE_KEY");
        const serviceAccountStr = Deno.env.get("GOOGLE_SERVICE_ACCOUNT");

        if (!sheetId) {
            throw new Error("Missing SHEET_ID environment variable");
        }

        let email = clientEmail;
        let key = privateKey;

        // Parse service account JSON if provided
        if (serviceAccountStr) {
            try {
                const parsed = JSON.parse(serviceAccountStr);
                email = parsed.client_email;
                key = parsed.private_key;
            } catch (e) {
                throw new Error("Invalid GOOGLE_SERVICE_ACCOUNT JSON");
            }
        }

        if (!email || !key) {
            throw new Error("Missing Google configuration. Provide either GOOGLE_SERVICE_ACCOUNT (json) OR GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY.");
        }

        // Fix escaped newlines in private key
        const formattedKey = key.replace(/\\n/g, '\n');

        // Create JWT for Google API authentication
        const now = Math.floor(Date.now() / 1000);
        const header = { alg: "RS256", typ: "JWT" };
        const payload = {
            iss: email,
            scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
            aud: "https://oauth2.googleapis.com/token",
            iat: now,
            exp: now + 3600,
        };

        // Import the crypto key
        const pemHeader = "-----BEGIN PRIVATE KEY-----";
        const pemFooter = "-----END PRIVATE KEY-----";
        const pemContents = formattedKey.replace(pemHeader, "").replace(pemFooter, "").replace(/\s/g, "");
        const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

        const cryptoKey = await crypto.subtle.importKey(
            "pkcs8",
            binaryKey,
            { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
            false,
            ["sign"]
        );

        // Base64url encode
        const base64url = (data: string) => btoa(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        const encoder = new TextEncoder();

        const headerB64 = base64url(JSON.stringify(header));
        const payloadB64 = base64url(JSON.stringify(payload));
        const signatureInput = encoder.encode(`${headerB64}.${payloadB64}`);

        const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, signatureInput);
        const signatureB64 = base64url(String.fromCharCode(...new Uint8Array(signature)));

        const jwt = `${headerB64}.${payloadB64}.${signatureB64}`;

        // Exchange JWT for access token
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion: jwt,
            }),
        });

        const tokenData = await tokenResponse.json();
        if (!tokenData.access_token) {
            console.error("Token exchange failed:", tokenData);
            throw new Error("Failed to get access token");
        }

        // Fetch sheet data using Google Sheets API
        const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:Z1000`;
        const sheetsResponse = await fetch(sheetsUrl, {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        const sheetsData = await sheetsResponse.json();
        if (!sheetsData.values || sheetsData.values.length < 2) {
            return new Response(JSON.stringify({ error: "No data in sheet" }), { headers: corsHeaders, status: 404 });
        }

        const [headers, ...rows] = sheetsData.values;
        const slugIndex = headers.findIndex((h: string) => h.toLowerCase() === 'slug');

        if (slugIndex === -1) {
            throw new Error("No 'Slug' column found in sheet");
        }

        // Find the property row
        const propertyRow = rows.find((row: string[]) => row[slugIndex] === slug);

        if (!propertyRow) {
            return new Response(JSON.stringify({ error: "Property not found" }), { headers: corsHeaders, status: 404 });
        }

        // Convert to object
        const responseData: Record<string, string> = {};
        headers.forEach((header: string, index: number) => {
            const key = header.charAt(0).toLowerCase() + header.slice(1);
            responseData[key] = propertyRow[index] || "";
        });

        return new Response(JSON.stringify(responseData), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
});
