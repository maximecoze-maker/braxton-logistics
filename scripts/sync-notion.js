// Pulls per-cell availability tables ("Etat locatif" databases) from Notion for each
// Urban Pro asset and writes them to data/up-assets.json, consumed by script.js.
//
// Privacy: tenant names and the rent of occupied cells are never written to this file —
// only lot number, surfaces, occupancy status, and (for vacant cells only) the asking
// rent and availability note. This matches what the public site has always shown.
//
// Run: NOTION_TOKEN=xxx node scripts/sync-notion.js

const fs = require('fs');
const path = require('path');

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_VERSION = '2022-06-28';

if (!NOTION_TOKEN) {
  console.error('Missing NOTION_TOKEN environment variable.');
  process.exit(1);
}

// asset slug -> "Etat locatif" database id (from Notion)
// Note: morangis-up and corbeil-up currently share the same (unconfigured) database
// in Notion — see project notes. Once distinct tables exist for each, update the ids below.
const ASSETS = {
  'valenton-up':  'ada42bb1-1184-4eb7-806e-8306c665526b',
  'epinay-up':    'be163a6c-a3c2-4b3b-a774-5d80f8b9a362',
  'marseille-up': '901ffb26-3746-480a-bd4f-84eed3f0edce',
  'bagnolet-up':  '5653dec0-d611-462a-9c43-eafc51b704ed',
  'neuilly-up':   '1c40875d-7e8a-4504-8b60-c61bf0ea7930',
  'morangis-up':  '74d6f709-5d02-4cbb-aee1-965b30cadd45',
  'corbeil-up':   '74d6f709-5d02-4cbb-aee1-965b30cadd45',
  'eguilles-up':  '78654958-5af9-4c23-8460-362cdb5841ef',
  'gradignan-up': '4eee40d7-d33c-448f-b953-f030010137e6',
};

async function queryDatabase(databaseId) {
  let results = [];
  let cursor;
  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cursor ? { start_cursor: cursor } : {}),
    });
    if (!res.ok) {
      throw new Error(`Notion API ${res.status} for database ${databaseId}: ${await res.text()}`);
    }
    const json = await res.json();
    results = results.concat(json.results);
    cursor = json.has_more ? json.next_cursor : undefined;
  } while (cursor);
  return results;
}

function getProp(props, ...names) {
  for (const n of names) if (props[n]) return props[n];
  return undefined;
}
function titleText(prop) {
  return (prop?.title || []).map((t) => t.plain_text).join('').trim();
}
function richText(prop) {
  return (prop?.rich_text || []).map((t) => t.plain_text).join('').trim();
}
function numberVal(prop) {
  return typeof prop?.number === 'number' ? prop.number : null;
}

function buildCell(page) {
  const p = page.properties;
  const numRaw = titleText(getProp(p, 'Numéro lot'));
  const rdc = numberVal(getProp(p, 'Surface RDC'));
  const mezz = numberVal(getProp(p, 'Surface Mezzanine'));
  const locataire = richText(getProp(p, 'Locataire'));
  const loyerMensuel = numberVal(getProp(p, 'Loyer mensuel', 'Loyer Mensuel'));
  const commentaires = richText(getProp(p, 'Commentaires'));

  const isVacant = locataire === '' || locataire.toLowerCase() === 'vacant';
  const total = Math.round(((rdc || 0) + (mezz || 0)) * 100) / 100;

  const cell = {
    num: /^\d+$/.test(numRaw) ? Number(numRaw) : numRaw,
    rdc,
    r1: mezz,
    total,
    status: isVacant ? 'vacant' : 'occupé',
  };
  // Privacy: never include tenant name or rent for occupied cells.
  if (isVacant) {
    if (loyerMensuel) cell.loyer = Math.round(loyerMensuel);
    cell.dispo = commentaires || 'Immédiat';
  }
  return cell;
}

function sortCells(cells) {
  return cells.slice().sort((a, b) => {
    const an = typeof a.num === 'number' ? a.num : parseFloat(a.num);
    const bn = typeof b.num === 'number' ? b.num : parseFloat(b.num);
    if (!Number.isNaN(an) && !Number.isNaN(bn) && an !== bn) return an - bn;
    return String(a.num).localeCompare(String(b.num));
  });
}

async function main() {
  const out = {};
  const cache = {}; // avoid re-fetching when two slugs share a database id

  for (const [slug, dbId] of Object.entries(ASSETS)) {
    if (cache[dbId]) {
      out[slug] = { cells: cache[dbId] };
      continue;
    }
    console.log(`Fetching ${slug} (${dbId})...`);
    const pages = await queryDatabase(dbId);
    const cells = sortCells(
      pages.map(buildCell).filter((c) => c.num !== '' && c.rdc !== null)
    );
    cache[dbId] = cells;
    out[slug] = { cells };
  }

  const outPath = path.join(__dirname, '..', 'data', 'up-assets.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
