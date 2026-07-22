/**
 * Represents comprehensive product information including metadata, pricing, variants, and availability. Contains all data needed to display and work with products in the POS interface.
 */
export interface Product {
    /**
     * The unique identifier for the product. Use this ID for product-specific operations, API calls, or linking to product details. This ID is consistent across all Shopify systems and can be used for external integrations.
     */
    id: number;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp when the product was created. Use for sorting products by creation date, implementing "new product" features, or tracking product catalog growth over time.
     */
    createdAt: string;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp when the product was last updated. Use for cache invalidation, tracking recent changes, or implementing "recently updated" product features.
     */
    updatedAt: string;
    /**
     * The product's display name as configured by the merchant. Use for product listings, search results, and customer-facing displays. This is the primary product identifier that customers will recognize.
     */
    title: string;
    /**
     * The product's plain text description without HTML formatting. Use for displaying product information in contexts where HTML is not supported or when you need clean text content for processing.
     */
    description: string;
    /**
     * The product's description with HTML formatting preserved. Use when you need to display rich text content with formatting, links, or other HTML elements in your extension interface.
     */
    descriptionHtml: string;
    /**
     * The URL of the product's featured image, if one is set. Returns `undefined` if no featured image is configured. Use for displaying product images in search results, product listings, or detailed product views.
     */
    featuredImage?: string;
    /**
     * Whether this product is a gift card. Gift cards have special handling requirements and different business logic. Use to implement gift card-specific workflows, validation, or display special gift card interfaces.
     */
    isGiftCard: boolean;
    /**
     * Whether inventory tracking is enabled for this product. When `false`, inventory quantities may not be accurate or meaningful. Use to determine whether to display inventory information or implement inventory-based business logic.
     */
    tracksInventory: boolean;
    /**
     * The product's vendor or brand name as configured by the merchant. Use for filtering products by brand, displaying vendor information, or organizing products by supplier.
     */
    vendor: string;
    /**
     * The lowest price among all product variants, formatted as a string. Use for displaying price ranges, implementing price-based filtering, or showing starting prices in product listings.
     */
    minVariantPrice: string;
    /**
     * The highest price among all product variants, formatted as a string. Use for displaying price ranges, implementing price-based filtering, or showing complete pricing information for products with multiple variants.
     */
    maxVariantPrice: string;
    /**
     * The product type category as defined by the merchant (For example, "T-Shirt," "Electronics," "Books"). Use for product categorization, filtering, or implementing category-specific business logic.
     */
    productType: string;
    /**
     * The standardized product category classification. Use for product categorization, implementing category-specific business logic, or organizing products by standardized categories.
     */
    productCategory: string;
    /**
     * An array of tags associated with the product for categorization and organization. Use for product filtering, search enhancement, or implementing tag-based business logic and promotions.
     */
    tags: string[];
    /**
     * The total number of variants available for this product. Use to determine whether to show variant selection interfaces, implement variant-specific logic, or optimize variant loading strategies.
     */
    numVariants: number;
    /**
     * The total available inventory across all variants and locations, if tracking is enabled. Returns `undefined` when inventory tracking is disabled. Use for availability checks, stock level displays, or implementing low-stock alerts.
     */
    totalAvailableInventory?: number;
    /**
     * The total inventory count across all variants and locations for this product. Use for inventory management, stock level displays, or implementing low-stock warnings and alerts.
     */
    totalInventory: number;
    /**
     * An array of all product variants associated with this product. Each variant contains detailed information including pricing, inventory, and options. Use for building variant selectors, displaying inventory information, or implementing variant-specific functionality.
     */
    variants: ProductVariant[];
    /**
     * An array of product options that define available variant configurations. For example, size and color. Each option includes available values. Use for building variant selection interfaces or understanding product configuration possibilities.
     */
    options: ProductOption[];
    /**
     * Whether the product has only a default variant (no custom options). When `true`, the product doesn't require variant selection. Use to simplify product interfaces and skip variant selection steps for single-variant products.
     */
    hasOnlyDefaultVariant: boolean;
    /**
     * Whether the product has any variants currently in stock. Returns `undefined` when inventory information is not available. Use for stock status displays, availability filtering, or implementing out-of-stock product handling.
     */
    hasInStockVariants?: boolean;
    /**
     * The URL of the product on the online store, if available. Returns `undefined` when the product is not published online or the store doesn't have an online presence. Use for linking to online product pages or sharing product information.
     */
    onlineStoreUrl?: string;
    /**
     * Indicates whether this product or line item requires a selling plan (subscription) to be purchased. When `true`, the customer must select a subscription or payment plan before adding to cart. When `false`, the item can be purchased as a one-time purchase without a selling plan.
     */
    requiresSellingPlan?: boolean;
    /**
     * Indicates whether this product or line item has selling plan groups (subscription options) available. When `true`, the product offers subscription or recurring payment options that customers can select. When `false`, the product is only available for one-time purchase without subscription options.
     */
    hasSellingPlanGroups?: boolean;
}
/**
 * Represents a specific variant of a product with its own SKU, price, and inventory. Contains variant-specific attributes including options, availability, and identification data.
 */
export interface ProductVariant {
    /**
     * The unique identifier for the product variant. Use this ID for variant-specific operations, cart additions, or inventory lookups. This ID is consistent across all Shopify systems.
     */
    id: number;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp when the product variant was created. Use for sorting variants by creation date, implementing "new product" features, or tracking product catalog changes over time.
     */
    createdAt: string;
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp when the product variant was last updated. Use for cache invalidation, tracking recent changes, or implementing "recently updated" product features.
     */
    updatedAt: string;
    /**
     * The variant's display title, typically showing the option combinations. For example, `"Large / Blue"`. Use for variant selection interfaces, cart displays, or anywhere users need to distinguish between variants.
     */
    title: string;
    /**
     * The variant's selling price formatted as a string. Use for price displays, cart calculations, or implementing pricing logic. This represents the current selling price for the variant.
     */
    price: string;
    /**
     * The variant's compare-at price (original or MSRP price) formatted as a string, if set. Returns `undefined` when no compare-at price is configured. Use for displaying discounts, sale pricing, or savings calculations.
     */
    compareAtPrice?: string;
    /**
     * Whether this variant is subject to tax calculations. Use for tax computation logic, pricing displays, or implementing tax-exempt product handling.
     */
    taxable: boolean;
    /**
     * The variant's Stock Keeping Unit (SKU) identifier, if configured. Returns `undefined` when no SKU is set. Use for inventory management, product identification, or integration with external systems that use SKU-based tracking.
     */
    sku?: string;
    /**
     * The variant's barcode identifier, if configured. Returns `undefined` when no barcode is set. Use for barcode scanning functionality, inventory tracking, or integration with barcode-based systems.
     */
    barcode?: string;
    /**
     * The variant's formatted display name for user interfaces. This may differ from the title and is optimized for display purposes. Use for customer-facing variant names in product listings, cart items, or receipt displays.
     */
    displayName: string;
    /**
     * The URL of the variant-specific image, if one is configured. Returns `undefined` when no variant image is set. Use for displaying variant-specific images in selection interfaces or product galleries.
     */
    image?: string;
    /**
     * Whether inventory tracking is enabled for this specific variant. When `false`, inventory quantities may not be accurate. Use to determine whether to display inventory information or implement inventory-based business logic for this variant.
     */
    inventoryIsTracked: boolean;
    /**
     * The inventory quantity available at the current POS location, if inventory tracking is enabled. Returns `undefined` when inventory tracking is disabled. Use for location-specific inventory displays, stock availability checks, or local inventory management.
     */
    inventoryAtLocation?: number;
    /**
     * The total inventory quantity across all locations for this variant, if available. Returns `undefined` when this information is not available. Use for comprehensive inventory views, transfer planning, or multi-location inventory management.
     */
    inventoryAtAllLocations?: number;
    /**
     * The inventory policy for this variant, either "DENY" (prevent sales when out of stock) or "CONTINUE" (allow sales when out of stock). Use to implement inventory validation logic and determine whether to allow purchases of out-of-stock items.
     */
    inventoryPolicy: ProductVariantInventoryPolicy;
    /**
     * Whether this variant currently has inventory in stock. Returns `undefined` when inventory information is not available. Use for stock status displays, availability checks, or filtering in-stock variants.
     */
    hasInStockVariants?: boolean;
    /**
     * An array of option name-value pairs that define this variant's configuration. For example, `[{name: "Size," value: "Large"}, {name: "Color," value: "Blue"}]`. Returns `undefined` for products with only default variants. Use for displaying variant options, building variant selectors, or implementing variant-based logic.
     */
    options?: ProductVariantOption[];
    /**
     * Reference to the parent Product object that this variant belongs to. Returns `undefined` in some contexts to avoid circular references. Use when you need access to product-level information from a variant context.
     */
    product?: Product;
    /**
     * The ID of the parent product that this variant belongs to. Use for linking variants back to their parent product, implementing product-level operations, or organizing variants by product.
     */
    productId: number;
    /**
     * The variant's position order within the product's variant list. Use for maintaining consistent variant ordering in selection interfaces or implementing custom variant sorting logic.
     */
    position: number;
}
/**
 * Represents a single option selection for a product variant, showing one chosen value from a product's configuration options. For example, if a product has Size and Color options, a variant might have one option for Size=Large and another for Color=Blue.
 */
export interface ProductVariantOption {
    /**
     * The option category name (for example, "Size", "Color", "Material", "Style", "Flavor"). This is the attribute or dimension along which the product varies. Each product can have up to 3 option names, and each option name can have multiple values. The name is visible to customers in variant selection interfaces. Commonly used for displaying option labels in variant selectors ("Select Size:", "Choose Color:"), building dynamic product configuration UI, or organizing product variations by attribute type.
     */
    name: string;
    /**
     * The selected value for this option that defines this specific variant (for example, "Large", "Blue", "Cotton", "V-Neck"). This is the specific choice from the available option values that characterizes this variant. For example, if `name` is "Size", the `value` might be "Large" or "Small". Values are set at the variant level—each variant has a unique combination of option values. Commonly used for displaying the variant's configuration ("Size: Large, Color: Blue"), building variant selection dropdowns, or matching user selections to variants.
     */
    value: string;
}
/**
 * The inventory policy determining whether sales can continue when a variant has no inventory available:
 * - `'DENY'`: Sales are prevented when inventory reaches zero. Customers can't purchase out-of-stock variants. The "Add to cart" action is disabled or shows "Out of stock". This is the default and recommended policy for most physical products to prevent overselling.
 * - `'CONTINUE'`: Sales are allowed even when inventory is zero or negative. Customers can purchase out-of-stock variants, creating backorders. This enables pre-orders, made-to-order products, or drop-shipped items where inventory tracking is less critical.
 */
export type ProductVariantInventoryPolicy = 'DENY' | 'CONTINUE';
/**
 * Represents a product option definition showing one of the configurable attributes for a product (like Size, Color, Material) along with all the possible values customers can choose from. Products can have up to 3 options.
 */
export interface ProductOption {
    /**
     * The unique numeric identifier for this product option configuration. This ID identifies the option definition itself (not a specific option value or variant). Commonly used for option-specific operations, tracking option configurations, or linking options in external systems.
     */
    id: number;
    /**
     * The option category name (for example, "Size", "Color", "Material", "Style", "Flavor"). This is the attribute or dimension along which the product varies. Each product can have up to 3 option names, and each option name can have multiple values. The name is visible to customers in variant selection interfaces. Commonly used for displaying option labels in variant selectors ("Select Size:", "Choose Color:"), building dynamic product configuration UI, or organizing product variations by attribute type.
     */
    name: string;
    /**
     * An array of all available values for this option that customers can choose from (for example, `["Small", "Medium", "Large", "X-Large"]` for a Size option, or `["Red", "Blue", "Green", "Black"]` for a Color option). The order of values in this array typically represents the display order in variant selectors. Each combination of option values across all options creates a unique variant. For example, a product with Size: [Small, Large] and Color: [Red, Blue] would have 4 variants (Small/Red, Small/Blue, Large/Red, Large/Blue). Commonly used for building variant selection dropdowns, radio buttons, or swatches, validating user selections, or displaying all available choices for an attribute.
     */
    optionValues: string[];
    /**
     * The unique numeric identifier of the parent product to which this option belongs. This links the option definition back to the product it configures. Commonly used for linking options to their parent product, organizing options by product, or implementing product-level option management.
     */
    productId: number;
}
//# sourceMappingURL=product.d.ts.map