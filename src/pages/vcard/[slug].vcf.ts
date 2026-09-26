/**
 * Downloadable contact cards (vCard 3.0) for each partner, generated at build.
 * Uses the firm's published phone and intake email only.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { partnerList, firm } from '../../data/firm';

export const getStaticPaths: GetStaticPaths = () =>
  partnerList.map((p) => ({ params: { slug: p.slug }, props: { p } }));

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;');

export const GET: APIRoute = ({ props }) => {
  const p = (props as { p: (typeof partnerList)[number] }).p;
  const [first, ...rest] = p.name.split(' ');
  const last = rest.pop() ?? '';
  const middle = rest.join(' ');
  const card = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(last)};${esc(first)};${esc(middle)};;`,
    `FN:${esc(p.name)}`,
    `ORG:${esc(firm.name)}`,
    `TITLE:${esc(p.title)}`,
    `TEL;TYPE=WORK,VOICE:${firm.phoneSchema}`,
    `EMAIL;TYPE=WORK:${firm.email}`,
    `ADR;TYPE=WORK:;;${esc(firm.address.street)};${esc(firm.address.city)};${firm.address.region};${firm.address.postal};USA`,
    `URL:${p.url}`,
    'END:VCARD',
    '',
  ].join('\r\n');
  return new Response(card, {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
};
