-- Make leads table backend-only by dropping all client-facing RLS policies
-- Edge Functions use service role which bypasses RLS, so they will still work

-- Drop all existing policies on leads table
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can update leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can delete leads" ON public.leads;
DROP POLICY IF EXISTS "Public can insert leads via chat widget" ON public.leads;
DROP POLICY IF EXISTS "Only authenticated users can view leads" ON public.leads;

-- With RLS enabled and NO policies:
-- ✅ Anon users: NO access (secure)
-- ✅ Authenticated users: NO access (secure)
-- ✅ Service role: Full access (bypasses RLS - Edge Functions work)
-- ✅ Deny-by-default security model