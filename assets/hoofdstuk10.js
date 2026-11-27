/* Prenten van hoofdstuk 10 – Terug op de zolder */
(function () {
  var F = window.FIG, P = window.PRENTEN, Z = window.ZOLDER;

  // 10.1 – Terug naar huis bij zonsondergang
  P.terugvlucht = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#f7b267"/>' +
      '<rect width="800" height="160" fill="#f4845f" opacity=".6"/>' +
      '<rect width="800" height="70" fill="#7b5ea7" opacity=".5"/>' +
      '<g class="anim-gloei"><circle cx="640" cy="300" r="60" fill="#ffd166"/></g>' +
      // de aarde, van ver
      '<clipPath id="terugvlucht-aarde"><circle cx="400" cy="900" r="620"/></clipPath>' +
      '<circle cx="400" cy="900" r="626" fill="#9cc9ee" opacity=".6"/>' +
      '<g clip-path="url(#terugvlucht-aarde)">' +
        '<circle cx="400" cy="900" r="620" fill="#2b6cb0"/>' +
        '<path d="M60 340 Q160 300 260 320 Q300 360 240 400 Q140 420 60 400 Z" fill="#7fb35a"/>' +
        '<path d="M380 300 Q460 286 520 300 Q560 330 520 360 Q460 380 400 360 Q360 330 380 300 Z" fill="#7fb35a"/>' +
        '<path d="M600 330 Q680 310 760 340 Q760 400 690 420 Q620 410 600 330 Z" fill="#c8a35a"/>' +
        '<path d="M80 345 Q220 300 340 300" fill="none" stroke="#ff7a3d" stroke-width="5" stroke-dasharray="4 8"/>' +
        '<path d="M450 300 l6 -10 l6 10 Z M470 318 l6 -10 l6 10 Z" fill="#d9481f"/>' +
      "</g>" +
      // spoor van de Boorbol
      '<path d="M80 230 Q220 140 360 150" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="10 10" opacity=".8"/>' +
      '<g class="anim-zweef">' + F.boorbol(420, 150, 0.95) + "</g>"
    );
  };

  // 10.2 – Weer op de zolder, de zon schijnt
  P["zolder-zon"] = function () {
    return F.svg(Z.zolder(true) + Z.kaart() + Z.dozen() +
      // zonnestraal op de vloer
      '<path d="M600 170 L730 170 L640 400 L420 400 Z" fill="#fff6c2" opacity=".35"/>' +
      F.noor(300, 430, 1.9, { arm: "omhoog", mond: "lach" }) +
      F.kiezel(375, 190, 1.4) +
      F.opa(470, 430, 1.6, { knipoog: true }));
  };

  // 10.3 – Noor vertelt alles in de klas
  P.klas = function () {
    var kinderen = "";
    [[90, "#1e4f8a"], [200, "#6f9b4f"], [600, "#d9481f"], [710, "#7a3f8f"]].forEach(function (k) {
      kinderen += F.plaats(k[0], 450, 1,
        '<rect x="-44" y="-70" width="88" height="70" rx="20" fill="' + k[1] + '"/>' +
        '<circle cx="0" cy="-92" r="26" fill="' + F.HUID + '"/>' +
        '<path d="M-26 -96 Q-24 -122 0 -120 Q24 -122 26 -96 Q14 -108 0 -106 Q-14 -108 -26 -96 Z" fill="#3b2618"/>' +
        '<circle cx="-8" cy="-90" r="3" fill="#3b2618"/><circle cx="8" cy="-90" r="3" fill="#3b2618"/>' +
        '<ellipse cx="0" cy="-78" rx="6" ry="5" fill="#3b2618"/>');
    });
    return F.svg(
      '<rect width="800" height="450" fill="#f3e3bf"/>' +
      '<rect y="330" width="800" height="120" fill="#c8935a"/>' +
      // bord met tekeningen
      '<rect x="160" y="30" width="480" height="200" rx="8" fill="#2f4d3a" stroke="#7a4b2c" stroke-width="10"/>' +
      '<circle cx="270" cy="130" r="64" fill="none" stroke="#fff" stroke-width="3"/>' +
      '<circle cx="270" cy="130" r="38" fill="none" stroke="#ffd166" stroke-width="3"/>' +
      '<circle cx="270" cy="130" r="14" fill="none" stroke="#ff7a3d" stroke-width="3"/>' +
      '<path d="M400 190 L470 90 L500 90 L570 190" fill="none" stroke="#fff" stroke-width="3"/>' +
      '<path d="M478 80 Q470 60 486 50 M492 80 Q500 60 490 44" fill="none" stroke="#fff" stroke-width="3"/>' +
      '<text x="485" y="214" text-anchor="middle" font-size="16" fill="#fff">vulkanen</text>' +
      // bak water met Kiezel
      '<path d="M330 300 H470 L460 350 H340 Z" fill="#9aa7b0" stroke="#5e6b73" stroke-width="3"/>' +
      '<ellipse cx="400" cy="302" rx="70" ry="10" fill="#5aa7d6"/>' +
      '<g class="anim-drijf">' + F.kiezel(400, 292, 0.8) + "</g>" +
      F.label(400, 268, "Hij drijft!", { grootte: 18, kleur: "#d9481f", rand: "#fff" }) +
      F.noor(300, 400, 1.2, { arm: "zwaai", mond: "blij" }) +
      // juf
      F.plaats(560, 400, 1.2,
        '<rect x="-12" y="-60" width="10" height="58" rx="4" fill="#2f3e6b"/><rect x="2" y="-60" width="10" height="58" rx="4" fill="#2f3e6b"/>' +
        '<path d="M-22 -126 Q0 -132 22 -126 L32 -56 H-32 Z" fill="#7a3f8f"/>' +
        '<circle cx="0" cy="-148" r="22" fill="' + F.HUID + '"/>' +
        '<path d="M-24 -142 Q-26 -178 0 -174 Q26 -178 24 -142 Q26 -120 18 -116 Q20 -150 0 -156 Q-20 -150 -18 -116 Q-26 -120 -24 -142 Z" fill="#a0522d"/>' +
        '<circle cx="-7" cy="-148" r="2.6" fill="#3b2618"/><circle cx="7" cy="-148" r="2.6" fill="#3b2618"/>' +
        '<path d="M-6 -138 Q0 -133 6 -138" fill="none" stroke="#3b2618" stroke-width="2.4" stroke-linecap="round"/>') +
      kinderen
    );
  };

  // 10.4 – Slot: de aarde lacht
  P["lachende-aarde"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#1d2340"/>' + F.sterren(80, 450, 31) +
      '<circle cx="400" cy="225" r="168" fill="#9cc9ee" opacity=".25"/>' +
      '<clipPath id="slot-aarde"><circle cx="400" cy="225" r="160"/></clipPath>' +
      '<g clip-path="url(#slot-aarde)">' +
        '<circle cx="400" cy="225" r="160" fill="#2b6cb0"/>' +
        '<path d="M300 90 Q360 70 420 90 Q450 130 410 150 Q350 160 300 130 Z" fill="#7fb35a"/>' +
        '<path d="M440 160 Q520 150 560 190 Q550 250 500 270 Q450 250 440 160 Z" fill="#c8a35a"/>' +
        '<path d="M250 210 Q300 200 320 240 Q310 300 280 330 Q250 300 250 210 Z" fill="#7fb35a"/>' +
        '<path d="M380 320 Q430 310 470 330 Q450 370 400 372 Z" fill="#7fb35a"/>' +
      "</g>" +
      // vriendelijk gezichtje
      '<circle cx="352" cy="214" r="10" fill="#1d2340"/><circle cx="448" cy="214" r="10" fill="#1d2340"/>' +
      '<circle cx="355" cy="210" r="3" fill="#fff"/><circle cx="451" cy="210" r="3" fill="#fff"/>' +
      '<circle cx="330" cy="248" r="12" fill="#f29a8c" opacity=".7"/><circle cx="470" cy="248" r="12" fill="#f29a8c" opacity=".7"/>' +
      '<path d="M360 262 Q400 292 440 262" fill="none" stroke="#1d2340" stroke-width="7" stroke-linecap="round"/>' +
      // klein vulkaantje bovenop met een rookwolkje
      '<path d="M372 70 L392 46 L408 46 L428 70 Z" fill="#8a6a4d"/>' +
      F.rook(400, 44, 0.5) +
      F.kiezel(640, 360, 1.2) +
      '<g class="anim-zweef">' + F.boorbol(150, 110, 0.55) + "</g>"
    );
  };
})();
