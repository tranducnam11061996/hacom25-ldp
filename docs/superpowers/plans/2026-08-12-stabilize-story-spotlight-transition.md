# Stabilize Story Spotlight Transition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the HACOM Signal carousel's premature transition finalization and vertical size oscillation without changing carousel direction or sequencing.

**Architecture:** Add a pure inline-size comparison helper and use it to ignore height-only `ResizeObserver` notifications. Stabilize the story row with a component block-size token and synchronize the existing transform and width transitions to the project easing token. Preserve all movement offsets, control handlers, DOM rotation, autoplay, and swipe behavior.

**Tech Stack:** Plain JavaScript, plain CSS, Node.js test runner, static verification, Agent Browser over CDP `9333`.

## Global Constraints

- Do not change carousel direction, Next/Previous mappings, autoplay order, swipe semantics, or DOM rotation.
- Keep `TRANSITION_DURATION = 400` and use existing `var(--ease)`.
- Use no new dependencies or animation system.
- Preserve story content, CTA pill, hover lift, brand colors, carousel masking, focus behavior, and reduced motion.
- Height-only resize notifications must not interrupt motion; real inline-size changes must retain the current safe interruption path.
- Story row size is `220px` above 767px and `224px` at 767px and below.
- The workspace is not a Git worktree, so commit steps are unavailable.

---

### Task 1: Add the inline-size resize contract

**Files:**
- Modify: `tests/carousel.test.mjs`
- Modify: `assets/carousel.js`

**Interfaces:**
- Produces: `hasMeaningfulInlineSizeChange(previousWidth: number, nextWidth: number): boolean`, exported on `window.HacomCarousel`.
- Consumes: an exact `1px` epsilon; only changes greater than `1px` are meaningful.

- [x] **Step 1: Add failing unit tests**

Import `hasMeaningfulInlineSizeChange` from the existing VM-exported carousel API and add:

```js
test('inline-size guard ignores height-only and subpixel resize noise', () => {
  assert.equal(hasMeaningfulInlineSizeChange(1392, 1392), false);
  assert.equal(hasMeaningfulInlineSizeChange(1392, 1392.75), false);
  assert.equal(hasMeaningfulInlineSizeChange(1392, 1391), false);
});

test('inline-size guard accepts a real responsive width change', () => {
  assert.equal(hasMeaningfulInlineSizeChange(1392, 1024), true);
  assert.equal(hasMeaningfulInlineSizeChange(375, 377), true);
});
```

- [x] **Step 2: Run the focused test and confirm failure**

Run: `npm.cmd test`

Expected: FAIL because `hasMeaningfulInlineSizeChange` is not exported.

- [x] **Step 3: Implement and export the pure helper**

Add `INLINE_SIZE_EPSILON = 1`, implement the absolute-difference comparison, and expose the helper through `window.HacomCarousel` without changing existing exports.

- [x] **Step 4: Run unit tests**

Run: `npm.cmd test`

Expected: all tests pass.

### Task 2: Prevent internal height changes from finalizing motion

**Files:**
- Modify: `assets/carousel.js`
- Modify: `scripts/verify-static-site.mjs`

**Interfaces:**
- Consumes: `hasMeaningfulInlineSizeChange` from Task 1.
- Produces: a resize observer that returns before any phase mutation when only block size changed.

- [x] **Step 1: Add failing static guards**

Require `observedInlineSize`, `entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width`, the early-return helper call, and ``transform ${TRANSITION_DURATION}ms var(--ease)``. Preserve existing direction-sensitive code assertions.

- [x] **Step 2: Run static verification and confirm failure**

Run: `npm.cmd run verify`

Expected: FAIL because the observer still handles all resize notifications and track easing is still `ease-out`.

- [x] **Step 3: Implement inline-size-aware observation**

Initialize `observedInlineSize` from `root.getBoundingClientRect().width`. In the observer callback, read the next inline size, return early for a non-meaningful change, update the stored value for real width changes, then execute the existing cancellation/finalization path unchanged.

- [x] **Step 4: Synchronize track easing**

Change only the curve in `setTransform` from `ease-out` to `var(--ease)`. Keep duration and transform offsets unchanged.

- [x] **Step 5: Run unit and static verification**

Run: `npm.cmd test`

Run: `npm.cmd run verify`

Expected: both pass.

### Task 3: Stabilize the story row block size

**Files:**
- Modify: `assets/styles.css`
- Modify: `scripts/verify-static-site.mjs`

**Interfaces:**
- Produces: local token `--story-card-block-size: 220px`, mobile override `224px`, and story card/action sizing at `block-size: 100%; min-height: 0`.
- Consumes: existing story breakpoints, width morph, overflow containment, safe-zone, and reduced-motion rule.

- [x] **Step 1: Add failing CSS guards**

Require the desktop token/block-size declaration, mobile token override, and full-height card/action contract.

- [x] **Step 2: Run verification and confirm failure**

Run: `npm.cmd run verify`

Expected: FAIL because story sizing still uses open-ended `min-height`.

- [x] **Step 3: Implement stable component sizing**

Set `.story-track` to the local token and block size. Change `.story-card` and `.story-card__action` to `min-height: 0; block-size: 100%`. Remove the mobile `min-height: 224px` rule and replace it with the mobile token override. Keep width transition and all visual styling unchanged.

- [x] **Step 4: Run mechanical tests**

Run: `npm.cmd test`

Run: `npm.cmd run verify`

Expected: both pass.

### Task 4: Browser acceptance and cleanup

**Files:**
- Update status only: `animation-plans/001-stabilize-story-spotlight-transition.md`
- Update status only: `animation-plans/README.md`

**Interfaces:**
- Consumes: completed Tasks 1–3.
- Produces: measured evidence that normal motion lasts 400ms without height oscillation and all scoped regressions remain clean.

- [x] **Step 1: Run baseline lifecycle checks at five viewports**

At `320`, `375`, `768`, `1024`, and `1440px`, verify Next is still animating around 100ms, settles after 450–500ms, and story root height varies by no more than 1px.

- [x] **Step 2: Verify all trigger paths**

Check Next, Previous, autoplay, and swipe. Confirm stable item labels change exactly as before. Trigger a real width resize mid-transition and confirm safe settlement and reusable controls.

- [x] **Step 3: Verify visual/accessibility regressions**

Confirm CTA pill default/hover/focus behavior, zero copy overlap, intact focus outline, safe-zone, no horizontal overflow, and unchanged category/product/hero/promo carousel behavior.

- [x] **Step 4: Verify reduced motion and errors**

Enable reduced motion and confirm position motion is skipped while final state and accessibility attributes settle. Confirm Console and page errors are empty.

- [x] **Step 5: Mark animation plan DONE and clean up**

Update both animation plan status files only after all checks pass. Close `hacom-local`, stop the isolated browser, and verify `ready:false`, `owned:false`, `processIds:[]`.
