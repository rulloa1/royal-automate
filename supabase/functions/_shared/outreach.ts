import { Lead } from "./types.ts";
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';
import nodemailer from "npm:nodemailer@6.9.10";

export class OutreachService {
  private resendApiKey?: string;
  private senderEmail: string;
  private signature: string;
  private supabase: SupabaseClient;
  private smtpTransporter: any;
  private useSmtp: boolean = false;

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
    this.resendApiKey = Deno.env.get("RESEND_API_KEY");
    this.senderEmail = Deno.env.get("SENDER_EMAIL") || "onboarding@yourdomain.com";
    this.signature = "Best,\nRoy";
  }

  async initialize() {
    // Fetch user settings to override defaults
    const { data: settings } = await this.supabase
      .from('user_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (settings) {
      if (settings.smtp_host && settings.smtp_username && settings.smtp_password) {
        this.useSmtp = true;
        this.senderEmail = settings.smtp_from_email || settings.smtp_username;
        
        // Handle password decryption if needed (assuming stored as plain text or handled elsewhere for now)
        // In a real app, you should decrypt the password here.
        const password = settings.smtp_password; 

        this.smtpTransporter = nodemailer.createTransport({
          host: settings.smtp_host,
          port: settings.smtp_port || 587,
          secure: settings.smtp_port === 465, // true for 465, false for other ports
          auth: {
            user: settings.smtp_username,
            pass: password,
          },
        });
        console.log("OutreachService initialized with SMTP settings");
      }

      if (settings.email_signature) {
        this.signature = settings.email_signature;
      }
    }
  }

  async sendEmail(lead: Lead, templateName: 'initial' | 'follow_up_1' | 'follow_up_2' | 'final'): Promise<string> {
    const { subject, html } = this.getTemplate(templateName, lead);

    if (this.useSmtp && this.smtpTransporter) {
      try {
        const info = await this.smtpTransporter.sendMail({
          from: this.senderEmail,
          to: lead.email,
          subject: subject,
          html: html,
        });
        return info.messageId;
      } catch (error: any) {
        console.error("SMTP Error:", error);
        throw new Error(`SMTP failed: ${error.message}`);
      }
    }

    // Fallback to Resend API if SMTP is not configured
    if (!this.resendApiKey) {
      console.warn(`[WARNING] RESEND_API_KEY missing and SMTP not configured. Cannot send email to ${lead.email}.`);
      throw new Error("Missing Email Configuration (Resend or SMTP)");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Roy <${this.senderEmail}>`,
        to: [lead.email],
        subject: subject,
        html: html,
      }),
    });

    if (!res.ok) {
      throw new Error(`Email failed: ${res.statusText}`);
    }

    const data = await res.json();
    return data.id;
  }

  private getTemplate(name: string, lead: Lead) {
    const firstName = lead.agent_name.split(" ")[0];
    const siteUrl = lead.website_url || "#";
    // Hardcoded Stripe link for now - replace with dynamic one if needed
    const checkoutLink = "https://buy.stripe.com/5kA8y8c0g2q4dUY5kk"; 
    
    // Convert newlines in signature to <br>
    const formattedSignature = this.signature.replace(/\n/g, '<br>');

    let content = "";

    switch (name) {
      case 'initial':
        content = `
            <p>Hi ${firstName},</p>
            <p>I noticed you could use an upgraded online presence, so I went ahead and built a custom website for you.</p>
            <p><strong>Check it out here: <a href="${siteUrl}">${siteUrl}</a></strong></p>
            <p>It features:</p>
            <ul>
              <li>Mobile-optimized design</li>
              <li>Lead capture forms</li>
              <li>Your branding colors</li>
            </ul>
            <p>I'm offering this for just $500 setup + $99/mo (normally $2,000+). Reply to claim it or secure it instantly below:</p>
            <p><a href="${checkoutLink}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Get This Website Now</a></p>
          `;
        break;
      case 'follow_up_1': // Day 3
        content = `
            <p>Hi ${firstName},</p>
            <p>Just wanted to float this to the top of your inbox. Did you get a chance to see the site I built?</p>
            <p><a href="${siteUrl}">View Your Site</a></p>
            <p>If you love it, you can secure it here: <a href="${checkoutLink}">Secure My Site</a></p>
            <p>Let me know what you think!</p>
          `;
        break;
      case 'follow_up_2': // Day 7
        content = `
            <p>Hi ${firstName},</p>
            <p>I haven't heard back, so I assume you're busy. I can only hold this design for another 48 hours before I archive it.</p>
            <p>Link: <a href="${siteUrl}">${siteUrl}</a></p>
            <p><a href="${checkoutLink}">Purchase Now</a></p>
          `;
        break;
      default:
        return { subject: "Hello", html: "Test" };
    }

    return {
      subject: this.getSubject(name, lead),
      html: `${content}<br><p>${formattedSignature}</p>`
    };
  }

  private getSubject(name: string, lead: Lead): string {
    switch(name) {
      case 'initial': return `${lead.agent_name} - I Built You a Professional Website`;
      case 'follow_up_1': return `Quick reminder about your site`;
      case 'follow_up_2': return `Last chance for this design`;
      default: return "Update";
    }
  }

  shouldSendFollowUp(lead: Lead): 'follow_up_1' | 'follow_up_2' | 'final' | null {
    if (!lead.last_contacted_at) return null;
    
    const lastContact = new Date(lead.last_contacted_at);
    const now = new Date();
    const daysSince = (now.getTime() - lastContact.getTime()) / (1000 * 60 * 60 * 24);

    if (lead.outreach_stage === 1 && daysSince >= 3) return 'follow_up_1';
    if (lead.outreach_stage === 2 && daysSince >= 4) return 'follow_up_2'; // 3+4=7 days total
    if (lead.outreach_stage === 3 && daysSince >= 3) return 'final'; // 7+3=10 days total
    
    return null;
  }
}
