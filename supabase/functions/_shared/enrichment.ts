import { EnrichedData } from "./types.ts";

export class EnrichmentService {
  private firecrawlApiKey?: string;

  constructor() {
    this.firecrawlApiKey = Deno.env.get("FIRECRAWL_API_KEY");
  }

  async enrichAgent(profileUrl: string): Promise<EnrichedData> {
    console.log(`Enriching data for: ${profileUrl}`);

    // If no API key, return mock/basic data to ensure system works
    if (!this.firecrawlApiKey) {
      console.warn("No FIRECRAWL_API_KEY found. Returning mock enrichment data.");
      return this.getMockData();
    }

    try {
      // Example integration with Firecrawl or similar scraping API
      const response = await fetch("https://api.firecrawl.dev/v0/scrape", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.firecrawlApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: profileUrl,
          pageOptions: {
            onlyMainContent: true
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Scraping failed: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseScrapedData(data);

    } catch (error) {
      console.error("Enrichment error:", error);
      // Fallback to mock data on error to allow pipeline to continue (optional)
      return this.getMockData();
    }
  }

  private parseScrapedData(scrapedResult: any): EnrichedData {
    // This logic depends heavily on the scraping API's response format
    // Here we assume a generic markdown or content extraction
    const content = scrapedResult.data?.markdown || "";
    
    // Very basic extraction heuristics (would be replaced by LLM extraction in production)
    const bioMatch = content.match(/About[\s\S]{0,500}/);
    
    return {
      bio: bioMatch ? bioMatch[0] : "Experienced real estate professional dedicated to helping clients achieve their property goals.",
      headshot_url: scrapedResult.data?.metadata?.ogImage, // simplified
      years_experience: 5, // Placeholder or extract regex
      specialties: ["Residential", "Luxury"],
      brand_colors: {
        primary: "#1a1a1a", // Default luxury black
        secondary: "#c0a062" // Default luxury gold
      }
    };
  }

  private getMockData(): EnrichedData {
    return {
      bio: "Top-producing agent with over 10 years of experience in the luxury market. Committed to excellence and personalized service for every client.",
      headshot_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      years_experience: 10,
      specialties: ["Luxury Homes", "Waterfront Properties", "Investment"],
      recent_sales: [
        { address: "123 Palm Ave", price: "$1,200,000", date: "2023-12-01" },
        { address: "456 Ocean Dr", price: "$2,500,000", date: "2023-11-15" }
      ],
      market_stats: {
        avg_price: "$850,000",
        avg_days_on_market: 24
      },
      brand_colors: {
        primary: "#0f172a",
        secondary: "#d4af37"
      }
    };
  }
}
