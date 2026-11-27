/* =====================================================================
   RESULTATEN – antwoorden en scores bewaren
   ---------------------------------------------------------------------
   Alles wordt bewaard in de browser van deze computer (localStorage).
   Elke score wordt ook als "rij" klaargezet, met altijd dezelfde
   kolommen. Die rijen kan je:
     - exporteren als CSV-bestand (openen in Excel of Google Sheets);
     - later automatisch naar een Google Sheet sturen
       (zie INSTELLINGEN.googleSheetUrl en docs/google-sheet.md).

   Kolommen van een rij (ook de kolommen in de Google Sheet):
     tijdstip | klas | leerling | groep | soort | onderdeel_id |
     onderdeel | score | max | poging
   ===================================================================== */

window.RESULTATEN = (function () {
  "use strict";

  var SLEUTEL = "deAardeBromt.v2";
  var KOLOMMEN = ["tijdstip", "klas", "leerling", "groep", "soort", "onderdeel_id", "onderdeel", "score", "max", "poging"];

  // In het geheugen, voor het geval localStorage niet werkt (privévenster).
  var data = laad();

  function leeg() {
    return { actief: null, leerlingen: {}, groepen: {}, rijen: [], teVersturen: [] };
  }

  function laad() {
    try {
      var tekst = window.localStorage.getItem(SLEUTEL);
      if (tekst) {
        var d = JSON.parse(tekst);
        var basis = leeg();
        for (var k in basis) if (!(k in d)) d[k] = basis[k];
        return d;
      }
    } catch (e) { /* niets bewaard of niet leesbaar */ }
    return leeg();
  }

  function bewaar() {
    try { window.localStorage.setItem(SLEUTEL, JSON.stringify(data)); }
    catch (e) { /* bewaren lukt niet: de app werkt verder, maar vergeet alles bij sluiten */ }
  }

  function nu() { return new Date().toISOString(); }

  /* ---------- Leerlingen ---------- */

  function meldAan(naam, klas) {
    naam = String(naam).trim();
    if (!naam) return null;
    if (!data.leerlingen[naam]) {
      data.leerlingen[naam] = { naam: naam, klas: klas || "", groep: "", antwoorden: {}, scores: {}, hoofdstuk: null };
    } else if (klas) {
      data.leerlingen[naam].klas = klas;
    }
    data.actief = naam;
    bewaar();
    return data.leerlingen[naam];
  }

  function meldAf() { data.actief = null; bewaar(); }

  function actief() { return data.actief ? data.leerlingen[data.actief] || null : null; }

  function zetGroep(groep) {
    var l = actief(); if (!l) return;
    l.groep = String(groep || "").trim();
    if (l.groep) {
      var g = data.groepen[l.groep] || (data.groepen[l.groep] = { naam: l.groep, leden: [], rubrics: {} });
      if (g.leden.indexOf(l.naam) < 0) g.leden.push(l.naam);
    }
    bewaar();
  }

  /* ---------- Antwoorden (open vragen, tekeningen, tabellen) ---------- */

  function antwoord(id) {
    var l = actief();
    return l && l.antwoorden[id] !== undefined ? l.antwoorden[id] : null;
  }

  function zetAntwoord(id, waarde) {
    var l = actief(); if (!l) return;
    l.antwoorden[id] = waarde;
    bewaar();
  }

  /* ---------- Hoofdstuk voor "verder lezen" ---------- */

  function zetHoofdstuk(n) { var l = actief(); if (l) { l.hoofdstuk = n; bewaar(); } }
  function hoofdstuk() { var l = actief(); return l ? l.hoofdstuk : null; }

  /* ---------- Scores ---------- */

  // Maak een rij in vaste kolommen en zet ze klaar om te versturen.
  function maakRij(leerling, soort, id, titel, score, max, poging) {
    var rij = {
      tijdstip: nu(),
      klas: leerling ? leerling.klas : "",
      leerling: leerling ? leerling.naam : "",
      groep: leerling ? leerling.groep : "",
      soort: soort,
      onderdeel_id: id,
      onderdeel: titel,
      score: score,
      max: max,
      poging: poging || 1
    };
    data.rijen.push(rij);
    data.teVersturen.push(rij);
    return rij;
  }

  // Een evaluatie van een kind. De eerste poging is de score die telt.
  function bewaarScore(id, titel, score, max) {
    var l = actief(); if (!l) return null;
    var oud = l.scores[id];
    var poging = oud ? oud.pogingen + 1 : 1;
    if (!oud) {
      l.scores[id] = { titel: titel, score: score, max: max, tijdstip: nu(), pogingen: 1, laatste: score };
    } else {
      oud.pogingen = poging;
      oud.laatste = score;
    }
    maakRij(l, "evaluatie", id, titel, score, max, poging);
    bewaar();
    verstuur();
    return l.scores[id];
  }

  function score(id) { var l = actief(); return l ? l.scores[id] || null : null; }

  // Rubric van de leerkracht voor een groep (bv. eindopdracht, STEM).
  function bewaarRubric(groepNaam, rubricId, titel, punten, max) {
    var g = data.groepen[groepNaam]; if (!g) return;
    g.rubrics[rubricId] = { titel: titel, punten: punten, max: max, tijdstip: nu() };
    var totaal = 0;
    for (var k in punten) totaal += Number(punten[k]) || 0;
    // Eén rij per kind van de groep, zodat elk kind zijn score heeft.
    g.leden.forEach(function (naam) {
      maakRij(data.leerlingen[naam] || { naam: naam, klas: "", groep: groepNaam }, "rubric", rubricId, titel, totaal, max, 1);
    });
    bewaar();
    verstuur();
  }

  /* ---------- Export en Google Sheet ---------- */

  function csvVeld(w) {
    var s = w === null || w === undefined ? "" : String(w);
    return /[";\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  // CSV met puntkomma's (opent goed in een Belgische Excel).
  function alsCsv() {
    var regels = [KOLOMMEN.join(";")];
    data.rijen.forEach(function (r) {
      regels.push(KOLOMMEN.map(function (k) { return csvVeld(r[k]); }).join(";"));
    });
    return "﻿" + regels.join("\r\n");
  }

  var bezig = false;
  // Stuur rijen die nog niet verstuurd zijn naar de Google Sheet.
  function verstuur() {
    var url = (window.INSTELLINGEN || {}).googleSheetUrl;
    if (!url || bezig || !data.teVersturen.length || !window.fetch) return;
    bezig = true;
    var pakket = data.teVersturen.slice();
    // "no-cors" en text/plain: zo werkt het ook als index.html lokaal geopend is.
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ kolommen: KOLOMMEN, rijen: pakket })
    }).then(function () {
      data.teVersturen = data.teVersturen.slice(pakket.length);
      bewaar();
    }).catch(function () {
      /* geen internet: we proberen het later opnieuw */
    }).then(function () { bezig = false; });
  }

  function wisAlles() { data = leeg(); bewaar(); }

  return {
    KOLOMMEN: KOLOMMEN,
    meldAan: meldAan, meldAf: meldAf, actief: actief, zetGroep: zetGroep,
    antwoord: antwoord, zetAntwoord: zetAntwoord,
    zetHoofdstuk: zetHoofdstuk, hoofdstuk: hoofdstuk,
    bewaarScore: bewaarScore, score: score, bewaarRubric: bewaarRubric,
    alsCsv: alsCsv, verstuur: verstuur, wisAlles: wisAlles,
    data: function () { return data; }
  };
})();
