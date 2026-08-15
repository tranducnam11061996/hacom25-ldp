import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../assets/carousel.js', import.meta.url), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context, { filename: 'assets/carousel.js' });
const {
  AUTO_SLIDE_DELAY,
  canCycle,
  getCarouselConfig,
  getSwipeAction,
  hasMeaningfulInlineSizeChange
} = context.window.HacomCarousel;

test('auto-slide waits exactly three seconds between settled slides', () => {
  assert.equal(AUTO_SLIDE_DELAY, 3000);
});

test('carousel configuration keeps the default variant and delay', () => {
  const config = getCarouselConfig({ dataset: {} });
  assert.equal(config.autoDelay, 3000);
  assert.equal(config.variant, 'default');
});

test('carousel configuration reads the spotlight variant and five-second delay', () => {
  const config = getCarouselConfig({ dataset: { carouselDelay: '5000', carouselVariant: 'spotlight' } });
  assert.equal(config.autoDelay, 5000);
  assert.equal(config.variant, 'spotlight');
});

test('gateway carousel keeps its synchronized campaign variant and six-second delay', () => {
  const config = getCarouselConfig({ dataset: { carouselDelay: '6000', carouselVariant: 'gateway' } });
  assert.equal(config.autoDelay, 6000);
  assert.equal(config.variant, 'gateway');
});

test('carousel configuration rejects invalid and non-positive dataset delays', () => {
  assert.equal(getCarouselConfig({ dataset: { carouselDelay: 'invalid' } }).autoDelay, 3000);
  assert.equal(getCarouselConfig({ dataset: { carouselDelay: '0' } }).autoDelay, 3000);
  assert.equal(getCarouselConfig({ dataset: { carouselDelay: '-50' } }).autoDelay, 3000);
});

test('canCycle only when the track overflows the viewport', () => {
  assert.equal(canCycle({ itemCount: 1, trackWidth: 960, viewportWidth: 320 }), false);
  assert.equal(canCycle({ itemCount: 3, trackWidth: 320, viewportWidth: 320 }), false);
  assert.equal(canCycle({ itemCount: 3, trackWidth: 961, viewportWidth: 320 }), true);
});

test('canCycle turns off after a resize exposes every item', () => {
  const carousel = { itemCount: 4, trackWidth: 800, viewportWidth: 500 };
  assert.equal(canCycle(carousel), true);
  assert.equal(canCycle({ ...carousel, viewportWidth: 800 }), false);
});

test('inline-size guard ignores height-only and subpixel resize noise', () => {
  assert.equal(hasMeaningfulInlineSizeChange(1392, 1392), false);
  assert.equal(hasMeaningfulInlineSizeChange(1392, 1392.75), false);
  assert.equal(hasMeaningfulInlineSizeChange(1392, 1391), false);
});

test('inline-size guard accepts a real responsive width change', () => {
  assert.equal(hasMeaningfulInlineSizeChange(1392, 1024), true);
  assert.equal(hasMeaningfulInlineSizeChange(375, 377), true);
});

test('getSwipeAction advances when drag passes 20% of the step', () => {
  assert.equal(getSwipeAction({ deltaX: -41, elapsedMs: 500, stepPx: 200 }), 'next');
  assert.equal(getSwipeAction({ deltaX: 41, elapsedMs: 500, stepPx: 200 }), 'previous');
  assert.equal(getSwipeAction({ deltaX: 39, elapsedMs: 500, stepPx: 200 }), 'snap');
});

test('getSwipeAction accepts a short, fast flick and rejects a slow short drag', () => {
  assert.equal(getSwipeAction({ deltaX: -20, elapsedMs: 40, stepPx: 240 }), 'next');
  assert.equal(getSwipeAction({ deltaX: 20, elapsedMs: 250, stepPx: 240 }), 'snap');
});
