/* =====================================================================
   HET VERHAAL – "De aarde bromt"
   ---------------------------------------------------------------------
   Hier staat ALLE tekst van het verhaal. Je kan die aanpassen zonder de
   rest van de code te begrijpen.

   Zo is het opgebouwd:
     - Elk hoofdstuk heeft een nummer, een titel en een lijst scènes.
     - Elke scène heeft:
         id      : een naam voor de scène (bv. "1.2"), enkel voor jezelf
         prent   : welke tekening getoond wordt (zie map assets)
         geluid  : (niet verplicht) welk geluidje er speelt als het geluid aan staat
                   mogelijk: regen, plons, boorbol, psssj, boem, borrel,
                   rommel, krak, golf, grom, stoom
         tekst   : de zinnen, elke regel tussen aanhalingstekens
         ontdek  : (niet verplicht) de ontdekplekken in de prent
                     naam  : wat het is (wordt ook voorgelezen bij het kaartje)
                     x, y  : waar het rondje staat (prent is 800 breed en 450 hoog)
                     tekst : het weetje "Wist je dat?"
         keuze   : (niet verplicht) een keuzemoment, zie scène 4.4

   Moeilijke woorden: zet ze tussen [[ en ]].
     [[magma]]                     -> klikbaar woord "magma"
     [[actieve vulkaan|actief]]    -> toont "actieve vulkaan" met de uitleg van "actief"
   De uitleg zelf staat in woorden.js.

   Let op: elke regel staat tussen aanhalingstekens "...". Wil je in de
   tekst zelf een aanhalingsteken, zet er dan een \ voor: \"
   Vergeet de komma niet tussen twee regels.
   ===================================================================== */

window.VERHAAL = [

  /* ================================================================ */
  {
    nummer: 1,
    titel: "De steen die kon drijven",
    scenes: [
      {
        id: "1.1",
        prent: "zolder",
        geluid: "regen",
        tekst: [
          "Het regent al de hele woensdagmiddag. Noor logeert bij opa Staf.",
          "\"Mag ik op de zolder kijken?\" vraagt ze.",
          "\"Natuurlijk,\" zegt opa. \"Maar pas op voor de dozen met stenen.\"",
          "Op de zolder ruikt het naar oud papier.",
          "Overal staan dozen met etiketten: \"IJsland\", \"Italië\", \"Hawaï\"."
        ],
        ontdek: [
          { naam: "Kaart aan de muur", x: 190, y: 120,
            tekst: "Opa heeft op deze kaart rode stipjes gezet. Elk stipje is een vulkaan die hij bezocht heeft." },
          { naam: "Doos IJsland", x: 545, y: 335,
            tekst: "IJsland ligt in het noorden van Europa. Er zijn daar meer dan 30 actieve vulkanen. Toch heet het 'IJsland'!" }
        ]
      },
      {
        id: "1.2",
        prent: "steen-in-hand",
        tekst: [
          "In een doos ligt een vreemde grijze steen.",
          "Hij zit vol kleine gaatjes, net een spons.",
          "En hij is zo licht als een stuk brood!",
          "\"Opa, wat is dit voor steen?\" roept Noor.",
          "Opa komt de trap op. \"Dat is [[puimsteen]],\" zegt hij.",
          "\"Die komt uit een vulkaan. Leg hem maar eens in een emmer water.\""
        ],
        ontdek: [
          { naam: "De gaatjes", x: 500, y: 200,
            tekst: "Die gaatjes zijn luchtbelletjes van gas. Ze zijn blijven zitten toen de lava heel snel afkoelde." }
        ]
      },
      {
        id: "1.3",
        prent: "emmer",
        geluid: "plons",
        tekst: [
          "Noor legt de steen in het water. Plons!",
          "De steen zinkt niet. Hij drijft!",
          "\"Een steen die drijft?\" Noor kan het niet geloven.",
          "Dan hoort ze een klein stemmetje.",
          "\"Hé! Dat water is koud! Haal me eruit!\"",
          "Noor schrikt. De steen... praat?"
        ],
        ontdek: [
          { naam: "Emmer", x: 420, y: 330,
            tekst: "Puimsteen drijft omdat er zoveel lucht in zit. Soms drijven na een vulkaanuitbarsting op zee hele eilanden van puimsteen rond!" }
        ]
      },
      {
        id: "1.4",
        prent: "kiezel-wakker",
        tekst: [
          "\"Ik ben Kiezel,\" zegt de steen. \"En ik ben heel oud.",
          "Ik kom van diep onder de grond. Uit het vuur van een vulkaan.\"",
          "Opa lacht. \"Zo, Kiezel. Jij bent dus wakker geworden.\"",
          "\"Opa, jij weet dat die steen praat?\"",
          "\"Ach,\" zegt opa met een knipoog, \"stenen hebben veel te vertellen.",
          "Je moet alleen goed luisteren.\"",
          "Kiezel springt op en neer. \"Zal ik jullie meenemen? Naar binnen in de aarde?\""
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 2,
    titel: "Reis naar binnen in de aarde",
    scenes: [
      {
        id: "2.1",
        prent: "boorbol",
        geluid: "boorbol",
        tekst: [
          "Kiezel tovert een ronde capsule tevoorschijn. \"Dit is de Boorbol. Stap maar in!\"",
          "Noor en opa gaan zitten. De Boorbol begint te draaien en te zakken.",
          "Dieper. En dieper. En nog dieper.",
          "\"We reizen nu door de aarde,\" zegt Kiezel. \"Kijk goed uit het raam.\"",
          "Dit is een fantasiereis. In het echt kan niemand zo diep reizen."
        ],
        ontdek: [
          { naam: "Raam", x: 400, y: 190,
            tekst: "Het diepste gat dat mensen ooit geboord hebben, is ongeveer 12 kilometer diep. Dat is maar een heel klein krasje in de aarde." }
        ]
      },
      {
        id: "2.2",
        prent: "perzik",
        tekst: [
          "\"De aarde lijkt een beetje op een perzik,\" zegt opa.",
          "\"Buiten zit een dun velletje. Dat is de [[aardkorst]].",
          "Daarop wonen wij, met huizen, bergen en zeeën.",
          "Daaronder zit het dikke vruchtvlees. Dat is de [[mantel]].",
          "En helemaal in het midden zit de pit. Dat is de [[kern]].\""
        ],
        ontdek: [
          { naam: "Aardkorst", x: 270, y: 82,
            tekst: "De korst is maar 5 tot 70 kilometer dik. Onder de zee is ze het dunst, onder hoge bergen het dikst." },
          { naam: "Mantel", x: 145, y: 180,
            tekst: "De mantel is bijna 3000 kilometer dik. Het gesteente is er zo heet dat het heel, heel traag kan bewegen, zoals dikke stroop." },
          { naam: "Kern", x: 225, y: 250,
            tekst: "De kern is ongeveer even heet als de buitenkant van de zon: zo'n 5000 graden!" }
        ]
      },
      {
        id: "2.3",
        prent: "in-de-mantel",
        tekst: [
          "Het wordt warm in de Boorbol. Het raam kleurt oranje.",
          "\"We zijn in de mantel,\" zegt Kiezel trots. \"Hier ben ik geboren.\"",
          "\"Is dit allemaal [[lava]]?\" vraagt Noor.",
          "\"Bijna nooit,\" zegt opa. \"Het meeste gesteente is hier vast,",
          "maar heel zacht en heet. Alleen op sommige plaatsen smelt het.",
          "Dat gesmolten gesteente heet [[magma]].\""
        ],
        ontdek: [
          { naam: "Magma", x: 640, y: 335,
            tekst: "Magma is gesmolten gesteente ONDER de grond. Komt het boven de grond, dan noemen we het lava." }
        ]
      },
      {
        id: "2.4",
        prent: "boorbol-stijgt",
        geluid: "boorbol",
        tekst: [
          "\"Genoeg gezweet,\" zegt opa. \"Terug naar boven!\"",
          "De Boorbol stijgt. Het wordt weer koeler en donkerder.",
          "\"Onthoud dit,\" zegt Kiezel. \"Diep in de aarde is het heet.",
          "En die hitte zorgt ervoor dat alles langzaam beweegt.",
          "Daardoor bestaan er vulkanen én aardbevingen.\"",
          "Noor kijkt verbaasd. \"Hoe dan?\"",
          "\"Dat zie je zo,\" zegt Kiezel."
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 3,
    titel: "De aarde is een puzzel",
    scenes: [
      {
        id: "3.1",
        prent: "puzzelbol",
        tekst: [
          "De Boorbol hangt nu hoog boven de aarde. Noor ziet de hele wereld.",
          "Opa wijst. \"Zie je die lijnen? De aardkorst is niet één geheel.",
          "Ze is gebroken in grote stukken, zoals een puzzel.",
          "Die stukken noemen we [[platen|plaat]].\"",
          "\"En die platen drijven op de mantel,\" zegt Kiezel.",
          "\"Een beetje zoals ijsschotsen op het water.\""
        ],
        ontdek: [
          { naam: "Puzzelstuk", x: 570, y: 115,
            tekst: "Er zijn ongeveer 7 grote platen en nog veel kleinere." },
          { naam: "België", x: 382, y: 148,
            tekst: "België ligt midden op de Euraziatische plaat. Daarom hebben wij geen actieve vulkanen en maar weinig aardbevingen." }
        ]
      },
      {
        id: "3.2",
        prent: "nagels",
        tekst: [
          "\"Bewegen die platen?\" vraagt Noor.",
          "\"Ja,\" zegt opa. \"Maar heel, heel traag.",
          "Ongeveer even snel als jouw nagels groeien.",
          "Een paar centimeter per jaar.\"",
          "Noor kijkt naar haar vingers. \"Dat is bijna niks!\"",
          "\"Klopt,\" zegt Kiezel. \"Maar na miljoenen jaren wordt dat een hele reis.\""
        ],
        ontdek: [
          { naam: "Nagels", x: 300, y: 140,
            tekst: "Al lang geleden lagen Afrika en Zuid-Amerika tegen elkaar. Kijk maar op een kaart: ze passen bijna als puzzelstukken!" }
        ]
      },
      {
        id: "3.3",
        prent: "drie-bewegingen",
        tekst: [
          "\"Platen kunnen op drie manieren bewegen,\" legt opa uit.",
          "\"Soms gaan ze uit elkaar. Dan komt er magma omhoog in de spleet.",
          "Soms botsen ze tegen elkaar. Dan duwt de ene plaat de andere omlaag,",
          "of ontstaan er hoge bergen.",
          "En soms schuiven ze langs elkaar, zoals twee handen die je over elkaar wrijft.\""
        ],
        ontdek: [
          { naam: "Uit elkaar", x: 135, y: 275,
            tekst: "In IJsland gaan twee platen uit elkaar. Je kan er tussen twee platen door wandelen." },
          { naam: "Botsen", x: 400, y: 150,
            tekst: "De Himalaya, met de Mount Everest, ontstond toen India tegen Azië botste. De Everest wordt nog altijd elk jaar een klein beetje hoger!" }
        ]
      },
      {
        id: "3.4",
        prent: "ring-van-vuur",
        tekst: [
          "\"Waar platen elkaar raken, gebeurt het,\" zegt Kiezel.",
          "\"Daar ontstaan de meeste vulkanen en aardbevingen.\"",
          "Opa wijst naar een rode ring rond de grootste oceaan.",
          "\"Dit is de [[Ring van Vuur]], rond de Stille Oceaan.",
          "Daar liggen de meeste vulkanen van de hele wereld.\""
        ],
        ontdek: [
          { naam: "Ring van Vuur", x: 600, y: 145,
            tekst: "Japan, Indonesië, Chili en het westen van Amerika liggen aan de Ring van Vuur. Daar zijn veel vulkanen en aardbevingen." }
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 4,
    titel: "Hoe een vulkaan ontstaat",
    scenes: [
      {
        id: "4.1",
        prent: "doorsnede-vulkaan",
        tekst: [
          "De Boorbol landt naast een grote berg. Er komt een pluim rook uit.",
          "\"Dit is een vulkaan,\" zegt opa. \"Kijk maar eens naar binnen.\"",
          "Het raam van de Boorbol wordt een soort röntgenbril.",
          "Noor ziet onder de berg een grote ruimte vol gloeiend magma.",
          "\"Dat is de [[magmakamer]],\" zegt Kiezel."
        ],
        ontdek: [
          { naam: "Magmakamer", x: 420, y: 395,
            tekst: "De magmakamer ligt een paar kilometer onder de grond." },
          { naam: "Schoorsteen", x: 420, y: 255,
            tekst: "Langs de schoorsteen, een soort lange pijp, kan het magma naar boven." },
          { naam: "Krater", x: 420, y: 118,
            tekst: "De krater is de opening bovenaan. Daar komt de lava naar buiten." }
        ]
      },
      {
        // Scène 4.2 is in twee stukken gezet, zodat de tekst op het scherm past.
        id: "4.2a",
        prent: "fles-dicht",
        tekst: [
          "\"Waarom komt het magma eruit?\" vraagt Noor.",
          "Opa pakt een fles bruiswater uit zijn tas.",
          "\"In magma zit gas, net zoals er bubbels in deze fles zitten.",
          "Magma is lichter dan het gesteente rondom.",
          "Daarom wil het naar boven, zoals een luchtbel in het water.\""
        ]
      },
      {
        id: "4.2b",
        prent: "fles-open",
        geluid: "psssj",
        tekst: [
          "\"Als de druk te groot wordt...\"",
          "Opa schudt de fles en draait de dop een beetje open. PSSSJ!",
          "\"...dan spuit het eruit. Dat noemen we een [[uitbarsting]].\""
        ],
        ontdek: [
          { naam: "Fles", x: 255, y: 250,
            tekst: "Hoe meer gas er in het magma zit, hoe harder de uitbarsting. Net zoals een fles die je hard geschud hebt." }
        ]
      },
      {
        id: "4.3",
        prent: "vulkaan-groeit",
        tekst: [
          "\"Maar hoe wordt een vulkaan zo'n hoge berg?\" vraagt Noor.",
          "\"Laagje per laagje,\" zegt Kiezel.",
          "\"Bij elke uitbarsting komt er lava en as naar buiten.",
          "Die koelt af en wordt hard. Dan komt er een nieuwe laag bovenop.",
          "Zo groeit de vulkaan, soms duizenden jaren lang.\""
        ],
        ontdek: [
          { naam: "Lagen", x: 400, y: 330,
            tekst: "Een vulkaan is een beetje zoals een taart die je steeds hoger maakt met nieuwe lagen." }
        ]
      },
      {
        id: "4.4",
        prent: "kaart-keuze",
        tekst: [
          "\"Wil je echte vulkanen zien?\" vraagt Kiezel.",
          "\"Ik ken er twee heel verschillende.",
          "De ene spuit lava als een fontein. De andere borrelt rustig.\""
        ],
        // KEUZEMOMENT: beide wegen worden gelezen, de keuze bepaalt enkel de volgorde.
        // "eerst" is de id van de scène in hoofdstuk 5 die eerst komt.
        keuze: [
          { knop: "Eerst naar Italië", eerst: "5.1" },
          { knop: "Eerst naar Hawaï",  eerst: "5.2" }
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 5,
    titel: "Vulkanen in alle soorten",
    scenes: [
      {
        id: "5.1",
        prent: "stromboli",
        geluid: "boem",
        tekst: [
          "De Boorbol vliegt naar een klein eiland in de zee bij Italië.",
          "Het is nacht. Plots spuit er een vonkenregen uit de top. Boem!",
          "Een paar minuten later weer. En weer.",
          "\"Dit is de Stromboli,\" zegt opa.",
          "\"Hij heeft kleine uitbarstingen, soms om de paar minuten.",
          "Zeelui noemen hem de vuurtoren van de zee.\"",
          "Noor kijkt met grote ogen. \"Hij lijkt wel vuurwerk!\""
        ],
        ontdek: [
          { naam: "Etna", x: 690, y: 282,
            tekst: "Ook op het Italiaanse eiland Sicilië staat een vulkaan: de Etna. Het is de hoogste actieve vulkaan van Europa." },
          { naam: "Pompeji", x: 90, y: 290,
            tekst: "Bijna 2000 jaar geleden barstte de Vesuvius uit. De stad Pompeji werd bedolven onder de as. Vandaag kan je de oude stad bezoeken." }
        ]
      },
      {
        id: "5.2",
        prent: "hawaii",
        geluid: "borrel",
        tekst: [
          "De Boorbol vliegt over de oceaan naar Hawaï.",
          "Daar ligt een heel brede vulkaan, plat als een omgekeerd bord.",
          "Uit een spleet stroomt lava, rood en traag, als hete soep.",
          "\"Dit is een [[schildvulkaan]],\" zegt opa.",
          "\"De lava is hier dun en loopt ver weg. Er is weinig gas.",
          "Daarom zijn de uitbarstingen hier meestal rustig.\""
        ],
        ontdek: [
          { naam: "Mauna Loa", x: 330, y: 228,
            tekst: "Op Hawaï staat de Mauna Loa. Het is de grootste vulkaan op aarde. Hij begint diep onder de zee!" },
          { naam: "Mars", x: 690, y: 75,
            tekst: "De grootste vulkaan van ons zonnestelsel staat op Mars. Hij heet Olympus Mons en is bijna drie keer zo hoog als de Mount Everest." }
        ]
      },
      {
        id: "5.3",
        prent: "drie-vulkanen",
        tekst: [
          "\"Niet elke vulkaan is wakker,\" zegt Kiezel.",
          "\"Een [[actieve vulkaan|actief]] barst nu uit, of deed dat niet zo lang geleden.",
          "Een [[slapende vulkaan|slapend]] is al lang stil, maar kan ooit weer wakker worden.",
          "En een [[uitgedoofde vulkaan|uitgedoofd]] zal nooit meer uitbarsten.\"",
          "\"Zoals opa na het eten,\" grinnikt Noor. \"Slapend.\"",
          "Opa doet alsof hij snurkt."
        ],
        ontdek: [
          { naam: "Aantal", x: 140, y: 295,
            tekst: "Op het land zijn er ongeveer 1350 vulkanen die nog kunnen uitbarsten. Onder de zee zijn er nog veel meer." }
        ]
      },
      {
        id: "5.4",
        prent: "eifel",
        tekst: [
          "\"Zijn er vulkanen dicht bij België?\" vraagt Noor.",
          "\"Ja hoor,\" zegt opa. \"In de Eifel, in Duitsland. Net over de grens.\"",
          "Ze vliegen over groene heuvels met ronde meertjes.",
          "\"Die meertjes zijn oude kraters,\" zegt Kiezel.",
          "\"Ongeveer 13 000 jaar geleden was hier nog een grote uitbarsting.",
          "Nu slapen deze vulkanen. Je kan er gewoon gaan wandelen.\""
        ],
        ontdek: [
          { naam: "Meertje", x: 330, y: 320,
            tekst: "Zo'n rond kratermeer heet in de Eifel een 'Maar'." },
          { naam: "Hoge Venen", x: 95, y: 300,
            tekst: "Ook in de Oostkantons, in België, vind je soms nog oude stenen die met vulkanen te maken hebben." }
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 6,
    titel: "Wat komt er uit een vulkaan?",
    scenes: [
      {
        id: "6.1",
        prent: "uitbarsting",
        geluid: "boem",
        tekst: [
          "\"Bij een uitbarsting komt er veel meer uit dan lava,\" zegt opa.",
          "\"Er komt ook as: heel fijn stof van stukjes steen.",
          "Er komen gassen, die je soms niet kan zien.",
          "En soms vliegen er brokken lava door de lucht.",
          "Die noemen we [[lavabommen|lavabom]].\"",
          "\"Lavabommen?\" zegt Noor. \"Dat klinkt gevaarlijk.\"",
          "\"Daarom blijven we hier veilig in de Boorbol,\" zegt Kiezel."
        ],
        ontdek: [
          { naam: "Lava", x: 455, y: 330,
            tekst: "Lava is tussen de 700 en 1200 graden heet. Een oven thuis wordt maar ongeveer 250 graden." },
          { naam: "As", x: 340, y: 60,
            tekst: "Vulkaanas is geen as zoals van een kampvuur. Het zijn piepkleine stukjes steen en glas." },
          { naam: "Lavabom", x: 560, y: 120,
            tekst: "Een lavabom koelt af in de lucht en kan landen als een steen met de vorm van een druppel." }
        ]
      },
      {
        id: "6.2",
        prent: "aswolk",
        tekst: [
          "Soms is een uitbarsting zo krachtig dat de as heel hoog gaat.",
          "Hoger dan de wolken. Hoger dan de vliegtuigen.",
          "\"Toen ik nog werkte, gebeurde dat in IJsland,\" vertelt opa.",
          "\"Een vulkaan blies zoveel as in de lucht,",
          "dat vliegtuigen in heel Europa een paar dagen niet mochten vliegen.\"",
          "\"Ook in België?\" vraagt Noor. \"Ook in België,\" knikt opa."
        ],
        ontdek: [
          { naam: "Vliegtuig", x: 670, y: 95,
            tekst: "As kan de motoren van een vliegtuig kapotmaken. Daarom vliegen vliegtuigen er altijd omheen." },
          { naam: "IJsland 2010", x: 255, y: 365,
            tekst: "Die vulkaan heette Eyjafjallajökull. Probeer dat maar eens uit te spreken!" }
        ]
      },
      {
        id: "6.3",
        prent: "vruchtbaar",
        tekst: [
          "\"Zijn vulkanen dan alleen maar gevaarlijk?\" vraagt Noor.",
          "\"Nee,\" zegt opa. \"Vulkanen geven ook veel.",
          "Vulkaanas maakt de grond heel [[vruchtbaar]].",
          "Daarom wonen er veel boeren vlak bij vulkanen.",
          "Er groeien druiven, tomaten en sinaasappels.\"",
          "\"En nieuwe eilanden!\" roept Kiezel. \"Hawaï en IJsland zijn gemaakt door vulkanen.",
          "Ik ben dus eigenlijk een bouwer.\""
        ],
        ontdek: [
          { naam: "Warmte", x: 120, y: 215,
            tekst: "In IJsland gebruiken ze de warmte van onder de grond om huizen te verwarmen en stroom te maken." },
          { naam: "Steen", x: 400, y: 345,
            tekst: "Ook jij, Kiezel? Ja! Puimsteen wordt gebruikt om eelt van je voeten te schuren." }
        ]
      },
      {
        id: "6.4",
        prent: "warm-bad",
        geluid: "stoom",
        tekst: [
          "In IJsland laat Kiezel de Boorbol landen bij een warm meer.",
          "Buiten ligt sneeuw, maar het water dampt.",
          "\"Dit water wordt verwarmd door de aarde,\" zegt opa.",
          "Noor steekt haar hand in het water. \"Het is zo warm als een bad!\"",
          "\"Zie je,\" zegt Kiezel. \"De aarde is een beetje een grote kachel.\""
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 7,
    titel: "Wanneer de grond beeft",
    scenes: [
      {
        id: "7.1",
        prent: "grond-trilt",
        geluid: "rommel",
        tekst: [
          "Plots begint de grond te trillen.",
          "De kopjes in de Boorbol rinkelen. Noor grijpt opa's arm.",
          "\"Rustig maar,\" zegt opa. \"Het is een kleine [[aardbeving]].",
          "Hier in IJsland gebeurt dat vaak.\"",
          "Na een paar tellen is het weer stil.",
          "Noor ademt uit. \"Wat was dat nu precies?\""
        ]
      },
      {
        // Scène 7.2 is in twee stukken gezet, zodat de tekst op het scherm past.
        id: "7.2a",
        prent: "latje-buigt",
        geluid: "krak",
        tekst: [
          "Opa neemt een houten latje. \"Kijk.",
          "Ik buig dit latje langzaam. Het wordt gespannen.",
          "Nog een beetje... en nog een beetje...\" KRAK!"
        ],
        ontdek: [
          { naam: "Latje", x: 400, y: 165,
            tekst: "De plek waar het gesteente breekt, heet een breuk. Soms is zo'n breuk honderden kilometers lang." }
        ]
      },
      {
        id: "7.2b",
        prent: "platen-breken",
        tekst: [
          "\"Zo gaat het ook met de platen van de aarde.",
          "Ze willen bewegen, maar ze zitten vast.",
          "De spanning wordt groter en groter.",
          "Tot het gesteente plots breekt en verschuift.",
          "Dan trilt de grond. Dat is een aardbeving.\""
        ]
      },
      {
        id: "7.3",
        prent: "kringen",
        geluid: "plons",
        tekst: [
          "Kiezel springt in een plas. Plons!",
          "Er komen kringen in het water, die steeds groter worden.",
          "\"Zo gaat het bij een aardbeving,\" zegt Kiezel.",
          "\"Diep in de grond breekt het gesteente.",
          "Van daaruit gaan er golven door de aarde, alle kanten op.",
          "Hoe verder weg, hoe zwakker je ze voelt.\""
        ],
        ontdek: [
          { naam: "Midden van de kringen", x: 200, y: 250,
            tekst: "De plek recht boven de breuk, aan de oppervlakte, heet het epicentrum. Daar voel je de beving het sterkst." },
          // Dit weetje is verbeterd: de snelste aardbevingsgolven doen er ongeveer
          // 20 minuten over om de andere kant van de aarde te bereiken (bron: USGS).
          { naam: "Golven", x: 610, y: 330,
            tekst: "Aardbevingsgolven zijn heel snel. De snelste golven zijn in ongeveer 20 minuten aan de andere kant van de aarde." }
        ]
      },
      {
        id: "7.4",
        prent: "seismograaf",
        tekst: [
          "Opa toont een toestel met een lange papierstrook.",
          "Een pen tekent een rustige lijn. Maar als Noor op de tafel klopt, gaat de lijn op en neer.",
          "\"Dit is een [[seismograaf]],\" zegt opa. \"Een aardbevingsmeter.",
          "Hoe hoger de lijn springt, hoe sterker de beving.",
          "Wetenschappers geven elke aardbeving een getal: de [[magnitude]].",
          "Bij 2 voel je bijna niets. Bij 7 is het een heel zware beving.\""
        ],
        ontdek: [
          { naam: "Getal", x: 545, y: 250,
            tekst: "Elk getal hoger betekent een veel sterkere beving. Een beving van 6 is niet een beetje, maar veel sterker dan een beving van 5." },
          { naam: "Elke dag", x: 720, y: 70,
            tekst: "Elke dag zijn er duizenden kleine aardbevingen op aarde. De meeste voelt niemand." }
        ]
      },
      {
        id: "7.5",
        prent: "kaart-belgie",
        tekst: [
          "\"Hebben wij in België ook aardbevingen?\" vraagt Noor.",
          "\"Soms,\" zegt opa. \"Meestal zijn ze zo klein dat je niets merkt.",
          "Maar in 1983 was er een aardbeving bij Luik. Schoorstenen vielen van daken.",
          "En in 1992 was er een beving in Roermond, in Nederland, vlak bij Limburg.",
          "Toen schrokken heel veel mensen in België wakker.\"",
          "\"Ik wist niet dat het hier ook kon,\" zegt Noor zacht.",
          "\"Het gebeurt gelukkig maar zelden,\" zegt opa."
        ],
        ontdek: [
          { naam: "Meetstation", x: 373, y: 168,
            tekst: "In Ukkel, bij Brussel, houden wetenschappers alle aardbevingen in België in het oog." }
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 8,
    titel: "De grote golf",
    scenes: [
      {
        id: "8.1",
        prent: "zeebodem",
        geluid: "golf",
        tekst: [
          "De Boorbol duikt onder water, diep in de oceaan.",
          "\"Aardbevingen gebeuren ook onder de zee,\" zegt Kiezel.",
          "\"Als de zeebodem plots omhoog springt,",
          "duwt hij al het water erboven mee omhoog.\"",
          "\"Net als wanneer je in bad je knieën snel optrekt,\" zegt opa.",
          "\"Dan krijg je een golf die over de rand klotst.\""
        ],
        ontdek: [
          { naam: "Bad", x: 690, y: 85,
            tekst: "Probeer het thuis maar eens voorzichtig in bad. Maar niet te hard, anders staat de badkamer onder water!" }
        ]
      },
      {
        id: "8.2",
        prent: "tsunami-golf",
        geluid: "golf",
        tekst: [
          "\"Zo'n golf heet een [[tsunami]],\" zegt opa.",
          "\"Dat is een Japans woord. Het betekent havengolf.",
          "Op open zee is de golf laag. Een boot merkt er bijna niets van.",
          "Maar hij gaat razendsnel, zo snel als een vliegtuig.",
          "Als de golf bij de kust komt, wordt het water ondiep.",
          "Dan wordt de golf steeds hoger.\""
        ],
        ontdek: [
          { naam: "Japan", x: 95, y: 70,
            tekst: "Japan ligt aan de Ring van Vuur. Daarom kennen ze daar veel aardbevingen en tsunami's, en hebben ze een woord voor die golf." }
        ]
      },
      {
        id: "8.3",
        prent: "vluchtroute",
        tekst: [
          "\"Hoe weet je dat er een tsunami komt?\" vraagt Noor.",
          "\"Er zijn waarschuwingen,\" zegt opa. \"Meetboeien in de zee en sirenes.",
          "En soms geeft de zee zelf een teken.",
          "Dan trekt het water zich plots heel ver terug.",
          "Dan moet je niet gaan kijken, maar meteen hoog gaan staan.",
          "Op een heuvel of hoog in een stevig gebouw.\""
        ],
        ontdek: [
          { naam: "Bordje", x: 520, y: 200,
            tekst: "In landen met tsunami's hangen er borden die tonen welke weg je moet nemen naar een veilige, hoge plek." },
          { naam: "België", x: 90, y: 80,
            tekst: "Aan onze Belgische kust is de kans op een tsunami heel klein." }
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 9,
    titel: "De aarde in het oog houden",
    scenes: [
      {
        id: "9.1",
        prent: "onderzoeker",
        tekst: [
          "De Boorbol landt op een vulkaan. Daar staat iemand in een zilveren pak.",
          "\"Een collega van vroeger!\" roept opa.",
          "\"[[Vulkaanonderzoekers|vulkaanonderzoeker]] houden vulkanen in het oog,\" legt opa uit.",
          "\"Ze meten of de grond een beetje opzwelt.",
          "Ze meten de gassen die eruit komen.",
          "En ze luisteren naar kleine trillingen.\""
        ],
        ontdek: [
          { naam: "Zilveren pak", x: 300, y: 250,
            tekst: "Het zilveren pak kaatst de hitte terug, zoals een spiegel het licht terugkaatst." },
          { naam: "Drone", x: 520, y: 110,
            tekst: "Vandaag gebruiken onderzoekers drones om dicht bij een krater te kijken, zonder zelf gevaar te lopen." },
          { naam: "Satelliet", x: 715, y: 60,
            tekst: "Satellieten in de ruimte kunnen zien of een vulkaan warmer wordt." }
        ]
      },
      {
        id: "9.2",
        prent: "vulkaan-gromt",
        geluid: "grom",
        tekst: [
          "\"Een vulkaan waarschuwt vaak voor hij uitbarst,\" zegt Kiezel.",
          "\"Hij gromt een beetje, zoals een maag die honger heeft.",
          "Dat zijn kleine aardbevingen.\"",
          "\"Dan kunnen de mensen op tijd weggaan,\" zegt opa.",
          "\"Bij aardbevingen is dat moeilijker.",
          "Niemand kan precies voorspellen wanneer ze komen.\""
        ]
      },
      {
        id: "9.3",
        prent: "stevig-bouwen",
        tekst: [
          "\"Hoe beschermen mensen zich dan?\" vraagt Noor.",
          "\"Door slim te bouwen,\" zegt opa.",
          "\"In Japan bouwen ze huizen die een beetje kunnen meebuigen,",
          "zoals een boom in de wind. Dan breken ze niet zo snel.",
          "En kinderen op school oefenen wat ze moeten doen.\""
        ],
        ontdek: [
          { naam: "Gebouw", x: 560, y: 395,
            tekst: "Sommige hoge gebouwen in Japan staan op grote rubberen blokken. Die vangen de trillingen op, als een soort schokdemper." }
        ]
      },
      {
        id: "9.4",
        prent: "bukken-dekken",
        tekst: [
          "\"Wat doen die kinderen dan?\" vraagt Noor.",
          "Kiezel doet het voor. \"Drie stappen. Bukken. Dekken. Vasthouden.",
          "Bukken: ga laag op de grond zitten, zodat je niet valt.",
          "Dekken: kruip onder een stevige tafel en bescherm je hoofd.",
          "Vasthouden: houd de tafelpoot goed vast tot het stopt.\"",
          "Noor knikt. \"Dat is makkelijk te onthouden.\""
        ],
        ontdek: [
          { naam: "Tafel", x: 400, y: 245,
            tekst: "Weg van ramen en kasten die kunnen omvallen. Dat is ook belangrijk." }
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 10,
    titel: "Terug op de zolder",
    scenes: [
      {
        id: "10.1",
        prent: "terugvlucht",
        tekst: [
          "\"Tijd om naar huis te gaan,\" zegt opa.",
          "De Boorbol vliegt over de Ring van Vuur, over IJsland en over de Eifel.",
          "Noor kijkt naar beneden. De aarde ziet er nu anders uit.",
          "Ze weet dat er onder haar voeten heel traag iets beweegt.",
          "Platen die schuiven. Magma dat borrelt. Een aarde die leeft."
        ]
      },
      {
        id: "10.2",
        prent: "zolder-zon",
        tekst: [
          "Plots zitten ze weer op de zolder. Het is gestopt met regenen.",
          "\"Was het een droom?\" vraagt Noor.",
          "Opa haalt zijn schouders op en glimlacht.",
          "Kiezel ligt stil op haar hand. Gewoon een grijze steen met gaatjes.",
          "Of... knipoogt hij nu?"
        ]
      },
      {
        id: "10.3",
        prent: "klas",
        geluid: "plons",
        tekst: [
          "De volgende dag neemt Noor Kiezel mee naar school.",
          "Ze legt hem in een bak water. De klas roept: \"Hij drijft!\"",
          "En dan vertelt Noor alles.",
          "Over de aarde als een perzik. Over de puzzel van platen.",
          "Over vulkanen die spuiten en vulkanen die slapen.",
          "Over aardbevingen, en over bukken, dekken en vasthouden.",
          "Haar juf zegt: \"Noor, jij bent een echte aardwetenschapper.\""
        ]
      },
      {
        id: "10.4",
        prent: "lachende-aarde",
        slot: true,   // laatste scène: toont EINDE en de knop "Opnieuw beginnen"
        tekst: [
          "Onze aarde is nooit helemaal stil.",
          "Ze bromt, ze beweegt en ze bouwt nieuwe bergen en eilanden.",
          "Vulkanen en aardbevingen kunnen gevaarlijk zijn.",
          "Maar als je ze begrijpt, ben je minder bang.",
          "En wie weet... ligt er ook bij jou ergens een steen",
          "die een verhaal te vertellen heeft."
        ]
      }
    ]
  }
];
