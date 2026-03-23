import { getAvailableValues } from '../utils/variant-picker';
import { state } from './state';

function matchesVariantOwner(ownerVariantIds: string | undefined, variantId: string): boolean {
  if (!ownerVariantIds) return false;
  return ownerVariantIds.split(',').some((id) => id.trim() === variantId);
}

/** Calls all sync helpers in sequence after any state change. */
export function syncDOM(): void {
  syncPrice();
  syncAvailability();
  syncMedia();
  syncVariantInput();
  syncButton();
  syncCartStatus();
  syncOptionButtons();
}

/** Updates the price element from the pre-formatted `variantPrices` map. */
function syncPrice(): void {
  const priceEl = document.querySelector('[data-js="product-price"]');
  if (!priceEl) return;
  const formatted = state.variantPrices[String(state.currentVariant.id)];
  if (formatted) priceEl.textContent = formatted;
}

/** Shows or hides the "Sold out" availability message. */
function syncAvailability(): void {
  const el = document.querySelector('[data-js="product-availability"]');
  if (!el) return;
  el.textContent = state.currentVariant.available ? '' : 'Sold out';
}

/** Shows the media item matching `currentMediaId` (or variant featured media), hides all others. */
function syncMedia(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-js="media-item"]');
  if (items.length === 0) return;

  const activeMediaContextVariantId =
    state.mediaContextVariantId !== null
      ? String(state.mediaContextVariantId)
      : String(state.currentVariant.id);

  const targetId =
    state.currentMediaId !== null
      ? String(state.currentMediaId)
      : state.currentVariant.featured_media !== null
        ? String(state.currentVariant.featured_media.id)
        : null;

  const hasTargetMedia =
    targetId !== null && Array.from(items).some((item) => item.dataset.mediaId === targetId);
  const effectiveTargetId = hasTargetMedia ? targetId : null;
  const fallbackVisibleMediaId = items[0]?.dataset.mediaId ?? null;

  let hasVisibleMedia = false;

  items.forEach((item) => {
    const ownerVariantIds = item.dataset.variantMedia;
    const isShared = !ownerVariantIds;
    const isActiveContextMedia = matchesVariantOwner(ownerVariantIds, activeMediaContextVariantId);

    let isVisible: boolean;
    if (effectiveTargetId !== null) {
      isVisible = item.dataset.mediaId === effectiveTargetId;
    } else {
      // No targeted media: show shared + active media context
      // If no variant images exist at all (all isShared), this shows everything — unchanged behaviour
      isVisible = isShared || isActiveContextMedia;
    }

    if (isVisible) {
      item.removeAttribute('hidden');
      hasVisibleMedia = true;
    } else {
      item.setAttribute('hidden', '');
      item.querySelector<HTMLVideoElement>('video')?.pause();
    }
  });

  if (!hasVisibleMedia && fallbackVisibleMediaId) {
    items.forEach((item) => {
      if (item.dataset.mediaId === fallbackVisibleMediaId) {
        item.removeAttribute('hidden');
      } else {
        item.setAttribute('hidden', '');
        item.querySelector<HTMLVideoElement>('video')?.pause();
      }
    });
  }

  const activeMediaId = hasVisibleMedia ? effectiveTargetId : fallbackVisibleMediaId;

  // Thumbnail visibility: shared always visible; variant thumbnails only when active
  document.querySelectorAll<HTMLButtonElement>('[data-js="thumbnail"]').forEach((btn) => {
    const ownerVariantIds = btn.dataset.variantMedia;
    const isShared = !ownerVariantIds;
    const isActiveContextMedia = matchesVariantOwner(ownerVariantIds, activeMediaContextVariantId);

    if (isShared || isActiveContextMedia) {
      btn.removeAttribute('hidden');
    } else {
      btn.setAttribute('hidden', '');
    }

    btn.setAttribute('aria-pressed', String(btn.dataset.thumbnail === activeMediaId));
  });
}

/** Updates the add-to-cart button label and disabled state based on availability and cart state. */
function syncButton(): void {
  const btn = document.querySelector<HTMLButtonElement>('[data-js="add-to-cart"]');
  if (!btn) return;

  const labels = {
    idle: state.currentVariant.available ? 'Add to cart' : 'Sold out',
    loading: 'Adding...',
    success: 'Added!',
    error: 'Try again',
  };

  btn.disabled = !state.currentVariant.available || state.cartState === 'loading';
  btn.setAttribute('aria-busy', String(state.cartState === 'loading'));
  btn.textContent = labels[state.cartState];
}

function syncVariantInput(): void {
  const input = document.querySelector<HTMLInputElement>('[data-js="variant-id"]');
  if (!input) return;
  input.value = String(state.currentVariant.id);
}

function syncCartStatus(): void {
  const status = document.querySelector<HTMLElement>('[data-js="cart-status"]');
  if (!status) return;

  const messages = {
    idle: state.currentVariant.available ? '' : 'This variant is sold out.',
    loading: '',
    success: 'Added to cart.',
    error: 'Could not add to cart. Please try again.',
  };

  status.textContent = messages[state.cartState];
}

/** Updates `aria-pressed` and `aria-disabled` on all option buttons, and refreshes the selected-value label text. */
function syncOptionButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-js="option-value"]').forEach((btn) => {
    const position = Number(btn.dataset.optionPosition) - 1;
    const value = btn.dataset.optionValue ?? '';
    const isSelected = state.selectedOptions[position] === value;

    btn.setAttribute('aria-pressed', String(isSelected));
    const available = getAvailableValues(state.productData.variants, state.selectedOptions, position);
    const isAvailable = available.has(value);

    btn.setAttribute('aria-disabled', String(!isAvailable));
    btn.disabled = !isAvailable;
  });

  document.querySelectorAll<HTMLElement>('[data-js="option-label"]').forEach((label) => {
    const position = Number(label.dataset.optionLabel) - 1;
    label.textContent = state.selectedOptions[position] ?? '';
  });
}
