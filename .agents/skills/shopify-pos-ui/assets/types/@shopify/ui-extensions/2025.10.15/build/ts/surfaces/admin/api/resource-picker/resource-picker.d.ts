/**
 * A monetary value represented as a string (for example, `"19.99"` or `"0.00"`). The format always includes the decimal point and cents, even for whole dollar amounts. Use this type for prices, costs, and other currency values.
 */
type Money = string;
/**
 * The sort order that determines how products appear in a collection. This controls the default product arrangement that customers see when viewing the collection on the storefront.
 */
declare enum CollectionSortOrder {
    /** Products arranged in the custom order set by the merchant. Use this when merchants have manually organized products for specific merchandising. */
    Manual = "MANUAL",
    /** Products sorted by sales volume, with best-sellers first. Use this to highlight popular products. */
    BestSelling = "BEST_SELLING",
    /** Products sorted alphabetically by title from A to Z. Use this for easy browsing of product names. */
    AlphaAsc = "ALPHA_ASC",
    /** Products sorted alphabetically by title from Z to A. Use this for reverse alphabetical ordering. */
    AlphaDesc = "ALPHA_DESC",
    /** Products sorted by price from highest to lowest. Use this to show premium or expensive items first. */
    PriceDesc = "PRICE_DESC",
    /** Products sorted by price from lowest to highest. Use this to show affordable options first. */
    PriceAsc = "PRICE_ASC",
    /** Products sorted by creation date with newest products first. Use this to highlight recently added items. */
    CreatedDesc = "CREATED_DESC",
    /** Products sorted by creation date with oldest products first. Use this for chronological ordering. */
    Created = "CREATED",
    /** Products sorted by search relevance based on query terms. Use this when the collection is filtered by search. */
    MostRelevant = "MOST_RELEVANT"
}
/**
 * The types of fulfillment services that can handle order fulfillment. This determines how products are delivered to customers.
 */
declare enum FulfillmentServiceType {
    /** Digital gift card fulfillment with automatic delivery. No physical shipping required. */
    GiftCard = "GIFT_CARD",
    /** Manual fulfillment handled directly by the merchant. The merchant packs and ships orders themselves. */
    Manual = "MANUAL",
    /** Third-party fulfillment service that handles warehousing and shipping (for example, ShipBob, Amazon FBA, or custom 3PL providers). */
    ThirdParty = "THIRD_PARTY"
}
/**
 * The unit of measurement for product weight. Use this with the weight value to calculate shipping costs or display product specifications.
 */
declare enum WeightUnit {
    /** Weight measured in kilograms (kg). Commonly used in metric system countries. */
    Kilograms = "KILOGRAMS",
    /** Weight measured in grams (g). Used for lightweight items in metric system. */
    Grams = "GRAMS",
    /** Weight measured in pounds (lb). Commonly used in the United States. */
    Pounds = "POUNDS",
    /** Weight measured in ounces (oz). Used for lightweight items in imperial system. */
    Ounces = "OUNCES"
}
/**
 * The inventory policy that determines whether customers can purchase a variant when it's out of stock. Use this to control checkout behavior for low or zero inventory items.
 */
declare enum ProductVariantInventoryPolicy {
    /** Prevents purchases when inventory reaches zero. Customers can't add out-of-stock variants to their cart. Use this to avoid overselling. */
    Deny = "DENY",
    /** Allows purchases even when inventory is zero or negative. Customers can continue buying out-of-stock variants. Use this for backorders or made-to-order products. */
    Continue = "CONTINUE"
}
/**
 * The system responsible for tracking inventory levels for a variant. This determines where stock counts are managed and updated.
 */
declare enum ProductVariantInventoryManagement {
    /** Inventory tracked and managed by Shopify. Stock levels update through Shopify admin or API. Use this for standard inventory management. */
    Shopify = "SHOPIFY",
    /** Inventory not tracked. The variant is always considered in stock. Use this for services, digital goods, or custom products with unlimited availability. */
    NotManaged = "NOT_MANAGED",
    /** Inventory tracked by an external fulfillment service. The third-party system manages stock levels. Use this when a 3PL or fulfillment app controls inventory. */
    FulfillmentService = "FULFILLMENT_SERVICE"
}
/**
 * The publication status indicating a product's availability state. Use this to filter products or determine which products customers can see and purchase.
 */
declare enum ProductStatus {
    /** The product is published and available for sale on active sales channels. Customers can view and purchase this product. */
    Active = "ACTIVE",
    /** The product is archived and no longer available. Archived products don't appear on storefronts and can't be purchased. Use this for discontinued items. */
    Archived = "ARCHIVED",
    /** The product is an unpublished draft not visible to customers. Draft products are still being prepared or reviewed. */
    Draft = "DRAFT"
}
/**
 * An image associated with a product, variant, or collection. Use image data to display thumbnails, galleries, or product previews in your extension.
 */
interface ResourceImage {
    /** The unique identifier for the image file. Use this ID for image-related GraphQL operations. */
    id: string;
    /** Alternative text describing the image for screen readers and accessibility. This text appears when images fail to load. Use descriptive alt text to make your extension accessible. */
    altText?: string;
    /** The full URL to the original image file. Use this URL to display the image in your extension UI. */
    originalSrc: string;
}
/**
 * The base resource structure with a unique identifier.
 */
interface Resource {
    /** The resource identifier in GraphQL global ID format (for example, `gid://shopify/Product/123`). */
    id: string;
}
/**
 * A resource structure that can optionally include associated variants. Use this type for specifying preselected items in the resource picker when you need to include variant selections.
 */
interface BaseResource extends Resource {
    /** An array of variant resources to preselect along with the main resource. Only applicable when the main resource is a product that has variants you want to preselect. */
    variants?: Resource[];
}
/**
 * A single rule that defines product inclusion criteria for an automated collection. Rules filter products based on their attributes to automatically populate a collection.
 */
interface CollectionRule {
    /** The product field to evaluate (for example, `'title'`, `'tag'`, `'vendor'`, or `'product_type'`). This determines which product attribute the rule checks. */
    column: string;
    /** The value to compare against. For example, if checking tags, this might be `'summer'` or `'featured'`. The product attribute must match this condition value according to the relation. */
    condition: string;
    /** The comparison operator that determines how the field is matched (for example, `'equals'`, `'contains'`, `'starts_with'`, `'ends_with'`, `'not_equals'`). This defines the matching logic between the column and condition. */
    relation: string;
}
/**
 * A set of rules that determine which products are automatically included in a collection. Use this to understand how an automated collection populates itself with products.
 */
interface RuleSet {
    /** The logical operator for combining multiple rules. When `true`, products are included if they match ANY rule (OR logic). When `false`, products must match ALL rules (AND logic). Use this to understand the collection's filtering strategy. */
    appliedDisjunctively: boolean;
    /** An array of rules that define product inclusion criteria. Each rule checks a different product attribute. Products are added to the collection based on how these rules are combined (see `appliedDisjunctively`). */
    rules: CollectionRule[];
}
/**
 * A collection resource selected from the resource picker. Collections are groups of products organized by manual curation or automated rules. Use collection data to access product groupings, organizational information, and collection metadata.
 */
interface Collection extends Resource {
    /** The number of sales channels where this collection can be published. Use this to understand the collection's potential reach across different storefronts. */
    availablePublicationCount: number;
    /** The collection description as plain text without HTML formatting. Use this when you need the description without markup. */
    description: string;
    /** The collection description formatted as HTML. Use this to display rich text descriptions with formatting and styling in your UI. */
    descriptionHtml: string;
    /** The URL-friendly unique identifier used in collection URLs (for example, `'summer-collection'` in `/collections/summer-collection`). Use this to generate collection links or match URL paths. */
    handle: string;
    /** The collection's unique global identifier (GID). Use this ID for collection-related GraphQL operations. */
    id: string;
    /** The featured image displayed for the collection. Use this for collection thumbnails, headers, or preview images. */
    image?: ResourceImage | null;
    /** The count of products automatically added to the collection based on automation rules. Use this to understand how many products match the collection's criteria. */
    productsAutomaticallySortedCount: number;
    /** The total number of products in the collection, including both manually added and automatically included products. Use this to show collection size or for pagination. */
    productsCount: number;
    /** The count of products manually added by the merchant. Use this to understand how much manual curation the collection has. */
    productsManuallySortedCount: number;
    /** The number of sales channels where the collection is currently published. Use this to check the collection's actual visibility across storefronts. */
    publicationCount: number;
    /** The automation rules that determine which products are automatically included. Present only for automated (smart) collections. When `null`, the collection is manually curated. Use this to understand the collection's filtering logic. */
    ruleSet?: RuleSet | null;
    /** Search engine optimization metadata for the collection. Use this to understand how the collection appears in search engine results. */
    seo: {
        /** The SEO meta description that appears in search engine result snippets. This summarizes the collection for search engines. */
        description?: string | null;
        /** The SEO page title that appears in browser tabs and search results. When `null`, the collection's regular title is used. */
        title?: string | null;
    };
    /** The default sort order that determines how products are arranged in the collection. This controls the product sequence customers see on the storefront. */
    sortOrder: CollectionSortOrder;
    /** The Storefront API identifier for this collection. Use this ID when making Storefront API queries for this collection. */
    storefrontId: string;
    /** The theme template suffix for using custom theme templates (for example, `'featured'` to use `collection.featured.liquid`). When `null`, uses the default collection template. */
    templateSuffix?: string | null;
    /** The collection's display name shown to merchants and customers. Use this as the primary collection identifier in lists and displays. */
    title: string;
    /** ISO 8601 timestamp when the collection was last updated. Use this to track changes, sync with external systems, or show freshness indicators. */
    updatedAt: string;
}
/**
 * A product variant resource selected from the resource picker. Product variants represent specific combinations of product options (for example, a t-shirt in size Medium and color Blue). Use variant data to access pricing, inventory, and option-specific information.
 */
interface ProductVariant extends Resource {
    /** Whether the variant is currently available for purchase. When `false`, the variant can't be added to orders even if inventory exists. Use this to check if customers can buy this variant. */
    availableForSale: boolean;
    /** The barcode, UPC, or ISBN number for the variant. Use this to scan products, integrate with inventory systems, or match physical products to Shopify data. */
    barcode?: string | null;
    /** The original price before any discounts or markdowns. When present, indicates the variant is on sale and can be displayed as a "compare at" or "was" price to show savings. */
    compareAtPrice?: Money | null;
    /** ISO 8601 timestamp when the variant was first created. Use this to track when products were added to the catalog or sort variants by creation date. */
    createdAt: string;
    /** A human-readable display name that combines the product title with the variant's option values (for example, "T-Shirt - Medium / Blue"). Use this for displaying the complete variant identity in lists or UI. */
    displayName: string;
    /** The fulfillment service responsible for handling orders of this variant. Use this to determine how the product is fulfilled (manual, third-party, or gift card). */
    fulfillmentService?: {
        /** The unique identifier for the fulfillment service. */
        id: string;
        /** Whether this service tracks and manages inventory levels. When `true`, the service controls stock counts. */
        inventoryManagement: boolean;
        /** Whether fulfillment is product-based (fulfills specific products) or location-based (fulfills from specific warehouses). */
        productBased: boolean;
        /** The display name of the fulfillment service (for example, "Amazon Fulfillment" or "Manual"). */
        serviceName: string;
        /** The type of fulfillment service determining how orders are processed. */
        type: FulfillmentServiceType;
    };
    /** The image displayed for this variant. When present, shows variant-specific imagery instead of the product's default image. Use this for displaying variant previews. */
    image?: ResourceImage | null;
    /** A reference to the inventory item that tracks stock levels for this variant. Use this ID for inventory-related GraphQL operations. */
    inventoryItem: {
        id: string;
    };
    /** How inventory is tracked for this variant. Determines whether Shopify, a fulfillment service, or no system tracks stock levels. */
    inventoryManagement: ProductVariantInventoryManagement;
    /** Whether to allow purchases when inventory is unavailable. When set to continue, customers can buy out-of-stock variants. When set to deny, purchases are blocked when stock is zero. */
    inventoryPolicy: ProductVariantInventoryPolicy;
    /** The total available inventory quantity summed across all locations. Use this for at-a-glance stock checks, though individual location quantities may vary. */
    inventoryQuantity?: number | null;
    /** The display position of this variant in the product's variant list. Lower numbers appear first. Use this to maintain variant ordering in your UI. */
    position: number;
    /** The current selling price for this variant. This is the amount customers pay before any checkout-level discounts. */
    price: Money;
    /** The parent product that this variant belongs to. Contains partial product data for accessing product-level information without a separate query. */
    product: Partial<Product>;
    /** Whether this variant requires physical shipping. When `false`, the variant is digital or doesn't need delivery (for example, gift cards, digital downloads, or services). */
    requiresShipping: boolean;
    /** The option values that define this specific variant (for example, `[{value: "Large"}, {value: "Blue"}]` for size and color). The array order matches the product's option definitions. */
    selectedOptions: {
        value?: string | null;
    }[];
    /** The Stock Keeping Unit (SKU) identifier for inventory tracking and order management. Use this to match variants with warehouse systems, barcodes, or fulfillment data. */
    sku?: string | null;
    /** Whether this variant is taxable. When `true`, applicable taxes are calculated at checkout based on the customer's location and tax rules. */
    taxable: boolean;
    /** The display name showing only the variant's option values (for example, "Medium / Blue" without the product title). Use this when the product name is already displayed. */
    title: string;
    /** The physical weight of the variant. Use this for calculating shipping costs or determining fulfillment requirements. */
    weight?: number | null;
    /** The unit of measurement for the weight value (kilograms, grams, pounds, or ounces). */
    weightUnit: WeightUnit;
    /** ISO 8601 timestamp when the variant was last updated. Use this to track changes or sync with external systems. */
    updatedAt: string;
}
/**
 * A product resource selected from the resource picker. Products are the items sold in a Shopify store and can have multiple variants representing different options (like size or color). Use product data to access titles, descriptions, images, pricing, and variant information.
 */
interface Product extends Resource {
    /** The number of sales channels where this product can be published. Use this to understand the product's potential reach across different storefronts. */
    availablePublicationCount: number;
    /** ISO 8601 timestamp when the product was first created in the catalog. Use this to track product age or sort by creation date. */
    createdAt: string;
    /** The product description formatted as HTML. Use this to display rich text descriptions with formatting, links, and styling in your UI. */
    descriptionHtml: string;
    /** The URL-friendly unique identifier used in product URLs (for example, `'blue-t-shirt'` in `/products/blue-t-shirt`). Use this to generate product links or match URL paths. */
    handle: string;
    /** Whether the product has only the default variant with no custom options. When `true`, the product has no size, color, or other option variations. Use this to simplify UI for single-variant products. */
    hasOnlyDefaultVariant: boolean;
    /** An array of images associated with the product. The first image typically serves as the main product image. Use these for displaying product galleries or thumbnails. */
    images: ResourceImage[];
    /** Product options that define how variants differ (for example, Size, Color, Material). Each option can have multiple values that combine to create unique variants. */
    options: {
        /** The unique identifier for this option. */
        id: string;
        /** The display name for this option (for example, "Size", "Color", "Material"). Use this as a label when showing variant choices. */
        name: string;
        /** The display order position. Lower numbers appear first when showing options to merchants or customers. */
        position: number;
        /** An array of available values for this option (for example, `["Small", "Medium", "Large"]` for a Size option). Use these to build variant selection interfaces. */
        values: string[];
    }[];
    /** The product category or type used for organization and filtering (for example, "T-Shirt", "Shoes", "Electronics"). Use this to group similar products or filter catalogs. */
    productType: string;
    /** ISO 8601 timestamp when the product was first published to a sales channel. When `null`, the product has never been published. Use this to identify draft products or track publishing history. */
    publishedAt?: string | null;
    /** An array of tags for categorizing and filtering products (for example, `["summer", "sale", "featured"]`). Use tags for custom organization, filtering, or search functionality. */
    tags: string[];
    /** The theme template suffix for using custom theme templates (for example, `'alternate'` to use `product.alternate.liquid`). When `null`, uses the default product template. */
    templateSuffix?: string | null;
    /** The product's display name shown to merchants and customers. Use this as the primary product identifier in lists and displays. */
    title: string;
    /** The total available inventory summed across all variants and locations. Use this for at-a-glance stock checks, though individual variant quantities may vary. */
    totalInventory: number;
    /** The total number of variants this product has. Use this to determine if the product has multiple options or only the default variant. */
    totalVariants: number;
    /** Whether inventory levels are tracked for this product. When `false`, the product is always considered in stock regardless of quantity. */
    tracksInventory: boolean;
    /** An array of all product variants. Each variant represents a unique combination of option values. Contains partial variant data for accessing variant-level information. */
    variants: Partial<ProductVariant>[];
    /** The brand or manufacturer name. Use this for filtering by brand, displaying brand information, or organizing products by vendor. */
    vendor: string;
    /** ISO 8601 timestamp when the product was last updated. Use this to track changes, sync with external systems, or show freshness indicators. */
    updatedAt: string;
    /** The publication status indicating whether the product is active (published), archived (discontinued), or draft (unpublished). Use this to filter products by availability state. */
    status: ProductStatus;
}
/**
 * Map of resource type identifiers to their corresponding resource interfaces.
 */
interface ResourceTypes {
    product: Product;
    variant: ProductVariant;
    collection: Collection;
}
/**
 * Extracts the resource interface for a given resource type.
 */
type ResourceSelection<Type extends keyof ResourceTypes> = ResourceTypes[Type];
/**
 * Wraps a type with a deprecated selection property for backward compatibility.
 */
type WithSelection<T> = T & {
    /**
     * @private
     * @deprecated Use the outer array directly instead.
     */
    selection: T;
};
/**
 * The payload returned when resources are selected from the picker.
 */
type SelectPayload<Type extends keyof ResourceTypes> = WithSelection<ResourceSelection<Type>[]>;
/**
 * Filter options that control which resources appear in the resource picker. Use filters to restrict the available resources based on publication status, resource type, or custom search criteria.
 */
interface Filters {
    /**
     * Whether to include products that aren't published on any sales channels. When `false`, only products published to at least one sales channel appear in the picker. Use this to ensure merchants only select products that customers can purchase.
     * @defaultValue true
     */
    hidden?: boolean;
    /**
     * Whether to show product variants in the picker. When `false`, merchants can only select products, not individual variants. Only applies when `type` is `'product'`. Use this to simplify selection when you only need product-level data.
     * @defaultValue true
     */
    variants?: boolean;
    /**
     * Whether to include draft products in the picker. When `false`, draft products are hidden. When `undefined`, draft products appear with a draft badge. Only applies when `type` is `'product'`. Use this to prevent selecting products that aren't ready for use.
     * @defaultValue true
     */
    draft?: boolean | undefined;
    /**
     * Whether to include archived products in the picker. When `false`, archived products are hidden. When `undefined`, archived products appear with an archived badge. Only applies when `type` is `'product'`. Use this to prevent selecting discontinued products.
     * @defaultValue true
     */
    archived?: boolean | undefined;
    /**
     * A GraphQL search query that filters the available resources without showing the query in the picker's search bar. Merchants won't see or edit this filter. See [search syntax](https://shopify.dev/docs/api/usage/search-syntax) for the query format. Use this to programmatically restrict resources based on attributes like tags, vendor, or product type (for example, `"tag:featured"` or `"vendor:Acme"`).
     */
    query?: string;
}
/**
 * The `ResourcePickerOptions` object defines how the resource picker behaves, including which resource type to display, selection limits, filters, and preselected items. Access the following properties on the `ResourcePickerOptions` object to configure the resource picker's appearance and functionality.
 * @publicDocs
 */
export interface ResourcePickerOptions {
    /**
     * The type of Shopify resource to select: `'product'` for products, `'variant'` for specific product variants, or `'collection'` for collections. This determines what appears in the picker and what data structure is returned.
     */
    type: 'product' | 'variant' | 'collection';
    /**
     * The action verb that appears in the picker's title and primary button. Use `'add'` for actions that add new items (for example, "Add products") or `'select'` for choosing existing items (for example, "Select products"). This helps merchants understand the picker's purpose.
     * @defaultValue 'add'
     */
    action?: 'add' | 'select';
    /**
     * Filtering options that control which resources appear in the picker. Use filters to restrict resources by publication status, include or exclude variants, or apply custom search criteria. This helps merchants find relevant items faster.
     */
    filter?: Filters;
    /**
     * The selection mode for the picker. Pass `true` to allow unlimited selections, `false` for single-item selection only, or a number to set a maximum selection limit (for example, `5` allows up to five items). When `type` is `'product'`, merchants can still select multiple variants from a single product even if `multiple` is `false`.
     * @defaultValue false
     */
    multiple?: boolean | number;
    /**
     * An initial search query that appears in the picker's search bar when it opens. Merchants can see and edit this query. See [search syntax](https://shopify.dev/docs/api/usage/search-syntax) for the query format. For most use cases, use `filter.query` instead, which filters results without exposing the query to merchants.
     * @defaultValue ''
     */
    query?: string;
    /**
     * Resources that should be preselected when the picker opens. Pass an array of resource objects with IDs (and optional variant IDs) to show which items are already selected. Merchants can deselect these preselected items. Use this to show current selections or default choices.
     * @defaultValue []
     */
    selectionIds?: BaseResource[];
}
/**
 * Opens the resource picker modal for selecting products, variants, or collections. Returns the selected resources when the user confirms their selection, or undefined if they cancel.
 * @publicDocs
 */
export type ResourcePickerApi = (options: ResourcePickerOptions) => Promise<SelectPayload<ResourcePickerOptions['type']> | undefined>;
export {};
//# sourceMappingURL=resource-picker.d.ts.map