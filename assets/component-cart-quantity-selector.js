import { QuantitySelectorComponent } from '@theme/component-quantity-selector';

/**
 * A custom element that allows the user to select a quantity in the cart.
 * Extends QuantitySelectorComponent but uses absolute max limits instead of effective max.
 * Semantics: "What should the total quantity BE in the cart" vs "How many to ADD to cart"
 *
 * @extends {QuantitySelectorComponent}
 */
class CartQuantitySelectorComponent extends QuantitySelectorComponent {
  /**
   * Gets the effective maximum value for cart quantity selector
   * Cart page: uses absolute max (how much can be in cart total)
   * @returns {number | null} The effective max, or null if no max
   */
  getEffectiveMax() {
    const { max } = this.getCurrentValues();
    return max; // Cart uses absolute max, not max minus cart quantity
  }

  /**
   * Updates button states based on current value and limits
   * Cart buttons are always managed client-side, never server-disabled
   */
  updateButtonStates() {
    const { minusButton, plusButton } = this.refs;
    const { min, value } = this.getCurrentValues();
    const effectiveMax = this.getEffectiveMax();

    // Cart buttons are always dynamically managed
    minusButton.disabled = value <= min;
    plusButton.disabled = effectiveMax !== null && value >= effectiveMax;
  }
}

if (!customElements.get('cart-quantity-selector-component')) {
  customElements.define('cart-quantity-selector-component', CartQuantitySelectorComponent);
}
