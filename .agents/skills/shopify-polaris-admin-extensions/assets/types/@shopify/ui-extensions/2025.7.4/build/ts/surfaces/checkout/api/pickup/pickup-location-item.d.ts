import type { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
import type { PickupLocationOption } from '../standard/standard';
export interface PickupLocationItemApi {
    /**
     * The pickup location the extension is attached to.
     */
    target: StatefulRemoteSubscribable<PickupLocationOption>;
    /**
     * Whether the pickup location is currently selected.
     */
    isTargetSelected: StatefulRemoteSubscribable<boolean>;
}
//# sourceMappingURL=pickup-location-item.d.ts.map