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
src/components/           Header, Footer, PageHero, Section, CtaBand, IntakeForm, and the rest.
src/pages/                One file (or folder) per URL.
src/content/insights/     Blog articles as Markdown with frontmatter (see content.config.ts).
src/styles/global.css     Design tokens and shared components.
public/                   robots.txt, llms.txt, favicons, headshots, OG image.
scripts/                  Artwork, share image and icons, and the check scripts.
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

## Design system

The site is mostly white, in the manner of editorial consulting and large-firm sites: deep-navy type taken from the HK seal, one bright royal blue reserved for things you can click (buttons, links, the menu icon), a serif label in a narrow left column with content on the right, navigation held in a full-screen MENU overlay, square buttons, and full-bleed photo panels with a gentle curved edge. Navy appears only in the photo bands and the footer. It does not copy any other firm's code, imagery, or branding.

- **Tokens** live at the top of `src/styles/global.css`. The palette is `--navy` (#0b1f33, headings and dark bands), `--text` and `--muted` for body copy, `--mist` for alternate sections, and the blue accent. To change the accent colour, edit `--accent`, `--accent-deep` (hover), `--accent-on-dark`, and `--accent-fill` only. Each token's comment gives its contrast ratio; all body text and links pass 4.5:1 on their backgrounds.
- **Type** is Playfair Display for headings and Rubik for body text, loaded asynchronously. Metric-matched fallbacks (`Playfair Fallback`, `Rubik Fallback`) keep layout shift at zero; the size-adjust values were measured in the browser. Re-measure if either family changes.
- **Wordmark** is "Hickok & Kim" in spaced EB Garamond capitals, one colour throughout (navy on white; white only where it sits on navy), ampersand included. Only the letters of the name are downloaded, using Google Fonts' `text=` subset in `src/layouts/Base.astro`; if the name ever changes, update that list of letters. Georgia sets the name at the same width, so the font swap does not move anything.
- **Building blocks** in `src/components/`: `PageHero` (white title band with a faint line texture, a rule, and an optional link), `Section` (label-left layout; tones white, mist, dark), `Expandable` ("+ More" truncation that keeps every word in the HTML), `LawyerList`, `CtaBand` (curved photo panel plus navy panel), `IntakeForm`, `Header` (with the menu overlay), `Footer`, `StickyCta`.
- **Home page** opens with a single split screen: the architectural photograph with its curved edge on the left, and on the right a white panel with the page heading, one headline, one supporting line, two quick links (practice areas, lawyers), and the consultation button. It does not rotate. So visitors see one "Free consultation" at a time, the header's button stays hidden until the opening's button scrolls out of view (a few lines of script; without JavaScript both simply show).
- **Artwork** that is generated rather than photographed: `node scripts/make-art.mjs` renders the pale contour lines behind the menu overlay (`menu-contours.webp`) and writes the inner-page hero texture (white fading to a cool off-white, with faint navy lines) as `hero-texture.svg`, a vector file, so its faint lines stay sharp on every screen.
- **Share image and icons** (`og-default.png`, `apple-touch-icon.png`, `favicon.ico`, `favicon-96.png`, `favicon-32.png`) are built by `node scripts/make-og.mjs`. The share image is drawn in `scripts/brand/sheet.html`, which the script screenshots with headless Chrome or Edge so they use the site's own fonts. Set `CHROME_PATH` if the browser is not in its usual place. The icons are the firm's HK monogram seal, from `scripts/brand/hk-monogram.png`; the script clears the white around it so it sits cleanly on light or dark browser tabs, and puts the iPhone home-screen icon on white.
- **Photography.** Three images from Unsplash, all under the Unsplash License (commercial use, no attribution required; credited here anyway). Each is exported as WebP in the sizes its slot needs, and the browser picks the smallest that is sharp on the visitor's screen. These are not generated, so `make-art.mjs` leaves them alone.
  - **Home opening:** curved white architectural ribs by Erik Eastman (https://unsplash.com/photos/-6zFVL4YuaM). Files `hero.webp` (2000 px), `hero-lg` (1600), `hero-md` (1200), `hero-sm` (800, phones), cropped to 2000 x 2320 with light noise reduction (median filter), quality 72. Also used by the share image, so rerun `node scripts/make-og.mjs` after replacing it.
  - **Outside General Counsel band (home):** silver abstract curves, a 3D render by Nick Levish (https://unsplash.com/photos/loTMulOXq-E). Files `feature.webp` (1200 px square) and `feature-sm.webp` (700 px).
  - **Closing band on inner pages:** the steel of the Walt Disney Concert Hall, Los Angeles, by Salvatore Favata (https://unsplash.com/photos/R1PkInr54KU). Files `closing.webp` (1200 px square) and `closing-sm.webp` (700 px).
  - The band images load lazily, only as the visitor scrolls toward them. To swap one, replace its files at the same shape and update the credit here and in the component (`src/pages/index.astro` or `src/components/CtaBand.astro`).
- **Testimonials** appear on the home page automatically once real, permitted quotes are added to `testimonials` in `src/data/firm.ts`.
- **vCards** for each partner are generated at `/vcard/<slug>.vcf` from the firm's published phone and email.

Lighthouse (mobile, built site): home 99 performance and 100 accessibility, SEO, and best practices; inner pages 99 to 100 across the board; layout shift 0.

## Practice-area pages

All nine live in `src/data/practice/<slug>.ts` as structured content, rendered through `src/components/PracticePage.astro` so every page shares one template. Adding a page means adding one file: `src/data/practice/index.ts` picks up anything in that folder exporting `content`.

Each page carries a standalone definition sentence, a quick-answer block naming the firm inside the first 200 words, four to six services, five client situations, several deeper sections, five questions mirrored 1:1 into FAQPage schema, the responsible partner linking to their bio, and the public sources every rule is drawn from.

**Writing rules** (also stated in `src/data/practice/types.ts`):

- State California law with a citation the reader can follow. No rule without a source in `citations`.
- Never invent a statistic, a client matter, or a quote from a partner.
- Anything time-sensitive — a tax rate, an indexed threshold, an annually adjusted cap — goes in the `verify` array rather than into the page. The pages describe the mechanism and omit the number, so nothing goes stale silently. Those notes render as an HTML comment on each page and are collected in `PLACEHOLDERS.md` for the reviewing partner.

**Checking a page after editing.** The acceptance script used during the build checks word count, heading structure, schema presence, FAQ mirroring, meta lengths, outbound citations, and internal links. It reads `dist/`, so run `npm run build` first.

## Analytics

Plausible Analytics (cookieless, so no consent banner). The script tag lives in `src/layouts/Base.astro` with `data-domain="hickokkim.com"`. Create the site in the Plausible dashboard before launch. Recommended setup: a goal on `/contact/thanks/` (form submissions), and a saved Sources view filtered to AI-assistant referrers (chatgpt.com, claude.ai, perplexity.ai, gemini.google.com, copilot.microsoft.com) to match the GEO measurement plan.

## Compliance notes

- California attorney-advertising rules apply. No outcome guarantees anywhere.
- Every page footer carries "Attorney advertising. Prior results do not guarantee a similar outcome."
- Contact and Disclaimer pages carry the "no attorney-client relationship" notice.
- Testimonials and client names appear only with written permission.
- A partner must review all substantive legal content before launch and after each quarterly refresh.
