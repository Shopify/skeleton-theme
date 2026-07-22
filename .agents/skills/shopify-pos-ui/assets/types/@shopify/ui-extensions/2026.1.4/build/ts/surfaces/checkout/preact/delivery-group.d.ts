import type { DeliveryGroup, DeliveryGroupDetails } from '../api/standard/standard';
import type { RenderExtensionTarget } from '../extension-targets';
/**
 * Returns the full expanded details of a delivery group and automatically re-renders
 * your component when that delivery group changes.
 * @publicDocs
 */
export declare function useDeliveryGroup<ID extends RenderExtensionTarget = RenderExtensionTarget>(deliveryGroup: DeliveryGroup | undefined): DeliveryGroupDetails | undefined;
//# sourceMappingURL=delivery-group.d.ts.map