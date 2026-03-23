import type { ProductVariant, ProductData } from '../utils/variant-picker';

export type CartState = 'idle' | 'loading' | 'success' | 'error';

export const state = {
  productData: null as unknown as ProductData,
  currentVariant: null as unknown as ProductVariant,
  selectedOptions: [] as string[],
  variantPrices: {} as Record<string, string>,
  cartState: 'idle' as CartState,
  currentMediaId: null as number | null,
  mediaContextVariantId: null as number | null,
};
