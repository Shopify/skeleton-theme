import type { SubscribableSignalLike } from '../../shared';
import type { PickupLocationOption } from '../standard/standard';
/** @publicDocs */
export interface PickupLocationItemApi {
    /**
     * The pickup location that this extension is attached to. Use this to read the location's name, address, and other details.
     *
     * Available only on the corresponding item target. Shipping option item
     * targets expose shipping option properties; pickup location item targets
     * expose pickup location properties.
     */
    target: SubscribableSignalLike<PickupLocationOption>;
    /**
     * Whether the buyer has selected the target pickup location. When `true`, the target location is the buyer's active choice. When `false`, the buyer has chosen a different pickup location.
     *
     * Available only on the corresponding item target. Shipping option item
     * targets expose shipping option properties; pickup location item targets
     * expose pickup location properties.
     */
    isTargetSelected: SubscribableSignalLike<boolean>;
}
//# sourceMappingURL=pickup-location-item.d.ts.map