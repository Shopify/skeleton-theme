import { Component } from '@theme/component';
import { CartAddEvent, QuantitySelectorUpdateEvent, ThemeEvents } from '@theme/events';
import { debounce, fetchConfig, resetShimmer } from '@theme/utilities';
import { morphSection, sectionRenderer } from '@theme/section-renderer';

/**
 * A custom element that manages the quick order list section.
 *
 * @typedef {object} QuickOrderListComponentRefs
 * @property {HTMLTableRowElement[]} variantRows - The variant row elements
 * @property {HTMLElement} confirmationPanel - The remove all confirmation dialog
 * @property {HTMLElement} totalInfo - The total info section element
 * @property {HTMLElement} errorContainer - The error message container
 * @property {HTMLElement} errorText - The error message text element
 * @property {HTMLElement} successContainer - The success message container
 * @property {HTMLElement} successText - The success message text element
 * @property {HTMLElement} [paginationNav] - The pagination navigation element
 *
 * @extends Component<QuickOrderListComponentRefs>
 */
class QuickOrderListComponent extends Component {
  requiredRefs = [
    'variantRows',
    'confirmationPanel',
    'totalInfo',
    'errorContainer',
    'errorText',
    'successContainer',
    'successText',
  ];

  /** @type {AbortController|null} */
  #abortController = null;

  /** @type {(event: Event) => void} */
  #debouncedHandleQuantityUpdate;

  /** @type {(event: Event) => void} */
  #boundHandleCartUpdate;

  /**
   * Gets the current page number from pagination controls
   * @returns {number}
   */
  get currentPage() {
    if (this.refs.paginationNav && this.refs.paginationNav.dataset.current_page) {
      const pageNum = parseInt(this.refs.paginationNav.dataset.current_page, 10);
      if (!isNaN(pageNum)) {
        return pageNum;
      }
    }
    return 1;
  }

  /**
   * Gets all cart variant IDs for the product from the data attribute
   * @returns {number[]}
   */
  get cartVariantIds() {
    const data = this.dataset.cartVariantIds;
    if (!data) return [];

    return JSON.parse(data);
  }

  connectedCallback() {
    super.connectedCallback();

    this.#debouncedHandleQuantityUpdate = debounce(this.#handleQuantityUpdate.bind(this), 300);
    this.#boundHandleCartUpdate = this.#handleCartUpdate.bind(this);

    this.addEventListener(ThemeEvents.quantitySelectorUpdate, this.#debouncedHandleQuantityUpdate);
    document.addEventListener(ThemeEvents.cartUpdate, this.#boundHandleCartUpdate);
    this.addEventListener('keydown', this.#handleKeyDown, true);
    this.addEventListener('keyup', this.#handleKeyup, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener(ThemeEvents.quantitySelectorUpdate, this.#debouncedHandleQuantityUpdate);
    document.removeEventListener(ThemeEvents.cartUpdate, this.#boundHandleCartUpdate);
    this.removeEventListener('keydown', this.#handleKeyDown, true);
    this.removeEventListener('keyup', this.#handleKeyup, true);

    this.#abortController?.abort();
  }

  /**
   * @param {EventTarget | null} target
   * @returns {target is HTMLInputElement}
   */
  #isQuantityInput(target) {
    return target instanceof HTMLInputElement && target.matches('input[type="number"][data-cart-quantity]');
  }

  /**
   * Keyboard navigation:
   * Enter key selects next quantity input
   * Shift+Enter selects previous quantity input
   * @param {KeyboardEvent} event
   */
  #handleKeyDown = (event) => {
    if (event.key !== 'Enter' || !this.#isQuantityInput(event.target)) {
      return;
    }
    event.preventDefault();

    // Get all VISIBLE quantity inputs (exclude hidden mobile/desktop variants)
    const allQuantityInputs = Array.from(this.querySelectorAll('input[type="number"][data-cart-quantity]')).filter(
      (input) => {
        return input instanceof HTMLElement && input.offsetParent !== null;
      }
    );

    if (allQuantityInputs.length <= 1) {
      return;
    }

    const currentIndex = allQuantityInputs.indexOf(event.target);
    if (currentIndex === -1) {
      return;
    }

    const offset = event.shiftKey ? -1 : 1;
    const nextIndex = (currentIndex + offset + allQuantityInputs.length) % allQuantityInputs.length;
    const nextInput = allQuantityInputs[nextIndex];

    event.target.blur();
    if (nextInput instanceof HTMLInputElement) {
      nextInput.select();
    }
  };

  /**
   * @param {KeyboardEvent} event
   */
  #handleKeyup = (event) => {
    if ((event.key === 'Tab' || event.key === 'Enter') && this.#isQuantityInput(event.target)) {
      this.#scrollToCenter(event.target);
    }
  };

  /**
   * @param {HTMLElement} element
   */
  #scrollToCenter(element) {
    element.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  }

  /**
   * Handles pagination events
   * @param {Object<string, string>} data - URL search params
   * @param {Event} event - The click event
   */
  async onPaginationControlClick(data, event) {
    event.preventDefault();
    const sectionId = this.dataset.sectionId;

    if (!this.dataset.url || !sectionId) return;

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    const newURL = new URL(this.dataset.url, window.location.origin);
    for (const [key, value] of Object.entries(data)) {
      newURL.searchParams.set(key, value);
    }

    await sectionRenderer.renderSection(sectionId, {
      url: newURL,
    });
    this.#scrollToTopOfSection();
  }

  /**
   * Handles removing a single variant item (sets quantity to 0)
   * @param {string} variantId - The variant ID to remove
   * @param {Event} event - The click event
   */
  async onLineItemRemove(variantId, event) {
    event.preventDefault();

    const targetRow = this.refs.variantRows.find((row) => row.dataset.variantId === String(variantId));
    if (!(targetRow instanceof HTMLElement)) return;

    const quantityInput = targetRow.querySelector('input[type="number"]');
    if (quantityInput instanceof HTMLInputElement) {
      quantityInput.value = '0';
      quantityInput.dispatchEvent(new QuantitySelectorUpdateEvent(0, Number(quantityInput.dataset.cartLine)));
    }
  }

  /**
   * Handles removing all items from the cart
   * @param {Event} event - The click event
   */
  async onRemoveAll(event) {
    event.preventDefault();
    const idsToRemove = this.cartVariantIds;

    this.#clearSuccessMessage();
    this.#clearErrorMessage();
    this.#applyShimmerEffects(idsToRemove);

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    try {
      /** @type {Record<string, number>} */
      const updates = {};

      if (idsToRemove.length > 0) {
        for (const variantId of idsToRemove) {
          updates[String(variantId)] = 0;
        }
      }

      if (Object.keys(updates).length === 0) {
        resetShimmer(this);
        return;
      }

      const sectionIds = this.#getSectionIds();
      const sectionsUrl = new URL(window.location.pathname, window.location.origin);
      sectionsUrl.searchParams.set('page', this.currentPage.toString());

      const body = JSON.stringify({
        updates: updates,
        sections: sectionIds.join(','),
        sections_url: sectionsUrl.pathname + sectionsUrl.search,
      });

      const response = await fetch(Theme.routes.cart_update_url, {
        ...fetchConfig('json', { body }),
        signal: this.#abortController.signal,
      });

      const responseText = await response.text();
      const data = JSON.parse(responseText);

      resetShimmer(this);

      if (data.errors) {
        this.#showErrorMessage(data.errors);
      } else {
        this.#updateSectionHTML(data);
        this.#toggleConfirmationPanel(false);

        document.dispatchEvent(
          new CartAddEvent(data, this.id, {
            source: 'quick-order-remove-all',
            sections: data.sections,
          })
        );
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        resetShimmer(this);
        throw error;
      }
    }
  }

  /**
   * Handles quantity selector updates
   * @param {CustomEvent} event - The quantity update event
   */
  async #handleQuantityUpdate(event) {
    if (!(event instanceof QuantitySelectorUpdateEvent)) return;

    // Only handle events from our own quantity selectors
    if (!(event.target instanceof Node) || !this.contains(event.target)) return;

    const { quantity } = event.detail;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const variantRow = this.refs.variantRows.find((row) => {
      return row.contains(target);
    });

    if (!variantRow) return;

    const variantId = variantRow.dataset.variantId;
    if (!variantId) return;

    const quantityInput = /** @type {HTMLInputElement|null} */ (variantRow.querySelector('input[data-cart-quantity]'));
    const currentCartQuantity = quantityInput ? parseInt(quantityInput.dataset.cartQuantity || '0') || 0 : 0;

    this.#clearSuccessMessage();
    this.#clearErrorMessage();

    if (currentCartQuantity === quantity) {
      return;
    }

    this.#applyShimmerEffects([variantId]);

    this.#disableQuickOrderListItems();
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    try {
      /** @type {Record<string, number>} */
      const updates = {};
      updates[variantId] = quantity;

      // Include page parameter in sections URL to maintain pagination state
      const sectionsUrl = new URL(window.location.pathname, window.location.origin);
      sectionsUrl.searchParams.set('page', this.currentPage.toString());

      const body = JSON.stringify({
        updates: updates,
        sections: this.#getSectionIds().join(','),
        sections_url: sectionsUrl.pathname + sectionsUrl.search,
      });

      const response = await fetch(Theme.routes.cart_update_url, {
        ...fetchConfig('json', { body }),
        signal: this.#abortController.signal,
      });

      const responseText = await response.text();
      const data = JSON.parse(responseText);

      resetShimmer(this);

      if (data.errors) {
        this.#showErrorMessage(data.errors);
        if (this.dataset.sectionId) {
          const url = new URL(window.location.href);
          url.searchParams.set('page', this.currentPage.toString());
          await sectionRenderer.renderSection(this.dataset.sectionId, { cache: false, url });
        }
      } else {
        this.#updateSectionHTML(data);

        const quantityAdded = quantity - currentCartQuantity;
        if (quantityAdded > 0) {
          this.#showSuccessMessage(quantityAdded);
        }

        document.dispatchEvent(
          new CartAddEvent(data, this.id, {
            source: 'quick-order-quantity',
            variantId: variantId,
            sections: data.sections,
          })
        );
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        this.#enableQuickOrderListItems();
        resetShimmer(this);
        throw error;
      }
    }
  }

  /**
   * Handles cart update events from other components
   * @param {CustomEvent} event - The cart update event
   */
  async #handleCartUpdate(event) {
    // Don't process our own events to avoid double updates
    // Check if this event came from our own quantity update
    if (event.detail?.source === 'quick-order-quantity' && event.detail?.sourceId === this.id) {
      return;
    }

    this.#enableQuickOrderListItems();
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    if (event.detail?.data?.sections && this.dataset.sectionId) {
      this.#updateSectionHTML(event.detail.data);
      if (event.detail.data.sections[this.dataset.sectionId]) {
        return;
      }
    }

    if (this.dataset.sectionId) {
      const url = new URL(window.location.href);
      url.searchParams.set('page', this.currentPage.toString());

      await sectionRenderer.renderSection(this.dataset.sectionId, {
        cache: false,
        url,
      });
    }
  }

  #disableQuickOrderListItems() {
    this.classList.add('quick-order-list-disabled');
  }

  #enableQuickOrderListItems() {
    this.classList.remove('quick-order-list-disabled');
  }

  /**
   * Shows the remove all confirmation dialog
   * @param {Event} event - The click event
   */
  showRemoveAllConfirmation(event) {
    event.preventDefault();
    this.#toggleConfirmationPanel(true);
  }

  /**
   * Hides the remove all confirmation
   * @param {Event} event - The click event
   */
  hideRemoveAllConfirmation(event) {
    event.preventDefault();
    this.#toggleConfirmationPanel(false);
  }

  /**
   * Toggles the confirmation panel visibility
   * @param {boolean} show
   */
  #toggleConfirmationPanel(show) {
    this.refs.confirmationPanel.classList.toggle('hidden', !show);
    this.refs.totalInfo.classList.toggle('confirmation-visible', show);
  }

  /**
   * Shows an error message in the error container
   * @param {string} message - The error message to display
   */
  #showErrorMessage(message) {
    this.refs.errorText.textContent = message;
    this.refs.errorContainer.classList.remove('hidden');
  }

  /**
   * Hides the error messages
   */
  #clearErrorMessage() {
    this.refs.errorContainer.classList.add('hidden');
  }

  /**
   * Shows success message in the success container
   * @param {number} quantityAdded - The number of items added
   */
  #showSuccessMessage(quantityAdded) {
    this.#clearErrorMessage();

    const oneItemText = Theme?.translations?.items_added_to_cart_one || '1 item added to cart';
    const itemsText = Theme?.translations?.items_added_to_cart_other || '{{ count }} items added to cart';

    const message = quantityAdded === 1 ? oneItemText : itemsText.replace('{{ count }}', quantityAdded.toString());

    this.refs.successText.textContent = message;
    this.refs.successContainer.classList.remove('hidden');
  }

  #clearSuccessMessage() {
    this.refs.successContainer.classList.add('hidden');
  }

  /**
   * Applies shimmer effects to price elements
   * @param {Array<string|number>} variantIds - Array of variant IDs to apply shimmer to
   */
  #applyShimmerEffects(variantIds) {
    for (const variantId of variantIds) {
      const variantRow = this.refs.variantRows.find((row) => row.dataset.variantId === String(variantId));
      if (variantRow) {
        const variantTotal = /** @type {import('./utilities').TextComponent|null} */ (
          variantRow.querySelector('.variant-item__total-price')
        );
        variantTotal?.shimmer();
      }
    }

    const totalPrice = /** @type {import('./utilities').TextComponent|null} */ (
      this.querySelector('text-component[ref="totalPrice"]')
    );
    totalPrice?.shimmer();
  }

  #scrollToTopOfSection() {
    // Defer layout read until scroll action to batch with other layout work
    requestAnimationFrame(() => {
      const top = this.getBoundingClientRect().top;
      window.scrollTo({ top: top + window.scrollY, behavior: 'smooth' });
    });
  }

  /**
   * Updates section HTML using morphSection
   * @param {{ sections?: Record<string, string> }} data - Response data containing sections
   */
  #updateSectionHTML(data) {
    if (data.sections && this.dataset.sectionId) {
      const sectionHtml = data.sections[this.dataset.sectionId];
      if (sectionHtml) {
        morphSection(this.dataset.sectionId, sectionHtml);
      }
    }
  }

  /**
   * Gets the section IDs for updating
   * @returns {string[]} Array of section IDs
   */
  #getSectionIds() {
    const sectionIds = [];

    if (this.dataset.sectionId) {
      sectionIds.push(this.dataset.sectionId);
    }

    // Also include all cart-items-component sections (like cart drawer) for smooth updates
    const cartItemsComponents = document.querySelectorAll('cart-items-component');
    for (const component of cartItemsComponents) {
      if (!(component instanceof HTMLElement)) continue;
      if (component.dataset.sectionId && !sectionIds.includes(component.dataset.sectionId)) {
        sectionIds.push(component.dataset.sectionId);
      }
    }

    return sectionIds;
  }
}

if (!customElements.get('quick-order-list-component')) {
  customElements.define('quick-order-list-component', QuickOrderListComponent);
}
