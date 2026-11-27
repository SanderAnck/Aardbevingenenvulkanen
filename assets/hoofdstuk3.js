/* Prenten van hoofdstuk 3 – De aarde is een puzzel */
(function () {
  var F = window.FIG, P = window.PRENTEN;

  // 3.1 – De aarde in puzzelstukken
  P.puzzelbol = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#1d2340"/>' + F.sterren(60, 450, 11) +
      '<clipPath id="puzzelbol-bol"><circle cx="380" cy="235" r="170"/></clipPath>' +
      '<circle cx="380" cy="235" r="176" fill="#3b82c4" opacity=".35"/>' +
      '<g clip-path="url(#puzzelbol-bol)">' +
        '<circle cx="380" cy="235" r="170" fill="#2b6cb0"/>' +
        // Europa
        '<path d="M330 120 Q350 96 395 100 Q440 92 470 112 Q480 140 452 160 Q430 172 405 168 Q380 178 356 166 Q332 150 330 120 Z" fill="#7fb35a"/>' +
        // Afrika
        '<path d="M350 192 Q400 178 452 190 Q480 220 470 262 Q452 300 430 330 Q410 350 398 330 Q388 296 372 270 Q346 240 350 192 Z" fill="#c8a35a"/>' +
        // Zuid-Amerika
        '<path d="M220 230 Q252 222 280 240 Q292 270 270 310 Q252 350 240 380 Q228 350 226 310 Q212 270 220 230 Z" fill="#7fb35a"/>' +
        // Noord-Amerika
        '<path d="M210 70 Q260 60 300 90 Q296 130 270 160 Q246 190 226 196 Q206 160 210 70 Z" fill="#7fb35a"/>' +
        // plaatgrenzen
        '<path d="M310 60 Q300 140 318 200 Q330 260 312 330 Q300 380 310 420" fill="none" stroke="#5e3a24" stroke-width="5" stroke-dasharray="12 8"/>' +
        '<path d="M318 180 Q380 176 440 178 Q500 182 560 200" fill="none" stroke="#5e3a24" stroke-width="5" stroke-dasharray="12 8"/>' +
        '<path d="M470 100 Q500 160 490 250 Q480 330 520 400" fill="none" stroke="#5e3a24" stroke-width="5" stroke-dasharray="12 8"/>' +
      "</g>" +
      // gat waar het puzzelstuk uit is
      '<path d="M500 110 L540 96 L556 140 L520 160 Z" fill="#1d2340" opacity=".7"/>' +
      // los puzzelstuk
      '<g class="anim-zweef"><path d="M528 92 L580 74 Q590 86 600 80 L612 126 Q600 130 604 142 L560 160 Q556 148 546 150 Z" fill="#7fb35a" stroke="#5e3a24" stroke-width="4"/></g>' +
      // België
      '<circle cx="382" cy="148" r="6" fill="#d9481f" stroke="#fff" stroke-width="2"/>' +
      F.label(348, 153, "België", { grootte: 14, kleur: "#fff", rand: "#1d2340", anker: "end" }) +
      F.boorbol(690, 340, 0.6) +
      F.label(150, 60, "ijsschotsen op het water", { grootte: 15, kleur: "#bfe3f2", dik: false })
    );
  };

  // 3.2 – Zo traag als je nagels groeien
  P.nagels = function () {
    var vingers = "";
    [[262, 150, 150], [300, 120, 180], [340, 115, 186], [380, 130, 170]].forEach(function (v) {
      vingers += '<rect x="' + (v[0] - 18) + '" y="' + v[1] + '" width="36" height="' + v[2] + '" rx="18" fill="' + F.HUID + '" stroke="#c98d68" stroke-width="3"/>' +
        '<rect x="' + (v[0] - 11) + '" y="' + (v[1] + 6) + '" width="22" height="26" rx="10" fill="#fbd9d0" stroke="#e3a99a" stroke-width="2"/>';
    });
    return F.svg(
      '<rect width="800" height="450" fill="#fbf4e6"/>' +
      // hand
      '<path d="M236 280 Q230 420 250 450 H400 Q420 400 404 280 Z" fill="' + F.HUID + '" stroke="#c98d68" stroke-width="3"/>' +
      vingers +
      '<rect x="190" y="270" width="36" height="110" rx="18" fill="' + F.HUID + '" stroke="#c98d68" stroke-width="3" transform="rotate(-35 208 325)"/>' +
      // pijltje: een paar centimeter
      '<path d="M300 98 V60 M290 70 L300 58 L310 70" fill="none" stroke="#d9481f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
      F.label(300, 45, "een paar cm per jaar", { grootte: 16, kleur: "#d9481f" }) +
      // Afrika en Zuid-Amerika als puzzelstukken
      '<g class="anim-uit-elkaar-l"><path d="M520 140 Q560 128 590 150 Q600 190 580 240 Q562 290 552 330 Q536 296 534 250 Q514 200 520 140 Z" fill="#7fb35a" stroke="#5e3a24" stroke-width="3"/></g>' +
      '<g class="anim-uit-elkaar-r"><path d="M612 120 Q680 110 740 140 Q760 190 744 240 Q720 290 700 330 Q680 300 672 260 Q640 230 624 190 Q604 160 612 120 Z" fill="#c8a35a" stroke="#5e3a24" stroke-width="3"/></g>' +
      F.label(556, 370, "Zuid-Amerika", { grootte: 15 }) + F.label(700, 370, "Afrika", { grootte: 15 }) +
      F.kiezel(640, 410, 0.9)
    );
  };

  // 3.3 – Drie manieren van bewegen
  P["drie-bewegingen"] = function () {
    function kader(x, titel) {
      return '<rect x="' + x + '" y="20" width="250" height="410" rx="16" fill="#fff" stroke="#e2cda6" stroke-width="3"/>' +
        F.label(x + 125, 60, titel, { grootte: 19 });
    }
    return F.svg(
      '<rect width="800" height="450" fill="#fbf4e6"/>' +
      // 1. uit elkaar
      kader(10, "Uit elkaar") +
      '<g class="anim-gloei"><path d="M128 330 Q118 270 135 220 Q150 270 142 330 Z" fill="#ff5a1f"/></g>' +
      '<g class="anim-uit-elkaar-l"><rect x="22" y="220" width="104" height="110" fill="#8a5a3b"/><rect x="22" y="220" width="104" height="14" fill="#6f9b4f"/></g>' +
      '<g class="anim-uit-elkaar-r"><rect x="144" y="220" width="104" height="110" fill="#8a5a3b"/><rect x="144" y="220" width="104" height="14" fill="#6f9b4f"/></g>' +
      '<path d="M70 380 H30 M40 370 L28 380 L40 390 M200 380 H240 M230 370 L242 380 L230 390" fill="none" stroke="#1e4f8a" stroke-width="4" stroke-linecap="round"/>' +
      // 2. botsen
      kader(275, "Botsen") +
      '<g class="anim-groei-1"><path d="M340 222 L400 130 L460 222 Z" fill="#9c7a5b"/><path d="M386 152 L400 130 L414 152 Z" fill="#fff"/></g>' +
      '<g class="anim-schuif-op"><rect x="285" y="220" width="115" height="110" fill="#8a5a3b"/><rect x="285" y="220" width="115" height="14" fill="#6f9b4f"/></g>' +
      '<g class="anim-schuif-neer"><rect x="400" y="220" width="115" height="110" fill="#7a4b2c"/><rect x="400" y="220" width="115" height="14" fill="#6f9b4f"/></g>' +
      '<path d="M300 380 H350 M340 370 L352 380 L340 390 M500 380 H450 M460 370 L448 380 L460 390" fill="none" stroke="#1e4f8a" stroke-width="4" stroke-linecap="round"/>' +
      // 3. langs elkaar (van boven gezien)
      kader(540, "Langs elkaar") +
      '<g class="anim-schuif-op"><g transform="rotate(90 665 260)"><rect x="560" y="200" width="210" height="58" fill="#8a5a3b"/><rect x="560" y="200" width="210" height="8" fill="#6f9b4f"/></g></g>' +
      '<g class="anim-schuif-neer"><g transform="rotate(90 665 260)"><rect x="560" y="262" width="210" height="58" fill="#7a4b2c"/><rect x="560" y="312" width="210" height="8" fill="#6f9b4f"/></g></g>' +
      '<path d="M610 400 V370 M600 380 L610 368 L620 380 M720 370 V400 M710 390 L720 402 L730 390" fill="none" stroke="#1e4f8a" stroke-width="4" stroke-linecap="round"/>'
    );
  };

  // 3.4 – De Ring van Vuur
  P["ring-van-vuur"] = function () {
    var vulkaantjes = "";
    for (var i = 0; i < 26; i++) {
      var hoek = -Math.PI * 0.95 + i * (Math.PI * 1.75 / 25);
      var x = 430 + 205 * Math.cos(hoek), y = 230 + 155 * Math.sin(hoek);
      vulkaantjes += '<path d="M' + (x - 7).toFixed(1) + " " + (y + 6).toFixed(1) + " L" + x.toFixed(1) + " " + (y - 7).toFixed(1) + " L" + (x + 7).toFixed(1) + " " + (y + 6).toFixed(1) + ' Z" fill="#d9481f"/>';
    }
    return F.svg(
      '<rect width="800" height="450" fill="#2b6cb0"/>' +
      F.golfjes(420, "#9cc9ee") + F.golfjes(40, "#9cc9ee") +
      // Azië
      '<path d="M0 40 Q80 20 180 30 Q260 50 290 110 Q270 150 240 175 Q210 200 170 190 Q120 200 60 180 Q20 170 0 150 Z" fill="#7fb35a"/>' +
      // Japan
      '<path d="M268 120 Q282 130 276 160 Q268 150 268 120 Z M262 168 Q270 172 266 186 Q258 178 262 168 Z" fill="#7fb35a"/>' +
      // Indonesië
      '<path d="M150 250 Q190 244 220 256 Q200 262 150 250 Z M230 262 Q262 256 290 270 Q262 274 230 262 Z" fill="#7fb35a"/>' +
      // Australië
      '<path d="M180 320 Q230 300 290 316 Q310 350 280 384 Q230 396 196 378 Q170 352 180 320 Z" fill="#c8a35a"/>' +
      // Noord-Amerika
      '<path d="M560 30 Q660 20 760 40 Q800 60 800 120 Q760 170 700 200 Q660 220 640 200 Q610 170 600 130 Q570 100 560 30 Z" fill="#7fb35a"/>' +
      // Zuid-Amerika
      '<path d="M660 236 Q700 230 730 250 Q740 290 716 340 Q700 380 690 430 Q676 400 672 360 Q650 300 660 236 Z" fill="#7fb35a"/>' +
      // de ring
      '<g class="anim-gloei"><path d="M232 300 A205 155 0 1 1 638 245" fill="none" stroke="#ff7a3d" stroke-width="12" stroke-linecap="round" opacity=".55"/></g>' +
      vulkaantjes +
      F.label(430, 225, "Stille Oceaan", { grootte: 22, kleur: "#fff" }) +
      F.label(430, 255, "Ring van Vuur", { grootte: 18, kleur: "#ffd166" }) +
      F.boorbol(440, 360, 0.5)
    );
  };
})();
