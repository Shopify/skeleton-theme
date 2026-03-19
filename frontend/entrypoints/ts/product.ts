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
  state.currentMediaId = variant.featured_media?.id ?? null;
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

  const form = document.querySelector<HTMLFormElement>('[data-js="product-form"]');
  form?.addEventListener('click', onOptionClick);
  form?.addEventListener('submit', (e) => void onAddToCart(e));

  document.addEventListener('click', onThumbnailClick);
  window.addEventListener('popstate', () => {
    applyVariantSelection(resolveVariantFromURL(state.productData));
    state.cartState = 'idle';
    syncDOM();
  });

  syncDOM();
  loadRecommendations();
}

document.addEventListener('DOMContentLoaded', init);
