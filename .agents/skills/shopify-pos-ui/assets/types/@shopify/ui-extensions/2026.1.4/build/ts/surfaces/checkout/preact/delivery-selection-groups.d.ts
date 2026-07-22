import type { DeliverySelectionGroup } from '../api/shipping/shipping-option-list';
/**
 * Returns the list of delivery selection groups available to the buyers. This hook can only be used by extensions in the following
 * extension targets:
 * - purchase.checkout.shipping-option-list.render-before
 * - purchase.checkout.shipping-option-list.render-after
 * @publicDocs
 */
export declare function useDeliverySelectionGroups(): DeliverySelectionGroup[] | undefined;
//# sourceMappingURL=delivery-selection-groups.d.ts.map