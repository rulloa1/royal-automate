-- Create a public bucket for websites
insert into storage.buckets (id, name, public)
values ('sites', 'sites', true)
on conflict (id) do nothing;

-- Set up RLS policies for the bucket
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'sites' );

create policy "Authenticated Upload"
  on storage.objects for insert
  with check ( bucket_id = 'sites' );
