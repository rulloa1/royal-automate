# Automated Website Generation & Sales Outreach System

This system automates the process of finding real estate agent leads, enriching their data, building personalized websites, and sending a multi-stage sales email sequence.

## Architecture

- **Supabase Database**: Stores `leads` state and logs.
- **Supabase Edge Functions**: Runs the logic (`campaign-orchestrator`).
- **Google Sheets**: Acts as the input source and high-level dashboard.

## Setup Instructions

### 1. Database Migration
Run the migration file `supabase/migrations/20260109000000_create_leads_table.sql` to create the required tables.
```bash
npx supabase db push
```

### 2. Environment Variables
Set the following secrets in your Supabase project (Dashboard > Settings > Edge Functions).
For the Google Sheet ID, use: `163IHmrJmhEn5x2sfi1PTMG5wavtdr5QiJq5tR_mgfXA`

| Variable | Description |
|----------|-------------|
| `GOOGLE_SHEET_ID` | `163IHmrJmhEn5x2sfi1PTMG5wavtdr5QiJq5tR_mgfXA` |
| `GOOGLE_SERVICE_ACCOUNT` | The full JSON content of your Google Service Account key |
| `FIRECRAWL_API_KEY` | (Optional) API key for Firecrawl scraping |
| `WEBFLOW_API_TOKEN` | (Optional) Webflow API Token |
| `WEBFLOW_AGENTS_COLLECTION_ID` | (Optional) CMS Collection ID for Agents |
| `RESEND_API_KEY` | API Key for Resend email service |
| `SENDER_EMAIL` | Email address to send from (e.g., `roy@royscompany.com`) |

### 3. Google Sheet Setup
Ensure your Google Sheet has the following headers:
- `Agent Name` (or `Name`)
- `Email`
- `Phone`
- `LinkedIn` (or `Website URL`)
- `status` (System updates this column)
- `website_link` (System populates this)

**Share the sheet** with the email address found in your `GOOGLE_SERVICE_ACCOUNT` JSON file (e.g., `service-account@project.iam.gserviceaccount.com`).

### 4. Deploy Function
Deploy the orchestrator function:
```bash
npx supabase functions deploy campaign-orchestrator
```

### 5. Schedule Automation (Cron)
To run this automatically every hour, go to Supabase Dashboard > Edge Functions > `campaign-orchestrator` > Schedule, or add this to your `supabase/config.toml` (if using local config):

```toml
[functions.campaign-orchestrator]
schedule = "0 * * * *" # Every hour
```

## How It Works

1.  **Ingestion**: The function checks the Sheet for rows where `status` is empty or "New Lead". It imports them into the DB.
2.  **Enrichment**: It attempts to scrape the LinkedIn/Website URL to find Bio, Headshot, etc.
3.  **Site Build**: It uses Webflow API (or falls back to a dynamic URL) to generate a personalized site link.
4.  **Outreach**:
    *   Sends "Initial Email" immediately after site build.
    *   Sends "Follow-up 1" after 3 days.
    *   Sends "Follow-up 2" after 7 days.
    *   Sends "Final Notice" after 10 days.
5.  **Sync**: Updates the Google Sheet with the generated link and status.

## Troubleshooting

- **Check Logs**: View logs in Supabase Dashboard > Edge Functions.
- **Missing Data**: If scraping fails, the system uses mock data or flags the lead. Check the `error_message` column in the `leads` table.
