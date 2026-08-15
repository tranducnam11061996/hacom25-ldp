# Story Card Discovery Pill Design

## Goal

Replace the small circular arrow in HACOM Signal story cards with a clearer `Khám phá →` pill CTA. The CTA must never overlap the title or description, must remain easy to recognize and click, and must preserve the existing carousel, hover-lift, focus, and brand behavior.

## Scope

- Update the CTA presentation for all eight `.story-card__action` cards.
- Keep each entire story card as the interactive `button`; the pill remains a visual CTA inside that button.
- Preserve existing story content, carousel JavaScript, autoplay, swipe, responsive card sizing, and hover-lift safe-zone behavior.
- Use the mandatory brand tokens `var(--brand-red)` and `var(--brand-navy)`.

## Visual design

- Replace the circular icon-only treatment with a pill containing the label `Khám phá` and the existing right-arrow icon.
- Use a minimum height of `44px`, generous inline padding, a fully rounded radius, semibold text, and a clear icon gap.
- On standard light cards, use a red background with white text.
- On the featured navy card, use a white background with navy text so the CTA stays distinct from the surface. Its hover/focus treatment may invert to red and white.
- Keep the CTA anchored to the lower-right corner for a stable scan path across cards.

## Layout and overlap prevention

- Reserve a dedicated bottom content zone in `.story-card__action` equal to the pill height, its bottom inset, and at least `12px` separation from story copy.
- Use card padding to reserve that space rather than shrinking the copy width. This keeps Vietnamese titles and descriptions readable on narrow cards.
- Give featured cards their own matching bottom reservation because their existing padding differs from standard cards.
- Keep the CTA absolutely positioned only inside the reserved zone. It must not cover `.story-card__copy` at any responsive width.

## Interaction and motion

- The pill is hidden by default with `opacity: 0` and a subtle transform offset.
- It appears only when the card is hovered or `:focus-visible`, using the existing interruptible CSS transition timing.
- Animate only `opacity`, `transform`, background, border, and color; do not animate layout properties.
- Keep `pointer-events: none` on the decorative pill because the parent story card button is already the full hit target.
- The project-wide `prefers-reduced-motion` rule continues to reduce the transition duration automatically.

## Accessibility

- Keep the full card accessible name from its existing `aria-label`.
- Keep the visual CTA `aria-hidden="true"` to avoid announcing duplicated action text.
- Keyboard focus must reveal the pill and retain the complete existing focus-visible outline.
- The full-card button remains at least as large as the current card, so pointer and touch hit areas do not regress.

## Responsive behavior

- Desktop pointer devices reveal the pill on hover.
- Keyboard users reveal it on focus-visible.
- Touch users can continue to activate the entire card without relying on the hidden pill.
- At 320px and wider, the CTA and copy must have no bounding-box intersection.

## Verification

- Static checks confirm all eight story cards contain `Khám phá` and retain their right-arrow icons and accessible card labels.
- Browser checks at `320`, `375`, `768`, `1024`, and `1440px` confirm zero CTA/copy overlap on every card.
- Hover and focus-visible checks confirm the pill appears, remains fully inside rounded corners, and does not clip its shadow or focus outline.
- Carousel Next, Previous, swipe, and autoplay checks confirm behavior is unchanged.
- Reduced-motion, horizontal-overflow, Console, and page-error checks remain clean.

## Non-goals

- No carousel JavaScript changes.
- No changes to card titles, descriptions, order, or spotlight promotion logic.
- No new dependency, icon library, or competing brand color.
