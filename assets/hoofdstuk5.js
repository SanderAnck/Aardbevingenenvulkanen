/* Prenten van hoofdstuk 5 – Vulkanen in alle soorten */
(function () {
  var F = window.FIG, P = window.PRENTEN;

  // 5.1 – De Stromboli bij nacht
  P.stromboli = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#1d2340"/>' + F.sterren(60, 260, 5) +
      '<rect y="320" width="800" height="130" fill="#173a66"/>' +
      '<g class="anim-golf">' + F.golfjes(350, "#5f8fc4") + F.golfjes(400, "#5f8fc4") + "</g>" +
      // Etna in de verte (Sicilië)
      '<path d="M600 322 L680 240 L700 240 L790 322 Z" fill="#2e3763"/>' +
      F.rook(690, 236, 0.45, "#4a5280") +
      F.label(690, 345, "Etna", { grootte: 15, kleur: "#ffe3a3" }) +
      // Pompeji: zuilen aan de kust
      '<path d="M20 322 Q90 300 170 322 Z" fill="#3a3050"/>' +
      '<g fill="#d8cbb0"><rect x="60" y="270" width="10" height="44"/><rect x="85" y="262" width="10" height="52"/><rect x="110" y="276" width="10" height="38"/>' +
      '<rect x="54" y="264" width="46" height="8"/></g>' +
      F.label(95, 345, "Pompeji", { grootte: 15, kleur: "#ffe3a3" }) +
      // Stromboli
      '<g class="anim-gloei"><ellipse cx="400" cy="150" rx="70" ry="40" fill="#f59e0b" opacity=".35"/></g>' +
      '<path d="M230 330 L380 155 L420 155 L570 330 Z" fill="#3a2a2a"/>' +
      '<path d="M380 155 Q400 166 420 155 Z" fill="#ff5a1f"/>' +
      '<g class="anim-vonk"><circle cx="390" cy="130" r="6" fill="#ffd166"/><circle cx="370" cy="120" r="4" fill="#ff7a3d"/></g>' +
      '<g class="anim-vonk-2"><circle cx="410" cy="120" r="6" fill="#ff7a3d"/><circle cx="432" cy="128" r="4" fill="#ffd166"/></g>' +
      '<g class="anim-vonk-3"><circle cx="400" cy="110" r="5" fill="#ffd166"/><circle cx="380" cy="100" r="4" fill="#ff5a1f"/><circle cx="424" cy="104" r="4" fill="#ffd166"/></g>' +
      '<path d="M400 160 Q396 200 386 240" fill="none" stroke="#ff5a1f" stroke-width="4" opacity=".7"/>' +
      F.label(400, 70, "Boem!", { grootte: 30, kleur: "#ffd166", rand: "#1d2340" }) +
      F.boorbol(620, 110, 0.55)
    );
  };

  // 5.2 – Een schildvulkaan op Hawaï
  P.hawaii = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#f7c59f"/>' +
      '<rect y="0" width="800" height="140" fill="#f4a48a" opacity=".6"/>' +
      // Mars aan de hemel
      '<circle cx="690" cy="75" r="22" fill="#c4502a"/><circle cx="682" cy="68" r="5" fill="#a63e1e"/><circle cx="698" cy="82" r="4" fill="#a63e1e"/>' +
      F.label(690, 120, "Mars", { grootte: 14, kleur: "#7a2e12" }) +
      // zee
      '<rect y="330" width="800" height="120" fill="#1e4f8a"/>' +
      '<g class="anim-golf">' + F.golfjes(360, "#9cc9ee") + F.golfjes(410, "#9cc9ee") + "</g>" +
      // brede vulkaan, plat als een omgekeerd bord
      '<path d="M40 335 Q200 220 330 196 Q460 220 760 335 Z" fill="#6e5a4e"/>' +
      '<path d="M300 200 Q330 192 360 200 Q330 208 300 200 Z" fill="#3a2a2a"/>' +
      // lavastroom uit een spleet
      '<path d="M380 214 Q420 250 450 270 Q500 300 530 334" fill="none" stroke="#ff5a1f" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M380 214 Q420 250 450 270 Q500 300 530 334" fill="none" stroke="#ffd166" stroke-width="5" stroke-linecap="round" class="anim-stroom"/>' +
      '<g class="anim-gloei"><ellipse cx="532" cy="336" rx="26" ry="8" fill="#fff6c2" opacity=".7"/></g>' +
      // palmbomen
      F.plaats(120, 338, 1,
        '<path d="M0 0 Q4 -40 -2 -80" fill="none" stroke="#7a4b2c" stroke-width="7"/>' +
        '<path d="M-2 -80 Q-30 -90 -46 -70 M-2 -80 Q20 -100 44 -84 M-2 -80 Q-14 -104 -34 -106 M-2 -80 Q14 -70 30 -54" fill="none" stroke="#3f7f3a" stroke-width="9" stroke-linecap="round"/>') +
      F.label(330, 180, "Mauna Loa", { grootte: 15, kleur: "#3a2a2a" }) +
      F.boorbol(620, 170, 0.55)
    );
  };

  // 5.3 – Actief, slapend en uitgedoofd
  P["drie-vulkanen"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#cfe7f5"/>' +
      '<rect y="370" width="800" height="80" fill="#9cbf7a"/>' +
      // actief
      '<path d="M20 375 L120 210 L160 210 L260 375 Z" fill="#7a4b2c"/>' +
      '<path d="M120 210 Q140 222 160 210 Z" fill="#ff5a1f"/>' +
      '<path d="M140 218 Q132 260 120 300" fill="none" stroke="#ff5a1f" stroke-width="6"/>' +
      F.rook(140, 205, 1) +
      F.label(140, 410, "actief", { grootte: 20 }) +
      // slapend met slaapmutsje
      '<path d="M280 375 L380 210 L420 210 L520 375 Z" fill="#8a6a4d"/>' +
      '<path d="M374 214 Q400 150 470 140 Q440 180 426 214 Z" fill="#1e4f8a"/>' +
      '<circle cx="472" cy="140" r="10" fill="#fff"/>' +
      '<path d="M372 214 H428" stroke="#fff" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M370 270 Q380 276 390 270 M410 270 Q420 276 430 270" fill="none" stroke="#3b2618" stroke-width="3" stroke-linecap="round"/>' +
      '<g class="anim-zweef">' + F.label(490, 110, "Z", { grootte: 28, kleur: "#1e4f8a" }) + F.label(520, 80, "z", { grootte: 22, kleur: "#1e4f8a" }) + F.label(540, 58, "z", { grootte: 16, kleur: "#1e4f8a" }) + "</g>" +
      F.label(400, 410, "slapend", { grootte: 20 }) +
      // uitgedoofd met bomen en een meer
      '<path d="M540 375 Q600 250 640 236 L680 236 Q720 250 780 375 Z" fill="#6f9b4f"/>' +
      '<ellipse cx="660" cy="242" rx="38" ry="9" fill="#5aa7d6"/>' +
      '<g fill="#3f7f3a"><circle cx="600" cy="300" r="14"/><circle cx="625" cy="280" r="12"/><circle cx="700" cy="290" r="13"/><circle cx="726" cy="320" r="15"/><circle cx="650" cy="320" r="13"/></g>' +
      F.label(660, 410, "uitgedoofd", { grootte: 20 })
    );
  };

  // 5.4 – De Eifel, net over de grens
  P.eifel = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#cfe7f5"/>' +
      F.wolk(150, 70, 0.8) + F.wolk(520, 50, 0.6) +
      '<path d="M0 230 Q120 180 260 210 Q400 170 540 200 Q680 170 800 200 V450 H0 Z" fill="#8fbf6a"/>' +
      '<path d="M0 290 Q200 250 400 280 Q600 250 800 270 V450 H0 Z" fill="#79ab55"/>' +
      // ronde meertjes (Maare)
      '<ellipse cx="330" cy="320" rx="92" ry="30" fill="#4a8fc4" stroke="#5f9446" stroke-width="6"/>' +
      '<ellipse cx="610" cy="250" rx="56" ry="18" fill="#4a8fc4" stroke="#6f9b4f" stroke-width="5"/>' +
      '<g class="anim-golf"><path d="M280 318 q12 -5 24 0 t24 0 M340 328 q12 -5 24 0" fill="none" stroke="#bfe3f2" stroke-width="2"/></g>' +
      // bordje Eifel
      '<rect x="476" y="340" width="8" height="70" fill="#7a4b2c"/>' +
      '<rect x="420" y="320" width="120" height="40" rx="6" fill="#f6efe2" stroke="#7a4b2c" stroke-width="3"/>' +
      F.label(480, 346, "Eifel – Duitsland", { grootte: 12 }) +
      // wegwijzer naar België
      '<rect x="91" y="220" width="8" height="120" fill="#7a4b2c"/>' +
      '<path d="M40 210 H150 V246 H40 L22 228 Z" fill="#f6efe2" stroke="#7a4b2c" stroke-width="3"/>' +
      F.label(90, 234, "België", { grootte: 15 }) +
      '<ellipse cx="80" cy="348" rx="14" ry="8" fill="#4a4a4a"/><ellipse cx="108" cy="352" rx="10" ry="6" fill="#5b5b5b"/>' +
      F.boorbol(660, 110, 0.6)
    );
  };
})();
