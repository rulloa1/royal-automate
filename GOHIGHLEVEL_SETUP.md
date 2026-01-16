# Connecting Royal Automate to GoHighLevel (Trial Version Workaround)

Since you are on the **Trial Version** of GoHighLevel and want to avoid complex API setups or premium integrations (like paid Zapier), the most robust "workaround" is to use **Inbound Webhooks** inside GoHighLevel Automations.

This method allows you to send data from your website directly into GHL without hitting API limits or needing an OAuth app.

## Step 1: Create an Automation in GoHighLevel

1. Log in to your **GoHighLevel** account.
2. Navigate to **Automation** > **Workflows**.
3. Click **+ Create Workflow** > **Start from Scratch**.
4. Click **Add New Trigger**.
5. Search for and select **Incoming Webhook** (sometimes called "Inbound Webhook").
6. **IMPORTANT:** Copy the **Webhook URL** generated (it looks like `https://services.leadconnectorhq.com/hooks/unique-id`).
7. Click **Save Trigger**.

## Step 2: Map the Data

To make sure GHL knows what to do with the data:

1. Click the **+** button to add an Action.
2. Select **Create/Update Contact**.
3. Click on the fields (First Name, Email, Phone) and select the "Custom Values" or "Webhook Data" icon.
   - You might need to send a test request first for GHL to see the fields.
   - **Tip:** You can use Postman or just run the n8n workflow once with dummy data to "teach" GHL the structure.
4. Map:
   - `email` -> Email
   - `phone` -> Phone
   - `firstName` -> First Name
   - `lastName` -> Last Name
   - `tags` -> Add Contact Tag (e.g., "Website Lead")

## Step 3: Update n8n Workflows

I have already updated your n8n workflow files (`activation-workflow.json`, `message-handler-workflow.json`, `voice-caller-workflow.json`) to include a "Sync to GoHighLevel" node.

You need to:

1. Open your **n8n** dashboard.
2. **Import** the updated workflow files from your project folder (`workflows/`).
3. Open the **"Sync to GoHighLevel"** node in each workflow.
4. Replace `https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID` with the **Webhook URL** you copied in Step 1.
5. **Save** and **Activate** the workflow.

## Why this works for Trial Accounts
- It uses standard automation triggers available on all plans.
- It bypasses the need for a dedicated "API Key" (which is deprecated/hidden in newer GHL versions).
- It doesn't require "Premium" Zapier steps.
