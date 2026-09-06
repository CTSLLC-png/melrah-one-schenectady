const SHEET_ID = '1t1ouN4GyC2PyLFJQnaWyr69dUP0JhEc0LioCkUITpAM';
const MIN_PUBLIC_SAMPLE = 25;

function doPost(e) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const p = e.parameter || {};
  const responseId = p.responseId || Utilities.getUuid();
  ss.getSheetByName('Responses').appendRow([
    new Date(), responseId, p.role || '', p.neighborhood || '',
    list_(e.parameters.priorities), p.registered || '', p.votedLocal || '',
    p.association || '', list_(e.parameters.responsibilities),
    list_(e.parameters.actions), p.source || 'direct', p.campaign || 'organic', ''
  ]);
  return ContentService.createTextOutput('ok');
}

function doGet(e) {
  const callback = (e.parameter.callback || '').replace(/[^a-zA-Z0-9_$.]/g, '');
  const data = summary_(e.parameter.neighborhood || 'All neighborhoods');
  const json = JSON.stringify(data);
  return ContentService.createTextOutput(callback ? callback + '(' + json + ');' : json)
    .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}

function summary_(neighborhood) {
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Responses');
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return {ok:true,publish:false,count:0,minimum:MIN_PUBLIC_SAMPLE};
  const h = values[0].map(String), pos = n => h.indexOf(n);
  const rows = values.slice(1).filter(r => neighborhood === 'All neighborhoods' || String(r[pos('Neighborhood')]) === neighborhood);
  const count = rows.length;
  if (count < MIN_PUBLIC_SAMPLE) return {ok:true,publish:false,count:count,minimum:MIN_PUBLIC_SAMPLE};
  const counts = {}; let registered=0, voted=0, association=0;
  rows.forEach(r => {
    String(r[pos('Priorities')] || '').split(' | ').filter(Boolean).forEach(x => counts[x]=(counts[x]||0)+1);
    if (r[pos('Registered')] === 'Yes') registered++;
    if (r[pos('Voted Local')] === 'Yes') voted++;
    if (r[pos('Association')] === 'Yes, and I participate') association++;
  });
  const priorities = Object.keys(counts).map(name => ({name:name,count:counts[name],pct:Math.round(counts[name]*100/count)})).sort((a,b)=>b.count-a.count).slice(0,6);
  return {ok:true,publish:true,count:count,minimum:MIN_PUBLIC_SAMPLE,registeredPct:Math.round(registered*100/count),votedPct:Math.round(voted*100/count),associationPct:Math.round(association*100/count),priorities:priorities};
}

function list_(v) { return !v ? '' : (Array.isArray(v) ? v.join(' | ') : String(v)); }
