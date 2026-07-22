import type { DiscountCodeChange, DiscountCodeChangeResult } from '../api/checkout/checkout';
import type { CartDiscountAllocation, CartDiscountCode } from '../api/standard/standard';
import type { RenderExtensionTarget } from '../extension-targets';
/**
 * Returns the current discount codes applied to the cart, and automatically re-renders
 * your component if discount codes are added or removed.
 * @publicDocs
 */
export declare function useDiscountCodes<Target extends RenderExtensionTarget = RenderExtensionTarget>(): CartDiscountCode[];
/**
 * Returns the current discount allocations applied to the cart, and automatically re-renders
 * your component if discount allocations changed.
 * @publicDocs
 */
export declare function useDiscountAllocations<Target extends RenderExtensionTarget = RenderExtensionTarget>(): CartDiscountAllocation[];
/**
 * Returns a function to add or remove discount codes.
 *
 * > Caution:
 * > See [security considerations](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#network-access) if your extension retrieves discount codes through a network call.
 * @publicDocs
 */
export declare function useApplyDiscountCodeChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): (change: DiscountCodeChange) => Promise<DiscountCodeChangeResult>;
//# sourceMappingURL=discounts.d.ts.map