import type { CartLine } from '@shopify/ui-extensions/checkout';
/**
 * Returns the cart line the extension is attached to. This hook can only be used by extensions in the following
 * extension targets:
 * - `purchase.cart-line-item.line-components.render`
 * - `purchase.checkout.cart-line-item.render-after`
 * - `purchase.thank-you.cart-line-item.render-after`
 */
export declare function useCartLineTarget(): CartLine;
//# sourceMappingURL=cart-line-target.d.ts.map