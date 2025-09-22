// Roster provided by user (kept as-is)
const narutoCharacters = [
  // ======== TEAM 7 ========
  ["Naruto", "Wind", 1000,
    ["Shadow Clone Jutsu", 150, "None"],
    ["Rasengan", 300, "Wind"],
    ["Summoning Jutsu (Toad)", 250, "None"]
  ],
  ["Sage Mode Naruto", "Wind", 1200,
    ["Rasen Shuriken", 400, "Wind"],
    ["Sage Art Frog Kumite", 250, "Taijutsu"],
    ["Massive Rasengan Barrage", 350, "Wind"]
  ],
  ["Hokage Naruto", "Wind", 1500,
    ["Kurama Chakra Rasengan", 500, "Wind"],
    ["Tailed Beast Bomb", 600, "None"],
    ["Truth-Seeking Orbs", 450, "Yin-Yang"]
  ],

  ["Sasuke", "Fire/Lightning", 950,
    ["Fireball Jutsu", 250, "Fire"],
    ["Chidori", 350, "Lightning"],
    ["Lion’s Barrage", 200, "Taijutsu"]
  ],
  ["EMS Sasuke", "Fire/Lightning", 1300,
    ["Amaterasu", 450, "Fire"],
    ["Susanoo Blade", 400, "Lightning"],
    ["Kirin", 500, "Lightning"]
  ],
  ["Rinnegan Sasuke", "Lightning/Space-Time", 1500,
    ["Amenotejikara", 400, "Space-Time"],
    ["Indra’s Arrow", 600, "Lightning"],
    ["Susanoo Arrow", 500, "Lightning"]
  ],

  ["Sakura", "Strength", 1100,
    ["Super Punch", 300, "Taijutsu"],
    ["Medical Heal", -300, "None"],
    ["Cherry Blossom Impact", 400, "Taijutsu"]
  ],

  ["Kakashi", "Lightning", 1100,
    ["Chidori", 350, "Lightning"],
    ["Water Dragon Jutsu", 300, "Water"],
    ["Earth Wall Jutsu", 200, "Earth"]
  ],
  ["MS Kakashi", "Lightning", 1200,
    ["Kamui", 500, "Space-Time"],
    ["Lightning Blade", 400, "Lightning"],
    ["Shadow Clone Feint", 200, "None"]
  ],

  // ======== KONOHA ========
  ["Rock Lee", "Taijutsu", 1000,
    ["Leaf Hurricane", 200, "Taijutsu"],
    ["Primary Lotus", 350, "Taijutsu"],
    ["Hidden Lotus", 500, "Taijutsu"]
  ],
  ["Might Guy", "Taijutsu", 1200,
    ["Morning Peacock", 400, "Taijutsu"],
    ["Daytime Tiger", 500, "Taijutsu"],
    ["Night Guy", 800, "Taijutsu"]
  ],
  ["Neji", "Byakugan", 1000,
    ["Gentle Fist", 250, "Taijutsu"],
    ["Eight Trigrams Sixty-Four Palms", 400, "Taijutsu"],
    ["Rotation", 300, "Taijutsu"]
  ],
  ["Hinata", "Byakugan", 950,
    ["Gentle Fist Strike", 200, "Taijutsu"],
    ["Protective Eight Trigrams 64 Palms", 350, "Taijutsu"],
    ["Twin Lion Fists", 400, "Taijutsu"]
  ],
  ["Shikamaru", "Shadow", 1000,
    ["Shadow Possession Jutsu", 250, "Shadow"],
    ["Shadow Strangle", 300, "Shadow"],
    ["Shadow Sewing", 300, "Shadow"]
  ],
  ["Choji", "Earth", 1050,
    ["Expansion Jutsu", 250, "None"],
    ["Human Boulder", 300, "Earth"],
    ["Butterfly Mode Punch", 450, "Earth"]
  ],
  ["Ino", "Mind", 950,
    ["Mind Transfer Jutsu", 250, "Mind"],
    ["Sensory Jutsu", 200, "Mind"],
    ["Medical Heal", -200, "None"]
  ],
  ["Kiba", "Beast", 1000,
    ["Fang Over Fang", 300, "Taijutsu"],
    ["Wolf Fang Over Fang", 400, "Taijutsu"],
    ["Dynamic Marking", 150, "None"]
  ],
  ["Shino", "Bug", 1000,
    ["Bug Swarm", 300, "None"],
    ["Bug Clone", 200, "None"],
    ["Bug Drain", 350, "None"]
  ],
  ["Tenten", "Weapon", 950,
    ["Kunai Storm", 250, "Weapon"],
    ["Scroll Weapon Barrage", 350, "Weapon"],
    ["Explosive Seals", 300, "Weapon"]
  ],

  // ======== LEGENDARY SANNIN ========
  ["Jiraiya", "Fire/Oil", 1300,
    ["Toad Oil Flame Bullet", 400, "Fire"],
    ["Rasengan", 350, "Wind"],
    ["Summoning Gamabunta", 500, "None"]
  ],
  ["Orochimaru", "Snake", 1250,
    ["Snake Binding Jutsu", 300, "None"],
    ["Kusanagi Sword", 350, "None"],
    ["Summoning Manda", 500, "None"]
  ],
  ["Tsunade", "Medical/Strength", 1200,
    ["Super Punch", 350, "Taijutsu"],
    ["Regeneration", -400, "None"],
    ["Summoning Katsuyu", 500, "None"]
  ],

  // ======== AKATSUKI ========
  ["Itachi", "Fire/Genjutsu", 1250,
    ["Fireball Jutsu", 300, "Fire"],
    ["Tsukuyomi", 400, "Genjutsu"],
    ["Amaterasu", 450, "Fire"]
  ],
  ["Kisame", "Water", 1300,
    ["Water Shark Bomb", 400, "Water"],
    ["Samehada Drain", 350, "Water"],
    ["Water Prison Shark Dance", 500, "Water"]
  ],
  ["Deidara", "Explosion", 1200,
    ["C1 Explosive Clay", 300, "Explosion"],
    ["C2 Dragon", 400, "Explosion"],
    ["C3 Giant Bomb", 500, "Explosion"]
  ],
  ["Sasori", "Puppets", 1200,
    ["Puppet Mastery", 300, "None"],
    ["Iron Sand", 400, "Earth"],
    ["Hundred Puppets", 500, "None"]
  ],
  ["Hidan", "Curse", 1200,
    ["Triple-Blade Scythe", 300, "Weapon"],
    ["Curse Ritual", 500, "Curse"],
    ["Immortality", -400, "None"]
  ],
  ["Kakuzu", "Elemental Masks", 1300,
    ["Fire Mask Blast", 350, "Fire"],
    ["Lightning Mask Blast", 400, "Lightning"],
    ["Earth Spear", 300, "Earth"]
  ],
  ["Konan", "Paper", 1200,
    ["Paper Shuriken", 300, "Paper"],
    ["Paper Clone", 250, "Paper"],
    ["Paper Ocean", 500, "Paper"]
  ],
  ["Nagato", "Rinnegan", 1400,
    ["Shinra Tensei", 400, "Gravity"],
    ["Chibaku Tensei", 600, "Gravity"],
    ["Universal Pull", 300, "Gravity"]
  ],

  // ======== KAGE ========
  ["Hashirama Senju", "Wood", 1500,
    ["Wood Dragon Jutsu", 400, "Wood"],
    ["Wood Human Jutsu", 500, "Wood"],
    ["Sage Mode Wood Style", 600, "Wood"]
  ],
  ["Tobirama Senju", "Water", 1300,
    ["Water Severing Wave", 400, "Water"],
    ["Flying Raijin", 450, "Space-Time"],
    ["Edo Tensei", 500, "Forbidden"]
  ],
  ["Hiruzen Sarutobi", "All Elements", 1350,
    ["Shuriken Shadow Clone", 300, "Weapon"],
    ["Enma Staff Strike", 350, "Summon"],
    ["Five Element Jutsu", 500, "All"]
  ],
  ["Minato Namikaze", "Wind/Space-Time", 1400,
    ["Flying Raijin Slash", 450, "Space-Time"],
    ["Rasengan", 350, "Wind"],
    ["Contract Seal", 300, "Seal"]
  ],
  ["Gaara", "Sand", 1200,
    ["Sand Coffin", 350, "Earth"],
    ["Sand Shield", 200, "Earth"],
    ["Sand Burial", 400, "Earth"]
  ],
  ["A (Raikage)", "Lightning", 1350,
    ["Lariat", 400, "Lightning"],
    ["Lightning Armor", 350, "Lightning"],
    ["Double Lariat", 450, "Lightning"]
  ],
  ["Mei Terumi", "Water/Lava", 1200,
    ["Lava Release", 400, "Lava"],
    ["Boil Release", 350, "Boil"],
    ["Water Dragon", 300, "Water"]
  ],
  ["Ōnoki", "Dust", 1200,
    ["Particle Style Cube", 500, "Dust"],
    ["Earth Rock Fist", 300, "Earth"],
    ["Weight Manipulation", 350, "Earth"]
  ],

  // ======== JINCHŪRIKI ========
  ["Gaara (Shukaku)", "Sand", 1300,
    ["Sand Shuriken", 350, "Sand"],
    ["Partial Transformation", 400, "Sand"],
    ["Shukaku Arm", 500, "Sand"]
  ],
  ["Killer Bee", "Lightning", 1350,
    ["Acrobat", 400, "Taijutsu"],
    ["Lariat", 450, "Lightning"],
    ["Tailed Beast Bomb", 500, "None"]
  ],
  ["Yugito Nii", "Fire", 1200,
    ["Cat Claw", 300, "Taijutsu"],
    ["Fiery Fur", 350, "Fire"],
    ["Matatabi Fireball", 400, "Fire"]
  ]
];
