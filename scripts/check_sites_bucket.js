
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pshjpksmzvwyzugrbmiu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaGpwa3NtenZ3eXp1Z3JibWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1ODk5MDUsImV4cCI6MjA4MzE2NTkwNX0.HA4w-ULKS1XSy2IiW8vyfcoPHXDM5qVp6MPYoDe490g';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkBucket() {
  console.log('Checking bucket "sites"...');
  const { data, error } = await supabase.storage.from('sites').list();

  if (error) {
    console.error('Error listing files:', error);
    return;
  }

  if (data.length === 0) {
    console.log('Bucket "sites" is empty.');
  } else {
    console.log(`Found ${data.length} files:`);
    data.forEach(file => {
      console.log(`- ${file.name} (Created: ${file.created_at})`);
      const { data: { publicUrl } } = supabase.storage.from('sites').getPublicUrl(file.name);
      console.log(`  URL: ${publicUrl}`);
    });
  }
}

checkBucket();
