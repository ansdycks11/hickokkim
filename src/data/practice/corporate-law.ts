import type { PracticeContent } from './types';

export const content: PracticeContent = {
  slug: 'corporate-law',
  title: 'Corporate Lawyer | Hickok & Kim — Los Angeles',
  description:
    "California entity formation, LLC and corporation structure, operating agreements, and business sales. Free consultation in Los Angeles.",
  h1: 'Corporate law and business <em>structure</em>',
  definition:
    'Corporate law governs how a business is formed, who owns and controls it, what the owners owe each other, and what happens when it is sold, financed, or wound down.',
  quickAnswer: [
    'Choosing an entity is the smallest part of forming a company. The decisions that matter are the ones inside it: how ownership is split, what happens when a founder leaves, who can bind the company, and how a deadlock gets broken. Those live in an operating agreement or shareholder agreement, and a business without one is governed by whatever default rules the California Corporations Code supplies.',
    'Hickok & Kim handles formation, governance, ownership agreements, financings, and transactions for businesses in Los Angeles and across California. Corporate matters are handled by both partners, Daniel Kim and Christopher Hickok. The firm works with founders forming a first entity, partners restructuring ownership, and owners preparing to buy or sell. Every matter begins with a free initial consultation.',
  ],
  services: [
    {
      title: 'Entity formation and structure',
      body: 'Forming the entity, filing with the Secretary of State, obtaining a federal tax identification number, and putting the governing documents in place. We advise on which structure fits the business and the owners\' tax position, including whether an S corporation election makes sense.',
    },
    {
      title: 'Operating and shareholder agreements',
      body: 'This is the document that decides what happens when the founders disagree. Voting and control, capital contributions, distributions, transfer restrictions, buy-sell mechanics on death, divorce, or departure, and deadlock resolution. Without it, California\'s default rules apply, and those defaults rarely match what the owners actually intended.',
    },
    {
      title: 'Governance and corporate maintenance',
      body: 'Bylaws, board and shareholder consents, minutes, stock issuance and ledgers, and the periodic filings California requires. Maintaining these is not busywork: it is what preserves the liability shield and what a buyer or investor will examine first in diligence.',
    },
    {
      title: 'Equity, options, and bringing in partners',
      body: 'Issuing membership interests or shares, structuring vesting so a departing founder does not keep full equity, equity incentive plans for employees, and the California and federal securities filings that even a small private issuance requires.',
    },
    {
      title: 'Financing and investment documents',
      body: 'Convertible notes, simple agreements for future equity, priced rounds, and loans. We represent the company or the investor, explain what the economic and control terms actually do, and make sure the capitalization table still works after the round closes.',
    },
    {
      title: 'Buying or selling a business',
      body: 'Letters of intent, diligence, asset and stock purchase agreements, allocation and escrow, representations and indemnities, and closing. We also handle the unglamorous parts that derail deals, including landlord consents, contract assignments, and license transfers.',
    },
  ],
  situations: [
    {
      title: 'Two founders, a handshake, and no paperwork',
      body: 'Without a written agreement, California\'s default rules decide ownership, control, and what happens if one of you leaves, and those defaults are frequently an even split with mutual veto power. Papering it while everyone still agrees costs a fraction of resolving it after they do not.',
    },
    {
      title: 'A co-owner wants out, or needs to be removed',
      body: 'Whether you can buy them out, at what price, and on what terms depends almost entirely on whether a buy-sell provision exists. If it does not, the options narrow quickly to negotiation or dissolution, both of which are expensive.',
    },
    {
      title: 'You have been operating without maintaining the entity',
      body: 'Missed filings, no minutes, no separate bank account, and personal and business expenses mixed together all weaken the liability shield and give a plaintiff an alter ego argument. This is generally fixable, and it is much better fixed before a claim arrives.',
    },
    {
      title: 'An investor is offering money on terms you do not fully understand',
      body: 'Valuation caps, discounts, liquidation preferences, pro rata rights, and board seats each do specific things to what founders end up owning and controlling. The time to understand them is before signing, not at the next round.',
    },
    {
      title: 'Someone offered to buy your company',
      body: 'Whether the deal is structured as an asset purchase or an equity purchase changes the tax result, which liabilities transfer, and what consents are required. That structural choice is usually settled in the letter of intent, which is why the letter of intent deserves real attention even when it is labeled non-binding.',
    },
  ],
  sections: [
    {
      heading: 'Choosing an entity in California',
      body: [
        'Most California businesses choose between a limited liability company and a corporation. Both provide a liability shield. They differ in formality, tax treatment, and what investors expect.',
        'An LLC, governed by the California Revised Uniform Limited Liability Company Act, is flexible. Owners can allocate profits and control largely as they agree, formality requirements are lighter, and by default it is taxed as a pass-through. A corporation, governed by the General Corporation Law, is more rigid, with a board, officers, bylaws, and stock, but that rigidity is exactly what institutional investors expect, and stock is easier to grant and transfer than membership interests.',
        'Two California-specific points get overlooked. First, California imposes an annual minimum franchise tax on both LLCs and corporations regardless of profitability, and LLCs above a revenue threshold owe an additional fee on top of it. A business needs to budget for this from day one. Second, California restricts limited liability partnerships to a short list of licensed professions, so the LLP is not a general-purpose option here the way it is elsewhere.',
      ],
      table: {
        caption: 'LLC and corporation compared for California businesses',
        head: ['Consideration', 'How they differ'],
        rows: [
          ['Governing document', 'LLC: operating agreement. Corporation: bylaws plus shareholder agreement'],
          ['Formality', 'LLC is lighter; a corporation needs a board, officers, and minutes'],
          ['Default taxation', 'Both commonly pass through; a corporation may elect or default to entity-level tax'],
          ['Outside investment', 'Institutional investors generally expect a corporation with stock'],
          ['Ongoing California cost', 'Annual minimum franchise tax for both; an added revenue-based fee for LLCs'],
        ],
      },
    },
    {
      heading: 'The operating agreement is the document that matters',
      body: [
        'If owners remember one thing from this page, it should be this. Forming an entity with the Secretary of State creates the entity. It says nothing about who owns what, who decides what, or what happens when someone wants out. That is the operating agreement, or for a corporation the bylaws together with a shareholder agreement.',
        'Where no agreement exists, the Corporations Code supplies defaults. Those defaults are designed to be workable, not to reflect any particular deal, and they routinely produce results founders did not intend: equal voting regardless of contribution, unanimous consent for ordinary decisions, and no mechanism at all to force a buyout.',
        'The provisions worth arguing about are transfer restrictions, so an owner cannot sell to a stranger; buy-sell triggers covering death, disability, divorce, and voluntary departure, with a valuation method agreed in advance; vesting, so a founder who leaves in year one does not keep a full share; and a deadlock mechanism for a two-owner company where neither side can break a tie.',
      ],
    },
    {
      heading: 'Keeping the liability shield intact',
      body: [
        'The protection an entity provides is not automatic and not permanent. California courts will disregard it, holding owners personally liable, where the entity is treated as an extension of its owners and honoring the separation would be unjust. This is the alter ego doctrine, and it is asserted in a large share of lawsuits against closely held businesses.',
        'The factors that produce this result are mundane and avoidable: mixing personal and business funds, failing to keep records or hold required meetings, undercapitalizing the business, using the business to pay personal expenses, and failing to identify the entity when contracting. None of these individually decides the question, but together they build a picture.',
        'The defense is administrative hygiene. Separate accounts, documented decisions, current filings, signing in the entity\'s name and in a representative capacity, and adequate capitalization for the business being conducted.',
      ],
    },
    {
      heading: 'Issuing equity is a securities transaction',
      body: [
        'Selling an interest in a company, whether shares or LLC membership interests, is the sale of a security and is regulated at both the federal and California level. Private companies rely on exemptions rather than registration, and those exemptions carry conditions and, in California, a notice filing with a deadline.',
        'Founders commonly discover this after the fact, having already taken money from friends, family, or an angel investor. It is generally correctable, and it is meaningfully cheaper to handle at the time. A buyer or an institutional investor will look at the issuance history during diligence, and unresolved problems there can delay or reprice a transaction.',
      ],
    },
  ],
  questions: [
    {
      q: 'LLC or corporation: which is better in California?',
      a: 'It depends on who will own it and where the money comes from. An LLC offers flexible ownership, lighter formalities, and pass-through taxation, which suits most owner-operated businesses. A corporation suits companies planning to raise institutional capital or grant employee equity, because investors expect stock and a board. Both carry California\'s annual minimum franchise tax, and LLCs above a revenue threshold owe an additional fee.',
    },
    {
      q: 'Do I need an operating agreement for my California LLC?',
      a: 'Yes, in practice. Without one, the California Revised Uniform Limited Liability Company Act supplies default rules on voting, distributions, and departure, and those defaults rarely match what the owners intended. The operating agreement is where ownership percentages, control, transfer restrictions, buyout terms, and deadlock resolution are decided. A single-member LLC still benefits from one as evidence of separateness.',
    },
    {
      q: 'What does it cost to keep a business entity in California?',
      a: 'Beyond formation, California charges an annual minimum franchise tax on LLCs and corporations whether or not the business is profitable, and LLCs above a revenue threshold owe an additional fee based on California income. There are also periodic Statement of Information filings with the Secretary of State. Budget for these from the first year, since the franchise tax applies regardless of revenue.',
    },
    {
      q: 'Can I be held personally liable for my company\'s debts?',
      a: 'Yes, in several circumstances. If you personally guaranteed an obligation, the guarantee controls regardless of the entity. Separately, California courts may disregard the entity under the alter ego doctrine where owners mixed personal and business funds, ignored formalities, or undercapitalized the business. Certain tax and wage obligations can also reach owners and officers directly.',
    },
    {
      q: 'What is the difference between an asset sale and a stock sale?',
      a: 'In an asset sale the buyer purchases specified assets and assumes only agreed liabilities, which protects the buyer but often requires consents to assign contracts, leases, and licenses. In a stock or membership interest sale the buyer acquires the entity itself, with everything it owns and owes. The choice drives the tax outcome for both sides and is usually settled in the letter of intent.',
    },
  ],
  citations: [
    {
      label: 'California Secretary of State, business entities',
      url: 'https://www.sos.ca.gov/business-programs/business-entities',
      note: 'Formation filings, name availability, and Statement of Information requirements.',
    },
    {
      label: 'California Revised Uniform Limited Liability Company Act',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CORP&sectionNum=17701.01',
      note: 'The statute governing California LLCs, including default rules.',
    },
    {
      label: 'California General Corporation Law',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CORP&sectionNum=100',
      note: 'The statute governing California corporations.',
    },
    {
      label: 'California Franchise Tax Board, business entities',
      url: 'https://www.ftb.ca.gov/file/business/types/index.html',
      note: 'Current minimum franchise tax, LLC fee tiers, and filing obligations.',
    },
    {
      label: 'California Department of Financial Protection and Innovation',
      url: 'https://dfpi.ca.gov/securities/',
      note: 'California securities exemptions and notice filings for private offerings.',
    },
    {
      label: 'IRS, business structures',
      url: 'https://www.irs.gov/businesses/small-businesses-self-employed/business-structures',
      note: 'Federal tax classification and the S corporation election.',
    },
  ],
  verify: [
    'California minimum franchise tax amount and the LLC revenue-based fee tiers: this page states no figures by design. Confirm with the Franchise Tax Board before adding any.',
    'First-year franchise tax exemptions have been enacted and allowed to expire in recent years. Do not state a first-year rule without confirming current law.',
    'Federal beneficial ownership reporting (Corporate Transparency Act) changed substantially in 2025 and is not discussed on this page. Confirm the current requirement before adding a section.',
    'California securities notice filing deadline for the limited offering exemption: confirm with the DFPI before stating a specific period.',
  ],
  related: ['business-law', 'outside-general-counsel', 'civil-litigation'],
};
