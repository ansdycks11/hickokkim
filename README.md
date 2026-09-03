# hickokkim.com

Static multi-page website for Hickok & Kim, Inc., built with [Astro](https://astro.build) and deployed on Netlify. Every word of content is in the server-returned HTML so search engines and AI assistants can read it without JavaScript.

Build specification: `docs/website-architecture.md`. Source of truth for every firm fact: `docs/firm-content.md`.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (once, or after pulling changes). |
| `npm run dev` | Local preview at http://localhost:4321 with live reload. |
| `npm run build` | Produce the deployable site in `dist/`. |
| `npm run preview` | Serve the built `dist/` folder locally. |

Node 20 or newer is required.

## Deploying

**Netlify Git deploy (recommended):** connect the repository; `netlify.toml` already sets the build command and publish folder. Every push to the main branch deploys.

**Netlify Drop (manual):** run `npm run build`, then drag the `dist/` folder onto https://app.netlify.com/drop. Netlify Forms works either way because the form is plain HTML.

After the first deploy: point `hickokkim.com` DNS at Netlify, enable HTTPS, and confirm the `www` → apex redirect in `netlify.toml` is active. Then register the site in **both** Google Search Console and Bing Webmaster Tools and submit `https://hickokkim.com/sitemap-index.xml` to each.

## Where things live

```
src/data/firm.ts          Firm facts: NAP, partners, practice areas, disclaimers. Edit here first.
src/layouts/Base.astro    <head>, JSON-LD @graph, header/footer, sticky CTA.
src/components/           Header, Footer, PageHero, CtaBand, IntakeForm, Breadcrumbs, ScalesMark.
src/pages/                One file (or folder) per URL.
src/content/insights/     Blog articles as Markdown with frontmatter (see content.config.ts).
src/styles/global.css     Design tokens and shared components.
public/                   robots.txt, llms.txt, favicon, headshots, OG image.
docs/                     Spec, firm content, the approved single-page prototype.
```

## Editing content

- **A fact changed (phone, address, bar detail, practice list):** edit `src/data/firm.ts`. It feeds the header, footer, schema, llms.txt text, and every page.
- **A page's copy:** edit the matching file under `src/pages/`. Practice-area copy lives in `src/data/practice/` once Phase 3 lands.
- **A new article:** add `src/content/insights/<slug>.md` with the frontmatter fields in `src/content.config.ts`. Byline the correct partner. Link to at least two practice pages. Cite at least three authoritative sources (leginfo.legislature.ca.gov, USPTO, California agencies).
- **Placeholders:** anything marked `TODO:REAL-DATA` or rendered with the dashed "Placeholder" box must be replaced before launch. `PLACEHOLDERS.md` lists them.

## Quarterly content refresh (do this every three months)

Stale pages lose AI citations. Every quarter:

1. Re-read each practice page and article. Update facts, statutes, fees, and dates that changed.
2. If a change is substantive, update the visible "Last reviewed" date (`lastReviewed` in `firm.ts` for site-wide, or the page's own date) and the `updated` frontmatter on articles. Do not bump dates for cosmetic edits.
3. Confirm NAP in the footer still matches the Google Business Profile exactly.
4. Run the monthly citation audit from `docs/website-architecture.md` §12.4 and correct any inaccuracies at their source.
5. Rebuild and deploy.

## The homepage experience

The home page opens with the "Paper in Ink" scroll journey (spec §13): three hanging documents revealed by an ink shader, then the brass scales settling into balance. Pieces:

- `src/pages/index.astro` — markup for the stage and overlays (all chapter text is plain HTML for crawlers), the static fallback styles, and the loader. Three.js starts on the first scroll, wheel, touch, pointer, or key event, or 3.5 seconds after `load`, whichever comes first, so it never competes with the hero text for LCP.
- `src/scripts/journey.ts` — the Three.js scene. Tuning constants at the top of the frame section: beam sway amplitude `SWAY_AMP` (0.02 rad ≈ 1.15°), close-chapter `BUMP_AMP` (≤0.8°), `SWAY_PERIOD` (7 s). The beam settles from 4° over the first 2.5 s after load and never exceeds 2° afterwards.
- `scripts/make-documents.mjs` — regenerates the four document textures in `public/assets/docs/` from SVG (`node scripts/make-documents.mjs`). The body text is abstract line-work by design; never use a real client document.
- Fallbacks: `prefers-reduced-motion`, no WebGL, or a failed module load add `html.no-journey`, which turns the same stage into a static composition of the three documents with captions. No layout shift.
- QA hook: in the browser console, `__journey.jump(0.5)` drives progress, `__journey.tiltDegAt(seconds, closeAt)` samples the beam tilt, and `__journey.scalesScreenBox` reports the projected bounds for clipping checks.

Lighthouse (mobile, built site, 2026-09-02): Home performance 98 / accessibility 100 / SEO 100; inner pages 100 / 100 / 100. Re-run with `npx lighthouse <url> --chrome-flags="--headless=new"` against `npx serve dist`.

## Analytics

Plausible Analytics (cookieless, so no consent banner). The script tag lives in `src/layouts/Base.astro` with `data-domain="hickokkim.com"`. Create the site in the Plausible dashboard before launch. Recommended setup: a goal on `/contact/thanks/` (form submissions), and a saved Sources view filtered to AI-assistant referrers (chatgpt.com, claude.ai, perplexity.ai, gemini.google.com, copilot.microsoft.com) to match the GEO measurement plan.

## Compliance notes

- California attorney-advertising rules apply. No outcome guarantees anywhere.
- Every page footer carries "Attorney advertising. Prior results do not guarantee a similar outcome."
- Contact and Disclaimer pages carry the "no attorney-client relationship" notice.
- Testimonials and client names appear only with written permission.
- A partner must review all substantive legal content before launch and after each quarterly refresh.
