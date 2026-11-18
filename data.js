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
  { slug: "hinata-hyuga", name: "Hinata Hyuga", first: "Hinata", village: "konohagakure", clan: "hyuga", team: "team-8", org: [], rank: "Shinobi", nature: [], style: "Gentle Fist taijutsu with the Byakugan",
    summary: "A gentle Hyuga heiress who draws strength from admiring Naruto.",
    jutsu: [], spoiler: false, role: "Main cast", bio: { events: "Member of Team 8 and a steady ally of Naruto." },
    related: ["naruto-uzumaki"], trivia: [] },
  { slug: "shikamaru-nara", name: "Shikamaru Nara", first: "Shikamaru", village: "konohagakure", clan: "nara", team: "team-10", org: [], rank: "Jonin", nature: [], style: "Strategy and shadow manipulation",
    summary: "A lazy but brilliant strategist from the Nara clan.", jutsu: [], spoiler: false, role: "Main cast",
    bio: { events: "Becomes a trusted tactician during the war." }, related: ["naruto-uzumaki"], trivia: [] },
  { slug: "gaara", name: "Gaara", first: "Gaara", village: "sunagakure", clan: null, team: null, org: [], rank: "Kazekage (Fifth)", nature: [], style: "Sand manipulation",
    summary: "A Suna jinchuriki who turns from isolation to leading his village.", jutsu: [], spoiler: false, role: "Major character",
    bio: { events: "Meets Naruto during the Chunin Exams and later becomes Kazekage." }, related: ["naruto-uzumaki"], trivia: [] },
  { slug: "jiraiya", name: "Jiraiya", first: "Jiraiya", village: "konohagakure", clan: null, team: "sannin", org: [], rank: "Sannin", nature: [], style: "Toad-based ninjutsu and Sage techniques",
    summary: "One of the legendary Sannin and Naruto's teacher.", jutsu: ["rasengan"], spoiler: true, role: "Teacher",
    bio: { events: "Travels widely and trains Naruto." }, related: ["naruto-uzumaki", "minato-namikaze"], trivia: [] },
  { slug: "minato-namikaze", name: "Minato Namikaze", first: "Minato", village: "konohagakure", clan: null, team: "team-minato", org: [], rank: "Hokage (Fourth)", nature: [], style: "Speed and space-time techniques",
    summary: "Konoha's Fourth Hokage, celebrated for his speed.", jutsu: ["rasengan"], spoiler: true, role: "Major character",
    bio: { events: "Develops the Rasengan and leads Konoha as Fourth Hokage." }, related: ["naruto-uzumaki", "jiraiya", "kakashi-hatake"], trivia: [] },
];

export const clans = [
  { slug: "uchiha", name: "Uchiha Clan", village: "konohagakure", summary: "A Konoha clan known for the Sharingan and Fire Style techniques.", ability: "Sharingan", kekkei: "Sharingan" },
  { slug: "uzumaki", name: "Uzumaki Clan", village: null, summary: "A clan associated with sealing techniques and strong life force.", ability: "Sealing techniques", kekkei: null },
  { slug: "hyuga", name: "Hyuga Clan", village: "konohagakure", summary: "A Konoha clan with the Byakugan and the Gentle Fist style.", ability: "Byakugan", kekkei: "Byakugan" },
  { slug: "senju", name: "Senju Clan", village: "konohagakure", summary: "A founding clan of Konoha, known for great vitality.", ability: "Strong vitality", kekkei: null },
  { slug: "nara", name: "Nara Clan", village: "konohagakure", summary: "A Konoha clan using shadow-based techniques and sharp strategy.", ability: "Shadow techniques", kekkei: null },
  { slug: "akimichi", name: "Akimichi Clan", village: "konohagakure", summary: "A Konoha clan whose techniques convert calories into power.", ability: "Body expansion", kekkei: null },
];

export const villages = [
  { slug: "konohagakure", name: "Konohagakure", jp: "木ノ葉隠れの里", nation: "Land of Fire", great: true, leader: "Hokage", current: "Naruto Uzumaki (Seventh Hokage)", mapX: 66, mapY: 56, summary: "Hidden Leaf Village, the home of Team 7." },
  { slug: "sunagakure", name: "Sunagakure", jp: "砂隠れの里", nation: "Land of Wind", great: true, leader: "Kazekage", current: "Gaara (Fifth Kazekage)", mapX: 30, mapY: 60, summary: "Hidden Sand Village, set in a desert." },
  { slug: "kirigakure", name: "Kirigakure", jp: "霧隠れの里", nation: "Land of Water", great: true, leader: "Mizukage", current: "Mei Terumi (Fifth Mizukage)", mapX: 86, mapY: 80, summary: "Hidden Mist Village, on an island nation." },
  { slug: "kumogakure", name: "Kumogakure", jp: "雲隠れの里", nation: "Land of Lightning", great: true, leader: "Raikage", current: "Darui (Fifth Raikage)", mapX: 58, mapY: 16, summary: "Hidden Cloud Village, in a mountainous region." },
  { slug: "iwagakure", name: "Iwagakure", jp: "岩隠れの里", nation: "Land of Earth", great: true, leader: "Tsuchikage", current: "Kurotsuchi (Fifth Tsuchikage)", mapX: 22, mapY: 26, summary: "Hidden Stone Village, set among rocky terrain." },
  { slug: "amegakure", name: "Amegakure", jp: "雨隠れの里", nation: "Land of Rain", great: false, leader: null, current: null, mapX: 47, mapY: 48, summary: "Hidden Rain Village, a smaller village with ties to the Akatsuki." },
  { slug: "otogakure", name: "Otogakure", jp: "音隠れの里", nation: "Land of Rice Fields", great: false, leader: null, current: null, mapX: 54, mapY: 38, summary: "Hidden Sound Village, a smaller village linked to Orochimaru." },
  { slug: "takigakure", name: "Takigakure", jp: "滝隠れの里", nation: "Land of Waterfalls", great: false, leader: null, current: null, mapX: 40, mapY: 74, summary: "Hidden Waterfall Village, a small village in a hidden land." },
  { slug: "kusagakure", name: "Kusagakure", jp: "草隠れの里", nation: "Land of Grass", great: false, leader: null, current: null, mapX: 40, mapY: 34, summary: "Hidden Grass Village, a smaller village near the larger nations." },
];

export const organizations = [
  { slug: "akatsuki", name: "Akatsuki", summary: "A secretive group of powerful missing-nin working toward a hidden goal.", members: ["itachi-uchiha"] },
  { slug: "anbu", name: "Anbu", summary: "Konoha's covert operations unit for sensitive missions.", members: ["kakashi-hatake", "itachi-uchiha"] },
  { slug: "root", name: "Root", summary: "A hidden faction that operated apart from the regular Anbu chain of command.", members: [] },
  { slug: "allied-shinobi-forces", name: "Allied Shinobi Forces", summary: "The united shinobi army formed from the great nations during the war.", members: [] },
];

export const teams = [
  { slug: "team-7", name: "Team 7", sensei: "kakashi-hatake", members: ["naruto-uzumaki", "sasuke-uchiha", "sakura-haruno"], summary: "The squad of Naruto, Sasuke and Sakura, led by Kakashi." },
  { slug: "team-8", name: "Team 8", sensei: null, members: ["hinata-hyuga"], summary: "A tracking-focused squad that includes Hinata." },
  { slug: "team-10", name: "Team 10", sensei: null, members: ["shikamaru-nara"], summary: "A squad built on the traditional Ino-Shika-Cho combination." },
  { slug: "sannin", name: "Sannin", sensei: null, members: ["jiraiya"], summary: "Three legendary Konoha shinobi, including Jiraiya." },
  { slug: "team-minato", name: "Team Minato", sensei: "minato-namikaze", members: ["kakashi-hatake"], summary: "Minato's squad from Kakashi's youth." },
];

export const jutsu = [
  { slug: "rasengan", name: "Rasengan", jp: "螺旋丸", category: "Ninjutsu", rank: "A", nature: "None", users: ["minato-namikaze", "jiraiya", "naruto-uzumaki"], summary: "A spinning sphere of concentrated chakra struck against a target." },
  { slug: "chidori", name: "Chidori", jp: "千鳥", category: "Ninjutsu", rank: "A", nature: "Lightning", users: ["kakashi-hatake", "sasuke-uchiha"], summary: "A concentrated lightning-chakra thrust." },
  { slug: "shadow-clone-jutsu", name: "Shadow Clone Jutsu", jp: "影分身の術", category: "Forbidden Jutsu", rank: "B", nature: "None", users: ["naruto-uzumaki"], summary: "Creates solid clones that share experience with the user." },
  { slug: "amaterasu", name: "Amaterasu", jp: "天照", category: "Dojutsu", rank: "S", nature: "Yin-Yang", users: ["itachi-uchiha", "sasuke-uchiha"], summary: "A Sharingan-based technique that produces black flames." },
  { slug: "kamui", name: "Kamui", jp: "神威", category: "Space-Time Ninjutsu", rank: "S", nature: "Space-Time", users: ["kakashi-hatake"], summary: "A Sharingan-based space-time technique." },
  { slug: "fireball-jutsu", name: "Fire Style: Great Fireball Technique", jp: "火遁・豪火球の術", category: "Ninjutsu", rank: "C", nature: "Fire", users: ["sasuke-uchiha", "itachi-uchiha"], summary: "A signature Fire Style technique of the Uchiha clan." },
];

export const arcs = [
  { slug: "land-of-waves", name: "Land of Waves", series: "Naruto", summary: "Team 7's first major mission, escorting a bridge builder." },
  { slug: "chunin-exams", name: "Chunin Exams", series: "Naruto", summary: "A multi-stage exam that brings several villages together." },
  { slug: "pains-assault", name: "Pain's Assault", series: "Naruto Shippuden", summary: "A devastating attack on Konoha by a leader of the Akatsuki." },
  { slug: "fourth-great-ninja-war", name: "Fourth Great Ninja War", series: "Naruto Shippuden", summary: "The nations unite in a large-scale war." },
];

export const latest = [
  { type: "characters", slug: "gaara", label: "Gaara" },
  { type: "jutsu", slug: "kamui", label: "Kamui" },
  { type: "organizations", slug: "root", label: "Root" },
  { type: "arcs", slug: "pains-assault", label: "Pain's Assault" },
];

export const collections = { characters, clans, villages, organizations, teams, jutsu, arcs };

export const bySlug = (type, slug) => (collections[type] || []).find((x) => x.slug === slug);
export const titleOf = (x) => x.name;
