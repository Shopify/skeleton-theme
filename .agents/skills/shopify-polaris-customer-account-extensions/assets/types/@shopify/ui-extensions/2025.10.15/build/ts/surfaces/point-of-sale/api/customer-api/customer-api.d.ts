/**
 * The `CustomerApi` object provides access to customer data. Access these properties through `shopify.customer` to interact with the current customer context.
 */
export interface CustomerApi {
    customer: CustomerApiContent;
}
/**
 * The `CustomerApi` object provides access to customer data. Access these properties through `shopify.customer` to interact with the current customer context.
 *
 * @publicDocs
 */
export interface CustomerApiContent {
    /**
     * The unique identifier for the customer. Use for customer lookups, applying customer-specific pricing, enabling personalized features, and integrating with external systems.
     */
    id: number;
}
//# sourceMappingURL=customer-api.d.ts.map