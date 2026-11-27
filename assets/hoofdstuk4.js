/* Prenten van hoofdstuk 4 – Hoe een vulkaan ontstaat */
(function () {
  var F = window.FIG, P = window.PRENTEN;

  // Een fles bruiswater. open = dop eraf en het spuit.
  function fles(x, y, open) {
    var bubbels = "";
    [[-14, 60], [10, 30], [-4, 0], [14, -30], [-10, -50]].forEach(function (b, i) {
      bubbels += '<g class="anim-bubbel' + (i % 3 ? "-" + (i % 3 + 1) : "") + '"><circle cx="' + b[0] + '" cy="' + b[1] + '" r="' + (4 + i % 3) + '" fill="#e8f7ff"/></g>';
    });
    var top = open
      ? '<g class="anim-vonk"><circle cx="-10" cy="-150" r="9" fill="#e8f7ff"/></g>' +
        '<g class="anim-vonk-2"><circle cx="12" cy="-160" r="11" fill="#e8f7ff"/></g>' +
        '<g class="anim-vonk-3"><circle cx="0" cy="-140" r="8" fill="#e8f7ff"/></g>' +
        '<path d="M-14 -112 Q-40 -170 -60 -190 M0 -112 Q0 -180 4 -210 M14 -112 Q40 -170 64 -186" fill="none" stroke="#e8f7ff" stroke-width="10" stroke-linecap="round"/>' +
        '<rect x="34" y="-140" width="26" height="14" rx="4" fill="#d9481f" transform="rotate(30 47 -133)"/>'
      : '<rect x="-15" y="-126" width="30" height="16" rx="4" fill="#d9481f"/>';
    return F.plaats(x, y, 1,
      '<path d="M-12 -112 L12 -112 L14 -80 Q42 -60 42 -20 V96 Q42 110 28 110 H-28 Q-42 110 -42 96 V-20 Q-42 -60 -14 -80 Z" fill="#9fd8c6" stroke="#3f7f6c" stroke-width="4" opacity=".95"/>' +
      '<rect x="-42" y="-6" width="84" height="40" fill="#1e4f8a"/>' +
      '<text x="0" y="21" text-anchor="middle" font-size="15" font-weight="bold" fill="#fff">BRUIS</text>' +
      bubbels + top);
  }

  // 4.1 – Doorsnede van een vulkaan
  P["doorsnede-vulkaan"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#a9d6f0"/>' +
      // ondergrond
      '<rect y="300" width="800" height="150" fill="#8a5a3b"/>' +
      '<path d="M0 340 H800 M0 380 H800" stroke="#7a4b2c" stroke-width="6" opacity=".6"/>' +
      // berg (doorgesneden)
      '<path d="M170 300 L380 118 L460 118 L670 300 Z" fill="#9c7a5b"/>' +
      '<path d="M230 250 L610 250 M290 200 L550 200 M340 155 L500 155" stroke="#8a6a4d" stroke-width="5"/>' +
      // schoorsteen
      '<rect x="408" y="118" width="24" height="250" fill="#ff5a1f"/>' +
      '<g class="anim-gloei"><rect x="414" y="118" width="12" height="250" fill="#ffd166"/></g>' +
      // magmakamer
      '<g class="anim-gloei"><ellipse cx="420" cy="395" rx="135" ry="50" fill="#ffd166" opacity=".55"/></g>' +
      '<ellipse cx="420" cy="395" rx="115" ry="38" fill="#ff5a1f"/>' +
      '<ellipse cx="420" cy="392" rx="80" ry="22" fill="#ffb347"/>' +
      // krater
      '<path d="M380 118 Q420 134 460 118" fill="#5e3a24"/>' +
      F.rook(420, 110, 1.1) +
      // labels
      F.label(560, 410, "magmakamer", { grootte: 16, kleur: "#fff", rand: "#5e3a24", anker: "start" }) +
      F.label(445, 280, "schoorsteen", { grootte: 16, kleur: "#fff", rand: "#5e3a24", anker: "start" }) +
      F.label(475, 112, "krater", { grootte: 16, kleur: "#fff", rand: "#5e3a24", anker: "start" }) +
      F.boorbol(100, 230, 0.7, { raam: "#cfe9a8" })
    );
  };

  function flesAchtergrond(uitbarsting) {
    return '<rect width="800" height="450" fill="#cfe7f5"/>' +
      '<rect y="360" width="800" height="90" fill="#9cbf7a"/>' +
      // vulkaan in de verte
      '<path d="M540 360 L650 220 L690 220 L800 330 L800 360 Z" fill="#9c7a5b"/>' +
      (uitbarsting
        ? '<path d="M650 220 Q670 232 690 220 Z" fill="#ff5a1f"/>' +
          '<g class="anim-vonk"><circle cx="660" cy="200" r="7" fill="#ff7a3d"/></g><g class="anim-vonk-2"><circle cx="680" cy="196" r="6" fill="#ffb347"/></g>' +
          F.rook(670, 214, 0.8)
        : F.rook(670, 214, 0.6));
  }

  // 4.2a – Opa met de fles bruiswater
  P["fles-dicht"] = function () {
    return F.svg(flesAchtergrond(false) +
      F.opa(440, 420, 1.6, { arm: "wijs" }) +
      fles(255, 270, false) +
      F.noor(120, 420, 1.3));
  };

  // 4.2b – Pssssj!
  P["fles-open"] = function () {
    return F.svg(flesAchtergrond(true) +
      F.opa(440, 420, 1.6, { arm: "omhoog" }) +
      fles(255, 270, true) +
      F.label(400, 70, "PSSSJ!", { grootte: 40, kleur: "#1e4f8a", rand: "#fff" }) +
      F.noor(120, 420, 1.3, { mond: "o" }));
  };

  // 4.3 – Een vulkaan groeit laagje per laagje
  P["vulkaan-groeit"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#cfe7f5"/>' +
      '<rect y="410" width="800" height="40" fill="#9cbf7a"/>' +
      '<path d="M130 420 L670 420 L570 350 L230 350 Z" fill="#7a4b2c"/>' +
      '<g class="anim-groei-1"><path d="M230 352 L570 352 L505 290 L295 290 Z" fill="#9c7a5b"/></g>' +
      '<g class="anim-groei-2"><path d="M295 292 L505 292 L452 232 L348 232 Z" fill="#6e4a30"/></g>' +
      '<g class="anim-groei-3"><path d="M348 234 L452 234 L420 184 L380 184 Z" fill="#9c7a5b"/>' +
        '<path d="M392 186 Q398 210 388 232 M408 186 Q404 214 414 232" fill="none" stroke="#ff5a1f" stroke-width="5" stroke-linecap="round"/></g>' +
      // taart ernaast
      F.plaats(690, 400, 1,
        '<rect x="-46" y="-30" width="92" height="30" fill="#f3c98b"/><rect x="-38" y="-56" width="76" height="26" fill="#f08a5d"/>' +
        '<rect x="-28" y="-78" width="56" height="22" fill="#f3c98b"/><path d="M-28 -78 h56" stroke="#fff" stroke-width="6"/>' +
        '<rect x="-2" y="-96" width="4" height="18" fill="#d9481f"/><g class="anim-gloei"><circle cx="0" cy="-100" r="5" fill="#ffd166"/></g>') +
      F.label(690, 440, "net een taart", { grootte: 15 }) +
      F.kiezel(150, 395, 1)
    );
  };

  // 4.4 – Keuzemoment: Italië of Hawaï?
  P["kaart-keuze"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#2b6cb0"/>' +
      F.golfjes(400, "#9cc9ee") + F.golfjes(80, "#9cc9ee") +
      // Italië (laars) links
      '<path d="M120 70 Q170 60 200 80 Q196 120 214 150 Q240 180 262 200 Q280 214 270 230 Q252 226 236 214 Q222 236 210 230 Q206 206 186 186 Q160 160 150 130 Q120 110 120 70 Z" fill="#7fb35a"/>' +
      '<path d="M200 260 Q226 252 246 262 Q230 278 200 260 Z" fill="#7fb35a"/>' +
      '<path d="M268 250 L280 234 L292 250 Z" fill="#9c7a5b"/>' +
      '<g class="anim-vonk"><circle cx="280" cy="228" r="5" fill="#ff7a3d"/></g><g class="anim-vonk-2"><circle cx="284" cy="226" r="4" fill="#ffd166"/></g>' +
      F.label(190, 320, "Italië", { grootte: 26, kleur: "#fff", rand: "#1e4f8a" }) +
      F.label(190, 350, "spuit als een fontein", { grootte: 15, kleur: "#ffe3a3" }) +
      // Hawaï rechts
      '<path d="M600 230 Q650 200 710 222 Q730 250 700 270 Q640 284 610 264 Q590 248 600 230 Z" fill="#6f9b4f"/>' +
      '<path d="M560 180 Q574 172 584 182 Q574 192 560 180 Z M530 160 Q540 154 548 162 Q538 168 530 160 Z" fill="#6f9b4f"/>' +
      '<path d="M620 246 Q655 222 690 244 Z" fill="#9c7a5b"/>' +
      '<path d="M652 236 Q648 252 640 262" fill="none" stroke="#ff5a1f" stroke-width="4" class="anim-stroom"/>' +
      F.label(650, 320, "Hawaï", { grootte: 26, kleur: "#fff", rand: "#1e4f8a" }) +
      F.label(650, 350, "borrelt rustig", { grootte: 15, kleur: "#ffe3a3" }) +
      // Boorbol in het midden met twee pijlen
      F.boorbol(420, 170, 0.8) +
      '<path d="M350 180 Q310 200 290 214 M300 196 L288 216 L310 214" fill="none" stroke="#ffd166" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M490 180 Q540 200 580 220 M564 208 L582 222 L560 230" fill="none" stroke="#ffd166" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
      F.label(420, 290, "?", { grootte: 54, kleur: "#ffd166", rand: "#1e4f8a" })
    );
  };
})();
