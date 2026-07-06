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

// asset slug -> "Etat locatif" database page id (from Notion, under each deal's page
// in the "Investment Pipeline" > "Global View" structure).
// Note: this must be the database's own block/page id (what the classic
// /v1/databases/{id}/query endpoint expects), not the "data source" id.
const ASSETS = {
  'valenton-up':  '2cd8acb2-ed1a-82b8-bf91-016b5fb9a85f',
  'epinay-up':    'e3c8acb2-ed1a-832d-9c7c-011a3518acc0',
  'marseille-up': 'be88acb2-ed1a-8370-8b9e-81888af651f8',
  'bagnolet-up':  '3948acb2-ed1a-8076-9553-e4f17e11beda',
  'neuilly-up':   'fdd8acb2-ed1a-82b1-aabf-01f7175e1f06',
  'morangis-up':  '3958acb2-ed1a-8086-807f-f1ff4148e104',
  'corbeil-up':   '3958acb2-ed1a-80fa-a4db-e26460fd63e3',
  'eguilles-up':  'f1a8acb2-ed1a-834e-9b3c-01183be53fda',
  'gradignan-up': '3b58acb2-ed1a-8392-b913-81d592c11cd8',
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
// "Loyer mensuel" is a text field (e.g. "1 579", using a regular or non-breaking space
// as thousands separator), not a Notion number property - parse it out here.
function textNumberVal(prop) {
  const text = richText(prop);
  if (!text) return null;
  const cleaned = text.replace(',', '.').replace(/[^\d.]/g, '');
  const n = parseFloat(cleaned);
  return Number.isNaN(n) ? null : n;
}

function buildCell(page) {
  const p = page.properties;
  const numRaw = titleText(getProp(p, 'Numéro lot'));
  const rdc = numberVal(getProp(p, 'Surface RDC'));
  const mezz = numberVal(getProp(p, 'Surface Mezzanine'));
  const locataire = richText(getProp(p, 'Locataire'));
  const loyerMensuel = textNumberVal(getProp(p, 'Loyer mensuel', 'Loyer Mensuel'));
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
