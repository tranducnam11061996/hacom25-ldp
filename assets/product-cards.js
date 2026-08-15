(function exposeProductCardRenderer(global) {
  const make = (tag, { className = '', text, attrs = {}, dataset = {} } = {}) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    Object.entries(dataset).forEach(([key, value]) => { node.dataset[key] = String(value); });
    return node;
  };

  const icon = (className) => make('i', { className, attrs: { 'aria-hidden': 'true' } });
  const money = (value) => `${new Intl.NumberFormat('vi-VN').format(value)}₫`;
  const discountPercent = (product) => product.listPrice > product.price
    ? Math.round((1 - product.price / product.listPrice) * 100)
    : 0;

  function renderRating(product) {
    const wrapper = make('span', {
      className: 'product-card__rating',
      attrs: { role: 'img', 'aria-label': `Đánh giá ${product.rating} trên 5 sao` }
    });
    for (let index = 0; index < 5; index += 1) {
      wrapper.append(icon('fa-solid fa-star product-card__rating-star'));
    }
    return wrapper;
  }

  function renderSpec(spec) {
    const cell = make('div', { className: 'product-card__spec' });
    cell.append(make('span', { className: 'product-card__spec-label', text: spec.label }));
    cell.append(make('strong', { className: 'product-card__spec-value', text: spec.value }));
    return cell;
  }

  function renderProductCard(product, { variant = 'full', loading = 'lazy', featured = false } = {}) {
    const compact = variant === 'compact';
    const article = make('article', {
      className: `${compact ? 'mini-product product-card product-card--compact' : 'product-card product-card--full'}${featured ? ' mini-product--featured' : ''}`,
      dataset: { productCard: '', sku: product.sku, category: product.category, sourceUrl: product.sourceUrl }
    });
    const media = make('div', { className: 'product-card__media' });
    const image = make('img', {
      className: 'product-card__image',
      attrs: {
        src: product.image.src,
        alt: product.image.alt,
        width: product.image.width,
        height: product.image.height,
        loading,
        decoding: 'async'
      }
    });
    const presentation = product.image.presentation || {};
    image.style.setProperty('--product-image-scale', String(presentation.scale ?? 1.12));
    image.style.setProperty('--product-image-x', `${presentation.xPercent ?? 0}%`);
    image.style.setProperty('--product-image-y', `${presentation.yPercent ?? 0}%`);
    const mediaAccent = make('span', {
      className: 'product-card__media-accent',
      attrs: { 'aria-hidden': 'true' }
    });
    const imageSurface = make('div', { className: 'product-card__image-surface' });
    imageSurface.append(image);
    const discount = discountPercent(product);
    const mediaTop = make('div', { className: 'product-card__media-top' });
    mediaTop.append(make('span', { className: 'product-card__brand', text: product.brand }));
    if (discount > 0) mediaTop.append(make('span', { className: 'product-card__discount', text: `-${discount}%` }));
    const favorite = make('button', {
      className: 'product-card__favorite',
      attrs: { type: 'button', 'aria-label': `Thêm ${product.title} vào yêu thích`, title: 'Thêm vào yêu thích' },
      dataset: { demoAction: '' }
    });
    favorite.append(icon('fa-regular fa-heart'));
    media.append(mediaTop, mediaAccent, imageSurface, favorite);

    const body = make('div', { className: 'product-card__body' });
    const meta = make('div', { className: 'product-card__meta' });
    meta.append(renderRating(product));
    meta.append(make('span', { className: 'product-card__sku', text: `Mã: ${product.sku}` }));
    const title = make('h3', { className: 'product-card__title' });
    const titleLink = make('a', { text: product.title, attrs: { href: product.sourceUrl, target: '_blank', rel: 'noopener noreferrer' } });
    title.append(titleLink);
    const specs = make('div', { className: 'product-card__specs', attrs: { role: 'group', 'aria-label': 'Thông số nổi bật' } });
    product.specs.slice(0, 2).forEach((spec) => specs.append(renderSpec(spec)));
    const pricing = make('div', { className: 'product-card__pricing' });
    if (product.listPrice > product.price) pricing.append(make('span', { className: 'product-card__old-price', text: money(product.listPrice) }));
    pricing.append(make('strong', { className: 'product-card__price', text: money(product.price) }));

    body.append(meta, title, specs, pricing);

    const footer = make('div', { className: 'product-card__footer' });
    const stock = make('span', { className: `product-card__stock product-card__stock--${product.availability}`, text: product.stock });
    const cartLabel = product.availability === 'in-stock' ? 'Thêm vào giỏ' : product.availability === 'preorder' ? 'Đặt trước' : 'Xem sản phẩm';
    const visibleCartLabel = compact ? (product.availability === 'in-stock' ? 'Thêm giỏ' : product.availability === 'preorder' ? 'Đặt trước' : 'Chi tiết') : cartLabel;
    const cart = make('button', {
      className: 'product-card__cart',
      attrs: { type: 'button', 'aria-label': `${visibleCartLabel}: ${product.title}`, title: cartLabel },
      dataset: { demoAction: '' }
    });
    cart.append(icon('fa-solid fa-cart-shopping'), make('span', { text: visibleCartLabel }));
    footer.append(stock, cart);
    article.append(media, body, footer);
    return article;
  }

  global.HacomProductCards = Object.freeze({ renderProductCard });
})(window);
