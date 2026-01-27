
const SUPABASE_URL = 'https://pshjpksmzvwyzugrbmiu.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaGpwa3NtenZ3eXp1Z3JibWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1ODk5MDUsImV4cCI6MjA4MzE2NTkwNX0.HA4w-ULKS1XSy2IiW8vyfcoPHXDM5qVp6MPYoDe490g';

async function testProvision() {
  const url = `${SUPABASE_URL}/functions/v1/provision-site`;
  
  const payload = {
    agent_data: {
      agent_name: "Test Agent Script",
      brokerage: "Script Brokerage",
      city_area: "Script City",
      bio: "Created via test script",
      email: "script@test.com",
      phone: "9998887777"
    },
    save_to_storage: true
  };

  console.log('Sending request to:', url);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Website URL:', data.website_url); // Log this specifically
    // console.log('Response:', JSON.stringify(data, null, 2)); // Comment out full response to avoid noise
  } catch (error) {
    console.error('Error:', error);
  }
}

testProvision();
