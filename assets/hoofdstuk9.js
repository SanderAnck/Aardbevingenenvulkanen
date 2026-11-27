/* Prenten van hoofdstuk 9 – De aarde in het oog houden */
(function () {
  var F = window.FIG, P = window.PRENTEN;

  // Een vulkaanonderzoeker in een zilveren pak. (x,y) = voeten.
  function onderzoeker(x, y, s) {
    return F.plaats(x, y, s,
      '<rect x="-18" y="-64" width="16" height="62" rx="6" fill="#c9ced4" stroke="#8d949b" stroke-width="2"/>' +
      '<rect x="2" y="-64" width="16" height="62" rx="6" fill="#c9ced4" stroke="#8d949b" stroke-width="2"/>' +
      '<rect x="-30" y="-140" width="60" height="86" rx="18" fill="#dfe3e8" stroke="#8d949b" stroke-width="2"/>' +
      '<path d="M-28 -128 Q-44 -100 -40 -76 M28 -128 Q46 -112 56 -96" fill="none" stroke="#dfe3e8" stroke-width="14" stroke-linecap="round"/>' +
      '<circle cx="0" cy="-168" r="30" fill="#dfe3e8" stroke="#8d949b" stroke-width="2"/>' +
      '<rect x="-20" y="-180" width="40" height="24" rx="10" fill="#f5b942" stroke="#8d949b" stroke-width="2"/>' +
      '<path d="M-12 -174 Q-4 -178 4 -174" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>' +
      '<path d="M-20 -110 Q0 -100 20 -110" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>');
  }

  // 9.1 – Een collega in een zilveren pak
  P.onderzoeker = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#cfd9e6"/>' +
      // satelliet
      '<g class="anim-zweef">' + F.plaats(715, 60, 1,
        '<rect x="-12" y="-10" width="24" height="20" fill="#9aa7b0" stroke="#5e6b73" stroke-width="2"/>' +
        '<rect x="-52" y="-8" width="36" height="16" fill="#1e4f8a" stroke="#5e6b73" stroke-width="2"/><rect x="16" y="-8" width="36" height="16" fill="#1e4f8a" stroke="#5e6b73" stroke-width="2"/>' +
        '<path d="M0 10 V20" stroke="#5e6b73" stroke-width="3"/>') + "</g>" +
      // kraterrand
      '<path d="M0 300 Q200 260 420 270 L520 250 Q620 240 800 280 V450 H0 Z" fill="#5e4a3e"/>' +
      '<g class="anim-gloei"><path d="M520 262 Q640 230 800 270 V300 Q660 270 520 280 Z" fill="#ff7a3d"/></g>' +
      F.rook(680, 260, 0.9) +
      '<path d="M0 340 Q300 320 800 350" stroke="#4a3a30" stroke-width="5" fill="none"/>' +
      // drone
      '<g class="anim-zweef">' + F.plaats(520, 110, 1,
        '<rect x="-20" y="-8" width="40" height="16" rx="6" fill="#3f4a52"/>' +
        '<path d="M-20 -4 H-40 M20 -4 H40" stroke="#3f4a52" stroke-width="4"/>' +
        '<ellipse cx="-40" cy="-8" rx="16" ry="3" fill="#9aa7b0"/><ellipse cx="40" cy="-8" rx="16" ry="3" fill="#9aa7b0"/>' +
        '<circle cx="0" cy="10" r="5" fill="#d9481f"/>') + "</g>" +
      // meettoestel op een statief
      '<path d="M410 330 L430 250 L450 330 M430 250 V330" stroke="#3f4a52" stroke-width="4" fill="none"/>' +
      '<rect x="412" y="226" width="36" height="26" rx="4" fill="#f5b942" stroke="#3f4a52" stroke-width="3"/>' +
      onderzoeker(300, 335, 1.05) +
      F.opa(170, 345, 1.05, { arm: "wijs" }) +
      F.noor(80, 350, 0.95, { arm: "zwaai" })
    );
  };

  // 9.2 – Een vulkaan die zacht gromt
  P["vulkaan-gromt"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#cfe7f5"/>' +
      '<rect y="360" width="800" height="90" fill="#9cbf7a"/>' +
      '<g class="anim-tril-zacht">' +
        '<path d="M80 370 L300 140 L380 140 L600 370 Z" fill="#8a6a4d"/>' +
        '<path d="M300 140 Q340 152 380 140 Z" fill="#5e3a24"/>' +
        // grappig gezichtje: een beetje knorrig, niet eng
        '<circle cx="315" cy="230" r="6" fill="#3b2618"/><circle cx="365" cy="230" r="6" fill="#3b2618"/>' +
        '<path d="M300 214 L326 220 M380 214 L354 220" stroke="#3b2618" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M318 264 Q340 254 362 264" fill="none" stroke="#3b2618" stroke-width="4" stroke-linecap="round"/>' +
      "</g>" +
      F.rook(340, 134, 0.7) +
      // trillingslijntjes
      '<g class="anim-tril"><path d="M240 160 q-10 10 0 20 t0 20 M440 160 q10 10 0 20 t0 20 M200 220 q-10 10 0 20 t0 20 M480 220 q10 10 0 20 t0 20" fill="none" stroke="#5e3a24" stroke-width="3"/></g>' +
      F.label(450, 110, "grrr...", { grootte: 24, kleur: "#5e3a24" }) +
      // dorp met waarschuwingsbord
      F.huisje(640, 370, 1) + F.huisje(720, 370, 0.9) +
      '<rect x="566" y="300" width="6" height="70" fill="#7a4b2c"/>' +
      '<rect x="530" y="262" width="80" height="46" rx="6" fill="#f6d02f" stroke="#5e3a24" stroke-width="3"/>' +
      F.label(570, 292, "Let op!", { grootte: 14 }) +
      F.plaats(520, 410, 0.5, '<circle cx="0" cy="-70" r="12" fill="' + F.HUID + '"/><rect x="-12" y="-58" width="24" height="40" rx="8" fill="#1e4f8a"/><path d="M-6 -18 V0 M6 -18 V0" stroke="#2f3e6b" stroke-width="7"/>') +
      F.plaats(610, 412, 0.5, '<circle cx="0" cy="-70" r="12" fill="' + F.HUID + '"/><rect x="-12" y="-58" width="24" height="40" rx="8" fill="#d9481f"/><path d="M-6 -18 V0 M6 -18 V0" stroke="#2f3e6b" stroke-width="7"/>')
    );
  };

  // 9.3 – Slim en stevig bouwen in Japan
  P["stevig-bouwen"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#cfe7f5"/>' +
      '<rect y="400" width="800" height="50" fill="#9cbf7a"/>' +
      // boom die meebuigt in de wind
      '<g class="anim-drijf">' +
        '<path d="M90 400 Q96 330 80 280" fill="none" stroke="#7a4b2c" stroke-width="12"/>' +
        '<circle cx="78" cy="260" r="44" fill="#3f7f3a"/>' +
      "</g>" +
      // Japans huis
      F.plaats(250, 400, 1,
        '<rect x="-70" y="-90" width="140" height="90" fill="#f6efe2" stroke="#3b2618" stroke-width="3"/>' +
        '<path d="M-100 -86 Q-60 -100 0 -140 Q60 -100 100 -86 Q60 -92 0 -92 Q-60 -92 -100 -86 Z" fill="#5e3a24"/>' +
        '<rect x="-20" y="-56" width="40" height="56" fill="#c8935a"/><path d="M0 -56 V0" stroke="#3b2618" stroke-width="2"/>' +
        '<rect x="-58" y="-70" width="28" height="24" fill="#bfe3f2" stroke="#3b2618" stroke-width="2"/><rect x="30" y="-70" width="28" height="24" fill="#bfe3f2" stroke="#3b2618" stroke-width="2"/>') +
      // hoog gebouw op rubberen blokken
      '<g class="anim-tril-zacht">' +
        '<rect x="470" y="110" width="180" height="270" fill="#9aa7b0" stroke="#3f4a52" stroke-width="3"/>' +
        (function () {
          var r = "";
          for (var rij = 0; rij < 6; rij++) for (var kol = 0; kol < 4; kol++) {
            r += '<rect x="' + (486 + kol * 42) + '" y="' + (126 + rij * 42) + '" width="26" height="26" fill="#bfe3f2"/>';
          }
          return r;
        })() +
      "</g>" +
      '<g fill="#2f2b2b"><rect x="474" y="382" width="40" height="18" rx="8"/><rect x="540" y="382" width="40" height="18" rx="8"/><rect x="606" y="382" width="40" height="18" rx="8"/></g>' +
      F.label(560, 440, "rubberen blokken", { grootte: 14 }) +
      // school
      F.plaats(740, 400, 1,
        '<rect x="-56" y="-80" width="112" height="80" fill="#f3c98b" stroke="#3b2618" stroke-width="3"/>' +
        '<path d="M-64 -78 L0 -110 L64 -78 Z" fill="#b5462a"/>' +
        '<rect x="-12" y="-36" width="24" height="36" fill="#7a4b2c"/>' +
        '<text x="0" y="-50" text-anchor="middle" font-size="13" font-weight="bold" fill="#3b2618">school</text>')
    );
  };

  // 9.4 – Bukken, dekken, vasthouden
  P["bukken-dekken"] = function () {
    function kader(x, titel, nr) {
      return '<rect x="' + x + '" y="15" width="250" height="420" rx="16" fill="#fff" stroke="#e2cda6" stroke-width="3"/>' +
        '<circle cx="' + (x + 30) + '" cy="50" r="18" fill="#d9481f"/>' +
        F.label(x + 30, 57, nr, { grootte: 18, kleur: "#fff" }) +
        F.label(x + 135, 58, titel, { grootte: 22 });
    }
    function tafel(x) {
      return '<rect x="' + (x - 90) + '" y="250" width="180" height="16" rx="4" fill="#8a5a3b"/>' +
        '<rect x="' + (x - 80) + '" y="266" width="12" height="130" fill="#7a4b2c"/><rect x="' + (x + 68) + '" y="266" width="12" height="130" fill="#7a4b2c"/>';
    }
    // kind dat gehurkt zit
    function kind(x, y, s, armen) {
      return F.plaats(x, y, s,
        '<ellipse cx="0" cy="-30" rx="30" ry="26" fill="#f07b2a"/>' +
        '<ellipse cx="-18" cy="-4" rx="14" ry="7" fill="#3b2618"/><ellipse cx="18" cy="-4" rx="14" ry="7" fill="#3b2618"/>' +
        F.noorHoofd(0, -72, 0.9) +
        (armen || ""));
    }
    return F.svg(
      '<rect width="800" height="450" fill="#fbf4e6"/>' +
      kader(10, "Bukken", "1") +
      kind(135, 390, 1.3) +
      '<path d="M90 330 Q60 360 70 390 M180 330 Q210 360 200 390" fill="none" stroke="#5e3a24" stroke-width="3" stroke-dasharray="6 6"/>' +
      kader(275, "Dekken", "2") +
      tafel(400) +
      kind(400, 392, 1, '<path d="M-16 -94 Q0 -108 16 -94" fill="none" stroke="' + F.HUID + '" stroke-width="9" stroke-linecap="round"/>') +
      kader(540, "Vasthouden", "3") +
      tafel(665) +
      kind(640, 392, 1, '<path d="M14 -40 Q40 -60 96 -70" fill="none" stroke="' + F.HUID + '" stroke-width="9" stroke-linecap="round"/>') +
      F.kiezel(768, 418, 0.65)
    );
  };
})();
