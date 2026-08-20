# Prismatic Atelier Reimplementation — Preserve Product Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-apply the Prismatic Atelier visual system to `index-2.html` while preserving the complete current product-card CSS and rendered card contract.

**Architecture:** Keep `styles-2.css` and all shared JavaScript/data contracts intact. Add a scoped `prismatic-2.css` layer for the header, hero, editorial sections, deals, collections’ surfaces, showroom and footer; isolate the existing product-card declarations in a preserved skin layer so theme changes cannot alter card geometry, tint, typography, pricing, inventory or cart states.

**Tech Stack:** Vanilla HTML/CSS/JavaScript, existing HACOM shared scripts, local GSAP 3.13.x + ScrollTrigger, Node test runner, ESLint, TypeScript check and static verification.

## Global Constraints

- Only redesign `index-2.html`; `index.html` and Version 1 remain unchanged.
- Keep `#categories`, `#serviceGateway`, mega menu, submenu and `#gatewayFlyout` DOM, content, colors, responsive behavior and JavaScript behavior unchanged.
- Do not restore Quantum Deals.
- Keep product data, prices, links, inventory states, category names and real product images unchanged.
- Preserve every product-card CSS declaration and selector behavior; do not edit `assets/product-cards.js`.
- Use `data-theme="prismatic-atelier"`; scope new CSS below that theme attribute.
- Use local assets and local GSAP; no CDN runtime dependency.
- Use `.page-container`, shared hover-lift tokens and `.hover-lift-safe-zone`.
- Do not hide content by default if JavaScript or GSAP fails; honor reduced motion.

---

### Task 1: Create regression fixtures for locked regions and product cards

**Files:**
- Modify: `tests/index-2.test.mjs`
- Create: `docs/superpowers/fixtures/index-2-locked-contracts.json`

**Interfaces:**
- Produces normalized hashes for `#categories`, `#serviceGateway`, `#megaMenu`, `#gatewayFlyout` and the product-card CSS declaration blocks.

- [x] **Step 1: Capture normalized locked-region and product-card signatures**

Use the existing HTML normalization helper and add a CSS normalizer that extracts all `.product-card` rules from the preserved skin. Store the expected hashes in the fixture JSON.

- [x] **Step 2: Add failing assertions for the new theme and preserved card skin**

Assert `data-theme="prismatic-atelier"`, the local stylesheet/script paths, absence of Prism Gallery runtime references, and equality with all fixture hashes.

- [x] **Step 3: Run the focused test**

Run: `node --test tests/index-2.test.mjs`

Expected: FAIL because the page still uses the Prism Gallery theme and artwork.

### Task 2: Build the Prismatic Atelier visual layer

**Files:**
- Create: `assets/prismatic-2.css`
- Modify: `index-2.html:15-30`
- Modify: `index-2.html` hero/deals artwork references only

**Interfaces:**
- Consumes existing `styles-2.css` structural classes and existing product-card markup.
- Produces scoped `body[data-theme="prismatic-atelier"]` tokens and surface rules; no selectors for locked section interiors or shared menu internals.

- [x] **Step 1: Add the dark titanium token layer**

Define primitive, semantic and component tokens for obsidian, deep navy, titanium, pearl, cyan, violet, magenta, HACOM red and success green. Keep product-card skin variables separate so the card declarations remain unchanged.

- [x] **Step 2: Style the header, hero, stories, deals, trending, collections’ section surfaces, showroom and footer**

Use the existing page-container axis, dark glass header, non-text `promo-atrium` artwork, HTML hero copy, spectral borders, dark deal pulse, titanium trending surface and executive footer. Do not add selectors targeting `#categories`, `#serviceGateway`, `.mega-menu`, `.gateway-flyout` or their internal children.

- [x] **Step 3: Attach the preserved product-card skin without changing its declarations**

Copy the existing product-card rule blocks into a separately scoped compatibility section with the same declarations and card tint variables. Add a test that compares declaration signatures before and after.

- [x] **Step 4: Run the focused contract tests**

Run: `node --test tests/index-2.test.mjs`

Expected: PASS for theme, artwork, locked regions and product-card signatures.

### Task 3: Update motion and runtime contracts

**Files:**
- Modify: `assets/experience-2.js`
- Modify: `tests/index-2.test.mjs`

**Interfaces:**
- Consumes existing `data-v2-motion` hooks.
- Produces GSAP `matchMedia()` desktop/tablet/mobile/reduced-motion setup with cleanup and no default content hiding.

- [x] **Step 1: Change the runtime theme guard to Prismatic Atelier**

Keep ScrollTrigger registration explicit and retarget only non-locked hero, section and artwork elements.

- [x] **Step 2: Verify reduced motion and JavaScript failure safety**

Ensure content is visible without the runtime and that reduced motion skips parallax/stagger transforms.

- [x] **Step 3: Run lint and motion tests**

Run: `npm run lint` and `node --test tests/index-2.test.mjs`

Expected: PASS with no lint errors.

### Task 4: Run full verification and browser QA

**Files:**
- Modify: `tests/index-2.test.mjs` only if an observed contract needs encoding.

**Interfaces:**
- Validates Version 1 isolation, product-card preservation, locked sections, local GSAP, responsive behavior and accessibility.

- [x] **Step 1: Run automated checks**

Run: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run verify`.

- [x] **Step 2: Run isolated browser QA**

Use the project browser automation script and named session at 320, 768, 1180, 1181, 1440 and 1920px. Check menu/submenu, flyout, carousels, touch targets, focus rings, hover lift, clipping, overflow, reduced motion, console errors and page errors.

- [x] **Step 3: Confirm acceptance criteria**

Confirm Prismatic Atelier is dark and premium, product cards are visually unchanged, locked sections are byte-for-byte fixture matches, Version 1 is unaffected and no Quantum Deals section returns.
