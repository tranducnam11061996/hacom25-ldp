(function initializePrismaticAtelierExperience(global) {
  'use strict';

  const boot = () => {
    const root = document.body;
    if (!root || root.dataset.theme !== 'prismatic-atelier') return;

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
