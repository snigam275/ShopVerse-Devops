/* ═══════════════════════════════════════════════════════════
   SHOPVERSE — Main JavaScript
   Modules: Product Data, Cart (localStorage), UI Utilities,
   Rendering, Search/Filter, Page Initializers
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   1. PRODUCT DATA (fetched from API)
   ───────────────────────────────────────── */
let PRODUCTS = [];
let _productsFetched = false;

/**
 * Fetch products from the Product Service API.
 * Uses /api/products (proxied by Nginx to the Spring Boot service).
 * Failure Audit F3: wrapped in try/catch with user-friendly error toast.
 */
async function fetchProducts() {
  if (_productsFetched && PRODUCTS.length > 0) return PRODUCTS;
  try {
    const res = await fetch('/api/products?limit=100');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    PRODUCTS = data.products || data;
    _productsFetched = true;
  } catch (err) {
    console.error('Failed to fetch products:', err);
    showToast('error', 'Connection Error', "Couldn't load products — please refresh the page.");
    PRODUCTS = [];
  }
  return PRODUCTS;
}


/* ─────────────────────────────────────────
   2. CART MODULE (localStorage)
   ───────────────────────────────────────── */
const Cart = {
  KEY: 'shopverse_cart',

  /** Get cart array from localStorage */
  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch { return []; }
  },

  /** Save cart array to localStorage */
  save(cart) {
    localStorage.setItem(this.KEY, JSON.stringify(cart));
    this.updateBadge();
  },

  /** Add item (or increment qty) */
  add(productId, qty = 1) {
    const cart = this.get();
    const idx = cart.findIndex(i => i.id === productId);
    if (idx > -1) {
      cart[idx].qty = Math.min(cart[idx].qty + qty, 10);
    } else {
      cart.push({ id: productId, qty });
    }
    this.save(cart);
    const product = PRODUCTS.find(p => p.id === productId);
    showToast('success', 'Added to Cart', `${product?.name || 'Item'} added successfully!`);
  },

  /** Remove item */
  remove(productId) {
    const cart = this.get().filter(i => i.id !== productId);
    this.save(cart);
  },

  /** Update quantity */
  updateQty(productId, qty) {
    const cart = this.get();
    const idx = cart.findIndex(i => i.id === productId);
    if (idx > -1) {
      if (qty <= 0) { cart.splice(idx, 1); }
      else { cart[idx].qty = Math.min(qty, 10); }
    }
    this.save(cart);
  },

  /** Clear entire cart */
  clear() {
    localStorage.removeItem(this.KEY);
    this.updateBadge();
  },

  /** Total item count */
  count() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },

  /** Subtotal price */
  subtotal() {
    return this.get().reduce((sum, item) => {
      const p = PRODUCTS.find(pr => pr.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  },

  /** Update badge on all pages */
  updateBadge() {
    document.querySelectorAll('#cartBadge').forEach(el => {
      const c = this.count();
      el.textContent = c;
      el.style.display = c > 0 ? 'flex' : 'none';
    });
  }
};

/* ─────────────────────────────────────────
   3. UTILITY FUNCTIONS
   ───────────────────────────────────────── */

/** Format price in INR */
function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN');
}

/** Calculate discount percentage */
function discountPercent(original, current) {
  return Math.round(((original - current) / original) * 100);
}

/** Generate star HTML */
function starsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

/* ─────────────────────────────────────────
   4. TOAST NOTIFICATIONS
   ───────────────────────────────────────── */
function showToast(type = 'success', title = '', message = '') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <div class="toast__icon"><svg><use href=""></use></svg></div>
    <div class="toast__content">
      <div class="toast__title">${title}</div>
      <div class="toast__message">${message}</div>
    </div>
    <button class="toast__close" aria-label="Close"><svg><use href=""></use></svg></button>
    <div class="toast__progress"></div>
  `;

  // Set icons using feather
  const iconMap = { success: 'check-circle', error: 'alert-circle', info: 'info' };
  const iconSvg = toast.querySelector('.toast__icon');
  iconSvg.innerHTML = feather.icons[iconMap[type] || 'info'].toSvg({ width: 18, height: 18 });
  const closeSvg = toast.querySelector('.toast__close');
  closeSvg.innerHTML = feather.icons['x'].toSvg({ width: 16, height: 16 });

  closeSvg.addEventListener('click', () => removeToast(toast));
  container.appendChild(toast);

  // Auto-remove after 3s
  setTimeout(() => removeToast(toast), 3000);
}

function removeToast(toast) {
  toast.classList.add('removing');
  setTimeout(() => toast.remove(), 300);
}

/* ─────────────────────────────────────────
   5. PRODUCT CARD RENDERER
   ───────────────────────────────────────── */
function createProductCard(product) {
  const discount = discountPercent(product.originalPrice, product.price);
  const card = document.createElement('div');
  card.className = 'product-card animate-on-scroll';
  card.innerHTML = `
    ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
    <button class="product-card__wishlist" aria-label="Wishlist">
      ${feather.icons['heart'].toSvg({ width: 16, height: 16 })}
    </button>
    <a href="product-detail.html?id=${product.id}" class="product-card__image">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
    </a>
    <div class="product-card__info">
      <div class="product-card__category">${product.category}</div>
      <h3 class="product-card__name">
        <a href="product-detail.html?id=${product.id}">${product.name}</a>
      </h3>
      <div class="product-card__rating">
        <span class="stars">${starsHTML(product.rating)}</span>
        <span class="rating-value">${product.rating}</span>
        <span class="rating-count">(${product.reviews})</span>
      </div>
      <div class="product-card__price">
        <span class="price-current">${formatPrice(product.price)}</span>
        <span class="price-original">${formatPrice(product.originalPrice)}</span>
        <span class="price-discount">${discount}% OFF</span>
      </div>
      <div class="product-card__actions">
        <button class="btn btn--primary btn--sm add-to-cart-btn" data-id="${product.id}">
          ${feather.icons['shopping-cart'].toSvg({ width: 16, height: 16 })}
          Add to Cart
        </button>
      </div>
    </div>
  `;
  return card;
}

/** Render product grid into a container */
function renderProductGrid(containerId, products) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Simulate short loading delay for skeleton effect
  setTimeout(() => {
    container.innerHTML = '';
    if (products.length === 0) {
      // Show no results if on products page
      const noResults = document.getElementById('noResults');
      if (noResults) noResults.style.display = 'block';
      return;
    }
    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = 'none';

    products.forEach(p => container.appendChild(createProductCard(p)));

    // Re-run scroll animations
    initScrollAnimations();

    // Attach add-to-cart listeners
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        Cart.add(Number(btn.dataset.id));
      });
    });
  }, 400);
}

/* ─────────────────────────────────────────
   6. HOME PAGE INITIALIZER
   ───────────────────────────────────────── */
async function initHomePage() {
  await fetchProducts();
  // Render 8 featured products (highest rated)
  const featured = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 8);
  renderProductGrid('featuredProducts', featured);
}

/* ─────────────────────────────────────────
   7. PRODUCTS PAGE — Search, Filter, Sort
   ───────────────────────────────────────── */
async function initProductsPage() {
  await fetchProducts();
  const searchInput = document.getElementById('searchInput');
  const categoryFilters = document.getElementById('categoryFilters');
  const priceRange = document.getElementById('priceRange');
  const priceRangeValue = document.getElementById('priceRangeValue');
  const ratingFilter = document.getElementById('ratingFilter');
  const sortSelect = document.getElementById('sortSelect');
  const productCount = document.getElementById('productCount');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const openFiltersBtn = document.getElementById('openFiltersBtn');
  const closeFiltersBtn = document.getElementById('closeFiltersBtn');
  const filtersSidebar = document.getElementById('filtersSidebar');
  const gridToggleBtns = document.querySelectorAll('.grid-toggle__btn');
  const productsGrid = document.getElementById('productsGrid');

  if (!searchInput) return; // Not on products page

  // Pre-select category from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const urlCategory = urlParams.get('category');
  if (urlCategory && categoryFilters) {
    const cb = categoryFilters.querySelector(`input[value="${urlCategory}"]`);
    if (cb) cb.checked = true;
  }

  /** Apply all filters and re-render */
  function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const checkedCats = [...categoryFilters.querySelectorAll('input:checked')].map(c => c.value);
    const maxPrice = Number(priceRange.value);
    const minRating = Number(ratingFilter.querySelector('input:checked')?.value || 0);
    const sortVal = sortSelect.value;

    let filtered = PRODUCTS.filter(p => {
      if (query && !p.name.toLowerCase().includes(query) && !p.category.toLowerCase().includes(query)) return false;
      if (checkedCats.length && !checkedCats.includes(p.category)) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      return true;
    });

    // Sort
    switch (sortVal) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'name-az': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-za': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
    }

    // Update count
    if (productCount) productCount.textContent = filtered.length;

    // Render active filter tags
    renderActiveFilters(query, checkedCats, maxPrice, minRating);

    renderProductGrid('productsGrid', filtered);
  }

  /** Render active filter tag pills */
  function renderActiveFilters(query, cats, maxPrice, minRating) {
    const container = document.getElementById('activeFilters');
    if (!container) return;
    container.innerHTML = '';

    if (query) addFilterTag(container, `Search: "${query}"`, () => { searchInput.value = ''; applyFilters(); });
    cats.forEach(c => addFilterTag(container, c, () => {
      const cb = categoryFilters.querySelector(`input[value="${c}"]`);
      if (cb) cb.checked = false;
      applyFilters();
    }));
    if (maxPrice < 50000) addFilterTag(container, `Under ${formatPrice(maxPrice)}`, () => { priceRange.value = 50000; priceRangeValue.textContent = '₹50,000'; applyFilters(); });
    if (minRating > 0) addFilterTag(container, `${minRating}★ & up`, () => { ratingFilter.querySelector('input[value="0"]').checked = true; applyFilters(); });
  }

  function addFilterTag(container, label, onRemove) {
    const tag = document.createElement('span');
    tag.className = 'active-filter-tag';
    tag.innerHTML = `${label} <button aria-label="Remove filter">${feather.icons['x'].toSvg({ width: 14, height: 14 })}</button>`;
    tag.querySelector('button').addEventListener('click', onRemove);
    container.appendChild(tag);
  }

  // Event listeners
  searchInput.addEventListener('input', applyFilters);
  categoryFilters.addEventListener('change', applyFilters);
  priceRange.addEventListener('input', () => { priceRangeValue.textContent = formatPrice(Number(priceRange.value)); applyFilters(); });
  ratingFilter.addEventListener('change', applyFilters);
  sortSelect.addEventListener('change', applyFilters);

  if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    categoryFilters.querySelectorAll('input').forEach(c => c.checked = false);
    priceRange.value = 50000; priceRangeValue.textContent = '₹50,000';
    ratingFilter.querySelector('input[value="0"]').checked = true;
    sortSelect.value = 'default';
    applyFilters();
  });
  if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', () => clearFiltersBtn?.click());

  // Mobile filter drawer
  if (openFiltersBtn) openFiltersBtn.addEventListener('click', () => filtersSidebar.classList.add('open'));
  if (closeFiltersBtn) closeFiltersBtn.addEventListener('click', () => filtersSidebar.classList.remove('open'));

  // Grid / List toggle
  gridToggleBtns.forEach(btn => btn.addEventListener('click', () => {
    gridToggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (productsGrid) {
      productsGrid.classList.toggle('list-view', btn.dataset.grid === 'list');
    }
  }));

  // Initial render
  applyFilters();
}

/* ─────────────────────────────────────────
   8. PRODUCT DETAIL PAGE
   ───────────────────────────────────────── */
async function initProductDetailPage() {
  await fetchProducts();
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get('id'));
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    document.getElementById('productDetail').innerHTML = '<div class="container" style="text-align:center;padding:80px 20px"><h2>Product not found</h2><p>The product you\'re looking for doesn\'t exist.</p><a href="products.html" class="btn btn--primary" style="margin-top:20px">Back to Shop</a></div>';
    return;
  }

  // Update page title & breadcrumb
  document.title = `${product.name} — ShopVerse`;
  const breadcrumb = document.getElementById('breadcrumbProduct');
  if (breadcrumb) breadcrumb.textContent = product.name;

  // Main image
  const mainImg = document.getElementById('mainProductImage');
  mainImg.src = product.image;
  mainImg.alt = product.name;

  // Badge
  const badge = document.getElementById('productBadge');
  if (badge) badge.textContent = product.badge || '';
  if (badge && !product.badge) badge.style.display = 'none';

  // Thumbnails
  const thumbsContainer = document.getElementById('productThumbs');
  if (thumbsContainer) {
    thumbsContainer.innerHTML = '';
    product.images.forEach((img, i) => {
      const thumb = document.createElement('div');
      thumb.className = `product-gallery__thumb${i === 0 ? ' active' : ''}`;
      thumb.innerHTML = `<img src="${img}" alt="${product.name} view ${i + 1}" />`;
      thumb.addEventListener('click', () => {
        mainImg.src = img;
        thumbsContainer.querySelectorAll('.product-gallery__thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
      thumbsContainer.appendChild(thumb);
    });
  }

  // Product info
  document.getElementById('productCategory').textContent = product.category;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productPrice').textContent = formatPrice(product.price);

  const origPrice = document.getElementById('productOriginalPrice');
  if (origPrice) origPrice.textContent = formatPrice(product.originalPrice);
  const disc = document.getElementById('productDiscount');
  if (disc) disc.textContent = `${discountPercent(product.originalPrice, product.price)}% OFF`;

  // Rating
  document.getElementById('starsFilledDetail').textContent = starsHTML(product.rating);
  document.getElementById('ratingValueDetail').textContent = product.rating;
  document.getElementById('ratingCountDetail').textContent = `(${product.reviews} reviews)`;

  // Description
  document.getElementById('productDescription').innerHTML = `<p>${product.description}</p>`;

  // Highlights
  const highlightsList = document.getElementById('highlightsList');
  if (highlightsList) {
    highlightsList.innerHTML = product.highlights.map(h => `<li>${h}</li>`).join('');
  }

  // Specifications
  const setBySel = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setBySel('specBrand', product.brand);
  setBySel('specCategory', product.category.charAt(0).toUpperCase() + product.category.slice(1));
  setBySel('specMaterial', product.material);
  setBySel('specWeight', product.weight);
  setBySel('specWarranty', product.warranty);

  // Reviews tab data
  setBySel('bigRating', product.rating);
  setBySel('starsFilledReview', starsHTML(product.rating));
  setBySel('reviewTotal', `Based on ${product.reviews} reviews`);

  // Rating bars (simulated distribution)
  const bars = document.querySelectorAll('.bar__fill');
  const counts = document.querySelectorAll('.bar__count');
  const distribution = [70, 18, 7, 3, 2]; // percentage
  bars.forEach((bar, i) => {
    bar.style.width = distribution[i] + '%';
  });
  counts.forEach((c, i) => {
    c.textContent = Math.round(product.reviews * distribution[i] / 100);
  });

  // Quantity selector
  let qty = 1;
  const qtyInput = document.getElementById('quantityInput');
  const qtyMinus = document.getElementById('quantityMinus');
  const qtyPlus = document.getElementById('quantityPlus');

  qtyMinus.addEventListener('click', () => { if (qty > 1) { qty--; qtyInput.value = qty; } });
  qtyPlus.addEventListener('click', () => { if (qty < 10) { qty++; qtyInput.value = qty; } });

  // Add to cart
  document.getElementById('addToCartDetail').addEventListener('click', () => {
    Cart.add(product.id, qty);
  });

  // Wishlist toggle
  const wishlistBtn = document.getElementById('wishlistBtn');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      wishlistBtn.classList.toggle('active');
      showToast('info', wishlistBtn.classList.contains('active') ? 'Added to Wishlist' : 'Removed from Wishlist', product.name);
    });
  }

  // Image zoom
  const zoomBtn = document.getElementById('zoomBtn');
  const zoomModal = document.getElementById('zoomModal');
  const zoomImage = document.getElementById('zoomImage');
  const zoomClose = document.getElementById('zoomClose');
  if (zoomBtn && zoomModal) {
    zoomBtn.addEventListener('click', () => { zoomImage.src = mainImg.src; zoomModal.classList.add('active'); });
    zoomClose.addEventListener('click', () => zoomModal.classList.remove('active'));
    zoomModal.addEventListener('click', (e) => { if (e.target === zoomModal) zoomModal.classList.remove('active'); });
  }

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });

  // Full description tab
  const fullDesc = document.getElementById('fullDescription');
  if (fullDesc) fullDesc.innerHTML = `<p>${product.description}</p><p style="margin-top:16px;color:var(--text-secondary)">All ShopVerse products come with a quality guarantee. Our team carefully selects and verifies every product to ensure you receive only the best. Fast shipping, secure packaging, and world-class customer support are included with every order.</p>`;

  // Related products (same category, excluding current)
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  renderProductGrid('relatedProductsGrid', related);
}

/* ─────────────────────────────────────────
   9. CART PAGE
   ───────────────────────────────────────── */
async function initCartPage() {
  await fetchProducts();
  const cartItemsList = document.getElementById('cartItemsList');
  const cartLayout = document.getElementById('cartLayout');
  const emptyCart = document.getElementById('emptyCart');
  const cartItemCount = document.getElementById('cartItemCount');

  if (!cartItemsList) return;

  function renderCart() {
    const cartItems = Cart.get();

    if (cartItems.length === 0) {
      if (cartLayout) cartLayout.style.display = 'none';
      if (emptyCart) emptyCart.style.display = 'block';
      if (cartItemCount) cartItemCount.textContent = '0';
      return;
    }

    if (cartLayout) cartLayout.style.display = 'grid';
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartItemCount) cartItemCount.textContent = cartItems.reduce((s, i) => s + i.qty, 0);

    cartItemsList.innerHTML = '';

    cartItems.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return;

      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <div class="cart-item__product">
          <a href="product-detail.html?id=${product.id}" class="cart-item__image">
            <img src="${product.image}" alt="${product.name}" />
          </a>
          <div class="cart-item__details">
            <h4><a href="product-detail.html?id=${product.id}">${product.name}</a></h4>
            <span>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
          </div>
        </div>
        <div class="cart-item__price">${formatPrice(product.price)}</div>
        <div class="cart-item__quantity">
          <div class="quantity-selector">
            <button class="quantity-btn qty-minus" aria-label="Decrease">${feather.icons['minus'].toSvg({ width: 14, height: 14 })}</button>
            <input type="number" class="quantity-input" value="${item.qty}" min="1" max="10" readonly />
            <button class="quantity-btn qty-plus" aria-label="Increase">${feather.icons['plus'].toSvg({ width: 14, height: 14 })}</button>
          </div>
        </div>
        <div class="cart-item__subtotal">${formatPrice(product.price * item.qty)}</div>
        <button class="cart-item__remove" aria-label="Remove item">${feather.icons['trash-2'].toSvg({ width: 18, height: 18 })}</button>
      `;

      // Quantity buttons
      row.querySelector('.qty-minus').addEventListener('click', () => { Cart.updateQty(product.id, item.qty - 1); renderCart(); });
      row.querySelector('.qty-plus').addEventListener('click', () => { Cart.updateQty(product.id, item.qty + 1); renderCart(); });
      row.querySelector('.cart-item__remove').addEventListener('click', () => { Cart.remove(product.id); showToast('info', 'Removed', `${product.name} removed from cart`); renderCart(); });

      cartItemsList.appendChild(row);
    });

    updateOrderSummary();
  }

  let appliedDiscount = 0;

  function updateOrderSummary() {
    const subtotal = Cart.subtotal();
    const shipping = subtotal >= 999 ? 0 : 99;
    const tax = Math.round(subtotal * 0.18);
    const discount = appliedDiscount;
    const total = subtotal + shipping + tax - discount;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('summarySubtotal', formatPrice(subtotal));
    set('summaryShipping', shipping === 0 ? 'FREE' : formatPrice(shipping));
    set('summaryTax', formatPrice(tax));
    set('summaryTotal', formatPrice(total));

    const discRow = document.getElementById('discountRow');
    const discVal = document.getElementById('summaryDiscount');
    if (discRow && discount > 0) {
      discRow.style.display = 'flex';
      if (discVal) discVal.textContent = `-${formatPrice(discount)}`;
    } else if (discRow) {
      discRow.style.display = 'none';
    }
  }

  // Coupon system — validated via Cart Service API
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponInput = document.getElementById('couponInput');
  const couponMessage = document.getElementById('couponMessage');
  let appliedCouponCode = '';

  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', async () => {
      const code = couponInput.value.trim().toUpperCase();
      try {
        const res = await fetch('/api/cart/validate-coupon', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
        const data = await res.json();
        if (data.valid) {
          appliedCouponCode = code;
          appliedDiscount = Math.round(Cart.subtotal() * data.discount / 100);
          couponMessage.textContent = `🎉 Coupon applied! ${data.discount}% discount`;
          couponMessage.className = 'coupon-message success';
        } else {
          appliedCouponCode = '';
          appliedDiscount = 0;
          couponMessage.textContent = 'Invalid coupon code. Try SAVE10, SHOP20, or WELCOME15';
          couponMessage.className = 'coupon-message error';
        }
        updateOrderSummary();
      } catch (err) {
        couponMessage.textContent = 'Could not validate coupon. Please try again.';
        couponMessage.className = 'coupon-message error';
      }
    });
  }

  // Clear cart
  const clearCartBtn = document.getElementById('clearCartBtn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      Cart.clear();
      renderCart();
      showToast('info', 'Cart Cleared', 'All items have been removed from your cart.');
    });
  }

  // Checkout button
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async () => {
      if (Cart.count() === 0) {
        showToast('error', 'Cart Empty', 'Please add items to your cart first.');
        return;
      }
      try {
        const cartItems = Cart.get();
        const payload = {
          items: cartItems.map(i => ({ id: i.id, qty: i.qty })),
          coupon: appliedCouponCode || undefined
        };
        const res = await fetch('/api/cart/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok && data.status === 'confirmed') {
          showToast('success', 'Order Placed!', `Thank you for shopping with ShopVerse! Order: ${data.orderId.slice(0,8)}... 🎉`);
          Cart.clear();
          setTimeout(() => renderCart(), 500);
        } else {
          showToast('error', 'Checkout Failed', data.error || 'Please try again.');
        }
      } catch (err) {
        showToast('error', 'Checkout Error', 'Could not process your order. Please try again.');
      }
    });
  }

  // Suggested products (random 4)
  const shuffled = [...PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, 4);
  renderProductGrid('suggestedProductsGrid', shuffled);

  renderCart();
}

/* ─────────────────────────────────────────
   10. DARK MODE
   ───────────────────────────────────────── */
function initDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  const html = document.documentElement;
  const stored = localStorage.getItem('shopverse_theme');

  if (stored) html.setAttribute('data-theme', stored);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('shopverse_theme', next);
    });
  }
}

/* ─────────────────────────────────────────
   11. SCROLL ANIMATIONS
   ───────────────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────
   12. NAVBAR SCROLL & MOBILE MENU
   ───────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll effects
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    if (navbar) navbar.classList.toggle('scrolled', scrolled);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  // Scroll to top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Mobile menu toggle
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileMenuToggle.querySelector('.icon-menu').style.display = isOpen ? 'none' : 'block';
      mobileMenuToggle.querySelector('.icon-close').style.display = isOpen ? 'block' : 'none';
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileMenuToggle.querySelector('.icon-menu').style.display = 'block';
        mobileMenuToggle.querySelector('.icon-close').style.display = 'none';
      });
    });
  }
}

/* ─────────────────────────────────────────
   13. NEWSLETTER FORM
   ───────────────────────────────────────── */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      if (email) {
        showToast('success', 'Subscribed!', `You'll receive updates at ${email}`);
        form.reset();
      }
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   14. MAIN INITIALIZATION — runs on every page
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  // Replace feather icons
  if (typeof feather !== 'undefined') feather.replace();

  // Global modules
  initDarkMode();
  initNavbar();
  initScrollAnimations();
  Cart.updateBadge();

  // Page-specific initializers (async — fetch products from API)
  if (document.getElementById('featuredProducts')) await initHomePage();
  if (document.getElementById('productsGrid') && document.getElementById('searchInput')) await initProductsPage();
  if (document.getElementById('productDetail')) await initProductDetailPage();
  if (document.getElementById('cartItemsList')) await initCartPage();

  // Newsletter (home page)
  initNewsletter();
});
