/**
 * The `DraftOrderApi` object provides access to draft order data in draft order-specific extension contexts. Access this property through `shopify.draftOrder` to retrieve information about the draft order currently being viewed or interacted with in the POS interface.
 */
export interface DraftOrderApi {
    draftOrder: DraftOrderApiContent;
}
export interface DraftOrderApiContent {
    /**
     * The unique identifier for the draft order. Use for draft order lookups, implementing order-specific functionality, and integrating with external systems.
     */
    id: number;
    /**
     * The name of the draft order as configured by the merchant. Use for draft order identification, displays, and customer-facing interfaces.
     */
    name: string;
    /**
     * The unique identifier of the customer associated with the draft order. Returns `undefined` if no customer is associated. Use for customer-specific functionality and personalized experiences.
     */
    customerId?: number;
}
//# sourceMappingURL=draft-order-api.d.ts.map