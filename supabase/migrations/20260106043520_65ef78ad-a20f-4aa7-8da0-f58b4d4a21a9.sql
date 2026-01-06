-- Drop all existing policies on leads table
DROP POLICY IF EXISTS "Deny anon select on leads" ON public.leads;
DROP POLICY IF EXISTS "Deny anon insert on leads" ON public.leads;
DROP POLICY IF EXISTS "Deny anon update on leads" ON public.leads;
DROP POLICY IF EXISTS "Deny anon delete on leads" ON public.leads;
DROP POLICY IF EXISTS "Deny authenticated select on leads" ON public.leads;
DROP POLICY IF EXISTS "Deny authenticated insert on leads" ON public.leads;
DROP POLICY IF EXISTS "Deny authenticated update on leads" ON public.leads;
DROP POLICY IF EXISTS "Deny authenticated delete on leads" ON public.leads;
DROP POLICY IF EXISTS "Allow service role full access to leads" ON public.leads;
DROP POLICY IF EXISTS "Service role can read leads" ON public.leads;
DROP POLICY IF EXISTS "Service role can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Service role can update leads" ON public.leads;
DROP POLICY IF EXISTS "Service role can delete leads" ON public.leads;

-- RLS is already enabled. With no policies, anon and authenticated get NO access.
-- service_role bypasses RLS entirely, so Edge Functions using service_role key still work.
-- This is the most secure configuration for a table only accessed by backend functions.