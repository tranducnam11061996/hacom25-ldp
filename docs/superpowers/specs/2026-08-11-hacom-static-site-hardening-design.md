# HACOM Static Site Hardening Design

## Goal

Turn the existing single-file storefront prototype into a maintainable, accessible static HACOM page that resolves all P0/P1 audit findings and the agreed P2 scope: performance, maintainability, and client-side hardening. SEO work is explicitly out of scope.

## Scope and Constraints

- Brand text is `HACOM`.
- Document title is `HACOM - PC, LAPTOP, Thiết Bị Chơi Game hàng đầu Việt Nam`.
- Keep the page as a static HTML experience; no backend, product catalog API, checkout, or account system is introduced.
- Preserve the dark gaming/electronics visual direction where practical while making controls functional and accessible.
- Do not add SEO metadata, structured data, canonical URLs, or Open Graph work in this change.
- The workspace has no Git repository, so no commit can be created.

## File Structure

- `index.html`: semantic page markup, HACOM copy, external asset references, accessible controls and forms.
- `assets/tailwind.css`: generated static Tailwind utility CSS; replaces the Tailwind browser CDN runtime.
- `assets/styles.css`: project-owned design tokens, component styles, focus states, reduced-motion rules, and responsive rules.
- `assets/app.js`: DOM behavior split into menu, carousel, brand-expander, search, and newsletter modules.
- `tailwind.config.js`: scans `index.html` and preserves the existing custom dark colors plus HACOM tokens during CSS generation.
- `package.json`: reproducible local build scripts for the static Tailwind artifact.

## Markup and Accessibility

- Repair the malformed mega-menu opening tag and make mobile category navigation work without null DOM references.
- Use unique IDs throughout; use classes or data attributes for repeated carousel elements.
- Add a skip link, `<main>`, one visible `<h1>`, correctly nested headings, and Vietnamese document language.
- Replace click-enabled `<div>` elements and inline event attributes with named `<button type="button">` elements and delegated event listeners.
- Label every icon-only button, search input, and newsletter input. Search fields use `type="search"`, `name`, and `autocomplete`; the newsletter is a real form with accessible validation feedback.
- Menu and disclosure controls expose `aria-expanded`, `aria-controls`, Escape-to-close behavior, keyboard navigation, and focus restoration.
- Carousel arrows and pagination are semantic buttons. Auto-play pauses on hover, focus, hidden tabs, and user interaction; it does not start when reduced motion is requested.

## Behavior and Error Handling

- The menu, carousels, brand expander, search form, and newsletter form initialize only when their required elements exist.
- Search and newsletter handlers provide client-side feedback instead of placeholder navigation. Because no backend is in scope, newsletter success is explicitly presented as a local demo confirmation; it does not claim to subscribe the visitor.
- Category/menu strings are built with DOM APIs rather than `innerHTML`, so a later data source cannot create markup through item names.
- Carousels use one state model per instance, synchronize drag position after auto-slide, avoid duplicate timer/listener setup, and use pointer events where supported.

## Performance and Hardening

- Compile Tailwind ahead of time and remove `https://cdn.tailwindcss.com`.
- Replace CSS `@import` font loading with preconnect plus a stylesheet link; retain the hosted Inter font for this iteration.
- Add a restrictive meta CSP compatible with static assets and the Google Fonts stylesheet/font hosts. Production hosting should additionally send the equivalent CSP response header.
- External JavaScript is served locally, avoiding inline handler/script allowances. No untrusted data is written through `innerHTML`.
- Restrict animations to transform/opacity where applicable, remove `transition: all`, and include a global `prefers-reduced-motion` fallback.

## Verification

- Build `assets/tailwind.css` from the configured source.
- Parse-check `assets/app.js` and verify external scripts/styles resolve from `index.html`.
- Assert no duplicate IDs, no `href="#"`, no inline `onclick`, no `<div onclick>`, no `transition: all`, no runtime Tailwind CDN, and no missing labels among page inputs.
- Run a browser smoke test for menu opening/closing, mobile category selection, carousel controls, search feedback, newsletter validation, and brand expand/collapse.

## Design Self-Review

The scope is limited to the agreed fixes. The page remains static: user-facing confirmation replaces network-backed search/newsletter actions, and no unsupported claim of persistence is made. Build tooling is intentionally minimal and exists only to generate the checked-in Tailwind stylesheet.
