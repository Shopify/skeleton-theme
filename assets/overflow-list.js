import { ResizeNotifier } from '@theme/utilities';
import { DeclarativeShadowElement } from '@theme/component';

/**
 * Event class for overflow minimum items updates
 * @extends {Event}
 */
export class OverflowMinimumEvent extends Event {
  /**
   * Creates a new OverflowMinimumEvent
   * @param {boolean} minimumReached - Whether the minimum number of visible items has been reached
   */
  constructor(minimumReached) {
    super('overflowMinimum', { bubbles: true });
    this.detail = {
      minimumReached,
    };
  }
}

/**
 * A custom element that wraps a list of items and moves them to an overflow slot when they don't fit.
 * This component is used in the header section and other areas.
 * @attr {string | null} minimum-items When set, the element enters a 'minimum-reached' state when visible items are at or below this number.
 * @example
 * <overflow-list minimum-items="2">
 *   <!-- list items -->
 * </overflow-list>
 */
export class OverflowList extends DeclarativeShadowElement {
  static get observedAttributes() {
    return ['disabled', 'minimum-items'];
  }

  /**
   * @param {string} name
   * @param {string} oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') {
      if (newValue === 'true') {
        this.#reset();
      } else {
        this.#reflowItems();
      }
    }
  }

  async connectedCallback() {
    super.connectedCallback();

    // Styles for dynamically injected <overflow-list> elements are async.
    // We need to wait for them to be loaded before initializing the element to properly calculate the overflow.
    await this.#waitForStyles();

    this.#initialize();
  }

  #waitForStyles() {
    /** @type {HTMLLinkElement | null | undefined} */
    const styles = this.shadowRoot?.querySelector('link[rel="stylesheet"]');

    // No styles or styles are already loaded.
    if (!styles || styles.sheet) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      styles.addEventListener('load', resolve);
    });
  }

  /**
   * Initialize the element
   */
  #initialize() {
    const { shadowRoot } = this;

    if (!shadowRoot) throw new Error('Missing shadow root');

    const defaultSlot = shadowRoot.querySelector('slot:not([name])');
    const overflowSlot = shadowRoot.querySelector('slot[name="overflow"]');
    const moreSlot = shadowRoot.querySelector('slot[name="more"]');
    const overflow = shadowRoot.querySelector('[part="overflow"]');
    const list = shadowRoot.querySelector('[part="list"]');
    const placeholder = shadowRoot.querySelector('[part="placeholder"]');

    if (
      !(defaultSlot instanceof HTMLSlotElement) ||
      !(overflowSlot instanceof HTMLSlotElement) ||
      !(moreSlot instanceof HTMLSlotElement) ||
      !(overflow instanceof HTMLElement) ||
      !(list instanceof HTMLUListElement) ||
      !(placeholder instanceof HTMLLIElement)
    ) {
      throw new Error('Invalid element types in <OverflowList />');
    }

    this.#refs = {
      defaultSlot,
      overflowSlot,
      moreSlot,
      overflow,
      list,
      placeholder,
    };

    // Add event listener for reflow requests
    this.addEventListener(
      'reflow',
      /** @param {CustomEvent<{lastVisibleElement?: HTMLElement}>} event */ (event) => {
        this.#reflowItems(0, event.detail.lastVisibleElement);
      }
    );

    // When <overflow-list> is dynamically injected, the browser doesn't remove its <template> automatically.
    // In theory, we could get rid of it now, or in DeclarativeShadowElement, but that would invalidate the layout.
    // Instead, we ignore it for now and remove it later on the first reflow.
    const elements = defaultSlot.assignedElements().filter((element) => !(element instanceof HTMLTemplateElement));
    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];

    // Observe the first and last elements to trigger a reflow when they are visible.
    // That way we can get their height from the IntersectionObserver for free (without reflows).
    if (firstElement) {
      this.#intersectionObserver.observe(firstElement);
    }
    if (lastElement && lastElement !== firstElement) {
      this.#intersectionObserver.observe(lastElement);
    }
  }

  disconnectedCallback() {
    this.#resizeObserver.disconnect();
    this.#mutationObserver.disconnect();
    this.#intersectionObserver.disconnect();
  }

  get schedule() {
    return typeof Theme?.utilities?.scheduler?.schedule === 'function'
      ? Theme.utilities.scheduler.schedule
      : /** @param {FrameRequestCallback} callback */ (callback) =>
          requestAnimationFrame(() => setTimeout(callback, 0));
  }

  #scheduled = false;

  /**
   * Get the minimum number of items before changing the minimum-reached state
   * @returns {number | null}
   */
  get minimumItems() {
    const value = this.getAttribute('minimum-items');
    return value ? parseInt(value, 10) : null;
  }

  get overflowSlot() {
    const { overflowSlot } = this.#refs;
    return overflowSlot;
  }

  get defaultSlot() {
    const { defaultSlot } = this.#refs;
    return defaultSlot;
  }

  /**
   * @param {IntersectionObserverEntry[]} entries
   */
  #handleIntersection = (entries) => {
    const entry = entries[0];
    if (entry?.isIntersecting) {
      this.#intersectionObserver.disconnect();
      setTimeout(() => {
        // Remove the leftover <template> for dynamically injected <overflow-list> elements.
        this.querySelector(':scope > template[shadowrootmode="open"]')?.remove();
        this.#reflowItems(entry.boundingClientRect.height);
      }, 0);
    }
  };

  /**
   * @type {ResizeObserverCallback & MutationCallback}
   */
  #handleChange = () => {
    if (this.#scheduled) return;

    this.#scheduled = true;

    requestAnimationFrame(() =>
      setTimeout(() => {
        this.#reflowItems();
        this.#scheduled = false;
      }, 0)
    );
  };

  /**
   * Move all items to the default slot.
   */
  #moveItemsToDefaultSlot() {
    const { defaultSlot, overflowSlot } = this.#refs;

    for (const element of overflowSlot.assignedElements()) {
      if (element.slot !== defaultSlot.name) {
        element.slot = defaultSlot.name;
      }
    }
  }

  /**
   * Reset the list to its initial state and disconnect the observers.
   */
  #reset() {
    const { list } = this.#refs;

    this.#unobserveChanges();
    this.#moveItemsToDefaultSlot();

    list.style.removeProperty('height');
    this.style.setProperty('--overflow-count', '0');
  }

  /**
   * Sets the minimum-reached attribute and dispatches a custom event based on visible elements count
   * @param {Element[]} visibleElements - The currently visible elements
   */
  #updateMinimumReached(visibleElements) {
    if (this.minimumItems !== null) {
      const minimumReached = visibleElements.length < this.minimumItems;

      if (minimumReached) {
        this.setAttribute('minimum-reached', '');
      } else {
        this.removeAttribute('minimum-reached');
      }

      this.dispatchEvent(new OverflowMinimumEvent(minimumReached));
    }
  }

  /**
   * Show all items in the list.
   */
  showAll() {
    const { placeholder } = this.#refs;

    placeholder.style.setProperty('width', '0');
    placeholder.style.setProperty('display', 'none');
    this.setAttribute('disabled', 'true');
  }

  /**
   * Reflow items based on available space within the list.
   * @param {number} [listHeight] Initial height of the list
   * @param {HTMLElement | null} [lastVisibleElement] Optional element to place in last visible position
   */
  #reflowItems = (listHeight = 0, lastVisibleElement = null) => {
    const { defaultSlot, overflowSlot, moreSlot, list, placeholder } = this.#refs;

    this.#unobserveChanges();

    // Reset all elements to the default slot so we can check which ones overflow.
    this.#moveItemsToDefaultSlot();

    const elements = defaultSlot.assignedElements();
    const lastElement = elements[elements.length - 1];

    if (!lastElement) {
      this.#observeChanges();
      return;
    }

    /** @type {Element[]} */
    let visibleElements = [];
    /** @type {Element[]} */
    let overflowingElements = [];
    let placeholderWidth = 0;
    let hasOverflow = false;

    if (listHeight > 0) {
      list.style.setProperty('height', `${listHeight}px`);
    }

    // Enable flex-wrap so overflowing items break to the next line. This makes calculations easier.
    list.style.setProperty('flex-wrap', 'wrap');
    placeholder.hidden = true;

    // Putting the "More" item (and lastVisibleElement, if provided) at the start of the list lets us see which items will fit on the same row.
    moreSlot.style.setProperty('order', '-1');
    moreSlot.hidden = false;

    lastVisibleElement?.style.setProperty('order', '-1');

    const moreSlotRect = moreSlot.getBoundingClientRect();

    elements.forEach((element) => {
      const elementRect = element.getBoundingClientRect();

      if (elementRect.top > moreSlotRect.top) {
        if (!overflowingElements.length) {
          placeholderWidth = elementRect.width;
        }

        hasOverflow = true;
        overflowingElements.push(element);
      } else {
        visibleElements.push(element);
      }
    });

    if (hasOverflow) {
      moreSlot.style.removeProperty('order');
    }
    lastVisibleElement?.style.removeProperty('order');

    // Move the elements to the correct slot.
    for (const element of elements) {
      const targetSlot = overflowingElements.includes(element) ? overflowSlot.name : defaultSlot.name;
      if (element.slot !== targetSlot) {
        element.slot = targetSlot;
      }
    }

    list.style.setProperty('counter-reset', `overflow-count ${overflowingElements.length}`);
    this.style.setProperty('--overflow-count', `${overflowingElements.length}`);

    // Adjust the "More" button visibility.
    moreSlot.hidden = !hasOverflow;

    if (hasOverflow) {
      // Set the width and height of the placeholder so the list can grow if there is space.
      placeholder.style.width = `${placeholderWidth}px`;
      placeholder.hidden = false;
    }

    // Reset the overflow property since children elements may need to display outside the list (e.g. dropdowns, popovers).
    list.style.setProperty('overflow', 'unset');

    hasOverflow && this.#updateMinimumReached(visibleElements);

    this.#observeChanges();
  };

  #observeChanges() {
    this.#resizeObserver.observe(this);
    this.#mutationObserver.observe(this, { childList: true });
  }

  #unobserveChanges() {
    this.#resizeObserver.disconnect();
    this.#mutationObserver.disconnect();
  }

  /**
   * @type {{
   *   defaultSlot: HTMLSlotElement;
   *   overflowSlot: HTMLSlotElement;
   *   moreSlot: HTMLSlotElement;
   *   overflow: HTMLElement;
   *   list: HTMLUListElement;
   *   placeholder: HTMLLIElement;
   * }}
   */
  #refs;

  /**
   * @type {ResizeObserver}
   */
  #resizeObserver = new ResizeNotifier(this.#handleChange);

  /**
   * @type {MutationObserver}
   */
  #mutationObserver = new MutationObserver(this.#handleChange);

  #intersectionObserver = new IntersectionObserver(this.#handleIntersection, {
    // Extend the root margin to around one more viewport of a typical mobile screen.
    rootMargin: '640px 360px 640px 360px',
  });
}

if (!customElements.get('overflow-list')) {
  customElements.define('overflow-list', OverflowList);
}
