# Story Card Discovery Pill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the overlapping circular story-card arrow with a branded `Khám phá →` pill that appears on hover/focus and never intersects story copy.

**Architecture:** Preserve the existing full-card button and carousel behavior. Add visible CTA copy inside the existing decorative `.story-card__arrow` span, then reserve a bottom CTA lane with padding and position the pill inside that lane using plain CSS. Verify the HTML contract statically and the geometry/interactions in the isolated browser.

**Tech Stack:** Static HTML, plain CSS, Node.js static verification and tests, Agent Browser over project CDP port `9333`.

## Global Constraints

- Use `var(--brand-red)` and `var(--brand-navy)` as the only primary/secondary brand colors.
- Keep the full story card as the interactive button; the pill remains `aria-hidden="true"` and `pointer-events: none`.
- CTA minimum height is `44px`; it appears only on card hover or `:focus-visible`.
- Do not change carousel JavaScript, autoplay, swipe, card order, story copy, dependencies, horizontal masking, or hover-lift tokens.
- Animate only compositor/paint-safe interaction properties already used by the component; never animate layout properties.
- The workspace is not a Git worktree, so commit steps are unavailable.

---

### Task 1: Lock the discovery-pill markup contract

**Files:**
- Modify: `scripts/verify-static-site.mjs`
- Modify: `index.html:121-128`

**Interfaces:**
- Consumes: the eight existing `.story-card__arrow[aria-hidden="true"]` elements and their Font Awesome right-arrow icons.
- Produces: exactly eight `.story-card__arrow` elements containing `<span>Khám phá</span>` followed by the existing `.fa-arrow-right` icon.

- [x] **Step 1: Write the failing static checks**

Add checks that require eight visible labels and prohibit the old icon-only CTA:

```js
assert.equal((html.match(/class="story-card__arrow"/g) || []).length, 8);
assert.equal((html.match(/<span>Khám phá<\/span><i class="fa-solid fa-arrow-right"/g) || []).length, 8);
assert.doesNotMatch(html, /class="story-card__arrow"[^>]*>\s*<i class="fa-solid fa-arrow-right"/);
```

- [x] **Step 2: Run verification and confirm failure**

Run: `npm.cmd run verify`

Expected: FAIL because no `.story-card__arrow` contains `Khám phá` yet.

- [x] **Step 3: Add the CTA label to all story cards**

Change each existing CTA span to:

```html
<span class="story-card__arrow" aria-hidden="true"><span>Khám phá</span><i class="fa-solid fa-arrow-right"></i></span>
```

Keep every parent button `aria-label` unchanged.

- [x] **Step 4: Run static verification**

Run: `npm.cmd run verify`

Expected: PASS with exactly eight CTA labels and no icon-only story CTA.

### Task 2: Build the reserved CTA lane and pill interaction

**Files:**
- Modify: `assets/styles.css:242-265`
- Test: `tests/carousel.test.mjs`

**Interfaces:**
- Consumes: `.story-card__action`, `.story-card__copy`, `.story-card__arrow`, featured-state selectors, existing `--brand-*`, `--shadow-*`, `--ease`, and reduced-motion rules.
- Produces: a 44px pill inside a reserved lower card lane; default hidden state and hover/focus-visible revealed state with zero copy overlap.

- [x] **Step 1: Reserve a non-overlapping bottom lane**

Update standard card padding so its bottom padding includes the pill height, bottom inset, and copy gap. Keep the featured card's larger visual padding while applying equivalent bottom clearance. Do not reduce `.story-card__copy` width to solve overlap.

- [x] **Step 2: Restyle `.story-card__arrow` as the pill**

Implement the pill with the following contract:

```css
.story-card__arrow {
  position: absolute;
  right: 17px;
  bottom: 17px;
  min-width: 112px;
  min-height: 44px;
  padding-inline: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--brand-red);
  color: #fff;
  box-shadow: 0 10px 24px rgba(234, 33, 39, .22);
  font-size: 13px;
  font-weight: 750;
  line-height: 1;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateX(8px);
  transition: border-color .15s var(--ease), background-color .15s var(--ease), color .15s var(--ease), box-shadow .15s var(--ease), opacity .15s var(--ease), transform .15s var(--ease);
}
```

Reveal it for `.story-card__action:hover` and `.story-card__action:focus-visible`. On standard cards keep the red/white treatment; on featured/entering navy cards use white/navy, and invert to red/white on hover/focus. Preserve the current arrow icon and use `currentColor`.

- [x] **Step 3: Run unit and static tests**

Run: `npm.cmd test`

Expected: all carousel/catalog unit tests pass.

Run: `npm.cmd run verify`

Expected: all static HACOM checks pass, including the new eight-label contract.

- [x] **Step 4: Perform browser acceptance testing**

Use the mandatory project browser lifecycle. At `320`, `375`, `768`, `1024`, and `1440px`:

1. Hover every story card and assert `.story-card__arrow` has `opacity: 1` and at least `44px` height.
2. Compare CTA and `.story-card__copy` rectangles; intersection area must be zero.
3. Focus each story button with keyboard and assert the pill appears while the 3px outline and 3px offset remain intact.
4. Confirm no horizontal overflow and no clipped rounded corners, pill shadow, or focus ring.
5. Confirm Next, Previous, swipe, and 5-second autoplay still advance stable story labels.
6. Enable reduced motion and confirm transition duration becomes `.01ms` without suppressing CTA visibility.
7. Confirm Console and page error collections are empty.

- [x] **Step 5: Clean up the isolated browser**

Close named session `hacom-local`, stop the project browser through `scripts/browser-automation.ps1`, and verify `ready:false`, `owned:false`, and an empty `processIds` array.
