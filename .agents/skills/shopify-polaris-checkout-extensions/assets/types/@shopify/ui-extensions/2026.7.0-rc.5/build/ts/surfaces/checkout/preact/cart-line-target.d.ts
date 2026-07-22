import type { CartLine } from '../api/standard/standard';
/**
 * Returns the cart line the extension is attached to. This hook can only be used by extensions in the following
 * extension targets:
 * - `purchase.cart-line-item.line-components.render`
 * - `purchase.checkout.cart-line-item.render-after`
 * - `purchase.thank-you.cart-line-item.render-after`
 * @publicDocs
 */
export declare function useCartLineTarget(): CartLine;
//# sourceMappingURL=cart-line-target.d.ts.map