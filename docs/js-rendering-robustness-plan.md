# JS Rendering Robustness Plan (SUS-SOIL)

## Why this matters
- The site is currently a client-rendered React SPA.
- If JavaScript fails or is blocked, users and crawlers get a reduced experience.
- This affects robustness, progressive accessibility, and part of technical SEO.

## What is already improved
- `index.html` now includes a meaningful `<noscript>` fallback:
  - Clear context message (not a hard error-only screen).
  - Direct links to key public sections.
  - Institution-aligned visual style and mobile support.

## Recommended rollout

### Phase 1 (already done): Safe fallback
- Keep `<noscript>` with:
  - Project context.
  - Navigation links to core pages.
  - Short note for full JS mode.

### Phase 2: Pre-render critical routes
Target these first:
- `/`
- `/project/about`
- `/news`
- `/resources/materials`
- `/resources/practice-abstracts`
- `/contact`

Current implementation in this repo:
- `scripts/prerender-routes.mjs`
- Runs automatically after `vite build` via `postbuild`.
- Uses `vite preview` + Puppeteer snapshot per critical route.

Expected outcomes:
- Better first paint for users and crawlers.
- HTML with meaningful body content at request time.
- Lower dependence on JS for core discoverability.

## Technical options

### Option A (recommended): Vite + pre-render plugin
- Add a pre-render step for selected routes only.
- Keep SPA behavior for dynamic/detail pages.
- Lowest migration risk.

### Option B: Migrate to SSR framework
- Next.js/Remix/Astro hybrid setup.
- Higher impact and effort.

## Verification checklist
- `curl -s https://sus-soil.eu | head -n 120` shows meaningful content.
- Search Console “URL Inspection”:
  - Test rendered HTML for `/`, `/news`, `/resources/practice-abstracts`.
- Lighthouse:
  - SEO and Accessibility no regressions after pre-render.

## Guardrails
- Keep canonical and meta tags route-consistent.
- Maintain cookie and legal links accessible in fallback.
- Avoid duplicating incompatible scripts in pre-render output.
