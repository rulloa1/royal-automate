To address your questions about starting the automation, monitoring it, and customizing the templates:

### 1. How to Start It
The function is deployed but currently waits for a Cron trigger (scheduled time). You can start it immediately in two ways:
*   **Method A (One-off Manual Trigger)**: Run a `curl` command from your terminal to wake it up instantly.
*   **Method B (Scheduled)**: Configure the Cron schedule in Supabase so it runs every hour automatically.

### 2. How to Watch It
*   **Supabase Logs**: The primary way to see what's happening (e.g., "Importing Lead: John Doe", "Email Sent") is the **Edge Function Logs** in the Supabase Dashboard.
*   **Google Sheet Updates**: The system is designed to write status updates ("Processing", "Site Ready", "Email Sent") directly back to your Google Sheet. Watching the sheet fill up is the best way to monitor progress.

### 3. How to Suggest Templates
Currently, the `site-builder.ts` service uses a hardcoded URL structure (`https://royal-ascend-site.lovable.app/template?...`). To allow you to suggest templates:
*   **Plan**: I will modify the system to look for a "Template" column in your Google Sheet.
*   **Logic**: If you put "Luxury" in the sheet, it will use a Luxury template URL. If you put "Modern", it uses a Modern one.
*   **Default**: It will fall back to your standard template if the column is empty.

### Implementation Plan
1.  **Add Template Support**: Update `site-builder.ts` and `google-sheets.ts` to read a new `Template` column from the Google Sheet.
2.  **Define Template Map**: Create a simple mapping (e.g., `luxury` -> `template_id_1`, `minimal` -> `template_id_2`) in the code.
3.  **Create "Start" Script**: I will create a simple script `start-campaign.sh` (or just a command for you) so you can trigger the automation manually whenever you want from the terminal.
4.  **Documentation**: Add a "Monitoring & Control" section to the README.

I will start by updating the code to support multiple templates, then give you the command to kick it off.
