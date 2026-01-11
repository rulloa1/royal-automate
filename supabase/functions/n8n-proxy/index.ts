import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const N8N_WEBHOOKS = {
  'call-lead': 'https://ulloarory.app.n8n.cloud/webhook/call-lead',
  'message-lead': 'https://ulloarory.app.n8n.cloud/webhook/message-lead',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...data } = await req.json();
    
    console.log(`Proxying request to n8n: action=${action}`, data);

    const webhookUrl = N8N_WEBHOOKS[action as keyof typeof N8N_WEBHOOKS];
    
    if (!webhookUrl) {
      console.error(`Invalid action: ${action}`);
      return new Response(
        JSON.stringify({ error: 'Invalid action', validActions: Object.keys(N8N_WEBHOOKS) }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Calling n8n webhook: ${webhookUrl}`);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseText = await response.text();
    console.log(`n8n response status: ${response.status}, body: ${responseText}`);

    // Try to parse as JSON, otherwise return as text
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { message: responseText || 'Request processed' };
    }

    return new Response(
      JSON.stringify(responseData),
      { 
        status: response.status, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error proxying to n8n:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to process request' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
