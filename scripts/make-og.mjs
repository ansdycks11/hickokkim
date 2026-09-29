// Share image (1200x630), apple-touch-icon (180x180), and favicons (96x96, 32x32).
// scripts/brand/sheet.html lays all four out on one page in the site's own web fonts
// (EB Garamond wordmark, Rubik text) over the Los Angeles photograph; headless Chrome
// screenshots it and sharp cuts out each image. Needs Chrome or Edge (set CHROME_PATH if
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
await cut(0, 650, 180, 180, 'public/apple-touch-icon.png');
await cut(200, 650, 96, 96, 'public/favicon-96.png');
await cut(316, 650, 32, 32, 'public/favicon-32.png');
fs.rmSync(shot);
console.log('wrote og-default.png, apple-touch-icon.png, favicon-96.png, favicon-32.png');
