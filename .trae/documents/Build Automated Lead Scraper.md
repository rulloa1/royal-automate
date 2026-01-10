To automatically scrape new real estate leads and add them to your Google Sheet every 15 minutes, I will create a new Supabase Edge Function called `lead-scraper`.

### **Strategy: How We Get Leads**
We can't just "scrape the internet" randomly. We need a targeted source. I recommend two approaches (we can implement one or both):
1.  **Google Maps API (Places)**: Search for "Real Estate Agencies in [City]" to get names, phone numbers, and websites. (Reliable, high quality).
2.  **Firecrawl / Search Scraping**: Perform Google searches like "Realtor in [City]" and extract contact info from results.

**My Recommendation**: **Google Maps API** is the most robust way to get valid business leads (Agents/Brokerages) with phone numbers and websites automatically.

### **Implementation Plan**
1.  **Create Function**: `supabase/functions/lead-scraper`.
2.  **Logic**:
    *   Accept a list of target cities (e.g., "Houston, TX", "Austin, TX") either from config or the Sheet itself.
    *   Query Google Places API for "Real Estate Agents".
    *   Filter out results already in your database (deduplication).
    *   **Write to Google Sheet**: Append new rows to your existing sheet so the *other* automation (`campaign-orchestrator`) can pick them up.
3.  **Scheduling**: Set a Cron trigger for every 15 minutes.

### **Prerequisites**
*   **Google Maps API Key**: You will need to enable the "Places API" in your Google Cloud Console (same place you got the Service Account) and get an API Key.

I will start by creating the scaffold for the `lead-scraper` function.
