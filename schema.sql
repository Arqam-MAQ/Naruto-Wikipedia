-- SHINOBI ARCHIVE — PostgreSQL schema (Supabase compatible)
-- Every content table carries `canon_status` and `verified` so unverified
-- data is never presented as fact.

create extension if not exists pg_trgm;

create type canon_status as enum ('canon', 'anime_original', 'movie_only', 'game_only', 'fan_created', 'disputed');
create type user_role as enum ('user', 'editor', 'admin');
create type series_kind as enum ('naruto', 'shippuden', 'boruto', 'ova', 'movie');
create type jutsu_category as enum (
  'ninjutsu','genjutsu','taijutsu','dojutsu','senjutsu','kenjutsu',
  'medical_ninjutsu','space_time_ninjutsu','sealing','forbidden','kekkei_genkai','kekkei_tota'
);

-- Shared columns are repeated per table (no inheritance) for Supabase RLS simplicity.

create table nations (
  id serial primary key,
  slug text unique not null,
  name text not null,
  summary text,
  canon canon_status not null default 'canon',
  verified boolean not null default false
);

create table villages (
  id serial primary key,
  slug text unique not null,
  name text not null,
  japanese_name text,
  nation_id int references nations(id),
  is_great_nation boolean not null default false,
  location text,
  map_x numeric,            -- 0-100, for the clickable world map
  map_y numeric,