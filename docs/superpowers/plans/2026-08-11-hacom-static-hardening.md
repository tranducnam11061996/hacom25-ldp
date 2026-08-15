# HACOM Static Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the prototype into an accessible, hardened, maintainable static HACOM storefront without runtime Tailwind or inline behavior.

**Architecture:** Keep content in `index.html`, move project CSS and all DOM behavior into external assets, and compile Tailwind once into a checked-in CSS artifact. Page controls are initialized by small DOM modules that safely no-op when their surface is absent.

**Tech Stack:** HTML5, vanilla JavaScript, Tailwind CSS 3 build CLI, static CSS.

## Global Constraints

- Preserve a static, no-backend experience.
- Brand is `HACOM`; title is `HACOM - PC, LAPTOP, Thiết Bị Chơi Game hàng đầu Việt Nam`.
- Do not add SEO metadata or structured data.
- Do not use inline scripts, inline event handlers, `href="#"`, `innerHTML`, or `transition: all`.
- Output must support reduced motion and keyboard/screen-reader controls.

---

### Task 1: Establish the static asset build

**Files:**
- Create: `package.json`
- Create: `tailwind.config.js`
- Create: `assets/tailwind.input.css`
- Create: `assets/tailwind.css`

**Interfaces:**
- Consumes: utility classes in `index.html` and custom color names used by the current markup.
- Produces: `npm run build:css`, which writes browser-ready `assets/tailwind.css`.

- [ ] **Step 1: Add the reproducible Tailwind build definition**

```json
{
  "private": true,
  "scripts": {
    "build:css": "tailwindcss -i ./assets/tailwind.input.css -o ./assets/tailwind.css --minify",
    "build": "npm run build:css",
    "verify": "node scripts/verify-static-site.mjs"
  },
  "devDependencies": { "tailwindcss": "3.4.17" }
}
```

- [ ] **Step 2: Configure content scanning and existing dark colors**

```js
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        dark: '#0f0f11',
        'dark-lighter': '#16161a',
        'dark-border': '#27272a',
        'dark-card': '#16161a'
      }
    }
  }
};
```

- [ ] **Step 3: Add the Tailwind input and build the generated asset**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Run: `npm install && npm run build:css`

Expected: `assets/tailwind.css` exists; the page no longer needs `cdn.tailwindcss.com`.

- [ ] **Step 4: Verify build output**

Run: `Test-Path assets/tailwind.css; (Get-Item assets/tailwind.css).Length`

Expected: `True` and a non-zero byte count.

### Task 2: Extract markup and component styling

**Files:**
- Modify: `index.html:1-6818`
- Create: `assets/styles.css`

**Interfaces:**
- Consumes: existing visual class names and generated `assets/tailwind.css`.
- Produces: valid, semantic document markup that loads external CSS only.

- [ ] **Step 1: Write static checks for document structure**

Create a verifier assertion set that rejects duplicate IDs, `href="#"`, inline handlers, runtime Tailwind, inline `<style>` blocks, and absent `main`/`h1`.

```js
assert.match(html, /<main\b/);
assert.match(html, /<h1\b/);
assert.doesNotMatch(html, /cdn\.tailwindcss\.com|\bonclick=/i);
```

- [ ] **Step 2: Move all authored CSS from the inline style blocks to `assets/styles.css`**

Keep component selectors and custom properties, then replace malformed aliases with explicit declarations, for example:

```css
.sidebar-item {
  transition: background-color .2s ease, color .2s ease;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
}
```

- [ ] **Step 3: Replace the head and document landmarks**

Use a Vietnamese document language, HACOM title, local stylesheets, preconnect font links, a CSP that permits only self plus Google Fonts, a skip link, `main`, and one visible HACOM `h1`.

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self'; img-src 'self' data:; base-uri 'self'; form-action 'self'">
<link rel="stylesheet" href="assets/tailwind.css">
<link rel="stylesheet" href="assets/styles.css">
...
<a class="skip-link" href="#main-content">Chuyển đến nội dung chính</a>
<main id="main-content" tabindex="-1">...</main>
```

- [ ] **Step 4: Repair invalid and non-semantic controls**

Close the `#megaMenu` opening tag, assign unique carousel IDs/data attributes, replace action divs with buttons, remove placeholder links, label icon buttons, and convert indicators to buttons.

```html
<button id="menuToggle" type="button" aria-label="Mở menu danh mục" aria-expanded="false" aria-controls="megaMenu">
  <span aria-hidden="true">☰</span><span>Danh mục</span>
</button>
```

- [ ] **Step 5: Run static markup verification**

Run: `node scripts/verify-static-site.mjs`

Expected: all structural assertions pass.

### Task 3: Replace inline behavior with safe modules

**Files:**
- Modify: `index.html:3000-6810`
- Create: `assets/app.js`

**Interfaces:**
- Consumes: semantic controls carrying `data-*` hooks created by Task 2.
- Produces: `initMenu()`, `initCarousels()`, `initBrandExpander()`, `initSearch()`, and `initNewsletter()` executed after `DOMContentLoaded`.

- [ ] **Step 1: Add JavaScript parse and unsafe-sink assertions**

Add verifier checks for external script loading and rejected unsafe patterns.

```js
assert.match(html, /<script src="assets\/app\.js" defer><\/script>/);
assert.doesNotMatch(appJs, /\.innerHTML\s*=/);
```

- [ ] **Step 2: Implement accessible menu behavior without inline handlers**

Build categories with `document.createElement`, update `aria-expanded`, preserve the toggle trigger, close on Escape/click outside, and restore focus after close.

```js
function setMenuOpen(open) {
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('mobile-menu-open', open);
  if (!open) toggle.focus();
}
```

- [ ] **Step 3: Implement one resilient carousel initializer per root**

Use data attributes and pointer events; synchronize the stored position after every auto/manual movement; pause for focus, hover, visibility, and interaction; suppress auto-play for reduced motion.

```js
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) startAutoPlay();
document.addEventListener('visibilitychange', () => document.hidden ? stopAutoPlay() : startAutoPlay());
```

- [ ] **Step 4: Implement brand expander, search, and newsletter feedback**

Use real forms with `submit` listeners, an `aria-live="polite"` status region, native email validation, and a clear local-demo success message. Buttons that have no static destination must not be anchors.

```js
form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = form.checkValidity()
    ? 'Đã lưu email trong phiên bản demo; chưa có kết nối máy chủ.'
    : 'Hãy nhập địa chỉ email hợp lệ.';
});
```

- [ ] **Step 5: Remove all former inline scripts and parse-check the module**

Run: `node --check assets/app.js`

Expected: exit code 0 and no `<script>...</script>` blocks remain in the document.

### Task 4: Verify interaction and hardening

**Files:**
- Create: `scripts/verify-static-site.mjs`
- Modify: `index.html`
- Modify: `assets/styles.css`
- Modify: `assets/app.js`

**Interfaces:**
- Consumes: final static page and generated assets.
- Produces: repeatable static validation plus manual smoke-test evidence.

- [ ] **Step 1: Implement the static verifier**

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync('index.html', 'utf8');
const appJs = readFileSync('assets/app.js', 'utf8');
assert.doesNotMatch(html, /href="#"|\bonclick=|cdn\.tailwindcss\.com|<style\b/i);
assert.doesNotMatch(html + appJs, /transition:\s*all|\.innerHTML\s*=/i);
console.log('Static HACOM checks passed.');
```

- [ ] **Step 2: Run the complete build and static checks**

Run: `npm run build && npm run verify && node --check assets/app.js`

Expected: all three commands exit 0.

- [ ] **Step 3: Perform browser smoke tests**

Check desktop and mobile widths for: skip link, menu open/close/Escape, category drill-down, labelled icon controls, carousel previous/next/pagination/paused focus state, brand expand/collapse, search message, and newsletter invalid/valid messages.

- [ ] **Step 4: Inspect final diff and audit regressions**

Run: `rg -n 'href="#"|\bonclick=|transition:\s*all|cdn\.tailwindcss\.com|\.innerHTML\s*=' index.html assets scripts`

Expected: no matches; preserve no unintended external URLs except the approved Google Fonts endpoints.
