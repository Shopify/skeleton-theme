import type { BlockExtensionApi } from '../block/block';
import type { ExtensionTarget as AnyExtensionTarget } from '../../extension-targets';
import type { Data } from '../shared';
/**
 * A product variant configuration.
 * @deprecated
 */
interface ProductVariant {
    /** The variant's unique global identifier (GID). */
    id: string;
    /** The Stock Keeping Unit (SKU) identifier for inventory tracking. */
    sku: string;
    /** The barcode, UPC, or ISBN number for the variant. */
    barcode: string;
    /** The display name showing only the variant's option values (for example, "Medium / Blue"). */
    title: string;
    /** A human-readable display name that combines the product title with the variant's option values (for example, "T-Shirt - Medium / Blue"). */
    displayName: string;
    /** The current selling price for this variant. */
    price: string;
    /** The original price before any discounts or markdowns. */
    compareAtPrice: string;
    /** Whether this variant is subject to taxes. When `true`, applicable taxes are calculated at checkout. */
    taxable: boolean;
    /** The harmonized system (HS) tax code for international shipping and customs. */
    taxCode: string;
    /** The physical weight of the variant as a number. */
    weight: number;
    /** The option values that define this specific variant with name and value pairs (for example, Size: Large, Color: Blue). */
    selectedOptions: {
        name: string;
        value: string;
    }[];
    /** An array of component variants that make up this bundle variant. Each component represents a product variant included in the bundle. */
    productVariantComponents: ProductVariantComponent[];
}
/**
 * A component variant that is part of a product bundle. Represents an individual product variant included in a bundle configuration.
 * @deprecated
 */
export interface ProductVariantComponent {
    /** The component variant's unique global identifier (GID). */
    id: string;
    /** A human-readable display name that combines the product title with the variant's option values (for example, "T-Shirt - Medium / Blue"). */
    displayName: string;
    /** The display name showing only the variant's option values (for example, "Medium / Blue"). */
    title: string;
    /** The Stock Keeping Unit (SKU) identifier for this component variant. */
    sku?: string;
    /** The image displayed for this component variant with ID, URL, and alt text properties. Use this for showing component previews in bundle configuration interfaces. */
    image?: {
        id?: string | null;
        url?: string | null;
        altText?: string | null;
    } | null;
    /** The admin URL for this product variant. Use this to create links to the variant's details page in the admin. */
    productVariantUrl: string;
    /** The option values that define this specific component variant with name and value pairs (for example, Size: Large, Color: Blue). */
    selectedOptions: {
        name: string;
        value: string;
    }[];
}
/**
 * The `ProductVariantDetailsConfigurationApi` object provides methods for configuring product variant bundles and relationships. Access the following properties on the `ProductVariantDetailsConfigurationApi` object to build variant configuration interfaces.
 * @publicDocs
 */
export interface ProductVariantDetailsConfigurationApi<ExtensionTarget extends AnyExtensionTarget> extends BlockExtensionApi<ExtensionTarget> {
    /** Product variant configuration data including the current variant, selected items, and app URLs. Use this to access the variant being configured and build your configuration interface. */
    data: Data & {
        /**
         * The product variant currently being viewed in the admin.
         * @deprecated
         */
        variant: ProductVariant;
        /** URLs for launching and navigating to your app, including the launch URL and base application URL. Use these to create links or redirect merchants to your app. */
        app: {
            launchUrl: string;
            applicationUrl: string;
        };
    };
}
export {};
//# sourceMappingURL=product-variant-details-configuration.d.ts.map