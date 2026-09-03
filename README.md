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

## Compliance notes

- California attorney-advertising rules apply. No outcome guarantees anywhere.
- Every page footer carries "Attorney advertising. Prior results do not guarantee a similar outcome."
- Contact and Disclaimer pages carry the "no attorney-client relationship" notice.
- Testimonials and client names appear only with written permission.
- A partner must review all substantive legal content before launch and after each quarterly refresh.
