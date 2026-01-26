-- Create voice_conversations table for tracking voice chat sessions
CREATE TABLE public.voice_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  transcript JSONB DEFAULT '[]'::jsonb,
  full_transcript TEXT,
  duration_seconds INTEGER,
  status TEXT DEFAULT 'active',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.voice_conversations ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users (admins viewing conversations)
CREATE POLICY "Authenticated users can view voice conversations"
ON public.voice_conversations FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert voice conversations"
ON public.voice_conversations FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update voice conversations"
ON public.voice_conversations FOR UPDATE TO authenticated USING (true);

-- Allow anonymous inserts for public voice widget
CREATE POLICY "Public can insert voice conversations"
ON public.voice_conversations FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous updates for their own session (to end calls)
CREATE POLICY "Public can update own voice conversations"
ON public.voice_conversations FOR UPDATE TO anon USING (true);

-- Create index for faster lookups
CREATE INDEX idx_voice_conversations_session_id ON public.voice_conversations(session_id);
CREATE INDEX idx_voice_conversations_lead_id ON public.voice_conversations(lead_id);

-- Enable realtime for voice conversations
ALTER PUBLICATION supabase_realtime ADD TABLE public.voice_conversations;