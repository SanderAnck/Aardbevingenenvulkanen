/* =====================================================================
   FEEDBACK – reacties op de open vragen
   ---------------------------------------------------------------------
   Terwijl een kind typt, kijkt de app naar zijn antwoord en geeft een
   korte reactie. Dat gebeurt helemaal op de computer zelf (geen internet):
   de app zoekt naar sleutelwoorden. Het is dus een hulpje, geen echte
   verbetering. De leerkracht leest de antwoorden in het leerkrachtscherm.

   Per vraag (het id uit verhaal.js):
     groepen: lijst van { woorden: [...], tip: "..." }
              Een groep is "gevonden" als één van de woorden in het
              antwoord staat. Een stukje van een woord is genoeg:
              "bots" vindt ook "botsen" en "botsing".
              Hoofdletters en accenten maken niet uit.
     een:     true = één gevonden groep is al genoeg voor "sterk".
     goed:    wat de app zegt als alles gevonden is (mag weg).

   Staat een vraag hier niet, dan geeft de app een algemene reactie
   (bv. "Schrijf een volledige zin" of "Leg uit met omdat").
   ===================================================================== */

window.FEEDBACK = {
  "1.8.denk": { groepen: [
    { woorden: ["groot", "diep", "ver", "niet kijken", "kan niet", "niet zien", "klein"], tip: "Denk eraan: de aarde is te groot en te diep om zomaar in te kijken." },
    { woorden: ["eenvoud", "makkelijk", "gemakkelijk", "begrijp", "snap", "toon", "uitleg", "zien", "bestuder", "onderzoek"], tip: "Wat helpt een model je beter doen? Bijvoorbeeld iets begrijpen of tonen." }
  ] },
  "2.7.materiaal": { groepen: [
    { woorden: ["korst"], tip: "Welke kleur of welk materiaal koos je voor de aardkorst?" },
    { woorden: ["mantel"], tip: "Vergeet de mantel niet." },
    { woorden: ["buitenkern", "buiten kern"], tip: "En de buitenkern?" },
    { woorden: ["binnenkern", "binnen kern"], tip: "En de binnenkern, in het midden?" }
  ], goed: "Je noemt alle vier de lagen!" },
  "2.7.niet": { een: true, groepen: [
    { woorden: ["groot", "grootte", "klein", "maat", "dik"], tip: "Denk aan de grootte: is de echte aarde even klein als jouw model?" },
    { woorden: ["heet", "warm", "hitte", "temperatuur", "vloeibaar", "smelt", "druk", "beweeg", "beweg", "zwaar"], tip: "Denk ook aan hoe heet het is, of dat de mantel beweegt." }
  ] },

  "3.6.zie": { groepen: [
    { woorden: ["uit elkaar", "ruimte", "gat", "opening", "weg van", "spleet", "verder", "los", "uiteen"], tip: "Kijk naar het midden: wat ontstaat er tussen de twee stukken?" }
  ] },
  "3.6.stelt": { groepen: [
    { woorden: ["plaat", "platen"], tip: "Waar staan de stukken karton voor in het echt? Het zijn twee ..." }
  ] },
  "3.7.gebeurt": { groepen: [
    { woorden: ["onder", "schuif", "duik", "omhoog", "plooi", "buig", "bots", "duw", "over", "kreuk", "boven"], tip: "Kijk naar de randen. Gaat er één stuk onder het andere? Plooit er iets omhoog?" }
  ] },
  "3.7.verschijnsel": { groepen: [
    { woorden: ["vulkaan", "vulkanen", "aardbeving", "berg", "gebergte"], tip: "Wat ontstaat er waar platen botsen? Bergen, vulkanen of ..." }
  ] },
  "3.8.gebeurt": { groepen: [
    { woorden: ["vast", "steek", "stak", "haak", "schur", "wrijv", "klem"], tip: "Bleven de stukken eerst even steken?" },
    { woorden: ["los", "schiet", "schoot", "plots", "schok", "ruk", "spring", "sprong", "snel"], tip: "En wat gebeurde er na de korte, krachtige duw?" }
  ] },
  "3.8.verschijnsel": { groepen: [
    { woorden: ["aardbeving", "beving", "trilling", "tril", "beven"], tip: "Welk verschijnsel geeft een plotse schok in de grond?" }
  ] },
  "3.9.besluit": { groepen: [
    { woorden: ["aardbeving", "beving"], tip: "Wat ontstaat er aan de grenzen? Noem de aardbevingen." },
    { woorden: ["vulkaan", "vulkanen"], tip: "Noem ook de vulkanen." }
  ] },
  "3.9.verschil": { groepen: [
    { woorden: ["groot", "klein", "traag", "langzaam", "snel", "laag", "lagen", "heet", "hitte", "druk", "ingewikkeld", "dik", "zwaar", "steen", "gesteente", "karton"], tip: "Denk aan de grootte, de snelheid of de hitte van echte aardplaten." }
  ] },

  "6.4.grenzen": { groepen: [
    { woorden: ["grens", "grenzen", "rand"], tip: "Waar liggen de vulkanen en aardbevingen? Kijk naar de plaatgrenzen." },
    { woorden: ["dicht", "bij", "op de", "langs", "samen", "zelfde", "rond"], tip: "Liggen ze dicht bij de grenzen of ver ervan?" }
  ], goed: "Precies: ze liggen vooral langs de grenzen van de aardplaten." },

  "7.7.mensen": { groepen: [
    { woorden: ["huis", "huizen", "gewond", "dood", "sterv", "vlucht", "weg moeten", "stroom", "water", "schade", "gebouw", "gevaar", "adem", "long", "school", "werk", "ziek", "eten"], tip: "Denk aan huizen, gezondheid, stroom of water." }
  ] },
  "7.7.landschap": { groepen: [
    { woorden: ["grond", "scheur", "helling", "berg", "weg", "lava", "as", "eiland", "rots", "kust", "landschap", "verzak", "golf", "krater", "modder", "land"], tip: "Wat verandert er aan de grond, de bergen of de kust?" }
  ] },
  "7.7.natuur": { groepen: [
    { woorden: ["dier", "plant", "boom", "bomen", "leefgebied", "bos", "vis", "vogel", "rivier", "natuur", "gras"], tip: "Wat gebeurt er met dieren, planten of bomen?" }
  ] },
  "7.7.voordeel": { groepen: [
    { woorden: ["vruchtbaar", "grond", "warm", "energie", "bad", "toerist", "nieuw land", "eiland", "steen", "mineraal", "minerale", "stroom", "planten groeien"], tip: "Weet je nog? Vulkaangrond is heel vruchtbaar. En er is warmte uit de aarde." }
  ] },

  "8.5.as": { een: true, groepen: [
    { woorden: ["adem", "long", "neus", "mond", "hoest", "ziek", "keel"], tip: "Wat gebeurt er als je as inademt?" },
    { woorden: ["zicht", "zien", "dak", "zwaar", "vliegtuig", "motor", "auto", "oog", "ogen", "scherp", "glas"], tip: "Noem ook een ander gevaar, bv. voor je ogen, daken of vliegtuigen." }
  ] },
  "8.5.instructies": { groepen: [
    { woorden: ["veilig", "gevaar", "weten", "info", "plek", "route", "leven", "bescherm", "helpen", "juist", "beter", "ervaring", "kennen"], tip: "Wat weten de hulpdiensten dat jij misschien niet weet?" }
  ] },

  "9.2.vraag": { groepen: [
    { woorden: ["waarom", "hoe", "wat", "waar", "wanneer"], tip: "Begin je onderzoeksvraag met waarom, hoe, wat of waar." }
  ] },
  "9.3.voorspelling": { groepen: [
    { woorden: ["plaat", "platen", "grens"], tip: "Denk aan de aardplaten. Brombaai ligt dicht bij een plaatgrens." }
  ] },
  "9.5.korst": { groepen: [
    { woorden: ["dun", "buiten", "hard", "vast", "wonen", "woon", "land", "oceaan", "bovenste", "buitenste"], tip: "Is de aardkorst dik of dun? Wie woont erop?" }
  ] },
  "9.5.mantel": { groepen: [
    { woorden: ["heet", "warm", "dik", "gesteente", "beweeg", "beweg", "traag", "magma", "stroom", "zacht"], tip: "Is de mantel heet? Beweegt het gesteente?" }
  ] },
  "9.5.buitenkern": { groepen: [
    { woorden: ["vloeibaar", "metaal", "ijzer", "nikkel"], tip: "Is de buitenkern vast of vloeibaar? Waaruit bestaat ze?" }
  ] },
  "9.5.binnenkern": { groepen: [
    { woorden: ["vast", "druk"], tip: "De binnenkern is heel heet. Is ze vast of vloeibaar? En waarom?" }
  ] },
  "9.6.uitleg": { groepen: [
    { woorden: ["plaat", "platen"], tip: "Gebruik het woord aardplaten." },
    { woorden: ["beweg", "beweeg", "bots", "schuif", "schuiv", "uit elkaar", "naar elkaar", "langs", "duw", "duik"], tip: "Hoe bewegen de platen?" },
    { woorden: ["grens"], tip: "Gebruik ook het woord plaatgrens." },
    { woorden: ["aardbeving", "vulkaan", "uitbarst", "magma", "lava"], tip: "Zeg ook wat er dan ontstaat: een aardbeving of een vulkaan." }
  ], goed: "Je gebruikt alle belangrijke woorden!" },
  "9.7.patroon": { groepen: [
    { woorden: ["grens", "rand", "plaat", "platen"], tip: "Liggen de vulkanen en aardbevingen bij de plaatgrenzen?" },
    { woorden: ["ring", "rij", "lijn", "samen", "band", "dicht", "langs", "rond"], tip: "Liggen ze verspreid, of op een rij langs de grenzen?" }
  ] },
  "9.8.b.doen": { groepen: [
    { woorden: ["buk", "dek", "tafel", "vasthoud", "houd", "hou je vast", "vast"], tip: "Weet je nog de regel? Bukken, dekken en ..." }
  ] },
  "9.8.b.niet": { groepen: [
    { woorden: ["lift", "ren", "naar buiten", "raam", "ramen", "trap", "paniek", "duw"], tip: "Denk aan de lift, ramen en naar buiten rennen." }
  ] },
  "9.8.b.bescherm": { groepen: [
    { woorden: ["hoofd", "nek", "tafel", "arm", "dek", "hand"], tip: "Wat bescherm je het best? Je hoofd en je nek." }
  ] },
  "9.8.v.doen": { groepen: [
    { woorden: ["hulpdienst", "luister", "instructie", "binnen", "vertrek", "raam", "ramen", "deur", "masker", "radio", "weg"], tip: "Wat zeggen de hulpdiensten? Blijf je binnen als er as is?" }
  ] },
  "9.8.v.niet": { groepen: [
    { woorden: ["kijk", "dicht", "lava", "buiten", "alleen", "terug", "foto", "naar de vulkaan", "dichterbij"], tip: "Ga je kijken bij de vulkaan? Wat doe je beter niet?" }
  ] },
  "9.8.v.verlaten": { groepen: [
    { woorden: ["gevraagd", "vraag", "hulpdienst", "zegt", "zeggen", "evacu", "bevel", "moet", "politie", "brandweer"], tip: "Wie zegt wanneer je moet vertrekken?" }
  ] },
  "9.8.v.waarom": { groepen: [
    { woorden: ["veilig", "gevaar", "weten", "info", "plek", "route", "leven", "bescherm", "helpen", "juist", "beter"], tip: "Wat weten de hulpdiensten dat jij misschien niet weet?" }
  ] },
  "9.10.besluit": { groepen: [
    { woorden: ["plaat", "platen", "grens"], tip: "Leg uit waar het gebeurde: bij een plaatgrens?" },
    { woorden: ["doen", "veilig", "buk", "binnen", "hulpdienst", "noodplan", "bescherm"], tip: "Zeg ook wat de inwoners moeten doen." }
  ] },
  "9.13.handig": { groepen: [
    { woorden: ["groot", "klein", "diep", "begrijp", "snap", "toon", "eenvoud", "makkelijk", "gemakkelijk", "zien", "uitleg"], tip: "Wat kan je met een model beter doen? Iets zien, tonen of begrijpen?" }
  ] },
  "9.13.niet": { groepen: [
    { woorden: ["groot", "klein", "echt", "heet", "traag", "snel", "eenvoud", "ingewikkeld", "niet alles", "anders", "karton", "klei"], tip: "Wat ontbreekt er in een model? Denk aan grootte, hitte of snelheid." }
  ] },
  "9.14.d1": { groepen: [
    { woorden: ["model", "kaart", "seismograaf", "meet", "meten", "gegeven", "waarneming", "golf", "golven", "trilling", "satelliet", "drone", "onderzoek"], tip: "Hoe meten wetenschappers? Denk aan seismografen, modellen en kaarten." }
  ] },
  "9.14.d2": { groepen: [
    { woorden: ["meer", "vaker", "sterk", "aardbeving", "vulkaan", "uitbarst", "snel"], tip: "Wat zou er meer of vaker gebeuren?" }
  ] },
  "9.14.d3": { groepen: [
    { woorden: ["veilig", "bouw", "voorberei", "weten", "waarschuw", "noodplan", "gevaar", "wonen", "bescherm", "oefen"], tip: "Hoe helpt dat de mensen die daar wonen?" }
  ] },
  "9.14.d4": { groepen: [
    { woorden: ["eenvoud", "makkelijk", "gemakkelijk", "klein", "zien", "overzicht", "belangrijk", "groot", "minder"], tip: "Een model toont alleen wat belangrijk is. Waarom helpt dat?" }
  ] },

  "10.3.stevigst": { groepen: [
    { woorden: ["driehoek"], tip: "Probeer nog eens: welke vorm vervormde niet toen je tegen een hoek duwde?" }
  ], goed: "Juist, de driehoek!" },
  "10.3.waarom": { groepen: [
    { woorden: ["hoek", "zijde", "kant", "vast", "vervorm", "schuif", "scheef", "kantel", "drie", "stevig", "verdeel", "beweg"], tip: "Kan je een driehoek scheef duwen zonder dat een stokje langer wordt?" }
  ] },
  "10.3.gebruik": { groepen: [
    { woorden: ["driehoek", "schoor", "kruis", "diagona", "schuin"], tip: "Hoe kan je driehoeken in jullie huis verwerken? Bv. met schuine stokjes." }
  ] },
  "10.5.omdat": { groepen: [
    { woorden: ["driehoek", "stevig", "breed", "laag", "vast", "schoor", "kruis", "fundament", "licht", "sterk", "schuin"], tip: "Waarom is jullie constructie stevig? Denk aan driehoeken of een brede basis." }
  ] },
  "10.6.voorspelling": { groepen: [
    { woorden: ["driehoek", "stevig", "breed", "laag", "vast", "schoor", "kruis", "fundament", "licht", "sterk", "schuin"], tip: "Wat maakt jullie huis sterk? Driehoeken, een brede basis, stevige verbindingen?" }
  ] },
  "10.9.veranderen": { groepen: [
    { woorden: ["driehoek", "schoor", "breed", "laag", "vast", "plak", "sterk", "verstevig", "extra", "kruis", "schuin"], tip: "Wat zou het huis steviger maken? Bv. extra driehoeken of een bredere basis." }
  ] },
  "10.12.ontdekten": { groepen: [
    { woorden: ["driehoek", "schoor", "breed", "basis", "laag", "vast", "stevig", "verbind", "licht", "kruis", "schuin"], tip: "Welke eigenschappen maakten jullie huis sterk?" }
  ] },
  "10.12.grote": { groepen: [
    { woorden: ["driehoek", "schoor", "kruis", "schuin", "diagona"], tip: "Noem de driehoeken of schuine stokjes." },
    { woorden: ["breed", "basis", "laag", "onderaan", "fundament", "zwaartepunt"], tip: "En de basis: is een smalle of een brede basis beter?" },
    { woorden: ["verbind", "vast", "stevig", "plak", "knoop", "licht", "buig", "soepel"], tip: "Hoe zijn de stukken met elkaar verbonden?" }
  ], goed: "Een volledig antwoord, zoals een echte ingenieur!" }
};
