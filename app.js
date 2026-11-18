import { collections, bySlug, characters, clans, villages, organizations, jutsu, arcs, movies, seriesInfo, latest, SAMPLE_NOTICE } from "./data.js";
import { initTools } from "./tools.js";
import { generate, ELEMENTS, CATEGORIES, THEMES, STYLES, NAMING } from "./generator.js";
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
}
const simpleCard = (type, x, extra = "") => `<a class="card" href="${href(type, x.slug)}"><div class="body"><h3>${esc(x.name)}</h3>${extra}<p>${esc(x.summary || "")}</p></div></a>`;
const cardFor = (type, x) =>
  type === "characters" ? charCard(x)
  : type === "villages" ? `<a class="card nation" href="${href(type, x.slug)}"><div class="jp" lang="ja">${esc(x.jp)}</div><h3>${esc(x.name)}</h3><span class="tag">${esc(x.nation)}</span><p>${esc(x.summary)}</p></a>`
  : type === "jutsu" ? simpleCard(type, x, `<span class="pill">${esc(x.category)}</span><span class="pill">Rank ${esc(x.rank)}</span>`)
  : type === "arcs" ? simpleCard(type, x, `<span class="pill">${esc(x.series)}</span>`)
  : type === "movies" ? simpleCard(type, x, `<span class="pill">${esc(x.series)}</span><span class="pill">${esc(x.year)}</span>`)
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
      ${[["characters", "Characters"], ["clans", "Clans"], ["villages", "Villages & map"], ["organizations", "Organizations"], ["teams", "Teams"], ["jutsu", "Jutsu"], ["arcs", "Story arcs"], ["episodes", "Episodes"], ["movies", "Movies"], ["generator", "Jutsu generator"], ["finder", "Finder"], ["tree", "Family tree"], ["compare", "Compare"], ["timeline", "Timeline"], ["quiz", "Quiz"]]
        .map(([t, l]) => `<a class="card nation" href="#/${t}"><h3>${l}</h3><span class="tag">${(collections[t] || []).length ? (collections[t].length + " sample entries") : (["generator", "finder", "tree", "compare", "timeline", "quiz"].includes(t) ? "Interactive tool" : "Pending data")}</span></a>`).join("")}
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
const TITLES = { characters: "Characters", clans: "Clans", villages: "Villages & Nations", organizations: "Organizations", teams: "Teams & Squads", jutsu: "Jutsu", arcs: "Story Arcs", movies: "Movies" };
function listPage(type) {
  const all = collections[type];
  const vname = (x) => bySlug("villages", x.village)?.name || "";
  const filterOpts = type === "jutsu" ? [...new Set(all.map((j) => j.category))] : type === "villages" ? ["Great nation", "Minor village"] : (type === "characters" || type === "clans") ? [...new Set(all.map(vname).filter(Boolean))] : [];
  main.innerHTML = `<div class="wrap detail"><h1>${TITLES[type]}</h1>${sampleNote}
    <div class="toolbar"><input id="lf" placeholder="Filter ${TITLES[type].toLowerCase()}…" aria-label="Filter list" />
      ${filterOpts.length ? `<select id="cat" aria-label="Category"><option value="">All</option>${filterOpts.map((o) => `<option>${esc(o)}</option>`).join("")}</select>` : ""}
      <select id="so" aria-label="Sort"><option value="name">Name A–Z</option><option value="za">Name Z–A</option></select></div>
    ${type === "villages" ? worldMap() : ""}<div class="grid" id="lg"></div></div>`;
  const draw = () => {
    const t = $("#lf").value.toLowerCase(), c = $("#cat")?.value || "", za = $("#so").value === "za";
    let out = all.filter((x) => (x.name + " " + (x.summary || "")).toLowerCase().includes(t))
      .filter((x) => !c || x.category === c || (type === "villages" ? (c === "Great nation" ? x.great : !x.great) : (type === "characters" || type === "clans") ? vname(x) === c : true));
    out = out.sort((a, b) => a.name.localeCompare(b.name) * (za ? -1 : 1));
    $("#lg").innerHTML = out.map((x) => cardFor(type, x)).join("") || '<p class="empty">Nothing matches that filter.</p>';
  };
  ["#lf", "#cat", "#so"].forEach((s) => $(s)?.addEventListener("input", draw)); draw();
}
const worldMap = () => `<div class="map" role="group" aria-label="Schematic world map of hidden villages. Positions are approximate.">${villages.map((v) => `<a class="pin${v.great ? "" : " minor"}" style="left:${v.mapX}%;top:${v.mapY}%" href="${href("villages", v.slug)}"><i></i><span>${esc(v.name)}</span></a>`).join("")}</div><p class="tag">Schematic map — pin positions are approximate and not to scale.</p>`;

/* ---------- detail pages ---------- */
const NA = '<span class="tag">Not added yet</span>';
// A person/thing is a link when it is a slug in the dataset, plain text otherwise.
const person = (v) => (bySlug("characters", v) ? link("characters", v) : `<span>${esc(v)}</span>`);
const people = (arr) => (arr && arr.length ? arr.map(person).join("") : NA);
const links = (type, arr) => (arr && arr.length ? arr.map((s) => (bySlug(type, s) ? link(type, s) : `<span>${esc(s)}</span>`)).join("") : NA);
const kvRows = (pairs) => `<dl class="kv">${pairs.map(([k, v]) => `<dt>${k}</dt><dd>${v || NA}</dd>`).join("")}</dl>`;
const section = (title, html) => `<section class="sec"><h2>${title}</h2>${html}</section>`;
const textOrNA = (t) => (t ? `<p>${esc(t)}</p>` : `<p>${NA}</p>`);
const listOrNA = (a) => (a && a.length ? `<ul>${a.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : `<p>${NA}</p>`);

function characterBody(x, slug, fav) {
  const v = bySlug("villages", x.village), cn = x.clan && bySlug("clans", x.clan), t = x.team && bySlug("teams", x.team);
  const ab = x.abil || {}, rel = x.rel || {};
  const abRows = [["Ninjutsu", ab.ninjutsu], ["Genjutsu", ab.genjutsu], ["Taijutsu", ab.taijutsu], ["Kenjutsu", ab.kenjutsu], ["Senjutsu", ab.senjutsu], ["Dojutsu", ab.dojutsu], ["Kekkei Genkai", ab.kekkei], ["Summoning", ab.summoning]]
    .map(([k, a]) => `<dt>${k}</dt><dd>${a && a.length ? esc(a.join(", ")) : NA}</dd>`).join("");
  const bio = ["childhood", "academy", "genin", "chunin", "jonin", "events", "battles", "development"]
    .filter((k) => x.bio && x.bio[k]).map((k) => `<h3>${{ childhood: "Childhood", academy: "Academy period", genin: "Genin period", chunin: "Chunin period", jonin: "Jonin period", events: "Major life events", battles: "Important battles", development: "Character development" }[k]}</h3><p>${esc(x.bio[k])}</p>`).join("") || `<p>${NA}</p>`;
  const bioBlock = x.spoiler
    ? `<div class="spoiler" id="sp"><strong>Spoiler warning.</strong> The biography below touches on major story events.<br><button class="btn ghost" id="show" type="button">Show biography</button></div><div id="bio" hidden>${bio}</div>`
    : bio;
  const jx = (x.jutsu || []).map((s) => link("jutsu", s)).join("");
  return `<div class="detail-top">${avatar(x.name)}<div><h1>${esc(x.name)}</h1>${badges(x)}${x.role ? `<span class="pill">${esc(x.role)}</span>` : ""}
      <p>${esc(x.summary)}</p>${fav}</div></div>
    ${section("Basic information", kvRows([["Full name", esc(x.name)], ["First name", esc(x.first)], ["Nicknames", esc((x.nick || []).join(", "))], ["Gender", esc(x.gender)], ["Birthday", esc(x.birthday)],
      ["Height / weight", ""], ["Blood type", ""], ["Occupation", esc(x.occupation)], ["Status", esc(x.status)]]))}
    ${section("Ninja information", kvRows([["Village", v ? link("villages", x.village) : ""], ["Clan", cn ? link("clans", x.clan) : "Unaffiliated / not added"], ["Rank", esc(x.rank)], ["Team", t ? link("teams", x.team) : ""],
      ["Organization", links("organizations", x.org)], ["Nature", esc((x.nature || []).join(", "))], ["Fighting style", esc(x.style)]]))}
    ${section("Relationships", `<dl class="kv">${[["Father", rel.father], ["Mother", rel.mother], ["Siblings", rel.siblings], ["Spouse", rel.spouse], ["Children", rel.children], ["Friends", rel.friends], ["Rivals", rel.rivals], ["Teachers", rel.teachers], ["Students", rel.students]]
      .map(([k, a]) => `<dt>${k}</dt><dd class="links">${people(a)}</dd>`).join("")}</dl>`)}
    ${section("Abilities", `<dl class="kv">${abRows}</dl><h3>Known jutsu in the archive</h3><div class="links">${jx || NA}</div>`)}
    ${section("Equipment and weapons", listOrNA(x.equip))}
    ${section("Biography", bioBlock)}
    ${section("Appearances", kvRows([["Series", esc((x.appears || []).join(", "))], ["Episodes / chapters", '<span class="tag">Exact numbers pending verification</span>'], ["Movies / OVAs", ""]]))}
    ${section("Trivia", listOrNA(x.trivia))}
    ${section("Related characters", `<div class="links">${people(x.related)}</div><p class="links"><a href="#/tree/${slug}">Family tree</a><a href="#/explorer/${slug}">Relationship explorer</a><a href="#/compare?a=${slug}">Compare</a></p>`)}`;
}
const badges = (x) => `<span class="pill sample">Sample entry · unverified</span>`;

function detail(type, slug) {
  const x = bySlug(type, slug);
  if (!x) return notFound();
  pushRecent(type, slug);
  const crumbs = `<div class="crumbs"><a href="#/">Home</a> / <a href="#/${type}">${TITLES[type]}</a> / ${esc(x.name)}</div>`;
  const fav = `<button class="btn ghost" id="fav" type="button" aria-pressed="${isFav(type, slug)}">${isFav(type, slug) ? "★ Saved" : "☆ Save"}</button>`;
  const memberChars = (pred) => characters.filter(pred).map((c) => link("characters", c.slug)).join("") || NA;
  let body = "";
  if (type === "characters") body = characterBody(x, slug, fav);
  else if (type === "clans") {
    const v = x.village && bySlug("villages", x.village);
    const fam = (x.members || []).map((s) => `<li>${link("characters", s)}${bySlug("characters", s)?.rank ? ` <span class="tag">${esc(bySlug("characters", s).rank)}</span>` : ""}</li>`).join("");
    body = `<h1>${esc(x.name)}</h1>${badges(x)}<p>${esc(x.summary)}</p>${fav}
      ${section("Overview", kvRows([["Origin", esc(x.origin)], ["Symbol", esc(x.symbol)], ["Headquarters / homeland", esc(x.homeland)], ["Special abilities", esc(x.ability)], ["Kekkei Genkai", esc(x.kekkei)], ["Related villages", v ? link("villages", x.village) : ""]]))}
      ${section("Clan history", textOrNA(x.history))}
      ${section("Famous members", fam ? `<ul class="plain">${fam}</ul>` : `<p>${NA}</p>`)}
      ${section("Family tree", `<div class="links">${(x.members || []).filter((m) => bySlug("characters", m)).map((m) => `<a href="#/tree/${m}">${esc(bySlug("characters", m).name)}'s tree</a>`).join("") || NA}</div>`)}
      ${section("Important events", listOrNA(x.events))}
      ${section("Related organizations", links("organizations", x.orgs))}`;
  } else if (type === "villages") {
    const cl = clans.filter((c) => c.village === slug).map((c) => link("clans", c.slug)).join("") || NA;
    body = `<h1>${esc(x.name)} <small lang="ja" style="color:var(--gold)">${esc(x.jp)}</small></h1>${badges(x)}<p>${esc(x.summary)}</p>${fav}
      ${section("Overview", kvRows([["Nation", esc(x.nation)], ["Location", esc(x.location)], ["Leader title", esc(x.leader)], ["Current leader", esc(x.current)], ["Previous leaders", esc((x.previous || []).join(", "))]]))}
      ${section("Village history", textOrNA(x.history))}
      ${section("Famous shinobi", `<div class="links">${memberChars((c) => c.village === slug)}</div>`)}
      ${section("Clans", `<div class="links">${cl}</div>`)}
      ${section("Military structure", textOrNA(x.military))}
      ${section("Special techniques", textOrNA(x.special))}
      ${section("Important events", listOrNA(x.events))}
      ${section("Related story arcs", `<div class="links">${links("arcs", x.arcs)}</div>`)}`;
  } else if (type === "organizations") {
    body = `<h1>${esc(x.name)}</h1>${badges(x)}<p>${esc(x.summary)}</p>${fav}
      ${section("Overview", kvRows([["Founders", esc((x.founders || []).join(", "))], ["Leaders", esc((x.leaders || []).join(", "))], ["Objectives", esc(x.objectives)], ["Structure", esc(x.structure)], ["Symbols", esc(x.symbol)]]))}
      ${section("Members in the archive", `<div class="links">${people(x.members)}</div>`)}
      ${section("Important missions", listOrNA(x.missions))}
      ${section("Major battles", listOrNA(x.battles))}`;
  } else if (type === "teams") {
    body = `<h1>${esc(x.name)}</h1>${badges(x)}<p>${esc(x.summary)}</p>${fav}
      ${section("Team", kvRows([["Sensei", x.sensei ? person(x.sensei) : ""], ["Formation", esc(x.formation)]]))}
      ${section("Members", `<div class="links">${people(x.members)}</div>`)}
      ${section("Missions", listOrNA(x.missions))}
      ${section("Important battles", listOrNA(x.battles))}
      ${section("Team history", '<p class="tag">Detailed team histories are pending verification.</p>')}`;
  } else if (type === "jutsu") {
    body = `<h1>${esc(x.name)} <small lang="ja" style="color:var(--gold)">${esc(x.jp)}</small></h1>${badges(x)}<span class="pill">Official canon technique</span><p>${esc(x.summary)}</p>${fav}
      ${section("Details", kvRows([["Category", esc(x.category)], ["Rank", esc(x.rank)], ["Nature", esc(x.nature)]]))}
      ${section("Known users", `<div class="links">${people(x.users)}</div>`)}`;
  } else if (type === "arcs") {
    body = `<h1>${esc(x.name)}</h1>${badges(x)}<p>${esc(x.summary)}</p>${fav}
      ${section("Overview", kvRows([["Anime series", esc(x.series)], ["Canon / filler", esc(x.canon)], ["Main antagonist", esc(x.antagonist)], ["Episode range", '<span class="tag">Pending verification</span>'], ["Manga chapters", '<span class="tag">Pending verification</span>']]))}
      ${section("Main characters", `<div class="links">${people(x.chars)}</div>`)}
      ${section("Villages involved", `<div class="links">${villages.filter((v) => (v.arcs || []).includes(slug)).map((v) => link("villages", v.slug)).join("") || NA}</div>`)}`;
  } else if (type === "movies") {
    body = `<h1>${esc(x.name)}</h1>${badges(x)}<p>${x.summary ? esc(x.summary) : '<span class="tag">Plot summary pending verification.</span>'}</p>${fav}
      ${section("Overview", kvRows([["Series", esc(x.series)], ["Release year", esc(x.year)], ["Exact release date", '<span class="tag">Pending verification</span>'], ["Main antagonist", esc(x.antagonist)], ["Timeline placement", esc(x.timeline)], ["Canon status", '<span class="tag">Pending verification</span>']]))}
      ${section("Main characters", `<div class="links">${people(x.chars)}</div>`)}
      ${section("Poster", '<p class="tag">Official posters are copyrighted and not included.</p>')}`;
  } else {
    body = `<h1>${esc(x.name)}</h1>${badges(x)}<p>${esc(x.summary)}</p>${fav}`;
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
function episodesPage() {
  main.innerHTML = `<div class="wrap detail"><h1>Episodes</h1><div class="notice"><strong>Per-episode pages are pending.</strong> They need a verified episode list (titles, air dates, arcs, filler status). The database tables are ready; the data is not. Totals below are approximate and unverified.</div>
    <div class="grid">${seriesInfo.map((s) => `<div class="card nation"><h3>${esc(s.name)}</h3><span class="tag">${esc(s.note)}</span><p>About ${s.episodes} episodes</p></div>`).join("")}</div>
    <h2 style="margin-top:2rem">Story arcs</h2><div class="grid">${arcs.map((a) => cardFor("arcs", a)).join("")}</div></div>`;
}

const sel = (id, label, opts, first) => `<label class="fld"><span>${label}</span><select id="${id}">${first ? `<option value="">${first}</option>` : ""}${opts.map((o) => (Array.isArray(o) ? `<option value="${esc(o[0])}">${esc(o[1])}</option>` : `<option value="${esc(o)}">${esc(o)}</option>`)).join("")}</select></label>`;
function generatorPage() {
  main.innerHTML = `<div class="wrap detail"><h1>Jutsu Name Generator</h1>
    <div class="notice">Everything generated here is <strong>fan-created and not canon</strong>. Names are built from a small word bank and are never official Naruto techniques.</div>
    <div class="formgrid">${sel("gEl", "Nature element", Object.keys(ELEMENTS))}${sel("gCat", "Category", Object.keys(CATEGORIES))}${sel("gTh", "Power theme", Object.keys(THEMES))}${sel("gSt", "Fighting style", Object.keys(STYLES))}${sel("gNm", "Naming style", Object.entries(NAMING))}</div>
    <p><button class="btn" id="gen" type="button">Generate</button> <button class="btn ghost" id="rjBtn" type="button">Random canon jutsu</button></p>
    <div id="out" aria-live="polite"></div></div>`;
  const run = () => {
    const r = generate({ element: $("#gEl").value, category: $("#gCat").value, theme: $("#gTh").value, style: $("#gSt").value, naming: $("#gNm").value });
    $("#out").innerHTML = r ? `<div class="gen card"><div class="body"><span class="pill warn">Fan-created · not canon</span><h2>${esc(r.name)}</h2><p class="tag">${esc(r.english)}</p>
      ${kvRows([["Category", esc(r.category)], ["Element", esc(r.element)], ["Rank", esc(r.rank)], ["Hand-sign theme", esc(r.signs) + ' <span class="tag">(suggestion only)</span>'], ["Fictional user", esc(r.user)]])}<p>${esc(r.description)}</p></div></div>` : '<p class="empty">Could not generate a unique name. Try again.</p>';
  };
  $("#gen").onclick = run; run();
  $("#rjBtn").onclick = () => { const j = jutsu[Math.floor(Math.random() * jutsu.length)];
    $("#out").innerHTML = `<div class="card"><div class="body"><span class="pill">Official canon technique</span><h2><a href="${href("jutsu", j.slug)}">${esc(j.name)}</a></h2><p>${esc(j.summary)}</p></div></div>`; };
}

function finderPage() {
  const opt = (arr) => arr.map((x) => [x.slug, x.name]);
  main.innerHTML = `<div class="wrap detail"><h1>Finder</h1><p class="tag">Look things up through the archive's links. Results cover only the sample dataset.</p>
    <div class="formgrid">${sel("fChar", "Jutsu used by a character", opt(characters), "Choose a character")}${sel("fJut", "Users of a jutsu", opt(jutsu), "Choose a jutsu")}
    ${sel("fClan", "Members of a clan", opt(clans), "Choose a clan")}${sel("fVil", "Members of a village", opt(villages), "Choose a village")}${sel("fOrg", "Members of an organization", opt(organizations), "Choose an organization")}</div>
    <div id="fout" class="links"></div></div>`;
  const show = (title, html) => { $("#fout").innerHTML = `<h2>${title}</h2>${html || NA}`; };
  const reset = (keep) => ["fChar", "fJut", "fClan", "fVil", "fOrg"].forEach((i) => i !== keep && ($("#" + i).value = ""));
  $("#fChar").onchange = (e) => { reset("fChar"); const c = bySlug("characters", e.target.value); c && show(`Jutsu used by ${esc(c.name)}`, (c.jutsu || []).map((s) => link("jutsu", s)).join("")); };
  $("#fJut").onchange = (e) => { reset("fJut"); const j = bySlug("jutsu", e.target.value); j && show(`Users of ${esc(j.name)}`, people(j.users)); };
  $("#fClan").onchange = (e) => { reset("fClan"); const c = bySlug("clans", e.target.value); c && show(`Members of ${esc(c.name)}`, people(c.members)); };
  $("#fVil").onchange = (e) => { reset("fVil"); const v = bySlug("villages", e.target.value); v && show(`Shinobi of ${esc(v.name)}`, characters.filter((c) => c.village === v.slug).map((c) => link("characters", c.slug)).join("")); };
  $("#fOrg").onchange = (e) => { reset("fOrg"); const o = bySlug("organizations", e.target.value); o && show(`Members of ${esc(o.name)}`, people(o.members)); };
}
function notFound() { main.innerHTML = `<div class="wrap detail"><h1>Page not found</h1><p>That page doesn't exist in the archive.</p><a class="btn" href="#/">Back home</a></div>`; }

/* ---------- Stage 4 tools ---------- */
const tools = initTools({ main, $, esc, href, link, person, people, avatar, section, kvRows, NA, store });

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
  else if (parts[0] === "episodes") { episodesPage(); document.title = "Episodes · SHINOBI ARCHIVE"; }
  else if (parts[0] === "tools") { tools.toolsPage(); document.title = "Tools · SHINOBI ARCHIVE"; }
  else if (parts[0] === "tree") { tools.treePage(parts[1]); document.title = "Family tree · SHINOBI ARCHIVE"; }
  else if (parts[0] === "explorer") { tools.explorerPage(parts[1]); document.title = "Relationship explorer · SHINOBI ARCHIVE"; }
  else if (parts[0] === "compare") { tools.comparePage(params); document.title = "Compare · SHINOBI ARCHIVE"; }
  else if (parts[0] === "timeline") { tools.timelinePage(params); document.title = "Timeline · SHINOBI ARCHIVE"; }
  else if (parts[0] === "quiz") { tools.quizPage(); document.title = "Quiz · SHINOBI ARCHIVE"; }
  else if (parts[0] === "generator") { generatorPage(); document.title = "Jutsu Generator · SHINOBI ARCHIVE"; }
  else if (parts[0] === "finder") { finderPage(); document.title = "Finder · SHINOBI ARCHIVE"; }
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
