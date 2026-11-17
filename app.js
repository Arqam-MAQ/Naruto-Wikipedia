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
  return `<a class="card" href="${href("characters", c.slug)}">${avatar(c.name)}<div class="body"><h3>${esc(c.name)}</h3><span class="tag">${esc(aff)}</span><p>${esc(c.summary)}</p></div></a>`;}
const simpleCard = (type, x, extra = "") => `<a class="card" href="${href(type, x.slug)}"><div class="body"><h3>${esc(x.name)}</h3>${extra}<p>${esc(x.summary || "")}</p></div></a>`;
const cardFor = (type, x) =>
  type === "characters" ? charCard(x)
  : type === "villages" ? `<a class="card nation" href="${href(type, x.slug)}"><div class="jp" lang="ja">${esc(x.jp)}</div><h3>${esc(x.name)}</h3><span class="tag">${esc(x.nation)}</span><p>${esc(x.summary)}</p></a>`
  : type === "jutsu" ? simpleCard(type, x, `<span class="pill">${esc(x.category)}</span><span class="pill">Rank ${esc(x.rank)}</span>`)
  : type === "arcs" ? simpleCard(type, x, `<span class="pill">${esc(x.series)}</span>`)
  : simpleCard(type, x);
const sectionHead = (title, type) => `<div class="block-head"><h2>${title}</h2>${type ? `<a href="#/${type}">View all →</a>` : ""}</div>`;
const sampleNote = `<div class="notice">${esc(SAMPLE_NOTICE)}</div>`;

/* ---------- home ---------- */
function home() {
  const featured = ["naruto-uzumaki", "sasuke-uchiha", "kakashi-hatake", "hinata-hyuga"].map((s) => bySlug("characters", s));
  main.innerHTML = `
  <section class="hero"><div class="wrap">
    <p class="eyebrow">Unofficial fan encyclopedia</p>
    <h1>SHINOBI <b>ARCHIVE</b></h1>
    <p class="tagline">A growing, cross-linked reference to the Naruto universe — characters, clans, villages, jutsu and story arcs.</p>
    <div class="searchbox">
      <input id="heroQ" type="search" placeholder="Search characters, jutsu, clans, villages…" aria-label="Global search" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="sug" />
      <div class="suggest" id="sug" role="listbox" hidden></div>
    </div>
    <div class="chips">${["Naruto", "Sharingan", "Hokage", "Rasengan", "Akatsuki"].map((q) => `<a class="chip" href="#/search?q=${q}">${q}</a>`).join("")}</div>
  </div></section>
  <div class="wrap">
    ${sampleNote}
    <section class="block">${sectionHead("Featured characters", "characters")}<div class="grid">${featured.map(charCard).join("")}</div></section>
    <section class="block">${sectionHead("Popular clans", "clans")}<div class="grid">${clans.slice(0, 4).map((c) => simpleCard("clans", c, `<span class="pill">${esc(c.ability)}</span>`)).join("")}</div></section>
    <section class="block">${sectionHead("The Five Great Shinobi Nations", "villages")}<div class="grid">${villages.filter((v) => v.great).map((v) => cardFor("villages", v)).join("")}</div></section>
    <section class="block">${sectionHead("Famous organizations", "organizations")}<div class="grid">${organizations.map((o) => simpleCard("organizations", o)).join("")}</div></section>
    <section class="block">${sectionHead("Legendary jutsu", "jutsu")}<div class="grid">${jutsu.slice(0, 4).map((j) => cardFor("jutsu", j)).join("")}</div></section>
    <section class="block">${sectionHead("Popular story arcs", "arcs")}<div class="grid">${arcs.map((a) => cardFor("arcs", a)).join("")}</div></section>
    <section class="block">${sectionHead("Latest database additions")}<div class="grid">${latest.map((l) => { const x = bySlug(l.type, l.slug); return simpleCard(l.type, x, `<span class="pill">${esc(TYPE_LABEL[l.type] || l.type)}</span>`); }).join("")}</div></section>
    <section class="block"><div class="block-head"><h2>Random character</h2></div><div class="random" id="rand"></div></section>
    <section class="block">${sectionHead("Explore the Naruto universe")}<div class="grid">
      ${[["characters", "Characters"], ["clans", "Clans"], ["villages", "Villages & map"], ["organizations", "Organizations"], ["teams", "Teams"], ["jutsu", "Jutsu"], ["arcs", "Story arcs"], ["episodes", "Episodes"], ["movies", "Movies"]]
        .map(([t, l]) => `<a class="card nation" href="#/${t}"><h3>${l}</h3><span class="tag">${(collections[t] || []).length ? (collections[t].length + " sample entries") : "Planned"}</span></a>`).join("")}
    </div></section>
  </div>`;
  const rand = () => {
    const c = characters[Math.floor(Math.random() * characters.length)];
    $("#rand").innerHTML = `${avatar(c.name)}<div><h3>${esc(c.name)}</h3><p class="tag">${esc(bySlug("villages", c.village)?.name || "")}</p><p>${esc(c.summary)}</p><a class="btn" href="${href("characters", c.slug)}">Open profile</a> <button class="btn ghost" id="again" type="button">Another one</button></div>`;
    $("#again").onclick = rand;
  };
  rand();
  wireAutocomplete($("#heroQ"), $("#sug"));
}

/* ---------- autocomplete (keyboard accessible) ---------- */
function wireAutocomplete(input, box) {
  let idx = -1, items = [];
  const close = () => { box.hidden = true; input.setAttribute("aria-expanded", "false"); idx = -1; };
  const paint = () => box.querySelectorAll("a").forEach((a, i) => a.setAttribute("aria-selected", String(i === idx)));
  input.addEventListener("input", () => {
    items = input.value.trim() ? suggestions(input.value) : [];
    if (!items.length) return close();
    box.innerHTML = items.map((i) => `<a role="option" href="${href(i.type, i.slug)}"><span>${esc(i.name)}</span><small>${esc(TYPE_LABEL[i.type])}</small></a>`).join("") +
      `<a role="option" href="#/search?q=${encodeURIComponent(input.value)}"><span>See all results for “${esc(input.value)}”</span><small>↵</small></a>`;
    box.hidden = false; input.setAttribute("aria-expanded", "true"); idx = -1;
  });
  input.addEventListener("keydown", (e) => {
    const n = box.querySelectorAll("a").length;
    if (e.key === "ArrowDown" && n) { e.preventDefault(); idx = (idx + 1) % n; paint(); }
    else if (e.key === "ArrowUp" && n) { e.preventDefault(); idx = (idx - 1 + n) % n; paint(); }
    else if (e.key === "Escape") close();
    else if (e.key === "Enter") {
      e.preventDefault();
      const a = idx >= 0 ? box.querySelectorAll("a")[idx] : null;
      location.hash = a ? a.getAttribute("href") : `#/search?q=${encodeURIComponent(input.value)}`;
      close();
    }
  });
  input.addEventListener("blur", () => setTimeout(close, 150));
}

/* ---------- search page ---------- */
function searchPage(params) {
  const q = params.get("q") || "", type = params.get("type") || "", sort = params.get("sort") || "relevance";
  const res = search(q, { types: type ? [type] : null, sort });
  const counts = {}; search(q).forEach((r) => (counts[r.type] = (counts[r.type] || 0) + 1));
  const set = (k, v) => { const p = new URLSearchParams(params); v ? p.set(k, v) : p.delete(k); return `#/search?${p}`; };
  main.innerHTML = `<div class="wrap detail"><h1>Search</h1>
    <form class="toolbar" id="sf"><input name="q" value="${esc(q)}" placeholder="Search…" aria-label="Search query" style="flex:1;min-width:200px" />
      <select id="sortSel" aria-label="Sort results"><option value="relevance"${sort === "relevance" ? " selected" : ""}>Most relevant</option><option value="name"${sort === "name" ? " selected" : ""}>Name A–Z</option></select>
      <button class="btn" type="submit">Search</button></form>
    <div class="chips" style="justify-content:flex-start"><a class="chip${type ? "" : " on"}" href="${set("type", "")}">All (${Object.values(counts).reduce((a, b) => a + b, 0)})</a>
      ${Object.keys(TYPE_LABEL).map((t) => `<a class="chip${type === t ? " on" : ""}" href="${set("type", t)}">${TYPE_LABEL[t]} (${counts[t] || 0})</a>`).join("")}</div>
    <div class="results">${q ? (res.length ? res.map((r) => `<a class="row" href="${href(r.type, r.slug)}"><span>${esc(r.name)}</span><span class="tag">${esc(TYPE_LABEL[r.type])}</span></a>`).join("") : `<p class="empty">No matches for “${esc(q)}” in the sample dataset. Episodes and movies are not searchable yet.</p>`) : '<p class="empty">Type something to search.</p>'}</div></div>`;
  $("#sf").onsubmit = (e) => { e.preventDefault(); const p = new URLSearchParams(params); p.set("q", new FormData(e.target).get("q")); location.hash = `#/search?${p}`; };
  $("#sortSel").onchange = (e) => (location.hash = set("sort", e.target.value));
}

/* ---------- list pages ---------- */
const TITLES = { characters: "Characters", clans: "Clans", villages: "Villages & Nations", organizations: "Organizations", teams: "Teams & Squads", jutsu: "Jutsu", arcs: "Story Arcs" };
function listPage(type) {
  const all = collections[type];
  const filterOpts = type === "jutsu" ? [...new Set(all.map((j) => j.category))] : type === "villages" ? ["Great nation", "Minor village"] : [];
  main.innerHTML = `<div class="wrap detail"><h1>${TITLES[type]}</h1>${sampleNote}
    <div class="toolbar"><input id="lf" placeholder="Filter ${TITLES[type].toLowerCase()}…" aria-label="Filter list" />
      ${filterOpts.length ? `<select id="cat" aria-label="Category"><option value="">All</option>${filterOpts.map((o) => `<option>${esc(o)}</option>`).join("")}</select>` : ""}
      <select id="so" aria-label="Sort"><option value="name">Name A–Z</option><option value="za">Name Z–A</option></select></div>
    ${type === "villages" ? worldMap() : ""}<div class="grid" id="lg"></div></div>`;
  const draw = () => {
    const t = $("#lf").value.toLowerCase(), c = $("#cat")?.value || "", za = $("#so").value === "za";
    let out = all.filter((x) => (x.name + " " + (x.summary || "")).toLowerCase().includes(t))
      .filter((x) => !c || x.category === c || (c === "Great nation" ? x.great : c === "Minor village" ? !x.great : true));
    out = out.sort((a, b) => a.name.localeCompare(b.name) * (za ? -1 : 1));
    $("#lg").innerHTML = out.map((x) => cardFor(type, x)).join("") || '<p class="empty">Nothing matches that filter.</p>';
  };
  ["#lf", "#cat", "#so"].forEach((s) => $(s)?.addEventListener("input", draw)); draw();
}
const worldMap = () => `<div class="map" role="group" aria-label="Schematic world map of hidden villages. Positions are approximate.">${villages.map((v) => `<a class="pin${v.great ? "" : " minor"}" style="left:${v.mapX}%;top:${v.mapY}%" href="${href("villages", v.slug)}"><i></i><span>${esc(v.name)}</span></a>`).join("")}</div><p class="tag">Schematic map — pin positions are approximate and not to scale.</p>`;

/* ---------- detail pages ---------- */
function detail(type, slug) {
  const x = bySlug(type, slug);
  if (!x) return notFound();
  pushRecent(type, slug);
  const crumbs = `<div class="crumbs"><a href="#/">Home</a> / <a href="#/${type}">${TITLES[type]}</a> / ${esc(x.name)}</div>`;
  const fav = `<button class="btn ghost" id="fav" type="button" aria-pressed="${isFav(type, slug)}">${isFav(type, slug) ? "★ Saved" : "☆ Save"}</button>`;
  const rows = (pairs) => `<dl class="kv">${pairs.filter(([, v]) => v).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>`;
  let body = "";
  if (type === "characters") {
    const jx = (x.jutsu || []).map((s) => link("jutsu", s)).join("");
    const bio = Object.entries(x.bio || {}).map(([k, v]) => `<h3>${esc(k[0].toUpperCase() + k.slice(1))}</h3><p>${esc(v)}</p>`).join("");
    body = `<div class="detail-top">${avatar(x.name)}<div><h1>${esc(x.name)}</h1><span class="pill sample">Sample entry · unverified</span>${x.role ? `<span class="pill">${esc(x.role)}</span>` : ""}
      ${rows([["First name", esc(x.first)], ["Rank", esc(x.rank)], ["Village", link("villages", x.village)], ["Clan", x.clan ? link("clans", x.clan) : ""], ["Team", x.team ? link("teams", x.team) : ""],
        ["Organization", linkList("organizations", x.org)], ["Nature", esc((x.nature || []).join(", "))], ["Fighting style", esc(x.style)]])}${fav}</div></div>
      <p>${esc(x.summary)}</p>
      <h2>Jutsu</h2><div class="links">${jx || '<span class="tag">None in the sample dataset</span>'}</div>
      <h2>Biography</h2>${x.spoiler ? `<div class="spoiler" id="sp"><strong>Spoiler warning.</strong> The biography below touches on major story events.<br><button class="btn ghost" id="show" type="button">Show biography</button></div><div id="bio" hidden>${bio}</div>` : bio}
      <h2>Related characters</h2><div class="links">${linkList("characters", x.related)}</div>`;
  } else if (type === "clans") {
    const m = characters.filter((c) => c.clan === slug).map((c) => link("characters", c.slug)).join("");
    body = `<h1>${esc(x.name)}</h1><span class="pill sample">Sample entry · unverified</span>${rows([["Village", x.village ? link("villages", x.village) : ""], ["Signature ability", esc(x.ability)], ["Kekkei Genkai", esc(x.kekkei)]])}<p>${esc(x.summary)}</p><h2>Members in the sample dataset</h2><div class="links">${m || '<span class="tag">None yet</span>'}</div>${fav}`;
  } else if (type === "villages") {
    const m = characters.filter((c) => c.village === slug).map((c) => link("characters", c.slug)).join("");
    const cl = clans.filter((c) => c.village === slug).map((c) => link("clans", c.slug)).join("");
    body = `<h1>${esc(x.name)} <small lang="ja" style="color:var(--gold)">${esc(x.jp)}</small></h1><span class="pill sample">Sample entry · unverified</span>${rows([["Nation", esc(x.nation)], ["Leader title", esc(x.leader)], ["Current leader", esc(x.current)]])}<p>${esc(x.summary)}</p><h2>Famous shinobi</h2><div class="links">${m || '<span class="tag">None yet</span>'}</div><h2>Clans</h2><div class="links">${cl || '<span class="tag">None yet</span>'}</div>${fav}`;
  } else if (type === "organizations" || type === "teams") {
    const ms = (x.members || []).map((s) => link("characters", s)).join("");
    body = `<h1>${esc(x.name)}</h1><span class="pill sample">Sample entry · unverified</span>${type === "teams" ? rows([["Sensei", x.sensei ? link("characters", x.sensei) : ""]]) : ""}<p>${esc(x.summary)}</p><h2>Members in the sample dataset</h2><div class="links">${ms || '<span class="tag">None yet</span>'}</div>${fav}`;
  } else if (type === "jutsu") {
    body = `<h1>${esc(x.name)} <small lang="ja" style="color:var(--gold)">${esc(x.jp)}</small></h1><span class="pill sample">Sample entry · unverified</span><span class="pill">Official canon technique</span>${rows([["Category", esc(x.category)], ["Rank", esc(x.rank)], ["Nature", esc(x.nature)]])}<p>${esc(x.summary)}</p><h2>Known users</h2><div class="links">${linkList("characters", x.users)}</div>${fav}`;
  } else {
    body = `<h1>${esc(x.name)}</h1><span class="pill sample">Sample entry · unverified</span>${rows([["Series", esc(x.series)]])}<p>${esc(x.summary)}</p><p class="tag">Episode and chapter ranges are pending verification and intentionally not shown.</p>${fav}`;
  }
  main.innerHTML = `<div class="wrap detail">${crumbs}${body}</div>`;
  $("#fav").onclick = () => { toggleFav(type, slug); detail(type, slug); };
  $("#show")?.addEventListener("click", () => { $("#bio").hidden = false; $("#sp").hidden = true; });
}

/* ---------- saved / planned / 404 ---------- */
function saved() {
  const sec = (title, keys) => { const items = keys.map(fromKey).filter(Boolean); return `<h2>${title}</h2>${items.length ? `<div class="results">${items.map((i) => `<a class="row" href="${href(i.type, i.slug)}"><span>${esc(i.name)}</span><span class="tag">${esc(TYPE_LABEL[i.type])}</span></a>`).join("")}</div>` : '<p class="empty">Nothing here yet.</p>'}`; };
  main.innerHTML = `<div class="wrap detail"><h1>Saved</h1>${sec("Favorites", store.get("sa-fav", []))}${sec("Recently viewed", store.get("sa-recent", []))}<p class="tag">Stored in this browser only. Synced favorites arrive with accounts in Stage 5.</p></div>`;
}
const PLANNED = { episodes: ["Episodes", 3, "Per-episode pages for Naruto, Shippuden and Boruto need verified episode data. The schema (episodes, story_arcs) is ready; the dataset is not."], movies: ["Movies", 3, "Movie pages need verified release data. The schema (movies, movie_characters) is ready; the dataset is not."] };
function planned(t) {
  const [name, stage, why] = PLANNED[t];
  main.innerHTML = `<div class="wrap detail"><h1>${name}</h1><div class="notice"><strong>Planned for Stage ${stage}.</strong> ${esc(why)} Rather than publish unchecked numbers, this section stays empty until it can be filled correctly.</div><a class="btn" href="#/">Back home</a></div>`;
}
function notFound() { main.innerHTML = `<div class="wrap detail"><h1>Page not found</h1><p>That page doesn't exist in the archive.</p><a class="btn" href="#/">Back home</a></div>`; }

/* ---------- router ---------- */
function route() {
  const [path, qs] = (location.hash.slice(1) || "/").split("?");
  const parts = path.split("/").filter(Boolean);
  const params = new URLSearchParams(qs || "");
  $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false");
  document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#/${parts[0] || ""}`));
  if (!parts.length) { home(); document.title = "SHINOBI ARCHIVE — Naruto Universe Encyclopedia (unofficial)"; }
  else if (parts[0] === "search") { searchPage(params); document.title = "Search · SHINOBI ARCHIVE"; }
  else if (parts[0] === "saved") { saved(); document.title = "Saved · SHINOBI ARCHIVE"; }
  else if (PLANNED[parts[0]]) planned(parts[0]);
  else if (collections[parts[0]] && parts.length === 1) { listPage(parts[0]); document.title = `${TITLES[parts[0]]} · SHINOBI ARCHIVE`; }
  else if (collections[parts[0]] && parts.length === 2) { detail(parts[0], parts[1]); const x = bySlug(parts[0], parts[1]); document.title = `${x?.name || "Not found"} · SHINOBI ARCHIVE`; }
  else notFound();
  window.scrollTo(0, 0);
}
addEventListener("hashchange", route);

$("#menuBtn").onclick = () => { const o = $("#nav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", String(o)); };
$("#themeBtn").onclick = () => { const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = t; try { localStorage.setItem("sa-theme", t); } catch {} };
$("#miniSearch").onsubmit = (e) => { e.preventDefault(); const q = $("#miniQ").value.trim(); if (q) location.hash = `#/search?q=${encodeURIComponent(q)}`; };
route();
