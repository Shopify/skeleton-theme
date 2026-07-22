import { state } from './product/state';
import { syncDOM } from './product/sync';
import { onOptionClick, onAddToCart, onThumbnailClick } from './product/handlers';
import { loadRecommendations } from './product/recommendations';
import type { ProductData } from './utils/variant-picker';

function resolveVariantFromURL(productData: ProductData): ProductData['variants'][number] {
  const params = new URLSearchParams(window.location.search);
  const variantIdParam = Number(params.get('variant'));

  return (
    productData.variants.find(v => v.id === variantIdParam)
    ?? productData.variants.find(v => v.available)
    ?? productData.variants[0]
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

function isProductInteractionTarget(target: EventTarget | null): target is HTMLElement {
  return target instanceof HTMLElement;
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

  const onFirstPointerDown = (event: PointerEvent): void => {
    if (!isProductInteractionTarget(event.target)) return;

    const isProductInteraction = Boolean(
      event.target.closest('[data-js="product-form"], [data-product-media], [data-product-thumbnails]'),
    );
    if (!isProductInteraction) return;

    loadRecommendationsOnce();
    document.removeEventListener('pointerdown', onFirstPointerDown, true);
    document.removeEventListener('keydown', onFirstKeyDown, true);
  };

  const onFirstKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (!isProductInteractionTarget(event.target)) return;

    const isProductInteraction = Boolean(
      event.target.closest('[data-js="product-form"], [data-product-media], [data-product-thumbnails]'),
    );
    if (!isProductInteraction) return;

    loadRecommendationsOnce();
    document.removeEventListener('pointerdown', onFirstPointerDown, true);
    document.removeEventListener('keydown', onFirstKeyDown, true);
  };

  document.addEventListener('pointerdown', onFirstPointerDown, true);
  document.addEventListener('keydown', onFirstKeyDown, true);

  const form = document.querySelector<HTMLFormElement>('[data-js="product-form"]');
  form?.addEventListener('click', (event) => {
    onOptionClick(event);
  });
  form?.addEventListener('submit', (e) => {
    loadRecommendationsOnce();
    void onAddToCart(e);
  });

  document.addEventListener('click', (event) => {
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
