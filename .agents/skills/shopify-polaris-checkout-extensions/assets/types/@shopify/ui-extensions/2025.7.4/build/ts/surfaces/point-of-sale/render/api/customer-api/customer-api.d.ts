/**
 * The `CustomerApi` object provides access to customer data in customer-specific extension contexts. Access this property through `shopify.customer` to retrieve information about the customer currently being viewed or interacted with in the POS interface.
 */
export interface CustomerApi {
    customer: CustomerApiContent;
}
export interface CustomerApiContent {
    /**
     * The unique identifier for the customer. Use for customer lookups, applying customer-specific pricing, enabling personalized features, and integrating with external systems.
     */
    id: number;
}
//# sourceMappingURL=customer-api.d.ts.map