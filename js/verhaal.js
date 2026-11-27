/* =====================================================================
   HET VERHAAL – "De aarde bromt"
   ---------------------------------------------------------------------
   Hier staat ALLE tekst van het verhaal, met alle opdrachten en
   evaluaties. Je kan dit aanpassen zonder de code te begrijpen.

   Elk hoofdstuk heeft een nummer, een titel en een lijst scènes.
   Elke scène heeft:
     id       een naam voor de scène (bv. "2.3"), ook gebruikt voor antwoorden
     prent    welke tekening getoond wordt (map assets); null = geen prent
     geluid   (niet verplicht) regen, plons, boorbol, psssj, boem, borrel,
              rommel, krak, golf, grom, stoom
     cyclus   (niet verplicht) toont de stappen van de onderzoekscyclus of
              de ontwerpcyclus:  { soort: "onderzoek" of "ontwerp", stap: 0.. }
     tekst    de zinnen, elke regel tussen aanhalingstekens, met een komma ertussen
     ontdek   (niet verplicht) "Wist je dat?"-plekjes in de prent
              { naam, x, y, tekst }  (prent is 800 breed en 450 hoog)
     opdracht (niet verplicht) een opdracht of evaluatie, zie js/opdrachten.js
     keuze    (niet verplicht) een keuzemoment, zie scène 5.4

   Moeilijke woorden: zet ze tussen [[ en ]]:
     [[magma]]                     -> klikbaar woord "magma"
     [[actieve vulkaan|actief]]    -> toont "actieve vulkaan" met de uitleg van "actief"

   Een "id" van een opdracht moet uniek zijn. Verander een id niet meer
   nadat de kinderen begonnen zijn, anders vinden ze hun antwoord niet terug.
   Een evaluatie-id (bv. "eval1") is ook de naam van de kolom in de export.
   ===================================================================== */

window.CYCLI = {
  onderzoek: {
    naam: "Onderzoekscyclus",
    stappen: ["Verwonderen", "Onderzoeksvraag", "Voorspellen", "Onderzoeken", "Besluiten", "Voorstellen", "Terugblikken"]
  },
  ontwerp: {
    naam: "Ontwerpcyclus",
    stappen: ["Probleem", "Onderzoeken", "Ontwerpen", "Bouwen", "Testen", "Verbeteren", "Besluiten"]
  }
};

window.VERHAAL = [

  /* ================================================================ */
  {
    nummer: 1,
    titel: "Een missie op de zolder",
    scenes: [
      {
        id: "1.1",
        prent: "zolder",
        geluid: "regen",
        tekst: [
          "Het regent al de hele woensdagmiddag. Noor logeert bij opa Staf.",
          "Ze heeft een opdracht van de juf: “Word aardwetenschapper!”",
          "“Opa, jij was toch vulkaanonderzoeker?” vraagt ze.",
          "“Klopt,” zegt opa. “Kijk maar eens op de zolder.”",
          "Overal staan dozen met etiketten: “IJsland”, “Italië”, “Hawaï”."
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
          "“Dat is [[puimsteen]],” zegt opa. “Die komt uit een vulkaan.",
          "Leg hem maar eens in een emmer water.”"
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
          "Dan hoort ze een klein stemmetje.",
          "“Hé! Dat water is koud! Haal me eruit!”",
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
          "“Ik ben Kiezel,” zegt de steen. “Ik kom uit het vuur van een vulkaan.”",
          "“De aarde lijkt rustig en stevig,” zegt Kiezel. “Maar ze beweegt altijd.",
          "Soms barst een vulkaan uit. Soms begint de grond te trillen.",
          "Soms ontstaat er een [[tsunami]], of verandert een landschap.",
          "Dan moeten mensen soms hun huis verlaten.”",
          "“Ik help je met je missie,” zegt Kiezel. “Ga je mee?”"
        ]
      },
      {
        id: "1.5",
        prent: "missie",
        cyclus: { soort: "onderzoek", stap: 0 },
        tekst: [
          "Opa schrijft de grote vraag op een bord:",
          "“Hoe is de aarde opgebouwd? En waarom komen vulkanen en aardbevingen",
          "vooral op bepaalde plaatsen voor?”",
          "“Dat gaan we onderzoeken,” zegt opa. “Met modellen, kaarten,",
          "gegevens en waarnemingen. Zoals echte wetenschappers.”"
        ],
        opdracht: {
          soort: "open",
          titel: "Verwonder je",
          vragen: [
            { id: "1.5.weet", vraag: "Wat weet jij al over vulkanen en aardbevingen?" },
            { id: "1.5.vraag", vraag: "Wat wil jij graag te weten komen?" }
          ]
        }
      },
      {
        id: "1.6",
        prent: "doelen",
        tekst: [
          "“Wat moet ik straks allemaal kunnen?” vraagt Noor.",
          "Opa geeft haar een lijstje. “Vink het af als je het kan.",
          "Aan het einde van de reis kijk je nog eens.”"
        ],
        opdracht: {
          soort: "afvinken",
          id: "1.6.doelen",
          titel: "Wat moet je kunnen?",
          vraag: "Na deze missie kan ik:",
          items: [
            "de lagen van de aarde benoemen en uitleggen",
            "op een kaart vulkanen en aardbevingen aanduiden",
            "een patroon ontdekken: waar liggen ze vooral?",
            "uitleggen dat ze vaak langs grenzen van aardplaten liggen",
            "een model gebruiken en zeggen wat het wel en niet toont",
            "met waarnemingen een besluit maken",
            "gevolgen voor mensen, landschap, planten en dieren noemen",
            "zeggen hoe je veilig handelt"
          ]
        }
      },
      {
        id: "1.7",
        prent: "modellen",
        tekst: [
          "“Hoe kunnen we in de aarde kijken?” vraagt Noor.",
          "“Dat kan niet zomaar,” zegt opa. “De aarde is enorm groot.",
          "Daarom gebruiken wetenschappers een [[model]].",
          "Een model is een eenvoudige voorstelling van de werkelijkheid.",
          "Een globe is een model van de aarde. Een doorsnede ook.”"
        ],
        ontdek: [
          { naam: "Globe", x: 210, y: 220,
            tekst: "Een globe is een model van de aarde. Ze is veel kleiner dan de echte aarde, zodat je ze in je handen kan houden." },
          { naam: "Doorsnede", x: 580, y: 220,
            tekst: "Een doorsnede is alsof je de aarde doormidden snijdt. Zo zie je de lagen. In het echt kan dat natuurlijk niet!" }
        ]
      },
      {
        id: "1.8",
        prent: "modellen",
        tekst: [
          "“Een model helpt als iets te groot is, of te klein,” zegt Kiezel.",
          "“Of te ver weg, of te diep.",
          "Of als iets te snel of te langzaam gebeurt.”",
          "“Maar let op,” zegt opa. “Een model is niet echt hetzelfde.",
          "Het toont alleen wat belangrijk is voor je onderzoek.”"
        ],
        opdracht: [
          {
            soort: "open",
            titel: "Denk even na",
            vragen: [{ id: "1.8.denk", vraag: "Waarom is een model van de aarde handig voor een wetenschapper?" }]
          },
          {
            soort: "oefening",
            id: "oef-model",
            vragen: [
              { type: "sorteer", vraag: "Is dit een model of de echte werkelijkheid?", groepen: ["model", "echt"],
                items: [
                  { tekst: "een globe", juist: 0 },
                  { tekst: "de berg waar je op staat", juist: 1 },
                  { tekst: "een tekening van de lagen van de aarde", juist: 0 },
                  { tekst: "een speelgoedvulkaan van klei", juist: 0 }
                ] }
            ]
          }
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
          "Kiezel tovert een ronde capsule tevoorschijn. “Dit is de Boorbol!”",
          "Noor en opa stappen in. De Boorbol begint te draaien en te zakken.",
          "Dieper. En dieper. En nog dieper.",
          "Dit is een fantasiereis. In het echt kan niemand zo diep reizen.",
          "Daarom gebruiken wetenschappers modellen."
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
          "“De aarde lijkt een beetje op een perzik,” zegt opa.",
          "“Buiten zit een dun velletje. Dat is de [[aardkorst]].",
          "Daaronder zit het dikke vruchtvlees. Dat is de [[mantel]].",
          "Dan komt de harde pit. Dat is de [[buitenkern]].",
          "En in de pit zit nog een zaadje. Dat is de [[binnenkern]].”"
        ],
        ontdek: [
          { naam: "Aardkorst", x: 270, y: 82,
            tekst: "De aardkorst is maar 5 tot 70 kilometer dik. Onder de oceanen is ze meestal dunner dan onder de continenten." },
          { naam: "Mantel", x: 140, y: 175,
            tekst: "De mantel is bijna 3000 kilometer dik. Het gesteente is er zo heet dat het heel, heel traag kan bewegen, zoals dikke stroop." },
          { naam: "Buitenkern", x: 255, y: 205,
            tekst: "De buitenkern bestaat vooral uit heel heet, vloeibaar metaal." },
          { naam: "Binnenkern", x: 210, y: 245,
            tekst: "De binnenkern is ongeveer even heet als de buitenkant van de zon. Toch is ze vast, omdat de druk daar zo enorm groot is." }
        ]
      },
      {
        id: "2.3",
        prent: "in-de-mantel",
        tekst: [
          "Het wordt warm in de Boorbol. Het raam kleurt oranje.",
          "“We zijn in de mantel,” zegt Kiezel trots. “Hier ben ik geboren.”",
          "“Het gesteente is hier heel heet,” zegt opa.",
          "“Het meeste is vast, maar het kan heel langzaam bewegen.",
          "Die beweging duwt de stukken van de aardkorst mee.",
          "Alleen op sommige plaatsen smelt het. Dat heet [[magma]].”"
        ],
        ontdek: [
          { naam: "Magma", x: 640, y: 335,
            tekst: "Magma is gesmolten gesteente ONDER de grond. Komt het boven de grond, dan noemen we het lava." }
        ]
      },
      {
        id: "2.4",
        prent: "kern",
        tekst: [
          "“Nog dieper!” roept Kiezel. De Boorbol gloeit helemaal.",
          "“Dit is de buitenkern,” zegt opa. “Hier is alles vloeibaar metaal.”",
          "In het midden ziet Noor een gloeiende bal.",
          "“De binnenkern is nog heter,” zegt opa. “Toch is ze vast.",
          "Alles drukt er zo hard op, dat het niet kan smelten.”"
        ],
        ontdek: [
          { naam: "Druk", x: 520, y: 225,
            tekst: "Duw je met je hand op een spons, dan wordt hij plat. In de binnenkern drukt het gewicht van de hele aarde. Dat is een enorme druk!" }
        ]
      },
      {
        id: "2.5",
        prent: "boorbol-stijgt",
        geluid: "boorbol",
        tekst: [
          "“Genoeg gezweet,” zegt opa. “Terug naar boven!”",
          "De Boorbol stijgt. Het wordt weer koeler.",
          "“Onthoud,” zegt Kiezel. “Van buiten naar binnen:",
          "aardkorst, mantel, buitenkern en binnenkern.”"
        ],
        opdracht: {
          soort: "oefening",
          id: "oef-volgorde",
          titel: "Mini-opdracht: van buiten naar binnen",
          vragen: [
            { type: "koppel", vraag: "Welke laag komt waar?", opties: ["aardkorst", "mantel", "buitenkern", "binnenkern"],
              items: [
                { tekst: "1ste laag (buiten)", juist: "aardkorst" },
                { tekst: "2de laag", juist: "mantel" },
                { tekst: "3de laag", juist: "buitenkern" },
                { tekst: "4de laag (midden)", juist: "binnenkern" }
              ] }
          ]
        }
      },
      {
        id: "2.6",
        prent: "klei-model",
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "Terug op de zolder pakt opa een doos klei.",
          "“Onderzoek 1,” zegt hij. “Bouw de aarde na.”",
          "De onderzoeksvraag is: Hoe is de aarde opgebouwd?",
          "“Maak een doorsnede van de aarde,” zegt Kiezel.",
          "“Gebruik voor elke laag een ander materiaal of een andere kleur.”"
        ],
        opdracht: {
          soort: "doe",
          titel: "Onderzoek 1 – Bouw de aarde na",
          materiaal: ["klei in vier kleuren (of papier, karton, stof...)", "een plastic mesje of een stevige draad", "kleine papiertjes met namen"],
          stappen: [
            "Ontwerp eerst: teken hieronder hoe jouw model eruit zal zien.",
            "Maak een klein balletje voor de binnenkern.",
            "Leg er een laag rond voor de buitenkern, dan een dikke laag voor de mantel.",
            "Maak een dun velletje voor de aardkorst.",
            "Snij je bol voorzichtig doormidden. Nu zie je de doorsnede!",
            "Zet de juiste namen bij elke laag."
          ]
        }
      },
      {
        id: "2.7",
        prent: null,
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "“Eerst ontwerpen, dan bouwen,” zegt opa.",
          "Teken je model van de aarde. Zet de namen van de lagen erbij."
        ],
        opdracht: [
          {
            soort: "tekenen",
            id: "2.7.ontwerp",
            titel: "Ontwerp je model",
            aanduiden: ["aardkorst", "mantel", "buitenkern", "binnenkern"]
          },
          {
            soort: "open",
            titel: "Na het bouwen",
            vragen: [
              { id: "2.7.materiaal", vraag: "Welk materiaal of welke kleur gebruikte je voor elke laag?" },
              { id: "2.7.niet", vraag: "Wat toont jouw model NIET zoals in het echt? (denk aan hoe groot, hoe heet...)" }
            ]
          }
        ]
      },
      {
        id: "2.8",
        prent: "lagen-genummerd",
        tekst: [
          "“Tijd voor een evaluatie,” zegt Kiezel. “Ben je nog mee?”",
          "Lees elke vraag goed. Kijk naar de prent als je wil.",
          "Klik daarna op de knop om na te kijken."
        ],
        opdracht: {
          soort: "evaluatie",
          id: "eval1",
          titel: "Evaluatie 1 – De aarde vanbinnen",
          vragen: [
            { type: "koppel", vraag: "Welke laag heeft welk nummer op de prent?", opties: ["aardkorst", "mantel", "buitenkern", "binnenkern"],
              items: [
                { tekst: "Nummer 1", juist: "aardkorst" },
                { tekst: "Nummer 2", juist: "mantel" },
                { tekst: "Nummer 3", juist: "buitenkern" },
                { tekst: "Nummer 4", juist: "binnenkern" }
              ] },
            { type: "meerkeuze", vraag: "Op welke laag wonen wij?", opties: ["de mantel", "de aardkorst", "de binnenkern"], juist: 1,
              uitleg: "Wij wonen op de aardkorst, de dunne buitenste laag." },
            { type: "meerkeuze", vraag: "Waar is de aardkorst meestal het dunst?", opties: ["onder de oceanen", "onder hoge bergen", "overal even dik"], juist: 0,
              uitleg: "Onder de oceanen is de korst meestal dunner dan onder de continenten." },
            { type: "waar", stelling: "De binnenkern is vloeibaar.", juist: false,
              uitleg: "De binnenkern is vast, door de enorme druk. De buitenkern is vloeibaar." },
            { type: "waar", stelling: "Het hete gesteente in de mantel kan heel langzaam bewegen.", juist: true,
              uitleg: "Die trage beweging speelt een grote rol bij het bewegen van de aardplaten." }
          ]
        }
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
          "De Boorbol hangt hoog boven de aarde. Noor ziet de hele wereld.",
          "“Zie je die lijnen?” vraagt opa. “De aardkorst is niet één geheel.",
          "Ze bestaat uit grote stukken, zoals een puzzel.",
          "Die stukken noemen we [[aardplaten|plaat]].”",
          "“Aan de grenzen van de platen gebeurt het,” zegt Kiezel.",
          "“Daar ontstaan aardbevingen, vulkanen en gebergten.”"
        ],
        ontdek: [
          { naam: "Puzzelstuk", x: 570, y: 115,
            tekst: "Er zijn ongeveer 7 grote platen en nog veel kleinere." },
          { naam: "België", x: 382, y: 148,
            tekst: "België ligt midden op de Euraziatische plaat, ver van een plaatgrens. Daarom hebben wij geen actieve vulkanen en maar weinig aardbevingen." }
        ]
      },
      {
        id: "3.2",
        prent: "nagels",
        tekst: [
          "“Bewegen die platen?” vraagt Noor.",
          "“Ja,” zegt opa. “Maar heel, heel traag.",
          "Ongeveer even snel als jouw nagels groeien.",
          "Een paar centimeter per jaar. Dat voel je niet.",
          "Toch kan die beweging grote gevolgen hebben.”"
        ],
        ontdek: [
          { naam: "Nagels", x: 300, y: 140,
            tekst: "Al lang geleden lagen Afrika en Zuid-Amerika tegen elkaar. Kijk maar op een kaart: ze passen bijna als puzzelstukken!" }
        ]
      },
      {
        id: "3.3",
        prent: "beweging-uit-elkaar",
        tekst: [
          "“Platen kunnen op drie manieren bewegen,” legt opa uit.",
          "“Eén: ze gaan [[uit elkaar]].",
          "Er ontstaat ruimte. Magma uit de aarde komt naar boven.",
          "Zo ontstaat er nieuwe aardkorst.”"
        ],
        ontdek: [
          { naam: "Uit elkaar", x: 135, y: 275,
            tekst: "In IJsland gaan twee platen uit elkaar. Je kan er tussen twee platen door wandelen." }
        ]
      },
      {
        id: "3.4",
        prent: "beweging-naar-elkaar",
        tekst: [
          "“Twee: ze bewegen [[naar elkaar toe]].",
          "Soms duikt de ene plaat onder de andere.",
          "Daar ontstaan krachtige aardbevingen en vulkanen.",
          "Botsen twee platen, dan kunnen er gebergten ontstaan.”"
        ],
        ontdek: [
          { naam: "Botsen", x: 400, y: 150,
            tekst: "De Himalaya, met de Mount Everest, ontstond toen India tegen Azië botste. De Everest wordt nog altijd elk jaar een klein beetje hoger!" }
        ]
      },
      {
        id: "3.5",
        prent: "beweging-langs-elkaar",
        tekst: [
          "“Drie: ze schuiven [[langs elkaar]],” zegt opa.",
          "“Ze schuren. Door de wrijving blijven ze even vastzitten.",
          "Plots schieten ze los. Dan komt er veel energie vrij.",
          "Dat kan een aardbeving geven.”"
        ]
      },
      {
        id: "3.6",
        prent: "karton",
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "“Onderzoek 2,” zegt Kiezel. “Aardplaten in beweging.”",
          "“We maken een eenvoudig model,” zegt opa.",
          "“Twee stukken karton zijn twee aardplaten.”",
          "Stap 1: Leg de twee stukken karton tegen elkaar.",
          "Duw ze langzaam uit elkaar."
        ],
        opdracht: [
          {
            soort: "doe",
            titel: "Onderzoek 2 – Aardplaten in beweging",
            materiaal: ["twee stukken karton", "een tafel", "eventueel een dunne doek of een vel papier (dat is de mantel)"]
          },
          {
            soort: "open",
            titel: "Stap 1 – Uit elkaar",
            vragen: [
              { id: "3.6.zie", vraag: "Wat zie je?" },
              { id: "3.6.stelt", vraag: "Wat stellen de twee stukken karton voor?" }
            ]
          }
        ]
      },
      {
        id: "3.7",
        prent: "karton",
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "Stap 2: Duw de twee stukken karton naar elkaar.",
          "Laat één stuk een beetje onder het andere schuiven.",
          "Kijk goed wat er met de randen gebeurt."
        ],
        opdracht: {
          soort: "open",
          titel: "Stap 2 – Naar elkaar toe",
          vragen: [
            { id: "3.7.gebeurt", vraag: "Wat gebeurt er?" },
            { id: "3.7.verschijnsel", vraag: "Welk verschijnsel kan bij zo'n beweging ontstaan?" }
          ]
        }
      },
      {
        id: "3.8",
        prent: "karton",
        cyclus: { soort: "onderzoek", stap: 3 },
        geluid: "krak",
        tekst: [
          "Stap 3: Laat de twee stukken langs elkaar schuiven.",
          "Duw ze eerst tegen elkaar, zodat ze even blijven steken.",
          "Geef daarna een korte, krachtige duw."
        ],
        opdracht: {
          soort: "open",
          titel: "Stap 3 – Langs elkaar",
          vragen: [
            { id: "3.8.gebeurt", vraag: "Wat gebeurt er?" },
            { id: "3.8.verschijnsel", vraag: "Welk verschijnsel kan hierdoor ontstaan?" }
          ]
        }
      },
      {
        id: "3.9",
        prent: "karton",
        cyclus: { soort: "onderzoek", stap: 4 },
        tekst: [
          "“Let op,” zegt opa. “Karton is natuurlijk geen echte aardplaat.",
          "Echte aardplaten zijn gigantisch groot en bewegen heel langzaam.",
          "De aarde heeft lagen, en hitte en druk spelen mee.",
          "Alles is veel ingewikkelder dan in ons model.”",
          "“Toch helpt het model,” zegt Kiezel. “Nu snap ik wat er aan een grens gebeurt!”"
        ],
        opdracht: {
          soort: "open",
          titel: "Besluit van onderzoek 2",
          vragen: [
            { id: "3.9.besluit", vraag: "Wat heb je ontdekt met je model? Maak een besluit: aan de grenzen van aardplaten..." },
            { id: "3.9.verschil", vraag: "Noem één verschil tussen je kartonnen model en echte aardplaten." }
          ]
        }
      },
      {
        id: "3.10",
        prent: "drie-bewegingen",
        tekst: [
          "“Ben je nog mee?” vraagt Kiezel.",
          "“Tijd voor evaluatie 2. Kijk goed naar de drie bewegingen.”"
        ],
        opdracht: {
          soort: "evaluatie",
          id: "eval2",
          titel: "Evaluatie 2 – Aardplaten",
          vragen: [
            { type: "meerkeuze", vraag: "Wat zijn aardplaten?", opties: ["grote stukken van de harde buitenlaag van de aarde", "de lagen in de kern", "grote borden waarop we eten"], juist: 0,
              uitleg: "De aardkorst bestaat uit grote stukken, zoals puzzelstukken." },
            { type: "meerkeuze", vraag: "Hoe snel bewegen aardplaten?", opties: ["zo snel als een auto", "een paar centimeter per jaar", "ze bewegen nooit"], juist: 1,
              uitleg: "Ongeveer even snel als je nagels groeien." },
            { type: "koppel", vraag: "Welke beweging hoort bij wat er gebeurt?", opties: ["uit elkaar", "naar elkaar toe", "langs elkaar"],
              items: [
                { tekst: "Er komt magma omhoog en er ontstaat nieuwe korst.", juist: "uit elkaar" },
                { tekst: "Er ontstaat een hoog gebergte.", juist: "naar elkaar toe" },
                { tekst: "Ze zitten vast en schieten plots los.", juist: "langs elkaar" }
              ] },
            { type: "waar", stelling: "Onze kartonnen platen zijn precies hetzelfde als echte aardplaten.", juist: false,
              uitleg: "Een model is nooit hetzelfde als de werkelijkheid. Het toont alleen wat belangrijk is." },
            { type: "waar", stelling: "Aan de grenzen van aardplaten kunnen vulkanen en aardbevingen ontstaan.", juist: true,
              uitleg: "Daar bewegen de platen ten opzichte van elkaar." }
          ]
        }
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 4,
    titel: "Wanneer de grond beeft",
    scenes: [
      {
        id: "4.1",
        prent: "grond-trilt",
        geluid: "rommel",
        tekst: [
          "Plots begint de grond onder de Boorbol te trillen.",
          "De kopjes rinkelen. Noor grijpt opa's arm.",
          "“Rustig maar,” zegt opa. “Het is een kleine [[aardbeving]].",
          "Hier in IJsland gebeurt dat vaak.”",
          "Na een paar tellen is het weer stil."
        ]
      },
      {
        id: "4.2",
        prent: "latje-buigt",
        geluid: "krak",
        tekst: [
          "Opa neemt een houten latje. “Kijk.",
          "Ik buig dit latje langzaam. Het wordt gespannen.",
          "Nog een beetje... en nog een beetje...” KRAK!",
          "“Zo gaat het ook met gesteente in de aardkorst.”"
        ],
        ontdek: [
          { naam: "Latje", x: 400, y: 165,
            tekst: "De plek waar het gesteente breekt, heet een breuk. Soms is zo'n breuk honderden kilometers lang." }
        ]
      },
      {
        id: "4.3",
        prent: "platen-breken",
        tekst: [
          "“De platen willen bewegen, maar ze zitten vast.",
          "De spanning wordt groter en groter.",
          "Tot het gesteente plots breekt en verschuift.",
          "Dan komt er in één keer veel energie vrij.",
          "Die energie gaat als trillingen door de aarde.”"
        ]
      },
      {
        id: "4.4",
        prent: "kringen",
        geluid: "plons",
        tekst: [
          "Kiezel springt in een plas. Plons! Er komen kringen in het water.",
          "“Zo gaan trillingen door de grond,” zegt Kiezel. “Alle kanten op.”",
          "“De plek diep in de grond waar het begint, is het [[hypocentrum]],” zegt opa.",
          "“De plek recht daarboven, aan de oppervlakte, is het [[epicentrum]].",
          "Daar voel je de beving het sterkst.”"
        ],
        ontdek: [
          { naam: "Kringen", x: 200, y: 250,
            tekst: "Hoe verder de kringen van het midden gaan, hoe zwakker ze worden. Zo voel je een aardbeving ver weg ook minder." },
          { naam: "Golven", x: 690, y: 300,
            tekst: "Aardbevingsgolven zijn heel snel. De snelste golven zijn in ongeveer 20 minuten aan de andere kant van de aarde." }
        ]
      },
      {
        id: "4.5",
        prent: "gevolgen-beving",
        tekst: [
          "“Soms zijn de trillingen heel zwak,” zegt opa.",
          "“Maar soms zijn ze zo krachtig dat gebouwen beschadigd raken.",
          "Wegen scheuren. Bruggen storten in. De grond verschuift.",
          "Dan kunnen mensen gewond raken.”",
          "Noor kijkt ernstig. “Daarom wil ik weten hoe dat werkt.”"
        ]
      },
      {
        id: "4.6",
        prent: "seismograaf",
        tekst: [
          "Opa toont een toestel met een lange papierstrook.",
          "“Dit is een [[seismograaf]]. Een aardbevingsmeter.",
          "Hoe hoger de lijn springt, hoe sterker de beving.",
          "Elke beving krijgt een getal: de [[magnitude]].",
          "Bij 2 voel je bijna niets. Bij 7 is het een heel zware beving.”"
        ],
        ontdek: [
          { naam: "Getal", x: 545, y: 250,
            tekst: "Elk getal hoger betekent een veel sterkere beving. Een beving van 6 is niet een beetje, maar veel sterker dan een beving van 5." },
          { naam: "Elke dag", x: 720, y: 70,
            tekst: "Elke dag zijn er duizenden kleine aardbevingen op aarde. De meeste voelt niemand." }
        ]
      },
      {
        id: "4.7",
        prent: "kaart-belgie",
        tekst: [
          "“Hebben wij in België ook aardbevingen?” vraagt Noor.",
          "“Soms,” zegt opa. “Meestal zijn ze heel klein.",
          "Maar in 1983 was er een beving bij Luik. Schoorstenen vielen van daken.",
          "In 1992 was er een beving in Roermond, vlak bij Limburg.",
          "Het gebeurt gelukkig maar zelden.”"
        ],
        ontdek: [
          { naam: "Meetstation", x: 373, y: 168,
            tekst: "In Ukkel, bij Brussel, houden wetenschappers alle aardbevingen in België in het oog." }
        ],
        opdracht: {
          soort: "oefening",
          id: "oef-centrum",
          titel: "Mini-opdracht: hypocentrum of epicentrum?",
          vragen: [
            { type: "koppel", vraag: "Welk woord hoort erbij?", opties: ["hypocentrum", "epicentrum", "seismograaf"],
              items: [
                { tekst: "De plek diep in de aarde waar de beving begint.", juist: "hypocentrum" },
                { tekst: "De plek aan de oppervlakte, recht erboven.", juist: "epicentrum" },
                { tekst: "Een toestel dat aardbevingen meet.", juist: "seismograaf" }
              ] }
          ]
        }
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
        prent: "doorsnede-vulkaan",
        tekst: [
          "De Boorbol landt naast een berg met een pluim rook.",
          "“Een vulkaan is een plek waar magma naar boven kan komen,” zegt opa.",
          "Het raam wordt een röntgenbril. Onder de berg zit een [[magmakamer]].",
          "Langs een lange pijp kan het magma omhoog, tot in de [[krater]].",
          "“Komt magma boven de grond, dan heet het [[lava]],” zegt Kiezel."
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
        id: "5.2",
        prent: "fles-dicht",
        tekst: [
          "“Waarom komt het magma eruit?” vraagt Noor.",
          "Opa pakt een fles bruiswater. “In magma zit gas, net als bubbels hierin.",
          "Magma is lichter dan het gesteente rondom. Het wil naar boven.”"
        ]
      },
      {
        id: "5.3",
        prent: "fles-open",
        geluid: "psssj",
        tekst: [
          "“Als de druk te groot wordt...”",
          "Opa schudt de fles en draait de dop een beetje open. PSSSJ!",
          "“...dan spuit het eruit. Dat is een [[uitbarsting]].”"
        ],
        ontdek: [
          { naam: "Fles", x: 255, y: 250,
            tekst: "Hoe meer gas er in het magma zit, hoe harder de uitbarsting. Net zoals een fles die je hard geschud hebt." }
        ]
      },
      {
        id: "5.4",
        prent: "uitbarsting",
        geluid: "boem",
        tekst: [
          "“Bij een uitbarsting komt er meer uit dan lava,” zegt opa.",
          "“Er komt [[vulkaanas]], stenen en gassen.",
          "Soms vliegen er brokken lava door de lucht: [[lavabommen|lavabom]].”",
          "“Een uitbarsting kan gevaarlijk zijn,” zegt Kiezel.",
          "“Maar vulkanen maken ook nieuwe grond. Kijk maar!”"
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
        id: "5.5",
        prent: "kaart-keuze",
        tekst: [
          "“Wil je echte vulkanen zien?” vraagt Kiezel.",
          "“Ik ken er twee heel verschillende.",
          "De ene spuit lava als een fontein. De andere borrelt rustig.”"
        ],
        // KEUZEMOMENT: beide wegen worden gelezen, de keuze bepaalt enkel de volgorde.
        keuze: [
          { knop: "Eerst naar Italië", eerst: "5.6" },
          { knop: "Eerst naar Hawaï",  eerst: "5.7" }
        ]
      },
      {
        id: "5.6",
        prent: "stromboli",
        geluid: "boem",
        tekst: [
          "De Boorbol vliegt naar een klein eiland bij Italië. Het is nacht.",
          "Plots spuit er een vonkenregen uit de top. Boem! En weer. En weer.",
          "“Dit is de Stromboli,” zegt opa.",
          "“Hij heeft kleine uitbarstingen, soms om de paar minuten.",
          "Zeelui noemen hem de vuurtoren van de zee.”"
        ],
        ontdek: [
          { naam: "Etna", x: 690, y: 282,
            tekst: "Ook op het Italiaanse eiland Sicilië staat een vulkaan: de Etna. Het is de hoogste actieve vulkaan van Europa." },
          { naam: "Pompeji", x: 90, y: 290,
            tekst: "Bijna 2000 jaar geleden barstte de Vesuvius uit. De stad Pompeji werd bedolven onder de as. Vandaag kan je de oude stad bezoeken." }
        ]
      },
      {
        id: "5.7",
        prent: "hawaii",
        geluid: "borrel",
        tekst: [
          "De Boorbol vliegt over de oceaan naar Hawaï.",
          "Daar ligt een heel brede vulkaan, plat als een omgekeerd bord.",
          "Uit een spleet stroomt lava, rood en traag, als hete soep.",
          "“Dit is een [[schildvulkaan]],” zegt opa. “Er zit weinig gas in de lava.",
          "Daarom zijn de uitbarstingen hier meestal rustig.”"
        ],
        ontdek: [
          { naam: "Mauna Loa", x: 330, y: 228,
            tekst: "Op Hawaï staat de Mauna Loa. Het is de grootste vulkaan op aarde. Hij begint diep onder de zee!" },
          { naam: "Mars", x: 690, y: 75,
            tekst: "De grootste vulkaan van ons zonnestelsel staat op Mars. Hij heet Olympus Mons en is bijna drie keer zo hoog als de Mount Everest." }
        ]
      },
      {
        id: "5.8",
        prent: "drie-vulkanen",
        tekst: [
          "“Niet elke vulkaan is wakker,” zegt Kiezel.",
          "“Een [[actieve vulkaan|actief]] barst nu uit, of deed dat niet zo lang geleden.",
          "Een [[slapende vulkaan|slapend]] is al lang stil, maar kan weer wakker worden.",
          "Een [[uitgedoofde vulkaan|uitgedoofd]] zal nooit meer uitbarsten.”",
          "“Zoals opa na het eten,” grinnikt Noor. “Slapend.”"
        ],
        ontdek: [
          { naam: "Aantal", x: 140, y: 295,
            tekst: "Op het land zijn er ongeveer 1350 vulkanen die nog kunnen uitbarsten. Onder de zee zijn er nog veel meer." }
        ]
      },
      {
        id: "5.9",
        prent: "eifel",
        tekst: [
          "“Zijn er vulkanen dicht bij België?” vraagt Noor.",
          "“Ja hoor,” zegt opa. “In de Eifel, in Duitsland. Net over de grens.”",
          "“Die ronde meertjes zijn oude kraters,” zegt Kiezel.",
          "“Ongeveer 13 000 jaar geleden was hier nog een grote uitbarsting.",
          "Nu slapen deze vulkanen.”"
        ],
        ontdek: [
          { naam: "Meertje", x: 330, y: 320,
            tekst: "Zo'n rond kratermeer heet in de Eifel een 'Maar'." },
          { naam: "Hoge Venen", x: 95, y: 300,
            tekst: "Ook in de Oostkantons, in België, vind je soms nog oude stenen die met vulkanen te maken hebben." }
        ],
        opdracht: {
          soort: "oefening",
          id: "oef-vulkaan",
          titel: "Mini-opdracht: vulkaanwoorden",
          vragen: [
            { type: "meerkeuze", vraag: "Hoe heet gesmolten gesteente ONDER de grond?", opties: ["lava", "magma", "as"], juist: 1 },
            { type: "meerkeuze", vraag: "Welke vulkaan zal nooit meer uitbarsten?", opties: ["een actieve", "een slapende", "een uitgedoofde"], juist: 2 },
            { type: "sorteer", vraag: "Komt dit uit een vulkaan?", groepen: ["ja", "nee"],
              items: [
                { tekst: "lava", juist: 0 }, { tekst: "as", juist: 0 }, { tekst: "water uit de kraan", juist: 1 },
                { tekst: "gassen", juist: 0 }, { tekst: "stenen", juist: 0 }
              ] }
          ]
        }
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 6,
    titel: "Waar liggen vulkanen en aardbevingen?",
    scenes: [
      {
        id: "6.1",
        prent: "ring-van-vuur",
        cyclus: { soort: "onderzoek", stap: 1 },
        tekst: [
          "Opa rolt een grote wereldkaart open. “Onderzoek 3,” zegt hij.",
          "“Op deze kaart staan vulkanen, aardbevingen en plaatgrenzen.”",
          "De onderzoeksvraag is:",
          "Komen vulkanen en aardbevingen overal op aarde voor?"
        ],
        opdracht: {
          soort: "janee",
          id: "6.1.voorspel",
          titel: "Voorspel eerst",
          vraag: "Denk je dat vulkanen en aardbevingen overal op aarde voorkomen?",
          uitlegVraag: "Waarom denk je dat?"
        }
      },
      {
        id: "6.2",
        prent: null,
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "Stap 1: Bekijk de kaart goed. Zet de laag “Aardbevingen” aan.",
          "Schrijf drie plaatsen op waar je veel aardbevingen ziet."
        ],
        opdracht: [
          { soort: "kaartlagen" },
          { soort: "lijst", id: "6.2.bevingen", titel: "Stap 1", vraag: "Hier zie ik veel aardbevingen:", aantal: 3 }
        ]
      },
      {
        id: "6.3",
        prent: null,
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "Stap 2: Zet nu de laag “Vulkanen” aan.",
          "Schrijf drie plaatsen op waar je veel vulkanen ziet."
        ],
        opdracht: [
          { soort: "kaartlagen" },
          { soort: "lijst", id: "6.3.vulkanen", titel: "Stap 2", vraag: "Hier zie ik veel vulkanen:", aantal: 3 }
        ]
      },
      {
        id: "6.4",
        prent: null,
        cyclus: { soort: "onderzoek", stap: 4 },
        tekst: [
          "Stap 3 en 4: Vergelijk de gegevens. Zet ook de plaatgrenzen aan.",
          "Wat valt je op?"
        ],
        opdracht: [
          { soort: "kaartlagen" },
          { soort: "janee", id: "6.4.patroon", titel: "Stap 3", vraag: "Zie je een patroon?" },
          { soort: "open", titel: "Stap 4", vragen: [{ id: "6.4.grenzen", vraag: "Vergelijk de plaatsen met de grenzen van de aardplaten. Wat valt je op?" }] }
        ]
      },
      {
        id: "6.5",
        prent: "ring-van-vuur",
        cyclus: { soort: "onderzoek", stap: 4 },
        tekst: [
          "“Een verrassende ontdekking!” roept Noor.",
          "“Ze liggen niet zomaar overal. Ze liggen waar platen elkaar raken.”",
          "“Juist,” zegt opa. “Sommige grenzen hebben vooral aardbevingen.",
          "Andere hebben veel vulkanen. Sommige hebben beide.",
          "Rond de Stille Oceaan ligt de [[Ring van Vuur]].”"
        ],
        ontdek: [
          { naam: "Ring van Vuur", x: 600, y: 145,
            tekst: "Japan, Indonesië, Chili en het westen van Amerika liggen aan de Ring van Vuur. Daar zijn veel vulkanen en aardbevingen." }
        ],
        opdracht: {
          soort: "janee",
          id: "6.5.klopt",
          titel: "Klopte je voorspelling?",
          vraag: "Klopte wat je bij stap 1 voorspelde?",
          uitlegVraag: "Wat is je besluit? Vulkanen en aardbevingen komen vooral voor..."
        }
      },
      {
        id: "6.6",
        prent: "ring-van-vuur",
        tekst: [
          "“Waarom zijn kaarten zo belangrijk?” vraagt Noor.",
          "“Omdat je er patronen op ziet,” zegt opa.",
          "“Zo weten mensen waar ze voorzichtig moeten zijn.”",
          "“Tijd voor evaluatie 3,” zegt Kiezel."
        ],
        opdracht: {
          soort: "evaluatie",
          id: "eval3",
          titel: "Evaluatie 3 – Kaarten en patronen",
          vragen: [
            { type: "meerkeuze", vraag: "Waar komen de meeste vulkanen en aardbevingen voor?", opties: ["midden op een aardplaat", "langs de grenzen van aardplaten", "overal evenveel"], juist: 1,
              uitleg: "Ze liggen vooral waar platen elkaar raken of langs elkaar bewegen." },
            { type: "meerkeuze", vraag: "Rond welke oceaan ligt de Ring van Vuur?", opties: ["de Atlantische Oceaan", "de Stille Oceaan", "de Noordzee"], juist: 1 },
            { type: "waar", stelling: "België ligt aan een plaatgrens met veel vulkanen.", juist: false,
              uitleg: "België ligt midden op de Euraziatische plaat. Daarom hebben we geen actieve vulkanen." },
            { type: "waar", stelling: "Elke plaatgrens is precies hetzelfde.", juist: false,
              uitleg: "Sommige grenzen hebben vooral aardbevingen, andere vooral vulkanen, en sommige beide." },
            { type: "sorteer", vraag: "Ligt dit land aan de Ring van Vuur?", groepen: ["ja", "nee"],
              items: [{ tekst: "Japan", juist: 0 }, { tekst: "België", juist: 1 }, { tekst: "Chili", juist: 0 }, { tekst: "Indonesië", juist: 0 }] }
          ]
        }
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 7,
    titel: "Gevolgen: niet alleen goed of slecht",
    scenes: [
      {
        id: "7.1",
        prent: "zeebodem",
        geluid: "golf",
        tekst: [
          "De Boorbol duikt diep in de oceaan.",
          "“Aardbevingen gebeuren ook onder de zee,” zegt Kiezel.",
          "“Springt de zeebodem plots omhoog, dan duwt hij het water mee.”",
          "“Net als wanneer je in bad je knieën snel optrekt,” zegt opa."
        ],
        ontdek: [
          { naam: "Bad", x: 690, y: 85,
            tekst: "Probeer het thuis maar eens voorzichtig in bad. Maar niet te hard, anders staat de badkamer onder water!" }
        ]
      },
      {
        id: "7.2",
        prent: "tsunami-golf",
        geluid: "golf",
        tekst: [
          "“Zo'n golf heet een tsunami,” zegt opa. “Een Japans woord voor havengolf.",
          "Op open zee is de golf laag, maar razendsnel.",
          "Bij de kust wordt het water ondiep. Dan wordt de golf steeds hoger.”"
        ],
        ontdek: [
          { naam: "Japan", x: 95, y: 70,
            tekst: "Japan ligt aan de Ring van Vuur. Daarom kennen ze daar veel aardbevingen en tsunami's, en hebben ze een woord voor die golf." }
        ]
      },
      {
        id: "7.3",
        prent: "gevolgen-beving",
        tekst: [
          "“Een aardbeving heeft veel gevolgen,” zegt opa.",
          "“Voor mensen: gewonden, kapotte huizen, geen stroom of water.",
          "Voor het landschap: de grond scheurt, hellingen storten in, wegen verzakken.",
          "Voor het [[ecosysteem]]: bomen vallen om, rivieren veranderen,",
          "en dieren raken hun leefgebied kwijt.”"
        ],
        ontdek: [
          { naam: "Rivier", x: 640, y: 330,
            tekst: "Een aardbeving kan de grond zo laten verschuiven, dat een rivier een andere weg moet zoeken." },
          { naam: "Boom", x: 150, y: 240,
            tekst: "Vallen er veel bomen om, dan verliezen vogels en eekhoorns hun nest. Dat hoort ook bij de gevolgen." }
        ]
      },
      {
        id: "7.4",
        prent: "aswolk",
        tekst: [
          "“En een vulkaan?” vraagt Noor.",
          "“Ook die kan gevaarlijk zijn,” zegt opa. “Hete lava. Vulkanische as.",
          "Giftige gassen. Vallende stenen. En [[modderstromen|modderstroom]].",
          "In 2010 blies een vulkaan in IJsland zoveel as in de lucht,",
          "dat vliegtuigen in heel Europa dagen niet mochten vliegen.”"
        ],
        ontdek: [
          { naam: "Vliegtuig", x: 670, y: 95,
            tekst: "As kan de motoren van een vliegtuig kapotmaken. Daarom vliegen vliegtuigen er altijd omheen." },
          { naam: "IJsland 2010", x: 255, y: 365,
            tekst: "Die vulkaan heette Eyjafjallajökull. Probeer dat maar eens uit te spreken!" }
        ]
      },
      {
        id: "7.5",
        prent: "vruchtbaar",
        tekst: [
          "“Maar vulkanen hebben ook voordelen,” zegt opa.",
          "“Vulkanische grond wordt na een tijd heel [[vruchtbaar]].",
          "Er groeien druiven, tomaten en sinaasappels.",
          "Vulkanen maken nieuwe eilanden en ze trekken toeristen aan.”",
          "“Ik ben dus eigenlijk een bouwer,” zegt Kiezel trots."
        ],
        ontdek: [
          { naam: "Warmte", x: 120, y: 215,
            tekst: "In IJsland gebruiken ze de warmte van onder de grond om huizen te verwarmen en stroom te maken." },
          { naam: "Steen", x: 400, y: 345,
            tekst: "Ook jij, Kiezel? Ja! Puimsteen wordt gebruikt om eelt van je voeten te schuren." }
        ]
      },
      {
        id: "7.6",
        prent: "warm-bad",
        geluid: "stoom",
        tekst: [
          "In IJsland landt de Boorbol bij een warm meer in de sneeuw.",
          "“Dit water wordt verwarmd door de aarde,” zegt opa.",
          "“Zie je,” zegt Kiezel. “Een natuurverschijnsel is niet alleen goed,",
          "en ook niet alleen slecht.”"
        ],
        opdracht: {
          soort: "oefening",
          id: "oef-gevolgen",
          titel: "Mini-opdracht: gevaar of voordeel?",
          vragen: [
            { type: "sorteer", vraag: "Is dit een gevaar of een voordeel van een vulkaan?", groepen: ["gevaar", "voordeel"],
              items: [
                { tekst: "giftige gassen", juist: 0 },
                { tekst: "vruchtbare grond voor boeren", juist: 1 },
                { tekst: "modderstromen", juist: 0 },
                { tekst: "warmte om huizen te verwarmen", juist: 1 },
                { tekst: "nieuwe eilanden", juist: 1 },
                { tekst: "vallende stenen", juist: 0 }
              ] }
          ]
        }
      },
      {
        id: "7.7",
        prent: null,
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "“Onderzoek 4,” zegt opa. “Gevolgen onderzoeken.”",
          "Kies één verschijnsel. Zoek de gevolgen op in het verhaal of in een boek."
        ],
        opdracht: [
          { soort: "kies", id: "7.7.verschijnsel", titel: "Onderzoek 4 – Gevolgen onderzoeken", vraag: "Kies één verschijnsel:", opties: ["aardbeving", "vulkaanuitbarsting"] },
          {
            soort: "open",
            titel: "Vul aan",
            vragen: [
              { id: "7.7.mensen", vraag: "Gevolg voor mensen:" },
              { id: "7.7.landschap", vraag: "Gevolg voor het landschap:" },
              { id: "7.7.natuur", vraag: "Gevolg voor planten en dieren:" },
              { id: "7.7.voordeel", vraag: "Mogelijk voordeel:" }
            ]
          }
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 8,
    titel: "Veilig handelen",
    scenes: [
      {
        id: "8.1",
        prent: "onderzoeker",
        tekst: [
          "De Boorbol landt op een vulkaan. Daar staat iemand in een zilveren pak.",
          "“Een collega van vroeger!” roept opa.",
          "“[[Vulkaanonderzoekers|vulkaanonderzoeker]] houden vulkanen in het oog.",
          "Ze meten of de grond opzwelt, welke gassen eruit komen,",
          "en ze luisteren naar kleine trillingen.”"
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
        id: "8.2",
        prent: "vulkaan-gromt",
        geluid: "grom",
        tekst: [
          "“Een vulkaan waarschuwt vaak voor hij uitbarst,” zegt Kiezel.",
          "“Hij gromt een beetje. Dat zijn kleine aardbevingen.”",
          "“Een aardbeving kan je meestal niet voorspellen,” zegt opa.",
          "“Maar je kan wel leren hoe je veilig handelt.”"
        ]
      },
      {
        id: "8.3",
        prent: "bukken-dekken",
        tekst: [
          "“Wat doe je als je binnen bent tijdens een aardbeving?” vraagt Noor.",
          "Kiezel telt op zijn gaatjes. “Eén: blijf rustig.",
          "Twee: bescherm jezelf tegen vallende voorwerpen. Bescherm je hoofd.",
          "Drie: blijf weg van ramen.",
          "Vier: kruip onder een stevige tafel en houd de poot vast.",
          "Vijf: volg na de beving wat volwassenen en hulpdiensten zeggen.”"
        ],
        ontdek: [
          { naam: "Tafel", x: 400, y: 245,
            tekst: "Bukken, dekken, vasthouden: dat oefenen kinderen in Japan op school." }
        ]
      },
      {
        id: "8.4",
        prent: "vluchtroute",
        tekst: [
          "“En aan zee?” vraagt Noor.",
          "“Trekt het water zich plots ver terug, ga dan niet kijken,” zegt opa.",
          "“Ga meteen naar een hoge plek. Volg de borden.”"
        ],
        ontdek: [
          { naam: "Bordje", x: 520, y: 200,
            tekst: "In landen met tsunami's hangen er borden die tonen welke weg je moet nemen naar een veilige, hoge plek." },
          { naam: "België", x: 90, y: 80,
            tekst: "Aan onze Belgische kust is de kans op een tsunami heel klein." }
        ]
      },
      {
        id: "8.5",
        prent: "as-binnen",
        tekst: [
          "“Bij een vulkaanuitbarsting volg je de hulpdiensten,” zegt opa.",
          "“Soms moet je het gevaarlijke gebied verlaten.",
          "Zit er as in de lucht? Blijf dan binnen en sluit ramen en deuren.",
          "Bescherm je neus en mond tegen as, bijvoorbeeld met een mondmasker.",
          "En vertrek alleen als dat gevraagd wordt.”"
        ],
        opdracht: {
          soort: "open",
          titel: "Denkvragen",
          vragen: [
            { id: "8.5.as", vraag: "Waarom kan vulkanische as gevaarlijk zijn?" },
            { id: "8.5.instructies", vraag: "Waarom is het belangrijk om de instructies van hulpdiensten te volgen?" }
          ]
        }
      },
      {
        id: "8.6",
        prent: "bukken-dekken",
        tekst: [
          "“Weet jij nu wat je moet doen?” vraagt Kiezel.",
          "“Tijd voor evaluatie 4.”"
        ],
        opdracht: {
          soort: "evaluatie",
          id: "eval4",
          titel: "Evaluatie 4 – Veilig handelen",
          vragen: [
            { type: "sorteer", vraag: "Er is een aardbeving en je bent binnen. Is dit veilig of niet veilig?", groepen: ["veilig", "niet veilig"],
              items: [
                { tekst: "Ik blijf rustig.", juist: 0 },
                { tekst: "Ik ga vlak naast een raam staan.", juist: 1 },
                { tekst: "Ik bescherm mijn hoofd.", juist: 0 },
                { tekst: "Ik ren tijdens het trillen meteen naar buiten.", juist: 1 },
                { tekst: "Ik volg de instructies van volwassenen.", juist: 0 },
                { tekst: "Ik kruip onder een stevige tafel.", juist: 0 }
              ] },
            { type: "meerkeuze", vraag: "Er zit veel vulkanische as in de lucht. Wat doe je?", opties: ["Ik ga buiten spelen.", "Ik blijf binnen en sluit ramen en deuren.", "Ik ga naar de krater kijken."], juist: 1 },
            { type: "meerkeuze", vraag: "Aan zee trekt het water zich plots ver terug. Wat doe je?", opties: ["Ik ga schelpen zoeken.", "Ik ga meteen naar een hoge plek.", "Ik wacht op het strand."], juist: 1,
              uitleg: "Dat kan een teken zijn dat er een tsunami komt." }
          ]
        }
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 9,
    titel: "Eindopdracht: word aardwetenschapper!",
    scenes: [
      {
        id: "9.1",
        prent: "brombaai",
        cyclus: { soort: "onderzoek", stap: 0 },
        tekst: [
          "Er komt een bericht binnen op opa's oude radio.",
          "“Hier Brombaai! Bij ons is er iets gebeurd. Wie kan ons helpen?”",
          "“Jullie weten nu genoeg,” zegt opa. “Hoe de aarde is opgebouwd.",
          "Wat aardplaten zijn en hoe ze bewegen. Waar vulkanen en aardbevingen liggen.",
          "Welke gevolgen ze hebben en hoe je veilig handelt.”",
          "“Worden jullie het team aardwetenschappers?” vraagt Kiezel."
        ],
        opdracht: { soort: "groep", titel: "Jullie team" }
      },
      {
        id: "9.2",
        prent: "brombaai",
        cyclus: { soort: "onderzoek", stap: 1 },
        tekst: [
          "Brombaai is een eiland met een vulkaan, een dorp en een haven.",
          "De inwoners willen begrijpen wat er gebeurd is en wat ze moeten doen.",
          "Jullie maken een informatiepakket voor de inwoners, met vier onderdelen.",
          "Kies eerst: wat is er gebeurd in Brombaai?"
        ],
        opdracht: [
          { soort: "kies", id: "9.2.verschijnsel", titel: "Jullie verschijnsel", vraag: "In Brombaai was er een...", opties: ["aardbeving", "vulkaanuitbarsting"] },
          { soort: "open", titel: "Onze onderzoeksvraag", vragen: [
            { id: "9.2.vraag", vraag: "Schrijf jullie onderzoeksvraag. Bijvoorbeeld: Waarom gebeurde dit in Brombaai, en wat moeten de inwoners doen?" },
            { id: "9.2.willen", vraag: "Wat willen de inwoners zeker weten?" }
          ] }
        ]
      },
      {
        id: "9.3",
        prent: "brombaai",
        cyclus: { soort: "onderzoek", stap: 2 },
        tekst: [
          "“Wat denken jullie?” vraagt opa. “Waarom gebeurde het juist daar?”",
          "Een goede wetenschapper voorspelt eerst. Daarna gaat hij zoeken."
        ],
        ontdek: [
          { naam: "Plaatgrens", x: 420, y: 330,
            tekst: "Kijk goed: er loopt een stippellijn door de zee bij Brombaai. Wat zou dat zijn?" }
        ],
        opdracht: {
          soort: "open",
          titel: "Onze voorspelling",
          vragen: [{ id: "9.3.voorspelling", vraag: "Wij denken dat het in Brombaai gebeurde omdat..." }]
        }
      },
      {
        id: "9.4",
        prent: null,
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "“Verdeel het werk,” zegt Kiezel. “Iedereen neemt een stuk voor zijn rekening.”",
          "Schrijf bij elk onderdeel wie eraan werkt. Combineer ook de extra uitdaging."
        ],
        opdracht: {
          soort: "tabel",
          id: "9.4.plan",
          titel: "Ons plan",
          rijKop: "Onderdeel",
          kolommen: [{ kop: "Wie werkt eraan?" }, { kop: "Wat hebben we nodig?" }],
          rijen: ["1. De aarde", "2. Wat gebeurt er?", "3. Waar gebeurt het?", "4. Noodplan", "Extra: Ring van Vuur"]
        }
      },
      {
        id: "9.5",
        prent: null,
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "Onderdeel 1 – De aarde.",
          "Maak een duidelijke tekening of een model van de aarde. Duid de lagen aan."
        ],
        opdracht: [
          { soort: "tekenen", id: "9.5.tekening", titel: "Onderdeel 1 – De aarde", aanduiden: ["aardkorst", "mantel", "buitenkern", "binnenkern"] },
          { soort: "open", titel: "Korte uitleg bij elke laag", vragen: [
            { id: "9.5.korst", vraag: "Aardkorst:" },
            { id: "9.5.mantel", vraag: "Mantel:" },
            { id: "9.5.buitenkern", vraag: "Buitenkern:" },
            { id: "9.5.binnenkern", vraag: "Binnenkern:" }
          ] }
        ]
      },
      {
        id: "9.6",
        prent: null,
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "Onderdeel 2 – Wat gebeurt er?",
          "Leg met een tekening en tekst uit hoe jullie aardbeving of uitbarsting ontstond.",
          "Gebruik de woorden: aardplaten, beweging, plaatgrens, aardbeving of vulkaan."
        ],
        opdracht: [
          { soort: "tekenen", id: "9.6.tekening", titel: "Onderdeel 2 – Wat gebeurt er?", aanduiden: ["aardplaten", "beweging (pijlen)", "plaatgrens", "aardbeving of vulkaan"] },
          { soort: "open", titel: "Onze uitleg", vragen: [{ id: "9.6.uitleg", vraag: "Zo is het ontstaan:", regels: 4 }] }
        ]
      },
      {
        id: "9.7",
        prent: null,
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "Onderdeel 3 – Waar gebeurt het?",
          "Maak een eenvoudige kaart die een patroon toont. Gebruik de kaart van onderzoek 3."
        ],
        opdracht: [
          { soort: "kaartlagen" },
          { soort: "tekenen", id: "9.7.kaart", titel: "Onderdeel 3 – Onze kaart" },
          { soort: "afvinken", id: "9.7.check", titel: "Staat dit op jullie kaart?", items: ["continenten", "oceanen", "minstens drie aardbevingsgebieden of vulkanen", "minstens één plaatgrens", "een duidelijke legende"] },
          { soort: "open", titel: "Het patroon", vragen: [{ id: "9.7.patroon", vraag: "Welk patroon toont jullie kaart?" }] }
        ]
      },
      {
        id: "9.8",
        prent: null,
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "Onderdeel 4 – Noodplan.",
          "Maak een veiligheidskaart voor de inwoners van Brombaai."
        ],
        opdracht: [
          { soort: "open", titel: "Bij een aardbeving", vragen: [
            { id: "9.8.b.doen", vraag: "Wat moet je doen?" },
            { id: "9.8.b.niet", vraag: "Wat mag je zeker niet doen?" },
            { id: "9.8.b.bescherm", vraag: "Hoe kan je jezelf beschermen?" }
          ] },
          { soort: "open", titel: "Bij een vulkaanuitbarsting", vragen: [
            { id: "9.8.v.doen", vraag: "Wat moet je doen?" },
            { id: "9.8.v.niet", vraag: "Wat mag je zeker niet doen?" },
            { id: "9.8.v.verlaten", vraag: "Wanneer moet je het gebied verlaten?" },
            { id: "9.8.v.waarom", vraag: "Waarom moet je de instructies van de hulpdiensten volgen?" }
          ] }
        ]
      },
      {
        id: "9.9",
        prent: "ring-van-vuur",
        cyclus: { soort: "onderzoek", stap: 3 },
        tekst: [
          "Extra uitdaging – Word een echte onderzoeker!",
          "Waarom komen er zoveel vulkanen en aardbevingen voor rond de Stille Oceaan?",
          "Zoek uit wat de Ring van Vuur (in het Engels: Ring of Fire) is.",
          "Verwerk minstens twee ontdekkingen in jullie informatiepakket."
        ],
        opdracht: {
          soort: "lijst",
          id: "9.9.ontdekkingen",
          titel: "Extra uitdaging",
          vraag: "Onze interessante ontdekkingen:",
          aantal: 2
        }
      },
      {
        id: "9.10",
        prent: "brombaai",
        cyclus: { soort: "onderzoek", stap: 4 },
        tekst: [
          "Jullie informatiepakket is klaar. Nu maken jullie een besluit.",
          "Kijk terug naar jullie onderzoeksvraag en jullie voorspelling."
        ],
        opdracht: [
          { soort: "open", titel: "Ons besluit", vragen: [{ id: "9.10.besluit", vraag: "Ons antwoord op de onderzoeksvraag:", regels: 3 }] },
          { soort: "janee", id: "9.10.voorspelling", vraag: "Klopte onze voorspelling?", uitlegVraag: "Wat was anders dan we dachten?" }
        ]
      },
      {
        id: "9.11",
        prent: "klas",
        cyclus: { soort: "onderzoek", stap: 5 },
        tekst: [
          "Nu stellen jullie het informatiepakket voor aan de klas.",
          "Iedereen van het groepje neemt een deel voor zijn rekening.",
          "Spreek luid en duidelijk. Toon jullie tekeningen en de kaart."
        ],
        opdracht: [
          { soort: "tabel", id: "9.11.wie", titel: "Wie vertelt wat?", rijKop: "Tijdens de presentatie leggen we uit:", kolommen: [{ kop: "Wie?" }],
            rijen: ["1. hoe de aarde is opgebouwd", "2. wat aardplaten zijn", "3. hoe aardplaten bewegen", "4. hoe een aardbeving of uitbarsting ontstaat", "5. waarom bepaalde gebieden meer risico lopen", "6. welke gevolgen kunnen ontstaan", "7. hoe mensen veilig kunnen handelen"] },
          { soort: "afvinken", id: "9.11.klaar", titel: "Zijn we klaar om te presenteren?", items: ["We hebben alle vier de onderdelen.", "We hebben twee ontdekkingen over de Ring van Vuur.", "Iedereen weet wat hij vertelt.", "We hebben één keer geoefend."] }
        ]
      },
      {
        id: "9.12",
        prent: null,
        cyclus: { soort: "onderzoek", stap: 5 },
        tekst: [
          "Zo kijkt de juf of meester naar jullie eindopdracht.",
          "Bij elk onderdeel kan je 0 tot 4 punten krijgen."
        ],
        opdracht: { soort: "rubric", rubric: "eindopdracht" }
      },
      {
        id: "9.13",
        prent: "zolder-zon",
        cyclus: { soort: "onderzoek", stap: 6 },
        tekst: [
          "“Goed gedaan, aardwetenschappers!” zegt opa.",
          "“Een echte onderzoeker kijkt altijd terug op zijn werk.”"
        ],
        opdracht: {
          soort: "open",
          titel: "Mijn onderzoekersterugblik",
          vragen: [
            { id: "9.13.geleerd", vraag: "Dit heb ik geleerd:" },
            { id: "9.13.interessant", vraag: "Dit vond ik het interessantst:" },
            { id: "9.13.moeilijk", vraag: "Dit vond ik moeilijk:" },
            { id: "9.13.begrijp", vraag: "Eén ding dat ik nu beter begrijp over de aarde:" },
            { id: "9.13.handig", vraag: "Een model is handig omdat:" },
            { id: "9.13.niet", vraag: "Maar een model is niet hetzelfde als de werkelijkheid omdat:" }
          ]
        }
      },
      {
        id: "9.14",
        prent: "lachende-aarde",
        tekst: [
          "“Nog zin in een uitdaging?” vraagt Kiezel. “Dit zijn mijn moeilijkste denkvragen.”"
        ],
        opdracht: {
          soort: "open",
          titel: "Extra denkvragen",
          vragen: [
            { id: "9.14.d1", vraag: "1. Waarom kunnen wetenschappers aardbevingen en vulkanen bestuderen, ook al kunnen ze niet diep in de aarde kijken?" },
            { id: "9.14.d2", vraag: "2. Stel dat alle aardplaten plots tien keer sneller zouden bewegen. Wat zou er kunnen gebeuren?" },
            { id: "9.14.d3", vraag: "3. Waarom is het nuttig om op een kaart te weten waar aardbevingen en vulkanen vaak voorkomen?" },
            { id: "9.14.d4", vraag: "4. Waarom is een model soms gemakkelijker te begrijpen dan een echte situatie?" }
          ]
        }
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 10,
    titel: "STEM-challenge: bouw een aardbevingsbestendig huis",
    scenes: [
      {
        id: "10.1",
        prent: "burgemeester",
        cyclus: { soort: "ontwerp", stap: 0 },
        tekst: [
          "De burgemeester van Brombaai belt opa op.",
          "“Er komt een nieuwe wijk, waar vaak aardbevingen zijn.",
          "Kunnen jullie een huis ontwerpen en bouwen dat een aardbeving doorstaat?”",
          "“Zoals echte ingenieurs,” zegt Kiezel.",
          "“Onderzoeken, ontwerpen, bouwen, testen en verbeteren!”"
        ],
        opdracht: [
          { soort: "groep", titel: "Jullie bouwteam" },
          { soort: "afvinken", id: "10.1.eisen", titel: "Jullie ontwerpuitdaging", vraag: "Ons modelhuis...", items: [
            "blijft zelfstandig rechtstaan;",
            "gebruikt zo weinig mogelijk materiaal;",
            "is bestand tegen een aardbeving;",
            "heeft minstens één verdieping;",
            "houdt een kleine “bewoner” veilig binnen."
          ] }
        ]
      },
      {
        id: "10.2",
        prent: "materialen",
        cyclus: { soort: "ontwerp", stap: 0 },
        tekst: [
          "De belangrijkste vraag is:",
          "Welke vorm en constructie maakt een huis zo stevig mogelijk tijdens een aardbeving?",
          "Jullie krijgen materiaal. Let op: niet onbeperkt!"
        ],
        opdracht: {
          soort: "doe",
          titel: "Jullie materialen",
          materiaal: ["rietjes", "houten stokjes of satéstokjes", "papier en karton", "plakband", "elastiekjes", "touw", "paperclips"]
        }
      },
      {
        id: "10.3",
        prent: "vormen",
        cyclus: { soort: "ontwerp", stap: 1 },
        tekst: [
          "“Eerst onderzoeken,” zegt opa. “Niet zomaar iets proberen.”",
          "Maak met stokjes of rietjes een vierkant, een rechthoek en een driehoek.",
          "Probeer elke vorm voorzichtig te vervormen. Duw tegen een hoek."
        ],
        opdracht: [
          { soort: "doe", titel: "Onderzoek – Welke vorm is sterk?", stappen: ["Maak een vierkant.", "Maak een rechthoek.", "Maak een driehoek.", "Duw voorzichtig tegen elke vorm."] },
          { soort: "open", titel: "Wat ontdek je?", vragen: [
            { id: "10.3.stevigst", vraag: "Welke vorm blijft het stevigst?" },
            { id: "10.3.waarom", vraag: "Waarom denk je dat dit zo is?" },
            { id: "10.3.gebruik", vraag: "Wat kunnen jullie hiervan gebruiken voor jullie huis?" }
          ] }
        ]
      },
      {
        id: "10.4",
        prent: "stevig-bouwen",
        cyclus: { soort: "ontwerp", stap: 1 },
        tekst: [
          "“Ingenieurs leren ook van echte gebouwen,” zegt opa.",
          "“In Japan bouwen ze huizen die een beetje kunnen meebuigen.",
          "Hoge gebouwen staan soms op grote rubberen blokken.",
          "Die vangen de trillingen op, als een schokdemper.”"
        ],
        ontdek: [
          { naam: "Gebouw", x: 560, y: 395,
            tekst: "Ook schuine balken (diagonalen) maken een gebouw sterker. Zo maak je van een vierkant twee driehoeken!" }
        ],
        opdracht: {
          soort: "oefening",
          id: "oef-vormen",
          titel: "Mini-opdracht: slim bouwen",
          vragen: [
            { type: "meerkeuze", vraag: "Welke vorm vervormt het minst?", opties: ["vierkant", "rechthoek", "driehoek"], juist: 2,
              uitleg: "Een driehoek kan niet scheef geduwd worden zonder dat een zijde breekt." },
            { type: "waar", stelling: "Een schuine stok in een vierkant maakt het steviger.", juist: true,
              uitleg: "Dan maak je er twee driehoeken van." }
          ]
        }
      },
      {
        id: "10.5",
        prent: null,
        cyclus: { soort: "ontwerp", stap: 2 },
        tekst: [
          "Nu maken jullie eerst een ontwerptekening.",
          "Teken het huis alsof je het van voren bekijkt."
        ],
        opdracht: [
          { soort: "tekenen", id: "10.5.ontwerp", titel: "Onze ontwerptekening", aanduiden: ["de basis", "de muren", "de verdiepingen", "verstevigingen", "diagonale verbindingen"] },
          { soort: "open", titel: "Onze keuze", vragen: [{ id: "10.5.omdat", vraag: "Wij kiezen voor deze constructie omdat..." }] }
        ]
      },
      {
        id: "10.6",
        prent: null,
        cyclus: { soort: "ontwerp", stap: 2 },
        tekst: [
          "Voor jullie beginnen te bouwen, maken jullie een voorspelling."
        ],
        opdracht: {
          soort: "open",
          titel: "Onze voorspelling",
          vragen: [{ id: "10.6.voorspelling", vraag: "Ik denk dat ons huis goed bestand zal zijn tegen een aardbeving omdat...", regels: 3 }]
        }
      },
      {
        id: "10.7",
        prent: "bouwen",
        cyclus: { soort: "ontwerp", stap: 3 },
        tekst: [
          "Nu mogen jullie bouwen!",
          "Overleg met elkaar en los samen problemen op.",
          "Werkt iets niet? Dan mogen jullie je ontwerp aanpassen."
        ],
        opdracht: {
          soort: "afvinken",
          id: "10.7.regels",
          titel: "Bouwregels",
          items: [
            "We gebruiken alleen de materialen die we gekregen hebben.",
            "Het huis heeft minstens één verdieping.",
            "Het huis kan zelfstandig rechtstaan.",
            "We volgen ons ontwerp zoveel mogelijk.",
            "We overleggen en lossen samen problemen op.",
            "We passen het ontwerp aan als iets niet werkt."
          ]
        }
      },
      {
        id: "10.8",
        prent: "trilplaat",
        geluid: "rommel",
        cyclus: { soort: "ontwerp", stap: 4 },
        tekst: [
          "Nu komt het spannendste deel: de aardbevingstest!",
          "De leerkracht zet jullie huis op een aardbevingsplatform.",
          "Test 1: het platform beweegt voorzichtig.",
          "Test 2: het beweegt sterker. Test 3: zo sterk als afgesproken.",
          "Kijk goed en verzamel jullie gegevens."
        ],
        opdracht: {
          soort: "tabel",
          id: "10.8.test1",
          titel: "Verzamel gegevens – eerste test",
          rijKop: "Test",
          kolommen: [
            { kop: "Wat gebeurde er?" },
            { kop: "Schade?", type: "keuze", opties: ["geen", "weinig", "veel", "ingestort"] },
            { kop: "Bleef het huis staan?", type: "keuze", opties: ["ja", "nee"] }
          ],
          rijen: ["Lichte aardbeving", "Middelgrote aardbeving", "Zware aardbeving"]
        }
      },
      {
        id: "10.9",
        prent: null,
        cyclus: { soort: "ontwerp", stap: 4 },
        tekst: [
          "Analyseer jullie ontwerp. Kijk naar jullie gegevens."
        ],
        opdracht: {
          soort: "open",
          titel: "Analyseer jullie ontwerp",
          vragen: [
            { id: "10.9.sterkst", vraag: "Wat was het sterkste onderdeel van jullie huis?" },
            { id: "10.9.zwakst", vraag: "Welk onderdeel was het zwakste?" },
            { id: "10.9.bewegen", vraag: "Waar begon jullie huis te bewegen of te vervormen?" },
            { id: "10.9.veranderen", vraag: "Wat zouden jullie veranderen?" }
          ]
        }
      },
      {
        id: "10.10",
        prent: "bouwen",
        cyclus: { soort: "ontwerp", stap: 5 },
        tekst: [
          "STEM betekent ook: verbeteren!",
          "Verbeter jullie huis met wat jullie geleerd hebben."
        ],
        opdracht: [
          { soort: "afvinken", id: "10.10.ideeen", titel: "Wat passen we aan?", items: ["verbindingen steviger maken", "extra verstevigingen toevoegen", "de basis aanpassen", "de vorm veranderen", "materiaal anders gebruiken"] },
          { soort: "open", titel: "Onze verbetering", vragen: [
            { id: "10.10.aanpassing", vraag: "Onze belangrijkste aanpassing:" },
            { id: "10.10.waarom", vraag: "Waarom hebben we dit aangepast?" },
            { id: "10.10.voorspelling", vraag: "Onze voorspelling: wij denken dat ons verbeterde huis..." }
          ] }
        ]
      },
      {
        id: "10.11",
        prent: "trilplaat",
        geluid: "rommel",
        cyclus: { soort: "ontwerp", stap: 5 },
        tekst: [
          "De finale aardbeving! Het verbeterde huis wordt opnieuw getest."
        ],
        opdracht: [
          {
            soort: "tabel",
            id: "10.11.finale",
            titel: "De finale aardbeving",
            rijKop: "Test",
            kolommen: [
              { kop: "Bleef het huis staan?", type: "keuze", opties: ["ja", "nee"] },
              { kop: "Schade?", type: "keuze", opties: ["geen", "weinig", "veel", "ingestort"] }
            ],
            rijen: ["Lichte aardbeving", "Middelgrote aardbeving", "Zware aardbeving"]
          },
          { soort: "janee", id: "10.11.beter", titel: "Vergelijk met jullie eerste ontwerp", vraag: "Is jullie huis verbeterd?", uitlegVraag: "Waardoor?" }
        ]
      },
      {
        id: "10.12",
        prent: "stevig-bouwen",
        cyclus: { soort: "ontwerp", stap: 6 },
        tekst: [
          "Jullie onderzoek is klaar. Schrijf samen een besluit.",
          "En geef antwoord op de grote onderzoeksvraag."
        ],
        opdracht: {
          soort: "open",
          titel: "Ingenieursbesluit",
          vragen: [
            { id: "10.12.ontdekten", vraag: "Wij ontdekten dat een aardbevingsbestendig huis..." },
            { id: "10.12.belangrijkst", vraag: "Onze belangrijkste ontdekking was..." },
            { id: "10.12.grote", vraag: "De grote onderzoeksvraag: Welke eigenschappen van een gebouw zorgen ervoor dat het beter bestand is tegen een aardbeving?", regels: 4 }
          ]
        }
      },
      {
        id: "10.13",
        prent: null,
        cyclus: { soort: "ontwerp", stap: 6 },
        tekst: [
          "Zo kijkt de juf of meester naar jullie STEM-challenge.",
          "Je kan in totaal 25 punten krijgen."
        ],
        opdracht: { soort: "rubric", rubric: "stem" }
      },
      {
        id: "10.14",
        prent: "stevig-bouwen",
        tekst: [
          "“Laatste evaluatie,” zegt Kiezel. “Wat weet jij nu over stevig bouwen?”"
        ],
        opdracht: {
          soort: "evaluatie",
          id: "eval5",
          titel: "Evaluatie 5 – Stevig bouwen",
          vragen: [
            { type: "meerkeuze", vraag: "Welke vorm is het stevigst?", opties: ["vierkant", "driehoek", "rechthoek"], juist: 1 },
            { type: "waar", stelling: "Diagonale verbindingen maken een constructie steviger.", juist: true },
            { type: "waar", stelling: "Een smalle basis maakt een huis stabieler dan een brede basis.", juist: false,
              uitleg: "Een brede basis valt minder snel om." },
            { type: "meerkeuze", vraag: "Waarom staan sommige gebouwen in Japan op rubberen blokken?", opties: ["Omdat het mooi is.", "Om de trillingen op te vangen.", "Om ze hoger te maken."], juist: 1 },
            { type: "meerkeuze", vraag: "Wat is de juiste volgorde van de ontwerpcyclus?", opties: ["bouwen, testen, ontwerpen, onderzoeken", "onderzoeken, ontwerpen, bouwen, testen, verbeteren", "testen, verbeteren, onderzoeken"], juist: 1 }
          ]
        }
      }
    ]
  },

  /* ================================================================ */
  {
    nummer: 11,
    titel: "Terug op de zolder",
    scenes: [
      {
        id: "11.1",
        prent: "terugvlucht",
        tekst: [
          "“Tijd om naar huis te gaan,” zegt opa.",
          "De Boorbol vliegt over de Ring van Vuur, over IJsland en over de Eifel.",
          "Noor weet nu dat er onder haar voeten heel traag iets beweegt.",
          "Platen die schuiven. Magma dat borrelt. Een aarde die leeft."
        ]
      },
      {
        id: "11.2",
        prent: "klas",
        geluid: "plons",
        tekst: [
          "De volgende dag neemt Noor Kiezel mee naar school.",
          "Ze legt hem in een bak water. De klas roept: “Hij drijft!”",
          "Dan stelt haar groepje het informatiepakket voor.",
          "Haar juf zegt: “Jullie zijn echte aardwetenschappers.”"
        ]
      },
      {
        id: "11.3",
        prent: "doelen",
        tekst: [
          "Weet je nog, het lijstje van opa? Kijk het nog eens na.",
          "Wat kan jij nu allemaal?"
        ],
        opdracht: {
          soort: "afvinken",
          id: "1.6.doelen",
          titel: "Wat kan ik nu?",
          vraag: "Na deze missie kan ik:",
          items: [
            "de lagen van de aarde benoemen en uitleggen",
            "op een kaart vulkanen en aardbevingen aanduiden",
            "een patroon ontdekken: waar liggen ze vooral?",
            "uitleggen dat ze vaak langs grenzen van aardplaten liggen",
            "een model gebruiken en zeggen wat het wel en niet toont",
            "met waarnemingen een besluit maken",
            "gevolgen voor mensen, landschap, planten en dieren noemen",
            "zeggen hoe je veilig handelt"
          ]
        }
      },
      {
        id: "11.4",
        prent: "lachende-aarde",
        slot: true,
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

/* =====================================================================
   RUBRICS – zo beoordeelt de leerkracht de twee grote opdrachten.
   De leerkracht vult de punten in op het leerkrachtenscherm.
   ===================================================================== */
window.RUBRICS = {
  eindopdracht: {
    titel: "Eindopdracht – Aarde in beweging",
    criteria: [
      { id: "aarde", naam: "Aarde en lagen", max: 4, niveaus: ["ontbreekt", "veel fouten", "gedeeltelijk juist", "bijna volledig juist", "volledig en duidelijk"] },
      { id: "uitleg", naam: "Uitleg aardplaten en proces", max: 4, niveaus: ["ontbreekt", "weinig begrip", "basisbegrip", "duidelijke uitleg", "zeer duidelijke uitleg met goed model"] },
      { id: "kaart", naam: "Kaart en situering", max: 4, niveaus: ["ontbreekt", "onduidelijk", "enkele juiste elementen", "duidelijke kaart", "zeer duidelijke kaart met correcte legende en patronen"] },
      { id: "gevolgen", naam: "Gevolgen en veiligheid", max: 4, niveaus: ["ontbreekt", "weinig informatie", "basisinformatie", "goede en bruikbare informatie", "zeer volledig en correct noodplan"] },
      { id: "presentatie", naam: "Presentatie en samenwerking", max: 4, niveaus: ["nauwelijks", "beperkte bijdrage", "voldoende", "goed", "duidelijk, verzorgd en sterk samengewerkt"] }
    ]
  },
  stem: {
    titel: "STEM-challenge – Aardbevingsbestendig huis",
    criteria: [
      { id: "onderzoek", naam: "Onderzoek en voorbereiding", max: 4, wat: "Je onderzoekt eerst en probeert niet zomaar iets." },
      { id: "ontwerp", naam: "Ontwerp en technische tekening", max: 4, wat: "Je maakt een doordacht ontwerp." },
      { id: "bouw", naam: "Bouw en constructie", max: 5, wat: "Je gebruikt de materialen op een slimme manier." },
      { id: "testen", naam: "Testen en gegevens verzamelen", max: 4, wat: "Je voert de aardbevingstest eerlijk uit en observeert goed." },
      { id: "verbeteren", naam: "Verbeteren op basis van testresultaten", max: 4, wat: "Je gebruikt wat je uit de eerste test geleerd hebt." },
      { id: "verklaren", naam: "Wetenschappelijke uitleg en besluit", max: 4, wat: "Je kan uitleggen waarom bepaalde constructies sterker of zwakker zijn." }
    ]
  }
};
