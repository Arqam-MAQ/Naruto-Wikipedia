// Jutsu Name Generator — produces ORIGINAL, fan-created techniques from small word banks.
// Output is never canon. Names that collide with a canon jutsu in the archive are rerolled.
import { jutsu as canonJutsu } from "./data.js";

export const ELEMENTS = {
  Fire: { style: "Katon", en: "Fire Style" }, Water: { style: "Suiton", en: "Water Style" }, Wind: { style: "Fuuton", en: "Wind Style" },
  Earth: { style: "Doton", en: "Earth Style" }, Lightning: { style: "Raiton", en: "Lightning Style" }, None: { style: "", en: "" },
};
export const CATEGORIES = {
  Ninjutsu: { prefix: "", suffix: "no Jutsu", en: "Technique" },
  Genjutsu: { prefix: "Genjutsu", suffix: "no Jutsu", en: "Illusion Technique" },
  Taijutsu: { prefix: "", suffix: "no Waza", en: "Technique" },
  Sealing: { prefix: "Fuuin", suffix: "no Jutsu", en: "Sealing Technique" },
};
export const THEMES = {
  Destruction: { forms: [["Yari", "Spear"], ["Ken", "Blade"], ["Nami", "Wave"]], verb: "overwhelm an opponent with raw force", ranks: ["A", "A", "S"] },
  Defense: { forms: [["Tate", "Shield"], ["Kabe", "Wall"], ["Kasumi", "Haze"]], verb: "shield allies from incoming attacks", ranks: ["B", "B", "A"] },
  Speed: { forms: [["Mai", "Dance"], ["Hane", "Feather"], ["Nami", "Wave"]], verb: "strike before the opponent can react", ranks: ["B", "B", "A"] },
  Binding: { forms: [["Ami", "Net"], ["Kusari", "Chain"], ["Ito", "Thread"]], verb: "restrain an opponent's movement", ranks: ["B", "A", "A"] },
  Deception: { forms: [["Kagami", "Mirror"], ["Maboroshi", "Illusion"], ["Kasumi", "Haze"]], verb: "cloud the opponent's senses", ranks: ["B", "A", "A"] },
};
export const STYLES = {
  Aggressive: "fighters who press the attack", Defensive: "fighters who hold ground and counter", Stealth: "fighters who work unseen", Support: "fighters who back up their team",
};
export const NAMING = { Classic: "Classic (Element Style: Name no Jutsu)", Poetic: "Poetic (Form of the Creature)" };
const NOUNS = [["Ryuu", "Dragon"], ["Arashi", "Storm"], ["Hoshi", "Star"], ["Tsuki", "Moon"], ["Kage", "Shadow"], ["Kitsune", "Fox"], ["Okami", "Wolf"], ["Tora", "Tiger"], ["Washi", "Eagle"], ["Hebi", "Serpent"], ["Kiri", "Mist"], ["Yoru", "Night"]];
const SIGNS = ["Rat", "Ox", "Tiger", "Hare", "Dragon", "Snake", "Horse", "Ram", "Monkey", "Bird", "Dog", "Boar"];
const FIRST = ["Kaede", "Ren", "Sora", "Haru", "Mio", "Daichi", "Yuna", "Takumi", "Aoi", "Rin"];
const LAST = ["Hoshino", "Takamura", "Mizuki", "Kagemori", "Ashikaga", "Tsukishiro", "Yamabuki", "Kurosawa"];

const pick = (a, r) => a[Math.floor(r() * a.length)];
const canonNames = new Set(canonJutsu.map((j) => j.name.toLowerCase()));

export function generate(opts = {}, rng = Math.random) {
  const el = ELEMENTS[opts.element] || ELEMENTS.None, cat = CATEGORIES[opts.category] || CATEGORIES.Ninjutsu, th = THEMES[opts.theme] || THEMES.Destruction;
  for (let tries = 0; tries < 20; tries++) {
    const [nR, nE] = pick(NOUNS, rng), [fR, fE] = pick(th.forms, rng);
    const lead = [cat.prefix, el.style].filter(Boolean).join(" · ");
    const leadEn = [el.en, cat.prefix && (cat.prefix === "Genjutsu" ? "Illusion" : "Sealing")].filter(Boolean).join(" ");
    const classic = opts.naming !== "Poetic";
    const name = classic ? `${lead ? lead + ": " : ""}${nR} ${fR} ${cat.suffix}` : `${nR} no ${fR}`;
    const english = classic ? `${leadEn ? leadEn + ": " : ""}${nE} ${fE} ${cat.en}` : `${fE} of the ${nE}`;
    if (canonNames.has(name.toLowerCase()) || canonNames.has(english.toLowerCase())) continue;
    const signs = Array.from({ length: 3 + Math.floor(rng() * 3) }, () => pick(SIGNS, rng));
    const style = STYLES[opts.style] ? opts.style : "Aggressive";
    return {
      name, english, category: opts.category || "Ninjutsu", element: opts.element && opts.element !== "None" ? opts.element : "None (non-elemental)", rank: pick(th.ranks, rng),
      theme: opts.theme || "Destruction", signs: signs.join(" → "),
      description: `A fan-created ${(opts.category || "Ninjutsu").toLowerCase()} built to ${th.verb}, best suited to ${STYLES[style]}.`,
      user: `${pick(FIRST, rng)} ${pick(LAST, rng)} (fictional)`,
    };
  }
  return null;
}
