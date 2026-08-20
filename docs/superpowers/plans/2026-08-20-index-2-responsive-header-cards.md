# Index 2 Responsive Header and Product Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the redundant catalog toolbar on small screens, align catalog heading actions, add a tablet menu trigger, and restore product-card bottom corner radii in `index-2`.

**Architecture:** Keep the existing `index-2.html` document and `assets/styles-2.css` responsive system. Add one tablet-only trigger that consumes the existing `[data-menu-toggle]` behavior, restructure the five catalog headings into title/action/navigation order, and fix the footer paint surface without clipping the card's hover or focus effects.

**Tech Stack:** Static HTML, CSS Grid/Flexbox, Node.js built-in test runner, Chrome DevTools MCP.

## Global Constraints

- Scope changes to `index-2.html`, `assets/styles-2.css`, and `tests/index-2.test.mjs`.
- Preserve `.page-container`, the carousel mask, mega-menu content, catalog data, and existing JavaScript behavior.
- Treat 768px through 1180px as tablet.
- Keep touch targets at least 44px in each axis.
- Preserve user changes already present in the dirty working tree.

---

### Task 1: Lock the responsive contracts

**Files:**
- Modify: `tests/index-2.test.mjs`

**Interfaces:**
- Consumes: `index2`, `styles2`, and the existing Node test helpers.
- Produces: contract coverage for the tablet trigger, hidden gateway toolbar, catalog heading order, and product footer radii.

- [ ] **Step 1: Add a test that requires one tablet trigger after the cart action**
- [ ] **Step 2: Add tests that require all five catalog sections to use title, view-all action, then submenu DOM order**
- [ ] **Step 3: Add CSS assertions for the 768–1180px header layout, hidden toolbar, and inherited footer bottom radii**
- [ ] **Step 4: Run `node --test tests/index-2.test.mjs` and confirm the new assertions fail**

### Task 2: Update the index-2 markup

**Files:**
- Modify: `index-2.html`
- Test: `tests/index-2.test.mjs`

**Interfaces:**
- Consumes: the existing `[data-menu-toggle]`, `[data-menu-icon]`, `.section-head--catalog`, `.text-link`, and `.subcategory-menu` hooks.
- Produces: `.menu-trigger--tablet` and the catalog child order `title -> .text-link -> .subcategory-menu`.

- [ ] **Step 1: Add the tablet-only menu button after the cart button inside `.reference-header-actions`**
- [ ] **Step 2: Move each catalog view-all button before its submenu and remove the obsolete `.collection-actions` wrapper**
- [ ] **Step 3: Re-run `node --test tests/index-2.test.mjs` and confirm only CSS-dependent assertions remain failing**

### Task 3: Implement the responsive CSS

**Files:**
- Modify: `assets/styles-2.css`
- Test: `tests/index-2.test.mjs`

**Interfaces:**
- Consumes: `.reference-header-main`, `.reference-header-actions`, `.gateway-mobile-toolbar`, `.section-head--catalog`, and `.product-card__footer`.
- Produces: a three-area catalog heading grid and a tablet-only fourth header action.

- [ ] **Step 1: Hide `.menu-trigger--tablet` by default and show it only from 768px through 1180px**
- [ ] **Step 2: Make the tablet header columns `logo + minmax(220px, 1fr) + actions`, retaining the three existing action icons and placing the menu trigger last**
- [ ] **Step 3: Hide `.gateway-mobile-toolbar` through 1180px and cancel the displaced utility-bar flow space so the gateway begins at the intended section inset**
- [ ] **Step 4: Lay out catalog title and action on row one and the horizontally scrollable submenu on row two**
- [ ] **Step 5: Set `border-end-start-radius` and `border-end-end-radius` on `.product-card__footer` to `inherit`**
- [ ] **Step 6: Run `node --test tests/index-2.test.mjs` and confirm it passes**

### Task 4: Verify the implementation

**Files:**
- Verify: `index-2.html`
- Verify: `assets/styles-2.css`
- Verify: `tests/index-2.test.mjs`

**Interfaces:**
- Consumes: the complete static storefront.
- Produces: passing automated tests and browser evidence across the responsive contract.

- [ ] **Step 1: Run `npm test`, `npm run lint`, and `npm run typecheck`**
- [ ] **Step 2: Start the project browser profile with `scripts/browser-automation.ps1 -Action Start` and open `file:///D:/hacom25-ldp/index-2.html`**
- [ ] **Step 3: Check 320, 390, 767, 768, 1024, 1180, 1181, 1440, and 1920px for overflow and required visibility**
- [ ] **Step 4: Verify tablet menu open/close, icon and `aria-expanded` synchronization, Escape, and focus restoration**
- [ ] **Step 5: Verify product-card bottom corners, hover lift, focus outline, and carousel masking**
- [ ] **Step 6: Close the browser page and stop the isolated profile**
