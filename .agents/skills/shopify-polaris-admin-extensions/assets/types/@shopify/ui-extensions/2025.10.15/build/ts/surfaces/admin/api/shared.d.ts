/**
 * The `Data` object provides access to currently viewed or selected resources in the admin context.
 */
export interface Data {
    /**
     * An array of currently viewed or selected resource identifiers. Use this to access the IDs of items in the current context, such as selected products in an index page or the product being viewed on a details page. The available IDs depend on the extension target and user interactions.
     */
    selected: {
        id: string;
    }[];
}
/**
 * The supported [metafield definition types](/docs/apps/build/metafields/list-of-data-types) for storing extension configuration data. Use these types to specify how metafield values should be formatted, validated, and displayed. Types prefixed with `list.` store arrays of values, while other types store single values. Choose a type that matches your data format (for example, use `'number_integer'` for whole numbers, `'single_line_text_field'` for short text, or `'json'` for complex structured data).
 */
export type SupportedDefinitionType = 'boolean' | 'collection_reference' | 'color' | 'date' | 'date_time' | 'dimension' | 'file_reference' | 'json' | 'metaobject_reference' | 'mixed_reference' | 'money' | 'multi_line_text_field' | 'number_decimal' | 'number_integer' | 'page_reference' | 'product_reference' | 'rating' | 'rich_text_field' | 'single_line_text_field' | 'product_taxonomy_value_reference' | 'url' | 'variant_reference' | 'volume' | 'weight' | 'list.collection_reference' | 'list.color' | 'list.date' | 'list.date_time' | 'list.dimension' | 'list.file_reference' | 'list.metaobject_reference' | 'list.mixed_reference' | 'list.number_decimal' | 'list.number_integer' | 'list.page_reference' | 'list.product_reference' | 'list.rating' | 'list.single_line_text_field' | 'list.url' | 'list.variant_reference' | 'list.volume' | 'list.weight';
//# sourceMappingURL=shared.d.ts.map