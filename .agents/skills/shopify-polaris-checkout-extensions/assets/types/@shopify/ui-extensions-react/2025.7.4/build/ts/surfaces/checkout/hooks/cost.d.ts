import type { Money, RenderExtensionTarget } from '@shopify/ui-extensions/checkout';
/**
 * A `Money` value representing the subtotal value of the items in the cart at the current
 * step of checkout.
 */
export declare function useSubtotalAmount<Target extends RenderExtensionTarget = RenderExtensionTarget>(): Money;
/**
 * A `Money` value representing the total shipping a buyer can expect to pay at the current
 * step of checkout. This value includes shipping discounts. Returns undefined if shipping
 * has not been negotiated yet, such as on the information step.
 */
export declare function useTotalShippingAmount<Target extends RenderExtensionTarget = RenderExtensionTarget>(): Money | undefined;
/**
 * A `Money` value representing the total tax a buyer can expect to pay at the current
 * step of checkout or the total tax included in product and shipping prices. Returns
 * undefined if taxes are unavailable.
 */
export declare function useTotalTaxAmount<Target extends RenderExtensionTarget = RenderExtensionTarget>(): Money | undefined;
/**
 * Returns a `Money` value representing the minimum a buyer can expect to pay at the current
 * step of checkout. This value excludes amounts yet to be negotiated. For example,
 * the information step might not have delivery costs calculated.
 */
export declare function useTotalAmount<Target extends RenderExtensionTarget = RenderExtensionTarget>(): Money;
//# sourceMappingURL=cost.d.ts.map