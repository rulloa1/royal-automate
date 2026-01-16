import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { OutreachService } from "../_shared/outreach.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, agent_name, website_url, template = 'initial' } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Missing email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const outreachService = new OutreachService();
    
    // Construct minimal lead object required by OutreachService
    const lead = {
      id: "manual-trigger",
      agent_name: agent_name || "Agent",
      email: email,
      website_url: website_url,
      // Other fields not needed for sending logic
    };

    console.log(`Manually sending '${template}' email to ${email}`);
    
    const messageId = await outreachService.sendEmail(lead as any, template);

    return new Response(
      JSON.stringify({ success: true, messageId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Manual email error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to send email' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
