/* Prenten van hoofdstuk 2 – Reis naar binnen in de aarde */
(function () {
  var F = window.FIG, P = window.PRENTEN;

  // Stenen in de grond, die voorbij schuiven.
  function stenen(kleur) {
    var uit = "";
    var plekken = [[80, 60, 22], [190, 330, 16], [650, 90, 26], [720, 300, 18], [120, 210, 14], [600, 380, 20], [260, 120, 12], [700, 200, 12], [90, 400, 18]];
    plekken.forEach(function (p) {
      uit += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="' + p[2] + '" ry="' + (p[2] * 0.7) + '" fill="' + kleur + '"/>';
    });
    return uit;
  }

  // 2.1 – In de Boorbol naar beneden
  P.boorbol = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#8a5a3b"/>' +
      '<path d="M0 0 H800 V40 Q400 70 0 40 Z" fill="#6f9b4f"/>' +
      '<path d="M0 40 Q400 70 800 40 V60 Q400 90 0 60 Z" fill="#6e4a30"/>' +
      '<g class="anim-stijgen">' + stenen("#6e4a30") + "</g>" +
      // tunnel
      '<path d="M330 0 H470 V450 H330 Z" fill="#5e3a24" opacity=".5"/>' +
      '<g class="anim-zakken">' + F.boorbol(400, 210, 1.75, { boor: true }) + "</g>" +
      // pijltjes naar beneden
      '<g fill="#f6efe2" opacity=".85"><path d="M150 250 h20 v40 h14 l-24 26 l-24 -26 h14 Z"/><path d="M630 250 h20 v40 h14 l-24 26 l-24 -26 h14 Z"/></g>' +
      F.label(160, 360, "dieper", { kleur: "#f6efe2", grootte: 22 }) + F.label(640, 360, "dieper", { kleur: "#f6efe2", grootte: 22 })
    );
  };

  // 2.2 – De aarde als een perzik
  P.perzik = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#fbf4e6"/>' +
      // aarde: korst, mantel, kern
      '<circle cx="210" cy="235" r="160" fill="#7a4b2c"/>' +
      '<circle cx="210" cy="235" r="151" fill="#e8823a"/>' +
      '<g class="anim-gloei"><circle cx="210" cy="235" r="72" fill="#f5b942"/></g>' +
      '<circle cx="210" cy="235" r="56" fill="#ffd166"/>' +
      // een stukje land en zee op de korst
      '<path d="M108 112 Q140 86 186 76 L190 83 Q148 92 114 118 Z" fill="#6f9b4f"/>' +
      '<path d="M236 76 Q296 82 322 116 L316 120 Q290 92 234 83 Z" fill="#2b6cb0"/>' +
      F.label(210, 430, "De aarde", { grootte: 20 }) +
      // perzik
      '<circle cx="560" cy="235" r="122" fill="#f08a5d"/>' +
      '<circle cx="560" cy="235" r="114" fill="#ffc48a"/>' +
      '<ellipse cx="560" cy="235" rx="44" ry="56" fill="#8a4b2a"/>' +
      '<path d="M542 202 Q556 216 544 232 M570 192 Q582 210 572 228 M546 250 Q560 262 552 280 M574 248 Q586 262 576 276" fill="none" stroke="#6b3418" stroke-width="3"/>' +
      '<path d="M560 113 Q570 90 595 84 Q592 106 560 113 Z" fill="#6f9b4f"/>' +
      F.label(560, 430, "Een perzik", { grootte: 20 }) +
      // uitleg naast de perzik
      '<path d="M660 170 L690 150 M640 250 L690 250 M600 235 L690 340" stroke="#7a4b2c" stroke-width="2"/>' +
      F.label(694, 155, "velletje", { grootte: 15, kleur: "#7a4b2c", anker: "start" }) +
      F.label(694, 255, "vruchtvlees", { grootte: 15, kleur: "#c75e17", anker: "start" }) +
      F.label(694, 345, "pit", { grootte: 15, kleur: "#8a4b2a", anker: "start" })
    );
  };

  // 2.3 – In de hete mantel
  P["in-de-mantel"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#d9692a"/>' +
      '<g class="anim-golf" opacity=".5"><path d="M-40 120 Q100 80 240 120 T520 120 T840 120" fill="none" stroke="#f5b942" stroke-width="30"/>' +
      '<path d="M-40 260 Q100 220 240 260 T520 260 T840 260" fill="none" stroke="#c2501c" stroke-width="40"/></g>' +
      '<g class="anim-golf-2" opacity=".5"><path d="M-40 380 Q100 340 240 380 T520 380 T840 380" fill="none" stroke="#f5b942" stroke-width="26"/></g>' +
      // magma-plekje
      '<g class="anim-gloei"><ellipse cx="640" cy="335" rx="110" ry="60" fill="#ffd166" opacity=".5"/></g>' +
      '<path d="M550 335 Q560 290 620 292 Q700 285 725 330 Q720 380 640 382 Q560 384 550 335 Z" fill="#ff5a1f"/>' +
      '<path d="M580 336 Q600 312 640 314 Q684 312 696 336 Q680 360 640 360 Q596 360 580 336 Z" fill="#ffb347"/>' +
      '<g fill="#ffe3a3"><g class="anim-bubbel"><circle cx="610" cy="330" r="6"/></g><g class="anim-bubbel-2"><circle cx="655" cy="325" r="5"/></g><g class="anim-bubbel-3"><circle cx="680" cy="340" r="4"/></g></g>' +
      F.boorbol(290, 215, 1.6, { raam: "#ffcf8a" }) +
      // zweetdruppels
      '<g fill="#bfe3f2"><path d="M440 120 q8 14 0 20 q-8 -6 0 -20 Z"/><path d="M465 150 q7 12 0 17 q-7 -5 0 -17 Z"/></g>'
    );
  };

  // 2.4 – De Boorbol stijgt weer
  P["boorbol-stijgt"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#8a5a3b"/>' +
      '<rect y="300" width="800" height="150" fill="#c2601f"/>' +
      '<path d="M0 300 Q200 280 400 300 T800 300 V330 H0 Z" fill="#a4552a"/>' +
      '<rect y="0" width="800" height="70" fill="#6e4a30"/>' +
      '<g class="anim-zakken">' + stenen("#6e4a30") + "</g>" +
      '<g class="anim-stijgen">' + F.boorbol(400, 200, 1.5) + "</g>" +
      '<g fill="#f6efe2" opacity=".85"><path d="M170 220 h20 v-40 h14 l-24 -26 l-24 26 h14 Z"/><path d="M610 220 h20 v-40 h14 l-24 -26 l-24 26 h14 Z"/></g>' +
      F.label(180, 260, "omhoog", { kleur: "#f6efe2", grootte: 22 }) + F.label(620, 260, "omhoog", { kleur: "#f6efe2", grootte: 22 }) +
      F.label(400, 420, "warm", { kleur: "#ffe3a3", grootte: 20 }) + F.label(400, 45, "koeler", { kleur: "#f6efe2", grootte: 20 })
    );
  };
})();
