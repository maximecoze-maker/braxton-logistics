// ══════════════════════════════════════
// DATA
// ══════════════════════════════════════
const badgeMap = {
  idf:       { cls:'badge-idf',   label:'Île-de-France' },
  paca:      { cls:'badge-paca',  label:'PACA' },
  bordeaux:  { cls:'badge-bord',  label:'Nouvelle Aquitaine' },
  bourgogne: { cls:'badge-bourg', label:'Bourgogne' },
};

const pinSVG = `<svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path d="M6 0C3.79 0 2 1.79 2 4c0 3 4 9 4 9s4-6 4-9c0-2.21-1.79-4-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor"/></svg>`;

// Assets from the Ring Portfolio IM — enriched with technical specs
const imAssets = {
  "buc": {
    id: "buc", city: "Buc", address: "617 Rue Fourny", cp: "78530", region: "idf", dept: "Yvelines (78)",
    submarket: "Greater Paris", tenure: "Freehold",
    land: "15 499 m²", siteCoverage: "61%", gla: "9 502 m²", officeRatio: "20%",
    yearBuilt: "2023", assetType: "Parc d'activités légères (20 lots divisibles)",
    esg: "BREEAM Good", pvRoof: "Oui", sectionalDoors: "27", loadingDocks: "4",
    floorLoading: "3 T/m²", freeHeight: "7 m",
    annualRent: "1 211 626 €", rentPsm: "127 €/m²", occupancy: "100%", walb: "2,8 ans", walt: "9,6 ans",
    distances: [
      { name: "N12/A86", time: "8 min" }, { name: "A10", time: "19 min" },
      { name: "A6", time: "23 min" }, { name: "Paris périphérique", time: "31 min" },
      { name: "Paris-Orly Airport", time: "28 min" }, { name: "Gare Versailles-Chantier", time: "11 min" },
    ],
    tenants: [
      { name: "AGSE", gla: "899 m²", rent: "120 017 €", psm: "134 €/m²", walb: "4,4", walt: "10,2" },
      { name: "Château de Versailles", gla: "3 025 m²", rent: "372 775 €", psm: "123 €/m²", walb: "0,9", walt: "8,0" },
      { name: "Milla Groupe", gla: "3 541 m²", rent: "467 688 €", psm: "132 €/m²", walb: "4,3", walt: "10,4" },
      { name: "Sebach France", gla: "2 038 m²", rent: "251 146 €", psm: "123 €/m²", walb: "1,9", walt: "10,0" },
    ],
    maps: "617+Rue+Fourny+78530+Buc+France"
  },
  "villabe": {
    id: "villabe", city: "Villabé", address: "12/16 Rue de la Closerie", cp: "91100", region: "idf", dept: "Essonne (91)",
    submarket: "Greater Paris", tenure: "Freehold",
    land: "14 501 m²", siteCoverage: "47%", gla: "6 816 m²", officeRatio: "14%",
    yearBuilt: "1994–1998", assetType: "Entrepôt logistique",
    esg: "—", pvRoof: "Non", sectionalDoors: "10", loadingDocks: "1",
    floorLoading: "N.C.", freeHeight: "9 m",
    annualRent: "478 072 €", rentPsm: "70 €/m²", occupancy: "100%", walb: "2,4 ans", walt: "5,9 ans",
    distances: [
      { name: "A6", time: "3 min" }, { name: "N104", time: "5 min" },
      { name: "Paris périphérique", time: "25 min" }, { name: "Paris-Orly Airport", time: "30 min" },
      { name: "Paris centre", time: "40 min" }, { name: "Gare de Lyon", time: "1h00" },
    ],
    tenants: [
      { name: "PEMSA", gla: "1 480 m²", rent: "143 514 €", psm: "97 €/m²", walb: "3,1", walt: "7,2" },
      { name: "Torrens Déménagement", gla: "4 596 m²", rent: "265 453 €", psm: "58 €/m²", walb: "1,7", walt: "4,7" },
      { name: "Aroul Foods", gla: "740 m²", rent: "69 105 €", psm: "93 €/m²", walb: "3,7", walt: "7,7" },
    ],
    maps: "12+Rue+de+la+Closerie+91100+Villabe+France"
  },
  "ambares": {
    id: "ambares", city: "Ambarès-et-Lagrave", address: "77 bis Avenue de la Libération", cp: "33440", region: "bordeaux", dept: "Gironde (33)",
    submarket: "Bordeaux", tenure: "Freehold",
    land: "13 520 m²", siteCoverage: "55%", gla: "7 370 m²", officeRatio: "37%",
    yearBuilt: "Déc. 2024", assetType: "Parc d'activités légères",
    esg: "—", pvRoof: "Non", sectionalDoors: "1", loadingDocks: "0",
    floorLoading: "1,5 T/m²", freeHeight: "6,2 m",
    annualRent: "120 869 €", rentPsm: "105 €/m²", occupancy: "16%", walb: "2,8 ans", walt: "8,9 ans",
    distances: [
      { name: "A10", time: "2 min" }, { name: "Rocade Bordeaux (A630)", time: "8 min" },
      { name: "Aéroport Mérignac", time: "21 min" }, { name: "Gare Bordeaux Saint-Jean", time: "26 min" },
      { name: "Bordeaux centre", time: "25 min" },
    ],
    tenants: [
      { name: "Foodles", gla: "422 m²", rent: "44 537 €", psm: "106 €/m²", walb: "1,5", walt: "8,6" },
      { name: "Otis", gla: "217 m²", rent: "22 785 €", psm: "105 €/m²", walb: "6,2", walt: "10,2" },
      { name: "RenOP", gla: "255 m²", rent: "26 775 €", psm: "105 €/m²", walb: "2,1", walt: "8,2" },
      { name: "RP France", gla: "255 m²", rent: "26 772 €", psm: "105 €/m²", walb: "2,6", walt: "8,7" },
      { name: "Vacant", gla: "6 221 m²", rent: "—", psm: "—", walb: "—", walt: "—", vacant: true },
    ],
    maps: "77+Avenue+de+la+Liberation+33440+Ambares-et-Lagrave+France"
  },
  "osny": {
    id: "osny", city: "Osny", address: "23 Rue des Beaux Soleils", cp: "95520", region: "idf", dept: "Val-d'Oise (95)",
    submarket: "Greater Paris", tenure: "Freehold",
    land: "11 909 m²", siteCoverage: "55%", gla: "6 598 m²", officeRatio: "18%",
    yearBuilt: "Oct. 2024", assetType: "Parc d'activités légères",
    esg: "BREEAM Very Good", pvRoof: "Oui", sectionalDoors: "14", loadingDocks: "0",
    floorLoading: "3 T/m²", freeHeight: "8 m",
    annualRent: "338 086 €", rentPsm: "110 €/m²", occupancy: "47%", walb: "2,8 ans", walt: "9,6 ans",
    distances: [
      { name: "A15", time: "5 min" }, { name: "N104 La Francilienne", time: "16 min" },
      { name: "Paris périphérique", time: "34 min" }, { name: "Paris-CDG Airport", time: "37 min" },
      { name: "Gare de Pontoise", time: "7 min" }, { name: "Paris centre", time: "1h30" },
    ],
    tenants: [
      { name: "AMG Pro", gla: "1 321 m²", rent: "144 176 €", psm: "109 €/m²", walb: "4,5", walt: "10,6" },
      { name: "Master Grid", gla: "928 m²", rent: "102 080 €", psm: "110 €/m²", walb: "1,9", walt: "9,0" },
      { name: "Colis Privé", gla: "352 m²", rent: "38 700 €", psm: "110 €/m²", walb: "1,8", walt: "8,9" },
      { name: "ASM Consulting", gla: "483 m²", rent: "53 130 €", psm: "110 €/m²", walb: "1,9", walt: "9,0" },
      { name: "Vacant", gla: "3 514 m²", rent: "—", psm: "—", walb: "—", walt: "—", vacant: true },
    ],
    maps: "23+Rue+des+Beaux+Soleils+95520+Osny+France",
    // Détail par bâtiment / cellule, avec répartition surface activité ("industrie") / bureau.
    cellDetail: {
      buildings: [
        {
          name: "A",
          cells: [
            { label: "1-A",   activite: 472, bureau: 74, occupied: true },
            { label: "2-A",   activite: 354, bureau: 65, occupied: true },
            { label: "3-A",   activite: 326, bureau: 59, occupied: true },
            { label: "4-A",   activite: 325, bureau: 60, occupied: true },
            { label: "5-A",   activite: 457, bureau: 86, occupied: true },
          ],
          totalActivite: 1934, totalBureau: 344,
        },
        {
          name: "B",
          cells: [
            { label: "1-B",   activite: 278, bureau: 74, occupied: false },
            { label: "1-B'",  activite: 258, bureau: 56, occupied: true },
            { label: "2-B",   activite: 376, bureau: 85, occupied: false },
            { label: "3-B",   activite: 379, bureau: 85, occupied: false },
            { label: "4-B",   activite: 378, bureau: 85, occupied: false },
            { label: "5-B",   activite: 377, bureau: 85, occupied: true },
            { label: "6-B",   activite: 404, bureau: 79, occupied: true },
          ],
          totalActivite: 2450, totalBureau: 549,
        },
        {
          name: "C",
          cells: [
            { label: "1-C",    activite: 571, bureau: 30,  occupied: false },
            { label: "2-C",    activite: 473, bureau: 28,  occupied: false },
            { label: "C1/C2",  activite: null, bureau: 219, occupied: false },
          ],
          totalActivite: 1044, totalBureau: 277,
        },
      ],
      totalActivite: 5428, totalBureau: 1170,
    },
  },
  "plaisir": {
    id: "plaisir", city: "Plaisir", address: "226 Rue Jacques Monod", cp: "78370", region: "idf", dept: "Yvelines (78)",
    submarket: "Greater Paris", tenure: "Freehold",
    land: "12 723 m²", siteCoverage: "49%", gla: "6 196 m²", officeRatio: "20%",
    yearBuilt: "T1 2026", assetType: "Parc d'activités légères",
    esg: "BREEAM Excellent", pvRoof: "Non", sectionalDoors: "4", loadingDocks: "4",
    floorLoading: "3 T/m²", freeHeight: "9,5 m",
    annualRent: "204 255 €", rentPsm: "135 €/m²", occupancy: "24%", walb: "5,8 ans", walt: "9,9 ans",
    distances: [
      { name: "N12", time: "2 min" }, { name: "Paris périphérique", time: "32 min" },
      { name: "A10/A6", time: "35 min" }, { name: "Paris-Orly Airport", time: "46 min" },
      { name: "Arrêt de bus Hourtoule", time: "1 min" }, { name: "Gare Plaisir-Grignon", time: "11 min" },
    ],
    tenants: [
      { name: "Eiffage (bail en cours)", gla: "1 513 m²", rent: "204 255 €", psm: "135 €/m²", walb: "5,8", walt: "9,9" },
      { name: "Vacant", gla: "4 683 m²", rent: "—", psm: "—", walb: "—", walt: "—", vacant: true },
    ],
    maps: "226+Rue+Jacques+Monod+78370+Plaisir+France"
  },
  "croissy": {
    id: "croissy", city: "Croissy-Beaubourg", address: "9 Rue Ambroise Croizat", cp: "77183", region: "idf", dept: "Seine-et-Marne (77)",
    submarket: "Greater Paris", tenure: "Freehold",
    land: "8 994 m²", siteCoverage: "62%", gla: "5 574 m²", officeRatio: "20%",
    yearBuilt: "1986 (rénové 2000)", assetType: "Logistique urbaine",
    esg: "—", pvRoof: "Non", sectionalDoors: "3", loadingDocks: "4",
    floorLoading: "5 T/m²", freeHeight: "8 m",
    annualRent: "619 774 €", rentPsm: "111 €/m²", occupancy: "100%", walb: "2,0 ans", walt: "11,1 ans",
    distances: [
      { name: "N104 La Francilienne", time: "3 min" }, { name: "A4", time: "5 min" },
      { name: "Paris périphérique", time: "26 min" }, { name: "Paris-CDG Airport", time: "43 min" },
      { name: "Paris-Orly Airport", time: "43 min" }, { name: "Station RER A Torcy", time: "9 min" },
    ],
    tenants: [
      { name: "Eurelec", gla: "5 574 m²", rent: "619 774 €", psm: "111 €/m²", walb: "2,0", walt: "11,1" },
    ],
    maps: "9+Rue+Ambroise+Croizat+77183+Croissy-Beaubourg+France"
  },
  "trappes": {
    id: "trappes", city: "Trappes", address: "26 Avenue Roger Hennequin", cp: "78190", region: "idf", dept: "Yvelines (78)",
    submarket: "Greater Paris", tenure: "Freehold",
    land: "13 210 m²", siteCoverage: "42%", gla: "5 600 m²", officeRatio: "11%",
    yearBuilt: "1997", assetType: "Entrepôt logistique",
    esg: "—", pvRoof: "Non", sectionalDoors: "5", loadingDocks: "0",
    floorLoading: "N.C.", freeHeight: "7 m",
    annualRent: "331 205 €", rentPsm: "59 €/m²", occupancy: "100%", walb: "3,9 ans", walt: "7,9 ans",
    distances: [
      { name: "N12/A86", time: "9 min" }, { name: "A13", time: "22 min" },
      { name: "Paris périphérique", time: "28 min" }, { name: "A6", time: "30 min" },
      { name: "Gare de Trappes (N/U)", time: "3 min" }, { name: "Paris-Orly Airport", time: "53 min" },
    ],
    tenants: [
      { name: "Telstar", gla: "5 600 m²", rent: "331 205 €", psm: "59 €/m²", walb: "3,9", walt: "7,9" },
    ],
    maps: "26+Avenue+Roger+Hennequin+78190+Trappes+France"
  },
  "noisy": {
    id: "noisy", city: "Noisy-le-Sec", address: "28 Avenue de Bobigny", cp: "93130", region: "idf", dept: "Seine-Saint-Denis (93)",
    submarket: "Greater Paris", tenure: "Co-propriété",
    land: "3 277 m²", siteCoverage: "49%", gla: "1 614 m²", officeRatio: "48%",
    yearBuilt: "1990", assetType: "Entrepôt industriel léger",
    esg: "—", pvRoof: "Non", sectionalDoors: "1", loadingDocks: "0",
    floorLoading: "3 T/m²", freeHeight: "7 m",
    annualRent: "225 102 €", rentPsm: "139 €/m²", occupancy: "100%", walb: "5,1 ans", walt: "7,7 ans",
    distances: [
      { name: "N3", time: "4 min" }, { name: "A3/A86", time: "6 min" },
      { name: "Paris périphérique", time: "20 min" }, { name: "Paris-CDG Airport", time: "30 min" },
      { name: "Station RER E Noisy-le-Sec", time: "2 min" }, { name: "Gare de l'Est", time: "29 min" },
    ],
    tenants: [
      { name: "Forkardt", gla: "180 m²", rent: "27 330 €", psm: "152 €/m²", walb: "2,9", walt: "7,0" },
      { name: "Soleil Chez Vous", gla: "320 m²", rent: "51 245 €", psm: "160 €/m²", walb: "1,9", walt: "1,9" },
      { name: "Un chez soi d'abord", gla: "297 m²", rent: "38 683 €", psm: "130 €/m²", walb: "3,0", walt: "7,1" },
      { name: "AB Copains", gla: "817 m²", rent: "107 844 €", psm: "132 €/m²", walb: "7,9", walt: "10,9" },
    ],
    maps: "28+Avenue+de+Bobigny+93130+Noisy-le-Sec+France"
  },
  "elancourt": {
    id: "elancourt", city: "Élancourt", address: "65 Avenue Georges Politzer", cp: "78990", region: "idf", dept: "Yvelines (78)",
    submarket: "Greater Paris", tenure: "Co-propriété",
    land: "36 370 m²", siteCoverage: "11%", gla: "4 014 m²", officeRatio: "8%",
    yearBuilt: "2000", assetType: "Entrepôt industriel léger",
    esg: "—", pvRoof: "Non", sectionalDoors: "2", loadingDocks: "3",
    floorLoading: "3 T/m²", freeHeight: "9 m",
    annualRent: "263 120 €", rentPsm: "66 €/m²", occupancy: "100%", walb: "2,6 ans", walt: "9,7 ans",
    distances: [
      { name: "N10/A12", time: "2 min" }, { name: "N12/A86", time: "15 min" },
      { name: "Paris périphérique", time: "29 min" }, { name: "Paris-Orly Airport", time: "46 min" },
      { name: "Gare La Verrière (N/U)", time: "6 min" },
    ],
    tenants: [
      { name: "Matchevent", gla: "4 014 m²", rent: "263 120 €", psm: "66 €/m²", walb: "2,6", walt: "9,7" },
    ],
    maps: "65+Avenue+Georges+Politzer+78990+Elancourt+France"
  },
};

// All assets with mapping to IM / UP data
const assets = [
  { city:"Valenton",          address:"3 Rue Aminata Traoré",              cp:"94460", region:"idf",      dept:"Val-de-Marne (94)",         brand:"urbanpro", upKey:"valenton-up" },
  { city:"Éguilles",          address:"320B Rue Topaze",                   cp:"13510", region:"paca",     dept:"Bouches-du-Rhône (13)",      brand:"urbanpro", upKey:"eguilles-up" },
  { city:"Neuilly-Plaisance", address:"1 Rue Alexander Fleming",           cp:"93360", region:"idf",      dept:"Seine-Saint-Denis (93)",     brand:"urbanpro", upKey:"neuilly-up" },
  { city:"Épinay-sur-Seine",  address:"3 Rue des Carrières",               cp:"93800", region:"idf",      dept:"Seine-Saint-Denis (93)",     brand:"urbanpro", upKey:"epinay-up" },
  { city:"Bagnolet",          address:"35 Rue Jean Lolive",                cp:"93170", region:"idf",      dept:"Seine-Saint-Denis (93)",     brand:"urbanpro", upKey:"bagnolet-up" },
  { city:"Marseille",         address:"10 Impasse du Pistou",              cp:"13009", region:"paca",     dept:"Bouches-du-Rhône (13)",      brand:"urbanpro", upKey:"marseille-up", underConstruction:true },
  { city:"Gradignan",         address:"17 Avenue de l'Europe",             cp:"33170", region:"bordeaux", dept:"Gironde (33)",               brand:"urbanpro", upKey:"gradignan-up" },
  { city:"Morangis",          address:"4 Rue du Docteur Albert Schweitzer",cp:"91420", region:"idf",      dept:"Essonne (91)",               brand:"urbanpro", upKey:"morangis-up", underConstruction:true },
  { city:"Corbeil-Essonnes",  address:"95 Rue Émile Zola",                 cp:"91100", region:"idf",      dept:"Essonne (91)",               brand:"urbanpro", upKey:"corbeil-up", underConstruction:true },
  { city:"Buc", address:"697 Rue Fourny", cp:"78530", region:"idf", dept:"Yvelines (78)", tag:"697" },
  { city:"Buc", address:"617 Rue Fourny", cp:"78530", region:"idf", dept:"Yvelines (78)", tag:"617", imKey:"buc" },
  { city:"Noisy-le-Sec", address:"28 Av. de Bobigny", cp:"93130", region:"idf", dept:"Seine-Saint-Denis (93)", imKey:"noisy" },
  { city:"Villabé", address:"16 Rue de la Closerie", cp:"91100", region:"idf", dept:"Essonne (91)", imKey:"villabe" },
  { city:"Ambarès-et-Lagrave", address:"77 bis Av. de la Libération", cp:"33440", region:"bordeaux", dept:"Gironde (33)", imKey:"ambares" },
  { city:"Osny", address:"23 Rue des Beaux Soleils", cp:"95520", region:"idf", dept:"Val-d'Oise (95)", imKey:"osny" },
  { city:"Trappes", address:"26 Av. Roger Hennequin", cp:"78190", region:"idf", dept:"Yvelines (78)", imKey:"trappes" },
  { city:"Plaisir", address:"226 Rue Jacques Monod", cp:"78370", region:"idf", dept:"Yvelines (78)", imKey:"plaisir" },
  { city:"Croissy-Beaubourg", address:"9 Rue Ambroise Croizat", cp:"77183", region:"idf", dept:"Seine-et-Marne (77)", imKey:"croissy" },
  { city:"Dijon", address:"11 Rue de la Breuchillière", cp:"21000", region:"bourgogne", dept:"Côte-d'Or (21)" },
  { city:"Élancourt", address:"65 Av. Georges Politzer", cp:"78990", region:"idf", dept:"Yvelines (78)", imKey:"elancourt" },
  { city:"Ozoir-la-Ferrière", address:"2 Rue Robert Schuman", cp:"77330", region:"idf", dept:"Seine-et-Marne (77)" },
  { city:"Limay", address:"6 Av. du Val", cp:"78520", region:"idf", dept:"Yvelines (78)" },
  { city:"Bry-sur-Marne", address:"110 Av. Georges Clemenceau", cp:"94360", region:"idf", dept:"Val-de-Marne (94)" },
  { city:"Groslay", address:"4 Rue Eugène Houdry", cp:"95410", region:"idf", dept:"Val-d'Oise (95)" },
];

// ══════════════════════════════════════
// LISTING
// ══════════════════════════════════════
const upLogoSVG = `<img src="urban-pro-icon.png" alt="" class="up-logo-icon" />`;

function renderCards(filter) {
  const grid = document.getElementById('assets-grid');
  grid.innerHTML = '';
  let filtered;
  if (filter === 'all') filtered = assets;
  else if (filter === 'urbanpro') filtered = assets.filter(a => a.brand === 'urbanpro');
  else filtered = assets.filter(a => a.region === filter);

  filtered.forEach(a => {
    const badge = badgeMap[a.region];
    const isUP = a.brand === 'urbanpro';
    const displayCity = a.tag ? `${a.city} — n°${a.tag}` : a.city;
    const mapsQ = encodeURIComponent(`${a.address}, ${a.cp} ${a.city}`);
    const hasIM = !!a.imKey;
    const card = document.createElement('div');
    card.className = 'card';
    // Accent bar: black for Urban Pro, teal otherwise
    const accentStyle = isUP ? 'background:#1a1a1a' : '';
    card.innerHTML = `
      <div class="card-accent" style="${accentStyle}"></div>
      <div class="card-body">
        <div class="card-header">
          <div>
            <div class="card-city">${displayCity}</div>
            <div class="card-badges">
              ${isUP ? `<span class="up-badge">${upLogoSVG} Urban Pro</span>` : ''}
              ${a.underConstruction ? '<span class="construction-badge">En cours de construction</span>' : ''}
              ${hasIM ? '<span class="im-pill">FICHE TECHNIQUE</span>' : ''}
            </div>
          </div>
          <span class="card-badge ${badge.cls}">${badge.label}</span>
        </div>
        <div class="card-address">${pinSVG}<span>${a.address}<br>${a.cp} ${a.city}<br><small style="font-size:11px;opacity:.7">${a.dept}</small></span></div>
        <div class="card-footer">
          <div style="display:flex;align-items:center;gap:7px">
            <div class="available-dot"></div><span class="available-label">Disponible</span>
          </div>
          ${hasIM
            ? `<button type="button" class="card-link" onclick="showDetail('${a.imKey}')">Voir la fiche →</button>`
            : a.upKey
              ? `<button type="button" class="card-link" onclick="showUPDetail('${a.upKey}')">Voir les cellules →</button>`
              : `<a class="card-link" href="https://www.google.com/maps/search/?api=1&query=${mapsQ}" target="_blank">Voir sur Maps →</a>`
          }
        </div>
      </div>`;
    grid.appendChild(card);
  });
  document.getElementById('visible-count').textContent = filtered.length;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards(btn.dataset.filter);
  });
});
renderCards('all');

// ══════════════════════════════════════
// URBAN PRO DATA
// ══════════════════════════════════════
// Static metadata only — the "cells" arrays (per-lot surfaces / occupancy / rent) are
// loaded from data/up-assets.json, which a daily GitHub Action refreshes from Notion.
const upAssets = {
  "valenton-up": {
    city:"Valenton", address:"3 Rue Aminata Traoré", cp:"94460", region:"idf", dept:"Val-de-Marne (94)",
    maps:"3+Rue+Aminata+Traore+94460+Valenton+France",
  },
  "epinay-up": {
    city:"Épinay-sur-Seine", address:"3 Rue des Carrières", cp:"93800", region:"idf", dept:"Seine-Saint-Denis (93)",
    maps:"3+Rue+des+Carrieres+93800+Epinay-sur-Seine+France",
  },
  "marseille-up": {
    city:"Marseille", address:"10 Impasse du Pistou", cp:"13009", region:"paca", dept:"Bouches-du-Rhône (13)",
    maps:"10+Impasse+du+Pistou+13009+Marseille+France", underConstruction:true,
  },
  "bagnolet-up": {
    city:"Bagnolet", address:"35 Rue Jean Lolive", cp:"93170", region:"idf", dept:"Seine-Saint-Denis (93)",
    maps:"35+Rue+Jean+Lolive+93170+Bagnolet+France",
  },
  "neuilly-up": {
    city:"Neuilly-Plaisance", address:"1 Rue Alexander Fleming", cp:"93360", region:"idf", dept:"Seine-Saint-Denis (93)",
    maps:"1+Rue+Alexander+Fleming+93360+Neuilly-Plaisance+France",
  },
  "morangis-up": {
    city:"Morangis", address:"4 Rue du Docteur Albert Schweitzer", cp:"91420", region:"idf", dept:"Essonne (91)",
    maps:"4+Rue+du+Docteur+Albert+Schweitzer+91420+Morangis+France", underConstruction:true,
  },
  "eguilles-up": {
    city:"Éguilles", address:"320B Rue Topaze", cp:"13510", region:"paca", dept:"Bouches-du-Rhône (13)",
    maps:"320B+Rue+Topaze+13510+Eguilles+France",
  },
  "gradignan-up": {
    city:"Gradignan", address:"17 Avenue de l'Europe", cp:"33170", region:"bordeaux", dept:"Gironde (33)",
    maps:"17+Avenue+de+l+Europe+33170+Gradignan+France",
  },
  "corbeil-up": {
    city:"Corbeil-Essonnes", address:"95 Rue Émile Zola", cp:"91100", region:"idf", dept:"Essonne (91)",
    maps:"95+Rue+Emile+Zola+91100+Corbeil-Essonnes+France", underConstruction:true,
  },
};

// Loads data/up-assets.json (synced daily from Notion) and merges "cells" onto upAssets.
const upAssetsDataLoaded = fetch('data/up-assets.json')
  .then(r => r.json())
  .then(data => {
    Object.entries(data).forEach(([key, entry]) => {
      if (upAssets[key]) upAssets[key].cells = entry.cells;
    });
  })
  .catch(err => console.error('Could not load data/up-assets.json:', err));

// ── URBAN PRO DETAIL PAGE ──
async function showUPDetail(key, updateHash = true) {
  const d = upAssets[key];
  if (!d) return;
  if (updateHash) updateURL(`urbanpro/${key}`);
  if (!d.cells) await upAssetsDataLoaded;
  const badge = badgeMap[d.region];
  const mapSrc = `https://maps.google.com/maps?q=${d.maps}&output=embed`;

  const occupied = d.cells ? d.cells.filter(c => c.status === 'occupé').length : 0;
  const total    = d.cells ? d.cells.length : 0;
  const totalGLA = d.cells ? d.cells.reduce((s,c) => s + c.total, 0).toFixed(0) : '—';
  const occRate  = d.cells ? Math.round(occupied / total * 100) + '%' : '—';

  const cellsHTML = d.cells ? `
    <div style="overflow-x:auto;margin-bottom:8px">
      <table class="tenants-table">
        <thead>
          <tr>
            <th>Cellule</th>
            <th>Surface RDC (m²)</th>
            <th>Surface R+1 (m²)</th>
            <th>Surface Totale (m²)</th>
            <th>Statut</th>
            <th>Loyer mensuel</th>
            <th>Disponibilité</th>
          </tr>
        </thead>
        <tbody>
          ${d.cells.map(c => {
            const pill = c.status === 'occupé'
              ? `<span class="status-pill occupied">Occupé</span>`
              : `<span class="status-pill available">Disponible</span>`;
            const loyerCell = c.status === 'vacant' && c.loyer
              ? `<span style="font-weight:600;color:var(--dark)">${new Intl.NumberFormat('fr-FR').format(c.loyer)} €/mois</span>`
              : `<span style="color:var(--text-muted);font-weight:400">—</span>`;
            const dispoCell = c.status === 'vacant'
              ? `<span style="font-size:11px;font-weight:500;color:${c.dispo && c.dispo.includes('.')? '#C47D0A':'var(--green)'}">${c.dispo || '—'}</span>`
              : `<span style="font-size:11px;font-weight:400;color:var(--text-muted)">—</span>`;
            return `<tr class="${c.status === 'vacant' ? 'vacant-row' : ''}">
              <td style="font-weight:600">Cellule ${c.num}</td>
              <td>${c.rdc}</td><td>${c.r1}</td>
              <td style="font-weight:500">${c.total}</td>
              <td>${pill}</td>
              <td>${loyerCell}</td>
              <td>${dispoCell}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>` : `
    <div style="background:var(--offwhite);border:1px solid #DCE8E8;padding:32px;text-align:center;margin-bottom:40px">
      <p style="font-size:13px;color:var(--text-muted);font-weight:400">État locatif détaillé à venir pour cet actif.</p>
    </div>`;

  const html = `
    <div class="detail-cover">
      <div class="detail-cover-inner">
        <div class="detail-nav">
          <button class="back-btn" onclick="showListing()">← Retour au portefeuille</button>
          <span style="font-size:11px;color:var(--teal-light);font-weight:400;letter-spacing:1px">URBAN PRO · ÉTAT LOCATIF</span>
        </div>
        <div class="detail-cover-body">
          <div class="detail-cover-text">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
              <div style="background:#1a1a1a;padding:6px 12px;display:inline-flex;align-items:center;gap:7px">
                <img src="urban-pro-icon.png" alt="" style="height:12px;filter:invert(1)" />
                <span style="color:#fff;font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase">Urban Pro</span>
              </div>
              <span class="card-badge ${badge.cls}" style="font-size:10px">${badge.label}</span>
              ${d.underConstruction ? '<span class="construction-badge">En cours de construction</span>' : ''}
            </div>
            <div class="detail-cover-title">${d.city}<strong>${d.address}</strong></div>
            <div class="detail-cover-addr">${d.cp} ${d.city} · ${d.dept}</div>
            <div class="detail-cover-kpis">
              <div><div class="ckpi-val">${total}</div><div class="ckpi-label">Cellules</div></div>
              <div><div class="ckpi-val">${totalGLA} m²</div><div class="ckpi-label">Surface totale</div></div>
              <div><div class="ckpi-val">${occupied}/${total}</div><div class="ckpi-label">Occupées</div></div>
              <div><div class="ckpi-val">${occRate}</div><div class="ckpi-label">Taux d'occupation</div></div>
            </div>
          </div>
          <div class="detail-cover-map">
            <iframe src="${mapSrc}" allowfullscreen loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </div>

    <div class="plaquette-body">
      <div class="pq-section-header">
        <div class="pq-section-num">01</div>
        <div class="pq-section-title">Répartition des Cellules</div>
      </div>
      ${cellsHTML}

      <div class="pq-section-header">
        <div class="pq-section-num">02</div>
        <div class="pq-section-title">Contacter Urban Pro</div>
      </div>
      <div style="max-width:420px;margin-bottom:60px">
        <p style="font-size:13px;font-weight:400;color:var(--text-muted);line-height:1.7;margin-bottom:24px">
          Pour visiter les cellules disponibles et connaître les conditions de location Urban Pro, contactez notre équipe.
        </p>
        <div class="pq-contact-block" style="background:#1a1a1a">
          <div class="label" style="color:#aaa">Contact Urban Pro</div>
          <div class="name">Mehdi Liakat</div>
          <a href="tel:0633631350" class="phone">06 33 63 13 50</a>
        </div>
      </div>
    </div>

    <div style="background:var(--dark);padding:20px 40px;display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="background:#1a1a1a;padding:5px 10px;display:inline-flex;align-items:center;gap:6px">
          <img src="urban-pro-icon.png" alt="" style="height:10px;filter:invert(1)" />
          <span style="color:#fff;font-size:10px;font-weight:600;letter-spacing:1px">URBAN PRO</span>
        </div>
        <span style="color:var(--teal-light);font-size:11px;font-weight:400">by Braxton Asset Management</span>
      </div>
      <span style="font-size:11px;color:var(--teal-light);font-weight:400">Document confidentiel — Non contractuel</span>
    </div>`;

  const dv = document.getElementById('detail-view');
  dv.innerHTML = html;
  dv.classList.add('active');
  document.getElementById('listing-view').classList.add('hidden');
  window.scrollTo(0, 0);
}

// ══════════════════════════════════════
// DETAIL PAGE — style plaquette Braxton
// ══════════════════════════════════════
function esgClass(esg) {
  if (!esg || esg === '—') return 'esg-none';
  if (esg.includes('Excellent')) return 'esg-excellent';
  if (esg.includes('Very Good')) return 'esg-verygood';
  if (esg.includes('Good')) return 'esg-good';
  return 'esg-none';
}
function occClass(occ) {
  const n = parseInt(occ);
  if (n === 100) return 'occ-full';
  if (n >= 40) return 'occ-partial';
  return 'occ-low';
}

function showDetail(key, updateHash = true) {
  const d = imAssets[key];
  if (!d) return;
  if (updateHash) updateURL(`actif/${key}`);
  const badge = badgeMap[d.region];
  const mapSrc = `https://maps.google.com/maps?q=${d.maps}&output=embed`;
  const esgLabel = d.esg === '—' ? 'Non certifié' : d.esg;
  const esgCls = esgClass(d.esg);

  // Key specs rows
  const specsRows = [
    ['Adresse', `${d.address}, ${d.cp} ${d.city}`],
    ['Surface parcelle', d.land],
    ['Surface construite (GLA)', d.gla],
    ['Emprise au sol', d.siteCoverage],
    ['Répartition activités / bureaux', `${100 - parseInt(d.officeRatio)}% / ${d.officeRatio}`],
    ['Hauteur libre', d.freeHeight],
    ['Charge de plancher', d.floorLoading],
    ['Portes sectionnelles', d.sectionalDoors + ' u.'],
    ['Quais de chargement', d.loadingDocks + ' u.'],
    ['Panneaux PV toiture', d.pvRoof],
    ['Année de construction', d.yearBuilt],
    ['Tenure', d.tenure],
  ].map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');

  // Description bullets — techniques uniquement
  const bullets = (d.bullets || [
    `Actif de type <strong>${d.assetType}</strong>, construit en ${d.yearBuilt}`,
    `Surface totale de <strong>${d.gla}</strong> sur terrain de ${d.land}`,
    `Hauteur libre de <strong>${d.freeHeight}</strong> — charge de plancher ${d.floorLoading}`,
    `${d.sectionalDoors} porte(s) sectionnelle(s) motorisée(s), ${d.loadingDocks} quai(s) de chargement`,
    `Certification environnementale : <strong>${esgLabel}</strong>`,
    `Panneaux photovoltaïques en toiture : ${d.pvRoof}`,
    `Taux d'occupation : <strong>${d.occupancy}</strong>`,
  ]).map(b => `<li>${b}</li>`).join('');

  // Tenancy rows — sans noms de locataires ni montants financiers
  const tenantsRows = d.tenants.map((t, i) => {
    const statusPill = t.vacant
      ? `<span class="status-pill available">Disponible</span>`
      : `<span class="status-pill occupied">Occupé</span>`;
    return `<tr class="${t.vacant ? 'vacant-row' : ''}">
      <td style="font-weight:600">Cellule ${i+1}</td>
      <td>${t.gla}</td>
      <td>${statusPill}</td>
      <td style="color:var(--dark);font-weight:500;font-size:12px">Nous consulter</td>
    </tr>`;
  }).join('');

  // Detailed per-building / per-cell breakdown (currently only populated for Osny),
  // rendered instead of the generic tenants table when available.
  function statusPillHTML(occupied) {
    return occupied
      ? `<span class="status-pill occupied">Occupé</span>`
      : `<span class="status-pill available">Disponible</span>`;
  }
  const cellDetailHTML = d.cellDetail ? (() => {
    const rows = d.cellDetail.buildings.map(b => {
      const cellRows = b.cells.map(c => `
        <tr class="${c.occupied ? '' : 'vacant-row'}">
          <td style="font-weight:600">${c.label}</td>
          <td>${b.name}</td>
          <td>${c.activite != null ? c.activite + ' m²' : '—'}</td>
          <td>${c.bureau != null ? c.bureau + ' m²' : '—'}</td>
          <td>${statusPillHTML(c.occupied)}</td>
        </tr>`).join('');
      return `${cellRows}
        <tr>
          <td style="font-weight:700">Bât ${b.name}</td>
          <td style="font-weight:700">${b.name}</td>
          <td style="font-weight:700">${b.totalActivite} m²</td>
          <td style="font-weight:700">${b.totalBureau} m²</td>
          <td></td>
        </tr>`;
    }).join('');
    return `
      <table class="tenants-table">
        <thead>
          <tr>
            <th>Cellule</th><th>Bâtiment</th><th>Surface activité</th><th>Surface bureau</th><th>Statut</th>
          </tr>
        </thead>
        <tbody>${rows}
          <tr style="background:var(--dark)">
            <td style="font-weight:700;color:#fff">Total</td>
            <td></td>
            <td style="font-weight:700;color:#fff">${d.cellDetail.totalActivite} m²</td>
            <td style="font-weight:700;color:#fff">${d.cellDetail.totalBureau} m²</td>
            <td></td>
          </tr>
        </tbody>
      </table>`;
  })() : null;

  // Distance items
  const distItems = d.distances.map(dist => `
    <div class="distance-item">
      <span class="distance-name">${dist.name}</span>
      <span class="distance-time">${dist.time}</span>
    </div>`).join('');

  const html = `
    <!-- ── COVER ── -->
    <div class="detail-cover">
      <div class="detail-cover-inner">
        <div class="detail-nav">
          <button class="back-btn" onclick="showListing()">← Retour au portefeuille</button>
          <span style="font-size:11px;color:var(--teal-light);font-weight:400;letter-spacing:1px">BRAXTON LOGISTICS · ASSET OVERVIEW</span>
        </div>
        <div class="detail-cover-body">
          <div class="detail-cover-text">
            <div class="detail-cover-label">${badge.label} · ${d.assetType}</div>
            <div class="detail-cover-title">
              ${d.city}
              <strong>${d.address}</strong>
            </div>
            <div class="detail-cover-addr">${d.cp} ${d.city} · ${d.dept}</div>
            <div class="detail-cover-kpis">
              <div><div class="ckpi-val">${d.gla}</div><div class="ckpi-label">GLA totale</div></div>
              <div><div class="ckpi-val">${d.occupancy}</div><div class="ckpi-label">Taux d'occupation</div></div>
              <div><div class="ckpi-val" style="font-size:14px;font-weight:300;letter-spacing:.3px">Nous consulter</div><div class="ckpi-label">Loyer</div></div>
            </div>
          </div>
          <div class="detail-cover-map">
            <iframe src="${mapSrc}" allowfullscreen loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </div>

    <!-- ── BODY ── -->
    <div class="plaquette-body">

      <!-- SECTION 01 — DESCRIPTION DE L'ACTIF -->
      <div class="pq-section-header">
        <div class="pq-section-num">01</div>
        <div class="pq-section-title">Description de l'Actif</div>
      </div>

      <div class="pq-overview">
        <!-- Colonne gauche : fiche technique uniquement -->
        <div>
          <div class="pq-specs-box">
            <div class="pq-specs-box-header"><h4>Résumé de l'actif</h4></div>
            <table class="pq-specs-table">${specsRows}</table>
          </div>
        </div>

        <!-- Colonne droite : description + certifications -->
        <div class="pq-desc-box">
          <p class="pq-desc-intro">
            Un Parc d'Activités ${d.yearBuilt.includes('202') ? 'Neuf' : 'Établi'} aux Portes de Paris — ${d.submarket}
          </p>
          <ul class="pq-bullets">${bullets}</ul>

          <div class="pq-certif-row">
            <span class="esg-pill ${esgCls}">${esgLabel}</span>
            <span class="occ-pill ${occClass(d.occupancy)}">${d.occupancy} occupé</span>
          </div>
        </div>
      </div>

      <!-- SECTION 02 — DISPONIBILITÉS -->
      <div class="pq-section-header">
        <div class="pq-section-num">02</div>
        <div class="pq-section-title">Disponibilités</div>
      </div>
      <div style="overflow-x:auto;margin-bottom:8px">
        ${cellDetailHTML || `
        <table class="tenants-table">
          <thead>
            <tr>
              <th>Cellule</th><th>Surface</th><th>Disponibilité</th><th>Loyer</th>
            </tr>
          </thead>
          <tbody>${tenantsRows}</tbody>
        </table>`}
      </div>
      <p style="font-size:11px;color:var(--text-muted);margin-bottom:40px;font-weight:400">Conditions de location sur demande. Contactez notre équipe pour les détails.</p>

      <!-- SECTION 03 — DESSERTE -->
      <div class="pq-section-header">
        <div class="pq-section-num">03</div>
        <div class="pq-section-title">Desserte & Distances Clés</div>
      </div>
      <div class="distances-grid" style="margin-bottom:40px">${distItems}</div>

      <!-- SECTION 04 — CONTACT -->
      <div class="pq-section-header">
        <div class="pq-section-num">04</div>
        <div class="pq-section-title">Nous Contacter</div>
      </div>
      <div style="max-width:420px;margin-bottom:60px">
        <p style="font-size:13px;font-weight:400;color:var(--text-muted);line-height:1.7;margin-bottom:24px">
          Pour organiser une visite, obtenir les conditions de location ou toute information complémentaire sur cet actif, contactez notre équipe.
        </p>
        <div class="pq-contact-block">
          <div class="label">Contact Braxton Logistics</div>
          <div class="name">Line Thomas</div>
          <a href="tel:0683547709" class="phone">06 83 54 77 09</a>
        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div style="background:var(--dark);padding:20px 40px;display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:28px;height:28px;background:var(--teal);display:flex;align-items:center;justify-content:center;clip-path:polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)"><span style="color:#fff;font-weight:600;font-size:12px">B</span></div>
        <span style="color:var(--white);font-size:12px;font-weight:400;letter-spacing:1px">BRAXTON <span style="color:var(--teal-light)">LOGISTICS</span></span>
      </div>
      <span style="font-size:11px;color:var(--teal-light);font-weight:400">Document confidentiel — Non contractuel — © 2026 Braxton Asset Management</span>
    </div>
  `;

  const dv = document.getElementById('detail-view');
  dv.innerHTML = html;
  dv.classList.add('active');
  document.getElementById('listing-view').classList.add('hidden');
  window.scrollTo(0, 0);
}

function showListing(updateHash = true) {
  if (updateHash) updateURL('');
  document.getElementById('detail-view').classList.remove('active');
  document.getElementById('detail-view').innerHTML = '';
  document.getElementById('listing-view').classList.remove('hidden');
  document.getElementById('contact-view').style.display = 'none';
  window.scrollTo(0, 0);
  setTimeout(initMap, 50);
}

// ── PAGE CONTACT ──
function showContact(updateHash = true) {
  if (updateHash) updateURL('contact');
  const cv = document.getElementById('contact-view');
  cv.style.display = 'block';
  document.getElementById('listing-view').classList.add('hidden');
  document.getElementById('detail-view').classList.remove('active');
  window.scrollTo(0, 0);

  cv.innerHTML = `
    <!-- Cover -->
    <div style="background:var(--dark);padding:0">
      <div style="max-width:1280px;margin:0 auto;padding:18px 40px 0;display:flex;align-items:center;justify-content:space-between">
        <button class="back-btn" onclick="showListing()">← Retour au portefeuille</button>
        <span style="font-size:11px;color:var(--teal-light);font-weight:400;letter-spacing:1px">BRAXTON AM · CONTACT</span>
      </div>
      <div style="max-width:1280px;margin:0 auto;padding:36px 40px 48px">
        <div style="font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--teal-light);margin-bottom:14px">Nous Contacter</div>
        <div style="color:var(--white);font-size:30px;font-weight:400;line-height:1.2;margin-bottom:8px">Une question sur un actif ?<br><strong style="font-weight:600;color:var(--teal-pale)">Notre équipe vous répond.</strong></div>
        <div style="color:var(--teal-light);font-size:13px;font-weight:400;margin-top:10px">Braxton Asset Management — 4 Rue de la Pompe, 75016 Paris</div>
      </div>
    </div>

    <!-- Cards -->
    <div style="max-width:900px;margin:0 auto;padding:56px 40px 80px;display:grid;grid-template-columns:1fr 1fr;gap:32px">

      <!-- Braxton Logistics -->
      <div style="background:var(--white);border:1px solid #DCE8E8;overflow:hidden">
        <div style="background:var(--dark);padding:18px 24px;display:flex;align-items:center;gap:12px">
          <div style="width:32px;height:32px;background:var(--teal);display:flex;align-items:center;justify-content:center;clip-path:polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)">
            <span style="color:#fff;font-weight:600;font-size:13px">B</span>
          </div>
          <div>
            <div style="color:#fff;font-size:11px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase">Braxton Logistics</div>
            <div style="color:rgba(255,255,255,.7);font-size:11px;font-weight:400">Actifs logistiques & entrepôts</div>
          </div>
        </div>
        <div style="padding:28px 24px;display:flex;flex-direction:column;gap:20px">
          <div>
            <div style="font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Contact</div>
            <div style="font-size:17px;font-weight:500;color:var(--text)">Line Thomas</div>
          </div>
          <div>
            <div style="font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Téléphone</div>
            <a href="tel:0683547709" style="font-size:22px;font-weight:600;color:var(--dark);text-decoration:none;letter-spacing:.3px">06 83 54 77 09</a>
          </div>
          <div>
            <div style="font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Email</div>
            <a href="mailto:line@braxtonam.com" style="font-size:15px;font-weight:400;color:var(--dark);text-decoration:none">line@braxtonam.com</a>
          </div>
          <a href="tel:0683547709" style="margin-top:4px;display:block;background:var(--dark);color:#fff;text-align:center;padding:12px;font-size:12px;font-weight:500;letter-spacing:.8px;text-decoration:none;text-transform:uppercase;transition:background .2s" onmouseover="this.style.background='#DDA73C'" onmouseout="this.style.background='#005F52'">Appeler →</a>
        </div>
      </div>

      <!-- Urban Pro -->
      <div style="background:var(--white);border:1px solid #1a1a1a;overflow:hidden">
        <div style="background:#1a1a1a;padding:18px 24px;display:flex;align-items:center;gap:12px">
          <img src="urban-pro-logo.png" alt="Urban Pro" style="height:36px;filter:invert(1)" />
          <div style="color:rgba(255,255,255,.5);font-size:11px;font-weight:400">Parcs d'activités urbains</div>
        </div>
        <div style="padding:28px 24px;display:flex;flex-direction:column;gap:20px">
          <div>
            <div style="font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Contact</div>
            <div style="font-size:15px;font-weight:400;color:var(--text)">Mehdi Liakat</div>
          </div>
          <div>
            <div style="font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Téléphone</div>
            <a href="tel:0633631350" style="font-size:22px;font-weight:600;color:#1a1a1a;text-decoration:none;letter-spacing:.3px">06 33 63 13 50</a>
          </div>
          <div>
            <div style="font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Email</div>
            <a href="mailto:mehdi@braxtonam.com" style="font-size:14px;font-weight:400;color:#1a1a1a;text-decoration:none;display:flex;align-items:center;gap:8px">
              <span style="width:6px;height:6px;background:#1a1a1a;flex-shrink:0"></span>mehdi@braxtonam.com
            </a>
          </div>
          <a href="mailto:mehdi@braxtonam.com" style="margin-top:4px;display:block;background:#1a1a1a;color:#fff;text-align:center;padding:12px;font-size:12px;font-weight:500;letter-spacing:.8px;text-decoration:none;text-transform:uppercase;transition:background .2s" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#1a1a1a'">Contacter Mehdi →</a>
        </div>
      </div>

    </div>

    <div style="background:var(--dark);padding:20px 40px;display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:28px;height:28px;background:var(--teal);display:flex;align-items:center;justify-content:center;clip-path:polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)"><span style="color:#fff;font-weight:600;font-size:12px">B</span></div>
        <span style="color:var(--white);font-size:12px;font-weight:400;letter-spacing:1px">BRAXTON <span style="color:var(--teal-light)">ASSET MANAGEMENT</span></span>
      </div>
      <span style="font-size:11px;color:var(--teal-light);font-weight:400">© 2026 Braxton Asset Management</span>
    </div>
  `;
}

// ══════════════════════════════════════
// MAP
// ══════════════════════════════════════
const assetCoords = {
  // Urban Pro
  "valenton-up":   [48.7480, 2.4590],
  "eguilles-up":   [43.5508, 5.3195],
  "neuilly-up":    [48.8658, 2.5128],
  "epinay-up":     [48.9539, 2.3150],
  "bagnolet-up":   [48.8680, 2.4211],
  "marseille-up":  [43.2708, 5.4050],
  "gradignan-up":  [44.7769, -0.6028],
  "morangis-up":   [48.6950, 2.3572],
  "corbeil-up":    [48.6131, 2.4817],
  // BL (keyed by city+cp for unicity)
  "Buc-78530-697":           [48.7675, 2.1300],
  "Buc-78530-617":           [48.7680, 2.1302],
  "Noisy-le-Sec":            [48.8917, 2.4558],
  "Villabé":                 [48.5839, 2.4392],
  "Ambarès-et-Lagrave":      [44.9183, -0.4806],
  "Osny":                    [49.0672, 2.0503],
  "Trappes":                 [48.7736, 2.0036],
  "Plaisir":                 [48.8186, 1.9572],
  "Croissy-Beaubourg":       [48.8325, 2.7681],
  "Dijon":                   [47.3247, 5.0522],
  "Élancourt":               [48.7836, 2.0469],
  "Ozoir-la-Ferrière":       [48.7553, 2.6781],
  "Limay":                   [48.9936, 1.7339],
  "Bry-sur-Marne":           [48.8367, 2.5211],
  "Groslay":                 [48.9864, 2.3872],
};

function getCoords(a) {
  if (a.upKey) return assetCoords[a.upKey];
  if (a.tag)   return assetCoords[`${a.city}-${a.cp}-${a.tag}`];
  return assetCoords[a.city];
}

function initMap() {
  const mapEl = document.getElementById('assets-map');
  if (!mapEl || mapEl._leaflet_id) return;

  const map = L.map('assets-map', { scrollWheelZoom: false, zoomControl: true });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 18
  }).addTo(map);

  // Custom UP icon
  const upIcon = L.divIcon({
    className: '',
    html: `<div style="width:20px;height:20px;background:#1a1a1a;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.35)">
      <img src="urban-pro-icon.png" alt="" style="height:9px;filter:invert(1)" />
    </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  const bounds = [];

  assets.forEach(a => {
    const coords = getCoords(a);
    if (!coords) return;
    bounds.push(coords);
    const isUP = a.brand === 'urbanpro';
    const displayCity = a.tag ? `${a.city} — n°${a.tag}` : a.city;
    const badgeClass = isUP ? 'up' : 'bl';
    const badgeLabel = isUP ? 'Urban Pro' : 'Braxton Logistics';
    const hasPage = a.imKey || a.upKey;
    const clickFn = a.imKey
      ? `showDetail('${a.imKey}')`
      : a.upKey
        ? `showUPDetail('${a.upKey}')`
        : null;
    const cityHTML = hasPage
      ? `<button type="button" class="map-popup-city" style="cursor:pointer;text-decoration:underline;text-underline-offset:3px;text-decoration-color:#DDA73C;background:none;border:none;padding:0;font-family:inherit;display:block" onclick="${clickFn}">${displayCity} →</button>`
      : `<div class="map-popup-city">${displayCity}</div>`;
    const popup = `${cityHTML}
      <div class="map-popup-addr">${a.address}<br>${a.cp} ${a.city}</div>
      <span class="map-popup-badge ${badgeClass}">${badgeLabel}</span>`;

    if (isUP) {
      const marker = L.marker(coords, { icon: upIcon }).addTo(map);
      marker.bindPopup(popup, { maxWidth: 220 });
    } else {
      L.circleMarker(coords, {
        radius: 8,
        fillColor: '#DDA73C',
        color: '#005F52',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85
      }).addTo(map).bindPopup(popup, { maxWidth: 220 });
    }
  });

  // Vue initiale : Île-de-France
  map.setView([48.8566, 2.3522], 10);
}

// ══════════════════════════════════════
// STATS (dérivées des données, jamais codées en dur)
// ══════════════════════════════════════
document.getElementById('stat-total').textContent = assets.length;
document.getElementById('stat-im').textContent = Object.keys(imAssets).length;
document.getElementById('stat-up').textContent = Object.keys(upAssets).length;

// ══════════════════════════════════════
// ROUTING — liens partageables + bouton précédent du navigateur
// ══════════════════════════════════════
function updateURL(hash) {
  const url = hash ? `#${hash}` : location.pathname + location.search;
  history.pushState({ hash }, '', url);
}

function routeFromLocation() {
  const hash = location.hash.slice(1);
  if (hash.startsWith('actif/')) showDetail(decodeURIComponent(hash.slice(6)), false);
  else if (hash.startsWith('urbanpro/')) showUPDetail(decodeURIComponent(hash.slice(9)), false);
  else if (hash === 'contact') showContact(false);
  else showListing(false);
}

window.addEventListener('popstate', routeFromLocation);
document.addEventListener('DOMContentLoaded', routeFromLocation);
