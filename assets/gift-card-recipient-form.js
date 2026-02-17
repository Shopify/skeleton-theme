import { Component } from '@theme/component';
import { ThemeEvents, CartErrorEvent, CartAddEvent } from '@theme/events';

/**
 * @typedef {Object} GiftCardRecipientFormRefs
 * @property {HTMLInputElement} myEmailButton - Button for selecting my email option
 * @property {HTMLInputElement} recipientEmailButton - Button for selecting recipient email option
 * @property {HTMLDivElement} recipientFields - Container for recipient form fields
 * @property {HTMLInputElement} recipientEmail - Recipient email input field
 * @property {HTMLInputElement} recipientName - Recipient name input field
 * @property {HTMLTextAreaElement} recipientMessage - Recipient message textarea
 * @property {HTMLInputElement} recipientSendOn - Send on date input
 * @property {HTMLInputElement} [timezoneOffset] - Timezone offset hidden input (optional)
 * @property {HTMLInputElement} [controlFlag] - Shopify gift card control flag (optional as it's dynamically queried)
 * @property {HTMLDivElement} [emailError] - Email error message container (optional)
 * @property {HTMLDivElement} [nameError] - Name error message container (optional)
 * @property {HTMLDivElement} [messageError] - Message error message container (optional)
 * @property {HTMLDivElement} [sendOnError] - Send on error message container (optional)
 * @property {HTMLSpanElement} [characterCount] - Character count display element (optional)
 * @property {HTMLDivElement} [liveRegion] - Live region for screen reader announcements (optional)
 */

/**
 * @extends {Component<GiftCardRecipientFormRefs>}
 */
class GiftCardRecipientForm extends Component {
  static DeliveryMode = {
    SELF: 'self', // Send to my email
    RECIPIENT: 'recipient_form', // Send to recipient's email with form
  };

  #currentMode = GiftCardRecipientForm.DeliveryMode.SELF;

  // Store bound event handlers for cleanup
  /** @type {(() => void) | null} */
  #updateCharacterCountBound = null;
  /** @type {((event: Event) => void) | null} */
  #displayCartErrorBound = null;
  /** @type {(() => void) | null} */
  #cartAddEventBound = null;

  requiredRefs = [
    'myEmailButton',
    'recipientEmailButton',
    'recipientFields',
    'recipientEmail',
    'recipientName',
    'recipientMessage',
    'recipientSendOn',
  ];

  /**
   * Get all recipient input fields
   * @returns {(HTMLInputElement | HTMLTextAreaElement)[]} Array of input fields
   */
  get #inputFields() {
    return [this.refs.recipientEmail, this.refs.recipientName, this.refs.recipientMessage, this.refs.recipientSendOn];
  }

  connectedCallback() {
    super.connectedCallback();
    this.#initializeForm();

    this.#updateCharacterCountBound = () => this.#updateCharacterCount();
    this.refs.recipientMessage.addEventListener('input', this.#updateCharacterCountBound);

    this.#displayCartErrorBound = this.#displayCartError.bind(this);
    // @ts-ignore - #displayCartErrorBound is guaranteed to be non-null here
    document.addEventListener(ThemeEvents.cartError, this.#displayCartErrorBound);

    this.#cartAddEventBound = () => this.#handleCartAdd();
    document.addEventListener(ThemeEvents.cartUpdate, this.#cartAddEventBound);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.#updateCharacterCountBound) {
      this.refs.recipientMessage.removeEventListener('input', this.#updateCharacterCountBound);
      this.#updateCharacterCountBound = null;
    }

    if (this.#displayCartErrorBound) {
      document.removeEventListener(ThemeEvents.cartError, this.#displayCartErrorBound);
      this.#displayCartErrorBound = null;
    }

    if (this.#cartAddEventBound) {
      document.removeEventListener(ThemeEvents.cartUpdate, this.#cartAddEventBound);
      this.#cartAddEventBound = null;
    }
  }

  /**
   * Initialize form with default state, self delivery is selected by default
   */
  #initializeForm() {
    this.#updateButtonStates(GiftCardRecipientForm.DeliveryMode.SELF);

    this.refs.recipientFields.hidden = true;

    this.#clearRecipientFields();
    this.#disableRecipientFields();
    this.#setDateConstraints();
  }

  /**
   * Handle toggle between my email and recipient email
   * @param {string} mode - Delivery mode (either 'self' or 'recipient_form')
   * @param {Event} _event - Change event (unused)
   */
  toggleRecipientForm(mode, _event) {
    // Validate mode
    if (!Object.values(GiftCardRecipientForm.DeliveryMode).includes(mode)) {
      throw new Error(
        `Invalid delivery mode: ${mode}. Must be one of: ${Object.values(GiftCardRecipientForm.DeliveryMode).join(
          ', '
        )}`
      );
    }

    if (this.#currentMode === mode) return;
    this.#currentMode = mode;

    this.#updateFormState();
  }

  /**
   * Update form state based on current mode
   */
  #updateFormState() {
    const { DeliveryMode } = GiftCardRecipientForm;
    const isRecipientMode = this.#currentMode === DeliveryMode.RECIPIENT;

    this.#updateButtonStates(this.#currentMode);

    this.refs.recipientFields.hidden = !isRecipientMode;

    if (isRecipientMode) {
      this.#enableRecipientFields();

      this.#updateCharacterCount();

      // Announce to screen readers
      if (this.refs.liveRegion) {
        this.refs.liveRegion.textContent =
          Theme.translations?.recipient_form_fields_visible || 'Recipient form fields are now visible';
      }

      // Focus first field for accessibility
      this.refs.recipientEmail.focus();
    } else {
      this.#clearRecipientFields();
      this.#disableRecipientFields();

      // Announce to screen readers
      if (this.refs.liveRegion) {
        this.refs.liveRegion.textContent =
          Theme.translations?.recipient_form_fields_hidden || 'Recipient form fields are now hidden';
      }
    }

    this.dispatchEvent(
      new CustomEvent('recipient:toggle', {
        detail: {
          mode: this.#currentMode,
          recipientFormVisible: isRecipientMode,
        },
        bubbles: true,
      })
    );
  }

  /**
   * Update radio button states
   * @param {string} mode - Current delivery mode
   */
  #updateButtonStates(mode) {
    const { DeliveryMode } = GiftCardRecipientForm;

    switch (mode) {
      case DeliveryMode.SELF:
        this.refs.myEmailButton.checked = true;
        this.refs.recipientEmailButton.checked = false;
        break;

      case DeliveryMode.RECIPIENT:
        this.refs.myEmailButton.checked = false;
        this.refs.recipientEmailButton.checked = true;
        break;

      default:
        console.warn(`Unknown delivery mode: ${mode}`);
        // Default to self delivery
        this.refs.myEmailButton.checked = true;
        this.refs.recipientEmailButton.checked = false;
    }
  }

  /**
   * Clear all recipient form fields
   */
  #clearRecipientFields() {
    for (const field of this.#inputFields) {
      field.value = '';
    }

    this.#updateCharacterCount();
    this.#clearErrorMessages();
  }

  /**
   * Disable recipient form fields when sending to self
   */
  #disableRecipientFields() {
    for (const field of this.#inputFields) {
      field.disabled = true;
      field.removeAttribute('required');
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }

    // Remove control field when sending to self
    const controlFlag = this.querySelector('input[name="properties[__shopify_send_gift_card_to_recipient]"]');
    if (controlFlag) {
      controlFlag.remove();
    }

    if (this.refs.timezoneOffset) {
      this.refs.timezoneOffset.disabled = true;
      this.refs.timezoneOffset.value = '';
    }

    this.#clearErrorMessages();
  }

  /**
   * Enable recipient form fields when sending to recipient
   */
  #enableRecipientFields() {
    for (const field of this.#inputFields) {
      field.disabled = false;
      if (field === this.refs.recipientEmail) {
        field.setAttribute('required', 'required');
      }
    }

    // Add control field when sending to recipient
    let controlFlag = this.querySelector('input[name="properties[__shopify_send_gift_card_to_recipient]"]');
    if (!controlFlag) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'properties[__shopify_send_gift_card_to_recipient]';
      input.value = 'on';
      this.appendChild(input);
    }

    // Enable and set timezone offset
    if (this.refs.timezoneOffset) {
      this.refs.timezoneOffset.disabled = false;
      this.refs.timezoneOffset.value = new Date().getTimezoneOffset().toString();
    }

    // Set date constraints when enabling fields
    this.#setDateConstraints();
  }

  /**
   * Update character count display
   */
  #updateCharacterCount() {
    if (!this.refs.characterCount) return;

    const currentLength = this.refs.recipientMessage.value.length;
    const maxLength = this.refs.recipientMessage.maxLength;

    const template = this.refs.characterCount.getAttribute('data-template');
    if (!template) return;

    const updatedText = template.replace('[current]', currentLength.toString()).replace('[max]', maxLength.toString());

    this.refs.characterCount.textContent = updatedText;
  }

  /**
   * Set date constraints for the send on date picker
   * Prevents selecting past dates and limits to 90 days in the future
   */
  #setDateConstraints() {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 90);

    // Format dates as YYYY-MM-DD
    /**
     * @param {Date} date
     * @returns {string}
     */
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    this.refs.recipientSendOn.setAttribute('min', formatDate(today));
    this.refs.recipientSendOn.setAttribute('max', formatDate(maxDate));
  }

  /**
   * Handles cart error events
   * @param {CartErrorEvent} event - The cart error event
   */
  #displayCartError(event) {
    if (event.detail?.data) {
      const { message, errors, description } = event.detail.data;

      // Display the error message
      if (errors && typeof errors === 'object') {
        this.#displayErrorMessage(message || 'There was an error', errors);
      } else if (message) {
        this.#displayErrorMessage(message, description);
      }
    }
  }

  /**
   * Display error messages in the appropriate error containers
   * @param {string} title - The main error message title
   * @param {Object} body - Error details
   */
  #displayErrorMessage(title, body) {
    this.#clearErrorMessages();

    if (typeof body === 'object' && body !== null) {
      /** @type {Record<string, {inputRef: string, errorRef: string}>} */
      const fieldMap = {
        email: { inputRef: 'recipientEmail', errorRef: 'emailError' },
        name: { inputRef: 'recipientName', errorRef: 'nameError' },
        message: { inputRef: 'recipientMessage', errorRef: 'messageError' },
        send_on: { inputRef: 'recipientSendOn', errorRef: 'sendOnError' },
      };

      for (const [field, errorMessages] of Object.entries(body)) {
        const fieldConfig = fieldMap[field];
        if (!fieldConfig) continue;

        const { inputRef, errorRef } = fieldConfig;
        const errorContainer = this.refs[errorRef];
        const inputElement = this.refs[inputRef];

        if (errorContainer && errorContainer instanceof HTMLElement) {
          const errorTextElement = errorContainer.querySelector('span');
          if (errorTextElement) {
            const message = Array.isArray(errorMessages) ? errorMessages.join(', ') : errorMessages;
            errorTextElement.textContent = `${message}.`;
          }

          errorContainer.classList.remove('hidden');
        }

        if (inputElement && inputElement instanceof HTMLElement) {
          // Set ARIA attributes for accessibility
          inputElement.setAttribute('aria-invalid', 'true');
          const errorId = `RecipientForm-${field}-error-${this.dataset.sectionId || 'default'}`;
          inputElement.setAttribute('aria-describedby', errorId);
        }
      }
    }

    // Announce errors to screen readers
    if (this.refs.liveRegion) {
      this.refs.liveRegion.textContent =
        title || Theme.translations?.recipient_form_error || 'There was an error with the form submission';
    }
  }

  /**
   * Clear all error messages and reset ARIA attributes
   */
  #clearErrorMessages() {
    // List of error container refs
    const errorRefs = ['emailError', 'nameError', 'messageError', 'sendOnError'];

    for (const errorRef of errorRefs) {
      const errorContainer = this.refs[errorRef];
      if (errorContainer && errorContainer instanceof HTMLElement) {
        errorContainer.classList.add('hidden');
        const errorTextElement = errorContainer.querySelector('span');
        if (errorTextElement) {
          errorTextElement.textContent = '';
        }
      }
    }

    // Remove ARIA attributes from all input fields
    for (const field of this.#inputFields) {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }

    // Clear live region announcement
    if (this.refs.liveRegion) {
      this.refs.liveRegion.textContent = '';
    }
  }

  #handleCartAdd() {
    this.#clearErrorMessages();
  }
}

// Register the custom element
customElements.define('gift-card-recipient-form', GiftCardRecipientForm);
