import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const index = readFileSync('index.html', 'utf8');
const index2 = readFileSync('index-2.html', 'utf8');
const styles2 = readFileSync('assets/styles-2.css', 'utf8');
const atelierStyles = readFileSync('assets/prismatic-2.css', 'utf8');
const preservedCardStyles = readFileSync('assets/prism-gallery-2.css', 'utf8');
const experience2 = readFileSync('assets/experience-2.js', 'utf8');
const carousel2 = readFileSync('assets/carousel.js', 'utf8');
const appSource = readFileSync('assets/app.js', 'utf8');
const productCardSource = readFileSync('assets/product-cards.js', 'utf8');
const fixture = JSON.parse(readFileSync('docs/superpowers/fixtures/index-2-locked-contracts.json', 'utf8'));

const normalize = (value) => value.replace(/\s+/g, ' ').trim();
const lockedSection = (source, id) => {
  const start = source.indexOf(`<section id="${id}"`);
  const end = source.indexOf('</section>', start);
  return normalize(source.slice(start, end + '</section>'.length));
};
const lockedMenu = (source) => {
  const start = source.indexOf('<div id="megaMenu"');
  const end = source.indexOf('\n  </header>', start);
  return normalize(source.slice(start, end));
};
const productCardSignature = (source) => {
  const blocks = [];
  const rulePattern = /([^{}]+)\{([^{}]*)\}/g;
  let match;
  while ((match = rulePattern.exec(source))) {
    if (!match[1].includes('.product-card')) continue;
    const selector = match[1].replace(/body\[data-theme="[^"]+"\]/g, 'body[data-theme="THEME"]');
    blocks.push(`${normalize(selector)}{${normalize(match[2])}}`);
  }
  return createHash('sha256').update(blocks.join('\n')).digest('hex');
};

test('index-2 keeps its application CSS isolated while sharing assets', () => {
  assert.ok(existsSync('assets/tailwind-2.css'));
  assert.ok(existsSync('assets/styles-2.css'));
  assert.match(index2, /<link rel="stylesheet" href="assets\/tailwind-2\.css">/);
  assert.match(index2, /<link rel="stylesheet" href="assets\/styles-2\.css">/);
  assert.doesNotMatch(index2, /href="assets\/(?:tailwind|styles)\.css"/);
  assert.match(index2, /src="assets\/app\.js"/);
  assert.match(index2, /src="assets\/catalog\.js"/);
  assert.match(index2, /src="assets\/media\//);
  assert.match(index2, /href="index-2\.html"/);
  assert.match(index2, /data-theme="prismatic-atelier"/);
  assert.match(index2, /href="assets\/prismatic-2\.css"/);
  assert.match(index2, /src="assets\/experience-2\.js"/);
  assert.match(index2, /src="assets\/vendor\/gsap\/gsap\.min\.js"/);
  assert.match(index2, /src="assets\/vendor\/gsap\/ScrollTrigger\.min\.js"/);
  assert.doesNotMatch(index2, /prism-gallery/);
});

test('index-2 responsive catalog header exposes the tablet menu and content-first heading order', () => {
  const headerActionsStart = index2.indexOf('<div class="header-actions reference-header-actions">');
  const headerActionsEnd = index2.indexOf('</div>', headerActionsStart);
  const headerActions = index2.slice(headerActionsStart, headerActionsEnd);

  assert.ok(headerActionsStart >= 0 && headerActionsEnd > headerActionsStart);
  assert.equal((index2.match(/menu-trigger--tablet/g) || []).length, 1);
  assert.ok(headerActions.indexOf('reference-header-action--cart') < headerActions.indexOf('menu-trigger--tablet'));
  assert.match(headerActions, /menu-trigger--tablet[^>]*data-menu-toggle[^>]*aria-controls="megaMenu"[^>]*>\s*<i data-menu-icon/);

  for (const id of ['laptops', 'pc-gaming', 'displays', 'components', 'accessories']) {
    const sectionStart = index2.indexOf(`<section id="${id}"`);
    const sectionEnd = index2.indexOf('</section>', sectionStart);
    const section = index2.slice(sectionStart, sectionEnd);
    const headingStart = section.indexOf('section-head--catalog');
    const title = section.indexOf('<div><p class="eyebrow">', headingStart);
    const compactAction = section.indexOf('catalog-action--compact', headingStart);
    const submenu = section.indexOf('class="subcategory-menu"', headingStart);
    const desktopAction = section.indexOf('catalog-action--desktop', headingStart);
    const actionLabels = [...section.matchAll(/class="text-link catalog-action--(?:compact|desktop)"[^>]*>([\s\S]*?)<\/button>/g)]
      .map((match) => normalize(match[1].replace(/<[^>]+>/g, '')));

    assert.ok(title >= 0 && title < compactAction && compactAction < submenu && submenu < desktopAction, `${id} must order title, compact action, submenu, then desktop action`);
    assert.equal(actionLabels.length, 2, `${id} must expose compact and desktop actions`);
    assert.equal(actionLabels[0], actionLabels[1], `${id} CTA labels must stay in sync`);
    assert.equal((section.match(/data-demo-action class="text-link catalog-action--(?:compact|desktop)"/g) || []).length, 2);
    assert.equal((section.match(/fa-solid fa-arrow-right/g) || []).length >= 2, true, `${id} CTAs must retain the arrow icon`);
    assert.doesNotMatch(section, /class="collection-actions"/);
  }
});

test('index-2 featured categories keep the mobile view-all action beside the heading', () => {
  const sectionStart = index2.indexOf('<section id="categories"');
  const sectionEnd = index2.indexOf('</section>', sectionStart);
  const section = index2.slice(sectionStart, sectionEnd);
  const heading = section.match(/<div class="([^"]*category-spectrum__head[^"]*)">([\s\S]*?)<\/div>\s*<div class="category-spectrum__viewport"/) || [];

  assert.match(heading[1] || '', /\bsection-head--linked\b/);
  assert.ok((heading[2] || '').indexOf('<h2>Danh mục nổi bật</h2>') < (heading[2] || '').indexOf('category-spectrum__all'));
});

test('index-2 responsive CSS hides the redundant toolbar and preserves card corners', () => {
  assert.match(styles2, /\.menu-trigger--tablet\s*\{\s*display:\s*none;/);
  assert.match(styles2, /@media \(min-width:\s*768px\) and \(max-width:\s*1180px\)[\s\S]*?\.menu-trigger--tablet\s*\{[\s\S]*?display:\s*grid;[\s\S]*?width:\s*44px;[\s\S]*?min-height:\s*44px;/);
  assert.match(styles2, /@media \(min-width:\s*768px\) and \(max-width:\s*1180px\)[\s\S]*?\.reference-header-main\s*\{[\s\S]*?grid-template-columns:\s*clamp\(112px,\s*14vw,\s*140px\) minmax\(220px,\s*1fr\) max-content;/);
  assert.match(styles2, /@media \(max-width:\s*1180px\)[\s\S]*?\.gateway-mobile-toolbar\s*\{\s*display:\s*none;/);
  assert.match(styles2, /@media \(max-width:\s*1180px\)[\s\S]*?body\[data-theme="prismatic-atelier"\] \.site-header--reference\s*\{[\s\S]*?margin-bottom:\s*calc\(-1 \* var\(--reference-utility-height\)\);/);
  assert.match(styles2, /\.section-head--catalog\s*\{[\s\S]*?grid-template-areas:\s*'title action' 'submenu submenu';[\s\S]*?align-items:\s*center;/);
  assert.match(styles2, /\.section-head--catalog\s*>\s*\.text-link\s*\{[\s\S]*?grid-area:\s*action;[\s\S]*?align-self:\s*center;[\s\S]*?justify-self:\s*end;/);
  assert.match(styles2, /\.section-head--catalog\s*>\s*\.subcategory-menu\s*\{[\s\S]*?grid-area:\s*submenu;[\s\S]*?width:\s*100%;/);
  assert.match(styles2, /\.catalog-action--desktop\s*\{\s*display:\s*none;/);
  assert.match(styles2, /\.subcategory-menu\s*\{[\s\S]*?flex-wrap:\s*nowrap;[\s\S]*?overflow-x:\s*auto;/);
  assert.match(styles2, /@media \(min-width:\s*1181px\)[\s\S]*?\.section-head--catalog\s*\{[\s\S]*?grid-template-columns:\s*max-content minmax\(0, 1fr\) max-content;[\s\S]*?grid-template-areas:\s*'title submenu action';[\s\S]*?row-gap:\s*0;/);
  assert.match(styles2, /@media \(min-width:\s*1181px\)[\s\S]*?\.catalog-action--compact\s*\{\s*display:\s*none;[\s\S]*?\.catalog-action--desktop\s*\{[\s\S]*?display:\s*inline-flex;/);
  assert.match(styles2, /@media \(min-width:\s*1181px\)[\s\S]*?\.section-head--catalog\s*>\s*\.subcategory-menu\s*\{[\s\S]*?justify-content:\s*safe flex-end;/);
  assert.match(styles2, /@media \(min-width:\s*1181px\)[\s\S]*?\.section-head--catalog \.subcategory-menu__button\s*\{\s*border-radius:\s*var\(--radius-button\);/);
  assert.doesNotMatch(styles2, /#components \.subcategory-menu\s*\{\s*justify-content:/);
  assert.equal((styles2.match(/\.section-head--catalog \.subcategory-menu__button\s*\{\s*border-radius:\s*var\(--radius-button\);\s*\}/g) || []).length, 1);
  const catalogDesktopStart = styles2.indexOf('@media (min-width: 1181px)');
  const catalogTabletStart = styles2.indexOf('@media (max-width: 1180px)', catalogDesktopStart);
  const catalogMobileStart = styles2.indexOf('@media (max-width: 767.98px)', catalogTabletStart);
  const catalogTabletCss = styles2.slice(catalogTabletStart, catalogMobileStart);
  assert.doesNotMatch(catalogTabletCss, /justify-content:\s*safe flex-end/);
  assert.doesNotMatch(catalogTabletCss, /\.section-head--catalog \.subcategory-menu__button\s*\{\s*border-radius:\s*var\(--radius-button\)/);
  assert.match(styles2, /\.product-card\s*\{\s*overflow:\s*visible;[^}]*border-radius:\s*var\(--radius-card\)/);
  assert.match(styles2, /\.product-card__footer\s*\{[^}]*border-end-start-radius:\s*inherit;[^}]*border-end-end-radius:\s*inherit;/s);
});

test('index-2 deals render immediately without the duplicate banner reveal', () => {
  const dealsStart = index2.indexOf('<section id="deals"');
  const dealsEnd = index2.indexOf('</section>', dealsStart);
  const deals = index2.slice(dealsStart, dealsEnd);

  assert.doesNotMatch(deals, /data-v2-motion="banner"/);
  assert.match(appSource, /const isDealCollection = grid\.dataset\.collection === 'deals';/);
  assert.match(appSource, /loading: isDealCollection \? 'eager' : 'lazy'/);
  assert.match(appSource, /fetchPriority: isDealCollection \? 'low' : undefined/);
  assert.match(productCardSource, /fetchPriority = ''/);
  assert.match(productCardSource, /fetchpriority: fetchPriority/);
  assert.doesNotMatch(experience2, /data-v2-motion="banner"/);
  assert.doesNotMatch(experience2, /gsap\.to\('#deals \.section-head'/);
  assert.doesNotMatch(styles2, /\.deals-quantum\.is-deals-ready:not\(\.is-deals-visible\) \.section-head/);
  assert.doesNotMatch(styles2, /\.deals-quantum\.is-deals-ready:not\(\.is-deals-visible\) \.carousel-viewport/);
  assert.match(styles2, /\.deals-quantum__artwork[\s\S]*?transition-duration:\s*360ms/);
});

test('prismatic desktop header matches the cinematic reference contract', () => {
  const desktopHeader = atelierStyles.match(/\/\* Prismatic visual skin over the reference desktop header geometry\. \*\/\s*@media \(min-width: 1381px\)\s*\{([\s\S]*?)\n\}/)?.[1] || '';

  assert.match(styles2, /\.site-header--reference\s*\{[^}]*--reference-utility-height:\s*42px;[^}]*--reference-main-height:\s*94px/s);
  assert.match(desktopHeader, /--pa-header-transition:\s*120ms cubic-bezier\(\.2, 0, 0, 1\)/);
  assert.match(desktopHeader, /\.reference-main-shell\s*\{[\s\S]*?min-height:\s*var\(--reference-main-height\)/);
  assert.match(desktopHeader, /\.reference-main-shell\s*\{[\s\S]*?linear-gradient\(180deg, #0c142c 0%, #070e20 55%, #10182d 100%\)/);
  assert.match(desktopHeader, /\.reference-main-shell::after\s*\{[\s\S]*?48px 24px no-repeat[\s\S]*?160px 1px no-repeat/);
  assert.match(desktopHeader, /\.reference-header-main\s*\{[\s\S]*?min-height:\s*var\(--reference-main-height\)[\s\S]*?grid-template-columns:\s*var\(--gateway-nav-width\) repeat\(6, minmax\(0, 1fr\)\)[\s\S]*?gap:\s*14px/);
  assert.match(desktopHeader, /\.reference-header-main \.brand-lockup\s*\{[\s\S]*?grid-column:\s*1[\s\S]*?min-height:\s*66px[\s\S]*?justify-content:\s*center/);
  assert.match(desktopHeader, /\.reference-header-main \.brand-lockup img\s*\{[\s\S]*?height:\s*56px/);
  assert.match(desktopHeader, /\.reference-header-main \.header-search\s*\{[\s\S]*?grid-column:\s*2 \/ 6/);
  assert.match(desktopHeader, /\.reference-search-box\s*\{[\s\S]*?height:\s*62px[\s\S]*?min-height:\s*62px[\s\S]*?padding:\s*4px 5px 4px 0[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\) 72px[\s\S]*?border:\s*1px solid rgba\(137, 173, 221, \.76\)[\s\S]*?border-radius:\s*999px/);
  assert.match(desktopHeader, /\.reference-search-box::before\s*\{[\s\S]*?inset:\s*-2px[\s\S]*?filter:\s*blur\(6px\)/);
  assert.match(desktopHeader, /\.reference-search-box input\s*\{[\s\S]*?background-image:\s*url\("data:image\/svg\+xml,[\s\S]*?background-size:\s*20px[\s\S]*?font-size:\s*15px[\s\S]*?line-height:\s*1\.5/);
  assert.match(desktopHeader, /\.reference-search-box button\s*\{[\s\S]*?width:\s*72px[\s\S]*?height:\s*52px[\s\S]*?background:\s*linear-gradient\(145deg, #ee2737, #a51325\)[\s\S]*?font-size:\s*20px/);
  assert.match(desktopHeader, /\.reference-header-actions\s*\{[\s\S]*?grid-column:\s*6 \/ 8[\s\S]*?height:\s*62px[\s\S]*?display:\s*flex[\s\S]*?gap:\s*8px/);
  assert.match(desktopHeader, /\.reference-header-action\s*\{[\s\S]*?min-height:\s*62px[\s\S]*?height:\s*62px[\s\S]*?gap:\s*11px[\s\S]*?padding:\s*0 15px/);
  assert.match(desktopHeader, /\.reference-header-action--builder\s*\{[\s\S]*?border:\s*1px solid rgba\(86, 156, 218, \.58\)[\s\S]*?border-radius:\s*14px[\s\S]*?0 0 8px rgba\(50, 217, 255, \.09\)/);
  assert.match(desktopHeader, /\.reference-header-action--account,[\s\S]*?\.reference-header-action--cart\s*\{[\s\S]*?border:\s*0[\s\S]*?background:\s*transparent/);
  assert.match(desktopHeader, /\.reference-header-action--account::before,[\s\S]*?\.reference-header-action--cart::before\s*\{[\s\S]*?width:\s*1px/);
  assert.match(desktopHeader, /\.reference-header-action--account::after\s*\{[\s\S]*?border-right:\s*2px solid currentColor[\s\S]*?rotate\(45deg\)/);
  assert.match(desktopHeader, /\.reference-header-action--builder > i\s*\{[\s\S]*?font-size:\s*22px/);
  assert.match(desktopHeader, /\.reference-header-action--account > i\s*\{[\s\S]*?font-size:\s*30px/);
  assert.match(desktopHeader, /\.reference-header-action--cart \.reference-cart-icon > i\s*\{[\s\S]*?font-size:\s*26px/);
  assert.match(desktopHeader, /\.reference-header-action span small\s*\{[\s\S]*?font-size:\s*11px[\s\S]*?font-weight:\s*var\(--font-medium\)[\s\S]*?line-height:\s*1\.5/);
  assert.match(desktopHeader, /\.reference-header-action span strong\s*\{[\s\S]*?font-size:\s*12px[\s\S]*?font-weight:\s*var\(--font-semibold\)[\s\S]*?line-height:\s*1\.5/);
  assert.match(desktopHeader, /\.reference-header-action--cart span strong\s*\{[\s\S]*?font-size:\s*12px[\s\S]*?font-variant-numeric:\s*tabular-nums/);
  assert.match(desktopHeader, /\.reference-cart-icon b\s*\{[\s\S]*?width:\s*20px[\s\S]*?height:\s*20px[\s\S]*?border:\s*2px solid #fff[\s\S]*?background:\s*#ea2127[\s\S]*?font-size:\s*10px/);
  assert.match(desktopHeader, /\.reference-header-action:active\s*\{\s*scale:\s*\.96/);
  assert.match(desktopHeader, /\.reference-header-action:focus-visible,[\s\S]*?outline:\s*2px solid #32d9ff[\s\S]*?outline-offset:\s*2px/);
  assert.doesNotMatch(desktopHeader, /--pa-header-(?:main|search|action|logo)-height/);
  assert.doesNotMatch(desktopHeader, /grid-template-columns:\s*clamp\(205px, 12vw, 230px\)/);
  assert.doesNotMatch(desktopHeader, /\.reference-header-action span small\s*\{[^}]*font-size:\s*12px/s);
  assert.doesNotMatch(desktopHeader, /\.reference-header-action span strong\s*\{[^}]*font-size:\s*14px/s);
  assert.doesNotMatch(desktopHeader, /\.reference-header-action--cart span strong\s*\{[^}]*font-size:\s*15px/s);
  assert.doesNotMatch(desktopHeader, /:hover[^{}]*\{[^}]*translateY/);
  assert.match(atelierStyles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.reference-header-action:active\s*\{\s*scale:\s*1/);
});

test('index-2 removes the Quantum Deals promotion atrium section', () => {
  assert.doesNotMatch(index2, /<section class="header-promo-showcase"[\s\S]*?<\/section>/);
  assert.doesNotMatch(index2, /headerPromoTitle|header-promo-card/);
});

test('index-2 uses the content-first showroom directory contract', () => {
  const showroomStart = index2.indexOf('<section id="showroomNetwork"');
  const showroomEnd = index2.indexOf('</section>', showroomStart);
  const showroom = index2.slice(showroomStart, showroomEnd + '</section>'.length);
  const appSource = readFileSync('assets/app.js', 'utf8');

  assert.match(showroom, /class="showroom-directory" data-showroom-layout="directory"/);
  assert.match(showroom, /id="showroomNetworkTitle">HỆ THỐNG SHOWROOM HACOM<\/h2>/);
  assert.match(showroom, /id="showroomSearch"[^>]*data-showroom-search[^>]*aria-label="Tìm showroom HACOM"/);
  assert.match(showroom, /id="showroomSearchForm"[^>]*aria-label="Tìm showroom HACOM"/);
  assert.match(showroom, /id="showroomCards" class="showroom-directory__grid"/);
  assert.match(showroom, /id="showroomEmpty" class="showroom-directory__empty"/);
  assert.doesNotMatch(showroom, /HACOM STORES|Tìm chi nhánh gần bạn để xem máy, nhận hàng và được hỗ trợ trực tiếp\.|Tìm showroom HACOM<|showroomResultsStatus|showroom-directory__eyebrow|showroom-directory__lead|showroom-directory__meta/);
  assert.doesNotMatch(showroom, /showroom-portal|showroom-command|data-showroom-region|showroomToggle|21 điểm chạm|showroom-portal__media/);
  assert.match(appSource, /const isDirectory = layout === 'directory'/);
  assert.match(appSource, /const renderDirectoryCard = \(item, isMobile\)/);
  assert.match(appSource, /<details class="showroom-directory__card showroom-directory__card--mobile"/);
  assert.match(appSource, /showroom-directory__address/);
  assert.match(appSource, /showroom-directory__actions/);
  assert.match(appSource, /showroom-directory__details/);
  assert.match(appSource, /showroom-directory__detail/);
  assert.match(appSource, /phoneHref\(item\.warrantyPhone\)/);
  assert.match(appSource, /mailto:\$\{item\.email\}/);
  assert.match(appSource, /\(isDirectory \? \[mobileQuery\] : \[window\.matchMedia/);
  assert.match(styles2, /\.showroom-directory\s*\{/);
  assert.doesNotMatch(styles2, /showroom-portal|showroom-command|showroom-destination/);
  assert.match(atelierStyles, /\.showroom-directory\s*\{/);
  assert.match(atelierStyles, /showroom-directory h2[\s\S]*white-space:\s*nowrap/);
  assert.match(atelierStyles, /grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(atelierStyles, /grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(atelierStyles, /showroom-directory__address/);
  assert.match(atelierStyles, /showroom-directory__action--photo/);
  assert.match(atelierStyles, /showroom-directory__detail--time/);
  assert.match(atelierStyles, /min-height:\s*44px/);
  assert.doesNotMatch(atelierStyles, /showroom-directory-reveal|showroom-directory__[^}]*animation/);
  assert.match(atelierStyles, /--pa-footer-legal-start:\s*#101a31/);
  assert.match(atelierStyles, /--pa-footer-legal-end:\s*#162a4b/);
  assert.match(atelierStyles, /\.footer-legal\s*\{[\s\S]*background:\s*linear-gradient\(135deg,\s*var\(--pa-footer-legal-start\),\s*var\(--pa-footer-legal-end\)\)/);
  assert.match(atelierStyles, /\.footer-legal address p:first-child[\s\S]*color:\s*var\(--pa-ink-inverse\)/);
  assert.match(atelierStyles, /\.footer-legal address a\s*\{\s*color:\s*var\(--pa-cyan\)/);
});

test('index-2 keeps product collections and frozen submenu hooks while using the new gateway contract', () => {
  const getCollections = (source) => [...source.matchAll(/data-product-grid data-collection="([^"]+)"/g)].map((match) => match[1]);
  const getGateway = (source) => {
    const start = source.indexOf('<section id="hero" class="gateway-section');
    const end = source.indexOf('<section id="customerStories"', start);
    return start >= 0 && end > start ? source.slice(start, end) : '';
  };
  const getFrozenHooks = (source) => ['gatewayFlyout', 'gatewayFlyoutTitle', 'gatewayFlyoutContent'].map((id) => source.includes(`id="${id}"`));
  const gateway = getGateway(index2);

  assert.deepEqual(getCollections(index2), getCollections(index));
  assert.deepEqual(getFrozenHooks(index2), getFrozenHooks(index));
  assert.match(index2, /src="assets\/app\.js"/);
  assert.match(gateway, /id="gatewayFlyout"/);
  assert.match(gateway, /<div class="gateway-stage">[\s\S]*<section id="specialsMosaic"[\s\S]*<div id="gatewayFlyout"/);
  assert.doesNotMatch(gateway, /gateway-hero-slide|gateway-reference-tile|atelier-hero-copy|data-gateway-fixed-tile/);
  assert.match(index2, /<\/section>\s*<section id="customerStories"/);
});

test('version 2 category sections use the static three-banner showcase contract', () => {
  const sections = ['laptops', 'pc-gaming', 'displays', 'components', 'accessories'];
  const bannerAssets = Array.from({ length: 6 }, (_, index) => `assets/media/category-showcase-v2/category-showcase-0${index + 1}.webp`);

  for (const id of sections) {
    const start = index2.indexOf(`<section id="${id}"`);
    const end = index2.indexOf('</section>', start);
    assert.ok(start >= 0 && end > start, `missing category section: ${id}`);
    const section = index2.slice(start, end);

    assert.equal((section.match(/class="category-showcase__item"/g) || []).length, 3, `${id} must have 3 banners`);
    assert.equal((section.match(/class="subcategory-menu__button"/g) || []).length >= 7, true, `${id} must expose submenu buttons`);
    assert.equal((section.match(/data-demo-action class="subcategory-menu__button"/g) || []).length, (section.match(/class="subcategory-menu__button"/g) || []).length);
    assert.doesNotMatch(section, /href="/);
    assert.doesNotMatch(section, /data-carousel-(?:root|autoplay|track)/);
    for (const asset of [...section.matchAll(/src="([^"]*category-showcase-v2\/category-showcase-0[1-6]\.webp)"/g)].map((match) => match[1])) {
      assert.ok(bannerAssets.includes(asset), `unexpected showcase asset: ${asset}`);
    }
  }

  assert.match(styles2, /\.category-showcase\s*\{[\s\S]*?grid-auto-columns:\s*100%[\s\S]*?gap:\s*12px[\s\S]*?scroll-snap-type:\s*x mandatory/);
  assert.match(styles2, /@media \(min-width: 768px\) and \(max-width: 1023\.98px\)[\s\S]*?\.category-showcase\s*\{\s*grid-auto-columns:\s*calc\(\(100% - 12px\) \/ 2\)/);
  assert.match(styles2, /@media \(min-width: 1024px\)[\s\S]*?\.category-showcase\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)[\s\S]*?overflow:\s*visible/);
  assert.match(styles2, /\.category-showcase__item\s*\{[\s\S]*?aspect-ratio:\s*8 \/ 3/);
  assert.match(styles2, /\.subcategory-menu__button\s*\{[\s\S]*?min-height:\s*44px/);
  assert.match(experience2, /section\.dataset\.v2Motion === 'products'[\s\S]*?querySelectorAll\('\.category-showcase, \.section-head, \.product-card'\)/);

  for (const asset of bannerAssets) {
    assert.ok(existsSync(asset), `missing generated banner: ${asset}`);
    const bytes = readFileSync(asset);
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', `not a WebP asset: ${asset}`);
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', `not a WebP asset: ${asset}`);
    assert.ok(bytes.length <= 300000, `banner exceeds 300KB: ${asset}`);
  }
});

test('gateway layout lets Mosaic drive desktop height and preserves responsive menu collapse', () => {
  assert.match(styles2, /#hero \.gateway-shell\s*\{[\s\S]*?align-items:\s*stretch/);
  assert.match(styles2, /#hero \.gateway-nav\s*\{[\s\S]*?min-height:\s*0/);
  assert.match(styles2, /#hero \.gateway-category-list\s*\{[\s\S]*?repeat\(21,\s*minmax\(0,\s*1fr\)/);
  assert.match(styles2, /#hero #specialsMosaic\s*\{[\s\S]*?padding:\s*clamp\(12px, 1vw, 18px\)/);
  assert.match(styles2, /#hero #specialsMosaic \.specials-mosaic__composition\s*\{[\s\S]*?width:\s*100%/);
  assert.match(styles2, /@media \(max-width: 1180px\)[\s\S]*?#hero \.gateway-nav\s*\{\s*display:\s*none/);
  assert.match(styles2, /@media \(max-width: 767\.98px\)[\s\S]*?#hero #specialsMosaic/);
  assert.match(styles2, /var\(--hover-lift-card\)/);
  assert.match(styles2, /prefers-reduced-motion:\s*reduce/);
  assert.match(index2, /data-v2-motion="hero-mosaic"/);
  assert.match(readFileSync('assets/app.js', 'utf8'), /gatewayCarouselGroup/);
});

test('prismatic gateway menu matches the framed dark-state visual contract', () => {
  assert.match(atelierStyles, /#hero \.gateway-nav\s*\{[\s\S]*?--gateway-menu-row-bg:\s*linear-gradient\(100deg,[\s\S]*?--gateway-menu-row-active-border:\s*rgba\(50, 217, 255, \.72\)/);
  assert.match(atelierStyles, /#hero \.gateway-category-list\s*\{[\s\S]*?padding:\s*8px 12px[\s\S]*?gap:\s*1px/);
  assert.match(atelierStyles, /#hero \.gateway-category\s*\{[\s\S]*?grid-template-columns:\s*20px minmax\(0, 1fr\) 12px[\s\S]*?border:\s*1px solid var\(--gateway-menu-row-border\)[\s\S]*?border-radius:\s*6px[\s\S]*?font-size:\s*12px[\s\S]*?font-weight:\s*var\(--font-regular\)[\s\S]*?line-height:\s*1\.2[\s\S]*?120ms cubic-bezier\(\.2, 0, 0, 1\)/);
  assert.match(atelierStyles, /\.gateway-category \.menu-icon:first-child\s*\{[\s\S]*?width:\s*20px[\s\S]*?height:\s*min\(18px, calc\(100% - 2px\)\)[\s\S]*?border:\s*1px solid var\(--gateway-menu-icon-border\)[\s\S]*?border-radius:\s*5px[\s\S]*?font-size:\s*13px/);
  assert.match(atelierStyles, /\.gateway-category:hover,[\s\S]*?\.gateway-category:focus-visible\s*\{[\s\S]*?background:\s*var\(--gateway-menu-row-hover-bg\)/);
  assert.match(atelierStyles, /\.gateway-category\.is-active\s*\{[\s\S]*?background:\s*var\(--gateway-menu-row-active-bg\)[\s\S]*?font-weight:\s*var\(--font-semibold\)/);
  assert.match(atelierStyles, /\.gateway-category:focus-visible\s*\{[\s\S]*?outline:\s*2px solid var\(--gateway-menu-focus\)[\s\S]*?outline-offset:\s*-2px/);
  assert.doesNotMatch(atelierStyles, /\.gateway-category[^{}]*\{[^}]*translateY/);
});

test('prismatic gateway menu enlarges typography only on wide desktop', () => {
  const wideDesktop = atelierStyles.match(/@media \(min-width: 1600px\)\s*\{([\s\S]*?)\n\}/)?.[1] || '';
  assert.match(wideDesktop, /#hero \.gateway-category-list\s*\{[\s\S]*?min-height:\s*666px[\s\S]*?grid-template-rows:\s*repeat\(21, minmax\(30px, 1fr\)/);
  assert.match(wideDesktop, /#hero \.gateway-category\s*\{[\s\S]*?font-size:\s*14px[\s\S]*?line-height:\s*2/);
  assert.match(wideDesktop, /#hero \.gateway-stage,[\s\S]*?#hero #specialsMosaic,[\s\S]*?height:\s*100%/);
  assert.match(wideDesktop, /#hero #specialsMosaic \.specials-mosaic__portraits \.specials-mosaic__slot\s*\{[\s\S]*?aspect-ratio:\s*auto/);
  assert.match(atelierStyles, /#hero \.gateway-category\s*\{[\s\S]*?font-size:\s*12px[\s\S]*?line-height:\s*1\.2/);
  assert.match(atelierStyles, /@media \(min-width: 1600px\)/);
  assert.match(atelierStyles, /@media \(prefers-reduced-motion: reduce\)/);
});

test('prismatic atelier preserves the current locked sections and product-card CSS', () => {
  for (const [id, digest] of Object.entries({
    megaMenu: lockedMenu(index2),
    categories: lockedSection(index2, 'categories'),
    serviceGateway: lockedSection(index2, 'serviceGateway')
  })) {
    assert.equal(createHash('sha256').update(digest).digest('hex'), fixture[id], `locked contract changed: ${id}`);
  }
  assert.equal(productCardSignature(preservedCardStyles), fixture.productCardCss);
  assert.equal(productCardSignature(atelierStyles), fixture.productCardCss, 'product-card CSS declarations changed');
});

test('prismatic atelier customer stories use the compact editorial rail contract', () => {
  const customerStart = index2.indexOf('<section id="customerStories"');
  const dealsStart = index2.indexOf('<section id="deals"');
  const trendingStart = index2.indexOf('<section id="trending"', customerStart);
  assert.ok(dealsStart >= 0 && customerStart > dealsStart && trendingStart > customerStart, 'deals must sit before customer stories and customer stories must sit before trending');
  const customerSection = index2.slice(customerStart, trendingStart);
  const customerStylesStart = styles2.indexOf('.customer-stories {');
  const tabletStylesStart = styles2.indexOf('@media (min-width: 768px)', customerStylesStart);
  const desktopStylesStart = styles2.indexOf('@media (min-width: 1024px)', tabletStylesStart);
  const largeStylesStart = styles2.indexOf('@media (min-width: 1280px)', desktopStylesStart);
  const wideStylesStart = styles2.indexOf('@media (min-width: 1600px)', largeStylesStart);
  const reducedMotionStylesStart = styles2.indexOf('@media (prefers-reduced-motion: reduce)', wideStylesStart);
  const tabletStyles = styles2.slice(tabletStylesStart, desktopStylesStart);
  const desktopStyles = styles2.slice(desktopStylesStart, largeStylesStart);
  const largeStyles = styles2.slice(largeStylesStart, wideStylesStart);
  const wideStyles = styles2.slice(wideStylesStart, reducedMotionStylesStart);

  assert.equal((customerSection.match(/class="customer-runway__trust"/g) || []).length, 1);
  assert.equal((customerSection.match(/class="customer-runway__card"/g) || []).length, 16);
  assert.match(styles2, /\.customer-runway\s*\{[\s\S]*?--customer-visible-count:\s*1[\s\S]*?--customer-card-gap:\s*12px[\s\S]*?--customer-card-basis:\s*min\(88%, 300px\)[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(styles2, /\.customer-runway__card\s*\{[\s\S]*?width:\s*var\(--customer-card-basis\)[\s\S]*?flex:\s*0 0 var\(--customer-card-basis\)/);
  assert.match(styles2, /\.customer-runway__card\.is-featured[\s\S]*?transform:\s*none/);
  assert.match(styles2, /\.customer-runway__trust\s*\{[\s\S]*?container-type:\s*inline-size/);
  assert.match(styles2, /\.customer-runway__trust h2 strong\s*\{[\s\S]*?font-size:\s*clamp\(2\.25rem, 16cqi, 3rem\)[\s\S]*?white-space:\s*nowrap/);
  assert.match(styles2, /@container \(max-width: 270px\)[\s\S]*?\.customer-runway__trust-footer\s*\{[\s\S]*?flex-direction:\s*column/);
  assert.match(styles2, /\.customer-runway__controls button\s*\{[\s\S]*?width:\s*44px[\s\S]*?height:\s*44px/);

  assert.match(tabletStyles, /--customer-visible-count:\s*2[\s\S]*?--customer-card-basis:\s*calc\(\(100% - 12px\) \/ 2\)[\s\S]*?grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(tabletStyles, /\.customer-runway__trust\s*\{[\s\S]*?grid-column:\s*span 2[\s\S]*?\.customer-runway__gallery\s*\{[\s\S]*?grid-column:\s*span 2[\s\S]*?height:\s*100%/);
  assert.match(tabletStyles, /\.customer-runway__track\s*\{[\s\S]*?height:\s*100%[\s\S]*?padding:\s*0/);
  assert.match(tabletStyles, /\.customer-runway__card\s*\{[\s\S]*?height:\s*100%[\s\S]*?aspect-ratio:\s*auto/);
  assert.match(styles2, /\.customer-runway__card img\s*\{[\s\S]*?object-fit:\s*fill/);
  assert.match(desktopStyles, /--customer-visible-count:\s*3[\s\S]*?--customer-card-basis:\s*calc\(\(100% - 24px\) \/ 3\)[\s\S]*?min-height:\s*clamp\(360px, 21vw, 420px\)[\s\S]*?grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(desktopStyles, /\.customer-runway__trust\s*\{[\s\S]*?grid-column:\s*1[\s\S]*?\.customer-runway__gallery\s*\{[\s\S]*?grid-column:\s*2 \/ -1/);
  assert.match(largeStyles, /--customer-visible-count:\s*4[\s\S]*?--customer-card-basis:\s*calc\(\(100% - 36px\) \/ 4\)[\s\S]*?grid-template-columns:\s*repeat\(5, minmax\(0, 1fr\)\)/);
  assert.match(wideStyles, /--customer-visible-count:\s*5[\s\S]*?--customer-card-basis:\s*calc\(\(100% - 48px\) \/ 5\)[\s\S]*?grid-template-columns:\s*repeat\(6, minmax\(0, 1fr\)\)/);
  assert.match(styles2, /\.customer-runway__track\s*\{[\s\S]*?align-items:\s*center/);
  assert.doesNotMatch(styles2, /\.customer-runway\s*\{[^}]*min-height:\s*clamp\(480px, 31vw, 560px\)/);
  assert.doesNotMatch(styles2, /\.customer-runway__gallery\s*\{[^}]*height:\s*(?:clamp\(450px, 54vw, 560px\)|470px)/);
});

test('specials mosaic keeps the Evetech-inspired six-carousel contract isolated to index-2', () => {
  const heroStart = index2.indexOf('<section id="hero"');
  const mosaicStart = index2.indexOf('<section id="specialsMosaic"');
  const customerStart = index2.indexOf('<section id="customerStories"');
  const mosaicEnd = index2.indexOf('</section>', mosaicStart);
  const mosaic = index2.slice(mosaicStart, mosaicEnd + '</section>'.length);
  const expectedAssets = [
    'pulse-giveaway.avif',
    'intel-game-bundle.avif',
    'flash-deals.avif',
    'laptop-specials.avif',
    'gamesir-specials.avif',
    'uperfect-specials.avif',
    'app-only-deals.avif',
    '3d-printers.avif',
    'smart-watches.avif',
    'nvidia-gaming-pcs.avif',
    'amd-gaming-pcs.avif',
    'prebuilt-pc-deals.avif',
    'macbooks.avif',
    'intel-laptop-specials.avif',
    'ryzen-laptop-deals.avif'
  ];
  const manifest = JSON.parse(readFileSync('assets/media/evetech-specials/source-manifest.json', 'utf8'));

  assert.ok(heroStart < mosaicStart && mosaicStart < customerStart, 'mosaic must sit between hero and customer stories');
  assert.match(mosaic, /data-theme="prismatic-atelier"|data-tone="ink"/);
  assert.equal((mosaic.match(/data-carousel-root/g) || []).length, 6);
  assert.deepEqual(
    [...mosaic.matchAll(/data-carousel-delay="([0-9]+)"/g)].map((match) => Number(match[1])),
    [6200, 6800, 7400, 6500, 7100, 7700]
  );
  assert.deepEqual(
    [...mosaic.matchAll(/data-campaign-count="([23])"/g)].map((match) => Number(match[1])),
    [2, 2, 2, 3, 3, 3]
  );
  assert.equal((mosaic.match(/data-carousel-drag="all"/g) || []).length, 6);
  assert.equal((mosaic.match(/data-carousel-autoplay/g) || []).length, 0);
  assert.equal((mosaic.match(/specials-mosaic__pagination/g) || []).length, 0);
  assert.equal((mosaic.match(/data-carousel-toggle|data-carousel-indicators/g) || []).length, 0);
  assert.equal((mosaic.match(/data-carousel-card-action/g) || []).length, 15);
  assert.equal((mosaic.match(/data-demo-action/g) || []).length, 15);
  assert.equal((mosaic.match(/<img\b/g) || []).length, 15);
  assert.equal((mosaic.match(/width="300" height="562"/g) || []).length, 6);
  assert.equal((mosaic.match(/width="768" height="285"/g) || []).length, 9);
  assert.doesNotMatch(mosaic, /href="https?:\/\/(?:www\.)?evetech\.co\.za/);
  assert.doesNotMatch(mosaic, /https:\/\/img\.evetech\.co\.za/);
  assert.equal(readdirSync('assets/media/evetech-specials').filter((asset) => asset.endsWith('.avif')).sort().join('|'), expectedAssets.sort().join('|'));
  assert.equal(manifest.assets.length, 15);
  assert.equal(manifest.rightsConfirmedByUser, true);
  for (const asset of expectedAssets) {
    const bytes = readFileSync(`assets/media/evetech-specials/${asset}`);
    assert.equal(bytes.toString('ascii', 4, 12).startsWith('ftypavif'), true, `not an AVIF asset: ${asset}`);
  }
  assert.match(styles2, /#specialsMosaic[\s\S]*?grid-template-columns/);
  assert.match(styles2, /#specialsMosaic[\s\S]*?@media \(max-width: 767px\)/);
  assert.match(atelierStyles, /#specialsMosaic/);
  assert.match(carousel2, /carouselDrag/);
  assert.doesNotMatch(index, /specialsMosaic|evetech-specials/);
});

test('specials mosaic uses local HACOM-branded opening artwork without changing the carousel contract', () => {
  const hacomManifest = JSON.parse(readFileSync('assets/media/hacom-specials/manifest.json', 'utf8'));
  const expected = [
    ['hacom-pulse-giveaway.avif', 'portrait-01', 300, 562],
    ['hacom-flash-deals.avif', 'portrait-02', 300, 562],
    ['hacom-app-only-deals.avif', 'landscape-01', 768, 285]
  ];

  assert.equal(hacomManifest.assets.length, expected.length);
  for (const [local, slot, width, height] of expected) {
    const asset = hacomManifest.assets.find((item) => item.local === local);
    assert.ok(asset, `missing HACOM artwork manifest entry: ${local}`);
    assert.equal(asset.slot, slot);
    assert.equal(asset.width, width);
    assert.equal(asset.height, height);
    assert.ok(existsSync(`assets/media/hacom-specials/${local}`), `missing HACOM artwork: ${local}`);
    const bytes = readFileSync(`assets/media/hacom-specials/${local}`);
    assert.equal(bytes.toString('ascii', 4, 12).startsWith('ftypavif'), true, `not an AVIF asset: ${local}`);
    assert.match(index2, new RegExp(`src="assets/media/hacom-specials/${local}"`));
  }

  assert.equal((index2.match(/assets\/media\/hacom-specials\/hacom-[^" ]+\.avif/g) || []).length, 3);
  assert.doesNotMatch(index2, /src="assets\/media\/evetech-specials\/(?:pulse-giveaway|flash-deals|app-only-deals)\.avif"/);
  assert.doesNotMatch(index2, /aria-label="(?:Pulse Giveaway|Flash Deals|App Only Deals)"/);
  assert.match(hacomManifest.processing.notes, /Evetech marks are removed/);
});

test('prismatic atelier uses the dark titanium palette and local artwork contract', () => {
  for (const asset of [
    'assets/media/promo-atrium/promo-hero.webp',
    'assets/media/promo-atrium/promo-laptop.webp',
    'assets/media/promo-atrium/promo-pc.webp',
    'assets/media/promo-atrium/promo-display.webp',
    'assets/media/promo-atrium/promo-gear.webp',
    'assets/vendor/gsap/gsap.min.js',
    'assets/vendor/gsap/ScrollTrigger.min.js'
  ]) assert.ok(existsSync(asset), `missing Prismatic Atelier runtime asset: ${asset}`);
  assert.match(atelierStyles, /--pa-obsidian:\s*#050713/);
  assert.match(atelierStyles, /--pa-deep-navy:\s*#091126/);
  assert.match(atelierStyles, /--pa-cyan:\s*#32d9ff/);
  assert.match(atelierStyles, /--pa-violet:\s*#7c5cff/);
  assert.match(atelierStyles, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(atelierStyles, /#categories\s|#serviceGateway\s|\.mega-menu\s|\.gateway-flyout\s/);
  assert.doesNotMatch(index, /prism-gallery|prism-gallery-2|experience-2|vendor\/gsap/);
});

test('prismatic atelier motion uses GSAP matchMedia and ScrollTrigger without hiding content by default', () => {
  assert.match(experience2, /registerPlugin\(global\.ScrollTrigger\)/);
  assert.match(experience2, /global\.gsap\.matchMedia/);
  assert.match(experience2, /ScrollTrigger\.refresh/);
  assert.match(experience2, /prefers-reduced-motion/);
  assert.match(experience2, /prismatic-atelier/);
  assert.match(experience2, /section\.id === 'customerStories'[\s\S]*?querySelectorAll\('\.customer-runway'\)/);
  assert.match(experience2, /\.\.\.\(isCustomerStories \? \{\} : \{ autoAlpha: 0 \}\)/);
  assert.doesNotMatch(experience2, /querySelectorAll\('\.section-head, \.customer-runway__gallery, \.carousel-viewport'\)/);
  assert.doesNotMatch(experience2, /display\s*:\s*none|visibility\s*:\s*hidden/);
});

test('index-2 prioritizes opening mosaic artwork without eagerly loading hidden slides', () => {
  const activeSlides = [...index2.matchAll(/<article class="specials-mosaic__slide is-gateway-active">([\s\S]*?)<\/article>/g)];
  assert.equal(activeSlides.length, 6);
  for (const [, slide] of activeSlides) assert.match(slide, /<img[^>]*loading="eager"[^>]*decoding="async"/);
  assert.match(index2, /hacom-app-only-deals\.avif"[^>]*loading="eager"[^>]*fetchpriority="high"/);
  assert.match(index2, /intel-game-bundle\.avif"[^>]*loading="lazy"/);
  assert.match(index2, /smart-watches\.avif"[^>]*loading="lazy"/);
});

test('index-2 product tabs expose linked panels and keyboard navigation', () => {
  assert.match(index2, /id="trendingTab"[^>]*data-collection-tab="trending"[^>]*aria-controls="trendingPanel"[^>]*tabindex="0"/);
  assert.match(index2, /id="newArrivalsTab"[^>]*data-collection-tab="new-arrivals"[^>]*aria-controls="newArrivalsPanel"[^>]*tabindex="-1"/);
  assert.match(index2, /id="trendingPanel"[^>]*role="tabpanel"[^>]*aria-labelledby="trendingTab"/);
  assert.match(index2, /id="newArrivalsPanel"[^>]*role="tabpanel"[^>]*aria-labelledby="newArrivalsTab"[^>]*hidden/);
  assert.match(experience2, /initCollectionTabsAccessibility/);
  assert.match(experience2, /ArrowLeft|ArrowRight/);
  assert.match(experience2, /Home|End/);
  assert.match(experience2, /tab\.setAttribute\('tabindex', active \? '0' : '-1'\)/);
});

test('index-2 mobile search input preserves a 44px interactive height', () => {
  assert.match(atelierStyles, /@media \(max-width: 767\.98px\)[\s\S]*?\.mobile-header \.search-input-box input\s*\{[^}]*min-height:\s*44px/s);
});

test('index-2 closes deterministic Lighthouse accessibility and image-fit gaps', () => {
  assert.match(index2, /<meta name="description" content="[^"]+">/);
  assert.match(index2, /<strong>Dựng cấu hình<\/strong>\s+<small>PC theo nhu cầu<\/small>/);
  assert.match(atelierStyles, /#customerStories \.customer-runway__card img\s*\{[^}]*object-fit:\s*cover/s);
  assert.match(styles2, /\.product-card__review-count\s*\{[^}]*color:\s*#526079/s);
  assert.match(atelierStyles, /\.site-footer \.showroom-directory__index\s*\{[^}]*background:\s*var\(--pa-red-deep\)[^}]*color:\s*#fff/s);
  assert.match(atelierStyles, /@media \(max-width: 767\.98px\)[\s\S]*?\.mobile-header \.search-input-box input\s*\{[^}]*color:\s*var\(--pa-ink\)/s);
  assert.match(index2, /aria-label="Thêm tuỳ chọn"[^>]*>[\s\S]*?<span>Thêm<\/span>/);
});
