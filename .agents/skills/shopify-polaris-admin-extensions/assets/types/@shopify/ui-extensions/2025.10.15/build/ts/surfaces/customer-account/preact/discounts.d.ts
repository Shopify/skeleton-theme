import type { RenderOrderStatusExtensionTarget } from '../extension-targets';
import type { CartDiscountAllocation, CartDiscountCode } from '../api';
/**
 * Returns the current discount codes applied to the cart, and automatically re-renders
 * your component if discount codes are added or removed.
 */
export declare function useDiscountCodes<Target extends RenderOrderStatusExtensionTarget = RenderOrderStatusExtensionTarget>(): CartDiscountCode[];
/**
 * Returns the current discount allocations applied to the cart, and automatically re-renders
 * your component if discount allocations changed.
 */
export declare function useDiscountAllocations<Target extends RenderOrderStatusExtensionTarget = RenderOrderStatusExtensionTarget>(): CartDiscountAllocation[];
//# sourceMappingURL=discounts.d.ts.map