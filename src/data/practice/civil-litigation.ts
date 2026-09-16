import type { PracticeContent } from './types';

export const content: PracticeContent = {
  slug: 'civil-litigation',
  title: 'Civil Litigation Attorney | Hickok & Kim — Los Angeles',
  description:
    "Contract, business, and property disputes in California courts. Deadlines, cost, and alternatives to trial. Free consultation in Los Angeles.",
  h1: 'Civil litigation and business <em>disputes</em>',
  definition:
    'Civil litigation is the process of resolving a non-criminal dispute through the courts, from the first demand letter through trial and any appeal.',
  quickAnswer: [
    'Most civil disputes in California never reach a trial. They resolve through negotiation, mediation, or a motion that decides the case early. What determines the outcome is usually the work done in the first few months: whether the claim was filed within the deadline, whether the evidence was preserved, and whether the theory of the case was chosen well.',
    'Hickok & Kim represents plaintiffs and defendants in California state and federal courts in contract disputes, business and partnership breakups, and property claims. Litigation is led by partner Daniel J. Kim, who is admitted in California and before the United States District Court for the Central District of California, with consultations available in English and Korean. Every matter begins with a free initial consultation and a candid assessment of whether litigating is worth it.',
  ],
  services: [
    {
      title: 'Assessment before you commit',
      body: 'The first question is not whether you are right, it is whether suing is the best available move. We look at the strength of the claim, whether the other side can actually pay a judgment, whether a contract shifts attorney fees, and what the realistic cost and timeline are, and we will tell you when the answer is to negotiate or walk away.',
    },
    {
      title: 'Demand letters and pre-suit negotiation',
      body: 'A well-constructed demand letter resolves a meaningful share of disputes without a filing fee. It also creates a record, and in contract matters it can start interest running and satisfy notice provisions that a later lawsuit will depend on.',
    },
    {
      title: 'Filing and defending lawsuits',
      body: 'We draft complaints that survive the challenges defendants routinely bring, and on the defense side we use those same tools: demurrers, motions to strike, and where a case targets protected speech or petitioning, California\'s anti-SLAPP motion, which can end a case early and shift fees.',
    },
    {
      title: 'Discovery',
      body: 'Discovery is where most cases are actually decided and where most of the budget goes. We use written discovery and depositions to build the record the case needs, resist the overbroad demands that drive up cost, and bring motions to compel when the other side stonewalls.',
    },
    {
      title: 'Mediation and settlement',
      body: 'California courts push cases toward mediation, and a mediation that is prepared for works far better than one attended out of obligation. We prepare the brief, the exhibits, and the negotiating range in advance, and we tell clients honestly when an offer on the table is better than the likely trial outcome after costs.',
    },
    {
      title: 'Trial and enforcement',
      body: 'When a case has to be tried, it is tried. And winning is not the end: a judgment is only worth what can be collected, so we pursue enforcement through examinations, liens, levies, and wage garnishment where appropriate.',
    },
  ],
  situations: [
    {
      title: 'A customer or client will not pay',
      body: 'The collection path depends on the paper. A signed written agreement with an attorney-fee clause is a materially stronger position than an invoice and an email chain, and it changes what a demand letter can credibly threaten. The amount also determines the forum, since smaller claims have faster and cheaper options.',
    },
    {
      title: 'Your business partner is freezing you out',
      body: 'Partnership and shareholder disputes carry rights that ordinary contract disputes do not, including access to books and records and fiduciary duties owed by the person in control. Those rights are often the fastest leverage available, well before any claim for damages is resolved.',
    },
    {
      title: 'You have been served with a lawsuit',
      body: 'The response deadline is short and a default judgment is much harder to undo than it is to avoid. Before responding, check whether your insurance may cover the defense, because many business and liability policies include a duty to defend that people fail to invoke.',
    },
    {
      title: 'The other side is threatening to sue over something you said',
      body: 'If the claim targets speech, a review, or participation in a government or legal process, California\'s anti-SLAPP statute may allow an early motion that ends the case and shifts fees to the person who filed it. This has to be raised quickly.',
    },
    {
      title: 'You won and they will not pay',
      body: 'A judgment is a collection project. California gives judgment creditors real tools, including debtor examinations, liens on real property, and levies on bank accounts, and judgments last ten years and can be renewed.',
    },
  ],
  sections: [
    {
      heading: 'Deadlines for filing a civil claim in California',
      body: [
        'The limitations period depends on the kind of claim, not on how serious it feels. A claim on a written contract generally runs four years from the breach under Code of Civil Procedure section 337. An oral contract runs two years under section 339. Fraud runs three years, and runs from when the fraud was or should have been discovered rather than from when it happened.',
        'Two practical points. First, the clock usually starts at the breach rather than at the moment the relationship finally broke down, which can be much earlier than clients expect. Second, contracts themselves sometimes shorten the period by agreement, and notice provisions inside a contract can create their own earlier deadlines that have nothing to do with the statute.',
      ],
      table: {
        caption: 'Common California civil limitations periods',
        head: ['Claim', 'General deadline'],
        rows: [
          ['Breach of written contract', 'Four years from the breach'],
          ['Breach of oral contract', 'Two years from the breach'],
          ['Fraud or mistake', 'Three years from discovery'],
          ['Damage to property', 'Three years'],
          ['Enforcing a money judgment', 'Ten years, renewable'],
        ],
      },
    },
    {
      heading: 'Which court a dispute belongs in',
      body: [
        'California superior courts divide civil cases by amount. Small claims is the fastest and cheapest forum, has a low dollar ceiling, and generally does not permit lawyers to appear for the parties at the hearing. Limited civil cases sit in a middle tier with streamlined procedures and restricted discovery. Unlimited civil cases carry the full procedural apparatus and the full cost that comes with it.',
        'Federal court is a separate question. A case belongs there only if it raises a federal claim or if the parties are citizens of different states and enough money is at stake. Some disputes can be filed in either system, and the choice has real consequences for timing, jury pool, and procedure.',
        'Many contracts remove the choice entirely by requiring arbitration, sometimes in a specified city and under specified rules. That clause is usually enforced, so it is worth reading before a dispute arises rather than after.',
      ],
    },
    {
      heading: 'Mediation, arbitration, and litigation compared',
      body: [
        'These three get grouped together as ways to resolve a dispute, and they work very differently. Mediation is a negotiation with a neutral facilitator who has no power to decide anything; it only resolves the dispute if both sides agree. It is fast, relatively cheap, confidential, and non-binding until a settlement is signed.',
        'Arbitration is a private adjudication. An arbitrator hears evidence and issues a binding award, usually with very limited grounds for appeal. It is typically faster than court and its outcome is final in a way a trial verdict is not, but the parties pay the arbitrator, discovery is usually narrower, and the finality cuts both ways.',
        'Litigation is the public court process. It is slower and more expensive than either alternative, but it offers full discovery, the possibility of a jury, meaningful appellate review, and the coercive tools of the court. Most California cases in fact combine these: a lawsuit is filed, mediation happens during it, and the case settles before trial.',
      ],
      table: {
        caption: 'Choosing among the three',
        head: ['Process', 'Best when'],
        rows: [
          ['Mediation', 'Both sides want resolution and the relationship or confidentiality matters'],
          ['Arbitration', 'A contract requires it, or speed and finality outweigh appeal rights'],
          ['Litigation', 'You need discovery, a public record, or the leverage of the court'],
        ],
      },
    },
    {
      heading: 'What litigation costs, and who pays the lawyers',
      body: [
        'California follows the American rule: each side pays its own attorney fees unless a statute or a contract says otherwise. This single fact drives more settlement decisions than any other, because a claim worth less than the cost of pursuing it is not economically worth pursuing no matter how strong it is.',
        'The important exception is contractual. Civil Code section 1717 makes a one-sided attorney-fee clause in a contract mutual, so that whichever party prevails can recover fees. An attorney-fee provision changes the economics of a dispute completely, and it is worth knowing whether your agreement has one before you decide how to proceed.',
        'Litigation at Hickok & Kim is billed hourly or, where the matter suits it, at a flat fee for a defined phase, with the structure agreed in writing before work begins and invoices itemized. Contingency arrangements are generally limited to personal injury matters.',
      ],
    },
  ],
  questions: [
    {
      q: 'How long do I have to sue for breach of contract in California?',
      a: 'Four years from the breach for a written contract and two years for an oral one, under Code of Civil Procedure sections 337 and 339. The clock generally starts when the breach occurred, not when the relationship ended. Contracts can also shorten the period by agreement or impose their own notice deadlines, so read the agreement before relying on the statutory period.',
    },
    {
      q: 'Should I mediate, arbitrate, or go to court?',
      a: 'Often the contract decides for you, since an arbitration clause is usually enforced. Where you have a choice, mediation suits disputes where both sides want resolution and confidentiality matters, arbitration suits parties who value speed and finality over appeal rights, and litigation suits cases needing full discovery, a public record, or the court\'s enforcement power.',
    },
    {
      q: 'Who pays attorney fees in a California lawsuit?',
      a: 'Each side pays its own unless a statute or a contract provides otherwise. The most common exception is an attorney-fee clause in the contract being sued on, and Civil Code section 1717 makes such a clause mutual even if it was written to favor one side. Whether your agreement contains one materially changes the economics of the dispute.',
    },
    {
      q: 'How long does a civil lawsuit take in California?',
      a: 'An unlimited civil case in a busy county commonly takes one to two years to reach trial, and longer where the court\'s calendar is congested. Cases resolved by motion or settlement finish sooner, and limited civil and small claims move considerably faster. Nobody can promise a timeline, because the court\'s schedule is outside any party\'s control.',
    },
    {
      q: 'What happens if I ignore a lawsuit?',
      a: 'The other side can take your default and obtain a judgment without your participation, which they can then enforce against your bank accounts, wages, and property. Setting aside a default is possible in limited circumstances but is far harder than responding on time. If you have been served, note the response deadline immediately and check whether insurance may cover your defense.',
    },
  ],
  citations: [
    {
      label: 'Code of Civil Procedure section 337',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=337',
      note: 'The four-year limitations period for written contracts.',
    },
    {
      label: 'Code of Civil Procedure section 339',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=339',
      note: 'The two-year period for oral contracts.',
    },
    {
      label: 'Code of Civil Procedure section 425.16',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=425.16',
      note: 'California\'s anti-SLAPP statute and its fee-shifting provision.',
    },
    {
      label: 'Civil Code section 1717',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1717',
      note: 'Makes contractual attorney-fee clauses reciprocal.',
    },
    {
      label: 'California Courts self-help, civil lawsuits',
      url: 'https://selfhelp.courts.ca.gov/civil-lawsuit',
      note: 'Judicial Council guidance on filing, responding, and deadlines.',
    },
    {
      label: 'Los Angeles Superior Court, civil division',
      url: 'https://www.lacourt.org/division/civil/civil.aspx',
      note: 'Local rules, filing procedures, and courthouse assignments.',
    },
  ],
  verify: [
    'Small claims and limited civil dollar thresholds were raised effective January 1, 2024 and are subject to further legislative change. This page deliberately states no figures; confirm before adding them.',
    'Typical time to trial in Los Angeles Superior Court varies by courthouse and year. The page says "one to two years"; sanity-check at each quarterly review.',
  ],
  related: ['personal-injury', 'business-law', 'real-estate-law'],
};
