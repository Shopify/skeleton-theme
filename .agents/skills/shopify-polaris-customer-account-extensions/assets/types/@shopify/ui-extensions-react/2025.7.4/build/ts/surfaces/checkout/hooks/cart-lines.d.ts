import type { CartLine, RenderExtensionTarget, CartLineChangeResult, CartLineChange } from '@shopify/ui-extensions/checkout';
/**
 * Returns the current line items for the checkout, and automatically re-renders
 * your component if line items are added, removed, or updated.
 */
export declare function useCartLines<Target extends RenderExtensionTarget = RenderExtensionTarget>(): CartLine[];
/**
 * Returns a function to mutate the `lines` property of checkout.
 */
export declare function useApplyCartLinesChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): (change: CartLineChange) => Promise<CartLineChangeResult>;
//# sourceMappingURL=cart-lines.d.ts.map