import type { PickupLocationOption } from '../api/standard/standard';
/**
 * Returns the pickup location option the extension is attached to. This hook can only be used by extensions in the following
 * extension target:
 * - `purchase.checkout.pickup-location-option-item.render-after`
 * @publicDocs
 */
export declare function usePickupLocationOptionTarget(): {
    pickupLocationOptionTarget: PickupLocationOption;
    isTargetSelected: boolean;
};
//# sourceMappingURL=pickup-location-option-target.d.ts.map