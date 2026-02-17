import { Component } from '@theme/component';
import { QuickAddComponent } from '@theme/quick-add';
import { isClickedOutside, isMobileBreakpoint, isTouchDevice, mediaQueryLarge } from '@theme/utilities';

/**
 * A custom element that manages a dialog.
 *
 * @typedef {object} Refs
 * @property {HTMLDialogElement} dialog - The dialog element.
 * @property {HTMLButtonElement} trigger - The button element.
 * @property {HTMLAnchorElement} productLink - The product link element.
 *
 * @extends Component<Refs>
 */

export class ProductHotspotComponent extends Component {
  requiredRefs = ['trigger', 'dialog'];
  /** @type {(() => void) | null} */
  #pointerenterHandler = null;
  timer = /** @type {number | null} */ (null);

  connectedCallback() {
    super.connectedCallback();

    // Set up initial event listeners based on current breakpoint
    this.#handleBreakpointChange();

    // Listen for breakpoint changes
    mediaQueryLarge.addEventListener('change', this.#handleBreakpointChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Clean up listeners
    this.#removeDesktopListeners();
    mediaQueryLarge.removeEventListener('change', this.#handleBreakpointChange);
  }

  /**
   * Open the quick-add modal
   * @returns {void}
   */
  #openQuickAddModal() {
    const quickAddComponent = /** @type {QuickAddComponent | null} */ (this.querySelector('quick-add-component'));

    if (!quickAddComponent) return;
    quickAddComponent.handleClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }

  /**
   * Set up desktop event listeners (hover)
   * @returns {void}
   */
  #setupDesktopListeners() {
    const { trigger, dialog } = this.refs;

    /** @type {() => void} */
    const pointerenterHandler = () => {
      if (dialog.open) return;

      this.timer = setTimeout(() => {
        this.showDialog();
      }, 120);
      // Add pointerleave listener when entering trigger
      trigger.addEventListener('pointerleave', this.#handlePointerLeave);
    };

    this.#pointerenterHandler = pointerenterHandler;
    trigger.addEventListener('pointerenter', pointerenterHandler);
  }

  /**
   * Remove desktop event listeners from trigger
   * @returns {void}
   */
  #removeDesktopListeners() {
    const { trigger } = this.refs;

    if (this.#pointerenterHandler) {
      trigger.removeEventListener('pointerenter', this.#pointerenterHandler);
      trigger.removeEventListener('pointerleave', this.#handlePointerLeave);
      this.#pointerenterHandler = null;
    }

    // Clear any pending timer
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /**
   * Handle breakpoint changes
   * @returns {void}
   */
  #handleBreakpointChange = () => {
    // Remove existing listeners
    this.#removeDesktopListeners();

    // Set up desktop hover listeners only (mobile uses on:click in template)
    if (!isMobileBreakpoint()) {
      this.#setupDesktopListeners();
    }
  };

  /**
   * Calculate the placement of the dialog.
   * @returns {Promise<void> | undefined}
   */
  #calculateDialogPlacement() {
    const { trigger, dialog } = this.refs;

    const hotspotsContainer = this.parentElement;

    if (!hotspotsContainer) {
      return;
    }

    // Spacing constants
    const BUTTON_GAP = 10; // Gap between button and dialog
    const CONTAINER_GAP = 10; // Gap from container edges
    const TOTAL_GAP = BUTTON_GAP + CONTAINER_GAP;

    // Get container bounds
    const containerRect = hotspotsContainer?.getBoundingClientRect();

    // Get button dimensions
    const triggerRect = trigger.getBoundingClientRect();

    // To get dialog dimensions, we need to temporarily show it invisibly
    // Show dialog invisibly to measure it
    dialog.style.visibility = 'hidden';
    dialog.style.display = 'block';
    dialog.style.transform = 'none';
    dialog.removeAttribute('data-placement');

    const { width: dialogWidth, height: dialogHeight } = dialog.getBoundingClientRect();

    // Reset dialog state
    dialog.style.removeProperty('display');
    dialog.style.removeProperty('visibility');
    dialog.style.removeProperty('transform');
    // Calculate button position relative to container
    const buttonLeft = triggerRect.left - containerRect.left;
    const buttonRight = triggerRect.right - containerRect.left;
    const buttonTop = triggerRect.top - containerRect.top;
    const buttonBottom = triggerRect.bottom - containerRect.top;

    // Calculate available space
    const spaceRight = containerRect.width - buttonRight - CONTAINER_GAP;
    const spaceLeft = buttonLeft - CONTAINER_GAP;

    // Determine horizontal placement
    let x = 'right';

    if (spaceRight >= dialogWidth + BUTTON_GAP) {
      x = 'right';
    } else if (spaceLeft >= dialogWidth + BUTTON_GAP) {
      x = 'left';
    } else {
      x = 'center';
    }

    // Determine vertical placement
    let y = 'bottom';
    let verticalOffset = 0;

    if (x !== 'center') {
      let dialogStartY = buttonTop; // Default to top-aligned
      let dialogEndY = buttonTop + dialogHeight;

      if (dialogEndY > containerRect.height - CONTAINER_GAP) {
        // If top-aligned overflows bottom
        dialogStartY = buttonBottom - dialogHeight;
        dialogEndY = buttonBottom;
        y = 'top';

        if (dialogStartY < CONTAINER_GAP) {
          // If bottom-aligned overflows top
          verticalOffset = CONTAINER_GAP - dialogStartY;
        } else if (dialogEndY > containerRect.height - CONTAINER_GAP) {
          // If bottom-aligned overflows bottom
          verticalOffset = -(dialogEndY - (containerRect.height - CONTAINER_GAP));
        }
      } else {
        if (dialogStartY < CONTAINER_GAP) {
          // If top-aligned overflows top
          if (dialogStartY < CONTAINER_GAP) {
            verticalOffset = CONTAINER_GAP - dialogStartY;
          }
          y = 'bottom';
        }
      }
    } else {
      // For center horizontal: position below or above button
      if (containerRect.height - buttonBottom >= dialogHeight + TOTAL_GAP) {
        y = 'bottom';
      } else if (buttonTop >= dialogHeight + TOTAL_GAP) {
        y = 'top';
      } else {
        // If neither fits well, choose based on button position
        y = buttonTop < containerRect.height / 2 ? 'bottom' : 'top';
      }
    }

    // Set placement data attribute
    dialog.dataset.placement = `${x},${y}`;

    // Apply vertical offset if needed to keep dialog in bounds
    if (verticalOffset !== 0) {
      dialog.style.setProperty('--dialog-vertical-offset', `${verticalOffset}px`);
    } else {
      dialog.style.removeProperty('--dialog-vertical-offset');
    }

    // Return a promise that resolves after a few ticks to ensure styles are applied
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  /**
   * Handle pointer leave.
   * @param {PointerEvent} e - The event.
   * @returns {void}
   */
  #handlePointerLeave = (e) => {
    const { dialog, trigger } = this.refs;

    // Clear open timer if leaving trigger before dialog opens
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (!dialog.open) return;

    const isLeavingTrigger = e.target === trigger;
    const isLeavingDialog = e.target === dialog;
    const isGoingToDialog =
      e.relatedTarget === dialog ||
      (e.relatedTarget instanceof Element && e.relatedTarget.closest('dialog') === dialog);
    const isGoingToTrigger = e.relatedTarget === trigger;

    if ((isLeavingTrigger && !isGoingToDialog) || (isLeavingDialog && !isGoingToTrigger)) {
      this.closeDialog();
    }
  };

  /**
   * Get the product link for the hotspot product.
   * @returns {HTMLAnchorElement | null} The product link or null.
   */
  getHotspotProductLink() {
    return this.refs.productLink || null;
  }

  /**
   * Handle hotspot click - on mobile/touch devices opens quick-add, on desktop opens dialog
   * @param {MouseEvent} e - The click event
   * @returns {void}
   */
  handleHotspotClick = (e) => {
    // Check if it's a touch device (tablets) or mobile breakpoint
    if (isMobileBreakpoint() || isTouchDevice()) {
      e.preventDefault();
      e.stopPropagation();
      this.#openQuickAddModal();
    } else {
      this.showDialog();
    }
  };

  showDialog = async () => {
    const { dialog } = this.refs;
    await this.#calculateDialogPlacement();
    dialog.dataset.showing = 'true';
    dialog.show();
    document.body.addEventListener('click', this.lightDismissMouse);
    document.body.addEventListener('keydown', this.lightDismissKeyboard);
    document.body.addEventListener('keyup', this.lightDismissKeyboard);
    // Add pointerleave listener to dialog when it opens
    dialog.addEventListener('pointerleave', this.#handlePointerLeave);
  };

  /**
   * Close the dialog.
   * @returns {Promise<void>}
   */
  closeDialog = async () => {
    const { dialog, trigger } = this.refs;
    dialog.dataset.closing = 'true';
    dialog.close();
    document.body.removeEventListener('click', this.lightDismissMouse);
    document.body.removeEventListener('keydown', this.lightDismissKeyboard);
    document.body.removeEventListener('keyup', this.lightDismissKeyboard);
    // Remove pointerleave listeners when closing
    dialog.removeEventListener('pointerleave', this.#handlePointerLeave);
    trigger.removeEventListener('pointerleave', this.#handlePointerLeave);
    // we need to use a data-attribute to keep transition-behavior working only when open
    const animations = dialog.getAnimations({ subtree: true });
    await Promise.allSettled(animations.map((a) => a.finished));
    if (!dialog.open) {
      delete dialog.dataset.showing;
      delete dialog.dataset.closing;
      delete dialog.dataset.placement;
    }
  };

  /**
   * Light dismiss the dialog.
   * @param {MouseEvent} event - The event.
   * @returns {void}
   */
  lightDismissMouse = (event) => {
    const { dialog } = this.refs;
    if (isClickedOutside(event, dialog)) {
      this.closeDialog();
    }
  };

  /**
   * Light dismiss the dialog.
   * @param {KeyboardEvent} event - The event.
   * @returns {void}
   */
  lightDismissKeyboard = (event) => {
    const { dialog } = this.refs;
    if (
      (event.type === 'keydown' && event.key === 'Escape') ||
      (event.type === 'keyup' && !dialog.matches(':is(:focus, :focus-visible, :focus-within)'))
    ) {
      this.closeDialog();
    }
  };
}

// Register custom element
customElements.define('product-hotspot-component', ProductHotspotComponent);
