
const apiKey = "fc-89e83d49ef6a4a8c96fc7d16ac7714d0";

async function testFirecrawl() {
  console.log("Testing Firecrawl API...");
  try {
    const response = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: "real estate agents in Miami",
        limit: 1,
        pageOptions: {
            fetchPageContent: false
        }
      })
    });

    const text = await response.text();
    console.log("Status:", response.status);
    console.log("Response:", text);
  } catch (error) {
    console.error("Error:", error);
  }
}

testFirecrawl();
