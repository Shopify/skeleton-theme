declare const supportedDefinitionTypes: readonly ["boolean", "collection_reference", "color", "date", "date_time", "dimension", "file_reference", "json", "metaobject_reference", "mixed_reference", "money", "multi_line_text_field", "number_decimal", "number_integer", "page_reference", "product_reference", "rating", "rich_text_field", "single_line_text_field", "product_taxonomy_value_reference", "url", "variant_reference", "volume", "weight", "list.collection_reference", "list.color", "list.date", "list.date_time", "list.dimension", "list.file_reference", "list.metaobject_reference", "list.mixed_reference", "list.number_decimal", "list.number_integer", "list.page_reference", "list.product_reference", "list.rating", "list.single_line_text_field", "list.url", "list.variant_reference", "list.volume", "list.weight"];
interface MetafieldUpdateChange {
    type: 'updateMetafield';
    key: string;
    namespace?: string;
    value: string | number;
    valueType?: SupportedDefinitionType;
}
interface MetafieldRemoveChange {
    type: 'removeMetafield';
    key: string;
    namespace: string;
}
type MetafieldsChange = MetafieldUpdateChange | MetafieldRemoveChange | MetafieldUpdateChange[] | MetafieldRemoveChange[];
export type SupportedDefinitionType = (typeof supportedDefinitionTypes)[number];
export type ApplyMetafieldsChange = (changes: MetafieldsChange[]) => void;
export {};
//# sourceMappingURL=metafields.d.ts.map