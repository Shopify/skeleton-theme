import type { StandardSchemaV1 } from '@standard-schema/spec';

/**
 * The availability status of a theme app block or embed.
 * - 'active': Block/embed is currently present in a theme.
 * - 'available': Block/embed exists but is not currently active
 * - 'unavailable': Block/embed exists but is disabled (e.g., via available_if condition)
 *
 * Note that if a block is present in a theme but is not available, its status will be 'unavailable'.
 */
type ActivationStatus = 'active' | 'available' | 'unavailable';

interface Address {
    /**
     * The customer's primary address.
     */
    address1?: string;
    /**
     * Any extra information associated with the address (Apartment #, Suite #, Unit #, etc.).
     */
    address2?: string;
    /**
     * The name of the customer's city.
     */
    city?: string;
    /**
     * The company name associated with address.
     */
    company?: string;
    /**
     * The first name of the customer.
     */
    firstName?: string;
    /**
     * 	The last name of the customer.
     */
    lastName?: string;
    /**
     * The phone number of the customer.
     */
    phone?: string;
    /**
     * The province or state of the address.
     */
    province?: string;
    /**
     * The country of the address.
     */
    country?: string;
    /**
     * The ZIP or postal code of the address.
     */
    zip?: string;
    /**
     * The name of the address.
     */
    name?: string;
    /**
     * The acronym of the province or state.
     */
    provinceCode?: string;
    /**
     * The Country Code in ISO 3166-1 (alpha-2) format.
     */
    countryCode?: string;
}

interface AdminUser {
    /**
     * The account access level of the logged-in user
     */
    accountAccess?: string;
}

/**
 * This API interface provides methods to retrieve app and extension status information.
 */
interface AppApi {
    /**
     * The list of extensions from the current app.
     * @returns A promise that resolves to the array of ExtensionInfo containing extension status information.
     *
     * This array may be empty if the app has no extensions.
     *
     * @throws {Error} When the App API is not available or the request fails.
     */
    extensions(): Promise<ExtensionInfo[]>;
}

export interface AppBridgeAttributes {
}

interface AppBridgeConfig {
    /**
     * The client ID provided for your application in the Partner Dashboard.
     *
     * This needs to be provided by the app developer.
     */
    apiKey: string;
    /**
     * An allowlist of origins that your app can send authenticated fetch requests to.
     *
     * This is useful if your app needs to make authenticated requests to a different domain that you control.
     */
    appOrigins?: string[];
    /**
     * Configuration options for enabling debug features within the app.
     * Includes options for monitoring performance metrics, such as web vitals.
     *
     * Recommended for use during development and debugging to aid in identifying and resolving performance issues.
     *
     * Generally not recommended for long-term use in production environments.
     *
     */
    debug?: DebugOptions;
    /**
     * The features to disable in your app.
     *
     * This allows app developers to opt-out of features such as <code>fetch</code>.
     */
    disabledFeatures?: string[];
    /**
     * The experimental features to enable in your app.
     *
     * This allows app developers to opt-in to experiement features.
     */
    experimentalFeatures?: string[];
    /**
     * The base64-encoded host of the shop that's embedding your app.
     *
     * This does not need to be provided by the app developer.
     */
    host?: string;
    /**
     * The locale of the shop that's embedding your app.
     *
     * This does not need to be provided by the app developer.
     * @defaultValue 'en-US'
     */
    locale?: string;
    /**
     * The shop origin of the shop that's embedding your app.
     *
     * This does not need to be provided by the app developer.
     */
    shop?: string;
}

export interface AppBridgeElements {
    'ui-modal': UIModalAttributes;
    's-app-window': SAppWindowAttributes;
    'ui-nav-menu': UINavMenuAttributes;
    's-app-nav': SAppNavAttributes;
    'ui-save-bar': UISaveBarAttributes;
    'ui-title-bar': UITitleBarAttributes;
    's-page': SPageAttributes;
}

export type AugmentedElement<T extends keyof AugmentedElements> = AugmentedElements[T];

export interface AugmentedElements {
    button: MenuItemProperties;
    a: MenuItemProperties;
}

interface Badge {
    content: string;
    tone?: Tone;
    progress?: Progress;
}

interface BaseElementAttributes {
    id?: string;
    name?: string;
    class?: string;
    href?: string;
    rel?: string;
    target?: string;
    onclick?: string;
    children?: string;
}

interface BaseResource extends Resource {
    variants?: Resource[];
}

interface Cart {
    /**
     * 	The total cost of the current cart including discounts, but before taxes and shipping. Value is based on the shop's existing currency settings.
     */
    subTotal: string;
    /**
     * The sum of taxes for the current cart. Value is based on the shop's existing currency settings.
     */
    taxTotal: string;
    /**
     * The total cost of the current cart, after taxes and discounts have been applied. Value is based on the shop's existing currency settings.
     */
    grandTotal: string;
    /**
     * The current discount applied to the entire cart.
     */
    cartDiscount?: Discount;
    /**
     * All current discounts applied to the entire cart and line items.
     */
    cartDiscounts?: Discount[];
    /**
     * The customer associated to the current cart.
     */
    customer?: Customer;
    /**
     * A list of lineItem objects.
     */
    lineItems: LineItem[];
    /**
     * A list of objects containing cart properties.
     */
    properties: Record<string, string>;
}

/**
 * Callback to execute when cart updates.
 */
type CartSubscriber = (cart: Cart) => void;

/**
 * User dismissed or closed the workflow without completing it.
 */
interface ClosedIntentResponse {
    code?: 'closed';
}

export interface Collection extends Resource {
    availablePublicationCount: number;
    description: string;
    descriptionHtml: string;
    handle: string;
    id: string;
    image?: Image_2 | null;
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

interface CollectionRule {
    column: string;
    condition: string;
    relation: string;
}

enum CollectionSortOrder {
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

interface Customer {
    /**
     * The ID of existing customer.
     */
    id: number;
    /**
     * The email for a new customer.
     */
    email?: string;
    /**
     * The first name for new customer.
     */
    firstName?: string;
    /**
     * The last name for new customer.
     */
    lastName?: string;
    /**
     * The note for new customer.
     */
    note?: string;
}

interface CustomSale {
    /**
     * Price of line item
     */
    price: number;
    /**
     * Quantity of line item.
     */
    quantity: number;
    /**
     * Title of line item.
     */
    title: string;
    /**
     * If line item charges tax.
     */
    taxable: boolean;
}

type DataPoint = string | number | undefined;

interface DebugOptions {
    /**
     * Enables or disables the logging of web performance metrics (Web Vitals) in the browser's console.
     *
     * When set to `true`, the app will log Core Web Vitals (such as LCP, INP, and CLS) and other relevant performance metrics to help developers understand the real-world performance of their app. This can be useful for debugging performance issues during development or in a staging environment.
     *
     * This field is optional and defaults to `false`, meaning that web vitals logging is disabled by default to avoid performance overhead and unnecessary console output in production environments.
     * @defaultValue false
     */
    webVitals?: boolean;
}

interface Device {
    /**
     * The name of the device.
     */
    name: string;
    /**
     * The unique ID associated device ID and app ID..
     */
    serialNumber: string;
}

interface Discount {
    /**
     * Amount of discount. Only for fixed or percentage discounts.
     */
    amount: number;
    /**
     * Description of discount.
     */
    discountDescription?: string;
    /**
     * Type of discount.
     */
    type: DiscountType;
}

type DiscountType = 'Percentage' | 'FixedAmount';

interface EnvironmentApi extends Required<_EnvironmentApi> {
}

interface _EnvironmentApi {
    /**
     * Whether the app is running on Shopify Mobile.
     */
    mobile?: boolean;
    /**
     * Whether the app is embedded in the Shopify admin.
     */
    embedded?: boolean;
    /**
     * Whether the app is running on Shopify POS.
     */
    pos?: boolean;
}

/**
 * Failed intent completion.
 */
interface ErrorIntentResponse {
    code?: 'error';
    message?: string;
    issues?: StandardSchemaV1.Issue[];
}

/**
 * Contains the status information for the App's extension.
 * This includes the extension's handle, activation targets, status, and type.
 *
 * @typeParam Type - The extension type, either 'ui_extension' or 'theme_app_extension'.
 *   When specified, the `activations` field will be typed accordingly:
 *   - `ExtensionInfo<'ui_extension'>` has `activations: UiExtensionActivation[]`
 *   - `ExtensionInfo<'theme_app_extension'>` has `activations: ThemeExtensionActivation[]`
 */
interface ExtensionInfo<Type extends ExtensionType = ExtensionType> {
    /**
     * The unique identifier for the extension.
     */
    handle: string;
    /**
     * List of activation records for the extension.
     * The shape depends on the extension type:
     * - UI extensions have activations with only `target`
     * - Theme app extensions have nested activations representing blocks/embeds
     */
    activations: Type extends 'ui_extension' ? UiExtensionActivation[] : Type extends 'theme_app_extension' ? ThemeExtensionActivation[] : never;
    /**
     * The type of the extension.
     */
    type: Type;
}

/**
 * The type of extension.
 * - 'ui_extension' for checkout and customer account extensions
 * - 'theme_app_extension' for theme app extensions (blocks and embeds)
 */
type ExtensionType = 'ui_extension' | 'theme_app_extension';

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

type Finish = (data?: any) => void;

enum FulfillmentServiceType {
    GiftCard = "GIFT_CARD",
    Manual = "MANUAL",
    ThirdParty = "THIRD_PARTY"
}

interface Header {
    /**
     * The content to display in the table column header.
     */
    content?: string;
    /**
     * The type of data to display in the column. The type is used to format the data in the column.
     * If the type is 'number', the data in the column will be right-aligned, this should be used when referencing currency or numeric values.
     * If the type is 'string', the data in the column will be left-aligned.
     * @defaultValue 'string'
     */
    type?: 'string' | 'number';
}

/**
 * Asynchronously returns an ID token.
 * @returns A Promise that resolves to an ID token.
 */
type IdTokenApi = () => Promise<string>;

interface Image_2 {
    id: string;
    altText?: string;
    originalSrc: string;
}

interface Intent {
    readonly action: string;
    readonly type: string;
    readonly data: {
        [key: string]: any;
    };
    finish: Finish;
}

/**
 * The action to perform on a resource.
 */
type IntentAction = 'create' | 'edit';

/**
 * Activity handle for tracking intent workflow progress.
 */
interface IntentActivity {
    /**
     * A Promise that resolves when the intent workflow completes, returning the response.
     */
    complete?: Promise<IntentResponse>;
}

interface IntentQuery extends IntentQueryOptions {
    action: IntentAction;
    type: IntentType;
}

/**
 * Options for invoking intents when using the query string format.
 */
interface IntentQueryOptions {
    /**
     * The resource identifier for edit actions (e.g., 'gid://shopify/Product/123').
     */
    value?: string;
    /**
     * Additional data required for certain intent types.
     * For example:
     * - Discount creation requires { type: 'amount-off-product' | 'amount-off-order' | 'buy-x-get-y' | 'free-shipping' }
     * - ProductVariant creation requires { productId: 'gid://shopify/Product/123' }
     * - Metaobject creation requires { type: 'shopify--color-pattern' }
     */
    data?: {
        [key: string]: unknown;
    };
}

/**
 * Result of an intent activity.
 * Discriminated union representing all possible completion outcomes.
 */
type IntentResponse = ClosedIntentResponse | SuccessIntentResponse | ErrorIntentResponse;

interface IntentsApi extends PublicIntentsApi {
    register(callback: (intent: Intent) => void): () => void;
}

/**
 * Supported resource types that can be targeted by intents.
 */
type IntentType = 'shopify/Article' | 'shopify/Catalog' | 'shopify/Collection' | 'shopify/Customer' | 'shopify/Discount' | 'shopify/Market' | 'shopify/Menu' | 'shopify/MetafieldDefinition' | 'shopify/Metaobject' | 'shopify/MetaobjectDefinition' | 'shopify/Page' | 'shopify/Product' | 'shopify/ProductVariant';

interface LineItem {
    /**
     * Unique id of line item
     */
    uuid: string;
    /**
     * Price of line item
     */
    price?: number;
    /**
     * Quantity of line item.
     */
    quantity: number;
    /**
     * Title of line item.
     */
    title?: string;
    /**
     * Variant identifier for line item.
     */
    variantId?: number;
    /**
     * Product identifier for line item.
     */
    productId?: number;
    /**
     * Discount applied to line item.
     */
    discounts: Discount[];
    /**
     * If line item charges tax.
     */
    taxable: boolean;
    /**
     * Stock keeping unit of the line item.
     */
    sku?: string;
    /**
     * Vendor of line item.
     */
    vendor?: string;
    /**
     * Properties of the line item.
     */
    properties: {
        [key: string]: string;
    };
    /**
     * If the line item is a gift card.
     */
    isGiftCard: boolean;
}

/**
 * The `Loading` API provides a method to toggle the loading indicator in the Shopify admin.
 * @param isLoading - An optional boolean parameter. If `true`, the loading indicator is shown. If `false` or omitted, the loading indicator is hidden.
 */
type LoadingApi = (isLoading?: boolean) => void;

interface Location_2 {
    /**
     * The ID of current location.
     */
    id: number;
    /**
     * The status of current location.
     */
    active: boolean;
    /**
     * The name of current location.
     */
    name: string;
    /**
     * The type of current location.
     */
    locationType?: string;
    /**
     * The primary address of current location.
     */
    address1?: string;
    /**
     * Any extra information associated with the address (Apartment #, Suite #, Unit #, etc.).
     */
    address2?: string;
    /**
     * The ZIP or postal code of the address.
     */
    zip?: string;
    /**
     * The name of the city.
     */
    city?: string;
    /**
     * TThe province or state of the address.
     */
    province?: string;
    /**
     * The Country Code in ISO 3166-1 (alpha-2) format.
     */
    countryCode?: string;
    /**
     * The country of the address.
     */
    countryName?: string;
    /**
     * 	The phone number of the location.
     */
    phone?: string;
}

export interface MenuItemProperties {
    variant?: 'primary' | 'breadcrumb' | null | undefined;
    tone?: 'critical' | 'default';
    disabled?: boolean;
    loading?: boolean | string;
}

interface ModalApi extends Required<_ModalApi> {
}

interface _ModalApi {
    /**
     * Shows the modal element. An alternative to the `show` instance method on the `ui-modal` element.
     * @param id A unique identifier for the Modal
     */
    show?(id: string): Promise<void>;
    /**
     * Hides the modal element. An alternative to the `hide` instance method on the `ui-modal` element.
     * @param id A unique identifier for the Modal
     */
    hide?(id: string): Promise<void>;
    /**
     * Toggles the modal element visibility. An alternative to the `toggle` instance method on the `ui-modal` element.
     * @param id A unique identifier for the Modal
     */
    toggle?(id: string): Promise<void>;
}

type Money = string;

type PickerApi = (options: PickerOptions) => Promise<{
    selected: Promise<string[] | undefined>;
}>;

interface PickerItem {
    id: string;
    /**
     * The primary content to display in the first column of the row.
     */
    heading: string;
    /**
     * The additional content to display in the second and third columns of the row, if provided.
     */
    data?: DataPoint[];
    /**
     * Whether the item is disabled or not. If the item is disabled, it cannot be selected.
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * Whether the item is selected or not when the picker is opened. The user may deselect the item if it is preselected.
     */
    selected?: boolean;
    /**
     * The badges to display in the first column of the row. These are used to display additional information about the item, such as progress of an action or tone indicating the status of that item.
     */
    badges?: Badge[];
    /**
     * The thumbnail to display at the start of the row. This is used to display an image or icon for the item.
     */
    thumbnail?: {
        url: string;
    };
}

interface PickerOptions {
    /**
     * The heading of the picker. This is displayed in the title of the picker modal.
     */
    heading: string;
    /**
     * Whether to allow selecting multiple items of a specific type or not. If a number is provided, then limit the selections to a maximum of that number of items.
     * @defaultValue false
     */
    multiple?: boolean | number;
    /**
     * The data headers for the picker. These are used to display the table headers in the picker modal.
     */
    headers?: Header[];
    /**
     * The items to display in the picker. These are used to display the rows in the picker modal.
     */
    items: PickerItem[];
}

interface PosApi {
    cart: PosCart;
    close: PosClose;
    device: PosDevice;
    location: PosLocation;
}

type PosCart = Required<_PosCart>;

interface _PosCart {
    /**
     * Fetch the current cart.
     */
    fetch?(): Promise<Cart>;
    /**
     * Subscribe the cart changes.
     */
    subscribe?(onSubscribe: CartSubscriber): Unsubscribe;
    /**
     * Add a new or existing customer to the cart.
     */
    setCustomer?(customer: Customer): Promise<void>;
    /**
     * Remove the current customer from the cart.
     */
    removeCustomer?(): Promise<void>;
    /**
     * Add a new address to a customer.
     */
    addAddress?(address: Address): Promise<void>;
    /**
     * Update an address for a customer.
     */
    updateAddress?(index: number, address: Address): Promise<void>;
    /**
     * Apply a percentage or fixed amount discount to the whole cart.
     */
    applyCartDiscount?(type: DiscountType, discountDescription: string, amount: string): Promise<void>;
    /**
     * Apply a code discount to the whole cart.
     */
    applyCartCodeDiscount?(code: string): Promise<void>;
    /**
     * Remove the discount applied to the whole cart.
     */
    removeCartDiscount?(): Promise<void>;
    /**
     * Clears all applied discounts from the cart and optionally disables automatic discounts.
     */
    removeAllDiscounts?(disableAutomaticDiscounts: boolean): Promise<void>;
    /**
     * Add properties for the cart.
     */
    addCartProperties?(properties: Record<string, string>): Promise<void>;
    /**
     * Remove properties from the cart.
     */
    removeCartProperties?(keys: string[]): Promise<void>;
    /**
     * Add custom sale for the cart.
     */
    addCustomSale?(customSale: CustomSale): Promise<void>;
    /**
     * Clear all contents from the cart.
     */
    clear?(): Promise<void>;
    /**
     * Add a product to the cart.
     */
    addLineItem?(variantId: number, quantity: number): Promise<void>;
    /**
     * Make changes to a line item in the cart.
     */
    updateLineItem?(uuid: string, quantity: number): Promise<void>;
    /**
     * Remove a line item in the cart.
     */
    removeLineItem?(uuid: string): Promise<void>;
    /**
     * Apply a discount to a line item.
     */
    setLineItemDiscount?(uuid: string, type: DiscountType, discountDescription: string, amount: string): Promise<void>;
    /**
     * Remove a discount from a line item.
     */
    removeLineItemDiscount?(uuid: string): Promise<void>;
    /**
     * Add properties to a line item.
     */
    addLineItemProperties?(uuid: string, properties: Record<string, string>): Promise<void>;
    /**
     * Remove properties from a line item.
     */
    removeLineItemProperties?(uuid: string, properties: string[]): Promise<void>;
}

type PosClose = () => Promise<void>;

type PosDevice = () => Promise<Device>;

type PosLocation = () => Promise<Location_2>;

interface POSUser {
    /**
     * The ID of the user's staff.
     */
    id?: number;
    /**
     * The user's first name.
     */
    firstName?: string;
    /**
     * The user's last name.
     */
    lastName?: string;
    /**
     * The user's email address.
     */
    email?: string;
    /**
     *   The account access level of the logged-in user
     */
    accountAccess?: string;
    /**
     * The user's account type.
     */
    accountType?: string;
}

interface PrivilegedAdminUser extends AdminUser {
    id?: number;
    name?: string;
    email?: string;
}

export interface Product extends Resource {
    availablePublicationCount: number;
    createdAt: string;
    descriptionHtml: string;
    handle: string;
    hasOnlyDefaultVariant: boolean;
    images: Image_2[];
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

enum ProductStatus {
    Active = "ACTIVE",
    Archived = "ARCHIVED",
    Draft = "DRAFT"
}

export interface ProductVariant extends Resource {
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
    image?: Image_2 | null;
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

enum ProductVariantInventoryManagement {
    Shopify = "SHOPIFY",
    NotManaged = "NOT_MANAGED",
    FulfillmentService = "FULFILLMENT_SERVICE"
}

enum ProductVariantInventoryPolicy {
    Deny = "DENY",
    Continue = "CONTINUE"
}

type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

/**
 * Entry point for Shopify intents.
 *
 * A unified surface for describing and orchestrating operations. Intents pair
 * an `action` (verb) with a resource `type` and optional `value` and `data`
 * to request a workflow.
 */
interface PublicIntentsApi {
    /**
     * Invoke an intent using the object syntax.
     *
     * @param query - Structured intent description, including `action` and `type`.
     * @returns A promise for an {@link IntentActivity} that completes with an
     *          {@link IntentResponse}.
     */
    invoke?(query: IntentQuery): Promise<IntentActivity>;
    /**
     * Invoke an intent using the URL syntax.
     *
     * URL format: `action:type[,value][?params]`.
     *
     * @param intentURL - Intent in URL form, e.g. `create:shopify/Product` or
     *                    `edit:shopify/Product,gid://shopify/Product/123?title=Updated` or
     *                    `edit:gid://shopify/Product/123`.
     * @param options - Optional supplemental inputs such as `value` or `data`.
     * @returns A promise for an {@link IntentActivity} that completes with an
     *          {@link IntentResponse}.
     */
    invoke?(intentURL: string, options?: IntentQueryOptions): Promise<IntentActivity>;
}

interface Resource {
    /** in GraphQL id format, ie 'gid://shopify/Product/1' */
    id: string;
}

type ResourcePickerApi = <ResourceType extends keyof ResourceTypes = keyof ResourceTypes>(options: ResourcePickerOptions<ResourceType>) => Promise<SelectPayload<ResourceType> | undefined>;

interface ResourcePickerOptions<ResourceType extends keyof ResourceTypes = keyof ResourceTypes> {
    /**
     * The type of resource you want to pick.
     */
    type: ResourceType;
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

type ResourceSelection<Type extends keyof ResourceTypes> = ResourceTypes[Type];

type ResourceTypes = {
    product: Product;
    variant: ProductVariant;
    collection: Collection;
};

type ReviewRequestDeclinedCode = 'mobile-app' | 'already-reviewed' | 'annual-limit-reached' | 'cooldown-period' | 'merchant-ineligible' | 'recently-installed' | 'already-open' | 'open-in-progress' | 'cancelled';

interface ReviewRequestDeclinedResponse {
    success: false;
    code: ReviewRequestDeclinedCode;
    message: string;
}

type ReviewRequestResponse = ReviewRequestSuccessResponse | ReviewRequestDeclinedResponse;

interface ReviewRequestSuccessResponse {
    success: true;
    code: 'success';
    message: 'Review modal shown successfully';
}

interface ReviewsApi {
    request(): Promise<ReviewRequestResponse>;
}

interface RuleSet {
    appliedDisjunctively: boolean;
    rules: CollectionRule[];
}

export interface SAppNavAttributes {
    children?: any;
}

interface SAppNavElement_2 extends HTMLElement {
}
export type { SAppNavElement_2 as SAppNavElement }

export interface SAppWindowAttributes {
    /**
     * A unique identifier for the S-App-Window
     */
    id?: string;
    /**
     * The URL of the content to display within the S-App-Window.
     * S-App-Window only supports src-based content (required).
     */
    src: string;
}

interface _SAppWindowElement {
    /**
     * Always returns undefined for s-app-window (src-only)
     */
    readonly content: undefined;
    /**
     * A getter/setter for the s-app-window src URL
     */
    src?: string;
    /**
     * A getter for the Window object of the s-app-window iframe.
     * Only accessible when the s-app-window is open.
     */
    readonly contentWindow?: Window | null;
    /**
     * Shows the s-app-window element
     */
    show?(): Promise<void>;
    /**
     * Hides the s-app-window element
     */
    hide?(): Promise<void>;
    /**
     * Toggles the s-app-window element between showing and hidden states
     */
    toggle?(): Promise<void>;
    /**
     * Add 'show' | 'hide' event listeners.
     */
    addEventListener?(type: 'show' | 'hide', listener: EventListenerOrEventListenerObject): void;
    /**
     * Remove 'show' | 'hide' event listeners.
     */
    removeEventListener?(type: 'show' | 'hide', listener: EventListenerOrEventListenerObject): void;
}

interface SAppWindowElement_2 extends Omit<HTMLElement, 'addEventListener' | 'removeEventListener'>, Required<Omit<_SAppWindowElement, 'src' | 'contentWindow'>>, Pick<_SAppWindowElement, 'src' | 'contentWindow'> {
}
export type { SAppWindowElement_2 as SAppWindowElement }

interface SaveBarApi extends Required<_SaveBarApi> {
}

interface _SaveBarApi {
    /**
     * Shows the save bar element. An alternative to the `show` instance method on the `ui-save-bar` element.
     * @param id A unique identifier for the save bar
     */
    show?(id: string): Promise<void>;
    /**
     * Hides the save bar element. An alternative to the `hide` instance method on the `ui-save-bar` element.
     * @param id A unique identifier for the save bar
     */
    hide?(id: string): Promise<void>;
    /**
     * Toggles the save bar element visibility. An alternative to the `toggle` instance method on the `ui-save-bar` element.
     * @param id A unique identifier for the save bar
     */
    toggle?(id: string): Promise<void>;
    /**
     * Checks if saveBar is shown. This promise resolves if the save bar is not shown. Uses this method before navigating away from the page only when you have a custom routing that is not anchor tag.
     */
    leaveConfirmation?(): Promise<void>;
}

interface ScannerApi {
    capture(): Promise<ScannerPayload>;
}

interface ScannerPayload {
    data: string;
}

/**
 * `Scope` represents an [access scope](https://shopify.dev/docs/api/usage/access-scopes) handle, like "`write_products`" or "`read_orders`"
 */
type Scope = string;

/**
 * The Scopes API enables embedded apps and extensions to request merchant consent for access scopes.
 */
interface Scopes {
    /**
     * Queries Shopify for the scopes for this app on this shop
     */
    query: () => Promise<ScopesDetail>;
    /**
     * Requests the merchant to grant the provided scopes for this app on this shop
     *
     * This will open a [permission grant modal](/docs/apps/build/authentication-authorization/app-installation/manage-access-scopes#request-access-scopes-using-the-app-bridge-api-for-embedded-apps) for the merchant to accept or decline the scopes.
     */
    request: (scopes: Scope[]) => Promise<ScopesRequestResponse>;
    /**
     * Revokes the provided scopes from this app on this shop
     */
    revoke: (scopes: Scope[]) => Promise<ScopesRevokeResponse>;
}

interface ScopesDetail {
    /**
     * The scopes that have been granted on the shop for this app
     */
    granted: Scope[];
    /**
     * The required scopes that the app has declared in its configuration
     */
    required: Scope[];
    /**
     * The optional scopes that the app has declared in its configuration
     */
    optional: Scope[];
}

interface ScopesRequestResponse {
    result: UserResult;
    detail: ScopesDetail;
}

interface ScopesRevokeResponse {
    detail: ScopesDetail;
}

type SelectPayload<Type extends keyof ResourceTypes> = WithSelection<ResourceSelection<Type>[]>;

export interface ShopifyGlobal {
    config: AppBridgeConfig;
    origin: string;
    ready: Promise<void>;
    environment: EnvironmentApi;
    loading: LoadingApi;
    idToken: IdTokenApi;
    user: UserApi;
    toast: ToastApi;
    resourcePicker: ResourcePickerApi;
    scanner: ScannerApi;
    modal: ModalApi;
    saveBar: SaveBarApi;
    pos: PosApi;
    intents: IntentsApi;
    webVitals: WebVitalsApi;
    support: SupportApi;
    reviews: ReviewsApi;
    scopes: Scopes;
    picker: PickerApi;
    app: AppApi;
}

export interface SPageAttributes {
    heading?: string;
    children?: SPageChildren;
}

interface SPageChildren {
    primaryAction?: HTMLElement;
    secondaryActions?: HTMLElement[];
    breadcrumbActions?: HTMLElement;
}

export interface SPageElement {
    heading?: string;
    children?: SPageChildren;
}

/**
 * Successful intent completion.
 */
interface SuccessIntentResponse {
    code?: 'ok';
    data?: {
        [key: string]: unknown;
    };
}

interface SupportApi {
    registerHandler?: (callback: SupportCallback | null) => Promise<void>;
}

type SupportCallback = () => void | Promise<void>;

/**
 * Represents a theme-specific activation for a block/embed.
 * Contains the specific placement within a theme.
 */
interface ThemeAppBlockActivation {
    /**
     * The target identifier for the block/embed placement within the theme.
     * Example: 'template--product.alternate/main/my_app_product_rating_GPzUYy'
     */
    target: string;
    /**
     * The theme ID where this block/embed is activated.
     * Format: gid://shopify/OnlineStoreTheme/{id}
     */
    themeId: string;
}

/**
 * Target location for theme app blocks.
 */
type ThemeAppBlockTarget = 'section';

/**
 * Target location for theme app embeds.
 */
type ThemeAppEmbedTarget = 'head' | 'body' | 'compliance_head';

/**
 * Represents an activation record for a theme app block or embed.
 * Each block/embed within a theme app extension has its own handle, status, and activations.
 */
interface ThemeExtensionActivation {
    /**
     * The target location type for this block/embed.
     * - 'section' for blocks
     * - 'head', 'body', or 'compliance_head' for embeds
     */
    target: ThemeAppBlockTarget | ThemeAppEmbedTarget;
    /**
     * The filename of the block/embed within the theme app extension (without extension).
     * This is configured by the developer when creating the block file.
     */
    handle: string;
    /**
     * The developer-configured display name of this block/embed, defined in the block's schema.
     * @see https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/configuration#schema
     */
    name: string;
    /**
     * The availability status of this block/embed.
     */
    status: ActivationStatus;
    /**
     * List of theme-specific activations for this block/embed.
     * Contains where the block is actually placed within themes.
     */
    activations: ThemeAppBlockActivation[];
}

/**
 * The Toast API provides methods to display Toast notifications in the Shopify admin.
 */
interface ToastApi {
    /**
     * Displays a Toast notification in the Shopify admin.
     *
     * @param message - The message to be displayed in the Toast notification.
     * @param opts - Options for the Toast notification.
     *
     * @returns The ID of the Toast notification.
     */
    show: ToastShow;
    /**
     * Hides a Toast notification in the Shopify admin.
     *
     * @param id - The ID of the Toast notification to be hidden.
     */
    hide: ToastHide;
}

type ToastHide = (id: string) => void;

export interface ToastOptions {
    /**
     * The length of time in milliseconds the toast message should persist.
     * @defaultValue 5000
     */
    duration?: number;
    /**
     * Display an error-styled toast.
     * @defaultValue false
     */
    isError?: boolean;
    /**
     * Content of an action button.
     */
    action?: string;
    /**
     * Callback fired when the action button is clicked.
     */
    onAction?: () => void;
    /**
     * Callback fired when the dismiss icon is clicked
     */
    onDismiss?: () => void;
}

type ToastShow = (message: string, opts?: ToastOptions) => string;

type Tone = 'info' | 'success' | 'warning' | 'critical';

/**
 * Represents an activation record for a UI extension (checkout, customer account).
 */
interface UiExtensionActivation {
    /**
     * The target identifier for the extension activation.
     * Example: 'purchase.thank-you.block.render'
     */
    target: string;
}

export interface UIModalAttributes extends _UIModalAttributes {
    children?: any;
}

interface _UIModalAttributes {
    /**
     * A unique identifier for the Modal
     */
    id?: string;
    /**
     * The size of the modal.
     *
     * Before the Modal is shown, this can be changed to any of the provided values.
     * After the Modal is shown, this can can only be changed between `small`, `base`, and `large`.
     *
     * @defaultValue "base"
     */
    variant?: 'small' | 'base' | 'large' | 'max';
    /**
     * The URL of the content to display within a Modal.
     * If provided, the Modal will display the content from the provided URL
     * and any children other than the [ui-title-bar](/docs/api/app-bridge-library/web-components/ui-title-bar)
     * and [ui-save-bar](/docs/api/app-bridge-library/web-components/ui-save-bar) elements will be ignored.
     */
    src?: string;
    /**
     * The content to display within a Modal.
     * You can provide a single HTML element with children
     * and the [ui-title-bar](/docs/api/app-bridge-library/web-components/ui-title-bar)
     * element to configure the Modal title bar.
     */
    children?: HTMLCollection & UITitleBarAttributes;
}

interface _UIModalElement {
    /**
     * A getter/setter that is used to set modal variant.
     */
    variant?: 'small' | 'base' | 'large' | 'max';
    /**
     * A getter/setter that is used to get the DOM content of the modal
     * element and update the content after the modal has been opened.
     */
    content?: HTMLElement;
    /**
     * A getter/setter that is used to set modal src.
     */
    src?: string;
    /**
     * A getter that is used to get the Window object of the modal iframe
     * when the modal is used with a `src` attribute. This can only be
     * accessed when the modal is open, so it is recommended to use `await modal.show()`
     * before accessing this property.
     */
    readonly contentWindow?: Window | null;
    /**
     * Shows the modal element
     */
    show?(): Promise<void>;
    /**
     * Hides the modal element
     */
    hide?(): Promise<void>;
    /**
     * Toggles the modal element between the showing and hidden states
     */
    toggle?(): Promise<void>;
    /**
     * Add 'show' | 'hide' event listeners.
     * @param type An event name
     * @param listener A callback triggered when the event name happens
     */
    addEventListener?(type: 'show' | 'hide', listener: EventListenerOrEventListenerObject): void;
    /**
     * Remove 'show' | 'hide' event listeners.
     * @param type An event name
     * @param listener A callback to be removed
     */
    removeEventListener?(type: 'show' | 'hide', listener: EventListenerOrEventListenerObject): void;
}

interface UIModalElement_2 extends Omit<HTMLElement, 'addEventListener' | 'removeEventListener'>, Required<Omit<_UIModalElement, 'content' | 'src' | 'contentWindow'>>, Pick<_UIModalElement, 'content' | 'src' | 'contentWindow'> {
}
export type { UIModalElement_2 as UIModalElement }

export interface UINavMenuAttributes {
    children?: any;
}

interface UINavMenuElement_2 extends HTMLElement {
}
export type { UINavMenuElement_2 as UINavMenuElement }

export interface UISaveBarAttributes extends _UISaveBarAttributes {
    children?: any;
}

interface _UISaveBarAttributes {
    /**
     * A unique identifier for the save bar
     */
    id?: string;
    /**
     * Whether to show a confirmation dialog when the discard button is clicked
     */
    discardConfirmation?: boolean;
    /**
     * HTML `<button>` elements to hook into the Save
     * and Discard buttons of the contextual save bar.
     *
     * The button with variant `primary` is the Save button
     * and the button without a variant is the Discard button.
     */
    children?: UISaveBarChildren;
}

interface UISaveBarChildren {
    button?: {
        id?: string;
        class?: string;
        children?: string;
        disabled?: boolean;
        loading?: boolean;
        name?: string;
        onclick?: string;
        variant?: 'primary';
    };
}

interface _UISaveBarElement {
    /**
     * A getter/setter that is used to set discard confirmation.
     */
    discardConfirmation?: boolean;
    /**
     * A getter that is used to check if save bar is showing.
     */
    readonly showing?: boolean;
    /**
     * Shows the save bar element.
     */
    show?(): Promise<void>;
    /**
     * Hides the save bar element.
     */
    hide?(): Promise<void>;
    /**
     * Toggles the save bar element between the showing and hidden states.
     */
    toggle?(): Promise<void>;
    /**
     * Add 'show' | 'hide' event listeners.
     * @param type An event name
     * @param listener A callback triggered when the event name happens
     */
    addEventListener?(type: 'show' | 'hide', listener: EventListenerOrEventListenerObject): void;
    /**
     * Remove 'show' | 'hide' event listeners.
     * @param type An event name
     * @param listener A callback to be removed
     */
    removeEventListener?(type: 'show' | 'hide', listener: EventListenerOrEventListenerObject): void;
}

interface UISaveBarElement_2 extends Omit<HTMLElement, 'addEventListener' | 'removeEventListener'>, Required<_UISaveBarElement> {
}
export type { UISaveBarElement_2 as UISaveBarElement }

export interface UITitleBarAttributes extends _UITitleBarAttributes {
    children?: any;
}

interface _UITitleBarAttributes {
    /**
     * The title of the title bar. Can also be set via <code>document.title</code>.
     */
    title?: string;
    /**
     * The children of the title bar.
     */
    children?: UITitleBarChildren;
}

interface UITitleBarChildren {
    /**
     * Note that anchor tag elements are not supported in Remix. You can use Remix's `<Link>` component instead.
     */
    a?: BaseElementAttributes & {
        variant?: 'breadcrumb' | 'primary';
    };
    button?: BaseElementAttributes & {
        variant?: 'breadcrumb' | 'primary';
        tone?: 'critical' | 'default';
    };
    section?: {
        label?: string;
        children?: {
            a?: BaseElementAttributes;
            button?: BaseElementAttributes;
        };
    };
}

interface UITitleBarElement_2 extends Omit<HTMLElement, 'title'> {
}
export type { UITitleBarElement_2 as UITitleBarElement }

/**
 * Callback to unsubscribe
 */
type Unsubscribe = () => void;

export interface UseAppBridge {
}

interface User extends PrivilegedAdminUser, AdminUser, POSUser {
}

type UserApi = () => Promise<User>;

/**
 * `UserResult` represents the results of a user responding to a scopes request, i.e. a merchant user’s action taken when presented with a grant modal.
 */
type UserResult = 'granted-all' | 'declined-all';

interface WebVitalsApi {
    onReport?: (callback: WebVitalsCallback | null) => Promise<void>;
}

type WebVitalsCallback = (payload: WebVitalsReport) => void | Promise<void>;

/**
 * WebVitals API
 */
interface WebVitalsMetric {
    id: string;
    name: string;
    value: number;
}

interface WebVitalsReport {
    metrics: WebVitalsMetric[];
}

enum WeightUnit {
    Kilograms = "KILOGRAMS",
    Grams = "GRAMS",
    Pounds = "POUNDS",
    Ounces = "OUNCES"
}

type WithSelection<T> = T & {
    /**
     * @private
     * @deprecated
     */
    selection: T;
};

export { }
