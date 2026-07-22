import type { SubscribableSignalLike } from '../../shared';
/** @publicDocs */
export interface OrderConfirmation {
    order: {
        /**
         * A globally unique identifier for the order. This becomes the
         * [`Order`](https://shopify.dev/docs/api/admin-graphql/latest/objects/Order) object ID in the
         * GraphQL Admin API after the order is created.
         *
         * @example 'gid://shopify/Order/123'
         */
        id: string;
    };
    /**
     * A randomly generated alpha-numeric identifier for the order, distinct
     * from `order.id`. The value is `undefined` for orders that were created
     * before this field was introduced. All recent orders have a number.
     *
     * Optional. Might not be present for orders created before 2024.
     */
    number?: string;
    /**
     * Whether this is the customer's first completed order with this shop. `true` means the buyer hasn't placed an order here before. Use this to show first-purchase messaging or trigger welcome offers.
     */
    isFirstOrder: boolean;
}
/** @publicDocs */
export interface OrderConfirmationApi {
    /**
     * The order details available after the buyer completes checkout, including the order ID, order number, and whether it's the buyer's first purchase.
     */
    orderConfirmation: SubscribableSignalLike<OrderConfirmation>;
}
//# sourceMappingURL=order-confirmation.d.ts.map