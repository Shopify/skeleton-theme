import { sectionRenderer } from '@theme/section-renderer';
import { Component } from '@theme/component';
import { FilterUpdateEvent, ThemeEvents } from '@theme/events';
import { debounce, startViewTransition } from '@theme/utilities';
import { convertMoneyToMinorUnits, formatMoney } from '@theme/money-formatting';
/**
 * Search query parameter.
 * @type {string}
 */
const SEARCH_QUERY = 'q';

/**
 * Handles the main facets form functionality
 *
 * @typedef {Object} FacetsFormRefs
 * @property {HTMLFormElement} facetsForm - The main facets form element
 * @property {HTMLElement | undefined} facetStatus - The facet status element
 *
 * @extends {Component<FacetsFormRefs>}
 */
class FacetsFormComponent extends Component {
  requiredRefs = ['facetsForm'];

  /**
   * Creates URL parameters from form data
   * @param {FormData} [formData] - Optional form data to use instead of the main form
   * @returns {URLSearchParams} The processed URL parameters
   */
  createURLParameters(formData = new FormData(this.refs.facetsForm)) {
    let newParameters = new URLSearchParams(/** @type any */ (formData));

    if (newParameters.get('filter.v.price.gte') === '') newParameters.delete('filter.v.price.gte');
    if (newParameters.get('filter.v.price.lte') === '') newParameters.delete('filter.v.price.lte');

    newParameters.delete('page');

    const searchQuery = this.#getSearchQuery();
    if (searchQuery) newParameters.set(SEARCH_QUERY, searchQuery);

    return newParameters;
  }

  /**
   * Gets the search query parameter from the current URL
   * @returns {string} The search query
   */
  #getSearchQuery() {
    const url = new URL(window.location.href);
    return url.searchParams.get(SEARCH_QUERY) ?? '';
  }

  get sectionId() {
    const id = this.getAttribute('section-id');
    if (!id) throw new Error('Section ID is required');
    return id;
  }

  /**
   * Updates the URL hash with current filter parameters
   */
  #updateURLHash() {
    const url = new URL(window.location.href);
    const urlParameters = this.createURLParameters();

    url.search = '';
    for (const [param, value] of urlParameters.entries()) {
      url.searchParams.append(param, value);
    }

    history.pushState({ urlParameters: urlParameters.toString() }, '', url.toString());
  }

  /**
   * Updates filters and renders the section
   */
  updateFilters = () => {
    this.#updateURLHash();
    this.dispatchEvent(new FilterUpdateEvent(this.createURLParameters()));
    this.#updateSection();
  };

  /**
   * Updates the section
   */
  #updateSection() {
    const viewTransition = !this.closest('dialog');

    if (viewTransition) {
      startViewTransition(() => sectionRenderer.renderSection(this.sectionId), ['product-grid']);
    } else {
      sectionRenderer.renderSection(this.sectionId);
    }
  }

  /**
   * Updates filters based on a provided URL
   * @param {string} url - The URL to update filters with
   */
  updateFiltersByURL(url) {
    history.pushState('', '', url);
    this.dispatchEvent(new FilterUpdateEvent(this.createURLParameters()));
    this.#updateSection();
  }
}

if (!customElements.get('facets-form-component')) {
  customElements.define('facets-form-component', FacetsFormComponent);
}

/**
 * @typedef {Object} FacetInputsRefs
 * @property {HTMLInputElement[]} facetInputs - The facet input elements
 */

/**
 * Handles individual facet input functionality
 * @extends {Component<FacetInputsRefs>}
 */
class FacetInputsComponent extends Component {
  get sectionId() {
    const id = this.closest('.shopify-section')?.id;
    if (!id) throw new Error('FacetInputs component must be a child of a section');
    return id;
  }

  /**
   * Updates filters and the selected facet summary
   */
  updateFilters() {
    const facetsForm = this.closest('facets-form-component');

    if (!(facetsForm instanceof FacetsFormComponent)) return;

    facetsForm.updateFilters();
    this.#updateSelectedFacetSummary();
  }

  /**
   * Handles keydown events for the facets form
   * @param {KeyboardEvent} event - The keydown event
   */
  handleKeyDown(event) {
    if (!(event.target instanceof HTMLElement)) return;
    const closestInput = event.target.querySelector('input');

    if (!(closestInput instanceof HTMLInputElement)) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      closestInput.checked = !closestInput.checked;
      this.updateFilters();
    }
  }

  /**
   * Handles mouseover events on facet labels
   * @param {MouseEvent} event - The mouseover event
   */
  prefetchPage = debounce((event) => {
    if (!(event.target instanceof HTMLElement)) return;

    const form = this.closest('form');
    if (!form) return;

    const formData = new FormData(form);
    const inputElement = event.target.querySelector('input');

    if (!(inputElement instanceof HTMLInputElement)) return;

    if (!inputElement.checked) formData.append(inputElement.name, inputElement.value);

    const facetsForm = this.closest('facets-form-component');
    if (!(facetsForm instanceof FacetsFormComponent)) return;

    const urlParameters = facetsForm.createURLParameters(formData);

    const url = new URL(window.location.pathname, window.location.origin);

    for (const [key, value] of urlParameters) url.searchParams.append(key, value);

    if (inputElement.checked) url.searchParams.delete(inputElement.name, inputElement.value);

    sectionRenderer.getSectionHTML(this.sectionId, true, url);
  }, 200);

  cancelPrefetchPage = () => this.prefetchPage.cancel();

  /**
   * Updates the selected facet summary
   */
  #updateSelectedFacetSummary() {
    if (!this.refs.facetInputs) return;

    const checkedInputElements = this.refs.facetInputs.filter((input) => input.checked);
    const details = this.closest('details');
    const statusComponent = details?.querySelector('facet-status-component');

    if (!(statusComponent instanceof FacetStatusComponent)) return;

    statusComponent.updateListSummary(checkedInputElements);
  }
}

if (!customElements.get('facet-inputs-component')) {
  customElements.define('facet-inputs-component', FacetInputsComponent);
}

/**
 * @typedef {Object} PriceFacetRefs
 * @property {HTMLInputElement} minInput - The minimum price input
 * @property {HTMLInputElement} maxInput - The maximum price input
 */

/**
 * Handles price facet functionality
 * @extends {Component<PriceFacetRefs>}
 */
class PriceFacetComponent extends Component {
  /** @type {string} */
  currency;
  /** @type {string} */
  moneyFormat;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.#onKeyDown);
    this.currency = this.dataset.currency ?? 'USD';
    this.moneyFormat = this.#extractMoneyPlaceholder(this.dataset.moneyFormat ?? '{{amount}}');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.#onKeyDown);
  }

  /**
   * Extracts the placeholder from a money format string, removing currency symbols.
   * @param {string} format - The money format (e.g., "${{amount}}", "{{amount}} USD")
   * @returns {string} Just the placeholder (e.g., "{{amount}}")
   */
  #extractMoneyPlaceholder(format) {
    const match = format.match(/{{\s*\w+\s*}}/);
    return match ? match[0] : '{{amount}}';
  }

  /**
   * Handles keydown events to restrict input to valid characters
   * @param {KeyboardEvent} event - The keydown event
   */
  #onKeyDown = (event) => {
    if (event.metaKey) return;

    const pattern = /[0-9]|\.|,|'| |Tab|Backspace|Enter|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Delete|Escape/;
    if (!event.key.match(pattern)) event.preventDefault();
  };

  /**
   * Updates price filter and results
   */
  updatePriceFilterAndResults() {
    const { minInput, maxInput } = this.refs;

    this.#adjustToValidValues(minInput);
    this.#adjustToValidValues(maxInput);

    const facetsForm = this.closest('facets-form-component');
    if (!(facetsForm instanceof FacetsFormComponent)) return;

    facetsForm.updateFilters();
    this.#setMinAndMaxValues();
    this.#updateSummary();
  }

  /**
   * Parses a formatted money value into minor units
   * displayValue can come from user input or API response
   * @param {string} displayValue - The display value (e.g., "10.50" for USD, "9,50" for EUR, "1000" for JPY)
   * @param {string} currency - The currency code
   * @returns {number} The value in minor units
   */
  #parseDisplayValue(displayValue, currency) {
    return convertMoneyToMinorUnits(displayValue, currency) ?? 0;
  }

  /**
   * Adjusts input values to be within valid range
   * @param {HTMLInputElement} input - The input element to adjust
   */
  #adjustToValidValues(input) {
    if (input.value.trim() === '') return;

    const { currency, moneyFormat } = this;
    // Parse the user's input value using currency-aware parsing
    const value = this.#parseDisplayValue(input.value, currency);

    // data-min and data-max now contain raw minor unit values (not formatted)
    const min = this.#parseDisplayValue(input.getAttribute('data-min') ?? '0', currency);
    const max = this.#parseDisplayValue(input.getAttribute('data-max') ?? '0', currency);

    if (value < min) {
      input.value = formatMoney(min, moneyFormat, currency);
    } else if (value > max) {
      input.value = formatMoney(max, moneyFormat, currency);
    }
  }

  /**
   * Sets min and max values for the inputs
   */
  #setMinAndMaxValues() {
    const { minInput, maxInput } = this.refs;

    if (maxInput.value) minInput.setAttribute('data-max', maxInput.value);
    if (minInput.value) maxInput.setAttribute('data-min', minInput.value);
    if (minInput.value === '') maxInput.setAttribute('data-min', '0');
    if (maxInput.value === '') minInput.setAttribute('data-max', maxInput.getAttribute('data-max') ?? '');
  }

  /**
   * Updates the price summary
   */
  #updateSummary() {
    const { minInput, maxInput } = this.refs;
    const details = this.closest('details');
    const statusComponent = details?.querySelector('facet-status-component');

    if (!(statusComponent instanceof FacetStatusComponent)) return;

    statusComponent?.updatePriceSummary(minInput, maxInput);
  }
}

if (!customElements.get('price-facet-component')) {
  customElements.define('price-facet-component', PriceFacetComponent);
}

/**
 * Handles clearing of facet filters
 * @extends {Component}
 */
class FacetClearComponent extends Component {
  requiredRefs = ['clearButton'];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keyup', this.#handleKeyUp);
    document.addEventListener(ThemeEvents.FilterUpdate, this.#handleFilterUpdate);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(ThemeEvents.FilterUpdate, this.#handleFilterUpdate);
  }

  /**
   * Clears the filter
   * @param {Event} event - The click event
   */
  clearFilter(event) {
    if (!(event.target instanceof HTMLElement)) return;

    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }
      event.preventDefault();
    }

    const container = event.target.closest('facet-inputs-component, price-facet-component');
    container?.querySelectorAll('[type="checkbox"]:checked, input').forEach((input) => {
      if (input instanceof HTMLInputElement) {
        input.checked = false;
        input.value = '';
      }
    });

    const details = event.target.closest('details');
    const statusComponent = details?.querySelector('facet-status-component');

    if (!(statusComponent instanceof FacetStatusComponent)) return;

    statusComponent.clearSummary();

    const facetsForm = this.closest('facets-form-component');
    if (!(facetsForm instanceof FacetsFormComponent)) return;

    facetsForm.updateFilters();
  }

  /**
   * Handles keyup events
   * @param {KeyboardEvent} event - The keyup event
   */
  #handleKeyUp = (event) => {
    if (event.metaKey) return;
    if (event.key === 'Enter') this.clearFilter(event);
  };

  /**
   * Toggle clear button visibility when filters are applied. Happens before the
   * Section Rendering Request resolves.
   *
   * @param {FilterUpdateEvent} event
   */
  #handleFilterUpdate = (event) => {
    const { clearButton } = this.refs;
    if (clearButton instanceof Element) {
      clearButton.classList.toggle('facets__clear--active', event.shouldShowClearAll());
    }
  };
}

if (!customElements.get('facet-clear-component')) {
  customElements.define('facet-clear-component', FacetClearComponent);
}

/**
 * @typedef {Object} FacetRemoveComponentRefs
 * @property {HTMLInputElement | undefined} clearButton - The button to clear filters
 */

/**
 * Handles removal of individual facet filters
 * @extends {Component<FacetRemoveComponentRefs>}
 */
class FacetRemoveComponent extends Component {
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(ThemeEvents.FilterUpdate, this.#handleFilterUpdate);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(ThemeEvents.FilterUpdate, this.#handleFilterUpdate);
  }

  /**
   * Removes the filter
   * @param {Object} data - The data object
   * @param {string} data.form - The form to remove the filter from
   * @param {Event} event - The click event
   */
  removeFilter({ form }, event) {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }
      event.preventDefault();
    }

    const url = this.dataset.url;
    if (!url) return;

    const facetsForm = form ? document.getElementById(form) : this.closest('facets-form-component');

    if (!(facetsForm instanceof FacetsFormComponent)) return;

    facetsForm.updateFiltersByURL(url);
  }

  /**
   * Toggle clear button visibility when filters are applied. Happens before the
   * Section Rendering Request resolves.
   *
   * @param {FilterUpdateEvent} event
   */
  #handleFilterUpdate = (event) => {
    const { clearButton } = this.refs;
    if (clearButton instanceof Element) {
      const activeClass = this.getAttribute('active-class') || 'active';
      clearButton.classList.toggle(activeClass, event.shouldShowClearAll());
    }
  };
}

if (!customElements.get('facet-remove-component')) {
  customElements.define('facet-remove-component', FacetRemoveComponent);
}

/**
 * Handles sorting filter functionality
 *
 * @typedef {Object} SortingFilterRefs
 * @property {HTMLDetailsElement} details - The details element
 * @property {HTMLElement} summary - The summary element
 * @property {HTMLElement} listbox - The listbox element
 *
 * @extends {Component}
 */
class SortingFilterComponent extends Component {
  requiredRefs = ['details', 'summary', 'listbox'];

  /**
   * Handles keyboard navigation in the sorting dropdown
   * @param {KeyboardEvent} event - The keyboard event
   */
  handleKeyDown = (event) => {
    const { listbox } = this.refs;
    if (!(listbox instanceof Element)) return;

    const options = Array.from(listbox.querySelectorAll('[role="option"]'));
    const currentFocused = options.find((option) => option instanceof HTMLElement && option.tabIndex === 0);
    let newFocusIndex = currentFocused ? options.indexOf(currentFocused) : 0;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        newFocusIndex = Math.min(newFocusIndex + 1, options.length - 1);
        this.#moveFocus(options, newFocusIndex);
        break;

      case 'ArrowUp':
        event.preventDefault();
        newFocusIndex = Math.max(newFocusIndex - 1, 0);
        this.#moveFocus(options, newFocusIndex);
        break;

      case 'Enter':
      case ' ':
        if (event.target instanceof Element) {
          const targetOption = event.target.closest('[role="option"]');
          if (targetOption) {
            event.preventDefault();
            this.#selectOption(targetOption);
          }
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.#closeDropdown();
        break;
    }
  };

  /**
   * Handles details toggle event
   */
  handleToggle = () => {
    const { details, summary, listbox } = this.refs;
    if (!(details instanceof HTMLDetailsElement) || !(summary instanceof HTMLElement)) return;

    const isOpen = details.open;
    summary.setAttribute('aria-expanded', isOpen.toString());

    if (isOpen && listbox instanceof Element) {
      // Move focus to selected option when dropdown opens
      const selectedOption = listbox.querySelector('[aria-selected="true"]');
      if (selectedOption instanceof HTMLElement) {
        selectedOption.focus();
      }
    }
  };

  /**
   * Moves focus between options
   * @param {Element[]} options - The option elements
   * @param {number} newIndex - The index of the option to focus
   */
  #moveFocus(options, newIndex) {
    // Remove tabindex from all options
    options.forEach((option) => {
      if (option instanceof HTMLElement) {
        option.tabIndex = -1;
      }
    });

    // Set tabindex and focus on new option
    const targetOption = options[newIndex];
    if (targetOption instanceof HTMLElement) {
      targetOption.tabIndex = 0;
      targetOption.focus();
    }
  }

  /**
   * Selects an option and triggers form submission
   * @param {Element} option - The option element to select
   */
  #selectOption(option) {
    const input = option.querySelector('input[type="radio"]');
    if (input instanceof HTMLInputElement && option instanceof HTMLElement) {
      // Update aria-selected states
      this.querySelectorAll('[role="option"]').forEach((opt) => {
        opt.setAttribute('aria-selected', 'false');
      });
      option.setAttribute('aria-selected', 'true');

      // Trigger click on the input to ensure normal form behavior
      input.click();

      // Close dropdown and return focus (handles tabIndex reset)
      this.#closeDropdown();
    }
  }

  /**
   * Closes the dropdown and returns focus to summary
   */
  #closeDropdown() {
    const { details, summary } = this.refs;
    if (details instanceof HTMLDetailsElement) {
      // Reset focus to match the actual selected option
      const options = this.querySelectorAll('[role="option"]');
      const selectedOption = this.querySelector('[aria-selected="true"]');

      options.forEach((opt) => {
        if (opt instanceof HTMLElement) {
          opt.tabIndex = -1;
        }
      });

      if (selectedOption instanceof HTMLElement) {
        selectedOption.tabIndex = 0;
      }

      details.open = false;
      if (summary instanceof HTMLElement) {
        summary.focus();
      }
    }
  }

  /**
   * Updates filter and sorting
   * @param {Event} event - The change event
   */
  updateFilterAndSorting(event) {
    const facetsForm =
      this.closest('facets-form-component') || this.closest('.shopify-section')?.querySelector('facets-form-component');

    if (!(facetsForm instanceof FacetsFormComponent)) return;
    const isMobile = window.innerWidth < 750;

    const shouldDisable = this.dataset.shouldUseSelectOnMobile === 'true';

    // Because we have a select element on mobile and a bunch of radio buttons on desktop,
    // we need to disable the input during "form-submission" to prevent duplicate entries.
    if (shouldDisable) {
      if (isMobile) {
        const inputs = this.querySelectorAll('input[name="sort_by"]');
        inputs.forEach((input) => {
          if (!(input instanceof HTMLInputElement)) return;
          input.disabled = true;
        });
      } else {
        const selectElement = this.querySelector('select[name="sort_by"]');
        if (!(selectElement instanceof HTMLSelectElement)) return;
        selectElement.disabled = true;
      }
    }

    facetsForm.updateFilters();
    this.updateFacetStatus(event);

    // Re-enable the input after the form-submission
    if (shouldDisable) {
      if (isMobile) {
        const inputs = this.querySelectorAll('input[name="sort_by"]');
        inputs.forEach((input) => {
          if (!(input instanceof HTMLInputElement)) return;
          input.disabled = false;
        });
      } else {
        const selectElement = this.querySelector('select[name="sort_by"]');
        if (!(selectElement instanceof HTMLSelectElement)) return;
        selectElement.disabled = false;
      }
    }

    // Close the details element when a value is selected
    const { details } = this.refs;
    if (!(details instanceof HTMLDetailsElement)) return;
    details.open = false;
  }

  /**
   * Updates the facet status
   * @param {Event} event - The change event
   */
  updateFacetStatus(event) {
    if (!(event.target instanceof HTMLSelectElement)) return;

    const details = this.querySelector('details');
    if (!details) return;

    const facetStatus = details.querySelector('facet-status-component');
    if (!(facetStatus instanceof FacetStatusComponent)) return;

    facetStatus.textContent =
      event.target.value !== details.dataset.defaultSortBy ? event.target.dataset.optionName ?? '' : '';
  }
}

if (!customElements.get('sorting-filter-component')) {
  customElements.define('sorting-filter-component', SortingFilterComponent);
}

/**
 * @typedef {Object} FacetStatusRefs
 * @property {HTMLElement} facetStatus - The facet status element
 */

/**
 * Handles facet status display
 * @extends {Component<FacetStatusRefs>}
 */
class FacetStatusComponent extends Component {
  /**
   * Updates the list summary
   * @param {HTMLInputElement[]} checkedInputElements - The checked input elements
   */
  updateListSummary(checkedInputElements) {
    const checkedInputElementsCount = checkedInputElements.length;

    this.getAttribute('facet-type') === 'swatches'
      ? this.#updateSwatchSummary(checkedInputElements, checkedInputElementsCount)
      : this.#updateBubbleSummary(checkedInputElements, checkedInputElementsCount);
  }

  /**
   * Updates the swatch summary
   * @param {HTMLInputElement[]} checkedInputElements - The checked input elements
   * @param {number} checkedInputElementsCount - The number of checked inputs
   */
  #updateSwatchSummary(checkedInputElements, checkedInputElementsCount) {
    const { facetStatus } = this.refs;
    facetStatus.classList.remove('bubble', 'facets__bubble');

    if (checkedInputElementsCount === 0) {
      facetStatus.innerHTML = '';
      return;
    }

    if (checkedInputElementsCount > 3) {
      facetStatus.innerHTML = checkedInputElementsCount.toString();
      facetStatus.classList.add('bubble', 'facets__bubble');
      return;
    }

    facetStatus.innerHTML = Array.from(checkedInputElements)
      .map((inputElement) => {
        const swatch = inputElement.parentElement?.querySelector('span.swatch');
        return swatch?.outerHTML ?? '';
      })
      .join('');
  }

  /**
   * Updates the bubble summary
   * @param {HTMLInputElement[]} checkedInputElements - The checked input elements
   * @param {number} checkedInputElementsCount - The number of checked inputs
   */
  #updateBubbleSummary(checkedInputElements, checkedInputElementsCount) {
    const { facetStatus } = this.refs;
    const filterStyle = this.dataset.filterStyle;

    facetStatus.classList.remove('bubble', 'facets__bubble');

    if (checkedInputElementsCount === 0) {
      facetStatus.innerHTML = '';
      return;
    }

    if (filterStyle === 'horizontal' && checkedInputElementsCount === 1) {
      facetStatus.innerHTML = checkedInputElements[0]?.dataset.label ?? '';
      return;
    }

    facetStatus.innerHTML = checkedInputElementsCount.toString();
    facetStatus.classList.add('bubble', 'facets__bubble');
  }

  /**
   * Updates the price summary
   * @param {HTMLInputElement} minInput - The minimum price input
   * @param {HTMLInputElement} maxInput - The maximum price input
   */
  updatePriceSummary(minInput, maxInput) {
    const minInputValue = minInput.value;
    const maxInputValue = maxInput.value;
    const { facetStatus } = this.refs;

    if (!minInputValue && !maxInputValue) {
      facetStatus.innerHTML = '';
      return;
    }

    const currency = facetStatus.dataset.currency || '';
    const minInputNum = this.#parseCents(minInputValue, '0', currency);
    const maxInputNum = this.#parseCents(maxInputValue, facetStatus.dataset.rangeMax, currency);
    facetStatus.innerHTML = `${this.#formatMoney(minInputNum)}–${this.#formatMoney(maxInputNum)}`;
  }

  /**
   * Parses a decimal number as minor units (cents for most currencies, but adjusted for zero-decimal currencies)
   * @param {string} value - The stringified decimal number to parse
   * @param {string} fallback - The fallback value in case `value` is invalid (formatted string like "11,400")
   * @param {string} currency - The currency code (e.g., 'USD', 'JPY', 'KRW')
   * @returns {number} The money value in minor units
   */
  #parseCents(value, fallback = '0', currency = '') {
    // Try to parse the value
    const result = convertMoneyToMinorUnits(value, currency);
    if (result !== null) return result;

    // Fall back to parsing the fallback string (which may have formatting like "11,400")
    const fallbackResult = convertMoneyToMinorUnits(fallback, currency);
    if (fallbackResult !== null) return fallbackResult;

    // Last resort: clean and parse as integer
    const cleanFallback = fallback.replace(/[^\d]/g, '');
    return parseInt(cleanFallback, 10) || 0;
  }

  /**
   * Formats money, replicated the implementation of the `money` liquid filters
   * @param {number} moneyValue - The money value
   * @returns {string} The formatted money value
   */
  #formatMoney(moneyValue) {
    if (!(this.refs.moneyFormat instanceof HTMLTemplateElement)) return '';

    const format = this.refs.moneyFormat.content.textContent || '{{amount}}';
    const currency = this.refs.facetStatus.dataset.currency || '';

    return formatMoney(moneyValue, format, currency);
  }

  /**
   * Clears the summary
   */
  clearSummary() {
    this.refs.facetStatus.innerHTML = '';
  }
}

if (!customElements.get('facet-status-component')) {
  customElements.define('facet-status-component', FacetStatusComponent);
}
