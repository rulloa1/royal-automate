-- Fix leads table security: ensure SELECT is restricted to authenticated users only
-- Drop any existing SELECT policy that may not properly target authenticated role
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;

-- Create explicit policy restricting SELECT to authenticated users only
-- Anon users will NOT be able to read leads data
CREATE POLICY "Only authenticated users can view leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Note: The existing INSERT policy for chat widget (anon) is intentional
-- to allow the public chat widget to capture leads