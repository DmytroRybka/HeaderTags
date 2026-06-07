#!/usr/bin/env node
/*
 * Generates the Safety First hero artwork as standalone SVG files.
 * Vector, on-brand, reproducible — re-run to regenerate:
 *   node scripts/gen-art.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ASSETS = join(dirname(fileURLToPath(import.meta.url)), "..", "assets");
mkdirSync(ASSETS, { recursive: true });

const FONT = "Segoe UI, Roboto, Helvetica, Arial, sans-serif";
const C = {
  green: "#34d399", green2: "#22c55e", blue: "#5b9bff",
  amber: "#f5b13d", red: "#f4736b",
  bg: "#0e1830", card: "#16203a", card2: "#1b2748",
  line: "#263256", ink: "#eaf0fb", dim: "#9fb0d0", muted: "#2c3a5e"
};

// Classic 24x24 filled star; no fill so <use fill> colours it.
const STAR = `<symbol id="st" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></symbol>`;

function starRow(x, y, filled, color, { total = 10, size = 22, gap = 26 } = {}) {
  let s = "";
  for (let i = 0; i < total; i++) {
    s += `<use href="#st" x="${x + i * gap}" y="${y}" width="${size}" height="${size}" fill="${i < filled ? color : C.muted}"/>`;
  }
  return s;
}

function pill(cx, cy, text, color, w = 168) {
  const x = cx - w / 2;
  return (
    `<rect x="${x}" y="${cy - 19}" width="${w}" height="38" rx="19" fill="${color}" fill-opacity="0.16" stroke="${color}" stroke-width="1.5"/>` +
    `<text x="${cx}" y="${cy + 5}" text-anchor="middle" fill="${color}" font-family="${FONT}" font-size="15" font-weight="800" letter-spacing="0.06em">${text}</text>`
  );
}

const DEFS = (extra = "") => `<defs>
  <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${C.green}"/><stop offset="1" stop-color="${C.blue}"/></linearGradient>
  <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop stop-color="${C.blue}"/><stop offset="1" stop-color="${C.green}"/></linearGradient>
  <radialGradient id="glowG" cx="0.5" cy="0.5" r="0.5"><stop stop-color="${C.green}" stop-opacity="0.4"/><stop offset="1" stop-color="${C.green}" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowR" cx="0.5" cy="0.5" r="0.5"><stop stop-color="${C.red}" stop-opacity="0.38"/><stop offset="1" stop-color="${C.red}" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowB" cx="0.5" cy="0.5" r="0.5"><stop stop-color="${C.blue}" stop-opacity="0.32"/><stop offset="1" stop-color="${C.blue}" stop-opacity="0"/></radialGradient>
  <filter id="sh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#03060d" flood-opacity="0.5"/></filter>
  ${extra}
</defs>`;

const shield = (tx, ty, scale = 1) =>
  `<g filter="url(#sh)" transform="translate(${tx},${ty}) scale(${scale})">` +
  `<path d="M28 2 52 10V30C52 46 41 57 28 62 15 57 4 46 4 30V10Z" fill="url(#brand)"/>` +
  `<path d="M17 30 25 38 40 22" stroke="#06281c" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>`;

/* ----------------------------------------------------------------------
 * 1. HOME — a balance tipping a worthwhile reward over a controllable risk
 * -------------------------------------------------------------------- */
const home = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 470" role="img" aria-label="A balance weighing benefit against risk">
<title>Safety First — weighing benefit against risk</title>
${DEFS()}<defs>${STAR}</defs>
<circle cx="120" cy="330" r="160" fill="url(#glowG)"/>
<circle cx="470" cy="290" r="135" fill="url(#glowR)"/>
<g fill="#34507f"><circle cx="70" cy="80" r="3"/><circle cx="500" cy="70" r="3"/><circle cx="300" cy="36" r="2.5"/><circle cx="516" cy="190" r="2.5"/><circle cx="56" cy="205" r="2.5"/><circle cx="150" cy="60" r="2"/></g>
${shield(252, 22, 1)}
<path d="M280 118 316 360 244 360Z" fill="${C.card2}" stroke="${C.line}" stroke-width="2"/>
<rect x="230" y="356" width="100" height="13" rx="6.5" fill="${C.line}"/>
<line x1="96" y1="150" x2="464" y2="118" stroke="url(#beam)" stroke-width="9" stroke-linecap="round" filter="url(#sh)"/>
<circle cx="280" cy="134" r="11" fill="${C.ink}"/><circle cx="280" cy="134" r="5" fill="${C.card2}"/>
<!-- benefit pan (left, lower = it wins) -->
<line x1="96" y1="150" x2="60" y2="252" stroke="#46598a" stroke-width="2"/><line x1="96" y1="150" x2="132" y2="252" stroke="#46598a" stroke-width="2"/>
<g filter="url(#sh)"><rect x="32" y="250" width="128" height="104" rx="16" fill="${C.card}" stroke="${C.green}" stroke-opacity="0.4" stroke-width="2"/></g>
<text x="96" y="278" text-anchor="middle" fill="${C.green}" font-family="${FONT}" font-size="13" font-weight="800" letter-spacing="0.12em">BENEFIT</text>
${[0,1,2,3,4].map(i=>`<use href="#st" x="${52+i*18}" y="290" width="16" height="16" fill="${C.amber}"/>`).join("")}
<text x="96" y="340" text-anchor="middle" fill="${C.dim}" font-family="${FONT}" font-size="12.5">clearly worth it</text>
<!-- risk pan (right, higher = controlled) -->
<line x1="464" y1="118" x2="430" y2="206" stroke="#46598a" stroke-width="2"/><line x1="464" y1="118" x2="498" y2="206" stroke="#46598a" stroke-width="2"/>
<g filter="url(#sh)"><rect x="400" y="204" width="128" height="104" rx="16" fill="${C.card}" stroke="${C.red}" stroke-opacity="0.4" stroke-width="2"/></g>
<text x="464" y="232" text-anchor="middle" fill="${C.red}" font-family="${FONT}" font-size="13" font-weight="800" letter-spacing="0.12em">RISK</text>
<circle cx="464" cy="266" r="19" fill="${C.red}" fill-opacity="0.16" stroke="${C.red}" stroke-width="2"/>
<text x="464" y="274" text-anchor="middle" fill="${C.red}" font-family="${FONT}" font-size="24" font-weight="800">!</text>
</svg>`;

/* ----------------------------------------------------------------------
 * Shared banner frame (1200x280)
 * -------------------------------------------------------------------- */
const W = 1200, H = 280;
function banner(inner, glow = "glowG", glowX = 240) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img">
${DEFS()}<defs>${STAR}</defs>
<rect x="1" y="1" width="${W-2}" height="${H-2}" rx="22" fill="${C.bg}" stroke="${C.line}"/>
<clipPath id="cp"><rect x="1" y="1" width="${W-2}" height="${H-2}" rx="22"/></clipPath>
<g clip-path="url(#cp)"><circle cx="${glowX}" cy="120" r="230" fill="url(#${glow})"/><circle cx="1050" cy="240" r="200" fill="url(#glowB)"/>
${inner}</g></svg>`;
}

/* 2. RATINGS — the three live meters */
const ratings = banner(
  shield(70, 104, 1.1) +
  `<text x="160" y="116" fill="${C.ink}" font-family="${FONT}" font-size="30" font-weight="800" letter-spacing="-0.01em">The 3-Star System</text>
   <text x="160" y="150" fill="${C.dim}" font-family="${FONT}" font-size="17">Honest scores in. One verdict out.</text>` +
  // meters
  `<text x="500" y="96" fill="${C.amber}" font-family="${FONT}" font-size="15" font-weight="700">Benefit</text>` +
  starRow(648, 78, 8, C.amber) +
  `<text x="500" y="156" fill="${C.red}" font-family="${FONT}" font-size="15" font-weight="700">Raw Risk</text>` +
  starRow(648, 138, 7, C.red) +
  `<text x="500" y="216" fill="${C.green}" font-family="${FONT}" font-size="15" font-weight="700">Mitigation</text>` +
  starRow(648, 198, 9, C.green) +
  pill(1062, 147, "WORTHWHILE", C.green, 196),
  "glowG", 200
);

/* 3. PHILOSOPHY — two roads diverge from one choice */
const philosophy = banner(
  shield(70, 104, 1.1) +
  `<text x="160" y="116" fill="${C.ink}" font-family="${FONT}" font-size="30" font-weight="800">Two kinds of risk</text>
   <text x="160" y="150" fill="${C.dim}" font-family="${FONT}" font-size="17">Delete the pointless ones. Earn the worthwhile ones.</text>` +
  // origin node
  `<circle cx="560" cy="140" r="9" fill="${C.ink}"/>` +
  // worthwhile road (smooth, green, up)
  `<path d="M560 140 C700 140 760 78 1030 76" stroke="${C.green}" stroke-width="10" stroke-linecap="round" fill="none"/>` +
  `<circle cx="1030" cy="76" r="22" fill="${C.green}" fill-opacity="0.18" stroke="${C.green}" stroke-width="2.5"/>` +
  `<path d="M1021 76 1028 83 1040 69" stroke="${C.ink}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` +
  `<text x="1062" y="82" fill="${C.green}" font-family="${FONT}" font-size="13" font-weight="700">worthwhile</text>` +
  // unnecessary road (jagged, red, down)
  `<path d="M560 140 L640 200 L690 168 L760 224 L820 192 L900 232 L1030 212" stroke="${C.red}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` +
  `<circle cx="1030" cy="212" r="22" fill="${C.red}" fill-opacity="0.16" stroke="${C.red}" stroke-width="2.5"/>` +
  `<text x="1030" y="220" text-anchor="middle" fill="${C.red}" font-family="${FONT}" font-size="24" font-weight="800">!</text>` +
  `<text x="1062" y="218" fill="${C.red}" font-family="${FONT}" font-size="13" font-weight="700">unnecessary</text>`,
  "glowB", 260
);

/* 4. BLOG — a fan of scored risk cards */
function miniCard(x, y, rot, color, label, filled) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})" filter="url(#sh)">
    <rect x="-110" y="-72" width="220" height="144" rx="16" fill="${C.card}" stroke="${C.line}"/>
    <rect x="-110" y="-72" width="6" height="144" rx="3" fill="${color}"/>
    ${pill(0, -44, label, color, 150)}
    ${starRow(-86, -18, filled, color, { total: 7, size: 17, gap: 25 })}
    <rect x="-86" y="22" width="172" height="9" rx="4.5" fill="${C.card2}"/>
    <rect x="-86" y="40" width="120" height="9" rx="4.5" fill="${C.card2}"/>
  </g>`;
}
const blog = banner(
  shield(70, 104, 1.1) +
  `<text x="160" y="116" fill="${C.ink}" font-family="${FONT}" font-size="30" font-weight="800">Risk Reviews</text>
   <text x="160" y="150" fill="${C.dim}" font-family="${FONT}" font-size="17">Real decisions, scored — each ending in a plan.</text>` +
  miniCard(720, 150, -7, C.red, "AVOID", 2) +
  miniCard(930, 132, 4, C.amber, "CARE", 5) +
  miniCard(1130, 150, -3, C.green, "DO IT", 6),
  "glowG", 220
);

const files = {
  "hero-home.svg": home,
  "hero-ratings.svg": ratings,
  "hero-philosophy.svg": philosophy,
  "hero-blog.svg": blog
};
for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(ASSETS, name), svg + "\n");
  console.log("✓ wrote assets/" + name + "  (" + svg.length + " bytes)");
}
