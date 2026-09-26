# Placeholders and items needed from the client

Everything below is marked `TODO:REAL-DATA` in the code or rendered as a dashed "Placeholder" box. Nothing here has been invented. This list is regenerated in the final QA sweep (Phase 7).

## Launch-blocking

1. **Full-resolution headshots** of both partners. Received: Chris 340×340 px, Daniel 600×600 px. Needed: at least 1200 px on the short edge, delivered as JPEG or PNG (we convert to WebP/AVIF). Spec: consistent pair, soft directional key light, neutral or deep-ink background, business attire, subject facing slightly toward page center, warm approachable expression.
2. **Logo files**, or confirmation that the text wordmark stands.
3. **Per-practice-area detail** for all nine areas: services offered, typical clients, and 2–3 anonymized example matters each.
4. **Outside General Counsel pricing and engagement structure.**
5. **Daniel Kim:** J.D. year (likely 2016; confirm), undergraduate institution (optional), LinkedIn URL, prior roles (optional), a humanizing line (optional).
6. **Testimonials:** 2–3 with written client permission and approved wording. No sample quotes are shown; add real ones to `testimonials` in `src/data/firm.ts` and the home page displays them automatically.
7. **Domain registrar access** to point hickokkim.com at Netlify.
8. **Named content reviewer** (a partner) and privacy-policy contact (recommend info@hickokkim.com).
9. **Google Business Profile** access or URL, and the firm LinkedIn page URL (recommend creating one).
10. **Written permission** before naming any client brand (Doja Pak, Alienlabs were mentioned; neither is used on the site).
11. **Plausible account:** create a Plausible Analytics account and add the site `hickokkim.com` (the tracking script is already in the layout). Then set a goal for the consultation form's success page `/contact/thanks/` and, under Sources, filter for chatgpt.com, claude.ai, perplexity.ai, gemini.google.com, and copilot.microsoft.com to track AI referrals.
12. **Attorney review** of the Privacy Policy and Disclaimer pages.

## Attorney review of the practice pages

The nine practice-area pages state California law with a citation for every rule. Where a figure changes on its own (a tax rate, an indexed threshold, an annually adjusted cap), the pages describe the mechanism and deliberately omit the number, so nothing on the site goes stale silently. Each item below is a decision for the reviewing partner: confirm the current position, and decide whether to add the figure.

These notes also live as HTML comments in each page's source, and in the `verify` array of the matching file under `src/data/practice/`. Re-generate this list by reading those arrays.

**Personal Injury**
- MICRA noneconomic damage caps in medical malpractice increase annually under AB 35 (2022). The page states no cap figure. Confirm before adding one.
- California minimum auto liability limits increased effective January 1, 2025. The page states no figures; confirm with the Department of Insurance before adding them.
- The deadline table is a summary and omits exceptions (delayed discovery, tolling, defendant absent from the state). Confirm the compliance note adequately signals this under California advertising rules.

**Civil Litigation**
- Small claims and limited civil dollar thresholds were raised effective January 1, 2024 and may change again. The page states no figures; confirm before adding them.
- Time to trial in Los Angeles Superior Court varies by courthouse and year. The page says "one to two years"; sanity-check each quarter.

**Business Law**
- The non-compete employee notice requirement carried a specific compliance deadline in February 2024. The page describes the obligation without a date; confirm current requirements.
- California privacy law applicability thresholds adjust. The page states none; confirm with the Privacy Protection Agency before adding them.
- Minimum wage and salary-exempt thresholds change annually and are omitted by design.

**Corporate Law**
- Minimum franchise tax amount and the LLC revenue-based fee tiers are omitted by design. Confirm with the Franchise Tax Board before adding any.
- First-year franchise tax exemptions have been enacted and allowed to expire in recent years. Do not state a first-year rule without confirming current law.
- Federal beneficial ownership reporting under the Corporate Transparency Act changed substantially in 2025 and is not discussed. Confirm the current requirement before adding a section.
- The California securities notice filing deadline for the limited offering exemption is omitted; confirm with the Department of Financial Protection and Innovation.

**Outside General Counsel**
- **Pricing and engagement structure have not been supplied.** The page describes the arrangement without figures. Supply the model (monthly subscription, hour bank, or discounted hourly) and any included-hours terms. This is the one practice page with a genuine content gap rather than a verification item.
- The written fee agreement threshold in Business and Professions Code section 6148 is described as "a modest statutory threshold" rather than stated. Confirm before adding the figure.

**Trademarks**
- USPTO fees were restructured in January 2025. The page states no dollar figures; confirm the fee schedule link resolves and decide whether to publish current fees.
- Examination pendency varies. The page says "roughly a year to a year and a half"; confirm against published USPTO pendency each quarter.

**Cannabis Law**
- The cannabis excise tax rate has changed recently and legislation has moved in both directions. The page states no rate. Confirm against the CDTFA guide before launch and each quarter.
- Federal scheduling: a rescheduling proceeding has been pending. The page states Schedule I; confirm before launch.
- Provisional licenses: the statutory wind-down has had multiple deadline changes. The page does not discuss them; add a section only if the current rule is confirmed.
- The owner definition threshold (twenty percent aggregate) should be confirmed against the current text of Business and Professions Code section 26001.

**Wills & Trusts**
- Small estate affidavit and simplified petition thresholds adjust periodically, and a separate primary-residence threshold was added effective April 1, 2025. The page states no figures; confirm with the Judicial Council.
- Probate Code sections 10800 and 10810 percentages are stable but should be confirmed. The page describes the structure without reproducing the schedule.
- The federal estate tax exemption changes annually and faces a scheduled sunset. Not discussed; confirm before adding.
- The Proposition 19 exclusion cap adjusts for inflation. The page states no figure.

**Real Estate Law**
- The Tenant Protection Act rent cap formula and ceiling, and the security deposit limit that changed effective July 1, 2024 with a small-landlord exception, are omitted by design. Confirm before adding any.
- Unlawful detainer response deadlines changed effective January 1, 2025. The page states no deadline; confirm before adding one.
- The partition buyout procedure derives from the Partition of Real Property Act. Confirm the current California codification before describing the mechanics further.
- The security deposit itemization deadline is described as "a set period"; confirm the current period in Civil Code section 1950.5.

## Nice to have

- Parking or transit note for the Contact page (partners reported none).
- One environmental photo (office or conference room) for Contact.
- Confirmation of whether partner emails (chris@ / daniel@) should appear on bio pages.
- Partner quotes for practice pages and articles (drafted in Phases 3 and 5 for approval).
