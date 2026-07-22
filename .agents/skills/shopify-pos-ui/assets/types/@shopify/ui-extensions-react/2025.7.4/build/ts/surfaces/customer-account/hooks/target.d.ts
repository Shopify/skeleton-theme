import { CartLine } from '@shopify/ui-extensions/customer-account';
/**
 * Returns the cart line the extension is attached to. This hook can only be used by extensions in the
 * `purchase.cart-line-item.line-components.render` and `customer-account.order-status.cart-line-item.render-after`
 * extension targets. Until version `2023-04`, this hook returned a `PresentmentCartLine` object.
 */
export declare function useTarget(): CartLine;
//# sourceMappingURL=target.d.ts.map