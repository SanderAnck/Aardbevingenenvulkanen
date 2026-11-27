/* =====================================================================
   INSTELLINGEN – hier pas je als leerkracht een paar dingen aan
   ===================================================================== */

window.INSTELLINGEN = {
  // Code om het leerkrachtenscherm te openen (scores, rubrics, export).
  leerkrachtCode: "1234",

  // Google Sheet koppelen (later):
  // Plak hier het webadres van je Google Apps Script (eindigt op /exec).
  // Zolang dit leeg is, blijven de scores enkel op deze computer en kan je
  // ze exporteren als CSV-bestand. Zie docs/google-sheet.md.
  googleSheetUrl: "",

  // Mogen kinderen bij een evaluatie opnieuw proberen? De EERSTE poging
  // telt altijd voor de score; opnieuw proberen is om te oefenen.
  opnieuwProberen: true,

  // Moeten de kinderen eerst alle vragen en evaluaties van een scène
  // afmaken voor ze op "Volgende" kunnen klikken? (true = ja)
  // Zet op false om vrij te bladeren, bv. om de app zelf te bekijken.
  eerstAfmaken: true,

  // Reageert de app op de antwoorden bij open vragen? (true = ja)
  // De reacties staan in js/feedback.js.
  feedbackOpOpenVragen: true
};
