# HACOM Ice-Tech Header Gateway Design

## Objective

Redesign the complete above-the-fold HACOM experience—utility bar, main header, product category navigation, submenu flyouts, and gateway mosaic—to match the approved light futuristic reference. Preserve every existing menu, submenu, action, accessibility contract, and carousel behavior while replacing the dark visual treatment with a white/ice-blue technology environment and restrained HACOM red gradients.

## Scope

Included:

- Desktop, tablet, and mobile utility/header surfaces.
- Desktop 21-item gateway category navigation and every existing flyout.
- Existing mobile category trigger and mega-menu views.
- The three-slide center carousel and four fixed surrounding banners.
- New AI-generated technology backgrounds and campaign artwork.
- Responsive behavior, accessibility, performance, and contract tests for this area.

Excluded:

- Header promo showcase below the gateway.
- Customer stories, product sections, footer, catalog schema, search behavior, and demo action behavior.
- New dependencies or a new public JavaScript API.

## Visual Direction

The experience is one continuous “Ice-Tech Gateway” rather than separate dark bars and cards.

- Utility ribbon: 40–42px high, HACOM red gradient, white icons and text.
- Main header: 90–96px high on desktop, translucent white/ice surface with a cool border and soft blue depth.
- Gateway background: layered white-to-ice-blue gradients plus a low-contrast AI-generated circuit/perspective texture.
- Typography: existing Inter family; navy for information, red for urgency and primary actions.
- Panels: 14–18px radii, 1px cool-white/blue borders, restrained glass treatment, soft blue shadows, minimal red glow.
- Motion: existing carousel motion and menu behavior only; 160–220ms hover/focus transitions; reduced-motion support.

The implementation must avoid dark navy background slabs, purple AI gradients, dense HUD decoration, embedded AI text, and excessive nested glass cards.

## Layout

### Desktop (1181px and wider)

- Utility ribbon remains full-width.
- Main header uses logo, dominant search, builder, account, and cart in one horizontal command deck.
- Gateway uses the existing category column plus a six-column/two-row mosaic.
- Category navigation gains a visible red-gradient “Danh Mục Sản Phẩm” heading without changing the 21 category buttons.
- The center carousel keeps three slides and occupies columns 1–4 of the first row.
- The top-right Build PC tile and three lower tiles remain fixed outside the carousel track.
- Flyouts cover the full gateway stage immediately to the right of the category navigation.

### Tablet (768–1180px)

- Utility content collapses into hotline, region, and utility controls.
- Logo, search, and action icons use the existing responsive header contract.
- Desktop category column and flyout are hidden; the existing mobile menu trigger remains.
- Center carousel is full width; four fixed tiles form a manual horizontal rail at approximately 42% inline size.

### Mobile (767px and narrower)

- Compact red utility ribbon and a white/ice main row containing logo, menu button, and search.
- Category access continues through the existing mobile mega menu.
- Center carousel remains full width; fixed tiles form an 84% manual horizontal rail.
- Decorative technology detail is reduced to protect readability and rendering performance.

## AI Image System

The image workflow is reference-first and non-destructive.

1. Generate standalone desktop, tablet, and mobile UI reference images.
2. Inspect hierarchy, spacing, gradients, panel proportions, and responsive behavior.
3. Generate production artwork as fresh standalone assets, never as crops from a composite mockup.
4. Keep all promotional text, prices, logo marks, CTA labels, and accessibility names in HTML/CSS; AI images contain no text, logos, or watermarks.

Production artwork set:

- Three 955:470 center-carousel scenes: AKKO keyboards, HACOM performance ecosystem, PC Builder.
- One near-square Build PC scene for the fixed top-right tile.
- Three 468:251 fixed scenes: headphones, showroom/video, and wireless earbuds.
- Desktop, tablet, and mobile technology background textures with safe negative space.

All selected project assets will be stored under `assets/media/header-tech/` with explicit dimensions and WebP output. Existing campaign assets remain available for rollback.

## DOM and Interaction Contracts

The following contracts remain stable:

- `#gatewayCarousel`, `data-carousel-root`, `data-carousel-track`, and `data-carousel-variant="gateway"`.
- Exactly three center slides and four `[data-gateway-fixed-tile]` elements.
- Existing `#gatewayFlyout`, `data-gateway-category`, `aria-controls`, `aria-expanded`, and focus-return behavior.
- Exactly 21 category definitions and all current specialized submenu types and item counts.
- Existing responsive header panel IDs and data attributes.
- Existing search inputs, demo actions, account/cart copy, and Font Awesome icons.

The carousel receives a visible three-dot indicator container supported by the existing engine. Hidden slides remain `aria-hidden` and their controls remain outside the tab order.

## Implementation Boundaries

- `index.html`: introduce visual layers, category heading, real-text campaign overlays, and indicator markup while preserving IDs and data attributes.
- `assets/styles.css`: replace scoped reference-header/gateway visual rules with Ice-Tech tokens, gradients, responsive layout, glass surfaces, and reduced-motion fallbacks.
- `assets/app.js`: update only campaign metadata or local asset references when required; preserve category data and interaction logic.
- `assets/carousel.js`: no planned changes because it already supports indicators, autoplay, drag/swipe, visibility pausing, and reduced motion.
- `tests/homepage.test.mjs`: lock content counts, DOM contracts, new asset paths, responsive rules, and the absence of menu/submenu regressions.
- `tests/carousel.test.mjs`: retain the three-second gateway configuration contract.

## Accessibility and Performance

- Minimum 44px interactive targets.
- Visible `:focus-visible` indicators with at least a 2px perimeter treatment.
- Text contrast of at least 4.5:1 on glass/gradient surfaces.
- Decorative layers use `aria-hidden="true"` and do not intercept pointer events.
- No embedded promotional text in generated artwork.
- Reserve image dimensions to avoid layout shift.
- Preload the first hero artwork only; defer noncritical fixed artwork according to viewport position.
- Provide opaque fallbacks when backdrop blur is unavailable and remove nonessential transitions under `prefers-reduced-motion`.

## Verification

- Static contracts: 21 categories, unchanged flyout types/counts, 3 carousel slides, 4 fixed tiles, preserved header copy and ARIA attributes.
- Automated checks: `npm test`, `npm run lint`, `npm run typecheck`, and `git diff --check`.
- Isolated Chrome smoke tests at 390, 767, 768, 1180, 1181, 1440, and 1920px.
- Validate no document horizontal overflow, correct sticky behavior, aligned flyouts, keyboard focus return, carousel pause conditions, and unchanged fixed tiles during autoplay.
- Compare desktop/tablet/mobile screenshots against the approved generated references and inspect console/page errors before and after implementation.

## Success Criteria

- The first viewport reads as the same light futuristic HACOM design world as the supplied reference.
- Technology depth comes from gradient, lighting, texture, and controlled glass—not decorative clutter.
- Menu and submenu quantity, copy, navigation behavior, and accessibility remain unchanged.
- The center carousel is the only moving mosaic region.
- The result remains readable and visually balanced from 390px through 1920px without horizontal document overflow.
