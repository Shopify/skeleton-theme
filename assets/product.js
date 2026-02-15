/**
 * Product page web components.
 * Vanilla JS, no dependencies. Custom elements for:
 * - product-page: orchestrates all child components
 * - variant-selector: swatch-based variant picking with Section Rendering API
 * - product-form: AJAX add-to-cart with cart drawer integration
 * - sticky-atc: sticky mobile add-to-cart bar
 * - cart-drawer: slide-in cart panel
 */

/* ==============================================
   Product Gallery
   ============================================== */
class ProductPage extends HTMLElement {
  connectedCallback() {
    this.slider = this.querySelector('.product__gallery-slider');
    this.slides = this.querySelectorAll('.product__gallery-slide');
    this.thumbnails = this.querySelectorAll('.product__thumbnail');
    this.prevBtn = this.querySelector('.product__gallery-arrow--prev');
    this.nextBtn = this.querySelector('.product__gallery-arrow--next');
    this.currentIndex = 0;

    if (this.thumbnails.length > 0) {
      this.thumbnails.forEach((thumb) => {
        thumb.addEventListener('click', () => {
          this.goToSlide(parseInt(thumb.dataset.index, 10));
        });
      });
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.goToSlide(this.currentIndex - 1));
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.goToSlide(this.currentIndex + 1));
    }

    if (this.slider) {
      this.slider.addEventListener('scrollend', () => {
        this.onScrollEnd();
      });

      // Fallback for browsers without scrollend
      let scrollTimeout;
      this.slider.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => this.onScrollEnd(), 100);
      }, { passive: true });
    }
  }

  onScrollEnd() {
    if (!this.slider || this.slides.length === 0) return;
    const scrollLeft = this.slider.scrollLeft;
    const slideWidth = this.slides[0].offsetWidth;
    const newIndex = Math.round(scrollLeft / slideWidth);
    if (newIndex !== this.currentIndex) {
      this.currentIndex = newIndex;
      this.updateActiveStates();
    }
  }

  goToSlide(index) {
    if (!this.slider || this.slides.length === 0) return;
    const clampedIndex = Math.max(0, Math.min(index, this.slides.length - 1));
    this.currentIndex = clampedIndex;

    const target = this.slides[clampedIndex];
    this.slider.scrollTo({
      left: target.offsetLeft,
      behavior: 'smooth'
    });

    this.updateActiveStates();
  }

  updateActiveStates() {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === this.currentIndex);
    });

    this.thumbnails.forEach((thumb, i) => {
      const isActive = i === this.currentIndex;
      thumb.classList.toggle('is-active', isActive);
      thumb.setAttribute('aria-selected', isActive);
    });

    // Scroll thumbnail into view
    const activeThumb = this.thumbnails[this.currentIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }

    // Update arrow states
    if (this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0;
    if (this.nextBtn) this.nextBtn.disabled = this.currentIndex === this.slides.length - 1;
  }
}

if (!customElements.get('product-page')) {
  customElements.define('product-page', ProductPage);
}

/* ==============================================
   Variant Selector
   ============================================== */
class VariantSelector extends HTMLElement {
  connectedCallback() {
    this.sectionId = this.dataset.sectionId;
    this.productUrl = this.dataset.productUrl;
    this.hiddenSelect = this.querySelector('select[name="id"]');
    this.options = this.querySelectorAll('.product__option');

    this.addEventListener('change', this.onOptionChange.bind(this));
  }

  onOptionChange(event) {
    const input = event.target;
    if (input.type !== 'radio') return;

    // Update the selected swatch visually
    const fieldset = input.closest('.product__option');
    fieldset.querySelectorAll('.product__swatch').forEach((swatch) => {
      swatch.classList.toggle('is-selected', swatch.contains(input));
    });

    // Update the option value display
    const valueDisplay = fieldset.querySelector('.product__option-value');
    if (valueDisplay) valueDisplay.textContent = input.value;

    // Find matching variant
    this.updateVariant();
  }

  updateVariant() {
    const selectedOptions = [];
    this.options.forEach((fieldset) => {
      const checked = fieldset.querySelector('input[type="radio"]:checked');
      if (checked) selectedOptions.push(checked.value);
    });

    // Find matching variant from the hidden select
    const variantOptions = Array.from(this.hiddenSelect.options);
    const matchingOption = variantOptions.find((opt) => {
      const optTitle = opt.textContent.trim().split(' - ')[0].trim();
      if (selectedOptions.length === 1) return optTitle === selectedOptions[0];
      return selectedOptions.every((sel) => optTitle.includes(sel));
    });

    if (matchingOption) {
      this.hiddenSelect.value = matchingOption.value;
      const variantId = matchingOption.value;
      const available = matchingOption.dataset.available === 'true';

      // Update hidden form input
      const form = this.closest('product-page')?.querySelector('input[name="id"]');
      if (form) form.value = variantId;

      // Update URL
      const url = new URL(window.location);
      url.searchParams.set('variant', variantId);
      window.history.replaceState({}, '', url);

      // Update price and availability via Section Rendering API
      this.fetchSection(variantId);
    }
  }

  async fetchSection(variantId) {
    try {
      const url = `${this.productUrl}?variant=${variantId}&sections=${this.sectionId}`;
      const response = await fetch(url);
      const data = await response.json();
      const html = data[this.sectionId];

      if (!html) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Update price
      const newPrice = doc.querySelector('.product__price');
      const currentPrice = document.querySelector('.product__price');
      if (newPrice && currentPrice) currentPrice.innerHTML = newPrice.innerHTML;

      // Update add to cart button
      const newBtn = doc.querySelector('.product__add-to-cart');
      const currentBtn = document.querySelector('.product__add-to-cart');
      if (newBtn && currentBtn) {
        currentBtn.disabled = newBtn.disabled;
        currentBtn.textContent = newBtn.textContent;
      }

      // Update sticky bar
      const newStickyPrice = doc.querySelector('.product__sticky-bar-price');
      const currentStickyPrice = document.querySelector('.product__sticky-bar-price');
      if (newStickyPrice && currentStickyPrice) {
        currentStickyPrice.textContent = newStickyPrice.textContent;
      }

      const newStickyBtn = doc.querySelector('.product__sticky-bar-btn');
      const currentStickyBtn = document.querySelector('.product__sticky-bar-btn');
      if (newStickyBtn && currentStickyBtn) {
        currentStickyBtn.textContent = newStickyBtn.textContent;
      }
    } catch (error) {
      console.error('Failed to fetch section:', error);
    }
  }
}

if (!customElements.get('variant-selector')) {
  customElements.define('variant-selector', VariantSelector);
}

/* ==============================================
   Product Form (AJAX Add to Cart)
   ============================================== */
class ProductForm extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    this.submitBtn = this.querySelector('.product__add-to-cart');

    if (this.form) {
      this.form.addEventListener('submit', this.onSubmit.bind(this));
    }

    // Quantity buttons
    this.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-quantity-change]');
      if (!btn) return;
      const input = this.querySelector('.product__quantity-input');
      if (!input) return;
      const change = parseInt(btn.dataset.quantityChange, 10);
      input.value = Math.max(1, parseInt(input.value, 10) + change);
    });
  }

  async onSubmit(event) {
    event.preventDefault();
    if (!this.submitBtn || this.submitBtn.disabled) return;

    const originalText = this.submitBtn.textContent;
    this.submitBtn.classList.add('is-loading');
    this.submitBtn.textContent = 'Adding...';

    try {
      const formData = new FormData(this.form);
      const response = await fetch(`${window.Shopify?.routes?.root || '/'}cart/add.js`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Add to cart failed');

      const item = await response.json();

      this.submitBtn.classList.remove('is-loading');
      this.submitBtn.classList.add('is-added');
      this.submitBtn.textContent = 'Added';

      // Open cart drawer
      const cartDrawer = document.querySelector('cart-drawer');
      if (cartDrawer) cartDrawer.open(item);

      // Update header cart count
      this.updateCartCount();

      setTimeout(() => {
        this.submitBtn.classList.remove('is-added');
        this.submitBtn.textContent = originalText;
      }, 2000);
    } catch (error) {
      console.error('Add to cart error:', error);
      this.submitBtn.classList.remove('is-loading');
      this.submitBtn.textContent = originalText;
    }
  }

  async updateCartCount() {
    try {
      const response = await fetch(`${window.Shopify?.routes?.root || '/'}cart.js`);
      const cart = await response.json();
      const countEls = document.querySelectorAll('.cart-count, header sup');
      countEls.forEach((el) => {
        el.textContent = cart.item_count;
      });
    } catch (error) {
      // Silent fail for cart count update
    }
  }
}

if (!customElements.get('product-form')) {
  customElements.define('product-form', ProductForm);
}

/* ==============================================
   Sticky ATC Bar
   ============================================== */
class StickyAtc extends HTMLElement {
  connectedCallback() {
    this.atcButton = document.querySelector('.product__add-to-cart');
    this.stickyBtn = this.querySelector('[data-sticky-atc]');

    if (!this.atcButton) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.classList.toggle('is-visible', !entry.isIntersecting);
          this.setAttribute('aria-hidden', entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    this.observer.observe(this.atcButton);

    if (this.stickyBtn) {
      this.stickyBtn.addEventListener('click', () => {
        if (this.atcButton && !this.atcButton.disabled) {
          this.atcButton.closest('form')?.requestSubmit();
        }
      });
    }
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }
}

if (!customElements.get('sticky-atc')) {
  customElements.define('sticky-atc', StickyAtc);
}

/* ==============================================
   Cart Drawer
   ============================================== */
class CartDrawer extends HTMLElement {
  connectedCallback() {
    this.panel = this.querySelector('.cart-drawer__panel');
    this.body = this.querySelector('.cart-drawer__body');

    // Close buttons
    this.querySelectorAll('[data-cart-drawer-close]').forEach((el) => {
      el.addEventListener('click', () => this.close());
    });

    // Escape key
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  async open(newItem) {
    this.classList.add('is-open');
    this.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';

    // Focus management
    const closeBtn = this.querySelector('.cart-drawer__close');
    if (closeBtn) closeBtn.focus();

    // Fetch cart contents
    await this.refreshCart();
  }

  close() {
    this.classList.remove('is-open');
    this.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  }

  async refreshCart() {
    try {
      const response = await fetch(`${window.Shopify?.routes?.root || '/'}cart.js`);
      const cart = await response.json();

      if (!this.body) return;

      if (cart.items.length === 0) {
        this.body.innerHTML = '<p class="cart-drawer__empty">Your cart is empty</p>';
        return;
      }

      const itemsHtml = cart.items.map((item) => `
        <div class="cart-drawer__item">
          ${item.image ? `<img class="cart-drawer__item-image" src="${item.image}" alt="${item.title}" width="72" height="90" loading="lazy">` : '<div class="cart-drawer__item-image"></div>'}
          <div class="cart-drawer__item-info">
            <a href="${item.url}" class="cart-drawer__item-title">${item.product_title}</a>
            ${item.variant_title ? `<span class="cart-drawer__item-variant">${item.variant_title}</span>` : ''}
            <span class="cart-drawer__item-variant">Qty: ${item.quantity}</span>
            <span class="cart-drawer__item-price">${this.formatMoney(item.final_line_price)}</span>
          </div>
        </div>
      `).join('');

      this.body.innerHTML = itemsHtml;
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  }

  formatMoney(cents) {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: window.Shopify?.currency?.active || 'USD',
      minimumFractionDigits: 2
    }).format(cents / 100);
  }
}

if (!customElements.get('cart-drawer')) {
  customElements.define('cart-drawer', CartDrawer);
}
