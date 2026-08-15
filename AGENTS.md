# Project Agent Rules

## Brand colors (mandatory)

- The primary brand color is `#EA2127`.
- The secondary brand color is `#2C2F75`.
- Treat these values as the source of truth for all new UI, visual assets, and design work in this project.
- In CSS, use the existing semantic tokens `var(--brand-red)` and `var(--brand-navy)` instead of repeating the hex values. In Tailwind, use the existing `brand.red` and `brand.navy` colors.
- Do not replace these brand colors or introduce a competing primary or secondary color without explicit user approval.

## Responsive container system (mandatory)

- All page-level content must use `.page-container`; do not introduce a competing page container with a hard-coded `max-width`.
- The standard content cap is `1600px`. From a `1680px` viewport, it expands fluidly and reaches the wide cap of `1800px` at `1920px`, then remains capped on 2K and ultrawide displays.
- Full-bleed section backgrounds are allowed, but header content, headings, grids, carousels, the desktop mega menu, and footer content must share the page-container axis.
- Component-level `max-width` is allowed only to preserve readable line length or intentional local composition; it must not create a competing page-alignment system.
- Do not scale typography, card dimensions, or spacing solely because the viewport is wide. Use additional space to reveal more content while preserving established density and hierarchy.
- Verify mega-menu alignment, carousel masking, focus rings, hover-lift safe zones, and horizontal overflow whenever the container system changes.
- `--container-standard`, `--container-wide`, `--container`, `--page-gutter`, and `.page-container` are the public responsive-container interface for future UI work.

## Hover lift safety (mandatory)

- Every hover lift must use the shared `--hover-lift-control`, `--hover-lift-button`, `--hover-lift-feature`, or `--hover-lift-card` token. Do not hard-code new negative `translateY()` distances.
- When a lifted element is close to an `overflow: hidden` or `overflow: clip` boundary, apply `.hover-lift-safe-zone` to that boundary or provide equivalent block-axis clearance of at least `12px`.
- Do not fix clipping by removing the hover interaction, animating layout properties such as `top`, `margin`, or `height`, setting carousel overflow to `visible`, or otherwise breaking the carousel mask.
- Verify every hover and focus state for intact border radius, border, shadow, and `:focus-visible` outline at the relevant responsive breakpoints.
- `.hover-lift-safe-zone` is the shared public utility for future carousel and clipped-component implementations.

## Mobile-first implementation (mandatory)

- New or redesigned UI must work from a `320px` viewport before tablet and desktop enhancements are added.
- Prefer intrinsic layout, wrapping, and progressive enhancement over viewport-specific fixes. Do not shrink text or controls merely to force content onto one line.
- Do not hide essential content or functionality on mobile. DOM order, visual order, keyboard order, and assistive-technology reading order must remain aligned.
- Interactive controls should preserve a touch target of at least `44px` in each axis whenever the component permits it.
- Verify content order, `:focus-visible`, clipping, and horizontal overflow at mobile and tablet breakpoints for every UI or interaction change.

## Browser automation

Before any task that opens, clicks, screenshots, or tests a web page, read:

- `BROWSER_AUTOMATION_RULES.md`
- `BROWSER_AUTOMATION_GUIDE.md`

Mandatory workflow on Windows:

1. Never launch an automation Chrome from an elevated shell and never add `--no-sandbox` to make it work.
2. Start the isolated browser with `powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\browser-automation.ps1 -Action Start`.
3. Use the returned CDP endpoint. This project uses `http://127.0.0.1:9333`; do not assume port `9222` is free.
4. For Agent Browser, always use a named session and attach explicitly: `agent-browser.cmd --session hacom-local --cdp 9333 ...`.
5. For Browser Harness, set `BU_CDP_URL=http://127.0.0.1:9333` and use `browser-harness` or the compatibility alias `browser-use`.
6. Inspect browser Console and page errors before changing application code.
7. Stop the named session and isolated browser after testing. Never terminate the user's normal Chrome profile.

If browser automation fails, run the diagnostics in `BROWSER_AUTOMATION_GUIDE.md` before installing another browser framework.
