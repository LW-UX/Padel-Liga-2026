const PADEL_INFO = {
  shortInfo: [
    "Jeder Teilnehmer hat 6 Spiele.",
    "Partner und Gegner werden jedes Spiel neu gelost.",
    "Es gibt kein fixes Spieldatum, sondern Zeitfenster. Die Spieler stimmen sich selbst ab.",
    "Ein Spiel hat 2 Gewinnsätze, bei 1:1 entscheidet der Match-Tie-Break bis 10 Punkte.",
    "Die Top 4 nach jeweils 6 Spielen qualifizieren sich für das Final Four."
  ],

  sections: [
    {
      title: "Spielregeln",
      intro: "Die im Folgenden aufgezählten Regeln stellen nur einen Auszug aus dem gesamten Regelwerk dar.",
      link: { label: "Vollständiges Regelwerk", href: "https://de.wikipedia.org/wiki/Padel" },
      groups: [
        {
          title: "Aufschlag, Seitenwahl und Wechsel",
          items: [
            "Der Gewinner des Losentscheids kann zwischen dem Aufschlagsrecht und der Spielfeldseite wählen.",
            "Der Aufschlag darf nur hinter der Aufschlaglinie ausgeführt werden. Er muss als Unterhandschlag unterhalb der Hüfte erfolgen.",
            "Nach dem Aufschlag muss der Ball im schräg gegenüberliegenden Aufschlagfeld aufspringen. Danach darf er die Wände, aber nicht den Zaun berühren.",
            "Wenn der Ball von der Kante zwischen Zaun und Wand wieder nach vorne springt, wird der Aufschlag wiederholt.",
            "Aufschläge, die das Netz berühren und danach korrekt im Aufschlagfeld aufkommen, müssen wiederholt werden.",
            "Die Mannschaft mit Aufschlagrecht wechselt nach jedem Aufschlag die Seite im eigenen Feld.",
            "Beide Mannschaften wechseln die Spielseiten, wenn die Summe der Spiele eine ungerade Zahl erreicht."
          ]
        },
        {
          title: "Aufschlag und Ballwechsel",
          items: [
            "Kommt der Ball nicht im korrekten schräg gegenüberliegenden Aufschlagfeld auf oder geht ins Netz, ist das ein Aufschlagfehler.",
            "Zwei misslungene Aufschläge hintereinander bedeuten Punktverlust.",
            "Trifft der Ball im korrekten Aufschlagfeld auf, springt dann aber an den Zaun, gilt dies als Aufschlagfehler.",
            "Im weiteren Spielverlauf ist die Berührung des Zauns erlaubt, wenn der Ball zuvor den Boden berührt hat.",
            "Der Ball muss nach jedem Schlag zunächst den Boden auf der gegnerischen Spielfeldseite berühren, ehe er Rückwand oder Zaun berührt.",
            "Der Ball darf maximal einmal den Boden auf einer Spielfeldseite berühren.",
            "Netz und Netzpfosten dürfen während eines Spiels weder mit dem Schläger noch von Spielern inklusive Kleidung berührt werden.",
            "Volleyschläge von Bällen, die das Netz noch nicht überquert haben, sind ungültig."
          ]
        },
        {
          title: "Reihenfolge der Rückgabe",
          items: [
            "Die Erwiderung des Aufschlags wird von den Spielern der nicht aufschlagenden Mannschaft abwechselnd gespielt.",
            "Diese Reihenfolge darf während des Satzes nicht gewechselt werden.",
            "Der zweite Aufschlag nach einem Fehler wird stets von der gleichen Aufschlagsseite wie der erste Aufschlag ausgeführt."
          ]
        },
        {
          title: "Aufschlagwiederholung",
          items: [
            "Wenn der Ball das Netz beim Aufschlag berührt und danach im korrekten Aufschlagfeld landet.",
            "Wenn der Ball nach dem Berühren des Netzes oder der Netzpfosten einen gegnerischen Spieler oder Gegenstand berührt.",
            "Wenn einer der gegnerischen Spieler nicht bereit war.",
            "Falls das Netz beim wiederholten zweiten Aufschlag auch berührt wird, hat der aufschlagende Spieler nur einen weiteren Versuch."
          ]
        }
      ]
    },
    {
      title: "Zählweise",
      intro: "Die Zählweise ist bis auf eine Ausnahme komplett identisch zum Tennis.",
      groups: [
        {
          title: "Zählfolge",
          items: [
            "Die Punktfolge lautet 15, 30, 40 und mit dem vierten Punkt ist das Spiel gewonnen."
          ]
        },
        {
          title: "Einstand",
          items: [
            "Bei Einstand (40:40) wird statt des traditionellen Vorteils nur ein einziger, entscheidender Punkt gespielt. Das empfangende Doppel hat die Wahl, ob der Aufschlag auf der linken oder rechten Seite des Spielfelds erfolgen soll."
          ]
        },
        {
          title: "Satzgewinn",
          items: [
            "Einen Satz gewinnt die Mannschaft, die zuerst sechs Spiele mit einem Vorteil von zwei Spielen gewinnt. Bei einem Gleichstand von fünf Spielen muss also bis sieben zu fünf gespielt werden. Falls es zum Gleichstand von sechs Spielen kommt, wird wie im Tennis ein Tie-Break gespielt."
          ]
        },
        {
          title: "Tie-Break",
          items: [
            "Im Tie-Break schlägt die Mannschaft und der Spieler auf, der dies auch bei normaler Fortsetzung des Spiels getan hätte. Der erste Spieler hat dabei nur einen Aufschlag, danach wechselt das Aufschlagrecht zwischen den beiden Teams nach jeweils zwei gespielten Punkten.",
            "Die Mannschaften tauschen im Tie-Break nach jeweils sechs gespielten Punkten die Spielfeldseite.",
            "Den Tie-Break gewinnt die Mannschaft, die zuerst sieben Punkte mit zwei Punkten Vorteil erspielt."
          ]
        },
        {
          title: "Sieger",
          items: [
            "Das Match gewinnt die Mannschaft, die zwei Sätze gewinnt. Gewinnen beide Mannschaften einen Satz, wird wie im Tennis ein Match-Tie-Break gespielt."
          ]
        },
        {
          title: "Match-Tie-Break",
          items: [
            "Der Ablauf des Match-Tie-Breaks ist identisch wie der Tie-Break. Der einzige Unterschied ist, dass eine Mannschaft zuerst zehn Punkte mit zwei Punkten Vorteil erspielen muss."
          ]
        }
      ],
      note: "Ob ihr euch an die Zählweise haltet, müsst ihr selbst entscheiden. Am Ende muss ein Ergebnis im richtigen Format feststehen."
    },
    {
      title: "Platzbuchung",
      paragraphs: [
        "Wenn sich die 4 Teilnehmer eines Spiels gefunden haben, entscheiden sie, ob und wann sie einen Padelplatz buchen möchten. Verfügbare Termine findest du bei Playtomic über die Webseite oder in der App.",
        "Abendzeiten sind sehr beliebt und mindestens eine Woche im Voraus ausgebucht. Daher rechtzeitig einen Platz buchen oder morgens beziehungsweise mittags spielen.",
        "Den Wunschtermin mit Datum, Uhrzeit und Spielnummer bitte an das Hanako Leben Squad oder direkt an Ludwig übermitteln. Der Platz wird für euch gebucht.",
        "Die Kosten der Platzbuchung werden von der Firma übernommen.",
        "Vergesst nicht, die Schläger in Clearooms zu buchen. Um Bälle muss sich selbst gekümmert werden.",
        "Gebt Bescheid, wenn ihr eure Playtomic-Profile samt Ergebnis eintragen wollt. Hierfür Headsquare United auf Playtomic folgen."
      ]
    },
    {
      title: "Ergebnismeldung",
      paragraphs: [
        "Nachdem das Spiel absolviert ist und die Gewinner feststehen, muss das Ergebnis gemeldet werden, damit es eingetragen werden kann.",
        "Ergebnisse bitte im Teams-Kanal Sport | Headsquare & Hanako & Envidual, per Mail an Hanako Leben Squad oder direkt an Ludwig melden."
      ],
      items: [
        "Spielnummer",
        "Datum",
        "Ergebnis"
      ],
      note: "Beispiel: Spiel 12 | 24. Mai | 4:6, 6:2 - 10:5"
    },
    {
      title: "Punktevergabe",
      paragraphs: [
        "Die Punkte werden wie im Eishockey vergeben. Bei einem Zwei-Sätze-Sieg gibt es 3 Punkte für die Gewinner und 0 Punkte für die Verlierer.",
        "Steht es nach beiden Sätzen 1:1, erhalten beide Teams einen Punkt. Im Match-Tie-Break wird um den Extrapunkt gespielt."
      ],
      table: [
        ["Team", "Punkte", "Ergebnis"],
        ["Gewinner", "3", "2:0"],
        ["Gewinner im Match-Tie-Break", "2", "1:1 - 10:3"],
        ["Verlierer im Match-Tie-Break", "1", "1:1 - 3:10"],
        ["Verlierer", "0", "0:2"]
      ],
      paragraphs: [
        "Für die Tabelle werden nachstehende Kriterien in der aufgeführten Reihenfolge zur Ermittlung der Platzierung herangezogen:"
      ],
      items: [
        "Anzahl Punkte",
        "Anzahl Siege",
        "Differenz",
        "Anzahl gewonnener Sätze"
      ]
    }
  ],

  articles: [
    {
      spieltag: 1,
      startDate: "2026-05-11",
      endDate: "2026-05-24",
      title: "Der Aufschlag ist gemacht - die Padel-Liga 2026 startet!",
      meta: "SPIELTAG 1  ·  11. MAI - 22. MAI 2026",
      body: [
        { type: "p", text: "Es ist so weit: Die Padel-Liga 2026 der Unternehmensgruppe Headsquare, Hanako und Envidual öffnet ihre Tore. Mit dem ersten Spieltag - ausgetragen im Zeitfenster vom 11. bis 22. Mai - fallen endlich die ersten Bälle. Die Spannung unter den 18 Teilnehmerinnen und Teilnehmern könnte kaum größer sein, die ersten Ergebnisse werden sehnlichst erwartet." },

        { type: "h", text: "Spiel 1 - Das Eröffnungsspiel" },
        { type: "match", text: "Greta P & Agnes K vs. Christoph L & Marco M" },
        { type: "p", text: "Das Eröffnungsspiel der Liga gehört vier Protagonisten, auf die sich sofort aller Blicke richten. Marco M meldete sich bereits im Vorfeld zu Wort - und gab sich dabei erstaunlich geerdet:" },
        { type: "quote", text: "Wir wollen erstmal tief stapeln - der Druck ist natürlich riesig. Nichtsdestotrotz sind wir motiviert und gewillt, das Spiel zu gewinnen und gleich mit einem Sieg in die Liga zu starten.", author: "Marco M" },
        { type: "p", text: "Er und sein Partner Christoph L haben sich nach eigener Aussage bereits intensiv abgestimmt. Ob die demonstrative Bescheidenheit Taktik oder echte Zurückhaltung ist, werden Greta P und Agnes K auf dem Court herausfinden." },

        { type: "h", text: "Spiel 2 - Das Unternehmensduell" },
        { type: "match", text: "Leonie R & Cristian B (Hanako) vs. Jonas L & Luca W (Envidual)" },
        { type: "p", text: "Spiel 2 hat eine zusätzliche Dimension: Hanako gegen Envidual liefert uns das erste firmenübergreifende Kräftemessen der Liga. Und Leonie R macht keinerlei Hehl daraus, wie sie den Ausgang dieser Begegnung einschätzt:" },
        { type: "quote", text: "Ich werde das Turnier gewinnen. Also gewinne ich auch das erste Spiel. So einfach ist das.", author: "Leonie R" },
        { type: "p", text: "Klarer kann man seine Ambitionen kaum formulieren. Jonas L und Luca W sind gewarnt, Envidual wird sich diesen Firmenruhm nicht kampflos nehmen lassen." },

        { type: "h", text: "Spiel 3 - Das erste Mayr-Duell" },
        { type: "match", text: "Martin B & Chris M vs. Marcel M & Irene W" },
        { type: "p", text: "Die Auslosung hat es so gewollt: Mit Chris M gegen Marcel M ist das erste Mayr-Duell der Ligageschichte Programm. Und während Chris M sich noch bedeckt hält, hat Marcel M seine Karten längst auf den Tisch gelegt:" },
        { type: "quote", text: "Es gibt bestimmt technisch versiertere Spieler, das muss ich zugeben. Aber es gibt keinen anderen Spieler mit diesem Spirit wie mich. Und das ist das Wichtigste bei einem Wettbewerb wie diesem.", author: "Marcel M" },
        { type: "p", text: "Technik gegen Spirit - eine der ältesten Fragen im Sport. Martin B und Irene W werden jedenfalls alles daransetzen, dem Familientreffen die richtige Wendung zu geben." },

        { type: "h", text: "Spiel 4 - Die stille Favoritenpartie" },
        { type: "match", text: "Ludwig W & Raphael H vs. Florian Z & Niklas K" },
        { type: "p", text: "Das vierte Spiel des Spieltags gehört vier Akteuren, die bislang noch keine großen Töne spucken. Vielleicht ist genau das ihre Stärke. Manchmal kommen die größten Überraschungen von denen, die leise starten und laut enden." },

        { type: "h", text: "Alle Augen auf den Court" },
        { type: "p", text: "Zwei Gewinnsätze, bei 1:1 entscheidet ein Match-Tie-Break bis 10 Punkte. Punkte werden vergeben wie im Eishockey: Ein klarer Sieg bringt 3 Punkte, ein Sieg im Tie-Break 2, eine knappe Niederlage immerhin noch 1. Wer nach sechs Spieltagen oben steht, krönt sich zum ersten Champion der Unternehmenspadel-Liga." },
        { type: "p", text: "Möge der Beste gewinnen. Der erste Spieltag kann kommen." }
      ]
    },
    {
      spieltag: 2,
      startDate: "2026-05-25",
      endDate: "2026-06-07",
      title: "Weiter geht's - der zweite Spieltag steht in den Startlöchern",
      meta: "SPIELTAG 2  ·  25. MAI - 5. JUNI 2026",
      body: [
        { type: "p", text: "Die Tinte der ersten Ergebnisse ist kaum trocken, da wartet schon der zweite Spieltag. Spieltag 1 hat gezeigt, wozu diese Liga fähig ist und Spieltag 2 legt nach. Mit neuen Paarungen, alten Rivalitäten in neuer Verkleidung und einem Spiel, das bereits gespielt ist, wird der Spieltag zum nächsten Kapitel einer Liga, die gerade erst Fahrt aufnimmt." },

        { type: "h", text: "Spiel 5 - Die Tennisasse unter sich" },
        { type: "match", text: "Lukas P & Martin B vs. Luca W & Andreas L" },
        { type: "p", text: "Lange haben alle auf diesen Moment gewartet: Mit Spiel 5 betreten Lukas P und Andreas L endlich offiziell die Bühne der Padel-Liga. Und das Schicksal hat es gut gemeint - oder böse, je nach Perspektive. Denn die beiden aktivsten Tennisspieler der gesamten Liga stehen sich gleich in ihrer Premierenpartie gegenüber. Beide gelten intern als heiße Anwärter auf den Titel. Aber ob Tenniserfahrung auf dem Padelcourt hilft oder ein falsches Sicherheitsgefühl erzeugt, werden die Sätze zeigen." },
        { type: "p", text: "Luca W, der in Spiel 2 des ersten Spieltags noch auf der Siegerseite stand, ist von der Brisanz dieser Begegnung sichtlich angetan:" },
        { type: "quote", text: "Was ein Match, wenn nicht sogar das größte der ganzen Liga. POWER!", author: "Luca W" },
        { type: "p", text: "Mehr braucht es nicht. Die Erwartungshaltung ist gesetzt." },

        { type: "h", text: "Spiel 6 - Bereits gespielt: Ludwig W & Cristian B siegen 2:0" },
        { type: "match", text: "Ludwig W & Cristian B vs. Niklas K & Greta P | Ergebnis: 7:5, 6:1" },
        { type: "p", text: "Spieltag 2 hat bereits sein erstes Resultat. Ludwig W und Cristian B bezwangen Niklas K und Greta P mit 7:5 und 6:1 und legten damit früh ein Ausrufezeichen in der Tabelle. Was dabei kaum jemand ahnte: Cristian B spielte das gesamte Match mit geprellten Rippen - Nachwirkungen eines Fußballspiels vom Sonntag zuvor. Dass das Team gegen Ende trotzdem so dominant auftrat, unterstreicht die Klasse dieser Paarung." },
        { type: "p", text: "Für die Unterlegenen war es kein Abend zum Vergessen, hielten sie zumindest den ersten Satz noch sehr gut mit." },
        { type: "quote", text: "Das Spiel hat Spaß gemacht. Irgendwann war die Energie zwar weg, aber wir hatten coole Ballwechsel und man wird auf jeden Fall besser. Ein Comeback von mir kommt auf jeden Fall noch.", author: "Greta P" },
        { type: "p", text: "Worte, die man sich merken sollte. Wer Greta unterschätzt, könnte das noch bereuen." },

        { type: "h", text: "Spiel 7 - Einstige Partner, neue Rivalen" },
        { type: "match", text: "Christoph L & Raphael H vs. Marco M & Marcel M" },
        { type: "p", text: "Der Spieltag hat seine Geschichte: Beim Eröffnungsspiel sollen Christoph L und Marco M noch gemeinsam auf dem Platz stehen - Seite an Seite, im selben Team. Nun stehen sie sich aber erstmal als Rivalen am Netz gegenüber. Die Liga dreht die Paarungen, und plötzlich sind ehemalige Partner die härtesten Gegner." },
        { type: "p", text: "Noch brisanter wird es durch zwei weitere Verbindungen: Raphael H und Marco M kennen sich gut vom Tenniscourt, wo sie regelmäßig gemeinsam spielen. Jetzt sind sie Gegner. Zudem spielen mit Marco und Marcel zwei Mayrs im selben Team. Ein Duell, das über die Padel-Liga hinaus eine neue Dimension bekommt. Vier Spieler, die sich alle kennen und alle gewinnen wollen. Spiel 7 dürfte eines der persönlichsten des gesamten Turniers werden." },

        { type: "h", text: "Spiel 8 - Das Rematch: Jonas trifft wieder auf Leonie" },
        { type: "match", text: "Chris M & Jonas L vs. Irene W & Leonie R" },
        { type: "p", text: "Kaum ist Spieltag 1 durch, serviert Spieltag 2 das nächste Kapitel der spannendsten Einzelrivalität des Ligastarts: Jonas L gegen Leonie R. In Spiel 2 hatte Jonas mit seinem damaligen Partner Luca W das Duell gegen Leonie klar für sich entschieden. Jetzt neue Partner, neues Glück - oder nicht?" },
        { type: "p", text: "Jonas gibt sich gewohnt bescheiden:" },
        { type: "quote", text: "Für mich ist eigentlich jedes Spiel ein Easy Win von vornherein. Nachdem ich beim letzten Spiel die Leonie schon geschlagen habe, sollten wir die 2 auch in der Tasche haben.", author: "Jonas L" },
        { type: "p", text: "Leonie R, die ihrerseits den Turniersieg bereits für sich reklamiert hat, dürfte diese Aussage mit einem Lächeln quittieren und auf dem Platz antworten wollen. Mit Irene W als neuer Partnerin an ihrer Seite bekommt das Rematch eine neue Dynamik. Ob Chris M und Jonas L die Partie tatsächlich als Formsache abhaken können, wird sich zeigen. Die Liga hat bislang eines bewiesen: Nichts ist garantiert." },

        { type: "h", text: "Der zweite Spieltag läuft" },
        { type: "p", text: "Obwohl Spiel 1 und Spiel 3 aus Spieltag 1 krankheits- und urlaubsbedingt noch ausstehen, nimmt die Liga dennoch an Fahrt auf. Die Tabelle beginnt sich zu formen, die ersten Charaktere zeigen sich und mit jedem Spiel wird klarer, wer hier wirklich für den Titel spielt." }
      ]
    },
    {
      spieltag: 3,
      startDate: "2026-06-08",
      endDate: "2026-06-21",
      title: "Die Liga zeigt Zähne",
      meta: "SPIELTAG 3  ·  8. JUNI - 19. JUNI 2026",
      body: [
        { type: "p", text: "Zwei Spieltage sind absolviert, der dritte steht in den Startlöchern. Die aktuelle Bilanz lautet: Von acht Spielen der ersten beiden Spieltage sind vier gespielt." },
        { type: "p", text: "Und trotzdem: Die Tabelle nimmt Formen an. Ludwig W thront mit sechs Punkten an der Spitze. Jonas L hat letzten Mittwoch nachgelegt. Gleichzeitig stehen sieben von achtzehn SpielerInnen noch bei null - kein Spiel, kein Punkt, kein Satz. Für sie ist die Liga bisher ein Versprechen, das noch eingelöst werden muss. Spieltag 3 soll das ändern." },

        { type: "h", text: "Spiel 9 - Presseboykott trifft Kampfansage" },
        { type: "match", text: "Cristian B & Chris M vs. Raphael H & Leonie R" },
        { type: "p", text: "Man erinnert sich: Vor Spieltag 1 war Leonie R die Spielerin mit der vielleicht kühnsten Prognose der gesamten Liga. \"Ich werde das Turnier gewinnen. Also gewinne ich auch das erste Spiel. So einfach ist das.\" Es folgte eine 0:2-Niederlage. Die Konsequenz? Leonie R steht nun auf Kriegsfuß mit der Presse:" },
        { type: "quote", text: "Ich sage gar nichts mehr.", author: "Leonie R" },
        { type: "p", text: "Der Presseboykott steht. Ihr Partner Raphael H, Platz 4 in der Tabelle mit drei Punkten und einer Satzdifferenz von +7, ist da deutlich gesprächsfreudiger:" },
        { type: "quote", text: "Was willst hören? Wie hoch ich gewinne? Am Spieltag 3 wird bei mir wieder taktisch gearbeitet, notfalls auch sportlich.", author: "Raphael H" },
        { type: "p", text: "Auf der anderen Seite des Netzes: Cristian B, der trotz geprellter Rippen bereits Spiel 6 gewonnen hat, und Chris M, der noch auf sein erstes Ligaspiel wartet. Für beide Teams kann dieses Spiel die Richtung vorgeben, ob es weiter nach oben oder unten geht." },

        { type: "h", text: "Spiel 10 - Das unbeschriebene Blatt gegen den Tabellenführer" },
        { type: "match", text: "Agnes K & Lukas P vs. Ludwig W & Marco M" },
        { type: "p", text: "Es ist das Spiel der Gegensätze. Auf der einen Seite das bisher geheimnisvollste Team des Turniers. Über Lukas P hallen heldengleiche Loblieder durch die Firmengänge. Der Mann gilt als einer der heißesten Titelanwärter. Über Agnes K lässt sich dagegen wenig Belastbares sagen. Was beide eint: Sie haben noch keinen einzigen Punkt gesammelt, ihr Arbeitsnachweis steht aus." },
        { type: "p", text: "Auf der anderen Seite: Ludwig W: Tabellenführer, zwei Spiele, zwei Siege, sechs Punkte, die beste Satzdifferenz der Liga mit +14. Neben ihm Marco M, der sich betont gelassen gibt:" },
        { type: "quote", text: "Ja, der Lukas soll schon sehr, sehr gut sein. Da wird einiges kommen. Über Agnes kann man wenig sagen. Aber das sollten wir gemeinsam schon packen.", author: "Marco M" },
        { type: "p", text: "Kann der Tabellenführer und sein noch punktloser Partner die Favoritenrolle bestätigen oder startet das unbeschriebene Blatt mit einem Sieg in die Saison? Spiel 10 könnte das Spiel des Spieltags werden." },

        { type: "h", text: "Spiel 11 - Anfängerin gegen Kampfansage" },
        { type: "match", text: "Christoph L & Florian Z vs. Luca W & Irene W" },
        { type: "p", text: "Spiel 11 bringt eine besondere Ausgangslage mit sich. Irene W ist verletzt und fällt zunächst aus. Erst in der zweiten Woche des Spieltags kann sie starten, und dann warten gleich drei nachzuholende Partien auf sie. Die Frage, die sich alle stellen: Resultiert daraus eine Überbelastung direkt aus der Verletzung heraus oder spielt sie sich in einen Rausch?" },
        { type: "p", text: "Auf Nachfrage dieser Redaktion lässt sich Irene nicht wirklich zu einem Statement verleiten:" },
        { type: "quote", text: "Das werden wir sehen.", author: "Irene W" },
        { type: "p", text: "Was man wissen muss: Irene ist blutiger Anfänger. Nach dem Sommerfest letzten Jahres wird sie erst zum zweiten Mal überhaupt einen Padelschläger in der Hand halten. An ihrer Seite steht Luca W, Platz 3 der Tabelle, ein Sieg, drei Punkte, die drittbeste Satzdifferenz der Liga. Kann er die Unerfahrenheit seiner Partnerin kompensieren?" },
        { type: "p", text: "Gegner Florian Z hat sich jedenfalls seine Meinung längst gebildet und formuliert seine Prognose mit einer Klarheit, die an Gnadenlosigkeit grenzt:" },
        { type: "quote", text: "Wir werden sie vernichten. Bei meinem ersten Padelspiel hab ich Erfahrung gesammelt, jetzt die Punkte.", author: "Florian Z" },
        { type: "p", text: "Zur Erinnerung: Florian Z steht nach seinem ersten Spiel selbst noch bei null Punkten und einer Satzdifferenz von -7. Die Kampfansage ist also durchaus mutig. Gemeinsam mit Christoph L, ebenfalls noch punktlos, hat dieses Team nichts zu verlieren. Und genau das macht es gefährlich." },

        { type: "h", text: "Spiel 12 - Bereits gespielt: Tie-Break-Drama zum Spieltagsauftakt" },
        { type: "match", text: "Greta P & Andreas L vs. Marcel M & Jonas L | Ergebnis: 1:6, 6:3, Match-Tie-Break 6:10" },
        { type: "p", text: "Auch Spieltag 3 hat bereits ein erstes Ergebnis - und was für eines. Im Spiel des letzten Mittwochs lieferten sich Greta P und Andreas L auf der einen Seite und Marcel M und Jonas L auf der anderen ein Match, das die gesamte Dramatik dieser Liga in drei Epochen packte." },
        { type: "p", text: "Der erste Satz ging klar an Team 2: 6:1, Greta und Andreas waren schlicht noch nicht im Spiel. Doch statt aufzugeben, kämpften sie sich zurück. Im zweiten Satz drehten sie das Momentum, gewannen 6:3 und erzwangen den Match-Tie-Break. Dort führten sie sogar 5:6. Doch Marcel M und Jonas L behielten die Nerven und holten sich den Match-Tie-Break mit 10:6." },
        { type: "p", text: "Andreas L blickt trotz der Niederlage positiv zurück:" },
        { type: "quote", text: "Insgesamt bin ich zufrieden. Haben uns reingekämpft nach dem ersten Satz. Es war ein extrem ausgeglichenes Match. Match-Tie-Break ist dann halt 50:50. Aber hat Spaß gemacht.", author: "Andreas L" },
        { type: "p", text: "Für Marcel M ist es der erste Sieg, erkämpft mit Spirit statt Technik, ganz wie er es angekündigt hatte. Und Jonas L? Festigt seinen zweiten Tabellenplatz mit jetzt fünf Punkten aus zwei Spielen. Gemeinsam bestätigen die beiden die beeindruckende Frühform von Envidual: Sechs Spiele, sechs Siege - kein anderes Unternehmen kann das von sich behaupten." },

        { type: "h", text: "Blick auf die Tabelle" },
        { type: "p", text: "Ludwig W führt die Liga an. Jonas L, Luca W und Raphael H bilden ein enges Verfolgerfeld. Sieben Spieler warten noch auf ihr erstes Spiel, für sie beginnt die Liga jetzt erst richtig. Und am Ende der Tabelle? Niklas K braucht mit null Punkten aus zwei Spielen und einer Differenz von -14 dringend eine Wende. Vielleicht klappt dies nach frisch getankter Kraft im Urlaub." },
        { type: "p", text: "Die Tabelle nimmt Formen an und wer jetzt noch keinen Punkt hat, muss langsam anfangen zu liefern." }
      ]
    },
    {
      spieltag: 4,
      startDate: "2026-06-22",
      endDate: "2026-07-05",
      title: "Neue Statistiken, aber ein alter Boykott",
      meta: "SPIELTAG 4  ·  22. JUNI - 3. JULI 2026",
      body: [
        { type: "p", text: "In den letzten Wochen ist viel passiert. Spiele wurden nachgeholt, Überraschungen geliefert, Favoritenrollen umgeschrieben. Irene W. hat mit Marcel M. sensationell ihren ersten Saisonsieg eingefahren. Der als Geheimfavorit gehandelte Lukas P. musste bei seinem Ligadebüt in Spiel 5 gleich eine 0:2-Niederlage hinnehmen und steht weiterhin bei null Punkten. Marco M. und Marcel M. haben Christoph L. und Raphael H. in Spiel 7 mit einem vernichtenden 6:1, 6:1 vom Platz gefegt. Und Jonas L. hat in Spiel 8 seinen Siegeszug fortgesetzt und sich mit drei Siegen aus drei Spielen an die Tabellenspitze geschoben - punktgleich mit Marcel M., der ihm mit ebenfalls acht Zählern im Nacken sitzt." },
        { type: "p", text: "Die Tabelle hat sich ordentlich durchgeschüttelt. Und passend dazu gibt es eine Neuigkeit, die das ganze Erlebnis auf ein neues Level hebt." },

        { type: "h", text: "Neuer Auftritt: Die Padel-Liga hat jetzt eine eigene Webseite" },
        { type: "p", text: "Ab sofort hat die Padel-Liga 2026 hiermit ein digitales Zuhause. Eine Rangliste, ein Elo-Verlauf als interaktiver Graph, eine überarbeitete Spielübersicht mit Gewinnwahrscheinlichkeiten und vieles mehr. Wer wissen will, wie die eigenen Chancen stehen, bekommt hier die schonungslose Wahrheit in Prozentzahlen serviert. Die Liga wird transparenter, die Ausreden weniger." },

        { type: "h", text: "Spiel 13 - Die Sensation will Serie" },
        { type: "match", text: "Chris M. & Raphael H. vs. Ludwig W. & Irene W.", result: "54 : 46 %", resultLabel: "Gewinnwahrscheinlichkeit" },
        { type: "p", text: "Was für eine Entwicklung: Irene W., die als blutiger Anfänger ins Turnier ging und erst zum zweiten Mal in ihrem Leben einen Padelschläger in der Hand hielt, hat mit Marcel M. in Spiel 3 ihren ersten Saisonsieg geholt. Jetzt bekommt sie den aktuellen Fünften Ludwig W. an die Seite. Auf der anderen Seite des Netzes trifft Irene erneut auf Chris M., den sie gerade erst geschlagen hat. Klappt der nächste Streich?" },
        { type: "p", text: "Irene gibt sich jedenfalls selbstbewusst - auf ihre eigene Art:" },
        { type: "quote", text: "Raphi spielt Tennis, Ludwig ist gut. Das gewinnen wir, aber Ludwig muss laufen!", author: "Irene W." },
        { type: "p", text: "Ludwig ist gewarnt: Laufen ist angesagt. Die Gewinnwahrscheinlichkeit sieht das Duell mit 54:46 als das ausgeglichenste des gesamten Spieltags. Chris M. auf Platz 7 und Raphael H. auf Platz 10 - beide zuletzt mit durchwachsenen Ergebnissen - werden alles daran setzen, die Aufsteigerin zu stoppen." },

        { type: "h", text: "Spiel 14 - Team 1 Favorit - Team 2 weiß es" },
        { type: "match", text: "Cristian B. & Lukas P. vs. Christoph L. & Martin B.", result: "63 : 37 %", resultLabel: "Gewinnwahrscheinlichkeit" },
        { type: "p", text: "Lukas P. hat nach seiner überraschenden Debütniederlage etwas gutzumachen: null Punkte auf Platz 15. Das ist nicht das, was man vom einstigen Geheimfavoriten erwartet hat. An seiner Seite steht Cristian B. Die Gewinnwahrscheinlichkeit spricht mit 63:37 eine klare Sprache zugunsten von Team 1." },
        { type: "p", text: "Christoph L., der sich in der Rolle des Underdogs offenbar wohlfühlt, reagiert mit entwaffnender Ehrlichkeit:" },
        { type: "quote", text: "Pfuuuu. Das gewinnen wir! Ah warte. Mit dem Martin gegen Lukas und Cristian? Das verlieren wir.", author: "Christoph L." },
        { type: "p", text: "Selten hat ein Spieler die eigenen Chancen so realistisch eingeschätzt. Ob Martin B. und Christoph L. die Statistik Lügen strafen können, oder ob die Zahlen recht behalten, wird Spiel 14 zeigen." },

        { type: "h", text: "Spiel 15 - 86 zu 14: Die Statistik kennt kein Erbarmen" },
        { type: "match", text: "Marco M. & Andreas L. vs. Leonie R. & Niklas K.", result: "86 : 14 %", resultLabel: "Gewinnwahrscheinlichkeit" },
        { type: "p", text: "Es gibt Gewinnwahrscheinlichkeiten, die Mut machen. Und es gibt 14 Prozent. Leonie R. und Niklas K. - Platz 18 und 17 der Tabelle, zusammen null Siege aus vier Spielen - gehen als das statistisch schwächste Team des Spieltags ins Rennen. Auf die Zahl angesprochen, reagiert Niklas erschrocken:" },
        { type: "quote", text: "Echt? So wenig? Das ist ja dramatisch.", author: "Niklas K." },
        { type: "p", text: "Nach seinem verkorksten Saisonstart hat vielleicht die Urlaubspause und das zweifache Padel spielen (Niklas betont, es war kein Training) gut getan. Seine Partnerin Leonie R. hat ihren Presseboykott derweil offiziell beendet, war aber dennoch zu keiner Aussage bereit." },
        { type: "p", text: "Auf der anderen Seite des Netzes wartet mit Marco M. und Andreas L. ein Team, das auf dem Papier keine Wünsche offen lässt. Marco M. hat sich mit seinem 6:1, 6:1 in Spiel 7 auf Platz 4 katapultiert, sechs Punkte aus zwei Spielen. Andreas L. bringt Tenniserfahrung und Kampfgeist mit. 86 Prozent sind eine Ansage, aber dramatisch muss nicht gleich hoffnungslos heißen." },

        { type: "h", text: "Spiel 16 - Der Spirit-König will's wieder wissen" },
        { type: "match", text: "Marcel M. & Florian Z. vs. Agnes K. & Jonas L.", result: "61 : 39 %", resultLabel: "Gewinnwahrscheinlichkeit" },
        { type: "p", text: "Marcel M. ist der Mann der Stunde. Drei Spiele, drei Siege, acht Punkte, Tabellenplatz 2, nur die Spieldifferenz trennt ihn von der Tabellenführung. Und sein Erfolgsrezept? Dasselbe wie am ersten Tag. Auf die Frage nach Spiel 16 verweist er auf den Triumph mit Irene in Spiel 3:" },
        { type: "quote", text: "Wird spannend, aber mit dem selben Spirit wie mit Irene ... Also das war Wahnsinn. Es gab so viele Golden Points, aber mit diesem Spirit haben wir die Mehrheit für uns entschieden. Wie ich am Anfang gesagt habe: Der Spirit wird entscheidend sein.", author: "Marcel M." },
        { type: "p", text: "Technik oder Spirit? Marcel hat seine Antwort längst gegeben. Doch diesmal steht ihm kein geringerer als Jonas L. gegenüber: Tabellenführer, drei Siege aus drei Spielen, das beste Punkteverhältnis der Liga mit 30:5. An seiner Seite Agnes K., die nach ihrer Niederlage in Spiel 1 auf Wiedergutmachung sinnt, ebenso wie Florian Z. auf der anderen Seite." },
        { type: "p", text: "61:39 für Team Marcel, aber gegen Jonas L. ist kein Vorsprung sicher. Das könnte das Topspiel des Spieltags werden." },

        { type: "h", text: "Spieltag 4 - auf einen Blick" },
        { type: "p", text: "Die Liga hat sich verändert. Jonas L. und Marcel M. thronen mit je acht Punkten und makelloser Bilanz an der Spitze, dahinter ein dichtes Mittelfeld, in dem ein einziger Sieg mehrere Plätze gutmachen kann. Lukas P. schuldet der Liga noch den Beweis, dass die Vorschusslorbeeren des Bürofunks berechtigt waren. Und am unteren Ende der Tabelle kämpfen Leonie R. und Niklas K. mit 14 Prozent gegen die Mathematik." },
        { type: "p", text: "Alle Spiele, Elo-Verläufe und Gewinnwahrscheinlichkeiten gibt es ab sofort auf dieser neuen Liga-Webseite." }
      ]
    },
    {
      spieltag: 5,
      startDate: "2026-07-06",
      endDate: "2026-07-19",
      title: "Neuer König, alte Kämpfer",
      meta: "SPIELTAG 5  ·  6. JULI - 17. JULI 2026",
      body: [
        { type: "p", text: "Die Padel-Liga 2026 hat eine neue Nummer eins: Sie heißt Luca W. Mit drei Siegen aus drei Spielen, neun Punkten und einer Differenz von +22 hat sich der Envidual-Mann an die Tabellenspitze geschoben. Der Weg dorthin führte über niemand Geringeren als Marcel M. Der Spirit-König ist also verwundbar." },
        { type: "p", text: "Aber Marcel war nicht der einzige, den es erwischte. In Spiel 13 besiegten Chris M. und Raphael H. das Team aus Ludwig W. und Irene W. mit 7:6 und 6:2. Ludwigs erste Niederlage der Saison bedeutet für den Ex-Tabellenführer das Abrutschen auf Platz 6." },
        { type: "p", text: "Damit stehen alle fünf Envidual-Spieler in den Top 6. Nur Marco M. von Headsquare auf Platz 4 verhindert die totale Dominanz des Jung-Unternehmens. Headsquare und Hanako müssen sich Sorgen machen." },

        { type: "h", text: "Ankündigung: Die Top 4 spielen um den Titel" },
        { type: "p", text: "Die Ligaleitung hat das Finale enthüllt und es wird spektakulär: Die besten vier Spieler nach Abschluss aller sechs Spieltage qualifizieren sich für ein Final Four. Dort spielt jeder gegen jeden, ein Satz pro Konstellation. Wer hier gewinnt, wird erster Padel-Liga-Champion der Unternehmensgruppe." },

        { type: "h", text: "Spiel 17 - Luca gegen Ludwig" },
        { type: "match", text: "Martin B. & Luca W. vs. Florian Z. & Ludwig W.", result: "40 : 60 %", resultLabel: "Gewinnwahrscheinlichkeit" },
        { type: "p", text: "Das Topspiel des Spieltags. Tabellenführer Luca W. gegen den auf Platz 6 abgerutschten Ludwig W. Beide mit einem Elo-Rating jenseits der 1000, beide mit der Hoffnung, die Liga zu gewinnen. Die Frage ist: Wer hat den besseren Partner an seiner Seite?" },
        { type: "p", text: "Florian Z. (Platz 14, ein Spiel, null Punkte) hat die passende Analyse:" },
        { type: "quote", text: "Meine Einschätzung ist ganz klar. Das Spiel ist Luca gegen Ludwig. Und es kommt drauf an, wer von Martin und mir den besseren Tag hat, um seinen Partner besser zu unterstützen.", author: "Florian Z." },
        { type: "p", text: "Flos Ehrlichkeit ehrt ihn und sein Gegenüber Martin B. dürfte sie teilen. Es ist das Duell zweier Topstars mit zwei Partnern, die noch nach ihrem ersten Punkt suchen. Luca W. bleibt trotz Favoritenstatus bescheiden:" },
        { type: "quote", text: "Es wird am Ende auch Glück eine Rolle spielen.", author: "Luca W." },

        { type: "h", text: "Spiel 18 - Greta hofft, Jonas jagt" },
        { type: "match", text: "Chris M. & Agnes K. vs. Jonas L. & Greta P.", result: "46 : 54 %", resultLabel: "Gewinnwahrscheinlichkeit" },
        { type: "p", text: "Drei Spiele, null Siege, Differenz von -17. Gretas Saison liest sich bislang wie ein Drama in drei Akten. Am nächsten kam sie in Spiel 12, als sie sich mit Andreas L. erst im Match-Tie-Break bei 6:10 die Segel streichen musste. Ein Sieg, der zum Greifen nah war, und der umso mehr schmerzte." },
        { type: "quote", text: "Ich hoffe auf meinen ersten Sieg. Diesmal wirklich.", author: "Greta P." },
        { type: "p", text: "An ihrer Seite steht mit Jonas L. einer der erfolgreichsten Spieler der Liga: Platz 2, drei Siege, acht Punkte, makellose Bilanz. Wenn jemand Greta zum ersten Sieg führen kann, dann er. Auf der anderen Seite stehen Chris M. und Agnes K., die wie Greta noch auf ihren Durchbruch wartet. Die Gewinnwahrscheinlichkeit ist mit 54:46 denkbar knapp. Gretas Moment könnte gekommen sein." },

        { type: "h", text: "Spiel 19 - Drei Tennisspieler und ein Mann mit einer Mission" },
        { type: "match", text: "Raphael H. & Andreas L. vs. Lukas P. & Niklas K.", result: "75 : 25 %", resultLabel: "Gewinnwahrscheinlichkeit" },
        { type: "p", text: "75 zu 25. Auf dem Papier eine klare Sache für Raphael H. und Andreas L. Doch Andreas selbst sieht das anders:" },
        { type: "quote", text: "Ne, so deutlich ist diese Partie nicht. Das ist auf jeden Fall 50:50. Ich freue mich, mit dem Raphi zu spielen.", author: "Andreas L." },
        { type: "p", text: "Und er hat einen Punkt, denn drei der vier Spieler auf dem Platz kommen vom Tennis. Raphael H., Andreas L. und Lukas P. gehören zu den erfahrensten Schlägersportlern der Liga. Lukas P. hat nach seinem holprigen Debüt zuletzt mit zwei Siegen in Folge bewiesen, dass er den Vorschusslorbeeren durchaus gerecht werden kann. Sein Elo von 1130 ist der dritthöchste der Liga." },
        { type: "p", text: "Und Niklas K.? Platz 16 nach drei Niederlagen. Aber wer Lukas P. an seiner Seite hat, darf sich mehr zutrauen als 25 Prozent." },

        { type: "h", text: "Spiel 20 - Christoph sieht schwarz, Cristian sieht nur Siege" },
        { type: "match", text: "Christoph L. & Irene W. vs. Marco M. & Cristian B.", result: "29 : 71 %", resultLabel: "Gewinnwahrscheinlichkeit" },
        { type: "p", text: "Wo andere Spieler ihre Chancen schönreden, liefert Christoph Partie für Partie die schonungsloseste Selbsteinschätzung des gesamten Turniers:" },
        { type: "quote", text: "Uh, das ist ein Problem. Das verlieren wir 0:6, 0:6.", author: "Christoph L." },
        { type: "p", text: "Nach dem \"Pfuuuu, das verlieren wir\" von Spieltag 4 setzt Christoph einen neuen Maßstab in Sachen Ehrlichkeit. Und die 29 Prozent Siegwahrscheinlichkeit geben ihm nicht gerade Unrecht. Auf der Gegenseite steht ein Cristian B., der nach seiner überstandenen Rippenprellung vor Tatendrang sprüht:" },
        { type: "quote", text: "Ich bin wieder fit. Also gewinne ich ab jetzt jedes Spiel. Ich meine, beim letzten Mal, wo ich wieder fit war, hatten wir das beste Ergebnis der Liga.", author: "Cristian B." },
        { type: "p", text: "Er meint das 6:1, 6:0 mit Lukas P. in Spiel 14, tatsächlich das deutlichste Ergebnis der bisherigen Liga. Für Christoph und Irene wird es ein langer Nachmittag, oder eben ein kurzer." },

        { type: "h", text: "Der Blick auf die Tabelle - und das große Ziel" },
        { type: "p", text: "Mit der Ankündigung des Final Four hat jede Platzierung ein neues Gewicht bekommen. Aktuell stehen Luca W., Jonas L., Marcel M. und Marco M. auf den begehrten vier Plätzen, aber dahinter lauern fünf Spieler mit sechs Punkten, die nur einen Sieg vom Einzug ins Final Four entfernt sind. Ein einziger Sieg kann den Unterschied zwischen Finale und Zuschauerrang bedeuten." },
        { type: "p", text: "Spieltag 5. Die Liga biegt auf die Zielgerade ein. Und die Frage ist nicht mehr, wer oben steht, sondern wer es ins Final Four schafft." }
      ]
    },
    {
      spieltag: 6,
      startDate: null,
      endDate: null,
      title: "Spieltag 6"
    },
    {
      spieltag: 7,
      startDate: null,
      endDate: null,
      title: "Spieltag 7"
    }
  ]
};
