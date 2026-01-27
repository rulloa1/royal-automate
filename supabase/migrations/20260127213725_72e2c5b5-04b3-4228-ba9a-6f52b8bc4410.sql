-- Fix voice_conversations security: restrict access to authenticated users only

-- Drop the problematic public UPDATE policy
DROP POLICY IF EXISTS "Public can update own voice conversations" ON public.voice_conversations;

-- Drop existing SELECT policy and recreate with explicit authenticated target
DROP POLICY IF EXISTS "Authenticated users can view voice conversations" ON public.voice_conversations;

-- Create explicit SELECT policy for authenticated users only
CREATE POLICY "Only authenticated users can view voice conversations"
  ON public.voice_conversations
  FOR SELECT
  TO authenticated
  USING (true);

-- Note: Keeping "Public can insert voice conversations" for the voice widget to create sessions
-- Note: Keeping "Authenticated users can update/insert" for backend operations