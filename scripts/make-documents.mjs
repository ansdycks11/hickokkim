// Renders the three (plus one) mock documents used by the homepage experience
// (docs/website-architecture.md §13.3) from SVG to WebP + JPEG at 2048px on the long edge.
// Never real client documents: the "body text" is abstract line-work, only the
// headings and letterhead are readable.
// Run: node scripts/make-documents.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const W = 1504, H = 2048; // matches the 1.6 : 2.18 sheet geometry
const M = 150; // margin
const ink = '#1B2330', slate = '#5A6B82', brass = '#A6803E', paper = '#F3EDE1';
const serif = "'Libre Caslon Text', Georgia, 'Times New Roman', serif";
const sans = "Inter, Helvetica, Arial, sans-serif";
const mono = "'IBM Plex Mono', Consolas, monospace";

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function mulberry(a) {
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// Abstract "text" lines: rounded rects of varying width, like a page seen from a distance.
function bodyLines(rng, y, lines) {
  let out = '';
  for (let l = 0; l < lines; l++) {
    let x = M + (l === 0 ? 48 : 0);
    const endX = W - M - (l === lines - 1 ? rng() * 440 : rng() * 70);
    while (x < endX) {
      let w = 30 + rng() * 104;
      if (x + w > endX) w = endX - x;
      if (w < 14) break;
      out += `<rect x="${x.toFixed(1)}" y="${y - 13}" width="${w.toFixed(1)}" height="12" rx="3" fill="rgba(50,54,60,${(0.4 + rng() * 0.22).toFixed(2)})"/>`;
      x += w + 15;
    }
    y += 29;
  }
  return { svg: out, y };
}

function document(spec) {
  const rng = mulberry(spec.seed);
  let y = M + 420;
  let body = '';
  for (const s of spec.sections) {
    body += `<text x="${M}" y="${y}" font-family="${serif}" font-size="29" fill="${ink}">${esc(s)}</text>`;
    y += 38;
    const r = bodyLines(rng, y, 3 + Math.floor(rng() * 3));
    body += r.svg;
    y = r.y + 26;
    if (y > H - 440) break;
  }
  const sy = H - 290;
  const seal = spec.seal
    ? `<g transform="translate(${W - M - 120} ${H - 250})">
        <circle r="88" fill="none" stroke="${brass}" stroke-opacity=".85" stroke-width="5"/>
        <circle r="68" fill="none" stroke="${brass}" stroke-opacity=".85" stroke-width="2"/>
        <text y="-6" text-anchor="middle" font-family="${sans}" font-size="19" fill="${brass}" letter-spacing="2">${esc(spec.seal)}</text>
        <text y="18" text-anchor="middle" font-family="${sans}" font-size="15" fill="${brass}" letter-spacing="2">CALIFORNIA</text>
      </g>`
    : '';
  const stamp = spec.stamp
    ? `<g transform="translate(${W - M - 100} ${M + 34}) rotate(-10)">
        <rect x="-150" y="-38" width="300" height="76" fill="none" stroke="rgba(120,38,38,.55)" stroke-width="3.5"/>
        <text y="11" text-anchor="middle" font-family="${sans}" font-weight="700" font-size="31" fill="rgba(120,38,38,.6)" letter-spacing="3">${esc(spec.stamp)}</text>
      </g>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${spec.seed}" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.08 0"/>
    </filter>
    <radialGradient id="vig" cx="50%" cy="50%" r="70%">
      <stop offset="0.55" stop-color="rgba(40,30,10,0)"/>
      <stop offset="1" stop-color="rgba(40,30,10,0.16)"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${paper}"/>
  <rect width="${W}" height="${H}" filter="url(#grain)"/>
  <!-- letterhead -->
  <text x="${W / 2}" y="${M + 40}" text-anchor="middle" font-family="${serif}" font-size="50" fill="${ink}">${esc(spec.head)}</text>
  <text x="${W / 2}" y="${M + 86}" text-anchor="middle" font-family="${sans}" font-size="22" fill="${slate}" letter-spacing="5">${esc(spec.sub)}</text>
  <rect x="${W / 2 - 100}" y="${M + 112}" width="200" height="2.5" fill="${brass}"/>
  <!-- title block -->
  ${spec.title.map((line, i) => `<text x="${W / 2}" y="${M + 220 + i * 66}" text-anchor="middle" font-family="${serif}" font-weight="700" font-size="56" fill="${ink}">${esc(line)}</text>`).join('')}
  <text x="${W - M}" y="${M + 350}" text-anchor="end" font-family="${mono}" font-size="20" fill="${slate}">${esc(spec.meta)}</text>
  ${body}
  <!-- signature block -->
  <rect x="${M}" y="${sy}" width="520" height="2" fill="${ink}"/>
  <text x="${M}" y="${sy + 36}" font-family="${sans}" font-size="20" fill="${slate}">${esc(spec.sig)}</text>
  <text x="${M}" y="${sy + 66}" font-family="${sans}" font-size="18" fill="${slate}">Hickok &amp; Kim, Inc.  ·  Los Angeles, California</text>
  ${seal}${stamp}
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;
}

const docs = {
  complaint: { head: 'HICKOK & KIM, INC.', sub: 'ATTORNEYS AT LAW', title: ['COMPLAINT FOR DAMAGES'], meta: 'Superior Court of California, County of Los Angeles', sections: ['PARTIES', 'JURISDICTION AND VENUE', 'GENERAL ALLEGATIONS', 'FIRST CAUSE OF ACTION — NEGLIGENCE', 'PRAYER FOR RELIEF'], sig: 'Attorney for Plaintiff', stamp: 'FILED', seed: 3 },
  articles: { head: 'HICKOK & KIM, INC.', sub: 'ATTORNEYS AT LAW', title: ['ARTICLES OF', 'INCORPORATION'], meta: 'State of California — Secretary of State', sections: ['ARTICLE I — NAME', 'ARTICLE II — PURPOSE', 'ARTICLE III — AGENT FOR SERVICE OF PROCESS', 'ARTICLE IV — SHARES', 'ARTICLE V — DIRECTORS'], sig: 'Incorporator', seal: 'FILED', seed: 11 },
  trademark: { head: 'CERTIFICATE OF REGISTRATION', sub: 'PRINCIPAL REGISTER', title: ['TRADEMARK'], meta: 'Registration No. ●●●●●●●', sections: ['MARK', 'OWNER', 'CLASS 034 — GOODS AND SERVICES', 'FIRST USE IN COMMERCE'], sig: 'Registered', seal: 'REGISTERED', seed: 19 },
  trust: { head: 'HICKOK & KIM, INC.', sub: 'ATTORNEYS AT LAW', title: ['REVOCABLE LIVING TRUST'], meta: 'Declaration of Trust', sections: ['ARTICLE ONE — TRUST ESTATE', 'ARTICLE TWO — TRUSTEES', 'ARTICLE THREE — BENEFICIARIES', 'ARTICLE FOUR — DISTRIBUTION', 'ARTICLE FIVE — AMENDMENT AND REVOCATION'], sig: 'Settlor and Trustee', seal: 'NOTARY', seed: 5 },
};

await mkdir('public/assets/docs', { recursive: true });
for (const [name, spec] of Object.entries(docs)) {
  const svg = Buffer.from(document(spec));
  await sharp(svg).webp({ quality: 82 }).toFile(`public/assets/docs/${name}.webp`);
  await sharp(svg).jpeg({ quality: 84, mozjpeg: true }).toFile(`public/assets/docs/${name}.jpg`);
  // small preview for the reduced-motion / no-WebGL static composition
  await sharp(svg).resize(480).webp({ quality: 80 }).toFile(`public/assets/docs/${name}-sm.webp`);
  console.log('wrote', name);
}
