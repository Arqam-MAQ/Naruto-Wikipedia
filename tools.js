// Stage 4 tools: family tree, relationship explorer, comparison, timeline, quiz.
// Everything is derived from data.js, so new records appear here automatically.
import { characters, clans, villages, jutsu, teams, bySlug, timeline, ERAS } from "./data.js";

const arr = (a) => a || [];
const isChar = (v) => !!bySlug("characters", v);
const nameOf = (v) => bySlug("characters", v)?.name || v;

/* ---------- graph helpers (relations are stored one-sided; we make them symmetric) ---------- */
export function famOf(slug) {
  const c = bySlug("characters", slug), r = c.rel || {};
  const parents = new Set([...arr(r.father), ...arr(r.mother)]), children = new Set(arr(r.children)), siblings = new Set(arr(r.siblings)), spouse = new Set(arr(r.spouse));
  for (const o of characters) {
    if (o.slug === slug) continue;
    const x = o.rel || {};
    if (arr(x.father).includes(slug) || arr(x.mother).includes(slug)) children.add(o.slug);
    if (arr(x.children).includes(slug)) parents.add(o.slug);
    if (arr(x.siblings).includes(slug)) siblings.add(o.slug);
    if (arr(x.spouse).includes(slug)) spouse.add(o.slug);
  }
  return { parents: [...parents], children: [...children], siblings: [...siblings], spouse: [...spouse] };
}
export const hasFamily = (slug) => { const f = famOf(slug); return f.parents.length + f.children.length + f.siblings.length + f.spouse.length > 0; };

export const KINDS = { parent: "Parent", sibling: "Sibling", spouse: "Spouse", child: "Child", friend: "Friend", rival: "Rival", teacher: "Teacher", student: "Student", teammate: "Teammate" };
export function relationsOf(slug) {
  const c = bySlug("characters", slug), r = c.rel || {}, out = {};
  const add = (kind, key) => { if (key && key !== slug) (out[kind] ||= new Set()).add(key); };
  const f = famOf(slug);
  f.parents.forEach((k) => add("parent", k)); f.siblings.forEach((k) => add("sibling", k)); f.spouse.forEach((k) => add("spouse", k)); f.children.forEach((k) => add("child", k));
  arr(r.friends).forEach((k) => add("friend", k)); arr(r.rivals).forEach((k) => add("rival", k));
  arr(r.teachers).forEach((k) => add("teacher", k)); arr(r.students).forEach((k) => add("student", k));
  for (const o of characters) {
    if (o.slug === slug) continue;
    const x = o.rel || {};
    if (arr(x.friends).includes(slug)) add("friend", o.slug);
    if (arr(x.rivals).includes(slug)) add("rival", o.slug);
    if (arr(x.students).includes(slug)) add("teacher", o.slug);
    if (arr(x.teachers).includes(slug)) add("student", o.slug);
  }
  if (c.team) { const t = bySlug("teams", c.team); arr(t?.members).forEach((k) => add("teammate", k)); }
  return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, [...v]]));
}

/* ---------- quiz generation (pure, testable) ---------- */
const shuffle = (a, r) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const pickN = (pool, n, r, not) => shuffle([...new Set(pool)].filter((x) => x !== not), r).slice(0, n);
const mk = (q, correct, pool, why, r) => { const d = pickN(pool, 3, r, correct); return d.length === 3 ? { q, correct, options: shuffle([correct, ...d], r), why } : null; };
const AMBIGUOUS = new Set(["orochimaru"]); // affiliation changed over the story, so skip village questions for them

const GENS = [
  (r) => { const c = shuffle(characters.filter((c) => c.village && !AMBIGUOUS.has(c.slug)), r)[0]; const v = bySlug("villages", c.village); return mk(`According to this archive, which village is ${c.name} from?`, v.name, villages.map((x) => x.name), `${c.name} is listed under ${v.name}.`, r); },
  (r) => { const c = shuffle(characters.filter((c) => c.clan), r)[0]; const cl = bySlug("clans", c.clan); return mk(`Which clan does ${c.name} belong to?`, cl.name, clans.map((x) => x.name), `${c.name} is a member of the ${cl.name}.`, r); },
  (r) => { const v = shuffle(villages.filter((v) => v.leader), r)[0]; return mk(`What is the title of the leader of ${v.name}?`, v.leader, ["Hokage", "Kazekage", "Mizukage", "Raikage", "Tsuchikage"], `${v.name}'s leader holds the title ${v.leader}.`, r); },
  (r) => { const j = shuffle(jutsu.filter((j) => j.jp), r)[0]; return mk(`What is the Japanese name of ${j.name}?`, j.jp, jutsu.map((x) => x.jp).filter(Boolean), `${j.name} is written ${j.jp}.`, r); },
  (r) => { const j = shuffle(jutsu, r)[0]; return mk(`Under which category is ${j.name} listed in this archive?`, j.category, jutsu.map((x) => x.category), `${j.name} is listed as ${j.category}.`, r); },
  (r) => { const t = shuffle(teams.filter((t) => t.sensei), r)[0]; const s = nameOf(t.sensei); return mk(`Who is the sensei of ${t.name}?`, s, characters.map((c) => c.name), `${s} leads ${t.name}.`, r); },
  (r) => { const c = shuffle(characters.filter((c) => arr(c.rel?.spouse).length === 1), r)[0]; const s = nameOf(c.rel.spouse[0]); return mk(`Who is ${c.name}'s spouse?`, s, characters.map((x) => x.name), `${c.name}'s spouse is ${s}.`, r); },
];
export function makeQuestions(n = 10, rng = Math.random) {
  const out = [], seen = new Set();
  for (let tries = 0; out.length < n && tries < 200; tries++) {
    const q = GENS[Math.floor(rng() * GENS.length)](rng);
    if (q && !seen.has(q.q)) { seen.add(q.q); out.push(q); }
  }
  return out;
}

/* ---------- pages ---------- */
export function initTools(ctx) {
  const { main, $, esc, href, link, person, people, avatar, section, kvRows, NA, store } = ctx;
  const opts = (list, sel) => list.map((c) => `<option value="${esc(c.slug)}"${c.slug === sel ? " selected" : ""}>${esc(c.name)}</option>`).join("");
  const crumb = (t) => `<div class="crumbs"><a href="#/">Home</a> / <a href="#/tools">Tools</a> / ${t}</div>`;
  const node = (v, nore) => isChar(v) ? `<span class="tnode"><a href="${href("characters", v)}">${esc(nameOf(v))}</a>${nore ? "" : ` <a class="tre" href="#/tree/${v}" title="Re-center tree" aria-label="Show tree for ${esc(nameOf(v))}">⤷</a>`}</span>` : `<span class="tnode ghost">${esc(v)}</span>`;

  function branch(slug, dir, depth, seen) {
    // dir: "up" = ancestors, "down" = descendants. Collapsed <details> keep big trees readable.
    const f = isChar(slug) ? famOf(slug) : { parents: [], children: [] };
    const next = dir === "up" ? f.parents : f.children;
    if (!next.length || depth > 4 || seen.has(slug)) return "";
    const s2 = new Set(seen).add(slug);
    return `<ul class="tl">${next.map((k) => { const sub = isChar(k) ? branch(k, dir, depth + 1, s2) : ""; return `<li>${sub ? `<div class="trow">${node(k)}<button type="button" class="exp" aria-expanded="false" aria-label="Show more generations of ${esc(nameOf(k))}">▸</button></div><div class="sub" hidden>${sub}</div>` : node(k)}</li>`; }).join("")}</ul>`;
  }

  function treePage(slug) {
    const list = characters.filter((c) => hasFamily(c.slug));
    slug = isChar(slug) && hasFamily(slug) ? slug : "naruto-uzumaki";
    const c = bySlug("characters", slug), f = famOf(slug), cl = c.clan && bySlug("clans", c.clan);
    main.innerHTML = `<div class="wrap detail">${crumb("Family tree")}<h1>Family tree</h1>
      <label class="fld" style="max-width:320px"><span>Choose a character</span><select id="tsel">${opts(list, slug)}</select></label>
      <p class="tag">Built from the relationships in this archive (sample dataset). Tap ▸ to expand generations. Names in grey have no profile yet.</p>
      <div class="tree">
        <div class="gen"><h3>Parents &amp; ancestors</h3>${f.parents.length ? branch(slug, "up", 0, new Set()) : `<p>${NA}</p>`}</div>
        <div class="gen focus"><h3>Selected</h3><div class="tfocus">${node(slug, true)}</div>${f.spouse.length ? `<h3>Spouse</h3><div class="tline">${f.spouse.map((k) => node(k)).join("")}</div>` : ""}</div>
        ${f.siblings.length ? `<div class="gen"><h3>Siblings</h3><div class="tline">${f.siblings.map((k) => node(k)).join("")}</div></div>` : ""}
        <div class="gen"><h3>Children &amp; descendants</h3>${f.children.length ? branch(slug, "down", 0, new Set()) : `<p>${NA}</p>`}</div>
        ${cl ? `<div class="gen"><h3>Clan connection</h3><p><a href="${href("clans", cl.slug)}">${esc(cl.name)}</a> — ${arr(cl.members).filter((m) => m !== slug).map((m) => `<a href="${href("characters", m)}">${esc(nameOf(m))}</a>`).join(", ") || NA}</p></div>` : ""}
      </div><p><a class="btn ghost" href="#/explorer/${slug}">Relationship explorer</a> <a class="btn ghost" href="${href("characters", slug)}">Open profile</a></p></div>`;
    $("#tsel").onchange = (e) => (location.hash = `#/tree/${e.target.value}`);
    main.querySelectorAll(".exp").forEach((b) => (b.onclick = () => { const sub = b.parentElement.nextElementSibling, open = sub.hidden; sub.hidden = !open; b.setAttribute("aria-expanded", String(open)); b.textContent = open ? "▾" : "▸"; }));
  }

  const KCOLOR = { parent: "#f08a24", sibling: "#f2c14e", spouse: "#d6362f", child: "#e8a35c", friend: "#6fb3d8", rival: "#b45cd6", teacher: "#5cc59a", student: "#9acb4f", teammate: "#9aa0b4" };
  function explorerPage(slug) {
    slug = isChar(slug) ? slug : "naruto-uzumaki";
    const c = bySlug("characters", slug), rel = relationsOf(slug);
    const merged = new Map();
    for (const [k, a] of Object.entries(rel)) for (const key of a) { const m = merged.get(key) || { kinds: [], key }; m.kinds.push(k); merged.set(key, m); }
    const nodes = [...merged.values()].map((m) => ({ ...m, kind: m.kinds[0] }));
    const W = 640, H = 520, cx = W / 2, cy = H / 2, rx = 235, ry = 190;
    const pos = nodes.map((n, i) => { const a = (i / Math.max(nodes.length, 1)) * Math.PI * 2 - Math.PI / 2, k = nodes.length > 9 && i % 2 ? 0.74 : 1; return { ...n, x: cx + rx * k * Math.cos(a), y: cy + ry * k * Math.sin(a) }; });
    const svg = `<svg viewBox="0 0 ${W} ${H}" class="rgraph" role="img" aria-label="Relationship diagram for ${esc(c.name)}">
      ${pos.map((n) => `<line x1="${cx}" y1="${cy}" x2="${n.x.toFixed(1)}" y2="${n.y.toFixed(1)}" stroke="${KCOLOR[n.kind]}" stroke-width="1.5" opacity=".6"/>`).join("")}
      ${pos.map((n) => { const nm = nameOf(n.key), w = Math.min(nm.length * 6.4 + 16, 150), inner = `<rect x="${(n.x - w / 2).toFixed(1)}" y="${(n.y - 12).toFixed(1)}" width="${w.toFixed(1)}" height="24" rx="12" fill="var(--card)" stroke="${KCOLOR[n.kind]}" stroke-width="2"/><text x="${n.x.toFixed(1)}" y="${(n.y + 4).toFixed(1)}" text-anchor="middle" font-size="11" fill="var(--text)">${esc(nm.length > 22 ? nm.slice(0, 21) + "…" : nm)}</text>`;
        return `<g><title>${esc(n.kinds.map((k) => KINDS[k]).join(" / "))}: ${esc(nm)}</title>${isChar(n.key) ? `<a href="${href("characters", n.key)}">${inner}</a>` : inner}</g>`; }).join("")}
      <circle cx="${cx}" cy="${cy}" r="42" fill="var(--red)"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">${esc(c.first || c.name)}</text></svg>`;
    const listHtml = Object.entries(rel).map(([k, a]) => `<dt><span class="dot" style="background:${KCOLOR[k]}"></span>${KINDS[k]}</dt><dd class="links">${a.map(person).join("")}</dd>`).join("");
    main.innerHTML = `<div class="wrap detail">${crumb("Relationship explorer")}<h1>Relationship explorer</h1>
      <label class="fld" style="max-width:320px"><span>Choose a character</span><select id="esel">${opts(characters, slug)}</select></label>
      ${nodes.length ? svg : `<p class="empty">No relationships recorded for ${esc(c.name)} yet.</p>`}
      <h2>All relationships (text version)</h2><dl class="kv">${listHtml || `<dt></dt><dd>${NA}</dd>`}</dl>
      <p><a class="btn ghost" href="#/tree/${slug}">Family tree</a> <a class="btn ghost" href="${href("characters", slug)}">Open profile</a></p></div>`;
    $("#esel").onchange = (e) => (location.hash = `#/explorer/${e.target.value}`);
  }

  const ABIL = [["ninjutsu", "Ninjutsu"], ["genjutsu", "Genjutsu"], ["taijutsu", "Taijutsu"], ["kenjutsu", "Kenjutsu"], ["senjutsu", "Senjutsu"], ["dojutsu", "Dojutsu"], ["summoning", "Summoning"]];
  function comparePage(params) {
    const a = isChar(params.get("a")) ? params.get("a") : "naruto-uzumaki", b = isChar(params.get("b")) ? params.get("b") : "sasuke-uchiha";
    const A = bySlug("characters", a), B = bySlug("characters", b);
    const val = (c, f) => { const v = f(c); return v ? esc(Array.isArray(v) ? v.join(", ") : v) : NA; };
    const rows = [["Village", (c) => bySlug("villages", c.village)?.name], ["Clan", (c) => bySlug("clans", c.clan)?.name], ["Team", (c) => bySlug("teams", c.team)?.name], ["Rank", (c) => c.rank], ["Nature", (c) => c.nature], ["Fighting style", (c) => c.style], ["Status", (c) => c.status], ["Birthday", (c) => c.birthday]];
    const cnt = (c, k) => arr(c.abil?.[k]).length, max = Math.max(1, ...ABIL.flatMap(([k]) => [cnt(A, k), cnt(B, k)]));
    const bar = (n) => `<span class="bar"><i style="width:${(n / max) * 100}%"></i></span><b>${n}</b>`;
    const shared = arr(A.jutsu).filter((j) => arr(B.jutsu).includes(j));
    main.innerHTML = `<div class="wrap detail">${crumb("Compare")}<h1>Compare characters</h1>
      <div class="formgrid"><label class="fld"><span>Character A</span><select id="ca">${opts(characters, a)}</select></label><label class="fld"><span>Character B</span><select id="cb">${opts(characters, b)}</select></label></div>
      <div class="notice"><strong>Power is subjective.</strong> Naruto fights depend on context, preparation and story, so this tool does not rank who is stronger. The bars below only count abilities <em>listed in this archive</em>, which is a small sample dataset.</div>
      <div class="cmp"><div class="cmph"><a href="${href("characters", a)}">${esc(A.name)}</a></div><div></div><div class="cmph"><a href="${href("characters", b)}">${esc(B.name)}</a></div>
      ${rows.map(([k, f]) => `<div>${val(A, f)}</div><div class="cmpk">${k}</div><div>${val(B, f)}</div>`).join("")}</div>
      <h2>Listed abilities by category</h2><div class="cmp">${ABIL.map(([k, l]) => `<div class="bars">${bar(cnt(A, k))}</div><div class="cmpk">${l}</div><div class="bars">${bar(cnt(B, k))}</div>`).join("")}</div>
      <h2>Jutsu in the archive</h2><div class="cmp"><div class="links">${arr(A.jutsu).map((j) => link("jutsu", j)).join("") || NA}</div><div class="cmpk">Known jutsu</div><div class="links">${arr(B.jutsu).map((j) => link("jutsu", j)).join("") || NA}</div></div>
      <p><strong>Shared:</strong> <span class="links">${shared.map((j) => link("jutsu", j)).join("") || "none listed"}</span></p></div>`;
    const go = () => (location.hash = `#/compare?a=${$("#ca").value}&b=${$("#cb").value}`);
    $("#ca").onchange = go; $("#cb").onchange = go;
  }

  function timelinePage(params) {
    const era = params.get("era") || "";
    const ev = timeline.filter((e) => !era || e.era === era);
    main.innerHTML = `<div class="wrap detail">${crumb("Timeline")}<h1>Timeline explorer</h1>
      <p class="tag">Events are in story order. No in-universe years or episode numbers are claimed.</p>
      <div class="chips" style="justify-content:flex-start"><a class="chip${era ? "" : " on"}" href="#/timeline">All</a>${ERAS.map((e) => `<a class="chip${era === e ? " on" : ""}" href="#/timeline?era=${encodeURIComponent(e)}">${esc(e)}</a>`).join("")}</div>
      <ol class="tline-list">${ev.map((e) => { const body = `<p>${esc(e.summary)}</p><div class="links">${arr(e.chars).map(person).join("")}${arr(e.arcs).map((s) => link("arcs", s)).join("")}</div>`;
        return `<li><span class="tag">${esc(e.era)}</span><h3>${esc(e.title)}</h3>${e.spoiler ? `<details class="spoiler"><summary>Spoiler — show details</summary>${body}</details>` : body}</li>`; }).join("")}</ol></div>`;
  }

  let qs = [], qi = 0, score = 0, answered = false;
  function quizPage() {
    qs = makeQuestions(10); qi = 0; score = 0; answered = false; drawQ();
  }
  function drawQ() {
    if (qi >= qs.length) {
      const best = Math.max(score, store.get("sa-best", 0)); store.set("sa-best", best);
      main.innerHTML = `<div class="wrap detail">${crumb("Quiz")}<h1>Quiz complete</h1><p class="big">${score} / ${qs.length}</p><p class="tag">Best score in this browser: ${best} / ${qs.length}</p><button class="btn" id="qagain" type="button">Play again</button></div>`;
      $("#qagain").onclick = quizPage; return;
    }
    const q = qs[qi];
    main.innerHTML = `<div class="wrap detail">${crumb("Quiz")}<h1>Quiz</h1><p class="tag">Question ${qi + 1} of ${qs.length} · Score ${score} · Based on this archive's sample data</p>
      <h2>${esc(q.q)}</h2><div class="qopts">${q.options.map((o, i) => `<button class="btn ghost qo" type="button" data-i="${i}">${esc(o)}</button>`).join("")}</div><div id="qfb" aria-live="polite"></div></div>`;
    answered = false;
    main.querySelectorAll(".qo").forEach((b) => (b.onclick = () => {
      if (answered) return; answered = true;
      const ok = q.options[+b.dataset.i] === q.correct; if (ok) score++;
      main.querySelectorAll(".qo").forEach((x) => { x.disabled = true; if (q.options[+x.dataset.i] === q.correct) x.classList.add("right"); });
      if (!ok) b.classList.add("wrong");
      $("#qfb").innerHTML = `<p><strong>${ok ? "Correct!" : "Not quite."}</strong> ${esc(q.why)}</p><button class="btn" id="qnext" type="button">${qi + 1 < qs.length ? "Next" : "See score"}</button>`;
      $("#qnext").onclick = () => { qi++; drawQ(); };
    }));
  }

  function toolsPage() {
    const T = [["generator", "Jutsu Name Generator", "Create original, fan-made techniques."], ["finder", "Finder", "Find jutsu, users and members."], ["tree", "Family tree", "Parents, siblings, spouses and children."], ["explorer", "Relationship explorer", "A diagram of everyone a character is connected to."], ["compare", "Compare characters", "Side by side, with no power rankings."], ["timeline", "Timeline explorer", "The story in order, with spoiler guards."], ["quiz", "Quiz", "Ten questions from the archive."]];
    main.innerHTML = `<div class="wrap detail"><h1>Tools</h1><div class="grid">${T.map(([r, t, d]) => `<a class="card nation" href="#/${r}"><h3>${t}</h3><p>${d}</p></a>`).join("")}</div></div>`;
  }
  return { treePage, explorerPage, comparePage, timelinePage, quizPage, toolsPage };
}
