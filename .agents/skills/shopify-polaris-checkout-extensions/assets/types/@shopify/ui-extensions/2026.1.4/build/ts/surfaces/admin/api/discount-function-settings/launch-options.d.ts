import type { ReadonlySignalLike, UpdateSignalFunction } from '../../../../shared';
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
export type DiscountClass = 'product' | 'order' | 'shipping';
/**
 * The method used to apply a discount. Use `'automatic'` for discounts that apply automatically at checkout, or `'code'` for discounts that require a code entered by the customer.
 */
type DiscountMethod = 'automatic' | 'code';
/**
 * The `data` object exposed to discount function settings extensions in the `admin.discount-details.function-settings.render` target. Use this to access the current discount configuration and populate your settings interface with existing values.
 *
 * @publicDocs
 */
export interface DiscountFunctionSettingsData {
    /** The discount's unique global identifier (GID) in the [GraphQL Admin API](/docs/api/admin-graphql) format (for example, `gid://shopify/DiscountAutomaticApp/123`). Use this ID to associate settings with the correct discount or query discount data. */
    id: string;
    /** An array of [metafields](/docs/apps/build/metafields) that store the discount function's configuration values. Use these metafields to populate your settings UI with the current discount configuration and display existing settings to merchants. */
    metafields: Metafield[];
}
/**
 * The `DiscountsApi` object provides reactive access to discount configuration. Use the signals to read discount classes and method, and the update function to change which parts of the purchase (products, order, or shipping) the discount affects.
 */
export interface DiscountsApi {
    /**
     * A signal that contains the discount classes (Product, Order, or Shipping). Read this to determine where the discount applies in the purchase flow. A discount can apply to multiple classes simultaneously.
     */
    discountClasses: ReadonlySignalLike<DiscountClass[]>;
    /**
     * A function that updates the discount classes to change where the discount applies. Call this function with an array of `DiscountClass` values to set which parts of the purchase (products, order total, or shipping) the discount affects.
     */
    updateDiscountClasses: UpdateSignalFunction<DiscountClass[]>;
    /**
     * A signal that contains the discount method (`'automatic'` or `'code'`). Read this to determine whether the discount applies automatically at checkout or requires a customer-entered code.
     */
    discountMethod: ReadonlySignalLike<DiscountMethod>;
}
export {};
//# sourceMappingURL=launch-options.d.ts.map