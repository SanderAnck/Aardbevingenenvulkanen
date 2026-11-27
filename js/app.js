/* =====================================================================
   De aarde bromt – de code van de app
   ---------------------------------------------------------------------
   Hier staat hoe de app werkt: aanmelden, schermen wisselen, scènes
   tonen, ontdekplekken, moeilijke woorden, het keuzemoment, opdrachten,
   de cyclus, voorlezen, geluid, minder beweging en "verder lezen".
   De verhaaltekst en de opdrachten staan in js/verhaal.js.
   Hoe elke opdracht werkt, staat in js/opdrachten.js.
   Antwoorden en scores worden bewaard via js/resultaten.js.
   ===================================================================== */

(function () {
  "use strict";

  /* -------------------------------------------------------------
     1. Hulpjes
     ------------------------------------------------------------- */

  // Snel een element zoeken op id.
  function $(id) { return document.getElementById(id); }

  // Tekst veilig in HTML zetten (zodat < en & geen problemen geven).
  function veilig(tekst) {
    return String(tekst)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var VERHAAL = window.VERHAAL || [];
  var WOORDEN = window.WOORDEN || {};
  var PRENTEN = window.PRENTEN || {};
  var CYCLI = window.CYCLI || {};
  var R = window.RESULTATEN;

  // Afmetingen van elke prent (viewBox van de SVG).
  var PRENT_BREEDTE = 800;
  var PRENT_HOOGTE = 450;

  /* -------------------------------------------------------------
     2. De volgorde van de scènes
     -------------------------------------------------------------
     Alle scènes staan achter elkaar in één lange lijst ("reeks").
     Het keuzemoment bepaalt enkel welke van de twee gekozen scènes
     eerst komt (bv. Italië of Hawaï). Beide worden altijd gelezen.  */

  var eersteKeuze = null;   // bv. "5.6" of "5.7"; null = nog niet gekozen
  var reeks = [];           // lijst van { hoofdstuk, scene }
  var positie = 0;          // waar we nu zijn in de reeks

  function maakReeks() {
    reeks = [];
    VERHAAL.forEach(function (hoofdstuk) {
      var scenes = hoofdstuk.scenes.slice();

      // Is er in dit hoofdstuk een keuze gemaakt? Wissel dan de twee
      // keuzescènes van plaats als de tweede gekozen werd.
      if (eersteKeuze) {
        scenes.forEach(function (s) {
          if (!s.keuze) return;
          var ids = s.keuze.map(function (k) { return k.eerst; });
          if (ids.indexOf(eersteKeuze) < 0) return;
          var plekken = ids.map(function (id) {
            return scenes.findIndex(function (x) { return x.id === id; });
          });
          var gekozen = scenes.findIndex(function (x) { return x.id === eersteKeuze; });
          var eerste = Math.min.apply(null, plekken);
          if (gekozen > eerste) {
            var tmp = scenes[eerste];
            scenes[eerste] = scenes[gekozen];
            scenes[gekozen] = tmp;
          }
        });
      }

      scenes.forEach(function (scene) {
        reeks.push({ hoofdstuk: hoofdstuk, scene: scene });
      });
    });
  }

  // Waar begint hoofdstuk nummer n in de reeks?
  function beginVanHoofdstuk(n) {
    for (var i = 0; i < reeks.length; i++) {
      if (reeks[i].hoofdstuk.nummer === n) return i;
    }
    return 0;
  }

  /* -------------------------------------------------------------
     3. Bewaren: het laatst gelezen hoofdstuk, per leerling
     ------------------------------------------------------------- */

  function bewaarHoofdstuk(nummer) { R.zetHoofdstuk(nummer); }

  function leesBewaardHoofdstuk() {
    var waarde = parseInt(R.hoofdstuk(), 10);
    return waarde >= 1 && waarde <= VERHAAL.length ? waarde : null;
  }

  /* -------------------------------------------------------------
     3b. Aanmelden
     -------------------------------------------------------------
     Staat er een klaslijst in js/klaslijst.js, dan klikt het kind op
     zijn naam. Is de lijst leeg, dan typt het zijn naam en klas.     */

  function maakAanmeldscherm() {
    var lijst = (window.KLASLIJST || {}).leerlingen || [];
    var klas = (window.KLASLIJST || {}).klas || "";
    var namen = $("namen");
    namen.innerHTML = "";
    if (lijst.length) {
      $("aanmelden-uitleg").textContent = "Klik op je naam.";
      $("naam-formulier").hidden = true;
      lijst.forEach(function (naam) {
        var knop = document.createElement("button");
        knop.type = "button";
        knop.className = "knop knop-naam";
        knop.textContent = naam;
        knop.addEventListener("click", function () { meldAan(naam, klas); });
        namen.appendChild(knop);
      });
    } else {
      $("aanmelden-uitleg").textContent = "Typ je naam en je klas.";
      $("naam-formulier").hidden = false;
      if (klas) $("klas-invoer").value = klas;
    }
  }

  function meldAan(naam, klas) {
    if (!R.meldAan(naam, klas)) return;
    toonScherm("start");
  }

  // Na het aanmelden kunnen opdrachten bewaard worden.
  function aangemeld() { return !!R.actief(); }

  /* -------------------------------------------------------------
     4. Schermen wisselen
     ------------------------------------------------------------- */

  function toonScherm(naam) {
    stopVoorlezen();
    // Wie niet aangemeld is, moet eerst zeggen wie hij is.
    if (!aangemeld() && naam !== "aanmelden" && naam !== "leerkracht") naam = "aanmelden";
    ["aanmelden", "start", "hoofdstukken", "verhaal", "leerkracht"].forEach(function (s) {
      $("scherm-" + s).classList.toggle("actief", s === naam);
    });
    window.scrollTo(0, 0);
    if (naam === "start") werkStartschermBij();
    if (naam === "aanmelden") maakAanmeldscherm();
    if (naam === "hoofdstukken") maakHoofdstukkenLijst();
  }

  function werkStartschermBij() {
    var l = R.actief();
    $("wie").textContent = l ? "Hallo " + l.naam + "!" : "";
    $("knop-afmelden").textContent = l ? "Ik ben niet " + l.naam : "Aanmelden";
    $("knop-verder").hidden = leesBewaardHoofdstuk() === null;
  }

  function startVerhaal(hoofdstukNummer) {
    maakReeks();
    positie = beginVanHoofdstuk(hoofdstukNummer || 1);
    toonScherm("verhaal");
    toonScene();
  }

  /* -------------------------------------------------------------
     5. Hoofdstukkenoverzicht
     ------------------------------------------------------------- */

  function maakHoofdstukkenLijst() {
    var lijst = $("hoofdstukken-lijst");
    lijst.innerHTML = "";
    VERHAAL.forEach(function (hoofdstuk) {
      var li = document.createElement("li");
      var knop = document.createElement("button");
      knop.type = "button";
      knop.className = "knop hoofdstuk-knop";
      // Welke evaluaties zitten in dit hoofdstuk, en zijn ze al gemaakt?
      var evals = [];
      hoofdstuk.scenes.forEach(function (s) {
        (Array.isArray(s.opdracht) ? s.opdracht : (s.opdracht ? [s.opdracht] : [])).forEach(function (o) {
          if (o.soort === "evaluatie") evals.push(o);
        });
      });
      var extra = evals.map(function (o) {
        var sc = R.score(o.id);
        return '<span class="eval-stip' + (sc ? " gedaan" : "") + '">' + (sc ? "✔ " : "") + veilig(o.titel.split(" –")[0]) + "</span>";
      }).join(" ");
      knop.innerHTML =
        '<span class="nummer">' + hoofdstuk.nummer + "</span>" +
        '<span><span class="naam">' + veilig(hoofdstuk.titel) + "</span>" +
        (extra ? '<span class="evals">' + extra + "</span>" : "") + "</span>";
      knop.setAttribute("aria-label", "Hoofdstuk " + hoofdstuk.nummer + ": " + hoofdstuk.titel);
      // Een hoofdstuk dat het kind nog niet bereikte, is op slot.
      if (eerstAfmaken() && hoofdstuk.nummer > R.verst()) {
        knop.disabled = true;
        knop.classList.add("op-slot");
        knop.setAttribute("aria-label", "Hoofdstuk " + hoofdstuk.nummer + ": " + hoofdstuk.titel + ", nog op slot");
        knop.querySelector(".nummer").textContent = "\uD83D\uDD12";
      }
      knop.addEventListener("click", function () { startVerhaal(hoofdstuk.nummer); });
      li.appendChild(knop);
      lijst.appendChild(li);
    });
  }

  /* -------------------------------------------------------------
     6. Een scène tonen
     ------------------------------------------------------------- */

  // Hier onthouden we de woorden van de scène, voor het voorlezen.
  var spraakRegels = [];   // per regel: { tekst, woorden: [{ start, el }] }

  function toonScene() {
    stopVoorlezen();
    sluitKaartje();

    var huidig = reeks[positie];
    var hoofdstuk = huidig.hoofdstuk;
    var scene = huidig.scene;

    // Titel bovenaan
    $("hoofdstuk-titel").textContent = "Hoofdstuk " + hoofdstuk.nummer + " – " + hoofdstuk.titel;

    // Voortgang: één bolletje per scène van dit hoofdstuk
    var scenesVanHoofdstuk = reeks.filter(function (r) { return r.hoofdstuk === hoofdstuk; });
    var nr = scenesVanHoofdstuk.indexOf(huidig);
    var bolletjes = "";
    scenesVanHoofdstuk.forEach(function (r, i) {
      var klasse = i < nr ? "gelezen" : (i === nr ? "nu" : "");
      bolletjes += '<span class="' + klasse + '"></span>';
    });
    $("voortgang").innerHTML = bolletjes;
    $("voortgang").setAttribute("aria-label", "Deel " + (nr + 1) + " van " + scenesVanHoofdstuk.length);

    // De cyclus (alleen bij de eindopdracht en de STEM-challenge)
    toonCyclus(scene.cyclus);

    // De prent (een scène kan ook zonder prent)
    var prent = scene.prent ? PRENTEN[scene.prent] : null;
    $("prent-kader").hidden = !prent;
    $("prent").innerHTML = typeof prent === "function" ? prent() : (prent || "");

    // De ontdekplekken
    toonOntdekplekken(scene.ontdek || []);

    // De tekst
    toonTekst(scene);

    // Keuzemoment
    toonKeuzes(scene);

    // Opdrachten en evaluaties
    if (window.OPDRACHTEN) window.OPDRACHTEN.toon(scene.opdracht || null, $("opdracht"));
    $("scherm-verhaal").classList.toggle("met-opdracht", !!scene.opdracht);

    // Knoppen onderaan
    $("knop-vorige").disabled = positie === 0;
    var volgende = $("knop-volgende");
    if (scene.slot) {
      volgende.innerHTML = "Opnieuw beginnen";
      volgende.classList.add("knop-opnieuw");
      volgende.disabled = false;
      volgende.hidden = false;
    } else {
      volgende.innerHTML = 'Volgende <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 L17 12 L9 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      volgende.classList.remove("knop-opnieuw");
      // Bij een keuze kies je met de keuzeknoppen in plaats van "Volgende".
      volgende.hidden = !!scene.keuze;
    }

    // Mag het kind al verder?
    werkVolgendeBij();

    // Bewaar het hoofdstuk
    bewaarHoofdstuk(hoofdstuk.nummer);

    // Geluidje bij de scène (alleen als het geluid aan staat)
    if (scene.geluid) speelGeluid(scene.geluid);

    pasPrentAan();

    window.scrollTo(0, 0);
  }

  /* Maak de prent zo groot als past: de tekst en de knoppen moeten
     altijd zichtbaar blijven zonder te scrollen (op een groot scherm). */
  function pasPrentAan() {
    var scherm = $("scherm-verhaal");
    if (!scherm.classList.contains("actief")) return;
    var kader = $("prent-kader");
    var keuzes = $("keuzes");
    var cyclus = $("cyclus");
    var hoogteRest =
      scherm.querySelector(".balk").offsetHeight +
      scherm.querySelector(".navigatie").offsetHeight +
      $("tekst").offsetHeight +
      (keuzes.hidden ? 0 : keuzes.offsetHeight + 12) +
      (cyclus.hidden ? 0 : cyclus.offsetHeight + 12) +
      50;   // witruimte tussen de delen
    var beschikbaar = window.innerHeight - hoogteRest;
    var breedte = Math.max(300, Math.floor(beschikbaar * 16 / 9));
    // Bij een opdracht mag de pagina scrollen; de prent blijft dan kleiner,
    // zodat het kind meteen ziet dat er onder de tekst een opdracht staat.
    if (!$("opdracht").hidden) breedte = Math.min(Math.max(breedte, 420), 620);
    kader.style.maxWidth = breedte + "px";
  }

  function toonOntdekplekken(plekken) {
    var houder = $("ontdekplekken");
    houder.innerHTML = "";
    plekken.forEach(function (plek) {
      var knop = document.createElement("button");
      knop.type = "button";
      knop.className = "ontdekplek";
      knop.style.left = (plek.x / PRENT_BREEDTE * 100) + "%";
      knop.style.top = (plek.y / PRENT_HOOGTE * 100) + "%";
      knop.textContent = "?";
      knop.setAttribute("aria-label", "Ontdek: " + plek.naam);
      knop.title = plek.naam;
      knop.addEventListener("click", function () {
        knop.classList.add("bekeken");
        speelGeluid("pling");
        openKaartje("Wist je dat?", plek.tekst, false, plek.naam);
      });
      houder.appendChild(knop);
    });
  }

  /* Zet de tekst van de scène op het scherm.
     Elk woord krijgt een eigen <span>, zodat het kan oplichten bij het
     voorlezen. Woorden tussen [[ ]] worden klikbaar.                 */
  function toonTekst(scene) {
    var houder = $("tekst");
    houder.innerHTML = "";
    spraakRegels = [];

    scene.tekst.forEach(function (regel) {
      var p = document.createElement("p");
      var spraak = "";          // de tekst zoals die voorgelezen wordt
      var woorden = [];          // begin van elk woord in "spraak"

      // Knip de regel in stukken: gewone tekst en [[moeilijke woorden]].
      var stukken = regel.split(/(\[\[[^\]]+\]\])/);
      stukken.forEach(function (stuk) {
        if (!stuk) return;
        var moeilijk = stuk.match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/);
        var zichtbaar = moeilijk ? moeilijk[1] : stuk;
        var doel = p;

        if (moeilijk) {
          var sleutel = moeilijk[2] || moeilijk[1];
          var knop = document.createElement("button");
          knop.type = "button";
          knop.className = "moeilijk";
          knop.setAttribute("aria-label", zichtbaar + ", uitleg");
          knop.addEventListener("click", function () {
            var uitleg = WOORDEN[sleutel] || WOORDEN[sleutel.toLowerCase()] || "Nog geen uitleg voor dit woord.";
            openKaartje(sleutel, uitleg, true);
          });
          p.appendChild(knop);
          doel = knop;
        }

        // Splits in woorden en spaties
        zichtbaar.split(/(\s+)/).forEach(function (deel) {
          if (!deel) return;
          if (/^\s+$/.test(deel)) {
            doel.appendChild(document.createTextNode(deel));
          } else {
            var span = document.createElement("span");
            span.className = "woord";
            span.textContent = deel;
            doel.appendChild(span);
            woorden.push({ start: spraak.length, el: span });
          }
          spraak += deel;
        });
      });

      houder.appendChild(p);
      spraakRegels.push({ tekst: spraak, woorden: woorden });
    });

    if (scene.slot) {
      var einde = document.createElement("p");
      einde.className = "einde";
      einde.textContent = "EINDE";
      houder.appendChild(einde);
    }
  }

  // Toon de stappen van de cyclus en markeer de stap waar we nu zijn.
  function toonCyclus(c) {
    var houder = $("cyclus");
    var cyclus = c && CYCLI[c.soort];
    if (!cyclus) { houder.hidden = true; houder.innerHTML = ""; return; }
    houder.hidden = false;
    houder.className = "cyclus cyclus-" + c.soort;
    var html = '<span class="cyclus-naam">' + veilig(cyclus.naam) + "</span><ol>";
    cyclus.stappen.forEach(function (stap, i) {
      var klasse = i < c.stap ? "gedaan" : (i === c.stap ? "nu" : "");
      html += '<li class="' + klasse + '"' + (i === c.stap ? ' aria-current="step"' : "") + ">" +
        '<span class="cyclus-nr">' + (i + 1) + "</span> " + veilig(stap) + "</li>";
    });
    houder.innerHTML = html + "</ol>";
  }

  function toonKeuzes(scene) {
    var houder = $("keuzes");
    houder.innerHTML = "";
    if (!scene.keuze) { houder.hidden = true; return; }
    houder.hidden = false;
    scene.keuze.forEach(function (keuze) {
      var knop = document.createElement("button");
      knop.type = "button";
      knop.className = "knop";
      knop.textContent = keuze.knop;
      knop.addEventListener("click", function () { kies(keuze.eerst); });
      houder.appendChild(knop);
    });
  }

  // Het kind kiest: maak de reeks opnieuw en ga naar de gekozen scène.
  function kies(sceneId) {
    eersteKeuze = sceneId;
    maakReeks();
    for (var i = 0; i < reeks.length; i++) {
      if (reeks[i].scene.id === sceneId) { positie = i; break; }
    }
    toonScene();
  }

  /* -------------------------------------------------------------
     7. Vorige en Volgende
     ------------------------------------------------------------- */

  /* Eerst afmaken: zolang een vraag of evaluatie van deze scène niet
     af is, kan het kind niet verder. De knop blijft zichtbaar, zodat
     het kind kan klikken en ziet wat er nog ontbreekt.              */
  function eerstAfmaken() { return (window.INSTELLINGEN || {}).eerstAfmaken !== false; }

  function nogTeDoen() {
    if (!eerstAfmaken() || !window.OPDRACHTEN) return null;
    return window.OPDRACHTEN.ontbreekt();
  }

  function werkVolgendeBij() {
    var knop = $("knop-volgende");
    var scene = reeks[positie] && reeks[positie].scene;
    var mist = scene && !scene.slot ? nogTeDoen() : null;
    knop.classList.toggle("geblokkeerd", !!mist);
    knop.setAttribute("aria-disabled", mist ? "true" : "false");
    var hint = $("nog-doen");
    if (!mist) {
      hint.hidden = true;
      document.querySelectorAll(".opdracht.nog-invullen").forEach(function (k) { k.classList.remove("nog-invullen"); });
    } else if (!hint.hidden) {
      hint.textContent = mist.tekst;
    }
  }

  function volgende() {
    var scene = reeks[positie].scene;
    var mist = scene.slot ? null : nogTeDoen();
    if (mist) {
      // Toon wat er nog moet gebeuren en spring naar die opdracht.
      var hint = $("nog-doen");
      hint.hidden = false;
      hint.textContent = mist.tekst;
      document.querySelectorAll(".opdracht.nog-invullen").forEach(function (k) { k.classList.remove("nog-invullen"); });
      mist.kaart.classList.add("nog-invullen");
      mist.kaart.scrollIntoView({ behavior: document.body.classList.contains("minder-beweging") ? "auto" : "smooth", block: "center" });
      var veld = mist.kaart.querySelector("textarea, input, select, button:not([disabled])");
      if (veld) setTimeout(function () { veld.focus({ preventScroll: true }); }, 50);
      return;
    }
    if (scene.slot) {
      // Opnieuw beginnen: terug naar het startscherm, keuze vergeten.
      eersteKeuze = null;
      positie = 0;
      toonScherm("start");
      return;
    }
    if (scene.keuze) return;          // eerst kiezen
    if (positie < reeks.length - 1) {
      positie++;
      toonScene();
    }
  }

  function vorige() {
    if (positie > 0) {
      positie--;
      toonScene();
    }
  }

  /* -------------------------------------------------------------
     8. Kaartje: "Wist je dat?" of uitleg van een woord
     ------------------------------------------------------------- */

  var focusVoorKaartje = null;

  function openKaartje(titel, tekst, isWoord, naam) {
    focusVoorKaartje = document.activeElement;
    var kaartje = $("kaartje");
    kaartje.classList.toggle("woord-kaartje", !!isWoord);
    $("kaartje-titel").textContent = titel;
    $("kaartje-tekst").textContent = tekst;
    $("kaartje-achtergrond").hidden = false;
    $("kaartje-sluiten").focus();
    // Als het voorlezen aan staat, lezen we ook het kaartje voor.
    if (voorleesModus) {
      zegLos((naam ? naam + ". " : titel + ". ") + tekst);
    }
  }

  function sluitKaartje() {
    var achtergrond = $("kaartje-achtergrond");
    if (achtergrond.hidden) return;
    achtergrond.hidden = true;
    if (voorleesModus) stopSpraak();
    if (focusVoorKaartje && focusVoorKaartje.focus) focusVoorKaartje.focus();
  }

  /* -------------------------------------------------------------
     9. Voorlezen met de Web Speech API
     -------------------------------------------------------------
     We kiezen bij voorkeur een Vlaamse stem (nl-BE), anders een
     Nederlandse (nl-NL), anders eender welke Nederlandse stem.
     Het woord dat voorgelezen wordt, licht op.                       */

  var spraak = window.speechSynthesis || null;
  var stem = null;
  var voorleesModus = false;   // true terwijl de scène voorgelezen wordt

  function kiesStem() {
    if (!spraak) return;
    var stemmen = spraak.getVoices();
    function zoek(test) {
      // Liever een stem die op de computer zelf staat (werkt offline).
      return stemmen.filter(test).sort(function (a, b) {
        return (b.localService ? 1 : 0) - (a.localService ? 1 : 0);
      })[0];
    }
    stem =
      zoek(function (s) { return /^nl[-_]BE$/i.test(s.lang); }) ||
      zoek(function (s) { return /^nl[-_]NL$/i.test(s.lang); }) ||
      zoek(function (s) { return /^nl/i.test(s.lang); }) ||
      null;
  }

  function maakUiting(tekst) {
    var u = new SpeechSynthesisUtterance(tekst);
    if (stem) { u.voice = stem; u.lang = stem.lang; } else { u.lang = "nl-BE"; }
    u.rate = 0.9;   // iets trager, goed voor kinderen
    u.pitch = 1;
    return u;
  }

  function wisOplichten() {
    var oud = document.querySelectorAll(".woord.voorgelezen");
    for (var i = 0; i < oud.length; i++) oud[i].classList.remove("voorgelezen");
  }

  function licht(el) {
    wisOplichten();
    if (el) el.classList.add("voorgelezen");
  }

  // Lees de hele scène voor, regel per regel.
  function leesSceneVoor() {
    if (!spraak) return;
    stopSpraak();
    voorleesModus = true;
    zetVoorleesKnop(true);

    spraakRegels.forEach(function (regel, nr) {
      var u = maakUiting(regel.tekst);
      var grensGezien = false;

      u.onstart = function () {
        // Licht het eerste woord van de regel op.
        if (regel.woorden[0]) licht(regel.woorden[0].el);
      };
      u.onboundary = function (e) {
        if (e.name && e.name !== "word") return;
        grensGezien = true;
        // Zoek het woord dat op deze plek begint (of er net voor).
        var gevonden = null;
        for (var i = 0; i < regel.woorden.length; i++) {
          if (regel.woorden[i].start <= e.charIndex) gevonden = regel.woorden[i];
          else break;
        }
        if (gevonden) licht(gevonden.el);
      };
      u.onend = function () {
        if (nr === spraakRegels.length - 1) eindeVoorlezen();
      };
      u.onerror = function () {
        if (nr === spraakRegels.length - 1) eindeVoorlezen();
      };
      spraak.speak(u);
    });
  }

  // Een los stukje tekst voorlezen (bv. een kaartje).
  function zegLos(tekst) {
    if (!spraak) return;
    spraak.cancel();
    wisOplichten();
    spraak.speak(maakUiting(tekst));
  }

  function eindeVoorlezen() {
    voorleesModus = false;
    wisOplichten();
    zetVoorleesKnop(false);
  }

  function stopSpraak() {
    if (spraak) spraak.cancel();
    wisOplichten();
  }

  function stopVoorlezen() {
    voorleesModus = false;
    stopSpraak();
    zetVoorleesKnop(false);
  }

  function zetVoorleesKnop(aan) {
    var knop = $("knop-voorlezen");
    knop.setAttribute("aria-pressed", aan ? "true" : "false");
    knop.setAttribute("aria-label", aan ? "Stop met voorlezen" : "Lees voor");
    knop.title = aan ? "Stop met voorlezen" : "Lees voor";
  }

  /* -------------------------------------------------------------
     10. Geluidjes met de Web Audio API
     -------------------------------------------------------------
     Er zijn geen geluidsbestanden: elk geluidje wordt hier gemaakt.
     Het geluid staat standaard UIT.                                  */

  var geluidAan = false;
  var audio = null;        // AudioContext
  var hoofdVolume = null;

  function maakAudio() {
    if (audio) return audio;
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audio = new Ctx();
    hoofdVolume = audio.createGain();
    hoofdVolume.gain.value = 0.5;
    hoofdVolume.connect(audio.destination);
    return audio;
  }

  // Een buffer met ruis ("ssssh"), basis voor veel geluiden.
  var ruisBuffer = null;
  function ruis() {
    if (!ruisBuffer) {
      var lengte = audio.sampleRate * 3;
      ruisBuffer = audio.createBuffer(1, lengte, audio.sampleRate);
      var data = ruisBuffer.getChannelData(0);
      for (var i = 0; i < lengte; i++) data[i] = Math.random() * 2 - 1;
    }
    var bron = audio.createBufferSource();
    bron.buffer = ruisBuffer;
    return bron;
  }

  // Een volumeknop die zacht aan- en uitgaat.
  function omhulling(start, aanTijd, duur, uitTijd, sterkte) {
    var g = audio.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(sterkte, start + aanTijd);
    g.gain.setValueAtTime(sterkte, start + aanTijd + duur);
    g.gain.exponentialRampToValueAtTime(0.0001, start + aanTijd + duur + uitTijd);
    g.connect(hoofdVolume);
    return g;
  }

  function filter(type, frequentie, q) {
    var f = audio.createBiquadFilter();
    f.type = type;
    f.frequency.value = frequentie;
    if (q) f.Q.value = q;
    return f;
  }

  function toon(type, freqVan, freqNaar, start, duur, sterkte) {
    var o = audio.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freqVan, start);
    o.frequency.exponentialRampToValueAtTime(freqNaar, start + duur);
    var g = omhulling(start, 0.01, duur * 0.3, duur * 0.7, sterkte);
    o.connect(g);
    o.start(start);
    o.stop(start + duur + 0.05);
  }

  function ruisStoot(filterType, freq, start, aan, duur, uit, sterkte, q) {
    var bron = ruis();
    var f = filter(filterType, freq, q);
    var g = omhulling(start, aan, duur, uit, sterkte);
    bron.connect(f);
    f.connect(g);
    bron.start(start);
    bron.stop(start + aan + duur + uit + 0.05);
    return f;
  }

  var GELUIDEN = {
    // Tik-tik van regen op het dak
    regen: function (t) {
      for (var i = 0; i < 40; i++) {
        ruisStoot("bandpass", 2500 + Math.random() * 3000, t + Math.random() * 2.5, 0.002, 0.005, 0.03, 0.15, 3);
      }
    },
    // Plons in het water
    plons: function (t) {
      var f = ruisStoot("lowpass", 3000, t, 0.005, 0.05, 0.5, 0.6);
      f.frequency.exponentialRampToValueAtTime(300, t + 0.5);
      toon("sine", 600, 150, t, 0.25, 0.25);
    },
    // Het zoemen en draaien van de Boorbol
    boorbol: function (t) {
      var o = audio.createOscillator();
      o.type = "triangle";
      o.frequency.setValueAtTime(90, t);
      o.frequency.linearRampToValueAtTime(140, t + 0.8);
      o.frequency.linearRampToValueAtTime(100, t + 1.8);
      var lfo = audio.createOscillator();
      var lfoSterkte = audio.createGain();
      lfo.frequency.value = 6;
      lfoSterkte.gain.value = 12;
      lfo.connect(lfoSterkte);
      lfoSterkte.connect(o.frequency);
      var g = omhulling(t, 0.3, 1.2, 0.6, 0.25);
      o.connect(g);
      o.start(t); lfo.start(t);
      o.stop(t + 2.2); lfo.stop(t + 2.2);
    },
    // Pssssj van een fles bruiswater
    psssj: function (t) {
      ruisStoot("highpass", 2500, t, 0.02, 0.5, 0.9, 0.35);
    },
    // Een zachte, ronde boem (niet eng)
    boem: function (t) {
      toon("sine", 110, 40, t, 0.8, 0.6);
      ruisStoot("lowpass", 400, t, 0.01, 0.1, 0.6, 0.35);
    },
    // Borrelende lava
    borrel: function (t) {
      for (var i = 0; i < 9; i++) {
        var start = t + i * 0.22 + Math.random() * 0.1;
        var f = 150 + Math.random() * 200;
        toon("sine", f, f * 2.2, start, 0.12, 0.25);
      }
    },
    // Rommelen van de grond
    rommel: function (t) {
      var f = ruisStoot("lowpass", 140, t, 0.4, 1.6, 0.8, 0.9);
      f.frequency.linearRampToValueAtTime(220, t + 1.2);
      toon("sine", 50, 38, t, 2.4, 0.3);
    },
    // Krak van een brekend latje
    krak: function (t) {
      var s = t + 1.2;   // eerst even wachten: het latje buigt
      ruisStoot("bandpass", 1800, s, 0.001, 0.02, 0.12, 0.8, 1.5);
      ruisStoot("bandpass", 900, s + 0.04, 0.001, 0.02, 0.15, 0.5, 1.5);
    },
    // Ruisen van een golf
    golf: function (t) {
      var f = ruisStoot("lowpass", 500, t, 1.2, 0.4, 1.6, 0.45);
      f.frequency.linearRampToValueAtTime(1400, t + 1.4);
      f.frequency.linearRampToValueAtTime(400, t + 3);
    },
    // Een vulkaan die zacht gromt, zoals een maag
    grom: function (t) {
      var o = audio.createOscillator();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(55, t);
      o.frequency.linearRampToValueAtTime(70, t + 0.7);
      o.frequency.linearRampToValueAtTime(48, t + 1.6);
      var f = filter("lowpass", 180);
      var g = omhulling(t, 0.25, 0.9, 0.6, 0.35);
      o.connect(f); f.connect(g);
      o.start(t); o.stop(t + 2);
    },
    // Zachte stoom
    stoom: function (t) {
      ruisStoot("highpass", 4000, t, 0.8, 1, 1.2, 0.12);
    },
    // Pling bij een ontdekplek
    pling: function (t) {
      toon("sine", 880, 880, t, 0.35, 0.2);
      toon("sine", 1320, 1320, t + 0.08, 0.4, 0.15);
    }
  };

  function speelGeluid(naam) {
    if (!geluidAan || !GELUIDEN[naam]) return;
    if (!maakAudio()) return;
    if (audio.state === "suspended") audio.resume();
    try { GELUIDEN[naam](audio.currentTime + 0.05); }
    catch (e) { /* een geluidje mag nooit de app stilleggen */ }
  }

  function zetGeluid(aan) {
    geluidAan = aan;
    var knop = $("knop-geluid");
    knop.setAttribute("aria-pressed", aan ? "true" : "false");
    var label = aan ? "Geluid staat aan" : "Geluid staat uit";
    knop.setAttribute("aria-label", label);
    knop.title = label;
    if (aan) {
      maakAudio();
      if (audio && audio.state === "suspended") audio.resume();
      speelGeluid("pling");
    }
  }

  /* -------------------------------------------------------------
     11. Minder beweging
     ------------------------------------------------------------- */

  function zetMinderBeweging(aan) {
    document.body.classList.toggle("minder-beweging", aan);
    var knop = $("knop-beweging");
    knop.setAttribute("aria-pressed", aan ? "true" : "false");
    var label = aan ? "Minder beweging staat aan" : "Minder beweging";
    knop.setAttribute("aria-label", label);
    knop.title = label;
  }

  /* -------------------------------------------------------------
     12. Alles opstarten
     ------------------------------------------------------------- */

  function start() {
    // Startprent
    var startPrent = PRENTEN.start;
    $("start-prent").innerHTML = typeof startPrent === "function" ? startPrent() : (startPrent || "");

    $("aanmelden-prent").innerHTML = $("start-prent").innerHTML;
    maakReeks();
    toonScherm(aangemeld() ? "start" : "aanmelden");

    // Telkens het kind iets invult, kijken we of het al verder mag.
    ["input", "change", "click", "pointerup"].forEach(function (soort) {
      $("opdracht").addEventListener(soort, function () { setTimeout(werkVolgendeBij, 0); });
    });

    // Aanmelden met een getypte naam
    $("naam-formulier").addEventListener("submit", function (e) {
      e.preventDefault();
      var naam = $("naam-invoer").value.trim();
      if (!naam) { $("naam-invoer").focus(); return; }
      meldAan(naam, $("klas-invoer").value.trim());
      $("naam-invoer").value = "";
    });
    $("knop-afmelden").addEventListener("click", function () {
      R.meldAf();
      eersteKeuze = null;
      toonScherm("aanmelden");
    });
    function naarLeerkracht() {
      toonScherm("leerkracht");
      if (window.LEERKRACHT) window.LEERKRACHT.open($("leerkracht-inhoud"));
    }
    $("knop-leerkracht").addEventListener("click", naarLeerkracht);
    $("knop-leerkracht-aanmelden").addEventListener("click", naarLeerkracht);
    $("knop-terug-leerkracht").addEventListener("click", function () {
      if (window.LEERKRACHT) window.LEERKRACHT.sluit();
      toonScherm(aangemeld() ? "start" : "aanmelden");

    // Telkens het kind iets invult, kijken we of het al verder mag.
    ["input", "change", "click", "pointerup"].forEach(function (soort) {
      $("opdracht").addEventListener(soort, function () { setTimeout(werkVolgendeBij, 0); });
    });
    });

    // Scores die nog niet naar de Google Sheet gingen, opnieuw proberen.
    R.verstuur();

    // Knoppen op het startscherm
    $("knop-start").addEventListener("click", function () {
      eersteKeuze = null;
      startVerhaal(1);
    });
    $("knop-verder").addEventListener("click", function () {
      startVerhaal(leesBewaardHoofdstuk() || 1);
    });
    $("knop-hoofdstukken").addEventListener("click", function () { toonScherm("hoofdstukken"); });
    $("knop-terug-start").addEventListener("click", function () { toonScherm("start"); });

    // Knoppen op het verhaalscherm
    $("knop-menu").addEventListener("click", function () { toonScherm("hoofdstukken"); });
    $("knop-vorige").addEventListener("click", vorige);
    $("knop-volgende").addEventListener("click", volgende);

    // Kaartje sluiten: knop, klik naast het kaartje of Escape
    $("kaartje-sluiten").addEventListener("click", sluitKaartje);
    $("kaartje-achtergrond").addEventListener("click", function (e) {
      if (e.target === e.currentTarget) sluitKaartje();
    });

    // Toetsenbord: pijltjes om te bladeren, Escape om te sluiten
    document.addEventListener("keydown", function (e) {
      var kaartjeOpen = !$("kaartje-achtergrond").hidden;
      if (e.key === "Escape" && kaartjeOpen) { sluitKaartje(); return; }
      if (kaartjeOpen || !$("scherm-verhaal").classList.contains("actief")) return;
      // Niet bladeren terwijl het kind typt, tekent of iets kiest.
      var doel = e.target && e.target.tagName;
      if (/^(INPUT|TEXTAREA|SELECT|CANVAS)$/.test(doel)) return;
      if (e.key === "ArrowRight" && !$("knop-volgende").hidden) volgende();
      if (e.key === "ArrowLeft") vorige();
    });

    // Voorlezen
    var voorleesKnop = $("knop-voorlezen");
    if (!spraak || typeof window.SpeechSynthesisUtterance === "undefined") {
      voorleesKnop.hidden = true;     // deze browser kan niet voorlezen
    } else {
      kiesStem();
      if ("onvoiceschanged" in spraak) spraak.onvoiceschanged = kiesStem;
      voorleesKnop.addEventListener("click", function () {
        if (voorleesModus || spraak.speaking) stopVoorlezen();
        else leesSceneVoor();
      });
    }

    // Geluid (standaard uit)
    zetGeluid(false);
    $("knop-geluid").addEventListener("click", function () { zetGeluid(!geluidAan); });

    // Minder beweging: volg de instelling van de computer
    var reduceer = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    zetMinderBeweging(!!reduceer);
    $("knop-beweging").addEventListener("click", function () {
      zetMinderBeweging(!document.body.classList.contains("minder-beweging"));
    });

    // Prent opnieuw passen als het venster van grootte verandert
    window.addEventListener("resize", pasPrentAan);

    // Stop het voorlezen als het venster sluit
    window.addEventListener("beforeunload", function () { if (spraak) spraak.cancel(); });
  }

  // Een paar functies die andere bestanden mogen gebruiken.
  window.APP = { geluid: speelGeluid, pasPrentAan: pasPrentAan };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
