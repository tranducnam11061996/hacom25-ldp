# Index-2 Isolated Variant Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Create index-2.html with copied application CSS so version-2 HTML/CSS edits do not affect index.html, while images, fonts, scripts, data, and environment paths remain shared.

**Architecture:** Copy index.html, assets/tailwind.css, and assets/styles.css to index-2.html, assets/tailwind-2.css, and assets/styles-2.css. Rewire only the copied page's app CSS links and self-home links. Keep vendor Font Awesome CSS and JavaScript/data assets shared.

**Tech Stack:** Static HTML/CSS, PowerShell, Node.js test runner.

## Global Constraints

- No backup files.
- Do not overwrite index.html, assets/tailwind.css, or assets/styles.css.
- Keep image folders, font folders, scripts, data, and environment-related paths shared.
- index-2.html must reference only assets/tailwind-2.css and assets/styles-2.css for app styles.
- Preserve responsive, accessibility, page-container, and hover-lift rules in copied CSS.
- Preserve existing user changes in assets/styles.css and tests/homepage.test.mjs.

---

### Task 1: Copy and rewire the isolated entry point

**Files:** Create index-2.html, assets/tailwind-2.css, assets/styles-2.css. Do not modify index.html, assets/tailwind.css, or assets/styles.css.

- [ ] Copy the three files with Copy-Item; do not create backups.
- [ ] In index-2.html, replace assets/tailwind.css with assets/tailwind-2.css and assets/styles.css with assets/styles-2.css.
- [ ] Change the two copied header self-links from index.html to index-2.html.
- [ ] Leave all image, font, script, data, vendor CSS, and environment paths unchanged.
- [ ] Verify copied CSS keeps ../fonts/... and media/... relative URLs.

~~~powershell
Copy-Item -LiteralPath index.html -Destination index-2.html
Copy-Item -LiteralPath assets\tailwind.css -Destination assets\tailwind-2.css
Copy-Item -LiteralPath assets\styles.css -Destination assets\styles-2.css
~~~

### Task 2: Add an isolation regression test

**Files:** Create tests/index-2.test.mjs. Modify the package.json test script.

- [ ] Assert the copied entry and CSS files exist.
- [ ] Assert index-2.html references assets/tailwind-2.css and assets/styles-2.css, never assets/tailwind.css or assets/styles.css.
- [ ] Assert shared assets/scripts remain referenced.
- [ ] Add tests/index-2.test.mjs to npm test.

The test must remain valid after future edits to index-2.html or the copied CSS, so it checks the isolation boundary rather than requiring the two pages to remain byte-identical.

### Task 3: Verify no current-page regression

**Files:** Verify index.html, index-2.html, assets/tailwind.css, assets/tailwind-2.css, assets/styles.css, and assets/styles-2.css.

- [ ] Inspect git status/diff and confirm originals were not overwritten.
- [ ] Run npm test, npm run lint, and npm run verify.
- [ ] Confirm index.html uses original CSS while index-2.html uses copied CSS.

Expected: only the new index-2 files plus planned test/package changes are added; shared image/font/script/data/environment paths remain shared.

