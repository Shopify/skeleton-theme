/** @publicDocs */
export interface ProductApi {
    product: ProductApiContent;
}
/**
 * The `ProductApi` object provides access to product data. Access these properties through `shopify.product` to interact with the current product context.
 *
 * @publicDocs
 */
export interface ProductApiContent {
    /**
     * The unique identifier for the product. Use for product lookups, implementing product-specific functionality, and integrating with external systems.
     */
    id: number;
    /**
     * The unique identifier for the product variant. Use for variant-specific operations, cart additions, and inventory management.
     */
    variantId: number;
}
//# sourceMappingURL=product-api.d.ts.map