(function initializePrismaticAtelierExperience(global) {
  'use strict';

  const initCollectionTabsAccessibility = (root) => {
    root.querySelectorAll('.section-tabs[role="tablist"]').forEach((tabList) => {
      const tabs = Array.from(tabList.querySelectorAll('[role="tab"][data-collection-tab]'));
      if (!tabs.length) return;

      const sync = (activeTab, focus = false) => {
        tabs.forEach((tab) => {
          const active = tab === activeTab;
          const panelId = tab.getAttribute('aria-controls');
          const panel = panelId ? root.querySelector(`#${panelId}`) : null;
          tab.setAttribute('aria-selected', String(active));
          tab.setAttribute('tabindex', active ? '0' : '-1');
          if (panel) panel.hidden = !active;
        });
        if (focus) activeTab.focus();
      };

      tabs.forEach((tab) => {
        tab.addEventListener('click', () => sync(tab));
        tab.addEventListener('keydown', (event) => {
          const currentIndex = tabs.indexOf(tab);
          let nextIndex = currentIndex;
          if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          else if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
          else if (event.key === 'Home') nextIndex = 0;
          else if (event.key === 'End') nextIndex = tabs.length - 1;
          else return;

          event.preventDefault();
          const nextTab = tabs[nextIndex];
          nextTab.click();
          sync(nextTab, true);
        });
      });

      sync(tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
    });
  };

  const boot = () => {
    const root = document.body;
    if (!root || root.dataset.theme !== 'prismatic-atelier') return;

    initCollectionTabsAccessibility(root);

    const customerTrack = root.querySelector('.customer-runway__track');
    if (customerTrack) customerTrack.setAttribute('role', 'list');
    root.querySelectorAll('.customer-runway__card').forEach((card) => card.setAttribute('role', 'listitem'));
    if (!global.gsap || !global.ScrollTrigger) return;

    global.gsap.registerPlugin(global.ScrollTrigger);
    const media = global.gsap.matchMedia(root);
    const reducedMotion = '(prefers-reduced-motion: reduce)';

    const refresh = () => global.requestAnimationFrame(() => global.ScrollTrigger.refresh());

    media.add({
      desktop: '(min-width: 1181px)',
      tablet: '(min-width: 768px) and (max-width: 1180px)',
      mobile: '(max-width: 767px)',
      reduceMotion: reducedMotion
    }, (context) => {
      const { reduceMotion } = context.conditions;
      const hero = root.querySelector('#hero');
      const mosaic = root.querySelector('#hero #specialsMosaic');
      const mosaicSlots = root.querySelectorAll('#hero #specialsMosaic .specials-mosaic__slot');
      const sections = global.gsap.utils.toArray('[data-v2-motion="reveal"], [data-v2-motion="products"]');

      if (reduceMotion) {
        root.classList.add('atelier-motion-reduced');
        return () => root.classList.remove('atelier-motion-reduced');
      }

      root.classList.add('atelier-motion-ready');

      if (hero) {
        const intro = global.gsap.timeline({ defaults: { ease: 'power3.out' } });
        intro
          .from('.reference-main-shell', { y: -16, autoAlpha: 0, duration: .55 })
          .from(mosaic, { y: 22, autoAlpha: 0, duration: .72 }, '-=.28')
          .from(mosaicSlots, { y: 14, autoAlpha: 0, duration: .48, stagger: .06 }, '-=.42')
          .from('#hero .gateway-nav', { y: 18, autoAlpha: 0, duration: .48 }, '-=.25');
      }

      sections.forEach((section) => {
        const isCustomerStories = section.id === 'customerStories';
        const targets = isCustomerStories
          ? section.querySelectorAll('.customer-runway')
          : section.dataset.v2Motion === 'products'
            ? section.querySelectorAll('.category-showcase, .section-head, .product-card')
            : section.querySelectorAll('.section-head, .carousel-viewport');
        if (!targets.length) return;

        global.gsap.from(targets, {
          y: 22,
          ...(isCustomerStories ? {} : { autoAlpha: 0 }),
          duration: .62,
          ease: 'power2.out',
          stagger: section.dataset.v2Motion === 'products' ? .045 : .08,
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true
          }
        });
      });

      const onLoad = () => refresh();
      global.addEventListener('load', onLoad, { once: true });
      refresh();

      return () => {
        global.removeEventListener('load', onLoad);
        root.classList.remove('atelier-motion-ready');
      };
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})(window);
