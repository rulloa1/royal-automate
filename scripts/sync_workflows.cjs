const fs = require('fs');
const path = require('path');

const WORKFLOWS_DIR = './workflows';
const N8N_HOST = 'http://localhost:5680';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZjVjNmIyNy05ZjQ3LTQ2MDQtOGMyZC0wNmM2NjY4ZjUzZDIiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY4NTE0MjAyfQ.tr0-f4kJzw3CJ05N1FGTGQ76b74XbNhoZZgiGoxBZfE';

async function main() {
  // 1. Get existing workflows
  console.log('Fetching existing workflows...');
  const existingWorkflows = await fetch(`${N8N_HOST}/api/v1/workflows`, {
    headers: { 'X-N8N-API-KEY': API_KEY }
  }).then(res => res.json());

  if (!existingWorkflows.data) {
    console.error('Failed to fetch workflows:', existingWorkflows);
    return;
  }

  const workflowMap = new Map(existingWorkflows.data.map(w => [w.name, w.id]));
  console.log(`Found ${workflowMap.size} existing workflows.`);

  // 2. Read local workflow files
  const files = fs.readdirSync(WORKFLOWS_DIR).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(WORKFLOWS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    let workflow;
    
    try {
      workflow = JSON.parse(content);
    } catch (e) {
      console.error(`Error parsing ${file}:`, e.message);
      continue;
    }

    if (!workflow.name) {
      console.error(`Skipping ${file}: No name property found.`);
      continue;
    }

    // Inject default settings if missing
    if (!workflow.settings) {
      workflow.settings = { executionOrder: 'v1' };
    }

    // 3. Create or Update
    if (workflowMap.has(workflow.name)) {
      const id = workflowMap.get(workflow.name);
      console.log(`Updating workflow: ${workflow.name} (${id})...`);
      
      const res = await fetch(`${N8N_HOST}/api/v1/workflows/${id}`, {
        method: 'PUT',
        headers: { 
          'X-N8N-API-KEY': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workflow)
      });
      
      if (res.ok) console.log(`✅ Updated ${workflow.name}`);
      else console.error(`❌ Failed to update ${workflow.name}:`, await res.text());

    } else {
      console.log(`Creating workflow: ${workflow.name}...`);
      
      const res = await fetch(`${N8N_HOST}/api/v1/workflows`, {
        method: 'POST',
        headers: { 
          'X-N8N-API-KEY': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workflow)
      });

      if (res.ok) console.log(`✅ Created ${workflow.name}`);
      else console.error(`❌ Failed to create ${workflow.name}:`, await res.text());
    }
  }
}

main().catch(console.error);
