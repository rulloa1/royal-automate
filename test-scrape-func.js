
import fetch from 'node-fetch';

const SUPABASE_URL = "https://pshjpksmzvwyzugrbmiu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaGpwa3NtenZ3eXp1Z3JibWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1ODk5MDUsImV4cCI6MjA4MzE2NTkwNX0.HA4w-ULKS1XSy2IiW8vyfcoPHXDM5qVp6MPYoDe490g";

// Random UUID - this will likely fail DB insert, but should pass Firecrawl
const TEST_USER_ID = "00000000-0000-0000-0000-000000000000"; 
const CITY = "Miami";

async function testFunction() {
    console.log(`Testing scrape-leads for ${CITY}...`);
    
    try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/scrape-leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
                city: CITY,
                userId: TEST_USER_ID
            })
        });

        const status = response.status;
        console.log(`Status: ${status}`);
        
        const text = await response.text();
        console.log("Response Body:");
        console.log(text);
        
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

testFunction();
