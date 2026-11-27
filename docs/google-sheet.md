# Scores automatisch naar een Google Sheet

De app bewaart elke score als een rij met altijd dezelfde kolommen:

| tijdstip | klas | leerling | groep | soort | onderdeel_id | onderdeel | score | max | poging |
|---|---|---|---|---|---|---|---|---|---|

- `soort` is `evaluatie` (een evaluatiemoment van een kind) of `rubric` (punten van de leerkracht voor de eindopdracht of de STEM-challenge).
- `onderdeel_id` is bv. `eval1` tot `eval5`, `eindopdracht` of `stem`.
- `poging` is 1 bij de eerste poging. Die telt. Hogere getallen zijn extra oefenpogingen.

Zonder koppeling kan je altijd in het leerkrachtscherm op **Download scores (CSV)** klikken.
Met de koppeling hieronder gaan nieuwe scores vanzelf naar je sheet, zodra de computer internet heeft.
Lukt het versturen niet, dan probeert de app het later opnieuw.

## Zo koppel je de sheet (ongeveer 10 minuten)

1. Maak een nieuwe Google Sheet, bv. "De aarde bromt – scores".
2. Kies in het menu **Extensies > Apps Script**.
3. Wis wat er staat en plak deze code:

```javascript
// Ontvangt scores van de app "De aarde bromt" en zet ze als rijen in de sheet.
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var gegevens = JSON.parse(e.postData.contents);
    var kolommen = gegevens.kolommen;
    var blad = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scores")
      || SpreadsheetApp.getActiveSpreadsheet().insertSheet("Scores");
    if (blad.getLastRow() === 0) blad.appendRow(kolommen);
    var rijen = gegevens.rijen.map(function (r) {
      return kolommen.map(function (k) { return r[k] === undefined ? "" : r[k]; });
    });
    if (rijen.length) {
      blad.getRange(blad.getLastRow() + 1, 1, rijen.length, kolommen.length).setValues(rijen);
    }
    return ContentService.createTextOutput("ok");
  } finally {
    lock.releaseLock();
  }
}
```

4. Klik op **Implementeren > Nieuwe implementatie**. Kies als type **Web-app**.
   - *Uitvoeren als*: **Ik**
   - *Wie heeft toegang*: **Iedereen**
5. Klik **Implementeren**, geef toestemming en kopieer de **URL van de web-app** (die eindigt op `/exec`).
6. Open `js/instellingen.js` met Kladblok en plak de URL tussen de aanhalingstekens:

```javascript
googleSheetUrl: "https://script.google.com/macros/s/..../exec",
```

7. Sla op en ververs de app (F5). In het leerkrachtscherm, tab **Export en Google Sheet**,
   klik je op **Stuur alle rijen opnieuw** om ook de scores van vóór de koppeling te versturen.

## Goed om te weten

- De app stuurt alleen de scorerijen door. Open antwoorden en tekeningen blijven op de computer.
  Die bekijk je in het leerkrachtscherm, tab **Antwoorden**, of je bewaart ze met **Download alles (back-up)**.
- Iedereen die de URL kent, kan rijen toevoegen aan je sheet. Deel de URL dus niet buiten de school.
- Werken de kinderen op verschillende computers? Dan komen alle scores samen in dezelfde sheet.
  Een rubric geef je wel op de computer waar het groepje gewerkt heeft (daar staan de groepsleden).
- Na een aanpassing aan de Apps Script-code kies je **Implementeren > Implementaties beheren > Bewerken > Nieuwe versie**.
