-- Rename agent_name to business_name if it exists, or create business_name
DO $$
BEGIN
    IF EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'agent_name') THEN
        ALTER TABLE public.leads RENAME COLUMN agent_name TO business_name;
    ELSE
        ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS business_name TEXT;
    END IF;
END $$;

-- Add industry column
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS industry TEXT;

-- Ensure website_url is used (we will map 'website' to 'website_url' in the function, but let's check column name)
-- The table has 'website_url'. The frontend might be using 'website' which implies a mismatch there too?
-- Let's check LeadsTable.tsx again: lead.website (line 132).
-- If the type is generated from DB, and DB has website_url, then lead.website would be error unless mapped.
-- Wait, the error said "Could not find 'industry'". It didn't complain about 'business_name' yet because it failed fast.

-- Let's just add the missing columns.
