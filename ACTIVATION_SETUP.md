# Activation Workflow Setup Guide

This guide explains how to import and configure the enhanced Activation Workflow.

## 1. Import the Workflow
1.  Open your n8n dashboard (e.g., `https://ulloarory.app.n8n.cloud`).
2.  Create a new workflow.
3.  Click the three dots in the top right → **Import from File**.
4.  Select `c:\Users\roryu\royal-automate\workflows\activation-workflow.json`.

## 2. Configure Google Sheets
1.  Create a new Google Sheet named **"Website Activations"**.
2.  Add the following headers to the first row (Row 1):
    *   Business Name
    *   Contact Name
    *   Role
    *   Email
    *   Phone
    *   Address
    *   Date
    *   Services
    *   Bio
    *   Domain Status
3.  In n8n, double-click the **Save to Google Sheets** node.
4.  Under **Credential to connect with**, select your Google account.
5.  In the **Sheet ID** field, select your "Website Activations" sheet from the list (or paste the ID from the URL).

## 3. Configure Gmail
1.  In n8n, double-click the **Gmail - Notify Admin** node.
2.  Under **Credential to connect with**, select your Gmail account.
3.  The "To" address is set to `support@royscompany.com`. You can change this if needed.

## 4. Save and Activate
1.  Click **Save**.
2.  Toggle **Active** to **On** (top right switch).

## 5. Test It
1.  Go to your website's activation page (e.g., `localhost:5173/activation` or your live site).
2.  Fill out the form and submit.
3.  Check your Google Sheet for the new row.
4.  Check your email for the notification.
