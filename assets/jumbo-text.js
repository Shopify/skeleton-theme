import { ResizeNotifier, prefersReducedMotion, yieldToMainThread } from '@theme/utilities';
import { Component } from '@theme/component';

/**
 * A custom element that automatically sizes text to fit its container width.
 */
class JumboText extends Component {
  connectedCallback() {
    super.connectedCallback();
    this.#setIntersectionObserver();

    // We need window listener to account for flex containers not shrinking until we reset the font size.
    window.addEventListener('resize', this.#windowResizeListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#resizeObserver.disconnect();
    this.#intersectionObserver?.disconnect();

    window.removeEventListener('resize', this.#windowResizeListener);
  }

  #firstResize = true;

  /**
   * Sets the intersection observer to calculate the optimal font size when the text is in view.
   */
  #setIntersectionObserver() {
    // The threshold could be different based on the repetition of the animation.
    this.#intersectionObserver = new IntersectionObserver(
      (entries) => {
        // We observe a single element, so we only need the latest entry.
        const entry = entries[entries.length - 1];

        if (!entry) {
          return;
        }

        // Initial calculation
        if (entry.isIntersecting && this.#firstResize) {
          this.#handleResize(entry.boundingClientRect.width);
        }

        if (this.dataset.textEffect && this.dataset.textEffect !== 'none' && !prefersReducedMotion()) {
          if (entry.intersectionRatio >= 0.3) {
            this.classList.add('ready');
            if (this.dataset.animationRepeat === 'false') {
              this.#intersectionObserver?.unobserve(entry.target);
            }
            // We need to wait for resize recalculations to apply before triggering transitions.
            yieldToMainThread().then(() => {
              this.classList.add('jumbo-text-visible');
            });
          } else {
            this.classList.remove('ready', 'jumbo-text-visible');
          }
        }
      },
      { threshold: [0, 0.3] }
    );

    this.#intersectionObserver?.observe(this);
  }

  /**
   * Calculates the optimal font size to make the text fit the container.
   * @param {number} containerWidth - The width of the jumbo-text element.
   */
  #calculateOptimalFontSize = (containerWidth) => {
    const { widestChild: firstPassWidestChild, widestChildWidth: firstPassWidestChildWidth } = this.#findWidestChild();
    if (!firstPassWidestChild || !firstPassWidestChildWidth) {
      return;
    }

    const currentFontSize = parseFloat(window.getComputedStyle(firstPassWidestChild).fontSize);
    const firstPassFontSize = Math.round(((currentFontSize * containerWidth) / firstPassWidestChildWidth) * 100) / 100;

    // Disconnect the resize observer
    this.#resizeObserver.disconnect();

    this.style.fontSize = this.#clampFontSize(firstPassFontSize);

    // The way the text grows is mostly proportional, but not fully linear.
    // Doing a single pass was good enough in 95% of cases, but we need a second one to dial in the final value.
    const { widestChild: secondPassWidestChild, widestChildWidth: secondPassWidestChildWidth } =
      this.#findWidestChild();
    if (!secondPassWidestChild || !secondPassWidestChildWidth) {
      return;
    }

    // The -0.15 was chosen by trial and error. It doesn't influence large font sizes much, but helps smaller ones fit better.
    const secondPassFontSize =
      Math.floor(((firstPassFontSize * containerWidth) / secondPassWidestChildWidth) * 100) / 100 - 0.15;

    if (secondPassFontSize !== firstPassFontSize) {
      this.style.fontSize = this.#clampFontSize(secondPassFontSize);
    }

    this.classList.add('ready');

    this.#resizeObserver.observe(this);
  };

  #findWidestChild = () => {
    let widestChild = null;
    let widestChildWidth = 0;

    for (const child of this.children) {
      if (!(child instanceof HTMLElement)) {
        continue;
      }

      const { width: childWidth } = child.getBoundingClientRect();

      if (!widestChild || childWidth > widestChildWidth) {
        widestChildWidth = childWidth;
        widestChild = child;
      }
    }
    return { widestChild, widestChildWidth };
  };

  /**
   * Clamps the font size between a minimum and maximum value.
   * @param {number} fontSize - The font size to clamp.
   * @returns {string} The clamped font size with pixels suffix.
   */
  #clampFontSize = (fontSize) => {
    const minFontSize = 1;
    const maxFontSize = 500;

    return `${Math.min(Math.max(fontSize, minFontSize), maxFontSize)}px`;
  };

  /**
   * @param {number | undefined} containerWidth - The width of the <jumbo-text> element.
   */
  #handleResize = (containerWidth = undefined) => {
    // Check for empty text
    if (!this.textContent?.trim()) {
      return;
    }

    if (containerWidth === undefined) {
      containerWidth = this.offsetWidth;
    }

    if (containerWidth <= 0) return;

    // Reset font size to make sure we allow the container to shrink if it needs to.
    if (!this.#firstResize) {
      this.classList.remove('ready');
      this.style.fontSize = '';
    }

    this.#calculateOptimalFontSize(containerWidth);

    this.#firstResize = false;

    if (this.dataset.capText === 'true') {
      return;
    }

    // We assume that the component won't be at the bottom of the page unless it's inside the last section.
    const allSections = Array.from(document.querySelectorAll('.shopify-section'));
    const lastSection = allSections[allSections.length - 1];

    if (lastSection && !lastSection.contains(this)) {
      return;
    }

    // Check if jumbo text is close to the bottom of the page. If it is, then use `cap text` instead of `cap alphabetic`.
    // This reserves space for descender characters so they don't overflow and cause extra space at the bottom of the page.
    const rect = this.getBoundingClientRect();
    const bottom = rect.bottom + window.scrollY;
    const distanceFromBottom = document.documentElement.offsetHeight - bottom;
    this.dataset.capText = (distanceFromBottom <= 100).toString();
  };

  #windowResizeListener = () => this.#handleResize();

  #resizeObserver = new ResizeNotifier((entries) => this.#handleResize(entries[0]?.borderBoxSize?.[0]?.inlineSize));
  /**
   * @type {IntersectionObserver | null}
   */
  #intersectionObserver = null;
}

// Register once
if (!customElements.get('jumbo-text')) {
  customElements.define('jumbo-text', JumboText);
}
