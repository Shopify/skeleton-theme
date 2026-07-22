declare const supportedDefinitionTypes: readonly ["boolean", "collection_reference", "color", "date", "date_time", "dimension", "file_reference", "json", "metaobject_reference", "mixed_reference", "money", "multi_line_text_field", "number_decimal", "number_integer", "page_reference", "product_reference", "rating", "rich_text_field", "single_line_text_field", "product_taxonomy_value_reference", "url", "variant_reference", "volume", "weight", "list.collection_reference", "list.color", "list.date", "list.date_time", "list.dimension", "list.file_reference", "list.metaobject_reference", "list.mixed_reference", "list.number_decimal", "list.number_integer", "list.page_reference", "list.product_reference", "list.rating", "list.single_line_text_field", "list.url", "list.variant_reference", "list.volume", "list.weight"];
/**
 * A metafield update or creation operation. Use this to set or modify metafield values that store order routing rule configuration data.
 */
interface MetafieldUpdateChange {
    /** Identifies this as an update operation. Always set to `'updateMetafield'` for updates. */
    type: 'updateMetafield';
    /** The unique key identifying the metafield within its namespace. Use descriptive keys that indicate the setting's purpose (for example, `'preferred_location'` or `'routing_priority'`). */
    key: string;
    /** The namespace that organizes related metafields. When omitted, a default namespace is assigned. Use consistent namespaces to group related settings. */
    namespace?: string;
    /** The metafield value to store. Can be a string or number depending on your configuration needs. */
    value: string | number;
    /** The [data type](/docs/apps/build/metafields/list-of-data-types) that defines how the value is formatted and validated. When omitted, preserves the existing type for updates or uses a default for new metafields. Choose a type that matches your value format. */
    valueType?: SupportedDefinitionType;
}
/**
 * A metafield removal operation. Use this to delete metafields that are no longer needed for your order routing rule configuration.
 */
interface MetafieldRemoveChange {
    /** Identifies this as a removal operation. Always set to `'removeMetafield'` for deletions. */
    type: 'removeMetafield';
    /** The unique key of the metafield to remove. Must match the key used when the metafield was created. */
    key: string;
    /** The namespace containing the metafield to remove. Required to ensure the correct metafield is targeted, as the same key can exist in different namespaces. */
    namespace: string;
}
/**
 * One or more metafield change operations to apply to order routing rule settings. Can be a single change or an array of changes for batch operations. Use arrays to apply multiple changes at once.
 */
type MetafieldsChange = MetafieldUpdateChange | MetafieldRemoveChange | MetafieldUpdateChange[] | MetafieldRemoveChange[];
/**
 * The supported [metafield definition types](/docs/apps/build/metafields/list-of-data-types) for storing order routing rule configuration data. Use these types to specify how metafield values should be formatted, validated, and displayed. Types prefixed with `list.` store arrays of values, while other types store single values.
 */
export type SupportedDefinitionType = (typeof supportedDefinitionTypes)[number];
/**
 * A function that applies metafield changes to order routing rule settings. Call this function with one or more change operations to update or remove metafields in batch. Use batch operations to apply multiple configuration changes efficiently.
 */
export type ApplyMetafieldsChange = (changes: MetafieldsChange[]) => void;
export {};
//# sourceMappingURL=metafields.d.ts.map