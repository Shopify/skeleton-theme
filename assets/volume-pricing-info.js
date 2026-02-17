import { Component } from '@theme/component';

/**
 * Displays volume pricing information in a popover.
 * Shows quantity rules and pricing tiers with the current tier highlighted.
 * Positioning and hover behavior is handled by the parent anchored-popover-component.
 *
 * @typedef {Object} VolumePricingInfoRefs
 * @property {HTMLElement} popover - The popover element
 *
 * @extends {Component<VolumePricingInfoRefs>}
 */
class VolumePricingInfoComponent extends Component {
  /**
   * Ensures the parent anchored-popover-component refs are refreshed after connection,
   */
  connectedCallback() {
    super.connectedCallback();
    const anchoredPopover = this.closest('anchored-popover-component');
    if (anchoredPopover instanceof Component && anchoredPopover.isConnected) {
      try {
        anchoredPopover.updatedCallback();
      } catch (error) {
        Promise.resolve().then(() => {
          if (anchoredPopover.isConnected) {
            try {
              anchoredPopover.updatedCallback();
            } catch (e) {}
          }
        });
      }
    }
  }

  /**
   * Ensures the parent anchored-popover-component refs are refreshed immediately,
   */
  updatedCallback() {
    super.updatedCallback();
    const anchoredPopover = this.closest('anchored-popover-component');
    if (anchoredPopover instanceof Component) {
      anchoredPopover.updatedCallback();
    }
  }

  /**
   * Updates the highlighted price tier based on current quantity
   * @param {number} quantity - The current quantity
   */
  updateActiveTier(quantity) {
    const anchoredPopover = this.closest('anchored-popover-component');
    const popover = anchoredPopover instanceof Component ? anchoredPopover.refs?.popover : null;
    const rows = popover?.querySelectorAll('.volume-pricing-info__row[data-quantity]');
    if (!rows) return;

    let activeTier = null;
    for (const row of rows) {
      row.classList.remove('volume-pricing-info__row--active');
      if (row instanceof HTMLElement && quantity >= parseInt(row.dataset.quantity || '0')) {
        activeTier = row;
      }
    }
    activeTier?.classList.add('volume-pricing-info__row--active');
  }
}

if (!customElements.get('volume-pricing-info')) {
  customElements.define('volume-pricing-info', VolumePricingInfoComponent);
}
