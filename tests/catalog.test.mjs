import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
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
    assert.match(item.image.src, /^assets\/media\/products\/[A-Z0-9]+\.jpg$/);
    assert.ok(existsSync(item.image.src), `missing local image: ${item.image.src}`);
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
