import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { SheetService } from '../_shared/google-sheets.ts'
import { EnrichmentService } from '../_shared/enrichment.ts'
import { SiteBuilderService } from '../_shared/site-builder.ts'
import { OutreachService } from '../_shared/outreach.ts'
import { Lead } from '../_shared/types.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const sheetId = Deno.env.get("GOOGLE_SHEET_ID");
    if (!sheetId) throw new Error("GOOGLE_SHEET_ID is required");

    const sheetService = new SheetService(sheetId);
    const enrichmentService = new EnrichmentService();
    const siteBuilderService = new SiteBuilderService();
    const outreachService = new OutreachService();

    const logs: string[] = [];
    const log = (msg: string) => {
      console.log(msg);
      logs.push(msg);
    };

    // 1. INGESTION: Check for new leads from Sheets
    log("Checking for new leads in Google Sheets...");
    const newSheetRows = await sheetService.getNewLeads();
    
    for (const row of newSheetRows) {
      // Check if already exists in DB
      const { data: existing } = await supabaseClient
        .from('leads')
        .select('id')
        .eq('email', row.email)
        .single();

      if (!existing && row.email) {
        log(`Importing new lead: ${row.agent_name}`);
        await supabaseClient.from('leads').insert({
          agent_name: row.agent_name,
          email: row.email,
          phone: row.phone,
          linkedin_url: row.linkedin_url,
          brokerage: row.brokerage,
          city: row.city,
          google_sheet_row_index: row.rowIndex,
          status: 'new'
        });
        
        // Update sheet status to 'Processing'
        await sheetService.updateRowStatus(row.rowIndex, 'Processing');
      }
    }

    // 2. ENRICHMENT: Process 'new' leads
    const { data: leadsToEnrich } = await supabaseClient
      .from('leads')
      .select('*')
      .eq('status', 'new')
      .limit(5); // Process in batches

    if (leadsToEnrich) {
      for (const lead of leadsToEnrich) {
        log(`Enriching ${lead.agent_name}...`);
        try {
          const data = await enrichmentService.enrichAgent(lead.linkedin_url || "");
          
          await supabaseClient
            .from('leads')
            .update({
              enrichment_data: data as any,
              status: 'enriched'
            })
            .eq('id', lead.id);
            
        } catch (err: any) {
          log(`Enrichment error for ${lead.agent_name}: ${err.message}`);
          await supabaseClient.from('leads').update({ error_message: err.message }).eq('id', lead.id);
        }
      }
    }

    // 3. SITE BUILDING: Process 'enriched' leads
    const { data: leadsToBuild } = await supabaseClient
      .from('leads')
      .select('*')
      .eq('status', 'enriched')
      .limit(5);

    if (leadsToBuild) {
      for (const lead of leadsToBuild) {
        log(`Building site for ${lead.agent_name}...`);
        try {
          const result = await siteBuilderService.generateWebsite(lead, lead.enrichment_data as any);
          
          await supabaseClient
            .from('leads')
            .update({
              website_url: result.url,
              website_deploy_id: result.deployId,
              status: 'site_built'
            })
            .eq('id', lead.id);

          // Update Google Sheet
          if (lead.google_sheet_row_index) {
            await sheetService.updateRowStatus(lead.google_sheet_row_index, 'Site Ready', 'Sheet1', {
              'website_link': result.url
            });
          }

        } catch (err: any) {
          log(`Build error for ${lead.agent_name}: ${err.message}`);
        }
      }
    }

    // 4. OUTREACH: Process 'site_built' (Initial) and 'outreach_active' (Follow-ups)
    
    // Initial Emails
    const { data: leadsToContact } = await supabaseClient
      .from('leads')
      .select('*')
      .eq('status', 'site_built')
      .limit(5);

    if (leadsToContact) {
      for (const lead of leadsToContact) {
        log(`Sending initial email to ${lead.email}...`);
        try {
          const msgId = await outreachService.sendEmail(lead, 'initial');
          
          await supabaseClient
            .from('leads')
            .update({
              status: 'outreach_active',
              outreach_stage: 1,
              last_contacted_at: new Date().toISOString(),
              outreach_logs: [...(lead.outreach_logs || []), {
                timestamp: new Date().toISOString(),
                stage: 1,
                action: 'email_sent',
                message_id: msgId
              }] as any
            })
            .eq('id', lead.id);
            
            if (lead.google_sheet_row_index) {
               await sheetService.updateRowStatus(lead.google_sheet_row_index, 'Email Sent');
            }

        } catch (err: any) {
          log(`Email error for ${lead.agent_name}: ${err.message}`);
        }
      }
    }

    // Follow-ups
    const { data: activeLeads } = await supabaseClient
      .from('leads')
      .select('*')
      .eq('status', 'outreach_active')
      .lt('outreach_stage', 4) // Stop after final
      .limit(10);

    if (activeLeads) {
      for (const lead of activeLeads) {
        const nextStep = outreachService.shouldSendFollowUp(lead);
        if (nextStep) {
          log(`Sending ${nextStep} to ${lead.email}...`);
          try {
            const msgId = await outreachService.sendEmail(lead, nextStep);
            const newStage = lead.outreach_stage + 1;
            
            await supabaseClient
              .from('leads')
              .update({
                outreach_stage: newStage,
                last_contacted_at: new Date().toISOString(),
                outreach_logs: [...(lead.outreach_logs || []), {
                  timestamp: new Date().toISOString(),
                  stage: newStage,
                  action: 'email_sent',
                  details: nextStep,
                  message_id: msgId
                }] as any
              })
              .eq('id', lead.id);

          } catch (err: any) {
             log(`Follow-up error for ${lead.agent_name}: ${err.message}`);
          }
        }
      }
    }

    return new Response(JSON.stringify({ success: true, logs }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
