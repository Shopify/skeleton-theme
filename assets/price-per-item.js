import { Component } from '@theme/component';
import { ThemeEvents } from '@theme/events';

/**
 * Displays dynamic per-item pricing based on quantity and volume pricing tiers.
 * Updates automatically when quantity changes or cart is updated.
 *
 * @typedef {Object} PriceBreak
 * @property {number} quantity - Minimum quantity for this price tier
 * @property {string} price - Formatted price string (e.g., "$9.50 USD")
 *
 * @typedef {Object} PricePerItemRefs
 * @property {HTMLElement} [pricePerItemText] - The text element displaying the price
 *
 * @extends {Component<PricePerItemRefs>}
 */
class PricePerItemComponent extends Component {
  /** @type {PriceBreak[]} */
  #priceBreaks = [];
  #abortController = new AbortController();

  connectedCallback() {
    super.connectedCallback();
    this.#parsePriceBreaks();
    this.#attachEventListeners();
    this.#updatePriceDisplay();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#abortController.abort();
  }

  /**
   * Parses price breaks from data attributes
   */
  #parsePriceBreaks() {
    const minQuantity = parseInt(this.dataset.minQuantity || '') || 1;
    const { variantPrice, priceBreaks: priceBreaksData } = this.dataset;

    // Start with base price tier
    if (variantPrice) {
      this.#priceBreaks.push({ quantity: minQuantity, price: variantPrice });
    }

    // Parse additional price breaks from JSON array
    if (priceBreaksData) {
      const breaks = JSON.parse(priceBreaksData);
      for (const { quantity, price } of breaks) {
        if (quantity && price) {
          this.#priceBreaks.push({ quantity: parseInt(quantity), price });
        }
      }
    }

    // Sort by quantity descending for efficient lookup
    this.#priceBreaks.sort((a, b) => b.quantity - a.quantity);
  }

  /**
   * Attaches event listeners for quantity and cart updates
   */
  #attachEventListeners() {
    const { signal } = this.#abortController;

    // Listen on document to catch all events (more reliable than form-only)
    document.addEventListener(ThemeEvents.quantitySelectorUpdate, this.#handleQuantityUpdate, { signal });
    document.addEventListener(ThemeEvents.cartUpdate, this.#handleCartUpdate, { signal });
  }

  /**
   * Handles quantity selector updates
   * @param {Event} event
   */
  #handleQuantityUpdate = (event) => {
    // Only respond to updates for our variant's quantity selector
    const form = this.closest('product-form-component');
    if (!form || !(event.target instanceof Node) || !form.contains(event.target)) return;

    this.#updatePriceDisplay();
  };

  /**
   * Handles cart updates by refreshing display
   */
  #handleCartUpdate = () => {
    this.#updatePriceDisplay();
  };

  /**
   * Gets the total quantity (cart + current input value)
   * @returns {number}
   */
  #getCurrentQuantity() {
    const form = this.closest('product-form-component');
    const quantityInput = /** @type {HTMLInputElement | null} */ (form?.querySelector('input[name="quantity"]'));
    if (!quantityInput) return 1;

    // Read the current cart quantity from the data attribute
    const cartQty = parseInt(quantityInput.getAttribute('data-cart-quantity') || '0') || 0;
    // Read the current input value (quantity to add)
    const inputQty = parseInt(quantityInput.value) || 1;

    return cartQty + inputQty;
  }

  /**
   * Updates the price display based on current quantity
   */
  updatePriceDisplay() {
    if (!this.#priceBreaks.length || !this.refs.pricePerItemText) return;

    const quantity = this.#getCurrentQuantity();

    // Price breaks are sorted descending, find first tier that quantity qualifies for
    const priceBreak =
      this.#priceBreaks.find((pb) => quantity >= pb.quantity) ?? this.#priceBreaks[this.#priceBreaks.length - 1];

    if (priceBreak) {
      this.refs.pricePerItemText.innerHTML = `${this.dataset.atText} ${priceBreak.price}/${this.dataset.eachText}`;
    }
  }

  /**
   * Private wrapper for event handlers
   */
  #updatePriceDisplay = () => {
    this.updatePriceDisplay();
  };
}

if (!customElements.get('price-per-item')) {
  customElements.define('price-per-item', PricePerItemComponent);
}
