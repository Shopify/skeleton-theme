import { findVariantByOptions } from '../utils/variant-picker';
import { addToCart } from '../utils/cart';
import { emitCartOpen, emitCartUpdated } from '../utils/cart-events';
import { state } from './state';
import { syncDOM } from './sync';

/**
 * Handles delegated click events on option buttons.
 * Updates `selectedOptions`, resolves the matching variant, and syncs the DOM.
 */
export function onOptionClick(e: Event): void {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-js="option-value"]');
  if (!btn) return;
  if (btn.disabled || btn.getAttribute('aria-disabled') === 'true') return;

  const position = Number(btn.dataset.optionPosition) - 1;
  const value = btn.dataset.optionValue ?? '';
  if (position < 0 || !value) return;

  state.selectedOptions[position] = value;

  const variant = findVariantByOptions(state.productData.variants, state.selectedOptions);
  if (!variant) {
    state.selectedOptions[position] = state.currentVariant.options[position] ?? state.selectedOptions[position];
    return;
  }

  const previousMediaId = state.currentMediaId;
  const previousMediaContextVariantId = state.mediaContextVariantId;

  state.currentVariant = variant;

  if (variant.featured_media) {
    state.currentMediaId = variant.featured_media.id;
    state.mediaContextVariantId = variant.id;
  } else {
    state.currentMediaId = previousMediaId;
    state.mediaContextVariantId = previousMediaContextVariantId;
  }

  const url = new URL(window.location.href);
  url.searchParams.set('variant', String(variant.id));
  history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  syncDOM();
}

/**
 * Handles delegated click events on thumbnail buttons.
 * Updates `currentMediaId` and syncs the DOM.
 */
export function onThumbnailClick(e: Event): void {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-js="thumbnail"]');
  if (!btn) return;
  const mediaId = Number(btn.dataset.thumbnail);
  if (!mediaId) return;
  state.currentMediaId = mediaId;

  const mediaOwnerVariantId = Number((btn.dataset.variantMedia ?? '').split(',')[0]);
  if (mediaOwnerVariantId) {
    state.mediaContextVariantId = mediaOwnerVariantId;
  }

  syncDOM();

  const mediaContainer = document.querySelector<HTMLElement>('[data-product-media]');
  const mediaItem = mediaContainer?.querySelector<HTMLElement>(`[data-js="media-item"][data-media-id="${mediaId}"]`);
  if (mediaContainer && mediaItem) {
    const delta = mediaItem.getBoundingClientRect().top - mediaContainer.getBoundingClientRect().top;
    mediaContainer.scrollTo({ top: mediaContainer.scrollTop + delta, behavior: 'smooth' });
  }
}

/**
 * Handles form submit: delegates the cart request to `addToCart`,
 * manages `cartState`, and syncs the button label.
 */
export async function onAddToCart(e: Event): Promise<void> {
  e.preventDefault();
  if (state.cartState === 'loading') return;

  const form = e.target as HTMLFormElement;
  const quantityInput = form.querySelector<HTMLInputElement>('input[name="quantity"]');
  const quantity = quantityInput ? Math.max(1, Number(quantityInput.value) || 1) : 1;

  state.cartState = 'loading';
  syncDOM();

  try {
    await addToCart(state.currentVariant.id, quantity);
    emitCartUpdated({ itemCountDelta: quantity });
    emitCartOpen();

    state.cartState = 'success';
    syncDOM();
    setTimeout(() => {
      state.cartState = 'idle';
      syncDOM();
    }, 2000);
  } catch {
    state.cartState = 'error';
    syncDOM();
    setTimeout(() => {
      state.cartState = 'idle';
      syncDOM();
    }, 3000);
  }
}
