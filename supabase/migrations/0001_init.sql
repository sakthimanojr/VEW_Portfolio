-- Vinayaga Engineering Works — initial schema
-- Run this in the Supabase SQL editor, or via `supabase db push`.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────
-- Drop existing tables (safe re-run)
-- ─────────────────────────────────────────────

drop table if exists public.gallery_images cascade;
drop table if exists public.gallery_categories cascade;

-- ─────────────────────────────────────────────
-- Tables
-- ─────────────────────────────────────────────

create table public.gallery_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  cover_image_id uuid, -- FK added after gallery_images exists
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.gallery_categories (id) on delete cascade,
  cloudinary_public_id text not null,
  image_url text not null,
  width integer,
  height integer,
  sort_order integer not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.gallery_categories
  add constraint gallery_categories_cover_image_fk
  foreign key (cover_image_id) references public.gallery_images (id) on delete set null;

create index if not exists gallery_images_category_id_idx on public.gallery_images (category_id);
create index if not exists gallery_images_sort_order_idx on public.gallery_images (category_id, sort_order);

-- ─────────────────────────────────────────────
-- Seed the 5 fixed service/gallery categories
-- ─────────────────────────────────────────────

insert into public.gallery_categories (name, slug, description, sort_order)
values
  ('Industrial & Structural', 'industrial-structural',
   'Industrial sheds, roofing sheds, structural steel fabrication and machine frames.', 1),
  ('Residential & Architectural', 'residential-architectural',
   'Pergolas, rooftop sit-outs, staircases, railings, gates and grills.', 2),
  ('Custom Fabrication', 'custom-fabrication',
   'Custom and special fabrication projects.', 3),
  ('MS / SS / GI Fabrication', 'ms-ss-gi-fabrication',
   'Precision fabrication in Mild Steel, Stainless Steel and GI.', 4),
  ('Installation & Erection', 'installation-erection',
   'On-site installation, erection and completed structures.', 5)
on conflict (slug) do nothing;

-- ─────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────

alter table public.gallery_categories enable row level security;
alter table public.gallery_images enable row level security;

-- Public (anon + authenticated) read-only access.
create policy "Public read categories"
  on public.gallery_categories for select
  using (true);

create policy "Public read images"
  on public.gallery_images for select
  using (true);

-- Authenticated (admin) users may fully manage rows.
-- Every Supabase Auth user created for this project is treated as an
-- admin — only create accounts for the business owner / trusted staff.
create policy "Admins insert categories"
  on public.gallery_categories for insert
  to authenticated
  with check (true);

create policy "Admins update categories"
  on public.gallery_categories for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins delete categories"
  on public.gallery_categories for delete
  to authenticated
  using (true);

create policy "Admins insert images"
  on public.gallery_images for insert
  to authenticated
  with check (true);

create policy "Admins update images"
  on public.gallery_images for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins delete images"
  on public.gallery_images for delete
  to authenticated
  using (true);
