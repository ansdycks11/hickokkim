// Site-wide integrity check over dist/ (run after `npm run build`).
// Verifies internal links resolve, every page meets the spec's per-page
// requirements (docs/website-architecture.md §5, §8.7, §9), and referenced
// assets exist. Exit code 1 on any failure.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

const pages = walk(dist).map((p) => ({
  file: p,
  url: '/' + path.relative(dist, p).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/404\.html$/, '404.html'),
  html: fs.readFileSync(p, 'utf8'),
}));

const decode = (s) =>
  s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (h) =>
  decode(h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' '));

const exists = (url) => {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean.startsWith('/')) return true;
  const candidates = [
    path.join(dist, clean),
    path.join(dist, clean, 'index.html'),
    path.join(dist, clean.replace(/\/$/, '') + '.html'),
  ];
  return candidates.some((c) => fs.existsSync(c) && fs.statSync(c).isFile());
};

let failures = 0;
const fail = (url, msg) => { failures++; console.log(`  FAIL ${url}  ${msg}`); };
const warn = (url, msg) => console.log(`  warn ${url}  ${msg}`);

console.log(`Checking ${pages.length} pages\n`);
const seenLinks = new Set();

for (const p of pages) {
  const { url, html } = p;
  const is404 = url.endsWith('404.html');
  const isHome = url === '/';
  const body = text(html);

  // --- head ---
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (!title) fail(url, 'no <title>');
  if (title.length > 60 && !isHome) warn(url, `title ${title.length} chars (>60)`);
  if (!desc) fail(url, 'no meta description');
  if (desc.length > 155 && !isHome) fail(url, `description ${desc.length} chars (>155)`);
  if (!/<link rel="canonical" href="https:\/\/hickokkim\.com\//.test(html)) fail(url, 'missing/incorrect canonical');
  if (!/<meta property="og:image" content="https:\/\/hickokkim\.com\/assets\//.test(html)) fail(url, 'missing og:image');

  // --- structured data ---
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (ldBlocks.length !== 1) fail(url, `${ldBlocks.length} JSON-LD blocks (expected 1 @graph)`);
  let graph = [];
  try {
    graph = JSON.parse(ldBlocks[0][1])['@graph'];
  } catch (e) {
    fail(url, 'JSON-LD does not parse: ' + e.message);
  }
  const types = graph.map((n) => n['@type']);
  for (const t of ['LegalService', 'WebSite', 'WebPage']) if (!types.includes(t)) fail(url, `schema missing ${t}`);
  if (!isHome && !is404 && !types.includes('BreadcrumbList')) fail(url, 'schema missing BreadcrumbList');
  const faq = graph.find((n) => n['@type'] === 'FAQPage');
  if (faq) {
    for (const q of faq.mainEntity) {
      if (!body.includes(decode(q.name).trim())) fail(url, `FAQ question not visible: "${q.name.slice(0, 50)}"`);
      if (!body.replace(/\s+/g, ' ').includes(decode(q.acceptedAnswer.text).trim().replace(/\s+/g, ' ')))
        fail(url, `FAQ answer not visible verbatim: "${q.name.slice(0, 50)}"`);
    }
  }

  // --- headings ---
  const hs = [...html.matchAll(/<h([1-6])[ >]/g)].map((m) => +m[1]);
  const h1s = hs.filter((l) => l === 1).length;
  if (h1s !== 1) fail(url, `${h1s} <h1> elements`);
  for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) fail(url, `heading skip h${hs[i - 1]} → h${hs[i]}`);

  // --- global components (§5) ---
  if (!/Attorney advertising\. Prior results do not guarantee a similar outcome\./.test(body)) fail(url, 'footer disclaimer missing');
  if (!/2202 S\. Figueroa St\., #201/.test(body)) fail(url, 'NAP street missing');
  if (!/\(213\) 373-7188/.test(body)) fail(url, 'NAP phone missing');
  if (!/info@hickokkim\.com/.test(body)) fail(url, 'NAP email missing');
  if (!/<a class="skip" href="#main">/.test(html)) fail(url, 'skip link missing');
  if (!/<main id="main"/.test(html)) fail(url, 'main#main missing');
  if (!isHome && !is404 && !/<nav class="crumbs"/.test(html)) fail(url, 'visible breadcrumbs missing');
  const hasSticky = /id="stickyCta"/.test(html);
  if (url.startsWith('/contact/') && hasSticky) fail(url, 'sticky CTA should be hidden on contact pages');
  if (!url.startsWith('/contact/') && !hasSticky) fail(url, 'sticky CTA missing');
  if (!/data-domain="hickokkim\.com"/.test(html)) fail(url, 'Plausible script missing');

  // --- page-specific (§6) ---
  if (url === '/contact/' || url === '/disclaimer/') {
    if (!/attorney-client relationship/i.test(body)) fail(url, 'no-attorney-client-relationship notice missing');
  }
  if (url.startsWith('/practice-areas/') && url !== '/practice-areas/' || url === '/outside-general-counsel/') {
    if (!/Last reviewed/.test(body)) fail(url, '"Last reviewed" missing');
    if (!types.includes('Service')) fail(url, 'Service schema missing');
    if (!faq) fail(url, 'FAQPage schema missing');
  }
  if (url === '/contact/' && !/data-netlify="true"/.test(html)) fail(url, 'Netlify form attribute missing');
  if (url === '/contact/' && !/netlify-honeypot/.test(html)) fail(url, 'honeypot missing');

  // --- links & assets ---
  const hrefs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const h of hrefs) {
    if (h.startsWith('/') && !h.startsWith('//')) {
      if (!exists(h)) fail(url, `broken internal link/asset: ${h}`);
      else seenLinks.add(h.split('#')[0]);
    }
  }
  for (const h of hrefs.filter((x) => x.startsWith('http') && !x.includes('hickokkim.com')))
    if (!/^https:\/\//.test(h)) fail(url, `insecure external link: ${h}`);
  // any bare "click here" anchor text?
  if (/>\s*click here\s*</i.test(html)) fail(url, '"click here" anchor text');
}

// --- root files ---
for (const f of ['robots.txt', 'llms.txt', 'sitemap-index.xml', 'sitemap-0.xml', 'favicon.svg', 'apple-touch-icon.png', 'assets/og-default.png'])
  if (!fs.existsSync(path.join(dist, f))) fail('/', `missing ${f}`);
const sitemap = fs.readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8');
const inSitemap = [...sitemap.matchAll(/<loc>https:\/\/hickokkim\.com([^<]*)<\/loc>/g)].map((m) => m[1]);
for (const p of pages) {
  if (p.url.endsWith('404.html') || p.url === '/contact/thanks/') continue;
  if (!inSitemap.includes(p.url)) fail(p.url, 'not in sitemap');
}
for (const u of inSitemap) if (!exists(u)) fail('/sitemap-0.xml', `sitemap points at missing page ${u}`);
const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Bingbot', 'CCBot'])
  if (!robots.includes(bot)) fail('/robots.txt', `does not mention ${bot}`);

// --- orphan pages: anything not linked from somewhere ---
for (const p of pages) {
  if (p.url.endsWith('404.html') || p.url === '/' || p.url === '/contact/thanks/') continue;
  if (!seenLinks.has(p.url)) warn(p.url, 'no inbound internal link');
}

// --- placeholders ---
const todo = pages.filter((p) => /TODO:REAL-DATA|class="placeholder"|class="sample"/.test(p.html)).map((p) => p.url);
console.log(`\nPages with visible placeholders or TODO markers (${todo.length}):\n  ${todo.join('\n  ')}`);

console.log(failures ? `\n${failures} failure(s).` : '\nAll pages pass.');
process.exit(failures ? 1 : 0);
