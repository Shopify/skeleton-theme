type Money = string;
declare enum CollectionSortOrder {
    Manual = "MANUAL",
    BestSelling = "BEST_SELLING",
    AlphaAsc = "ALPHA_ASC",
    AlphaDesc = "ALPHA_DESC",
    PriceDesc = "PRICE_DESC",
    PriceAsc = "PRICE_ASC",
    CreatedDesc = "CREATED_DESC",
    Created = "CREATED",
    MostRelevant = "MOST_RELEVANT"
}
declare enum FulfillmentServiceType {
    GiftCard = "GIFT_CARD",
    Manual = "MANUAL",
    ThirdParty = "THIRD_PARTY"
}
declare enum WeightUnit {
    Kilograms = "KILOGRAMS",
    Grams = "GRAMS",
    Pounds = "POUNDS",
    Ounces = "OUNCES"
}
declare enum ProductVariantInventoryPolicy {
    Deny = "DENY",
    Continue = "CONTINUE"
}
declare enum ProductVariantInventoryManagement {
    Shopify = "SHOPIFY",
    NotManaged = "NOT_MANAGED",
    FulfillmentService = "FULFILLMENT_SERVICE"
}
declare enum ProductStatus {
    Active = "ACTIVE",
    Archived = "ARCHIVED",
    Draft = "DRAFT"
}
interface Image {
    id: string;
    altText?: string;
    originalSrc: string;
}
interface Resource {
    /** in GraphQL id format, ie 'gid://shopify/Product/1' */
    id: string;
}
interface BaseResource extends Resource {
    variants?: Resource[];
}
interface CollectionRule {
    column: string;
    condition: string;
    relation: string;
}
interface RuleSet {
    appliedDisjunctively: boolean;
    rules: CollectionRule[];
}
interface Collection extends Resource {
    availablePublicationCount: number;
    description: string;
    descriptionHtml: string;
    handle: string;
    id: string;
    image?: Image | null;
    productsAutomaticallySortedCount: number;
    productsCount: number;
    productsManuallySortedCount: number;
    publicationCount: number;
    ruleSet?: RuleSet | null;
    seo: {
        description?: string | null;
        title?: string | null;
    };
    sortOrder: CollectionSortOrder;
    storefrontId: string;
    templateSuffix?: string | null;
    title: string;
    updatedAt: string;
}
interface ProductVariant extends Resource {
    availableForSale: boolean;
    barcode?: string | null;
    compareAtPrice?: Money | null;
    createdAt: string;
    displayName: string;
    fulfillmentService?: {
        id: string;
        inventoryManagement: boolean;
        productBased: boolean;
        serviceName: string;
        type: FulfillmentServiceType;
    };
    image?: Image | null;
    inventoryItem: {
        id: string;
    };
    inventoryManagement: ProductVariantInventoryManagement;
    inventoryPolicy: ProductVariantInventoryPolicy;
    inventoryQuantity?: number | null;
    position: number;
    price: Money;
    product: Partial<Product>;
    requiresShipping: boolean;
    selectedOptions: {
        value?: string | null;
    }[];
    sku?: string | null;
    taxable: boolean;
    title: string;
    weight?: number | null;
    weightUnit: WeightUnit;
    updatedAt: string;
}
interface Product extends Resource {
    availablePublicationCount: number;
    createdAt: string;
    descriptionHtml: string;
    handle: string;
    hasOnlyDefaultVariant: boolean;
    images: Image[];
    options: {
        id: string;
        name: string;
        position: number;
        values: string[];
    }[];
    productType: string;
    publishedAt?: string | null;
    tags: string[];
    templateSuffix?: string | null;
    title: string;
    totalInventory: number;
    totalVariants: number;
    tracksInventory: boolean;
    variants: Partial<ProductVariant>[];
    vendor: string;
    updatedAt: string;
    status: ProductStatus;
}
interface ResourceTypes {
    product: Product;
    variant: ProductVariant;
    collection: Collection;
}
type ResourceSelection<Type extends keyof ResourceTypes> = ResourceTypes[Type];
type WithSelection<T> = T & {
    /**
     * @private
     * @deprecated
     */
    selection: T;
};
type SelectPayload<Type extends keyof ResourceTypes> = WithSelection<ResourceSelection<Type>[]>;
interface Filters {
    /**
     * Whether to show hidden resources, referring to products that are not published on any sales channels.
     * @defaultValue true
     */
    hidden?: boolean;
    /**
     * Whether to show product variants. Only applies to the Product resource type picker.
     * @defaultValue true
     */
    variants?: boolean;
    /**
     * Whether to show [draft products](https://help.shopify.com/en/manual/products/details?shpxid=70af7d87-E0F2-4973-8B09-B972AAF0ADFD#product-availability).
     * Only applies to the Product resource type picker.
     * Setting this to undefined will show a badge on draft products.
     * @defaultValue true
     */
    draft?: boolean | undefined;
    /**
     * Whether to show [archived products](https://help.shopify.com/en/manual/products/details?shpxid=70af7d87-E0F2-4973-8B09-B972AAF0ADFD#product-availability).
     * Only applies to the Product resource type picker.
     * Setting this to undefined will show a badge on draft products.
     * @defaultValue true
     */
    archived?: boolean | undefined;
    /**
     * GraphQL initial search query for filtering resources available in the picker.
     * See [search syntax](https://shopify.dev/docs/api/usage/search-syntax) for more information.
     * This is not displayed in the search bar when the picker is opened.
     */
    query?: string;
}
export interface ResourcePickerOptions {
    /**
     * The type of resource you want to pick.
     */
    type: 'product' | 'variant' | 'collection';
    /**
     *  The action verb appears in the title and as the primary action of the Resource Picker.
     * @defaultValue 'add'
     */
    action?: 'add' | 'select';
    /**
     * Filters for what resource to show.
     */
    filter?: Filters;
    /**
     * Whether to allow selecting multiple items of a specific type or not. If a number is provided, then limit the selections to a maximum of that number of items. When type is Product, the user may still select multiple variants of a single product, even if multiple is false.
     * @defaultValue false
     */
    multiple?: boolean | number;
    /**
     * GraphQL initial search query for filtering resources available in the picker. See [search syntax](https://shopify.dev/docs/api/usage/search-syntax) for more information.
     * This is displayed in the search bar when the picker is opened and can be edited by users.
     * For most use cases, you should use the `filter.query` option instead which doesn't show the query in the UI.
     * @defaultValue ''
     */
    query?: string;
    /**
     * Resources that should be preselected when the picker is opened.
     * @defaultValue []
     */
    selectionIds?: BaseResource[];
}
export type ResourcePickerApi = (options: ResourcePickerOptions) => Promise<SelectPayload<ResourcePickerOptions['type']> | undefined>;
export {};
//# sourceMappingURL=resource-picker.d.ts.map