-- Create leads table for campaign automation

-- 1. Create ENUM if not exists
DO $$ BEGIN
    CREATE TYPE lead_status AS ENUM (
        'new', 
        'processing', 
        'enriched', 
        'site_built', 
        'outreach_active', 
        'responded', 
        'converted', 
        'failed'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Table if not exists
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    agent_name TEXT NOT NULL
);

-- 3. Add Columns (Idempotent)
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS brokerage TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS city TEXT;

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS status lead_status DEFAULT 'new';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS error_message TEXT;

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS enrichment_data JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS website_deploy_id TEXT;

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS outreach_stage INTEGER DEFAULT 0;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS last_contacted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS next_follow_up_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS email_thread_id TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS outreach_logs JSONB[] DEFAULT ARRAY[]::JSONB[];
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS google_sheet_row_index INTEGER;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS preferred_template TEXT;

-- 4. Add Indexes (Idempotent)
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_next_follow_up ON public.leads(next_follow_up_at);

-- 5. Trigger (Idempotent)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- 6. RLS Policies
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    CREATE POLICY "Enable read access for authenticated users" ON public.leads
        FOR SELECT TO authenticated USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Enable insert access for authenticated users" ON public.leads
        FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Enable update access for authenticated users" ON public.leads
        FOR UPDATE TO authenticated USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
