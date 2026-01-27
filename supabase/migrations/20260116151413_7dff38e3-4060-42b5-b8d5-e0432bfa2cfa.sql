-- Add RLS policies for leads table
-- Authenticated users can view all leads
CREATE POLICY "Authenticated users can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- Authenticated users can insert leads
CREATE POLICY "Authenticated users can insert leads"
ON public.leads
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated users can update leads
CREATE POLICY "Authenticated users can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (true);

-- Authenticated users can delete leads
CREATE POLICY "Authenticated users can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (true);

-- Allow anonymous/public inserts for chat widget leads (no auth required for lead capture)
CREATE POLICY "Public can insert leads via chat widget"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);