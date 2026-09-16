import type { PracticeContent } from './types';

export const content: PracticeContent = {
  slug: 'wills-and-trusts',
  title: 'Wills & Trusts Attorney | Hickok & Kim — Los Angeles',
  description:
    "California wills, living trusts, and powers of attorney: how probate works and when a trust is worth it. Free consultation in Los Angeles.",
  h1: 'Wills, trusts, and <em>estate</em> planning',
  definition:
    'An estate plan is the set of documents that decides who receives your property when you die, who makes decisions for you if you cannot, and how much of that process your family has to take through court.',
  quickAnswer: [
    'In California the central question is usually probate. A will does not avoid probate; it gives the court instructions during it. A properly funded revocable living trust does avoid it, and because California sets attorney and executor compensation in probate as a percentage of the gross value of the estate, that difference is measured in real money for anyone who owns a home here.',
    'Hickok & Kim prepares wills, revocable living trusts, powers of attorney, and health care directives for individuals and families in Los Angeles and throughout California. Estate matters are handled by partner Daniel J. Kim, with consultations available in English and Korean. The firm works with first-time planners, parents naming guardians, and families who have discovered a problem after a death. Every matter begins with a free initial consultation.',
  ],
  services: [
    {
      title: 'Revocable living trusts',
      body: 'The core document for most California homeowners. We prepare the trust, and just as importantly we handle the funding, meaning the deed transferring real property into the trust and the retitling of accounts. An unfunded trust is the most common and most expensive error in California estate planning.',
    },
    {
      title: 'Wills, including guardianship for minor children',
      body: 'A will directs what happens to property that is not otherwise transferred, and for parents it is the document that nominates a guardian for minor children. That nomination is frequently the single most important reason a young family needs a plan at all.',
    },
    {
      title: 'Powers of attorney and health care directives',
      body: 'These handle incapacity rather than death, and they are what prevent a family from needing a conservatorship. A durable power of attorney covers financial decisions; an advance health care directive names who speaks for you medically and records your wishes.',
    },
    {
      title: 'Deeds and property transfers',
      body: 'Moving real property into a trust, between spouses, or to children requires the right deed and the right accompanying filings. Done carelessly, a transfer can trigger a property tax reassessment that costs a family far more than the planning did.',
    },
    {
      title: 'Plans for blended families and second marriages',
      body: 'California community property rules interact with children from a prior relationship in ways that surprise people. Without deliberate drafting, a surviving spouse can end up with more or less than the couple intended, and children from a first marriage can be unintentionally disinherited.',
    },
    {
      title: 'Trust administration and probate',
      body: 'When someone dies, we advise successor trustees on their duties, notices, and accounting obligations, and we handle probate where a trust was not in place or assets were left outside it.',
    },
  ],
  situations: [
    {
      title: 'You own a home in California and have no plan',
      body: 'This is the situation where a trust most reliably pays for itself. California real property generally has to go through probate unless it is held in a trust or passes by another mechanism, and probate on a Los Angeles home is expensive because compensation is calculated on the property\'s gross value, not on the owner\'s equity in it.',
    },
    {
      title: 'You have a trust but never transferred anything into it',
      body: 'A trust controls only the assets titled in its name. We see trusts signed years ago where the house was never deeded in, which means the estate goes through probate anyway. This is usually fixable while the client is alive, and much harder afterward.',
    },
    {
      title: 'You have young children',
      body: 'Nominating a guardian requires a will. Without one, the court selects from among those who come forward, without knowing what you would have wanted. This is the reason to plan even for people with modest assets.',
    },
    {
      title: 'A parent died and you do not know what to do',
      body: 'The first steps depend on whether there is a trust, a will, or neither, and on what the assets are and how they were titled. Some estates qualify for simplified procedures that avoid full probate. It is worth finding out before assuming a long court process is required.',
    },
    {
      title: 'A family member is being pressured about their estate',
      body: 'California law addresses undue influence and lack of capacity, and it treats certain transfers to caregivers and drafters with particular suspicion. Acting while the person is alive is far more effective than contesting a document afterward.',
    },
  ],
  sections: [
    {
      heading: 'Why probate matters so much in California',
      body: [
        'Probate is the court process that transfers a deceased person\'s property when it does not pass some other way. California is a comparatively expensive place to go through it, for a structural reason: the Probate Code sets compensation for both the estate attorney and the personal representative as a statutory percentage of the value of the estate.',
        'The percentages step down as the estate grows, but they are calculated on gross value rather than net. A home worth a million dollars with an eight hundred thousand dollar mortgage is counted at a million. Because both the attorney and the representative are entitled to the statutory amount, the total can be double what a single schedule suggests, and extraordinary services can be compensated on top of that.',
        'Time is the other cost. A California probate commonly runs from roughly nine months to well beyond a year, during which the estate\'s assets are not freely available to the family. Probate is also a public proceeding, so the inventory and the distributions become part of the court record.',
        'California does provide simplified procedures for smaller estates, including an affidavit process and a streamlined petition, with dollar thresholds that the Judicial Council adjusts periodically. Whether an estate qualifies depends on how assets are titled as much as on their total value.',
      ],
    },
    {
      heading: 'Will or trust: how to decide',
      body: [
        'A will is a set of instructions to the probate court. It names who receives what, names an executor, and for parents nominates a guardian. What it does not do is avoid probate. Property passing under a will generally goes through the court process described above.',
        'A revocable living trust holds title to assets during your life, with you as trustee, and passes them to a successor trustee on death without court involvement. It avoids probate for the assets it holds, keeps the arrangement private, and handles incapacity as well as death. It costs more to set up than a will and requires the additional step of funding.',
        'For most California homeowners the analysis is straightforward. If you own real property here, a trust is usually worth it. If your estate is modest and consists of accounts that pass by beneficiary designation, a will plus correctly named beneficiaries may be enough. Nearly everyone should have powers of attorney and a health care directive regardless.',
      ],
      table: {
        caption: 'What each document does',
        head: ['Document', 'What it handles'],
        rows: [
          ['Revocable living trust', 'Passes trust assets without probate; covers incapacity; stays private'],
          ['Will', 'Directs probate assets; nominates guardians for minor children'],
          ['Pour-over will', 'Catches assets left outside the trust and directs them into it'],
          ['Durable power of attorney', 'Financial decisions if you cannot make them'],
          ['Advance health care directive', 'Medical decisions and who speaks for you'],
        ],
      },
    },
    {
      heading: 'Funding the trust is the step people skip',
      body: [
        'A trust governs what it owns. Signing the document does not move anything into it. Real property requires a recorded deed transferring title to the trust. Bank and brokerage accounts require retitling with the institution. Assets left outside remain part of the probate estate.',
        'Some assets should stay out, and that is a deliberate choice rather than an oversight. Retirement accounts generally pass by beneficiary designation and naming a trust as beneficiary can have adverse tax effects. Life insurance passes by designation as well. What matters is that every asset has been considered and assigned a path.',
        'When assets are discovered outside a trust after death, California provides a petition to have them treated as trust property where the evidence shows that was the intent. It works, but it is a court proceeding, which is exactly what the trust was meant to avoid.',
      ],
    },
    {
      heading: 'California property tax and transfers to children',
      body: [
        'Californians often plan around property tax as much as around inheritance, because a long-held home may carry an assessed value far below its market value. A transfer to a child can trigger reassessment to current market value, raising the annual tax bill substantially.',
        'California voters narrowed the parent-to-child exclusion in 2020. The exclusion now applies principally where the property was the parent\'s primary residence and the child uses it as their own primary residence, and the protection is capped rather than unlimited. Transfers of rental or vacation property that were previously excluded generally are not any longer.',
        'The practical point is that the estate plan and the property tax consequence have to be designed together, and the analysis depends on facts specific to the family and the property. This page describes the general framework only.',
      ],
    },
  ],
  questions: [
    {
      q: 'Do I need a will or a trust in California?',
      a: 'If you own real property in California, a revocable living trust is usually worth it, because a will does not avoid probate and California calculates probate compensation on the gross value of the estate. If your estate is modest and consists of accounts passing by beneficiary designation, a will may suffice. Parents of minor children need a will regardless, because that is where a guardian is nominated.',
    },
    {
      q: 'How much does probate cost in California?',
      a: 'California sets compensation by statute as a percentage of the gross value of the estate, stepping down as value rises, and both the estate attorney and the personal representative are entitled to that amount. It is calculated on gross value, so a mortgage does not reduce it, and the court may award more for extraordinary services. Current percentages are in Probate Code sections 10800 and 10810.',
    },
    {
      q: 'How long does probate take in California?',
      a: 'Commonly around nine months to more than a year, and longer where the estate is contested, includes hard-to-value assets, or sits in a congested court. A statutory creditor claim period runs during the process. Smaller estates may qualify for simplified procedures that finish considerably faster.',
    },
    {
      q: 'What happens if I die without a will in California?',
      a: 'California\'s intestate succession rules decide who inherits, and they distinguish between community property and separate property. Community property generally passes to the surviving spouse, while separate property is divided among the spouse and children or other relatives depending on who survives. The court also selects the administrator and, if there are minor children, the guardian.',
    },
    {
      q: 'Is a handwritten will valid in California?',
      a: 'Yes, California recognizes holographic wills where the material provisions and the signature are in the testator\'s own handwriting, and no witnesses are required. That said, they generate disputes over intent, capacity, and whether later documents revoked them, and they frequently omit provisions that make administration workable. They are a fallback, not a plan.',
    },
  ],
  citations: [
    {
      label: 'California Probate Code section 10810',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=10810',
      note: 'The statutory fee schedule for attorneys in California probate.',
    },
    {
      label: 'California Probate Code section 10800',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=10800',
      note: 'Compensation for the personal representative, on the same schedule.',
    },
    {
      label: 'California Probate Code section 6110',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=6110',
      note: 'Execution requirements for a valid California will.',
    },
    {
      label: 'California Probate Code section 6400',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PROB&sectionNum=6400',
      note: 'Intestate succession: who inherits when there is no will.',
    },
    {
      label: 'California Courts self-help, wills and estates',
      url: 'https://selfhelp.courts.ca.gov/wills-estates',
      note: 'Judicial Council guidance on probate, small estates, and required forms.',
    },
    {
      label: 'California State Board of Equalization, Proposition 19',
      url: 'https://www.boe.ca.gov/prop19/',
      note: 'How parent-to-child transfers affect property tax assessment.',
    },
  ],
  verify: [
    'Small estate affidavit and simplified petition thresholds adjust periodically (April 1 in adjustment years) and a separate primary-residence threshold was added effective April 1, 2025. This page states no figures by design; confirm with the Judicial Council before adding any.',
    'Probate Code sections 10800 and 10810 percentages are stable but should be confirmed; the page deliberately describes the structure without reproducing the schedule.',
    'Federal estate tax exemption changes annually and faces a scheduled sunset. Not discussed on this page; confirm before adding.',
    'Proposition 19 exclusion cap amount adjusts for inflation. This page states no figure.',
  ],
  related: ['real-estate-law', 'civil-litigation', 'personal-injury'],
};
