import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync('assets/catalog.js', 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context, { filename: 'assets/catalog.js' });
const catalog = context.window.HacomCatalog;

test('catalog exposes immutable products with the required product contract', () => {
  assert.ok(catalog);
  assert.ok(Object.isFrozen(catalog.all));
  assert.ok(catalog.all.length >= 32);
  const skus = new Set();
  for (const item of catalog.all) {
    assert.ok(item.sku && !skus.has(item.sku), `duplicate SKU: ${item.sku}`);
    skus.add(item.sku);
    assert.match(item.sourceUrl, /^https:\/\/hacom\.vn\//);
    assert.match(item.image.src, /^assets\/media\/products\/[A-Z0-9]+-640\.webp$/);
    assert.ok(existsSync(item.image.src), `missing local image: ${item.image.src}`);
    assert.equal(item.image.width, 640);
    assert.equal(item.image.height, 640);
    assert.match(item.image.srcSet, new RegExp(`${item.sku}-320\\.webp 320w`));
    assert.match(item.image.srcSet, new RegExp(`${item.sku}-640\\.webp 640w`));
    assert.equal(item.image.sizes, '(max-width: 767px) 44vw, (max-width: 1180px) 22vw, 300px');
    for (const variant of [`assets/media/products/${item.sku}-320.webp`, `assets/media/products/${item.sku}-640.webp`]) {
      assert.ok(existsSync(variant), `missing optimized image: ${variant}`);
    }
    assert.ok(item.image.alt);
    assert.ok(Object.isFrozen(item.image.presentation));
    assert.ok(Number.isFinite(item.image.presentation.scale));
    assert.ok(item.image.presentation.scale >= 1 && item.image.presentation.scale <= 1.3);
    assert.ok(Math.abs(item.image.presentation.xPercent) <= 8);
    assert.ok(Math.abs(item.image.presentation.yPercent) <= 8);
    assert.equal(item.specs.length, 2);
    assert.ok(item.price > 0);
    assert.ok(item.listPrice >= item.price);
    assert.equal(item.rating, 5);
  }
});

test('catalog image variants use compact responsive WebP assets', () => {
  const manifest = JSON.parse(readFileSync('assets/media/products/manifest.json', 'utf8'));
  const catalogSkus = new Set(catalog.all.map((item) => item.sku));
  const catalogEntries = manifest.filter((item) => catalogSkus.has(item.sku));
  assert.equal(catalogEntries.length, catalog.all.length);

  const totals = new Map([[320, 0], [640, 0]]);
  for (const item of catalogEntries) {
    assert.match(item.imagePath, /^assets\/media\/products\/[A-Z0-9]+\.jpg$/);
    assert.equal(item.variants.length, 2);
    for (const variant of item.variants) {
      assert.ok([320, 640].includes(variant.width));
      assert.equal(variant.height, variant.width);
      assert.equal(variant.format, 'webp');
      assert.match(variant.path, new RegExp(`^assets/media/products/${item.sku}-${variant.width}\\.webp$`));
      assert.ok(existsSync(variant.path), `missing manifest asset: ${variant.path}`);
      const bytes = readFileSync(variant.path);
      assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', `not a WebP asset: ${variant.path}`);
      assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', `not a WebP asset: ${variant.path}`);
      assert.equal(bytes.length, variant.bytes, `manifest byte mismatch: ${variant.path}`);
      totals.set(variant.width, totals.get(variant.width) + bytes.length);
    }
  }

  const sourceFiles = readdirSync('assets/media/products').filter((name) => name.endsWith('.jpg'));
  assert.equal(sourceFiles.length, 34);
  for (const filename of sourceFiles) {
    const sku = filename.slice(0, -4);
    for (const width of [320, 640]) {
      assert.ok(existsSync(`assets/media/products/${sku}-${width}.webp`), `missing optimized source variant: ${sku}-${width}.webp`);
    }
  }

  assert.ok(totals.get(320) <= 0.4 * 1024 * 1024, '320px variants exceed the payload budget');
  assert.ok(totals.get(640) <= 1 * 1024 * 1024, '640px variants exceed the payload budget');
});

test('expanded homepage demo inventory is backed by official HACOM product pages', () => {
  const expectedSkus = [
    'LTAC1001', 'LTMS0640', 'LTAU1091', 'LTAC1029',
    'PCGM1174', 'PCGM1171', 'PCGM1143', 'PCGM1178',
    'MOGI0059', 'MOAS0338', 'MODE0306', 'MOAS0339', 'MOSA0326',
    'VGGI0734', 'VGGI0692', 'VGAS0844'
  ];

  for (const sku of expectedSkus) {
    const item = catalog.getBySku(sku);
    assert.ok(item, `missing expanded catalog item: ${sku}`);
    assert.match(item.sourceUrl, /^https:\/\/hacom\.vn\//);
  }
});

test('legacy demo titles resolve to real HACOM products', () => {
  for (const [title, sku] of Object.entries(catalog.legacyAliases)) {
    assert.equal(catalog.getByLegacyTitle(title)?.sku, sku, `unmapped legacy title: ${title}`);
  }
});
