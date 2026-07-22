import type { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
/**
 * Information about an order that was placed.
 */
export interface Order {
    /**
     * A globally-unique identifier.
     * @example 'gid://shopify/Order/1'
     */
    id: string;
    /**
     * Unique identifier for the order that appears on the order.
     * @example '#1000'
     */
    name: string;
    /**
     * If cancelled, the time at which the order was cancelled.
     */
    cancelledAt?: string;
    /**
     * The date and time when the order was processed.
     * Processing happens after the checkout has completed, and indicates that the order is available in the admin.
     */
    processedAt?: string;
    /**
     * A randomly generated alpha-numeric identifier for the order.
     * For orders created in 2024 and onwards, the number will always be present. For orders created before that date, the number might not be present.
     */
    confirmationNumber?: string;
}
export interface OrderStatusApi {
    /**
     * Order information that's available post-checkout.
     */
    order: StatefulRemoteSubscribable<Order | undefined>;
}
//# sourceMappingURL=order-status.d.ts.map