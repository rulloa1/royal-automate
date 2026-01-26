import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadNotificationRequest {
  leadName: string;
  email: string;
  phone?: string;
  businessName?: string;
  selectedPackage: string;
  projectDetails?: string;
  source: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL") || "rory@royscompany.com";

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(RESEND_API_KEY);
    const data: LeadNotificationRequest = await req.json();

    // Validate required fields
    if (!data.leadName || !data.email || !data.selectedPackage) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send notification email to admin
    const adminEmailResult = await resend.emails.send({
      from: "Lead Notifications <leads@royscompany.com>",
      to: [NOTIFICATION_EMAIL],
      subject: `🎯 New ${data.selectedPackage} Web Design Lead: ${data.leadName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a1a; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            New Web Design Lead
          </h1>
          
          <div style="background: #fef3c7; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <strong style="color: #92400e;">Package Selected:</strong> 
            <span style="color: #1a1a1a; font-size: 18px; font-weight: bold;">${data.selectedPackage}</span>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280; width: 140px;">Name</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1a1a1a;">${data.leadName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Email</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                <a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a>
              </td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Phone</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                <a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a>
              </td>
            </tr>
            ` : ""}
            ${data.businessName ? `
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Business</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1a1a1a;">${data.businessName}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Source</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1a1a1a;">${data.source}</td>
            </tr>
          </table>

          ${data.projectDetails ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 8px;">Project Details</h3>
            <div style="background: #f9fafb; border-radius: 8px; padding: 16px; color: #4b5563; line-height: 1.6;">
              ${data.projectDetails}
            </div>
          </div>
          ` : ""}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <a href="mailto:${data.email}?subject=Re: Your Web Design Project" 
               style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Reply to Lead
            </a>
          </div>

          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; text-align: center;">
            Sent from Roy's Company Lead System
          </p>
        </div>
      `,
    });

    console.log("Admin notification sent:", adminEmailResult);

    // Send confirmation email to lead
    const leadEmailResult = await resend.emails.send({
      from: "Rory Ulloa <hello@royscompany.com>",
      to: [data.email],
      subject: "Thanks for your interest in our Web Design services!",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a1a;">Thanks for reaching out, ${data.leadName.split(" ")[0]}!</h1>
          
          <p style="color: #4b5563; line-height: 1.6; font-size: 16px;">
            I received your inquiry about our <strong>${data.selectedPackage}</strong> web design package and I'm excited to learn more about your project.
          </p>

          <p style="color: #4b5563; line-height: 1.6; font-size: 16px;">
            I'll review your requirements and get back to you within <strong>24 hours</strong> with:
          </p>

          <ul style="color: #4b5563; line-height: 1.8;">
            <li>A detailed proposal tailored to your needs</li>
            <li>Timeline and next steps</li>
            <li>Answers to any questions you might have</li>
          </ul>

          <p style="color: #4b5563; line-height: 1.6; font-size: 16px;">
            In the meantime, feel free to reply to this email if you have any immediate questions.
          </p>

          <p style="color: #1a1a1a; margin-top: 30px;">
            Best,<br>
            <strong>Rory Ulloa</strong><br>
            <span style="color: #6b7280;">Roy's Company</span>
          </p>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px;">
              <a href="https://royscompany.com" style="color: #f59e0b;">royscompany.com</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Lead confirmation sent:", leadEmailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResult,
        leadEmail: leadEmailResult 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending notification:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
