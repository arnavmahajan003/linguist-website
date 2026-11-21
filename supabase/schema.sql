-- «Лингвист» — Supabase schema for website enquiries.
-- Run this in the Supabase SQL Editor (Phase 3) after creating the project.
-- Security model:
--   * Anonymous visitors can only INSERT a valid enquiry (consent = true).
--   * Anonymous visitors CANNOT read, update or delete anything.
--   * Only signed-in users (Supabase Auth) can read and update enquiries.
--   * The frontend uses only the public anon key. The service-role key is
--     never used by this project and must never be put in code or the repo.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  phone text not null check (char_length(phone) between 5 and 40),
  course text not null default 'Не выбран' check (char_length(course) <= 120),
  message text check (char_length(message) <= 2000),
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'done'))
);

alter table public.enquiries enable row level security;

-- Visitors may submit an enquiry, but only a complete one with consent.
drop policy if exists "visitors can submit enquiry" on public.enquiries;
create policy "visitors can submit enquiry"
  on public.enquiries
  for insert
  to anon
  with check (consent = true and status = 'new');

-- Signed-in administrator may read enquiries.
drop policy if exists "admin can read enquiries" on public.enquiries;
create policy "admin can read enquiries"
  on public.enquiries
  for select
  to authenticated
  using (true);

-- Signed-in administrator may update status.
drop policy if exists "admin can update enquiries" on public.enquiries;
create policy "admin can update enquiries"
  on public.enquiries
  for update
  to authenticated
  using (true)
  with check (true);

-- No delete policy for anyone: enquiries cannot be deleted via the API.
-- No select/update/insert policy for anon beyond the insert above,
-- so visitors can never see other visitors' enquiries.
