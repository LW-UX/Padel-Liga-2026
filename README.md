# Padel-Liga 2026 – Elo-Webseite

## Dateien

```
padel-liga/
├── index.html        ← Hauptseite (Rangliste, Verlauf, Spiele, Admin)
└── data/
    └── data.js       ← Alle Spieler- und Spieldaten (hier aktualisieren!)
```

## Auf GitHub Pages veröffentlichen

1. GitHub öffnen → **New repository** → Name: `padel-liga-2026`
2. **Public** auswählen → Repository erstellen
3. Alle Dateien hochladen (Upload files)
4. Unter **Settings → Pages → Source: Deploy from branch → main → / (root)** speichern
5. Nach 1–2 Minuten ist die Seite erreichbar unter:
   `https://DEIN-USERNAME.github.io/padel-liga-2026`

## Daten aktualisieren

Nach jedem Spiel öffnest du `data/data.js` und aktualisierst:

### Spieler-Elo aktualisieren
```js
{ id: "ludwig_w", name: "Ludwig W.", history: [
  { date: "2026-05-13", elo: 1000, spiel: "Start" },
  { date: "2026-05-13", elo: 1053, spiel: "Spiel 4" },
  { date: "2026-05-19", elo: 1099, spiel: "Spiel 6" },
  { date: "2026-06-01", elo: 1120, spiel: "Spiel 8" }  // ← neu hinzufügen
]},
```

### Neues Spiel hinzufügen
```js
{
  id: "spiel8",
  datum: "2026-06-01",
  spieltag: 3,
  team1: { spieler: ["Ludwig W.", "Jonas L."], saetze: 2 },
  team2: { spieler: ["Greta P.", "Florian Z."], saetze: 1 },
  ergebnis: "6:3, 4:6, 10:7",
  sieger: 1
}
```

## Admin-Passwort

Standard: `padel2026`

Zum Ändern: In `index.html` die Zeile `const ADMIN_PW = 'padel2026';` anpassen.
