/**
 * A [metafield](/docs/apps/build/metafields) that stores discount function configuration data. Use metafields to persist settings that control how your discount function behaves, such as discount thresholds, eligibility rules, or custom discount logic parameters.
 */
interface Metafield {
    /** A human-readable description explaining the metafield's purpose and how it affects discount behavior. Use this to document your settings for other developers. */
    description?: string;
    /** The unique global identifier (GID) for this metafield. Use this ID to reference the metafield in GraphQL queries or updates. */
    id: string;
    /** The namespace that organizes related metafields together. All metafields for a discount should use a consistent namespace to group related settings. */
    namespace: string;
    /** The unique key identifying this metafield within its namespace. This key determines how you access the metafield value (for example, `'min_purchase_amount'` or `'eligible_customer_tags'`). */
    key: string;
    /** The metafield value stored as a string. Parse this value according to the metafield type to use it in your settings UI. */
    value: string;
    /** The metafield [definition type](/docs/apps/build/metafields/list-of-data-types) that specifies the value format and validation rules. Use this to determine how to parse and display the value. */
    type: string;
}
/**
 * The discount class that determines where the discount applies in the purchase flow. Use this to understand what type of discount the merchant is configuring (product-level, order-level, or shipping).
 */
export declare enum DiscountClass {
    /** The discount applies to specific products or product variants. Use this for discounts that reduce the price of individual line items (for example, "20% off selected products"). */
    Product = "PRODUCT",
    /** The discount applies to the entire order total. Use this for cart-wide discounts that reduce the subtotal (for example, "$10 off orders over $50"). */
    Order = "ORDER",
    /** The discount applies to shipping costs. Use this for free shipping or reduced shipping rate discounts (for example, "Free shipping on orders over $100"). */
    Shipping = "SHIPPING"
}
/**
 * A discount that is being configured by the merchant. Use this to access the discount's unique identifier when saving configuration changes or making GraphQL queries.
 */
interface Discount {
    /** The discount's unique global identifier (GID) in the [GraphQL Admin API](/docs/api/admin-graphql) format (for example, `gid://shopify/DiscountAutomaticApp/123`). Use this ID to associate settings with the correct discount or query discount data. */
    id: string;
}
/**
 * The `data` object exposed to discount function settings extensions in the `admin.discount-details.function-settings.render` target. Use this to access the current discount configuration and populate your settings interface with existing values.
 */
export interface DiscountFunctionSettingsData {
    /** The discount being configured by the merchant. Use this ID to associate configuration changes with the correct discount. */
    id: Discount;
    /** An array of [metafields](/docs/apps/build/metafields) that store the discount function's configuration values. Use these metafields to populate your settings UI with the current discount configuration and display existing settings to merchants. */
    metafields: Metafield[];
}
export {};
//# sourceMappingURL=launch-options.d.ts.map