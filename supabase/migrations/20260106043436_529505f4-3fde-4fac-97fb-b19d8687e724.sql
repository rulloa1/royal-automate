-- Drop existing policies and recreate with proper access control
DROP POLICY IF EXISTS "Service role can read leads" ON public.leads;
DROP POLICY IF EXISTS "Service role can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Service role can update leads" ON public.leads;
DROP POLICY IF EXISTS "Service role can delete leads" ON public.leads;

-- Explicitly deny anon role any access (PERMISSIVE false = no access)
CREATE POLICY "Deny anon select on leads"
ON public.leads
FOR SELECT
TO anon
USING (false);

CREATE POLICY "Deny anon insert on leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (false);

CREATE POLICY "Deny anon update on leads"
ON public.leads
FOR UPDATE
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny anon delete on leads"
ON public.leads
FOR DELETE
TO anon
USING (false);

-- Explicitly deny authenticated role any access (only service_role should access)
CREATE POLICY "Deny authenticated select on leads"
ON public.leads
FOR SELECT
TO authenticated
USING (false);

CREATE POLICY "Deny authenticated insert on leads"
ON public.leads
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "Deny authenticated update on leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny authenticated delete on leads"
ON public.leads
FOR DELETE
TO authenticated
USING (false);