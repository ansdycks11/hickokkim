// Generates the branded Open Graph image (1200x630) and the apple-touch-icon (180x180)
// from inline SVG: ink background, brass scales mark, firm name.
// Run: node scripts/make-og.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const brass = '#C9A86A';
const ink = '#0E131B';
const serif = "'Libre Caslon Text', Georgia, 'Times New Roman', serif";

const scales = (x, y, s) => `
<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${brass}" stroke-width="1.6" stroke-linecap="round">
  <path d="M70 178h60M100 178v-12M88 166h24M100 166V40"/>
  <circle cx="100" cy="36" r="4"/>
  <path d="M28 46h144"/>
  <path d="M28 46l-14 62M28 46l14 62M8 108q20 14 40 0"/>
  <path d="M172 46l-14 62M172 46l14 62M152 108q20 14 40 0"/>
</g>`;

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="78%" cy="45%" r="60%">
      <stop offset="0" stop-color="#1B2330"/>
      <stop offset="1" stop-color="${ink}"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="${brass}" stroke-opacity=".35" stroke-width="2"/>
  ${scales(780, 120, 1.9)}
  <text x="96" y="286" font-family="${serif}" font-size="92" fill="#FFFFFF">Hickok <tspan fill="${brass}" font-style="italic">&amp;</tspan> Kim</text>
  <text x="96" y="346" font-family="${serif}" font-size="34" fill="#FFFFFF" fill-opacity=".6">Inc.</text>
  <text x="96" y="430" font-family="Inter, Arial, sans-serif" font-size="26" fill="#FFFFFF" fill-opacity=".8">Los Angeles attorneys for individuals and businesses</text>
  <text x="96" y="474" font-family="Inter, Arial, sans-serif" font-size="22" fill="${brass}">Free initial consultation · hickokkim.com</text>
  <text x="96" y="560" font-family="'IBM Plex Mono', Consolas, monospace" font-size="16" letter-spacing="3" fill="#FFFFFF" fill-opacity=".45">EST. 2019 · CALIFORNIA · ENGLISH · 한국어</text>
</svg>`;

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${ink}"/>
  <g fill="none" stroke="${brass}" stroke-width="2.4" stroke-linecap="round">
    <path d="M32 14v40M22 54h20"/><path d="M12 20h40"/>
    <path d="M12 20l-6 18M12 20l6 18M4 38q8 6 16 0"/><path d="M52 20l-6 18M52 20l6 18M44 38q8 6 16 0"/>
  </g>
  <circle cx="32" cy="14" r="2.4" fill="${brass}"/>
</svg>`;

await mkdir('public/assets', { recursive: true });
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/assets/og-default.png');
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('wrote public/assets/og-default.png and public/apple-touch-icon.png');
