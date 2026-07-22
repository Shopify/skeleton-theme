import type { ShippingAddress, RenderExtensionTarget, ShippingAddressChange, ShippingAddressChangeResult } from '@shopify/ui-extensions/checkout';
/**
 * Returns the proposed `shippingAddress` applied to the checkout.
 */
export declare function useShippingAddress<Target extends RenderExtensionTarget = RenderExtensionTarget>(): ShippingAddress | undefined;
/**
 * Returns a function to mutate the `shippingAddress` property of checkout.
 */
export declare function useApplyShippingAddressChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): ((change: ShippingAddressChange) => Promise<ShippingAddressChangeResult>) | undefined;
//# sourceMappingURL=shipping-address.d.ts.map