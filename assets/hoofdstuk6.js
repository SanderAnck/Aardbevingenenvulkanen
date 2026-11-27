/* Prenten van hoofdstuk 6 – Wat komt er uit een vulkaan? */
(function () {
  var F = window.FIG, P = window.PRENTEN;

  // 6.1 – Een uitbarsting met lava, as, gas en lavabommen
  P.uitbarsting = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#e9d6c0"/>' +
      '<rect y="390" width="800" height="60" fill="#8a7a5b"/>' +
      // aswolk
      '<g class="anim-rook"><g fill="#8f8a85"><circle cx="340" cy="90" r="60"/><circle cx="280" cy="60" r="44"/><circle cx="400" cy="60" r="48"/><circle cx="340" cy="30" r="40"/></g></g>' +
      '<g fill="#a29d97"><circle cx="350" cy="150" r="34"/><circle cx="320" cy="120" r="30"/></g>' +
      // gas: golvende lijntjes
      '<g class="anim-zweef"><path d="M200 140 q10 -14 0 -28 t0 -28 M220 160 q10 -14 0 -28 t0 -28" fill="none" stroke="#b9c7a0" stroke-width="5" stroke-linecap="round"/></g>' +
      // vulkaan
      '<path d="M120 400 L310 180 L370 180 L600 400 Z" fill="#6e4a30"/>' +
      '<path d="M310 180 Q340 194 370 180 Z" fill="#ff5a1f"/>' +
      // lava langs de flank
      '<path d="M358 186 Q400 240 430 290 Q460 340 500 398" fill="none" stroke="#ff5a1f" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M358 186 Q400 240 430 290 Q460 340 500 398" fill="none" stroke="#ffd166" stroke-width="5" class="anim-stroom"/>' +
      // lavabommen
      '<g class="anim-vonk"><g transform="translate(560 120)"><path d="M0 -14 Q12 0 0 14 Q-12 0 0 -14 Z" fill="#3a2a2a"/><path d="M0 14 Q-20 30 -36 46" stroke="#ff7a3d" stroke-width="4" fill="none" opacity=".7"/></g></g>' +
      '<g class="anim-vonk-2"><g transform="translate(470 80)"><path d="M0 -10 Q9 0 0 10 Q-9 0 0 -10 Z" fill="#3a2a2a"/></g></g>' +
      // labels
      F.label(445, 40, "as", { grootte: 20, kleur: "#3b2618", rand: "#fff", anker: "start" }) +
      F.label(185, 70, "gas", { grootte: 20, kleur: "#3b2618", rand: "#fff" }) +
      F.label(520, 330, "lava", { grootte: 20, kleur: "#d9481f", rand: "#fff", anker: "start" }) +
      F.label(600, 160, "lavabom", { grootte: 20, kleur: "#3b2618", rand: "#fff", anker: "start" }) +
      // veilig in de Boorbol
      F.boorbol(700, 330, 0.75)
    );
  };

  // 6.2 – Een aswolk boven de wolken
  P.aswolk = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#9fcff0"/>' +
      '<rect y="390" width="800" height="60" fill="#e9eef2"/>' +
      // vulkaan met gletsjer (IJsland)
      '<path d="M100 400 L220 300 L290 300 L410 400 Z" fill="#6e5a4e"/>' +
      '<path d="M190 326 L220 300 L290 300 L320 326 Q290 316 255 330 Q220 316 190 326 Z" fill="#f4f8fb"/>' +
      // aszuil die door de wolken gaat
      '<g class="anim-rook"><path d="M230 300 Q200 200 230 120 Q260 40 350 30 Q450 30 470 80 Q420 70 380 100 Q300 140 290 300 Z" fill="#7d7873"/></g>' +
      '<path d="M235 300 Q222 220 248 150 Q270 100 330 80 Q300 140 286 300 Z" fill="#8f8a85"/>' +
      // wolkenlaag
      F.wolk(80, 220, 1) + F.wolk(400, 230, 1.1) + F.wolk(560, 210, 0.9) + F.wolk(720, 225, 1) +
      // vliegtuig dat er ver omheen vliegt
      '<path d="M620 160 Q540 120 560 60 Q600 30 700 60" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="8 8"/>' +
      '<g class="anim-zweef">' + F.plaats(670, 95, 1,
        '<path d="M-36 0 Q-36 -8 -26 -8 H30 Q42 -4 30 4 H-26 Q-36 4 -36 0 Z" fill="#fff" stroke="#5e6b73" stroke-width="2"/>' +
        '<path d="M-4 -6 L-16 -26 H-6 L12 -6 Z M-4 2 L-14 20 H-4 L12 2 Z M-30 -6 L-38 -18 H-30 L-22 -6 Z" fill="#d9481f"/>' +
        '<circle cx="18" cy="-2" r="2" fill="#5e6b73"/><circle cx="10" cy="-2" r="2" fill="#5e6b73"/><circle cx="2" cy="-2" r="2" fill="#5e6b73"/>') + "</g>" +
      F.label(255, 430, "IJsland", { grootte: 18 })
    );
  };

  // 6.3 – Vulkanen geven ook veel
  P.vruchtbaar = function () {
    var druiven = "", tomaten = "";
    for (var i = 0; i < 4; i++) {
      var x = 480 + i * 70;
      druiven += '<path d="M' + x + ' 300 V230" stroke="#7a4b2c" stroke-width="5"/>' +
        '<path d="M' + (x - 30) + ' 240 Q' + x + ' 220 ' + (x + 30) + ' 240" fill="none" stroke="#3f7f3a" stroke-width="6"/>' +
        '<g fill="#7a3f8f"><circle cx="' + (x - 12) + '" cy="254" r="7"/><circle cx="' + (x - 4) + '" cy="266" r="7"/><circle cx="' + (x - 18) + '" cy="266" r="7"/><circle cx="' + (x - 10) + '" cy="278" r="7"/></g>';
      tomaten += '<circle cx="' + (x + 6) + '" cy="356" r="10" fill="#d9481f"/><path d="M' + (x + 2) + ' 346 h8" stroke="#3f7f3a" stroke-width="3"/>';
    }
    return F.svg(
      '<rect width="800" height="450" fill="#cfe7f5"/>' +
      '<g class="anim-gloei"><circle cx="680" cy="70" r="34" fill="#ffd166"/></g>' +
      // links: afgekoelde zwarte lava
      '<path d="M0 180 Q120 170 200 190 Q300 210 380 200 V450 H0 Z" fill="#2f2b2b"/>' +
      '<path d="M40 260 l30 20 l-10 30 M120 230 l20 30 l30 -10 M200 300 l-20 30 l20 20 M300 250 l-30 20 M80 360 l40 10 l10 30" fill="none" stroke="#4a4444" stroke-width="4"/>' +
      // huisje met warmte uit de grond
      F.huisje(120, 245, 1.2) +
      '<path d="M150 245 V200" stroke="#9aa7b0" stroke-width="8"/>' +
      '<g class="anim-rook"><circle cx="150" cy="188" r="12" fill="#f4f8fb"/><circle cx="160" cy="170" r="14" fill="#f4f8fb"/></g>' +
      // rechts: vruchtbare velden
      '<path d="M380 200 Q520 190 800 205 V450 H380 Z" fill="#7a5a3a"/>' +
      '<path d="M380 320 H800 M380 380 H800" stroke="#6b4b2f" stroke-width="3"/>' +
      druiven + tomaten +
      // sinaasappelboom
      '<rect x="736" y="140" width="10" height="70" fill="#7a4b2c"/><circle cx="741" cy="130" r="36" fill="#3f7f3a"/>' +
      '<g fill="#f59e0b"><circle cx="726" cy="120" r="7"/><circle cx="752" cy="136" r="7"/><circle cx="738" cy="150" r="6"/><circle cx="760" cy="114" r="6"/></g>' +
      // Kiezel op de grens, trots
      F.kiezel(400, 345, 1.4) +
      F.label(400, 300, "Ik ben een bouwer!", { grootte: 16, kleur: "#d9481f", rand: "#fff" })
    );
  };

  // 6.4 – Een warm bad in de sneeuw
  P["warm-bad"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#2e3763"/>' + F.sterren(40, 160, 21) +
      '<path d="M0 220 L120 120 L220 200 L340 100 L470 210 L600 130 L800 220 V260 H0 Z" fill="#dde6f0"/>' +
      '<path d="M120 120 L150 146 L100 140 Z M340 100 L372 126 L310 124 Z M600 130 L630 154 L576 150 Z" fill="#fff"/>' +
      '<rect y="250" width="800" height="200" fill="#f4f8fb"/>' +
      // warm meer
      '<ellipse cx="420" cy="350" rx="230" ry="60" fill="#5fc3c0"/>' +
      '<ellipse cx="420" cy="345" rx="200" ry="44" fill="#7fd6d0"/>' +
      '<g class="anim-rook">' + '<g fill="#ffffff" opacity=".7"><circle cx="330" cy="300" r="18"/><circle cx="360" cy="280" r="22"/></g></g>' +
      '<g class="anim-rook-2">' + '<g fill="#ffffff" opacity=".7"><circle cx="470" cy="300" r="18"/><circle cx="500" cy="276" r="22"/></g></g>' +
      '<g class="anim-rook">' + '<g fill="#ffffff" opacity=".6"><circle cx="580" cy="310" r="14"/><circle cx="600" cy="292" r="18"/></g></g>' +
      F.boorbol(110, 300, 0.7, { leeg: true }) +
      F.noor(220, 395, 1.1, { arm: "omhoog", mond: "blij" }) +
      F.opa(680, 400, 1.15) +
      F.kiezel(270, 402, 0.7)
    );
  };
})();
