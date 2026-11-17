// SAMPLE DATASET — a deliberately small, hand-written seed used until the Supabase
// database is populated. Entries use only well-known facts and original wording.
// Everything here is flagged verified:false; an admin marks records verified in Stage 5.
// Shape mirrors db/schema.sql so swapping in a real API later is a one-file change.

export const SAMPLE_NOTICE =
  "Sample dataset — original summaries, not yet admin-verified. SHINOBI ARCHIVE is an unofficial fan project and is not affiliated with the creators or rights holders of Naruto.";

export const characters = [
  { slug: "naruto-uzumaki", name: "Naruto Uzumaki", first: "Naruto", village: "konohagakure", clan: "uzumaki", team: "team-7", org: [], rank: "Hokage (Seventh)", nature: ["Wind"], style: "Ninjutsu-focused, relies on Shadow Clones and Rasengan",
    summary: "A Konoha orphan who dreams of becoming Hokage and grows from a loud outcast into the village's leader.",
    jutsu: ["rasengan", "shadow-clone-jutsu"], spoiler: true, role: "Protagonist",
    bio: { childhood: "Grows up alone in Konoha, seeking recognition from a village that keeps its distance.", genin: "Joins Team 7 and begins forming the bonds that define him.", events: "Trains under Jiraiya, returns to face the Akatsuki, and later fights in the Fourth Great Ninja War." },
    related: ["sasuke-uchiha", "sakura-haruno", "kakashi-hatake", "jiraiya", "hinata-hyuga"],
    trivia: ["Rasengan is the signature technique he learns during his training with Jiraiya."] },
  { slug: "sasuke-uchiha", name: "Sasuke Uchiha", first: "Sasuke", village: "konohagakure", clan: "uchiha", team: "team-7", org: [], rank: "Shinobi", nature: ["Fire", "Lightning"], style: "Swordsmanship and ninjutsu backed by the Sharingan",
    summary: "The last prominent survivor of the Uchiha clan, driven by loss and a rivalry with Naruto.",
    jutsu: ["chidori", "fireball-jutsu", "amaterasu"], spoiler: true, role: "Deuteragonist",
    bio: { childhood: "Raised in the shadow of his older brother, Itachi.", genin: "Joins Team 7 and awakens the Sharingan.", events: "Leaves Konoha to seek power, and his path is closely tied to Naruto's." },
    related: ["naruto-uzumaki", "itachi-uchiha", "sakura-haruno", "kakashi-hatake"], trivia: [] },
  { slug: "sakura-haruno", name: "Sakura Haruno", first: "Sakura", village: "konohagakure", clan: null, team: "team-7", org: [], rank: "Shinobi", nature: [], style: "Medical ninjutsu and powerful taijutsu",
    summary: "A Team 7 member who trains as a medical ninja and becomes one of Konoha's strongest fighters.",
    jutsu: [], spoiler: false, role: "Main cast",
    bio: { genin: "Joins Team 7 alongside Naruto and Sasuke.", events: "Trains in medical ninjutsu and takes part in major battles of the war." },
    related: ["naruto-uzumaki", "sasuke-uchiha", "kakashi-hatake"], trivia: [] },
  { slug: "kakashi-hatake", name: "Kakashi Hatake", first: "Kakashi", village: "konohagakure", clan: null, team: "team-7", org: ["anbu"], rank: "Hokage (Sixth)", nature: ["Lightning"], style: "Versatile ninjutsu, known for copying techniques",
    summary: "Team 7's teacher, a veteran shinobi who later serves as Konoha's Sixth Hokage.",
    jutsu: ["chidori", "kamui"], spoiler: true, role: "Teacher",
    bio: { events: "Served in the Anbu, taught Team 7, and led during the war." },
    related: ["naruto-uzumaki", "sasuke-uchiha", "sakura-haruno"], trivia: ["Chidori is a technique he created."] },
  { slug: "itachi-uchiha", name: "Itachi Uchiha", first: "Itachi", village: "konohagakure", clan: "uchiha", team: null, org: ["akatsuki", "anbu"], rank: "S-rank missing-nin", nature: ["Fire"], style: "Genjutsu and ninjutsu through the Sharingan",
    summary: "Sasuke's older brother, a prodigy whose actions shape the Uchiha story.",
    jutsu: ["amaterasu", "fireball-jutsu"], spoiler: true, role: "Major character",
    bio: { events: "Leaves Konoha and joins the Akatsuki; his full story is a major revelation." },
    related: ["sasuke-uchiha"], trivia: [] },