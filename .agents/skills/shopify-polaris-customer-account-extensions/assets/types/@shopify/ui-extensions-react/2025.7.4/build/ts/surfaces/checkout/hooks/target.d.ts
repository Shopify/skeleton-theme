import type { CartLine } from '@shopify/ui-extensions/checkout';
/**
 * Returns the cart line the extension is attached to. This hook can only be used by extensions in the
 * `purchase.cart-line-item.line-components.render`, `purchase.checkout.cart-line-item.render-after`, and
 * `purchase.thank-you.cart-line-item.render-after`
 * extension targets. Until version `2023-04`, this hook returned a `PresentmentCartLine` object.
 *
 * > Caution: Deprecated as of version `2023-10`, use `useCartLineTarget()` instead.
 *
 * @deprecated Deprecated as of version `2023-10`, use `useCartLineTarget()` instead.
 */
export declare function useTarget(): CartLine;
//# sourceMappingURL=target.d.ts.map