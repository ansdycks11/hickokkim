// Generates the site's abstract artwork from code (no stock photography, no
// borrowed imagery). Each image is an SVG composition rendered to WebP, except the
// inner-page hero texture, which ships as the SVG itself: its faint lines and soft
// gradient band and blur badly under WebP compression, and as a vector they stay
// sharp on every screen for a few KB.
//   node scripts/make-art.mjs
// Outputs to public/assets/art/.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const OUT = 'public/assets/art';
await mkdir(OUT, { recursive: true });

function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const f = (n) => n.toFixed(1);

async function render(name, svg, { w, h, q = 80 }) {
  await sharp(Buffer.from(svg)).resize(w, h).webp({ quality: q }).toFile(`${OUT}/${name}.webp`);
  console.log('wrote', name);
}

/* 1. Contours — topographic lines displaced by hidden hills, used pale behind
      the menu overlay (cool grey on the site's off-white). */
function contours(W, H, { bg, stroke, lines = 70, seed = 5, opacity = [0.25, 0.7], width = 1.2 }) {
  const r = rng(seed);
  // a handful of hills and hollows; each line bends around them
  const hills = Array.from({ length: 7 }, () => ({
    cx: r() * W, cy: r() * H, s: (0.12 + r() * 0.2) * Math.min(W, H), a: (r() < 0.5 ? -1 : 1) * (60 + r() * 140),
  }));
  const ripple = Array.from({ length: 3 }, () => ({ k: 0.004 + r() * 0.008, p: r() * 6.28, a: 3 + r() * 7 }));
  let paths = '';
  for (let i = 0; i < lines; i++) {
    const base = (i / (lines - 1)) * H * 1.2 - H * 0.1;
    let d = '';
    for (let x = -20; x <= W + 20; x += 10) {
      let y = base;
      for (const h of hills) {
        const dx = x - h.cx, dy = base - h.cy;
        y += h.a * Math.exp(-(dx * dx + dy * dy) / (2 * h.s * h.s));
      }
      for (const w of ripple) y += Math.sin(x * w.k + w.p + i * 0.21) * w.a;
      d += (x === -20 ? 'M' : 'L') + f(x) + ',' + f(y);
    }
    const o = opacity[0] + r() * (opacity[1] - opacity[0]);
    paths += `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}" opacity="${f(o)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${bg}"/>${paths}</svg>`;
}

/* 2. Hero texture — faint fanned lines on white fading to a cool off-white, behind
      every inner-page title. */
function heroTexture(W, H) {
  const r = rng(11);
  let lines = '';
  for (let i = 0; i < 90; i++) {
    const a = -0.9 + (i / 90) * 1.5;
    const x2 = W * 0.25 + Math.cos(a) * W * 1.4, y2 = H * 1.1 + Math.sin(a) * W * 1.4;
    lines += `<line x1="${f(W * 0.25)}" y1="${f(H * 1.1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#0b1f33" stroke-width="${f(0.6 + r() * 1.6)}" opacity="${(0.03 + r() * 0.06).toFixed(3)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><radialGradient id="v" cx="0.65" cy="0.2" r="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef2f7"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#v)"/>${lines}</svg>`;
}

await render('menu-contours', contours(2000, 1300, { bg: '#f5f7fa', stroke: '#c9d2dd', seed: 9, lines: 90, opacity: [0.35, 0.8] }), { w: 2000, h: 1300, q: 70 });
await writeFile(`${OUT}/hero-texture.svg`, heroTexture(2400, 800) + '\n');
console.log('wrote hero-texture.svg');
