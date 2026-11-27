/* =====================================================================
   LEERKRACHT – overzicht, rubrics en export
   ---------------------------------------------------------------------
   Het leerkrachtscherm is beveiligd met een code (zie js/instellingen.js).
   Je ziet er:
     - Scores:      de score van elke evaluatie per kind (eerste poging);
     - Rubrics:     punten geven voor de eindopdracht en de STEM-challenge,
                    per groepje (elk kind van het groepje krijgt de punten);
     - Antwoorden:  alles wat een kind schreef en tekende;
     - Export:      CSV voor Excel of Google Sheets, en de Google Sheet-koppeling.
   ===================================================================== */

window.LEERKRACHT = (function () {
  "use strict";

  var R = window.RESULTATEN;
  var open_ = false;     // code al juist ingegeven in deze sessie?
  var houder = null;
  var tab = "scores";

  function maak(tag, klasse, tekst) {
    var el = document.createElement(tag);
    if (klasse) el.className = klasse;
    if (tekst !== undefined) el.textContent = tekst;
    return el;
  }
  function knop(tekst, klasse) {
    var b = maak("button", "knop " + (klasse || ""), tekst);
    b.type = "button";
    return b;
  }

  // Alle opdrachten uit het verhaal, in volgorde, met hun scène.
  function alleOpdrachten() {
    var uit = [];
    (window.VERHAAL || []).forEach(function (h) {
      h.scenes.forEach(function (s) {
        var lijst = Array.isArray(s.opdracht) ? s.opdracht : (s.opdracht ? [s.opdracht] : []);
        lijst.forEach(function (o) { uit.push({ hoofdstuk: h, scene: s, opdracht: o }); });
      });
    });
    return uit;
  }

  function evaluaties() {
    return alleOpdrachten().filter(function (x) { return x.opdracht.soort === "evaluatie"; })
      .map(function (x) { return x.opdracht; });
  }

  function leerlingen() {
    var d = R.data().leerlingen;
    return Object.keys(d).sort(function (a, b) { return a.localeCompare(b, "nl"); }).map(function (k) { return d[k]; });
  }

  /* ---------- Openen en de code ---------- */

  function openScherm(el) {
    houder = el;
    if (open_) teken(); else vraagCode();
  }

  function sluit() { /* de code blijft onthouden tot de pagina herladen wordt */ }

  function vraagCode() {
    houder.innerHTML = "";
    var f = maak("form", "paneel code-paneel");
    f.appendChild(maak("p", "vraag", "Geef de leerkrachtcode in."));
    var inp = maak("input", "antwoord-kort");
    inp.type = "password";
    inp.id = "leerkracht-code";
    inp.setAttribute("aria-label", "Leerkrachtcode");
    inp.autocomplete = "off";
    var b = maak("button", "knop", "Open");
    b.type = "submit";
    var fout = maak("p", "feedback fout");
    fout.hidden = true;
    f.appendChild(inp); f.appendChild(b); f.appendChild(fout);
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (inp.value === String((window.INSTELLINGEN || {}).leerkrachtCode || "")) { open_ = true; teken(); }
      else { fout.hidden = false; fout.textContent = "Die code klopt niet."; inp.value = ""; inp.focus(); }
    });
    houder.appendChild(f);
    inp.focus();
  }

  /* ---------- De tabbladen ---------- */

  var TABS = [["scores", "Scores"], ["rubrics", "Rubrics"], ["antwoorden", "Antwoorden"], ["export", "Export en Google Sheet"]];

  function teken() {
    houder.innerHTML = "";
    var rij = maak("div", "tabs");
    rij.setAttribute("role", "tablist");
    TABS.forEach(function (t) {
      var b = knop(t[1], "knop-keuze");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", t[0] === tab ? "true" : "false");
      b.setAttribute("aria-pressed", t[0] === tab ? "true" : "false");
      b.addEventListener("click", function () { tab = t[0]; teken(); });
      rij.appendChild(b);
    });
    houder.appendChild(rij);
    var paneel = maak("div", "paneel leerkracht-paneel");
    houder.appendChild(paneel);
    ({ scores: scores, rubrics: rubrics, antwoorden: antwoorden, export: exporteer })[tab](paneel);
  }

  /* ---------- Scores ---------- */

  function scores(p) {
    var evals = evaluaties();
    var kinderen = leerlingen();
    p.appendChild(maak("h3", "", "Scores van de evaluaties"));
    p.appendChild(maak("p", "", "De eerste poging telt. Tussen haakjes: hoeveel keer het kind de evaluatie maakte en de score van de laatste poging."));
    if (!kinderen.length) { p.appendChild(maak("p", "leeg", "Er zijn nog geen leerlingen aangemeld op deze computer.")); return; }
    var wrap = maak("div", "tabel-wrap");
    var t = maak("table", "invultabel score-tabel");
    var kop = maak("tr");
    ["Leerling", "Klas", "Groep"].forEach(function (k) { kop.appendChild(maak("th", "", k)); });
    evals.forEach(function (o) { kop.appendChild(maak("th", "", o.titel.split(" –")[0])); });
    kop.appendChild(maak("th", "", "Eindopdracht"));
    kop.appendChild(maak("th", "", "STEM"));
    t.appendChild(kop);
    var groepen = R.data().groepen;
    kinderen.forEach(function (l) {
      var tr = maak("tr");
      tr.appendChild(maak("th", "", l.naam));
      tr.appendChild(maak("td", "", l.klas || ""));
      tr.appendChild(maak("td", "", l.groep || ""));
      evals.forEach(function (o) {
        var s = l.scores[o.id];
        var td = maak("td", s ? kleur(s.score, s.max) : "leeg", s ? s.score + "/" + s.max : "–");
        if (s && s.pogingen > 1) td.appendChild(maak("small", "", " (" + s.pogingen + "×, laatste " + s.laatste + ")"));
        tr.appendChild(td);
      });
      ["eindopdracht", "stem"].forEach(function (id) {
        var g = l.groep && groepen[l.groep];
        var r = g && g.rubrics[id];
        var tot = r ? som(r.punten) : null;
        tr.appendChild(maak("td", r ? kleur(tot, r.max) : "leeg", r ? tot + "/" + r.max : "–"));
      });
      t.appendChild(tr);
    });
    wrap.appendChild(t);
    p.appendChild(wrap);
  }

  function som(punten) { var t = 0; for (var k in punten) t += Number(punten[k]) || 0; return t; }

  function kleur(score, max) {
    var d = max ? score / max : 0;
    return d >= 0.8 ? "score-goed" : (d >= 0.5 ? "score-midden" : "score-laag");
  }

  /* ---------- Rubrics ---------- */

  var gekozenGroep = "";
  var gekozenRubric = "eindopdracht";

  function rubrics(p) {
    var groepen = R.data().groepen;
    var namen = Object.keys(groepen).sort();
    p.appendChild(maak("h3", "", "Rubrics invullen per groepje"));
    p.appendChild(maak("p", "", "De kinderen typen de naam van hun groepje in hoofdstuk 9 en 10. Elk kind van het groepje krijgt dezelfde punten."));
    if (!namen.length) { p.appendChild(maak("p", "leeg", "Er zijn nog geen groepjes op deze computer.")); return; }
    if (namen.indexOf(gekozenGroep) < 0) gekozenGroep = namen[0];

    var keuzes = maak("div", "keuze-rij");
    var selG = maak("select", "koppel-keuze");
    selG.setAttribute("aria-label", "Groepje");
    namen.forEach(function (n) { var o = new Option(n, n); o.selected = n === gekozenGroep; selG.appendChild(o); });
    selG.addEventListener("change", function () { gekozenGroep = selG.value; teken(); });
    var selR = maak("select", "koppel-keuze");
    selR.setAttribute("aria-label", "Rubric");
    [["eindopdracht", "Eindopdracht (presentatie)"], ["stem", "STEM-challenge (huis)"]].forEach(function (r) {
      var o = new Option(r[1], r[0]); o.selected = r[0] === gekozenRubric; selR.appendChild(o);
    });
    selR.addEventListener("change", function () { gekozenRubric = selR.value; teken(); });
    keuzes.appendChild(selG); keuzes.appendChild(selR);
    p.appendChild(keuzes);

    var g = groepen[gekozenGroep];
    p.appendChild(maak("p", "", "Leden: " + (g.leden.join(", ") || "nog niemand")));

    var rub = window.RUBRICS[gekozenRubric];
    var oud = (g.rubrics[gekozenRubric] || {}).punten || {};
    var wrap = maak("div", "tabel-wrap");
    var t = maak("table", "invultabel rubric-tabel");
    var kop = maak("tr");
    kop.appendChild(maak("th", "", "Criterium"));
    kop.appendChild(maak("th", "", "Punten"));
    t.appendChild(kop);
    var selects = {};
    var max = 0;
    rub.criteria.forEach(function (c) {
      max += c.max;
      var tr = maak("tr");
      var th = maak("th");
      th.appendChild(maak("strong", "", c.naam));
      if (c.wat) th.appendChild(maak("span", "rubric-wat", c.wat));
      tr.appendChild(th);
      var td = maak("td");
      var s = maak("select", "koppel-keuze");
      s.setAttribute("aria-label", c.naam);
      s.appendChild(new Option("–", ""));
      for (var i = 0; i <= c.max; i++) {
        var tekst = i + (c.niveaus && c.niveaus[i] ? " – " + c.niveaus[i] : "");
        var o = new Option(tekst, String(i));
        o.selected = oud[c.id] !== undefined && String(oud[c.id]) === String(i);
        s.appendChild(o);
      }
      selects[c.id] = s;
      td.appendChild(s);
      tr.appendChild(td);
      t.appendChild(tr);
    });
    wrap.appendChild(t);
    p.appendChild(wrap);

    var bewaar = knop("Bewaar de punten");
    var melding = maak("p", "feedback");
    melding.hidden = true;
    bewaar.addEventListener("click", function () {
      var punten = {}, leeg = false;
      rub.criteria.forEach(function (c) {
        if (selects[c.id].value === "") leeg = true;
        punten[c.id] = Number(selects[c.id].value) || 0;
      });
      if (leeg) { melding.hidden = false; melding.className = "feedback fout"; melding.textContent = "Kies bij elk criterium een aantal punten."; return; }
      R.bewaarRubric(gekozenGroep, gekozenRubric, rub.titel, punten, max);
      melding.hidden = false;
      melding.className = "feedback goed";
      melding.textContent = "Bewaard: " + som(punten) + " op " + max + " voor " + g.leden.length + " leerling(en).";
    });
    p.appendChild(bewaar);
    p.appendChild(melding);
  }

  /* ---------- Antwoorden ---------- */

  var gekozenKind = "";

  function antwoorden(p) {
    var kinderen = leerlingen();
    p.appendChild(maak("h3", "", "Antwoorden van een leerling"));
    if (!kinderen.length) { p.appendChild(maak("p", "leeg", "Er zijn nog geen leerlingen aangemeld op deze computer.")); return; }
    if (!R.data().leerlingen[gekozenKind]) gekozenKind = kinderen[0].naam;
    var sel = maak("select", "koppel-keuze");
    sel.setAttribute("aria-label", "Leerling");
    kinderen.forEach(function (l) { var o = new Option(l.naam, l.naam); o.selected = l.naam === gekozenKind; sel.appendChild(o); });
    sel.addEventListener("change", function () { gekozenKind = sel.value; teken(); });
    p.appendChild(sel);

    var l = R.data().leerlingen[gekozenKind];
    var a = l.antwoorden;
    var vorigHoofdstuk = null;
    var iets = false;

    alleOpdrachten().forEach(function (x) {
      var o = x.opdracht;
      var blokken = [];
      function voeg(titel, waarde) { if (waarde !== null && waarde !== undefined && waarde !== "") blokken.push([titel, waarde]); }

      switch (o.soort) {
        case "open": o.vragen.forEach(function (v) { voeg(v.vraag, a[v.id]); }); break;
        case "lijst": if (a[o.id]) voeg(o.vraag, a[o.id].filter(Boolean).join(" · ")); break;
        case "janee": if (a[o.id]) voeg(o.vraag, (a[o.id].keuze || "?") + (a[o.id].uitleg ? " – " + a[o.id].uitleg : "")); break;
        case "kies": voeg(o.vraag, a[o.id]); break;
        case "afvinken":
          if (a[o.id]) voeg(o.vraag || o.titel || "Afgevinkt", o.items.filter(function (it, i) { return a[o.id][i]; }).join(" · ") || "niets afgevinkt");
          break;
        case "tekenen": if (a[o.id]) blokken.push([o.vraag || "Tekening", { beeld: a[o.id] }]); break;
        case "tabel":
          if (a[o.id]) {
            var regels = [];
            o.rijen.forEach(function (rij, r) {
              var cellen = o.kolommen.map(function (k, c) { return a[o.id][r + "." + c] || ""; });
              if (cellen.join("")) regels.push(rij + ": " + cellen.join(" | "));
            });
            voeg(o.vraag || o.titel || "Tabel", regels.join("\n"));
          }
          break;
        case "evaluatie":
          var s = l.scores[o.id];
          if (s) voeg(o.titel, s.score + " op " + s.max + (s.pogingen > 1 ? " (" + s.pogingen + " pogingen)" : ""));
          break;
      }
      if (!blokken.length) return;
      iets = true;
      if (vorigHoofdstuk !== x.hoofdstuk) {
        vorigHoofdstuk = x.hoofdstuk;
        p.appendChild(maak("h4", "", "Hoofdstuk " + x.hoofdstuk.nummer + " – " + x.hoofdstuk.titel));
      }
      blokken.forEach(function (b) {
        var d = maak("div", "antwoord-blok");
        d.appendChild(maak("p", "vraag", b[0]));
        if (b[1] && b[1].beeld) {
          var img = maak("img", "antwoord-beeld");
          img.src = b[1].beeld;
          img.alt = "Tekening van " + l.naam;
          d.appendChild(img);
        } else {
          d.appendChild(maak("p", "antwoord-tekst", String(b[1])));
        }
        p.appendChild(d);
      });
    });
    if (!iets) p.appendChild(maak("p", "leeg", "Deze leerling heeft nog niets ingevuld."));
  }

  /* ---------- Export en Google Sheet ---------- */

  function download(naam, inhoud, type) {
    var blob = new Blob([inhoud], { type: type });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = naam;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1000);
  }

  function datum() { return new Date().toISOString().slice(0, 10); }

  function exporteer(p) {
    var d = R.data();
    p.appendChild(maak("h3", "", "Scores exporteren"));
    p.appendChild(maak("p", "", "Er zijn " + d.rijen.length + " scorerijen bewaard op deze computer. Elke rij heeft dezelfde kolommen: " + R.KOLOMMEN.join(", ") + "."));

    var rij = maak("div", "keuze-rij");
    var csv = knop("Download scores (CSV)");
    csv.addEventListener("click", function () { download("scores-de-aarde-bromt-" + datum() + ".csv", R.alsCsv(), "text/csv;charset=utf-8"); });
    var backup = knop("Download alles (back-up)", "knop-licht");
    backup.addEventListener("click", function () { download("back-up-de-aarde-bromt-" + datum() + ".json", JSON.stringify(d, null, 1), "application/json"); });
    rij.appendChild(csv); rij.appendChild(backup);
    p.appendChild(rij);
    p.appendChild(maak("p", "", "Het CSV-bestand open je in Excel of importeer je in Google Sheets (Bestand > Importeren, scheidingsteken puntkomma)."));

    p.appendChild(maak("h3", "", "Google Sheet"));
    var url = (window.INSTELLINGEN || {}).googleSheetUrl;
    if (!url) {
      p.appendChild(maak("p", "", "Nog niet gekoppeld. Plak het webadres van je Google Apps Script bij googleSheetUrl in js/instellingen.js. De stappen staan in docs/google-sheet.md. Daarna gaan nieuwe scores automatisch naar de sheet."));
    } else {
      var status = maak("p", "", d.teVersturen.length ? d.teVersturen.length + " rij(en) wachten nog om verstuurd te worden." : "Alle scores zijn verstuurd.");
      p.appendChild(status);
      var stuur = knop("Verstuur nu");
      stuur.addEventListener("click", function () {
        R.verstuur();
        status.textContent = "Bezig met versturen... Kijk zo meteen in je Google Sheet.";
        setTimeout(function () { teken(); }, 2500);
      });
      p.appendChild(stuur);
      var alles = knop("Stuur alle rijen opnieuw", "knop-licht");
      alles.addEventListener("click", function () {
        d.teVersturen = d.rijen.slice();
        R.verstuur();
        status.textContent = "Alle " + d.rijen.length + " rijen worden opnieuw verstuurd.";
      });
      p.appendChild(alles);
    }

    p.appendChild(maak("h3", "", "Alles wissen"));
    p.appendChild(maak("p", "", "Wist alle leerlingen, antwoorden, tekeningen en scores op deze computer. Download eerst een back-up."));
    var wis = knop("Wis alles", "knop-gevaar");
    wis.addEventListener("click", function () {
      if (!wis.dataset.zeker) {
        wis.dataset.zeker = "1";
        wis.textContent = "Ben je zeker? Klik nog eens om alles te wissen";
        return;
      }
      R.wisAlles();
      teken();
    });
    p.appendChild(wis);
  }

  return { open: openScherm, sluit: sluit };
})();
