/**
 * Enterprise Theme - JavaScript Framework
 * Modern, modular, and accessible JavaScript for Shopify themes
 */

(function() {
  'use strict';

  // ===== UTILITY FUNCTIONS =====

  const Utils = {
    // Debounce function
    debounce(fn, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          fn(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    // Throttle function
    throttle(fn, limit) {
      let inThrottle;
      return function executedFunction(...args) {
        if (!inThrottle) {
          fn(...args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    // Format money
    formatMoney(cents, format) {
      if (typeof cents === 'string') {
        cents = cents.replace('.', '');
      }

      const formatString = format || window.theme?.moneyFormat || '${{amount}}';
      let value = '';
      const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;

      function formatWithDelimiters(number, precision = 2, thousands = ',', decimal = '.') {
        if (isNaN(number) || number == null) return 0;

        number = (number / 100.0).toFixed(precision);
        const parts = number.split('.');
        const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
        const cents = parts[1] ? decimal + parts[1] : '';

        return dollars + cents;
      }

      switch (formatString.match(placeholderRegex)?.[1]) {
        case 'amount':
          value = formatWithDelimiters(cents, 2);
          break;
        case 'amount_no_decimals':
          value = formatWithDelimiters(cents, 0);
          break;
        case 'amount_with_comma_separator':
          value = formatWithDelimiters(cents, 2, '.', ',');
          break;
        case 'amount_no_decimals_with_comma_separator':
          value = formatWithDelimiters(cents, 0, '.', ',');
          break;
        default:
          value = formatWithDelimiters(cents, 2);
      }

      return formatString.replace(placeholderRegex, value);
    },

    // Fetch JSON helper
    async fetchJSON(url, options = {}) {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },

    // Trap focus within element
    trapFocus(element, focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') {
      const focusableElements = element.querySelectorAll(focusableSelector);
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      function handleTabKey(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }

      element.addEventListener('keydown', handleTabKey);
      firstFocusable?.focus();

      return () => element.removeEventListener('keydown', handleTabKey);
    },

    // Announce to screen readers
    announce(message, priority = 'polite') {
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', priority);
      announcer.setAttribute('aria-atomic', 'true');
      announcer.classList.add('sr-only');
      document.body.appendChild(announcer);

      setTimeout(() => {
        announcer.textContent = message;
      }, 100);

      setTimeout(() => {
        announcer.remove();
      }, 3000);
    }
  };

  // ===== HEADER =====

  class Header {
    constructor() {
      this.header = document.querySelector('.header');
      this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      this.mobileMenu = document.querySelector('.mobile-menu');
      this.mobileMenuClose = document.querySelector('.mobile-menu-close');
      this.searchToggle = document.querySelector('[data-search-toggle]');
      this.searchModal = document.querySelector('[data-search-modal]');

      this.lastScrollY = 0;
      this.isScrollingDown = false;

      this.init();
    }

    init() {
      this.bindEvents();
      this.handleScroll();
    }

    bindEvents() {
      // Scroll handling
      window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 100));

      // Mobile menu
      this.mobileMenuToggle?.addEventListener('click', () => this.toggleMobileMenu());
      this.mobileMenuClose?.addEventListener('click', () => this.closeMobileMenu());

      // Search
      this.searchToggle?.addEventListener('click', () => this.toggleSearch());

      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMobileMenu();
          this.closeSearch();
        }
      });

      // Mega menu keyboard navigation
      document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('keydown', (e) => this.handleMegaMenuKeyboard(e, item));
      });
    }

    handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        this.header?.classList.add('scrolled');
      } else {
        this.header?.classList.remove('scrolled');
      }

      // Hide/show header on scroll (optional)
      if (this.header?.dataset.hideOnScroll === 'true') {
        if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
          this.header.style.transform = 'translateY(-100%)';
        } else {
          this.header.style.transform = 'translateY(0)';
        }
      }

      this.lastScrollY = currentScrollY;
    }

    toggleMobileMenu() {
      const isOpen = this.mobileMenu?.classList.toggle('is-open');
      document.body.classList.toggle('menu-open', isOpen);

      if (isOpen) {
        this.removeFocusTrap = Utils.trapFocus(this.mobileMenu);
        Utils.announce('Menu opened');
      } else {
        this.removeFocusTrap?.();
        Utils.announce('Menu closed');
      }
    }

    closeMobileMenu() {
      this.mobileMenu?.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      this.removeFocusTrap?.();
      this.mobileMenuToggle?.focus();
    }

    toggleSearch() {
      this.searchModal?.classList.toggle('is-open');

      if (this.searchModal?.classList.contains('is-open')) {
        this.searchModal.querySelector('input')?.focus();
      }
    }

    closeSearch() {
      this.searchModal?.classList.remove('is-open');
    }

    handleMegaMenuKeyboard(e, item) {
      const megaMenu = item.querySelector('.mega-menu');
      if (!megaMenu) return;

      const links = megaMenu.querySelectorAll('a');
      const currentIndex = Array.from(links).indexOf(document.activeElement);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (currentIndex < links.length - 1) {
            links[currentIndex + 1].focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentIndex > 0) {
            links[currentIndex - 1].focus();
          }
          break;
        case 'Escape':
          item.querySelector('.nav-link')?.focus();
          break;
      }
    }
  }

  // ===== CART =====

  class Cart {
    constructor() {
      this.drawer = document.querySelector('.cart-drawer');
      this.backdrop = document.querySelector('.cart-drawer-backdrop');
      this.closeBtn = document.querySelector('.cart-drawer-close');
      this.body = document.querySelector('.cart-drawer-body');
      this.cartCount = document.querySelectorAll('[data-cart-count]');
      this.cartTotal = document.querySelectorAll('[data-cart-total]');

      this.isUpdating = false;

      this.init();
    }

    init() {
      this.bindEvents();
    }

    bindEvents() {
      // Cart toggle buttons
      document.querySelectorAll('[data-cart-toggle]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggle();
        });
      });

      // Close button
      this.closeBtn?.addEventListener('click', () => this.close());
      this.backdrop?.addEventListener('click', () => this.close());

      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.drawer?.classList.contains('is-open')) {
          this.close();
        }
      });

      // Add to cart forms
      document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
        form.addEventListener('submit', (e) => this.handleAddToCart(e));
      });

      // Quantity changes
      this.drawer?.addEventListener('click', (e) => {
        if (e.target.matches('[data-quantity-minus]')) {
          this.updateQuantity(e.target.dataset.key, -1);
        } else if (e.target.matches('[data-quantity-plus]')) {
          this.updateQuantity(e.target.dataset.key, 1);
        } else if (e.target.matches('[data-remove-item]')) {
          this.removeItem(e.target.dataset.key);
        }
      });

      // Quantity input changes
      this.drawer?.addEventListener('change', (e) => {
        if (e.target.matches('.quantity-input')) {
          this.setQuantity(e.target.dataset.key, parseInt(e.target.value));
        }
      });
    }

    open() {
      this.drawer?.classList.add('is-open');
      this.backdrop?.classList.add('is-open');
      document.body.classList.add('cart-open');

      this.removeFocusTrap = Utils.trapFocus(this.drawer);
      Utils.announce('Shopping cart opened');

      this.refresh();
    }

    close() {
      this.drawer?.classList.remove('is-open');
      this.backdrop?.classList.remove('is-open');
      document.body.classList.remove('cart-open');

      this.removeFocusTrap?.();
      Utils.announce('Shopping cart closed');
    }

    toggle() {
      if (this.drawer?.classList.contains('is-open')) {
        this.close();
      } else {
        this.open();
      }
    }

    async handleAddToCart(e) {
      e.preventDefault();

      const form = e.target;
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn?.textContent;

      if (this.isUpdating) return;
      this.isUpdating = true;

      try {
        submitBtn?.classList.add('loading');
        if (submitBtn) submitBtn.textContent = 'Adding...';

        const formData = new FormData(form);

        const response = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.description || 'Error adding to cart');
        }

        await this.refresh();
        this.open();
        Utils.announce('Item added to cart');

      } catch (error) {
        console.error('Add to cart error:', error);
        Utils.announce(error.message, 'assertive');
      } finally {
        this.isUpdating = false;
        submitBtn?.classList.remove('loading');
        if (submitBtn) submitBtn.textContent = originalText;
      }
    }

    async updateQuantity(key, change) {
      if (this.isUpdating) return;

      const input = this.drawer?.querySelector(`[data-key="${key}"].quantity-input`);
      const currentQty = parseInt(input?.value || 0);
      const newQty = Math.max(0, currentQty + change);

      await this.setQuantity(key, newQty);
    }

    async setQuantity(key, quantity) {
      if (this.isUpdating) return;
      this.isUpdating = true;

      this.body?.classList.add('loading');

      try {
        await Utils.fetchJSON('/cart/change.js', {
          method: 'POST',
          body: JSON.stringify({
            id: key,
            quantity: quantity
          })
        });

        await this.refresh();
        Utils.announce(quantity === 0 ? 'Item removed from cart' : 'Cart updated');

      } catch (error) {
        console.error('Update quantity error:', error);
        Utils.announce('Error updating cart', 'assertive');
      } finally {
        this.isUpdating = false;
        this.body?.classList.remove('loading');
      }
    }

    async removeItem(key) {
      await this.setQuantity(key, 0);
    }

    async refresh() {
      try {
        const cart = await Utils.fetchJSON('/cart.js');
        this.updateUI(cart);
      } catch (error) {
        console.error('Refresh cart error:', error);
      }
    }

    updateUI(cart) {
      // Update cart count badges
      this.cartCount.forEach(el => {
        el.textContent = cart.item_count;
        el.style.display = cart.item_count > 0 ? '' : 'none';
      });

      // Update cart total
      this.cartTotal.forEach(el => {
        el.textContent = Utils.formatMoney(cart.total_price);
      });

      // Render cart items
      if (this.body) {
        if (cart.items.length === 0) {
          this.body.innerHTML = this.renderEmptyCart();
        } else {
          this.body.innerHTML = cart.items.map(item => this.renderCartItem(item)).join('');
        }
      }

      // Dispatch event for other components
      document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
    }

    renderEmptyCart() {
      return `
        <div class="cart-empty">
          <div class="cart-empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <p class="cart-empty-text">Your cart is empty</p>
          <a href="/collections/all" class="btn btn-primary">Continue Shopping</a>
        </div>
      `;
    }

    renderCartItem(item) {
      const comparePrice = item.original_line_price !== item.final_line_price
        ? `<span class="cart-item-price-compare">${Utils.formatMoney(item.original_line_price)}</span>`
        : '';

      const variant = item.variant_title && item.variant_title !== 'Default Title'
        ? `<p class="cart-item-variant">${item.variant_title}</p>`
        : '';

      return `
        <div class="cart-item" data-key="${item.key}">
          <a href="${item.url}" class="cart-item-image">
            ${item.image ? `<img src="${item.image.replace(/(\.[^.]+)$/, '_200x200$1')}" alt="${item.title}" loading="lazy">` : ''}
          </a>
          <div class="cart-item-details">
            <h4 class="cart-item-title">
              <a href="${item.url}">${item.product_title}</a>
            </h4>
            ${variant}
            <p class="cart-item-price">
              ${comparePrice}
              <span>${Utils.formatMoney(item.final_line_price)}</span>
            </p>
            <div class="cart-item-quantity">
              <button type="button" class="quantity-btn" data-quantity-minus data-key="${item.key}" aria-label="Decrease quantity">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="0" data-key="${item.key}" aria-label="Quantity">
              <button type="button" class="quantity-btn" data-quantity-plus data-key="${item.key}" aria-label="Increase quantity">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
            <button type="button" class="cart-item-remove" data-remove-item data-key="${item.key}">Remove</button>
          </div>
        </div>
      `;
    }
  }

  // ===== PRODUCT =====

  class Product {
    constructor(container) {
      this.container = container;
      this.productId = container.dataset.productId;
      this.productJson = JSON.parse(container.querySelector('[type="application/json"]')?.textContent || '{}');

      this.variantSelect = container.querySelector('[data-variant-select]');
      this.optionInputs = container.querySelectorAll('[data-option-input]');
      this.priceEl = container.querySelector('[data-product-price]');
      this.comparePriceEl = container.querySelector('[data-compare-price]');
      this.addToCartBtn = container.querySelector('[data-add-to-cart]');
      this.variantIdInput = container.querySelector('[name="id"]');

      this.gallery = container.querySelector('[data-product-gallery]');
      this.mainImage = container.querySelector('[data-product-main-image]');
      this.thumbnails = container.querySelectorAll('[data-product-thumbnail]');

      this.init();
    }

    init() {
      this.bindEvents();
      this.updateVariant();
    }

    bindEvents() {
      // Variant select dropdown
      this.variantSelect?.addEventListener('change', () => this.updateVariant());

      // Option buttons/swatches
      this.optionInputs.forEach(input => {
        input.addEventListener('change', () => this.updateVariantFromOptions());
      });

      // Thumbnail clicks
      this.thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => this.selectImage(thumb));
      });

      // Quantity buttons
      const quantityMinus = this.container.querySelector('[data-quantity-minus]');
      const quantityPlus = this.container.querySelector('[data-quantity-plus]');
      const quantityInput = this.container.querySelector('[data-quantity-input]');

      quantityMinus?.addEventListener('click', () => {
        const current = parseInt(quantityInput?.value || 1);
        if (current > 1) {
          quantityInput.value = current - 1;
        }
      });

      quantityPlus?.addEventListener('click', () => {
        const current = parseInt(quantityInput?.value || 1);
        quantityInput.value = current + 1;
      });
    }

    updateVariant() {
      const variantId = this.variantSelect?.value;
      const variant = this.productJson.variants?.find(v => v.id == variantId);

      if (variant) {
        this.updatePrice(variant);
        this.updateAddToCart(variant);
        this.updateVariantImage(variant);

        // Update URL
        if (history.replaceState) {
          const url = new URL(window.location);
          url.searchParams.set('variant', variant.id);
          history.replaceState({}, '', url);
        }
      }
    }

    updateVariantFromOptions() {
      const selectedOptions = Array.from(this.optionInputs)
        .filter(input => input.checked || input.selected)
        .map(input => input.value);

      const variant = this.productJson.variants?.find(v =>
        v.options.every((opt, i) => opt === selectedOptions[i])
      );

      if (variant) {
        if (this.variantSelect) {
          this.variantSelect.value = variant.id;
        }
        if (this.variantIdInput) {
          this.variantIdInput.value = variant.id;
        }
        this.updatePrice(variant);
        this.updateAddToCart(variant);
        this.updateVariantImage(variant);
      }
    }

    updatePrice(variant) {
      if (this.priceEl) {
        this.priceEl.textContent = Utils.formatMoney(variant.price);
      }

      if (this.comparePriceEl) {
        if (variant.compare_at_price && variant.compare_at_price > variant.price) {
          this.comparePriceEl.textContent = Utils.formatMoney(variant.compare_at_price);
          this.comparePriceEl.style.display = '';
        } else {
          this.comparePriceEl.style.display = 'none';
        }
      }
    }

    updateAddToCart(variant) {
      if (!this.addToCartBtn) return;

      if (variant.available) {
        this.addToCartBtn.disabled = false;
        this.addToCartBtn.textContent = 'Add to Cart';
      } else {
        this.addToCartBtn.disabled = true;
        this.addToCartBtn.textContent = 'Sold Out';
      }
    }

    updateVariantImage(variant) {
      if (!variant.featured_image) return;

      const thumb = this.container.querySelector(`[data-image-id="${variant.featured_image.id}"]`);
      if (thumb) {
        this.selectImage(thumb);
      }
    }

    selectImage(thumb) {
      // Update active state
      this.thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      // Update main image
      if (this.mainImage) {
        const imgSrc = thumb.dataset.imageSrc;
        const imgSrcset = thumb.dataset.imageSrcset;

        this.mainImage.src = imgSrc;
        if (imgSrcset) {
          this.mainImage.srcset = imgSrcset;
        }
      }
    }
  }

  // ===== SLIDESHOW =====

  class Slideshow {
    constructor(container) {
      this.container = container;
      this.slides = container.querySelector('.slideshow-slides');
      this.slideItems = container.querySelectorAll('.slideshow-slide');
      this.dots = container.querySelectorAll('.slideshow-dot');
      this.prevBtn = container.querySelector('.slideshow-prev');
      this.nextBtn = container.querySelector('.slideshow-next');

      this.currentIndex = 0;
      this.slideCount = this.slideItems.length;
      this.autoplayInterval = parseInt(container.dataset.autoplay) || 0;
      this.autoplayTimer = null;

      this.init();
    }

    init() {
      if (this.slideCount <= 1) return;

      this.bindEvents();

      if (this.autoplayInterval > 0) {
        this.startAutoplay();
      }
    }

    bindEvents() {
      this.prevBtn?.addEventListener('click', () => this.prev());
      this.nextBtn?.addEventListener('click', () => this.next());

      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goTo(index));
      });

      // Pause on hover
      if (this.autoplayInterval > 0) {
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
      }

      // Touch/swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      this.container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      }, { passive: true });

      // Keyboard navigation
      this.container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      });
    }

    handleSwipe(startX, endX) {
      const threshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    }

    prev() {
      this.goTo(this.currentIndex - 1);
    }

    next() {
      this.goTo(this.currentIndex + 1);
    }

    goTo(index) {
      // Handle wrapping
      if (index < 0) {
        index = this.slideCount - 1;
      } else if (index >= this.slideCount) {
        index = 0;
      }

      this.currentIndex = index;

      // Update slide position
      if (this.slides) {
        this.slides.style.transform = `translateX(-${index * 100}%)`;
      }

      // Update dots
      this.dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      // Update ARIA
      this.slideItems.forEach((slide, i) => {
        slide.setAttribute('aria-hidden', i !== index);
      });

      // Restart autoplay timer
      if (this.autoplayInterval > 0) {
        this.stopAutoplay();
        this.startAutoplay();
      }
    }

    startAutoplay() {
      if (this.autoplayTimer) return;
      this.autoplayTimer = setInterval(() => this.next(), this.autoplayInterval);
    }

    stopAutoplay() {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
    }
  }

  // ===== ACCORDION =====

  class Accordion {
    constructor(container) {
      this.container = container;
      this.items = container.querySelectorAll('.faq-item, .accordion-item');
      this.allowMultiple = container.dataset.allowMultiple === 'true';

      this.init();
    }

    init() {
      this.items.forEach(item => {
        const trigger = item.querySelector('.faq-question, .accordion-trigger');
        trigger?.addEventListener('click', () => this.toggle(item));

        // Keyboard support
        trigger?.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggle(item);
          }
        });
      });
    }

    toggle(item) {
      const isOpen = item.classList.contains('is-open');

      if (!this.allowMultiple) {
        this.items.forEach(i => i.classList.remove('is-open'));
      }

      item.classList.toggle('is-open', !isOpen);

      // Update ARIA
      const trigger = item.querySelector('.faq-question, .accordion-trigger');
      const content = item.querySelector('.faq-answer, .accordion-content');

      trigger?.setAttribute('aria-expanded', !isOpen);
      content?.setAttribute('aria-hidden', isOpen);
    }
  }

  // ===== TABS =====

  class Tabs {
    constructor(container) {
      this.container = container;
      this.tabList = container.querySelector('[role="tablist"]');
      this.tabs = container.querySelectorAll('[role="tab"]');
      this.panels = container.querySelectorAll('[role="tabpanel"]');

      this.init();
    }

    init() {
      this.tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => this.selectTab(index));

        tab.addEventListener('keydown', (e) => {
          let newIndex = index;

          switch (e.key) {
            case 'ArrowLeft':
              newIndex = index - 1;
              break;
            case 'ArrowRight':
              newIndex = index + 1;
              break;
            case 'Home':
              newIndex = 0;
              break;
            case 'End':
              newIndex = this.tabs.length - 1;
              break;
            default:
              return;
          }

          e.preventDefault();

          // Wrap around
          if (newIndex < 0) newIndex = this.tabs.length - 1;
          if (newIndex >= this.tabs.length) newIndex = 0;

          this.selectTab(newIndex);
          this.tabs[newIndex].focus();
        });
      });
    }

    selectTab(index) {
      this.tabs.forEach((tab, i) => {
        const isSelected = i === index;
        tab.setAttribute('aria-selected', isSelected);
        tab.setAttribute('tabindex', isSelected ? '0' : '-1');
      });

      this.panels.forEach((panel, i) => {
        panel.hidden = i !== index;
      });
    }
  }

  // ===== PREDICTIVE SEARCH =====

  class PredictiveSearch {
    constructor(container) {
      this.container = container;
      this.input = container.querySelector('[data-search-input]');
      this.results = container.querySelector('[data-search-results]');
      this.loading = container.querySelector('[data-search-loading]');

      this.abortController = null;

      this.init();
    }

    init() {
      this.input?.addEventListener('input', Utils.debounce((e) => this.search(e.target.value), 300));

      // Keyboard navigation
      this.container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          this.navigateResults(e.key === 'ArrowDown' ? 1 : -1);
        }
      });
    }

    async search(query) {
      if (query.length < 2) {
        this.results.innerHTML = '';
        return;
      }

      // Cancel previous request
      this.abortController?.abort();
      this.abortController = new AbortController();

      this.loading?.classList.add('active');

      try {
        const response = await fetch(
          `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product,collection,article&resources[limit]=10`,
          { signal: this.abortController.signal }
        );

        const data = await response.json();
        this.renderResults(data.resources.results);

      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Search error:', error);
        }
      } finally {
        this.loading?.classList.remove('active');
      }
    }

    renderResults(results) {
      const { products = [], collections = [], articles = [] } = results;

      if (!products.length && !collections.length && !articles.length) {
        this.results.innerHTML = '<p class="search-no-results">No results found</p>';
        return;
      }

      let html = '';

      if (products.length) {
        html += `
          <div class="search-results-group">
            <h4 class="search-results-title">Products</h4>
            <ul class="search-results-list">
              ${products.map(p => `
                <li>
                  <a href="${p.url}" class="search-result-item">
                    ${p.image ? `<img src="${p.image.replace(/(\.[^.]+)$/, '_100x100$1')}" alt="${p.title}">` : ''}
                    <div>
                      <span class="search-result-name">${p.title}</span>
                      <span class="search-result-price">${Utils.formatMoney(p.price)}</span>
                    </div>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      }

      if (collections.length) {
        html += `
          <div class="search-results-group">
            <h4 class="search-results-title">Collections</h4>
            <ul class="search-results-list">
              ${collections.map(c => `
                <li>
                  <a href="${c.url}" class="search-result-item">
                    <span class="search-result-name">${c.title}</span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      }

      this.results.innerHTML = html;
    }

    navigateResults(direction) {
      const links = this.results.querySelectorAll('a');
      if (!links.length) return;

      const current = this.results.querySelector('a:focus');
      let index = Array.from(links).indexOf(current);

      index += direction;
      if (index < 0) index = links.length - 1;
      if (index >= links.length) index = 0;

      links[index].focus();
    }
  }

  // ===== QUANTITY SELECTOR =====

  class QuantitySelector {
    constructor(container) {
      this.container = container;
      this.input = container.querySelector('input');
      this.minusBtn = container.querySelector('[data-quantity-minus]');
      this.plusBtn = container.querySelector('[data-quantity-plus]');

      this.min = parseInt(this.input?.min) || 1;
      this.max = parseInt(this.input?.max) || Infinity;

      this.init();
    }

    init() {
      this.minusBtn?.addEventListener('click', () => this.decrease());
      this.plusBtn?.addEventListener('click', () => this.increase());

      this.input?.addEventListener('change', () => this.validate());
    }

    decrease() {
      const current = parseInt(this.input.value) || 1;
      if (current > this.min) {
        this.input.value = current - 1;
        this.input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    increase() {
      const current = parseInt(this.input.value) || 1;
      if (current < this.max) {
        this.input.value = current + 1;
        this.input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    validate() {
      let value = parseInt(this.input.value) || 1;
      value = Math.max(this.min, Math.min(this.max, value));
      this.input.value = value;
    }
  }

  // ===== LAZY LOADING =====

  class LazyLoader {
    constructor() {
      this.init();
    }

    init() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadElement(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });

        document.querySelectorAll('[data-lazy]').forEach(el => observer.observe(el));
      } else {
        // Fallback for older browsers
        document.querySelectorAll('[data-lazy]').forEach(el => this.loadElement(el));
      }
    }

    loadElement(el) {
      if (el.dataset.lazySrc) {
        el.src = el.dataset.lazySrc;
      }
      if (el.dataset.lazySrcset) {
        el.srcset = el.dataset.lazySrcset;
      }
      if (el.dataset.lazyBg) {
        el.style.backgroundImage = `url('${el.dataset.lazyBg}')`;
      }
      el.classList.add('lazy-loaded');
    }
  }

  // ===== ANIMATION ON SCROLL =====

  class ScrollAnimations {
    constructor() {
      this.init();
    }

    init() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');

              // Stagger children animations
              const children = entry.target.querySelectorAll('[data-animate-child]');
              children.forEach((child, index) => {
                child.style.animationDelay = `${index * 100}ms`;
                child.classList.add('is-visible');
              });
            }
          });
        }, {
          rootMargin: '0px 0px -10% 0px',
          threshold: 0.1
        });

        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
      }
    }
  }

  // ===== INITIALIZE =====

  function init() {
    // Initialize global components
    new Header();
    new Cart();
    new LazyLoader();
    new ScrollAnimations();

    // Initialize product sections
    document.querySelectorAll('[data-product-section]').forEach(container => {
      new Product(container);
    });

    // Initialize slideshows
    document.querySelectorAll('[data-slideshow]').forEach(container => {
      new Slideshow(container);
    });

    // Initialize accordions
    document.querySelectorAll('[data-accordion]').forEach(container => {
      new Accordion(container);
    });

    // Initialize tabs
    document.querySelectorAll('[data-tabs]').forEach(container => {
      new Tabs(container);
    });

    // Initialize predictive search
    document.querySelectorAll('[data-predictive-search]').forEach(container => {
      new PredictiveSearch(container);
    });

    // Initialize quantity selectors
    document.querySelectorAll('[data-quantity-selector]').forEach(container => {
      new QuantitySelector(container);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize on Shopify section load/reload
  document.addEventListener('shopify:section:load', init);

  // Expose utilities globally
  window.theme = window.theme || {};
  window.theme.Utils = Utils;
  window.theme.Cart = Cart;

})();
