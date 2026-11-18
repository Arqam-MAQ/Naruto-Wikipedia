// SAMPLE DATASET (Stage 2) — hand-written, original wording, well-known facts only.
// Every record is verified:false until an admin marks it verified. Fields that are not
// confidently known are left empty and shown as "Not added yet" in the UI instead of guessed.
// Relationship values are character slugs when the person is in this dataset, otherwise plain names.

export const SAMPLE_NOTICE =
  "Sample dataset — original summaries, not yet admin-verified. SHINOBI ARCHIVE is an unofficial fan project and is not affiliated with the creators or rights holders of Naruto.";

const ch = (o) => ({ nick: [], gender: "", birthday: "", occupation: "", status: "", clan: null, team: null, org: [], rank: "", nature: [], style: "", jutsu: [], spoiler: false, role: "", related: [], trivia: [],
  rel: {}, abil: {}, equip: [], bio: {}, appears: [], ...o });

export const characters = [
  ch({ slug: "naruto-uzumaki", name: "Naruto Uzumaki", first: "Naruto", nick: ["Number One Hyperactive Knucklehead Ninja"], gender: "Male", birthday: "October 10", occupation: "Shinobi, later Hokage", status: "Alive",
    village: "konohagakure", clan: "uzumaki", team: "team-7", rank: "Genin, later Seventh Hokage", nature: ["Wind"], style: "Close-range brawling backed by clones and Rasengan",
    summary: "A Konoha orphan who dreams of becoming Hokage and grows from a loud outcast into the village's leader.", role: "Protagonist", spoiler: true,
    jutsu: ["rasengan", "shadow-clone-jutsu", "sage-mode", "summoning-jutsu"],
    rel: { father: ["minato-namikaze"], mother: ["kushina-uzumaki"], spouse: ["hinata-hyuga"], children: ["boruto-uzumaki", "Himawari Uzumaki"], friends: ["sakura-haruno", "shikamaru-nara", "gaara", "rock-lee"], rivals: ["sasuke-uchiha"], teachers: ["iruka-umino", "jiraiya", "kakashi-hatake"], students: ["Konohamaru Sarutobi"] },
    abil: { ninjutsu: ["Shadow Clone Jutsu", "Rasengan", "Wind Style techniques"], taijutsu: ["Unrefined brawling style"], senjutsu: ["Sage Mode"], summoning: ["Toads"] },
    equip: ["Kunai", "Shuriken", "Forehead protector"],
    bio: { childhood: "Grows up without a family, acting out for attention while much of the village keeps its distance.", academy: "A poor student who keeps his goal of becoming Hokage; Iruka is the teacher who first believes in him.", genin: "Placed on Team 7 with Sasuke and Sakura under Kakashi.", chunin: "Enters the Chunin Exams and shows unusual strength, though he is not promoted afterwards.", events: "Trains under Jiraiya, returns to face the Akatsuki, fights in the Fourth Great Ninja War and eventually becomes Seventh Hokage.", battles: "Defense of Konoha against Pain; the Fourth Great Ninja War; repeated clashes with Sasuke.", development: "Moves from seeking approval to protecting others, and from rivalry with Sasuke to a hard-won bond." },
    appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["sasuke-uchiha", "sakura-haruno", "kakashi-hatake", "jiraiya", "hinata-hyuga", "minato-namikaze"], trivia: ["Rasengan is the signature technique he learns from Jiraiya."] }),
  ch({ slug: "sasuke-uchiha", name: "Sasuke Uchiha", first: "Sasuke", gender: "Male", birthday: "July 23", occupation: "Shinobi", status: "Alive", village: "konohagakure", clan: "uchiha", team: "team-7", org: ["taka"], rank: "Genin; later a wandering shinobi", nature: ["Fire", "Lightning"],
    style: "Swordsmanship and ninjutsu supported by the Sharingan", summary: "The last prominent survivor of the Uchiha clan, driven by loss and a rivalry with Naruto.", role: "Deuteragonist", spoiler: true,
    jutsu: ["chidori", "fireball-jutsu", "amaterasu", "susanoo", "sharingan"],
    rel: { father: ["Fugaku Uchiha"], mother: ["Mikoto Uchiha"], siblings: ["itachi-uchiha"], spouse: ["sakura-haruno"], children: ["Sarada Uchiha"], rivals: ["naruto-uzumaki"], teachers: ["kakashi-hatake", "orochimaru"], friends: ["naruto-uzumaki"] },
    abil: { ninjutsu: ["Fire Style techniques", "Chidori"], kenjutsu: ["Sword combat"], dojutsu: ["Sharingan"], genjutsu: ["Sharingan-based illusions"] },
    equip: ["Sword", "Kunai", "Forehead protector"],
    bio: { childhood: "Raised in the shadow of his older brother, Itachi, and wanting his father's approval.", genin: "Joins Team 7 and develops a competitive bond with Naruto.", events: "Leaves Konoha seeking power; his later path is closely tied to the fate of the Uchiha clan.", development: "Shifts from vengeance toward taking responsibility for his choices." },
    appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["naruto-uzumaki", "itachi-uchiha", "sakura-haruno", "kakashi-hatake"] }),
  ch({ slug: "sakura-haruno", name: "Sakura Haruno", first: "Sakura", gender: "Female", birthday: "March 28", occupation: "Shinobi, medical ninja", status: "Alive", village: "konohagakure", team: "team-7", rank: "Genin to Jonin-level medic", style: "Medical ninjutsu with great physical strength",
    summary: "A Team 7 member who trains as a medical ninja and becomes one of Konoha's strongest fighters.", role: "Main cast", jutsu: ["mystical-palm"],
    rel: { spouse: ["sasuke-uchiha"], children: ["Sarada Uchiha"], teachers: ["tsunade", "kakashi-hatake"], friends: ["naruto-uzumaki", "ino-yamanaka"] },
    abil: { ninjutsu: ["Medical ninjutsu"], taijutsu: ["Super-strength punches built on chakra control"] }, equip: ["Kunai", "Medical supplies"],
    bio: { genin: "Joins Team 7 alongside Naruto and Sasuke.", events: "Becomes Tsunade's apprentice and takes part in the major battles of the war.", development: "Grows from a bystander on her team into a front-line fighter and healer." },
    appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["naruto-uzumaki", "sasuke-uchiha", "kakashi-hatake", "tsunade"] }),
  ch({ slug: "kakashi-hatake", name: "Kakashi Hatake", first: "Kakashi", nick: ["Copy Ninja"], gender: "Male", birthday: "September 15", occupation: "Shinobi, teacher, Hokage", status: "Alive", village: "konohagakure", team: "team-7", org: ["anbu"], rank: "Jonin; Sixth Hokage", nature: ["Lightning"],
    style: "Adaptable ninjutsu, known for copying techniques", summary: "Team 7's teacher, a veteran shinobi who later serves as Konoha's Sixth Hokage.", role: "Teacher", spoiler: true, jutsu: ["chidori", "kamui", "sharingan"],
    rel: { father: ["Sakumo Hatake"], teachers: ["minato-namikaze"], students: ["naruto-uzumaki", "sasuke-uchiha", "sakura-haruno"], friends: ["obito-uchiha", "might-guy"], rivals: ["might-guy"] },
    abil: { ninjutsu: ["Chidori", "Lightning Style techniques"], dojutsu: ["Sharingan"], summoning: ["Ninken (ninja dogs)"] }, equip: ["Kunai", "Forehead protector worn over one eye"],
    bio: { childhood: "Becomes a shinobi at a very young age.", genin: "Placed on Team Minato.", events: "Serves in the Anbu, teaches Team 7 and later leads Konoha as Sixth Hokage.", development: "Learns to value his comrades above rigid rules." },
    appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["naruto-uzumaki", "sasuke-uchiha", "sakura-haruno", "minato-namikaze", "obito-uchiha"], trivia: ["Chidori is a technique he created."] }),
  ch({ slug: "itachi-uchiha", name: "Itachi Uchiha", first: "Itachi", gender: "Male", birthday: "June 9", occupation: "Shinobi", status: "Deceased", village: "konohagakure", clan: "uchiha", org: ["akatsuki", "anbu"], rank: "Anbu; later S-rank missing-nin", nature: ["Fire"],
    style: "Genjutsu and ninjutsu through the Sharingan", summary: "Sasuke's older brother, a prodigy whose actions shape the Uchiha story.", role: "Major character", spoiler: true, jutsu: ["amaterasu", "fireball-jutsu", "tsukuyomi", "susanoo", "sharingan"],
    rel: { father: ["Fugaku Uchiha"], mother: ["Mikoto Uchiha"], siblings: ["sasuke-uchiha"] },
    abil: { dojutsu: ["Sharingan"], genjutsu: ["Tsukuyomi"], ninjutsu: ["Fire Style techniques", "Amaterasu"] }, equip: ["Kunai", "Akatsuki cloak"],
    bio: { events: "Leaves Konoha and joins the Akatsuki; the truth behind his choices is a major revelation." },
    appears: ["Naruto", "Naruto Shippuden"], related: ["sasuke-uchiha"] }),
  ch({ slug: "hinata-hyuga", name: "Hinata Hyuga", first: "Hinata", gender: "Female", birthday: "December 27", occupation: "Shinobi", status: "Alive", village: "konohagakure", clan: "hyuga", team: "team-8", rank: "Chunin-level and above", style: "Gentle Fist taijutsu with the Byakugan",
    summary: "A gentle Hyuga heiress who draws strength from admiring Naruto.", role: "Main cast", jutsu: ["byakugan", "gentle-fist"],
    rel: { father: ["Hiashi Hyuga"], siblings: ["Hanabi Hyuga"], spouse: ["naruto-uzumaki"], children: ["boruto-uzumaki", "Himawari Uzumaki"], friends: ["naruto-uzumaki"], teachers: ["Kurenai Yuhi"] },
    abil: { dojutsu: ["Byakugan"], taijutsu: ["Gentle Fist"] }, equip: ["Kunai"], bio: { events: "Member of Team 8 and a steady ally of Naruto." },
    appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["naruto-uzumaki", "neji-hyuga"] }),
  ch({ slug: "shikamaru-nara", name: "Shikamaru Nara", first: "Shikamaru", gender: "Male", birthday: "September 22", occupation: "Shinobi, strategist", status: "Alive", village: "konohagakure", clan: "nara", team: "team-10", rank: "Jonin", style: "Strategy and shadow manipulation",
    summary: "A lazy but brilliant strategist from the Nara clan.", role: "Main cast", jutsu: ["shadow-possession"],
    rel: { father: ["Shikaku Nara"], spouse: ["Temari"], children: ["Shikadai Nara"], teachers: ["Asuma Sarutobi"], friends: ["naruto-uzumaki", "choji-akimichi", "ino-yamanaka"] },
    abil: { ninjutsu: ["Shadow Possession"] }, equip: ["Kunai"], bio: { chunin: "The only participant promoted to chunin in his Chunin Exams.", events: "Becomes a trusted tactician during the war." },
    appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["naruto-uzumaki", "choji-akimichi", "ino-yamanaka"] }),
  ch({ slug: "gaara", name: "Gaara", first: "Gaara", gender: "Male", birthday: "January 19", occupation: "Shinobi, Kazekage", status: "Alive", village: "sunagakure", rank: "Fifth Kazekage", style: "Sand manipulation",
    summary: "A Suna jinchuriki who turns from isolation to leading his village.", role: "Major character", rel: { father: ["Rasa"], siblings: ["Temari", "Kankuro"], friends: ["naruto-uzumaki"] },
    abil: { ninjutsu: ["Sand manipulation"] }, bio: { events: "Meets Naruto during the Chunin Exams and later becomes Kazekage." }, appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["naruto-uzumaki"] }),
  ch({ slug: "jiraiya", name: "Jiraiya", first: "Jiraiya", nick: ["Toad Sage"], gender: "Male", birthday: "November 11", occupation: "Shinobi, writer", status: "Deceased", village: "konohagakure", team: "team-hiruzen", rank: "Sannin", style: "Toad-based ninjutsu and Sage techniques",
    summary: "One of the legendary Sannin and Naruto's teacher.", role: "Teacher", spoiler: true, jutsu: ["rasengan", "sage-mode", "summoning-jutsu"],
    rel: { teachers: ["hiruzen-sarutobi"], students: ["minato-namikaze", "naruto-uzumaki", "Nagato"], friends: ["tsunade"], rivals: [] },
    abil: { ninjutsu: ["Rasengan", "Toad techniques"], senjutsu: ["Sage Mode"], summoning: ["Toads"] }, bio: { events: "Travels widely gathering information and trains Naruto." }, appears: ["Naruto", "Naruto Shippuden"], related: ["naruto-uzumaki", "minato-namikaze", "tsunade", "orochimaru"] }),
  ch({ slug: "minato-namikaze", name: "Minato Namikaze", first: "Minato", nick: ["Yellow Flash of the Leaf"], gender: "Male", birthday: "January 25", occupation: "Shinobi, Hokage", status: "Deceased", village: "konohagakure", team: "team-minato", rank: "Fourth Hokage", style: "Speed and space-time techniques",
    summary: "Konoha's Fourth Hokage, celebrated for his speed.", role: "Major character", spoiler: true, jutsu: ["rasengan", "flying-thunder-god"],
    rel: { spouse: ["kushina-uzumaki"], children: ["naruto-uzumaki"], teachers: ["jiraiya"], students: ["kakashi-hatake", "obito-uchiha", "Rin Nohara"] },
    abil: { ninjutsu: ["Rasengan"], summoning: ["Toads"] }, equip: ["Special three-pronged kunai"], bio: { events: "Develops the Rasengan and leads Konoha as Fourth Hokage." }, appears: ["Naruto", "Naruto Shippuden"], related: ["naruto-uzumaki", "jiraiya", "kakashi-hatake", "kushina-uzumaki"] }),
  ch({ slug: "hiruzen-sarutobi", name: "Hiruzen Sarutobi", first: "Hiruzen", nick: ["The Professor", "Third Hokage"], gender: "Male", birthday: "February 8", occupation: "Hokage", status: "Deceased", village: "konohagakure", clan: "sarutobi", team: "team-hiruzen", rank: "Third Hokage", style: "Broad knowledge of many techniques",
    summary: "Konoha's Third Hokage and the teacher of the Sannin.", role: "Major character", spoiler: true, rel: { students: ["jiraiya", "tsunade", "orochimaru"], children: ["Asuma Sarutobi"] },
    abil: { ninjutsu: ["Wide range of elemental techniques"], summoning: ["Monkeys"] }, bio: { events: "Leads Konoha for many years and teaches the Sannin." }, appears: ["Naruto", "Naruto Shippuden"], related: ["jiraiya", "tsunade", "orochimaru"] }),
  ch({ slug: "tsunade", name: "Tsunade", first: "Tsunade", gender: "Female", birthday: "August 2", occupation: "Shinobi, medical ninja, Hokage", status: "Alive", village: "konohagakure", clan: "senju", team: "team-hiruzen", rank: "Sannin; Fifth Hokage", style: "Medical ninjutsu and immense physical strength",
    summary: "One of the Sannin and Konoha's Fifth Hokage, the greatest medical ninja of her age.", role: "Major character", jutsu: ["mystical-palm"], rel: { teachers: ["hiruzen-sarutobi"], students: ["sakura-haruno", "Shizune"], friends: ["jiraiya"] },
    abil: { ninjutsu: ["Medical ninjutsu"], taijutsu: ["Monstrous strength"], summoning: ["Slugs"] }, bio: { events: "Returns to Konoha to become Fifth Hokage." }, appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["jiraiya", "sakura-haruno", "orochimaru", "hashirama-senju"] }),
  ch({ slug: "orochimaru", name: "Orochimaru", first: "Orochimaru", gender: "Male", birthday: "October 27", occupation: "Shinobi, scientist", status: "Alive", village: "otogakure", team: "team-hiruzen", org: ["sound-four"], rank: "Sannin", style: "Snake-based techniques and forbidden research",
    summary: "One of the Sannin who left Konoha and founded Otogakure.", role: "Antagonist turned ally", spoiler: true, rel: { teachers: ["hiruzen-sarutobi"], students: ["sasuke-uchiha", "Kabuto Yakushi"] },
    abil: { ninjutsu: ["Snake techniques"], summoning: ["Snakes"] }, bio: { events: "Leaves Konoha, founds Otogakure and is closely involved in Sasuke's path." }, appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["jiraiya", "tsunade", "sasuke-uchiha"] }),
  ch({ slug: "rock-lee", name: "Rock Lee", first: "Lee", gender: "Male", birthday: "November 27", occupation: "Shinobi", status: "Alive", village: "konohagakure", team: "team-guy", rank: "Chunin and above", style: "Pure taijutsu with no ninjutsu or genjutsu",
    summary: "A taijutsu specialist who proves that hard work can rival natural talent.", role: "Main cast", jutsu: ["eight-gates"], rel: { teachers: ["might-guy"], friends: ["neji-hyuga", "naruto-uzumaki"] },
    abil: { taijutsu: ["Konoha-style taijutsu", "Eight Gates"] }, bio: { events: "Trains relentlessly under Guy." }, appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["might-guy", "neji-hyuga"] }),
  ch({ slug: "neji-hyuga", name: "Neji Hyuga", first: "Neji", gender: "Male", birthday: "July 3", occupation: "Shinobi", status: "Deceased", village: "konohagakure", clan: "hyuga", team: "team-guy", rank: "Jonin", style: "Gentle Fist with the Byakugan", summary: "A gifted Hyuga prodigy and member of Team Guy.", role: "Main cast", spoiler: true,
    jutsu: ["byakugan", "gentle-fist"], rel: { teachers: ["might-guy"], friends: ["rock-lee"], rivals: ["naruto-uzumaki"] }, abil: { dojutsu: ["Byakugan"], taijutsu: ["Gentle Fist"] }, bio: { events: "His outlook on fate changes after facing Naruto in the Chunin Exams." }, appears: ["Naruto", "Naruto Shippuden"], related: ["hinata-hyuga", "rock-lee", "might-guy"] }),
  ch({ slug: "might-guy", name: "Might Guy", first: "Guy", gender: "Male", birthday: "January 1", occupation: "Shinobi, teacher", status: "Alive", village: "konohagakure", team: "team-guy", rank: "Jonin", style: "Taijutsu mastery", summary: "An energetic taijutsu master and the teacher of Team Guy.", role: "Teacher",
    jutsu: ["eight-gates"], rel: { students: ["rock-lee", "neji-hyuga", "Tenten"], rivals: ["kakashi-hatake"], children: ["Metal Lee"] }, abil: { taijutsu: ["Taijutsu mastery", "Eight Gates"] }, appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["rock-lee", "kakashi-hatake"] }),
  ch({ slug: "madara-uchiha", name: "Madara Uchiha", first: "Madara", gender: "Male", birthday: "December 24", occupation: "Clan leader", status: "Deceased", village: "konohagakure", clan: "uchiha", rank: "Legendary Uchiha leader", nature: ["Fire"], style: "Overwhelming dojutsu and ninjutsu",
    summary: "A legendary Uchiha leader and rival of Hashirama Senju.", role: "Major antagonist", spoiler: true, jutsu: ["sharingan", "susanoo", "fireball-jutsu"], rel: { rivals: ["hashirama-senju"] },
    abil: { dojutsu: ["Sharingan"], ninjutsu: ["Fire Style"] }, bio: { events: "Helps found Konoha, then breaks with it." }, appears: ["Naruto Shippuden"], related: ["hashirama-senju"] }),
  ch({ slug: "hashirama-senju", name: "Hashirama Senju", first: "Hashirama", nick: ["God of Shinobi"], gender: "Male", birthday: "October 23", occupation: "Hokage", status: "Deceased", village: "konohagakure", clan: "senju", rank: "First Hokage", style: "Wood Release and sage-level power",
    summary: "The first Hokage and co-founder of Konoha.", role: "Major character", spoiler: true, jutsu: ["wood-release"], rel: { siblings: ["Tobirama Senju"], rivals: ["madara-uchiha"], spouse: ["Mito Uzumaki"] },
    abil: { ninjutsu: ["Wood Release"], senjutsu: ["Sage Mode"] }, bio: { events: "Founds Konohagakure and becomes its first Hokage." }, appears: ["Naruto", "Naruto Shippuden"], related: ["madara-uchiha", "tsunade"] }),
  ch({ slug: "obito-uchiha", name: "Obito Uchiha", first: "Obito", gender: "Male", birthday: "February 10", occupation: "Shinobi", status: "Deceased", village: "konohagakure", clan: "uchiha", team: "team-minato", rank: "Genin; later a masked leader", style: "Dojutsu and space-time techniques",
    summary: "A Team Minato member whose path takes a dramatic turn.", role: "Major character", spoiler: true, jutsu: ["sharingan", "kamui"], rel: { teachers: ["minato-namikaze"], friends: ["kakashi-hatake"] }, abil: { dojutsu: ["Sharingan"] }, appears: ["Naruto", "Naruto Shippuden"], related: ["kakashi-hatake", "minato-namikaze"] }),
  ch({ slug: "kushina-uzumaki", name: "Kushina Uzumaki", first: "Kushina", gender: "Female", birthday: "July 10", occupation: "Shinobi", status: "Deceased", village: "konohagakure", clan: "uzumaki", rank: "Shinobi", style: "Sealing techniques", summary: "Naruto's mother, a member of the Uzumaki clan.",
    role: "Supporting", spoiler: true, rel: { spouse: ["minato-namikaze"], children: ["naruto-uzumaki"] }, abil: { ninjutsu: ["Sealing techniques"] }, appears: ["Naruto Shippuden"], related: ["naruto-uzumaki", "minato-namikaze"] }),
  ch({ slug: "boruto-uzumaki", name: "Boruto Uzumaki", first: "Boruto", gender: "Male", occupation: "Shinobi", status: "Alive", village: "konohagakure", clan: "uzumaki", rank: "Genin", style: "Ninjutsu and tool-based techniques", summary: "The son of Naruto and Hinata and the lead of the next generation.",
    role: "Protagonist (next generation)", rel: { father: ["naruto-uzumaki"], mother: ["hinata-hyuga"], siblings: ["Himawari Uzumaki"] }, appears: ["Boruto"], related: ["naruto-uzumaki", "hinata-hyuga"] }),
  ch({ slug: "iruka-umino", name: "Iruka Umino", first: "Iruka", gender: "Male", occupation: "Academy teacher", status: "Alive", village: "konohagakure", rank: "Chunin", style: "Academy-level ninjutsu", summary: "A kind Academy teacher who gives Naruto his first recognition.",
    role: "Teacher", rel: { students: ["naruto-uzumaki"] }, appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["naruto-uzumaki"] }),
  ch({ slug: "ino-yamanaka", name: "Ino Yamanaka", first: "Ino", gender: "Female", birthday: "September 23", occupation: "Shinobi", status: "Alive", village: "konohagakure", clan: "yamanaka", team: "team-10", rank: "Shinobi", style: "Mind-based techniques",
    summary: "A Yamanaka clan kunoichi and Sakura's friendly rival.", role: "Main cast", rel: { friends: ["sakura-haruno", "shikamaru-nara", "choji-akimichi"] }, appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["sakura-haruno", "shikamaru-nara"] }),
  ch({ slug: "choji-akimichi", name: "Choji Akimichi", first: "Choji", gender: "Male", birthday: "May 1", occupation: "Shinobi", status: "Alive", village: "konohagakure", clan: "akimichi", team: "team-10", rank: "Shinobi", style: "Body-expansion taijutsu",
    summary: "A loyal Akimichi clan member who turns calories into power.", role: "Main cast", rel: { friends: ["shikamaru-nara", "ino-yamanaka"] }, appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["shikamaru-nara", "ino-yamanaka"] }),
  ch({ slug: "kiba-inuzuka", name: "Kiba Inuzuka", first: "Kiba", gender: "Male", birthday: "July 7", occupation: "Shinobi", status: "Alive", village: "konohagakure", clan: "inuzuka", team: "team-8", rank: "Shinobi", style: "Fighting alongside his ninken, Akamaru",
    summary: "An Inuzuka clan member who fights beside his dog partner, Akamaru.", role: "Main cast", rel: { friends: ["hinata-hyuga", "shino-aburame"] }, appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["hinata-hyuga", "shino-aburame"] }),
  ch({ slug: "shino-aburame", name: "Shino Aburame", first: "Shino", gender: "Male", birthday: "January 23", occupation: "Shinobi", status: "Alive", village: "konohagakure", clan: "aburame", team: "team-8", rank: "Shinobi", style: "Insect-based techniques",
    summary: "A calm Aburame clan member who hosts insects inside his body.", role: "Main cast", rel: { friends: ["hinata-hyuga", "kiba-inuzuka"] }, appears: ["Naruto", "Naruto Shippuden", "Boruto"], related: ["hinata-hyuga", "kiba-inuzuka"] }),
];

const cl = (o) => ({ origin: "", symbol: "", homeland: "", village: null, ability: "", kekkei: null, history: "", events: [], orgs: [], ...o });
export const clans = [
  cl({ slug: "uchiha", name: "Uchiha Clan", village: "konohagakure", summary: "A Konoha clan known for the Sharingan and Fire Style techniques.", symbol: "A red-and-white fan (uchiwa)", ability: "Sharingan, Fire Style", kekkei: "Sharingan", homeland: "Uchiha district of Konohagakure",
    history: "One of the founding clans of Konoha, long associated with the Sharingan and with a rivalry with the Senju.", events: ["Founding of Konoha", "Fall of the clan (major spoiler)"], members: ["sasuke-uchiha", "itachi-uchiha", "madara-uchiha", "obito-uchiha"] }),
  cl({ slug: "uzumaki", name: "Uzumaki Clan", village: null, summary: "A clan associated with sealing techniques and strong life force.", symbol: "A spiral", ability: "Sealing techniques", homeland: "Uzushiogakure (Land of Whirlpools)",
    history: "Known for fuinjutsu and long lives; closely tied to the Senju by marriage.", members: ["naruto-uzumaki", "kushina-uzumaki", "boruto-uzumaki"] }),
  cl({ slug: "hyuga", name: "Hyuga Clan", village: "konohagakure", summary: "A Konoha clan with the Byakugan and the Gentle Fist style.", ability: "Byakugan, Gentle Fist", kekkei: "Byakugan", homeland: "Hyuga compound in Konohagakure",
    history: "A major Konoha clan split into a main branch and a branch family.", members: ["hinata-hyuga", "neji-hyuga"] }),
  cl({ slug: "senju", name: "Senju Clan", village: "konohagakure", summary: "A founding clan of Konoha, known for great vitality.", ability: "Strong vitality", history: "Co-founded Konoha with the Uchiha under Hashirama Senju.", members: ["hashirama-senju", "tsunade"] }),
  cl({ slug: "nara", name: "Nara Clan", village: "konohagakure", summary: "A Konoha clan using shadow-based techniques and sharp strategy.", ability: "Shadow techniques", homeland: "Konohagakure", members: ["shikamaru-nara"] }),
  cl({ slug: "akimichi", name: "Akimichi Clan", village: "konohagakure", summary: "A Konoha clan whose techniques convert calories into power.", ability: "Body expansion", members: ["choji-akimichi"] }),
  cl({ slug: "yamanaka", name: "Yamanaka Clan", village: "konohagakure", summary: "A Konoha clan specializing in mind-transfer and sensory techniques.", ability: "Mind techniques", members: ["ino-yamanaka"] }),
  cl({ slug: "aburame", name: "Aburame Clan", village: "konohagakure", summary: "A Konoha clan that hosts insects inside their bodies.", ability: "Insect techniques", members: ["shino-aburame"] }),
  cl({ slug: "inuzuka", name: "Inuzuka Clan", village: "konohagakure", summary: "A Konoha clan that fights alongside ninken partners.", ability: "Ninken partnership", members: ["kiba-inuzuka"] }),
  cl({ slug: "sarutobi", name: "Sarutobi Clan", village: "konohagakure", summary: "A Konoha clan associated with the Third Hokage.", ability: "Fire Style", members: ["hiruzen-sarutobi"] }),
  cl({ slug: "otsutsuki", name: "Otsutsuki Clan", village: null, summary: "A powerful clan of celestial origin tied to the earliest shinobi history.", ability: "Immense chakra", history: "Detailed history is pending verification.", members: [] }),
  cl({ slug: "kaguya", name: "Kaguya Clan", village: null, summary: "A fierce clan from the Land of Water region known for a bone-based Kekkei Genkai.", ability: "Bone manipulation", kekkei: "Shikotsumyaku", members: [] }),
];

export const villages = [
  { slug: "konohagakure", name: "Konohagakure", jp: "木ノ葉隠れの里", nation: "Land of Fire", great: true, leader: "Hokage", current: "Naruto Uzumaki (Seventh Hokage)", previous: ["Hashirama Senju", "Tobirama Senju", "Hiruzen Sarutobi", "Minato Namikaze", "Tsunade", "Kakashi Hatake"], mapX: 66, mapY: 56,
    location: "Land of Fire", history: "Founded by the Senju and Uchiha clans and led by the Hokage.", military: "Genin, chunin and jonin ranks with specialized units such as the Anbu.", special: "Wide range of clan techniques.", events: ["Pain's Assault", "Fourth Great Ninja War"], arcs: ["pains-assault", "chunin-exams"], summary: "Hidden Leaf Village, the home of Team 7." },
  { slug: "sunagakure", name: "Sunagakure", jp: "砂隠れの里", nation: "Land of Wind", great: true, leader: "Kazekage", current: "Gaara (Fifth Kazekage)", previous: ["Rasa (Fourth Kazekage)"], mapX: 30, mapY: 60, location: "Desert of the Land of Wind", history: "A desert village known for puppet and sand techniques.", military: "Standard ranks with strong puppet corps.", special: "Puppet techniques, sand control.", events: ["Chunin Exams"], arcs: ["chunin-exams"], summary: "Hidden Sand Village, set in a desert." },
  { slug: "kirigakure", name: "Kirigakure", jp: "霧隠れの里", nation: "Land of Water", great: true, leader: "Mizukage", current: "Mei Terumi (Fifth Mizukage) at the end of Shippuden; Chojuro in the Boruto era", previous: [], mapX: 86, mapY: 80, location: "Island nation in the Land of Water", history: "Hidden Mist Village; details pending.", military: "Pending.", special: "Water Style techniques.", events: [], arcs: [], summary: "Hidden Mist Village, on an island nation." },
  { slug: "kumogakure", name: "Kumogakure", jp: "雲隠れの里", nation: "Land of Lightning", great: true, leader: "Raikage", current: "Darui (Fifth Raikage)", previous: [], mapX: 58, mapY: 16, location: "Mountainous Land of Lightning", history: "Hidden Cloud Village; details pending.", military: "Pending.", special: "Lightning Style techniques.", events: [], arcs: [], summary: "Hidden Cloud Village, in a mountainous region." },
  { slug: "iwagakure", name: "Iwagakure", jp: "岩隠れの里", nation: "Land of Earth", great: true, leader: "Tsuchikage", current: "Kurotsuchi (Fifth Tsuchikage)", previous: [], mapX: 22, mapY: 26, location: "Rocky Land of Earth", history: "Hidden Stone Village; details pending.", military: "Pending.", special: "Earth Style techniques.", events: [], arcs: [], summary: "Hidden Stone Village, set among rocky terrain." },
  { slug: "amegakure", name: "Amegakure", jp: "雨隠れの里", nation: "Land of Rain", great: false, leader: null, current: null, previous: [], mapX: 47, mapY: 48, location: "Land of Rain", history: "A smaller village with ties to the Akatsuki.", military: "Pending.", special: "Pending.", events: [], arcs: ["pains-assault"], summary: "Hidden Rain Village, a smaller village with ties to the Akatsuki." },
  { slug: "otogakure", name: "Otogakure", jp: "音隠れの里", nation: "Land of Rice Fields", great: false, leader: null, current: null, previous: [], mapX: 54, mapY: 38, location: "Land of Rice Fields", history: "Founded by Orochimaru.", military: "Pending.", special: "Pending.", events: [], arcs: [], summary: "Hidden Sound Village, a smaller village linked to Orochimaru." },
  { slug: "takigakure", name: "Takigakure", jp: "滝隠れの里", nation: "Land of Waterfalls", great: false, leader: null, current: null, previous: [], mapX: 40, mapY: 74, location: "Hidden land of waterfalls", history: "Details pending.", military: "Pending.", special: "Pending.", events: [], arcs: [], summary: "Hidden Waterfall Village, a small village in a hidden land." },
  { slug: "kusagakure", name: "Kusagakure", jp: "草隠れの里", nation: "Land of Grass", great: false, leader: null, current: null, previous: [], mapX: 40, mapY: 34, location: "Land of Grass", history: "Details pending.", military: "Pending.", special: "Pending.", events: [], arcs: [], summary: "Hidden Grass Village, a smaller village near the larger nations." },
];

const og = (o) => ({ founders: [], leaders: [], objectives: "", structure: "", symbol: "", missions: [], battles: [], members: [], ...o });
export const organizations = [
  og({ slug: "akatsuki", name: "Akatsuki", summary: "A secretive group of powerful missing-nin working toward a hidden goal.", objectives: "Gather the tailed beasts (the larger plan is a spoiler).", symbol: "Red clouds on a black cloak", structure: "Pairs of members operating on missions.", members: ["itachi-uchiha"], battles: ["Pain's Assault"] }),
  og({ slug: "anbu", name: "Anbu", summary: "Konoha's covert operations unit for sensitive missions.", symbol: "Animal masks", structure: "Squads reporting to the Hokage.", members: ["kakashi-hatake", "itachi-uchiha"] }),
  og({ slug: "root", name: "Root", summary: "A hidden faction that operated apart from the regular Anbu chain of command.", structure: "Secret organization within Konoha." }),
  og({ slug: "allied-shinobi-forces", name: "Allied Shinobi Forces", summary: "The united shinobi army formed from the great nations during the war.", objectives: "Defeat the common enemy of the war.", battles: ["Fourth Great Ninja War"], members: ["naruto-uzumaki", "gaara", "kakashi-hatake"] }),
  og({ slug: "seven-ninja-swordsmen", name: "Seven Ninja Swordsmen of the Mist", summary: "An elite group of swordsmen from Kirigakure." }),
  og({ slug: "taka", name: "Taka (Hebi)", summary: "A team Sasuke led after leaving Orochimaru.", members: ["sasuke-uchiha"] }),
  og({ slug: "sound-four", name: "Sound Four", summary: "Four elite shinobi serving Orochimaru.", members: ["orochimaru"] }),
  og({ slug: "kara", name: "Kara", summary: "A mysterious organization from the Boruto era." }),
  og({ slug: "konoha-military-police-force", name: "Konoha Military Police Force", summary: "Konoha's police force, closely associated with the Uchiha clan." }),
];

export const teams = [
  { slug: "team-7", name: "Team 7", sensei: "kakashi-hatake", members: ["naruto-uzumaki", "sasuke-uchiha", "sakura-haruno"], formation: "Three genin and one jonin sensei", summary: "The squad of Naruto, Sasuke and Sakura, led by Kakashi.", missions: ["Land of Waves escort"], battles: ["Chunin Exams events"] },
  { slug: "team-8", name: "Team 8", sensei: "Kurenai Yuhi", members: ["hinata-hyuga", "kiba-inuzuka", "shino-aburame"], formation: "Tracking-focused squad", summary: "A tracking-focused squad that includes Hinata.", missions: [], battles: [] },
  { slug: "team-10", name: "Team 10", sensei: "Asuma Sarutobi", members: ["shikamaru-nara", "ino-yamanaka", "choji-akimichi"], formation: "Traditional Ino-Shika-Cho combination", summary: "A squad built on the traditional Ino-Shika-Cho combination.", missions: [], battles: [] },
  { slug: "team-guy", name: "Team Guy", sensei: "might-guy", members: ["rock-lee", "neji-hyuga", "Tenten"], formation: "Taijutsu-focused squad", summary: "A taijutsu-focused squad led by Might Guy.", missions: [], battles: [] },
  { slug: "sannin", name: "Sannin", sensei: "hiruzen-sarutobi", members: ["jiraiya", "tsunade", "orochimaru"], formation: "Three legendary shinobi", summary: "Three legendary Konoha shinobi, students of Hiruzen.", missions: [], battles: [] },
  { slug: "team-minato", name: "Team Minato", sensei: "minato-namikaze", members: ["kakashi-hatake", "obito-uchiha", "Rin Nohara"], formation: "Three genin and one jonin sensei", summary: "Minato's squad from Kakashi's youth.", missions: [], battles: [] },
  { slug: "team-hiruzen", name: "Team Hiruzen", sensei: "hiruzen-sarutobi", members: ["jiraiya", "tsunade", "orochimaru"], formation: "Hiruzen's own squad", summary: "The squad that later became known as the Sannin.", missions: [], battles: [] },
];

export const jutsu = [
  { slug: "rasengan", name: "Rasengan", jp: "螺旋丸", category: "Ninjutsu", rank: "A", nature: "None", users: ["minato-namikaze", "jiraiya", "naruto-uzumaki"], summary: "A spinning sphere of concentrated chakra struck against a target." },
  { slug: "chidori", name: "Chidori", jp: "千鳥", category: "Ninjutsu", rank: "A", nature: "Lightning", users: ["kakashi-hatake", "sasuke-uchiha"], summary: "A concentrated lightning-chakra thrust." },
  { slug: "shadow-clone-jutsu", name: "Shadow Clone Jutsu", jp: "影分身の術", category: "Forbidden Jutsu", rank: "B", nature: "None", users: ["naruto-uzumaki"], summary: "Creates solid clones that share experience with the user." },
  { slug: "amaterasu", name: "Amaterasu", jp: "天照", category: "Dojutsu", rank: "S", nature: "Yin-Yang", users: ["itachi-uchiha", "sasuke-uchiha"], summary: "A Sharingan-based technique that produces black flames." },
  { slug: "kamui", name: "Kamui", jp: "神威", category: "Space-Time Ninjutsu", rank: "S", nature: "Space-Time", users: ["kakashi-hatake", "obito-uchiha"], summary: "A Sharingan-based space-time technique." },
  { slug: "fireball-jutsu", name: "Fire Style: Great Fireball Technique", jp: "火遁・豪火球の術", category: "Ninjutsu", rank: "C", nature: "Fire", users: ["sasuke-uchiha", "itachi-uchiha", "madara-uchiha"], summary: "A signature Fire Style technique of the Uchiha clan." },
  { slug: "sharingan", name: "Sharingan", jp: "写輪眼", category: "Dojutsu", rank: "", nature: "None", users: ["sasuke-uchiha", "itachi-uchiha", "kakashi-hatake", "madara-uchiha", "obito-uchiha"], summary: "A dojutsu of the Uchiha clan." },
  { slug: "byakugan", name: "Byakugan", jp: "白眼", category: "Dojutsu", rank: "", nature: "None", users: ["hinata-hyuga", "neji-hyuga"], summary: "A dojutsu of the Hyuga clan with a wide field of vision." },
  { slug: "gentle-fist", name: "Gentle Fist", jp: "柔拳", category: "Taijutsu", rank: "", nature: "None", users: ["hinata-hyuga", "neji-hyuga"], summary: "A Hyuga taijutsu style that targets the chakra network." },
  { slug: "eight-gates", name: "Eight Gates", jp: "八門遁甲", category: "Forbidden Jutsu", rank: "", nature: "None", users: ["rock-lee", "might-guy"], summary: "A taijutsu technique that opens gates in the body to boost power at great cost." },
  { slug: "flying-thunder-god", name: "Flying Thunder God Technique", jp: "飛雷神の術", category: "Space-Time Ninjutsu", rank: "S", nature: "Space-Time", users: ["minato-namikaze"], summary: "A space-time technique tied to special markers." },
  { slug: "sage-mode", name: "Sage Mode", jp: "仙人モード", category: "Senjutsu", rank: "", nature: "None", users: ["naruto-uzumaki", "jiraiya"], summary: "A state that blends natural energy with chakra." },
  { slug: "summoning-jutsu", name: "Summoning Technique", jp: "口寄せの術", category: "Ninjutsu", rank: "", nature: "None", users: ["naruto-uzumaki", "jiraiya"], summary: "Calls a contracted animal to the user's side." },
  { slug: "susanoo", name: "Susanoo", jp: "須佐能乎", category: "Dojutsu", rank: "S", nature: "None", users: ["sasuke-uchiha", "itachi-uchiha", "madara-uchiha"], summary: "A giant spectral guardian produced with the Mangekyo Sharingan." },
  { slug: "tsukuyomi", name: "Tsukuyomi", jp: "月読", category: "Genjutsu", rank: "S", nature: "None", users: ["itachi-uchiha"], summary: "A powerful illusion technique tied to the Mangekyo Sharingan." },
  { slug: "wood-release", name: "Wood Release", jp: "木遁", category: "Kekkei Genkai", rank: "", nature: "Wood", users: ["hashirama-senju"], summary: "A Kekkei Genkai associated with Hashirama Senju." },
  { slug: "shadow-possession", name: "Shadow Possession", jp: "影真似の術", category: "Ninjutsu", rank: "", nature: "Shadow", users: ["shikamaru-nara"], summary: "A Nara clan technique that binds a target by shadow." },
  { slug: "mystical-palm", name: "Mystical Palm Technique", jp: "掌仙術", category: "Medical Ninjutsu", rank: "", nature: "None", users: ["sakura-haruno", "tsunade"], summary: "A basic healing technique using chakra." },
];

export const arcs = [
  { slug: "land-of-waves", name: "Land of Waves", series: "Naruto", canon: "Canon (manga-based)", antagonist: "Zabuza Momochi and Haku", chars: ["naruto-uzumaki", "sasuke-uchiha", "sakura-haruno", "kakashi-hatake"], summary: "Team 7's first major mission, escorting a bridge builder." },
  { slug: "chunin-exams", name: "Chunin Exams", series: "Naruto", canon: "Canon (manga-based)", antagonist: "Orochimaru", chars: ["naruto-uzumaki", "sasuke-uchiha", "sakura-haruno", "gaara", "rock-lee", "neji-hyuga", "shikamaru-nara"], summary: "A multi-stage exam that brings several villages together." },
  { slug: "konoha-crush", name: "Konoha Crush", series: "Naruto", canon: "Canon (manga-based)", antagonist: "Orochimaru", chars: ["naruto-uzumaki", "gaara", "hiruzen-sarutobi", "orochimaru"], summary: "A surprise invasion strikes Konoha during the Chunin Exams." },
  { slug: "search-for-tsunade", name: "Search for Tsunade", series: "Naruto", canon: "Canon (manga-based)", antagonist: "Orochimaru", chars: ["naruto-uzumaki", "jiraiya", "tsunade", "orochimaru"], summary: "Naruto and Jiraiya search for the next Hokage candidate." },
  { slug: "sasuke-retrieval", name: "Sasuke Retrieval", series: "Naruto", canon: "Canon (manga-based)", antagonist: "Sound Four", chars: ["naruto-uzumaki", "sasuke-uchiha", "shikamaru-nara"], summary: "A team of young shinobi races to stop Sasuke from leaving the village." },
  { slug: "kazekage-rescue", name: "Kazekage Rescue", series: "Naruto Shippuden", canon: "Canon (manga-based)", antagonist: "Akatsuki members", chars: ["naruto-uzumaki", "gaara", "sakura-haruno", "kakashi-hatake"], summary: "Konoha shinobi rush to help Suna when the Akatsuki target Gaara." },
  { slug: "pains-assault", name: "Pain's Assault", series: "Naruto Shippuden", canon: "Canon (manga-based)", antagonist: "Pain (leader of the Akatsuki)", chars: ["naruto-uzumaki", "jiraiya", "kakashi-hatake"], summary: "A devastating attack on Konoha by a leader of the Akatsuki." },
  { slug: "five-kage-summit", name: "Five Kage Summit", series: "Naruto Shippuden", canon: "Canon (manga-based)", antagonist: "Pending verification", chars: ["gaara", "sasuke-uchiha"], summary: "The five village leaders meet to decide how to respond to growing threats." },
  { slug: "fourth-great-ninja-war", name: "Fourth Great Ninja War", series: "Naruto Shippuden", canon: "Canon (manga-based)", antagonist: "Madara Uchiha and Obito Uchiha", chars: ["naruto-uzumaki", "sasuke-uchiha", "kakashi-hatake", "gaara", "madara-uchiha", "obito-uchiha"], summary: "The nations unite in a large-scale war." },
];

export const movies = [
  { slug: "ninja-clash-in-the-land-of-snow", name: "Naruto the Movie: Ninja Clash in the Land of Snow", series: "Naruto", year: 2004, antagonist: "", chars: [], summary: "", timeline: "" },
  { slug: "legend-of-the-stone-of-gelel", name: "Naruto the Movie 2: Legend of the Stone of Gelel", series: "Naruto", year: 2005, antagonist: "", chars: [], summary: "", timeline: "" },
  { slug: "guardians-of-the-crescent-moon-kingdom", name: "Naruto the Movie 3: Guardians of the Crescent Moon Kingdom", series: "Naruto", year: 2006, antagonist: "", chars: [], summary: "", timeline: "" },
  { slug: "shippuden-the-movie", name: "Naruto Shippuden the Movie", series: "Naruto Shippuden", year: 2007, antagonist: "", chars: [], summary: "", timeline: "" },
  { slug: "bonds", name: "Naruto Shippuden the Movie: Bonds", series: "Naruto Shippuden", year: 2008, antagonist: "", chars: [], summary: "", timeline: "" },
  { slug: "the-will-of-fire", name: "Naruto Shippuden the Movie: The Will of Fire", series: "Naruto Shippuden", year: 2009, antagonist: "", chars: [], summary: "", timeline: "" },
  { slug: "the-lost-tower", name: "Naruto Shippuden the Movie: The Lost Tower", series: "Naruto Shippuden", year: 2010, antagonist: "Mukade", chars: ["naruto-uzumaki"], summary: "Naruto is sent to the past and gets caught up in a conflict around an ancient tower.", timeline: "" },
  { slug: "blood-prison", name: "Naruto the Movie: Blood Prison", series: "Naruto Shippuden", year: 2011, antagonist: "Mui", chars: ["naruto-uzumaki"], summary: "Naruto is imprisoned in a fortress prison and must uncover why.", timeline: "" },
  { slug: "road-to-ninja", name: "Road to Ninja: Naruto the Movie", series: "Naruto Shippuden", year: 2012, antagonist: "Tobi", chars: ["naruto-uzumaki", "sakura-haruno", "minato-namikaze", "kushina-uzumaki"], summary: "Naruto and Sakura are pulled into an alternate world where things are very different.", timeline: "" },
  { slug: "the-last", name: "The Last: Naruto the Movie", series: "Naruto Shippuden", year: 2014, antagonist: "Toneri Otsutsuki", chars: ["naruto-uzumaki", "hinata-hyuga"], summary: "A threat from the Otsutsuki line pulls Naruto and Hinata into a crisis, set after the war.", timeline: "After the Fourth Great Ninja War (placement pending verification)" },
  { slug: "boruto-naruto-the-movie", name: "Boruto: Naruto the Movie", series: "Boruto", year: 2015, antagonist: "Momoshiki Otsutsuki", chars: ["boruto-uzumaki", "naruto-uzumaki", "sasuke-uchiha"], summary: "Boruto enters the Chunin Exams and an outside threat arrives.", timeline: "Next-generation era (placement pending verification)" },
];

export const seriesInfo = [
  { name: "Naruto", episodes: 220, note: "Part I" },
  { name: "Naruto Shippuden", episodes: 500, note: "Part II" },
  { name: "Boruto: Naruto Next Generations", episodes: 293, note: "Next generation" },
];

export const ERAS = ["Founding era", "Before the series", "Part I", "Part II", "Next generation"];
// Story order only — no in-universe years or episode numbers are claimed.
export const timeline = [
  { slug: "founding-of-konoha", era: "Founding era", title: "Konohagakure is founded", chars: ["hashirama-senju", "madara-uchiha"], arcs: [], spoiler: false, summary: "The Senju and Uchiha clans join forces to found Konohagakure, and Hashirama becomes the First Hokage." },
  { slug: "third-hokage-era", era: "Before the series", title: "Hiruzen leads Konoha and trains the Sannin", chars: ["hiruzen-sarutobi", "jiraiya", "tsunade", "orochimaru"], arcs: [], spoiler: false, summary: "As Third Hokage, Hiruzen guides a generation of shinobi, including the Sannin." },
  { slug: "fourth-hokage", era: "Before the series", title: "Minato becomes Fourth Hokage", chars: ["minato-namikaze", "kakashi-hatake", "obito-uchiha"], arcs: [], spoiler: false, summary: "Minato leads the village, and Team Minato is part of his era." },
  { slug: "naruto-birth", era: "Before the series", title: "Naruto's birth and a major attack on Konoha", chars: ["naruto-uzumaki", "minato-namikaze", "kushina-uzumaki"], arcs: [], spoiler: true, summary: "A major attack on Konoha happens around Naruto's birth and shapes his childhood." },
  { slug: "uchiha-incident", era: "Before the series", title: "The fall of the Uchiha clan", chars: ["sasuke-uchiha", "itachi-uchiha"], arcs: [], spoiler: true, summary: "The clan's fall changes Sasuke's life; the truth behind it is a major revelation." },
  { slug: "team-7-formed", era: "Part I", title: "Team 7 forms and takes its first big mission", chars: ["naruto-uzumaki", "sasuke-uchiha", "sakura-haruno", "kakashi-hatake"], arcs: ["land-of-waves"], spoiler: false, summary: "Team 7 begins under Kakashi and faces its first serious mission." },
  { slug: "chunin-exams-crush", era: "Part I", title: "Chunin Exams and the invasion of Konoha", chars: ["naruto-uzumaki", "gaara", "orochimaru", "hiruzen-sarutobi"], arcs: ["chunin-exams", "konoha-crush"], spoiler: true, summary: "The exams bring villages together, and an invasion follows." },
  { slug: "tsunade-hokage", era: "Part I", title: "Tsunade becomes Fifth Hokage", chars: ["tsunade", "jiraiya", "naruto-uzumaki"], arcs: ["search-for-tsunade"], spoiler: false, summary: "Naruto and Jiraiya search for Tsunade, who returns to lead the village." },
  { slug: "sasuke-leaves", era: "Part I", title: "Sasuke leaves Konoha", chars: ["sasuke-uchiha", "naruto-uzumaki", "shikamaru-nara"], arcs: ["sasuke-retrieval"], spoiler: false, summary: "A team races to stop Sasuke from leaving." },
  { slug: "naruto-returns", era: "Part II", title: "Naruto returns and the Akatsuki threat grows", chars: ["naruto-uzumaki", "gaara", "sakura-haruno", "kakashi-hatake"], arcs: ["kazekage-rescue"], spoiler: false, summary: "After training, Naruto returns as the Akatsuki become more active." },
  { slug: "pains-assault-event", era: "Part II", title: "Attack on Konoha by a leader of the Akatsuki", chars: ["naruto-uzumaki", "jiraiya", "kakashi-hatake"], arcs: ["pains-assault"], spoiler: false, summary: "A devastating attack tests the village." },
  { slug: "five-kage", era: "Part II", title: "The Five Kage Summit", chars: ["gaara", "sasuke-uchiha"], arcs: ["five-kage-summit"], spoiler: false, summary: "The village leaders meet to decide how to respond to the growing threat." },
  { slug: "great-war", era: "Part II", title: "The Fourth Great Ninja War", chars: ["naruto-uzumaki", "sasuke-uchiha", "madara-uchiha", "obito-uchiha"], arcs: ["fourth-great-ninja-war"], spoiler: true, summary: "The nations unite in a large-scale war." },
  { slug: "new-hokage", era: "Next generation", title: "Kakashi is Sixth Hokage; Naruto later becomes Seventh", chars: ["kakashi-hatake", "naruto-uzumaki"], arcs: [], spoiler: true, summary: "Leadership of the village passes to a new generation." },
  { slug: "boruto-era", era: "Next generation", title: "The next generation", chars: ["boruto-uzumaki", "naruto-uzumaki", "hinata-hyuga"], arcs: [], spoiler: false, summary: "Boruto and his classmates begin their own journey." },
];

export const latest = [
  { type: "characters", slug: "gaara", label: "Gaara" },
  { type: "jutsu", slug: "kamui", label: "Kamui" },
  { type: "organizations", slug: "root", label: "Root" },
  { type: "arcs", slug: "pains-assault", label: "Pain's Assault" },
];

export const collections = { characters, clans, villages, organizations, teams, jutsu, arcs, movies };
export const bySlug = (type, slug) => (collections[type] || []).find((x) => x.slug === slug);
export const titleOf = (x) => x.name;
