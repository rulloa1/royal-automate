# STRIPE PAYMENT LINK SETUP GUIDE

## Quick Setup (5 minutes)

### Step 1: Create Stripe Account
1. Go to https://stripe.com
2. Sign up with your email
3. Complete identity verification

### Step 2: Create a Payment Link

1. Go to **Stripe Dashboard** → **Payment Links** (left sidebar)
2. Click **+ New** 
3. Set up your product:
   - **Name:** Professional Website - [Industry]
   - **Price:** $1,000.00 (one-time)
   - **Description:** Fully designed, mobile-responsive website. Includes domain setup and 48-hour delivery.

4. Click **Create Link**
5. Copy your link (looks like: https://buy.stripe.com/xxxxx)

### Step 3: Create Links for Each Industry

Create separate payment links for:
- [ ] Roofing Website - $1,000
- [ ] HVAC Website - $1,000
- [ ] Plumbing Website - $1,000
- [ ] Landscaping Website - $1,000
- [ ] Electrical Website - $1,000
- [ ] Auto Repair Website - $1,000

This way you can track which industries convert best.

---

## Pro Tips

**Add a checkout form to collect info:**
- In Payment Link settings, enable "Collect shipping address" or use custom fields
- Collect: Business name, phone number, domain preference

**Set up instant notifications:**
- Stripe Dashboard → Settings → Emails
- Enable payment confirmation emails
- You'll get notified instantly when someone pays

**Connect to n8n (optional):**
- Use Stripe Trigger node in n8n
- Auto-create Airtable record when payment received
- Auto-send welcome email with next steps

---

# SIMPLE INVOICE TEMPLATE

Use this if someone wants an invoice before paying:

---

## INVOICE

**Invoice #:** INV-001
**Date:** _______________
**Due:** Upon Receipt

---

**From:**
RoysCompany
Roy Ulloa
(346) 298-5038
[Your Email]

**To:**
[Client Name]
[Business Name]
[Client Email]
[Client Phone]

---

**Description:**

| Item | Amount |
|------|--------|
| Professional Website - [Industry] | $1,000.00 |
| - Mobile-responsive design | |
| - Contact form setup | |
| - Basic SEO optimization | |
| - Domain connection | |
| - 48-hour delivery | |
| **TOTAL** | **$1,000.00** |

---

**Payment Options:**

**Pay Online (Card):**
[Your Stripe Payment Link]

**PayPal:**
[Your PayPal.me link or email]

**Zelle:**
(346) 298-5038

---

**Terms:**
- Payment due upon receipt
- Delivery within 48 hours of payment
- All sales final

---

**Questions?** 
Call/text Roy at (346) 298-5038

---

# QUICK PAYMENT MESSAGE

Copy/paste this when someone's ready to buy:

---

Hey [Name]! 

Great talking with you. Here's everything you need:

**Your Website Package - $1,000**
✅ Professional [industry] website
✅ Mobile-responsive design
✅ Contact form setup
✅ Live within 48 hours

**Pay here:** [Stripe Link]

Once payment goes through, I'll shoot you a text to confirm and get your domain info. We'll have you live by [day].

Talk soon,
Roy
(346) 298-5038
