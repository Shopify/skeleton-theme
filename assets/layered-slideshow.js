import { Component } from '@theme/component';
import { isMobileBreakpoint, mediaQueryLarge } from '@theme/utilities';

/**
 * @typedef {Object} LayeredSlideshowRefs
 * @property {HTMLElement} container
 * @property {HTMLElement[]} tabs
 * @property {HTMLElement[]} panels
 */

/**
 * @typedef {Object} DragState
 * @property {number} target
 * @property {number} start
 * @property {number} max
 * @property {number} activeSize - The resolved pixel size of the active panel at drag start
 * @property {boolean} left
 * @property {boolean} [dragging]
 * @property {boolean} [prevent]
 * @property {number} [progress]
 */

const DRAG_THRESHOLD = 5;
const MAX_DRAG_WIDTH_RATIO = 0.8;
const DRAG_COMPLETE_THRESHOLD = 0.5;
const INACTIVE_SIZE = 56; // Px size of inactive tabs on desktop
const INACTIVE_MOBILE_SIZE = 44; // Px size of inactive tabs on mobile
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** @extends {Component<LayeredSlideshowRefs>} */
export class LayeredSlideshowComponent extends Component {
  requiredRefs = ['container'];
  #active = 0;
  /** @type {DragState | null} */
  #drag = null;
  /** @type {AbortController | null} */
  #abort = null;
  #isMobile = false;
  /** @type {ResizeObserver | null} */
  #heightObserver = null;
  /** @type {MutationObserver | null} */
  #contentObserver = null;
  /** @type {ResizeObserver | null} */
  #containerObserver = null;

  /** @returns {number} The inactive tab size in pixels based on current viewport */
  get #inactiveSize() {
    return this.#isMobile ? INACTIVE_MOBILE_SIZE : INACTIVE_SIZE;
  }

  connectedCallback() {
    super.connectedCallback();
    const { tabs } = this.refs;
    if (!tabs?.length) return;

    this.#active = Math.max(
      0,
      tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true')
    );

    this.#isMobile = isMobileBreakpoint();
    mediaQueryLarge.addEventListener('change', this.#handleMediaQueryChange);

    this.#containerObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          // Use contentBoxSize if available for better precision, or fallback to contentRect
          const boxSize = entry.contentBoxSize[0];
          const isMobile = this.#isMobile;

          let size;
          if (boxSize) {
            size = isMobile ? boxSize.blockSize : boxSize.inlineSize;
          } else {
            size = isMobile ? entry.contentRect.height : entry.contentRect.width;
          }

          this.#updateGridSizes(size);
        }
      }
    });
    this.#containerObserver.observe(this.refs.container);

    this.#updateActiveTab();
    this.#setupEventListeners();
    this.#observeContentHeight();
  }

  #setupEventListeners() {
    this.#abort?.abort();
    this.#abort = new AbortController();
    const opts = { signal: this.#abort.signal };
    const { container, tabs } = this.refs;

    this.addEventListener('keydown', (e) => this.#handleKeydown(e), opts);

    for (const [i, tab] of tabs.entries()) {
      tab.addEventListener('click', (e) => this.#handleTabClick(e, i), opts);
      tab.addEventListener('focus', (e) => this.#handleTabFocus(e, i), opts);
    }

    this.#setupPanelFocusManagement(opts);

    if (!this.#isMobile) {
      container.addEventListener('pointerdown', (e) => this.#startDrag(e), opts);
      container.addEventListener('click', (e) => this.#preventClickDuringDrag(e), { ...opts, capture: true });
    }
  }

  #handleKeydown(/** @type {KeyboardEvent} */ e) {
    const target = /** @type {HTMLElement} */ (e.target);
    if (target.getAttribute('role') !== 'tab') return;

    const { tabs } = this.refs;
    if (!tabs) return;

    const i = tabs.indexOf(target);
    const navMap = {
      [this.#isMobile ? 'ArrowUp' : 'ArrowLeft']: -1,
      [this.#isMobile ? 'ArrowDown' : 'ArrowRight']: 1,
      Home: -i,
      End: tabs.length - 1 - i,
    };

    const offset = navMap[e.key];
    if (offset !== undefined) {
      e.preventDefault();
      const nextIndex = (i + offset + tabs.length) % tabs.length;
      tabs[nextIndex]?.focus();
      this.#activate(nextIndex);
    }
  }

  #handleTabClick(/** @type {MouseEvent} */ e, /** @type {number} */ index) {
    e.preventDefault();
    this.#activate(index);
  }

  #handleTabFocus(/** @type {FocusEvent} */ e, /** @type {number} */ index) {
    const target = /** @type {HTMLElement} */ (e.target);
    if (target.matches(':focus-visible')) {
      this.#activate(index);
    }
  }

  /**
   * @param {AddEventListenerOptions & { signal: AbortSignal }} opts
   */
  #setupPanelFocusManagement(opts) {
    const { panels } = this.refs;
    if (!panels) return;

    for (const [index, panel] of panels.entries()) {
      panel.addEventListener('keydown', (event) => this.#handlePanelKeydown(event, index), opts);
    }
  }

  /**
   * @param {KeyboardEvent} event
   * @param {number} index
   */
  #handlePanelKeydown(event, index) {
    if (event.key !== 'Tab') return;

    const { panels } = this.refs;
    const panel = /** @type {HTMLElement} */ (event.currentTarget);
    const focusable = this.#getFocusableElements(panel);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    if (event.shiftKey) {
      const isAtStart =
        (firstFocusable && document.activeElement === firstFocusable) ||
        (!focusable.length && document.activeElement === panel);
      if (isAtStart && index > 0) {
        event.preventDefault();
        this.#activate(index - 1);
        this.#focusPanelEdge(index - 1, 'end');
      }
      return;
    }

    const isAtEnd =
      (lastFocusable && document.activeElement === lastFocusable) ||
      (!focusable.length && document.activeElement === panel);

    if (isAtEnd && panels && index < panels.length - 1) {
      event.preventDefault();
      this.#activate(index + 1);
      this.#focusPanelEdge(index + 1, 'start');
    }
  }

  /**
   * @param {number} index
   * @param {'start' | 'end'} [position]
   */
  #focusPanelEdge(index, position = 'start') {
    const panel = this.refs.panels?.[index];
    if (!panel) return;

    const focusable = this.#getFocusableElements(panel);
    const target = position === 'end' ? focusable[focusable.length - 1] : focusable[0];

    requestAnimationFrame(() => (target ?? panel).focus());
  }

  /**
   * @param {HTMLElement} panel
   * @returns {HTMLElement[]}
   */
  #getFocusableElements(panel) {
    return Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR))
      .filter((el) => !el.closest('[inert]'))
      .map((el) => /** @type {HTMLElement} */ (el));
  }

  #preventClickDuringDrag(/** @type {MouseEvent} */ e) {
    const target = /** @type {HTMLElement} */ (e.target);
    if (this.#drag?.prevent && target.closest('[role="tab"]')) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }

  #handleMediaQueryChange = () => {
    const wasMobile = this.#isMobile;
    this.#isMobile = isMobileBreakpoint();

    if (wasMobile !== this.#isMobile) {
      const { container } = this.refs;
      container.setAttribute('data-instant-transitions', '');

      this.#clearHeightStyles();
      // Re-calculate height first so grid calculation has correct container dimensions
      this.#observeContentHeight();
      this.#updateActiveTab();
      this.#setupEventListeners();

      requestAnimationFrame(() => {
        container.removeAttribute('data-instant-transitions');
      });
    }
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#abort?.abort();
    this.#heightObserver?.disconnect();
    this.#heightObserver = null;
    this.#contentObserver?.disconnect();
    this.#contentObserver = null;
    this.#containerObserver?.disconnect();
    this.#containerObserver = null;
    mediaQueryLarge.removeEventListener('change', this.#handleMediaQueryChange);
  }

  /**
   * Public method to select a slide by index
   * @param {number} index
   * @param {{ instant?: boolean }} [options]
   */
  select(index, { instant = false } = {}) {
    this.#activate(index, instant);
  }

  /**
   * @param {number} index
   * @param {boolean} [instant]
   */
  #activate(index, instant = false) {
    const { container, tabs } = this.refs;
    if (!tabs || index === this.#active || index < 0 || index >= tabs.length) return;

    if (instant) {
      container.setAttribute('data-instant-transitions', '');
    }

    this.#active = index;
    this.#updateActiveTab();

    if (instant) {
      // Double rAF to ensure layout is fully settled before re-enabling transitions
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.removeAttribute('data-instant-transitions');
        });
      });
    }
  }

  #updateActiveTab() {
    const { tabs, panels } = this.refs;

    for (const [i, tab] of tabs?.entries() ?? []) {
      const isActive = i === this.#active;
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    }

    for (const [i, panel] of panels?.entries() ?? []) {
      const isActive = i === this.#active;
      panel.toggleAttribute('inert', !isActive);
      panel.setAttribute('tabindex', isActive ? '0' : '-1');

      const video = panel.querySelector('video');
      if (video) {
        isActive ? video.play() : video.pause();
      }
    }

    this.#updateGridSizes();
  }

  /**
   * @param {number} [containerSize] - Override container size (used during viewport switch)
   */
  #updateGridSizes(containerSize) {
    const { container, tabs } = this.refs;
    if (!tabs) return;
    const inactiveSize = this.#inactiveSize;
    const size =
      containerSize ??
      (this.#isMobile ? container.getBoundingClientRect().height : container.getBoundingClientRect().width);
    const activeSize = size - inactiveSize * (tabs.length - 1);
    const sizes = tabs.map((_, i) => (i === this.#active ? `${activeSize}px` : `${inactiveSize}px`));
    container.style.setProperty('--active-tab', sizes.join(' '));
  }

  /**
   * @param {PointerEvent} event
   */
  #startDrag(event) {
    if (this.#isMobile) return;

    const { tabs } = this.refs;
    if (!tabs) return;

    const eventTarget = /** @type {HTMLElement} */ (event.target);
    const tab = eventTarget.closest('[role="tab"]');
    if (tab) {
      const i = tabs.indexOf(/** @type {HTMLElement} */ (tab));
      if (i === this.#active) return;
      const target = i > this.#active ? i + 1 : i;
      if (target >= tabs.length) return;

      this.#initializeDrag(event, target);
    } else {
      this.#initializeDrag(event);
    }
  }

  /**
   * @param {PointerEvent} event
   * @param {number} [initialTarget]
   */
  #initializeDrag(event, initialTarget) {
    const { container, tabs } = this.refs;
    if (!tabs) return;

    // Calculate active size from container dimensions
    const containerWidth = container.getBoundingClientRect().width;
    const inactiveSize = this.#inactiveSize;
    const activeSize = containerWidth - inactiveSize * (tabs.length - 1);

    this.#drag = {
      target: initialTarget ?? -1,
      start: event.clientX,
      max: containerWidth * MAX_DRAG_WIDTH_RATIO,
      activeSize,
      left: initialTarget !== undefined ? initialTarget > this.#active : false,
    };

    const ac = new AbortController();
    const opts = { signal: ac.signal };

    document.addEventListener('pointermove', (e) => this.#handleDrag(e), opts);
    document.addEventListener('pointerup', () => this.#endDrag(ac), opts);
    document.addEventListener('pointercancel', () => this.#endDrag(ac), opts);

    event.preventDefault();
  }

  /**
   * @param {PointerEvent} event
   */
  #handleDrag(event) {
    if (!this.#drag) return;

    const { container, tabs } = this.refs;
    if (!container || !tabs) return;

    const delta = event.clientX - this.#drag.start;
    const move = Math.abs(delta);

    if (!this.#drag.dragging && move >= DRAG_THRESHOLD) {
      if (this.#drag.target === -1) {
        if (delta > 0 && this.#active > 0) {
          this.#drag.target = this.#active - 1;
          this.#drag.left = false;
        } else if (delta < 0 && this.#active < tabs.length - 1) {
          this.#drag.target = this.#active + 1;
          this.#drag.left = true;
        } else {
          return;
        }
      }
      this.#drag.dragging = true;
      container.setAttribute('data-dragging', '');
    }

    if (!this.#drag.dragging) return;

    const correct = this.#drag.left ? delta < 0 : delta > 0;
    const progress = correct ? Math.min(move / this.#drag.max, 1) : 0;

    const inactiveSize = this.#inactiveSize;
    const activeSize = this.#drag.activeSize;
    const range = activeSize - inactiveSize;
    const sizes = tabs.map((_, i) => {
      if (i === this.#active) {
        const active = Math.max(inactiveSize, activeSize - range * progress);
        return `${active}px`;
      }
      if (i === this.#drag?.target) {
        const drag = inactiveSize + range * progress;
        return `${drag}px`;
      }
      return `${inactiveSize}px`;
    });

    container.style.setProperty('--active-tab', sizes.join(' '));
    this.#drag.progress = progress;
  }

  /**
   * @param {AbortController} ac
   */
  #endDrag(ac) {
    if (!this.#drag) return;

    const { container } = this.refs;
    container?.removeAttribute('data-dragging');

    if (this.#drag.dragging) {
      this.#drag.prevent = true;
      setTimeout(() => (this.#drag = null), 100);

      if (this.#drag.progress && this.#drag.progress >= DRAG_COMPLETE_THRESHOLD) {
        this.#activate(this.#drag.target);
      } else {
        this.#updateActiveTab();
      }
    } else {
      this.#drag = null;
    }

    ac.abort();
  }

  #observeContentHeight() {
    const { panels } = this.refs;

    this.#heightObserver?.disconnect();
    this.#heightObserver = new ResizeObserver(() => this.#syncHeight());

    this.#contentObserver?.disconnect();
    this.#contentObserver = new MutationObserver(() => this.#syncHeight());

    for (const panel of panels ?? []) {
      const content = panel.querySelector('.layered-slideshow__content');
      const inner = content?.querySelector('.group-block-content');

      // Observe all relevant elements for resize
      if (inner) this.#heightObserver.observe(inner);
      if (content) this.#heightObserver.observe(content);

      // Observe content for DOM mutations (new blocks, text changes)
      const target = inner ?? content;
      if (target) {
        this.#contentObserver.observe(target, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      }
    }

    this.#syncHeight();
  }

  #syncHeight() {
    const { container } = this.refs;
    const contentHeight = this.#getMaxContentHeight();
    const isAuto = container.getAttribute('size') === 'auto';

    if (this.#isMobile) {
      this.#syncMobileHeight(contentHeight, isAuto);
    } else {
      this.#syncDesktopHeight(contentHeight, isAuto);
    }
  }

  /**
   * @param {number} contentHeight
   * @param {boolean} isAuto
   */
  #syncDesktopHeight(contentHeight, isAuto) {
    const { container } = this.refs;

    if (isAuto) {
      // Auto mode: fit to content height
      let minHeightTemp = Math.max(contentHeight, 150);
      container.style.height = `${minHeightTemp}px`;
      this.style.minHeight = `${minHeightTemp}px`;
    } else {
      // Temporarily clear inline style to measure CSS-defined min-height
      const savedMinHeight = this.style.minHeight;
      this.style.minHeight = '';
      const cssMinHeight = parseFloat(getComputedStyle(this).minHeight) || 0;
      this.style.minHeight = savedMinHeight;

      // Only set inline heights when content exceeds CSS min-height
      if (contentHeight > cssMinHeight) {
        this.style.minHeight = `${contentHeight}px`;
        container.style.height = `${contentHeight}px`;
      } else {
        this.style.minHeight = '';
        container.style.height = '';
      }
    }
  }

  /**
   * @param {number} contentHeight
   * @param {boolean} isAuto
   */
  #syncMobileHeight(contentHeight, isAuto) {
    const { container, tabs } = this.refs;
    if (!container || !tabs) return;

    const containerStyles = getComputedStyle(container);
    const inactiveStackHeight = (tabs.length - 1) * this.#inactiveSize;

    let minPanelHeight;

    if (isAuto) {
      // Auto mode: fit to content height with reasonable minimum
      minPanelHeight = 150;
    } else {
      // CSS variable is set on component, try reading from container (inherited) or component directly
      const inheritedValue = containerStyles.getPropertyValue('--layered-panel-height-mobile');
      const componentValue = getComputedStyle(this).getPropertyValue('--layered-panel-height-mobile');
      minPanelHeight = parseFloat(inheritedValue || componentValue) || 260;
    }

    const requiredActiveHeight = Math.max(minPanelHeight, contentHeight);

    container.style.setProperty('--active-panel-height', `${requiredActiveHeight}px`);
    container.style.height = `${requiredActiveHeight + inactiveStackHeight}px`;
  }

  #clearHeightStyles() {
    const { container } = this.refs;

    this.style.minHeight = '';
    container.style.height = '';
    container.style.removeProperty('--active-panel-height');
  }

  #getMaxContentHeight() {
    const { panels } = this.refs;
    let max = 0;

    for (const panel of panels ?? []) {
      const content = panel.querySelector('.layered-slideshow__content');
      if (!content) continue;

      const inner = /** @type {HTMLElement} */ (content.querySelector('.group-block-content') ?? content);

      // Temporarily set height to auto for accurate measurement
      // This is needed because height: 100% collapses when parent has no height
      const savedHeight = inner.style.height;
      inner.style.height = 'auto';

      const styles = getComputedStyle(content);
      const paddingTop = parseFloat(styles.paddingBlockStart || styles.paddingTop) || 0;
      const paddingBottom = parseFloat(styles.paddingBlockEnd || styles.paddingBottom) || 0;

      const height = (inner.scrollHeight || 0) + paddingTop + paddingBottom;
      if (height > max) max = height;

      // Restore original height
      inner.style.height = savedHeight;
    }

    return max;
  }
}

customElements.define('layered-slideshow-component', LayeredSlideshowComponent);
