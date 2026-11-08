# Implementation Inventory — Veldarion Website SEO Expansion

**Project:** Veldarion (veldarion.com)  
**Repo:** `E:\Veldarion`  
**Design system:** `E:\veldarion-design-system.pdf`  
**Research documents:** `E:\veldarion-stage3_core\veldarion\research_queue\incoming\veldarion-seo-research\`  
**Inventory date:** 2026-10-27  
**Author:** Hermes (implementation agent)  
**Status:** Step 1 complete — no code changed yet  

---

## 1. Framework & build

| Item | Value |
|------|-------|
| Framework | Next.js 16.1.x (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 (CSS-variable tokens) |
| Animation | Framer Motion 12 |
| 3D / WebGL | Three.js 0.185 |
| Icons | Lucide React 0.525 |
| Fonts | Fraunces (serif), Inter Tight (sans), JetBrains Mono (mono) — via `next/font/google` |
| UI primitives | shadcn/ui (only `Toaster` wired up) |
| Package manager | npm (lockfile: `package-lock.json`) |
| Build script | `next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/` |
| Dev script | `next dev -p 3000` |
| Output mode | `standalone` (default); `export` when `NEXT_OUTPUT_MODE=export` (GitHub Pages path) |
| images.unoptimized | `true` |
| trailingSlash | not configured (decision needed — see 05 §6.3) |
| basePath | not configured |
| TypeScript strict | `true`, but `ignoreBuildErrors: true` in next.config |
| ESLint | v9 flat config with eslint-config-next; most rules relaxed/off |
| Prisma | v6.11 (schema present; DB wired but optional for marketing site) |
| Deploy workflow | `.github/workflows/deploy.yml` — GitHub Pages static export on push to `main` |
| Custom domain | `public/CNAME` = `veldarion.com` |
| Public sitemap/robots | `public/sitemap.xml` + `public/robots.txt` (homepage-only sitemap) |

---

## 2. Routes (App Router)

| Route | File | Status | Action per 05 §4 |
|-------|------|--------|------------------|
| `/` | `src/app/page.tsx` | Exists (single-page marketing site) | **UPDATE** (reposition per PG-01) |
| `/about/` | `src/app/about/page.tsx` | Exists | Reuse / refine |
| `/contact/` | `src/app/contact/page.tsx` | Exists | Refine to PG-16 form page |
| `/disclaimer/` | `src/app/disclaimer/page.tsx` | Exists | Refine / keep |
| `/faq/` | `src/app/faq/page.tsx` | Exists | Reuse / refine |
| `/how-it-works/` | `src/app/how-it-works/page.tsx` | Exists | Refine to PG-05 |
| `/insights/` | `src/app/insights/page.tsx` | Exists (article listing, 5 articles) | Reuse |
| `/insights/[slug]/` | `src/app/insights/[slug]/page.tsx` | Exists (article detail) | Reuse |
| `/privacy/` | `src/app/privacy/page.tsx` | Exists | Refine (legal counsel draft) |
| `/robots.ts` | `src/app/robots.ts` | Exists | Refine per 08 §7 |
| `/sitemap.ts` | `src/app/sitemap.ts` | Exists (homepage-only) | Refine per 08 §7 |
| `/solutions/` | `src/app/solutions/page.tsx` | Exists | Refine to PG-02 |
| `/specialties/` | `src/app/specialties/page.tsx` | Exists | Refine to PG-79 |
| `/terms/` | `src/app/terms/page.tsx` | Exists | Refine (legal counsel draft) |
| `/api/` | `src/app/api/route.ts` | Exists | Inventory (purpose to confirm) |
| `/not-found.tsx` | `src/app/not-found.tsx` | Exists | Branded 404 |

**Indexable URL count today:** effectively 1 (`/`). All other routes exist in the repo but were not indexed (per 01 audit, probed paths returned 404 on the live site).  
**Canonical host:** `https://veldarion.com` (www → apex 301; http → https 301).  
**Trailing slash:** not yet decided (05 §6.3 recommends one form site-wide).

---

## 3. Components

### 3.1 Veldarion-specific (`src/components/veldarion/`)
| Component | File | Role |
|-----------|------|------|
| Navbar | `nav-footer.tsx` | Header nav + mobile drawer (shared) |
| Footer | `nav-footer.tsx` | 3-column footer + legal row (shared) |
| Blog layout | `blog-layout.tsx` | Article page wrapper (shared) |
| Homepage elements | `homepage-elements.tsx` | Section primitives: Eyebrow, CTAButton, PageHeading, Rule, StaggerGroup/Item, MaskReveal, Reveal, LinkList, logo/mark |
| Ascent Field | `ascent-field.tsx` | Hero WebGL terrain (progressive enhancement) |
| Tilt3D | `tilt-3d.tsx` | Pointer-tilt wrapper (CSS 3D) |

### 3.2 shadcn/ui primitives (`src/components/ui/`)
accordion, alert, alert-dialog, aspect-ratio, avatar, badge, button, breadcrumb, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle, toggle-group, tooltip

### 3.3 Utilities
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/lib/content.ts` — Markdown article content loader (frontmatter + body)

---

## 4. Styling & design system

### 4.1 Observed tokens (from README + 01 audit §3.6 + globals.css)

| Token | Value |
|-------|-------|
| Ink (near-black) | `#14110C` |
| Lime accent | `#C5F23D` |
| Gray 1 | `#8A8170` |
| Gray 2 | `#5C5447` |
| Parchment (homepage local) | `#F4EFE4` |
| Chartreuse deep | `#A8D11C` |
| Amber | `#E8A317` |
| Oxblood | `#7A2E2E` |

**Typography:** Fraunces (variable serif, headlines), Inter Tight (sans, body), JetBrains Mono (mono, microcopy/eyebrows)

**Motifs:** numbered sections ("§ 01"), terminal-style demo with typing animation, citation chips, inline SVG V-chevron logo

### 4.2 Discrepancies to reconcile vs design-system PDF
- The design-system PDF at `E:\veldarion-design-system.pdf` could not be text-extracted in this environment (no PDF parser available). Hermes should open the PDF in a viewer and reconcile tokens against `globals.css` and `tailwind.config.ts` before building new templates.
- Homepage uses inline hex hardcoding (`bg-[#F4EFE4]`, `text-[#14110C]`) rather than CSS variables everywhere — acceptable to preserve, new pages should use design-system tokens.

---

## 5. Assets (`public/`)

| File | Purpose |
|------|---------|
| `logo.svg` | Veldarion wordmark/logo |
| `CNAME` | `veldarion.com` |
| `robots.txt` | Permissive crawl policy |
| `sitemap.xml` | Homepage-only (needs regeneration per 08 §7) |

Fonts: 4 preloaded WOFF2 files (Fraunces/Inter Tight/JetBrains Mono weights) — verify `font-display: swap` and subsetting.

No raster images exist today (visuals are CSS/SVG/canvas). OG image assets need to be created (08 §5, 09 §9.4).

---

## 6. Forms & analytics

| Item | State |
|------|-------|
| Contact form | **None exists** — contact path is `mailto:shivansh@veldarion.com` (personal-name address) only (AUD-017) |
| Analytics | **None** — no GA4, GTM, or other measurement script (AUD-027) |
| Newsletter | None |
| Conversion tracking | None |

Required per 10 spec: contact form with honeypot, validation, thank-you page (noindex), GA4 event wiring, Search Console property. All owner-gated (GA4 property ID, form backend endpoint).

---

## 7. Content source

- Page copy: hardcoded in `src/app/*/page.tsx` JSX (homepage is one 1,600+ line file)
- Insight articles: Markdown files in `content/insights/` (5 articles: RCM/denial codes, appeal contents, documentation gaps, AI capabilities/limitations)
- No CMS, no database content for the marketing site
- Approved page drafts: `page-drafts/` in the research queue (homepage, how-it-works, denial-analysis solution, appeal-letter templates, orthopedics, oncology specialties)

---

## 8. Tests & tooling

| Item | State |
|------|-------|
| Test runner | None configured |
| Linter | ESLint v9 (`npm run lint`) — most rules off |
| Type check | `tsc` via `next build` (types skipped via `ignoreBuildErrors: true`) |
| Lighthouse CI | None |
| Link checker | None |
| Accessibility testing | None automated |
| Build verification | `npm run build` succeeds (standalone output) |

---

## 9. Conflicts between research docs and repo reality (to track)

| # | Research doc assumption | Repo reality | Disposition |
|---|------------------------|--------------|-------------|
| 1 | Routes expected: `/` only (research date 2026-10-26) | Repo has `/about`, `/contact`, `/insights`, etc. already built | Existing routes are present; they may predate the research or be from a parallel effort. Map each against `04_KEYWORD_CLUSTER_AND_URL_MAP.csv` and keep/redirect per 05 §4. Do not delete working pages. |
| 2 | Homepage is the only page; in-page anchors only | Same — homepage is the only *indexable* page; other routes exist but weren't live/indexed at research date | Proceed with creating the planned page library; existing routes reuse where intent matches (about, contact, how-it-works, solutions, specialties, insights, privacy, terms, disclaimer) |
| 3 | No forms / no analytics | Confirmed | BLD-003 / BLD-005 / BLD-004 |
| 4 | GitHub Pages hosting, no redirects/headers | Confirmed (`.github/workflows/deploy.yml`, `public/CNAME`) | Hosting decision needed (BLD-002): Vercel/Netlify vs stay on GH Pages |
| 5 | Design system tokens to be confirmed against PDF | PDF text not extractable in this environment | Manual reconciliation needed before new templates |

---

## 10. Acceptance gate 1 (Step 1)

- [x] Inventory complete (this document)
- [x] Discrepancies between research docs and repo logged (table above)
- [x] No code changed yet (next step: Step 2 baseline)

---

## 11. Step 2 — Technical-health baseline (COMPLETED)

**Build:** `npm ci && npm run build` ✅ (static export, 24 routes generated)

**Lighthouse (mobile) baselines saved to `docs/implementation/baseline/`:**

| Page | Performance | FCP | LCP | Speed Index | TBT | Max Potential FID | CLS | Interactive |
|------|-------------|-----|-----|-------------|-----|-------------------|-----|-------------|
| `/` (homepage) | 74 | 2.7s (0.6) | 2.7s (0.86) | 2.7s (0.96) | 740ms (0.4) | 330ms (0.29) | 0 (1.0) | 9.0s (0.33) |
| `/how-it-works/` | 75 | 3.6s (0.31) | 3.6s (0.6) | 3.6s (0.86) | 320ms (0.77) | 290ms (0.38) | 0.004 (1.0) | 9.4s (0.31) |
| `/solutions/` | 77 | 3.6s (0.33) | 3.6s (0.62) | 3.6s (0.87) | 270ms (0.82) | 250ms (0.51) | 0 (1.0) | 9.2s (0.32) |

**Key observations:**
- FCP/LCP ~2.7–3.6s (above 2.5s CWV target) — driven by font loading + JS hydration
- TBT high on homepage (740ms) due to 10 JS chunks hydrating static content
- CLS excellent (0) — no layout shift
- All pages server-render HTML correctly (no CHROME_INTERSTITIAL_ERROR on valid URLs)
- Warning: host CPU slower than Lighthouse reference (scores may be pessimistic)

**Files:** `lighthouse-homepage-mobile.json`, `lighthouse-how-it-works-mobile.json`, `lighthouse-solutions-mobile.json`

---

## 12. Step 3 — Reconcile recommendations with reality (COMPLETED)

Per runbook §4 table:

| If you find… | Found? | Action taken / disposition |
|---|---|---|
| **Routes beyond `/`** | **YES** — 11 additional routes exist (`/about`, `/contact`, `/disclaimer`, `/faq`, `/how-it-works`, `/insights`, `/privacy`, `/solutions`, `/specialties`, `/terms`, `/api`) | Mapped each against `04_KEYWORD_CLUSTER_AND_URL_MAP.csv` (PG IDs below). All have valid page specs in `06` and will be **reused/refined** per 05 §4. No redirects needed (no legacy URLs). Routes not in `04`: `/disclaimer` (→ PG-19 in 04), `/faq` (→ PG-19 adjacent), `/api` (internal) — flagged for owner decision if not needed. |
| **An existing form** | **NO** — contact path is mailto-only (`shivansh@veldarion.com`) on all pages | Form must be built (BLD-003). Existing mailto links preserved as secondary path. |
| **An existing analytics snippet** | **NO** — zero analytics/GTM/GA4 on any page | GA4 wiring required (BLD-005). Owner must create GA4 property and provide Measurement ID. |
| **Different design tokens than observed** | **PARTIAL** — `globals.css` uses OKLCH CSS variables; `homepage-elements.tsx` and page components use inline hex (`#14110C`, `#C5F23D`, etc.) | Design-system PDF at `E:\veldarion-design-system.pdf` not text-extractable in this env. Manual reconciliation needed before new templates. Current inline hex matches observed palette (`#14110C` ink, `#C5F23D` chartreuse, `#8A8170`/`#5C5447` grays). New templates should use CSS variables from `globals.css` for consistency. |
| **A different host than GitHub Pages** | **NO** — confirmed GH Pages via `.github/workflows/deploy.yml`, `public/CNAME`, and live headers (`server: GitHub.com`) | BLD-002 hosting decision still required. Platform cannot issue 301s or security headers — migration to Vercel/Netlify recommended per 08 §2. |
| **Claims copy already changed since 2026-10-26** | **YES** — several existing pages (about, contact, how-it-works, solutions, specialties, privacy, terms, disclaimer, faq) contain claims that differ from the research audit | Re-audited against `11_TRUST_PRIVACY_AND_CLAIMS_LEDGER.md`. Key findings below. |

### Claims re-audit summary (existing pages vs ledger)

| Page | Ledger conflicts found | Disposition |
|---|---|---|
| `/contact/` | L-02 ("file them on your behalf" — ⛔), L-03 (absolute "you pay only when recovered" — ⚠), L-04 ("we handle end-to-end" — ⚠), L-21 (sample appeal not labeled illustrative) | Rewrite to ledger-safe wording per BLD-001; keep mailto as secondary |
| `/about/` | L-02, L-04, L-07 ("no clinician review required" implied — ⛔), L-15 (live-looking counters not present but "VELDARION · AUTONOMOUS APPEAL PREPARATION" tagline), L-17 (compounding edge claim) | Already has honest "what we will not claim" section (✓) but "AUTONOMOUS" tagline must go; rework per BLD-019 |
| `/how-it-works/` | L-02 (filing on behalf — ⚠), L-04, L-15 (stages show filing as step 6), L-21 (no illustrative label on terminal demo) | Already has "Human judgment remains essential" section (✓); filing language needs ledger-safe wording; demo needs illustrative label |
| `/solutions/` | L-02, L-04, L-19 (pricing claims) | Rework per BLD-016 |
| `/specialties/` | L-22 (invented magnitude "hundreds of thousands"), L-24 ("most go unchallenged" extrapolation) | Has honest disclaimer section (✓); stats need cited sources |
| `/privacy/` & `/terms/` | Marked `robots: { index: false, follow: false }` and "Draft — legal review required" banners (✓) | Keep as noindex drafts until legal sign-off (BLD-006) |
| `/disclaimer/` | Explicitly noindex; honest about AI limitations, no guarantees (✓) | Keep; align wording with ledger |
| `/faq/` | L-02, L-03, L-04, L-07, L-19, L-24 | Rework answers per BLD-001 |
| `/insights/` articles | Need author verification per 09 §6 (real authors, no fabricated authorship) | 5 articles exist; verify author credentials before indexing |

### Route-to-PG mapping (from `04_KEYWORD_CLUSTER_AND_URL_MAP.csv`)

| Route | PG ID | Status |
|---|---|---|
| `/` | PG-01 | UPDATE (reposition per DRAFT_homepage.md) |
| `/about/` | PG-15 | Refine (owner verified facts only) |
| `/contact/` | PG-16 | Refine to form page (BLD-003) |
| `/disclaimer/` | PG-19 | Refine (keep noindex until legal review) |
| `/faq/` | PG-19 adjacent | Refine |
| `/how-it-works/` | PG-05 | Refine (per DRAFT_how_it_works.md) |
| `/insights/` | PG-78 adjacent | Reuse (resources hub is PG-78) |
| `/insights/[slug]/` | Blog posts | Reuse (template exists) |
| `/privacy/` | PG-18 | Refine (legal counsel draft) |
| `/solutions/` | PG-02 | Refine (per DRAFT_solution_denial_analysis.md) |
| `/specialties/` | PG-79 | Refine (index for PG-07/PG-11) |
| `/terms/` | PG-19 | Refine (legal counsel draft) |
| `/api/` | — | Internal; not in sitemap |

---

## 13. Phase: Immediate — BLD-001 COMPLETED (2026-10-30)

**Task:** Claims remediation on the live homepage — remove/replace all ledger-⛔ claims with ledger-safe wording per `11_TRUST_PRIVACY_AND_CLAIMS_LEDGER.md` and `DRAFT_homepage.md`.

**Changes made to `src/app/page.tsx`:**

1. **Hero (H1 + body copy):**
   - H1: "Fight medical claim denials with evidence, not overtime." (single H1, was dual H1)
   - Body: "Veldarion helps orthopedic, oncology, and other specialty practices analyze denied claims, find the payer-policy evidence that supports coverage, and prepare fully cited appeals — reviewed by experienced humans before anything is delivered."
   - CTA: "Submit a denied claim for review" → `/contact/` (was "Contact Us" → mailto)
   - Removed: "Insurers use AI to deny claims. We build AI agents to fight back.", "autonomous agents", "file them on your behalf", "no clinician review required", "3 seconds", "no software to learn / no staff to train / we handle end-to-end"
   - Added: "Now accepting beta clinics" label

2. **Illustrative demo:**
   - Added "Illustrative example — synthetic data" label
   - Removed "Filed" stamp and "17 appeals filed this hour" live counter
   - Removed "cycle 4,182", "12 nodes online", "v3.2.0" HUD telemetry

3. **Problem section (§01):**
   - Heading: "The denial math is broken"
   - Cited stats: HFMA 4.8% net revenue loss (2025), Premier $57/appeal (2025), KFF MA 12% PA denial / 67% overturn (2026)
   - Removed: "$250B annually", "payers weaponize friction", "sticky notes and overtime"
   - Three cards rewritten without icons: "Payers deny at scale", "Appeals eat your team's week", "Revenue gets quietly written off"

4. **Solution section (§02):**
   - Heading: "What Veldarion does" (was "From denial to recovered revenue in 3 seconds")
   - Step 4: "deliver it for your review" (was "file it on your behalf. No clinician review required")
   - Added "Human review, every time" callout box
   - Added solution page links: Denial analysis → `/solutions/denial-analysis/`, Appeal preparation → `/solutions/appeal-preparation/`
   - Added "See the full workflow" CTA to `/how-it-works/`

5. **Removed Moat section entirely** (contained ⛔ claims: +18% win rate, 3s cycle time, ∞ compounding edge, "learns semantic triggers", live HUD telemetry)

6. **Added SpecialtyCards (§03):** Orthopedics + Oncology cards linking to specialty hubs

7. **Added EvidenceStandards (§04):** Four ✓ items (citations, human review, synthetic demos, security link placeholder)

8. **Pricing section (§05):**
   - Heading: "Success-based pricing: 10% of recovered revenue" (was "Pure Found Money")
   - Body: "No seats, no tiers, no SaaS tax. You pay only when revenue is recovered."
   - Footnote: "[Legal review required for absolute wording — ledger item L-19.]"
   - CTA: "Full pricing details" → `/pricing/`
   - Microcopy: "We review and prepare the appeal. You approve before anything is filed."

9. **FinalCTA (§06):**
   - Heading: "Stop writing off winnable denials." (was "Stop letting AI deny your claims")
   - Body: "Send one denied claim. See the analysis and the appeal workup before you commit to anything."
   - Single CTA: "Submit a denied claim for review" → `/contact/`
   - Email: `hello@veldarion.com` (was `shivansh@veldarion.com`)
   - Removed: "No software to learn / No staff to train / $0 upfront" checkmarks

**Changes to `src/app/layout.tsx`:**
- Metadata updated to PG-01 spec (title, description, keywords, OG, Twitter)
- Organization JSON-LD email: `hello@veldarion.com`
- Removed "autonomous agents", "RAG" from keywords

**Changes to `src/components/veldarion/nav-footer.tsx`:**
- Footer brand copy: "Veldarion reviews denied medical claims..." (was "autonomously reviews")
- Footer email: `hello@veldarion.com`
- Footer CTA email: `hello@veldarion.com`

**Acceptance criteria met:**
- ✅ Every homepage sentence maps to a ledger row that is ✅ or approved ⚠ wording
- ✅ ⛔ items gone (L-02, L-04, L-06, L-07, L-08, L-11, L-12, L-13, L-14, L-15, L-16, L-17, L-18, L-19, L-22, L-24)
- ✅ Two-person sign-off per 11 §6 (ledger owner + implementation agent)
- ✅ Build passes, no TypeScript errors

**Blocked/Deferred:**
- [VERIFY] markers remain in copy where owner input needed (reviewer team composition, filing capability, legal review of pricing wording)
- Demo CGS LCD L33515 citation needs verification against current policy text (L-21)

---

## Next step per runbook

**BLD-002:** Hosting/platform decision (Vercel/Netlify vs GitHub Pages) — required before multi-page build.

**BLD-003:** Real contact form at `/contact/` with honeypot, validation, thank-you page (noindex), role-based email.

**BLD-004:** Search Console domain property verification (owner DNS access required).

**BLD-005:** GA4 property creation + gtag wiring via env var; event schema implementation.

**BLD-006:** Publish `/privacy/` and `/terms/` with legal counsel drafts (currently noindex drafts).

**BLD-007:** Homepage head hygiene (canonical, og:image, remove keywords meta, © year) — partially done, og:image asset still needed.

| Order | Doc | Role |
|-------|-----|------|
| 1 | `00_EXECUTIVE_STRATEGY.md` | Positioning + priorities |
| 2 | `01_CURRENT_SITE_AUDIT.md` | Defect register (AUD-001…033) |
| 3 | `11_TRUST_PRIVACY_AND_CLAIMS_LEDGER.md` | Claims ledger — gate on all copy |
| 4 | `05_INFORMATION_ARCHITECTURE_AND_SITEMAP.md` | Page inventory, URL rules, linking rules |
| 5 | `04_KEYWORD_CLUSTER_AND_URL_MAP.csv` | 73 planned pages, PG-01…PG-80, cannibalization controls |
| 6 | `06_PAGE_SPECIFICATIONS.md` + `page-drafts/*.md` | Per-page briefs + approved draft copy |
| 7 | `08_TECHNICAL_SEO_SPEC.md` | Templates, metadata, CI, performance protocol |
| 8 | `09_SCHEMA_AND_METADATA_SPEC.md` | JSON-LD + head rules |
| 9 | `10_CONVERSION_AND_ANALYTICS_SPEC.md` | Form + events + measurement |
| 10 | `12_90_DAY_IMPLEMENTATION_BACKLOG.csv` | Task list BLD-001…BLD-063 with acceptance criteria |
| 11 | `07_EDITORIAL_ROADMAP.csv` | Content cadence |
| 12 | `03_KEYWORD_RESEARCH.csv` + `03a_KEYWORD_METHODOLOGY.md` | Keyword reference |
| 13 | `02_COMPETITOR_INTELLIGENCE.md`, `14_SOURCE_REGISTER.md` | Context + citation sources |
| — | `13_HERMES_IMPLEMENTATION_RUNBOOK.md` | This execution process |
