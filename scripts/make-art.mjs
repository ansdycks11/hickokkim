// Generates the site's abstract artwork from code (no stock photography, no
// borrowed imagery). Each image is an SVG composition rendered to WebP.
//   node scripts/make-art.mjs
// Outputs to public/assets/art/.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

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

/* 5. Los Angeles at dusk — downtown skyline with the Wilshire Grand spire and the
      U.S. Bank Tower crown, the San Gabriel Mountains behind, palms in front. */
function laSkyline(W, H) {
  const r = rng(90);
  const base = H * 0.8; // street level
  // distant mountains, two hazy layers
  const ridge = (y0, amp, seed, fill, op) => {
    const rr = rng(seed);
    let d = `M0,${H} L0,${f(y0)}`;
    for (let x = 0; x <= W; x += 40) d += ` L${x},${f(y0 - Math.abs(Math.sin(x * 0.004 + rr() * 0.6)) * amp - rr() * amp * 0.25)}`;
    return `<path d="${d} L${W},${H} Z" fill="${fill}" opacity="${op}"/>`;
  };
  // generic towers, tallest toward the centre
  let towers = '', windows = '';
  const addTower = (x, w, top, fill = '#141a2b') => {
    towers += `<rect x="${f(x)}" y="${f(top)}" width="${f(w)}" height="${f(base - top + 2)}" fill="${fill}"/>`;
    for (let y = top + 14; y < base - 10; y += 16) for (let wx = x + 6; wx < x + w - 8; wx += 12)
      if (r() < 0.16) windows += `<rect x="${f(wx)}" y="${f(y)}" width="5" height="7" fill="${r() < 0.7 ? '#f5c77e' : '#fde4b4'}" opacity="${f(0.55 + r() * 0.45)}"/>`;
  };
  const layout = [
    [40, 70, 0.60], [100, 55, 0.66], [150, 90, 0.55], [300, 80, 0.58], [372, 62, 0.64],
    [690, 84, 0.57], [770, 66, 0.63], [830, 96, 0.53], [920, 70, 0.61], [985, 88, 0.56], [1070, 72, 0.64], [1135, 80, 0.6],
  ];
  // a hazier back row first, for depth
  const back = [[210, 70, 0.5], [620, 60, 0.47], [880, 64, 0.5], [1010, 58, 0.54], [0, 60, 0.56]];
  for (const [x, w, t] of back) towers += `<rect x="${x}" y="${f(H * t)}" width="${w}" height="${f(base - H * t)}" fill="#2a2f4a" opacity=".85"/>`;
  for (const [x, w, t] of layout) addTower(x, w, H * t);
  // Wilshire Grand: slender tower with a sloped sail crown and a spire
  const wgX = 560, wgW = 108, wgTop = H * 0.33;
  towers += `<polygon points="${wgX},${f(base)} ${wgX},${f(wgTop + 40)} ${wgX + wgW},${f(wgTop)} ${wgX + wgW},${f(base)}" fill="#10162a"/>`;
  towers += `<rect x="${wgX + wgW - 8}" y="${f(wgTop - 90)}" width="4" height="92" fill="#10162a"/>`;
  towers += `<rect x="${wgX + wgW - 7}" y="${f(wgTop - 92)}" width="2" height="6" fill="#ff7a5a"/>`;
  for (let y = wgTop + 60; y < base - 10; y += 16) for (let wx = wgX + 8; wx < wgX + wgW - 8; wx += 12)
    if (r() < 0.2) windows += `<rect x="${wx}" y="${f(y)}" width="5" height="7" fill="#f5c77e" opacity="${f(0.6 + r() * 0.4)}"/>`;
  // U.S. Bank Tower: rounded shaft stepping up to a glowing crown
  const ubX = 430, ubW = 116, ubTop = H * 0.37;
  towers += `<rect x="${ubX}" y="${f(ubTop + 36)}" width="${ubW}" height="${f(base - ubTop)}" rx="18" fill="#12182b"/>`;
  towers += `<rect x="${ubX + 12}" y="${f(ubTop + 14)}" width="${ubW - 24}" height="30" rx="10" fill="#12182b"/>`;
  towers += `<rect x="${ubX + 26}" y="${f(ubTop)}" width="${ubW - 52}" height="20" rx="8" fill="#12182b"/>`;
  towers += `<rect x="${ubX + 26}" y="${f(ubTop + 2)}" width="${ubW - 52}" height="5" rx="2" fill="#ffd28a" opacity=".85"/>`;
  for (let y = ubTop + 60; y < base - 10; y += 16) for (let wx = ubX + 10; wx < ubX + ubW - 10; wx += 12)
    if (r() < 0.2) windows += `<rect x="${wx}" y="${f(y)}" width="5" height="7" fill="#fde4b4" opacity="${f(0.6 + r() * 0.4)}"/>`;
  // palms in the foreground: tapered curved trunks, full crowns of drooping leaf-shaped fronds
  const palm = (x, top, lean, scale = 1) => {
    const cx = x + lean * 0.5, tx = x + lean;
    const ink = '#090c16';
    // trunk as a filled taper: wider at the ground than at the crown
    let g = `<path d="M${x - 7},${H + 10} Q${f(cx - 5)},${f((H + top) / 2)} ${f(tx - 3)},${f(top + 8)} L${f(tx + 3)},${f(top + 8)} Q${f(cx + 5)},${f((H + top) / 2)} ${x + 7},${H + 10} Z" fill="${ink}"/>`;
    // Fan-palm crown: fronds spray outward and upward in a half-circle, arching
    // so each tip dips below its midpoint; a few lower ones hang as a short skirt.
    const angles = [];
    for (let k = 0; k <= 12; k++) angles.push(Math.PI + 0.12 + (k / 12) * (Math.PI - 0.24)); // upper fan
    angles.push(Math.PI * 0.86, Math.PI * 0.14, Math.PI * 0.72, Math.PI * 0.28);            // drooping skirt
    for (const a of angles) {
      const L = (62 + r() * 26) * scale;
      const dx = Math.cos(a), dy = Math.sin(a);
      const ctrlX = tx + dx * L * 0.55, ctrlY = top + dy * L * 0.55 - L * 0.12;
      const tipX = tx + dx * L, tipY = top + dy * L + L * 0.38;
      const w = 5.5 * scale;
      // leaf with a little width at its middle, tapering to both ends
      const nx = -dy * w, ny = dx * w;
      g += `<path d="M${f(tx)},${f(top)} Q${f(ctrlX + nx)},${f(ctrlY + ny)} ${f(tipX)},${f(tipY)} Q${f(ctrlX - nx)},${f(ctrlY - ny)} ${f(tx)},${f(top)} Z" fill="${ink}"/>`;
    }
    g += `<circle cx="${f(tx)}" cy="${f(top + 4)}" r="${f(7 * scale)}" fill="${ink}"/>`;
    return g;
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#141b35"/><stop offset=".3" stop-color="#3b3160"/>
      <stop offset=".5" stop-color="#8a4f6a"/><stop offset=".64" stop-color="#e0875a"/><stop offset=".74" stop-color="#f5c07a"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.62" cy="0.73" r="0.45"><stop offset="0" stop-color="#ffd89a" stop-opacity=".7"/><stop offset="1" stop-color="#ffd89a" stop-opacity="0"/></radialGradient>
    <linearGradient id="street" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1f33"/><stop offset="1" stop-color="#090b14"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <rect width="${W}" height="${H}" fill="url(#sun)"/>
  ${ridge(H * 0.62, 110, 3, '#5b4468', 0.55)}
  ${ridge(H * 0.67, 70, 8, '#3d2f4e', 0.7)}
  ${towers}${windows}
  <rect x="0" y="${f(base)}" width="${W}" height="${f(H - base)}" fill="url(#street)"/>
  <rect x="0" y="${f(base)}" width="${W}" height="3" fill="#f5c07a" opacity=".35"/>
  ${Array.from({ length: 40 }, (_, i) => `<circle cx="${f(i * 31 + 8)}" cy="${f(base + 10 + (i % 3) * 3)}" r="1.8" fill="${i % 4 ? '#ffd9a0' : '#ff8a6a'}" opacity=".8"/>`).join('')}
  ${palm(150, H * 0.3, 40, 1.1)}${palm(265, H * 0.44, -25, 0.85)}${palm(985, H * 0.26, -45, 1.15)}${palm(1095, H * 0.42, 20, 0.9)}
</svg>`;
}

await render('la-skyline', laSkyline(1200, 1500), { w: 900, h: 1125, q: 76 });
await render('louvers', louvers(1200, 1500), { w: 900, h: 1125, q: 72 });
await render('facade', facade(1200, 1500), { w: 900, h: 1125, q: 72 });
await render('contours-warm', contours(1200, 1500, { bg: '#2c2926', stroke: '#d4b47a', seed: 5, lines: 80, opacity: [0.4, 0.95], width: 1.7 }), { w: 900, h: 1125, q: 72 });
await render('menu-contours', contours(2000, 1300, { bg: '#f1f1f1', stroke: '#c9c9c9', seed: 9, lines: 90, opacity: [0.35, 0.8] }), { w: 2000, h: 1300, q: 70 });
await render('hero-texture', heroTexture(2400, 800), { w: 2400, h: 800, q: 70 });
