-- Create leads table for chat-captured leads
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  business_name TEXT,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  interests TEXT[],
  pain_points TEXT,
  qualification_score INTEGER DEFAULT 0,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'new',
  conversation_summary TEXT,
  source TEXT DEFAULT 'chat_widget',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow edge functions to insert leads (using service role)
CREATE POLICY "Allow service role full access to leads"
ON public.leads
FOR ALL
USING (true)
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_leads_session_id ON public.leads(session_id);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_leads_updated_at();