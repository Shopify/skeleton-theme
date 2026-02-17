import { Component } from '@theme/component';

/**
 * Displays volume pricing table with expandable rows.
 * Shows pricing tiers based on quantity thresholds.
 *
 * @extends {Component}
 */
class VolumePricingComponent extends Component {
  /**
   * Toggles the expanded state of the volume pricing table
   */
  toggleExpanded() {
    this.classList.toggle('volume-pricing--expanded');
  }
}

if (!customElements.get('volume-pricing')) {
  customElements.define('volume-pricing', VolumePricingComponent);
}
