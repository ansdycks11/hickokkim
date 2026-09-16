import type { PracticeContent } from './types';

export const content: PracticeContent = {
  slug: 'business-law',
  title: 'Business Lawyer | Hickok & Kim — Los Angeles',
  description:
    "Day-to-day counsel for California businesses: contracts, employment questions, and disputes. Free consultation with a Los Angeles business lawyer.",
  h1: 'Business law for California <em>owners</em>',
  definition:
    'Business law covers the agreements, obligations, and day-to-day legal decisions that keep a company operating: what it signs, who it hires, and how it handles a problem before it becomes a lawsuit.',
  quickAnswer: [
    'Most legal problems a small or mid-sized business encounters were decided months earlier by a document nobody read closely. The contract that lacked a payment term, the contractor who should have been an employee, the handshake that never became a written agreement. Business law is mostly the practice of getting those decisions right the first time, which is far cheaper than litigating them later.',
    'Hickok & Kim advises businesses in Los Angeles and throughout California on contracts, vendor and customer agreements, employment questions, regulatory obligations, and disputes. Business matters are handled by both partners, Daniel J. Kim and Christopher D. Hickok, and consultations are available in English and Korean. The firm works with owners at every stage, from a first contract template to an established company that needs ongoing counsel. Every matter begins with a free consultation.',
  ],
  services: [
    {
      title: 'Contracts you use every day',
      body: 'Master services agreements, statements of work, customer terms, vendor agreements, and purchase orders. The value is not in the boilerplate, it is in matching the payment terms, scope, termination rights, and limitation of liability to how your business actually operates so the document works when a deal goes sideways.',
    },
    {
      title: 'Employment and independent contractor questions',
      body: 'California is among the most demanding employment jurisdictions in the country, and worker classification is the most common and most expensive error we see. We advise on classification, offer letters, handbooks, wage and hour compliance, and separation agreements.',
    },
    {
      title: 'Protecting what the business knows',
      body: 'California will not enforce a non-compete against an employee, which makes the other tools decisive: properly drafted confidentiality agreements, trade secret protection, assignment of inventions, and practical controls over who has access to what. We build the protection that California law actually allows.',
    },
    {
      title: 'Commercial leases',
      body: 'A commercial lease is usually a business\'s largest fixed obligation and is presented as non-negotiable when it rarely is. We review and negotiate term, escalation, common area charges, personal guarantees, assignment and subletting rights, and what happens if the business needs to exit early.',
    },
    {
      title: 'Regulatory and licensing obligations',
      body: 'Depending on the industry this can mean professional licensing, local permits, consumer protection and advertising rules, or California privacy obligations. We identify what applies, which is often less than an owner fears and occasionally more than they expected.',
    },
    {
      title: 'Handling disputes before they become lawsuits',
      body: 'Demand letters, negotiated resolutions, and pre-litigation positioning resolve most commercial disagreements. When that fails, the same firm handles the litigation, so there is no handoff and no second lawyer learning the file.',
    },
  ],
  situations: [
    {
      title: 'A client will not pay and there is no signed contract',
      body: 'You may still have an enforceable agreement. California recognizes oral and implied contracts, though some categories must be in writing, and emails and invoices frequently supply the terms. The deadline for an oral contract is shorter than for a written one, so this is time-sensitive.',
    },
    {
      title: 'You classified someone as a contractor and now you are not sure',
      body: 'California applies a demanding test that presumes a worker is an employee unless three specific conditions are all met. Misclassification exposes a business to back wages, taxes, penalties, and claims from the worker. Fixing it prospectively is far cheaper than defending it.',
    },
    {
      title: 'An employee left for a competitor with your client list',
      body: 'A non-compete will not help you in California. What may help is a confidentiality agreement, trade secret protection if the information qualifies, and the specific facts of what they took and how. The analysis turns on whether the information was genuinely protected, not on whether it feels like a betrayal.',
    },
    {
      title: 'A vendor sent a contract and asked you to sign today',
      body: 'Urgency is a negotiating tactic. The clauses that matter most are the ones that only apply when things go wrong: limitation of liability, indemnity, termination, auto-renewal, and where disputes must be resolved. A short review is cheap relative to what those clauses control.',
    },
    {
      title: 'You are being asked to sign a personal guarantee',
      body: 'A personal guarantee puts your own assets behind a company obligation and undoes much of the protection that forming an entity was meant to provide. Sometimes it is unavoidable, but it is almost always negotiable in scope, amount, or duration.',
    },
  ],
  sections: [
    {
      heading: 'What makes a contract enforceable in California',
      body: [
        'A contract requires parties capable of agreeing, mutual consent, a lawful object, and consideration, meaning something of value exchanged on both sides. California enforces oral agreements in many circumstances, which surprises people in both directions: the handshake deal may be binding, and so may the one you thought was still under discussion.',
        'Certain agreements must be in writing to be enforceable under California\'s statute of frauds, found at Civil Code section 1624. The categories most relevant to a business are agreements that cannot be performed within one year, agreements involving the sale of real property or a lease longer than a year, and promises to answer for someone else\'s debt, which is why personal guarantees are always written.',
        'The clauses that determine what a dispute costs are rarely the ones negotiated hardest. Limitation of liability caps exposure. Indemnity shifts someone else\'s losses onto you. An attorney-fee clause changes the economics of any dispute. A venue or arbitration clause determines where you will have to fight. Those five deserve more attention than the price term usually gets.',
      ],
    },
    {
      heading: 'Worker classification is the expensive mistake',
      body: [
        'California codified a strict test for whether a worker is an employee or an independent contractor at Labor Code section 2775. The default is employee. A business claiming contractor status must establish all three of the following: that the worker is free from the hiring entity\'s control in performing the work, that the work is outside the usual course of the hiring entity\'s business, and that the worker is customarily engaged in an independently established trade of the same nature.',
        'The middle condition defeats most arrangements. A design agency engaging designers, or a restaurant engaging cooks, will struggle regardless of how the agreement is written, because that work is the usual course of the business. Certain occupations and relationships are carved out by statute, and those exemptions are specific rather than general.',
        'The consequence of getting it wrong is cumulative: unpaid overtime and meal and rest premiums, unreimbursed business expenses, payroll taxes, and penalties, often across multiple workers and several years. A classification review is one of the highest-value hours a California business can spend with a lawyer.',
      ],
    },
    {
      heading: 'Non-competes do not work in California',
      body: [
        'Business and Professions Code section 16600 voids contracts restraining anyone from engaging in a lawful profession, trade, or business, with narrow exceptions tied to the sale of a business or the dissolution of a partnership or LLC. California courts apply this broadly. An agreement that would be routine in another state is generally unenforceable here.',
        'Recent legislation went further, making it unlawful to attempt to enforce a void non-compete and requiring employers to notify affected employees that such provisions are void. Businesses that inherited template agreements from out-of-state counsel should have them reviewed, because retaining an unenforceable clause now carries its own exposure.',
        'What remains available is substantial: confidentiality obligations, trade secret protection under California\'s Uniform Trade Secrets Act, assignment of inventions, and protection against actual misuse of protected information. The strategy shifts from restraining where someone may work to protecting what they may take.',
      ],
    },
    {
      heading: 'When a business should have ongoing counsel',
      body: [
        'Businesses generally call a lawyer at three moments: when starting, when in trouble, and when selling. The gap between the first and second is where most avoidable problems are created, because contracts get signed, people get hired, and commitments get made without anyone reading them with a trained eye.',
        'For companies at that stage, Hickok & Kim offers an outside general counsel arrangement: ongoing availability for the small questions that do not justify opening a matter, plus the contract review and advice that prevents larger problems. It is described in more detail on the outside general counsel page.',
      ],
    },
  ],
  questions: [
    {
      q: 'Do I need a written contract in California?',
      a: 'Not always, since California enforces many oral agreements, but you want one. Certain categories must be written to be enforceable under Civil Code section 1624, including agreements that cannot be performed within a year, real property transactions, and promises to pay someone else\'s debt. Beyond enforceability, a written contract sets the terms that decide a dispute, and the deadline to sue on a written contract is twice as long as for an oral one.',
    },
    {
      q: 'Can I hire someone as an independent contractor in California?',
      a: 'Only if all three parts of the test in Labor Code section 2775 are satisfied: the worker is free from your control, the work falls outside the usual course of your business, and the worker is independently established in that trade. The second part defeats most arrangements. Misclassification exposes the business to back wages, taxes, and penalties, so the analysis should happen before the engagement starts.',
    },
    {
      q: 'Are non-compete agreements enforceable in California?',
      a: 'Generally no. Business and Professions Code section 16600 voids agreements restraining someone from practicing a lawful profession or trade, with narrow exceptions tied to the sale of a business or dissolution of a partnership. Recent legislation also makes attempting to enforce a void non-compete unlawful and requires notifying affected employees. Confidentiality agreements and trade secret protection remain available and enforceable.',
    },
    {
      q: 'What should I look for before signing a commercial lease?',
      a: 'Focus on the provisions that bind you when circumstances change: the length of the term and any personal guarantee, how operating expenses and common area charges are calculated and capped, whether you may assign or sublet if you need to leave, what happens on default, and who pays for what maintenance. The rent number is usually the most negotiated and least consequential term.',
    },
    {
      q: 'When should a small business hire a lawyer?',
      a: 'Before signing anything that binds the business for more than a year or exposes it to more than it can comfortably lose, before hiring the first worker, and before taking outside money. Those three moments create obligations that are difficult and expensive to unwind. Reviewing a document costs a fraction of litigating what it says.',
    },
  ],
  citations: [
    {
      label: 'Labor Code section 2775',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=2775',
      note: 'California\'s employee-versus-contractor test and its exemptions.',
    },
    {
      label: 'Business and Professions Code section 16600',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=16600',
      note: 'The provision voiding non-compete agreements in California.',
    },
    {
      label: 'Civil Code section 1624',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1624',
      note: 'California\'s statute of frauds: which agreements must be in writing.',
    },
    {
      label: 'California Labor Commissioner',
      url: 'https://www.dir.ca.gov/dlse/',
      note: 'Wage and hour rules, required notices, and the claims process.',
    },
    {
      label: 'California Civil Rights Department',
      url: 'https://calcivilrights.ca.gov/employment/',
      note: 'Employment discrimination and harassment obligations, including training requirements.',
    },
    {
      label: 'California Privacy Protection Agency',
      url: 'https://cppa.ca.gov/',
      note: 'Which businesses the California privacy law covers and what it requires.',
    },
  ],
  verify: [
    'The non-compete notice requirement had a specific compliance deadline (February 2024). This page describes the obligation without a date; confirm current requirements before adding one.',
    'California privacy law applicability thresholds adjust. This page states no thresholds; confirm with the CPPA before adding them.',
    'Minimum wage and salary-exempt thresholds change annually and are not stated on this page by design.',
  ],
  related: ['corporate-law', 'outside-general-counsel', 'civil-litigation'],
};
