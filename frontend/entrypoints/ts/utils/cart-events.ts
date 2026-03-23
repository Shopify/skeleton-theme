export interface CartUpdatedDetail {
  itemCount?: number;
  itemCountDelta?: number;
  openDrawer?: boolean;
}

export const CART_UPDATED_EVENT = 'cart:updated';
export const CART_OPEN_EVENT = 'cart:open';

export function emitCartUpdated(detail: CartUpdatedDetail): void {
  window.dispatchEvent(new CustomEvent<CartUpdatedDetail>(CART_UPDATED_EVENT, { detail }));
}

export function emitCartOpen(): void {
  window.dispatchEvent(new CustomEvent(CART_OPEN_EVENT));
}
