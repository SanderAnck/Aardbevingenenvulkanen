/* =====================================================================
   OPDRACHTEN – alle soorten opdrachten en evaluaties
   ---------------------------------------------------------------------
   In verhaal.js kan een scène een "opdracht" hebben. Hier staat hoe elke
   soort opdracht getoond wordt. De antwoorden worden bewaard via
   RESULTATEN (js/resultaten.js).

   Soorten (veld "soort"):
     open       één of meer open vragen         { vragen: [{ id, vraag }] }
     lijst      een paar korte antwoorden       { id, vraag, aantal }
     janee      ja/nee met uitleg               { id, vraag }
     kies       één keuze, zonder punten        { id, vraag, opties: [...] }
     afvinken   lijstje om af te vinken         { id, vraag, items: [...] }
     tekenen    tekenvak                        { id, vraag, aanduiden: [...] }
     tabel      tabel om in te vullen           { id, kolommen: [...], rijen: [...] }
     doe        doe-opdracht in de klas         { materiaal: [...], stappen: [...] }
     groep      naam van het groepje            { }
     kaartlagen wereldkaart met lagen aan/uit   { }
     rubric     de rubric van de leerkracht     { rubric: "eindopdracht" | "stem" }
     evaluatie  vragen met punten (telt mee)    { id, titel, vragen: [...] }
     oefening   vragen met punten (oefenen)     { id, vragen: [...] }

   Vraagtypes in een evaluatie of oefening:
     { type: "meerkeuze", vraag, opties: [...], juist: 0, uitleg }
     { type: "waar", stelling, juist: true, uitleg }
     { type: "sorteer", vraag, groepen: ["veilig", "niet veilig"],
       items: [{ tekst, juist: 0 }] }                 (1 punt per item)
     { type: "koppel", vraag, opties: [...],
       items: [{ tekst, juist: "mantel" }] }          (1 punt per item)
   ===================================================================== */

window.OPDRACHTEN = (function () {
  "use strict";

  var R = window.RESULTATEN;

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

  var KOPPEN = {
    evaluatie: ["✅", "Evaluatie"],
    oefening: ["🎯", "Mini-opdracht"],
    doe: ["🔬", "Doe-opdracht"],
    tekenen: ["✏️", "Teken"],
    groep: ["👥", "Jullie groepje"],
    kaartlagen: ["🗺️", "Onderzoek de kaart"],
    rubric: ["📋", "Rubric"]
  };

  /* ---------------------------------------------------------------
     Hoofdfunctie: toon een opdracht in "houder".
     --------------------------------------------------------------- */
  /* Elke opdracht op het scherm zegt of ze af is.
     controles = lijst van { kaart, mist: function () -> null of "wat ontbreekt" } */
  var controles = [];

  function vrijblijvend(o) { return !!o.vrijblijvend || /^extra/i.test(o.titel || ""); }

  function toon(opdracht, houder) {
    houder.innerHTML = "";
    controles = [];
    if (!opdracht) { houder.hidden = true; return; }
    houder.hidden = false;
    var lijst = Array.isArray(opdracht) ? opdracht : [opdracht];
    lijst.forEach(function (o) {
      var kaart = maak("section", "opdracht opdracht-" + o.soort);
      var kop = KOPPEN[o.soort] || ["📝", "Opdracht"];
      var h = maak("h3", "opdracht-kop");
      h.appendChild(maak("span", "opdracht-icoon", kop[0]));
      h.appendChild(document.createTextNode(" " + (o.titel || kop[1])));
      kaart.appendChild(h);
      if (o.uitleg) kaart.appendChild(maak("p", "opdracht-uitleg", o.uitleg));
      var bouw = SOORTEN[o.soort];
      var mist = bouw ? bouw(o, kaart) : null;
      if (typeof mist === "function" && !vrijblijvend(o)) controles.push({ kaart: kaart, mist: mist });
      if (vrijblijvend(o)) kaart.appendChild(maak("p", "opdracht-uitleg", "Deze opdracht is extra. Je mag verder zonder."));
      if (!bouw) kaart.appendChild(maak("p", "", "Onbekende opdracht: " + o.soort));
      houder.appendChild(kaart);
    });
  }

  // Wat moet het kind nog doen voor het verder mag? null = alles is af.
  function ontbreekt() {
    for (var i = 0; i < controles.length; i++) {
      var m = controles[i].mist();
      if (m) return { tekst: m, kaart: controles[i].kaart };
    }
    return null;
  }

  function ingevuld(w) { return typeof w === "string" && /[a-z0-9\u00C0-\u024F]{2,}/i.test(w); }

  /* ---------------------------------------------------------------
     Feedback op open vragen (zie js/feedback.js)
     --------------------------------------------------------------- */

  function zonderAccent(t) {
    return String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Staat het woordstukje in de tekst? Korte stukjes (3 letters of minder)
  // moeten aan het begin van een woord staan, zodat "as" niet in "was" zit.
  function bevat(tekst, stuk) {
    stuk = zonderAccent(stuk);
    if (stuk.length > 3) return tekst.indexOf(stuk) >= 0;
    return new RegExp("(^|[^a-z])" + stuk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).test(tekst);
  }

  function reactie(vraag, id, antwoord) {
    var tekst = zonderAccent(antwoord).trim();
    if (!tekst) return null;
    var woorden = tekst.split(/\s+/).filter(Boolean);
    var v = zonderAccent(vraag || "");
    var regel = (window.FEEDBACK || {})[id];

    if (woorden.length < 2 && !(regel && regel.groepen.some(function (g) { return g.woorden.some(function (w) { return bevat(tekst, w); }); })))
      return { soort: "tip", tekst: "Schrijf een volledige zin, dan kan ik beter meekijken." };

    var waaromTip = null;
    if (/^(\d+\.\s*)?waarom/.test(v) && !/(omdat|want|doordat|zodat|daardoor|door |anders)/.test(tekst))
      waaromTip = "Tip: leg uit met \u201comdat\u201d of \u201cwant\u201d.";
    var vraagTip = null;
    if (/(onderzoeksvraag|te weten komen)/.test(v) && tekst.indexOf("?") < 0)
      vraagTip = "Tip: schrijf het als een vraag, met een vraagteken op het einde.";

    if (!regel) {
      if (vraagTip) return { soort: "tip", tekst: vraagTip };
      if (waaromTip) return { soort: "tip", tekst: waaromTip };
      if (woorden.length < 5) return { soort: "tip", tekst: "Goed begin! Kan je nog wat meer vertellen?" };
      return { soort: "goed", tekst: "Mooi, je schreef een volledig antwoord." };
    }

    var gevonden = regel.groepen.filter(function (g) { return g.woorden.some(function (w) { return bevat(tekst, w); }); });
    var mist = regel.groepen.filter(function (g) { return gevonden.indexOf(g) < 0; });
    if (!mist.length || (regel.een && gevonden.length)) {
      return { soort: "goed", tekst: "Sterk! " + (regel.goed || "Je gebruikt de juiste woorden.") + (vraagTip ? " " + vraagTip : "") };
    }
    if (gevonden.length) return { soort: "bijna", tekst: "Goed bezig! " + mist[0].tip };
    return { soort: "tip", tekst: "Denk nog eens na. " + mist[0].tip };
  }

  // Koppel een reactievak aan een tekstvak. De reactie verschijnt even
  // nadat het kind stopt met typen.
  function metFeedback(veld, vraag, id) {
    if ((window.INSTELLINGEN || {}).feedbackOpOpenVragen === false) return veld;
    var wrap = maak("div", "met-feedback");
    var vak = maak("p", "reactie");
    vak.setAttribute("aria-live", "polite");
    vak.hidden = true;
    var wacht = null;
    function werkBij() {
      var r = reactie(vraag, id, veld.value);
      if (!r) { vak.hidden = true; return; }
      vak.hidden = false;
      vak.className = "reactie reactie-" + r.soort;
      vak.textContent = (r.soort === "goed" ? "\u2714 " : (r.soort === "bijna" ? "\uD83D\uDC4D " : "\uD83D\uDCA1 ")) + r.tekst;
    }
    veld.addEventListener("input", function () { clearTimeout(wacht); wacht = setTimeout(werkBij, 900); });
    veld.addEventListener("blur", function () { clearTimeout(wacht); werkBij(); });
    wrap.appendChild(veld);
    wrap.appendChild(vak);
    if (veld.value) werkBij();
    return wrap;
  }

  /* ---------------------------------------------------------------
     Bouwstenen
     --------------------------------------------------------------- */

  function tekstvak(id, regels, plaatshouder) {
    var t = maak("textarea", "antwoord");
    t.rows = regels || 2;
    t.placeholder = plaatshouder || "Typ hier je antwoord...";
    t.value = R.antwoord(id) || "";
    t.setAttribute("aria-label", plaatshouder || "Jouw antwoord");
    t.addEventListener("input", function () { R.zetAntwoord(id, t.value); });
    return t;
  }

  function vraagLabel(tekst) { return maak("p", "vraag", tekst); }

  var SOORTEN = {

    open: function (o, kaart) {
      o.vragen.forEach(function (v) {
        kaart.appendChild(vraagLabel(v.vraag));
        kaart.appendChild(metFeedback(tekstvak(v.id, v.regels || 2, v.hulp), v.vraag, v.id));
      });
      return function () {
        var leeg = o.vragen.filter(function (v) { return !ingevuld(R.antwoord(v.id)); }).length;
        return leeg ? (leeg === 1 ? "Beantwoord nog 1 vraag." : "Beantwoord nog " + leeg + " vragen.") : null;
      };
    },

    lijst: function (o, kaart) {
      kaart.appendChild(vraagLabel(o.vraag));
      var waarden = R.antwoord(o.id) || [];
      var ol = maak("ol", "lijst-invullen");
      for (var i = 0; i < (o.aantal || 3); i++) {
        (function (i) {
          var li = maak("li");
          var inp = maak("input", "antwoord-kort");
          inp.type = "text";
          inp.value = waarden[i] || "";
          inp.setAttribute("aria-label", o.vraag + " " + (i + 1));
          inp.addEventListener("input", function () { waarden[i] = inp.value; R.zetAntwoord(o.id, waarden); });
          li.appendChild(inp);
          ol.appendChild(li);
        })(i);
      }
      kaart.appendChild(ol);
      return function () {
        var w = R.antwoord(o.id) || [];
        for (var i = 0; i < (o.aantal || 3); i++) if (!ingevuld(w[i])) return "Vul alle " + (o.aantal || 3) + " lijntjes in.";
        return null;
      };
    },

    janee: function (o, kaart) {
      kaart.appendChild(vraagLabel(o.vraag));
      var oud = R.antwoord(o.id) || {};
      var rij = maak("div", "keuze-rij");
      ["Ja", "Nee"].forEach(function (w) {
        var b = knop(w, "knop-keuze");
        b.setAttribute("aria-pressed", oud.keuze === w ? "true" : "false");
        b.addEventListener("click", function () {
          oud.keuze = w; R.zetAntwoord(o.id, oud);
          rij.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        });
        rij.appendChild(b);
      });
      kaart.appendChild(rij);
      kaart.appendChild(vraagLabel(o.uitlegVraag || "Leg uit:"));
      var t = tekstvak(o.id + ".uitleg", 2);
      t.value = oud.uitleg || "";
      t.addEventListener("input", function () { oud.uitleg = t.value; R.zetAntwoord(o.id, oud); });
      kaart.appendChild(metFeedback(t, o.uitlegVraag || "Leg uit:", o.id + ".uitleg"));
      return function () {
        var a = R.antwoord(o.id) || {};
        if (!a.keuze) return "Kies ja of nee.";
        if (!ingevuld(a.uitleg)) return "Leg je keuze uit.";
        return null;
      };
    },

    kies: function (o, kaart) {
      kaart.appendChild(vraagLabel(o.vraag));
      var oud = R.antwoord(o.id);
      var rij = maak("div", "keuze-rij");
      o.opties.forEach(function (w) {
        var b = knop(w, "knop-keuze");
        b.setAttribute("aria-pressed", oud === w ? "true" : "false");
        b.addEventListener("click", function () {
          R.zetAntwoord(o.id, w);
          rij.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        });
        rij.appendChild(b);
      });
      kaart.appendChild(rij);
      return function () { return R.antwoord(o.id) ? null : "Maak een keuze."; };
    },

    afvinken: function (o, kaart) {
      if (o.vraag) kaart.appendChild(vraagLabel(o.vraag));
      var oud = R.antwoord(o.id) || {};
      var ul = maak("ul", "afvinklijst");
      o.items.forEach(function (item, i) {
        var li = maak("li");
        var lab = maak("label");
        var c = maak("input");
        c.type = "checkbox";
        c.checked = !!oud[i];
        c.addEventListener("change", function () { oud[i] = c.checked; R.zetAntwoord(o.id, oud); });
        lab.appendChild(c);
        lab.appendChild(document.createTextNode(" " + item));
        li.appendChild(lab);
        ul.appendChild(li);
      });
      kaart.appendChild(ul);
    },

    doe: function (o, kaart) {
      if (o.materiaal) {
        kaart.appendChild(maak("p", "vraag", "Dit heb je nodig:"));
        var ul = maak("ul", "materiaal");
        o.materiaal.forEach(function (m) { ul.appendChild(maak("li", "", m)); });
        kaart.appendChild(ul);
      }
      if (o.stappen) {
        kaart.appendChild(maak("p", "vraag", "Zo doe je het:"));
        var ol = maak("ol", "stappen");
        o.stappen.forEach(function (s) { ol.appendChild(maak("li", "", s)); });
        kaart.appendChild(ol);
      }
    },

    groep: function (o, kaart) {
      var l = R.actief();
      kaart.appendChild(vraagLabel(o.vraag || "Hoe heet jullie groepje? Iedereen van het groepje typt dezelfde naam."));
      var inp = maak("input", "antwoord-kort");
      inp.type = "text";
      inp.value = l && l.groep ? l.groep : "";
      inp.placeholder = "bv. De Lavaknallers";
      inp.setAttribute("aria-label", "Naam van je groepje");
      inp.addEventListener("change", function () { R.zetGroep(inp.value); });
      inp.addEventListener("blur", function () { R.zetGroep(inp.value); });
      inp.addEventListener("input", function () { R.zetGroep(inp.value); });
      kaart.appendChild(inp);
      return function () { var l = R.actief(); return l && l.groep ? null : "Typ de naam van jullie groepje."; };
    },

    tekenen: function (o, kaart) {
      if (o.vraag) kaart.appendChild(vraagLabel(o.vraag));
      if (o.aanduiden) {
        var p = maak("p", "aanduiden");
        p.appendChild(document.createTextNode("Duid aan: "));
        o.aanduiden.forEach(function (w) { p.appendChild(maak("span", "label-chip", w)); });
        kaart.appendChild(p);
      }
      kaart.appendChild(maakTekenvak(o.id));
      return function () { return R.antwoord(o.id) ? null : "Maak eerst je tekening."; };
    },

    tabel: function (o, kaart) {
      if (o.vraag) kaart.appendChild(vraagLabel(o.vraag));
      var oud = R.antwoord(o.id) || {};
      var wrap = maak("div", "tabel-wrap");
      var t = maak("table", "invultabel");
      var kop = maak("tr");
      kop.appendChild(maak("th", "", o.rijKop || ""));
      o.kolommen.forEach(function (k) { kop.appendChild(maak("th", "", k.kop)); });
      t.appendChild(kop);
      o.rijen.forEach(function (rijNaam, r) {
        var tr = maak("tr");
        tr.appendChild(maak("th", "", rijNaam));
        o.kolommen.forEach(function (k, c) {
          var td = maak("td");
          var sleutel = r + "." + c;
          if (k.type === "keuze") {
            k.opties.forEach(function (opt) {
              var lab = maak("label", "tabel-keuze");
              var radio = maak("input");
              radio.type = "radio";
              radio.name = o.id + "-" + sleutel;
              radio.checked = oud[sleutel] === opt;
              radio.addEventListener("change", function () { oud[sleutel] = opt; R.zetAntwoord(o.id, oud); });
              lab.appendChild(radio);
              lab.appendChild(document.createTextNode(" " + opt));
              td.appendChild(lab);
            });
          } else {
            var inp = maak("textarea", "antwoord tabel-tekst");
            inp.rows = 2;
            inp.value = oud[sleutel] || "";
            inp.setAttribute("aria-label", rijNaam + ", " + k.kop);
            inp.addEventListener("input", function () { oud[sleutel] = inp.value; R.zetAntwoord(o.id, oud); });
            td.appendChild(inp);
          }
          tr.appendChild(td);
        });
        t.appendChild(tr);
      });
      wrap.appendChild(t);
      kaart.appendChild(wrap);
      return function () {
        var a = R.antwoord(o.id) || {};
        for (var r = 0; r < o.rijen.length; r++) {
          if (/^extra/i.test(o.rijen[r])) continue;     // een extra rij mag leeg blijven
          for (var c = 0; c < o.kolommen.length; c++) {
            var w = a[r + "." + c];
            if (o.kolommen[c].type === "keuze" ? !w : !ingevuld(w)) return "Vul de tabel helemaal in.";
          }
        }
        return null;
      };
    },

    kaartlagen: function (o, kaart) {
      var lagen = [["vulkanen", "🔺 Vulkanen"], ["bevingen", "🟡 Aardbevingen"], ["grenzen", "➖ Plaatgrenzen"]];
      var aan = R.antwoord("kaartlagen") || { vulkanen: true, bevingen: false, grenzen: false };
      var kaartje = maak("div", "wereldkaart");
      var prent = window.PRENTEN["wereldkaart-lagen"];
      kaartje.innerHTML = typeof prent === "function" ? prent() : "";
      var rij = maak("div", "keuze-rij");
      function pas() {
        lagen.forEach(function (l) {
          var g = kaartje.querySelector(".laag-" + l[0]);
          if (g) g.style.display = aan[l[0]] ? "" : "none";
        });
      }
      lagen.forEach(function (l) {
        var b = knop(l[1], "knop-keuze");
        b.setAttribute("aria-pressed", aan[l[0]] ? "true" : "false");
        b.addEventListener("click", function () {
          aan[l[0]] = !aan[l[0]];
          b.setAttribute("aria-pressed", aan[l[0]] ? "true" : "false");
          R.zetAntwoord("kaartlagen", aan);
          pas();
        });
        rij.appendChild(b);
      });
      kaart.appendChild(maak("p", "vraag", "Zet de lagen aan en uit:"));
      kaart.appendChild(rij);
      kaart.appendChild(kaartje);
      pas();
    },

    // De rubric van de leerkracht, zodat de kinderen weten waarop gelet wordt.
    rubric: function (o, kaart) {
      var r = (window.RUBRICS || {})[o.rubric];
      if (!r) return;
      kaart.querySelector(".opdracht-kop").lastChild.textContent = " " + r.titel;
      var wrap = maak("div", "tabel-wrap");
      var t = maak("table", "invultabel rubric-tabel");
      var kop = maak("tr");
      kop.appendChild(maak("th", "", "Waarop let de juf of meester?"));
      kop.appendChild(maak("th", "", "Punten"));
      t.appendChild(kop);
      var totaal = 0;
      r.criteria.forEach(function (c) {
        totaal += c.max;
        var tr = maak("tr");
        var th = maak("th");
        th.appendChild(maak("strong", "", c.naam));
        if (c.wat) th.appendChild(maak("span", "rubric-wat", c.wat));
        if (c.niveaus) th.appendChild(maak("span", "rubric-wat", "0 = " + c.niveaus[0] + " … " + c.max + " = " + c.niveaus[c.niveaus.length - 1]));
        tr.appendChild(th);
        tr.appendChild(maak("td", "rubric-punten", "… / " + c.max));
        t.appendChild(tr);
      });
      var tot = maak("tr", "rubric-totaal");
      tot.appendChild(maak("th", "", "Totaal"));
      tot.appendChild(maak("td", "rubric-punten", "… / " + totaal));
      t.appendChild(tot);
      wrap.appendChild(t);
      kaart.appendChild(wrap);
    },

    evaluatie: function (o, kaart) {
      bouwToets(o, kaart, true);
      return function () { return R.score(o.id) ? null : "Maak de evaluatie en klik op \u201cKlaar! Kijk mijn antwoorden na\u201d."; };
    },
    oefening: function (o, kaart) {
      bouwToets(o, kaart, false);
      return function () { return R.antwoord("oef." + o.id) ? null : "Maak de mini-opdracht en klik op \u201cKijk na\u201d."; };
    }
  };

  /* ---------------------------------------------------------------
     Tekenvak
     --------------------------------------------------------------- */
  function maakTekenvak(id) {
    var wrap = maak("div", "tekenvak");
    var canvas = maak("canvas");
    canvas.width = 800;
    canvas.height = 450;
    canvas.setAttribute("aria-label", "Tekenvak");
    var ctx = canvas.getContext("2d");
    function wit() { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    wit();
    var oud = R.antwoord(id);
    if (oud) {
      var img = new Image();
      img.onload = function () { ctx.drawImage(img, 0, 0); };
      img.src = oud;
    }

    var kleur = "#2b1d14", dikte = 5, tekent = false, vorige = null;
    var balk = maak("div", "tekenbalk");
    var kleuren = [["#2b1d14", "zwart"], ["#d9481f", "rood"], ["#f59e0b", "oranje"], ["#ffd166", "geel"], ["#8a5a3b", "bruin"], ["#6f9b4f", "groen"], ["#1e4f8a", "blauw"]];
    kleuren.forEach(function (k, i) {
      var b = maak("button", "kleur-knop");
      b.type = "button";
      b.style.background = k[0];
      b.setAttribute("aria-label", "Kleur " + k[1]);
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        kleur = k[0]; dikte = 5;
        balk.querySelectorAll(".kleur-knop, .gum").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      });
      balk.appendChild(b);
    });
    var gum = knop("Gom", "knop-licht gum");
    gum.setAttribute("aria-pressed", "false");
    gum.addEventListener("click", function () {
      kleur = "#ffffff"; dikte = 24;
      balk.querySelectorAll(".kleur-knop, .gum").forEach(function (x) { x.setAttribute("aria-pressed", x === gum ? "true" : "false"); });
    });
    var wis = knop("Alles wissen", "knop-licht");
    wis.addEventListener("click", function () { wit(); R.zetAntwoord(id, null); });
    balk.appendChild(gum);
    balk.appendChild(wis);

    function punt(e) {
      var r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) * canvas.width / r.width, y: (e.clientY - r.top) * canvas.height / r.height };
    }
    canvas.addEventListener("pointerdown", function (e) {
      tekent = true; vorige = punt(e);
      canvas.setPointerCapture(e.pointerId);
      ctx.beginPath(); ctx.fillStyle = kleur; ctx.arc(vorige.x, vorige.y, dikte / 2, 0, Math.PI * 2); ctx.fill();
      e.preventDefault();
    });
    canvas.addEventListener("pointermove", function (e) {
      if (!tekent) return;
      var p = punt(e);
      ctx.strokeStyle = kleur; ctx.lineWidth = dikte; ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(vorige.x, vorige.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      vorige = p;
      e.preventDefault();
    });
    function stop() {
      if (!tekent) return;
      tekent = false;
      try { R.zetAntwoord(id, canvas.toDataURL("image/png")); } catch (e) { /* te groot om te bewaren */ }
    }
    canvas.addEventListener("pointerup", stop);
    canvas.addEventListener("pointercancel", stop);

    wrap.appendChild(balk);
    wrap.appendChild(canvas);
    return wrap;
  }

  /* ---------------------------------------------------------------
     Evaluatie en mini-opdracht (met punten)
     --------------------------------------------------------------- */
  function bouwToets(o, kaart, telt) {
    var vorige = telt ? R.score(o.id) : null;
    var vak = maak("div", "toets");
    kaart.appendChild(vak);

    if (vorige) {
      toonAfgerond(vorige);
    } else {
      bouwVragen();
    }

    function toonAfgerond(s) {
      vak.innerHTML = "";
      var p = maak("p", "toets-uitslag");
      p.innerHTML = "Je hebt deze evaluatie al gemaakt. Je score: <strong>" + s.score + " op " + s.max + "</strong>.";
      vak.appendChild(p);
      vak.appendChild(maak("p", "", sterren(s.score, s.max)));
      if ((window.INSTELLINGEN || {}).opnieuwProberen) {
        var b = knop("Nog eens oefenen", "knop-licht");
        b.addEventListener("click", bouwVragen);
        vak.appendChild(b);
      }
    }

    function bouwVragen() {
      vak.innerHTML = "";
      var antwoorden = [];   // per vraag een functie die { punten, max } geeft en feedback toont
      o.vragen.forEach(function (v, nr) {
        var blok = maak("div", "toets-vraag");
        blok.appendChild(maak("p", "vraag", (nr + 1) + ". " + (v.vraag || v.stelling)));
        antwoorden.push(VRAAGTYPES[v.type](v, blok));
        vak.appendChild(blok);
      });
      var controleer = knop(telt ? "Klaar! Kijk mijn antwoorden na" : "Kijk na", "knop-controleer");
      var uitslag = maak("p", "toets-uitslag");
      controleer.addEventListener("click", function () {
        var punten = 0, max = 0, leeg = false;
        antwoorden.forEach(function (a) { var r = a.check(false); if (r.leeg) leeg = true; });
        if (leeg && !controleer.dataset.toch) {
          uitslag.textContent = "Je hebt nog niet alles ingevuld. Klik nog eens om toch na te kijken.";
          controleer.dataset.toch = "1";
          return;
        }
        antwoorden.forEach(function (a) { var r = a.check(true); punten += r.punten; max += r.max; });
        controleer.disabled = true;
        uitslag.innerHTML = "Je hebt <strong>" + punten + " op " + max + "</strong> juist. " + sterren(punten, max);
        // Elke poging wordt bewaard; de eerste poging blijft de score die telt.
        if (telt) R.bewaarScore(o.id, o.titel || o.id, punten, max);
        else R.zetAntwoord("oef." + o.id, { punten: punten, max: max });
        if (window.APP && window.APP.geluid) window.APP.geluid(punten === max ? "pling" : "plons");
        // Een mini-opdracht mag je zo vaak opnieuw proberen als je wil.
        if (!telt && punten < max) {
          var opnieuw = knop("Probeer opnieuw", "knop-licht");
          opnieuw.addEventListener("click", bouwVragen);
          vak.appendChild(opnieuw);
        }
      });
      vak.appendChild(controleer);
      vak.appendChild(uitslag);
    }
  }

  function sterren(punten, max) {
    var deel = max ? punten / max : 0;
    if (deel === 1) return "⭐⭐⭐ Super, je bent helemaal mee!";
    if (deel >= 0.7) return "⭐⭐ Goed zo! Lees de uitleg bij wat nog niet juist was.";
    if (deel >= 0.4) return "⭐ Je bent goed bezig. Kijk de uitleg na en lees dat stukje nog eens.";
    return "Nog even oefenen. Ga terug in het verhaal en vraag hulp als het nodig is.";
  }

  function feedback(blok, goed, uitleg) {
    var f = blok.querySelector(".feedback") || blok.appendChild(maak("p", "feedback"));
    f.className = "feedback " + (goed ? "goed" : "fout");
    f.textContent = (goed ? "✔ Juist! " : "✘ Niet helemaal. ") + (uitleg || "");
  }

  function keuzeKnoppen(opties, blok, opKlik) {
    var rij = maak("div", "keuze-rij");
    var knoppen = opties.map(function (opt, i) {
      var b = knop(opt, "knop-keuze");
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () {
        if (b.disabled) return;
        knoppen.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        opKlik(i);
      });
      rij.appendChild(b);
      return b;
    });
    blok.appendChild(rij);
    return knoppen;
  }

  var VRAAGTYPES = {
    meerkeuze: function (v, blok) {
      var gekozen = null;
      var knoppen = keuzeKnoppen(v.opties, blok, function (i) { gekozen = i; });
      return { check: function (echt) {
        if (gekozen === null && !echt) return { leeg: true };
        if (!echt) return {};
        var goed = gekozen === v.juist;
        knoppen.forEach(function (b, i) { b.disabled = true; if (i === v.juist) b.classList.add("is-juist"); else if (i === gekozen) b.classList.add("is-fout"); });
        feedback(blok, goed, v.uitleg);
        return { punten: goed ? 1 : 0, max: 1 };
      } };
    },

    waar: function (v, blok) {
      var gekozen = null;
      var knoppen = keuzeKnoppen(["Waar", "Niet waar"], blok, function (i) { gekozen = i === 0; });
      return { check: function (echt) {
        if (gekozen === null && !echt) return { leeg: true };
        if (!echt) return {};
        var goed = gekozen === v.juist;
        knoppen.forEach(function (b, i) { b.disabled = true; if ((i === 0) === v.juist) b.classList.add("is-juist"); else if (gekozen !== null) b.classList.add("is-fout"); });
        feedback(blok, goed, v.uitleg);
        return { punten: goed ? 1 : 0, max: 1 };
      } };
    },

    sorteer: function (v, blok) {
      var keuzes = [];
      var rijen = v.items.map(function (item, n) {
        var r = maak("div", "sorteer-rij");
        r.appendChild(maak("span", "sorteer-tekst", item.tekst));
        var knoppen = keuzeKnoppen(v.groepen, r, function (i) { keuzes[n] = i; });
        blok.appendChild(r);
        return knoppen;
      });
      return { check: function (echt) {
        var leeg = v.items.some(function (x, n) { return keuzes[n] === undefined; });
        if (!echt) return { leeg: leeg };
        var punten = 0;
        v.items.forEach(function (item, n) {
          rijen[n].forEach(function (b, i) { b.disabled = true; if (i === item.juist) b.classList.add("is-juist"); else if (i === keuzes[n]) b.classList.add("is-fout"); });
          if (keuzes[n] === item.juist) punten++;
        });
        feedback(blok, punten === v.items.length, v.uitleg || "");
        return { punten: punten, max: v.items.length };
      } };
    },

    koppel: function (v, blok) {
      var selects = v.items.map(function (item) {
        var r = maak("label", "koppel-rij");
        r.appendChild(maak("span", "koppel-tekst", item.tekst));
        var s = maak("select", "koppel-keuze");
        s.appendChild(new Option("kies...", ""));
        v.opties.forEach(function (opt) { s.appendChild(new Option(opt, opt)); });
        r.appendChild(s);
        blok.appendChild(r);
        return s;
      });
      return { check: function (echt) {
        var leeg = selects.some(function (s) { return !s.value; });
        if (!echt) return { leeg: leeg };
        var punten = 0;
        selects.forEach(function (s, n) {
          s.disabled = true;
          var goed = s.value === v.items[n].juist;
          if (goed) punten++;
          s.classList.add(goed ? "is-juist" : "is-fout");
          if (!goed) s.parentNode.appendChild(maak("span", "koppel-juist", "→ " + v.items[n].juist));
        });
        feedback(blok, punten === v.items.length, v.uitleg || "");
        return { punten: punten, max: v.items.length };
      } };
    }
  };

  return { toon: toon, ontbreekt: ontbreekt, reactie: reactie };
})();
