/**
 * Nordic Editorial — Product page web components.
 * Vanilla JS, zero deps. ~7KB unminified.
 */

/* ==============================================
   Product Page — gallery, thumbnails, counter
   ============================================== */
class ProductPage extends HTMLElement {
  connectedCallback() {
    this.slider = this.querySelector('.pdp__media-track');
    this.slides = this.querySelectorAll('.pdp__media-slide');
    this.thumbs = this.querySelectorAll('.pdp__thumb');
    this.prev = this.querySelector('.pdp__arrow--prev');
    this.next = this.querySelector('.pdp__arrow--next');
    this.counterCurrent = this.querySelector('.pdp__media-current');
    this.idx = 0;

    this.thumbs.forEach((t) => t.addEventListener('click', () => this.go(+t.dataset.index)));
    this.prev?.addEventListener('click', () => this.go(this.idx - 1));
    this.next?.addEventListener('click', () => this.go(this.idx + 1));

    if (this.slider) {
      let t;
      this.slider.addEventListener('scroll', () => {
        clearTimeout(t);
        t = setTimeout(() => this.syncFromScroll(), 80);
      }, { passive: true });
    }
  }

  syncFromScroll() {
    if (!this.slides.length) return;
    const i = Math.round(this.slider.scrollLeft / this.slides[0].offsetWidth);
    if (i !== this.idx) { this.idx = i; this.update(); }
  }

  go(i) {
    if (!this.slides.length) return;
    this.idx = Math.max(0, Math.min(i, this.slides.length - 1));
    this.slides[this.idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    this.update();
  }

  update() {
    this.slides.forEach((s, i) => s.classList.toggle('is-active', i === this.idx));
    this.thumbs.forEach((t, i) => {
      t.classList.toggle('is-active', i === this.idx);
      t.setAttribute('aria-selected', i === this.idx);
    });
    const active = this.thumbs[this.idx];
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });

    if (this.prev) this.prev.disabled = this.idx === 0;
    if (this.next) this.next.disabled = this.idx === this.slides.length - 1;

    // Update editorial counter
    if (this.counterCurrent) {
      const n = this.idx + 1;
      this.counterCurrent.textContent = n < 10 ? '0' + n : '' + n;
    }
  }
}
if (!customElements.get('product-page')) customElements.define('product-page', ProductPage);

/* ==============================================
   Variant Selector
   ============================================== */
class VariantSelector extends HTMLElement {
  connectedCallback() {
    this.sectionId = this.dataset.sectionId;
    this.productUrl = this.dataset.productUrl;
    this.select = this.querySelector('select[name="id"]');
    this.options = this.querySelectorAll('.pdp__option');
    this.addEventListener('change', this.onChange.bind(this));
  }

  onChange(e) {
    const input = e.target;
    if (input.type !== 'radio') return;
    const field = input.closest('.pdp__option');
    field.querySelectorAll('.pdp__swatch').forEach((s) => s.classList.toggle('is-active', s.contains(input)));
    const label = field.querySelector('.pdp__option-selected');
    if (label) label.textContent = input.value;
    this.matchVariant();
  }

  matchVariant() {
    const picked = [];
    this.options.forEach((f) => {
      const c = f.querySelector('input:checked');
      if (c) picked.push(c.value);
    });
    const match = [...this.select.options].find((o) => {
      const t = o.textContent.trim().split(' - ')[0].trim();
      return picked.every((v) => t.includes(v));
    });
    if (!match) return;
    this.select.value = match.value;
    const form = this.closest('product-page')?.querySelector('input[name="id"]');
    if (form) form.value = match.value;
    const url = new URL(window.location);
    url.searchParams.set('variant', match.value);
    window.history.replaceState({}, '', url);
    this.fetchSection(match.value);
  }

  async fetchSection(vid) {
    try {
      const r = await fetch(`${this.productUrl}?variant=${vid}&sections=${this.sectionId}`);
      const d = await r.json();
      const html = d[this.sectionId];
      if (!html) return;
      const doc = new DOMParser().parseFromString(html, 'text/html');
      ['.pdp__price', '.pdp__atc-label', '.pdp__sticky-price', '.pdp__sticky-btn'].forEach((sel) => {
        const fresh = doc.querySelector(sel);
        const cur = document.querySelector(sel);
        if (fresh && cur) cur.innerHTML = fresh.innerHTML;
      });
      const newBtn = doc.querySelector('.pdp__atc');
      const curBtn = document.querySelector('.pdp__atc');
      if (newBtn && curBtn) curBtn.disabled = newBtn.disabled;
    } catch (_) {}
  }
}
if (!customElements.get('variant-selector')) customElements.define('variant-selector', VariantSelector);

/* ==============================================
   Product Form — AJAX add to cart
   ============================================== */
class ProductForm extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    this.btn = this.querySelector('.pdp__atc');
    this.form?.addEventListener('submit', this.onSubmit.bind(this));
    this.addEventListener('click', (e) => {
      const q = e.target.closest('[data-quantity-change]');
      if (!q) return;
      const inp = this.querySelector('.pdp__qty-input');
      if (inp) inp.value = Math.max(1, +inp.value + +q.dataset.quantityChange);
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    if (!this.btn || this.btn.disabled) return;
    const label = this.btn.querySelector('.pdp__atc-label');
    const origText = label?.textContent;
    this.btn.classList.add('is-loading');
    if (label) label.textContent = 'Adding...';

    try {
      const r = await fetch(`${window.Shopify?.routes?.root || '/'}cart/add.js`, {
        method: 'POST',
        body: new FormData(this.form),
      });
      if (!r.ok) throw new Error();
      await r.json();
      this.btn.classList.remove('is-loading');
      this.btn.classList.add('is-added');
      if (label) label.textContent = 'Added';
      document.querySelector('cart-drawer')?.open();
      this.updateCount();
      setTimeout(() => {
        this.btn.classList.remove('is-added');
        if (label) label.textContent = origText;
      }, 2200);
    } catch (_) {
      this.btn.classList.remove('is-loading');
      if (label) label.textContent = origText;
    }
  }

  async updateCount() {
    try {
      const r = await fetch(`${window.Shopify?.routes?.root || '/'}cart.js`);
      const c = await r.json();
      document.querySelectorAll('.cart-count').forEach((el) => el.textContent = c.item_count);
    } catch (_) {}
  }
}
if (!customElements.get('product-form')) customElements.define('product-form', ProductForm);

/* ==============================================
   Sticky ATC Bar
   ============================================== */
class StickyAtc extends HTMLElement {
  connectedCallback() {
    this.atc = document.querySelector('.pdp__atc');
    if (!this.atc) return;
    this.obs = new IntersectionObserver(([e]) => {
      this.classList.toggle('is-visible', !e.isIntersecting);
      this.setAttribute('aria-hidden', e.isIntersecting);
    }, { threshold: 0 });
    this.obs.observe(this.atc);
    this.querySelector('[data-sticky-atc]')?.addEventListener('click', () => {
      this.atc?.closest('form')?.requestSubmit();
    });
  }
  disconnectedCallback() { this.obs?.disconnect(); }
}
if (!customElements.get('sticky-atc')) customElements.define('sticky-atc', StickyAtc);

/* ==============================================
   Cart Drawer
   ============================================== */
class CartDrawer extends HTMLElement {
  connectedCallback() {
    this.body = this.querySelector('.drawer__body');
    this.querySelectorAll('[data-cart-drawer-close]').forEach((el) =>
      el.addEventListener('click', () => this.close())
    );
    this.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.close(); });
  }

  async open() {
    this.classList.add('is-open');
    this.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    this.querySelector('.drawer__close')?.focus();
    await this.refresh();
  }

  close() {
    this.classList.remove('is-open');
    this.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  }

  async refresh() {
    try {
      const r = await fetch(`${window.Shopify?.routes?.root || '/'}cart.js`);
      const cart = await r.json();
      if (!this.body) return;
      if (!cart.items.length) {
        this.body.innerHTML = '<p class="drawer__empty">Your cart is empty</p>';
        return;
      }
      this.body.innerHTML = cart.items.map((i) => `
        <div class="drawer__item">
          ${i.image ? `<img class="drawer__item-image" src="${i.image}" alt="${i.title}" width="64" height="80" loading="lazy">` : '<div class="drawer__item-image"></div>'}
          <div class="drawer__item-info">
            <a href="${i.url}" class="drawer__item-title">${i.product_title}</a>
            ${i.variant_title ? `<span class="drawer__item-variant">${i.variant_title}</span>` : ''}
            <span class="drawer__item-variant">Qty: ${i.quantity}</span>
            <span class="drawer__item-price">${this.fmt(i.final_line_price)}</span>
          </div>
        </div>
      `).join('');
    } catch (_) {}
  }

  fmt(cents) {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: window.Shopify?.currency?.active || 'USD',
    }).format(cents / 100);
  }
}
if (!customElements.get('cart-drawer')) customElements.define('cart-drawer', CartDrawer);
