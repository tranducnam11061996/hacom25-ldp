const AUTO_SLIDE_DELAY = 3000;

const TRANSITION_DURATION = 400;
const INLINE_SIZE_EPSILON = 1;
const DRAG_THRESHOLD_RATIO = 0.2;
const FLICK_VELOCITY = 0.35;
const MIN_FLICK_DISTANCE = 12;

function canCycle({ itemCount, trackWidth, viewportWidth }) {
  return itemCount > 1 && trackWidth > viewportWidth + 1;
}

function hasMeaningfulInlineSizeChange(previousWidth, nextWidth) {
  return Math.abs(nextWidth - previousWidth) > INLINE_SIZE_EPSILON;
}

function getSwipeAction({ deltaX, elapsedMs, stepPx }) {
  const distance = Math.abs(deltaX);
  const elapsed = Math.max(1, elapsedMs);
  const velocity = distance / elapsed;
  const crossesThreshold = distance >= stepPx * DRAG_THRESHOLD_RATIO;
  const isFlick = distance >= MIN_FLICK_DISTANCE && velocity >= FLICK_VELOCITY;

  if (!crossesThreshold && !isFlick) return 'snap';
  return deltaX > 0 ? 'previous' : 'next';
}

function getCarouselLabel(root) {
  const heading = root.closest('section')?.querySelector('h2, h3');
  return root.getAttribute('aria-label') || heading?.textContent?.trim() || 'Băng chuyền sản phẩm';
}

function getTransitionStep(element, gap) {
  return element.getBoundingClientRect().width + gap;
}

function getCarouselConfig(root, { autoDelay = AUTO_SLIDE_DELAY } = {}) {
  const fallbackDelay = Number.isFinite(autoDelay) && autoDelay > 0 ? autoDelay : AUTO_SLIDE_DELAY;
  const datasetDelay = Number(root?.dataset?.carouselDelay);

  return {
    autoDelay: Number.isFinite(datasetDelay) && datasetDelay > 0 ? datasetDelay : fallbackDelay,
    variant: root?.dataset?.carouselVariant || 'default'
  };
}

function getControls(root) {
  const scope = root.closest('section') || root.parentElement;
  return {
    previous: root.querySelector('[data-carousel-prev]') || scope?.querySelector('[data-carousel-prev]'),
    next: root.querySelector('[data-carousel-next]') || scope?.querySelector('[data-carousel-next]'),
    indicators: root.querySelector('[data-carousel-indicators]'),
    toggle: root.querySelector('[data-carousel-toggle]') || scope?.querySelector('[data-carousel-toggle]'),
    status: root.querySelector('[data-carousel-status]') || scope?.querySelector('[data-carousel-status]')
  };
}

function initInfiniteCarousel(root, options = {}) {
  const track = root.querySelector('[data-carousel-track]');
  if (!track || track.children.length < 2) return null;

  const { autoDelay, variant } = getCarouselConfig(root, options);
  const spotlight = variant === 'spotlight';
  const gateway = variant === 'gateway';
  const controls = getControls(root);
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pauseReasons = new Set();
  let phase = 'idle';
  let timerId = null;
  let completeTransition = null;
  let animationFrameId = null;
  let drag = null;
  let suppressClick = false;
  let manuallyPaused = false;
  let indicatorButtons = [];
  let observedInlineSize = root.getBoundingClientRect().width;

  const originalItems = [...track.children];
  originalItems.forEach((item, index) => {
    item.dataset.carouselIndex = String(index);
    item.setAttribute('aria-setsize', String(originalItems.length));
  });

  root.setAttribute('role', 'region');
  root.setAttribute('aria-roledescription', 'carousel');
  root.setAttribute('aria-label', getCarouselLabel(root));
  track.setAttribute('aria-live', 'off');

  const getItems = () => [...track.children];
  const getGap = () => Number.parseFloat(window.getComputedStyle(track).gap) || 0;
  const syncSpotlightState = () => {
    if (!spotlight) return;
    getItems().forEach((item, index) => {
      const active = index === 0;
      item.classList.toggle('is-featured', active);
      item.classList.remove('is-spotlight-entering', 'is-spotlight-exiting');
      const action = item.querySelector('[data-carousel-card-action]');
      if (!action) return;
      if (active) action.setAttribute('aria-current', 'true');
      else action.removeAttribute('aria-current');
    });
  };
  const syncGatewayState = () => {
    if (!gateway) return;
    getItems().forEach((item, index) => {
      const active = index === 0;
      item.classList.toggle('is-gateway-active', active);
      item.classList.remove('is-gateway-entering', 'is-gateway-exiting');
      item.setAttribute('aria-hidden', String(!active));
      item.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach((control) => {
        if (active) control.removeAttribute('tabindex');
        else control.setAttribute('tabindex', '-1');
      });
    });
  };
  const prepareSpotlightTransition = (incoming, outgoing) => {
    if (!spotlight || !incoming || !outgoing) return;
    incoming.getBoundingClientRect();
    incoming.classList.add('is-spotlight-entering');
    outgoing.classList.add('is-spotlight-exiting');
  };
  const prepareGatewayTransition = (incoming, outgoing) => {
    if (!gateway || !incoming || !outgoing) return;
    incoming.classList.add('is-gateway-entering');
    outgoing.classList.add('is-gateway-exiting');
  };
  const prepareVariantTransition = (incoming, outgoing) => {
    prepareSpotlightTransition(incoming, outgoing);
    prepareGatewayTransition(incoming, outgoing);
  };
  const syncVariantState = () => {
    syncSpotlightState();
    syncGatewayState();
  };
  const isCyclePossible = () => canCycle({
    itemCount: track.children.length,
    trackWidth: track.scrollWidth,
    viewportWidth: root.clientWidth
  });
  const setTransform = (offset, animate = false) => {
    track.style.transition = animate && !motionQuery.matches
      ? `transform ${TRANSITION_DURATION}ms var(--ease)`
      : 'none';
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  };
  const setPhase = (nextPhase) => {
    phase = nextPhase;
    root.classList.toggle('is-dragging', nextPhase === 'dragging');
    root.classList.toggle('is-animating', nextPhase === 'animating');
  };
  const clearSchedule = () => {
    if (timerId !== null) window.clearTimeout(timerId);
    timerId = null;
  };
  const updateItemPositions = () => {
    getItems().forEach((item, position) => item.setAttribute('aria-posinset', String(position + 1)));
  };
  const updateIndicators = () => {
    const activeIndex = Number(track.firstElementChild?.dataset.carouselIndex || 0);
    indicatorButtons.forEach((button, index) => {
      const active = index === activeIndex;
      button.classList.toggle('active', active);
      button.setAttribute('aria-current', active ? 'true' : 'false');
    });
    if (controls.status) {
      controls.status.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(originalItems.length).padStart(2, '0')}`;
    }
  };
  const updateToggle = () => {
    if (!controls.toggle) return;
    const reducedMotion = motionQuery.matches;
    controls.toggle.disabled = reducedMotion;
    controls.toggle.setAttribute('aria-disabled', String(reducedMotion));
    controls.toggle.setAttribute('aria-pressed', String(manuallyPaused));
    controls.toggle.setAttribute('aria-label', reducedMotion
      ? 'Tự động chuyển đã tắt do cài đặt giảm chuyển động'
      : manuallyPaused ? 'Tiếp tục tự động chuyển' : 'Tạm dừng tự động chuyển');
    const icon = controls.toggle.querySelector('i');
    if (icon) icon.className = `fa-solid ${manuallyPaused ? 'fa-play' : 'fa-pause'}`;
  };
  const updateControls = () => {
    const enabled = isCyclePossible();
    [controls.previous, controls.next].filter(Boolean).forEach((button) => {
      button.disabled = !enabled;
      button.setAttribute('aria-disabled', String(!enabled));
    });
    if (controls.indicators) controls.indicators.hidden = !enabled;
    updateToggle();
  };
  const schedule = () => {
    clearSchedule();
    if (phase !== 'idle' || motionQuery.matches || pauseReasons.size > 0 || !isCyclePossible()) return;
    timerId = window.setTimeout(() => moveNext({ restartTimer: true }), autoDelay);
  };
  const pause = (reason, shouldPause) => {
    if (shouldPause) pauseReasons.add(reason);
    else pauseReasons.delete(reason);
    if (pauseReasons.size > 0) clearSchedule();
    else schedule();
  };
  const finalize = () => {
    if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    completeTransition = null;
    setTransform(0, false);
    setPhase('idle');
    syncVariantState();
    updateItemPositions();
    updateIndicators();
    updateControls();
    schedule();
  };
  const awaitTransition = (callback) => {
    if (motionQuery.matches) {
      callback();
      return;
    }
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(fallbackId);
      track.removeEventListener('transitionend', onTransitionEnd);
      callback();
    };
    const onTransitionEnd = (event) => {
      if (event.target === track && event.propertyName === 'transform') finish();
    };
    const fallbackId = window.setTimeout(finish, TRANSITION_DURATION + 100);
    completeTransition = finish;
    track.addEventListener('transitionend', onTransitionEnd);
  };
  const rotateForwardInstantly = (count) => {
    for (let index = 0; index < count; index += 1) track.append(track.firstElementChild);
  };
  const rotateBackwardInstantly = (count) => {
    for (let index = 0; index < count; index += 1) track.prepend(track.lastElementChild);
  };
  const moveNext = ({ restartTimer = false } = {}) => {
    if (phase !== 'idle' || !isCyclePossible()) return;
    clearSchedule();
    const first = track.firstElementChild;
    const step = getTransitionStep(first, getGap());
    prepareVariantTransition(first.nextElementSibling, first);
    setPhase('animating');
    setTransform(-step, true);
    awaitTransition(() => {
      track.append(first);
      finalize();
    });
    if (restartTimer) return;
  };
  const movePrevious = () => {
    if (phase !== 'idle' || !isCyclePossible()) return;
    clearSchedule();
    const previous = track.lastElementChild;
    const outgoing = track.firstElementChild;
    const step = getTransitionStep(previous, getGap());
    track.prepend(previous);
    setTransform(-step, false);
    prepareVariantTransition(previous, outgoing);
    setPhase('animating');
    animationFrameId = window.requestAnimationFrame(() => {
      animationFrameId = null;
      setTransform(0, true);
      awaitTransition(finalize);
    });
  };
  const moveToIndex = (targetIndex) => {
    const items = getItems();
    const currentIndex = Number(items[0]?.dataset.carouselIndex);
    if (currentIndex === targetIndex || phase !== 'idle' || !isCyclePossible()) return;

    const forwardSteps = items.findIndex((item) => Number(item.dataset.carouselIndex) === targetIndex);
    const backwardSteps = items.length - forwardSteps;
    if (forwardSteps <= backwardSteps) {
      rotateForwardInstantly(Math.max(0, forwardSteps - 1));
      syncVariantState();
      moveNext();
    } else {
      rotateBackwardInstantly(Math.max(0, backwardSteps - 1));
      syncVariantState();
      movePrevious();
    }
  };
  const cancelDrag = () => {
    if (!drag) return;
    track.append(drag.prependedItem);
    drag = null;
    setTransform(0, false);
    setPhase('idle');
    syncVariantState();
    updateItemPositions();
    updateIndicators();
    updateControls();
    schedule();
  };
  const commitDrag = (action) => {
    if (!drag) return;
    const currentDrag = drag;
    const finishDrag = () => {
      drag = null;
      finalize();
    };

    if (action === 'previous') {
      prepareVariantTransition(track.firstElementChild, track.children[1]);
      setPhase('animating');
      setTransform(0, true);
      awaitTransition(finishDrag);
      return;
    }
    if (action === 'next') {
      prepareVariantTransition(track.children[2], track.children[1]);
      setPhase('animating');
      setTransform(-(currentDrag.previousStep + currentDrag.currentStep), true);
      awaitTransition(() => {
        track.append(track.firstElementChild);
        track.append(track.firstElementChild);
        finishDrag();
      });
      return;
    }
    cancelDrag();
  };
  const beginDrag = (event) => {
    if (phase !== 'idle' || !isCyclePossible()) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const interactiveTarget = event.target.closest('button, a, input, textarea, select');
    if (interactiveTarget && !interactiveTarget.matches('[data-carousel-card-action]')) return;

    clearSchedule();
    const prependedItem = track.lastElementChild;
    const previousStep = getTransitionStep(prependedItem, getGap());
    track.prepend(prependedItem);
    const currentItem = track.children[1];
    drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startTime: performance.now(),
      previousStep,
      currentStep: getTransitionStep(currentItem, getGap()),
      prependedItem
    };
    setTransform(-previousStep, false);
    setPhase('dragging');
    root.setPointerCapture?.(event.pointerId);
  };
  const dragMove = (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const delta = event.clientX - drag.startX;
    const boundedDelta = Math.max(-drag.currentStep, Math.min(drag.previousStep, delta));
    if (Math.abs(delta) > 8) suppressClick = true;
    setTransform(-drag.previousStep + boundedDelta, false);
  };
  const endDrag = (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const action = getSwipeAction({
      deltaX,
      elapsedMs: performance.now() - drag.startTime,
      stepPx: deltaX > 0 ? drag.previousStep : drag.currentStep
    });
    commitDrag(action);
  };

  if (controls.indicators) {
    const fragment = document.createDocumentFragment();
    indicatorButtons = originalItems.map((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'indicator-dot';
      button.setAttribute('aria-label', `Đi đến mục ${index + 1}`);
      button.addEventListener('click', () => moveToIndex(Number(item.dataset.carouselIndex)));
      fragment.append(button);
      return button;
    });
    controls.indicators.replaceChildren(fragment);
  }

  controls.previous?.addEventListener('click', movePrevious);
  controls.next?.addEventListener('click', () => moveNext());
  controls.toggle?.addEventListener('click', () => {
    if (motionQuery.matches) return;
    manuallyPaused = !manuallyPaused;
    pause('manual', manuallyPaused);
    updateToggle();
  });
  [controls.previous, controls.next, controls.toggle].filter(Boolean).forEach((control) => {
    control.addEventListener('focus', () => pause('control-focus', true));
    control.addEventListener('blur', () => pause('control-focus', false));
  });
  root.addEventListener('pointerenter', () => pause('hover', true));
  root.addEventListener('pointerleave', () => pause('hover', false));
  root.addEventListener('focusin', () => pause('focus', true));
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget)) pause('focus', false);
  });
  root.addEventListener('pointerdown', beginDrag);
  root.addEventListener('pointermove', dragMove);
  root.addEventListener('pointerup', endDrag);
  root.addEventListener('pointercancel', cancelDrag);
  root.addEventListener('click', (event) => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  }, true);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && phase === 'dragging') cancelDrag();
    if (document.hidden && phase === 'animating') {
      if (completeTransition) completeTransition();
      else finalize();
    }
    pause('hidden-tab', document.hidden);
  });
  motionQuery.addEventListener('change', (event) => {
    pause('reduced-motion', event.matches);
    updateToggle();
  });

  const resizeObserver = new ResizeObserver(([entry]) => {
    const nextInlineSize = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
    if (!hasMeaningfulInlineSizeChange(observedInlineSize, nextInlineSize)) return;

    observedInlineSize = nextInlineSize;
    if (phase === 'dragging') cancelDrag();
    else if (phase === 'animating') {
      if (completeTransition) completeTransition();
      else finalize();
    }
    setTransform(0, false);
    updateControls();
    updateIndicators();
    schedule();
  });
  resizeObserver.observe(root);

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    pause('out-of-view', !entry.isIntersecting);
  }, { threshold: 0.1 });
  intersectionObserver.observe(root);

  pause('reduced-motion', motionQuery.matches);
  pause('hidden-tab', document.hidden);
  syncVariantState();
  updateItemPositions();
  updateIndicators();
  updateControls();
  schedule();

  return {
    pause,
    moveNext,
    movePrevious,
    destroy() {
      clearSchedule();
      if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      completeTransition?.();
      setTransform(0, false);
    }
  };
}

window.HacomCarousel = Object.freeze({
  AUTO_SLIDE_DELAY,
  canCycle,
  getCarouselConfig,
  getSwipeAction,
  hasMeaningfulInlineSizeChange,
  initInfiniteCarousel
});
