import { collections } from "./data.js";

export const TYPE_LABEL = {
  characters: "Character", clans: "Clan", villages: "Village", organizations: "Organization",
  teams: "Team", jutsu: "Jutsu", arcs: "Story arc", movies: "Movie",
};

const norm = (s) => (s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

// Build once: one flat index over every collection.
export const INDEX = Object.entries(collections).flatMap(([type, list]) =>
  list.map((x) => ({
    type, slug: x.slug, name: x.name,
    sub: x.village || x.series || x.category || x.nation || "",
    hay: norm([x.name, x.first, x.jp, x.summary, x.village, x.clan, x.team, x.category, x.nature].flat().join(" ")),
    nameN: norm(x.name),
  }))
);

function score(item, words) {
  let s = 0;
  for (const w of words) {
    if (item.nameN === w) s += 100;
    else if (item.nameN.startsWith(w)) s += 60;
    else if (item.nameN.split(/\s+/).some((p) => p.startsWith(w))) s += 40;
    else if (item.nameN.includes(w)) s += 25;
    else if (item.hay.includes(w)) s += 8;
    else return 0; // every word must match somewhere
  }
  return s;
}

export function search(query, { types = null, sort = "relevance", limit = 50 } = {}) {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  let out = INDEX.filter((i) => !types || types.includes(i.type))
    .map((i) => ({ ...i, score: score(i, words) }))
    .filter((i) => i.score > 0);
  out.sort(sort === "name" ? (a, b) => a.name.localeCompare(b.name) : (a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return out.slice(0, limit);
}

export const suggestions = (q) => search(q, { limit: 6 });
