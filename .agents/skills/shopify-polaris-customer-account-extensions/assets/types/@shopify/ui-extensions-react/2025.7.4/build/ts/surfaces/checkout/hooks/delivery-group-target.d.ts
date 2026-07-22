import type { DeliveryGroup } from '@shopify/ui-extensions/checkout';
/**
 * Returns the delivery group the extension is attached to. This hook can only be used by extensions in the following
 * extension targets:
 * - purchase.checkout.shipping-option-list.render-before
 * - purchase.checkout.shipping-option-list.render-after
 *
 * > Caution: Deprecated as of version `2024-07`, use `useDeliveryGroupListTarget()` instead.
 *
 * @deprecated Deprecated as of version `2024-07`, use `useDeliveryGroupListTarget()` instead.
 */
export declare function useDeliveryGroupTarget(): DeliveryGroup | undefined;
//# sourceMappingURL=delivery-group-target.d.ts.map