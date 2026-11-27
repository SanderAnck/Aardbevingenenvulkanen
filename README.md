# De aarde bromt

Een interactieve verhaalapp over **vulkanen en aardbevingen** voor kinderen van het
4de leerjaar (9-10 jaar).

Noor, haar opa Staf en Kiezel, een pratend stukje puimsteen, reizen in de Boorbol
naar binnen in de aarde, langs de Ring van Vuur, naar Italië, Hawaï, IJsland en de
Eifel. Het verhaal telt 10 hoofdstukken. Het kind leest of luistert, klikt op dingen
in de prenten om meer te ontdekken en kiest één keer waar het eerst naartoe gaat.

Er zijn geen profielen, opdrachten, toetsen of punten. Het is een verhaal om te beleven.

## Wat zit erin?

- **10 hoofdstukken** met elk een eigen prent per scène (zelf getekend in SVG).
- **Ontdekplekken**: zacht oplichtende rondjes met een vraagteken in de prent.
  Klik erop voor een "Wist je dat?"-weetje. Je moet niet klikken om verder te kunnen.
- **Moeilijke woorden** zijn onderlijnd met een stippellijn. Klik erop voor een korte uitleg.
- **Keuzemoment** in hoofdstuk 4: eerst naar Italië of eerst naar Hawaï?
  Je leest altijd beide, de keuze bepaalt enkel de volgorde.
- **Voorlezen** (luidspreker-knop): leest de scène voor met een Vlaamse of Nederlandse
  stem van de computer. Het woord dat voorgelezen wordt, licht op.
- **Geluid** (noten-knop): kleine geluidjes zoals plons, borrelen en rommelen.
  Het geluid staat standaard uit.
- **Minder beweging** (golf-knop): zet alle animaties uit. Staat automatisch aan als
  de computer zo ingesteld is.
- **Verder lezen**: de app onthoudt alleen het laatst gelezen hoofdstuk.
- Grote knoppen (minstens 48 px), dus ook goed op een touchscreen of digibord.
  Bladeren kan ook met de pijltjestoetsen.

## Hoe open je de app?

**Op de computer (zonder internet):**

1. Download de map (groene knop *Code* > *Download ZIP*) en pak ze uit.
2. Dubbelklik op `index.html`. De app opent in de browser.

Alles werkt zonder internet: er is geen server, geen login, geen tracking en geen
cookie. Getest in Chrome; gemaakt voor Chrome, Edge en Firefox op Windows.

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
index.html          startscherm, hoofdstukkenoverzicht en verhaalscherm
css/style.css       alle opmaak, kleuren en animaties
js/verhaal.js       ALLE verhaaltekst: hoofdstukken, scènes, weetjes en de keuze
js/woorden.js       de woordenlijst met uitleg
js/app.js           de code: navigatie, keuze, voorlezen, geluid, bewaren
assets/figuren.js   Noor, opa Staf, Kiezel, de Boorbol en het startscherm
assets/hoofdstukN.js de prenten van hoofdstuk N (1 tot 10)
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

## Over de weetjes

De weetjes komen uit de opdracht voor deze app. Eén weetje werd verbeterd: de snelste
aardbevingsgolven doen er ongeveer 20 minuten over om de andere kant van de aarde te
bereiken (bron: USGS), en niet "een paar minuten". Scène 4.2 en 7.2 zijn in twee
stukken gezet, zodat de tekst op het scherm past. De inhoud bleef hetzelfde.
