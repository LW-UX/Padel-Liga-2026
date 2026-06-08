const PADEL_DATA = {
  players: [
    { id: "ludwig_w",   name: "Ludwig W.",   elo: 1099, history: [
      { date: "2026-05-13", elo: 1000, spiel: "Start" },
      { date: "2026-05-13", elo: 1053, spiel: "Spiel 4" },
      { date: "2026-05-19", elo: 1099, spiel: "Spiel 6" }
    ]},
    { id: "jonas_l",    name: "Jonas L.",    elo: 1056, history: [
      { date: "2026-05-13", elo: 1000, spiel: "Start" },
      { date: "2026-05-20", elo: 1056, spiel: "Spiel 2" }
    ]},
    { id: "luca_w",     name: "Luca W.",     elo: 1056, history: [
      { date: "2026-05-13", elo: 1000, spiel: "Start" },
      { date: "2026-05-20", elo: 1056, spiel: "Spiel 2" }
    ]},
    { id: "raphael_h",  name: "Raphael H.",  elo: 1053, history: [
      { date: "2026-05-13", elo: 1000, spiel: "Start" },
      { date: "2026-05-13", elo: 1053, spiel: "Spiel 4" }
    ]},
    { id: "cristian_b", name: "Cristian B.", elo: 992,  history: [
      { date: "2026-05-13", elo: 1000, spiel: "Start" },
      { date: "2026-05-19", elo: 1051, spiel: "Spiel 6" },
      { date: "2026-05-20", elo: 992,  spiel: "Spiel 2" }
    ]},
    { id: "greta_p",    name: "Greta P.",    elo: 949,  history: [
      { date: "2026-05-13", elo: 1000, spiel: "Start" },
      { date: "2026-05-19", elo: 949,  spiel: "Spiel 6" }
    ]},
    { id: "leonie_r",   name: "Leonie R.",   elo: 947,  history: [
      { date: "2026-05-13", elo: 1000, spiel: "Start" },
      { date: "2026-05-20", elo: 947,  spiel: "Spiel 2" }
    ]},
    { id: "florian_z",  name: "Florian Z.",  elo: 947,  history: [
      { date: "2026-05-13", elo: 1000, spiel: "Start" },
      { date: "2026-05-13", elo: 947,  spiel: "Spiel 4" }
    ]},
    { id: "niklas_k",   name: "Niklas K.",   elo: 901,  history: [
      { date: "2026-05-13", elo: 1000, spiel: "Start" },
      { date: "2026-05-13", elo: 947,  spiel: "Spiel 4" },
      { date: "2026-05-19", elo: 901,  spiel: "Spiel 6" }
    ]}
  ],

  matches: [
    {
      id: "spiel4",
      datum: "2026-05-13",
      spieltag: 1,
      team1: { spieler: ["Ludwig W.", "Raphael H."], saetze: 2 },
      team2: { spieler: ["Florian Z.", "Niklas K."], saetze: 0 },
      ergebnis: "6:3, 6:2",
      sieger: 1
    },
    {
      id: "spiel6",
      datum: "2026-05-19",
      spieltag: 2,
      team1: { spieler: ["Ludwig W.", "Cristian B."], saetze: 2 },
      team2: { spieler: ["Niklas K.", "Greta P."], saetze: 0 },
      ergebnis: "7:5, 6:1",
      sieger: 1
    },
    {
      id: "spiel2",
      datum: "2026-05-20",
      spieltag: 1,
      team1: { spieler: ["Leonie R.", "Cristian B."], saetze: 0 },
      team2: { spieler: ["Jonas L.", "Luca W."], saetze: 2 },
      ergebnis: "2:6, 0:6",
      sieger: 2
    }
  ]
};
