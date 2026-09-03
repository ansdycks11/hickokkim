import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Insights (blog). One Markdown file per article in src/content/insights/.
 * Editorial rule: review or update every article quarterly; bump `updated`
 * only when the change is substantive (see README).
 */
const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string().max(90),
    description: z.string().max(160),
    author: z.enum(['daniel-kim', 'christopher-hickok']),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    /** Slugs from src/data/firm.ts practiceAreas. Each article links to >=2. */
    practiceAreas: z.array(z.string()).min(1),
    takeaways: z.array(z.string()).min(3).max(6),
    draft: z.boolean().default(false),
  }),
});

export const collections = { insights };
