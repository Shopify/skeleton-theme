/**
 * Reserved namespace and key for the customer standard metafield used in the template's query.
 * More info - https://shopify.dev/docs/apps/custom-data/metafields/definitions/standard
 */
type CustomerStandardMetafieldDependency = 'facts.birth_date';
export interface CustomerSegmentTemplateProps {
    /**
     * The localized title of the template.
     */
    title: string;
    /**
     * The localized description of the template. An array can be used for multiple paragraphs.
     */
    description: string | string[];
    /**
     * The code snippet to render in the template with syntax highlighting. The `query` is not validated in the template.
     */
    query: string;
    /**
     * The code snippet to insert in the segment editor. If missing, `query` will be used. The `queryToInsert` is not validated in the template.
     */
    queryToInsert?: string;
    /**
     * The list of customer standard metafields or custom metafields used in the template's query.
     */
    dependencies?: {
        standardMetafields?: CustomerStandardMetafieldDependency[];
        customMetafields?: string[];
    };
    /**
     * ISO 8601-encoded date and time string. A "New" badge will be rendered for templates introduced in the last month.
     */
    createdOn?: string;
}
/**
 * Customer segmentation templates are used to give merchants a starting point to create segments.
 */
export declare const CustomerSegmentTemplate: "CustomerSegmentTemplate" & {
    readonly type?: "CustomerSegmentTemplate" | undefined;
    readonly props?: CustomerSegmentTemplateProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=CustomerSegmentTemplate.d.ts.map