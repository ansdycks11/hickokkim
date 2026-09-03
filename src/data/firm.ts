/**
 * Single source of truth for every firm fact used on the site.
 * Mirrors docs/firm-content.md. If the two disagree, fix THIS file to match that one.
 * Anything the client has not supplied yet is marked TODO:REAL-DATA and must render
 * as a placeholder, never as invented content.
 */

export const SITE_URL = 'https://hickokkim.com';
export const FIRM_ID = `${SITE_URL}/#firm`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const firm = {
  name: 'Hickok & Kim, Inc.',
  shortName: 'Hickok & Kim',
  legalName: 'Hickok & Kim, Inc.',
  founded: '2019',
  url: SITE_URL,
  // NAP block. Must match the Google Business Profile exactly.
  phoneDisplay: '(213) 373-7188',
  phoneTel: '+12133737188',
  phoneSchema: '+1-213-373-7188',
  email: 'info@hickokkim.com',
  address: {
    street: '2202 S. Figueroa St., #201',
    city: 'Los Angeles',
    region: 'CA',
    postal: '90007',
    country: 'US',
    note: 'Meetings by appointment',
  },
  // Approximate coordinates for the Figueroa St. address (Exposition Park area).
  geo: { lat: 34.0301, lng: -118.2757 },
  hoursDisplay: 'Monday to Friday, 9 AM to 5 PM',
  hoursNote: 'Calls and emails usually answered the same day',
  responsePromise: 'within one business day, usually the same day',
  areaServed: 'California',
  languages: ['English', 'Korean'],
  languageCodes: ['en', 'ko'],
  description:
    'Hickok & Kim, Inc. is a Los Angeles law firm serving individuals and businesses across California: personal injury, civil litigation, business and corporate law, outside general counsel, trademarks, cannabis law, wills and trusts, and real estate. Free initial consultation.',
  // TODO:REAL-DATA — Google Business Profile URL, firm LinkedIn page.
  sameAs: [] as string[],
  // Generated branded OG image (ink background, brass scales mark, firm name).
  ogImage: `${SITE_URL}/assets/og-default.png`,
  lastReviewed: '2026-09-02',
} as const;

export type PartnerSlug = 'daniel-kim' | 'christopher-hickok';

export interface Partner {
  slug: PartnerSlug;
  name: string;
  shortName: string;
  firstName: string;
  title: 'Partner';
  path: string;
  url: string;
  id: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  barNumber: string;
  barAdmitted: string;
  barProfile: string;
  federalAdmissions: string[];
  education: string[];
  experience: string[];
  memberships: string[];
  languages: string[];
  languageCodes: string[];
  sameAs: string[];
  focusSummary: string;
  shortBio: string;
  humanizing?: string;
  email?: string;
}

export const partners: Record<PartnerSlug, Partner> = {
  'daniel-kim': {
    slug: 'daniel-kim',
    name: 'Daniel J. Kim',
    shortName: 'Daniel Kim',
    firstName: 'Daniel',
    title: 'Partner',
    path: '/attorneys/daniel-kim/',
    url: `${SITE_URL}/attorneys/daniel-kim/`,
    id: `${SITE_URL}/attorneys/daniel-kim/#person`,
    // TODO:REAL-DATA — full-resolution headshot (>=1200px short edge). Current file is 600x600.
    image: '/assets/daniel-kim.jpg',
    imageWidth: 600,
    imageHeight: 600,
    imageAlt: 'Daniel J. Kim, Partner at Hickok & Kim',
    barNumber: '314971',
    barAdmitted: '2017',
    barProfile: 'https://apps.calbar.ca.gov/attorney/Licensee/Detail/314971',
    federalAdmissions: ['U.S. District Court, Central District of California (2017)'],
    // TODO:REAL-DATA — J.D. year (likely 2016; confirm) and undergraduate institution.
    education: ['University of San Francisco School of Law, J.D.'],
    // TODO:REAL-DATA — prior roles.
    experience: ['Nine years in practice; co-founded Hickok & Kim in 2019'],
    memberships: [],
    languages: ['English', 'Korean'],
    languageCodes: ['en', 'ko'],
    // TODO:REAL-DATA — LinkedIn URL.
    sameAs: ['https://apps.calbar.ca.gov/attorney/Licensee/Detail/314971'],
    focusSummary: 'Personal injury, civil litigation, wills and trusts, real estate.',
    shortBio:
      'Daniel represents people and businesses in California courts and handles the planning that keeps families out of them. Nine years in practice, admitted to the Central District of California, and one of the few Los Angeles litigators who can take a matter from consultation to resolution entirely in Korean.',
    // TODO:REAL-DATA — humanizing line (optional).
    email: 'daniel@hickokkim.com',
  },
  'christopher-hickok': {
    slug: 'christopher-hickok',
    name: 'Christopher D. Hickok',
    shortName: 'Chris Hickok',
    firstName: 'Chris',
    title: 'Partner',
    path: '/attorneys/christopher-hickok/',
    url: `${SITE_URL}/attorneys/christopher-hickok/`,
    id: `${SITE_URL}/attorneys/christopher-hickok/#person`,
    // TODO:REAL-DATA — full-resolution headshot (>=1200px short edge). Current file is 340x340.
    image: '/assets/christopher-hickok.png',
    imageWidth: 340,
    imageHeight: 340,
    imageAlt: 'Christopher D. Hickok, Partner at Hickok & Kim',
    barNumber: '315726',
    barAdmitted: 'June 2017',
    barProfile: 'https://apps.calbar.ca.gov/attorney/Licensee/Detail/315726',
    federalAdmissions: [],
    education: [
      'University of San Francisco School of Law, J.D. 2016',
      'University of California, Santa Cruz, B.A. Sociology',
    ],
    experience: ['Shevin Law Group (2016–2019)', 'Co-founded Hickok & Kim in 2019'],
    memberships: [
      'Board Member, Los Angeles County Bar Association, Cannabis Section',
      'Board of Directors, Reins in Motion (non-profit)',
    ],
    languages: ['English'],
    languageCodes: ['en'],
    sameAs: [
      'https://apps.calbar.ca.gov/attorney/Licensee/Detail/315726',
      'https://www.linkedin.com/in/chris-hickok-7a7277130',
      'https://www.instagram.com/alienatlaw',
    ],
    focusSummary: 'Cannabis law, trademarks, business and corporate counsel.',
    shortBio:
      "Chris has advised California cannabis operators since the first year of adult-use licensing and sits on the board of the Los Angeles County Bar Association's Cannabis Section. He came to Hickok & Kim from Shevin Law Group and has spoken on cannabis policy at the 2023 Democratic Convention in Los Angeles and on industry podcasts including First Smoke of the Day.",
    humanizing: 'Off the clock: rec-league basketball and drums.',
    email: 'chris@hickokkim.com',
  },
};

export const partnerList: Partner[] = [partners['daniel-kim'], partners['christopher-hickok']];

export type MomentId = 'wrong' | 'building' | 'ahead';

export interface Moment {
  id: MomentId;
  heading: string;
  tagline: string;
  line: string; // chapter line used in the homepage experience
}

export const moments: Moment[] = [
  {
    id: 'wrong',
    heading: 'When something goes wrong',
    tagline: 'Injury claims and civil disputes.',
    line: 'The other side already has a lawyer. Now so do you.',
  },
  {
    id: 'building',
    heading: "When you're building something",
    tagline: 'Formation, counsel, brands, and licenses.',
    line: 'Every company is a stack of documents. Get them right the first time.',
  },
  {
    id: 'ahead',
    heading: "When you're planning ahead",
    tagline: 'Estates and property.',
    line: "What you've built should outlast you, intact.",
  },
];

export interface PracticeArea {
  slug: string;
  path: string; // site-relative URL with trailing slash
  name: string;
  shortName: string;
  ref: string; // ledger reference code
  moment: MomentId;
  partners: PartnerSlug[];
  blurb: string;
  ledgerNote?: string; // small line under the title in the ledger
  featured?: boolean;
  schemaName: string; // knowsAbout / serviceType label
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'personal-injury',
    path: '/practice-areas/personal-injury/',
    name: 'Personal Injury',
    shortName: 'Personal injury',
    ref: 'PI-01',
    moment: 'wrong',
    partners: ['daniel-kim'],
    ledgerNote: 'Daniel J. Kim, contingency fee',
    blurb:
      'Car and pedestrian accidents, premises injuries, and insurance disputes. You pay nothing unless we recover for you.',
    schemaName: 'Personal Injury Law',
  },
  {
    slug: 'civil-litigation',
    path: '/practice-areas/civil-litigation/',
    name: 'Civil Litigation',
    shortName: 'Civil litigation',
    ref: 'CL-02',
    moment: 'wrong',
    partners: ['daniel-kim'],
    ledgerNote: 'Daniel J. Kim',
    blurb:
      'Contract and business disputes, partnership breakups, and property claims in California state and federal courts.',
    schemaName: 'Civil Litigation',
  },
  {
    slug: 'business-law',
    path: '/practice-areas/business-law/',
    name: 'Business Law',
    shortName: 'Business law',
    ref: 'BL-03',
    moment: 'building',
    partners: ['daniel-kim', 'christopher-hickok'],
    ledgerNote: 'Daniel J. Kim and Christopher D. Hickok',
    blurb:
      'Day-to-day counsel for owners: contracts, vendor and customer agreements, employment questions, and disputes before they become lawsuits.',
    schemaName: 'Business Law',
  },
  {
    slug: 'corporate-law',
    path: '/practice-areas/corporate-law/',
    name: 'Corporate Law',
    shortName: 'Corporate law',
    ref: 'CO-04',
    moment: 'building',
    partners: ['daniel-kim', 'christopher-hickok'],
    ledgerNote: 'Daniel J. Kim and Christopher D. Hickok',
    blurb:
      'Entity formation, operating and shareholder agreements, governance, financing, and the paperwork of buying or selling a company.',
    schemaName: 'Corporate Law',
  },
  {
    slug: 'outside-general-counsel',
    path: '/outside-general-counsel/',
    name: 'Outside General Counsel',
    shortName: 'Outside general counsel',
    ref: 'GC-05',
    moment: 'building',
    partners: ['daniel-kim', 'christopher-hickok'],
    ledgerNote: 'Daniel J. Kim and Christopher D. Hickok',
    blurb:
      "Your company's legal department, without the in-house cost: ongoing contract review, advice on decisions, and disputes handled as they arise.",
    featured: true,
    schemaName: 'Outside General Counsel',
  },
  {
    slug: 'trademarks',
    path: '/practice-areas/trademarks/',
    name: 'Trademarks',
    shortName: 'Trademarks',
    ref: 'TM-06',
    moment: 'building',
    partners: ['christopher-hickok'],
    ledgerNote: 'Christopher D. Hickok',
    blurb:
      'Clearance, federal and California registration, licensing, and enforcement for the names and marks your business runs on.',
    schemaName: 'Trademark Law',
  },
  {
    slug: 'cannabis-law',
    path: '/practice-areas/cannabis-law/',
    name: 'Cannabis Law',
    shortName: 'Cannabis law',
    ref: 'CB-07',
    moment: 'building',
    partners: ['christopher-hickok'],
    ledgerNote: 'Christopher D. Hickok, LACBA Cannabis Section board member',
    blurb:
      'Licensing, regulatory compliance, and transactions for California cannabis operators, from first application to ongoing counsel.',
    schemaName: 'Cannabis Law',
  },
  {
    slug: 'wills-and-trusts',
    path: '/practice-areas/wills-and-trusts/',
    name: 'Wills & Trusts',
    shortName: 'Wills and trusts',
    ref: 'WT-08',
    moment: 'ahead',
    partners: ['daniel-kim'],
    ledgerNote: 'Daniel J. Kim',
    blurb:
      'Wills, revocable living trusts, powers of attorney, and health-care directives, written to hold up when a family needs them.',
    schemaName: 'Wills and Trusts',
  },
  {
    slug: 'real-estate-law',
    path: '/practice-areas/real-estate-law/',
    name: 'Real Estate Law',
    shortName: 'Real estate law',
    ref: 'RE-09',
    moment: 'ahead',
    partners: ['daniel-kim'],
    ledgerNote: 'Daniel J. Kim',
    blurb:
      'Purchase and lease agreements, title and boundary issues, and landlord-tenant and property disputes.',
    schemaName: 'Real Estate Law',
  },
];

export const areasByMoment = (id: MomentId) => practiceAreas.filter((a) => a.moment === id);
export const areasForPartner = (slug: PartnerSlug) =>
  practiceAreas.filter((a) => a.partners.includes(slug));
export const areaBySlug = (slug: string) => practiceAreas.find((a) => a.slug === slug);

export const nav = [
  { label: 'Practice areas', href: '/practice-areas/', children: true },
  { label: 'Attorneys', href: '/attorneys/', children: false },
  { label: 'How we work', href: '/how-we-work/', children: false },
  { label: 'Insights', href: '/insights/', children: false },
  { label: 'FAQ', href: '/faq/', children: false },
];

export const disclaimers = {
  advertising: 'Attorney advertising. Prior results do not guarantee a similar outcome.',
  noRelationship:
    'Contacting us through this site does not create an attorney-client relationship until a retainer agreement is signed.',
  licensed: 'Licensed in California.',
} as const;
