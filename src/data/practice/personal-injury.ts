import type { PracticeContent } from './types';

export const content: PracticeContent = {
  slug: 'personal-injury',
  title: 'Personal Injury Lawyer | Hickok & Kim — Los Angeles',
  description:
    "California personal injury claims: filing deadlines, comparative fault, and how contingency fees work. Free consultation in Los Angeles.",
  h1: 'Personal injury claims in <em>California</em>',
  definition:
    'A personal injury claim is a civil demand for compensation by someone who was hurt because another person or business failed to use reasonable care.',
  quickAnswer: [
    'In California you generally have two years from the date of an injury to file a personal injury lawsuit, and far less time when the party at fault is a government entity. Missing the deadline ends the claim regardless of how strong it is, which is why the date of the injury is the first thing any lawyer will ask you.',
    'At Hickok & Kim, personal injury matters are handled by partner Daniel J. Kim on a contingency fee, meaning there is no fee unless there is a recovery. The firm represents injured people in Los Angeles and across California in vehicle collisions, pedestrian and bicycle injuries, premises injuries, and disputes with insurers, and consultations are available in English and Korean. Every matter begins with a free consultation, and the fee is set by written agreement before any work starts.',
  ],
  services: [
    {
      title: 'Investigating what happened and who is responsible',
      body: 'Evidence degrades quickly. We obtain the traffic collision report, locate and preserve surveillance footage before it is overwritten, identify witnesses, and where the facts warrant it bring in accident reconstruction. Identifying every responsible party matters as much as proving fault, because it determines how much insurance coverage is available.',
    },
    {
      title: 'Dealing with the insurance companies',
      body: 'You are not required to give a recorded statement to the other driver\'s insurer, and early offers frequently arrive before anyone knows the full extent of an injury. We handle the communications, present the claim with the medical documentation that supports it, and negotiate from a position that accounts for future treatment rather than only what has happened so far.',
    },
    {
      title: 'Coordinating medical treatment and records',
      body: 'Gaps in treatment are the single most common way a legitimate claim gets devalued. We help make sure treatment is documented, obtain the records and billing, and work with providers who will treat on a lien where a client has no health coverage.',
    },
    {
      title: 'Resolving liens and reimbursement claims',
      body: 'Health insurers, Medi-Cal, Medicare, and medical providers may all assert a right to be repaid out of a settlement. These claims are frequently reducible, and negotiating them is part of the work, because what matters is the net amount reaching the client, not the headline number.',
    },
    {
      title: 'Filing suit and litigating when necessary',
      body: 'Most claims resolve without trial, but the ones that resolve well are prepared as though they will not. We file within the deadline, conduct discovery, take and defend depositions, oppose the defense motions that routinely follow, and try the case when the offer does not reflect it.',
    },
    {
      title: 'Uninsured and underinsured motorist claims',
      body: 'When the at-fault driver has no insurance or not enough, the claim may run against your own policy instead. These are contract claims against your insurer with their own notice requirements and often an arbitration clause, and they are easy to forfeit by accepting the other driver\'s settlement without consent.',
    },
  ],
  situations: [
    {
      title: 'The insurance adjuster is asking for a recorded statement',
      body: 'You are not obligated to give one to the other side\'s insurer, and the questions are designed around fault and the severity of your injuries. It is reasonable to say you will respond once you have spoken to a lawyer. Your own insurer is different: your policy usually requires cooperation.',
    },
    {
      title: 'They offered you a settlement in the first week',
      body: 'Early offers arrive before anyone knows how an injury will heal. A settlement is final, and if the injury turns out to need surgery, there is no reopening it. The question is not whether the number sounds large, it is whether it accounts for treatment that has not happened yet.',
    },
    {
      title: 'You were partly at fault',
      body: 'California uses pure comparative fault, so being partly responsible reduces your recovery by your share of fault, but it does not bar the claim. Insurers routinely assert a larger share of fault than the evidence supports, because every percentage point reduces what they pay.',
    },
    {
      title: 'The injury happened on public property or involved a city vehicle',
      body: 'Claims against government entities run on a much shorter clock than ordinary claims, and the first step is an administrative claim rather than a lawsuit. This is the deadline that catches people most often, and it can expire before someone has finished treatment.',
    },
    {
      title: 'You have no health insurance and are avoiding treatment',
      body: 'Untreated injuries hurt both your recovery and your claim. Providers who treat on a lien, meaning payment comes out of the eventual settlement, are available in most of these cases.',
    },
  ],
  sections: [
    {
      heading: 'California deadlines for filing an injury claim',
      body: [
        'California\'s general deadline for personal injury is two years from the date of injury, set by Code of Civil Procedure section 335.1. That two-year rule is the starting point, not the whole answer, because several categories run on different clocks and one of them is dramatically shorter.',
        'Claims against a public entity, meaning a city, county, school district, transit agency, or the state, require an administrative claim filed within six months of the injury under Government Code section 911.2. Only after that claim is acted on or rejected does a lawsuit become available, and the window to file suit after a rejection is itself short. A pedestrian injured by a dangerous condition on a city sidewalk is on this clock, not the two-year one.',
        'Medical malpractice has its own rule under Code of Civil Procedure section 340.5, running one year from when the injury was discovered or should have been discovered, and in no event more than three years from the injury itself, with limited exceptions. Claims for damage to property rather than to a person generally run three years.',
        'Deadlines can be extended in specific circumstances. The most common is that the clock for a child generally does not start until they turn eighteen, though the shorter government-claim requirements are not suspended the same way. Because the exceptions are narrow and fact-specific, treat the earliest possible deadline as the real one.',
      ],
      table: {
        caption: 'Common California filing deadlines for injury claims',
        head: ['Type of claim', 'General deadline'],
        rows: [
          ['Personal injury', 'Two years from the date of injury'],
          ['Claim against a government entity', 'Administrative claim within six months'],
          ['Medical malpractice', 'One year from discovery, three years from injury at the outside'],
          ['Property damage', 'Three years'],
          ['Injury to a minor', 'Generally tolled until the child turns eighteen'],
        ],
      },
    },
    {
      heading: 'How contingency fees work in California',
      body: [
        'A contingency fee means the attorney is paid a percentage of what is recovered and is paid nothing if there is no recovery. California regulates these agreements directly. Business and Professions Code section 6147 requires the agreement to be in writing, requires the client to receive a fully executed duplicate copy, and requires the agreement to state that the fee is not set by law and is negotiable between attorney and client.',
        'Costs are separate from the fee and this distinction matters. Filing fees, deposition transcripts, record retrieval, and expert witnesses are case expenses. Depending on the agreement, a client may be responsible for some costs even where there is no recovery, and the written agreement is what governs. Read that section, and ask about it during the consultation.',
        'At Hickok & Kim, personal injury matters are handled on contingency and the fee structure is set out in writing before any work begins. No lawyer can promise a particular result, and any percentage or dollar figure discussed at the outset is an estimate of structure, not a prediction of outcome.',
      ],
    },
    {
      heading: 'What a California injury claim is actually worth',
      body: [
        'Compensation divides into two categories. Economic damages cover measurable losses: medical treatment, future medical care, lost earnings, and lost earning capacity. Noneconomic damages cover the things without a receipt, principally pain, suffering, and the loss of activities a person can no longer do.',
        'Three factors reduce the theoretical value of almost every claim. The first is available insurance, which in practice caps most recoveries regardless of the severity of the injury. The second is comparative fault, since any share of fault attributed to the injured person reduces the award proportionally. The third is liens and reimbursement rights, which come out of the recovery before the client sees it.',
        'Anyone who gives you a number before reviewing the medical records, the police report, and the applicable policy limits is guessing. A responsible answer to "what is my case worth" usually arrives well into the case, not during the first call.',
      ],
    },
    {
      heading: 'Working with an injury lawyer in Los Angeles',
      body: [
        'Los Angeles County has the largest civil caseload in California, and cases here move on the court\'s timetable rather than anyone\'s preference. That reality argues for starting early, preserving evidence immediately, and treating the filing deadline as the hard constraint it is.',
        'Hickok & Kim is a two-partner firm, which means the partner you speak to at the consultation is the one handling the matter. Daniel Kim is admitted in California and before the United States District Court for the Central District of California, and handles consultations and cases in English and Korean.',
      ],
    },
  ],
  questions: [
    {
      q: 'How long do I have to file a personal injury claim in California?',
      a: 'Generally two years from the date of the injury under Code of Civil Procedure section 335.1. If a government entity is responsible, you must file an administrative claim within six months instead, which is a much shorter deadline that catches many people. Medical malpractice runs one year from discovery and three years from the injury at the outside. Missing the deadline ends the claim.',
    },
    {
      q: 'What should I do after a car accident in Los Angeles?',
      a: 'Get medical attention even if you feel able to walk away, since some injuries present later. Report the collision and obtain the report number, photograph the vehicles, the scene, and any visible injuries, and get contact details for witnesses. Notify your own insurer. Decline to give a recorded statement to the other driver\'s insurer until you have spoken to a lawyer.',
    },
    {
      q: 'Can I still recover if the accident was partly my fault?',
      a: 'Yes. California follows pure comparative fault, so your recovery is reduced by your percentage of responsibility but is not eliminated. Someone found twenty percent at fault recovers eighty percent of their damages. There is no threshold at which fault bars a claim entirely, which differs from many other states.',
    },
    {
      q: 'How much does a personal injury lawyer cost?',
      a: 'Personal injury is typically handled on a contingency fee, meaning the attorney receives a percentage of any recovery and nothing if there is no recovery. California requires that agreement to be in writing, that you receive a copy, and that it state the fee is negotiable and not set by law. Case costs are separate from the fee, so ask how costs are handled.',
    },
    {
      q: 'Do I have to go to court for a personal injury case?',
      a: 'Most claims resolve through negotiation or mediation without a trial, and many resolve before a lawsuit is filed. That said, cases that settle on good terms are usually the ones prepared as though they will be tried, and filing suit is sometimes what moves an insurer. Nobody can promise a case will settle.',
    },
  ],
  citations: [
    {
      label: 'Code of Civil Procedure section 335.1',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=335.1',
      note: 'The two-year deadline for personal injury actions in California.',
    },
    {
      label: 'Government Code section 911.2',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=911.2',
      note: 'The six-month claim requirement for claims against public entities.',
    },
    {
      label: 'Code of Civil Procedure section 340.5',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=340.5',
      note: 'The medical malpractice limitations period.',
    },
    {
      label: 'Business and Professions Code section 6147',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=6147',
      note: 'What California requires in a written contingency fee agreement.',
    },
    {
      label: 'California Courts self-help, civil lawsuits',
      url: 'https://selfhelp.courts.ca.gov/civil-lawsuit',
      note: 'The Judicial Council\'s plain-language guide to the civil process.',
    },
    {
      label: 'California Department of Insurance',
      url: 'https://www.insurance.ca.gov/01-consumers/',
      note: 'Consumer information on auto coverage and complaints against insurers.',
    },
  ],
  compliance:
    'No lawyer can guarantee the result of a claim, and prior results do not guarantee a similar outcome. Fees in contingency matters are set by written agreement, are not fixed by law, and are negotiable. Case costs are separate from attorney fees, and depending on the agreement a client may owe costs even where there is no recovery. Nothing on this page is legal advice about your situation, and the deadlines described here have exceptions that can only be assessed on your facts.',
  verify: [
    'MICRA noneconomic damage caps in medical malpractice increase annually under AB 35 (2022). This page deliberately states no cap figure. Confirm before adding one.',
    'California minimum auto liability limits increased effective January 1, 2025. This page states no figures; confirm current minimums with the Department of Insurance before adding them.',
    'Deadline table is a summary and omits exceptions (delayed discovery, tolling, defendant absent from the state). Confirm the compliance note adequately signals this for California advertising purposes.',
  ],
  related: ['civil-litigation', 'real-estate-law', 'wills-and-trusts'],
};
