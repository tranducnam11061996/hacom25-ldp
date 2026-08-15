const categoryTree = Object.freeze([
  { id: 'laptops', name: 'Laptop', icon: 'fa-solid fa-laptop', groups: [
    ['Theo nhu cầu', ['Laptop gaming', 'Laptop văn phòng', 'Laptop đồ hoạ', 'Laptop AI']],
    ['Theo thương hiệu', ['ASUS', 'Lenovo', 'MSI', 'HP', 'Acer']],
    ['Phụ kiện laptop', ['Sạc laptop', 'Balo & túi chống sốc', 'Đế tản nhiệt', 'Dock kết nối']]
  ] },
  { id: 'desktop', name: 'PC Gaming & Máy bộ', icon: 'fa-solid fa-desktop', groups: [
    ['PC gaming', ['PC Intel', 'PC AMD', 'PC eSports', 'PC streaming']],
    ['PC làm việc', ['PC văn phòng', 'PC doanh nghiệp', 'PC đồ hoạ', 'Workstation']],
    ['Build & nâng cấp', ['HACOM PC Builder', 'Bộ nâng cấp PC', 'Dịch vụ lắp ráp', 'Tư vấn cấu hình']]
  ] },
  { id: 'components', name: 'Linh kiện PC', icon: 'fa-solid fa-microchip', groups: [
    ['Linh kiện chính', ['CPU', 'Card đồ hoạ', 'Bo mạch chủ', 'RAM']],
    ['Lưu trữ & nguồn', ['SSD', 'Ổ cứng HDD', 'Nguồn máy tính', 'Ổ cứng di động']],
    ['Vỏ máy & tản nhiệt', ['Vỏ case', 'Tản nhiệt khí', 'Tản nhiệt nước', 'Quạt case']]
  ] },
  { id: 'displays', name: 'Màn hình', icon: 'fa-solid fa-display', groups: [
    ['Theo nhu cầu', ['Màn hình gaming', 'Màn hình văn phòng', 'Màn hình đồ hoạ', 'Màn hình di động']],
    ['Kích thước & độ phân giải', ['24 inch', '27 inch', 'Ultrawide', '2K & 4K']],
    ['Phụ kiện hiển thị', ['Giá treo màn hình', 'Cáp hình ảnh', 'Bộ chuyển đổi', 'Thiết bị trình chiếu']]
  ] },
  { id: 'gaming-gear', name: 'Gaming Gear & Phụ kiện', icon: 'fa-solid fa-keyboard', groups: [
    ['Điều khiển', ['Bàn phím', 'Chuột', 'Lót chuột', 'Tay cầm']],
    ['Âm thanh', ['Tai nghe', 'Loa máy tính', 'Microphone', 'Sound card']],
    ['Không gian chơi', ['Ghế gaming', 'Bàn gaming', 'Webcam', 'Đèn setup']]
  ] },
  { id: 'network', name: 'Mạng & Lưu trữ', icon: 'fa-solid fa-wifi', groups: [
    ['Thiết bị mạng', ['Router Wi-Fi', 'Wi-Fi Mesh', 'Switch', 'Access Point']],
    ['NAS & lưu trữ', ['Thiết bị NAS', 'Ổ cứng NAS', 'Ổ cứng gắn ngoài', 'USB & thẻ nhớ']],
    ['Kết nối', ['Cáp mạng', 'Bộ chuyển đổi', 'KVM Switch', 'USB Hub']]
  ] },
  { id: 'office', name: 'Thiết bị văn phòng', icon: 'fa-solid fa-print', groups: [
    ['In ấn & số hoá', ['Máy in', 'Máy scan', 'Máy in nhãn', 'Mực in']],
    ['Trình chiếu', ['Máy chiếu', 'Màn chiếu', 'Bút trình chiếu', 'Thiết bị hội nghị']],
    ['Nguồn & bảo vệ', ['Bộ lưu điện UPS', 'Ổ cắm điện', 'Máy huỷ tài liệu', 'Thiết bị chấm công']]
  ] },
  { id: 'smart-home', name: 'Camera & Nhà thông minh', icon: 'fa-solid fa-house-signal', groups: [
    ['Camera giám sát', ['Camera trong nhà', 'Camera ngoài trời', 'Đầu ghi hình', 'Bộ camera']],
    ['Nhà thông minh', ['Khoá cửa thông minh', 'Chuông cửa', 'Cảm biến', 'Điều khiển trung tâm']],
    ['An ninh & kết nối', ['Báo động', 'Thiết bị định vị', 'Bộ đàm', 'Phụ kiện camera']]
  ] },
  { id: 'offers', name: 'Khuyến mại & Dịch vụ', icon: 'fa-solid fa-bolt', groups: [
    ['Khám phá ưu đãi', ['Flash sale', 'Sản phẩm bán chạy', 'Hàng mới về', 'Hàng thanh lý']],
    ['Dịch vụ kỹ thuật', ['Lắp ráp PC', 'Cài đặt phần mềm', 'Vệ sinh thiết bị', 'Hỗ trợ kỹ thuật']],
    ['An tâm mua sắm', ['Chính sách bảo hành', 'Tra cứu đơn hàng', 'Tư vấn chọn máy', 'Hệ thống showroom']]
  ] }
]);

const campaignSets = Object.freeze([
  { id: 'performance', name: 'HACOM Performance', artwork: { main: 'performance-main', side: ['performance-deal', 'performance-support'] } },
  { id: 'mobility', name: 'Laptop AI', artwork: { main: 'mobility-main', side: ['mobility-ai', 'mobility-accessories'] } },
  { id: 'builder', name: 'PC Builder', artwork: { main: 'builder-main', side: ['builder-graphics', 'builder-service'] } }
]);

window.HacomGatewayData = Object.freeze({ categoryTree, campaignSets });

const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'className') element.className = value;
    else if (key === 'text') element.textContent = value;
    else if (key.startsWith('data')) element.dataset[key.slice(4)] = value;
    else element.setAttribute(key, value);
  });
  return element;
};

const announce = (message) => {
  const status = document.getElementById('pageStatus');
  if (status) status.textContent = message;
};

const createIcon = (iconClass) => createElement('i', {
  className: `${iconClass} menu-icon`,
  'aria-hidden': 'true'
});

function initMenu() {
  const menu = document.getElementById('megaMenu');
  const toggles = [...document.querySelectorAll('[data-menu-toggle]')];
  const desktopList = document.getElementById('desktopSidebarList');
  const desktopContent = document.getElementById('desktopContentContainer');
  const mobileGrid = document.getElementById('mobileGrid');
  const mobileGridContainer = document.getElementById('mobileGridContainer');
  const mobileSubView = document.getElementById('mobileSubView');
  const mobileSubTitle = document.getElementById('mobileSubTitle');
  const mobileSubContent = document.getElementById('mobileSubContentList');
  const mobileBack = document.querySelector('[data-mobile-menu-back]');

  if (!menu || toggles.length === 0 || !desktopList || !desktopContent || !mobileGrid || !mobileGridContainer || !mobileSubView || !mobileSubTitle || !mobileSubContent) return;

  let activeCategoryId = categoryTree[0].id;
  let opener = null;

  const setMenuOpen = (open, trigger = null) => {
    menu.hidden = !open;
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('mobile-menu-open', open);
    toggles.forEach((toggle) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Đóng menu danh mục' : 'Mở menu danh mục');
    });
    document.querySelectorAll('[data-menu-icon]').forEach((icon) => {
      icon.className = `fa-solid ${open ? 'fa-xmark' : 'fa-bars'} menu-icon`;
      icon.setAttribute('aria-hidden', 'true');
    });
    if (open) {
      opener = trigger || document.activeElement;
      mobileGrid.classList.remove('hidden');
      mobileSubView.classList.add('hidden');
    } else if (opener instanceof HTMLElement) {
      opener.focus();
    }
  };

  const renderDesktopContent = () => {
    const category = categoryTree.find((item) => item.id === activeCategoryId) || categoryTree[0];
    const groups = createElement('div', { className: 'menu-content-grid' });
    category.groups.forEach(([title, items]) => {
      const group = createElement('section');
      group.append(createElement('h3', { className: 'menu-group-title', text: title }));
      const list = createElement('ul', { className: 'menu-link-list' });
      items.forEach((item) => {
        const button = createElement('button', { type: 'button', className: 'sub-link', text: item });
        button.dataset.demoAction = '';
        const listItem = createElement('li');
        listItem.append(button);
        list.append(listItem);
      });
      group.append(list);
      groups.append(group);
    });
    desktopContent.replaceChildren(groups);
  };

  const renderDesktopList = () => {
    const fragment = document.createDocumentFragment();
    categoryTree.forEach((category) => {
      const button = createElement('button', {
        type: 'button',
        className: `sidebar-item ${category.id === activeCategoryId ? 'active' : ''}`,
        'aria-pressed': String(category.id === activeCategoryId)
      });
      button.append(createIcon(category.icon), createElement('span', { text: category.name }));
      button.addEventListener('click', () => {
        activeCategoryId = category.id;
        renderDesktopList();
        renderDesktopContent();
      });
      button.addEventListener('focus', () => {
        if (activeCategoryId !== category.id) {
          activeCategoryId = category.id;
          renderDesktopList();
          renderDesktopContent();
        }
      });
      fragment.append(button);
    });
    desktopList.replaceChildren(fragment);
  };

  const openMobileCategory = (category) => {
    mobileSubTitle.textContent = category.name;
    const fragment = document.createDocumentFragment();
    category.groups.forEach(([title, items]) => {
      const group = createElement('section');
      group.append(createElement('h3', { className: 'menu-group-title', text: title }));
      const list = createElement('ul', { className: 'menu-link-list' });
      items.forEach((item) => {
        const button = createElement('button', { type: 'button', className: 'sub-link text-left', text: item });
        button.dataset.demoAction = '';
        const listItem = createElement('li');
        listItem.append(button);
        list.append(listItem);
      });
      group.append(list);
      fragment.append(group);
    });
    mobileSubContent.replaceChildren(fragment);
    mobileGrid.classList.add('hidden');
    mobileSubView.classList.remove('hidden');
    mobileBack?.focus();
  };

  const renderMobileGrid = () => {
    const fragment = document.createDocumentFragment();
    categoryTree.forEach((category) => {
      const button = createElement('button', {
        type: 'button',
        className: 'category-menu-button',
        'aria-label': `Mở danh mục ${category.name}`
      });
      button.append(createIcon(category.icon));
      button.append(createElement('span', { className: 'menu-category-name', text: category.name }));
      button.addEventListener('click', () => openMobileCategory(category));
      fragment.append(button);
    });
    mobileGridContainer.replaceChildren(fragment);
  };

  toggles.forEach((toggle) => toggle.addEventListener('click', () => setMenuOpen(menu.hidden, toggle)));
  mobileBack?.addEventListener('click', () => {
    mobileSubView.classList.add('hidden');
    mobileGrid.classList.remove('hidden');
    mobileGridContainer.querySelector('button')?.focus();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) setMenuOpen(false);
  });
  document.addEventListener('pointerdown', (event) => {
    if (!menu.hidden && !menu.contains(event.target) && !toggles.some((toggle) => toggle.contains(event.target))) setMenuOpen(false);
  });

  renderDesktopList();
  renderDesktopContent();
  renderMobileGrid();
}

function initGatewayMenu(carouselController) {
  const root = document.getElementById('gateway');
  const list = document.getElementById('gatewayCategoryList');
  const flyout = document.getElementById('gatewayFlyout');
  const title = document.getElementById('gatewayFlyoutTitle');
  const content = document.getElementById('gatewayFlyoutContent');
  const closeButton = flyout?.querySelector('[data-gateway-close]');

  if (!root || !list || !flyout || !title || !content) return;

  const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  let activeCategoryId = null;
  let pinned = false;
  let openTimer = null;
  let closeTimer = null;
  let lastTrigger = null;

  const clearTimers = () => {
    if (openTimer !== null) window.clearTimeout(openTimer);
    if (closeTimer !== null) window.clearTimeout(closeTimer);
    openTimer = null;
    closeTimer = null;
  };

  const getButtons = () => [...list.querySelectorAll('[data-gateway-category]')];

  const syncButtons = () => {
    getButtons().forEach((button) => {
      const selected = !flyout.hidden && button.dataset.gatewayCategory === activeCategoryId;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-expanded', String(selected));
    });
  };

  const renderFlyout = (category) => {
    title.textContent = category.name;
    const fragment = document.createDocumentFragment();

    category.groups.forEach(([groupTitle, items]) => {
      const group = createElement('section', { className: 'gateway-flyout__group' });
      group.append(createElement('h3', { text: groupTitle }));
      const links = createElement('ul');
      items.forEach((item) => {
        const action = createElement('button', { type: 'button', text: item });
        action.dataset.demoAction = '';
        const listItem = createElement('li');
        listItem.append(action);
        links.append(listItem);
      });
      group.append(links);
      fragment.append(group);
    });

    const allProducts = createElement('button', {
      type: 'button',
      className: 'gateway-flyout__all',
      'aria-label': `Xem tất cả sản phẩm ${category.name}`
    });
    allProducts.dataset.demoAction = '';
    allProducts.append(
      createElement('span', { text: `Xem tất cả ${category.name}` }),
      createIcon('fa-solid fa-arrow-right')
    );
    fragment.append(allProducts);
    content.replaceChildren(fragment);
  };

  const openCategory = (category, { lock = false, focusFlyout = false, trigger = null } = {}) => {
    clearTimers();
    activeCategoryId = category.id;
    pinned = lock;
    lastTrigger = trigger || lastTrigger;
    renderFlyout(category);
    flyout.hidden = false;
    root.classList.add('has-open-flyout');
    root.classList.toggle('has-pinned-flyout', pinned);
    carouselController?.pause?.('gateway-menu', true);
    syncButtons();
    if (focusFlyout) content.querySelector('button')?.focus();
  };

  const closeFlyout = ({ restoreFocus = false } = {}) => {
    clearTimers();
    flyout.hidden = true;
    pinned = false;
    root.classList.remove('has-open-flyout', 'has-pinned-flyout');
    carouselController?.pause?.('gateway-menu', false);
    syncButtons();
    if (restoreFocus && lastTrigger instanceof HTMLElement) lastTrigger.focus();
  };

  const scheduleOpen = (category, trigger) => {
    if (!hoverQuery.matches || pinned) return;
    if (openTimer !== null) window.clearTimeout(openTimer);
    openTimer = window.setTimeout(() => openCategory(category, { trigger }), 120);
  };

  const scheduleClose = () => {
    if (pinned) return;
    if (closeTimer !== null) window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => closeFlyout(), 180);
  };

  const fragment = document.createDocumentFragment();
  categoryTree.forEach((category) => {
    const button = createElement('button', {
      type: 'button',
      className: 'gateway-category',
      'aria-controls': 'gatewayFlyout',
      'aria-expanded': 'false'
    });
    button.dataset.gatewayCategory = category.id;
    button.append(
      createIcon(category.icon),
      createElement('span', { text: category.name }),
      createIcon('fa-solid fa-chevron-right')
    );

    button.addEventListener('pointerenter', () => scheduleOpen(category, button));
    button.addEventListener('focus', () => {
      if (!pinned) openCategory(category, { trigger: button });
    });
    button.addEventListener('click', () => {
      if (!flyout.hidden && activeCategoryId === category.id && pinned) {
        closeFlyout({ restoreFocus: true });
        return;
      }
      openCategory(category, { lock: true, trigger: button });
    });
    button.addEventListener('keydown', (event) => {
      const buttons = getButtons();
      const index = buttons.indexOf(button);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        buttons[(index + direction + buttons.length) % buttons.length]?.focus();
      }
      if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCategory(category, { lock: true, focusFlyout: true, trigger: button });
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        closeFlyout({ restoreFocus: true });
      }
    });
    fragment.append(button);
  });
  list.replaceChildren(fragment);

  root.addEventListener('pointerenter', () => {
    if (closeTimer !== null) window.clearTimeout(closeTimer);
  });
  root.addEventListener('pointerleave', scheduleClose);
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget) && !pinned) scheduleClose();
  });
  flyout.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'ArrowLeft') {
      event.preventDefault();
      closeFlyout({ restoreFocus: true });
    }
  });
  closeButton?.addEventListener('click', () => closeFlyout({ restoreFocus: true }));
  document.addEventListener('pointerdown', (event) => {
    if (!flyout.hidden && !root.contains(event.target)) closeFlyout();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !flyout.hidden) closeFlyout({ restoreFocus: true });
  });
}

function initBrandExpander() {
  const grid = document.getElementById('brandsGrid');
  const overlay = document.getElementById('expandOverlay');
  const button = document.getElementById('expandBtn');
  if (!grid || !overlay || !button) return;
  button.addEventListener('click', () => {
    const expanded = grid.classList.toggle('expanded');
    button.classList.toggle('rotated', expanded);
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', expanded ? 'Thu gọn thương hiệu' : 'Xem thêm thương hiệu');
    overlay.classList.toggle('is-expanded', expanded);
  });
}

function initProductRails() {
  const catalog = window.HacomCatalog;
  const renderer = window.HacomProductCards?.renderProductCard;
  if (!catalog || typeof renderer !== 'function') return;

  document.querySelectorAll('.product-track, .component-products').forEach((rail) => {
    [...rail.children].forEach((card, index) => {
      if (!(card instanceof HTMLElement)) return;
      const title = card.querySelector('h3')?.textContent?.trim();
      const product = catalog.getByLegacyTitle(title);
      if (!product) return;
      const compact = card.classList.contains('mini-product');
      card.replaceWith(renderer(product, {
        variant: compact ? 'compact' : 'full',
        featured: card.classList.contains('mini-product--featured'),
        loading: index < 3 ? 'eager' : 'lazy'
      }));
    });
  });
}

function initFormsAndActions() {
  document.querySelectorAll('input[type="search"]').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      const query = input.value.trim();
      announce(query ? `Tìm kiếm demo cho “${query}”. Chức năng chưa kết nối dữ liệu.` : 'Hãy nhập từ khoá cần tìm.');
    });
  });
  const newsletter = document.getElementById('newsletterForm');
  const email = document.getElementById('newsletterEmail');
  const newsletterStatus = document.getElementById('newsletterStatus');
  newsletter?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!(email instanceof HTMLInputElement) || !email.validity.valid) {
      if (newsletterStatus) newsletterStatus.textContent = 'Hãy nhập địa chỉ email hợp lệ.';
      email?.focus();
      return;
    }
    if (newsletterStatus) newsletterStatus.textContent = 'Đã lưu email trong phiên bản demo; chưa có kết nối máy chủ.';
    newsletter.reset();
  });
  document.addEventListener('click', (event) => {
    const action = event.target.closest('[data-demo-action]');
    if (!(action instanceof HTMLElement)) return;
    announce(`“${action.textContent.trim() || action.getAttribute('aria-label')}” là chức năng demo và chưa có dữ liệu liên kết.`);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initProductRails();
  const initCarousel = window.HacomCarousel?.initInfiniteCarousel;
  const carouselControllers = new Map();
  if (typeof initCarousel === 'function') {
    document.querySelectorAll('[data-carousel-root]').forEach((root) => {
      const controller = initCarousel(root);
      if (controller) carouselControllers.set(root, controller);
    });
  } else {
    console.error('Không thể khởi tạo carousel: assets/carousel.js chưa được tải.');
  }
  initGatewayMenu(carouselControllers.get(document.getElementById('gatewayCarousel')));
  initBrandExpander();
  initFormsAndActions();
});
