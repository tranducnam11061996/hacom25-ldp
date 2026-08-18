# Tablet Product Rails and Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuyển các vùng mua sắm trên tablet thành bố cục bốn item một hàng có thể vuốt ngang, đồng thời thu gọn nhãn giỏ hàng và cân lại footer ba cột.

**Architecture:** Giữ nguyên HTML collection, catalog, carousel API và renderer public. CSS dùng một contract tablet duy nhất `768–1180px`: bốn benefit trên một hàng, bốn product card nhìn trọn vẹn trong một native horizontal rail, ba nhóm directory footer trên một hàng; JavaScript chỉ đổi copy hiển thị của nút mua hàng và giữ ARIA mô tả hành động đầy đủ.

**Tech Stack:** HTML tĩnh, CSS Grid/Flexbox, JavaScript DOM renderer, Node test runner, ESLint, TypeScript check, Chromium CDP.

## Global Constraints

- Chỉ thay đổi `assets/styles.css`, `assets/product-cards.js` và `tests/homepage.test.mjs`.
- Không thay đổi `index.html`, `index-1.html`, `assets/styles-1.css`, catalog, dữ liệu collection hoặc public hooks.
- Tablet là `768–1180px`; mobile `≤767px` và desktop `≥1181px` phải giữ hành vi hiện tại ngoài copy nút “Giỏ hàng”.
- Giữ vùng chạm của nút mua hàng tối thiểu `44×44px`.
- Giữ đủ tám collection: deals, trending, new-arrivals, laptops, pc-gaming, displays, components và gaming-gear.
- Native horizontal rail phải hỗ trợ touch/pointer/keyboard, không thêm thư viện hoặc JavaScript drag mới.
- Bảo toàn toàn bộ thay đổi chưa commit hiện có; không tạo commit nếu người dùng chưa yêu cầu.

---

### Task 1: Add regression contracts before changing layout

**Files:**
- Modify: `tests/homepage.test.mjs:55-190`
- Modify: `tests/homepage.test.mjs:670-730`
- Modify: `tests/homepage.test.mjs:895-950`

**Interfaces:**
- Consumes: `css`, `productCardSource`, `html` fixtures already loaded by the test file.
- Produces: Static contracts for the tablet benefit row, tablet product rails, cart copy, footer columns and hotline alignment.

- [ ] **Step 1: Replace the obsolete 768px three-column expectation**

Use the retail contract below so 768px starts at four cards, 1280px starts at five and 1600px starts at six:

```js
for (const [minWidth, columns] of [[768, 4], [1280, 5], [1600, 6]]) {
  assert.match(css, new RegExp(`@media \\(min-width: ${minWidth}px\\)[\\s\\S]{0,220}repeat\\(${columns}`));
}
```

- [ ] **Step 2: Add a tablet rail contract for all non-deals product grids**

Anchor the assertions to the exact `768–1180px` media block and verify one explicit row, four equal auto-columns, native overflow, snap behavior and equal-height cards:

```js
const tabletRetailStart = css.indexOf('/* Tablet retail rails: four visible cards with native horizontal swipe. */');
const tabletRetailEnd = css.indexOf('@media (min-width: 1181px)', tabletRetailStart);
const tabletRetailCss = css.slice(tabletRetailStart, tabletRetailEnd);

assert.notEqual(tabletRetailStart, -1);
assert.match(tabletRetailCss, /@media \\(min-width: 768px\\) and \\(max-width: 1180px\\)/);
assert.match(tabletRetailCss, /\\.product-grid\\s*\\{[^}]*grid-template-columns:\\s*none[^}]*grid-template-rows:\\s*minmax\\(0,\\s*1fr\\)[^}]*grid-auto-flow:\\s*column[^}]*grid-auto-columns:\\s*calc\\(\\(100% - 36px\\) \\/ 4\\)/s);
assert.match(tabletRetailCss, /\\.product-grid\\s*\\{[^}]*overflow-x:\\s*auto[^}]*overscroll-behavior-inline:\\s*contain[^}]*scroll-snap-type:\\s*x mandatory/s);
assert.match(tabletRetailCss, /\\.product-grid > \\.product-card\\s*\\{[^}]*scroll-snap-align:\\s*start/s);
```

- [ ] **Step 3: Add copy and compact footer assertions**

```js
assert.match(productCardSource, /product\.availability === 'in-stock'[\\s\\S]{0,40}\\?\\s*'Giỏ hàng'/);
assert.doesNotMatch(productCardSource, /product\.availability === 'in-stock'[\\s\\S]{0,40}\\?\\s*'Thêm vào giỏ'/);
assert.match(productCardSource, /Thêm \\${product\.title} vào giỏ hàng/);
assert.match(tabletRetailCss, /\\.product-card__cart span\\s*\\{[^}]*white-space:\\s*nowrap/s);
assert.match(tabletRetailCss, /\\.product-card__cart\\s*\\{[^}]*min-height:\\s*44px/s);
```

- [ ] **Step 4: Add benefit and footer assertions**

```js
assert.match(css, /@media \\(max-width: 1180px\\)[\\s\\S]*?\\.header-benefits\\s*\\{[^}]*grid-template-columns:\\s*repeat\\(4,[^}]*grid-template-rows:\\s*1fr/s);
assert.match(css, /@media \\(max-width: 767\\.98px\\)[\\s\\S]*?\\.header-benefits\\s*\\{[^}]*repeat\\(2,[^}]*repeat\\(2,\\s*1fr\\)/s);
assert.match(css, /@media \\(max-width: 1180px\\)[\\s\\S]*?\\.footer-directory__grid\\s*\\{[^}]*repeat\\(3,\\s*minmax\\(0,\\s*1fr\\)\\)/s);
assert.match(css, /@media \\(min-width: 768px\\) and \\(max-width: 1180px\\)[\\s\\S]*?\\.footer-hotline a\\s*\\{[^}]*grid-template-columns:\\s*minmax\\(68px,\\s*max-content\\)\\s*max-content[^}]*column-gap:\\s*10px/s);
```

- [ ] **Step 5: Run the focused test and confirm the new assertions fail**

Run:

```powershell
node --test tests/homepage.test.mjs
```

Expected result: failures reference the old three-column tablet contract, missing horizontal rail rules, old “Thêm vào giỏ” copy, two-column footer and `justify-content: space-between` hotline.

---

### Task 2: Make benefits and product collections tablet-native

**Files:**
- Modify: `assets/styles.css:1407-1422`
- Modify: `assets/styles.css:5160-5170`
- Modify: `assets/styles.css:5273-5283`

**Interfaces:**
- Consumes: `.header-benefits`, `.header-benefit`, `.product-grid`, `.product-track`, `.product-card` and existing `data-product-grid` markup.
- Produces: Four visible items per tablet row and native horizontal scrolling for overflow cards.

- [ ] **Step 1: Promote the 768px retail breakpoint to four cards and remove the redundant 1024px duplicate**

```css
@media (min-width: 768px) {
  .product-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .product-track { --product-track-card-width: calc((100% - 36px) / 4); gap: 12px; }
}
```

Keep the existing `1280px → 5` and `1600px → 6` contracts unchanged.

- [ ] **Step 2: Add the dedicated tablet retail rail**

Insert this block after the desktop column contracts and before `@media (min-width: 1181px)`:

```css
/* Tablet retail rails: four visible cards with native horizontal swipe. */
@media (min-width: 768px) and (max-width: 1180px) {
  .product-grid {
    grid-template-columns: none;
    grid-template-rows: minmax(0, 1fr);
    grid-auto-flow: column;
    grid-auto-columns: calc((100% - 36px) / 4);
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .product-grid::-webkit-scrollbar { display: none; }
  .product-grid > .product-card { scroll-snap-align: start; }
}
```

This leaves `.is-hidden { display: none !important; }` authoritative when switching Trending/New Arrivals.

- [ ] **Step 3: Change the tablet benefit strip to one row**

In the existing `@media (max-width: 1180px)` block, use:

```css
.header-benefits {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: 1fr;
  gap: 0;
  padding: 0;
}
.header-benefit + .header-benefit { border-left: 1px solid rgba(147, 181, 220, .34); }
```

Remove the tablet rules that apply top borders to items three and four.

- [ ] **Step 4: Restore the existing mobile 2×2 separators**

In `@media (max-width: 767.98px)`, retain the current 2×2 grid and add:

```css
.header-benefit + .header-benefit { border-left: 0; }
.header-benefit:nth-child(even) { border-left: 1px solid rgba(147, 181, 220, .34); }
.header-benefit:nth-child(n + 3) { border-top: 1px solid rgba(147, 181, 220, .34); }
```

- [ ] **Step 5: Run the focused regression test**

```powershell
node --test tests/homepage.test.mjs
```

Expected result: benefit and rail assertions pass; cart-copy and footer assertions remain failing until Tasks 3 and 4.

---

### Task 3: Shorten the visible cart copy and keep every tablet button on one line

**Files:**
- Modify: `assets/product-cards.js:93-103`
- Modify: `assets/styles.css` inside the new tablet retail media block
- Test: `tests/homepage.test.mjs:170-190`

**Interfaces:**
- Consumes: `renderProductCard(product, options)` and the existing `.product-card__footer` structure.
- Produces: Visible in-stock label `Giỏ hàng`, descriptive ARIA text and single-line tablet buttons.

- [ ] **Step 1: Separate visible copy from the accessible action label**

Replace the current label branch with:

```js
const cartLabel = product.availability === 'in-stock'
  ? 'Giỏ hàng'
  : product.availability === 'preorder'
    ? 'Đặt trước'
    : compact ? 'Chi tiết' : 'Xem sản phẩm';
const cartAriaLabel = product.availability === 'in-stock'
  ? `Thêm ${product.title} vào giỏ hàng`
  : `${cartLabel}: ${product.title}`;
```

Render `cartLabel` in the visible `<span>` and `title`; use `cartAriaLabel` for `aria-label`. Keep `.product-card__cart`, `data-demo-action` and the cart icon unchanged.

- [ ] **Step 2: Compact only the tablet card footer**

Append these rules inside the dedicated `768–1180px` tablet retail block:

```css
.product-card__footer {
  min-height: 52px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) max-content;
  gap: 4px;
  padding-inline: 8px;
}
.product-card__stock {
  min-width: 0;
  padding-left: 12px;
  overflow: hidden;
  font-size: clamp(11px, 1.1vw, 13px);
  text-overflow: ellipsis;
}
.product-card__cart {
  min-height: 44px;
  gap: 4px;
  padding-inline: 6px;
  font-size: clamp(11px, 1.1vw, 13px);
  white-space: nowrap;
}
.product-card__cart span { white-space: nowrap; }
```

These values were validated at 768px with 175px cards: both `Giỏ hàng` and `Đặt trước` remain one line and footer overflow remains zero.

- [ ] **Step 3: Run the focused regression test**

```powershell
node --test tests/homepage.test.mjs
```

Expected result: cart-copy, ARIA and nowrap assertions pass.

---

### Task 4: Recompose the tablet footer into three directory columns

**Files:**
- Modify: `assets/styles.css:6537-6565`
- Test: `tests/homepage.test.mjs:895-950`

**Interfaces:**
- Consumes: `.footer-directory__grid`, `.footer-identity`, three `.footer-directory__group` elements, `.footer-utility` and `.footer-hotline` links.
- Produces: One three-column directory row and left-aligned phone pairs on tablet.

- [ ] **Step 1: Change the `≤1180px` footer directory from two to three columns**

```css
.footer-directory__grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 34px 26px;
}
.footer-identity,
.footer-utility { grid-column: 1 / -1; }
```

The following mobile block keeps `grid-template-columns: 1fr`, so mobile disclosures remain unchanged.

- [ ] **Step 2: Add tablet-only hotline alignment**

Place this block immediately after the existing `@media (max-width: 1180px)` footer rules:

```css
@media (min-width: 768px) and (max-width: 1180px) {
  .footer-hotline a {
    display: grid;
    grid-template-columns: minmax(68px, max-content) max-content;
    justify-content: start;
    column-gap: 10px;
  }
}
```

This aligns both phone numbers to the same x-coordinate while keeping them about 10px from “Mua hàng” and “Khiếu nại”.

- [ ] **Step 3: Run the focused regression test**

```powershell
node --test tests/homepage.test.mjs
```

Expected result: all homepage tests pass.

---

### Task 5: Verify all breakpoints and interactions in isolated Chromium

**Files:**
- Verify only: `index.html`, `assets/styles.css`, `assets/product-cards.js`

**Interfaces:**
- Consumes: exact local URL `file:///D:/hacom25-ldp/index.html` and the project browser-isolation scripts.
- Produces: Browser evidence for layout, scrolling, tab switching and clean runtime state.

- [ ] **Step 1: Run all static gates**

```powershell
npm test
npm run lint
npm run typecheck
npm run verify
git diff --check
```

Expected result: every command exits with code 0.

- [ ] **Step 2: Start the isolated browser and inspect the baseline runtime state**

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\browser-automation.ps1 -Action Start
```

Open `file:///D:/hacom25-ldp/index.html`, confirm `document.readyState === 'complete'`, inspect Console/page errors and ensure every required local resource returns 200.

- [ ] **Step 3: Test the viewport matrix**

Use:

```text
Mobile: 360×800, 390×844, 430×932
Tablet: 768×1024, 942×1125, 1024×768, 1180×800
Desktop protection: 1181×800, 1280×800, 1440×900, 2560×1440
Breakpoint probes: 767/768 and 1180/1181
```

At tablet widths assert:

```js
benefitRowCount === 1
benefitCount === 4
visibleProductCards === 4
productRowCount === 1
productGrid.scrollWidth > productGrid.clientWidth
new Set(productCardHeights).size === 1
footerDirectoryColumnCount === 3
footerDirectoryRowCount === 1
Math.abs(phoneGap - 10) <= 1
document.documentElement.scrollWidth === document.documentElement.clientWidth
```

- [ ] **Step 4: Test horizontal product interactions**

For deals and one regular grid, record the leading `data-sku`, scroll one card step, wait for scroll settling and verify the leading SKU changes. Switch from `Hot Trend` to `Hàng mới về`, repeat the four-visible-card and horizontal-scroll assertions, then focus an off-screen product control and verify the native rail brings it into view.

- [ ] **Step 5: Verify copy and clipping across all eight collections**

Assert every in-stock button has visible text `Giỏ hàng`, no visible button starts with `Thêm vào giỏ`, both `Giỏ hàng` and `Đặt trước` have one rendered text line, all purchase buttons remain at least 44px high, and no card/footer reports positive horizontal overflow.

- [ ] **Step 6: Protect mobile and desktop behavior**

At mobile widths confirm benefits remain 2×2 and product grids remain the existing two-column layout. At `≥1181px` confirm product grids use the current desktop column contracts, footer returns to its desktop layout, and no tablet horizontal rail rule remains active.

- [ ] **Step 7: Capture acceptance screenshots and clean up**

Capture full-page or targeted screenshots at 768, 1024 and 1180px for benefit strip, a product collection and footer. Close the automation page, stop the isolated browser and verify:

```json
{"ready":false,"owned":false,"processIds":[]}
```

## Acceptance Summary

- Tablet shows all four purchase benefits on one row.
- Every product collection shows one row of exactly four complete cards and the remaining cards are reachable through native horizontal swipe/scroll.
- Visible in-stock button copy is `Giỏ hàng`; all purchase-state labels stay on one line at 768px and retain a 44px touch target.
- The three footer directory groups occupy one row of three columns on tablet.
- Hotline numbers align left, share one number column and sit about 10px from their labels.
- Mobile and desktop layouts remain unchanged outside the approved visible button copy.
- Console, page errors, failed resources and body-level horizontal overflow are zero after the final browser pass.
