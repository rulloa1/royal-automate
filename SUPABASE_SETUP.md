# Fix "supabaseUrl is required" Error

Your website is missing the connection details for Supabase.

## 1. Get your API Key
1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/tujufrljfolexbdrxsbd
2. Click **Settings** (Gear icon) -> **API**.
3. Copy the **anon** / **public** key.

## 2. Add Environment Variables
**For Lovable / Production:**
Go to your Project Settings -> Secrets / Environment Variables and add these two:

- `VITE_SUPABASE_URL`: `https://pshjpksmzvwyzugrbmiu.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaGpwa3NtenZ3eXp1Z3JibWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1ODk5MDUsImV4cCI6MjA4MzE2NTkwNX0.HA4w-ULKS1XSy2IiW8vyfcoPHXDM5qVp6MPYoDe490g`

**For Local Development:**
Create a file named `.env` in this directory and paste:

```
VITE_SUPABASE_URL=https://pshjpksmzvwyzugrbmiu.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaGpwa3NtenZ3eXp1Z3JibWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1ODk5MDUsImV4cCI6MjA4MzE2NTkwNX0.HA4w-ULKS1XSy2IiW8vyfcoPHXDM5qVp6MPYoDe490g
```
