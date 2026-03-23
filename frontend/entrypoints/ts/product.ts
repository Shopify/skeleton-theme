import { state } from './product/state';
import { syncDOM } from './product/sync';
import { onOptionClick, onAddToCart, onThumbnailClick } from './product/handlers';
import { loadRecommendations } from './product/recommendations';
import type { ProductData } from './utils/variant-picker';

function resolveVariantFromURL(productData: ProductData): ProductData['variants'][number] {
  const params = new URLSearchParams(window.location.search);
  const variantIdParam = Number(params.get('variant'));

  return (
    productData.variants.find((v) => v.id === variantIdParam) ??
    productData.variants.find((v) => v.available) ??
    productData.variants[0]
  );
}

function applyVariantSelection(variant: ProductData['variants'][number]): void {
  state.currentVariant = variant;
  state.selectedOptions = [...variant.options];

  if (variant.featured_media) {
    state.currentMediaId = variant.featured_media.id;
    state.mediaContextVariantId = variant.id;
    return;
  }

  if (state.currentMediaId === null) {
    const firstMedia = document.querySelector<HTMLElement>('[data-js="media-item"]');
    const firstMediaId = Number(firstMedia?.dataset.mediaId ?? '');
    const firstMediaOwnerVariantId = Number((firstMedia?.dataset.variantMedia ?? '').split(',')[0]);
    state.currentMediaId = firstMediaId || null;
    state.mediaContextVariantId = firstMediaOwnerVariantId || state.mediaContextVariantId;
  }
}

function isOptionClick(event: Event): boolean {
  return Boolean((event.target as HTMLElement).closest('[data-js="option-value"]'));
}

function isThumbnailClick(event: Event): boolean {
  return Boolean((event.target as HTMLElement).closest('[data-js="thumbnail"]'));
}

/**
 * Bootstraps the product page: parses JSON islands, resolves the initial variant
 * from URL or availability, and attaches event listeners.
 */
function init(): void {
  const dataEl = document.querySelector<HTMLScriptElement>('[data-js="product-data"]');
  if (!dataEl?.textContent) return;

  state.productData = JSON.parse(dataEl.textContent) as ProductData;

  const pricesEl = document.querySelector<HTMLScriptElement>('[data-js="variant-prices"]');
  state.variantPrices = pricesEl?.textContent
    ? (JSON.parse(pricesEl.textContent) as Record<string, string>)
    : {};

  applyVariantSelection(resolveVariantFromURL(state.productData));

  let hasLoadedRecommendations = false;
  const loadRecommendationsOnce = (): void => {
    if (hasLoadedRecommendations) return;
    hasLoadedRecommendations = true;
    loadRecommendations();
  };

  const form = document.querySelector<HTMLFormElement>('[data-js="product-form"]');
  form?.addEventListener('click', (event) => {
    if (isOptionClick(event)) {
      loadRecommendationsOnce();
    }
    onOptionClick(event);
  });
  form?.addEventListener('submit', (e) => {
    loadRecommendationsOnce();
    void onAddToCart(e);
  });

  document.addEventListener('click', (event) => {
    if (isThumbnailClick(event)) {
      loadRecommendationsOnce();
    }
    onThumbnailClick(event);
  });
  window.addEventListener('popstate', () => {
    applyVariantSelection(resolveVariantFromURL(state.productData));
    state.cartState = 'idle';
    syncDOM();
  });

  syncDOM();
}

document.addEventListener('DOMContentLoaded', init);
