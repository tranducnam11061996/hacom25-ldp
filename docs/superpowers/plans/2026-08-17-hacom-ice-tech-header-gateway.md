# HACOM Ice-Tech Header Gateway Implementation Plan

> **For Codex:** Execute this plan task-by-task in the current workspace. Preserve unrelated dirty-worktree changes and keep every existing header, category, flyout, carousel, and accessibility contract intact.

**Goal:** Rebuild the entire above-the-fold HACOM header and gateway as a bright, high-impact white/ice-blue technology experience that closely follows the approved reference while retaining all current content and behavior.

**Architecture:** Keep the existing static HTML/CSS/JavaScript structure and public contracts. Add a dedicated `header-tech` media system, refine the existing header/gateway DOM only where visual hierarchy requires it, and replace the final scoped CSS blocks with a responsive Ice-Tech composition. Reuse the existing carousel and flyout controllers instead of introducing a parallel implementation.

**Tech Stack:** HTML5, scoped CSS, vanilla JavaScript, Font Awesome, Inter, Node test runner, Stylelint/ESLint, isolated Chrome via project browser scripts.

---

## Contracts that must not change

- `#gatewayCarousel`, `[data-carousel-root]`, `[data-carousel-track]`, `data-carousel-variant="gateway"`, three carousel slides, and the current controller behavior.
- Exactly four `[data-gateway-fixed-tile]` elements outside the carousel track.
- `#gatewayFlyout`, `[data-gateway-category]`, category/flyout ARIA relationships, keyboard navigation, and focus return.
- All 21 desktop category items and every existing submenu group, label, URL/demo action, and responsive mobile menu view.
- `#headerRegionPanel`, `#headerUtilityPanel`, `[data-header-panel-trigger]`, `[data-header-panel]`, search behavior, account/cart content, and current bottom navigation.
- Existing Font Awesome and Inter dependencies; no new package dependency or public JavaScript API.

## Task 1: Generate and approve the visual source of truth

**Files:**
- Create: `design/generated/hacom-ice-tech-desktop.png`
- Create: `design/generated/hacom-ice-tech-tablet.png`
- Create: `design/generated/hacom-ice-tech-mobile.png`

1. Generate one standalone desktop above-fold UI reference using the supplied screenshot as composition guidance: red utility ribbon, translucent white header, 21-item category rail, three-slide center hero, four fixed banners, and a white/ice-blue technology environment.
2. Generate fresh standalone tablet and mobile references in the same visual system; do not crop the desktop image.
3. Inspect each reference at full size and record the implementable design decisions: heights, gutters, ratios, typography scale, radius, border, shadow, gradient, backdrop density, and responsive ordering.
4. Reject/regenerate any image that introduces dark navy slabs, purple gradients, illegible microcopy, embedded promotional text, extra cards, or changed menu counts.

## Task 2: Generate production artwork as independent assets

**Files:**
- Create: `assets/media/header-tech/hero-akko.webp`
- Create: `assets/media/header-tech/hero-performance.webp`
- Create: `assets/media/header-tech/hero-builder.webp`
- Create: `assets/media/header-tech/tile-build-pc.webp`
- Create: `assets/media/header-tech/tile-headphones.webp`
- Create: `assets/media/header-tech/tile-showroom.webp`
- Create: `assets/media/header-tech/tile-earbuds.webp`
- Create: `assets/media/header-tech/tech-bg-desktop.webp`
- Create: `assets/media/header-tech/tech-bg-tablet.webp`
- Create: `assets/media/header-tech/tech-bg-mobile.webp`

1. Generate each campaign scene separately with a light white/ice-blue studio environment, restrained HACOM red/blue accents, clean product silhouette, and usable negative space.
2. Keep all generated artwork free of text, logos, prices, CTAs, watermarks, and unrelated props; copy remains real HTML/CSS.
3. Generate desktop, tablet, and mobile technology backgrounds separately with low-contrast circuit traces and perspective-floor geometry.
4. Convert selected outputs to WebP without adding a dependency, retain source files under `design/generated/`, and verify dimensions/aspect ratios and file sizes.
5. Inspect every final asset for malformed hardware, accidental text, unusable crops, or low-contrast subject separation before integration.

## Task 3: Reshape the header and gateway markup

**Files:**
- Modify: `index.html`
- Test: `tests/homepage.test.mjs`

1. Preserve the utility content and responsive panel triggers while grouping the logo, dominant search, builder, account, and cart into the visual command deck shown by the approved design.
2. Keep full accessible names on icon-only tablet/mobile actions and preserve visible copy on desktop.
3. Add the visible desktop category heading “Danh Mục Sản Phẩm” above the existing 21 buttons without changing their number or order.
4. Point the three carousel slides and four fixed tiles to the new artwork assets while retaining their existing semantic buttons, ARIA labels, priority/loading strategy, and placement outside/inside the track.
5. Add a visible three-dot indicator group inside `#gatewayCarousel`, wired to the existing `[data-carousel-indicator]` contract.
6. Add real HTML/CSS campaign overlays only where they improve parity with the reference; never bake copy into generated images.
7. Extend tests first/alongside markup changes to assert 21 categories, existing submenu contracts, exactly three slides, four fixed tiles outside the track, new asset paths, indicator count, and unchanged panel/flyout IDs.

## Task 4: Implement the Ice-Tech visual system

**Files:**
- Modify: `assets/styles.css`
- Test: `tests/homepage.test.mjs`

1. Add scoped tokens for the red utility gradient, ice surfaces, cool border, navy text, controlled red accent, blue depth shadow, panel radius, and responsive gutters using existing brand tokens as the base.
2. Rebuild `.site-header--reference`: 40–42px utility ribbon, 90–96px translucent white main header, dominant white search field, red gradient search action, and compact builder/account/cart command tiles.
3. Create the continuous gateway backdrop using the generated responsive technology textures plus CSS gradients; keep contrast quiet enough for navigation and product art.
4. Rebuild the desktop gateway grid at `min-width: 1181px`: category column, four-column center carousel, top-right fixed tile, and three fixed lower tiles with reference-matched gaps and radii.
5. Style the category heading and 21 rows as a clean white navigation surface with red icons/chevrons and an unmistakable selected/hover state.
6. Restyle the full-stage flyout as an aligned ice-white information surface while preserving its current layout and every submenu item; remove visual nesting where a divider or shared background is sufficient.
7. Set campaign-specific `object-position`/overlay contrast so hardware remains visible at desktop ratios and controls never cover essential product detail.
8. At `768px–1180px`, hide the desktop category column, make the carousel full width, and render the four fixed tiles as a manual ~42% horizontal rail.
9. At `max-width: 767px`, compact the utility/header, keep logo/menu/search immediately usable, make the carousel full width, and render the fixed rail at ~84% without page-level horizontal overflow.
10. Add clear `:focus-visible`, 44px targets, hover feedback, compositor-friendly 160–220ms transitions, and complete `prefers-reduced-motion` handling.

## Task 5: Keep JavaScript metadata and interaction contracts aligned

**Files:**
- Modify: `assets/app.js`
- Test: `tests/homepage.test.mjs`
- Test: `tests/carousel.test.mjs`

1. Update `window.HacomGatewayData.campaignSets` labels/asset metadata to the new AKKO, Performance, and Builder artwork while preserving the object shape.
2. Confirm that `initGatewayMenu()` still pauses/resumes the controller through `#gatewayCarousel` and that flyout open/close behavior remains unchanged.
3. Confirm indicator clicks, previous/next, autoplay at 3000ms, swipe/drag, hover/focus pause, visibility/IntersectionObserver pause, and reduced-motion behavior are already handled by `assets/carousel.js`; change that file only if a failing contract proves necessary.
4. Keep responsive header panels mutually exclusive and preserve outside-click, Escape, breakpoint reset, and focus-return behavior.

## Task 6: Run automated verification

**Files:**
- Verify: `index.html`
- Verify: `assets/styles.css`
- Verify: `assets/app.js`
- Verify: `tests/homepage.test.mjs`
- Verify: `tests/carousel.test.mjs`

1. Run `npm test` and fix only regressions introduced by this redesign.
2. Run `npm run lint` and `npm run typecheck`.
3. Run `git diff --check`.
4. Run `npm run verify`; accept only the documented baseline failure caused by the unrelated modified `AGENTS.md` requirement, and ensure no new verification failure is introduced.
5. Inspect the scoped diff to confirm no section below the gateway, catalog schema, dependency, or unrelated dirty-worktree file was altered.

## Task 7: Isolated browser smoke test and visual refinement

**Files:**
- Read before browser use: `BROWSER_AUTOMATION_RULES.md`
- Read before browser use: `BROWSER_AUTOMATION_GUIDE.md`
- Verify URL: `file:///D:/hacom25-ldp/index.html`

1. Read both project browser documents completely and inspect console/page errors before any final application-code refinement.
2. Start the dedicated isolated browser with `scripts/browser-automation.ps1 -Action Start` and attach to CDP port 9333 with a named `hacom-local` session.
3. Test widths 390, 767, 768, 1180, 1181, 1440, and 1920px: no page-level horizontal overflow, clipped search/actions, overlapping controls, or unstable header heights.
4. Verify utility/main sticky behavior, responsive panels, desktop flyout alignment, keyboard navigation, Escape/focus return, and visible focus rings.
5. Verify that only the center hero changes after each 3000ms interval; all four fixed tiles retain source, geometry, and position. Verify previous/next, dots, mouse drag, touch swipe, hover/focus pause, flyout pause, and reduced motion.
6. Capture desktop, tablet, and mobile screenshots, compare them against the generated references and supplied source image, and make one focused visual-polish pass for proportions, gradients, and crop positions.
7. Re-run console/page-error checks, stop the named browser session, and stop the isolated Chrome instance.

## Completion checklist

- The first viewport reads as one bright white/ice-blue technology environment with HACOM red as the decisive accent.
- Header composition, category rail, carousel, fixed mosaic, and responsive hierarchy closely match the approved reference.
- All 21 menu items and every submenu remain present and usable.
- AI artwork is original, clean, text-free, responsive, and stored under `assets/media/header-tech/`.
- Exactly three center slides autoplay; exactly four surrounding banners remain fixed.
- Automated checks pass except the explicitly documented unrelated baseline verify issue.
- Isolated browser testing is complete at all requested widths with screenshots and no new console/page errors.
