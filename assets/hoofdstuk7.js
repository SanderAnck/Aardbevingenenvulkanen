/* Prenten van hoofdstuk 7 – Wanneer de grond beeft */
(function () {
  var F = window.FIG, P = window.PRENTEN;

  // 7.1 – Binnen in de Boorbol trilt alles een beetje
  P["grond-trilt"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#e8a33a"/>' +
      '<g class="anim-tril-zacht">' +
        // ronde binnenwand
        '<ellipse cx="400" cy="225" rx="420" ry="260" fill="#f3d9a6"/>' +
        '<rect y="370" width="800" height="80" fill="#c8935a"/>' +
        // patrijspoort met IJsland buiten
        '<circle cx="560" cy="150" r="80" fill="#9fcff0" stroke="#8a5a3b" stroke-width="12"/>' +
        '<path d="M486 180 L530 140 L560 160 L600 120 L636 170 Q600 220 560 228 Q510 224 486 180 Z" fill="#6e5a4e"/>' +
        '<path d="M520 150 L530 140 L540 147 Z M590 130 L600 120 L612 134 Z" fill="#fff"/>' +
        // plankje met kopjes
        '<rect x="80" y="160" width="220" height="12" fill="#8a5a3b"/>' +
        '<g class="anim-tril">' +
          '<path d="M110 130 h34 v22 q0 8 -8 8 h-18 q-8 0 -8 -8 Z" fill="#f6efe2" stroke="#5e3a24" stroke-width="3"/><path d="M144 136 q10 0 10 8 t-10 8" fill="none" stroke="#5e3a24" stroke-width="3"/>' +
          '<path d="M180 130 h34 v22 q0 8 -8 8 h-18 q-8 0 -8 -8 Z" fill="#1e4f8a" stroke="#5e3a24" stroke-width="3"/><path d="M214 136 q10 0 10 8 t-10 8" fill="none" stroke="#5e3a24" stroke-width="3"/>' +
          '<path d="M248 130 h34 v22 q0 8 -8 8 h-18 q-8 0 -8 -8 Z" fill="#d9481f" stroke="#5e3a24" stroke-width="3"/>' +
        "</g>" +
        // trillijntjes
        '<path d="M96 118 l-8 -10 M196 112 v-12 M290 118 l8 -10" stroke="#5e3a24" stroke-width="3" stroke-linecap="round"/>' +
        F.label(200, 90, "rinkel!", { grootte: 18, kleur: "#d9481f" }) +
        F.opa(330, 420, 1.45) +
        F.noor(250, 420, 1.2, { mond: "o", arm: "omhoog" }) +
        F.kiezel(450, 400, 0.9) +
      "</g>" +
      '<path d="M20 430 q10 -8 20 0 t20 0 t20 0 M720 430 q10 -8 20 0 t20 0 t20 0" fill="none" stroke="#5e3a24" stroke-width="3"/>'
    );
  };

  // 7.2a – Een latje buigen tot het knakt
  P["latje-buigt"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#fbf4e6"/>' +
      // gebogen latje met een breuk in het midden
      '<path d="M150 280 Q270 190 392 168 L396 186 Q280 206 162 300 Z" fill="#d6a46a" stroke="#7a4f2c" stroke-width="3"/>' +
      '<path d="M650 280 Q530 190 408 168 L404 186 Q520 206 638 300 Z" fill="#d6a46a" stroke="#7a4f2c" stroke-width="3"/>' +
      '<path d="M392 168 L400 160 L404 170 L410 162 L408 168 M396 186 L402 194 L404 186" fill="none" stroke="#7a4f2c" stroke-width="3"/>' +
      // splinters
      '<g class="anim-vonk"><path d="M400 150 l-10 -20 M410 150 l12 -18 M396 196 l-12 16" stroke="#7a4f2c" stroke-width="4" stroke-linecap="round"/></g>' +
      // armen die van opzij komen, met de handen rond het latje
      '<path d="M-20 420 Q60 360 130 300" fill="none" stroke="#4f7a4a" stroke-width="56" stroke-linecap="round"/>' +
      '<path d="M820 420 Q740 360 670 300" fill="none" stroke="#4f7a4a" stroke-width="56" stroke-linecap="round"/>' +
      '<ellipse cx="150" cy="288" rx="40" ry="30" fill="' + F.HUID + '" stroke="#c98d68" stroke-width="3"/>' +
      '<ellipse cx="650" cy="288" rx="40" ry="30" fill="' + F.HUID + '" stroke="#c98d68" stroke-width="3"/>' +
      '<path d="M140 262 q14 -4 18 10 M128 270 q14 -4 18 10 M120 282 q12 -2 16 10 M660 262 q-14 -4 -18 10 M672 270 q-14 -4 -18 10 M680 282 q-12 -2 -16 10" fill="none" stroke="#c98d68" stroke-width="3"/>' +
      F.label(400, 90, "KRAK!", { grootte: 46, kleur: "#d9481f", rand: "#fff" })
    );
  };

  // 7.2b – Platen die vastzitten en plots verschuiven
  P["platen-breken"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#cfe7f5"/>' +
      '<g class="anim-tril-zacht">' +
        // linkerblok
        '<path d="M0 170 H430 L370 450 H0 Z" fill="#8a5a3b"/>' +
        '<path d="M0 170 H430 L426 188 H0 Z" fill="#6f9b4f"/>' +
        '<path d="M0 250 H410 M0 330 H392" stroke="#7a4b2c" stroke-width="6"/>' +
        // rechterblok (een beetje verschoven)
        '<path d="M440 185 H800 V450 H380 Z" fill="#7a4b2c"/>' +
        '<path d="M440 185 H800 V203 H436 Z" fill="#6f9b4f"/>' +
        '<path d="M422 265 H800 M404 345 H800" stroke="#6e4a30" stroke-width="6"/>' +
        F.huisje(200, 172, 1) + F.huisje(620, 187, 1) +
      "</g>" +
      // breuklijn
      '<path d="M435 175 L420 230 L428 260 L410 320 L400 380 L385 450" fill="none" stroke="#ffd166" stroke-width="6" stroke-dasharray="14 8"/>' +
      // pijlen: ze willen langs elkaar
      '<path d="M300 400 V300 M286 316 L300 298 L314 316" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M540 280 V380 M526 364 L540 382 L554 364" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>' +
      F.label(420, 60, "spanning... en KRAK!", { grootte: 24, kleur: "#5e3a24" }) +
      '<g class="anim-tril"><path d="M330 120 q8 -8 16 0 t16 0 M470 130 q8 -8 16 0 t16 0" fill="none" stroke="#5e3a24" stroke-width="3"/></g>'
    );
  };

  // 7.3 – Kringen in het water en golven in de grond
  P.kringen = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#fbf4e6"/>' +
      // links: plas van boven
      '<ellipse cx="200" cy="250" rx="170" ry="140" fill="#5aa7d6"/>' +
      '<g class="anim-kring"><circle cx="200" cy="250" r="120" fill="none" stroke="#fff" stroke-width="4"/></g>' +
      '<g class="anim-kring-2"><circle cx="200" cy="250" r="120" fill="none" stroke="#fff" stroke-width="4"/></g>' +
      '<g class="anim-kring-3"><circle cx="200" cy="250" r="120" fill="none" stroke="#fff" stroke-width="4"/></g>' +
      F.kiezel(200, 250, 0.8) +
      F.label(200, 85, "Plons!", { grootte: 26, kleur: "#1e4f8a" }) +
      // rechts: doorsnede van de grond
      '<rect x="420" y="150" width="370" height="280" rx="12" fill="#8a5a3b"/>' +
      '<rect x="420" y="150" width="370" height="16" fill="#6f9b4f"/>' +
      F.huisje(500, 152, 0.8) + F.huisje(720, 152, 0.8) +
      // golven vanuit de breuk
      '<clipPath id="kringen-grond"><rect x="420" y="160" width="370" height="270" rx="12"/></clipPath>' +
      '<g clip-path="url(#kringen-grond)">' +
        '<g class="anim-kring"><circle cx="610" cy="380" r="220" fill="none" stroke="#ffd166" stroke-width="5"/></g>' +
        '<g class="anim-kring-2"><circle cx="610" cy="380" r="220" fill="none" stroke="#ffd166" stroke-width="5"/></g>' +
        '<g class="anim-kring-3"><circle cx="610" cy="380" r="220" fill="none" stroke="#ffd166" stroke-width="5"/></g>' +
      "</g>" +
      '<path d="M610 368 l4 8 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1 Z" fill="#d9481f"/>' +
      // epicentrum aan de oppervlakte
      '<path d="M610 150 V130 M598 140 L610 152 L622 140" fill="none" stroke="#d9481f" stroke-width="4" stroke-linecap="round"/>' +
      F.label(610, 120, "epicentrum", { grootte: 16, kleur: "#d9481f" })
    );
  };

  // 7.4 – De seismograaf
  P.seismograaf = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#f1e3c8"/>' +
      // tafel
      '<rect x="40" y="300" width="720" height="22" fill="#8a5a3b"/><rect x="70" y="322" width="18" height="128" fill="#7a4b2c"/><rect x="712" y="322" width="18" height="128" fill="#7a4b2c"/>' +
      // toestel
      '<rect x="120" y="170" width="150" height="130" rx="10" fill="#5e6b73"/>' +
      '<circle cx="195" cy="235" r="44" fill="#f6efe2" stroke="#3f4a52" stroke-width="5"/>' +
      '<g class="anim-draai"><path d="M195 191 V279 M151 235 H239" stroke="#c9c0ad" stroke-width="3"/></g>' +
      // papierstrook met zigzaglijn
      '<path d="M239 210 H720 V290 H239 Z" fill="#fff" stroke="#c9c0ad" stroke-width="2"/>' +
      '<path d="M720 250 H640 L630 246 L620 254 L610 250 H570 L560 220 L550 282 L540 228 L530 270 L520 240 L510 258 L500 250 H260" fill="none" stroke="#1e4f8a" stroke-width="3" stroke-linejoin="round"/>' +
      // pen
      '<path d="M120 120 H300 V130 H120 Z" fill="#3f4a52"/>' +
      '<g class="anim-pen"><path d="M260 130 V244 L256 252 L264 252 L260 244" fill="#d9481f" stroke="#d9481f" stroke-width="4"/></g>' +
      // kalender: elke dag
      '<rect x="680" y="30" width="80" height="80" rx="8" fill="#fff" stroke="#5e3a24" stroke-width="3"/><rect x="680" y="30" width="80" height="22" rx="8" fill="#d9481f"/>' +
      F.label(720, 92, "elke dag", { grootte: 13 }) +
      // Noor klopt op de tafel
      F.noor(90, 300, 1, { arm: "omhoog" }) +
      F.label(140, 160, "klop klop", { grootte: 16, kleur: "#d9481f" })
    );
  };

  // 7.5 – Aardbevingen in en rond België
  P["kaart-belgie"] = function () {
    return F.svg(
      '<rect width="800" height="450" fill="#e9e2d0"/>' +
      // Noordzee
      '<path d="M0 0 H240 L268 70 L177 118 L0 180 Z" fill="#9cc9ee"/>' +
      F.label(80, 60, "Noordzee", { grootte: 16, kleur: "#1e4f8a" }) +
      // Nederland
      '<path d="M240 0 H579 L579 47 L570 100 L559 177 L546 177 L522 175 L540 113 L480 90 L447 51 L381 51 L268 70 Z" fill="#d7e4c3"/>' +
      F.label(400, 30, "Nederland", { grootte: 15, kleur: "#5e6b73" }) +
      F.label(680, 200, "Duitsland", { grootte: 15, kleur: "#5e6b73" }) +
      F.label(260, 400, "Frankrijk", { grootte: 15, kleur: "#5e6b73" }) +
      // België
      '<path d="M177 118 L268 70 L381 51 L447 51 L480 90 L540 113 L522 175 L546 177 L559 177 L601 251 L571 284 L535 385 L496 393 L430 341 L430 281 L359 312 L298 229 L210 177 Z" fill="#f6d77a" stroke="#7a4f2c" stroke-width="4" stroke-linejoin="round"/>' +
      F.label(400, 260, "België", { grootte: 26 }) +
      // sterren: Luik en Roermond
      '<g class="anim-gloei"><path d="M510 186 l4 8 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1 Z" fill="#d9481f" stroke="#fff" stroke-width="2"/></g>' +
      F.label(510, 232, "Luik 1983", { grootte: 14, rand: "#fff" }) +
      '<g class="anim-gloei"><path d="M556 89 l4 8 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1 Z" fill="#d9481f" stroke="#fff" stroke-width="2"/></g>' +
      F.label(610, 98, "Roermond 1992", { grootte: 14, rand: "#fff", anker: "start" }) +
      // Ukkel
      '<circle cx="373" cy="168" r="7" fill="#1e4f8a" stroke="#fff" stroke-width="2"/>' +
      F.label(373, 214, "Ukkel", { grootte: 13, rand: "#fff" }) +
      F.noor(690, 440, 1.1) + F.opa(750, 440, 1.1)
    );
  };
})();
