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
  summary text,
  military_structure text,
  canon canon_status not null default 'canon',
  verified boolean not null default false
);

create table clans (
  id serial primary key,
  slug text unique not null,
  name text not null,
  origin text,
  symbol_desc text,
  homeland text,
  summary text,
  history text,
  village_id int references villages(id),
  canon canon_status not null default 'canon',
  verified boolean not null default false
);

create table organizations (
  id serial primary key,
  slug text unique not null,
  name text not null,
  summary text,
  objectives text,
  structure text,
  symbol_desc text,
  canon canon_status not null default 'canon',
  verified boolean not null default false
);

create table story_arcs (
  id serial primary key,
  slug text unique not null,
  title text not null,
  series series_kind not null,
  episode_start int,
  episode_end int,
  chapter_start int,
  chapter_end int,
  summary text,
  canon canon_status not null default 'canon',
  verified boolean not null default false
);

create table characters (
  id serial primary key,
  slug text unique not null,
  full_name text not null,
  first_name text,
  nicknames text[] default '{}',
  gender text,
  birthday text,
  height_cm numeric,
  weight_kg numeric,
  blood_type text,
  occupation text,
  status text,
  village_id int references villages(id),
  clan_id int references clans(id),
  rank text,
  nature_types text[] default '{}',
  fighting_style text,
  summary text,
  biography jsonb default '{}',     -- {childhood, academy, genin, chunin, jonin, events, battles, development}
  trivia text[] default '{}',
  has_spoilers boolean not null default false,
  image_url text,
  image_license text,               -- must be filled for any non-null image_url
  canon canon_status not null default 'canon',
  verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index characters_name_trgm on characters using gin (full_name gin_trgm_ops);

create table teams (
  id serial primary key,
  slug text unique not null,
  name text not null,
  sensei_id int references characters(id),
  village_id int references villages(id),
  summary text,
  canon canon_status not null default 'canon',
  verified boolean not null default false
);

create table team_members (
  team_id int references teams(id) on delete cascade,
  character_id int references characters(id) on delete cascade,
  primary key (team_id, character_id)
);

create table organization_members (
  organization_id int references organizations(id) on delete cascade,
  character_id int references characters(id) on delete cascade,
  role text,
  primary key (organization_id, character_id)
);

create table village_leaders (
  village_id int references villages(id) on delete cascade,
  character_id int references characters(id) on delete cascade,
  title text default 'Kage',
  ordinal int,                      -- 1st, 2nd, ...
  is_current boolean not null default false,
  primary key (village_id, character_id, title)
);

create table jutsu (
  id serial primary key,
  slug text unique not null,
  name text not null,               -- English name
  japanese_name text,               -- only when verified
  romaji text,
  category jutsu_category not null,
  rank text,
  nature text,
  description text,
  first_appearance text,
  canon canon_status not null default 'canon',
  verified boolean not null default false
);

create table character_jutsu (
  character_id int references characters(id) on delete cascade,
  jutsu_id int references jutsu(id) on delete cascade,
  primary key (character_id, jutsu_id)
);

create table clan_jutsu (
  clan_id int references clans(id) on delete cascade,
  jutsu_id int references jutsu(id) on delete cascade,
  primary key (clan_id, jutsu_id)
);

create table episodes (
  id serial primary key,
  series series_kind not null,
  number int not null,
  title text not null,
  japanese_title text,
  air_date date,
  arc_id int references story_arcs(id),
  summary text,                     -- original wording only
  manga_adaptation text,            -- 'adapted' | 'partially' | 'anime_original'
  canon canon_status not null default 'canon',
  verified boolean not null default false,
  unique (series, number)
);

create table episode_characters (
  episode_id int references episodes(id) on delete cascade,
  character_id int references characters(id) on delete cascade,
  primary key (episode_id, character_id)
);

create table episode_jutsu (
  episode_id int references episodes(id) on delete cascade,
  jutsu_id int references jutsu(id) on delete cascade,
  primary key (episode_id, jutsu_id)
);

create table movies (
  id serial primary key,
  slug text unique not null,
  title text not null,
  series series_kind not null,
  release_date date,
  summary text,
  timeline_placement text,
  poster_url text,
  poster_license text,
  canon canon_status not null default 'movie_only',
  verified boolean not null default false
);

create table movie_characters (
  movie_id int references movies(id) on delete cascade,
  character_id int references characters(id) on delete cascade,
  is_antagonist boolean not null default false,
  primary key (movie_id, character_id)
);

-- Typed edges between characters. One row per directed edge; the inverse is derived.
create type relationship_kind as enum (
  'parent','sibling','spouse','child','friend','rival','teacher','student','teammate'
);
create table relationships (
  id serial primary key,
  from_character_id int not null references characters(id) on delete cascade,
  to_character_id int not null references characters(id) on delete cascade,
  kind relationship_kind not null,
  note text,
  verified boolean not null default false,
  check (from_character_id <> to_character_id),
  unique (from_character_id, to_character_id, kind)
);

-- Family tree edges (separate from social relationships so trees can be queried recursively).
create table family_connections (
  id serial primary key,
  parent_id int references characters(id) on delete cascade,
  child_id  int references characters(id) on delete cascade,
  parent_role text check (parent_role in ('father','mother','guardian')),
  unique (parent_id, child_id)
);
create table marriages (
  character_a int references characters(id) on delete cascade,
  character_b int references characters(id) on delete cascade,
  primary key (character_a, character_b),
  check (character_a < character_b)
);

create table character_appearances (
  id serial primary key,
  character_id int not null references characters(id) on delete cascade,
  medium text not null check (medium in ('episode','movie','ova','manga')),
  episode_id int references episodes(id),
  movie_id int references movies(id),
  chapter int
);
create unique index character_appearances_uniq on character_appearances
  (character_id, medium, coalesce(episode_id,0), coalesce(movie_id,0), coalesce(chapter,0));

-- Accounts: Supabase Auth owns credentials; this table holds the role only.
create table user_accounts (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role user_role not null default 'user',
  created_at timestamptz not null default now()
);

create table user_favorites (
  user_id uuid references user_accounts(id) on delete cascade,
  entity_type text not null check (entity_type in ('character','clan','village','organization','team','jutsu','episode','movie','arc')),
  entity_id int not null,
  created_at timestamptz not null default now(),
  primary key (user_id, entity_type, entity_id)
);

-- ---------- Row-level security ----------
create or replace function is_editor() returns boolean language sql stable as $$
  select exists (select 1 from user_accounts where id = auth.uid() and role in ('editor','admin'));
$$;

do $$
declare t text;
begin
  foreach t in array array['nations','villages','clans','organizations','story_arcs','characters','teams',
    'team_members','organization_members','village_leaders','jutsu','character_jutsu','clan_jutsu','episodes',
    'episode_characters','episode_jutsu','movies','movie_characters','relationships','family_connections',
    'marriages','character_appearances']
  loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "public read" on %I for select using (true)', t);
    execute format('create policy "editors write" on %I for all using (is_editor()) with check (is_editor())', t);
  end loop;
end $$;

alter table user_accounts enable row level security;
create policy "self read" on user_accounts for select using (id = auth.uid());
-- Role changes only through the service role (server side), never from the browser.

alter table user_favorites enable row level security;
create policy "own favorites" on user_favorites for all using (user_id = auth.uid()) with check (user_id = auth.uid());
