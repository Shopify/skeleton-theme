import type { SubscribableSignalLike } from '../../shared';
import type { DeliveryGroup, DeliveryGroupType, DeliveryOptionReference, Money } from '../standard/standard';
/** @publicDocs */
export interface ShippingOptionListApi {
    /**
     * The delivery group list that this extension is attached to. Use this to access all delivery groups and their options. The value is `undefined` when there aren't any delivery groups for the given type.
     */
    target: SubscribableSignalLike<DeliveryGroupList | undefined>;
    /**
     * The list of delivery selection groups available to the buyer, which let buyers choose between grouped delivery options. The value is `undefined` when no selection groups are available.
     */
    deliverySelectionGroups: SubscribableSignalLike<DeliverySelectionGroup[] | undefined>;
}
/**
 * A collection of delivery groups that share the same group type.
 * @publicDocs
 */
export interface DeliveryGroupList {
    /**
     * The type of delivery groups in this list. This is the same `DeliveryGroupType` used on `DeliveryGroup.groupType`.
     *
     * - `'oneTimePurchase'`: Items bought as a single, non-recurring purchase.
     * - `'subscription'`: Items bought through a [selling plan](https://shopify.dev/docs/apps/build/purchase-options/subscriptions) that results in recurring deliveries.
     */
    groupType: DeliveryGroupType;
    /**
     * The delivery groups in this list. Each group contains cart lines and available delivery options for those items.
     */
    deliveryGroups: DeliveryGroup[];
}
/**
 * A named group of delivery options that the buyer can select as a unit.
 * @publicDocs
 */
export interface DeliverySelectionGroup {
    /**
     * A unique identifier for this selection group.
     */
    handle: string;
    /**
     * Whether the buyer has selected this delivery selection group. When `true`, the associated delivery options are active. When `false`, the buyer has selected a different group.
     */
    selected: boolean;
    /**
     * The localized display title of this selection group, suitable for rendering in the checkout UI.
     */
    title: string;
    /**
     * The delivery options that belong to this selection group. Each reference's `handle` matches a delivery option handle in the associated delivery group.
     */
    associatedDeliveryOptions: DeliveryOptionReference[];
    /**
     * The combined cost of all delivery options in this group before discounts.
     */
    cost: Money;
    /**
     * The combined cost of all delivery options in this group after discounts have been applied. This is what the buyer actually pays.
     */
    costAfterDiscounts: Money;
}
//# sourceMappingURL=shipping-option-list.d.ts.map