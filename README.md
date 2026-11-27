# De aarde bromt

Een interactieve verhaalapp over **vulkanen en aardbevingen** voor kinderen van het
4de leerjaar (9-10 jaar). De app vervangt de werkbundel "Vulkanen en aardbevingen":
alle opdrachten uit de werkbundel zitten erin.

Noor, haar opa Staf en Kiezel, een pratend stukje puimsteen, onderzoeken hoe de aarde
is opgebouwd en waarom vulkanen en aardbevingen vooral op bepaalde plaatsen voorkomen.
Het verhaal telt 11 hoofdstukken.

## Wat zit erin?

- **11 hoofdstukken**: de missie, de lagen van de aarde, aardplaten, aardbevingen,
  vulkanen, de wereldkaart, gevolgen, veilig handelen, de eindopdracht, de STEM-challenge
  en de terugblik.
- **Alle opdrachten uit de werkbundel**: open vragen, onderzoeken met klei en karton,
  tekenen in een tekenvak, tabellen invullen, de wereldkaart met lagen die je aan en uit zet,
  het lijstje met doelen om af te vinken.
- **Mini-opdrachten** tussendoor (sorteren, koppelen, meerkeuze). Die tellen niet mee
  en je mag ze opnieuw proberen.
- **5 evaluatiemomenten** om te zien of de kinderen nog mee zijn. De eerste poging telt.
  Daarna mogen ze nog oefenen.
- **Eindopdracht** (hoofdstuk 9): een informatiepakket en een presentatie over het eiland
  Brombaai, stap voor stap volgens de **onderzoekscyclus** (verwonderen, onderzoeksvraag,
  voorspellen, onderzoeken, besluiten, voorstellen, terugblikken).
- **STEM-challenge** (hoofdstuk 10): een aardbevingsbestendig huis bouwen volgens de
  **ontwerpcyclus** (probleem, onderzoeken, ontwerpen, bouwen, testen, verbeteren, besluiten).
  Een balk bovenaan toont telkens in welke stap van de cyclus je zit.
- **Rubrics** voor de eindopdracht en de STEM-challenge. De kinderen zien waarop gelet wordt,
  de leerkracht vult de punten in per groepje.
- **Ontdekplekken** in de prenten, **moeilijke woorden** met uitleg, **voorlezen**
  met een Vlaamse of Nederlandse stem, **geluid** (standaard uit) en **minder beweging**.
- Grote knoppen (minstens 48 px), dus ook goed op een touchscreen of digibord.

## Aanmelden en bewaren

- Elk kind klikt bij de start op zijn naam. De namen staan in `js/klaslijst.js`.
  Is die lijst leeg, dan typen de kinderen hun naam en klas.
- Antwoorden, tekeningen en scores worden **op de computer zelf** bewaard (in de browser).
  Er gaat niets naar internet, tenzij je zelf een Google Sheet koppelt.
- Werkt een ander kind op dezelfde computer? Klik op **Ik ben niet ...**.

## Voor de leerkracht

Klik op het startscherm op **Leerkracht** en geef de code in (standaard `1234`,
aan te passen in `js/instellingen.js`). Je vindt er:

- **Scores**: de score van elke evaluatie per kind, plus de rubrics.
- **Rubrics**: punten geven per groepje voor de eindopdracht en de STEM-challenge.
- **Antwoorden**: alles wat een kind schreef en tekende.
- **Export en Google Sheet**: download de scores als CSV (voor Excel of Google Sheets),
  maak een back-up, koppel een Google Sheet of wis alles.

De scores gaan in vaste kolommen (`tijdstip, klas, leerling, groep, soort, onderdeel_id,
onderdeel, score, max, poging`), zodat je ze later automatisch naar een Google Sheet kan
sturen. Hoe dat moet, staat in [docs/google-sheet.md](docs/google-sheet.md).

## Hoe open je de app?

**Op de computer (zonder internet):**

1. Download de map (groene knop *Code* > *Download ZIP*) en pak ze uit.
2. Dubbelklik op `index.html`. De app opent in de browser.

Alles werkt zonder internet: er is geen server, geen tracking en geen cookie. Getest in Chrome; gemaakt voor Chrome, Edge en Firefox op Windows.

**Via GitHub Pages (online):**

1. Ga in deze repository naar *Settings* > *Pages*.
2. Kies bij *Source* "Deploy from a branch", branch `main`, map `/ (root)`, en klik *Save*.
3. Na een minuutje staat de app op
   `https://sanderanck.github.io/Aardbevingenenvulkanen/`.

**Voorlezen offline:** Windows heeft zelf Nederlandse stemmen. Staat er nog geen
Nederlandse stem op de computer? Ga naar *Instellingen* > *Tijd en taal* > *Spraak* >
*Stemmen toevoegen* en kies *Nederlands (België)* of *Nederlands (Nederland)*.
De voorleesknop is verborgen in browsers die niet kunnen voorlezen.

## Mappenstructuur

```
index.html            aanmelden, startscherm, hoofdstukken, verhaal en leerkracht
css/style.css         alle opmaak, kleuren en animaties
js/instellingen.js    leerkrachtcode en de link naar de Google Sheet
js/klaslijst.js       de namen van de kinderen
js/verhaal.js         ALLE verhaaltekst, opdrachten, evaluaties, cycli en rubrics
js/woorden.js         de woordenlijst met uitleg
js/opdrachten.js      hoe elke soort opdracht en evaluatie werkt
js/resultaten.js      antwoorden en scores bewaren, CSV en Google Sheet
js/leerkracht.js      het leerkrachtscherm
js/app.js             navigatie, keuze, voorlezen, geluid, aanmelden
assets/figuren.js     Noor, opa Staf, Kiezel, de Boorbol en het startscherm
assets/hoofdstukN.js  prenten bij het verhaal
assets/werkbundel.js  prenten bij de opdrachten (modellen, onderzoeken, wereldkaart, Brombaai, STEM)
docs/google-sheet.md  scores koppelen aan een Google Sheet
```

De prenten staan als SVG in gewone `.js`-bestanden. Zo werkt alles ook als je
`index.html` rechtstreeks opent, zonder server.

## Een hoofdstuk aanpassen

Alle tekst staat in `js/verhaal.js`. Open dat bestand met Kladblok of een andere
teksteditor. Je hoeft de code niet te begrijpen.

- Elke scène heeft een lijst `tekst` met zinnen. Elke regel staat tussen
  aanhalingstekens `"..."` en tussen twee regels staat een komma.
  Een aanhalingsteken in de tekst zelf schrijf je als `\"`.
- Een moeilijk woord maak je klikbaar met dubbele vierkante haken:
  `[[magma]]`. Moet een ander woord uit de woordenlijst getoond worden, schrijf dan
  `[[actieve vulkaan|actief]]`. De uitleg staat in `js/woorden.js`.
- Een weetje pas je aan bij `ontdek`. `naam` is wat het is, `tekst` is het weetje.
  `x` en `y` bepalen waar het rondje in de prent staat (de prent is 800 breed en
  450 hoog; `x: 400, y: 225` is het midden).
- Bij `geluid` kies je een geluidje: `regen`, `plons`, `boorbol`, `psssj`, `boem`,
  `borrel`, `rommel`, `krak`, `golf`, `grom` of `stoom`.

Sla het bestand op en ververs de browser (F5). Zie je een wit scherm, dan ontbreekt
er meestal een komma of een aanhalingsteken.

Een opdracht toevoegen of aanpassen kan ook in `js/verhaal.js`, bij `opdracht`.
Bovenaan `js/opdrachten.js` staan alle soorten opdrachten met een voorbeeld.

## Over de weetjes

De inhoud komt uit de werkbundel en de opdracht voor deze app. Eén weetje werd verbeterd: de snelste
aardbevingsgolven doen er ongeveer 20 minuten over om de andere kant van de aarde te
bereiken (bron: USGS), en niet "een paar minuten".
