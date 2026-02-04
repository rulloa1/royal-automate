-- Fix overly permissive RLS policies on voice_conversations table
DROP POLICY IF EXISTS "Authenticated users can view voice conversations" ON public.voice_conversations;
DROP POLICY IF EXISTS "Authenticated users can insert voice conversations" ON public.voice_conversations;
DROP POLICY IF EXISTS "Authenticated users can update voice conversations" ON public.voice_conversations;

-- Create proper restrictive policies (admin only for now)
CREATE POLICY "Admins can view voice conversations"
ON public.voice_conversations FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert voice conversations"
ON public.voice_conversations FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update voice conversations"
ON public.voice_conversations FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));