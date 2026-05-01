/* ===== VEYRA — Main Application ===== */

// ── Assets Config ──
const assets = {
  heroDt: 'https://picsum.photos/1920/900?random=1',
  heroMb: 'https://picsum.photos/768/1024?random=1',
  splitEffortless: 'https://picsum.photos/960/800?random=2',
  splitStatement: 'https://picsum.photos/960/800?random=3',
  lifestyle: 'https://picsum.photos/1200/800?random=4',
  chapters: 'https://picsum.photos/1920/700?random=5',
  products: [
    { id: 1, name: 'Silk Wrap Dress', price: '₹8,900', img: 'https://picsum.photos/480/600?random=10' },
    { id: 2, name: 'Linen Co-ord Set', price: '₹6,400', img: 'https://picsum.photos/480/600?random=11' },
    { id: 3, name: 'Ribbed Knit Top', price: '₹3,200', img: 'https://picsum.photos/480/600?random=12' },
    { id: 4, name: 'Wide Leg Trouser', price: '₹5,100', img: 'https://picsum.photos/480/600?random=13' },
    { id: 5, name: 'Satin Slip Dress', price: '₹7,600', img: 'https://picsum.photos/480/600?random=14' },
    { id: 6, name: 'Oversized Blazer', price: '₹9,200', img: 'https://picsum.photos/480/600?random=15' },
    { id: 7, name: 'Cropped Cardigan', price: '₹4,800', img: 'https://picsum.photos/480/600?random=16' },
    { id: 8, name: 'Pleated Midi Skirt', price: '₹5,500', img: 'https://picsum.photos/480/600?random=17' },
  ]
};

// ── State ──
const state = {
  cart: [],
  wishlist: [],
  megaTimeout: null
};

// ── DOM Ready ──
document.addEventListener('DOMContentLoaded', () => {
  initProgress();
  initNav();
  initMega();
  initMobileNav();
  initHeroScroll();
  renderProducts();
  initCarousel();
  initDrawers();
  initSearch();
  initNewsletter();
  initScrollReveal();
  initSwiper();
});

// ── Progress Bar ──
function initProgress() {
  const bar = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / h * 100) + '%';
  }, { passive: true });
}

// ── Sticky Nav ──
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── Mega Menus ──
function initMega() {
  const items = document.querySelectorAll('.nav__item[data-mega]');
  const megas = document.querySelectorAll('.mega');

  function closeAll() {
    megas.forEach(m => m.classList.remove('active'));
    items.forEach(i => {
      const link = i.querySelector('.nav__link');
      if (link) link.setAttribute('aria-expanded', 'false');
    });
  }

  items.forEach(item => {
    const key = item.dataset.mega;
    const mega = document.getElementById('mega-' + key);
    const link = item.querySelector('.nav__link');

    item.addEventListener('mouseenter', () => {
      clearTimeout(state.megaTimeout);
      closeAll();
      if (mega) {
        mega.classList.add('active');
        if (link) link.setAttribute('aria-expanded', 'true');
      }
    });

    item.addEventListener('mouseleave', () => {
      state.megaTimeout = setTimeout(closeAll, 200);
    });

    if (mega) {
      mega.addEventListener('mouseenter', () => clearTimeout(state.megaTimeout));
      mega.addEventListener('mouseleave', () => { state.megaTimeout = setTimeout(closeAll, 200); });
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav__item') && !e.target.closest('.mega')) closeAll();
  });
}

// ── Mobile Nav ──
function initMobileNav() {
  const btn = document.getElementById('hamburgerBtn');
  const nav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');

  function toggle(open) {
    nav.classList.toggle('active', open);
    overlay.classList.toggle('active', open);
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.addEventListener('click', () => toggle(!nav.classList.contains('active')));
  overlay.addEventListener('click', () => toggle(false));

  // Accordion
  document.querySelectorAll('.mobile-nav__item [data-expand]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const sub = a.nextElementSibling;
      if (!sub) return;
      const isOpen = sub.classList.contains('open');
      document.querySelectorAll('.mobile-nav__sub').forEach(s => s.classList.remove('open'));
      if (!isOpen) sub.classList.add('open');
      a.querySelector('span').textContent = isOpen ? '+' : '−';
    });
  });

  // Close on sub-link click
  nav.querySelectorAll('.mobile-nav__sub a').forEach(a => {
    a.addEventListener('click', () => toggle(false));
  });
}

// ── Hero Scroll Indicator ──
function initHeroScroll() {
  const el = document.getElementById('scrollIndicator');
  if (el) {
    el.addEventListener('click', () => {
      document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// ── Render Products ──
function renderProducts() {
  const track = document.getElementById('productsTrack');
  if (!track) return;
  track.innerHTML = assets.products.map(p => `
    <article class="card" data-id="${p.id}">
      <div class="card__img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <button class="card__wish" aria-label="Add ${p.name} to wishlist" data-wish="${p.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="card__quick">
          <div class="card__sizes">
            <span data-size="XS">XS</span><span data-size="S">S</span><span data-size="M">M</span><span data-size="L">L</span><span data-size="XL">XL</span>
          </div>
        </div>
      </div>
      <p class="card__name">${p.name}</p>
      <p class="card__price">${p.price}</p>
    </article>
  `).join('');

  // Wishlist hearts
  track.querySelectorAll('.card__wish').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.wish);
      toggleWishlist(id);
      btn.classList.toggle('active');
      btn.style.transform = 'scale(1.3)';
      setTimeout(() => btn.style.transform = '', 200);
    });
  });

  // Quick Add sizes
  track.querySelectorAll('.card__sizes span').forEach(chip => {
    chip.addEventListener('click', e => {
      e.stopPropagation();
      const card = chip.closest('.card');
      const id = parseInt(card.dataset.id);
      const size = chip.dataset.size;
      addToCart(id, size);
    });
  });
}

// ── Cart Logic ──
function addToCart(productId, size) {
  const product = assets.products.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(i => i.id === productId && i.size === size);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ ...product, size, qty: 1 });
  }
  updateCartUI();
  openDrawer('cart');
}

function removeFromCart(productId, size) {
  state.cart = state.cart.filter(i => !(i.id === productId && i.size === size));
  updateCartUI();
}

function updateCartQty(productId, size, delta) {
  const item = state.cart.find(i => i.id === productId && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) return removeFromCart(productId, size);
  updateCartUI();
}

function updateCartUI() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartBadge').textContent = count;
  document.getElementById('cartCount').textContent = count;
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');

  if (state.cart.length === 0) {
    body.innerHTML = '<p style="color:var(--text2);font-size:.85rem;text-align:center;margin-top:3rem">Your bag is empty</p>';
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  body.innerHTML = state.cart.map(i => `
    <div class="cart-item">
      <div class="cart-item__img"><img src="${i.img}" alt="${i.name}"></div>
      <div class="cart-item__info">
        <p class="cart-item__name">${i.name}</p>
        <p class="cart-item__meta">Size: ${i.size}</p>
        <div class="cart-item__qty">
          <button aria-label="Decrease quantity" onclick="updateCartQty(${i.id},'${i.size}',-1)">−</button>
          <span>${i.qty}</span>
          <button aria-label="Increase quantity" onclick="updateCartQty(${i.id},'${i.size}',1)">+</button>
        </div>
        <span class="cart-item__remove" onclick="removeFromCart(${i.id},'${i.size}')">Remove</span>
      </div>
    </div>
  `).join('');

  // Calculate total
  const total = state.cart.reduce((s, i) => {
    const price = parseInt(i.price.replace(/[₹,]/g, ''));
    return s + price * i.qty;
  }, 0);
  document.getElementById('cartTotal').textContent = '₹' + total.toLocaleString('en-IN');
}

// ── Wishlist Logic ──
function toggleWishlist(productId) {
  const idx = state.wishlist.indexOf(productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
  } else {
    state.wishlist.push(productId);
  }
  updateWishlistUI();
}

function updateWishlistUI() {
  document.getElementById('wishBadge').textContent = state.wishlist.length;
  document.getElementById('wishCount').textContent = state.wishlist.length;
  const body = document.getElementById('wishBody');

  if (state.wishlist.length === 0) {
    body.innerHTML = '<p style="color:var(--text2);font-size:.85rem;text-align:center;margin-top:3rem">Your wishlist is empty</p>';
    return;
  }

  body.innerHTML = state.wishlist.map(id => {
    const p = assets.products.find(x => x.id === id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <div class="cart-item__img"><img src="${p.img}" alt="${p.name}"></div>
        <div class="cart-item__info">
          <p class="cart-item__name">${p.name}</p>
          <p class="cart-item__price">${p.price}</p>
          <button class="btn" style="padding:.4rem .8rem;font-size:.65rem;margin-top:.5rem" onclick="addToCart(${p.id},'M');toggleWishlist(${p.id});document.querySelector('[data-wish=&quot;${p.id}&quot;]')?.classList.remove('active')">Move to Cart</button>
          <span class="cart-item__remove" onclick="toggleWishlist(${p.id});document.querySelector('[data-wish=&quot;${p.id}&quot;]')?.classList.remove('active')">Remove</span>
        </div>
      </div>
    `;
  }).join('');
}

// ── Carousel ──
function initCarousel() {
  const track = document.getElementById('productsTrack');
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  if (!track || !prev || !next) return;

  const scrollAmt = 280;
  prev.addEventListener('click', () => track.scrollBy({ left: -scrollAmt, behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: scrollAmt, behavior: 'smooth' }));
}

// ── Drawers ──
function initDrawers() {
  const drawers = {
    cart: { drawer: 'cartDrawer', overlay: 'cartOverlay', close: 'cartClose', trigger: 'cartBtn' },
    wish: { drawer: 'wishDrawer', overlay: 'wishOverlay', close: 'wishClose', trigger: 'wishlistBtn' },
    acct: { drawer: 'acctDrawer', overlay: 'acctOverlay', close: 'acctClose', trigger: 'accountBtn' }
  };

  Object.entries(drawers).forEach(([key, ids]) => {
    const drawer = document.getElementById(ids.drawer);
    const overlay = document.getElementById(ids.overlay);
    const close = document.getElementById(ids.close);
    const trigger = document.getElementById(ids.trigger);

    if (!drawer || !overlay) return;

    trigger?.addEventListener('click', () => openDrawer(key));
    close?.addEventListener('click', () => closeDrawer(key));
    overlay.addEventListener('click', () => closeDrawer(key));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      ['cart', 'wish', 'acct'].forEach(closeDrawer);
      closeSearch();
    }
  });
}

function openDrawer(key) {
  const map = { cart: 'cartDrawer', wish: 'wishDrawer', acct: 'acctDrawer' };
  const oMap = { cart: 'cartOverlay', wish: 'wishOverlay', acct: 'acctOverlay' };
  const d = document.getElementById(map[key]);
  const o = document.getElementById(oMap[key]);
  if (d) { d.classList.add('active'); document.body.style.overflow = 'hidden'; }
  if (o) o.classList.add('active');
}

function closeDrawer(key) {
  const map = { cart: 'cartDrawer', wish: 'wishDrawer', acct: 'acctDrawer' };
  const oMap = { cart: 'cartOverlay', wish: 'wishOverlay', acct: 'acctOverlay' };
  const d = document.getElementById(map[key]);
  const o = document.getElementById(oMap[key]);
  if (d) d.classList.remove('active');
  if (o) o.classList.remove('active');
  // Restore scroll if no drawer open
  if (!document.querySelector('.drawer.active')) document.body.style.overflow = '';
}

// ── Search ──
function initSearch() {
  const overlay = document.getElementById('searchOverlay');
  const btn = document.getElementById('searchBtn');
  const close = document.getElementById('searchClose');
  const input = document.getElementById('searchInput');

  btn?.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 200);
  });

  close?.addEventListener('click', closeSearch);
}

function closeSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay?.classList.remove('active');
  if (!document.querySelector('.drawer.active')) document.body.style.overflow = '';
}

// ── Newsletter ──
function initNewsletter() {
  const form = document.getElementById('nlForm');
  const msg = document.getElementById('nlMsg');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    msg.style.display = 'block';
    form.reset();
    setTimeout(() => msg.style.display = 'none', 4000);
  });
}

// ── Scroll Reveal ──
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

// ── Style Swiper ──
function initSwiper() {
  const stack = document.getElementById('swiperStack');
  const progress = document.getElementById('swiperProgress');
  const label = document.getElementById('swiperLabel');
  const matchFlash = document.getElementById('swiperMatch');
  const btnLike = document.getElementById('swiperLike');
  const btnDislike = document.getElementById('swiperDislike');
  const btnUndo = document.getElementById('swiperUndo');
  const resultsGrid = document.getElementById('swiperResultsGrid');
  const resultsSection = document.getElementById('swiperResults');
  const stackWrap = document.getElementById('swiperStackWrap');
  const btns = document.getElementById('swiperBtns');
  const restartBtn = document.getElementById('swiperRestart');

  if (!stack) return;

  const SWIPER_PRODUCTS = [
    { id: 101, name: "Silk Wrap Dress", category: "Dresses", price: "₹8,900", img: "https://picsum.photos/seed/dress1/500/650" },
    { id: 102, name: "Linen Co-ord Set", category: "Co-ords", price: "₹6,400", img: "https://picsum.photos/seed/coord1/500/650" },
    { id: 103, name: "Ribbed Knit Top", category: "Tops", price: "₹3,200", img: "https://picsum.photos/seed/knit1/500/650" },
    { id: 104, name: "Wide Leg Trouser", category: "Bottoms", price: "₹5,100", img: "https://picsum.photos/seed/trouser1/500/650" },
    { id: 105, name: "Satin Slip Dress", category: "Dresses", price: "₹7,600", img: "https://picsum.photos/seed/slip1/500/650" },
    { id: 106, name: "Oversized Blazer", category: "Outerwear", price: "₹9,200", img: "https://picsum.photos/seed/blazer1/500/650" },
    { id: 107, name: "Cropped Cardigan", category: "Knitwear", price: "₹4,800", img: "https://picsum.photos/seed/cardi1/500/650" },
    { id: 108, name: "Pleated Midi Skirt", category: "Bottoms", price: "₹5,500", img: "https://picsum.photos/seed/skirt1/500/650" },
    { id: 109, name: "Boxy Linen Shirt", category: "Tops", price: "₹4,200", img: "https://picsum.photos/seed/linen1/500/650" },
    { id: 110, name: "Trench Coat", category: "Outerwear", price: "₹12,400", img: "https://picsum.photos/seed/trench1/500/650" }
  ];

  let cards = [...SWIPER_PRODUCTS];
  let liked = [];
  let history = [];

  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let topCard = null;

  function renderCards() {
    stack.innerHTML = '';
    const visibleCards = cards.slice(0, 3).reverse(); // Render top 3 for performance
    
    if (cards.length === 0) {
      stack.innerHTML = '<div class="swiper-empty">All done!</div>';
      showResults();
      return;
    }

    visibleCards.forEach((product, i) => {
      const isTop = i === visibleCards.length - 1;
      const el = document.createElement('div');
      el.className = 'swiper-card';
      el.dataset.id = product.id;
      
      // Calculate scale and translation for background cards
      const scale = isTop ? 1 : 1 - ((visibleCards.length - 1 - i) * 0.05);
      const translateY = isTop ? 0 : ((visibleCards.length - 1 - i) * 16);
      
      el.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      el.style.zIndex = i;

      el.innerHTML = \`
        <img src="\${product.img}" alt="\${product.name}">
        <div class="swiper-card__overlay"></div>
        <div class="swiper-stamp swiper-stamp--like" id="stamp-like-\${product.id}">LIKE</div>
        <div class="swiper-stamp swiper-stamp--nope" id="stamp-nope-\${product.id}">NOPE</div>
        <div class="swiper-card__info">
          <p class="swiper-card__cat">\${product.category}</p>
          <h3 class="swiper-card__title">\${product.name}</h3>
          <p class="swiper-card__price">\${product.price}</p>
        </div>
      \`;

      if (isTop) {
        topCard = el;
        initDrag(el);
      }
      
      stack.appendChild(el);
    });

    updateProgress();
    btnUndo.disabled = history.length === 0;
  }

  function updateProgress() {
    const remaining = cards.length;
    const total = SWIPER_PRODUCTS.length;
    const pct = ((total - remaining) / total) * 100;
    progress.style.width = \`\${pct}%\`;
    label.textContent = \`\${remaining} / \${total} remaining\`;
  }

  function showMatch() {
    matchFlash.classList.add('active');
    setTimeout(() => {
      matchFlash.classList.remove('active');
    }, 800);
  }

  function showResults() {
    stackWrap.style.display = 'none';
    btns.style.display = 'none';
    resultsSection.style.display = 'block';
    
    if (liked.length === 0) {
      resultsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text2); font-style: italic;">Nothing saved this time.</p>';
      return;
    }

    resultsGrid.innerHTML = liked.map(p => \`
      <div class="swiper-result-card">
        <img src="\${p.img}" alt="\${p.name}">
        <span class="swiper-result-card__cat">\${p.category}</span>
        <h4 class="swiper-result-card__title">\${p.name}</h4>
        <p class="swiper-result-card__price">\${p.price}</p>
      </div>
    \`).join('');
  }

  function handleSwipe(dir) {
    if (cards.length === 0) return;
    const product = cards.shift();
    
    if (dir === 'right') {
      liked.push(product);
      showMatch();
    }
    
    history.push({ product, dir });
    
    if (topCard) {
      const x = dir === 'right' ? window.innerWidth : -window.innerWidth;
      topCard.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      topCard.style.transform = \`translate(\${x}px, 0px) rotate(\${dir === 'right' ? 30 : -30}deg)\`;
      
      // Delay render to let animation finish
      setTimeout(() => {
        renderCards();
      }, 300);
    } else {
      renderCards();
    }
  }

  function undoSwipe() {
    if (history.length === 0) return;
    const last = history.pop();
    cards.unshift(last.product);
    
    if (last.dir === 'right') {
      liked = liked.filter(p => p.id !== last.product.id);
    }
    
    renderCards();
  }

  // Drag logic
  function initDrag(el) {
    el.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startX = e.clientX;
      el.classList.add('dragging');
      // Prevent default to avoid selection/image dragging
      e.preventDefault(); 
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging || !topCard) return;
      currentX = e.clientX - startX;
      const rotate = currentX * 0.05;
      
      topCard.style.transform = \`translate(\${currentX}px, 0px) rotate(\${rotate}deg) scale(1.04)\`;
      
      const likeStamp = document.getElementById(\`stamp-like-\${cards[0].id}\`);
      const nopeStamp = document.getElementById(\`stamp-nope-\${cards[0].id}\`);
      
      if (currentX > 0) {
        likeStamp.style.opacity = Math.min(currentX / 100, 1);
        nopeStamp.style.opacity = 0;
      } else {
        nopeStamp.style.opacity = Math.min(Math.abs(currentX) / 100, 1);
        likeStamp.style.opacity = 0;
      }
    });

    window.addEventListener('pointerup', () => {
      if (!isDragging || !topCard) return;
      isDragging = false;
      topCard.classList.remove('dragging');
      
      const threshold = window.innerWidth * 0.25; // 25% of screen width
      
      if (currentX > threshold) {
        handleSwipe('right');
      } else if (currentX < -threshold) {
        handleSwipe('left');
      } else {
        // Reset
        topCard.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        topCard.style.transform = 'translate(0px, 0px) rotate(0deg) scale(1)';
        
        const likeStamp = document.getElementById(\`stamp-like-\${cards[0].id}\`);
        const nopeStamp = document.getElementById(\`stamp-nope-\${cards[0].id}\`);
        if(likeStamp) likeStamp.style.opacity = 0;
        if(nopeStamp) nopeStamp.style.opacity = 0;
        
        setTimeout(() => {
          if (topCard) topCard.style.transition = '';
        }, 300);
      }
      
      currentX = 0;
    });
  }

  // Button Listeners
  btnLike.addEventListener('click', () => handleSwipe('right'));
  btnDislike.addEventListener('click', () => handleSwipe('left'));
  btnUndo.addEventListener('click', undoSwipe);
  
  restartBtn.addEventListener('click', () => {
    cards = [...SWIPER_PRODUCTS];
    liked = [];
    history = [];
    stackWrap.style.display = 'block';
    btns.style.display = 'flex';
    resultsSection.style.display = 'none';
    renderCards();
  });

  // Initial Render
  renderCards();
}
