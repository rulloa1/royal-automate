import { Lead } from "./types.ts";

export class OutreachService {
  private resendApiKey?: string;
  private senderEmail: string;

  constructor() {
    this.resendApiKey = Deno.env.get("RESEND_API_KEY");
    this.senderEmail = Deno.env.get("SENDER_EMAIL") || "onboarding@yourdomain.com";
  }

  async sendEmail(lead: Lead, templateName: 'initial' | 'follow_up_1' | 'follow_up_2' | 'final'): Promise<string> {
    if (!this.resendApiKey) {
      console.warn(`[WARNING] RESEND_API_KEY missing. Cannot send email to ${lead.email}.`);
      throw new Error("Missing RESEND_API_KEY");
    }

    const { subject, html } = this.getTemplate(templateName, lead);

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

    switch (name) {
      case 'initial':
        return {
          subject: `${lead.agent_name} - I Built You a Professional Website`,
          html: `
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
            <br>
            <p>Best,<br>Roy</p>
          `
        };
      case 'follow_up_1': // Day 3
        return {
          subject: `Quick reminder about your site`,
          html: `
            <p>Hi ${firstName},</p>
            <p>Just wanted to float this to the top of your inbox. Did you get a chance to see the site I built?</p>
            <p><a href="${siteUrl}">View Your Site</a></p>
            <p>If you love it, you can secure it here: <a href="${checkoutLink}">Secure My Site</a></p>
            <p>Let me know what you think!</p>
            <br>
            <p>Best,<br>Roy</p>
          `
        };
      case 'follow_up_2': // Day 7
        return {
          subject: `Last chance for this design`,
          html: `
            <p>Hi ${firstName},</p>
            <p>I haven't heard back, so I assume you're busy. I can only hold this design for another 48 hours before I archive it.</p>
            <p>Link: <a href="${siteUrl}">${siteUrl}</a></p>
            <p><a href="${checkoutLink}">Purchase Now</a></p>
            <br>
            <p>Best,<br>Roy</p>
          `
        };
      default:
        return { subject: "Hello", html: "Test" };
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
