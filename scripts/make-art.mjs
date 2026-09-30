// Generates the site's abstract artwork from code (no stock photography, no
// borrowed imagery). Each image is an SVG composition rendered to WebP, except the
// inner-page hero texture, which ships as the SVG itself: its faint lines and dark
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

/* 1. Louvers — an overhead canopy of slats in one-point perspective
      ("When something goes wrong"). Near edge at left, converging to a
      vanishing point off the right edge, like looking up under a pavilion. */
function louvers(W, H) {
  const vp = { x: W * 1.35, y: H * 0.3 }; // vanishing point
  const n = 30;
  let slats = '';
  for (let i = 0; i < n; i++) {
    const p = i / (n - 1);
    // near-edge positions spread wider toward the bottom (closer to the eye)
    const yNear = -H * 0.25 + Math.pow(p, 1.35) * H * 1.55;
    const tNear = 14 + Math.pow(p, 1.5) * 95; // slat depth grows toward the viewer
    const toVp = (x, y, k) => ({ x: x + (vp.x - x) * k, y: y + (vp.y - y) * k });
    const k = 0.78; // how far each slat runs toward the vanishing point
    const a = { x: -20, y: yNear }, b = toVp(-20, yNear, k);
    const c = toVp(-20, yNear + tNear, k), d = { x: -20, y: yNear + tNear };
    const e = toVp(-20, yNear + tNear * 1.8, k), g = { x: -20, y: yNear + tNear * 1.8 };
    // lit underside
    slats += `<polygon points="${f(a.x)},${f(a.y)} ${f(b.x)},${f(b.y)} ${f(c.x)},${f(c.y)} ${f(d.x)},${f(d.y)}" fill="url(#lit)"/>`;
    // shadowed edge
    slats += `<polygon points="${f(d.x)},${f(d.y)} ${f(c.x)},${f(c.y)} ${f(e.x)},${f(e.y)} ${f(g.x)},${f(g.y)}" fill="url(#edge)"/>`;
  }
  // two structural beams crossing the canopy
  const beam = (x) => `<polygon points="${f(x)},${f(-40)} ${f(x + 26)},${f(-40)} ${f(x + 10 + (vp.x - x) * 0.05)},${H + 40} ${f(x - 16 + (vp.x - x) * 0.05)},${H + 40}" fill="#46638a" opacity=".55"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef3f8"/><stop offset=".55" stop-color="#9fb6d1"/><stop offset="1" stop-color="#4c6c95"/></linearGradient>
    <linearGradient id="lit" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#e3ebf4"/><stop offset="1" stop-color="#b9cbe0"/></linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5d7ba3"/><stop offset="1" stop-color="#8aa3c3"/></linearGradient>
    <radialGradient id="glow" cx="0.95" cy="0.28" r="0.75"><stop offset="0" stop-color="#ffffff" stop-opacity=".75"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset=".6" stop-color="#1c2a3d" stop-opacity="0"/><stop offset="1" stop-color="#1c2a3d" stop-opacity=".35"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  ${beam(W * 0.62)}${beam(W * 0.2)}
  ${slats}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
</svg>`;
}

/* 2. Facade — a glass tower at dusk seen from below, lit offices scattered
      across it ("When you're building something"). The face is a quad in
      perspective: tall near edge on the left, converging upward and right. */
function facade(W, H) {
  const r = rng(23);
  const cols = 14, rows = 30;
  // building face corners (tl, tr, br, bl) in image space
  const q = { tl: { x: -60, y: -80 }, tr: { x: W * 0.98, y: H * 0.05 }, br: { x: W * 1.08, y: H * 1.1 }, bl: { x: -140, y: H * 1.12 } };
  const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  // non-uniform u so columns compress toward the far (right) edge
  const U = (u) => 1 - Math.pow(1 - u, 1.35);
  const P = (u, v) => lerp(lerp(q.tl, q.tr, U(u)), lerp(q.bl, q.br, U(u)), v);
  let cells = '';
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const u0 = (i + 0.08) / cols, u1 = (i + 0.92) / cols, v0 = (j + 0.1) / rows, v1 = (j + 0.9) / rows;
      const a = P(u0, v0), b = P(u1, v0), c = P(u1, v1), d = P(u0, v1);
      const lit = r() < 0.3;
      const fill = lit ? ['#f6cf8a', '#f0b862', '#fde6ba', '#e9a955'][Math.floor(r() * 4)] : ['#1b2a3f', '#22344c', '#18263a', '#2a3d57'][Math.floor(r() * 4)];
      cells += `<polygon points="${f(a.x)},${f(a.y)} ${f(b.x)},${f(b.y)} ${f(c.x)},${f(c.y)} ${f(d.x)},${f(d.y)}" fill="${fill}" opacity="${lit ? f(0.7 + r() * 0.3) : '1'}"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="dusk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d1624"/><stop offset="1" stop-color="#1a2b44"/></linearGradient>
    <radialGradient id="bloom" cx="0.35" cy="0.55" r="0.85"><stop offset="0" stop-color="#f2bd6b" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset=".55" stop-color="#9fb6d1" stop-opacity=".12"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0a1019"/>
  <polygon points="${q.tl.x},${q.tl.y} ${q.tr.x},${q.tr.y} ${q.br.x},${q.br.y} ${q.bl.x},${q.bl.y}" fill="url(#dusk)"/>
  ${cells}
  <rect width="${W}" height="${H}" fill="url(#sheen)"/>
  <rect width="${W}" height="${H}" fill="url(#bloom)"/>
</svg>`;
}

/* 3. Contours — topographic lines displaced by hidden hills, used warm on
      charcoal ("When you're planning ahead") and pale on the menu overlay. */
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

/* 4. Hero texture — faint fanned folds on charcoal, behind every inner-page title. */
function heroTexture(W, H) {
  const r = rng(11);
  let lines = '';
  for (let i = 0; i < 90; i++) {
    const a = -0.9 + (i / 90) * 1.5;
    const x2 = W * 0.25 + Math.cos(a) * W * 1.4, y2 = H * 1.1 + Math.sin(a) * W * 1.4;
    lines += `<line x1="${f(W * 0.25)}" y1="${f(H * 1.1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#ffffff" stroke-width="${f(0.6 + r() * 1.6)}" opacity="${f(0.02 + r() * 0.05)}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><radialGradient id="v" cx="0.65" cy="0.2" r="1"><stop offset="0" stop-color="#2e2e2e"/><stop offset="1" stop-color="#161616"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#v)"/>${lines}</svg>`;
}

await render('louvers', louvers(1200, 1500), { w: 900, h: 1125, q: 72 });
await render('facade', facade(1200, 1500), { w: 900, h: 1125, q: 72 });
await render('contours-warm', contours(1200, 1500, { bg: '#2c2926', stroke: '#d4b47a', seed: 5, lines: 80, opacity: [0.4, 0.95], width: 1.7 }), { w: 900, h: 1125, q: 72 });
await render('menu-contours', contours(2000, 1300, { bg: '#f1f1f1', stroke: '#c9c9c9', seed: 9, lines: 90, opacity: [0.35, 0.8] }), { w: 2000, h: 1300, q: 70 });
await writeFile(`${OUT}/hero-texture.svg`, heroTexture(2400, 800) + '\n');
console.log('wrote hero-texture.svg');
