// assets/product-custom-property.js
import { Component } from '@theme/component';

/**
 * @typedef {object} ProductCustomPropertyRefs
 * @property {HTMLInputElement | HTMLTextAreaElement} textInput - The text input.
 * @property {HTMLElement} characterCount - The character count element.
 */

/**
 * A custom element that manages product custom properties
 * @extends Component<ProductCustomPropertyRefs>
 */
class ProductCustomProperty extends Component {
  handleInput() {
    this.#updateCharacterCount();
  }

  #updateCharacterCount() {
    const { characterCount, textInput } = this.refs;
    const currentLength = textInput.value.length;
    const maxLength = textInput.maxLength;

    const template = characterCount.getAttribute('data-template');
    if (!template) return;

    const updatedText = template.replace('[current]', currentLength.toString()).replace('[max]', maxLength.toString());

    characterCount.textContent = updatedText;
  }
}

customElements.define('product-custom-property-component', ProductCustomProperty);
