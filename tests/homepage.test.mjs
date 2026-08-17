import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const html = readFileSync('index.html', 'utf8');
const css = readFileSync('assets/styles.css', 'utf8');
const appSource = readFileSync('assets/app.js', 'utf8');
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
  for (const [minWidth, columns] of [[768, 3], [1024, 4], [1280, 5], [1600, 6]]) {
    assert.match(css, new RegExp(`@media \\(min-width: ${minWidth}px\\)[\\s\\S]{0,180}repeat\\(${columns}`));
  }
  assert.match(css, /\.product-grid\s*\{[^}]*repeat\(2/);
  assert.doesNotMatch(css, /\.product-grid[^}]*repeat\([78],\s*minmax/);
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

  for (const [minWidth, columns, consumedGap] of [[768, 3, 24], [1024, 4, 36], [1280, 5, 48], [1600, 6, 60]]) {
    assert.match(
      css,
      new RegExp(`@media \\(min-width: ${minWidth}px\\)[\\s\\S]{0,320}\\.product-track\\s*\\{[^}]*--product-track-card-width:\\s*calc\\(\\(100% - ${consumedGap}px\\) \\/ ${columns}\\)`)
    );
  }

  assert.doesNotMatch(css, /\.product-track\s*>\s*\*\s*\{[^}]*width:/s);
  assert.doesNotMatch(css, /clamp\(220px,\s*18vw,\s*280px\)|calc\(50vw - 16px\)|min-width:\s*154px|max-width:\s*190px/);
});

test('homepage taxonomy and collections stay data-backed', () => {
  assert.equal(gatewayData.categoryTree.length, 21);
  assert.equal(new Set(gatewayData.categoryTree.map((item) => item.id)).size, 21);
  assert.deepEqual(Object.keys(gatewayData.homepageCollections), [
    'deals', 'trending', 'new-arrivals', 'laptops', 'pc-gaming', 'displays', 'components', 'gaming-gear'
  ]);
  for (const [collection, skus] of Object.entries(gatewayData.homepageCollections)) {
    assert.ok(skus.length > 0, `${collection} must not be empty`);
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
  assert.match(customerSection, /Khách hàng đã và đang ủng hộ HACOM/);
  assert.match(customerSection, /data-carousel-delay="5000"/);
  assert.match(customerSection, /aria-label="Khoảnh khắc khách hàng HACOM"/);
  assert.doesNotMatch(customerSection, /class="customer-runway__controls"/);
  assert.doesNotMatch(customerSection, /data-carousel-(?:prev|next|toggle|status)/);
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

  assert.match(css, /\.customer-runway\s*\{[\s\S]*grid-template-columns:\s*minmax\(0, 27fr\)\s*minmax\(0, 73fr\)/);
  assert.match(css, /\.customer-runway__card img\s*\{[\s\S]*object-fit:\s*cover/);
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*\.customer-runway__card\s*\{[^}]*78%/);
  assert.match(css, /\.customer-runway__trust[\s\S]*var\(--brand-navy\)/);
  assert.match(css, /\.customer-runway__gallery[\s\S]*var\(--brand-red\)/);
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
  assert.match(css, /@media \(max-width: 767\.98px\)[\s\S]*?\.reference-main-shell \.mobile-header\s*\{[^}]*grid-template-columns:/s);
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
  assert.equal((showcaseSection.match(/class="header-benefit"/g) || []).length, 4);
  assert.equal((showcaseSection.match(/class="header-promo-card"/g) || []).length, 5);
  assert.match(showcaseSection, /HỎA TỐC 2H/);
  assert.match(showcaseSection, /MIỄN PHÍ TOÀN QUỐC/);
  assert.match(showcaseSection, /LÃI SUẤT 0%/);
  assert.match(showcaseSection, /TẬN NƠI SỬ DỤNG/);
  assert.doesNotMatch(html, /class="promo-strip/);

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
  assert.match(css, /\.header-promo-showcase/);
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
  const businessStart = html.indexOf('class="footer-business"', networkStart);
  assert.ok(footerStart >= 0 && networkStart > footerStart && businessStart > networkStart);
  const networkSection = html.slice(networkStart, businessStart);
  assert.match(networkSection, /class="page-container showroom-network__container"/);
  assert.match(networkSection, /id="showroomNetworkTitle"[^>]*>Công nghệ ở gần bạn hơn\.</);
  assert.match(networkSection, /data-showroom-count/);
  assert.match(networkSection, /id="showroomSearch"[^>]*data-showroom-search/);
  assert.match(networkSection, /placeholder="Tìm theo quận, thành phố hoặc tên showroom"/);
  assert.match(networkSection, /data-showroom-region="north"[^>]*aria-pressed/);
  assert.match(networkSection, /id="showroomResultsStatus"[^>]*aria-live="polite"/);
  assert.match(networkSection, /id="showroomToggle"[^>]*aria-expanded="false"/);
  assert.match(networkSection, /data-showroom-empty/);
  assert.match(networkSection, /<noscript>/);
  assert.match(appSource, /function initShowroomFinder\(\)/);
  assert.match(appSource, /input\[type="search"\]:not\(\[data-showroom-search\]\)/);
  assert.match(css, /\.showroom-network\s*\{[^}]*background:\s*var\(--brand-navy\)/);
  assert.match(css, /\.showroom-grid\s*\{[^}]*repeat\(4,\s*minmax\(0,\s*1fr\)/);
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.showroom-grid\s*\{[^}]*grid-template-columns:\s*1fr/);
  assert.match(css, /\.showroom-card__actions a\s*\{[^}]*min-height:\s*44px/);

  assert.equal(footerManifest.fetchedAt, '2026-08-17');
  assert.equal(footerManifest.items.length, 4);
  for (const asset of footerManifest.items) {
    assert.ok(existsSync(asset.output), `Missing footer asset ${asset.output}`);
    assert.ok(statSync(asset.output).size > 100, `Footer asset is unexpectedly small: ${asset.output}`);
  }
});

test('typography uses the semantic weight scale across static and dynamic UI', () => {
  for (const [token, value] of [
    ['--font-regular', '400'],
    ['--font-medium', '500'],
    ['--font-semibold', '600'],
    ['--font-bold', '700']
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
