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
  opnieuwProberen: true
};
