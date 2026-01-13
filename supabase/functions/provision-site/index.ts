import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { WEBSITE_TEMPLATE } from "./template.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { agentName, agentConfig, slug } = await req.json();

    if (!agentName || !agentConfig || !slug) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: agentName, agentConfig, slug" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate HTML with injected config
    const configScript = `<script>const agentConfig = ${JSON.stringify(agentConfig, null, 2)};</script>`;
    const htmlContent = WEBSITE_TEMPLATE.replace("{{AGENT_CONFIG_SCRIPT}}", configScript);

    // Upload to Supabase Storage
    const fileName = `${slug}/index.html`;
    const { data, error } = await supabase.storage
      .from("sites")
      .upload(fileName, htmlContent, {
        contentType: "text/html",
        upsert: true,
      });

    if (error) {
      throw new Error(`Storage upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("sites")
      .getPublicUrl(fileName);

    return new Response(
      JSON.stringify({
        success: true,
        url: publicUrlData.publicUrl,
        path: fileName,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Provision site error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
