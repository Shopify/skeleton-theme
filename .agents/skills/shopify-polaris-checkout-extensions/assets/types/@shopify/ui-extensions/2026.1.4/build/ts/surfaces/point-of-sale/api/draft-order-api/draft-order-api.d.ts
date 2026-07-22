/** @publicDocs */
export interface DraftOrderApi {
    draftOrder: DraftOrderApiContent;
}
/**
 * The `DraftOrderApi` object provides access to draft order data. Access these properties through `api.draftOrder` to interact with the current draft order context.
 *
 * @publicDocs
 */
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