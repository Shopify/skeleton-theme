import type { ProductVariant, ProductData } from '../utils/variant-picker';

export type CartState = 'idle' | 'loading' | 'success' | 'error';

// productData/currentVariant are populated synchronously in product.ts's init()
// before any listener is wired, so no consumer ever observes the null placeholder.
export const state = {
  productData: null as unknown as ProductData,
  currentVariant: null as unknown as ProductVariant,
  selectedOptions: [] as string[],
  variantPrices: {} as Record<string, string>,
  cartState: 'idle' as CartState,
  currentMediaId: null as number | null,
  mediaContextVariantId: null as number | null,
};
