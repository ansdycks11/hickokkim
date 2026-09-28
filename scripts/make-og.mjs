// Branded Open Graph image (1200x630) and apple-touch-icon (180x180).
// Charcoal ground, curved Los Angeles skyline panel on the left (the home showcase art),
// uppercase serif wordmark on the right. Run after make-art.mjs:
//   node scripts/make-og.mjs
import sharp from 'sharp';
import fs from 'node:fs';

const W = 1200, H = 630;
const brass = '#c9a86a';
const serif = "'Playfair Display', Georgia, 'Times New Roman', serif";
const sans = "Rubik, 'Segoe UI', Arial, sans-serif";

// left panel: the Los Angeles skyline art, full bleed, right edge a gentle convex curve
const art = await sharp('public/assets/art/la-skyline.webp').resize(470, H, { fit: 'cover' }).png().toBuffer();
const artB64 = art.toString('base64');

const og = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><clipPath id="curve"><ellipse cx="0" cy="${H / 2}" rx="470" ry="${H * 1.2}"/></clipPath></defs>
  <rect width="${W}" height="${H}" fill="#1c1c1c"/>
  <image href="data:image/png;base64,${artB64}" x="0" y="0" width="470" height="${H}" clip-path="url(#curve)"/>
  <text x="560" y="250" font-family="${sans}" font-size="17" letter-spacing="3" fill="#b3b3b3">LOS ANGELES · SINCE 2019</text>
  <text x="556" y="330" font-family="${serif}" font-size="64" letter-spacing="4" fill="#ffffff">HICKOK <tspan font-style="italic" fill="${brass}" letter-spacing="0">&amp;</tspan> KIM</text>
  <rect x="560" y="366" width="60" height="1.5" fill="${brass}"/>
  <text x="560" y="414" font-family="${sans}" font-size="24" fill="#d4d4d4">Attorneys for individuals and businesses</text>
  <text x="560" y="452" font-family="${sans}" font-size="20" fill="${brass}">Free initial consultation · hickokkim.com</text>
</svg>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#1c1c1c"/>
  <text x="90" y="126" text-anchor="middle" font-family="${serif}" font-style="italic" font-size="120" fill="${brass}">&amp;</text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/assets/og-default.png');
await sharp(Buffer.from(icon)).png().toFile('public/apple-touch-icon.png');
fs.writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#1c1c1c"/><text x="32" y="46" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="44" fill="${brass}">&amp;</text></svg>\n`
);
console.log('wrote og-default.png, apple-touch-icon.png, favicon.svg');
