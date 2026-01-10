-- Create leads table for campaign automation

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

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Core Identity
  agent_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  linkedin_url TEXT,
  brokerage TEXT,
  city TEXT,
  
  -- State Management
  status lead_status DEFAULT 'new',
  error_message TEXT,
  
  -- Data Storage
  enrichment_data JSONB DEFAULT '{}'::jsonb, -- Bio, headshot, stats, market data
  
  -- Website
  website_url TEXT,
  website_deploy_id TEXT,
  
  -- Outreach
  outreach_stage INTEGER DEFAULT 0, -- 0=None, 1=Initial, 2=FollowUp1, etc.
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  next_follow_up_at TIMESTAMP WITH TIME ZONE,
  email_thread_id TEXT,
  outreach_logs JSONB[] DEFAULT ARRAY[]::JSONB[],
  
  -- Google Sheet Sync
  google_sheet_row_index INTEGER -- To easily update the original sheet
);

-- Add indexes
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_next_follow_up ON public.leads(next_follow_up_at);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- RLS Policies (Assuming service role access mostly, but good practice)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for authenticated users" ON public.leads
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON public.leads
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON public.leads
    FOR UPDATE TO authenticated USING (true);
