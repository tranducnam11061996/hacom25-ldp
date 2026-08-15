# HACOM Signal Editorial Spotlight Implementation Plan

> **For agentic workers:** Execute this plan inline task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat HACOM Signal card rail with the approved dynamic Editorial Spotlight carousel while preserving all other page sections and carousel behavior.

**Architecture:** Keep the existing infinite carousel controller and add an opt-in `spotlight` variant driven by data attributes. The first story item is the active spotlight; transition-only classes coordinate width and track motion, while the default carousel path remains unchanged.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js test runner, Agent Browser over isolated Chrome CDP.

## Global Constraints

- Primary brand color: `#EA2127`; secondary brand color: `#2C2F75`.
- Use existing `--brand-red` and `--brand-navy` tokens; add no competing brand colors, fonts, images, libraries, or inline scripts.
- Limit visual changes to `#stories`; preserve all eight story labels, descriptions, icons, and source order.
- Story cards are fully clickable through the existing `data-demo-action` behavior.
- Story autoplay is 5000ms; every other carousel retains the 3000ms default.
- Respect `prefers-reduced-motion`, focus, hover, drag, tab visibility, and off-screen pause behavior.
- This workspace is not a Git repository, so validation replaces commit steps.

---

### Task 1: Lock the spotlight configuration contract

**Files:**
- Modify: `tests/carousel.test.mjs`
- Modify: `assets/carousel.js`

**Interfaces:**
- Consumes: carousel root `dataset.carouselVariant` and `dataset.carouselDelay`.
- Produces: exported `getCarouselConfig(root, options)` returning `{ autoDelay: number, variant: string }`.

- [x] Add tests proving the default remains `{ autoDelay: 3000, variant: 'default' }`, the story dataset resolves to `{ autoDelay: 5000, variant: 'spotlight' }`, and invalid/non-positive delays fall back safely.
- [x] Run `npm test` and confirm the new tests fail before implementation.
- [x] Implement `getCarouselConfig` and have `initInfiniteCarousel` consume it without changing the existing public initializer signature.
- [x] Run `npm test` and confirm all carousel/catalog tests pass.

### Task 2: Build semantic Editorial Spotlight markup and styling

**Files:**
- Modify: `index.html`
- Modify: `assets/styles.css`
- Modify: `scripts/verify-static-site.mjs`

**Interfaces:**
- Consumes: `data-carousel-variant="spotlight"`, `data-carousel-delay="5000"`, and `data-carousel-card-action`.
- Produces: eight `article.story-card` items containing full-surface semantic buttons and structured number/icon/copy/arrow/orbit elements.

- [x] Add static assertions for the new dataset contract, clickable story cards, and required spotlight CSS hooks; run `npm run verify` to confirm failure.
- [x] Replace only the `#stories` card markup, retaining content and order exactly.
- [x] Implement the asymmetric layout: desktop featured width `clamp(460px, 42vw, 620px)`, compact width 180px, navy featured stage, enlarged icon, red progress accent, quiet secondary surfaces, and existing hero-orbit motif.
- [x] Add tablet and mobile rules: tablet featured width `clamp(380px, 52vw, 520px)`; mobile featured width `calc(100vw - 72px)` with a 26px compact next-card peek and 44px minimum controls/actions.
- [x] Add stable hover/focus/pressed states without layout shift and an immediate reduced-motion fallback.
- [x] Run `npm run verify` and confirm the static contract passes.

### Task 3: Animate and synchronize the dynamic spotlight

**Files:**
- Modify: `assets/carousel.js`
- Modify: `tests/carousel.test.mjs`

**Interfaces:**
- Internal states: `.is-featured`, `.is-spotlight-entering`, `.is-spotlight-exiting`.
- Invariant: after initialization and every completed/cancelled interaction, exactly the first track item owns `.is-featured` and its action owns `aria-current="true"`.

- [x] Add pure/helper coverage for spotlight configuration and source-level/static coverage for the active-state hooks.
- [x] Add `syncSpotlightState`, next/previous preparation, drag-commit preparation, resize/finalize cleanup, and immediate reduced-motion finalization.
- [x] Permit pointer drag from `[data-carousel-card-action]` while continuing to block drag initiation from unrelated buttons/inputs.
- [x] Preserve click suppression after an actual drag so swiping a story never triggers its demo action.
- [x] Run `npm test` and `npm run verify` until both pass.

### Task 4: Browser acceptance and cleanup

**Files:**
- Verify only; no new production files.

**Interfaces:**
- Uses the required named session `hacom-local` attached to CDP port 9333.

- [x] Read `BROWSER_AUTOMATION_RULES.md` and `BROWSER_AUTOMATION_GUIDE.md`, then start the isolated browser with `scripts/browser-automation.ps1 -Action Start`.
- [x] Before interaction, verify `document.readyState`, page title, Console, and page errors.
- [x] At 1440px and 1024px, verify exactly one featured card, visible secondary cards, working Next/Previous order, 5000ms autoplay, hover/focus pause, and clickable demo actions.
- [x] At 768px and 375px, verify no clipping, readable Vietnamese copy, next-card peek, keyboard focus visibility, and pointer swipe without accidental click.
- [x] Emulate reduced motion and verify autoplay is disabled and navigation settles without visible choreography delay.
- [x] Recheck Console/page errors, close `hacom-local`, stop the isolated browser, and verify port 9333 is no longer owned.
