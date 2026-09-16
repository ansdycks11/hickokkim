import type { PracticeContent } from './types';

/**
 * Every `<slug>.ts` in this folder that exports `content` is picked up automatically,
 * so adding a practice page means adding one file. `types.ts` and this file are skipped
 * because neither exports `content`.
 */
const modules = import.meta.glob<{ content?: PracticeContent }>('./*.ts', { eager: true });

export const practiceContent: Record<string, PracticeContent> = Object.fromEntries(
  Object.values(modules)
    .filter((m): m is { content: PracticeContent } => !!m.content)
    .map((m) => [m.content.slug, m.content])
);

export const contentFor = (slug: string): PracticeContent | undefined => practiceContent[slug];

export type { PracticeContent } from './types';
