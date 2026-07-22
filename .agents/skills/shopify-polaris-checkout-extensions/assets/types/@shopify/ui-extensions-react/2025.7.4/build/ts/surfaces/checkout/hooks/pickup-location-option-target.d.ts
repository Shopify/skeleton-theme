import type { PickupLocationOption } from '@shopify/ui-extensions/checkout';
/**
 * Returns the pickup location option the extension is attached to. This hook can only be used by extensions in the following
 * extension target:
 * - `purchase.checkout.pickup-location-option-item.render-after`
 */
export declare function usePickupLocationOptionTarget(): {
    pickupLocationOptionTarget: PickupLocationOption;
    isTargetSelected: boolean;
};
//# sourceMappingURL=pickup-location-option-target.d.ts.map