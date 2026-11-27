/* Prenten van hoofdstuk 1 – De steen die kon drijven */
(function () {
  var F = window.FIG, P = window.PRENTEN;

  // De zolder als achtergrond. zon = true: het regent niet meer.
  function zolder(zon) {
    var raam = zon
      ? '<rect x="600" y="60" width="130" height="110" fill="#9fd3f0"/>' +
        '<g class="anim-gloei"><circle cx="690" cy="95" r="22" fill="#ffd166"/></g>' +
        F.wolk(640, 140, 0.5)
      : '<rect x="600" y="60" width="130" height="110" fill="#7f93a8"/>' +
        '<clipPath id="zolder-raam"><rect x="600" y="60" width="130" height="110"/></clipPath>' +
        '<g clip-path="url(#zolder-raam)"><g class="anim-regen" stroke="#dbe7f2" stroke-width="2.4" stroke-linecap="round">' +
        '<path d="M612 40 l-6 16 M640 70 l-6 16 M668 30 l-6 16 M700 80 l-6 16 M720 40 l-6 16 M626 110 l-6 16 M656 140 l-6 16 M690 120 l-6 16 M716 160 l-6 16 M610 170 l-6 16 M680 50 l-6 16 M650 100 l-6 16"/></g></g>';
    return '<rect width="800" height="450" fill="#e2c595"/>' +
      // schuin dak met balken
      '<path d="M0 0 L800 0 L800 40 L0 120 Z" fill="#b98a5a"/>' +
      '<path d="M0 120 L800 40" stroke="#7a4f2c" stroke-width="10"/>' +
      '<path d="M150 0 V450 M560 0 V450" stroke="#c9a372" stroke-width="14"/>' +
      // vloer
      '<rect y="370" width="800" height="80" fill="#a87b4f"/>' +
      '<path d="M0 395 H800 M0 422 H800" stroke="#8e6440" stroke-width="2"/>' +
      // raam
      raam +
      '<rect x="600" y="60" width="130" height="110" fill="none" stroke="#7a4f2c" stroke-width="8"/>' +
      '<path d="M665 60 V170 M600 115 H730" stroke="#7a4f2c" stroke-width="6"/>';
  }

  function dozen() {
    return '' +
      // doos IJsland
      '<rect x="478" y="298" width="135" height="78" fill="#c8935a" stroke="#7a4f2c" stroke-width="3"/>' +
      '<path d="M478 312 H613" stroke="#a87443" stroke-width="3"/>' +
      '<rect x="500" y="325" width="92" height="28" fill="#f6efe2" stroke="#7a4f2c" stroke-width="2"/>' +
      F.label(546, 345, "IJsland", { grootte: 17 }) +
      // doos Hawaï (erop)
      '<rect x="495" y="236" width="104" height="62" fill="#d6a46a" stroke="#7a4f2c" stroke-width="3"/>' +
      '<rect x="510" y="254" width="74" height="26" fill="#f6efe2" stroke="#7a4f2c" stroke-width="2"/>' +
      F.label(547, 273, "Hawaï", { grootte: 17 }) +
      // doos Italië
      '<rect x="630" y="290" width="135" height="86" fill="#bf8650" stroke="#7a4f2c" stroke-width="3"/>' +
      '<rect x="650" y="318" width="95" height="28" fill="#f6efe2" stroke="#7a4f2c" stroke-width="2"/>' +
      F.label(697, 338, "Italië", { grootte: 17 }) +
      // stenen op de doos
      '<ellipse cx="650" cy="286" rx="14" ry="8" fill="#6f6a62"/><ellipse cx="676" cy="287" rx="10" ry="6" fill="#9a5b3a"/>';
  }

  function kaart() {
    return '<g transform="rotate(-2 190 120)">' +
      '<rect x="105" y="62" width="170" height="116" fill="#f3e3bf" stroke="#7a4f2c" stroke-width="4"/>' +
      '<path d="M125 90 Q150 80 165 95 Q170 120 150 130 Q130 125 125 90 Z" fill="#9cbf7a"/>' +
      '<path d="M190 80 Q240 75 255 100 Q250 125 225 120 Q205 135 195 115 Z" fill="#9cbf7a"/>' +
      '<path d="M200 135 Q225 140 230 160 Q210 168 198 155 Z" fill="#9cbf7a"/>' +
      '<circle cx="140" cy="105" r="4" fill="#d9481f"/><circle cx="210" cy="95" r="4" fill="#d9481f"/>' +
      '<circle cx="240" cy="108" r="4" fill="#d9481f"/><circle cx="215" cy="150" r="4" fill="#d9481f"/>' +
      '<circle cx="180" cy="160" r="4" fill="#d9481f"/><circle cx="258" cy="140" r="4" fill="#d9481f"/>' +
      '<circle cx="190" cy="66" r="4" fill="#5e3a24"/>' +
      "</g>";
  }

  // 1.1 – De zolder bij regenweer
  P.zolder = function () {
    return F.svg(zolder(false) + kaart() + dozen() +
      // stoffige spinnenweb
      '<path d="M800 40 L760 44 M800 40 L770 70 M800 40 L795 80 M770 44 Q780 55 772 66 M782 43 Q790 56 786 70" stroke="#f6efe2" stroke-width="1.5" fill="none" opacity=".7"/>' +
      F.noor(340, 405, 1.35, { mond: "o" }));
  };

  // 1.2 – Noor met de puimsteen
  P["steen-in-hand"] = function () {
    var gaatjes = "";
    var punten = [[-22, -10, 5], [-5, -22, 4], [14, -14, 6], [24, 6, 4], [4, 4, 5], [-18, 14, 4], [-30, 4, 3], [10, 22, 3], [30, -8, 3], [-8, -4, 3]];
    punten.forEach(function (p) { gaatjes += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="#7d786e"/>'; });
    return F.svg(zolder(false) + dozen() +
      F.noor(330, 440, 2.1, { arm: "omhoog", mond: "o" }) +
      // de steen in haar hand
      '<g class="anim-zweef">' + F.plaats(500, 200, 2,
        '<path d="M-40 6 Q-44 -26 -14 -30 Q14 -38 36 -20 Q48 -2 36 18 Q14 32 -14 28 Q-38 24 -40 6 Z" fill="#b3aea3" stroke="#7d786e" stroke-width="2.4"/>' + gaatjes) + "</g>" +
      '<path d="M410 196 Q440 190 452 206" fill="none" stroke="' + F.HUID + '" stroke-width="18" stroke-linecap="round"/>' +
      F.opa(700, 445, 1.5));
  };

  // 1.3 – De steen drijft in de emmer
  P.emmer = function () {
    return F.svg(zolder(false) +
      // emmer
      '<path d="M320 250 L520 250 L495 415 L345 415 Z" fill="#9aa7b0" stroke="#5e6b73" stroke-width="4"/>' +
      '<path d="M330 300 H510 M338 360 H502" stroke="#7d8a93" stroke-width="3"/>' +
      '<path d="M320 250 Q420 160 520 250" fill="none" stroke="#5e6b73" stroke-width="4"/>' +
      '<ellipse cx="420" cy="252" rx="100" ry="20" fill="#5aa7d6" stroke="#5e6b73" stroke-width="4"/>' +
      // kringen
      '<g class="anim-kring"><ellipse cx="420" cy="250" rx="80" ry="14" fill="none" stroke="#fff" stroke-width="2"/></g>' +
      '<g class="anim-kring-2"><ellipse cx="420" cy="250" rx="80" ry="14" fill="none" stroke="#fff" stroke-width="2"/></g>' +
      // drijvende steen
      '<g class="anim-drijf">' + F.kiezel(420, 238, 1.1, { slaap: true }) + "</g>" +
      // spatjes
      '<g fill="#8fd0f5"><circle cx="360" cy="215" r="5"/><circle cx="480" cy="210" r="6"/><circle cx="455" cy="190" r="4"/><circle cx="385" cy="195" r="4"/></g>' +
      F.label(560, 200, "Plons!", { grootte: 30, kleur: "#1e4f8a", rand: "#fff" }) +
      F.noor(200, 440, 1.6, { mond: "o" }));
  };

  // 1.4 – Kiezel wordt wakker
  P["kiezel-wakker"] = function () {
    return F.svg(zolder(false) + dozen() +
      F.noor(280, 445, 2.1, { arm: "omhoog", mond: "blij" }) +
      '<g class="anim-zweef">' + F.kiezel(370, 150, 2.2) + "</g>" +
      '<path d="M340 200 Q370 214 400 200" fill="none" stroke="' + F.HUID + '" stroke-width="16" stroke-linecap="round"/>' +
      F.label(370, 72, "Hallo!", { grootte: 26, kleur: "#d9481f", rand: "#fff" }) +
      F.opa(640, 445, 1.7, { knipoog: true }));
  };

  // 10.2 gebruikt ook de zolder, maar dan met zon.
  window.ZOLDER = { zolder: zolder, dozen: dozen, kaart: kaart };
})();
