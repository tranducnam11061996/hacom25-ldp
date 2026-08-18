import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync('index.html', 'utf8');
const css = readFileSync('assets/styles.css', 'utf8');
const appJs = readFileSync('assets/app.js', 'utf8');
const menuFlyoutsJs = readFileSync('assets/menu-flyouts.js', 'utf8');
const carouselJs = readFileSync('assets/carousel.js', 'utf8');
const catalogJs = readFileSync('assets/catalog.js', 'utf8');
const productCardsJs = readFileSync('assets/product-cards.js', 'utf8');
const agentRules = readFileSync('AGENTS.md', 'utf8');
const appleManifest = JSON.parse(readFileSync('assets/media/menu/apple/sources.json', 'utf8'));
const laptopManifest = JSON.parse(readFileSync('assets/media/menu/laptops/sources.json', 'utf8'));
const pcManifest = JSON.parse(readFileSync('assets/media/menu/pc/sources.json', 'utf8'));
const displayManifest = JSON.parse(readFileSync('assets/media/menu/displays/sources.json', 'utf8'));

const appContext = {
  window: {},
  document: { addEventListener() {} },
  console: { error() {}, warn() {}, log() {} }
};
vm.runInNewContext(menuFlyoutsJs, appContext, { filename: 'assets/menu-flyouts.js' });
vm.runInNewContext(appJs, appContext, { filename: 'assets/app.js' });
const gatewayData = appContext.window.HacomGatewayData;

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
assert.equal(duplicateIds.length, 0, `Duplicate IDs: ${[...new Set(duplicateIds)].join(', ')}`);

assert.match(html, /<html lang="vi">/);
assert.match(html, /HACOM - PC, LAPTOP, Thiết Bị Chơi Game hàng đầu Việt Nam/);
assert.match(html, /<main id="main-content"/);
assert.match(html, /<h1\b/);
assert.match(html, /Content-Security-Policy/);
assert.match(html, /<script defer src="assets\/catalog\.js"><\/script>/);
assert.match(html, /<script defer src="assets\/product-cards\.js"><\/script>/);
assert.match(html, /<script defer src="assets\/carousel\.js"><\/script>/);
assert.match(html, /<script defer src="assets\/menu-flyouts\.js"><\/script>/);
assert.match(html, /<script defer src="assets\/app\.js"><\/script>/);
assert.match(html, /<link rel="stylesheet" href="assets\/tailwind\.css">/);
assert.match(html, /<link rel="stylesheet" href="assets\/styles\.css">/);
assert.doesNotMatch(html, /href="#"|\bonclick=|cdn\.tailwindcss\.com|<style\b/i);
assert.doesNotMatch(html, /<script(?![^>]*\bsrc=)/i);
assert.doesNotMatch(html, /type="module"|import\s+.*from\s+['"][^'"]+['"]/i);

assert.match(css, /--brand-red:\s*#ea2127/);
assert.match(css, /--brand-red-dark:\s*#c81820/);
assert.match(css, /--brand-red-deep:\s*#941319/);
assert.match(css, /--brand-navy:\s*#2c2f75/);
assert.match(css, /--page:\s*#f5f6f8/);
assert.match(css, /--radius-search:\s*8px/);
assert.match(css, /--radius-card:\s*16px/);
assert.match(css, /--radius-pill:\s*999px/);
assert.match(css, /--container-standard:\s*1600px/);
assert.match(css, /--container-wide:\s*1800px/);
assert.match(css, /--container:\s*var\(--container-standard\)/);
assert.match(css, /--page-gutter:\s*clamp\(16px,\s*1\.5vw,\s*24px\)/);
assert.match(css, /\.page-container\s*\{[^}]*width:\s*min\(calc\(100% - var\(--page-gutter\) - var\(--page-gutter\)\),\s*var\(--container\)\)/s);
assert.match(css, /--hover-lift-clearance:\s*12px/);
assert.match(css, /\.hover-lift-safe-zone\s*\{[^}]*padding-block:\s*var\(--hover-lift-clearance\)[^}]*margin-block:\s*calc\(-1 \* var\(--hover-lift-clearance\)\)/s);
assert.ok((html.match(/\bhover-lift-safe-zone\b/g) || []).length >= 1);
assert.match(css, /\.product-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2/);
assert.match(css, /@media \(min-width: 768px\)[\s\S]*?\.product-grid\s*\{\s*grid-template-columns:\s*repeat\(4/);
assert.match(css, /@media \(min-width: 1280px\)[\s\S]*?\.product-grid\s*\{\s*grid-template-columns:\s*repeat\(5/);
assert.match(css, /@media \(min-width: 1600px\)[\s\S]*?\.product-grid\s*\{\s*grid-template-columns:\s*repeat\(6/);
assert.doesNotMatch(css, /\.product-grid[^}]*repeat\([789]/);
assert.match(css, /\.product-track\s*\{[^}]*--product-track-card-width:\s*calc\(\(100% - 8px\) \/ 2\)[^}]*gap:\s*8px/s);
assert.match(css, /\.product-track\s*>\s*\.product-card\s*\{[^}]*flex:\s*0 0 var\(--product-track-card-width\)[^}]*width:\s*var\(--product-track-card-width\)[^}]*min-width:\s*0[^}]*max-width:\s*none/s);
for (const [minWidth, columns, consumedGap] of [[768, 4, 36], [1280, 5, 48], [1600, 6, 60]]) {
  assert.match(css, new RegExp(`@media \\(min-width: ${minWidth}px\\)[\\s\\S]{0,320}\\.product-track\\s*\\{[^}]*--product-track-card-width:\\s*calc\\(\\(100% - ${consumedGap}px\\) \\/ ${columns}\\)`));
}
assert.doesNotMatch(css, /\.product-track\s*>\s*\*\s*\{[^}]*width:/s);
assert.doesNotMatch(css, /clamp\(220px,\s*18vw,\s*280px\)|calc\(50vw - 16px\)|min-width:\s*154px|max-width:\s*190px/);
assert.match(agentRules, /## Responsive container system \(mandatory\)/);
assert.match(agentRules, /## Hover lift safety \(mandatory\)/);
assert.match(agentRules, /## Mobile-first implementation \(mandatory\)/);

assert.doesNotMatch(appJs + carouselJs, /\.innerHTML\s*=/);
assert.doesNotMatch(catalogJs + productCardsJs, /\.innerHTML\s*=/);
assert.match(appJs, /const categoryTree = Object\.freeze\(\[/);
assert.equal((appJs.slice(appJs.indexOf('const categoryTree'), appJs.indexOf('const campaignSets')).match(/\{ id:/g) || []).length, 21);
assert.doesNotMatch(menuFlyoutsJs, /innerHTML/);
assert.doesNotMatch(menuFlyoutsJs, /https:\/\/(?:cdn-files\.hacom|cdn-transformations\.hacom|hanoicomputercdn)/);
const remainingFlyouts = {
  mice: ['mouse-showcase', 30, 'chuot.jpg'],
  headphones: ['media-columns-showcase', 35, 'tai_nghe.jpg'],
  speakers: ['media-columns-showcase', 38, 'loa.jpg'],
  'gaming-consoles': ['media-columns-showcase', 40, 'may_choi_game.jpg'],
  printers: ['media-columns-showcase', 30, 'may_in.jpg'],
  projectors: ['media-columns-showcase', 26, 'may_chieu.jpg'],
  gpu: ['taxonomy-columns-showcase', 61, 'vga.jpg'],
  cpu: ['taxonomy-columns-showcase', 70, 'cpu.jpg'],
  mainboard: ['taxonomy-columns-showcase', 52, 'main.jpg'],
  ram: ['taxonomy-columns-showcase', 64, 'ram.jpg'],
  cooling: ['taxonomy-columns-showcase', 65, 'tan_nhiet.jpg'],
  chairs: ['taxonomy-columns-showcase', 58, 'ghe.jpg'],
  network: ['taxonomy-columns-showcase', 55, 'thiet_bi_mang.jpg'],
  'home-appliances': ['taxonomy-columns-showcase', 53, 'gia_dung.jpg'],
  cameras: ['taxonomy-columns-showcase', 64, 'camera.jpg'],
  business: ['business-showcase', 27, 'danh_cho_doanh_nghiep.jpg']
};
const countRemainingActions = (flyout) => {
  if (flyout.type === 'mouse-showcase') return flyout.types.length + flyout.prices.length + flyout.features.length + flyout.brands.length + flyout.accessories.length;
  if (flyout.type === 'business-showcase') return flyout.navigation.length + flyout.columns.reduce((sum, column) => sum + column.items.length, 0);
  return flyout.columns.flatMap((column) => column.sections).reduce((sum, section) => sum + section.items.length, 0);
};
let remainingActionCount = 0;
for (const [id, [type, count, designFile]] of Object.entries(remainingFlyouts)) {
  const category = gatewayData.categoryTree.find((item) => item.id === id);
  assert.ok(category, `Missing remaining category: ${id}`);
  assert.equal(category.flyout?.type, type);
  assert.equal(countRemainingActions(category.flyout), count);
  remainingActionCount += count;
  const manifest = JSON.parse(readFileSync(`assets/media/menu/${id}/sources.json`, 'utf8'));
  assert.equal(manifest.version, 1);
  assert.equal(manifest.category, id);
  assert.equal(manifest.designFile, `design-menu/${designFile}`);
  for (const asset of manifest.assets) {
    assert.match(asset.pageUrl, /^https:\/\/hacom\.vn\//);
    assert.ok(['cdn-files.hacom.vn', 'cdn-transformations.hacom.vn', 'hanoicomputercdn.com'].includes(new URL(asset.sourceUrl).hostname));
    assert.ok(existsSync(asset.output), `Missing remaining flyout asset: ${asset.output}`);
    assert.ok(statSync(asset.output).size > 100, `Remaining flyout asset is unexpectedly small: ${asset.output}`);
  }
}
assert.equal(remainingActionCount, 768);
assert.match(appJs, /renderMouseFlyout/);
assert.match(appJs, /renderMediaColumnsFlyout/);
assert.match(appJs, /renderTaxonomyColumnsFlyout/);
assert.match(appJs, /renderBusinessFlyout/);
assert.match(css, /\.mouse-flyout__type-grid\s*\{[^}]*repeat\(6/);
assert.match(css, /\.media-columns-flyout,[\s\S]*?grid-template-columns:\s*repeat\(4/);
assert.match(css, /\.taxonomy-columns-flyout--gpu\s*\{[^}]*1\.06fr[^}]*\.88fr/);
assert.match(css, /\.business-flyout__navigation\s*\{[^}]*repeat\(4/);
const keyboardCategory = gatewayData.categoryTree.find((item) => item.id === 'keyboards');
assert.ok(keyboardCategory, 'Missing keyboard category');
assert.equal(keyboardCategory.flyout?.type, 'keyboard-showcase');
assert.deepEqual(
  ['brands', 'types', 'prices', 'connections', 'features', 'accessories'].map((key) => keyboardCategory.flyout[key].length),
  [10, 7, 5, 3, 5, 5]
);
assert.match(appJs, /content\.replaceChildren\(renderKeyboardFlyout\(category\.flyout\)\)/);
assert.match(css, /\.gateway-flyout--keyboard \.gateway-flyout__head\s*\{\s*display:\s*none/);
assert.match(css, /\.keyboard-flyout__taxonomy\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/s);
assert.match(css, /\.keyboard-flyout__accessory-grid\s*\{[^}]*grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\)/s);
for (const assetPath of [
  ...keyboardCategory.flyout.brands.map((item) => item.logo),
  ...keyboardCategory.flyout.types.map((item) => item.image),
  ...keyboardCategory.flyout.accessories.map((item) => item.image)
]) {
  assert.ok(existsSync(assetPath), `Missing keyboard flyout asset: ${assetPath}`);
  assert.ok(statSync(assetPath).size > 100, `Keyboard flyout asset is unexpectedly small: ${assetPath}`);
}
const laptopCategory = gatewayData.categoryTree.find((item) => item.id === 'laptops');
assert.ok(laptopCategory, 'Missing laptop category');
assert.equal(laptopCategory.flyout?.type, 'laptop-showcase');
assert.deepEqual(
  [laptopCategory.flyout.needs, laptopCategory.flyout.prices, laptopCategory.flyout.processors, laptopCategory.flyout.screens]
    .map((items) => items.length),
  [5, 5, 6, 5]
);
assert.match(appJs, /renderLaptopFlyout/);
assert.match(appJs, /content\.replaceChildren\(renderLaptopFlyout\(category\.flyout\)\)/);
assert.doesNotMatch(appJs.slice(appJs.indexOf('const laptopFlyout'), appJs.indexOf('const appleFlyout')), /cdn-files\.hacom|hanoicomputercdn/);
assert.equal(laptopManifest.version, 1);
assert.equal(laptopManifest.category, 'laptops');
assert.equal(laptopManifest.designFile, 'design-menu/laptop.jpg');
assert.equal(laptopManifest.assets.length, 5);
const allowedLaptopSourceHosts = new Set(['cdn-files.hacom.vn', 'cdn-transformations.hacom.vn', 'hanoicomputercdn.com']);
for (const asset of laptopManifest.assets) {
  assert.match(asset.pageUrl, /^https:\/\/hacom\.vn\//);
  assert.ok(allowedLaptopSourceHosts.has(new URL(asset.sourceUrl).hostname), `Unexpected Laptop source host: ${asset.sourceUrl}`);
  assert.deepEqual(asset.canvas, { width: 480, height: 320, fit: 'contain', background: '#ffffff' });
  assert.ok(existsSync(asset.output), `Missing laptop flyout asset: ${asset.output}`);
  assert.ok(statSync(asset.output).size > 100, `Laptop flyout asset is unexpectedly small: ${asset.output}`);
}
assert.match(css, /\.gateway-flyout--laptop \.gateway-flyout__head\s*\{[^}]*display:\s*none/);
assert.match(css, /\.laptop-flyout__need-grid\s*\{[^}]*grid-template-columns:\s*repeat\(5/);
assert.match(css, /\.laptop-flyout__criteria\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*\.82fr\)\s*minmax\(0,\s*1fr\)/s);
assert.match(css, /\.laptop-flyout__filter-grid--processors\s*\{[^}]*repeat\(6/);
assert.match(css, /\.laptop-flyout__section--screens\s*\{[^}]*2\.35fr\)\s*repeat\(5/s);
const pcCategory = gatewayData.categoryTree.find((item) => item.id === 'pc');
assert.ok(pcCategory, 'Missing PC category');
assert.equal(pcCategory.flyout?.type, 'pc-showcase');
assert.equal(pcCategory.flyout.families.length, 10);
const pcFilterCounts = Array.from(pcCategory.flyout.filters, (filter) =>
  filter.columns.reduce((total, column) => total + column.length, 0)
);
assert.deepEqual(pcFilterCounts, [8, 10, 10, 8, 9, 11]);
assert.equal(10 + pcFilterCounts.reduce((total, count) => total + count, 0), 66);
assert.equal(pcManifest.version, 1);
assert.equal(pcManifest.category, 'pc');
assert.equal(pcManifest.designFile, 'design-menu/pc.jpg');
assert.deepEqual(pcManifest.assets, []);
assert.match(appJs, /renderPcFlyout/);
assert.match(appJs, /content\.replaceChildren\(renderPcFlyout\(category\.flyout\)\)/);
const pcConfigStart = appJs.indexOf('const pcFlyout');
const pcConfigEnd = appJs.indexOf('const categoryTree');
assert.ok(pcConfigStart >= 0 && pcConfigEnd > pcConfigStart, 'PC flyout config is missing');
assert.doesNotMatch(appJs.slice(pcConfigStart, pcConfigEnd), /cdn-files\.hacom|cdn-transformations\.hacom|hanoicomputercdn/);
assert.match(css, /\.gateway-flyout--pc \.gateway-flyout__head\s*\{[^}]*display:\s*none/s);
assert.match(css, /\.pc-flyout__families\s*\{[^}]*repeat\(5,\s*minmax\(0,\s*1fr\)\)[^}]*repeat\(2/s);
assert.match(css, /\.pc-flyout__taxonomy\s*\{[^}]*minmax\(0,\s*\.98fr\)\s*minmax\(0,\s*1\.02fr\)[^}]*repeat\(3/s);
const displayCategory = gatewayData.categoryTree.find((item) => item.id === 'displays');
assert.ok(displayCategory, 'Missing display category');
assert.equal(displayCategory.flyout?.type, 'display-showcase');
assert.deepEqual(
  [
    displayCategory.flyout.useCases,
    displayCategory.flyout.selectors[0].items,
    displayCategory.flyout.selectors[1].items,
    displayCategory.flyout.brands,
    displayCategory.flyout.specifications[0].items,
    displayCategory.flyout.specifications[1].items,
    displayCategory.flyout.specifications[2].items,
    displayCategory.flyout.specifications[3].items,
    displayCategory.flyout.specialties
  ].map((items) => items.length),
  [6, 5, 5, 13, 4, 4, 6, 5, 4]
);
assert.equal(
  displayCategory.flyout.useCases.length
    + displayCategory.flyout.selectors.flatMap((selector) => selector.items).length
    + displayCategory.flyout.brands.length
    + displayCategory.flyout.specifications.flatMap((specification) => specification.items).length
    + displayCategory.flyout.specialties.length,
  52
);
assert.equal(displayManifest.version, 1);
assert.equal(displayManifest.category, 'displays');
assert.equal(displayManifest.designFile, 'design-menu/man_hinh.jpg');
assert.equal(displayManifest.assets.length, 13);
const allowedDisplaySourceHosts = new Set(['cdn-files.hacom.vn', 'cdn-transformations.hacom.vn', 'hanoicomputercdn.com']);
for (const asset of displayManifest.assets) {
  assert.match(asset.pageUrl, /^https:\/\/hacom\.vn\//);
  assert.ok(allowedDisplaySourceHosts.has(new URL(asset.sourceUrl).hostname), `Unexpected Display source host: ${asset.sourceUrl}`);
  assert.ok(existsSync(asset.output), `Missing display brand asset: ${asset.output}`);
  assert.ok(statSync(asset.output).size > 100, `Display brand asset is unexpectedly small: ${asset.output}`);
  assert.equal(asset.fallback, false);
}
const displayConfigStart = appJs.indexOf('const displayFlyout');
const displayConfigEnd = appJs.indexOf('const categoryTree');
assert.ok(displayConfigStart >= 0 && displayConfigEnd > displayConfigStart, 'Display flyout config is missing');
assert.doesNotMatch(appJs.slice(displayConfigStart, displayConfigEnd), /cdn-files\.hacom|cdn-transformations\.hacom|hanoicomputercdn/);
assert.match(appJs, /renderDisplayFlyout/);
assert.match(appJs, /content\.replaceChildren\(renderDisplayFlyout\(category\.flyout\)\)/);
assert.match(css, /\.gateway-flyout--display \.gateway-flyout__head\s*\{[^}]*display:\s*none/s);
assert.match(css, /\.display-flyout__use-cases\s*\{[^}]*repeat\(6,\s*minmax\(0,\s*1fr\)\)/);
assert.match(css, /\.display-flyout__selector-panel--sizes \.display-flyout__selector-grid\s*\{[^}]*repeat\(4,\s*minmax\(0,\s*1fr\)\)\s*minmax\(0,\s*1\.35fr\)/s);
assert.match(css, /\.display-flyout__selector-panel--prices \.display-flyout__selector-grid\s*\{[^}]*repeat\(5,\s*minmax\(0,\s*1fr\)\)/s);
assert.match(css, /\.display-flyout__brand-cards\s*\{[^}]*repeat\(6,\s*minmax\(0,\s*1fr\)\)[^}]*repeat\(2/s);
assert.match(css, /\.display-flyout__specifications\s*\{[^}]*repeat\(4,\s*minmax\(0,\s*1fr\)\)/);
assert.match(css, /\.display-flyout__specialty-grid\s*\{[^}]*repeat\(4,\s*minmax\(0,\s*1fr\)\)/);
const appleCategory = gatewayData.categoryTree.find((item) => item.id === 'apple');
assert.ok(appleCategory, 'Missing Apple category');
assert.equal(appleCategory.flyout?.type, 'apple-showcase');
assert.deepEqual(
  [appleCategory.flyout.navigation, appleCategory.flyout.hero.proofs, appleCategory.flyout.mac.items,
    appleCategory.flyout.iphone.items, appleCategory.flyout.ipad.items, appleCategory.flyout.watch.items,
    appleCategory.flyout.accessories.items].map((items) => items.length),
  [5, 3, 4, 3, 4, 1, 5]
);
assert.equal(appleManifest.version, 1);
assert.equal(appleManifest.category, 'apple');
assert.equal(appleManifest.designFile, 'design-menu/san_pham_apple.jpg');
assert.equal(appleManifest.assets.length, 17);
const allowedAppleSourceHosts = new Set(['cdn-files.hacom.vn', 'cdn-transformations.hacom.vn', 'hanoicomputercdn.com']);
for (const asset of appleManifest.assets) {
  assert.match(asset.pageUrl, /^https:\/\/hacom\.vn\//);
  assert.ok(allowedAppleSourceHosts.has(new URL(asset.sourceUrl).hostname), `Unexpected Apple source host: ${asset.sourceUrl}`);
  assert.deepEqual(asset.canvas, { width: 480, height: 320, fit: 'contain', background: '#ffffff' });
  assert.ok(existsSync(asset.output), `Missing Apple flyout asset: ${asset.output}`);
  assert.ok(statSync(asset.output).size > 100, `Apple flyout asset is unexpectedly small: ${asset.output}`);
}
assert.match(appJs, /renderAppleFlyout/);
assert.match(appJs, /content\.replaceChildren\(renderAppleFlyout\(category\.flyout\)\)/);
assert.doesNotMatch(appJs.slice(appJs.indexOf('const appleFlyout'), appJs.indexOf('const keyboardFlyout')), /cdn-files\.hacom|hanoicomputercdn/);
assert.match(css, /\.gateway-flyout--apple \.gateway-flyout__head\s*\{\s*display:\s*none/);
assert.match(css, /\.apple-flyout\s*\{[^}]*grid-template-rows:\s*clamp\(48px,\s*8\.5%,\s*56px\)\s*minmax\(0,\s*1fr\)/s);
assert.match(css, /\.apple-flyout__navigation\s*\{[^}]*grid-template-columns:\s*var\(--apple-grid\)/s);
assert.match(css, /\.apple-flyout__panel\s*\{[^}]*grid-template-columns:\s*var\(--apple-grid\)/s);
assert.match(css, /\.apple-flyout__family--iphone \.apple-flyout__product-list\s*\{[^}]*repeat\(3/);
assert.match(css, /\.apple-flyout__family--accessories \.apple-flyout__product-list\s*\{[^}]*repeat\(5/);
assert.match(appJs, /const homepageCollections = Object\.freeze\(\{/);
assert.match(appJs, /data-product-grid/);
assert.match(appJs, /catalog\.getBySku\(sku\)/);
assert.match(productCardsJs, /--product-image-scale/);
assert.match(productCardsJs, /product-card__image-surface/);
assert.match(productCardsJs, /'aria-hidden': 'true'/);
assert.match(productCardsJs, /for \(let index = 0; index < 5; index \+= 1\)/);
assert.match(productCardsJs, /'aria-label': `Đánh giá \$\{product\.rating\} trên 5 sao`/);
assert.match(productCardsJs, /reviewCount/);
assert.match(productCardsJs, /attrs: \{ role: 'group', 'aria-label': 'Thông số nổi bật' \}/);
assert.match(css, /\.product-card__image\s*\{[^}]*object-fit:\s*contain/);
assert.match(css, /\.product-card__media-accent\s*\{\s*display:\s*none/);
assert.match(css, /\.product-card__title[^}]*-webkit-line-clamp:\s*2/);
assert.match(css, /\.product-card__price[^}]*color:\s*var\(--brand-red-dark\)/);
assert.doesNotMatch(hoverRuleBlocks(css), /translateY\(-\d+(?:\.\d+)?px\)/);
assert.doesNotMatch(carouselJs, /setInterval|cloneNode/);
assert.match(carouselJs, /window\.HacomCarousel = Object\.freeze/);
assert.match(appJs, /window\.HacomCarousel\?\.initInfiniteCarousel/);

assert.ok(html.indexOf('id="hero"') < html.indexOf('id="deals"'));
assert.match(html, /data-carousel-variant="gateway"[^>]*data-carousel-delay="3000"/);
assert.equal((html.match(/class="gateway-hero-slide(?:\s|")/g) || []).length, 3);
assert.equal((html.match(/data-gateway-fixed-tile/g) || []).length, 4);
assert.equal((html.match(/class="gateway-reference-tile gateway-reference-tile--/g) || []).length, 4);
assert.equal((html.match(/class="header-promo-card"/g) || []).length, 5);
assert.match(html, /data-carousel-variant="snap"/);
assert.equal((html.match(/data-product-grid/g) || []).length, 8);
for (const collection of ['deals', 'trending', 'new-arrivals', 'laptops', 'pc-gaming', 'displays', 'components', 'gaming-gear']) {
  assert.match(html, new RegExp(`data-collection="${collection}"`));
}
assert.equal((html.match(/class="category-card category-spectrum__card/g) || []).length, 20);
assert.doesNotMatch(html, /gateway-nav__head|gateway-nav__footer|Khám phá theo danh mục|Cần tư vấn cấu hình/);
assert.match(html, /<nav class="gateway-nav" aria-label="Danh mục sản phẩm nổi bật">/);
assert.match(css, /--gateway-compact-height:\s*clamp\(700px,\s*calc\(100dvh - 150px\),\s*740px\)/);
assert.match(css, /\.gateway-flyout\s*\{[^}]*inset:\s*0;/);
assert.match(css, /--text-caption:\s*0\.75rem/);
assert.match(css, /--text-meta:\s*0\.8125rem/);
assert.match(css, /--text-ui:\s*0\.875rem/);
assert.match(css, /--text-card-title:\s*0\.9375rem/);
assert.match(css, /--text-body:\s*1rem/);
assert.match(css, /\.gateway-category\s*\{\s*min-height:\s*0;[\s\S]*?grid-template-columns:\s*18px minmax\(0, 1fr\) 12px[\s\S]*?font-size:\s*var\(--text-meta\)/);
assert.match(css, /\.mobile-header \.search-input-box input\s*\{[^}]*font-size:\s*var\(--text-body\)/s);
assert.match(css, /\.product-card__title\s*\{[^}]*font-size:\s*var\(--text-card-title\)[^}]*line-height:\s*1\.35/s);
assert.match(css, /\.product-card__footer\s*\{[^}]*flex-direction:\s*column[^}]*align-items:\s*stretch/s);
assert.doesNotMatch(css, /\.gateway-(?:campaign|main|promo)(?:[\s_-]|\.)/);
assert.match(css, /-moz-osx-font-smoothing:\s*grayscale/);
assert.doesNotMatch(css, /\.product-card__spec-label\s*\{\s*font-size:\s*[789]px/);
assert.doesNotMatch(css, /\.product-card__cart\s*\{[^}]*font-size:\s*[789]px/);
assert.match(html, /<form id="newsletterForm"/);
assert.match(html, /<input id="mobileSearch"[^>]*type="search"/);
assert.match(html, /<input id="desktopSearch"[^>]*type="search"/);
assert.ok(existsSync('assets/tailwind.css'), 'Missing generated assets/tailwind.css');
assert.ok(existsSync('assets/media/products/manifest.json'), 'Missing HACOM product image manifest');
for (const asset of [
  'performance-main-1536.webp', 'performance-deal-720.webp', 'performance-support-720.webp',
  'mobility-main-1536.webp', 'mobility-ai-720.webp', 'mobility-accessories-720.webp',
  'builder-main-1536.webp', 'builder-graphics-720.webp', 'builder-service-720.webp'
]) {
  const assetPath = `assets/media/gateway/${asset}`;
  assert.ok(existsSync(assetPath), `Missing gateway artwork: ${asset}`);
  assert.ok(statSync(assetPath).size > 10_000, `Gateway artwork is unexpectedly small: ${asset}`);
}

function hoverRuleBlocks(source) {
  return (source.match(/[^{}]*:hover[^{}]*\{[^{}]*\}/g) || []).join('\n');
}

console.log('Static HACOM checks passed.');
