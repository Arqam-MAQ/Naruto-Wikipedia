import { collections, bySlug, characters, clans, villages, organizations, jutsu, arcs, latest, SAMPLE_NOTICE } from "./data.js";
import { search, suggestions, TYPE_LABEL, INDEX } from "./search.js";

const $ = (s, r = document) => r.querySelector(s);
const main = $("#main");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const href = (type, slug) => `#/${type}/${slug}`;
const link = (type, slug) => { const x = bySlug(type, slug); return x ? `<a href="${href(type, slug)}">${esc(x.name)}</a>` : ""; };
const linkList = (type, slugs) => (slugs || []).map((s) => link(type, s)).filter(Boolean).join("") || '<span class="tag">None in the sample dataset</span>';

/* Generated SVG emblem: always renders, so there are never broken image placeholders. */
function avatar(name, seed = name) {
  let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const hues = [18, 28, 38, 8, 215];
  const hue = hues[h % hues.length], l = hue === 215 ? 22 : 30;
  const initials = name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return `<svg class="avatar" viewBox="0 0 400 300" role="img" aria-label="${esc(name)} emblem"><defs><linearGradient id="g${h}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 70% ${l}%)"/><stop offset="1" stop-color="#0b0e17"/></linearGradient></defs><rect width="400" height="300" fill="url(#g${h})"/><circle cx="200" cy="150" r="92" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2"/><circle cx="200" cy="150" r="74" fill="none" stroke="rgba(242,193,78,.35)" stroke-width="1.5" stroke-dasharray="3 7"/><text x="200" y="172" text-anchor="middle" font-family="Georgia,serif" font-size="64" fill="#f3efe6">${esc(initials)}</text></svg>`;
}

/* ---------- favorites / recently viewed ---------- */
const favKey = (t, s) => `${t}/${s}`;
const isFav = (t, s) => store.get("sa-fav", []).includes(favKey(t, s));
function toggleFav(t, s) { const f = new Set(store.get("sa-fav", [])); const k = favKey(t, s); f.has(k) ? f.delete(k) : f.add(k); store.set("sa-fav", [...f]); }
function pushRecent(t, s) { const r = store.get("sa-recent", []).filter((x) => x !== favKey(t, s)); r.unshift(favKey(t, s)); store.set("sa-recent", r.slice(0, 12)); }
const fromKey = (k) => { const [t, s] = k.split("/"); const x = bySlug(t, s); return x && { type: t, ...x }; };

/* ---------- reusable pieces ---------- */
function charCard(c) {
  const v = bySlug("villages", c.village);
  const aff = [v?.name, c.team && bySlug("teams", c.team)?.name].filter(Boolean).join(" · ");
  return `<a class="card" href="${href("characters", c.slug)}">${avatar(c.name)}<div class="body"><h3>${esc(c.name)}</h3><span class="tag">${esc(aff)}</span><p>${esc(c.summary)}</p></div></a>`;