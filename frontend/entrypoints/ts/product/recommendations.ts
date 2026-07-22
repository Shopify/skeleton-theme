/**
 * Load product recommendations via the Section Rendering API.
 * Fetches the product-recommendations section with intent=related
 * and injects the HTML into the [data-js="recommendations"] container.
 */
export function loadRecommendations(): void {
  const container = document.querySelector<HTMLElement>('[data-js="recommendations"]');
  if (!container) return;

  const productId = container.dataset.productId;
  const sectionId = container.dataset.sectionId;
  if (!productId || !sectionId) return;

  const url = `${window.Shopify.routes.root}recommendations/products?section_id=${sectionId}&product_id=${productId}&intent=related`;

  fetch(url)
    .then(res => res.text())
    .then((html) => {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const inner = parsed.querySelector('[data-js="product-recommendations-root"]');
      if (inner) {
        container.innerHTML = inner.innerHTML;
      }
    })
    .catch(() => {
      // Silently fail — recommendations are non-critical
    });
}
