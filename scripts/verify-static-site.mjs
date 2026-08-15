import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const css = readFileSync('assets/styles.css', 'utf8');
const appJs = readFileSync('assets/app.js', 'utf8');
const carouselJs = readFileSync('assets/carousel.js', 'utf8');
const catalogJs = readFileSync('assets/catalog.js', 'utf8');
const productCardsJs = readFileSync('assets/product-cards.js', 'utf8');
const agentRules = readFileSync('AGENTS.md', 'utf8');
const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

assert.equal(duplicateIds.length, 0, `Duplicate IDs: ${[...new Set(duplicateIds)].join(', ')}`);
assert.match(html, /<html lang="vi">/);
assert.match(html, /HACOM - PC, LAPTOP, Thiết Bị Chơi Game hàng đầu Việt Nam/);
assert.match(html, /<main id="main-content"/);
assert.match(html, /<h1\b/);
assert.match(html, /Content-Security-Policy/);
assert.match(html, /<script defer src="assets\/carousel\.js"><\/script>\s*<script defer src="assets\/app\.js"><\/script>/);
assert.match(html, /<script defer src="assets\/catalog\.js"><\/script>/);
assert.match(html, /<script defer src="assets\/product-cards\.js"><\/script>/);
assert.match(html, /<link rel="stylesheet" href="assets\/tailwind\.css">/);
assert.match(html, /<link rel="stylesheet" href="assets\/styles\.css">/);
assert.doesNotMatch(html, /href="#"|\bonclick=|cdn\.tailwindcss\.com|<style\b/i);
assert.doesNotMatch(html, /<script(?![^>]*\bsrc=)/i);
assert.doesNotMatch(html, /type="module"|import\s+.*from\s+['"][^'"]+['"]/i);
assert.doesNotMatch(css, /@import|transition:\s*all/i);
assert.doesNotMatch(css, /\.rounded-full\s*\{\s*border-radius:\s*50%/i);
assert.match(css, /--brand-red:\s*#ea2127/);
assert.match(css, /--brand-red-dark:\s*#c81820/);
assert.match(css, /--brand-red-deep:\s*#941319/);
assert.match(css, /--brand-navy:\s*#2c2f75/);
assert.match(css, /--surface-brand-soft:\s*#ffe5e6/);
assert.doesNotMatch(css, /--surface-blue:/);
assert.doesNotMatch(css, /background(?:-color)?:\s*#(?:151b3b|121a2f|10172d)/i);
assert.match(css, /\.announcement-bar\s*\{[^}]*background:\s*var\(--brand-red-dark\)/s);
assert.match(css, /\.gateway-nav\s*\{[^}]*background:\s*var\(--brand-red-dark\)/s);
assert.match(css, /\.gateway-flyout\s*\{[^}]*background:\s*var\(--brand-red-dark\)/s);
assert.match(css, /\.product-card__media\s*\{[^}]*background:\s*var\(--brand-red\)/s);
assert.match(css, /\.site-footer\s*\{[^}]*background:\s*var\(--brand-red-deep\)/s);
assert.doesNotMatch(html, /section-shell--(?:ink|navy)|feature-panel--navy|deal-card--(?:ink|navy)|campaign-card--(?:ink|navy)|promo-card--navy|component-banner--navy|product-art--navy/);
assert.match(css, /--container-standard:\s*1600px/);
assert.match(css, /--container-wide:\s*1800px/);
assert.match(css, /--container:\s*var\(--container-standard\)/);
assert.match(css, /--page-gutter:\s*clamp\(16px,\s*1\.5vw,\s*24px\)/);
assert.doesNotMatch(css, /--container:\s*1440px/);
assert.match(
  css,
  /@media \(min-width:\s*1680px\)\s*\{\s*:root\s*\{[^}]*--container:\s*clamp\(\s*var\(--container-standard\),\s*calc\(83\.333333vw \+ 200px\),\s*var\(--container-wide\)\s*\)/s
);
assert.match(
  css,
  /\.page-container\s*\{[^}]*width:\s*min\(\s*calc\(100% - var\(--page-gutter\) - var\(--page-gutter\)\),\s*var\(--container\)\s*\)/s
);
assert.match(
  css,
  /\.mega-menu\s*\{[^}]*width:\s*min\(\s*calc\(100% - var\(--page-gutter\) - var\(--page-gutter\)\),\s*var\(--container\)\s*\)/s
);
assert.equal((css.match(/\.page-container\s*\{[^}]*\bwidth\s*:/g) || []).length, 1);
assert.match(agentRules, /## Responsive container system \(mandatory\)/);
assert.match(agentRules, /`--container-standard`, `--container-wide`, `--container`, `--page-gutter`, and `\.page-container`/);
assert.match(css, /--hover-lift-control:\s*1px/);
assert.match(css, /--hover-lift-button:\s*2px/);
assert.match(css, /--hover-lift-feature:\s*3px/);
assert.match(css, /--hover-lift-card:\s*5px/);
assert.match(css, /--hover-lift-clearance:\s*12px/);
assert.match(
  css,
  /\.hover-lift-safe-zone\s*\{[^}]*padding-block:\s*var\(--hover-lift-clearance\)[^}]*margin-block:\s*calc\(-1 \* var\(--hover-lift-clearance\)\)/s
);
assert.equal((html.match(/\bhover-lift-safe-zone\b/g) || []).length, 6);
const hoverRuleBlocks = css.match(/[^{}]*:hover[^{}]*\{[^{}]*\}/g) || [];
assert.doesNotMatch(hoverRuleBlocks.join('\n'), /translateY\(-\d+(?:\.\d+)?px\)/);
assert.match(agentRules, /## Hover lift safety \(mandatory\)/);
assert.doesNotMatch(appJs + carouselJs, /\.innerHTML\s*=/);
assert.doesNotMatch(catalogJs + productCardsJs, /\.innerHTML\s*=/);
assert.match(catalogJs, /presentation: Object\.freeze/);
assert.match(productCardsJs, /--product-image-scale/);
assert.match(productCardsJs, /product-card__image-surface/);
assert.match(productCardsJs, /product-card__media-accent/);
assert.match(productCardsJs, /'aria-hidden': 'true'/);
assert.match(productCardsJs, /for \(let index = 0; index < 5; index \+= 1\)/);
assert.match(productCardsJs, /'aria-label': `Đánh giá \$\{product\.rating\} trên 5 sao`/);
assert.match(productCardsJs, /attrs: \{ role: 'group', 'aria-label': 'Thông số nổi bật' \}/);
assert.doesNotMatch(productCardsJs, /product-card__category|product-card__rating-row|product-card__rating--empty|reviewCount|toFixed/);
assert.match(css, /--product-image-scale/);
assert.match(css, /\.product-card__media::before[^}]*z-index:\s*0/);
assert.match(css, /\.product-card__media-accent[^}]*z-index:\s*1/);
assert.match(css, /\.product-card__image-surface[^}]*z-index:\s*2/);
assert.match(css, /\.product-card__image[^}]*mix-blend-mode:\s*normal/);
assert.doesNotMatch(css, /\.product-card__image[^}]*mix-blend-mode:\s*multiply/);
assert.doesNotMatch(css, /\.product-card__image\s*\{[^}]*filter\s*:/);
assert.match(css, /\.product-card__meta\s*\{[^}]*flex-wrap:\s*wrap/);
assert.match(css, /\.product-card__sku\s*\{[^}]*margin-inline-start:\s*auto[^}]*background:\s*#f3f4f6/s);
assert.match(css, /\.product-card__old-price\s*\{[^}]*color:\s*var\(--muted\)/);
assert.match(css, /\.product-card__cart\s*\{[^}]*background:\s*var\(--brand-red-dark\)/);
assert.doesNotMatch(css, /\.product-card__category|\.product-card__rating-row|\.product-card__rating--empty/);
assert.match(css, /line-clamp:\s*2/);
assert.doesNotMatch(appJs, /\.append\([^;]+\)\.append\(/, 'Element.append() returns undefined and must not be chained');
assert.doesNotMatch(carouselJs, /setInterval|cloneNode/);
assert.match(carouselJs, /autoDelay = AUTO_SLIDE_DELAY/);
assert.ok(html.indexOf('id="hero"') < html.indexOf('id="stories"'), 'Gateway hero must be the first homepage section');
assert.match(html, /id="gatewayCarousel"[^>]*data-carousel-variant="gateway"[^>]*data-carousel-delay="6000"/);
assert.equal((html.match(/class="gateway-campaign(?:\s|"|$)/g) || []).length, 3);
assert.equal((html.match(/class="gateway-promo gateway-promo--/g) || []).length, 6);
assert.match(appJs, /const categoryTree = Object\.freeze\(\[/);
assert.equal((appJs.slice(appJs.indexOf('const categoryTree'), appJs.indexOf('const campaignSets')).match(/\{ id:/g) || []).length, 9);
assert.match(carouselJs, /const gateway = variant === 'gateway'/);
assert.match(carouselJs, /pause\('manual', manuallyPaused\)/);
assert.match(html, /data-carousel-variant="spotlight"[^>]*data-carousel-delay="5000"/);
assert.equal((html.match(/data-carousel-card-action/g) || []).length, 8);
assert.equal((html.match(/class="story-card__arrow"/g) || []).length, 8);
assert.equal((html.match(/<span>Khám phá<\/span><i class="fa-solid fa-arrow-right"/g) || []).length, 8);
assert.doesNotMatch(html, /class="story-card__arrow"[^>]*>\s*<i class="fa-solid fa-arrow-right"/);
assert.match(css, /\.story-card\.is-featured/);
assert.match(css, /\.story-track\s*\{[^}]*--story-card-block-size:\s*220px[^}]*block-size:\s*var\(--story-card-block-size\)/s);
assert.match(css, /\.story-card\s*\{[^}]*min-height:\s*0[^}]*block-size:\s*100%/s);
assert.match(css, /\.story-card__action\s*\{[^}]*min-height:\s*0[^}]*block-size:\s*100%/s);
assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*?\.story-track\s*\{\s*--story-card-block-size:\s*224px;\s*\}/);
assert.match(css, /\.story-card__action\s*\{[^}]*padding:\s*19px 19px 73px/);
assert.match(css, /\.story-card__arrow\s*\{[^}]*min-height:\s*44px[^}]*pointer-events:\s*none/s);
assert.match(css, /\.story-card__action:hover \.story-card__arrow,\s*\.story-card__action:focus-visible \.story-card__arrow\s*\{[^}]*opacity:\s*1/s);
assert.match(css, /\.is-spotlight-entering/);
assert.match(carouselJs, /syncSpotlightState/);
assert.match(carouselJs, /track\.append\(first\)/);
assert.match(carouselJs, /window\.HacomCarousel = Object\.freeze/);
assert.match(appJs, /window\.HacomCarousel\?\.initInfiniteCarousel/);
assert.match(carouselJs, /animationFrameId = window\.requestAnimationFrame/);
assert.match(carouselJs, /if \(completeTransition\) completeTransition\(\);\s*else finalize\(\);/);
assert.match(carouselJs, /let observedInlineSize = root\.getBoundingClientRect\(\)\.width/);
assert.match(carouselJs, /entry\.borderBoxSize\?\.\[0\]\?\.inlineSize \?\? entry\.contentRect\.width/);
assert.match(carouselJs, /if \(!hasMeaningfulInlineSizeChange\(observedInlineSize, nextInlineSize\)\) return/);
assert.match(carouselJs, /transform \$\{TRANSITION_DURATION\}ms var\(--ease\)/);
assert.match(carouselJs, /return deltaX > 0 \? 'previous' : 'next'/);
assert.match(carouselJs, /const moveNext[\s\S]*?setTransform\(-step, true\)[\s\S]*?track\.append\(first\)/);
assert.match(carouselJs, /controls\.previous\?\.addEventListener\('click', movePrevious\);\s*controls\.next\?\.addEventListener\('click', \(\) => moveNext\(\)\);/);
assert.match(css, /\[data-carousel-root\]\.is-animating \[data-carousel-track\]/);
assert.match(html, /<form id="newsletterForm"/);
const productRailSections = [...html.matchAll(/<section id="(recommendations|trending|accessories|final-picks)"[\s\S]*?<\/section>/g)];
assert.equal(productRailSections.length, 4);
for (const [sectionHtml, sectionId] of productRailSections) {
  assert.equal((sectionHtml.match(/class="product-card"/g) || []).length, 6, `${sectionId} must contain six product cards`);
}
assert.match(html, /<input id="mobileSearch"[^>]*type="search"/);
assert.match(html, /<input id="desktopSearch"[^>]*type="search"/);
assert.ok(existsSync('assets/tailwind.css'), 'Missing generated assets/tailwind.css');
assert.ok(existsSync('assets/media/products/manifest.json'), 'Missing HACOM product image manifest');
for (const asset of [
  'performance-main-960.webp', 'performance-main-1536.webp', 'performance-deal-420.webp', 'performance-deal-720.webp', 'performance-support-420.webp', 'performance-support-720.webp',
  'mobility-main-960.webp', 'mobility-main-1536.webp', 'mobility-ai-420.webp', 'mobility-ai-720.webp', 'mobility-accessories-420.webp', 'mobility-accessories-720.webp',
  'builder-main-960.webp', 'builder-main-1536.webp', 'builder-graphics-420.webp', 'builder-graphics-720.webp', 'builder-service-420.webp', 'builder-service-720.webp'
]) {
  const assetPath = `assets/media/gateway/${asset}`;
  assert.ok(existsSync(assetPath), `Missing gateway artwork: ${asset}`);
  assert.ok(statSync(assetPath).size > 10_000, `Gateway artwork is unexpectedly small: ${asset}`);
}
assert.match(agentRules, /## Mobile-first implementation \(mandatory\)/);
assert.match(agentRules, /`320px` viewport/);

console.log('Static HACOM checks passed.');
