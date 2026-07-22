import type { DeliveryGroup, DeliveryGroupDetails, RenderExtensionTarget } from '@shopify/ui-extensions/checkout';
/**
 * Returns the full expanded details of a delivery group and automatically re-renders
 * your component when that delivery group changes.
 */
export declare function useDeliveryGroup<ID extends RenderExtensionTarget = RenderExtensionTarget>(deliveryGroup: DeliveryGroup | undefined): DeliveryGroupDetails | undefined;
//# sourceMappingURL=delivery-group.d.ts.map