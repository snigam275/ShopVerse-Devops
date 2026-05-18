/* ═══════════════════════════════════════════════════════════
   SHOPVERSE — Main JavaScript
   Modules: Product Data, Cart (localStorage), UI Utilities,
   Rendering, Search/Filter, Page Initializers
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   1. PRODUCT DATA
   ───────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, name: 'Wireless Noise-Cancelling Headphones', category: 'electronics',
    price: 4999, originalPrice: 7999, rating: 4.8, reviews: 342,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop'
    ],
    description: 'Experience pure audio bliss with our premium wireless headphones featuring active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam ear cushions.',
    highlights: ['Active Noise Cancellation', '30-hour battery life', 'Bluetooth 5.2', 'Memory foam cushions', 'Foldable design'],
    badge: 'Best Seller', brand: 'SoundMax', material: 'Premium Plastic & Metal', weight: '250g', warranty: '2 Years'
  },
  {
    id: 2, name: 'Smart Fitness Watch Pro', category: 'electronics',
    price: 3499, originalPrice: 5999, rating: 4.6, reviews: 218,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=500&h=500&fit=crop'
    ],
    description: 'Stay on top of your fitness goals with heart rate monitoring, GPS tracking, sleep analysis, and 7-day battery life. Water-resistant up to 50 meters.',
    highlights: ['Heart rate monitoring', 'Built-in GPS', 'Sleep tracking', '7-day battery', '50m water resistance'],
    badge: 'New', brand: 'FitTech', material: 'Aluminum & Silicone', weight: '45g', warranty: '1 Year'
  },
  {
    id: 3, name: 'Classic Leather Jacket', category: 'fashion',
    price: 6999, originalPrice: 9999, rating: 4.7, reviews: 156,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&h=500&fit=crop'
    ],
    description: 'Crafted from genuine leather with a modern slim fit. Features a quilted lining, multiple pockets, and premium YKK zippers.',
    highlights: ['Genuine leather', 'Quilted lining', 'Slim fit', 'YKK zippers', 'Multiple pockets'],
    badge: 'Trending', brand: 'UrbanEdge', material: 'Genuine Leather', weight: '1.2kg', warranty: '6 Months'
  },
  {
    id: 4, name: 'Premium Sunglasses UV400', category: 'accessories',
    price: 1999, originalPrice: 3499, rating: 4.5, reviews: 89,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop'
    ],
    description: 'Polarized lenses with UV400 protection. Lightweight titanium frame with anti-scratch coating. Comes with a premium hard case.',
    highlights: ['UV400 protection', 'Polarized lenses', 'Titanium frame', 'Anti-scratch coating', 'Hard case included'],
    badge: 'Sale', brand: 'VisionPro', material: 'Titanium & Polycarbonate', weight: '28g', warranty: '1 Year'
  },
  {
    id: 5, name: 'Minimalist Desk Lamp', category: 'home',
    price: 2499, originalPrice: 3999, rating: 4.4, reviews: 123,
    image: 'https://images.unsplash.com/photo-1534105615256-13940a56ff44?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1534105615256-13940a56ff44?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=500&h=500&fit=crop'
    ],
    description: 'Scandinavian-inspired LED desk lamp with touch dimming, 3 color temperatures, and a USB charging port. Perfect for your workspace.',
    highlights: ['Touch dimming', '3 color temperatures', 'USB charging port', 'LED technology', 'Energy efficient'],
    badge: '', brand: 'LumiHome', material: 'Aluminum & Wood', weight: '680g', warranty: '2 Years'
  },
  {
    id: 6, name: 'Portable Bluetooth Speaker', category: 'electronics',
    price: 2999, originalPrice: 4499, rating: 4.6, reviews: 275,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=500&h=500&fit=crop'
    ],
    description: '360° immersive sound with deep bass. IPX7 waterproof rating, 20-hour playtime, and built-in microphone for hands-free calls.',
    highlights: ['360° sound', 'IPX7 waterproof', '20-hour battery', 'Built-in mic', 'Dual pairing'],
    badge: 'Hot', brand: 'BassWave', material: 'Rubberized Plastic', weight: '520g', warranty: '1 Year'
  },
  {
    id: 7, name: 'Casual Cotton Sneakers', category: 'fashion',
    price: 2499, originalPrice: 3999, rating: 4.3, reviews: 198,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop'
    ],
    description: 'Breathable canvas sneakers with cushioned insole and flexible rubber outsole. Perfect for everyday casual wear.',
    highlights: ['Breathable canvas', 'Cushioned insole', 'Rubber outsole', 'Lightweight', 'Machine washable'],
    badge: '', brand: 'StepEasy', material: 'Canvas & Rubber', weight: '340g', warranty: '3 Months'
  },
  {
    id: 8, name: 'Luxury Leather Wallet', category: 'accessories',
    price: 1499, originalPrice: 2499, rating: 4.7, reviews: 312,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500&h=500&fit=crop'
    ],
    description: 'Handcrafted from premium Italian leather with RFID blocking technology. Features 8 card slots, 2 currency compartments, and a coin pocket.',
    highlights: ['Italian leather', 'RFID blocking', '8 card slots', 'Slim design', 'Gift box included'],
    badge: 'Popular', brand: 'CraftLux', material: 'Italian Leather', weight: '85g', warranty: '1 Year'
  },
  {
    id: 9, name: 'Ceramic Pour-Over Coffee Set', category: 'home',
    price: 1899, originalPrice: 2999, rating: 4.5, reviews: 87,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=500&h=500&fit=crop'
    ],
    description: 'Artisan-crafted ceramic brew set for the perfect pour-over coffee. Includes dripper, server, and two cups with bamboo accents.',
    highlights: ['Hand-glazed ceramic', 'Bamboo accents', 'Complete set', 'Sustainable packaging', 'Dishwasher safe'],
    badge: '', brand: 'BrewArt', material: 'Ceramic & Bamboo', weight: '950g', warranty: '6 Months'
  },
  {
    id: 10, name: 'Wireless Charging Pad', category: 'electronics',
    price: 999, originalPrice: 1999, rating: 4.2, reviews: 445,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop'
    ],
    description: '15W fast wireless charger compatible with all Qi-enabled devices. Features LED indicator and anti-slip surface.',
    highlights: ['15W fast charging', 'Qi compatible', 'LED indicator', 'Anti-slip pad', 'Ultra-thin design'],
    badge: 'Deal', brand: 'ChargePro', material: 'Aluminum & Silicone', weight: '120g', warranty: '1 Year'
  },
  {
    id: 11, name: 'Premium Denim Jeans', category: 'fashion',
    price: 3499, originalPrice: 4999, rating: 4.4, reviews: 167,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop'
    ],
    description: 'Japanese selvedge denim with a modern tapered fit. Pre-washed for comfort with authentic distressing details.',
    highlights: ['Japanese selvedge denim', 'Tapered fit', 'Pre-washed', 'Authentic distressing', 'Reinforced stitching'],
    badge: '', brand: 'DenimCo', material: '100% Cotton Denim', weight: '700g', warranty: '3 Months'
  },
  {
    id: 12, name: 'Stainless Steel Water Bottle', category: 'accessories',
    price: 899, originalPrice: 1499, rating: 4.6, reviews: 523,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop'
    ],
    description: 'Double-wall vacuum insulated bottle keeps drinks cold for 24 hours or hot for 12. BPA-free with a leak-proof cap.',
    highlights: ['24hr cold / 12hr hot', 'Double-wall insulation', 'BPA-free', 'Leak-proof', '750ml capacity'],
    badge: 'Eco', brand: 'HydroLife', material: '18/8 Stainless Steel', weight: '350g', warranty: '5 Years'
  },
  {
    id: 13, name: 'Scented Soy Candle Set', category: 'home',
    price: 1299, originalPrice: 1999, rating: 4.8, reviews: 234,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&h=500&fit=crop'
    ],
    description: 'Set of 3 hand-poured soy wax candles in premium glass jars. Scents: Lavender Dreams, Vanilla Bean, and Ocean Breeze. 45-hour burn time each.',
    highlights: ['100% soy wax', 'Cotton wicks', '45-hour burn time', '3 scents included', 'Reusable glass jars'],
    badge: 'Gift Pick', brand: 'GlowCraft', material: 'Soy Wax & Glass', weight: '900g', warranty: 'N/A'
  },
  {
    id: 14, name: 'Ultra-Slim Laptop Backpack', category: 'accessories',
    price: 2799, originalPrice: 4499, rating: 4.5, reviews: 178,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500&h=500&fit=crop'
    ],
    description: 'Water-resistant backpack with padded 15.6" laptop compartment, anti-theft hidden pocket, and USB charging port. Ergonomic design for daily commute.',
    highlights: ['Water-resistant', 'USB charging port', 'Anti-theft pocket', 'Padded laptop slot', 'Ergonomic straps'],
    badge: '', brand: 'PackPro', material: 'Nylon & Polyester', weight: '750g', warranty: '2 Years'
  },
  {
    id: 15, name: 'Graphic Print T-Shirt', category: 'fashion',
    price: 799, originalPrice: 1299, rating: 4.1, reviews: 432,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=500&fit=crop'
    ],
    description: 'Soft-touch 100% organic cotton with a unique artist-designed graphic. Pre-shrunk with reinforced collar stitching.',
    highlights: ['100% organic cotton', 'Artist collaboration', 'Pre-shrunk', 'Reinforced collar', 'Eco-friendly dyes'],
    badge: '', brand: 'ArtWear', material: 'Organic Cotton', weight: '180g', warranty: 'N/A'
  },
  {
    id: 16, name: 'Smart Home LED Strip', category: 'home',
    price: 1599, originalPrice: 2499, rating: 4.3, reviews: 301,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&h=500&fit=crop'
    ],
    description: 'WiFi-enabled RGB LED strip with 16 million colors, music sync, and voice control via Alexa/Google. 5 meters with adhesive backing.',
    highlights: ['16M colors', 'Music sync', 'Voice control', '5m length', 'App controlled'],
    badge: 'Smart', brand: 'LumiSmart', material: 'Flexible PCB', weight: '200g', warranty: '1 Year'
  }
];

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
function initHomePage() {
  // Render 8 featured products (highest rated)
  const featured = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 8);
  renderProductGrid('featuredProducts', featured);
}

/* ─────────────────────────────────────────
   7. PRODUCTS PAGE — Search, Filter, Sort
   ───────────────────────────────────────── */
function initProductsPage() {
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
function initProductDetailPage() {
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
function initCartPage() {
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

  // Coupon system
  const COUPONS = { 'SAVE10': 10, 'SHOP20': 20, 'WELCOME15': 15 };
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponInput = document.getElementById('couponInput');
  const couponMessage = document.getElementById('couponMessage');

  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', () => {
      const code = couponInput.value.trim().toUpperCase();
      if (COUPONS[code]) {
        appliedDiscount = Math.round(Cart.subtotal() * COUPONS[code] / 100);
        couponMessage.textContent = `🎉 Coupon applied! ${COUPONS[code]}% discount`;
        couponMessage.className = 'coupon-message success';
        updateOrderSummary();
      } else {
        appliedDiscount = 0;
        couponMessage.textContent = 'Invalid coupon code. Try SAVE10, SHOP20, or WELCOME15';
        couponMessage.className = 'coupon-message error';
        updateOrderSummary();
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
    checkoutBtn.addEventListener('click', () => {
      if (Cart.count() === 0) {
        showToast('error', 'Cart Empty', 'Please add items to your cart first.');
        return;
      }
      showToast('success', 'Order Placed!', 'Thank you for shopping with ShopVerse! 🎉');
      Cart.clear();
      setTimeout(() => renderCart(), 500);
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
document.addEventListener('DOMContentLoaded', () => {
  // Replace feather icons
  if (typeof feather !== 'undefined') feather.replace();

  // Global modules
  initDarkMode();
  initNavbar();
  initScrollAnimations();
  Cart.updateBadge();

  // Page-specific initializers — detect by unique element presence
  if (document.getElementById('featuredProducts')) initHomePage();
  if (document.getElementById('productsGrid') && document.getElementById('searchInput')) initProductsPage();
  if (document.getElementById('productDetail')) initProductDetailPage();
  if (document.getElementById('cartItemsList')) initCartPage();

  // Newsletter (home page)
  initNewsletter();
});
