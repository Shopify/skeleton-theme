/**
 * The `CustomerApi` object provides access to customer data in customer-specific extension contexts. Access this property through `shopify.customer` to retrieve information about the customer currently being viewed or interacted with in the POS interface.
 * @publicDocs
 */
export interface CustomerApi {
    customer: CustomerApiContent;
}
/**
 * The `CustomerApi` object provides customer information for the active context.
 * @publicDocs
 */
export interface CustomerApiContent {
    /**
     * The unique identifier for the customer. Use for customer lookups, applying customer-specific pricing, enabling personalized features, and integrating with external systems.
     */
    id: number;
}
//# sourceMappingURL=customer-api.d.ts.map