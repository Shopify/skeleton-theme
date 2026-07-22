/**
 * The `OrderApi` object provides access to order data in order-specific extension contexts. Access this property through `shopify.order` to retrieve information about the order currently being viewed or interacted with in the POS interface.
 */
export interface OrderApi {
    order: OrderApiContent;
}
/**
 * The `OrderApi` object provides access to order data. Access this property through `shopify.order` to interact with the current order context.
 */
export interface OrderApiContent {
    /**
     * The unique identifier for the order. Use for order lookups, implementing order-specific functionality, and integrating with external systems.
     */
    id: number;
    /**
     * The name of the order as configured by the merchant. Use for order identification, displays, and customer-facing interfaces.
     */
    name: string;
    /**
     * The unique identifier of the customer associated with the order. Returns `undefined` if no customer is associated. Use for customer-specific functionality and personalized experiences.
     */
    customerId?: number;
}
//# sourceMappingURL=order-api.d.ts.map