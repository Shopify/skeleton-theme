import type { CartLineChange, CartLineChangeResult } from '../api/checkout/checkout';
import type { CartLine } from '../api/standard/standard';
import type { RenderExtensionTarget } from '../extension-targets';
/**
 * Returns the current line items for the checkout, and automatically re-renders
 * your component if line items are added, removed, or updated.
 * @publicDocs
 */
export declare function useCartLines<Target extends RenderExtensionTarget = RenderExtensionTarget>(): CartLine[];
/**
 * Returns a function to mutate the `lines` property of checkout.
 * @publicDocs
 */
export declare function useApplyCartLinesChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): (change: CartLineChange) => Promise<CartLineChangeResult>;
//# sourceMappingURL=cart-lines.d.ts.map