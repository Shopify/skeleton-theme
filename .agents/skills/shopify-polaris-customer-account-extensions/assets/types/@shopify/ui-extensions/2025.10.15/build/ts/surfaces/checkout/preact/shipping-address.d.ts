import type { ShippingAddress } from '../api/shared';
import type { RenderExtensionTarget } from '../extension-targets';
import type { ShippingAddressChange, ShippingAddressChangeResult } from '../api/checkout/checkout';
/**
 * Returns the proposed `shippingAddress` applied to the checkout.
 * @publicDocs
 */
export declare function useShippingAddress<Target extends RenderExtensionTarget = RenderExtensionTarget>(): ShippingAddress | undefined;
/**
 * Returns a function to mutate the `shippingAddress` property of checkout.
 * @publicDocs
 */
export declare function useApplyShippingAddressChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): ((change: ShippingAddressChange) => Promise<ShippingAddressChangeResult>) | undefined;
//# sourceMappingURL=shipping-address.d.ts.map