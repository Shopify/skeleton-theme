import type { CartDiscountAllocation, CartDiscountCode, RenderExtensionTarget, DiscountCodeChange, DiscountCodeChangeResult } from '@shopify/ui-extensions/checkout';
/**
 * Returns the current discount codes applied to the cart, and automatically re-renders
 * your component if discount codes are added or removed.
 */
export declare function useDiscountCodes<Target extends RenderExtensionTarget = RenderExtensionTarget>(): CartDiscountCode[];
/**
 * Returns the current discount allocations applied to the cart, and automatically re-renders
 * your component if discount allocations changed.
 */
export declare function useDiscountAllocations<Target extends RenderExtensionTarget = RenderExtensionTarget>(): CartDiscountAllocation[];
/**
 * Returns a function to add or remove discount codes.
 *
 * > Caution:
 * > See [security considerations](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#network-access) if your extension retrieves discount codes through a network call.
 */
export declare function useApplyDiscountCodeChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): (change: DiscountCodeChange) => Promise<DiscountCodeChangeResult>;
//# sourceMappingURL=discounts.d.ts.map