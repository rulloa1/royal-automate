-- Fix voice_conversations RLS policies - restrict to authenticated users only

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Authenticated users can insert voice conversations" ON public.voice_conversations;
DROP POLICY IF EXISTS "Authenticated users can update voice conversations" ON public.voice_conversations;
DROP POLICY IF EXISTS "Only authenticated users can view voice conversations" ON public.voice_conversations;
DROP POLICY IF EXISTS "Public can insert voice conversations" ON public.voice_conversations;

-- Create properly restricted policies for authenticated users only
-- SELECT: Only authenticated users can view conversations
CREATE POLICY "Authenticated users can view voice conversations"
ON public.voice_conversations
FOR SELECT
TO authenticated
USING (true);

-- INSERT: Only authenticated users can create conversations  
CREATE POLICY "Authenticated users can insert voice conversations"
ON public.voice_conversations
FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE: Only authenticated users can update conversations
CREATE POLICY "Authenticated users can update voice conversations"
ON public.voice_conversations
FOR UPDATE
TO authenticated
USING (true);