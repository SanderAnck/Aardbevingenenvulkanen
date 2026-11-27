/* =====================================================================
   FIGUREN – bouwstenen voor de prenten
   ---------------------------------------------------------------------
   Hier staan de personages (Noor, opa Staf, Kiezel), de Boorbol en een
   paar andere tekeningen die in veel prenten terugkomen.
   Elke prent is 800 breed en 450 hoog.

   Belangrijk voor wie tekent: zet een animatieklasse (anim-...) nooit op
   een element dat zelf al een transform="..." heeft. Zet er een extra
   <g class="anim-..."> rond.
   ===================================================================== */

window.PRENTEN = window.PRENTEN || {};

window.FIG = (function () {
  "use strict";

  var HUID = "#f2c39b";
  var LIJN = "#3b2618";

  // Een volledige prent maken.
  function svg(inhoud) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" ' +
      'preserveAspectRatio="xMidYMid meet" font-family="Verdana, Arial, sans-serif">' +
      inhoud + "</svg>";
  }

  // Schuiven en vergroten.
  function plaats(x, y, s, inhoud) {
    return '<g transform="translate(' + x + " " + y + ") scale(" + (s || 1) + ')">' + inhoud + "</g>";
  }

  // Een tekstje in de prent.
  function label(x, y, tekst, opties) {
    opties = opties || {};
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (opties.anker || "middle") +
      '" font-size="' + (opties.grootte || 20) + '" font-weight="' + (opties.dik === false ? "normal" : "bold") +
      '" fill="' + (opties.kleur || LIJN) + '"' +
      (opties.rand ? ' stroke="' + opties.rand + '" stroke-width="5" paint-order="stroke" stroke-linejoin="round"' : "") +
      ">" + tekst + "</text>";
  }

  /* ---------- Noor ----------
     Hoofd: middelpunt (0,0). Opties: mond "lach" | "o" | "blij".   */
  function noorHoofd(x, y, s, mond) {
    var m = mond === "o"
      ? '<ellipse cx="0" cy="10" rx="4" ry="5" fill="' + LIJN + '"/>'
      : (mond === "blij"
        ? '<path d="M-8 7 Q0 17 8 7 Z" fill="#a8362a"/>'
        : '<path d="M-7 9 Q0 15 7 9" fill="none" stroke="' + LIJN + '" stroke-width="2.4" stroke-linecap="round"/>');
    return plaats(x, y, s,
      // paardenstaart
      '<ellipse cx="24" cy="-12" rx="8" ry="15" fill="#6b3b1f" transform="rotate(25 24 -12)"/>' +
      '<circle cx="19" cy="-17" r="4" fill="#f07b2a"/>' +
      // hoofd
      '<circle cx="0" cy="0" r="22" fill="' + HUID + '"/>' +
      // haar
      '<path d="M-23 2 Q-26 -26 0 -25 Q26 -26 23 2 Q18 -13 6 -15 Q-4 -9 -18 -12 Q-21 -6 -23 2 Z" fill="#6b3b1f"/>' +
      // ogen en wangen
      '<circle cx="-8" cy="-1" r="2.8" fill="' + LIJN + '"/><circle cx="8" cy="-1" r="2.8" fill="' + LIJN + '"/>' +
      '<circle cx="-13" cy="6" r="4" fill="#f29a8c" opacity=".6"/><circle cx="13" cy="6" r="4" fill="#f29a8c" opacity=".6"/>' +
      m);
  }

  /* Noor volledig. (x,y) = tussen haar voeten. Ze is 150 hoog.
     arm: "omlaag" (standaard), "omhoog" (rechterhand vooruit: hand op
     ongeveer x+38*s, y-118*s), "zwaai".                               */
  function noor(x, y, s, opties) {
    opties = opties || {};
    var arm = opties.arm || "omlaag";
    var rechts = arm === "omhoog"
      ? '<path d="M18 -98 Q34 -100 38 -118" fill="none" stroke="' + HUID + '" stroke-width="9" stroke-linecap="round"/>'
      : (arm === "zwaai"
        ? '<path d="M18 -98 Q34 -112 34 -134" fill="none" stroke="' + HUID + '" stroke-width="9" stroke-linecap="round"/>'
        : '<path d="M18 -98 Q28 -80 30 -62" fill="none" stroke="' + HUID + '" stroke-width="9" stroke-linecap="round"/>');
    return plaats(x, y, s,
      // benen en schoenen
      '<rect x="-13" y="-50" width="10" height="48" rx="4" fill="#2f3e6b"/>' +
      '<rect x="3" y="-50" width="10" height="48" rx="4" fill="#2f3e6b"/>' +
      '<ellipse cx="-9" cy="-2" rx="10" ry="5" fill="' + LIJN + '"/><ellipse cx="9" cy="-2" rx="10" ry="5" fill="' + LIJN + '"/>' +
      // armen
      '<path d="M-18 -98 Q-28 -80 -30 -62" fill="none" stroke="' + HUID + '" stroke-width="9" stroke-linecap="round"/>' +
      rechts +
      // kleedje
      '<path d="M-19 -106 Q0 -112 19 -106 L30 -46 Q0 -40 -30 -46 Z" fill="#f07b2a"/>' +
      '<path d="M-24 -62 Q0 -58 24 -62" fill="none" stroke="#c75e17" stroke-width="3"/>' +
      // nek en hoofd
      '<rect x="-5" y="-110" width="10" height="8" fill="' + HUID + '"/>' +
      noorHoofd(0, -125, 1, opties.mond));
  }

  /* ---------- Opa Staf ---------- */
  function opaHoofd(x, y, s, opties) {
    opties = opties || {};
    var ogen = opties.knipoog
      ? '<circle cx="-9" cy="-2" r="2.6" fill="' + LIJN + '"/><path d="M5 -2 Q9 -5 13 -2" fill="none" stroke="' + LIJN + '" stroke-width="2.4" stroke-linecap="round"/>'
      : (opties.slaap
        ? '<path d="M-13 -2 Q-9 1 -5 -2 M5 -2 Q9 1 13 -2" fill="none" stroke="' + LIJN + '" stroke-width="2.4" stroke-linecap="round"/>'
        : '<circle cx="-9" cy="-2" r="2.6" fill="' + LIJN + '"/><circle cx="9" cy="-2" r="2.6" fill="' + LIJN + '"/>');
    return plaats(x, y, s,
      '<circle cx="0" cy="0" r="24" fill="' + HUID + '"/>' +
      // grijs haar opzij
      '<ellipse cx="-22" cy="-4" rx="7" ry="11" fill="#d9d9d9"/><ellipse cx="22" cy="-4" rx="7" ry="11" fill="#d9d9d9"/>' +
      '<path d="M-14 -20 Q0 -28 14 -20" fill="none" stroke="#d9d9d9" stroke-width="4" stroke-linecap="round"/>' +
      // baard
      '<path d="M-21 6 Q-20 32 0 34 Q20 32 21 6 Q12 14 0 13 Q-12 14 -21 6 Z" fill="#f4f4f4"/>' +
      // bril
      '<circle cx="-9" cy="-2" r="7.5" fill="none" stroke="#333" stroke-width="2"/>' +
      '<circle cx="9" cy="-2" r="7.5" fill="none" stroke="#333" stroke-width="2"/>' +
      '<path d="M-1.5 -2 H1.5" stroke="#333" stroke-width="2"/>' +
      ogen +
      // neus en lach
      '<ellipse cx="0" cy="6" rx="4" ry="3.4" fill="#e0a27c"/>' +
      '<path d="M-7 15 Q0 21 7 15" fill="none" stroke="' + LIJN + '" stroke-width="2.4" stroke-linecap="round"/>');
  }

  // Opa volledig. (x,y) = tussen zijn voeten. Hij is 180 hoog.
  function opa(x, y, s, opties) {
    opties = opties || {};
    var rechts = opties.arm === "wijs"
      ? '<path d="M22 -128 Q44 -132 58 -148" fill="none" stroke="#4f7a4a" stroke-width="12" stroke-linecap="round"/><circle cx="60" cy="-150" r="6" fill="' + HUID + '"/>'
      : (opties.arm === "omhoog"
        ? '<path d="M22 -128 Q40 -124 44 -146" fill="none" stroke="#4f7a4a" stroke-width="12" stroke-linecap="round"/><circle cx="44" cy="-150" r="7" fill="' + HUID + '"/>'
        : '<path d="M22 -128 Q32 -100 30 -76" fill="none" stroke="#4f7a4a" stroke-width="12" stroke-linecap="round"/><circle cx="30" cy="-72" r="7" fill="' + HUID + '"/>');
    return plaats(x, y, s,
      '<rect x="-17" y="-62" width="14" height="60" rx="5" fill="#5b4636"/>' +
      '<rect x="3" y="-62" width="14" height="60" rx="5" fill="#5b4636"/>' +
      '<ellipse cx="-11" cy="-2" rx="12" ry="5" fill="' + LIJN + '"/><ellipse cx="11" cy="-2" rx="12" ry="5" fill="' + LIJN + '"/>' +
      '<path d="M-22 -128 Q-32 -100 -30 -76" fill="none" stroke="#4f7a4a" stroke-width="12" stroke-linecap="round"/>' +
      '<circle cx="-30" cy="-72" r="7" fill="' + HUID + '"/>' +
      '<rect x="-26" y="-136" width="52" height="82" rx="16" fill="#4f7a4a"/>' +
      '<path d="M-8 -136 L0 -116 L8 -136 Z" fill="#f6efe2"/>' +
      '<circle cx="0" cy="-104" r="2.5" fill="#2f4d2c"/><circle cx="0" cy="-90" r="2.5" fill="#2f4d2c"/><circle cx="0" cy="-76" r="2.5" fill="#2f4d2c"/>' +
      rechts +
      opaHoofd(0, -158, 1, opties));
  }

  /* ---------- Kiezel, de pratende puimsteen ----------
     (x,y) = midden van Kiezel. opties.slaap = ogen dicht. */
  function kiezel(x, y, s, opties) {
    opties = opties || {};
    var ogen = opties.slaap
      ? '<path d="M-13 -4 Q-8 0 -3 -4 M3 -4 Q8 0 13 -4" fill="none" stroke="' + LIJN + '" stroke-width="2.2" stroke-linecap="round"/>'
      : '<g class="anim-knipoog"><circle cx="-8" cy="-5" r="6" fill="#fff"/><circle cx="8" cy="-5" r="6" fill="#fff"/>' +
        '<circle cx="-7" cy="-4" r="3" fill="' + LIJN + '"/><circle cx="9" cy="-4" r="3" fill="' + LIJN + '"/></g>';
    return plaats(x, y, s,
      '<path d="M-27 4 Q-30 -16 -10 -20 Q8 -26 24 -14 Q32 -2 24 12 Q8 22 -10 19 Q-26 16 -27 4 Z" fill="#b3aea3" stroke="#7d786e" stroke-width="2"/>' +
      '<circle cx="-17" cy="8" r="2.4" fill="#8a857b"/><circle cx="-20" cy="-6" r="1.8" fill="#8a857b"/>' +
      '<circle cx="18" cy="6" r="2.2" fill="#8a857b"/><circle cx="2" cy="-16" r="1.8" fill="#8a857b"/>' +
      '<circle cx="12" cy="-14" r="1.4" fill="#8a857b"/><circle cx="-4" cy="14" r="1.6" fill="#8a857b"/>' +
      '<circle cx="21" cy="-6" r="1.4" fill="#8a857b"/>' +
      ogen +
      '<path d="M-6 6 Q0 12 6 6" fill="none" stroke="' + LIJN + '" stroke-width="2.2" stroke-linecap="round"/>');
  }

  /* ---------- De Boorbol ----------
     (x,y) = middelpunt. opties.raam = kleur van het raam,
     opties.leeg = geen personages, opties.boor = boorpunt onderaan. */
  function boorbol(x, y, s, opties) {
    opties = opties || {};
    var raam = opties.raam || "#bfe3f2";
    var binnen = opties.leeg ? "" :
      noorHoofd(-16, 8, 0.75) + opaHoofd(17, 10, 0.72) + kiezel(0, 30, 0.42);
    var boor = opties.boor
      ? '<path d="M-30 58 L30 58 L0 102 Z" fill="#9aa7b0" stroke="#5e6b73" stroke-width="3"/>' +
        '<path d="M-20 70 L18 64 M-12 82 L12 76 M-6 92 L6 89" stroke="#5e6b73" stroke-width="3"/>'
      : "";
    return plaats(x, y, s,
      boor +
      // antenne
      '<path d="M0 -70 V-90" stroke="#5e3a24" stroke-width="4"/>' +
      '<g class="anim-gloei"><circle cx="0" cy="-93" r="7" fill="#ffd166"/></g>' +
      // romp
      '<circle cx="0" cy="0" r="70" fill="#e8a33a" stroke="#8a5a3b" stroke-width="5"/>' +
      '<path d="M-68 14 Q0 34 68 14" fill="none" stroke="#c47f1f" stroke-width="5"/>' +
      // lampjes
      '<g class="anim-gloei"><circle cx="-52" cy="-34" r="5" fill="#fff6c2"/><circle cx="52" cy="-34" r="5" fill="#fff6c2"/>' +
      '<circle cx="-62" cy="0" r="5" fill="#fff6c2"/><circle cx="62" cy="0" r="5" fill="#fff6c2"/></g>' +
      // raam
      '<circle cx="0" cy="-2" r="46" fill="' + raam + '" stroke="#5e3a24" stroke-width="6"/>' +
      binnen +
      '<path d="M-30 -28 Q-18 -40 -4 -40" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>');
  }

  // Een sterrenhemel (voor nachtprenten).
  function sterren(aantal, hoogte, zaad) {
    var uit = "";
    var r = zaad || 7;
    for (var i = 0; i < aantal; i++) {
      r = (r * 9301 + 49297) % 233280;          // vaste "toeval" zodat de prent altijd hetzelfde is
      var x = Math.round(r / 233280 * 800);
      r = (r * 9301 + 49297) % 233280;
      var y = Math.round(r / 233280 * (hoogte || 250));
      var grootte = (i % 3) + 1;
      uit += '<circle cx="' + x + '" cy="' + y + '" r="' + grootte * 0.8 + '" fill="#fff8d6" opacity="' + (0.5 + (i % 2) * 0.4) + '"/>';
    }
    return uit;
  }

  // Een eenvoudige wolk.
  function wolk(x, y, s, kleur) {
    return plaats(x, y, s,
      '<g fill="' + (kleur || "#ffffff") + '"><ellipse cx="0" cy="0" rx="46" ry="20"/>' +
      '<circle cx="-18" cy="-12" r="20"/><circle cx="12" cy="-18" r="24"/><circle cx="34" cy="-4" r="16"/></g>');
  }

  // Golfjes in het water (een lange golvende lijn).
  function golfjes(y, kleur, breedte) {
    var d = "M-40 " + y;
    for (var x = -40; x < 860; x += 40) d += " q20 -10 40 0";
    return '<path d="' + d + '" fill="none" stroke="' + (kleur || "#ffffff") + '" stroke-width="' + (breedte || 3) +
      '" stroke-linecap="round" opacity=".6"/>';
  }

  // Een kleine rookpluim.
  function rook(x, y, s, kleur) {
    var k = kleur || "#cfc8c0";
    return plaats(x, y, s,
      '<g class="anim-rook"><circle cx="0" cy="-10" r="16" fill="' + k + '"/><circle cx="12" cy="-30" r="20" fill="' + k + '"/><circle cx="-6" cy="-52" r="24" fill="' + k + '"/></g>' +
      '<g class="anim-rook-2"><circle cx="4" cy="-14" r="14" fill="' + k + '"/><circle cx="-10" cy="-34" r="18" fill="' + k + '"/></g>');
  }

  // Een eenvoudig huisje.
  function huisje(x, y, s, kleur) {
    return plaats(x, y, s,
      '<rect x="-24" y="-36" width="48" height="36" fill="' + (kleur || "#f3e3bf") + '" stroke="' + LIJN + '" stroke-width="2"/>' +
      '<path d="M-30 -34 L0 -60 L30 -34 Z" fill="#b5462a" stroke="' + LIJN + '" stroke-width="2"/>' +
      '<rect x="-6" y="-18" width="12" height="18" fill="#7a4b2c"/>' +
      '<rect x="-19" y="-28" width="9" height="9" fill="#bfe3f2"/><rect x="10" y="-28" width="9" height="9" fill="#bfe3f2"/>');
  }

  return {
    svg: svg, plaats: plaats, label: label,
    noor: noor, noorHoofd: noorHoofd, opa: opa, opaHoofd: opaHoofd,
    kiezel: kiezel, boorbol: boorbol,
    sterren: sterren, wolk: wolk, golfjes: golfjes, rook: rook, huisje: huisje,
    HUID: HUID, LIJN: LIJN
  };
})();

/* ---------- Startscherm: een vulkaan bij nacht ---------- */
window.PRENTEN.start = function () {
  var F = window.FIG;
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMax slice">' +
    '<rect width="800" height="450" fill="#1d2340"/>' +
    '<rect y="250" width="800" height="200" fill="#262d52"/>' +
    F.sterren(70, 240, 3) +
    '<circle cx="660" cy="70" r="26" fill="#fff3c4"/><circle cx="672" cy="62" r="24" fill="#1d2340"/>' +
    // verre bergen
    '<path d="M0 360 L120 300 L210 340 L300 310 L380 360 Z" fill="#2c3460"/>' +
    '<path d="M500 360 L600 310 L700 335 L800 300 L800 450 L500 450 Z" fill="#2c3460"/>' +
    // zachte gloed boven de krater
    '<g class="anim-gloei"><ellipse cx="400" cy="262" rx="90" ry="34" fill="#f59e0b" opacity=".22"/>' +
    '<ellipse cx="400" cy="264" rx="52" ry="16" fill="#ffb347" opacity=".35"/></g>' +
    // vulkaan
    '<path d="M110 450 L350 262 Q400 252 450 262 L690 450 Z" fill="#4a2e22"/>' +
    '<ellipse cx="400" cy="263" rx="50" ry="9" fill="#2a1a14"/>' +
    '<g class="anim-gloei"><ellipse cx="400" cy="264" rx="40" ry="6" fill="#ff7a3d"/></g>' +
    '<path d="M384 268 Q376 310 360 350 Q348 390 352 450 L362 450 Q360 392 372 352 Q388 312 394 268 Z" fill="#e8572a" opacity=".85"/>' +
    // rook
    F.rook(400, 245, 1.1, "#5b5f7d") +
    '<path d="M0 450 L0 410 Q200 395 400 420 Q600 440 800 405 L800 450 Z" fill="#141a33"/>' +
    "</svg>";
};
