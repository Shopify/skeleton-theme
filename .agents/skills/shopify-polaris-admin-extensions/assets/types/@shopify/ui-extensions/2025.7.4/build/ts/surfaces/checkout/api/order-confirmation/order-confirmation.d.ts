import type { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
export interface OrderConfirmation {
    order: {
        /**
         * The globally-uniqueID of the OrderConfirmation. This will be the ID of the Order once successfully created.
         */
        id: string;
    };
    /**
     * A randomly generated alpha-numeric identifier for the order.
     * For orders created in 2024 and onwards, the number will always be present. For orders created before that date, the number might not be present.
     */
    number?: string;
    /**
     * Whether this is the customer's first order.
     */
    isFirstOrder: boolean;
}
export interface OrderConfirmationApi {
    /**
     * Order information that's available post-checkout.
     */
    orderConfirmation: StatefulRemoteSubscribable<OrderConfirmation>;
}
//# sourceMappingURL=order-confirmation.d.ts.map