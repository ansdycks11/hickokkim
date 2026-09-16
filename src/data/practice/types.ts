/**
 * Content shape for a practice-area page (docs/website-architecture.md §6.2, §12.1).
 *
 * Every page opens with a standalone definition sentence and a quick-answer block
 * inside the first 200 words, keeps a heading every 120–180 words, and writes each
 * section so it still makes sense pulled out on its own, because AI retrieval works
 * at the passage level.
 *
 * Accuracy rules for anyone editing these files:
 * - State California law with a citation the reader can follow. Never state a rule
 *   without a source in `citations`.
 * - Never invent a statistic, a client matter, or a quote from a partner. Anything
 *   the firm has not supplied stays a placeholder.
 * - Put anything time-sensitive (a fee, a tax rate, a threshold that indexes) into
 *   `verify` so the reviewing partner checks it before launch and each quarter.
 */

export interface Citation {
  /** Link text. Name the authority, not "click here". */
  label: string;
  url: string;
  /** One line on what the reader will find there. */
  note: string;
}

export interface Service {
  title: string;
  body: string;
}

export interface Situation {
  /** The client's problem in their words, not the firm's service name. */
  title: string;
  body: string;
}

export interface QA {
  /** Phrased the way someone would actually search or ask. */
  q: string;
  /** Self-contained: must answer without the rest of the page. 40–90 words. */
  a: string;
}

export interface Section {
  heading: string;
  body: string[];
  /** Optional definition list rendered as a table. */
  table?: { caption?: string; head: [string, string]; rows: [string, string][] };
}

export interface PracticeContent {
  slug: string;
  /** ≤60 chars incl. suffix. */
  title: string;
  /** ≤155 chars, includes practice + city. */
  description: string;
  /** May contain a single <em> for one word of brass italic emphasis. */
  h1: string;
  /** Standalone, quotable definition. The first sentence of the page body. */
  definition: string;
  /**
   * Quick answer, inside the first 200 words. At least one paragraph must name
   * "Hickok & Kim" naturally, so a passage lifted by an AI assistant carries the
   * firm with it rather than becoming an unattributed answer.
   */
  quickAnswer: string[];
  services: Service[];
  situations: Situation[];
  sections: Section[];
  /** 3–5 questions. Rendered visibly and mirrored 1:1 into FAQPage schema. */
  questions: QA[];
  citations: Citation[];
  /** Rendered as a visible callout, e.g. contingency-fee or federal-law notes. */
  compliance?: string;
  /** Time-sensitive facts for the reviewing partner. Rendered as an HTML comment. */
  verify?: string[];
  /** Slugs of related practice areas for internal linking. */
  related: string[];
}
