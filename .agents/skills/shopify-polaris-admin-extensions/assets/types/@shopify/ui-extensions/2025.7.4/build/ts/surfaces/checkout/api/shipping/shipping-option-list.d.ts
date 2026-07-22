import type { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
import type { DeliveryGroup, DeliveryGroupType, DeliveryOptionReference, Money } from '../standard/standard';
export interface ShippingOptionListApi {
    /**
     * The delivery group list the extension is attached to. The target will be undefined when there are no groups for a given type.
     */
    target: StatefulRemoteSubscribable<DeliveryGroupList | undefined>;
    /**
     * The list of selection groups available to the buyers. The property will be undefined when no such groups are available.
     */
    deliverySelectionGroups: StatefulRemoteSubscribable<DeliverySelectionGroup[] | undefined>;
}
/**
 * The delivery group list the extension is associated to.
 */
export interface DeliveryGroupList {
    /**
     * The group type of the delivery group list.
     */
    groupType: DeliveryGroupType;
    /**
     * The delivery groups that compose this list.
     */
    deliveryGroups: DeliveryGroup[];
}
/**
 * A selection group for delivery options.
 */
export interface DeliverySelectionGroup {
    /**
     * The handle of the selection group.
     */
    handle: string;
    /**
     * If the selection group is selected.
     */
    selected: boolean;
    /**
     * The localized title of the selection group.
     */
    title: string;
    /**
     * The associated delivery option handles with the selection group. The handles will match the delivery group's delivery option handles.
     */
    associatedDeliveryOptions: DeliveryOptionReference[];
    /**
     * The sum of each delivery option's cost.
     */
    cost: Money;
    /**
     * The sum of each delivery option's cost after discounts.
     */
    costAfterDiscounts: Money;
}
//# sourceMappingURL=shipping-option-list.d.ts.map