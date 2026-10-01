// Generates the site's two line textures from code and ships them as SVG: the menu
// overlay's contour lines and the inner-page hero's fanned lines. Faint hairlines and
// soft gradients band and blur under WebP/JPEG compression; as vectors they stay sharp
// on every screen and weigh a few KB once compressed.
//   node scripts/make-art.mjs
// Outputs to public/assets/art/.
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


/* 1. Contours — topographic lines displaced by hidden hills, used pale behind
      the menu overlay (cool grey on the site's off-white). Written as SVG: each line is
      a compact relative path, and non-scaling strokes keep every line a crisp hairline
      at any screen size. */
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
    const pts = [];
    for (let x = -20; x <= W + 20; x += 16) {
      let y = base;
      for (const h of hills) {
        const dx = x - h.cx, dy = base - h.cy;
        y += h.a * Math.exp(-(dx * dx + dy * dy) / (2 * h.s * h.s));
      }
      for (const w of ripple) y += Math.sin(x * w.k + w.p + i * 0.21) * w.a;
      pts.push([x, y]);
    }
    // First point absolute, then relative steps to one decimal: about a third of the size.
    let d = `M${f(pts[0][0])},${f(pts[0][1])}l`;
    for (let k = 1; k < pts.length; k++) d += `${k > 1 ? ' ' : ''}${f(pts[k][0] - pts[k - 1][0])},${f(pts[k][1] - pts[k - 1][1])}`;
    const o = opacity[0] + r() * (opacity[1] - opacity[0]);
    paths += `<path d="${d}" opacity="${o.toFixed(3)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><rect width="${W}" height="${H}" fill="${bg}"/><g fill="none" stroke="${stroke}" stroke-width="${width}" vector-effect="non-scaling-stroke">${paths.replaceAll('<path ', '<path vector-effect="non-scaling-stroke" ')}</g></svg>`;
}

/* 2. Hero texture — about a dozen faint contour lines (the menu's motif, much sparser)
      that fade in from the right, so each inner-page title sits on clean white. */
function heroTexture(W, H, { lines = 14, seed = 4, opacity = [0.2, 0.36], stroke = '#9fb0c4', fade = [0.3, 0.75] } = {}) {
  const r = rng(seed);
  // a few hills on the right half bend the lines; two slow ripples keep them organic
  const hills = Array.from({ length: 5 }, () => ({ cx: W * (0.45 + r() * 0.6), cy: r() * H, s: (0.15 + r() * 0.2) * H * 1.6, a: (r() < 0.5 ? -1 : 1) * (40 + r() * 90) }));
  const ripple = Array.from({ length: 2 }, () => ({ k: 0.002 + r() * 0.004, p: r() * 6.28, a: 6 + r() * 10 }));
  let paths = '';
  for (let i = 0; i < lines; i++) {
    const base = (i / (lines - 1)) * H * 1.1;
    const pts = [];
    for (let x = -20; x <= W + 20; x += 20) {
      let y = base;
      for (const h of hills) { const dx = x - h.cx, dy = base - h.cy; y += h.a * Math.exp(-(dx * dx + dy * dy) / (2 * h.s * h.s)); }
      for (const w of ripple) y += Math.sin(x * w.k + w.p + i * 0.35) * w.a;
      pts.push([x, y]);
    }
    let d = `M${f(pts[0][0])},${f(pts[0][1])}l`;
    for (let k = 1; k < pts.length; k++) d += `${k > 1 ? ' ' : ''}${f(pts[k][0] - pts[k - 1][0])},${f(pts[k][1] - pts[k - 1][1])}`;
    const o = opacity[0] + r() * (opacity[1] - opacity[0]);
    paths += `<path vector-effect="non-scaling-stroke" d="${d}" opacity="${o.toFixed(3)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="${fade[0]}" stop-color="#fff" stop-opacity="0"/><stop offset="${fade[1]}" stop-color="#fff" stop-opacity="1"/></linearGradient><mask id="m"><rect width="${W}" height="${H}" fill="url(#g)"/></mask></defs><rect width="${W}" height="${H}" fill="#ffffff"/><g fill="none" stroke="${stroke}" stroke-width="1" mask="url(#m)">${paths}</g></svg>`;
}

await writeFile(`${OUT}/menu-contours.svg`, contours(2000, 1300, { bg: '#f8f9fb', stroke: '#9fb0c4', seed: 9, lines: 90, opacity: [0.12, 0.3], width: 1 }) + '\n');
console.log('wrote menu-contours.svg');
await writeFile(`${OUT}/hero-texture.svg`, heroTexture(2400, 800) + '\n');
console.log('wrote hero-texture.svg');
