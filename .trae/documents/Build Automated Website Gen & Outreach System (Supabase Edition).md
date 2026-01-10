I will build a robust, code-first automation system using Supabase Edge Functions and Database, replacing the fragile n8n/Apps Script setup. This ensures reliable state tracking for follow-ups and complex API integrations.

### Architecture
1.  **Supabase Database (`leads` table)**:
    *   Acts as the "Source of Truth" for automation state (e.g., "Enriched", "Site Built", "Email 1 Sent", "Follow-up 1 Pending").
    *   Syncs *from* Google Sheets (Trigger) and writes status *back* to Google Sheets (Reporting).
2.  **Supabase Edge Functions**:
    *   `campaign-orchestrator`: A master function (triggered via Cron) that manages the lifecycle:
        1.  **Ingest**: Reads new rows from Google Sheet -> Saves to DB.
        2.  **Enrich**: Calls scraping services for agent data.
        3.  **Build**: Calls Relume/Webflow/Builder.io APIs to generate the site.
        4.  **Outreach**: Sends scheduled emails (Initial, Day 3, Day 7, Day 10).

### Implementation Steps

#### Phase 1: Foundation & Database
1.  **Create Migration**: Define a `leads` table with columns for:
    *   `agent_profile` (JSON: bio, headshot, stats).
    *   `campaign_status` (Enum: NEW, ENRICHED, BUILT, CONTACTED, RESPONDED).
    *   `outreach_log` (JSON array: timestamps of sent emails).
    *   `generated_site_url`.
2.  **Setup Shared Modules (`supabase/functions/_shared/`)**:
    *   `google-sheets.ts`: Service to read/write to the user's spreadsheet.
    *   `types.ts`: Define the `Lead` and `AgentProfile` interfaces.

#### Phase 2: Core Services
3.  **Data Enrichment Service (`enrichment.ts`)**:
    *   Implement logic to extract data from provided URLs.
    *   (Note: I will implement the *structure* for scraping; you may need to plug in a specific scraping API key like ZenRows or Firecrawl if direct fetching is blocked).
4.  **Website Generation Service (`site-builder.ts`)**:
    *   Implement the `generateWebsite(profile)` function.
    *   Integrate Webflow/Builder.io API clients to clone a template and inject the agent's enriched data (Bio, Photos, Colors).
5.  **Email & Follow-up Service (`outreach.ts`)**:
    *   Implement `sendEmail()` using a provider (Resend/SendGrid/Gmail).
    *   Implement `checkFollowUps()` logic to identify leads needing Day 3/7/10 emails.

#### Phase 3: The Orchestrator
6.  **Develop `campaign-orchestrator` Function**:
    *   Tie all services together.
    *   Handle error logging (updating the Sheet with "Error: Missing Data").
    *   Ensure idempotency (don't build the same site twice).

#### Phase 4: Deployment & Config
7.  **Environment Variables**: Define required keys (`SHEET_ID`, `WEBFLOW_TOKEN`, `OPENAI_KEY` for bio generation, etc.).
8.  **Cron Schedule**: Configure the function to run hourly.

### Deliverables
*   Fully typed TypeScript codebase in `supabase/functions`.
*   SQL Migration file.
*   `README_CAMPAIGN.md` documenting how to configure the API keys and sheet.
