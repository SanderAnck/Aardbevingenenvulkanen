/* =====================================================================
   Prenten bij de opdrachten uit de werkbundel
   ---------------------------------------------------------------------
   Missie, doelen, modellen, onderzoeken (klei, karton), de wereldkaart
   met lagen, het eiland Brombaai en de STEM-challenge.
   Elke prent is 800 breed en 450 hoog.
   ===================================================================== */
(function () {
  var F = window.FIG, P = window.PRENTEN;
  var Z = window.ZOLDER || { zolder: function () { return '<rect width="800" height="450" fill="#e2c595"/>'; } };

  // Een vinkje.
  function vink(x, y, s) {
    return F.plaats(x, y, s || 1, '<path d="M-10 0 L-3 8 L12 -10" fill="none" stroke="#3f8a3a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>');
  }

  // Een pijl van (x1,y1) naar (x2,y2).
  function pijl(x1, y1, x2, y2, kleur, dikte) {
    var hoek = Math.atan2(y2 - y1, x2 - x1), l = 14;
    var a1 = hoek + 2.6, a2 = hoek - 2.6;
    return '<path d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 +
      " M" + (x2 + l * Math.cos(a1)).toFixed(1) + " " + (y2 + l * Math.sin(a1)).toFixed(1) + " L" + x2 + " " + y2 +
      " L" + (x2 + l * Math.cos(a2)).toFixed(1) + " " + (y2 + l * Math.sin(a2)).toFixed(1) +
      '" fill="none" stroke="' + (kleur || "#1e4f8a") + '" stroke-width="' + (dikte || 4) + '" stroke-linecap="round" stroke-linejoin="round"/>';
  }

  // Een doorsnede van de aarde: een kwart is weggesneden.
  function doorsnede(cx, cy, r, nummers) {
    var lagen = [[1, "#7a4b2c"], [0.93, "#e8823a"], [0.52, "#f5b942"], [0.27, "#ffd166"]];
    var uit = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#2b6cb0"/>' +
      '<path d="M' + (cx - r * 0.8) + " " + (cy - r * 0.3) + " Q" + (cx - r * 0.4) + " " + (cy - r * 0.9) + " " + (cx + r * 0.1) + " " + (cy - r * 0.7) +
      " Q" + (cx - r * 0.2) + " " + (cy - r * 0.2) + " " + (cx - r * 0.8) + " " + (cy - r * 0.3) + ' Z" fill="#7fb35a"/>' +
      '<path d="M' + (cx - r * 0.6) + " " + (cy + r * 0.5) + " Q" + (cx - r * 0.2) + " " + (cy + r * 0.3) + " " + (cx - r * 0.1) + " " + (cy + r * 0.8) +
      " Q" + (cx - r * 0.5) + " " + (cy + r * 0.9) + " " + (cx - r * 0.6) + " " + (cy + r * 0.5) + ' Z" fill="#7fb35a"/>';
    // het weggesneden kwart (rechtsboven)
    lagen.forEach(function (l) {
      var rr = r * l[0];
      uit += '<path d="M' + cx + " " + cy + " L" + cx + " " + (cy - rr) + " A" + rr + " " + rr + " 0 0 1 " + (cx + rr) + " " + cy + ' Z" fill="' + l[1] + '"/>';
    });
    if (nummers) {
      var plekken = [[0.965, "1"], [0.73, "2"], [0.4, "3"], [0.12, "4"]];
      plekken.forEach(function (p) {
        var d = r * p[0], x = cx + d * 0.707, y = cy - d * 0.707;
        uit += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="15" fill="#fff" stroke="#3b2618" stroke-width="3"/>' +
          F.label(x.toFixed(1), (y + 7).toFixed(1), p[1], { grootte: 20 });
      });
    }
    return uit;
  }

  /* ---------- Hoofdstuk 1 ---------- */

  // 1.5 – Opa schrijft de grote vraag op het bord
  P.missie = function () {
    return F.svg(
      Z.zolder(false) +
      '<rect x="190" y="70" width="400" height="230" rx="8" fill="#2f4d3a" stroke="#8a5a3b" stroke-width="12"/>' +
      F.label(390, 120, "Onze grote vraag", { grootte: 22, kleur: "#ffd166" }) +
      F.label(390, 165, "Hoe is de aarde opgebouwd?", { grootte: 20, kleur: "#f6efe2", dik: false }) +
      F.label(390, 205, "Waarom liggen vulkanen en", { grootte: 20, kleur: "#f6efe2", dik: false }) +
      F.label(390, 235, "aardbevingen op bepaalde plaatsen?", { grootte: 20, kleur: "#f6efe2", dik: false }) +
      '<path d="M250 270 h40 M310 270 h70" stroke="#f6efe2" stroke-width="3" opacity=".5"/>' +
      F.opa(660, 440, 1.25, { arm: "wijs" }) +
      F.noor(110, 440, 1.15, { arm: "omhoog" }) +
      F.kiezel(250, 352, 1)
    );
  };

  // 1.6 en 11.3 – Het lijstje met doelen
  P.doelen = function () {
    var regels = "";
    for (var i = 0; i < 6; i++) {
      var y = 125 + i * 48;
      regels += '<rect x="300" y="' + (y - 16) + '" width="28" height="28" rx="5" fill="#fff" stroke="#3b2618" stroke-width="3"/>' +
        '<path d="M345 ' + y + " H" + (520 - (i % 3) * 30) + '" stroke="#9c8a73" stroke-width="6" stroke-linecap="round"/>' +
        (i < 3 ? vink(314, y - 2, 1) : "");
    }
    return F.svg(
      Z.zolder(true) +
      // klembord
      '<rect x="270" y="60" width="290" height="360" rx="14" fill="#c8935a" stroke="#7a4b2c" stroke-width="5"/>' +
      '<rect x="285" y="80" width="260" height="325" fill="#fffdf6"/>' +
      '<rect x="370" y="48" width="90" height="30" rx="8" fill="#9aa7b0" stroke="#5e6b73" stroke-width="3"/>' +
      regels +
      F.noor(150, 440, 1.2, { arm: "zwaai", mond: "blij" }) +
      F.kiezel(660, 360, 1.3)
    );
  };

  // 1.7 en 1.8 – Een globe en een doorsnede zijn modellen
  P.modellen = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#fbf4e6"/>' +
      '<rect y="360" width="800" height="90" fill="#c8935a"/>' +
      // globe op voet
      '<path d="M210 345 V365 M170 370 H250" stroke="#7a4b2c" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M90 220 A120 120 0 0 0 330 220" fill="none" stroke="#c9a372" stroke-width="8"/>' +
      '<circle cx="210" cy="220" r="110" fill="#2b6cb0"/>' +
      '<path d="M140 150 Q180 120 230 140 Q250 180 210 200 Q170 210 140 150 Z M220 230 Q270 220 290 260 Q270 300 240 310 Q220 280 220 230 Z M120 230 Q150 240 150 280 Q130 300 112 270 Z" fill="#7fb35a"/>' +
      '<path d="M100 220 H320 M210 110 V330" stroke="#ffffff" stroke-width="1.5" opacity=".4"/>' +
      F.label(210, 410, "een globe", { grootte: 22 }) +
      // doorsnede
      doorsnede(580, 220, 120, false) +
      F.label(580, 410, "een doorsnede", { grootte: 22 }) +
      F.label(400, 40, "Twee modellen van de aarde", { grootte: 22, kleur: "#7a4b2c" })
    );
  };

  /* ---------- Hoofdstuk 2 ---------- */

  // 2.4 – De kern: vloeibaar en vast
  P.kern = function () {
    var pijlen = "";
    for (var i = 0; i < 8; i++) {
      var h = i * Math.PI / 4;
      pijlen += pijl(Math.round(420 + 175 * Math.cos(h)), Math.round(225 + 175 * Math.sin(h)),
        Math.round(420 + 130 * Math.cos(h)), Math.round(225 + 130 * Math.sin(h)), "#fff6c2", 5);
    }
    return F.svg(
      '<rect width="800" height="450" fill="#a8401a"/>' +
      '<circle cx="420" cy="225" r="200" fill="#e8823a"/>' +
      '<g class="anim-golf" opacity=".6"><path d="M220 160 Q320 120 420 160 T620 160" fill="none" stroke="#f5b942" stroke-width="18"/>' +
      '<path d="M220 290 Q320 250 420 290 T620 290" fill="none" stroke="#f5b942" stroke-width="18"/></g>' +
      '<g class="anim-gloei"><circle cx="420" cy="225" r="120" fill="#fff1a8" opacity=".5"/></g>' +
      '<circle cx="420" cy="225" r="100" fill="#ffd166" stroke="#fff6c2" stroke-width="6"/>' +
      pijlen +
      F.label(420, 232, "binnenkern: vast", { grootte: 20, kleur: "#7a3a10" }) +
      F.label(715, 300, "buitenkern:", { grootte: 20, kleur: "#fff6c2" }) +
      F.label(715, 326, "vloeibaar", { grootte: 20, kleur: "#fff6c2" }) +
      F.label(715, 352, "metaal", { grootte: 20, kleur: "#fff6c2" }) +
      F.label(560, 112, "druk", { grootte: 20, kleur: "#fff6c2", rand: "#a8401a", anker: "start" }) +
      '<g class="anim-drijf">' + F.boorbol(110, 330, 0.85, { raam: "#ffe3a3" }) + "</g>"
    );
  };

  // 2.6 – Onderzoek 1: de aarde in klei
  P["klei-model"] = function () {
    return F.svg(
      Z.zolder(true) +
      '<rect x="120" y="290" width="560" height="22" fill="#8a5a3b"/>' +
      '<rect x="140" y="312" width="16" height="70" fill="#7a4b2c"/><rect x="644" y="312" width="16" height="70" fill="#7a4b2c"/>' +
      // bolletjes klei
      '<circle cx="200" cy="270" r="20" fill="#ffd166"/><circle cx="250" cy="266" r="24" fill="#f5b942"/>' +
      '<circle cx="310" cy="262" r="28" fill="#e8823a"/><ellipse cx="370" cy="282" rx="34" ry="8" fill="#7a4b2c"/>' +
      // doorgesneden kleibal
      F.plaats(0, 0, 1, doorsnede(540, 220, 70, false)) +
      // plastic mesje
      '<path d="M430 280 L470 230 L478 236 L440 286 Z" fill="#9fd3f0" stroke="#4d7ea8" stroke-width="2"/>' +
      F.label(400, 50, "Onderzoek 1: Hoe is de aarde opgebouwd?", { grootte: 22, kleur: "#7a4b2c", rand: "#fbf4e6" }) +
      F.noor(740, 440, 1, { arm: "omhoog" }) +
      F.kiezel(80, 400, 0.9)
    );
  };

  // 2.8 – Doorsnede met nummers (voor evaluatie 1)
  P["lagen-genummerd"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#fbf4e6"/>' +
      doorsnede(330, 235, 190, true) +
      F.label(620, 200, "Welke laag", { grootte: 24, kleur: "#7a4b2c" }) +
      F.label(620, 232, "is welk nummer?", { grootte: 24, kleur: "#7a4b2c" }) +
      F.kiezel(660, 330, 1.4)
    );
  };

  /* ---------- Hoofdstuk 3 ---------- */

  // 3.3, 3.4, 3.5 – De drie bewegingen, telkens met één in de kijker
  function beweging(nr) {
    var basis = P["drie-bewegingen"]();
    var x = [10, 275, 540];
    var sluier = "";
    x.forEach(function (xx, i) {
      if (i !== nr) sluier += '<rect x="' + xx + '" y="20" width="250" height="410" rx="16" fill="#fbf4e6" opacity=".72"/>';
      else sluier += '<rect x="' + (xx - 4) + '" y="16" width="258" height="418" rx="18" fill="none" stroke="#d9481f" stroke-width="6"/>';
    });
    return basis.replace("</svg>", sluier + "</svg>");
  }
  P["beweging-uit-elkaar"] = function () { return beweging(0); };
  P["beweging-naar-elkaar"] = function () { return beweging(1); };
  P["beweging-langs-elkaar"] = function () { return beweging(2); };

  // 3.6 tot 3.9 – Onderzoek 2: twee stukken karton
  P.karton = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#c8935a"/>' +
      '<path d="M0 120 H800 M0 250 H800 M0 380 H800" stroke="#b9854d" stroke-width="3"/>' +
      '<g class="anim-uit-elkaar-l"><path d="M110 120 L385 105 L392 340 L120 355 Z" fill="#d8b47c" stroke="#9c7a4a" stroke-width="4"/>' +
      '<path d="M150 160 H340 M150 200 H330" stroke="#c49e64" stroke-width="3"/></g>' +
      '<g class="anim-uit-elkaar-r"><path d="M408 110 L680 125 L672 360 L402 345 Z" fill="#cfa66b" stroke="#9c7a4a" stroke-width="4"/>' +
      '<path d="M450 170 H640 M450 210 H630" stroke="#bb9358" stroke-width="3"/></g>' +
      F.label(250, 260, "plaat 1", { grootte: 24, kleur: "#5e3a24" }) +
      F.label(540, 265, "plaat 2", { grootte: 24, kleur: "#5e3a24" }) +
      pijl(250, 400, 140, 400, "#1e4f8a", 5) + pijl(550, 400, 660, 400, "#1e4f8a", 5) +
      pijl(360, 60, 420, 60, "#d9481f", 5) + pijl(440, 80, 380, 80, "#d9481f", 5) +
      F.label(400, 40, "uit elkaar, naar elkaar of langs elkaar?", { grootte: 18, kleur: "#5e3a24" }) +
      F.kiezel(740, 400, 1)
    );
  };

  /* ---------- Hoofdstuk 4 en 7 ---------- */

  // 4.5 en 7.3 – Gevolgen van een aardbeving
  P["gevolgen-beving"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#cfe7f5"/>' +
      '<path d="M0 220 Q200 190 400 210 T800 200 V450 H0 Z" fill="#8fbf6a"/>' +
      // weg met scheur
      '<path d="M300 450 L370 210 L430 210 L520 450 Z" fill="#6c6f75"/>' +
      '<path d="M400 230 V260 M400 290 V330 M400 370 V420" stroke="#f6efe2" stroke-width="5"/>' +
      '<path d="M330 330 L370 320 L380 340 L420 328 L430 350 L480 336 L500 350" fill="none" stroke="#2b2b2b" stroke-width="7" stroke-linejoin="round"/>' +
      // omgevallen boom
      '<path d="M120 250 L210 220" stroke="#7a4b2c" stroke-width="12" stroke-linecap="round"/>' +
      '<circle cx="225" cy="214" r="34" fill="#5f8f3f"/><circle cx="250" cy="226" r="24" fill="#6f9b4f"/>' +
      '<path d="M110 255 l-8 10 M118 258 l2 12" stroke="#7a4b2c" stroke-width="5"/>' +
      // rivier met een nieuwe bocht
      '<path d="M560 220 Q600 270 590 320 Q580 370 660 410 Q720 440 800 430 V450 H640 Q560 420 560 360 Q570 300 540 220 Z" fill="#5aa7d6"/>' +
      '<path d="M600 300 Q660 290 690 330" fill="none" stroke="#5aa7d6" stroke-width="16" stroke-dasharray="10 8" opacity=".8"/>' +
      // beschadigd huis
      F.plaats(0, 0, 1, '<g transform="rotate(-6 700 210)">' + F.huisje(700, 215, 1.4) + "</g>") +
      '<path d="M690 165 L700 180 L692 190 L702 205" fill="none" stroke="#2b2b2b" stroke-width="3"/>' +
      F.label(150, 300, "bomen vallen om", { grootte: 16 }) +
      F.label(400, 195, "wegen scheuren", { grootte: 16 }) +
      F.label(690, 255, "rivieren veranderen", { grootte: 16, kleur: "#1e4f8a" })
    );
  };

  /* ---------- Hoofdstuk 8 ---------- */

  // 8.5 – Bij as in de lucht: binnen blijven
  P["as-binnen"] = function () {
    var as = "";
    for (var i = 0; i < 40; i++) as += '<circle cx="' + (470 + (i * 37) % 250) + '" cy="' + (70 + (i * 53) % 220) + '" r="' + (2 + i % 3) + '" fill="#8a857b"/>';
    return F.svg(
      '<rect width="800" height="450" fill="#f3e3bf"/>' +
      '<rect y="360" width="800" height="90" fill="#b98a5a"/>' +
      // raam met as buiten
      '<rect x="460" y="60" width="260" height="230" fill="#b9b4aa"/>' +
      '<g class="anim-regen">' + as + "</g>" +
      '<path d="M460 230 Q520 210 600 230 T720 220 V290 H460 Z" fill="#8a857b"/>' +
      '<rect x="460" y="60" width="260" height="230" fill="none" stroke="#7a4b2c" stroke-width="10"/>' +
      '<path d="M590 60 V290" stroke="#7a4b2c" stroke-width="8"/>' +
      F.label(590, 320, "ramen en deuren dicht", { grootte: 16 }) +
      // radio
      '<rect x="300" y="300" width="110" height="60" rx="10" fill="#5e6b73"/><circle cx="330" cy="330" r="16" fill="#3f4a52"/>' +
      '<path d="M360 316 H395 M360 330 H395 M360 344 H395" stroke="#c9c0ad" stroke-width="3"/>' +
      '<path d="M390 300 L410 262" stroke="#3f4a52" stroke-width="4"/>' +
      F.label(355, 390, "luister naar de hulpdiensten", { grootte: 16 }) +
      // Noor met mondmasker
      F.noor(180, 440, 1.3) +
      '<path d="M155 285 Q180 280 205 285 L202 302 Q180 312 158 302 Z" fill="#ffffff" stroke="#9fb5c7" stroke-width="2"/>' +
      '<path d="M156 288 L140 280 M204 288 L220 280" stroke="#9fb5c7" stroke-width="2"/>'
    );
  };

  /* ---------- Hoofdstuk 9 ---------- */

  // 9.1 tot 9.10 – Het eiland Brombaai
  P.brombaai = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#9fd3f0"/>' +
      '<rect y="170" width="800" height="280" fill="#2b6cb0"/>' +
      F.golfjes(200, "#cfe9fb") + F.golfjes(400, "#cfe9fb") +
      // eiland
      '<path d="M90 290 Q110 200 230 180 Q380 150 520 175 Q660 190 700 260 Q690 300 560 305 Q400 315 250 312 Q120 314 90 290 Z" fill="#c8a35a"/>' +
      '<path d="M120 280 Q150 215 240 198 Q380 172 510 192 Q640 205 670 258 Q600 285 420 290 Q260 295 120 280 Z" fill="#7fb35a"/>' +
      // vulkaan
      '<path d="M140 270 L250 120 Q265 112 280 120 L380 270 Z" fill="#6b4a3a"/>' +
      '<path d="M250 120 Q265 112 280 120 L270 140 L262 132 L256 142 Z" fill="#e8572a"/>' +
      F.rook(265, 110, 0.9, "#cfc8c0") +
      F.label(260, 70, "vulkaan", { grootte: 16, kleur: "#3b2618", rand: "#fff" }) +
      // dorp
      F.huisje(430, 260, 0.8) + F.huisje(480, 250, 0.8, "#dbe8f5") + F.huisje(530, 262, 0.8, "#f5d6c6") +
      '<rect x="465" y="200" width="8" height="40" fill="#7a4b2c"/><path d="M455 200 L469 180 L483 200 Z" fill="#b5462a"/>' +
      F.label(480, 165, "dorp", { grootte: 16, kleur: "#3b2618", rand: "#fff" }) +
      // haven met bootje
      '<path d="M640 270 H730 V282 H640 Z" fill="#8a5a3b"/>' +
      '<g class="anim-drijf"><path d="M700 300 H760 L748 318 H712 Z" fill="#f6efe2" stroke="#3b2618" stroke-width="2"/><path d="M728 300 V270 L750 296 Z" fill="#d9481f"/></g>' +
      F.label(685, 262, "haven", { grootte: 16, kleur: "#3b2618", rand: "#fff" }) +
      // plaatgrens in de zee
      '<path d="M0 360 Q200 330 420 330 Q620 330 800 350" fill="none" stroke="#fbe2a0" stroke-width="5" stroke-dasharray="16 10"/>' +
      F.label(140, 385, "plaatgrens", { grootte: 16, kleur: "#fbe2a0" }) +
      F.label(400, 40, "Brombaai", { grootte: 30, kleur: "#1e4f8a", rand: "#fff" })
    );
  };

  /* ---------- Hoofdstuk 10: STEM-challenge ---------- */

  // Een klein huisje van stokjes met driehoeken (schoren).
  function stokjesHuis(x, y, s, schoren) {
    var k = "#a8743f";
    return F.plaats(x, y, s,
      '<g stroke="' + k + '" stroke-width="6" stroke-linecap="round" fill="none">' +
      '<path d="M-60 0 V-90 H60 V0 M-60 -45 H60 M0 0 V-90 M-70 -88 L0 -150 L70 -88"/>' +
      (schoren ? '<path d="M-60 0 L0 -45 M0 0 L60 -45 M-60 -45 L0 -90 M0 -45 L60 -90"/>' : "") +
      "</g>" +
      '<g fill="#ffd166"><circle cx="-60" cy="0" r="6"/><circle cx="60" cy="0" r="6"/><circle cx="-60" cy="-90" r="6"/><circle cx="60" cy="-90" r="6"/><circle cx="0" cy="-150" r="6"/></g>');
  }

  // 10.1 – De burgemeester belt
  P.burgemeester = function () {
    return F.svg(
      Z.zolder(true) +
      F.opa(200, 440, 1.3, { arm: "omhoog" }) +
      // telefoon in de hand
      '<rect x="250" y="210" width="24" height="44" rx="6" fill="#3f4a52"/>' +
      // tekstballon met de vraag
      '<path d="M360 60 H740 Q760 60 760 80 V260 Q760 280 740 280 H420 L370 320 L390 280 H360 Q340 280 340 260 V80 Q340 60 360 60 Z" fill="#fff" stroke="#3b2618" stroke-width="3"/>' +
      F.label(550, 100, "Kunnen jullie een huis bouwen", { grootte: 18 }) +
      F.label(550, 126, "dat een aardbeving doorstaat?", { grootte: 18 }) +
      '<g class="anim-tril-zacht">' + stokjesHuis(550, 255, 0.75, false) + "</g>" +
      '<path d="M470 250 l-12 -8 l12 -8 M630 250 l12 -8 l-12 -8" fill="none" stroke="#d9481f" stroke-width="4"/>' +
      F.kiezel(110, 400, 0.9)
    );
  };

  // 10.2 – Het materiaal
  P.materialen = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#c8935a"/>' +
      // rietjes
      '<g stroke-width="10" stroke-linecap="round"><path d="M60 80 L260 60" stroke="#e8572a"/><path d="M60 105 L260 85" stroke="#2b6cb0"/><path d="M60 130 L260 110" stroke="#6f9b4f"/></g>' +
      F.label(160, 160, "rietjes", { grootte: 18 }) +
      // stokjes
      '<g stroke="#e2c08a" stroke-width="7" stroke-linecap="round"><path d="M320 70 L520 70"/><path d="M320 90 L520 90"/><path d="M320 110 L520 110"/></g>' +
      F.label(420, 160, "stokjes", { grootte: 18 }) +
      // karton en papier
      '<rect x="580" y="50" width="160" height="100" fill="#d8b47c" stroke="#9c7a4a" stroke-width="3"/><rect x="600" y="70" width="120" height="70" fill="#fffdf6" transform="rotate(-6 660 105)"/>' +
      F.label(660, 180, "papier en karton", { grootte: 18 }) +
      // plakband
      '<circle cx="130" cy="300" r="50" fill="#e6e2d6" stroke="#b7b1a2" stroke-width="4"/><circle cx="130" cy="300" r="24" fill="#c8935a"/>' +
      F.label(130, 385, "plakband", { grootte: 18 }) +
      // elastiekjes
      '<g fill="none" stroke-width="5"><circle cx="300" cy="300" r="26" stroke="#d9481f"/><circle cx="320" cy="292" r="22" stroke="#f59e0b"/><circle cx="292" cy="318" r="20" stroke="#7a3f8f"/></g>' +
      F.label(305, 385, "elastiekjes", { grootte: 18 }) +
      // touw
      '<path d="M420 270 q20 -30 40 0 t40 0 t40 0 q10 30 -30 40 q-40 10 -60 -10" fill="none" stroke="#f3e3bf" stroke-width="6" stroke-linecap="round"/>' +
      F.label(480, 385, "touw", { grootte: 18 }) +
      // paperclips
      '<g fill="none" stroke="#5e6b73" stroke-width="4"><path d="M640 270 v50 a12 12 0 0 0 24 0 v-60 a8 8 0 0 0 -16 0 v50"/><path d="M690 280 v50 a12 12 0 0 0 24 0 v-60 a8 8 0 0 0 -16 0 v50"/></g>' +
      F.label(680, 385, "paperclips", { grootte: 18 }) +
      F.label(400, 435, "Let op: niet onbeperkt!", { grootte: 20, kleur: "#7a1f10" })
    );
  };

  // 10.3 – Vierkant, rechthoek en driehoek
  P.vormen = function () {
    var k = 'stroke="#a8743f" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"';
    var bol = function (pts) { return pts.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="8" fill="#ffd166"/>'; }).join(""); };
    return F.svg(
      '<rect width="800" height="450" fill="#fbf4e6"/>' +
      // vierkant: vervormt
      '<path d="M60 330 L200 330 L200 190 L60 190 Z" stroke="#c9c0ad" stroke-width="4" stroke-dasharray="8 6" fill="none"/>' +
      '<path d="M60 330 L200 330 L250 190 L110 190 Z" ' + k + "/>" + bol([[60, 330], [200, 330], [250, 190], [110, 190]]) +
      pijl(70, 150, 120, 150, "#d9481f", 5) +
      F.label(150, 380, "vierkant", { grootte: 20 }) + F.label(150, 410, "valt scheef", { grootte: 16, kleur: "#d9481f", dik: false }) +
      // rechthoek: vervormt ook
      '<path d="M300 330 L470 330 L470 230 L300 230 Z" stroke="#c9c0ad" stroke-width="4" stroke-dasharray="8 6" fill="none"/>' +
      '<path d="M300 330 L470 330 L510 230 L340 230 Z" ' + k + "/>" + bol([[300, 330], [470, 330], [510, 230], [340, 230]]) +
      pijl(310, 190, 360, 190, "#d9481f", 5) +
      F.label(400, 380, "rechthoek", { grootte: 20 }) + F.label(400, 410, "valt scheef", { grootte: 16, kleur: "#d9481f", dik: false }) +
      // driehoek: blijft
      '<path d="M570 330 L740 330 L655 180 Z" ' + k + "/>" + bol([[570, 330], [740, 330], [655, 180]]) +
      pijl(600, 160, 640, 175, "#d9481f", 5) +
      F.label(655, 380, "driehoek", { grootte: 20 }) + F.label(655, 410, "blijft staan!", { grootte: 16, kleur: "#3f8a3a" }) +
      F.label(400, 50, "Duw tegen een hoek. Wat gebeurt er?", { grootte: 22, kleur: "#7a4b2c" })
    );
  };

  // 10.7 en 10.10 – Samen bouwen
  P.bouwen = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#f3e3bf"/>' +
      '<rect y="300" width="800" height="150" fill="#c8935a"/>' +
      '<rect x="220" y="300" width="360" height="16" fill="#8a5a3b"/>' +
      stokjesHuis(400, 300, 1.1, true) +
      // plakband en stokjes op tafel
      '<circle cx="610" cy="345" r="22" fill="#e6e2d6" stroke="#b7b1a2" stroke-width="3"/><circle cx="610" cy="345" r="10" fill="#c8935a"/>' +
      '<path d="M230 350 L330 340 M235 365 L335 355" stroke="#e2c08a" stroke-width="6" stroke-linecap="round"/>' +
      F.noor(130, 440, 1.2, { arm: "omhoog", mond: "blij" }) +
      F.opa(700, 440, 1.1, { knipoog: true }) +
      F.kiezel(520, 285, 0.8) +
      F.label(400, 50, "Overleg, bouw en pas aan", { grootte: 22, kleur: "#7a4b2c" })
    );
  };

  // 10.8 en 10.11 – Het aardbevingsplatform
  P.trilplaat = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#f3e3bf"/>' +
      '<rect y="330" width="800" height="120" fill="#c8935a"/>' +
      // tafel
      '<rect x="150" y="300" width="500" height="20" fill="#8a5a3b"/>' +
      '<rect x="170" y="320" width="16" height="110" fill="#7a4b2c"/><rect x="614" y="320" width="16" height="110" fill="#7a4b2c"/>' +
      // platform op rolletjes, dat heen en weer schuift
      '<g class="anim-tril">' +
        '<circle cx="290" cy="292" r="8" fill="#5e6b73"/><circle cx="510" cy="292" r="8" fill="#5e6b73"/>' +
        '<rect x="250" y="270" width="300" height="16" rx="4" fill="#9aa7b0" stroke="#5e6b73" stroke-width="3"/>' +
        stokjesHuis(400, 270, 0.9, true) +
      "</g>" +
      pijl(220, 230, 160, 230, "#d9481f", 5) + pijl(580, 230, 640, 230, "#d9481f", 5) +
      // drie testen
      '<g font-family="Verdana, Arial, sans-serif">' +
      '<rect x="40" y="40" width="200" height="40" rx="10" fill="#fff" stroke="#6f9b4f" stroke-width="3"/>' +
      '<rect x="300" y="40" width="200" height="40" rx="10" fill="#fff" stroke="#f59e0b" stroke-width="3"/>' +
      '<rect x="560" y="40" width="200" height="40" rx="10" fill="#fff" stroke="#d9481f" stroke-width="3"/></g>' +
      F.label(140, 67, "Test 1: zacht", { grootte: 17 }) +
      F.label(400, 67, "Test 2: sterker", { grootte: 17 }) +
      F.label(660, 67, "Test 3: sterkst", { grootte: 17 }) +
      F.kiezel(720, 290, 0.9)
    );
  };

  /* ---------- Hoofdstuk 6: wereldkaart met lagen ----------
     Eenvoudige kaart (lengte- en breedtegraad). De lagen hebben een
     klasse, zodat de opdracht ze aan en uit kan zetten:
       .laag-vulkanen  .laag-bevingen  .laag-grenzen                  */

  function pt(lon, lat) { return [((lon + 180) / 360 * 800), ((90 - lat) / 180 * 400 + 25)]; }

  function vorm(punten, kleur) {
    return '<path d="M' + punten.map(function (p) { var q = pt(p[0], p[1]); return q[0].toFixed(0) + " " + q[1].toFixed(0); }).join(" L") +
      ' Z" fill="' + kleur + '"/>';
  }

  // Een lijn; ze wordt gebroken waar ze over de rand van de kaart gaat.
  function lijn(punten) {
    var d = "", vorig = null;
    punten.forEach(function (p) {
      var q = pt(p[0], p[1]);
      d += (vorig && Math.abs(q[0] - vorig[0]) < 400 ? " L" : " M") + q[0].toFixed(0) + " " + q[1].toFixed(0);
      vorig = q;
    });
    return '<path d="' + d + '" fill="none" stroke="#d9481f" stroke-width="3.5" stroke-dasharray="9 6" stroke-linejoin="round"/>';
  }

  var LAND = [
    // Noord-Amerika
    [[-165, 65], [-140, 70], [-100, 72], [-80, 70], [-62, 56], [-66, 45], [-80, 32], [-81, 25], [-97, 22], [-92, 16], [-80, 8], [-87, 14], [-105, 20], [-115, 30], [-124, 40], [-125, 50], [-150, 60], [-165, 60]],
    // Groenland
    [[-50, 82], [-25, 81], [-20, 70], [-44, 60], [-54, 68]],
    // Zuid-Amerika
    [[-78, 9], [-60, 10], [-50, 0], [-35, -7], [-40, -22], [-56, -35], [-68, -55], [-75, -48], [-72, -20], [-81, -5]],
    // Europa
    [[-10, 36], [-2, 43], [-5, 48], [4, 52], [9, 56], [5, 62], [16, 70], [30, 71], [42, 66], [40, 45], [28, 41], [22, 37], [16, 38], [12, 44], [3, 40], [-6, 36]],
    // Afrika
    [[-17, 15], [-16, 28], [-6, 36], [10, 37], [32, 31], [43, 12], [51, 12], [41, -2], [40, -15], [33, -27], [20, -35], [12, -18], [9, 4], [-8, 4]],
    // Azië
    [[40, 45], [42, 66], [60, 70], [100, 77], [140, 72], [180, 68], [162, 58], [140, 52], [130, 42], [122, 30], [109, 20], [105, 9], [100, 14], [94, 17], [80, 8], [73, 20], [58, 25], [50, 30], [36, 36], [28, 41]],
    // Japan
    [[130, 32], [136, 34], [141, 37], [145, 44], [141, 43], [139, 38], [132, 35]],
    // Indonesië
    [[95, 5], [106, -6], [116, -8], [125, -9], [120, -5], [110, -2], [100, 2]],
    [[128, 0], [141, -3], [150, -10], [140, -8]],
    // Australië
    [[114, -22], [130, -12], [142, -11], [153, -27], [146, -39], [131, -32], [115, -34]],
    // Nieuw-Zeeland
    [[172, -35], [178, -38], [174, -42], [167, -46], [171, -42]],
    // IJsland
    [[-24, 66], [-14, 66], [-14, 64], [-22, 63]],
    // Groot-Brittannië
    [[-5, 50], [1, 51], [-1, 55], [-3, 58], [-6, 56]],
    // Antarctica
    [[-180, -70], [180, -70], [180, -90], [-180, -90]]
  ];

  var GRENZEN = [
    // Midden-Atlantische rug
    [[-15, -55], [-14, -35], [-13, -10], [-15, 0], [-30, 10], [-45, 20], [-40, 35], [-29, 45], [-28, 55], [-20, 63], [-17, 67], [-5, 73], [5, 80]],
    // rond de Grote Oceaan (Amerika)
    [[-74, -55], [-72, -35], [-76, -15], [-81, 0], [-92, 12], [-105, 20], [-115, 30], [-125, 40], [-130, 52], [-150, 57], [-170, 52], [-180, 51]],
    // rond de Grote Oceaan (Azië en Oceanië)
    [[180, 51], [165, 54], [156, 48], [145, 42], [142, 34], [142, 24], [145, 14], [130, 6], [126, -2], [130, -8], [120, -11], [105, -8], [95, 3], [94, 12]],
    [[130, -8], [145, -6], [156, -7], [167, -13], [176, -20], [180, -24]],
    [[-180, -24], [-176, -32], [-178, -38], [179, -45], [170, -52]],
    // van Spanje tot de Himalaya
    [[-10, 36], [10, 37], [20, 37], [28, 35], [40, 37], [50, 31], [60, 27], [70, 31], [82, 30], [92, 28], [97, 24], [94, 12]],
    // Oost-Afrika
    [[42, 12], [39, 6], [36, -4], [35, -15]],
    // Oost-Pacifische rug
    [[-105, 20], [-106, 0], [-112, -20], [-116, -40], [-120, -55]],
    // Indische Oceaan
    [[44, 12], [58, 13], [66, 0], [68, -25], [78, -45]]
  ];

  var VULKANEN = [
    [-19, 64], [15, 37.7], [14.4, 40.8], [15.2, 38.8], [-155.3, 19.4], [37.4, -3], [29.2, -1.5], [138.7, 35.4], [141, 42],
    [105.4, -6.1], [110.4, -7.5], [120.3, 15.1], [-122.2, 46.2], [-121.8, 40.5], [-98.6, 19], [-90.9, 14.5], [-78.4, -0.7], [-71.9, -39.4], [-69, -18],
    [160, 54.5], [155, 50], [-170, 53], [-153, 59], [175.6, -39.3], [-175.4, -20.5], [168, -16], [-28, 38.7], [-16.6, 28.3], [125.4, 1.3], [130.7, 31.6], [-84.7, 10.5]
  ];

  var BEVINGEN = [
    [85, 28], [37, 37.2], [55, 30], [103, 31], [142, 38], [139, 35], [-72.5, -36], [-71, -30], [-77, -12], [-99, 17], [-150, 61], [-118, 34], [-122.5, 37.7],
    [95.9, 3.3], [13.4, 42.3], [22, 38], [174, -41.5], [-72.5, 18.5], [160, 52], [125, 10], [121, 24], [-79, 0], [70, 36], [44, 39], [29, 40.7],
    [-30, 15], [-40, 33], [128, -3], [-176, -28], [167, -15], [-88, 13], [-68, -22], [-155, 19.5], [-16, 66]
  ];

  P["wereldkaart-lagen"] = function () {
    var land = LAND.map(function (v) { return vorm(v, "#c9b98f"); }).join("");
    var vulk = VULKANEN.map(function (p) {
      var q = pt(p[0], p[1]);
      return '<path d="M' + (q[0] - 6).toFixed(1) + " " + (q[1] + 5).toFixed(1) + " L" + q[0].toFixed(1) + " " + (q[1] - 7).toFixed(1) + " L" + (q[0] + 6).toFixed(1) + " " + (q[1] + 5).toFixed(1) + ' Z" fill="#b5261b" stroke="#fff" stroke-width="1.2"/>';
    }).join("");
    var bev = BEVINGEN.map(function (p) {
      var q = pt(p[0], p[1]);
      return '<circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="5" fill="#f5c518" stroke="#7a5a00" stroke-width="1.5"/>';
    }).join("");
    var be = pt(4.5, 50.8);
    return F.svg(
      '<rect width="800" height="450" fill="#9cc9ee"/>' +
      land +
      '<circle cx="' + be[0].toFixed(1) + '" cy="' + be[1].toFixed(1) + '" r="3" fill="#1e4f8a"/>' +
      '<g class="laag-grenzen">' + GRENZEN.map(lijn).join("") + "</g>" +
      '<g class="laag-bevingen">' + bev + "</g>" +
      '<g class="laag-vulkanen">' + vulk + "</g>" +
      F.label(80, 250, "Grote", { grootte: 13, kleur: "#1e4f8a", dik: false }) +
      F.label(80, 264, "Oceaan", { grootte: 13, kleur: "#1e4f8a", dik: false }) +
      F.label(320, 210, "Atlantische", { grootte: 12, kleur: "#1e4f8a", dik: false }) +
      F.label(320, 224, "Oceaan", { grootte: 12, kleur: "#1e4f8a", dik: false })
    );
  };

  /* ---------- Aanpassingen aan oudere prenten ---------- */

  // 2.2 – De perzik: nu met vier lagen (korst, mantel, buitenkern, binnenkern)
  var oudePerzik = P.perzik;
  P.perzik = function () {
    return oudePerzik()
      .replace('<g class="anim-gloei"><circle cx="210" cy="235" r="72" fill="#f5b942"/></g>', '<g class="anim-gloei"><circle cx="210" cy="235" r="85" fill="#f5b942"/></g>')
      .replace('<circle cx="210" cy="235" r="56" fill="#ffd166"/>', '<circle cx="210" cy="235" r="42" fill="#ffd166" stroke="#fff6c2" stroke-width="3"/>');
  };

  // 4.4 – De kringen: ook het hypocentrum (diep in de grond) krijgt een naam
  var oudeKringen = P.kringen;
  P.kringen = function () {
    return oudeKringen().replace("</svg>",
      F.label(632, 398, "hypocentrum", { grootte: 15, kleur: "#fff6c2", anker: "start" }) + "</svg>");
  };
})();
