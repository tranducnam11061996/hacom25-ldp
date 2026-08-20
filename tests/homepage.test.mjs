import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const html = readFileSync('index.html', 'utf8');
const css = readFileSync('assets/styles.css', 'utf8');
const appSource = readFileSync('assets/app.js', 'utf8');
const productCardSource = readFileSync('assets/product-cards.js', 'utf8');
const showroomSource = readFileSync('assets/showrooms.js', 'utf8');
const menuFlyoutsSource = readFileSync('assets/menu-flyouts.js', 'utf8');
const catalogSource = readFileSync('assets/catalog.js', 'utf8');
const appleManifest = JSON.parse(readFileSync('assets/media/menu/apple/sources.json', 'utf8'));
const laptopManifest = JSON.parse(readFileSync('assets/media/menu/laptops/sources.json', 'utf8'));
const pcManifest = JSON.parse(readFileSync('assets/media/menu/pc/sources.json', 'utf8'));
const displayManifest = JSON.parse(readFileSync('assets/media/menu/displays/sources.json', 'utf8'));
const customerManifest = JSON.parse(readFileSync('assets/media/customers/sources.json', 'utf8'));
const footerManifest = JSON.parse(readFileSync('assets/media/footer/sources.json', 'utf8'));
const additionalManifestPaths = {
  mice: 'assets/media/menu/mice/sources.json',
  headphones: 'assets/media/menu/headphones/sources.json',
  speakers: 'assets/media/menu/speakers/sources.json',
  'gaming-consoles': 'assets/media/menu/gaming-consoles/sources.json',
  printers: 'assets/media/menu/printers/sources.json',
  projectors: 'assets/media/menu/projectors/sources.json',
  gpu: 'assets/media/menu/gpu/sources.json',
  cpu: 'assets/media/menu/cpu/sources.json',
  mainboard: 'assets/media/menu/mainboard/sources.json',
  ram: 'assets/media/menu/ram/sources.json',
  cooling: 'assets/media/menu/cooling/sources.json',
  chairs: 'assets/media/menu/chairs/sources.json',
  network: 'assets/media/menu/network/sources.json',
  'home-appliances': 'assets/media/menu/home-appliances/sources.json',
  cameras: 'assets/media/menu/cameras/sources.json',
  business: 'assets/media/menu/business/sources.json'
};
const additionalManifests = Object.fromEntries(Object.entries(additionalManifestPaths).map(([id, path]) => [id, JSON.parse(readFileSync(path, 'utf8'))]));

const catalogContext = { window: {} };
vm.runInNewContext(catalogSource, catalogContext, { filename: 'assets/catalog.js' });
const catalog = catalogContext.window.HacomCatalog;

const showroomContext = { window: {} };
vm.runInNewContext(showroomSource, showroomContext, { filename: 'assets/showrooms.js' });
const showroomData = showroomContext.window.HacomShowrooms;

const appContext = {
  window: {},
  document: { addEventListener() {} },
  console: { error() {}, warn() {}, log() {} }
};
vm.runInNewContext(menuFlyoutsSource, appContext, { filename: 'assets/menu-flyouts.js' });
vm.runInNewContext(appSource, appContext, { filename: 'assets/app.js' });
const gatewayData = appContext.window.HacomGatewayData;

test('homepage keeps the public container and retail grid contract', () => {
  assert.match(css, /--container-standard:\s*1600px/);
  assert.match(css, /--container-wide:\s*1800px/);
  assert.match(css, /\.page-container\s*\{/);
  for (const [minWidth, columns] of [[768, 4], [1280, 5], [1600, 6]]) {
    assert.match(css, new RegExp(`@media \\(min-width: ${minWidth}px\\)[\\s\\S]{0,220}repeat\\(${columns}`));
  }
  assert.match(css, /\.product-grid\s*\{[^}]*repeat\(2/);
  assert.doesNotMatch(css, /\.product-grid[^}]*repeat\([78],\s*minmax/);
});

test('responsive viewport and touch targets keep the tablet and 2K contract', () => {
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1\.0, viewport-fit=cover">/);
  assert.match(css, /--container-standard:\s*1600px/);
  assert.match(css, /--container-wide:\s*1800px/);
  assert.match(css, /@media \(min-width: 1680px\)[\s\S]*?--container:\s*clamp\(/);
  assert.match(css, /\.category-pill, \.section-tab\s*\{[^}]*min-height:\s*44px/);
  assert.match(css, /\.section-head-actions > button:not\(\.text-link\), \.carousel-controls > button\s*\{[^}]*width:\s*44px;\s*height:\s*44px/);
  assert.match(css, /\.mobile-header \.menu-trigger--mobile\s*\{[^}]*width:\s*44px;[^}]*min-height:\s*44px/);
  assert.match(css, /padding-bottom:\s*calc\(68px \+ env\(safe-area-inset-bottom\)\)/);
});

test('gateway tablet flow stays intrinsic and adjacent promo content is never hidden', () => {
  const fixedGatewayHeight = 'height: clamp(620px, calc(100dvh - 150px), 672px);';
  const fixedGatewayHeightIndex = css.lastIndexOf(fixedGatewayHeight);
  assert.notEqual(fixedGatewayHeightIndex, -1, 'Missing the desktop Ice-Tech gateway height contract');

  const responsiveGatewayOverride = [
    '.gateway-shell,',
    '  .gateway-stage,',
    '  .gateway-reference-grid { height: auto; min-height: 0; }'
  ].join('\n');
  const responsiveGatewayOverrideIndex = css.indexOf(responsiveGatewayOverride, fixedGatewayHeightIndex);
  assert.ok(
    responsiveGatewayOverrideIndex > fixedGatewayHeightIndex,
    'The <=1180px intrinsic-height override must follow the fixed desktop gateway height'
  );

  assert.match(css, /\.header-promo-showcase\.is-promo-ready:not\(\.is-promo-visible\)::after\s*\{[^}]*transform:\s*scaleX\(0\)/);
  assert.doesNotMatch(css, /\.header-promo-showcase\.is-promo-ready:not\(\.is-promo-visible\) \.header-promo-heading/);
});

const countFlyoutActions = (flyout) => {
  if (flyout.type === 'mouse-showcase') return flyout.types.length + flyout.prices.length + flyout.features.length + flyout.brands.length + flyout.accessories.length;
  if (flyout.type === 'business-showcase') return flyout.navigation.length + flyout.columns.reduce((sum, column) => sum + column.items.length, 0);
  return flyout.columns.flatMap((column) => column.sections).reduce((sum, section) => sum + section.items.length, 0);
};

test('remaining category flyouts expose the complete image-derived taxonomy', () => {
  const expected = {
    mice: ['mouse-showcase', 30],
    headphones: ['media-columns-showcase', 35],
    speakers: ['media-columns-showcase', 38],
    'gaming-consoles': ['media-columns-showcase', 40],
    printers: ['media-columns-showcase', 30],
    projectors: ['media-columns-showcase', 26],
    gpu: ['taxonomy-columns-showcase', 61],
    cpu: ['taxonomy-columns-showcase', 70],
    mainboard: ['taxonomy-columns-showcase', 52],
    ram: ['taxonomy-columns-showcase', 64],
    cooling: ['taxonomy-columns-showcase', 65],
    chairs: ['taxonomy-columns-showcase', 58],
    network: ['taxonomy-columns-showcase', 55],
    'home-appliances': ['taxonomy-columns-showcase', 53],
    cameras: ['taxonomy-columns-showcase', 64],
    business: ['business-showcase', 27]
  };

  for (const [id, [type, count]] of Object.entries(expected)) {
    const category = gatewayData.categoryTree.find((item) => item.id === id);
    assert.ok(category, `Missing category ${id}`);
    assert.equal(category.flyout?.type, type);
    assert.equal(countFlyoutActions(category.flyout), count, `Unexpected action count for ${id}`);
    const manifest = additionalManifests[id];
    assert.equal(manifest.version, 1);
    assert.equal(manifest.category, id);
    assert.ok(manifest.designFile.startsWith('design-menu/'));
    for (const asset of manifest.assets) {
      assert.ok(existsSync(asset.output), `Missing ${asset.output}`);
      assert.match(asset.pageUrl, /^https:\/\/hacom\.vn\//);
      assert.match(asset.sourceUrl, /^https:\/\/(cdn-files\.hacom\.vn|cdn-transformations\.hacom\.vn|hanoicomputercdn\.com)\//);
    }
  }

  const mediaPaths = [];
  const logoPaths = [];
  const visit = (value) => {
    if (!value || typeof value !== 'object') return;
    if (value.image) mediaPaths.push(value.image);
    if (value.logo) logoPaths.push(value.logo);
    Object.values(value).forEach(visit);
  };
  gatewayData.categoryTree.slice(5).forEach((category) => visit(category.flyout));
  [...new Set(mediaPaths)].forEach((path) => assert.ok(existsSync(path), `Missing media ${path}`));
  [...new Set(logoPaths)].forEach((path) => assert.ok(existsSync(path), `Missing logo ${path}`));
  assert.equal([...new Set(gatewayData.categoryTree.map((item) => item.id))].length, 21);
  assert.doesNotMatch(readFileSync('assets/menu-flyouts.js', 'utf8'), /innerHTML/);
});

test('deal rail mirrors the retail grid column contract without fixed card widths', () => {
  assert.match(css, /\.product-track\s*\{[^}]*--product-track-card-width:\s*calc\(\(100% - 8px\) \/ 2\)[^}]*gap:\s*8px/s);
  assert.match(css, /\.product-track\s*>\s*\.product-card\s*\{[^}]*flex:\s*0 0 var\(--product-track-card-width\)[^}]*width:\s*var\(--product-track-card-width\)[^}]*min-width:\s*0[^}]*max-width:\s*none/s);

  for (const [minWidth, columns, consumedGap] of [[768, 4, 36], [1280, 5, 48], [1600, 6, 60]]) {
    assert.match(
      css,
      new RegExp(`@media \\(min-width: ${minWidth}px\\)[\\s\\S]{0,320}\\.product-track\\s*\\{[^}]*--product-track-card-width:\\s*calc\\(\\(100% - ${consumedGap}px\\) \\/ ${columns}\\)`)
    );
  }

  assert.doesNotMatch(css, /\.product-track\s*>\s*\*\s*\{[^}]*width:/s);
  assert.doesNotMatch(css, /clamp\(220px,\s*18vw,\s*280px\)|calc\(50vw - 16px\)|min-width:\s*154px|max-width:\s*190px/);
});

test('tablet retail rails expose four equal cards with native horizontal scrolling', () => {
  const tabletRetailStart = css.indexOf('/* Tablet retail rails: four visible cards with native horizontal swipe. */');
  const tabletRetailEnd = css.indexOf('@media (min-width: 1181px)', tabletRetailStart);
  assert.notEqual(tabletRetailStart, -1, 'Missing tablet retail rail contract');
  assert.ok(tabletRetailEnd > tabletRetailStart, 'Tablet retail rail must end before the desktop gateway contract');
  const tabletRetailCss = css.slice(tabletRetailStart, tabletRetailEnd);

  assert.match(tabletRetailCss, /@media \(min-width: 768px\) and \(max-width: 1180px\)/);
  assert.match(tabletRetailCss, /\.product-grid\s*\{[^}]*grid-template-columns:\s*none[^}]*grid-template-rows:\s*minmax\(0,\s*1fr\)[^}]*grid-auto-flow:\s*column[^}]*grid-auto-columns:\s*calc\(\(100% - 36px\) \/ 4\)/s);
  assert.match(tabletRetailCss, /\.product-grid\s*\{[^}]*overflow-x:\s*auto[^}]*overscroll-behavior-inline:\s*contain[^}]*scroll-snap-type:\s*x mandatory/s);
  assert.match(tabletRetailCss, /\.product-grid > \.product-card\s*\{[^}]*scroll-snap-align:\s*start/s);
  assert.match(tabletRetailCss, /\.product-card__footer\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\) max-content[^}]*gap:\s*4px[^}]*padding-inline:\s*8px/s);
  assert.match(tabletRetailCss, /\.product-card__cart\s*\{[^}]*min-height:\s*44px[^}]*white-space:\s*nowrap/s);
  assert.match(tabletRetailCss, /\.product-card__cart span\s*\{[^}]*white-space:\s*nowrap/s);
});

test('product cards keep concise SKU labels and equal-height collection contracts', () => {
  assert.match(productCardSource, /className:\s*'product-card__sku',\s*text:\s*product\.sku/);
  assert.doesNotMatch(productCardSource, /Mã:\s*\$\{product\.sku\}/);
  assert.match(productCardSource, /product\.availability === 'in-stock'[\s\S]{0,40}\?\s*'Giỏ hàng'/);
  assert.doesNotMatch(productCardSource, /product\.availability === 'in-stock'[\s\S]{0,40}\?\s*'Thêm vào giỏ'/);
  assert.match(productCardSource, /Thêm \$\{product\.title\} vào giỏ hàng/);
  assert.match(css, /\.product-grid\s*\{[^}]*grid-auto-rows:\s*1fr[^}]*align-items:\s*stretch/s);
  assert.match(css, /\.product-track\s*\{[^}]*align-items:\s*stretch/s);
  assert.match(css, /\.product-track\s*>\s*\.product-card\s*\{[^}]*height:\s*auto[^}]*align-self:\s*stretch/s);

  const compactMetaStart = css.indexOf('@media (max-width: 479.98px)');
  const compactMetaEnd = css.indexOf('@media (min-width: 768px)', compactMetaStart);
  assert.notEqual(compactMetaStart, -1, 'Missing compact product meta breakpoint');
  assert.ok(compactMetaEnd > compactMetaStart, 'Compact product meta breakpoint must precede the tablet grid');
  const compactMetaCss = css.slice(compactMetaStart, compactMetaEnd);
  assert.match(compactMetaCss, /\.product-card__meta\s*\{[^}]*min-block-size:\s*24px[^}]*display:\s*flex[^}]*flex-wrap:\s*nowrap[^}]*gap:\s*4px/s);
  assert.match(compactMetaCss, /\.product-card__rating\s*\{[^}]*gap:\s*\.5px[^}]*font-size:\s*10px/s);
  assert.match(compactMetaCss, /\.product-card__review-count\s*\{[^}]*font-size:\s*9px/s);
  assert.match(compactMetaCss, /\.product-card__sku\s*\{[^}]*margin-inline-start:\s*auto[^}]*padding:\s*2px 4px[^}]*font-size:\s*10px/s);
});

test('mobile collection controls keep rectangular shapes and distinct tab identities', () => {
  const controlsIndex = css.indexOf('.category-pill, .section-tab { border-radius: 9px;');
  const mobileStart = css.lastIndexOf('@media (max-width: 767.98px)', controlsIndex);
  const mobileEnd = css.indexOf('@media (prefers-reduced-motion: reduce)', controlsIndex);
  assert.notEqual(controlsIndex, -1, 'Missing compact mobile collection controls');
  assert.notEqual(mobileStart, -1, 'Missing mobile collection breakpoint');
  assert.ok(mobileEnd > mobileStart, 'Mobile collection rules must precede reduced motion overrides');
  const mobileCss = css.slice(mobileStart, mobileEnd);

  assert.match(css, /\.category-pill, \.section-tab\s*\{[^}]*min-height:\s*44px/s);
  assert.match(mobileCss, /\.category-pill, \.section-tab\s*\{[^}]*border-radius:\s*9px/s);
  assert.match(mobileCss, /\.section-tab\[data-collection-tab="trending"\][\s\S]*?background:\s*var\(--brand-red\)[\s\S]*?color:\s*#fff/s);
  assert.match(mobileCss, /\.section-tab\[data-collection-tab="new-arrivals"\][\s\S]*?background:\s*var\(--brand-navy\)[\s\S]*?color:\s*#fff/s);
});

test('homepage taxonomy and collections stay data-backed', () => {
  assert.equal(gatewayData.categoryTree.length, 21);
  assert.equal(new Set(gatewayData.categoryTree.map((item) => item.id)).size, 21);
  assert.deepEqual(Object.keys(gatewayData.homepageCollections), [
    'deals', 'trending', 'new-arrivals', 'laptops', 'pc-gaming', 'displays', 'components', 'gaming-gear'
  ]);
  for (const [collection, skus] of Object.entries(gatewayData.homepageCollections)) {
    assert.ok(skus.length >= 6, `${collection} must expose at least six products`);
    assert.equal(new Set(skus).size, skus.length, `${collection} must not repeat products`);
    for (const sku of skus) assert.ok(catalog.getBySku(sku), `${collection} references missing SKU ${sku}`);
  }
});

test('Laptop category exposes the three-tier showcase and HACOM asset manifest', () => {
  const laptops = gatewayData.categoryTree.find((item) => item.id === 'laptops');
  assert.ok(laptops, 'Missing laptop category');
  assert.equal(laptops.flyout?.type, 'laptop-showcase');
  assert.deepEqual(
    [laptops.flyout.needs, laptops.flyout.prices, laptops.flyout.processors, laptops.flyout.screens].map((items) => items.length),
    [5, 5, 6, 5]
  );

  for (const label of [
    'NHU CẦU SỬ DỤNG', 'Chọn laptop phù hợp với nhu cầu của bạn',
    'Học tập', 'Văn phòng', 'Laptop', 'Gaming', 'Đồ họa', 'Thiết kế', 'Doanh nhân', 'Cao cấp',
    'Sinh viên', 'Giá tốt', 'PHÂN KHÚC GIÁ', 'Dễ dàng chọn laptop theo ngân sách',
    'Dưới 10 triệu', '10 – 15 triệu', '15 – 20 triệu', '20 – 30 triệu', 'Trên 30 triệu',
    'DÒNG CHIP', 'Hiệu năng mạnh mẽ, xử lý mọi tác vụ', 'Intel Core', 'Intel Core Ultra',
    'Ryzen 5', 'Ryzen 7', 'Ryzen 9', 'Ryzen AI', 'KÍCH THƯỚC MÀN HÌNH',
    'Chọn kích thước phù hợp với nhu cầu', 'Dưới 14 inch', '14 inch', '15 – 15.6 inch',
    '16 inch', '17 inch trở lên'
  ]) {
    assert.match(appSource, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.equal(laptopManifest.version, 1);
  assert.equal(laptopManifest.category, 'laptops');
  assert.equal(laptopManifest.designFile, 'design-menu/laptop.jpg');
  assert.equal(laptopManifest.assets.length, 5);
  const allowedSourceHosts = new Set(['cdn-files.hacom.vn', 'cdn-transformations.hacom.vn', 'hanoicomputercdn.com']);
  for (const asset of laptopManifest.assets) {
    assert.match(asset.pageUrl, /^https:\/\/hacom\.vn\//);
    assert.ok(allowedSourceHosts.has(new URL(asset.sourceUrl).hostname), `Unexpected source host: ${asset.sourceUrl}`);
    assert.deepEqual(asset.canvas, { width: 480, height: 320, fit: 'contain', background: '#ffffff' });
    assert.ok(existsSync(asset.output), `Missing laptop flyout asset: ${asset.output}`);
    assert.ok(statSync(asset.output).size > 100, `Laptop flyout asset is unexpectedly small: ${asset.output}`);
  }

  assert.match(appSource, /renderLaptopFlyout/);
  assert.match(appSource, /content\.replaceChildren\(renderLaptopFlyout\(category\.flyout\)\)/);
  const laptopConfig = appSource.slice(appSource.indexOf('const laptopFlyout'), appSource.indexOf('const appleFlyout'));
  assert.doesNotMatch(laptopConfig, /cdn-files\.hacom|hanoicomputercdn/);
  assert.match(css, /\.gateway-flyout--laptop \.gateway-flyout__head\s*\{[^}]*display:\s*none/);
  assert.match(css, /\.laptop-flyout__need-grid\s*\{[^}]*grid-template-columns:\s*repeat\(5/);
  assert.match(css, /\.laptop-flyout__criteria\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*\.82fr\)\s*minmax\(0,\s*1fr\)/s);
  assert.match(css, /\.laptop-flyout__filter-grid--processors\s*\{[^}]*repeat\(6/);
  assert.match(css, /\.laptop-flyout__section--screens\s*\{[^}]*2\.35fr\)\s*repeat\(5/s);
});

test('PC category exposes the taxonomy showcase without raster assets', () => {
  const pc = gatewayData.categoryTree.find((item) => item.id === 'pc');
  assert.ok(pc, 'Missing PC category');
  assert.equal(pc.flyout?.type, 'pc-showcase');
  assert.equal(pc.flyout.families.length, 10);
  assert.deepEqual(
    Array.from(pc.flyout.filters, (filter) => filter.columns.reduce((total, column) => total + column.length, 0)),
    [8, 10, 10, 8, 9, 11]
  );
  assert.equal(
    pc.flyout.families.length + pc.flyout.filters.flatMap((filter) => filter.columns.flat()).length,
    66
  );

  for (const label of [
    'PC Gaming', 'PC Đồ Họa', 'PC Văn Phòng', 'PC Doanh Nghiệp', 'PC Workstation',
    'PC Server', 'PC All-in-One', 'PC Mini', 'PC Custom', 'PC Đồng Bộ',
    'CHỌN THEO PHÂN KHÚC GIÁ', 'Dưới 10 triệu', '10 – 15 triệu', '15 – 20 triệu',
    '20 – 30 triệu', '30 – 50 triệu', '50 – 80 triệu', '80 – 120 triệu', 'Trên 120 triệu',
    'CHỌN THEO CPU', 'Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9',
    'Intel Core Ultra', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9', 'AMD Ryzen AI', 'Intel Xeon',
    'CHỌN THEO GPU', 'Integrated Graphics', 'RTX 30 Series', 'RTX 40 Series', 'RTX 50 Series',
    'RX 6000 Series', 'RX 7000 Series', 'RX 9000 Series', 'RTX Workstation', 'Quadro',
    'No dedicated GPU', 'CHỌN THEO RAM', '8GB', '16GB', '32GB', '64GB', '96GB', 'Trên 128GB',
    'DDR4', 'DDR5', 'CHỌN THEO Ổ CỨNG', 'SSD 256GB', 'SSD 512GB', 'SSD 1TB', 'SSD 2TB',
    'HDD 1TB', 'HDD 2TB', 'NVMe PCIe 3.0', 'NVMe PCIe 4.0', 'NVMe PCIe 5.0',
    'CHỌN THEO KÍCH THƯỚC / FORM FACTOR', 'Mini PC / NUC', 'SFF (Small Form Factor)',
    'Micro Tower', 'Mid Tower', 'Full Tower', 'All-in-One', 'Mini ITX', 'DTX', 'Slim Desktop',
    'Server chassis', 'Rack'
  ]) assert.match(appSource, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

  assert.equal(pcManifest.version, 1);
  assert.equal(pcManifest.category, 'pc');
  assert.equal(pcManifest.designFile, 'design-menu/pc.jpg');
  assert.deepEqual(pcManifest.assets, []);
  assert.match(appSource, /renderPcFlyout/);
  assert.match(appSource, /content\.replaceChildren\(renderPcFlyout\(category\.flyout\)\)/);
  const pcConfig = appSource.slice(appSource.indexOf('const pcFlyout'), appSource.indexOf('const categoryTree'));
  assert.doesNotMatch(pcConfig, /cdn-files\.hacom|cdn-transformations\.hacom|hanoicomputercdn/);
  assert.match(css, /\.gateway-flyout--pc \.gateway-flyout__head\s*\{[^}]*display:\s*none/);
  assert.match(css, /\.pc-flyout__families\s*\{[^}]*grid-template-columns:\s*repeat\(5/);
  assert.match(css, /\.pc-flyout__families\s*\{[^}]*grid-template-rows:\s*repeat\(2/);
  assert.match(css, /\.pc-flyout__taxonomy\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*\.98fr\)\s*minmax\(0,\s*1\.02fr\)/s);
  assert.match(css, /\.pc-flyout__taxonomy\s*\{[^}]*grid-template-rows:\s*repeat\(3/);
  assert.match(css, /\.pc-flyout__panel--columns-3 \.pc-flyout__filter-columns/);
});

test('Display category exposes the five-tier taxonomy showcase and local brand logos', () => {
  const displays = gatewayData.categoryTree.find((item) => item.id === 'displays');
  assert.ok(displays, 'Missing display category');
  assert.equal(displays.flyout?.type, 'display-showcase');
  assert.deepEqual(
    [
      displays.flyout.useCases,
      displays.flyout.selectors[0].items,
      displays.flyout.selectors[1].items,
      displays.flyout.brands,
      displays.flyout.specifications[0].items,
      displays.flyout.specifications[1].items,
      displays.flyout.specifications[2].items,
      displays.flyout.specifications[3].items,
      displays.flyout.specialties
    ].map((items) => items.length),
    [6, 5, 5, 13, 4, 4, 6, 5, 4]
  );
  assert.equal(
    displays.flyout.useCases.length
      + displays.flyout.selectors.flatMap((selector) => selector.items).length
      + displays.flyout.brands.length
      + displays.flyout.specifications.flatMap((specification) => specification.items).length
      + displays.flyout.specialties.length,
    52
  );

  for (const label of [
    'Màn hình Gaming', 'Màn hình Văn phòng / Học tập', 'Màn hình Đồ họa – Thiết kế',
    'Màn hình Lập trình / Làm việc dài giờ (chống mỏi mắt)', 'Màn hình Camera giám sát / POS / Công nghiệp',
    'Màn hình Đa năng', 'KÍCH THƯỚC', 'Dưới 22 inch', '24 – 25 inch', '27 – 29 inch', '30 – 34 inch',
    'Trên 34 inch / (ultrawide / super ultrawide)', 'PHÂN KHÚC GIÁ', 'Dưới 3 triệu', '3 – 5 triệu',
    '5 – 8 triệu', '8 – 12 triệu', 'Trên 12 triệu', 'THƯƠNG HIỆU', 'ASUS', 'Acer', 'LG', 'Samsung',
    'Dell', 'MSI', 'Gigabyte / AORUS', 'ViewSonic', 'BenQ', 'Philips', 'Lenovo', 'Cooler Master', 'HP',
    'TẦN SỐ QUÉT', '60Hz – 75Hz (văn phòng / học tập)', '100Hz – 144Hz (gaming cơ bản)',
    '165Hz – 240Hz (gaming cao cấp)', 'Trên 240Hz (eSports, chuyên nghiệp)', 'LOẠI TẤM NỀN',
    'IPS (màu sắc trung thực, góc nhìn rộng)', 'VA (tương phản cao, phù hợp giải trí)',
    'TN (tốc độ phản hồi nhanh, gaming eSports)', 'OLED / QD-OLED (cao cấp, hiển thị hoàn hảo)',
    'ĐẶC ĐIỂM HIỂN THỊ', 'Màn hình cong (Curved)', 'Màn hình phẳng (Flat)',
    'Màn hình cảm ứng (Touch screen)', 'Màn hình có loa tích hợp', 'Màn hình xoay dọc / Pivot',
    'Màn hình siêu mỏng viền', 'CỔNG KẾT NỐI', 'HDMI', 'DisplayPort', 'USB-C / Thunderbolt',
    'VGA / DVI (phù hợp văn phòng cũ)', 'Kết nối đa năng (tích hợp nhiều cổng)', 'MÀN HÌNH CHUYÊN BIỆT',
    'Màn hình di động (Portable Monitor)', 'Màn hình UltraWide / Super UltraWide',
    'Màn hình Mini LED / OLED cao cấp', 'Màn hình cho MacBook'
  ]) assert.match(appSource, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

  assert.equal(displayManifest.version, 1);
  assert.equal(displayManifest.category, 'displays');
  assert.equal(displayManifest.designFile, 'design-menu/man_hinh.jpg');
  assert.equal(displayManifest.assets.length, 13);
  const allowedSourceHosts = new Set(['cdn-files.hacom.vn', 'cdn-transformations.hacom.vn', 'hanoicomputercdn.com']);
  for (const asset of displayManifest.assets) {
    assert.match(asset.pageUrl, /^https:\/\/hacom\.vn\//);
    assert.ok(allowedSourceHosts.has(new URL(asset.sourceUrl).hostname), `Unexpected source host: ${asset.sourceUrl}`);
    assert.ok(existsSync(asset.output), `Missing display brand asset: ${asset.output}`);
    assert.ok(statSync(asset.output).size > 100, `Display brand asset is unexpectedly small: ${asset.output}`);
    assert.equal(asset.fallback, false);
  }

  const displayConfig = appSource.slice(appSource.indexOf('const displayFlyout'), appSource.indexOf('const categoryTree'));
  assert.doesNotMatch(displayConfig, /cdn-files\.hacom|cdn-transformations\.hacom|hanoicomputercdn/);
  assert.match(appSource, /renderDisplayFlyout/);
  assert.match(appSource, /content\.replaceChildren\(renderDisplayFlyout\(category\.flyout\)\)/);
  assert.doesNotMatch(appSource, /\.innerHTML\s*=/);
  assert.match(css, /\.gateway-flyout--display \.gateway-flyout__head\s*\{[^}]*display:\s*none/);
  assert.match(css, /\.display-flyout__use-cases\s*\{[^}]*repeat\(6,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(css, /\.display-flyout__selector-panel--sizes \.display-flyout__selector-grid\s*\{[^}]*repeat\(4,\s*minmax\(0,\s*1fr\)\)\s*minmax\(0,\s*1\.35fr\)/s);
  assert.match(css, /\.display-flyout__selector-panel--prices \.display-flyout__selector-grid\s*\{[^}]*repeat\(5,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(css, /\.display-flyout__brand-cards\s*\{[^}]*repeat\(6,\s*minmax\(0,\s*1fr\)\)[^}]*repeat\(2/s);
  assert.match(css, /\.display-flyout__specifications\s*\{[^}]*repeat\(4,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(css, /\.display-flyout__specialty-grid\s*\{[^}]*repeat\(4,\s*minmax\(0,\s*1fr\)\)/);
});

test('keyboard category exposes the complete specialized flyout and local assets', () => {
  const keyboard = gatewayData.categoryTree.find((item) => item.id === 'keyboards');
  assert.ok(keyboard, 'Missing keyboard category');
  assert.equal(keyboard.flyout?.type, 'keyboard-showcase');
  assert.deepEqual(
    ['brands', 'types', 'prices', 'connections', 'features', 'accessories'].map((key) => keyboard.flyout[key].length),
    [10, 7, 5, 3, 5, 5]
  );

  for (const label of [
    'Logitech', 'Razer', 'Corsair', 'DAREU', 'AKKO', 'Keychron', 'Rapoo', 'Fuhlen', 'ASUS ROG', 'SteelSeries',
    'Bàn phím cơ', 'Bàn phím giả cơ', 'Bàn phím màng (membrane)', 'Bàn phím mini / 60% / TKL',
    'Bàn phím fullsize (104 phím)', 'Bàn phím văn phòng', 'Bàn phím gaming',
    'Dưới 300.000đ', '300.000đ – 700.000đ', '700.000đ – 1.500.000đ',
    '1.500.000đ – 3.000.000đ', 'Trên 3.000.000đ', 'Có dây (USB / PS2)', 'Không dây',
    'Kết nối đa thiết bị', 'Led RGB / Led đơn sắc', 'Switch thay nóng (Hot-swap)',
    'Anti-ghosting / N-Key Rollover', 'Dây tháo rời Type-C', 'Layout ANSI / ISO / JIS',
    'Keycap rời', 'Kê tay (Wrist Rest)', 'Switch rời', 'Dây cáp bàn phím',
    'Bàn chải vệ sinh / Dụng cụ pull keycap'
  ]) {
    assert.match(appSource, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  const localAssets = [
    ...keyboard.flyout.brands.map((item) => item.logo),
    ...keyboard.flyout.types.map((item) => item.image),
    ...keyboard.flyout.accessories.map((item) => item.image)
  ];
  assert.equal(localAssets.length, 22);
  for (const assetPath of localAssets) {
    assert.ok(existsSync(assetPath), `Missing keyboard flyout asset: ${assetPath}`);
    assert.ok(statSync(assetPath).size > 100, `Keyboard flyout asset is unexpectedly small: ${assetPath}`);
  }

  assert.match(appSource, /renderKeyboardFlyout/);
  assert.match(appSource, /content\.replaceChildren\(renderKeyboardFlyout\(category\.flyout\)\)/);
  assert.doesNotMatch(appSource, /\.innerHTML\s*=/);
  assert.match(css, /\.gateway-flyout--keyboard \.gateway-flyout__head\s*\{\s*display:\s*none/);
  assert.match(css, /\.keyboard-flyout__taxonomy\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(css, /\.keyboard-flyout__accessory-grid\s*\{[^}]*grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(css, /\.keyboard-flyout\s*\{[^}]*grid-template-rows:\s*minmax\(0,\s*1fr\)\s*clamp\(172px,\s*30%,\s*196px\)/s);
  assert.match(css, /\.keyboard-flyout__item\s*\{[^}]*font-size:\s*var\(--text-meta\)/s);
});

test('Apple category exposes the five-column showcase and HACOM asset manifest', () => {
  const apple = gatewayData.categoryTree.find((item) => item.id === 'apple');
  assert.ok(apple, 'Missing Apple category');
  assert.equal(apple.flyout?.type, 'apple-showcase');
  assert.deepEqual(
    [apple.flyout.navigation, apple.flyout.hero.proofs, apple.flyout.mac.items, apple.flyout.iphone.items,
      apple.flyout.ipad.items, apple.flyout.watch.items, apple.flyout.accessories.items].map((items) => items.length),
    [5, 3, 4, 3, 4, 1, 5]
  );

  for (const label of [
    'SẢN PHẨM APPLE', 'MAC', 'IPHONE', 'IPAD', 'WATCH', 'MacBook Air', 'MacBook Pro', 'iMac', 'Mac Mini',
    'iPhone 17 Series', 'iPhone 16 Series', 'iPhone 15 Series', 'iPad Pro', 'iPad Air', 'iPad Mini',
    'iPad Gen Series', 'Apple Watch', 'PHỤ KIỆN APPLE', 'Bàn Phím Apple', 'Chuột Apple', 'Tai Nghe Apple',
    'Bút Apple', 'Cáp Sạc Apple', 'Chính hãng 100%', 'Apple Việt Nam', 'Đổi trả dễ dàng', 'Trong 7 ngày',
    'Giao hàng nhanh', 'Toàn quốc'
  ]) assert.match(appSource, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

  assert.equal(appleManifest.version, 1);
  assert.equal(appleManifest.category, 'apple');
  assert.equal(appleManifest.designFile, 'design-menu/san_pham_apple.jpg');
  assert.equal(appleManifest.assets.length, 17);
  const allowedSourceHosts = new Set(['cdn-files.hacom.vn', 'cdn-transformations.hacom.vn', 'hanoicomputercdn.com']);
  for (const asset of appleManifest.assets) {
    assert.match(asset.pageUrl, /^https:\/\/hacom\.vn\//);
    assert.ok(allowedSourceHosts.has(new URL(asset.sourceUrl).hostname), `Unexpected source host: ${asset.sourceUrl}`);
    assert.deepEqual(asset.canvas, { width: 480, height: 320, fit: 'contain', background: '#ffffff' });
    assert.ok(existsSync(asset.output), `Missing Apple flyout asset: ${asset.output}`);
    assert.ok(statSync(asset.output).size > 100, `Apple flyout asset is unexpectedly small: ${asset.output}`);
  }

  assert.match(appSource, /renderAppleFlyout/);
  assert.match(appSource, /content\.replaceChildren\(renderAppleFlyout\(category\.flyout\)\)/);
  assert.doesNotMatch(appSource.slice(appSource.indexOf('const appleFlyout'), appSource.indexOf('const keyboardFlyout')), /cdn-files\.hacom|hanoicomputercdn/);
  assert.match(css, /\.gateway-flyout--apple \.gateway-flyout__head\s*\{\s*display:\s*none/);
  assert.match(css, /\.apple-flyout\s*\{[^}]*grid-template-rows:\s*clamp\(48px,\s*8\.5%,\s*56px\)\s*minmax\(0,\s*1fr\)/s);
  assert.match(css, /\.apple-flyout__navigation\s*\{[^}]*grid-template-columns:\s*var\(--apple-grid\)/s);
  assert.match(css, /\.apple-flyout__panel\s*\{[^}]*grid-template-columns:\s*var\(--apple-grid\)/s);
  assert.match(css, /\.apple-flyout__family--iphone \.apple-flyout__product-list\s*\{[^}]*repeat\(3/);
  assert.match(css, /\.apple-flyout__family--accessories \.apple-flyout__product-list\s*\{[^}]*repeat\(5/);
});

test('homepage exposes dynamic renderer and accessible product hooks', () => {
  assert.equal((html.match(/data-product-grid/g) || []).length, 8);
  assert.equal((html.match(/data-carousel-root/g) || []).length, 4);
  assert.doesNotMatch(html, /gateway-nav__head|gateway-nav__footer|Khám phá theo danh mục|Cần tư vấn cấu hình/);
  assert.match(html, /<nav class="gateway-nav" aria-label="Danh mục sản phẩm nổi bật">/);
  assert.match(html, /data-product-grid data-collection="deals"/);
  assert.match(html, /data-product-grid data-collection="new-arrivals"/);
  assert.match(css, /\.product-card__title[^}]*-webkit-line-clamp:\s*2/);
  assert.match(css, /\.product-card__image[^}]*object-fit:\s*contain/);
  assert.match(css, /\.product-card,\s*\.product-card__body,\s*\.product-card__title,\s*\.product-card__title a\s*\{\s*color:\s*var\(--ink\)/);
  assert.match(css, /\.gateway-shell\s*\{[^}]*position:\s*relative/);
  assert.match(css, /\.gateway-flyout\s*\{[^}]*inset:\s*0;/);
 assert.match(css, /--gateway-compact-height:\s*clamp\(700px,\s*calc\(100dvh - 150px\),\s*740px\)/);
  assert.match(css, /--text-caption:\s*0\.75rem/);
  assert.match(css, /--text-meta:\s*0\.8125rem/);
  assert.match(css, /--text-ui:\s*0\.875rem/);
  assert.match(css, /--text-card-title:\s*0\.9375rem/);
  assert.match(css, /--text-body:\s*1rem/);
 assert.match(css, /\.gateway-category-list\s*\{[^}]*flex:\s*1[^}]*padding-block:\s*6px[^}]*padding-inline:\s*0[^}]*gap:\s*0/s);
  assert.match(css, /\.gateway-category\s*\{\s*min-height:\s*0;[\s\S]*?grid-template-columns:\s*18px minmax\(0, 1fr\) 12px[\s\S]*?font-size:\s*var\(--text-meta\)/);
  assert.match(css, /\.mobile-header \.search-input-box input\s*\{[^}]*font-size:\s*var\(--text-body\)/s);
  assert.match(css, /\.product-card__title\s*\{[^}]*font-size:\s*var\(--text-card-title\)[^}]*line-height:\s*1\.35/s);
  assert.match(css, /\.product-card__footer\s*\{[^}]*flex-direction:\s*column[^}]*align-items:\s*stretch/s);
  assert.match(css, /\.gateway-hero-carousel\s*\{[^}]*grid-column:\s*1 \/ 5/s);
  assert.match(css, /\.gateway-hero-slide:nth-child\(1\) img\s*\{[^}]*object-position:\s*center/s);
  assert.match(css, /\.gateway-hero-slide:nth-child\(2\) img\s*\{[^}]*object-position:\s*center 58%/s);
  assert.match(css, /\.gateway-hero-slide:nth-child\(3\) img\s*\{[^}]*object-position:\s*center 50%/s);
  assert.match(css, /-moz-osx-font-smoothing:\s*grayscale/);
  assert.doesNotMatch(css, /\.product-card__spec-label\s*\{\s*font-size:\s*[789]px/);
  assert.doesNotMatch(css, /\.product-card__cart\s*\{[^}]*font-size:\s*[789]px/);
  assert.doesNotMatch(css, /\.gateway-(?:campaign|main|promo)(?:[\s_-]|\.)/);
  assert.match(html, /id="newsletterForm"[^>]*novalidate/);
  assert.match(html, /aria-label="Đăng ký nhận tin"/);
});

test('deals uses the Quantum Ice Reactor background without changing the product rail contract', () => {
  const desktopArtwork = 'assets/media/deals/quantum-ice-reactor-desktop-v1.webp';
  const mobileArtwork = 'assets/media/deals/quantum-ice-reactor-mobile-v1.webp';
  assert.ok(existsSync(desktopArtwork), `Missing deals artwork ${desktopArtwork}`);
  assert.ok(existsSync(mobileArtwork), `Missing deals artwork ${mobileArtwork}`);
  assert.ok(statSync(desktopArtwork).size > 100 && statSync(desktopArtwork).size < 400_000, 'Desktop deals artwork must stay below 400 KB');
  assert.ok(statSync(mobileArtwork).size > 100 && statSync(mobileArtwork).size < 300_000, 'Mobile deals artwork must stay below 300 KB');

  const dealsStart = html.indexOf('<section id="deals"');
  const trendingStart = html.indexOf('<section id="trending"');
  assert.ok(dealsStart >= 0 && trendingStart > dealsStart, 'Deals must remain immediately before trending');
  const dealsSection = html.slice(dealsStart, trendingStart);

  assert.match(dealsSection, /class="section-shell section-shell--campaign deals-quantum"/);
  assert.match(dealsSection, /<picture class="deals-quantum__artwork" aria-hidden="true">/);
  assert.match(dealsSection, /<source media="\(max-width: 767px\)" srcset="assets\/media\/deals\/quantum-ice-reactor-mobile-v1\.webp" width="1080" height="1600">/);
  assert.match(dealsSection, /<img src="assets\/media\/deals\/quantum-ice-reactor-desktop-v1\.webp" alt="" width="2400" height="1100" loading="lazy" decoding="async">/);
  assert.match(dealsSection, /data-carousel-root data-carousel-autoplay aria-label="Deal sốc"/);
  assert.match(dealsSection, /data-carousel-track data-product-grid data-collection="deals"/);
  assert.equal((dealsSection.match(/data-carousel-prev/g) || []).length, 1);
  assert.equal((dealsSection.match(/data-carousel-next/g) || []).length, 1);
  assert.doesNotMatch(dealsSection, /data-carousel-toggle|data-carousel-status|countdown/i);
  assert.match(dealsSection, /aria-label="Deal trước"/);
  assert.match(dealsSection, /aria-label="Deal tiếp theo"/);

  assert.match(appSource, /function initDealsReveal\(\)/);
  assert.match(appSource, /carouselRoot\.tabIndex\s*=\s*0/);
  assert.match(appSource, /event\.key !== 'ArrowLeft' && event\.key !== 'ArrowRight'/);
  assert.match(appSource, /\[data-carousel-\$\{direction\}\]/);
  assert.match(appSource, /threshold\s*=\s*\.12/);
  assert.equal((appSource.match(/new IntersectionObserver/g) || []).length, 1, 'Reveal sections must share one observer factory');
  assert.match(appSource, /initDealsReveal\(\)/);
  assert.match(appSource, /const isDealCollection = grid\.dataset\.collection === 'deals';/);
  assert.match(appSource, /loading: isDealCollection \? 'eager' : 'lazy'/);
  assert.match(appSource, /fetchPriority: isDealCollection \? 'low' : undefined/);
  assert.match(css, /\.deals-quantum\s*\{[^}]*position:\s*relative[^}]*isolation:\s*isolate[^}]*overflow:\s*clip/s);
  assert.match(css, /\.deals-quantum__artwork\s*\{\s*transition-property:\s*opacity, transform/);
  assert.match(css, /\.deals-quantum__artwork,[\s\S]*?\.deals-quantum::after\s*\{[^}]*transition-duration:\s*360ms/);
  assert.match(css, /\.deals-quantum\.is-deals-ready:not\(\.is-deals-visible\)::after\s*\{[^}]*transform:\s*scaleX\(0\)/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.deals-quantum__artwork[\s\S]*?transition:\s*none !important/s);
  assert.doesNotMatch(css, /\.deals-quantum\.is-deals-ready:not\(\.is-deals-visible\) \.section-head/);
  assert.doesNotMatch(css, /\.deals-quantum\.is-deals-ready:not\(\.is-deals-visible\) \.carousel-viewport/);
  assert.doesNotMatch(css, /\.deals-quantum[^,{]*\.product-card/);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.deals-quantum \.section-head \.section-intro\s*\{[^}]*max-width:\s*34ch[^}]*font-size:\s*clamp\(15px,\s*4\.2vw,\s*16px\)[^}]*line-height:\s*1\.45[^}]*text-wrap:\s*balance/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.deals-quantum \.section-head-actions\s*\{[^}]*display:\s*none/s);

  assert.match(appSource, /deals:\s*Object\.freeze\(\['MELO0130',\s*'VGAS0733',\s*'HDSA0250',\s*'PWMI0005',\s*'PADM0937',\s*'MERZ0119'\]\)/);
});

test('mobile linked collection headings keep their actions on the title row', () => {
  const linkedSections = ['laptops', 'pc-gaming', 'displays', 'components', 'accessories'];
  for (const [index, id] of linkedSections.entries()) {
    const sectionStart = html.indexOf(`<section id="${id}"`);
    const sectionEnd = index === linkedSections.length - 1
      ? html.indexOf('<section id="serviceGateway"', sectionStart)
      : html.indexOf(`<section id="${linkedSections[index + 1]}"`, sectionStart);
    assert.ok(sectionStart >= 0 && sectionEnd > sectionStart, `Missing linked section ${id}`);
    assert.match(html.slice(sectionStart, sectionEnd), /class="section-head section-head--linked"/);
  }

  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.section-head--linked\s*\{[^}]*display:\s*grid[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\) auto[^}]*align-items:\s*end[^}]*column-gap:\s*10px/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.section-head--linked > \.text-link\s*\{[^}]*align-self:\s*end[^}]*justify-self:\s*end[^}]*font-size:\s*12px[^}]*white-space:\s*nowrap/s);
  assert.match(css, /\.text-link\s*\{[^}]*min-height:\s*44px/s);
});

test('categories uses the HACOM Spectrum Matrix contract', () => {
  const categoryStart = html.indexOf('<section id="categories"');
  const laptopsStart = html.indexOf('<section id="laptops"');
  const trendingStart = html.indexOf('<section id="trending"');
  assert.ok(categoryStart > trendingStart && laptopsStart > categoryStart, 'Categories must remain between trending and laptops');
  const categorySection = html.slice(categoryStart, laptopsStart);
  const labels = ['Đồ họa', 'Văn phòng', 'Mỏng nhẹ', 'Sinh viên', 'Gaming', 'Cảm ứng', 'Build PC', 'PC lắp sẵn', 'All in one', 'Linh kiện', 'Màn hình di động', 'Nguồn máy tính', 'Mainboard', 'CPU', 'RAM', 'Ổ cứng', 'Card màn hình', 'Card âm thanh', 'Vỏ case', 'Gaming'];
  assert.match(categorySection, /class="section-shell category-spectrum"/);
  assert.match(categorySection, /<p class="eyebrow">Chọn theo nhu cầu<\/p>/);
  assert.match(categorySection, /<h2>Danh mục nổi bật<\/h2>/);
  assert.match(categorySection, /class="text-link category-spectrum__all"[^>]*>Xem tất cả/);
  assert.equal((categorySection.match(/category-card category-spectrum__card category-spectrum__card--/g) || []).length, 20);
  assert.equal((categorySection.match(/data-demo-action/g) || []).length, 21);
  labels.forEach((label, index) => {
    const id = String(index + 1).padStart(2, '0');
    assert.match(categorySection, new RegExp(`category-${id}\\.webp`));
    assert.match(categorySection, new RegExp(`<span class="category-spectrum__label">${label}<\\/span>`));
  });
  assert.equal((categorySection.match(/width="640" height="560" loading="lazy" decoding="async"/g) || []).length, 20);
  assert.equal((categorySection.match(/alt=""/g) || []).length, 20);

  for (let index = 1; index <= 20; index += 1) {
    const asset = `assets/media/categories-spectrum/category-${String(index).padStart(2, '0')}.webp`;
    assert.ok(existsSync(asset), `Missing category asset ${asset}`);
    assert.ok(statSync(asset).size > 100 && statSync(asset).size < 80_000, `Category asset must stay below 80 KB: ${asset}`);
  }

  assert.match(css, /.category-spectrum__grid\s*\{[^}]*grid-template-columns:\s*repeat\(10/s);
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*?\.category-spectrum__grid\s*\{[^}]*repeat\(5/s);
  assert.match(css, /grid-auto-flow:\s*column/);
  assert.match(css, /grid-template-rows:\s*repeat\(2/);
  assert.match(css, /grid-auto-columns:\s*min\(42vw, 164px\)/);
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(css, /category-spectrum__card--coral/);
  assert.match(css, /category-spectrum__card--periwinkle/);
  assert.match(css, /category-spectrum__card:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?category-spectrum/);
  assert.doesNotMatch(css, /\.category-spectrum[^,{]*\.product-card/);
  assert.equal((css.match(/Keep the Spectrum contract last/g) || []).length, 1);
  assert.equal((css.match(/\.category-spectrum \.category-spectrum__grid\s*\{\s*display:\s*grid !important;/g) || []).length, 1);
  assert.equal((css.match(/\.category-spectrum \.category-spectrum__card\s*\{\s*display:\s*block !important;/g) || []).length, 1);
  assert.match(appSource, /function initCategorySpectrumReveal\(\)/);
  assert.match(appSource, /initCategorySpectrumReveal\(\)/);
  assert.match(appSource, /threshold\s*=\s*\.12/);
});

test('customer runway uses local HACOM assets and preserves the section contract', () => {
  assert.equal(customerManifest.homepage, 'https://hacom.vn/');
  assert.equal(customerManifest.fetchedAt, '2026-08-17');
  assert.equal(customerManifest.items.length, 16);

  for (const asset of customerManifest.items) {
    assert.match(asset.sourceUrl, /^https:\/\/cdn-files\.hacom\.vn\//);
    assert.match(asset.output, /^assets\/media\/customers\/customer-\d+\.webp$/);
    assert.equal(asset.width, 562);
    assert.equal(asset.height, 700);
    assert.ok(existsSync(asset.output), `Missing customer asset ${asset.output}`);
    assert.ok(statSync(asset.output).size > 100, `Customer asset is unexpectedly small: ${asset.output}`);
  }

  const heroStart = html.indexOf('<section id="hero"');
  const showcaseStart = html.indexOf('<section class="header-promo-showcase');
  const customerStart = html.indexOf('<section id="customerStories"');
  const dealsStart = html.indexOf('<section id="deals"');
  assert.ok(heroStart >= 0 && showcaseStart > heroStart && customerStart > showcaseStart && dealsStart > customerStart, 'Header promo showcase must sit between hero and customer runway');

  const customerSection = html.slice(customerStart, dealsStart);
  const heroSection = html.slice(heroStart, showcaseStart);
  assert.match(customerSection, /class="page-container"/);
  assert.match(customerSection, /id="customerStoriesTitle"/);
  assert.match(customerSection, /10\.000\.000\+/);
  assert.match(customerSection, /<span>Khách hàng đã và đang<br>ủng hộ HACOM<\/span>/);
  assert.match(customerSection, /<p>Mỗi khoảnh khắc là một lời cảm ơn\.<\/p>/);
  assert.match(customerSection, /data-carousel-variant="spotlight"/);
  assert.match(customerSection, /data-carousel-delay="5000"/);
  assert.match(customerSection, /aria-label="Khoảnh khắc khách hàng HACOM"/);
  assert.match(customerSection, /class="customer-runway__controls"/);
  assert.match(customerSection, /data-carousel-prev/);
  assert.match(customerSection, /data-carousel-next/);
  assert.match(customerSection, /data-carousel-toggle/);
  assert.match(customerSection, /class="sr-only" data-carousel-status[^>]*aria-live="polite"/);
  assert.doesNotMatch(customerSection, /customer-runway__gallery-meta|Human signal deck|Khoảnh khắc thật/);
  assert.doesNotMatch(customerSection, /data-carousel-indicators/);
  assert.match(heroSection, /class="gateway-control-deck"/);
  assert.match(heroSection, /data-carousel-prev/);
  assert.match(heroSection, /data-carousel-next/);
  assert.doesNotMatch(heroSection, /data-carousel-toggle/);
  assert.equal((heroSection.match(/data-carousel-indicators/g) || []).length, 1);

  const rail = customerSection.slice(customerSection.indexOf('data-carousel-track'));
  const railImages = [...rail.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  assert.equal(railImages.length, 16);
  for (const image of railImages) {
    assert.match(image, /src="assets\/media\/customers\/customer-\d+\.webp"/);
    assert.match(image, /width="562"/);
    assert.match(image, /height="700"/);
    assert.match(image, /loading="lazy"/);
    assert.match(image, /decoding="async"/);
  }

  const trustCoreAsset = 'assets/media/customers/customer-trust-core-bg.webp';
  assert.ok(existsSync(trustCoreAsset), `Missing Trust Core artwork ${trustCoreAsset}`);
  assert.ok(statSync(trustCoreAsset).size > 100 && statSync(trustCoreAsset).size < 250_000, 'Trust Core rollback artwork must be optimized below 250 KB');
  assert.doesNotMatch(css, /url\('media\/customers\/customer-trust-core-bg\.webp'\)/);
  assert.match(css, /Ice Pearl Trust Gallery/);
  assert.match(css, /\.customer-stories\s*\{[\s\S]*?background:[\s\S]*?linear-gradient\(108deg,\s*#fff 0%,\s*#f5faff 42%,\s*#eaf4fd 100%\)/);
  assert.match(css, /\.customer-runway\s*\{[\s\S]*?overflow:\s*visible[\s\S]*?border:\s*0[\s\S]*?border-radius:\s*0[\s\S]*?background:\s*transparent[\s\S]*?box-shadow:\s*none/s);
  assert.doesNotMatch(css, /--customer-border/);
  assert.doesNotMatch(css, /\.customer-runway\s*\{[^}]*border:\s*1px/s);
  assert.match(css, /\.customer-runway__gallery\s*\{[^}]*--customer-edge-fade:\s*clamp\(24px, 3\.4vw, 60px\)[^}]*overflow:\s*hidden[^}]*-webkit-mask-image:\s*linear-gradient\(90deg, transparent 0, #000 var\(--customer-edge-fade\), #000 calc\(100% - var\(--customer-edge-fade\)\), transparent 100%\)[^}]*mask-image:\s*linear-gradient\(90deg, transparent 0, #000 var\(--customer-edge-fade\), #000 calc\(100% - var\(--customer-edge-fade\)\), transparent 100%\)/s);
  assert.doesNotMatch(css, /\.customer-runway__gallery::(?:before|after)/);
  assert.match(css, /clip-path:\s*inset\(0 7% 0 7%\);/);
  assert.doesNotMatch(css, /clip-path:\s*inset\(0 7% 0 7% round/);
  assert.match(css, /\.customer-runway__card\s*\{[^}]*box-shadow:/s);
  assert.match(css, /\.customer-runway__controls button\s*\{[^}]*box-shadow:/s);
  assert.match(css, /\.customer-runway\s*\{[\s\S]*grid-template-columns:\s*minmax\(0, 28fr\)\s*minmax\(0, 72fr\)/);
  assert.match(css, /\.customer-runway__card\s*\{[^}]*width:\s*31%[^}]*flex:\s*0 0 31%[^}]*aspect-ratio:\s*562 \/ 700/s);
  assert.match(css, /\.customer-runway__card\s*\{[^}]*filter:\s*saturate\(\.95\) brightness\(\.98\)[^}]*opacity:\s*\.9/s);
  assert.match(css, /\.customer-runway__card\.is-featured[\s\S]*?scale\(1\.03\)/);
  assert.match(css, /\.customer-runway__card img\s*\{[^}]*object-fit:\s*cover/s);
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*?\.customer-runway__card\s*\{[^}]*width:\s*min\(42%, 370px\)[^}]*flex-basis:\s*min\(42%, 370px\)/s);
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.customer-runway__card\s*\{[^}]*width:\s*min\(calc\(84% \+ 34px\), 310px\)[^}]*flex-basis:\s*min\(calc\(84% \+ 34px\), 310px\)/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.customer-runway__card/s);
  assert.match(appSource, /function initCustomerStoriesReveal\(\)/);
  assert.match(appSource, /initCustomerStoriesReveal\(\)/);
});

test('reference header and gateway showcase preserve the approved design contract', () => {
  const utilityCopy = [
    'Hotline mua hàng:', '1900 1903', 'Mua hàng online', 'Miền Bắc', 'Miền Trung', 'Miền Nam',
    'Hệ thống Showroom', 'Hỗ trợ', 'Trung tâm dịch vụ', 'Khuyến mãi'
  ];
  utilityCopy.forEach((label) => assert.match(html, new RegExp(label)));

  assert.match(html, /placeholder="Nhập tên sản phẩm cần tìm"/);
  assert.match(html, /Dựng cấu hình/);
  assert.match(html, /Xin chào/);
  assert.match(html, /Nguyễn Văn Mạnh/);
  assert.match(html, />8<\/b>/);
  assert.match(html, /1,356,453Đ/);
  assert.doesNotMatch(html, /class="page-container nav-row"/);

  assert.equal((html.match(/data-header-panel-trigger=/g) || []).length, 2);
  assert.match(html, /data-header-panel-trigger="region"[^>]*aria-controls="headerRegionPanel"[^>]*aria-expanded="false"/);
  assert.match(html, /data-header-panel-trigger="utility"[^>]*aria-controls="headerUtilityPanel"[^>]*aria-expanded="false"/);
  assert.match(html, /id="headerRegionPanel"[^>]*data-header-panel="region"[^>]*hidden/);
  assert.match(html, /id="headerUtilityPanel"[^>]*data-header-panel="utility"[^>]*hidden/);
  assert.match(html, /Chọn khu vực/);
  assert.match(html, /Tiện ích/);

  assert.match(appSource, /function initResponsiveHeaderPanels\(\)/);
  assert.match(appSource, /event\.key !== 'Escape'/);
  assert.match(appSource, /activeTrigger\?\.focus\(\)/);
  assert.match(appSource, /desktopQuery\.addEventListener\?\.\('change'/);
  assert.match(css, /Ice-Tech Header Gateway: bright technology composition/);
  assert.match(css, /\.reference-main-shell\s*\{[\s\S]*?rgba\(249, 252, 255, \.94\)/s);
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*?\.reference-compact-utility\s*\{[^}]*display:\s*flex/s);
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*?\.header-benefits\s*\{[^}]*grid-template-columns:\s*repeat\(4,[^}]*grid-template-rows:\s*1fr/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.header-benefits\s*\{[^}]*grid-template-columns:\s*repeat\(2,[^}]*grid-template-rows:\s*repeat\(2,\s*1fr\)/s);

  const iceTechStart = css.indexOf('/* Ice-Tech Header Gateway: bright technology composition from the approved reference. */');
  const tabletTypographyStart = css.indexOf('@media (min-width: 768px) and (max-width: 1180px)', iceTechStart);
  const finalMobileStart = css.indexOf('@media (max-width: 767.98px)', tabletTypographyStart);
  const finalMobileEnd = css.indexOf('@media (prefers-reduced-motion: reduce)', finalMobileStart);
  const tabletTypographyCss = css.slice(tabletTypographyStart, finalMobileStart);
  const finalMobileCss = css.slice(finalMobileStart, finalMobileEnd);

  assert.ok(iceTechStart >= 0 && tabletTypographyStart > iceTechStart && finalMobileStart > tabletTypographyStart);
  assert.match(finalMobileCss, /\.reference-main-shell \.mobile-header\s*\{[^}]*grid-template-columns:\s*92px minmax\(0,\s*1fr\) 46px[^}]*grid-template-areas:\s*'brand search menu'/s);
  assert.match(finalMobileCss, /\.reference-main-shell \.brand-lockup--mobile\s*\{[^}]*grid-area:\s*brand[^}]*padding:\s*0[^}]*border:\s*0[^}]*background:\s*transparent[^}]*box-shadow:\s*none/s);
  assert.match(finalMobileCss, /\.reference-main-shell \.mobile-header \.header-search\s*\{[^}]*grid-area:\s*search[^}]*min-width:\s*0/s);
  assert.match(finalMobileCss, /\.reference-main-shell \.menu-trigger--mobile\s*\{[^}]*grid-area:\s*menu[^}]*justify-self:\s*end/s);
  assert.match(finalMobileCss, /\.reference-main-shell \.mobile-header \.search-input-box button\s*\{[^}]*width:\s*44px[^}]*height:\s*44px/s);

  assert.match(tabletTypographyCss, /\.gateway-hero-copy--left\s*\{[^}]*max-width:\s*40%/s);
  assert.match(tabletTypographyCss, /\.gateway-hero-copy--left small\s*\{[^}]*font-size:\s*clamp\(11px,\s*1\.05vw,\s*13px\)/s);
  assert.match(tabletTypographyCss, /\.gateway-hero-copy--left strong\s*\{[^}]*font-size:\s*clamp\(26px,\s*2\.7vw,\s*32px\)/s);
  assert.match(tabletTypographyCss, /\.gateway-hero-copy--left > span\s*\{[^}]*font-size:\s*clamp\(11px,\s*1\.1vw,\s*13px\)/s);
  assert.match(tabletTypographyCss, /\.gateway-hero-copy--center small\s*\{[^}]*font-size:\s*clamp\(11px,\s*1\.05vw,\s*13px\)/s);
  assert.match(tabletTypographyCss, /\.gateway-hero-copy--center strong\s*\{[^}]*font-size:\s*clamp\(22px,\s*2\.45vw,\s*29px\)/s);
  assert.match(tabletTypographyCss, /\.gateway-hero-copy--center > span\s*\{[^}]*font-size:\s*clamp\(10px,\s*1vw,\s*12px\)/s);
  assert.doesNotMatch(tabletTypographyCss, /\.gateway-hero-slide__action img\s*\{[^}]*transform:/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.reference-header-panel/s);

  const heroStart = html.indexOf('<section id="hero"');
  const showcaseStart = html.indexOf('<section class="header-promo-showcase');
  const customerStart = html.indexOf('<section id="customerStories"');
  const heroSection = html.slice(heroStart, showcaseStart);
  const showcaseSection = html.slice(showcaseStart, customerStart);

  assert.equal((heroSection.match(/data-carousel-root/g) || []).length, 1);
  assert.equal((heroSection.match(/class="gateway-hero-slide(?:\s|\")/g) || []).length, 3);
  assert.equal((heroSection.match(/data-gateway-fixed-tile/g) || []).length, 4);
  assert.match(heroSection, /id="gatewayCarousel"[^>]*data-carousel-variant="gateway"[^>]*data-carousel-delay="3000"/);
  assert.match(heroSection, /id="gatewayCarousel"[\s\S]*?data-carousel-prev[\s\S]*?data-carousel-next/);
  assert.match(heroSection, /class="gateway-indicators"[^>]*data-carousel-indicators/);
  assert.match(heroSection, /Danh Mục Sản Phẩm/);
  assert.doesNotMatch(heroSection, /mobility-main|gateway-campaign-grid|Nhẹ để đi xa|gateway-promo-rail/);
  const headerTechAssets = [
    'hero-akko.webp',
    'hero-performance.webp',
    'hero-builder.webp',
    'tile-build-pc.webp',
    'tile-headphones.webp',
    'tile-showroom.webp',
    'tile-earbuds.webp',
    'tech-bg-desktop.webp',
    'tech-bg-tablet.webp',
    'tech-bg-mobile.webp'
  ];
  headerTechAssets.slice(0, 7).forEach((asset) => {
    assert.match(heroSection, new RegExp(`assets/media/header-tech/${asset.replace('.', '\\.')}`));
  });
  const trackStart = heroSection.indexOf('data-carousel-track');
  const trackEnd = heroSection.indexOf('<div class="gateway-control-deck"', trackStart);
  const heroTrack = heroSection.slice(trackStart, trackEnd);
  assert.equal((heroTrack.match(/class="gateway-hero-slide(?:\s|\")/g) || []).length, 3);
  assert.doesNotMatch(heroTrack, /data-gateway-fixed-tile/);
  assert.equal((heroTrack.match(/data-carousel-card-action/g) || []).length, 3);

  assert.match(showcaseSection, /data-carousel-root/);
  assert.match(showcaseSection, /data-carousel-variant="snap"/);
  assert.match(showcaseSection, /aria-labelledby="headerPromoTitle"/);
  assert.match(showcaseSection, /id="headerPromoTitle"[^>]*>\s*Ưu đãi công nghệ nổi bật\s*</);
  assert.equal((showcaseSection.match(/class="header-benefit"/g) || []).length, 4);
  assert.equal((showcaseSection.match(/class="header-promo-card"/g) || []).length, 5);
  assert.match(showcaseSection, /HỎA TỐC 2H/);
  assert.match(showcaseSection, /MIỄN PHÍ TOÀN QUỐC/);
  assert.match(showcaseSection, /LÃI SUẤT 0%/);
  assert.match(showcaseSection, /TẬN NƠI SỬ DỤNG/);
  [
    ['01', 'Trùm loa di động', '399.000đ'],
    ['02', 'Thiết bị chơi game', '899.000đ'],
    ['03', 'Arm màn hình', '299.000đ'],
    ['04', 'Gaming văn phòng', '1.649.000đ'],
    ['05', 'Màn hình gaming', '399.000đ']
  ].forEach(([number, title, price]) => {
    assert.match(showcaseSection, new RegExp(`>${number}<`));
    assert.match(showcaseSection, new RegExp(title));
    assert.match(showcaseSection, new RegExp(price.replace('.', '\\.')));
  });
  assert.doesNotMatch(html, /class="promo-strip/);

  const boulevardAssets = [
    'promo-speakers.webp',
    'promo-gaming-devices.webp',
    'promo-monitor-arm.webp',
    'promo-gaming-office.webp',
    'promo-gaming-monitors.webp'
  ];
  boulevardAssets.forEach((asset) => {
    const output = `assets/media/header-showcase-v2/${asset}`;
    assert.match(showcaseSection, new RegExp(output.replaceAll('/', '\\/').replace('.', '\\.')));
    assert.ok(existsSync(output), `Missing Ice-Tech Boulevard asset ${output}`);
    assert.ok(statSync(output).size > 50_000, `Ice-Tech Boulevard asset is unexpectedly small: ${output}`);
  });
  assert.equal((showcaseSection.match(/width="960" height="1200"/g) || []).length, 5);

  for (let index = 1; index <= 10; index += 1) {
    const asset = `assets/media/header-showcase/anh-${index}.webp`;
    assert.ok(existsSync(asset), `Missing header showcase asset ${asset}`);
    assert.ok(statSync(asset).size > 100, `Header showcase asset is unexpectedly small: ${asset}`);
  }

  for (const asset of headerTechAssets) {
    const output = `assets/media/header-tech/${asset}`;
    assert.ok(existsSync(output), `Missing Ice-Tech header asset ${output}`);
    assert.ok(statSync(output).size > 100, `Ice-Tech header asset is unexpectedly small: ${output}`);
  }

  assert.match(appSource, /function initSnapCarousel\(/);
  assert.match(appSource, /carouselVariant === 'snap'/);
  assert.match(appSource, /function initHeaderPromoReveal\(\)/);
  assert.match(appSource, /initHeaderPromoReveal\(\)/);
  assert.match(css, /\.site-header--reference/);
  assert.match(css, /\.gateway-reference-tile--build\s*\{[^}]*grid-column:\s*5 \/ 7[^}]*grid-row:\s*1/);
  assert.match(css, /url\('media\/header-tech\/tech-bg-desktop\.webp'\)/);
  assert.match(css, /url\('media\/header-tech\/tech-bg-tablet\.webp'\)/);
  assert.match(css, /url\('media\/header-tech\/tech-bg-mobile\.webp'\)/);
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*?\.gateway-reference-grid\s*\{[^}]*display:\s*block[^}]*overflow:\s*visible/s);
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*?\.gateway-reference-rail[\s\S]*?overflow-x:\s*auto/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.gateway-reference-rail\s*\{[^}]*minmax\(84%/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.gateway-hero-carousel\s*\{[^}]*aspect-ratio:\s*4 \/ 3/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.gateway-hero-slide__action/s);
  assert.match(css, /Ice-Tech Boulevard/);
  assert.match(css, /\.header-promo-card\s*\{[^}]*min-height:\s*380px[^}]*display:\s*flex[^}]*flex-direction:\s*column[^}]*justify-content:\s*flex-start[^}]*padding:\s*0[^}]*aspect-ratio:\s*7 \/ 10/s);
  assert.match(css, /\.header-promo-card__copy\s*\{[^}]*min-height:\s*0/s);
  assert.match(css, /\.header-promo-card \.header-promo-card__art\s*\{[^}]*width:\s*112%[^}]*height:\s*var\(--promo-art-height\)/s);
  [82, 80, 72, 78, 72].forEach((height, index) => {
    assert.match(css, new RegExp(`\\.header-promo-card:nth-child\\(${index + 1}\\)\\s*\\{[^}]*--promo-art-height:\\s*${height}%`));
  });
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*?\.header-promo-track\s*\{[^}]*gap:\s*10px[^}]*\}[\s\S]*?\.header-promo-card\s*\{[^}]*flex-basis:\s*calc\(\(100% - 30px\) \/ 4\)[^}]*min-height:\s*0[^}]*aspect-ratio:\s*7 \/ 10/s);
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*?\.header-promo-card \.header-promo-card__art\s*\{[^}]*height:\s*68%/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.header-promo-card\s*\{[^}]*flex-basis:\s*calc\(\(100% - 10px\) \/ 2\)[^}]*min-height:\s*0[^}]*aspect-ratio:\s*7 \/ 10/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.header-promo-card__art\s*\{[^}]*height:\s*66%/s);
  assert.doesNotMatch(css, /@media \(max-width: 1180px\)[\s\S]*?\.header-promo-card\s*\{[^}]*flex-basis:\s*42%/s);
  assert.doesNotMatch(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.header-promo-card\s*\{[^}]*flex-basis:\s*84%[^}]*min-height:\s*420px/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.header-promo-showcase/s);
});

test('footer network command exposes the verified showroom directory contract', () => {
  assert.equal(showroomData.sourceUrl, 'https://hacom.vn/showroom');
  assert.equal(showroomData.retrievedAt, '2026-08-17');
  assert.equal(showroomData.items.length, 21);
  assert.equal(new Set(showroomData.items.map((item) => item.id)).size, showroomData.items.length);
  assert.equal(new Set(showroomData.items.map((item) => `${item.name}|${item.address}`)).size, showroomData.items.length);
  for (const item of showroomData.items) {
    for (const field of ['id', 'name', 'region', 'province', 'address', 'mapUrl', 'photoUrl', 'salesPhone', 'email', 'openHours']) {
      assert.ok(item[field], `Showroom ${item.id} is missing ${field}`);
    }
    assert.match(item.mapUrl, /^https:\/\/maps\.app\.goo\.gl\//);
    assert.match(item.photoUrl, /^https:\/\/hacom\.vn\//);
    assert.ok(['north', 'central', 'south'].includes(item.region));
  }

  const footerStart = html.indexOf('<footer class="site-footer">');
  const networkStart = html.indexOf('id="showroomNetwork"', footerStart);
  const footerExecutiveStart = html.indexOf('class="footer-executive"', networkStart);
  assert.ok(footerStart >= 0 && networkStart > footerStart && footerExecutiveStart > networkStart);
  assert.doesNotMatch(html, /class="footer-business"/);
  const networkSection = html.slice(networkStart, footerExecutiveStart);
  assert.match(networkSection, /class="page-container showroom-portal__container"/);
  assert.match(networkSection, /class="showroom-portal__eyebrow"[\s\S]*?HACOM EXPERIENCE NETWORK/);
  assert.match(networkSection, /id="showroomNetworkTitle"[^>]*>21 điểm chạm\.<br><span>Một chuẩn trải nghiệm\.<\/span><\/h2>/);
  assert.match(networkSection, /class="showroom-portal__lead"[^>]*>Tìm showroom gần bạn để xem máy, nhận hàng và được hỗ trợ trực tiếp\.</);
  assert.match(networkSection, /ice-flagship-desktop\.webp" alt="" width="1920" height="720"/);
  assert.match(networkSection, /ice-flagship-tablet\.webp"[^>]*width="1280" height="800"/);
  assert.match(networkSection, /ice-flagship-mobile\.webp"[^>]*width="768" height="960"/);
  assert.match(networkSection, /loading="lazy"[^>]*decoding="async"/);
  assert.match(networkSection, /data-showroom-count/);
  assert.match(networkSection, /id="showroomSearch"[^>]*data-showroom-search/);
  assert.match(networkSection, /placeholder="Tìm theo quận, thành phố hoặc tên showroom"/);
  assert.match(networkSection, /data-showroom-region="north"[^>]*aria-pressed/);
  assert.match(networkSection, /data-showroom-region="central"[^>]*aria-pressed/);
  assert.match(networkSection, /data-showroom-region="south"[^>]*aria-pressed/);
  assert.match(networkSection, /id="showroomResultsStatus"[^>]*aria-live="polite"/);
  assert.match(networkSection, /id="showroomToggle"[^>]*aria-expanded="false"/);
  assert.match(networkSection, /data-showroom-empty/);
  assert.match(networkSection, /href="tel:19001903"/);
  assert.match(networkSection, /<noscript>/);
  assert.match(appSource, /function initShowroomFinder\(\)/);
  assert.match(appSource, /input\[type="search"\]:not\(\[data-showroom-search\]\)/);
  assert.match(css, /\.showroom-portal\s*\{[^}]*background:/);
  assert.match(css, /@media \(min-width: 1181px\)[\s\S]*?\.showroom-command\s*\{[^}]*grid-template-columns:/);
  assert.match(css, /\.showroom-destination-grid\s*\{[^}]*repeat\(4,\s*minmax\(0,\s*1fr\)/);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.showroom-destination-grid\s*\{[^}]*grid-template-columns:\s*1fr/);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.showroom-portal h2\s*\{[^}]*max-width:\s*none[^}]*font-size:\s*clamp\(1\.5rem,\s*6\.7vw,\s*1\.8rem\)[^}]*line-height:\s*1\.05[^}]*white-space:\s*nowrap[^}]*text-wrap:\s*nowrap/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.showroom-portal__signal\s*\{[^}]*align-items:\s*center/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.showroom-portal__signal-unit\s*\{[^}]*align-self:\s*center[^}]*font-size:\s*clamp\(14px,\s*4vw,\s*16px\)/s);
  assert.match(css, /\.showroom-destination__actions a\s*\{[^}]*min-height:\s*44px/);
  for (const asset of [
    ['assets/media/showroom-portal/ice-flagship-desktop.webp', 350_000],
    ['assets/media/showroom-portal/ice-flagship-tablet.webp', 250_000],
    ['assets/media/showroom-portal/ice-flagship-mobile.webp', 180_000]
  ]) {
    assert.ok(existsSync(asset[0]), `Missing showroom portal asset ${asset[0]}`);
    assert.ok(statSync(asset[0]).size > 100 && statSync(asset[0]).size <= asset[1], `Showroom portal asset exceeds budget: ${asset[0]}`);
  }

  assert.equal(footerManifest.fetchedAt, '2026-08-18');
  assert.equal(footerManifest.sourcePage, 'https://hacom.vn/');
  const footerSection = html.slice(footerExecutiveStart);
  assert.match(footerSection, /id="footerExecutiveTitle"[^>]*>Đừng bỏ lỡ nhịp công nghệ\.<\/h2>/);
  assert.doesNotMatch(footerSection, /HACOM SINCE 2001/);
  assert.match(footerSection, /HACOM TECH SIGNAL/);
  assert.match(footerSection, /id="newsletterForm"/);
  assert.match(footerSection, /id="newsletterEmail"/);
  assert.match(footerSection, /id="newsletterStatus"/);
  assert.equal((footerSection.match(/class="footer-directory__group"/g) || []).length, 3);
  for (const heading of ['Giới thiệu HACOM', 'Hỗ trợ khách hàng', 'Chính sách chung', 'Thông tin khuyến mại']) {
    assert.match(footerSection, new RegExp(heading));
  }
  for (const label of [
    'Giới thiệu công ty', 'Liên hệ hợp tác kinh doanh', 'Thông tin tuyển dụng', 'Tin tức', 'Người HACOM', 'HACOM - Cộng đồng',
    'Tra cứu đơn hàng', 'Hướng dẫn mua hàng trực tuyến', 'Hướng dẫn thanh toán', 'Hướng dẫn mua hàng trả góp',
    'Bảng giá vật tư và dịch vụ sửa chữa lắp đặt', 'In hóa đơn điện tử', 'Góp ý, Khiếu Nại',
    'Chính sách, quy định chung', 'Chính sách bảo hành', 'Chính sách cho doanh nghiệp', 'Chính sách hàng chính hãng',
    'Bảo mật thông tin khách hàng', 'Chính sách nhập lại tính phí', 'Chính sách giao hàng', 'Bản quyền hình ảnh',
    'Sản phẩm khuyến mại'
  ]) {
    assert.match(footerSection, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.equal((footerSection.match(/href="tel:19001903"/g) || []).length, 3);
  assert.match(footerSection, /href="mailto:info@hacom\.vn"/);
  assert.match(footerSection, /data-footer-year[^>]*>2026<\/span>/);
  for (const text of ['Trụ sở chính: Số 129 \\+ 131', 'VPGD: Tầng 3 Tòa nhà LILAMA', 'GPĐKKD số 0101161194', '31\/8\/2001']) {
    assert.match(footerSection, new RegExp(text));
  }
  assert.equal((footerSection.match(/class="footer-socials"/g) || []).length, 1);
  assert.match(footerSection, /payment-methods\.png" alt="VNPay, OnePay, Payoo, Visa, Mastercard và thanh toán tiền mặt" width="310" height="82"/);
  assert.match(footerSection, /dichvutot\.vn/);
  assert.match(footerSection, /gameshop\.vn/);
  assert.match(footerSection, /online\.gov\.vn\/Home\/WebDetails\/95539/);
  assert.match(footerSection, /bo-cong-thuong\.webp" alt="Đã thông báo Bộ Công Thương" width="143" height="54"/);
  assert.match(footerSection, /dmca\.webp" alt="DMCA Protected" width="120" height="40"/);
  assert.match(css, /\.footer-executive\s*\{/);
  assert.match(css, /\.footer-identity__logo\s*\{[^}]*background:\s*transparent/);
  assert.match(css, /\.footer-members > a\s*\{[^}]*background:\s*transparent/);
  assert.match(css, /\.footer-directory__grid\s*\{[^}]*minmax\(250px, 1\.24fr\)/);
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*?\.footer-directory__grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(css, /\.footer-hotline\s*\{[^}]*border-top:\s*0/);
  assert.match(css, /\.footer-payment-panel\s*\{[^}]*border-top:\s*0/);
  assert.match(css, /@media \(min-width: 768px\) and \(max-width: 1180px\)[\s\S]*?\.footer-hotline a\s*\{[^}]*grid-template-columns:\s*minmax\(72px,\s*max-content\) max-content[^}]*column-gap:\s*18px/s);
  assert.match(css, /\.footer-command__copy h2\s*\{[^}]*font-size:\s*clamp\(2\.25rem, 3\.6vw, 4\.25rem\)/);
  assert.match(css, /\.footer-command__form\s*\{[^}]*width:\s*min\(100%, 720px\)/);
  assert.match(css, /\.footer-command__field button\s*\{[^}]*min-height:\s*44px/);
  assert.match(css, /\.footer-payment-media img\s*\{[^}]*aspect-ratio:\s*310 \/ 82/);
  assert.match(css, /\.footer-members > a:first-of-type img\s*\{[^}]*width:\s*160px/);
  assert.match(css, /\.footer-members > a:last-child img\s*\{[^}]*width:\s*142px/);
  assert.match(css, /\.footer-directory__group\s*summary/);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.footer-directory__group\s*\{/);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.footer-command__copy h2\s*\{[^}]*max-width:\s*none[^}]*font-size:\s*clamp\(1\.15rem,\s*5vw,\s*1\.35rem\)[^}]*white-space:\s*nowrap[^}]*text-wrap:\s*nowrap/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.footer-identity\s*\{[^}]*display:\s*grid[^}]*grid-template-columns:\s*minmax\(128px,\s*144px\) minmax\(0,\s*1fr\)[^}]*column-gap:\s*12px/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.footer-hotline a\s*\{[^}]*min-height:\s*44px[^}]*font-size:\s*12px/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.footer-payment-panel\s*\{[^}]*grid-column:\s*1 \/ -1/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.footer-payment-media\s*\{[^}]*width:\s*min\(100%,\s*360px\)[^}]*margin-inline:\s*auto/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.footer-certifications\s*\{[^}]*display:\s*grid[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)[^}]*justify-items:\s*center/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.footer-certifications a:first-child img\s*\{[^}]*width:\s*min\(100%,\s*160px\)/s);
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.footer-certifications a:last-child img\s*\{[^}]*width:\s*min\(100%,\s*146px\)/s);
  assert.match(css, /@media \(min-width: 768px\) and \(max-width: 1180px\)[\s\S]*?\.footer-identity\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)[^}]*column-gap:\s*26px/s);
  assert.match(css, /\.footer-executive a:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.footer-command::after/);

  assert.equal(footerManifest.items.length, 5);
  for (const asset of footerManifest.items) {
    assert.ok(existsSync(asset.output), `Missing footer asset ${asset.output}`);
    assert.ok(statSync(asset.output).size > 100, `Footer asset is unexpectedly small: ${asset.output}`);
    assert.ok(asset.alt && asset.width > 0 && asset.height > 0, `Footer asset manifest is incomplete: ${asset.output}`);
  }
});

test('service gateway replaces the legacy services and brand directory with four command cards', () => {
  const accessoriesStart = html.indexOf('<section id="accessories"');
  const gatewayStart = html.indexOf('<section id="serviceGateway"');
  const footerStart = html.indexOf('<footer class="site-footer">');
  assert.ok(accessoriesStart >= 0 && gatewayStart > accessoriesStart && footerStart > gatewayStart);

  const gatewaySection = html.slice(gatewayStart, footerStart);
  const gatewayText = gatewaySection.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  assert.match(gatewaySection, /aria-labelledby="serviceGatewayTitle"/);
  assert.match(gatewaySection, /id="serviceGatewayTitle" class="sr-only">Khám phá hệ sinh thái HACOM<\/h2>/);
  assert.equal((gatewaySection.match(/class="service-command-card /g) || []).length, 4);
  assert.equal((gatewaySection.match(/data-demo-action/g) || []).length, 5);

  for (const copy of [
    'AI POWERED',
    'CHƯA CHẮC',
    'LAPTOP NÀO?',
    'HACOM APP',
    'DEAL TỐT',
    'TRÊN SHOPEE',
    'PC BUILDER',
    'TỰ DỰNG',
    'BỘ PC CỦA BẠN',
    'FLASH DEAL',
    'FLASH SALES',
    'SIÊU HOT',
    'Khởi động AI HACOM',
    'App Store',
    'Google Play',
    'Thử PC Builder mới',
    'Săn Flash Deal'
  ]) {
    assert.match(gatewayText, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.doesNotMatch(html, /id="(?:services|brands|brandsGrid|expandOverlay|expandBtn)"/);
  assert.doesNotMatch(appSource, /initBrandExpander/);
  assert.match(appSource, /function initServiceGateway\(\)/);
  assert.match(appSource, /typeof IntersectionObserver !== 'function'/);
  assert.match(appSource, /matchMedia\?\.\('\(pointer: fine\)'\)/);
  assert.match(appSource, /requestAnimationFrame/);
  assert.match(appSource, /initServiceGateway\(\)/);

  assert.match(css, /\.service-command-grid\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(css, /@media \(max-width: 1279px\)[\s\S]*?\.service-command-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.service-command-grid\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(css, /\.service-command-action\s*\{[^}]*min-height:\s*44px/s);
  assert.match(css, /\.service-command-card h3\s*\{[^}]*row-gap:\s*\.06em[^}]*line-height:\s*1\.08/s);
  assert.match(css, /\.service-command-action:focus-visible/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.service-gateway__signal[\s\S]*?animation:\s*none/s);
  assert.doesNotMatch(css, /\.(?:service-grid|service-card|brands-grid|brands-overlay)(?:\s|\{|:|\.)/);
});

test('typography uses the semantic weight scale across static and dynamic UI', () => {
  for (const [token, value] of [
    ['--font-regular', '400'],
    ['--font-medium', '500'],
    ['--font-semibold', '600'],
    ['--font-bold', '700'],
    ['--font-display', '900']
  ]) {
    assert.match(css, new RegExp(`${token}\\s*:\\s*${value}`));
  }

  const declarations = [...css.matchAll(/font-weight:\s*([^;}]*)/g)].map((match) => match[1].trim());
  assert.deepEqual(declarations.filter((value) => !value.startsWith('var(') && value !== 'inherit'), ['100 900', '100 900']);
  assert.match(css, /h1, h2, h3, h4, h5, h6\s*\{[^}]*font-weight:\s*var\(--font-semibold\)/);
  assert.match(css, /strong, b\s*\{[^}]*font-weight:\s*var\(--font-semibold\)/);
  assert.match(css, /\.product-card__spec-value\s*\{[^}]*font-weight:\s*var\(--font-medium\)/);
  assert.match(css, /\.product-card__price\s*\{[^}]*font-weight:\s*var\(--font-bold\)/);
  assert.doesNotMatch(css, /font-weight:\s*(?:[7-9]\d{2}|[1-9]\d{3})\b/);
});
