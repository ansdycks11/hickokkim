# Hickok & Kim Inc. — Website Architecture & Build Specification

**Purpose of this document:** A complete build directive for an AI developer (Claude Opus) to construct a high-converting, AI-search-optimized law firm website. Follow the phases in order. Do not skip the acceptance criteria.

**Attached references:**
- `hickok-kim-experience.html` — the single-page prototype (three-act journey + real content). Its visual design (palette, typography, 3D hero, section styles) is approved and must be preserved. Its text uses the verified firm facts; sample testimonials and monogram portraits are placeholders.
- `hickok-kim-firm-content.md` — the verified source of truth for every fact on the site (names, bar numbers, address, phone, email, practice areas, bios, fees). Where the prototype and this file disagree, this file wins. Items marked MISSING must render as `<!-- TODO:REAL-DATA -->` placeholders, never as invented content.

---

## 1. Project Goals (in priority order)

1. **Trust.** Visitors must feel within 5 seconds that this is a credible, established firm.
2. **Conversion.** Every page guides toward booking a free consultation with minimal friction.
3. **AI-search visibility (GEO).** Content must be structured so ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews can retrieve, cite, and recommend the firm.
4. **Traditional SEO.** Local intent: "administrative lawyer Los Angeles," "IP attorney LA," etc.
5. **Performance & accessibility.** <3s mobile load, WCAG 2.2 AA.

## 2. Firm Facts (source of truth)

- Name: **Hickok & Kim, Inc.** (spelling verified against the California State Bar record; earlier drafts misspelled it "Hicock") — boutique law firm, Los Angeles, CA. Founded **2019**. Domain: **hickokkim.com** (already owned). Full facts: `hickok-kim-firm-content.md`.
- Partners (both titled "Partner", never "Managing Partner"):
  - **Daniel Kim** — litigation and individual-client work: Personal Injury, Civil Litigation, Wills & Trusts, Real Estate Law; shares Business Law, Corporate Law, and Outside General Counsel
  - **Christopher Hickok** — Trademarks, Cannabis Law; shares Business Law, Corporate Law, and Outside General Counsel
- Practice areas (exactly these nine), grouped on the site by the moment a client is in:
  - **When something goes wrong:** Personal Injury (DK), Civil Litigation (DK)
  - **When you're building something:** Business Law (DK+CH), Corporate Law (DK+CH), Outside General Counsel Services (DK+CH — featured service model, not just a list item), Trademarks (CH), Cannabis Law (CH)
  - **When you're planning ahead:** Wills & Trusts (DK), Real Estate Law (DK)
- Positioning: a full-service Los Angeles boutique for individuals and businesses — the site must ORGANIZE this breadth (by client moment) so it reads as coherent, never as a scattered list.
- NOTE: the demo prototype shows an earlier five-area placeholder structure; the list above supersedes it everywhere.
- Placeholders that MUST be marked `<!-- TODO:REAL-DATA -->` in code until the client supplies them: street address, phone, email, bar admission years, law schools, awards/ratings, testimonials, case results, headshots, firm photos.
- Compliance: California attorney-advertising rules apply. No outcome guarantees. Footer of every page: "Attorney advertising. Prior results do not guarantee a similar outcome." Include a "no attorney-client relationship is formed by using this site" notice on Contact and in the Disclaimer page.

## 3. Tech Stack

- **Static multi-page site. No client-side rendering of content.** AI crawlers only read server-returned HTML, so every word of content must exist in the initial HTML.
- Preferred: **Astro** (static output, zero-JS by default, component reuse, content collections for Insights). Acceptable fallback: hand-built HTML pages sharing a CSS file, if the deploy workflow must stay "drag folder into Netlify Drop."
- Hosting: **Netlify** (free tier). Forms via **Netlify Forms** (works with static HTML, no backend).
- 3D: **Three.js** (already integrated in the prototype) — hero only, deferred load, `prefers-reduced-motion` respected.
- No cookies/trackers beyond privacy-respecting analytics (optional: Plausible/Netlify Analytics). Keeps the privacy policy simple.

## 4. Site Map & URL Structure

```
/                                   Home
/practice-areas/                    Practice overview (hub, grouped by client moment)
/practice-areas/personal-injury/
/practice-areas/civil-litigation/
/practice-areas/business-law/
/practice-areas/corporate-law/
/outside-general-counsel/           Featured service page (own top-level URL)
/practice-areas/trademarks/
/practice-areas/cannabis-law/
/practice-areas/wills-and-trusts/
/practice-areas/real-estate-law/
/attorneys/                         Team overview
/attorneys/christopher-hickok/
/attorneys/daniel-kim/
/how-we-work/                       Process + fees philosophy
/insights/                          Article index (blog)
/insights/[slug]/                   Article template + 3 seed articles
/faq/                               Full FAQ page
/contact/                           Intake form + map + details
/privacy-policy/
/disclaimer/
/404.html
/sitemap.xml   /robots.txt   /llms.txt
```

**robots.txt:** Allow all, and explicitly allow AI crawlers: `GPTBot`, `ClaudeBot`, `Claude-Web`, `PerplexityBot`, `Google-Extended`, `CCBot`, `Bytespider`. Reference sitemap.
**llms.txt:** One-page plain-text summary of the firm, practice areas, location, and contact for LLM ingestion.

## 5. Global Components (every page)

1. **Header:** brand wordmark ("Hickok *&* Kim Inc." — italic brass ampersand), nav (Practice Areas ▾, Attorneys, How We Work, Insights, FAQ), sticky "Free Consultation" button. Mobile: hamburger → full-screen panel. Click-to-call phone number visible in header on ≥1024px.
2. **Footer:** NAP block (name/address/phone — must match Google Business Profile exactly), practice-area links, attorney links, disclaimers, privacy link, © year.
3. **Sticky mobile CTA bar:** bottom-fixed on mobile with two buttons: "Call" (tel:) and "Free Consultation" (→ /contact/). Hidden on /contact/.
4. **Breadcrumbs** on all non-home pages (visible + BreadcrumbList schema).

## 6. Page Blueprints

### 6.1 Home (/)
Keep the prototype's structure, with additions (▸ = new):
1. Hero: the Homepage Experience (see §13) — a three-act scroll journey ending on the brass scales — with the static hero (H1, subhead naming "individuals and businesses in Los Angeles" and the three client moments, two CTAs) rendered first as LCP.
2. Stats trust bar (est. 2019, matters, courts). Replace unverifiable claims with real ones.
3. Practice-area ledger — each row links to its dedicated page.
4. ▸ Testimonials: 3 quotes, name/matter-type attribution. `<!-- TODO:REAL-DATA -->` placeholders; add Review schema only when real.
5. Partners preview cards → bio pages.
6. How-we-work 4-step strip → /how-we-work/.
7. ▸ Latest Insights: 3 most recent articles.
8. FAQ preview (4 questions) → /faq/.
9. ▸ Contact band: short intake form (see §7) + phone/email/address.

### 6.2 Practice-area pages (×9) — the GEO workhorses
Identical template, unique content (1,500–2,500 substantive words each, no filler — see §12.1):
- **Category-specific notes:** Personal Injury is among the most competitive legal categories in Los Angeles — do not chase "best PI lawyer LA"; target specific answerable questions ("what is the statute of limitations for a car accident claim in California", "how contingency fees work") and California-specific process content. Cannabis Law is a genuine niche where a boutique with substantive, current regulatory content can become the cited source — invest disproportionately here. Trademarks pages should cover USPTO process, California vs. federal marks, and clearance. Wills & Trusts and Real Estate pages target individual-client questions with plain-language definition leads.
- **Compliance flags for the reviewing partner:** PI pages must follow California rules on contingency-fee advertising and results; Cannabis pages need appropriate federal-law disclaimers; no outcome guarantees anywhere.
1. **Definition lead:** first sentence is a standalone, quotable definition. Pattern: "Administrative law governs disputes between individuals or businesses and government agencies — licensing, enforcement actions, and regulatory compliance."
2. **Quick Answer block** (first 200 words): who this is for, what the firm does, geography, free consultation. Visually styled callout; AI systems cite from the top of the page.
3. "How we help" — 4–6 concrete services as H3s with 2–3 sentence explanations.
4. "Common situations" — client-problem framing ("You received an accusation letter from a licensing board…").
5. Question-formatted H2 section answering 3–4 high-intent questions in plain language ("How long does a trademark registration take?").
6. Who handles it: partner card linking to bio (E-E-A-T author signal).
7. Related insights (internal links). 8. CTA band. 
Schema per page: `Service` (provider → LegalService @id) + `FAQPage` (page-specific Qs) + `BreadcrumbList`.

### 6.3 Attorney bio pages (×2)
Headshot (placeholder box until supplied), full bio (300–500 words, first-person-adjacent, client-outcome oriented), credentials table (bar admissions + numbers, education, courts, recognitions), practice areas handled (links), personal note (humanizing), CTA. Schema: `Attorney` with `sameAs` (LinkedIn/State Bar profile URLs — TODO), `knowsAbout`, `alumniOf`, `worksFor` → firm @id. These pages are the E-E-A-T anchor: every Insights article bylines and links here.

### 6.4 How We Work
Expanded 4-step process; fee-structure explanation (hourly/flat/contingency, written engagement letters, monthly itemized invoices); "what to bring to a first consultation" checklist (highly citable by AI); communication promises.

### 6.5 Insights (index + article template + 3 seed articles)
- Template: H1, byline linking to attorney bio, published + updated dates (visible and in schema), 900–1,400 words, definition lead, question H2s, "key takeaways" box, 3–5 outbound citations to authoritative sources (statutes on leginfo.legislature.ca.gov, USPTO, agency sites), internal links to practice pages, author box, CTA. Schema: `Article` with `author` → Attorney @id, `datePublished`, `dateModified`.
- Seed articles (write fully):
  1. "What to Do When a California Licensing Board Opens an Investigation" (Administrative — Hickok)
  2. "Trademark vs. Trade Name in California: What Business Owners Get Wrong" (IP — Kim)
  3. "The 7 Clauses Every California Services Contract Needs" (Contract — Kim)
- Editorial rule stated in a README: update or review each article quarterly; stale pages lose AI citations.

### 6.6 FAQ page
15–20 questions grouped by topic (fees, process, each practice area, logistics). Every answer self-contained in 40–90 words. `FAQPage` schema mirrors visible text exactly.

### 6.7 Contact
Intake form (§7), click-to-call, email, address + embedded map (static image or OpenStreetMap iframe to avoid Google Maps API keys), hours, parking note, "no attorney-client relationship" notice, response-time promise (1 business day).

### 6.8 Privacy Policy & Disclaimer
Standard static pages; plain language; cover Netlify Forms data handling and analytics if enabled. Mark for attorney review.

## 7. Intake Form (conversion-critical)

- Fields — exactly four: Name, Phone, Email, "Briefly, what's going on?" (textarea). Optional dropdown: practice area. Nothing else; every extra field cuts completion.
- Netlify Forms: `data-netlify="true"`, honeypot field for spam, custom success page (/contact/thanks/) with "what happens next" steps.
- Confidentiality microcopy under the button: "Confidential · No obligation · Response within 1 business day."
- No `<form>` inside any React artifact context — this is a static site, standard HTML form is correct here.

## 8. UI/UX Direction & Design System

### 8.1 Design principles (govern every screen — when in doubt, return here)
1. **Calm, human, confident — never loud.** The 2026 direction for legal design: visitors are often stressed; the interface must lower their heart rate. No flashing elements, no aggressive urgency banners, no autoplay video with sound, no popups within the first 30 seconds (a single, dismissible, delayed consultation prompt is permitted after meaningful scroll on Insights articles only).
2. **One primary action per screen.** Each viewport-height of content has exactly one visually dominant CTA (solid brass). Secondary actions are ghost/outline. Never two solid-brass buttons competing in the same view.
3. **Typography is the luxury signal.** Editorial serif headlines, generous whitespace, and hairline rules do the "premium" work — not stock imagery, gradients, or ornament. If a decoration doesn't communicate trust or guide the eye, remove it.
4. **Motion is felt, not noticed.** Every animation must survive the question "would a partner demo this to a skeptical senior client?" Reveal-on-scroll: opacity + ≤24px translate, 600–700ms, `cubic-bezier(0.22,1,0.36,1)`, once only. Hover states: 200–250ms. Nothing loops visibly except the 3D scales' near-imperceptible sway.
5. **Faces build trust; geometry builds atmosphere.** Abstract design carries the brand, but at least one real human face must appear before the first fold-and-a-half on Home, and on every attorney and practice page. A law firm site with zero humans reads as a concept, not a firm.

### 8.2 Foundations
- **Palette:** paper `#FBFAF6`, ink `#121821`, ink-soft `#222B38`, brass `#A6803E`, brass-light `#C9A86A`, slate `#5A6B82`, hairline `#E2DFD5`. Brass is an accent (<10% of any viewport) — used for CTAs, italic emphasis, rules, and the 3D object only. Never brass body text on paper (contrast fails).
- **Type:** Libre Caslon Text (display/serif), Inter (body), IBM Plex Mono (labels/reference codes). Scale: H1 clamp(2.4rem→4.1rem), H2 clamp(1.8rem→2.6rem), body 16.5px/1.65, mono labels .72rem/.14em tracking uppercase. Line length 45–70ch. Italic Caslon reserved for single-word emphasis in headlines ("*balance*") — max once per headline.
- **Spacing rhythm:** section padding clamp(72px→128px); an 8px base grid; whitespace is a feature — when a section feels empty, do not fill it.
- **Motifs:** ledger rows with mono reference codes (AD-100, IP-200…), hairline borders, alternating paper/ink sections (never two ink sections adjacent), brass italic ampersand in the wordmark.

### 8.3 The 3D hero — required tuning (fixes to known prototype weaknesses)
The prototype's scales are approved in concept but MUST be corrected as follows:
- **Near-equilibrium sway, never a tipped scale.** Beam rotation amplitude ≤0.025 rad (~1.4°), period 6–8s, eased sinusoid; pans counter-rotate to stay level. A visibly tipped scale symbolizes *injustice* — at no frame may the beam tilt exceed 2°. On load, the beam may settle from ~4° into equilibrium over the first 2.5s as an entrance gesture, then hold the subtle sway.
- **Richer, brighter brass — it must read as polished metal, not silhouette.** MeshStandardMaterial roughness 0.22–0.28, metalness 0.9, plus an environment map (PMREM from a small studio HDRI or `THREE.CubeTexture` fallback) so highlights travel across surfaces during sway. Add a warm rim/key light (`#C9A86A`, intensity ~1.4) from upper right and a cool fill (`#6e84a3`, ~0.5) from the left. Target: at rest, at least one visible specular highlight on the beam and each pan edge.
- **Presence without dominance:** desktop — right 45–50% of the hero, vertically centered, subtle mouse parallax ≤0.15 rad; mobile — centered backdrop at 30–35% opacity behind text (text always ≥4.5:1 contrast against the composited result). Optional faint brass point-light glow beneath the base for depth.
- **Frustum-math sizing (regression from prototype):** compute visible world width/height at the group's depth (`visH = 2·tan(fov/2)·dist`, `visW = visH·aspect`); scale group to its allocated fraction with margin so sway never clips at any viewport from 320px to 3440px.
- **Engineering:** defer Three.js (dynamic import after first paint); hero text must be LCP; static gradient + SVG scales fallback when WebGL is unavailable; freeze at equilibrium on `prefers-reduced-motion`; cap devicePixelRatio at 2; pause rendering when the hero leaves the viewport (IntersectionObserver). Home page only — all other pages use a lightweight static SVG scales motif for continuity.

### 8.4 Photography & human presence (highest-impact visual requirement)
- **Real headshots of Christopher Hickok and Daniel Kim are mandatory before launch** — monogram placeholders may exist only during development, marked `<!-- TODO:REAL-DATA -->`. No stock photos of models-as-lawyers anywhere on the site, ever; authentic imagery outperforms stock on trust and stock is actively harmful on legal sites.
- **Headshot spec (put this in PLACEHOLDERS.md for the client):** consistent pair — same session, same lighting; soft directional key light; neutral or deep-ink background (or a real office background gently defocused); business attire; subject facing slightly toward page center; minimum 1200px on the short edge; delivered as WebP/AVIF with JPEG fallback; warm, approachable expression — "someone you'd want on your side," not a mugshot.
- **Placement:** attorney cards on Home (portrait crop 4:5), full bio pages (larger, 3:4), and a small circular byline avatar on Insights articles. Optional but recommended: one environmental photo (office exterior/conference room) on Contact for local legitimacy.
- **Treatment:** subtle ink-tone duotone or gentle desaturation is permitted to harmonize with the palette; never heavy filters.

### 8.5 Interaction & conversion UX details
- **Tap targets ≥44×44px**; form inputs ≥48px tall with 16px+ font (prevents iOS zoom); labels always visible (no placeholder-only fields).
- **Sticky mobile CTA bar** (bottom, two buttons: Call / Free Consultation) appears after the user scrolls past the hero, hides on downward scroll and reappears on upward scroll, never overlaps the footer or form.
- **Forms:** single column; brass focus ring; inline validation on blur (never only on submit); error text in accessible red-ink with icon; success page states exactly what happens next and repeats the phone number.
- **FAQ accordions:** entire summary row clickable, +/– indicator, animated height 250ms, arrow-key navigable.
- **Hover language:** ledger rows tint to `#F3F0E8` with a 5px arrow slide; buttons invert (solid→brass-light, ghost→brass border); links underline on hover only in body text, always underlined inside paragraphs on Insights (readability).
- **Loading & failure states:** if the 3D or any embed fails, the layout must not shift (reserve space) and the fallback must be indistinguishable from an intentional design choice.

### 8.6 Mobile rules (regression-tested bugs from prototype — do not reintroduce)
- Ledger rows must define explicit grid placement (ref spans full width; title col 1 / arrow col 2 on row 2; description spans full width on row 3) so text never inherits the 24px arrow column.
- Hero stats become a static 2×2 grid *below* the hero content — never absolutely positioned over it.
- Hamburger panel: closes on link tap, on Escape, and on outside tap; toggles `aria-expanded`; ☰ becomes ✕.
- Hero buttons full-width; h1 minimum size respects 320px viewports without wrapping mid-word.

### 8.7 Accessibility (WCAG 2.2 AA — audited, not assumed)
Contrast ≥4.5:1 (including text over the mobile 3D backdrop — test the composite); visible 2px brass focus states with 3px offset; full keyboard path through nav, accordions, and form; `aria-expanded`/`aria-controls` on all toggles; meaningful alt text (attorney photos: "Christopher Hickok, Partner at Hickok & Kim"); no information conveyed by color alone; skip-to-content link; heading levels never skip.

## 9. GEO / SEO Layer (site-wide requirements)

1. **JSON-LD graph:** one `@graph` on every page containing `LegalService` (stable `@id: https://DOMAIN/#firm`, NAP, geo, hours, areaServed, knowsAbout) + page-type schema (§6) + `BreadcrumbList` + `WebSite`. Validate every page with Google Rich Results test — zero errors.
2. **Metadata per page:** unique `<title>` (≤60 chars, pattern "Topic | Hickok & Kim Inc. — Los Angeles"), meta description (≤155 chars, includes practice + city), canonical, Open Graph + Twitter cards with a branded 1200×630 OG image (generate one: ink background, brass scales mark, firm name).
3. **Content patterns:** definition-lead first sentences; question-formatted H2s matching natural queries; self-contained sections (each H2 block answerable standalone — AI retrieval is passage-level); city + practice co-mentions ("Los Angeles administrative law attorney") used naturally.
4. **Query fan-out coverage:** each practice page must independently satisfy sub-queries like "[practice] lawyer Los Angeles," "what does a [practice] attorney do," "[specific service] California."
5. **Internal linking:** every Insights article → ≥2 practice pages; every practice page → its attorney + related articles; descriptive anchor text (never "click here").
6. **Freshness signals:** visible "Last reviewed: [date]" on practice pages and articles + `dateModified` in schema.
7. **sitemap.xml** with all pages; **no content behind JS**; verify by curling each URL and confirming full text in response.

## 10. Performance Budget

- Lighthouse mobile: Performance ≥90, Accessibility ≥95, SEO ≥95 on every page.
- LCP <2.5s, CLS <0.1 on mobile. Three.js must not block LCP (hero text paints first).
- Fonts: `display=swap`, preconnect, subset if possible. Images: WebP/AVIF, width/height attributes, lazy-load below fold.
- Total JS on non-home pages: <30KB.

## 11. Build Phases & Acceptance Criteria

**Phase 1 — Scaffold:** repo structure, shared layout/components, design tokens, robots.txt/sitemap/llms.txt, deploy pipeline. ✓ Deploys to Netlify; header/footer/mobile nav pass keyboard test.
**Phase 2 — Home:** port prototype + new sections (testimonials, insights teaser, contact band), applying all §8.3 3D corrections. ✓ 3D never clips at 320px–3440px widths; beam tilt never exceeds 2° after settle; brass shows specular highlights (not silhouette); hero text is LCP; one solid-brass CTA per viewport; Lighthouse budget met.
**Phase 3 — Practice pages ×5.** ✓ Each ≥700 words, definition lead, Service+FAQ schema validates, curl shows full text.
**Phase 4 — Attorneys, How-We-Work, FAQ.** ✓ Attorney schema validates; FAQ page schema matches visible text 1:1.
**Phase 5 — Insights + 3 articles.** ✓ Article schema with author linkage; each article cites ≥3 authoritative external sources.
**Phase 6 — Contact + legal pages + form.** ✓ Netlify Forms submission tested end-to-end incl. honeypot and success page.
**Phase 7 — QA sweep:** Rich Results test all pages; Lighthouse all pages; manual pass at 320/375/768/1024/1440/2560px; screen-reader spot check; grep for remaining `TODO:REAL-DATA` and output the list as `PLACEHOLDERS.md` for the client.

**Final deliverable:** deployable folder + `README.md` (how to edit content, deploy, quarterly content-refresh checklist) + `PLACEHOLDERS.md`.

## 12. GEO Operations Playbook (derived from Virayo's LLM-SEO research — apply exactly)

### 12.1 On-page content rules (every content page)
- **Answer in the first 30%.** The plurality of AI citations reference the top third of a page. Every page opens with a self-contained, quotable answer (who/what/where/for whom/free consult) inside the first 200 words. No throat-clearing intros.
- **Heading rhythm:** consistent H2 → H3 hierarchy with a new heading every 120–180 words. Sparse or erratic heading structure measurably reduces citations.
- **Self-contained sections:** every H2 block must make sense if extracted alone (passage-level retrieval). Never write sections that depend on the previous section to be intelligible.
- **Depth targets:** practice-area pages 1,500–2,500 words when the substance is real (longer pages earn materially more citations than <800-word pages); never pad — depth via specifics, not filler.
- **FAQ on every money page** with FAQPage schema mirroring visible text (FAQ presence and schema each correlate with more citations).
- **Enrichment quotas per practice page and article:** ≥3 concrete statistics with linked sources (statistics lift AI visibility), ≥1 named quote from a partner (expert quotations lift visibility further), ≥3 outbound citations to statutes/agencies/courts — leginfo.legislature.ca.gov, USPTO, Cal. agencies (references produce the largest visibility lift for mid-authority sites like a new firm's).
- **Comparison formats where honest:** comparison/listicle content is the single most-cited format class. Legal-appropriate examples: "LLC vs. S-Corp for California businesses," "Mediation vs. arbitration vs. litigation," "Trademark vs. trade name." Never fake rankings of competitors.
- **Entity-anchored passages (defense against "ghost citations"):** most AI citations use a page's content without naming the brand. Every quotable answer paragraph on a money page must contain the firm name naturally ("At Hickok & Kim, personal injury matters are handled on contingency…"), so a lifted passage carries the brand with it. Never rely on the header or footer to identify the firm.
- **Define terms and answer adjacent questions on the same page:** each practice page defines the terms a first-time client would not know (in one plain sentence each) and covers the adjacent questions there — one comprehensive page beats ten thin ones.
- **Original research (optional, highest ceiling):** one piece per year that only this firm could produce — e.g., an anonymized review of California cannabis license outcomes, or a survey of LA small-business legal spend — creates content no competitor can replicate and is the single strongest citation magnet.

### 12.2 Technical retrieval layer
- robots.txt explicitly allows AI crawlers: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, Bingbot, CCBot. llms.txt at root. sitemap.xml with real lastmod dates. (All three shipped with the prototype.)
- **Register BOTH Google Search Console and Bing Webmaster Tools; submit the sitemap to both.** ChatGPT's live retrieval leans overwhelmingly on Bing's index — Bing is not optional for GEO.
- Server-rendered HTML only; no content behind JavaScript. Verify by curling each URL.
- Speed: the fastest pages earn several times the citations of slow ones; keep FCP well under 1s.
- **Freshness cadence:** content updated within ~2 months earns significantly more citations; pages older than ~3 months decay. Quarterly review of every page: update facts, bump visible "Last reviewed" date and schema dateModified ONLY when changes are substantive.

### 12.3 Off-site program (the majority of AI citations for category queries come from third-party sources — most GEO work happens OFF the website)
Owner: the partners, with Yochan's help. The legal-industry equivalents of the article's G2/Reddit playbook:
1. **Google Business Profile** — complete, category-correct, NAP identical to site footer, steady cadence of real client reviews (ask at matter close). The single highest-leverage listing.
2. **Legal directories:** Avvo (claim + complete both partner profiles), Justia, FindLaw, Lawyers.com, State Bar profile links from the site (sameAs in schema).
3. **"Best lawyer in LA" listicles:** identify which listicle/directory pages AI assistants actually cite for "best business lawyer Los Angeles"-type prompts (see 12.4) and pursue inclusion — Expertise.com, local business journals, chamber lists. Third-party list inclusion is the highest-leverage single placement type.
4. **Bar associations & community:** LACBA membership + referral service, practice-section involvement, CLE speaking (creates citable third-party mentions).
5. **LinkedIn:** firm page + active partner profiles (branded-anchor mentions; brand-name search volume itself correlates with AI visibility).
6. **YouTube (fast win):** 1–2 partner-presented explainers ("What to do when a California licensing board opens an investigation") embedded into the matching practice page — video citations can appear in AI answers within days.
7. **Reddit and Quora (Perplexity's largest citation source) — with guardrails:** r/legaladvice prohibits solicitation and CA rules restrict direct solicitation, so the play is genuine, general-information participation under a real name in community and industry threads (r/AskLosAngeles, r/smallbusiness, cannabis-industry subreddits, Quora questions on California business law) — never pitching, never advising on specific facts. Consistent helpful presence earns the unprompted mentions models treat as consensus.
8. **Consistency rule:** identical firm name, address, phone everywhere. Mentions matter more than links; branded mentions beat keyword-stuffed anchors.

### 12.4 Monthly citation audit (30 minutes, fixed prompt set)
Run in ChatGPT, Claude, Gemini, and Perplexity; log results in a sheet:
- "best [each of the 9 practice areas] lawyer in Los Angeles" (9 prompts) plus "fractional / outside general counsel Los Angeles" and "cannabis business attorney California" 
- "small business lawyer Los Angeles free consultation"
- "what does it cost to hire a business attorney in LA"
- Problem-statement prompts, one per practice area ("what should I do after a car accident in Los Angeles", "how do I get a cannabis license in California", "do I need a trust or a will in California") — these are the prompts where the firm's own content can be cited directly
- "Hickok & Kim" and "Hickok & Kim reviews"
For each response record: (a) is the firm named? (b) is the description ACCURATE — nine practice areas, correct partner attribution (Daniel: litigation/PI/wills/real estate; Christopher: trademarks/cannabis; shared business/corporate/OGC), both partners as equals, location, free consultation, fees? (c) which third-party pages did the model cite → those are next placement targets. Inaccuracies are corrected at the source: update the site page or request correction from the third party. Accuracy is a strategy — a wrong price or wrong practice description in an AI answer loses clients invisibly. Optional tooling once the habit is established: Peec or Ziptie for automated prompt tracking.

### 12.5 Measurement
- GA4 custom channel group "AI Search": referrals from chatgpt.com / chat.openai.com, claude.ai, perplexity.ai, gemini.google.com, copilot.microsoft.com.
- Intake-form self-reported attribution field "How did you hear about us?" including an AI-assistant option (already implemented on the prototype) — captures the AI-influenced visitors who never click a citation link.
- Branded search volume (GSC + Bing) as the leading indicator of AI-driven awareness.
- Review monthly alongside the 12.4 audit.
- **Set partner expectations up front:** on-site content changes can surface in AI answers within 30–90 days; off-site placements compound over 3–6 months; durable "the model just knows the firm" familiarity takes 6–12 months of sustained work. Expect month-to-month volatility — most AI answers change between identical runs — so judge trends quarterly, not weekly.

## 13. Homepage Experience — "Paper in Ink" (three-act scroll journey)

**Reference:** davidwhyte.com/experience (Immersive Garden, 2024). We borrow its *mechanics* — scroll-driven camera through a dark space, flat sheets hanging at different depths, a reveal effect, one line of text per moment, then a conventional page beneath — not its complexity. No Blender: the camera path is defined in code from the script below. No fluid simulation. No autoplay audio.

### 13.1 Concept
Law is paper. The visitor drifts through an ink-dark, fog-filled space past three documents, each representing the moment a client is in. Ink bleeds into each sheet to reveal it (our analog of the watercolor reveal). The journey ends on the brass scales settling into balance, then the page continues into the normal site. Total scroll time 30–45 seconds. Skippable from the first second.

### 13.2 Chapter script (Opus builds the camera path from this — do not add chapters)
0. **Open** — near-black ink space, soft volumetric fog, brass dust drifting through a single warm shaft of light. Wordmark fades in. Mono caption: "Scroll to explore" + persistent "Skip" (top right) + persistent "Free consultation" button (bottom right, never hidden).
1. **Act I — When something goes wrong** (Personal Injury, Civil Litigation — Daniel Kim). Camera descends and drifts toward a sheet lit like a letter on a desk: a complaint caption / demand letter. Ink reveal. Beside it, one line: "The other side already has a lawyer. Now so do you."
2. **Act II — When you're building something** (Business, Corporate, Outside General Counsel, Trademarks, Cannabis — both partners). Camera dollies laterally and forward; a sheet of articles of incorporation with a trademark certificate hanging slightly behind it at a different depth. Line: "Every company is a stack of documents. Get them right the first time."
3. **Act III — When you're planning ahead** (Wills & Trusts, Real Estate — Daniel Kim). Camera rises slightly toward a trust instrument / deed lit warmer. Line: "What you've built should outlast you — intact."
4. **Close** — camera pulls back; the brass scales (existing implementation, §8.3 tuning) settle from ~4° into equilibrium over 2.5s. Line: "Counsel built on balance, not bluster." The scene dims and the page continues seamlessly into the practice ledger (nine areas grouped under the three act headings).

**Document interaction:** hover (desktop) / tap (mobile) on any sheet lifts it 2–3% toward the camera and shows a card listing the practice areas inside that act with the responsible partner(s), each linking to its page — the law-firm version of the reference site's long-press-to-video.

### 13.3 Assets (no 3D modeling required)
- Three designed mock documents rendered from HTML/SVG at 2048px on the long edge (WebP + JPEG fallback), in the firm's typography. Never real client documents. Subtle paper texture, realistic margins, a brass wax-seal or letterhead motif; text small enough to read as "document," not as copy.
- Brass scales: reuse existing Three.js code.
- Fonts/palette per §8.2. Optional: a paper-grain normal map for the sheets.
- Audio: none by default. If the partners want it, one ambient loop behind an explicit toggle, never autoplay.

### 13.4 Technical approach
- Three.js; camera on a `CatmullRomCurve3` of 5–6 waypoints derived from §13.2; scroll progress (smoothed with lerp, or Lenis if the build uses a framework) scrubs camera position and look-at along the curve.
- Sheets: `PlaneGeometry` with the document texture, slight random tilt, hung at staggered depths so the dolly reads as three-dimensional; soft shadow via a blurred dark plane behind each.
- Ink reveal: noise-threshold shader — a baked noise texture compared against a progress uniform, with a soft edge and a dark bleed ring, so the document appears the way ink spreads through paper. Progress is driven by camera proximity to the sheet.
- Atmosphere: `THREE.FogExp2` matching the ink background, 150–250 drifting particles, film grain + vignette as a lightweight post pass (skip post-processing on mobile).
- Sizing by frustum math (§8.3); text captions are HTML overlays positioned by projecting each sheet's world position (so text stays crisp, selectable, and readable by crawlers), never rendered inside the canvas.
- Performance: static hero (H1 + CTAs) renders first as LCP; Three.js loads deferred; stream the scene in without a blocking loader; pause rendering when offscreen; cap DPR at 2. Budget: Home Lighthouse mobile Performance ≥85 (the one page allowed below 90), all other pages ≥90.
- Fallbacks: `prefers-reduced-motion` → a static composition of the three sheets with captions, no camera motion; weak/mobile GPU → crossfading 2D sequence of the three documents driven by scroll; no WebGL → static hero image.

### 13.5 Guardrails (trust first)
- ≤45s of scroll; "Skip" visible from frame one; consultation CTA never hidden; no loading screen longer than 1s.
- One line of text per chapter, never paragraphs inside the 3D layer; all chapter text also exists in the crawlable HTML.
- Motion felt-not-noticed: eased camera, no bounces, nothing loops visibly except dust and the scales' ≤2° sway.
- All nine practice areas remain reachable in ≤2 interactions from the experience.
- Copy in the chapters is subject to partner review for California advertising compliance (no implied guarantees).

### 13.6 Build order & acceptance
1. **Storyboard sign-off:** approve the three chapter lines and the three document designs before any code.
2. **Grayscale prototype:** camera path through three gray rectangles + fog. ✓ Movement feels like a slow dolly; no nausea at 60fps; scroll length ≈ 3.5 viewport heights.
3. **Materials + ink reveal** on real documents. ✓ Reveal completes within 1.2s of a sheet entering the camera's focus; documents readable as "paper," not as blurry rectangles.
4. **Integration:** skip button, persistent CTA, hover/tap cards, handoff into the conventional page. ✓ Skip jumps to the practice ledger in <300ms.
5. **Mobile / performance / accessibility pass.** ✓ Fallbacks verified on a low-end Android and Safari iOS; reduced-motion respected; overlay text ≥4.5:1 contrast.
6. **GEO check.** ✓ curl of the homepage shows every chapter line and all nine practice-area names in HTML.
