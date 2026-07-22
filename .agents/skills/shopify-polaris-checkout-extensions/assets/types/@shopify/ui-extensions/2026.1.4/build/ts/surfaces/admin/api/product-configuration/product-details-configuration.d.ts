import type { BlockExtensionApi } from '../block/block';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Data } from '../shared';
/**
 * A product configuration.
 * @deprecated
 */
interface Product {
    /** The product's unique global identifier (GID). */
    id: string;
    /** The product's display name shown to merchants and customers. */
    title: string;
    /** The URL-friendly unique identifier used in product URLs (for example, `'blue-t-shirt'`). */
    handle: string;
    /** The publication status indicating whether the product is active (published), archived (discontinued), or draft (unpublished). */
    status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT';
    /** The total number of variants this product has. */
    totalVariants: number;
    /** The total available inventory summed across all variants and locations. */
    totalInventory: number;
    /** Whether the product has only the default variant with no custom options. When `true`, the product has no size, color, or other option variations. */
    hasOnlyDefaultVariant: boolean;
    /** The URL to view this product on the online store. Use this to create "View in store" links. */
    onlineStoreUrl?: string;
    /** Product options that define how variants differ (for example, Size, Color, Material). Each option has an ID, name, position, and array of possible values. */
    options: {
        id: string;
        name: string;
        position: number;
        values: string[];
    }[];
    /** The product category or type used for organization (for example, "T-Shirt", "Shoes"). */
    productType: string;
    /** The standardized product category taxonomy. Use this for product classification in search and organization. */
    productCategory?: string;
    /** An array of component products that make up this bundle. Each component represents a product included in the bundle configuration. */
    productComponents: ProductComponent[];
}
/**
 * A component product that is part of a bundle. Represents an individual product included in a bundle configuration.
 * @deprecated
 */
export interface ProductComponent {
    /** The component product's unique global identifier (GID). */
    id: string;
    /** The product's display name. Use this to show which product is included in the bundle. */
    title: string;
    /** The featured image displayed for this component product with ID, URL, and alt text properties. Use this for showing component previews in bundle configuration interfaces. */
    featuredImage?: {
        id?: string | null;
        url?: string | null;
        altText?: string | null;
    } | null;
    /** The total number of variants this component product has. Use this to determine if variant selection is needed for this component. */
    totalVariants: number;
    /** The admin URL for this component product. Use this to create links to the product's details page in the admin. */
    productUrl: string;
    /** The count of variants from this product that are used as bundle components. Use this to understand how many variants are configured in bundles. */
    componentVariantsCount: number;
    /** The count of variants from this product that aren't used in any bundles. Use this to identify available variants for adding to bundle configurations. */
    nonComponentVariantsCount: number;
}
/**
 * The `ProductDetailsConfigurationApi` object provides methods for configuring product bundles and relationships. Access the following properties on the `ProductDetailsConfigurationApi` object to build product configuration interfaces.
 *
 * @publicDocs
 */
export interface ProductDetailsConfigurationApi<ExtensionTarget extends AnyExtensionTarget> extends BlockExtensionApi<ExtensionTarget> {
    /** Product configuration data including the current product, selected items, and app URLs. Use this to access the product being configured and build your configuration interface. */
    data: Data & {
        /**
         * The product currently being viewed in the admin.
         * @deprecated
         */
        product: Product;
        /** URLs for launching and navigating to your app, including the launch URL and base application URL. Use these to create links or redirect merchants to your app. */
        app: {
            launchUrl: string;
            applicationUrl: string;
        };
    };
}
export {};
//# sourceMappingURL=product-details-configuration.d.ts.map