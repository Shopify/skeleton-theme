import type { RenderExtensionTarget } from '../extension-targets';
import type { DeliveryGroup } from '../api/standard/standard';
/**
 * Returns the current delivery groups for the checkout, and automatically re-renders
 * your component when delivery address or delivery option selection changes.
 * @publicDocs
 */
export declare function useDeliveryGroups<Target extends RenderExtensionTarget = RenderExtensionTarget>(): DeliveryGroup[];
//# sourceMappingURL=delivery-groups.d.ts.map