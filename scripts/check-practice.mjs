// Acceptance check for the nine practice-area pages (docs/website-architecture.md §6.2, §11 Phase 3, §12.1).
import fs from 'node:fs';

const root = process.cwd();
const pages = [
  ['personal-injury', 'dist/practice-areas/personal-injury/index.html'],
  ['civil-litigation', 'dist/practice-areas/civil-litigation/index.html'],
  ['business-law', 'dist/practice-areas/business-law/index.html'],
  ['corporate-law', 'dist/practice-areas/corporate-law/index.html'],
  ['outside-general-counsel', 'dist/outside-general-counsel/index.html'],
  ['trademarks', 'dist/practice-areas/trademarks/index.html'],
  ['cannabis-law', 'dist/practice-areas/cannabis-law/index.html'],
  ['wills-and-trusts', 'dist/practice-areas/wills-and-trusts/index.html'],
  ['real-estate-law', 'dist/practice-areas/real-estate-law/index.html'],
];

const decode = (s) =>
  s
    .replace(/&#39;|&apos;|&#x27;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, '\u2019');

const strip = (h) =>
  decode(
    h
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<style[\s\S]*?<\/style>/g, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, ' ')
  );

let fail = 0;
const rows = [];
for (const [name, rel] of pages) {
  const html = fs.readFileSync(`${root}/${rel}`, 'utf8');
  const main = html.split('<main')[1].split('</main>')[0];
  const text = strip(main).trim().replace(/\s+/g, ' ');
  const words = text.split(' ').filter(Boolean).length;

  const h1 = (main.match(/<h1[ >]/g) || []).length;
  const h2 = (main.match(/<h2[ >]/g) || []).length;
  const h3 = (main.match(/<h3[ >]/g) || []).length;

  const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const graph = ld['@graph'];
  const faq = graph.find((n) => n['@type'] === 'FAQPage');
  const svc = graph.find((n) => n['@type'] === 'Service');
  const crumb = graph.find((n) => n['@type'] === 'BreadcrumbList');

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const canonical = /<link rel="canonical"/.test(html);

  // outbound citations to statutes/agencies (external links in the body)
  const external = [...main.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  const offsite = external.filter((u) => !u.includes('hickokkim.com')).length;

  // internal links to other practice pages + the attorney bio
  const internal = [...main.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
  const toPractice = new Set(
    internal.filter((u) => u.startsWith('/practice-areas/') || u === '/outside-general-counsel/')
  ).size;
  const toAttorney = internal.some((u) => u.startsWith('/attorneys/'));

  // FAQ schema must mirror visible question headings exactly
  const visibleQs = [...main.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)]
    .map((m) => decode(m[1].replace(/<[^>]+>/g, '')).trim())
    .filter((t) => t.endsWith('?'));
  const schemaQs = (faq?.mainEntity || []).map((q) => decode(q.name).trim());
  const mirror =
    schemaQs.length === visibleQs.length && schemaQs.every((q) => visibleQs.includes(q));

  // answers must also appear verbatim in the visible text
  const answersVisible = (faq?.mainEntity || []).every((q) =>
    text.includes(decode(q.acceptedAnswer.text).trim())
  );

  // firm name inside the quick-answer block (entity anchoring, §12.1)
  const quick = main.split('quick-answer')[1]?.split('</div>')[0] || '';
  const anchored = /Hickok\s*&(amp;)?\s*Kim/.test(quick);

  const problems = [];
  if (words < 1500) problems.push(`WORDS(${words})`);
  if (words > 2600) problems.push(`LONG(${words})`);
  if (h1 !== 1) problems.push(`H1(${h1})`);
  if (!faq) problems.push('NO-FAQ');
  if (!svc) problems.push('NO-SERVICE');
  if (!crumb) problems.push('NO-BREADCRUMB');
  if (!mirror) problems.push(`MIRROR(${schemaQs.length}/${visibleQs.length})`);
  if (!answersVisible) problems.push('ANSWER-TEXT');
  if (!anchored) problems.push('NOT-ANCHORED');
  if (title.length > 60) problems.push(`TITLE(${title.length})`);
  if (desc.length > 155) problems.push(`DESC(${desc.length})`);
  if (!canonical) problems.push('NO-CANONICAL');
  if (offsite < 3) problems.push(`CITES(${offsite})`);
  if (toPractice < 2) problems.push(`INTERNAL(${toPractice})`);
  if (!toAttorney) problems.push('NO-ATTORNEY-LINK');

  if (problems.length) fail++;
  rows.push({ name, words, h2, h3, faq: schemaQs.length, offsite, toPractice, problems });
}

console.log('page'.padEnd(25), 'words', 'H2', 'H3', 'FAQ', 'cite', 'link');
for (const r of rows) {
  console.log(
    r.name.padEnd(25),
    String(r.words).padStart(5),
    String(r.h2).padStart(2),
    String(r.h3).padStart(2),
    String(r.faq).padStart(3),
    String(r.offsite).padStart(4),
    String(r.toPractice).padStart(4),
    r.problems.length ? '  <-- ' + r.problems.join(', ') : ''
  );
}
console.log(fail ? `\n${fail} page(s) with problems.` : '\nAll nine pages pass every check.');
