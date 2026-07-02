const PADEL_DATA = {

  players: [
    { id: "agnes_k",    name: "Agnes K.",    initials: "AK",  firma: "Headsquare", history: [
      { date: "2026-05-11", elo: 750,  spiel: "Start" },
      { date: "2026-06-11", elo: 708,  spiel: "Spiel 1" }
    ]},
    { id: "andreas_l",  name: "Andreas L.",  initials: "AL",  firma: "Headsquare", history: [
      { date: "2026-05-11", elo: 1100, spiel: "Start" },
      { date: "2026-06-03", elo: 1025, spiel: "Spiel 12" },
      { date: "2026-06-10", elo: 1090, spiel: "Spiel 5" }
    ]},
    { id: "chris_m",    name: "Chris M.",    initials: "ChM",  firma: "Envidual",   history: [
      { date: "2026-05-11", elo: 900, spiel: "Start" },
      { date: "2026-06-17", elo: 950, spiel: "Spiel 8" },
      { date: "2026-06-17", elo: 884, spiel: "Spiel 3" },
      { date: "2026-06-23", elo: 956, spiel: "Spiel 13" }
    ]},
    { id: "christoph_l",name: "Christoph L.",initials: "CL",  firma: "Headsquare", history: [
      { date: "2026-05-11", elo: 850,  spiel: "Start" },
      { date: "2026-06-11", elo: 909,  spiel: "Spiel 1" },
      { date: "2026-06-12", elo: 858,  spiel: "Spiel 7" },
      { date: "2026-06-25", elo: 790,  spiel: "Spiel 14" }
    ]},
    { id: "cristian_b", name: "Cristian B.", initials: "CB",  firma: "Hanako",     history: [
      { date: "2026-05-11", elo: 800, spiel: "Start" },
      { date: "2026-05-19", elo: 877, spiel: "Spiel 6" },
      { date: "2026-05-20", elo: 785, spiel: "Spiel 2" },
      { date: "2026-06-25", elo: 866, spiel: "Spiel 14" }
    ]},
    { id: "florian_z",  name: "Florian Z.",  initials: "FZ",  firma: "Hanako",     history: [
      { date: "2026-05-11", elo: 800,  spiel: "Start" },
      { date: "2026-05-13", elo: 773,  spiel: "Spiel 4" }
    ]},
    { id: "greta_p",    name: "Greta P.",    initials: "GP",  firma: "Hanako",     history: [
      { date: "2026-05-11", elo: 900,  spiel: "Start" },
      { date: "2026-05-19", elo: 840,  spiel: "Spiel 6" },
      { date: "2026-06-03", elo: 797,  spiel: "Spiel 12" },
      { date: "2026-06-11", elo: 748,  spiel: "Spiel 1" }
    ]},
    { id: "irene_w",    name: "Irene W.",    initials: "IW",  firma: "Headsquare", history: [
      { date: "2026-05-11", elo: 750, spiel: "Start" },
      { date: "2026-06-17", elo: 702, spiel: "Spiel 8" },
      { date: "2026-06-17", elo: 783, spiel: "Spiel 3" },
      { date: "2026-06-23", elo: 745, spiel: "Spiel 13" }
    ]},
    { id: "jonas_l",    name: "Jonas L.",    initials: "JL",  firma: "Envidual",   history: [
      { date: "2026-05-11", elo: 800, spiel: "Start" },
      { date: "2026-05-20", elo: 885, spiel: "Spiel 2" },
      { date: "2026-06-03", elo: 951, spiel: "Spiel 12" },
      { date: "2026-06-17", elo: 993, spiel: "Spiel 8" }
    ]},
    { id: "leonie_r",   name: "Leonie R.",   initials: "LR",  firma: "Hanako",     history: [
      { date: "2026-05-11", elo: 800, spiel: "Start" },
      { date: "2026-05-20", elo: 722, spiel: "Spiel 2" },
      { date: "2026-06-17", elo: 678, spiel: "Spiel 8" }
    ]},
    { id: "luca_w",     name: "Luca W.",     initials: "LW",  firma: "Envidual",   history: [
      { date: "2026-05-11", elo: 800, spiel: "Start" },
      { date: "2026-05-20", elo: 885, spiel: "Spiel 2" },
      { date: "2026-06-10", elo: 969, spiel: "Spiel 5" },
      { date: "2026-06-24", elo: 1027, spiel: "Spiel 24" }
    ]},
    { id: "ludwig_w",   name: "Ludwig W.",   initials: "LuW",  firma: "Envidual",   history: [
      { date: "2026-05-11", elo: 1100, spiel: "Start" },
      { date: "2026-05-13", elo: 1130, spiel: "Spiel 4" },
      { date: "2026-05-19", elo: 1161, spiel: "Spiel 6" },
      { date: "2026-06-23", elo: 1073, spiel: "Spiel 13" }
    ]},
    { id: "lukas_p",    name: "Lukas P.",    initials: "LP",  firma: "Headsquare", history: [
      { date: "2026-05-11", elo: 1150, spiel: "Start" },
      { date: "2026-06-10", elo: 1049, spiel: "Spiel 5" },
      { date: "2026-06-24", elo: 1098, spiel: "Spiel 24" },
      { date: "2026-06-25", elo: 1130, spiel: "Spiel 14" }
    ]},
    { id: "marcel_m",   name: "Marcel M.",   initials: "MzM",  firma: "Envidual",   history: [
      { date: "2026-05-11", elo: 1000, spiel: "Start" },
      { date: "2026-06-03", elo: 1053, spiel: "Spiel 12" },
      { date: "2026-06-12", elo: 1126, spiel: "Spiel 7" },
      { date: "2026-06-17", elo: 1154, spiel: "Spiel 3" },
      { date: "2026-06-24", elo: 1077, spiel: "Spiel 24" }
    ]},
    { id: "marco_m",    name: "Marco M.",    initials: "MaMay",  firma: "Headsquare", history: [
      { date: "2026-05-11", elo: 1050, spiel: "Start" },
      { date: "2026-06-11", elo: 1081, spiel: "Spiel 1" },
      { date: "2026-06-12", elo: 1149, spiel: "Spiel 7" }
    ]},
    { id: "martin_b",   name: "Martin B.",   initials: "MB",  firma: "Headsquare", history: [
      { date: "2026-05-11", elo: 800, spiel: "Start" },
      { date: "2026-06-10", elo: 752, spiel: "Spiel 5" },
      { date: "2026-06-17", elo: 708, spiel: "Spiel 3" },
      { date: "2026-06-25", elo: 663, spiel: "Spiel 14" }
    ]},
    { id: "niklas_k",   name: "Niklas K.",   initials: "NK",  firma: "Hanako",     history: [
      { date: "2026-05-11", elo: 850,  spiel: "Start" },
      { date: "2026-05-13", elo: 817,  spiel: "Spiel 4" },
      { date: "2026-05-19", elo: 768,  spiel: "Spiel 6" },
      { date: "2026-06-24", elo: 739,  spiel: "Spiel 24" }
    ]},
    { id: "raphael_h",  name: "Raphael H.",  initials: "RH",  firma: "Headsquare", history: [
      { date: "2026-05-11", elo: 1100, spiel: "Start" },
      { date: "2026-05-13", elo: 1130, spiel: "Spiel 4" },
      { date: "2026-06-12", elo: 1041, spiel: "Spiel 7" },
      { date: "2026-06-23", elo: 1095, spiel: "Spiel 13" }
    ]}
  ],

  // Uhrzeiten als Text im Format "hh.mm" eintragen, z. B. "07.30". Ohne Uhrzeit: null.
  matches: [
    // SPIELTAG 1
    { id: "spiel1",  spieltag: 1, datum: "2026-06-11", uhrzeit: "12.30", team1: { spieler: ["Greta P.",    "Agnes K."]    }, team2: { spieler: ["Christoph L.", "Marco M."]  }, ergebnis: "1:6, 3:6", saetze: "0:2", sieger: 2 },
    { id: "spiel2",  spieltag: 1, datum: "2026-05-20", uhrzeit: "12.30", team1: { spieler: ["Leonie R.",   "Cristian B."] }, team2: { spieler: ["Jonas L.",     "Luca W."]   }, ergebnis: "2:6, 0:6", saetze: "0:2", sieger: 2 },
    { id: "spiel3",  spieltag: 1, datum: "2026-06-17", uhrzeit: "13.00", team1: { spieler: ["Martin B.",   "Chris M."]    }, team2: { spieler: ["Marcel M.",    "Irene W."]  }, ergebnis: "4:6, 3:6", saetze: "0:2", sieger: 2 },
    { id: "spiel4",  spieltag: 1, datum: "2026-05-13", uhrzeit: "17.30", team1: { spieler: ["Ludwig W.",   "Raphael H."]  }, team2: { spieler: ["Florian Z.",   "Niklas K."] }, ergebnis: "6:3, 6:2", saetze: "2:0", sieger: 1 },
    // SPIELTAG 2
    { id: "spiel5",  spieltag: 2, datum: "2026-06-10", uhrzeit: "12.00", team1: { spieler: ["Lukas P.",    "Martin B."]   }, team2: { spieler: ["Luca W.",      "Andreas L."]}, ergebnis: "0:6, 4:6", saetze: "0:2", sieger: 2 },
    { id: "spiel6",  spieltag: 2, datum: "2026-05-19", uhrzeit: "13.00", team1: { spieler: ["Ludwig W.",   "Cristian B."] }, team2: { spieler: ["Niklas K.",    "Greta P."]  }, ergebnis: "7:5, 6:1", saetze: "2:0", sieger: 1 },
    { id: "spiel7",  spieltag: 2, datum: "2026-06-12", uhrzeit: "07.30", team1: { spieler: ["Christoph L.","Raphael H."]  }, team2: { spieler: ["Marco M.",     "Marcel M."] }, ergebnis: "1:6, 1:6", saetze: "0:2", sieger: 2 },
    { id: "spiel8",  spieltag: 2, datum: "2026-06-17", uhrzeit: "12.00", team1: { spieler: ["Chris M.",    "Jonas L."]    }, team2: { spieler: ["Irene W.",     "Leonie R."] }, ergebnis: "6:0, 6:2", saetze: "2:0", sieger: 1 },
    // SPIELTAG 3
    { id: "spiel9",  spieltag: 3, datum: "2026-06-08", uhrzeit: null, team1: { spieler: ["Cristian B.", "Chris M."]    }, team2: { spieler: ["Raphael H.",   "Leonie R."] }, ergebnis: null, saetze: null, sieger: null },
    { id: "spiel10", spieltag: 3, datum: "2026-06-08", uhrzeit: null, team1: { spieler: ["Agnes K.",    "Lukas P."]    }, team2: { spieler: ["Ludwig W.",    "Marco M."]  }, ergebnis: null, saetze: null, sieger: null },
    { id: "spiel11", spieltag: 3, datum: "2026-06-08", uhrzeit: null, team1: { spieler: ["Christoph L.","Florian Z."]  }, team2: { spieler: ["Luca W.",      "Irene W."]  }, ergebnis: null, saetze: null, sieger: null },
    { id: "spiel12", spieltag: 3, datum: "2026-06-03", uhrzeit: "12.30", team1: { spieler: ["Greta P.",    "Andreas L."]  }, team2: { spieler: ["Marcel M.",    "Jonas L."]  }, ergebnis: "1:6, 6:3 – 6:10", saetze: "1:2", sieger: 2 },
    // SPIELTAG 4
    { id: "spiel13", spieltag: 4, datum: "2026-06-23", uhrzeit: "07.30", team1: { spieler: ["Chris M.",    "Raphael H."]  }, team2: { spieler: ["Ludwig W.",    "Irene W."]  }, ergebnis: "7:6 (11:9), 6:2", saetze: "2:0", sieger: 1 },
    { id: "spiel14", spieltag: 4, datum: "2026-06-25", uhrzeit: "12.00", team1: { spieler: ["Cristian B.", "Lukas P."]    }, team2: { spieler: ["Christoph L.", "Martin B."] }, ergebnis: "6:1, 6:0", saetze: "2:0", sieger: 1 },
    { id: "spiel15", spieltag: 4, datum: "2026-07-07", uhrzeit: "07.30", team1: { spieler: ["Marco M.",    "Andreas L."]  }, team2: { spieler: ["Leonie R.",    "Niklas K."] }, ergebnis: null, saetze: null, sieger: null },
    { id: "spiel16", spieltag: 4, datum: "2026-06-22", uhrzeit: null, team1: { spieler: ["Marcel M.",   "Florian Z."]  }, team2: { spieler: ["Agnes K.",     "Jonas L."]  }, ergebnis: null, saetze: null, sieger: null },
    // SPIELTAG 5
    { id: "spiel17", spieltag: 5, datum: "2026-07-06", uhrzeit: null, team1: { spieler: ["Martin B.",   "Luca W."]     }, team2: { spieler: ["Florian Z.",   "Ludwig W."] }, ergebnis: null, saetze: null, sieger: null },
    { id: "spiel18", spieltag: 5, datum: "2026-07-06", uhrzeit: null, team1: { spieler: ["Chris M.",    "Agnes K."]    }, team2: { spieler: ["Jonas L.",     "Greta P."]  }, ergebnis: null, saetze: null, sieger: null },
    { id: "spiel19", spieltag: 5, datum: "2026-07-06", uhrzeit: null, team1: { spieler: ["Raphael H.",  "Andreas L."]  }, team2: { spieler: ["Lukas P.",     "Niklas K."] }, ergebnis: null, saetze: null, sieger: null },
    { id: "spiel20", spieltag: 5, datum: "2026-07-06", uhrzeit: null, team1: { spieler: ["Christoph L.","Irene W."]    }, team2: { spieler: ["Marco M.",     "Cristian B."]},ergebnis: null, saetze: null, sieger: null },
    // SPIELTAG 6
    { id: "spiel21", spieltag: 6, datum: "2026-07-20", uhrzeit: null, team1: { spieler: ["Florian Z.",  "Leonie R."]   }, team2: { spieler: ["Andreas L.",   "Ludwig W."] }, ergebnis: null, saetze: null, sieger: null },
    { id: "spiel22", spieltag: 6, datum: "2026-07-20", uhrzeit: null, team1: { spieler: ["Irene W.",    "Cristian B."] }, team2: { spieler: ["Greta P.",     "Christoph L."]},ergebnis: null,saetze: null, sieger: null },
    { id: "spiel23", spieltag: 6, datum: "2026-07-20", uhrzeit: null, team1: { spieler: ["Jonas L.",    "Marco M."]    }, team2: { spieler: ["Agnes K.",     "Martin B."] }, ergebnis: null, saetze: null, sieger: null },
    { id: "spiel24", spieltag: 6, datum: "2026-06-24", uhrzeit: "12.00", team1: { spieler: ["Marcel M.",   "Niklas K."]   }, team2: { spieler: ["Lukas P.",     "Luca W."]   }, ergebnis: "4:6, 4:6", saetze: "0:2", sieger: 2 },
    // SPIELTAG 7 – Ausgleichsspieltag
    { id: "spiel25", spieltag: 7, datum: "2026-08-03", uhrzeit: null, team1: { spieler: ["Niklas K.",   "Chris M."]    }, team2: { spieler: ["Agnes K.",     "Andreas L."]}, ergebnis: null, saetze: null, sieger: null },
    { id: "spiel26", spieltag: 7, datum: "2026-08-03", uhrzeit: null, team1: { spieler: ["Florian Z.",  "Raphael H."]  }, team2: { spieler: ["Marcel M.",    "Luca W."]   }, ergebnis: null, saetze: null, sieger: null },
    { id: "spiel27", spieltag: 7, datum: "2026-08-03", uhrzeit: null, team1: { spieler: ["Leonie R.",   "Lukas P."]    }, team2: { spieler: ["Greta P.",     "Martin B."] }, ergebnis: null, saetze: null, sieger: null }
  ]
};
