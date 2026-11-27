/* Prenten van hoofdstuk 8 – De grote golf */
(function () {
  var F = window.FIG, P = window.PRENTEN;

  function bootje(x, y, s) {
    return F.plaats(x, y, s,
      '<path d="M-40 0 H40 L28 18 H-28 Z" fill="#d9481f" stroke="#7a2e12" stroke-width="3"/>' +
      '<path d="M0 0 V-50" stroke="#5e3a24" stroke-width="4"/><path d="M2 -48 L34 -8 H2 Z" fill="#fff" stroke="#c9c0ad" stroke-width="2"/>');
  }

  // 8.1 – De zeebodem springt omhoog
  P.zeebodem = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#cfe7f5"/>' +
      '<rect y="110" width="800" height="340" fill="#1e4f8a"/>' +
      // bult in het water erboven
      '<g class="anim-stijgen"><path d="M150 112 Q300 112 380 80 Q460 112 650 112 Z" fill="#1e4f8a"/></g>' +
      '<g class="anim-golf">' + F.golfjes(130, "#9cc9ee") + "</g>" +
      // zeebodem
      '<path d="M0 380 H350 V450 H0 Z" fill="#7a5a3a"/>' +
      '<g class="anim-stijgen"><path d="M350 340 H800 V450 H350 Z" fill="#8a6a4a"/></g>' +
      '<path d="M350 330 V450" stroke="#ffd166" stroke-width="5" stroke-dasharray="10 8"/>' +
      '<path d="M560 330 V250 M546 266 L560 248 L574 266" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M560 230 V170 M546 186 L560 168 L574 186" fill="none" stroke="#9cc9ee" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' +
      // visjes
      '<g class="anim-golf"><path d="M120 250 q16 -12 32 0 q-16 12 -32 0 Z M152 250 l10 -8 v16 Z" fill="#f59e0b"/><path d="M200 300 q12 -9 24 0 q-12 9 -24 0 Z M224 300 l8 -6 v12 Z" fill="#ffd166"/></g>' +
      F.boorbol(220, 200, 0.7, { raam: "#9cc9ee" }) +
      // gedachtewolkje met bad
      '<circle cx="700" cy="70" r="58" fill="#fff"/><circle cx="640" cy="130" r="8" fill="#fff"/><circle cx="628" cy="148" r="5" fill="#fff"/>' +
      '<path d="M660 70 H740 Q740 100 712 104 H688 Q660 100 660 70 Z" fill="#9aa7b0"/><path d="M664 70 Q700 52 736 70" fill="#5aa7d6"/>' +
      '<g class="anim-vonk"><circle cx="690" cy="58" r="4" fill="#5aa7d6"/></g><g class="anim-vonk-2"><circle cx="716" cy="56" r="4" fill="#5aa7d6"/></g>'
    );
  };

  // 8.2 – Een lage golf op zee wordt hoog aan de kust
  P["tsunami-golf"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#cfe7f5"/>' +
      F.wolk(260, 70, 0.7) +
      // zee
      '<path d="M0 260 Q100 248 200 260 Q300 250 420 258 Q520 240 580 210 Q620 150 660 150 Q700 160 690 200 Q672 190 660 210 Q650 240 680 260 H800 V450 H0 Z" fill="#1e4f8a"/>' +
      '<path d="M600 190 Q630 160 660 158 Q690 164 686 194 Q674 186 662 202" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>' +
      // strand en heuvel
      '<path d="M690 262 Q740 240 800 236 V450 H690 Z" fill="#e8d3a0"/>' +
      '<path d="M740 238 Q770 160 800 150 V240 Z" fill="#6f9b4f"/>' +
      '<g class="anim-drijf">' + bootje(170, 252, 1) + "</g>" +
      F.label(170, 320, "open zee: laag", { grootte: 16, kleur: "#fff" }) +
      F.label(620, 320, "kust: hoog", { grootte: 16, kleur: "#fff" }) +
      // zo snel als een vliegtuig
      '<path d="M300 210 H460 M446 198 L462 210 L446 222" fill="none" stroke="#1e4f8a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' +
      F.plaats(380, 170, 0.7,
        '<path d="M-36 0 Q-36 -8 -26 -8 H30 Q42 -4 30 4 H-26 Q-36 4 -36 0 Z" fill="#fff" stroke="#5e6b73" stroke-width="2"/>' +
        '<path d="M-4 -6 L-16 -26 H-6 L12 -6 Z M-4 2 L-14 20 H-4 L12 2 Z" fill="#d9481f"/>') +
      // Japan-kaartje
      '<rect x="40" y="30" width="110" height="74" rx="8" fill="#fff" stroke="#5e3a24" stroke-width="3"/>' +
      '<circle cx="95" cy="58" r="14" fill="#d9481f"/>' +
      F.label(95, 95, "Japan", { grootte: 14 })
    );
  };

  // 8.3 – Snel naar een hoge plek
  P.vluchtroute = function () {
    var mensjes = "";
    [[600, 300], [640, 270], [680, 240], [710, 210]].forEach(function (m, i) {
      mensjes += F.plaats(m[0], m[1], 0.5,
        '<circle cx="0" cy="-70" r="12" fill="' + F.HUID + '"/>' +
        '<rect x="-12" y="-58" width="24" height="36" rx="8" fill="' + ["#1e4f8a", "#f07b2a", "#6f9b4f", "#d9481f"][i] + '"/>' +
        '<path d="M-6 -22 L-12 0 M6 -22 L12 0" stroke="#2f3e6b" stroke-width="7" stroke-linecap="round"/>');
    });
    return F.svg(
      '<rect width="800" height="450" fill="#cfe7f5"/>' +
      // zee ver teruggetrokken
      '<rect y="230" width="800" height="40" fill="#1e4f8a"/>' +
      '<path d="M0 268 H560 Q600 300 620 450 H0 Z" fill="#cdb98a"/>' +
      '<path d="M0 268 H540 Q560 290 570 330 H0 Z" fill="#b8a16f"/>' +
      '<g fill="#8f7a52"><ellipse cx="120" cy="300" rx="16" ry="5"/><ellipse cx="300" cy="320" rx="12" ry="4"/><ellipse cx="440" cy="296" rx="14" ry="4"/></g>' +
      F.label(260, 220, "het water trekt terug", { grootte: 16, kleur: "#1e4f8a" }) +
      // heuvel met pad
      '<path d="M520 450 Q600 260 700 170 Q760 130 800 120 V450 Z" fill="#6f9b4f"/>' +
      '<path d="M560 420 Q610 330 650 280 Q700 220 760 160" fill="none" stroke="#e8d3a0" stroke-width="16" stroke-linecap="round"/>' +
      mensjes +
      // bordje
      '<rect x="516" y="215" width="8" height="70" fill="#7a4b2c"/>' +
      '<rect x="440" y="160" width="160" height="62" rx="8" fill="#1e4f8a" stroke="#fff" stroke-width="3"/>' +
      F.label(520, 184, "Tsunami", { grootte: 15, kleur: "#fff" }) +
      F.label(520, 208, "vluchtroute ↗", { grootte: 14, kleur: "#fff" }) +
      // Belgische kust
      '<rect x="30" y="30" width="120" height="80" rx="8" fill="#fff" stroke="#5e3a24" stroke-width="3"/>' +
      '<rect x="55" y="42" width="22" height="40" fill="#222"/><rect x="77" y="42" width="22" height="40" fill="#f6d02f"/><rect x="99" y="42" width="22" height="40" fill="#d9302a"/>' +
      F.label(90, 100, "onze kust", { grootte: 13 })
    );
  };
})();
