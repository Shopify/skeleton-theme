import type { SubscribableSignalLike } from '../../shared';
/** @publicDocs */
export interface PickupLocationListApi {
    /**
     * Whether the location search form is currently visible to the buyer.
     * Use this to conditionally render UI that depends on the buyer actively
     * searching for pickup locations.
     */
    isLocationFormVisible: SubscribableSignalLike<boolean>;
}
//# sourceMappingURL=pickup-location-list.d.ts.map