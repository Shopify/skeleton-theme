/**
 * A [metafield](/docs/apps/build/metafields) that stores validation function configuration data. Use metafields to persist settings that control how your validation function behaves, such as minimum quantities, restricted shipping zones, or custom validation rules.
 */
interface Metafield {
    /** A human-readable description explaining the metafield's purpose and how it affects validation behavior. Use this to document your settings for other developers. */
    description?: string;
    /** The unique global identifier (GID) for this metafield. Use this ID to reference the metafield in GraphQL queries or updates. */
    id: string;
    /** The namespace that organizes related metafields together. All metafields for a validation should use a consistent namespace to group related settings. */
    namespace: string;
    /** The unique key identifying this metafield within its namespace. This key determines how you access the metafield value (for example, `'min_quantity'` or `'blocked_countries'`). */
    key: string;
    /** The metafield value stored as a string. Parse this value according to the metafield type to use it in your settings UI. */
    value: string;
    /** The metafield [definition type](/docs/apps/build/metafields/list-of-data-types) that specifies the value format and validation rules. Use this to determine how to parse and display the value. */
    type: string;
}
/**
 * A validation configuration that exists and is active in the shop. Use this object to access the validation's current settings and metafields when merchants edit an existing validation.
 */
interface Validation {
    /** The validation's unique global identifier (GID). Use this ID to reference the validation in GraphQL operations or when saving updated settings. */
    id: string;
    /** An array of [metafields](/docs/apps/build/metafields) that store the validation's configuration values. Use these metafields to populate your settings UI with the current validation configuration. */
    metafields: Metafield[];
}
/**
 * A [Shopify Function](/docs/apps/build/functions) that implements cart and checkout validation logic. This identifies which function the settings interface is configuring.
 */
interface ShopifyFunction {
    /** The [Shopify Function's](/docs/apps/build/functions) unique global identifier (GID). Use this ID to associate settings changes with the correct function. */
    id: string;
}
/**
 * The `data` object exposed to validation settings extensions in the `admin.settings.validation.render` target. Use this to access the current validation configuration and populate your settings interface with existing values.
 */
export interface ValidationData {
    /** The validation configuration containing the validation ID and metafields. Present when editing an existing validation, absent when creating a new validation. Use the presence of this value to determine if you're in create or edit mode. */
    validation?: Validation;
    /** The [Shopify Function](/docs/apps/build/functions) that implements the validation logic. Use this ID to associate configuration changes with the correct function. */
    shopifyFunction: ShopifyFunction;
}
export {};
//# sourceMappingURL=launch-options.d.ts.map