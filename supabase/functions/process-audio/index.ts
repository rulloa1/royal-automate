import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const DEEPGRAM_API_KEY = Deno.env.get("DEEPGRAM_API_KEY");

        // Get the audio command from the request body
        // We expect a FormData object with a 'file' field or just raw binary? 
        // Usually easier to send FormData from client
        const formData = await req.formData();
        const audioFile = formData.get('file');

        if (!audioFile) {
            throw new Error("No audio file uploaded");
        }

        if (!DEEPGRAM_API_KEY) {
            throw new Error("Deepgram API Key is not configured");
        }

        // Call Deepgram API
        // @ts-ignore - Deno fetch compatibility
        const deepgramResponse = await fetch("https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true", {
            method: "POST",
            headers: {
                "Authorization": `Token ${DEEPGRAM_API_KEY}`,
                // Content-Type is automatically set by fetch when passing the Body from formData, 
                // but we might need to be careful. 
                // If we pass the file directly, we might need to set it.
                // Let's try passing the blob directly if possible, or arrayBuffer.
            },
            body: audioFile,
        });

        if (!deepgramResponse.ok) {
            const errorText = await deepgramResponse.text();
            console.error("Deepgram error:", deepgramResponse.status, errorText);
            throw new Error(`Deepgram API error: ${deepgramResponse.status}`);
        }

        const data = await deepgramResponse.json();
        const transcript = data.results?.channels[0]?.alternatives[0]?.transcript || "";

        return new Response(
            JSON.stringify({ text: transcript }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

    } catch (error: any) {
        console.error("Process audio error:", error);
        return new Response(
            JSON.stringify({ error: error.message || "Unknown error" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});
