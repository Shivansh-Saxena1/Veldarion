# Veldarion — Autonomous AI Agents That Overturn Denied Medical Claims

The single-page marketing site for **Veldarion** — a B2B AI healthcare service that builds autonomous agents to overturn denied medical claims for specialty clinics. This site is purely informational: clinics contact Veldarion, send us their denied EOBs, and our agents handle the appeal end-to-end.

**Live preview**: see the deployment URL provided when running `npm run dev`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 (CSS-variable tokens) |
| Animation | Framer Motion 12 |
| 3D / WebGL | Three.js 0.185 (The Ascent Field hero terrain + Tilt3D pointer tilt) |
| Icons | Lucide React 0.525 |
| Fonts | Fraunces (variable serif) · Inter Tight (sans) · JetBrains Mono (mono) — loaded via `next/font/google` |
| UI primitives | shadcn/ui (only `Toaster` is wired up) |

---

## Prerequisites

- **Node.js 18.18+** (Next.js 16 requires Node ≥ 18.18; Node 20 LTS or 22 LTS recommended)
- **npm 9+** (the repo is configured for `npm`; `pnpm`/`yarn` also work but you'll need to adjust lockfile commands)

Verify your versions:
```bash
node --version   # v18.18+ recommended
npm --version    # 9+ recommended
```

---

## Installation

### 1. Unzip the project

```bash
unzip veldarion.zip -d veldarion
cd veldarion
```

### 2. Install dependencies

```bash
npm install
```

This installs Next.js, React, Tailwind, Framer Motion, Three.js, Lucide, and all required dev dependencies. The install typically takes 60-90 seconds on a fast connection.

> If you see peer-dep warnings about React 19, they are safe to ignore — Next.js 16 officially supports React 19.

### 3. Run the dev server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser. The site hot-reloads on every save.

---

## Production Build

To create an optimized production build:

```bash
npm run build
npm run start
```

The `npm run build` step compiles the app into `.next/` (with Turbopack). The `npm run start` step serves the production build on port 3000.

> The default `build` script in this repo also copies the static assets to a `standalone` directory for containerized deployments — feel free to simplify it to just `next build` if you're not using `output: 'standalone'`.

---

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with Turbopack at `http://localhost:3000` |
| `npm run build` | Create an optimized production build in `.next/` |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | Run ESLint across the project |
| `npm run db:push` | (Optional) Push the Prisma schema — only if you wire up a database |

---

## Project Structure

```
veldarion/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — loads Fraunces / Inter Tight / JetBrains Mono fonts, sets metadata
│   │   ├── page.tsx            # The entire landing page (1,600+ lines): Navbar, Hero, Problem, Solution, Moat (Payer Denial Rules Graph), Pricing, Final CTA (Contact Us), Footer
│   │   └── globals.css         # Tailwind theme tokens — font variables, scroll-behavior, dark mode
│   └── components/
│       └── veldarion/
│           ├── ascent-field.tsx  # The Ascent Field — Three.js WebGL hero terrain (ink-line survey grid + chartreuse ascent ridge + signal pulse)
│           └── tilt-3d.tsx       # Tilt3D — spring-physics pointer tilt wrapper (CSS 3D transforms, mouse-only, reduced-motion safe)
├── public/                     # Static assets (favicon etc.)
├── next.config.ts              # Next.js config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config (path alias `@/` → `src/`)
└── package.json
```

The landing page content lives in `src/app/page.tsx` (all sections + inline motion primitives, the VeldarionMark/VeldarionLogo SVG, CTAButton, Highlight, CountUp, Eyebrow, Rule). The two 3D components live in `src/components/veldarion/` and are imported from the page.

---

## The 3D Layer

**The Ascent Field** (`src/components/veldarion/ascent-field.tsx`) is the hero's WebGL background: a topographic ink-line terrain with a chartreuse ridge rising through it (the logo's upward arrow in 3D; its height accelerates quadratically — the "compounding edge"). A signal pulse climbs the ridge on a 4.2s loop. It is **progressive enhancement**: `three` is dynamically imported after hydration, the render loop pauses when offscreen or the tab is hidden, DPR is capped (2 desktop / 1.5 mobile), the grid degrades on mobile, `prefers-reduced-motion` gets a single static frame, and everything is disposed on unmount.

**Tilt3D** (`src/components/veldarion/tilt-3d.tsx`) gives the appeal-letter card, the Rules Graph panel, and the pricing card a spring-physics pointer tilt (CSS 3D, no WebGL). Mouse pointers only; disabled under reduced motion.

> If WebGL is unavailable, the site degrades silently to the parchment background — nothing breaks.

---

## Customization Guide

### Change the contact email

All "Contact Us" CTAs scroll to `#contact` (the Final CTA section). The final "Contact Us" button itself opens `mailto:hello@veldarion.com`.

Find & replace `hello@veldarion.com` in `src/app/page.tsx` (appears twice: the `<CTAButton href="mailto:..." />` and the visible fallback link below).

### Change the pricing (currently 10% contingency)

Search for `10%` in `src/app/page.tsx` — it appears once in the Pricing section headline number. Update the body copy directly above it.

### Change the brand colors

All colors are defined as a single inline `C` token object near the top of `src/app/page.tsx`:

```ts
const C = {
  parchment:     "#F4EFE4",
  parchmentDim:  "#E8E0CF",
  parchmentDeep: "#DDD3BD",
  ink:           "#14110C",
  inkSoft:       "#2A2620",
  inkDim:        "#5C5447",
  inkMuted:      "#8A8170",
  chartreuse:    "#C5F23D",
  chartreuseDeep:"#A8D11C",
  amber:         "#E8A317",
  amberDeep:     "#B8800E",
  oxblood:       "#7A2E2E",
  oxbloodSoft:   "#9C3D3D",
};
```

Most usages are hardcoded hex values though (e.g. `bg-[#F4EFE4]`, `text-[#14110C]`). To retheme the whole site, find-and-replace those hex values globally.

### Swap the fonts

In `src/app/layout.tsx`, the three Google fonts are imported:
```ts
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
```
Swap any of these for another Google Font. Then in `src/app/globals.css`, update the `@theme inline` block:
```css
--font-sans: var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
--font-serif: var(--font-fraunces), ui-serif, Georgia, serif;
```

### Replace the logo

The Veldarion mark is the `VeldarionMark` component (around line 60 of `page.tsx`). It's a 40×44 viewBox SVG with two paths (a filled V + an upward arrow). Replace the path data or the entire SVG markup. The `VeldarionLogo` wrapper applies the mark + wordmark + spacing.

---

## Deployment

### GitHub Pages — veldarion.com (primary, free hosting + free SSL)

This repo ships with everything needed to host the site at **https://veldarion.com** on GitHub Pages:

- `.github/workflows/deploy.yml` — builds the static export and publishes it on every push to `main`
- `public/CNAME` — binds the custom domain `veldarion.com`
- `next.config.ts` — `NEXT_OUTPUT_MODE=export` flips the build to `output: "export"` (static site in `out/`)

**Full step-by-step guide (repo creation, DNS records, SSL): see [`DEPLOYMENT.md`](./DEPLOYMENT.md).**

Quick local test of the static export (doesn't touch the dev server's cache):

```bash
NEXT_OUTPUT_MODE=export NEXT_EXPORT_DIST_DIR=.next-export npx next build
npx serve .next-export
```

### Vercel (alternative)

1. Push the project to a GitHub repo.
2. In Vercel, click "Add New Project" and import the repo.
3. Vercel auto-detects Next.js. The default settings work — no env vars needed for the marketing page.
4. Deploy. Vercel will give you a `*.vercel.app` URL.

### Other platforms (Netlify / Render / self-host)

The site is a standard Next.js App Router project. Any Node-capable host works. For self-hosting:

```bash
npm run build
node .next/standalone/server.js
```

(Requires `output: 'standalone'` in `next.config.ts` — the repo's `build` script already copies `public/` and `.next/static/` into the standalone directory.)

---

## Troubleshooting

**`npm install` fails on Node 16/17** → upgrade to Node 18.18+ or 20 LTS.

**Dev server shows "port 3000 in use"** → `npx kill-port 3000` then retry.

**Fonts look like Times New Roman** → you're offline; `next/font/google` needs network on first run to fetch the variable font files. Once cached, subsequent runs work offline.

**Animations look static** → the site honors `prefers-reduced-motion`. macOS: System Settings → Accessibility → Display → uncheck "Reduce motion". Windows: Settings → Accessibility → Visual effects → uncheck "Animation effects".

**The hero terrain doesn't appear** → the WebGL layer loads after hydration (progressive enhancement). Check the browser console for WebGL errors; if the GPU blocklist blocks WebGL, the page still works — you just get the flat parchment background. On battery-saver modes some browsers disable WebGL by design.

**Stale CSS after editing `globals.css`** → Turbopack's persistent cache in `.next/` occasionally serves stale CSS after edits. Stop the dev server, delete `.next/`, and restart: `rm -rf .next && npm run dev`.

**ESLint warnings about `react/no-unescaped-entities`** → these were already fixed (apostrophes are escaped as `&apos;`). If you add new copy with apostrophes, escape them.

---

## License & Ownership

© 2024 Veldarion. All rights reserved. The design system (logo, palette, typography, motion primitives) is proprietary. See `veldarion-design-system.pdf` for the full design system reference.

Contact: **hello@veldarion.com**
