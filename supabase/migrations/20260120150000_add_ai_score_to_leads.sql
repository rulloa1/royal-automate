ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS ai_score INTEGER DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_leads_ai_score ON public.leads(ai_score);
