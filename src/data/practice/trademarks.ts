import type { PracticeContent } from './types';

export const content: PracticeContent = {
  slug: 'trademarks',
  title: 'Trademark Attorney | Hickok & Kim — Los Angeles',
  description:
    "Trademark clearance, USPTO registration, California state registration, and enforcement for Los Angeles businesses. Free consultation.",
  h1: 'Trademarks and <em>brand</em> protection',
  definition:
    'A trademark is any word, phrase, symbol, or design that identifies the source of goods or services and distinguishes them from someone else\'s.',
  quickAnswer: [
    'In the United States, trademark rights come from using a mark in commerce, not from registering it. Registration is what makes those rights practical to enforce: a federal registration with the United States Patent and Trademark Office gives nationwide notice, a legal presumption that you own a valid mark, and access to federal court.',
    'Hickok & Kim handles trademark clearance, federal and California registration, licensing, and enforcement for businesses in Los Angeles and throughout California. Trademark matters are led by partner Christopher D. Hickok. The firm works with founders naming a company for the first time, established businesses expanding into new product lines, and owners who have discovered someone else using their name. Every matter begins with a free initial consultation.',
  ],
  services: [
    {
      title: 'Clearance searches before you commit to a name',
      body: 'A search done before the logo, the packaging, and the signage is the cheapest part of the whole process. We look beyond identical matches to the confusingly similar marks that actually cause refusals, check common-law and state uses that never appear in the federal register, and tell you plainly whether a name is worth building on.',
    },
    {
      title: 'Federal registration with the USPTO',
      body: 'We prepare and file the application, choose the filing basis and the classes of goods and services, draft the description so it covers what you actually sell without inviting a refusal, submit specimens showing real use, and handle the examining attorney\'s office actions through to registration.',
    },
    {
      title: 'Responding to refusals',
      body: 'Most applications receive at least one office action. The two common grounds are likelihood of confusion with an existing mark and mere descriptiveness. Both are arguable, and both have strategic responses beyond argument, including amending the description, disclaiming a component, or seeking registration on the Supplemental Register.',
    },
    {
      title: 'California state registration',
      body: 'California registers marks used within the state through the Secretary of State. State registration is narrower than federal, but it is faster and cheaper, and it is the primary option for businesses whose goods cannot be registered federally, which includes most plant-touching cannabis products.',
    },
    {
      title: 'Licensing and coexistence agreements',
      body: 'Letting someone else use your mark without a written license that controls quality can weaken or forfeit your rights. We draft trademark licenses, coexistence agreements that let two similar marks live in separate lanes, and the trademark provisions inside franchise, distribution, and manufacturing deals.',
    },
    {
      title: 'Enforcement and defense',
      body: 'We send and respond to cease-and-desist letters, file and defend oppositions and cancellations before the Trademark Trial and Appeal Board, pursue takedowns with online marketplaces and platforms, and litigate infringement when a letter is not enough.',
    },
  ],
  situations: [
    {
      title: 'You just got a cease-and-desist letter about your business name',
      body: 'Do not ignore it and do not immediately capitulate. The sender\'s rights may be narrower than the letter claims, their registration may be vulnerable, and your own earlier use may give you priority. There is also usually a negotiated outcome, such as a coexistence agreement, that costs far less than either litigation or rebranding.',
    },
    {
      title: 'Your application was refused for likelihood of confusion',
      body: 'A refusal is the beginning of a conversation with the examining attorney, not the end of the application. The response can argue the marks and goods are distinguishable, narrow the description to move away from the cited mark, or address the cited registration directly.',
    },
    {
      title: 'You registered an LLC name and assumed that protected it',
      body: 'It does not. Forming an entity with the Secretary of State means no other California entity may register that exact name. It says nothing about whether you may use the name as a brand, and it does not stop anyone from using a similar mark.',
    },
    {
      title: 'Someone is selling counterfeits of your product online',
      body: 'Marketplace takedown programs generally work quickly, and most of them require a federal registration to participate. If you do not have one yet, that is usually the first step, alongside platform reports based on the rights you do have.',
    },
    {
      title: 'You are about to launch and have not searched the name',
      body: 'This is the moment when the advice is cheapest and most useful. A week of clearance work before launch routinely prevents a rebrand that would cost months.',
    },
  ],
  sections: [
    {
      heading: 'Trademark versus trade name, and why the difference matters',
      body: [
        'These get used interchangeably and they are not the same thing. A trade name is what a business calls itself. A trademark is what identifies the source of the goods or services it sells. One business can have a trade name and no trademark, or several trademarks and a trade name none of its customers ever see.',
        'Filing a fictitious business name statement with a county clerk, which California requires when a business operates under a name other than the owner\'s legal name, creates no trademark rights. Neither does registering an entity name with the Secretary of State. Both are administrative registers. Neither one grants the exclusive right to use a name as a brand, and neither will stop a competitor.',
        'The practical consequence is that a business can be fully compliant on paper, with a filed fictitious business name and a registered entity, and still be infringing someone else\'s trademark, or still have no ability to stop a copycat. The trademark question has to be asked separately.',
      ],
    },
    {
      heading: 'What makes a mark strong or weak',
      body: [
        'Trademark law sorts marks along a spectrum of distinctiveness, and where a name lands on that spectrum determines how hard it is to register and how much protection it earns. Founders often choose names at the weak end because they describe the product clearly, which is exactly the property that makes them hard to protect.',
        'Descriptive marks can sometimes be registered after years of use, by showing that consumers have come to associate the term with a single source. That is a slow and evidence-heavy path. Choosing a suggestive or arbitrary name at the outset avoids it entirely.',
      ],
      table: {
        caption: 'The distinctiveness spectrum, strongest first',
        head: ['Category', 'What it means'],
        rows: [
          ['Fanciful', 'An invented word with no prior meaning. Strongest protection.'],
          ['Arbitrary', 'A real word unrelated to the goods, like a fruit name on a computer.'],
          ['Suggestive', 'Hints at a quality without describing it; requires imagination.'],
          ['Descriptive', 'Describes the goods directly. Registrable only with acquired distinctiveness.'],
          ['Generic', 'The common name for the thing itself. Never protectable.'],
        ],
      },
    },
    {
      heading: 'What the registration process looks like',
      body: [
        'After filing, the application waits in a queue before an examining attorney reviews it. The examiner checks the application formalities, the description of goods and services, the specimens, and whether the mark conflicts with an existing registration or is barred on other grounds. If there is a problem, the examiner issues an office action, and the applicant has a set period to respond.',
        'Once the examiner approves the mark it is published so that anyone who believes they would be harmed by the registration can oppose it. If nobody opposes, a use-based application proceeds to registration. An application filed on an intent-to-use basis instead receives a notice of allowance, and the applicant must then show actual use in commerce before the registration issues.',
        'Registration is not permanent unless it is maintained. A declaration showing continued use is due between the fifth and sixth year after registration, and the registration must then be renewed at ten-year intervals, with proof of use each time. Missing a maintenance deadline cancels the registration.',
      ],
    },
    {
      heading: 'California registration and the cannabis exception',
      body: [
        'California maintains its own trademark register through the Secretary of State for marks used within the state. It is a meaningful option in two situations: when a business operates only in California and wants protection quickly, and when federal registration is unavailable.',
        'The second case is the important one for this firm. The Patent and Trademark Office requires that use of a mark in commerce be lawful under federal law, and cannabis remains federally controlled. That closes federal registration to most plant-touching cannabis goods. California registration remains available for goods lawfully sold under state law, and federal registration often remains available for genuinely lawful ancillary goods and services.',
        'At Hickok & Kim, the same partner handles both trademarks and cannabis law, which is why brand strategy for licensed operators tends to get built as a single plan rather than two disconnected ones.',
      ],
    },
  ],
  questions: [
    {
      q: 'How long does it take to register a trademark?',
      a: 'Plan on roughly a year to a year and a half from filing to registration for a straightforward application, longer if the examining attorney issues a refusal or someone opposes the mark. The initial examination is the longest single wait. An intent-to-use application takes longer still, because the registration cannot issue until you show actual use in commerce.',
    },
    {
      q: 'Do I need a trademark if I already registered my LLC name?',
      a: 'Yes, they are unrelated. Registering an entity name with the California Secretary of State only prevents another California entity from registering that exact name. It does not give you the right to use the name as a brand, does not stop competitors from using a similar mark, and is not a defense if someone else already holds trademark rights in it.',
    },
    {
      q: 'What is the difference between TM and the R symbol?',
      a: 'TM can be used by anyone claiming rights in a mark, registered or not, and carries no legal requirement. The R in a circle may only be used with a mark that is federally registered with the United States Patent and Trademark Office. Using the R symbol before registration issues is improper and can harm your application or your enforcement position.',
    },
    {
      q: 'Can I register a trademark myself without a lawyer?',
      a: 'You can file your own application. The risk is not the filing, it is the choices inside it: the description of goods and services, the filing basis, and the specimen. Those choices determine the scope of your protection and are difficult to fix later, and a description that is too broad or too narrow is a common reason applications fail or registrations prove useless.',
    },
    {
      q: 'What should I do if someone is using my business name?',
      a: 'Document their use and the dates, then establish whose rights came first, since in the United States priority usually goes to the first user rather than the first filer. Do not send a demand letter before you know the answer. If you have priority, the options range from a coexistence agreement through a cease-and-desist letter to an infringement action.',
    },
  ],
  citations: [
    {
      label: 'United States Patent and Trademark Office, trademark basics',
      url: 'https://www.uspto.gov/trademarks/basics',
      note: 'The official overview of what a trademark is and how registration works.',
    },
    {
      label: 'USPTO Trademark Manual of Examining Procedure',
      url: 'https://tmep.uspto.gov/',
      note: 'The manual examining attorneys apply, including refusal grounds.',
    },
    {
      label: 'USPTO fee schedule',
      url: 'https://www.uspto.gov/learning-and-resources/fees-and-payment/uspto-fee-schedule',
      note: 'Current filing and maintenance fees, which change periodically.',
    },
    {
      label: 'California Secretary of State trademarks and service marks',
      url: 'https://www.sos.ca.gov/business-programs/ts/',
      note: 'California state registration, forms, and searchable register.',
    },
    {
      label: 'California Business and Professions Code section 14200',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=14200',
      note: 'The state trademark statute and its definitions.',
    },
    {
      label: 'California fictitious business names, Business and Professions Code section 17900',
      url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=17900',
      note: 'The trade name filing requirement, which is separate from trademark rights.',
    },
  ],
  verify: [
    'USPTO fee structure changed in January 2025 (application bases and surcharges were restructured). This page deliberately states no dollar figures; confirm the fee schedule link still resolves and consider whether to add current fees.',
    'Examination pendency varies. This page says "roughly a year to a year and a half" rather than a precise figure; confirm it still reflects USPTO published pendency at each quarterly review.',
  ],
  related: ['cannabis-law', 'business-law', 'corporate-law'],
};
