import { Component } from '@theme/component';
import { debounce, requestIdleCallback } from '@theme/utilities';

/**
 * A custom element that manages the popover + popover trigger relationship for anchoring.
 * Calculates the trigger position and inlines custom properties on the popover element
 * that can be consumed by CSS for positioning.
 *
 * @typedef {object} Refs
 * @property {HTMLElement} popover – The popover element.
 * @property {HTMLElement} trigger – The popover trigger element.
 *
 * @extends Component<Refs>
 *
 * @example
 * ```html
 * <anchored-popover-component data-close-on-resize>
 *   <button data-ref="trigger" popovertarget="menu">Open Menu</button>
 *   <div data-ref="popover" id="menu" popover>Menu content</div>
 * </anchored-popover-component>
 * ```
 *
 * @property {string[]} requiredRefs - Required refs: 'popover' and 'trigger'
 * @property {number} [interaction_delay] - The delay in milliseconds for the hover interaction
 * @property {string} [data-close-on-resize] - When present, closes popover on window resize
 * @property {string} [data-hover-triggered] - When present, makes the popover function via pointerenter/leave
 * @property {number | null} [popoverTrigger] - The timeout for the popover trigger
 */
export class AnchoredPopoverComponent extends Component {
  requiredRefs = ['popover', 'trigger'];
  interaction_delay = 200;
  #popoverTrigger = /** @type {number | null} */ (null);

  #onTriggerEnter = () => {
    const { trigger, popover } = this.refs;
    trigger.dataset.hoverActive = 'true';
    if (!popover.matches(':popover-open')) {
      this.#popoverTrigger = setTimeout(() => {
        if (trigger.matches('[data-hover-active]')) popover.showPopover();
      }, this.interaction_delay);
    }
  };

  #onTriggerLeave = () => {
    const { trigger, popover } = this.refs;
    delete trigger.dataset.hoverActive;
    if (this.#popoverTrigger) clearTimeout(this.#popoverTrigger);
    if (popover.matches(':popover-open')) {
      this.#popoverTrigger = setTimeout(() => {
        popover.hidePopover();
      }, this.interaction_delay);
    }
  };

  #onPopoverEnter = () => {
    if (this.#popoverTrigger) clearTimeout(this.#popoverTrigger);
  };

  #onPopoverLeave = () => {
    const { popover } = this.refs;
    this.#popoverTrigger = setTimeout(() => {
      popover.hidePopover();
    }, this.interaction_delay);
  };

  /**
   * Updates the popover position by calculating trigger element bounds
   * and setting CSS custom properties on the popover element.
   */
  #updatePosition = async () => {
    const { popover, trigger } = this.refs;
    if (!popover || !trigger) return;
    const positions = trigger.getBoundingClientRect();
    popover.style.setProperty('--anchor-top', `${positions.top}`);
    popover.style.setProperty('--anchor-right', `${window.innerWidth - positions.right}`);
    popover.style.setProperty('--anchor-bottom', `${window.innerHeight - positions.bottom}`);
    popover.style.setProperty('--anchor-left', `${positions.left}`);
    popover.style.setProperty('--anchor-height', `${positions.height}`);
    popover.style.setProperty('--anchor-width', `${positions.width}`);
  };

  /**
   * Debounced resize handler that optionally closes the popover
   * when the window is resized, based on the data-close-on-resize attribute.
   */
  #resizeListener = debounce(() => {
    const popover = /** @type {HTMLElement} */ (this.refs.popover);
    if (popover && popover.matches(':popover-open')) {
      popover.hidePopover();
    }
  }, 100);

  /**
   * Component initialization - sets up event listeners for resize and popover toggle events.
   */
  connectedCallback() {
    super.connectedCallback();
    const { popover, trigger } = this.refs;
    if (this.dataset.closeOnResize) {
      popover.addEventListener('beforetoggle', (event) => {
        const evt = /** @type {ToggleEvent} */ (event);
        window[evt.newState === 'open' ? 'addEventListener' : 'removeEventListener']('resize', this.#resizeListener);
      });
    }
    if (this.dataset.hoverTriggered) {
      trigger.addEventListener('pointerenter', this.#onTriggerEnter);
      trigger.addEventListener('pointerleave', this.#onTriggerLeave);
      popover.addEventListener('pointerenter', this.#onPopoverEnter);
      popover.addEventListener('pointerleave', this.#onPopoverLeave);
    }
    if (!CSS.supports('position-anchor: --trigger')) {
      popover.addEventListener('beforetoggle', () => {
        this.#updatePosition();
      });
      requestIdleCallback(() => {
        this.#updatePosition();
      });
    }
  }

  /**
   * Component cleanup - removes resize event listener.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.#resizeListener);
  }
}

if (!customElements.get('anchored-popover-component')) {
  customElements.define('anchored-popover-component', AnchoredPopoverComponent);
}
