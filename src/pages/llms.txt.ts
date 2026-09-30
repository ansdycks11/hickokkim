/**
 * /llms.txt — a plain-Markdown guide to the site for AI assistants (llmstxt.org format:
 * an H1, a one-paragraph summary in a blockquote, then H2 sections of Markdown links
 * with a short note each). Built from src/data/firm.ts and the Insights collection at
 * build time, so every fact here matches the pages and the structured data; edit
 * firm.ts, not this file.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  SITE_URL,
  firm,
  moments,
  areasByMoment,
  areasForPartner,
  partnerList,
  partners,
  practiceAreas,
  disclaimers,
  type PartnerSlug,
} from '../data/firm';

const url = (path: string) => `${SITE_URL}${path}`;
const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n');
const names = (slugs: readonly PartnerSlug[]) =>
  slugs.length === partnerList.length ? 'both partners' : slugs.map((s) => partners[s].name).join(' and ');
/** Facts are joined with ". ", so drop any full stop they already end with. */
const clause = (s: string) => s.replace(/\.$/, '');
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const count = (n: number) => WORDS[n] ?? String(n);

const practiceSections = moments
  .map((m) => `${m.heading}:\n\n${list(areasByMoment(m.id).map((a) => `[${a.name}](${url(a.path)}): ${a.blurb} Handled by ${names(a.partners)}.`))}`)
  .join('\n\n');

const attorneyLines = partnerList.map((p) => {
  const areas = areasForPartner(p.slug);
  const own = areas.filter((a) => a.partners.length === 1).map((a) => a.shortName.toLowerCase());
  const shared = areas.filter((a) => a.partners.length > 1).map((a) => a.shortName.toLowerCase());
  const facts = [
    `${p.title}. Also written ${p.alternateName}. California State Bar #${p.barNumber} (admitted ${p.barAdmitted})`,
    ...p.federalAdmissions,
    ...p.education,
    `Handles ${own.join(', ')}${shared.length ? `; shares ${shared.join(', ')}` : ''}`,
    `Languages: ${p.languages.join(' and ')}`,
    ...p.memberships,
  ];
  return `[${p.name}](${p.url}): ${facts.map(clause).join('. ')}.`;
});

// Published articles, newest first (same rule as the Insights page). The section
// appears only once there is at least one, so the file never promises what isn't there.
const posts = (await getCollection('insights', ({ data }) => !data.draft)).sort(
  (a, b) => b.data.updated.getTime() - a.data.updated.getTime(),
);
const insights = posts.length
  ? `## Insights\n\n${list(
      posts.map(
        (p) =>
          `[${p.data.title}](${url(`/insights/${p.id}/`)}): ${clause(p.data.description)}. By ${partners[p.data.author].name}, updated ${p.data.updated.toISOString().slice(0, 10)}.`,
      ),
    )}\n\n`
  : '';

const body = `# ${firm.name}

> ${firm.name} is a boutique law firm in Los Angeles, California, founded in ${firm.founded} by partners ${partnerList.map((p) => p.name).join(' and ')}. The firm represents individuals and businesses across California in ${count(practiceAreas.length)} practice areas and offers a free initial consultation. Services are available in ${firm.languages.join(' and ')}.

Service area: all of ${firm.areaServed}, by phone, video, or in person in Los Angeles. The firm does not handle criminal law.

## Contact

${list([
  `[Request a free consultation](${url('/contact/')}): by phone or video; a partner responds ${firm.responsePromise}.`,
  `Phone: [${firm.phoneDisplay}](tel:${firm.phoneTel})`,
  `Email: [${firm.email}](mailto:${firm.email})`,
  `Address: ${firm.address.street}, ${firm.address.city}, ${firm.address.region} ${firm.address.postal} (${firm.address.note.toLowerCase()})`,
  `Hours: ${firm.hoursDisplay}; ${firm.hoursNote.charAt(0).toLowerCase() + firm.hoursNote.slice(1)}`,
])}

## Practice areas

Organized by the moment a client is in. [All practice areas](${url('/practice-areas/')}).

${practiceSections}

## Attorneys

${list(attorneyLines)}

## Fees and process

${list([
  `[How we work](${url('/how-we-work/')}): free initial consultation by phone or video; hourly, flat-fee, or contingency fees depending on the matter (personal injury is handled on contingency); every engagement begins with a written retainer agreement and conflict check; invoices are itemized.`,
  `[Frequently asked questions](${url('/faq/')}): fees, consultations, meetings, and services in Korean.`,
])}

${insights}## Optional

${list([
  `[Privacy policy](${url('/privacy-policy/')})`,
  `[Disclaimer](${url('/disclaimer/')})`,
  `[Sitemap](${url('/sitemap-index.xml')})`,
])}

${disclaimers.advertising}
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
