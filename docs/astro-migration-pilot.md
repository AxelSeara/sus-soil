# Astro Migration Pilot (codex/astro-migration-pilot)

## Implemented in this branch

### Phase 1 - Astro foundation
- Added `astro.config.mjs` with `@astrojs/react` and `@astrojs/tailwind`.
- Switched default scripts to Astro:
  - `dev`: `astro dev`
  - `build`: `astro build`
  - `preview`: `astro preview`
- Kept legacy Vite scripts:
  - `dev:legacy`, `build:legacy`, `preview:legacy`, `postbuild:legacy`.
- Removed SPA catch-all rewrite from `vercel.json`.

### Phase 2 - Unified WordPress data layer
- Added unified WP modules:
  - `src/lib/wp/constants.js`
  - `src/lib/wp/client.js`
  - `src/lib/wp/adapters.js`
  - `src/lib/wp/index.js`

### Phase 3 - Global layout + metadata on Astro
- Added new shared layout and SEO:
  - `src/layouts/BaseLayout.astro`
  - `src/components/site/SeoHead.astro`
  - `src/components/site/SiteNav.astro`
  - `src/components/site/SiteFooter.astro`
- Added cookie preference center as React island:
  - `src/components/CookiePreferenceCenter.jsx`

### Phase 4 - Static/local route migration
- Added Astro pages for:
  - `/`
  - `/contact`
  - `/knowledge-cloud`
  - `/project/about`
  - `/project/work-packages`
  - `/project/partners`
  - `/resources`
  - `/living-labs`
  - `/living-labs/[regionId]`
  - `/living-labs/[regionId]/[labId]`
- Added `src/astro/LegacyRouteRenderer.jsx` + `src/components/LegacyPage.astro` for low-risk reuse.

### Phase 5 (partial) - WP content-heavy pages in Astro SSR/SSG
- Implemented Astro pages:
  - `/news`
  - `/news/[id]` (SSG from WP category posts)
  - `/event/[id]` (SSG from WP events, if available)
  - `/project/deliverables`
  - `/resources/materials`
  - `/resources/newsletter`
  - `/resources/practice-abstracts`

## Notes
- `npm run build` passes and generates static HTML routes for migrated pages.
- Event detail pages are generated only if WP returns items in `/wp-json/wp/v2/event`.

## Pending for next iteration
- Replace `LegacyRouteRenderer` pages with pure Astro/React-island page implementations.
- Migrate/replace remaining `react-helmet` usage still present in legacy React pages.
- Add WordPress publish webhook -> deploy hook documentation and setup.
- Tighten CSP for Astro output and test all embeds.
