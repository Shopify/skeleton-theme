/**
 * The `ProductApi` object provides access to product and variant data in product-specific extension contexts. Access this property through `shopify.product` to retrieve information about the product or variant currently being viewed or interacted with in the POS interface.
 * @publicDocs
 */
export interface ProductApi {
    product: ProductApiContent;
}
/**
 * The `ProductApi` object provides product and variant details for the active context.
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