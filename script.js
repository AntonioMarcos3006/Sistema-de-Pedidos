'use strict';

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const formatBRL = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const Storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (err) { console.error('Erro ao salvar no LocalStorage:', err); }
  }
};

const KEYS = {
  products: 'braseiro_products',
  cart: 'braseiro_cart',
  favorites: 'braseiro_favorites',
  theme: 'braseiro_theme',
  orders: 'braseiro_orders'
};

const SEED_PRODUCTS = [

  { id: 'h1', name: 'X-Burger', category: 'hamburgueres', price: 24.9, rating: 4.6,
    desc: 'Pão brioche, blend 150g, queijo prato, alface e tomate.',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    promo: false, popular: true, available: true, featured: true },
  { id: 'h2', name: 'X-Salada', category: 'hamburgueres', price: 27.9, rating: 4.5,
    desc: 'Blend 150g, queijo, alface, tomate, cebola roxa e maionese da casa.',
    img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500',
    promo: false, popular: false, available: true, featured: false },
  { id: 'h3', name: 'X-Bacon', category: 'hamburgueres', price: 31.9, rating: 4.8,
    desc: 'Blend 150g, bacon crocante, queijo cheddar e molho barbecue.',
    img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500',
    promo: true, popular: true, available: true, featured: true },
  { id: 'h4', name: 'Smash Burger', category: 'hamburgueres', price: 29.9, rating: 4.9,
    desc: 'Duplo smash 100g, queijo derretido, picles e molho especial.',
    img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500',
    promo: false, popular: true, available: true, featured: true },

  { id: 'p1', name: 'Pizza Calabresa', category: 'pizzas', price: 44.9, rating: 4.5,
    desc: 'Molho de tomate, calabresa fatiada, cebola e orégano.',
    img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
    promo: false, popular: true, available: true, featured: false },
  { id: 'p2', name: 'Pizza Portuguesa', category: 'pizzas', price: 49.9, rating: 4.7,
    desc: 'Presunto, ovos, cebola, azeitona, ervilha e mussarela.',
    img: 'https://images.unsplash.com/photo-1593246049226-ded77bf90326?w=500',
    promo: false, popular: false, available: true, featured: false },
  { id: 'p3', name: 'Frango com Catupiry', category: 'pizzas', price: 47.9, rating: 4.8,
    desc: 'Frango desfiado temperado com generosa camada de catupiry.',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    promo: true, popular: true, available: true, featured: true },
  { id: 'p4', name: 'Pizza Margherita', category: 'pizzas', price: 42.9, rating: 4.6,
    desc: 'Molho de tomate, mussarela de búfala, manjericão fresco.',
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',
    promo: false, popular: false, available: true, featured: false },

  { id: 'e1', name: 'Batata Frita Crocante', category: 'entradas', price: 18.9, rating: 4.4,
    desc: 'Porção generosa de batatas fritas crocantes com sal e ervas.',
    img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500',
    promo: false, popular: true, available: true, featured: false },
  { id: 'e2', name: 'Anéis de Cebola', category: 'entradas', price: 21.9, rating: 4.3,
    desc: 'Anéis de cebola empanados e fritos, com molho barbecue.',
    img: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500',
    promo: false, popular: false, available: true, featured: false },

  { id: 'm1', name: 'Spaghetti à Bolonhesa', category: 'massas', price: 36.9, rating: 4.5,
    desc: 'Massa al dente com molho bolonhesa de carne e tomate fresco.',
    img: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=500',
    promo: false, popular: false, available: true, featured: false },
  { id: 'm2', name: 'Fettuccine Alfredo', category: 'massas', price: 38.9, rating: 4.6,
    desc: 'Fettuccine ao molho cremoso de queijo parmesão e manteiga.',
    img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500',
    promo: false, popular: false, available: true, featured: false },

  { id: 'c1', name: 'Picanha na Brasa', category: 'carnes', price: 64.9, rating: 4.9,
    desc: 'Picanha grelhada no ponto, acompanha arroz, farofa e vinagrete.',
    img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=500',
    promo: false, popular: true, available: true, featured: true },
  { id: 'c2', name: 'Costela Defumada', category: 'carnes', price: 58.9, rating: 4.7,
    desc: 'Costela suína defumada lentamente, com molho barbecue da casa.',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
    promo: false, popular: false, available: true, featured: false },

  { id: 'b1', name: 'Coca-Cola Lata', category: 'bebidas', price: 6.5, rating: 4.6,
    desc: 'Lata gelada 350ml.',
    img: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500',
    promo: false, popular: true, available: true, featured: false },
  { id: 'b2', name: 'Guaraná Lata', category: 'bebidas', price: 6.5, rating: 4.4,
    desc: 'Lata gelada 350ml.',
    img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500',
    promo: false, popular: false, available: true, featured: false },
  { id: 'b3', name: 'Água Mineral', category: 'bebidas', price: 4.0, rating: 4.2,
    desc: 'Garrafa 500ml, com ou sem gás.',
    img: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?w=500',
    promo: false, popular: false, available: true, featured: false },
  { id: 'b4', name: 'Suco Natural', category: 'bebidas', price: 9.9, rating: 4.5,
    desc: 'Suco natural da fruta do dia, 400ml.',
    img: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=500',
    promo: false, popular: false, available: true, featured: false },

  { id: 's1', name: 'Pudim de Leite', category: 'sobremesas', price: 14.9, rating: 4.8,
    desc: 'Pudim cremoso de leite condensado com calda de caramelo.',
    img: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500',
    promo: false, popular: true, available: true, featured: false },
  { id: 's2', name: 'Brownie com Sorvete', category: 'sobremesas', price: 17.9, rating: 4.9,
    desc: 'Brownie de chocolate quente com bola de sorvete de creme.',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500',
    promo: true, popular: true, available: true, featured: true },
  { id: 's3', name: 'Sorvete Artesanal', category: 'sobremesas', price: 12.9, rating: 4.6,
    desc: 'Duas bolas de sorvete artesanal, sabor a escolher.',
    img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500',
    promo: false, popular: false, available: true, featured: false }
];

const State = {
  products: Storage.get(KEYS.products, null) || SEED_PRODUCTS,
  cart: Storage.get(KEYS.cart, []),
  favorites: Storage.get(KEYS.favorites, []),
  filters: { category: 'todos', search: '', sort: 'relevancia', promo: false, popular: false },
  coupon: null
};

if (!Storage.get(KEYS.products, null)) Storage.set(KEYS.products, State.products);

const COUPONS = {
  'BRASA10': { type: 'percent', value: 10 },
  'FRETEGRATIS': { type: 'freeshipping', value: 0 }
};
const DELIVERY_FEE = 7.9;

function showToast(message, icon = 'fa-circle-check') {
  const stack = $('#toastStack');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  stack.appendChild(el);
  setTimeout(() => {
    el.classList.add('is-leaving');
    setTimeout(() => el.remove(), 300);
  }, 2600);
}

function getFilteredProducts() {
  let list = [...State.products].filter(p => p.available !== false);
  const { category, search, sort, promo, popular } = State.filters;

  if (category !== 'todos') list = list.filter(p => p.category === category);
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
    );
  }
  if (promo) list = list.filter(p => p.promo);
  if (popular) list = list.filter(p => p.popular);

  switch (sort) {
    case 'preco-asc': list.sort((a, b) => a.price - b.price); break;
    case 'preco-desc': list.sort((a, b) => b.price - a.price); break;
    case 'avaliacao': list.sort((a, b) => b.rating - a.rating); break;
    default:
      list.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));
  }
  return list;
}

function renderStars(rating) {
  const full = Math.round(rating);
  return `${'<i class="fa-solid fa-star"></i>'.repeat(full)}${'<i class="fa-regular fa-star"></i>'.repeat(5 - full)}`;
}

function productCard(p) {
  const isFav = State.favorites.includes(p.id);
  const badge = p.promo
    ? '<span class="card__badge card__badge--promo">Promoção</span>'
    : p.popular ? '<span class="card__badge card__badge--popular">Mais vendido</span>' : '';

  return `
  <article class="card" data-id="${p.id}">
    <div class="card__media">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      ${badge}
      <button class="card__fav ${isFav ? 'is-active' : ''}" data-fav="${p.id}" aria-label="Favoritar ${p.name}">
        <i class="fa-solid fa-heart"></i>
      </button>
    </div>
    <div class="card__body">
      <span class="card__cat">${categoryLabel(p.category)}</span>
      <div class="card__top">
        <h3 class="card__name">${p.name}</h3>
        <span class="card__rating">${renderStars(p.rating)} <span>${p.rating.toFixed(1)}</span></span>
      </div>
      <p class="card__desc">${p.desc}</p>
      <div class="card__bottom">
        <span class="card__price">${formatBRL(p.price)}<small>preço final</small></span>
        <button class="card__add" data-add="${p.id}">
          <i class="fa-solid fa-plus"></i> Adicionar
        </button>
      </div>
    </div>
  </article>`;
}

function categoryLabel(cat) {
  const map = {
    entradas: 'Entrada', hamburgueres: 'Hambúrguer', pizzas: 'Pizza', massas: 'Massa',
    carnes: 'Carne', bebidas: 'Bebida', sobremesas: 'Sobremesa'
  };
  return map[cat] || cat;
}

function renderProducts() {
  const grid = $('#productGrid');
  const list = getFilteredProducts();
  grid.innerHTML = list.map(productCard).join('');
  $('#emptyState').hidden = list.length > 0;
  $('#resultCount').textContent = `· ${list.length} ${list.length === 1 ? 'item' : 'itens'}`;
}

function renderRecommended() {
  const grid = $('#recommendedGrid');
  const list = State.products.filter(p => p.available !== false && p.popular).slice(0, 8);
  grid.innerHTML = list.map(productCard).join('');
}

function addToCart(id, qty = 1) {
  const product = State.products.find(p => p.id === id);
  if (!product || product.available === false) return;
  const existing = State.cart.find(i => i.id === id);
  if (existing) existing.qty += qty;
  else State.cart.push({ id, qty });
  persistCart();
  renderCart();
  showToast(`${product.name} adicionado ao carrinho`, 'fa-bag-shopping');
  pulseCartIcon();
}

function updateQty(id, delta) {
  const item = State.cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) State.cart = State.cart.filter(i => i.id !== id);
  persistCart();
  renderCart();
}

function removeFromCart(id) {
  State.cart = State.cart.filter(i => i.id !== id);
  persistCart();
  renderCart();
}

function clearCart() {
  State.cart = [];
  State.coupon = null;
  persistCart();
  renderCart();
}

function persistCart() { Storage.set(KEYS.cart, State.cart); }

function cartLines() {
  return State.cart
    .map(item => {
      const product = State.products.find(p => p.id === item.id);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean);
}

function cartSubtotal() {
  return cartLines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
}

function cartDiscount(subtotal) {
  if (!State.coupon) return 0;
  if (State.coupon.type === 'percent') return subtotal * (State.coupon.value / 100);
  return 0;
}

function cartDelivery() {
  if (State.coupon && State.coupon.type === 'freeshipping') return 0;
  return State.cart.length ? DELIVERY_FEE : 0;
}

function pulseCartIcon() {
  const btn = $('#cartBtn');
  btn.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }],
    { duration: 350, easing: 'ease-out' }
  );
}

function renderCart() {
  const lines = cartLines();
  const totalItems = lines.reduce((sum, l) => sum + l.qty, 0);
  $('#cartBadge').textContent = totalItems;

  $('#cartEmpty').hidden = lines.length > 0;
  $('#cartFooter').hidden = lines.length === 0;
  $('#cartList').innerHTML = lines.map(l => `
    <li class="cart-item" data-id="${l.id}">
      <img class="cart-item__img" src="${l.product.img}" alt="${l.product.name}">
      <div class="cart-item__info">
        <div class="cart-item__top">
          <span class="cart-item__name">${l.product.name}</span>
          <button class="cart-item__remove" data-remove="${l.id}" aria-label="Remover"><i class="fa-solid fa-trash"></i></button>
        </div>
        <span class="cart-item__price">${formatBRL(l.product.price)} cada</span>
        <div class="cart-item__bottom">
          <div class="qty">
            <button data-qty="-1" data-id="${l.id}" aria-label="Diminuir">−</button>
            <span>${l.qty}</span>
            <button data-qty="1" data-id="${l.id}" aria-label="Aumentar">+</button>
          </div>
          <span class="cart-item__subtotal">${formatBRL(l.product.price * l.qty)}</span>
        </div>
      </div>
    </li>
  `).join('');

  const subtotal = cartSubtotal();
  const discount = cartDiscount(subtotal);
  const delivery = cartDelivery();
  const total = Math.max(subtotal - discount + delivery, 0);

  $('#subtotalValue').textContent = formatBRL(subtotal);
  $('#deliveryValue').textContent = delivery === 0 ? 'Grátis' : formatBRL(delivery);
  $('#discountRow').hidden = discount <= 0;
  $('#discountValue').textContent = `- ${formatBRL(discount)}`;
  $('#totalValue').textContent = formatBRL(total);
}

function toggleFavorite(id) {
  if (State.favorites.includes(id)) {
    State.favorites = State.favorites.filter(f => f !== id);
  } else {
    State.favorites.push(id);
    showToast('Adicionado aos favoritos', 'fa-heart');
  }
  Storage.set(KEYS.favorites, State.favorites);
  $('#favBadge').textContent = State.favorites.length;
  renderProducts();
  renderRecommended();
  if ($('#favModal').classList.contains('is-open')) renderFavorites();
}

function renderFavorites() {
  const grid = $('#favGrid');
  const list = State.products.filter(p => State.favorites.includes(p.id));
  grid.innerHTML = list.map(productCard).join('');
  $('#favEmpty').hidden = list.length > 0;
}

function openCheckout() {
  if (!State.cart.length) return;
  renderCheckoutSummary();
  $('#checkoutModal').classList.add('is-open');
}

function renderCheckoutSummary() {
  const subtotal = cartSubtotal();
  const discount = cartDiscount(subtotal);
  const delivery = cartDelivery();
  const total = Math.max(subtotal - discount + delivery, 0);
  $('#checkoutSummary').innerHTML = `
    <div class="row"><span>Itens</span><span>${cartLines().reduce((s, l) => s + l.qty, 0)}</span></div>
    <div class="row"><span>Subtotal</span><span>${formatBRL(subtotal)}</span></div>
    <div class="row"><span>Entrega</span><span>${delivery === 0 ? 'Grátis' : formatBRL(delivery)}</span></div>
    ${discount > 0 ? `<div class="row"><span>Desconto</span><span>- ${formatBRL(discount)}</span></div>` : ''}
    <div class="row row--total"><span>Total</span><span>${formatBRL(total)}</span></div>
  `;
}

function submitOrder(e) {
  e.preventDefault();
  const payment = $('input[name="payment"]:checked').value;
  const subtotal = cartSubtotal();
  const discount = cartDiscount(subtotal);
  const delivery = cartDelivery();
  const total = Math.max(subtotal - discount + delivery, 0);
  const now = new Date();

  const order = {
    id: uid(),
    items: cartLines().map(l => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
    customer: {
      name: $('#custName').value,
      phone: $('#custPhone').value,
      address: $('#custAddress').value,
      number: $('#custNumber').value,
      complement: $('#custComplement').value,
      neighborhood: $('#custNeighborhood').value,
      city: $('#custCity').value
    },
    payment,
    change: payment === 'Dinheiro' ? $('#custChange').value : null,
    subtotal, discount, delivery, total,
    date: now.toLocaleDateString('pt-BR'),
    time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  };

  const orders = Storage.get(KEYS.orders, []);
  orders.unshift(order);
  Storage.set(KEYS.orders, orders);

  renderReceipt(order);
  $('#checkoutModal').classList.remove('is-open');
  $('#successModal').classList.add('is-open');
  closeCart();

  clearCart();
  $('#checkoutForm').reset();
  $('#changeField').hidden = true;
}

function renderReceipt(order) {
  const itemsHtml = order.items.map(i =>
    `<div class="row"><span>${i.qty}x ${i.name}</span><span>${formatBRL(i.price * i.qty)}</span></div>`
  ).join('');

  $('#orderReceipt').innerHTML = `
    ${itemsHtml}
    <div class="divider"></div>
    <div class="row"><span>Subtotal</span><span>${formatBRL(order.subtotal)}</span></div>
    <div class="row"><span>Entrega</span><span>${order.delivery === 0 ? 'Grátis' : formatBRL(order.delivery)}</span></div>
    ${order.discount > 0 ? `<div class="row"><span>Desconto</span><span>- ${formatBRL(order.discount)}</span></div>` : ''}
    <div class="row"><strong>Total</strong><strong>${formatBRL(order.total)}</strong></div>
    <div class="divider"></div>
    <div class="row"><span>Pagamento</span><span>${order.payment}</span></div>
    <div class="row"><span>Endereço</span><span>${order.customer.address}, ${order.customer.number}</span></div>
    <div class="row"><span>Data</span><span>${order.date} às ${order.time}</span></div>
  `;
}

function openCart() { $('#cartSidebar').classList.add('is-open'); $('#overlay').classList.add('is-visible'); }
function closeCart() { $('#cartSidebar').classList.remove('is-open'); $('#overlay').classList.remove('is-visible'); }

function closeAllModals() {
  $$('.modal').forEach(m => m.classList.remove('is-open'));
  closeCart();
}

function initTheme() {
  const saved = Storage.get(KEYS.theme, 'dark');
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  Storage.set(KEYS.theme, next);
  updateThemeIcon(next);
}
function updateThemeIcon(theme) {
  $('#themeToggle').innerHTML = theme === 'dark'
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';
}

function bindEvents() {

  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add]');
    if (addBtn) addToCart(addBtn.dataset.add);

    const favBtn = e.target.closest('[data-fav]');
    if (favBtn) toggleFavorite(favBtn.dataset.fav);

    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) removeFromCart(removeBtn.dataset.remove);

    const qtyBtn = e.target.closest('[data-qty]');
    if (qtyBtn) updateQty(qtyBtn.dataset.id, Number(qtyBtn.dataset.qty));
  });

  $('#categoryTrack').addEventListener('click', (e) => {
    const pill = e.target.closest('.cat-pill');
    if (!pill) return;
    $$('.cat-pill').forEach(p => p.classList.remove('is-active'));
    pill.classList.add('is-active');
    State.filters.category = pill.dataset.cat;
    renderProducts();
  });

  $('#searchForm').addEventListener('submit', (e) => e.preventDefault());
  $('#searchInput').addEventListener('input', (e) => {
    State.filters.search = e.target.value;
    renderProducts();
  });

  $('#sortSelect').addEventListener('change', (e) => {
    State.filters.sort = e.target.value;
    renderProducts();
  });

  $('#filterPromo').addEventListener('click', (e) => {
    State.filters.promo = !State.filters.promo;
    e.currentTarget.classList.toggle('is-active', State.filters.promo);
    renderProducts();
  });
  $('#filterPopular').addEventListener('click', (e) => {
    State.filters.popular = !State.filters.popular;
    e.currentTarget.classList.toggle('is-active', State.filters.popular);
    renderProducts();
  });

  $('#cartBtn').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  $('#overlay').addEventListener('click', closeAllModals);

  $('#clearCartBtn').addEventListener('click', () => {
    if (!State.cart.length) return;
    if (confirm('Tem certeza que deseja limpar o carrinho?')) clearCart();
  });

  $('#checkoutBtn').addEventListener('click', openCheckout);
  $('#checkoutClose').addEventListener('click', () => $('#checkoutModal').classList.remove('is-open'));
  $('#checkoutForm').addEventListener('submit', submitOrder);

  $('#paymentGrid').addEventListener('change', (e) => {
    $('#changeField').hidden = e.target.value !== 'Dinheiro';
  });

  $('#successClose').addEventListener('click', () => $('#successModal').classList.remove('is-open'));

  $('#favBtn').addEventListener('click', () => {
    renderFavorites();
    $('#favModal').classList.add('is-open');
  });
  $('#favClose').addEventListener('click', () => $('#favModal').classList.remove('is-open'));

  $('#couponBtn').addEventListener('click', () => {
    const code = $('#couponInput').value.trim().toUpperCase();
    const msg = $('#couponMsg');
    if (!code) return;
    if (COUPONS[code]) {
      State.coupon = COUPONS[code];
      msg.textContent = 'Cupom aplicado com sucesso!';
      msg.className = 'coupon__msg is-success';
      showToast('Cupom aplicado!', 'fa-tag');
    } else {
      State.coupon = null;
      msg.textContent = 'Cupom inválido.';
      msg.className = 'coupon__msg is-error';
    }
    renderCart();
  });

  $('#themeToggle').addEventListener('click', toggleTheme);

  $('#menuToggle').addEventListener('click', () => $('#mobileMenu').classList.toggle('is-open'));
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => $('#mobileMenu').classList.remove('is-open')));

  window.addEventListener('scroll', () => {
    $('#backTop').classList.toggle('is-visible', window.scrollY > 480);
  });
  $('#backTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}

function init() {
  initTheme();
  renderProducts();
  renderRecommended();
  renderCart();
  $('#favBadge').textContent = State.favorites.length;
  bindEvents();

  setTimeout(() => $('#loader').classList.add('is-hidden'), 450);
}

document.addEventListener('DOMContentLoaded', init);
