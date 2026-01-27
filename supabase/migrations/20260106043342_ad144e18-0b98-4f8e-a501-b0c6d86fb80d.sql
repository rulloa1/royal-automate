-- Drop the existing restrictive policy that doesn't properly protect the table
DROP POLICY IF EXISTS "Allow service role full access to leads" ON public.leads;

-- Create a policy that denies all access by default for SELECT
-- Only service role (used by Edge Functions) can read leads
CREATE POLICY "Service role can read leads"
ON public.leads
FOR SELECT
TO service_role
USING (true);

-- Service role can insert leads (for Edge Functions)
CREATE POLICY "Service role can insert leads"
ON public.leads
FOR INSERT
TO service_role
WITH CHECK (true);

-- Service role can update leads (for Edge Functions)
CREATE POLICY "Service role can update leads"
ON public.leads
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Service role can delete leads (for Edge Functions)
CREATE POLICY "Service role can delete leads"
ON public.leads
FOR DELETE
TO service_role
USING (true);