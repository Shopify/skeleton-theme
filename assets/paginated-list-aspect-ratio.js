/**
 * A helper class to keep the set aspect ratio in a card gallery element in the theme editor.
 * This applies the aspect ratio to newly loaded product cards even when the setting has changed and is unsaved.
 */
export class PaginatedListAspectRatioHelper {
  /** @type {string | null} */
  #imageRatioSetting = null;

  /**
   * Aspect ratio values matching the theme's standardized values
   * @type {Object.<string, string>}
   */
  #ASPECT_RATIOS = {
    square: '1',
    portrait: '0.8',
    landscape: '1.778',
  };

  /**
   * @param {Object} options - The options object
   * @param {HTMLElement} options.templateCard - The template card gallery element to get the image ratio from
   */
  constructor({ templateCard }) {
    if (!Shopify.designMode) return;
    this.#storeImageRatioSettings(templateCard);
  }

  /**
   * Process newly added elements and apply correct aspect ratios
   */
  processNewElements() {
    if (!Shopify.designMode) return;
    // Wait for the DOM to update
    requestAnimationFrame(() => {
      this.#imageRatioSetting === 'adapt' ? this.#fixAdaptiveAspectRatios() : this.#applyFixedAspectRatio();
    });
  }

  /**
   * Store the image ratio from the template card for later use
   * @param {HTMLElement} templateCard - The template card gallery element to get the image ratio from
   */
  #storeImageRatioSettings(templateCard) {
    this.#imageRatioSetting = templateCard.getAttribute('data-image-ratio');
  }

  /**
   * Fix adaptive aspect ratios for newly added cards
   * For the 'adapt' setting, each product should use its own image's aspect ratio
   */
  #fixAdaptiveAspectRatios() {
    const newCardGalleries = this.#getUnprocessedGalleries();
    if (!newCardGalleries.length) return;

    const productRatioCache = new Map();

    newCardGalleries.forEach((gallery) => {
      if (!(gallery instanceof HTMLElement)) return;

      const productId = gallery.getAttribute('data-product-id');
      if (productId && productRatioCache.has(productId)) {
        this.#applyAspectRatioToGallery(gallery, productRatioCache.get(productId));
        return;
      }

      const img = gallery.querySelector('img');
      if (!img) {
        this.#applyAspectRatioToGallery(gallery, '1');
        return;
      }

      const loadAndSetRatio = () => {
        if (!img.naturalWidth || !img.naturalHeight) return;

        const imgRatio = this.#getSafeImageAspectRatio(img.naturalWidth, img.naturalHeight);

        if (productId) {
          productRatioCache.set(productId, imgRatio);
        }

        this.#applyAspectRatioToGallery(gallery, imgRatio);
      };

      if (img.complete) {
        loadAndSetRatio();
      } else {
        img.addEventListener('load', loadAndSetRatio, { once: true });
      }
    });
  }

  /**
   * Apply a fixed aspect ratio to all card-gallery and media container elements
   * Only used for non-adaptive modes (square, portrait, landscape)
   */
  #applyFixedAspectRatio() {
    if (!this.#imageRatioSetting) return;

    const aspectRatio = this.#getAspectRatioValue(this.#imageRatioSetting);
    if (!aspectRatio) return;

    const newCardGalleries = this.#getUnprocessedGalleries();
    if (!newCardGalleries.length) return;

    // Batch DOM operations for better performance
    requestAnimationFrame(() => {
      newCardGalleries.forEach((gallery) => {
        if (!(gallery instanceof HTMLElement)) return;
        this.#applyAspectRatioToGallery(gallery, aspectRatio);
      });
    });
  }

  /**
   * Calculate a safe aspect ratio value from image dimensions
   * Ensures the ratio stays within reasonable bounds and has consistent decimal places
   * @param {number} width - Natural width of the image
   * @param {number} height - Natural height of the image
   * @returns {string} Normalized aspect ratio as a string
   */
  #getSafeImageAspectRatio(width, height) {
    const rawRatio = width / height;
    return Math.max(0.1, Math.min(10, rawRatio)).toFixed(3);
  }

  /**
   * Get aspect ratio value based on setting
   * @param {string} ratioSetting - The ratio setting name
   * @returns {string|null} - The aspect ratio value or null
   */
  #getAspectRatioValue(ratioSetting) {
    return this.#ASPECT_RATIOS[ratioSetting] || null;
  }

  /**
   * Apply an aspect ratio to a gallery and all its media containers
   * @param {HTMLElement} gallery - The gallery element
   * @param {string} aspectRatio - The aspect ratio to apply
   */
  #applyAspectRatioToGallery(gallery, aspectRatio) {
    if (!(gallery instanceof HTMLElement)) return;

    gallery.style.setProperty('--gallery-aspect-ratio', aspectRatio);

    const mediaContainers = gallery.querySelectorAll('.product-media-container');
    mediaContainers.forEach((container) => {
      if (container instanceof HTMLElement) {
        container.style.aspectRatio = aspectRatio;
      }
    });

    this.#markAsProcessed(gallery);
  }

  /**
   * Get all unprocessed card galleries
   * @returns {NodeListOf<Element>} List of unprocessed galleries
   */
  #getUnprocessedGalleries() {
    return document.querySelectorAll('.card-gallery:not([data-aspect-ratio-applied])');
  }

  /**
   * Mark gallery as processed
   * @param {HTMLElement} gallery - The gallery element to mark as processed
   */
  #markAsProcessed(gallery) {
    if (!(gallery instanceof HTMLElement)) return;
    gallery.setAttribute('data-aspect-ratio-applied', 'true');
  }
}
