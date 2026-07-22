import type { StandardApi } from '../standard/standard';
import type { I18n } from '../../../../api';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
/**
 * The `CustomerSegmentTemplateApi` object provides methods for creating customer segment templates. Access the following properties on the `CustomerSegmentTemplateApi` object to build templates with translated content.
 * @publicDocs
 */
export interface CustomerSegmentTemplateApi<ExtensionTarget extends AnyExtensionTarget> extends StandardApi<ExtensionTarget> {
    /** Utilities for translating template content into the merchant's language. */
    i18n: I18n;
    /** @private */
    __enabledFeatures: string[];
}
/**
 * Standard customer metafields that can be referenced as template dependencies.
 */
export type CustomerStandardMetafieldDependency = 'facts.birth_date';
/**
 * Defines a customer segment template that merchants can use to create targeted customer groups.
 */
export interface CustomerSegmentTemplate {
    /**
     * The template title in the merchant's language.
     */
    title: string;
    /**
     * The template description in the merchant's language. Use an array for multiple paragraphs.
     */
    description: string | string[];
    /**
     * The segment query code to display in the template with syntax highlighting. This code is shown to merchants but not validated. Test your queries in the Shopify admin segment editor before including them in templates.
     */
    query: string;
    /**
     * The segment query code to insert when the merchant selects this template. If omitted, the `query` value is used instead. This code is inserted into the editor but not validated. Test your queries in the Shopify admin segment editor before including them in templates.
     */
    queryToInsert: string;
    /**
     * Customer metafields required by this template's query. Declare dependencies so the admin can guide merchants to set up required metafields before using the template.
     */
    dependencies?: {
        /** Standard Shopify customer metafields used in the query. */
        standardMetafields?: CustomerStandardMetafieldDependency[];
        /** Custom [metafield](/docs/apps/build/metafields) definitions used in the query. */
        customMetafields?: string[];
    };
    /**
     * The creation date in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. Templates created within the last month display a "New" badge.
     */
    createdOn: string;
}
//# sourceMappingURL=customer-segment-template.d.ts.map