// Share image (1200x630), apple-touch-icon (180x180), and favicons (96x96, 32x32).
// The share image is drawn in scripts/brand/sheet.html in the site's own web fonts
// (EB Garamond wordmark, Rubik text) over the Los Angeles photograph; headless Chrome
// screenshots it and sharp cuts it out. The icons come from the firm's HK monogram,
// scripts/brand/hk-monogram.png. Needs Chrome or Edge (set CHROME_PATH if
// it is installed somewhere else) and an internet connection for Google Fonts.
//   node scripts/make-og.mjs
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const chrome = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && fs.existsSync(p));
if (!chrome) throw new Error('Chrome or Edge not found. Set CHROME_PATH to its executable.');

const shot = path.join(os.tmpdir(), `hk-brand-${process.pid}.png`);
execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--disable-lcd-text', // greyscale antialiasing; subpixel text leaves colour fringes in images
  '--window-size=1200,860',
  '--virtual-time-budget=10000', // wait for Google Fonts and the photo before the screenshot
  `--screenshot=${shot}`,
  pathToFileURL(path.resolve('scripts/brand/sheet.html')).href,
], { stdio: 'ignore' });

const sheet = fs.readFileSync(shot);
const cut = (left, top, width, height, out) =>
  sharp(sheet).extract({ left, top, width, height }).png({ compressionLevel: 9 }).toFile(out);

await cut(0, 0, 1200, 630, 'public/assets/og-default.png');
fs.rmSync(shot);

// Icons: make the white surround of the monogram transparent by flood-filling near-white
// pixels inward from the edges (the white letters and ring inside the seal are untouched),
// then trim to the seal.
const { data, info } = await sharp('scripts/brand/hk-monogram.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
// Background = near-white or nearly transparent (the source has faint stray pixels in its margin).
const light = (i) => data[i * 4 + 3] < 128 || (data[i * 4] > 200 && data[i * 4 + 1] > 200 && data[i * 4 + 2] > 200);
const seen = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
while (stack.length) {
  const i = stack.pop();
  if (seen[i] || !light(i)) continue;
  seen[i] = 1;
  data[i * 4 + 3] = 0;
  const x = i % W, y = (i / W) | 0;
  if (x > 0) stack.push(i - 1);
  if (x < W - 1) stack.push(i + 1);
  if (y > 0) stack.push(i - W);
  if (y < H - 1) stack.push(i + W);
}
// Soften the seal's outer edge: pixels next to the cleared area become partly transparent.
for (let i = 0; i < W * H; i++) {
  if (seen[i]) continue;
  const x = i % W, y = (i / W) | 0;
  const nearClear = (x > 0 && seen[i - 1]) || (x < W - 1 && seen[i + 1]) || (y > 0 && seen[i - W]) || (y < H - 1 && seen[i + W]);
  if (nearClear) data[i * 4 + 3] = 140;
}
const seal = await sharp(data, { raw: info }).trim().png().toBuffer();
const square = async (size, pad, background) =>
  sharp(seal)
    .resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background })
    .flatten(background.alpha === 0 ? false : { background })
    .png({ compressionLevel: 9 });
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
await (await square(32, 0, clear)).toFile('public/favicon-32.png');
await (await square(96, 2, clear)).toFile('public/favicon-96.png');
// iOS fills transparency with black, so the home-screen icon sits on white.
await (await square(180, 18, { r: 255, g: 255, b: 255, alpha: 1 })).toFile('public/apple-touch-icon.png');
console.log('wrote og-default.png, apple-touch-icon.png, favicon-96.png, favicon-32.png');
