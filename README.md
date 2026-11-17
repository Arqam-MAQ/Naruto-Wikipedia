# SHINOBI ARCHIVE

Unofficial fan-made Naruto universe encyclopedia. Not affiliated with, endorsed by, or connected to the creators or rights holders of Naruto. All summaries are original wording; no manga text, scripts, subtitles or dialogue are included.

**Status: Stage 1 of 5.** The site runs on a small *sample dataset* (10 characters, 6 clans, 9 villages, 4 organizations, 5 teams, 6 jutsu, 4 arcs). Every record is `verified: false` and labeled as a sample in the UI.

## Folder structure

```
shinobi-archive/
├── web/                  static site, no build step
│   ├── index.html
│   ├── css/styles.css    dark default + light theme
│   └── js/
│       ├── app.js        router, pages, autocomplete, favorites
│       ├── search.js     global search index + scoring
│       └── data.js       sample dataset (mirrors the SQL schema)
├── db/
│   ├── schema.sql        PostgreSQL / Supabase schema + RLS
│   └── seed.sql          GENERATED from data.js
├── scripts/build-seed.mjs
├── .env.example
└── README.md
```

## Run locally

```bash
cd web && python3 -m http.server 8000     # or: npx serve web
# open http://localhost:8000
```

Regenerate the SQL seed after editing `web/js/data.js`: `node scripts/build-seed.mjs`

## Database setup (Supabase)

1. Create a Supabase project.
2. SQL editor: run `db/schema.sql`, then `db/seed.sql`.
3. Copy `.env.example` to `.env` and fill in the project URL and anon key.
4. Promote your first admin from the SQL editor (roles are never changeable from the browser):
   `update user_accounts set role = 'admin' where id = '<your auth user id>';`

The anon key is safe in the frontend because Row Level Security restricts writes to editors/admins. The service-role key must only ever live in server-side code.

## Deploy to GitHub Pages

```bash
git init && git add . && git commit -m "SHINOBI ARCHIVE stage 1"
git branch -M main
git remote add origin https://github.com/<you>/shinobi-archive.git
git push -u origin main
```
Repo → Settings → Pages → deploy from branch `main`, folder `/web` (or use a Pages workflow that publishes `web/`). Routing is hash-based, so no server rewrite rules are needed.

## Features

**Done (Stage 1, tested by script, not yet in a browser)**
- Responsive dark/light UI, mobile nav, skip link, reduced-motion support
- Homepage with every requested section, hero search, random character
- Global search with ranking, autocomplete (keyboard navigable), type filters, sorting
- List pages with filter/sort, detail pages with cross-links, spoiler gate on character biographies
- Clickable schematic village map (approximate pin positions)
- Favorites and recently viewed (browser-local)
- Full relational schema with RLS and role model; generated seed

**Pending**
- Stage 2: full character profile sections, clan/village/organization depth
- Stage 3: jutsu name generator, episode, movie and arc pages (needs verified data first)
- Stage 4: family tree, relationship explorer, comparison tools, timeline, quiz
- Stage 5: Supabase auth, admin panel, live DB integration, performance and tests
- Port to React + TypeScript + Tailwind (the requested stack), which needs package installs that were blocked in this environment
- Licensed imagery: emblem avatars are generated SVG; no third-party images are used
