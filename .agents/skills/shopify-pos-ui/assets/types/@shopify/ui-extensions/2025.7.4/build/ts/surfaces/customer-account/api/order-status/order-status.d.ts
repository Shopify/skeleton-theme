import type { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
import type { CurrencyCode, Country, Timezone, SellingPlan, Attribute, MailingAddress, Language } from '../shared';
import type { ExtensionTarget } from '../../targets';
import { Extension } from '../shared';
/**
 * Metadata associated with the checkout.
 */
export interface Metafield {
    /**
     * The name of the metafield. It must be between 3 and 30 characters in
     * length (inclusive).
     */
    key: string;
    /**
     * A container for a set of metafields. You need to define a custom
     * namespace for your metafields to distinguish them from the metafields
     * used by other apps. This must be between 2 and 20 characters in length (inclusive).
     */
    namespace: string;
    /**
     * The information to be stored as metadata.
     */
    value: string | number;
    /** The metafield’s information type. */
    valueType: 'integer' | 'string' | 'json_string';
}
/**
 * Represents a custom metadata attached to a resource.
 */
export interface AppMetafield {
    /** The key name of a metafield. */
    key: string;
    /** The namespace for a metafield. */
    namespace: string;
    /** The value of a metafield. */
    value: string | number | boolean;
    /** The metafield’s information type. */
    valueType: 'boolean' | 'float' | 'integer' | 'json_string' | 'string';
    /** The metafield's type name. */
    type: string;
}
/**
 * Represents a custom metadata attached to a resource.
 */
export interface CartMetafield {
    /** The key name of a metafield. */
    key: string;
    /** The namespace for a metafield. */
    namespace: string;
    /** The value of a metafield. */
    value: string;
    /** The metafield's type name. */
    type: string;
}
/**
 * The metafield owner.
 */
export interface AppMetafieldEntryTarget {
    /**
     * The type of the metafield owner.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data) when the type is `customer`, `company` or `companyLocation`.
     */
    type: 'customer' | 'product' | 'shop' | 'variant' | 'company' | 'companyLocation' | 'cart';
    /** The numeric owner ID that is associated with the metafield. */
    id: string;
}
/**
 * A metafield associated with the shop or a resource on the checkout.
 */
export interface AppMetafieldEntry {
    /**
     * The target that is associated to the metadata.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data) when the type is `customer`, `company` or `companyLocation`.
     */
    target: AppMetafieldEntryTarget;
    /** The metadata information. */
    metafield: AppMetafield;
}
export type Version = string;
export interface Currency {
    /**
     * The ISO-4217 code for this currency.
     * @see https://www.iso.org/iso-4217-currency-codes.html
     */
    isoCode: CurrencyCode;
}
export interface Market {
    /**
     * A globally-unique identifier for a market.
     */
    id: string;
    /**
     * The human-readable, shop-scoped identifier for the market.
     */
    handle: string;
}
export interface OrderStatusLocalization {
    /**
     * The currency that the buyer sees for money amounts in the checkout.
     */
    currency: StatefulRemoteSubscribable<Currency>;
    /**
     * The buyer’s time zone.
     */
    timezone: StatefulRemoteSubscribable<Timezone>;
    /**
     * The language the buyer sees in the checkout.
     */
    language: StatefulRemoteSubscribable<Language>;
    /**
     * This is the buyer's language, as supported by the extension.
     * If the buyer's actual language is not supported by the extension,
     * this is the fallback locale used for translations.
     *
     * For example, if the buyer's language is 'fr-CA' but your extension
     * only supports translations for 'fr', then the `isoCode` for this
     * language is 'fr'. If your extension does not provide french
     * translations at all, this value is the default locale for your
     * extension (that is, the one matching your .default.json file).
     */
    extensionLanguage: StatefulRemoteSubscribable<Language>;
    /**
     * The country context of the checkout. This value carries over from the
     * context of the cart, where it was used to contextualize the storefront
     * experience. It will update if the buyer changes the country of their
     * shipping address. The value is undefined if unknown.
     */
    country: StatefulRemoteSubscribable<Country | undefined>;
    /**
     * The [market](https://shopify.dev/docs/apps/markets) context of the
     * checkout. This value carries over from the context of the cart, where it
     * was used to contextualize the storefront experience. It will update if the
     * buyer changes the country of their shipping address. The value is undefined
     * if unknown.
     */
    market: StatefulRemoteSubscribable<Market | undefined>;
}
export type AuthenticationState = 'fully_authenticated' | 'pre_authenticated';
export interface OrderStatusApi<Target extends ExtensionTarget> {
    /**
     * Gift Cards that have been applied to the order.
     */
    appliedGiftCards: StatefulRemoteSubscribable<AppliedGiftCard[]>;
    /**
     * The metafields requested in the
     * [`shopify.ui.extension.toml`](https://shopify.dev/docs/api/checkout-ui-extensions/configuration)
     * file. These metafields are updated when there's a change in the merchandise items
     * being purchased by the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    appMetafields: StatefulRemoteSubscribable<AppMetafieldEntry[]>;
    /**
     * Custom attributes left by the customer to the merchant, either in their cart or during checkout.
     */
    attributes: StatefulRemoteSubscribable<Attribute[] | undefined>;
    /**
     * Information about the buyer that is interacting with the order.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    buyerIdentity?: OrderStatusBuyerIdentity;
    /**
     * Settings applied to the buyer's checkout.
     */
    checkoutSettings: StatefulRemoteSubscribable<CheckoutSettings>;
    /**
     * Details on the costs of the purchase for the buyer.
     */
    cost: CartCost;
    /**
     * A list of discount codes applied to the purchase.
     */
    discountCodes: StatefulRemoteSubscribable<CartDiscountCode[]>;
    /**
     * Discounts that have been applied to the entire cart.
     */
    discountAllocations: StatefulRemoteSubscribable<CartDiscountAllocation[]>;
    /**
     * Meta information about the extension.
     */
    extension: Extension<Target>;
    /**
     * The identifier that specifies where in Shopify’s UI your code is being
     * injected. This will be one of the targets you have included in your
     * extension’s configuration file.
     *
     * @example 'customer-account.order-status.block.render'
     * @see https://shopify.dev/docs/api/checkout-ui-extensions/unstable/extension-targets-overview
     * @see https://shopify.dev/docs/apps/app-extensions/configuration#targets
     *
     * @deprecated Deprecated as of version `2023-07`, use `extension.target` instead.
     */
    extensionPoint: Target;
    /**
     * A list of lines containing information about the items the customer intends to purchase.
     */
    lines: StatefulRemoteSubscribable<CartLine[]>;
    /**
     * Details about the location, language, and currency of the buyer. For utilities to easily
     * format and translate content based on these details, you can use the
     * [`i18n`](https://shopify.dev/docs/api/checkout-ui-extensions/apis/standardapi#properties-propertydetail-i18n)
     * object instead.
     */
    localization: OrderStatusLocalization;
    /**
     * The metafields that apply to the current order. The actual resource
     * on which these metafields exist depends on the source of the order:
     *
     * - If the source is an order, then the metafields are on the order.
     *
     * - If the source is a draft order, then the initial value of metafields are
     *   from the draft order, and any new metafields you write are applied
     *   to the order created by the checkout.
     *
     * - For all other sources, the metafields are only stored locally on the
     *   client creating the checkout, and are applied to the order that
     *   results from checkout.
     *
     * These metafields are shared by all extensions running on checkout, and
     * persist for as long as the customer is working on this checkout.
     *
     * Once the order is created, you can query these metafields using the
     * [GraphQL Admin API](https://shopify.dev/docs/admin-api/graphql/reference/orders/order#metafield-2021-01)
     */
    metafields: StatefulRemoteSubscribable<Metafield[]>;
    /**
     * A note left by the customer to the merchant, either in their cart or during checkout.
     */
    note: StatefulRemoteSubscribable<string | undefined>;
    /**
     * Information about the order that was placed.
     */
    order: StatefulRemoteSubscribable<Order | undefined>;
    /**
     * id that represents the checkout used to create the order.
     *
     * Matches the `token` field in the [WebPixel checkout payload](https://shopify.dev/docs/api/pixels/customer-events#checkout)
     * and the `checkout_token` field in the [Admin REST API Order resource](https://shopify.dev/docs/api/admin-rest/unstable/resources/order#resource-object).
     */
    checkoutToken: StatefulRemoteSubscribable<CheckoutToken | undefined>;
    /**
     * The buyer shipping address used for the order.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    shippingAddress?: StatefulRemoteSubscribable<MailingAddress | undefined>;
    /**
     * The buyer billing address used for the order.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    billingAddress?: StatefulRemoteSubscribable<MailingAddress | undefined>;
    /** Shop where the purchase took place. */
    shop: Shop;
    /**
     * The renderer version being used for the extension.
     *
     * @example 'unstable'
     */
    version: Version;
    /**
     * The requireLogin() method triggers login if the customer is viewing pre-authenticated Order status page.
     */
    requireLogin: () => Promise<void>;
    /**
     * The authentication state of Order status page.
     */
    authenticationState: StatefulRemoteSubscribable<AuthenticationState>;
}
export interface OrderStatusBuyerIdentity {
    /**
     * The buyer's customer account. The value is undefined if the buyer isn’t a
     * known customer for this shop or if they haven't logged in yet.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    customer: StatefulRemoteSubscribable<OrderStatusCustomer | undefined>;
    /**
     * The email address of the buyer that is interacting with the cart.
     * The value is `undefined` if the app does not have access to customer data.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    email: StatefulRemoteSubscribable<string | undefined>;
    /**
     * The phone number of the buyer that is interacting with the cart.
     * The value is `undefined` if the app does not have access to customer data.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    phone: StatefulRemoteSubscribable<string | undefined>;
    /**
     * Provides details of the company and the company location that the business customer is purchasing on behalf of.
     * This includes information that can be used to identify the company and the company location that the business
     * customer belongs to.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    purchasingCompany: StatefulRemoteSubscribable<OrderStatusPurchasingCompany | undefined>;
}
/**
 * Information about a company that the business customer is purchasing on behalf of.
 */
export interface OrderStatusPurchasingCompany {
    /**
     * Includes information of the company that the business customer is purchasing on behalf of.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    company: OrderStatusCompany;
    /**
     * Includes information of the company location that the business customer is purchasing on behalf of.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    location: OrderStatusCompanyLocation;
}
export interface OrderStatusCompany {
    /**
     * The company ID.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    id: string;
    /**
     * The name of the company.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    name: string;
    /**
     * The external ID of the company that can be set by the merchant.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    externalId?: string;
}
export interface OrderStatusCompanyLocation {
    /**
     * The company location ID.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    id: string;
    /**
     * The name of the company location.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    name: string;
    /**
     * The external ID of the company location that can be set by the merchant.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    externalId?: string;
}
export interface AppliedGiftCard {
    /**
     * The last four characters of the applied gift card's code.
     */
    lastCharacters: string;
    /**
     * The amount of the applied gift card that will be used when the checkout is completed.
     */
    amountUsed: Money;
    /**
     * The current balance of the applied gift card prior to checkout completion.
     */
    balance: Money;
}
export interface Shop {
    /**
     * The shop ID.
     * @example 'gid://shopify/Shop/123'
     */
    id: string;
    /**
     * The name of the shop.
     */
    name: string;
    /**
     * The primary storefront URL.
     *
     * > Caution:
     * As of version `2024-10` this value will no longer have a trailing slash.
     */
    storefrontUrl?: string;
    /**
     * The shop's myshopify.com domain.
     */
    myshopifyDomain: string;
}
export interface CartCost {
    /**
     * A `Money` value representing the subtotal value of the items in the cart at the current
     * step of checkout.
     */
    subtotalAmount: StatefulRemoteSubscribable<Money>;
    /**
     * A `Money` value representing the total shipping a buyer can expect to pay at the current
     * step of checkout. This value includes shipping discounts. Returns undefined if shipping
     * has not been negotiated yet, such as on the information step.
     */
    totalShippingAmount: StatefulRemoteSubscribable<Money | undefined>;
    /**
     * A `Money` value representing the total tax a buyer can expect to pay at the current
     * step of checkout or the total tax included in product and shipping prices. Returns
     * undefined if taxes are unavailable.
     */
    totalTaxAmount: StatefulRemoteSubscribable<Money | undefined>;
    /**
     * A `Money` value representing the minimum a buyer can expect to pay at the current
     * step of checkout. This value excludes amounts yet to be negotiated. For example,
     * the information step might not have delivery costs calculated.
     */
    totalAmount: StatefulRemoteSubscribable<Money>;
}
export interface CartLine {
    /**
     * These line item IDs are not stable at the moment, they might change after
     * any operations on the line items. You should always look up for an updated
     * ID before any call to `applyCartLinesChange` because you'll need the ID to
     * create a `CartLineChange` object.
     * @example 'gid://shopify/CartLine/123'
     */
    id: string;
    /**
     * The merchandise being purchased.
     */
    merchandise: Merchandise;
    /**
     * The quantity of the merchandise being purchased.
     */
    quantity: number;
    /**
     * The details about the cost components attributed to the cart line.
     */
    cost: CartLineCost;
    /**
     * The line item additional custom attributes.
     */
    attributes: Attribute[];
    /**
     * Discounts applied to the cart line.
     */
    discountAllocations: CartDiscountAllocation[];
    /**
     * Sub lines of the merchandise line. If no sub lines are present, this will be an empty array.
     */
    lineComponents: CartLineComponentType[];
}
type CartLineComponentType = CartBundleLineComponent;
export interface CartBundleLineComponent {
    type: 'bundle';
    /**
     * A unique identifier for the bundle line component.
     *
     * This ID is not stable. If an operation updates the line items in any way, all IDs could change.
     *
     * @example 'gid://shopify/CartLineComponent/123'
     */
    id: string;
    /**
     * The merchandise of this bundle line component.
     */
    merchandise: Merchandise;
    /**
     * The quantity of merchandise being purchased.
     */
    quantity: number;
    /**
     * The cost attributed to this bundle line component.
     */
    cost: CartLineCost;
    /**
     * Additional custom attributes for the bundle line component.
     *
     * @example [{key: 'engraving', value: 'hello world'}]
     */
    attributes: Attribute[];
}
export interface CartLineCost {
    /**
     * The total amount after reductions the buyer can expect to pay that is directly attributable to a single
     * cart line.
     */
    totalAmount: Money;
}
export interface Money {
    /**
     * The price amount.
     */
    amount: number;
    /**
     * The ISO 4217 format for the currency.
     * @example 'CAD' for Canadian dollar
     */
    currencyCode: CurrencyCode;
}
export type Merchandise = ProductVariant;
export interface BaseMerchandise {
    /**
     * The merchandise ID.
     */
    id: string;
}
export interface ProductVariant extends BaseMerchandise {
    type: 'variant';
    /**
     * A globally-unique identifier.
     * @example 'gid://shopify/ProductVariant/123'
     */
    id: string;
    /**
     * The product variant’s title.
     */
    title: string;
    /**
     * The product variant's sku.
     */
    sku?: string;
    /**
     * The product variant's subtitle.
     */
    subtitle?: string;
    /**
     * Image associated with the product variant. This field falls back to the product
     * image if no image is available.
     */
    image?: ImageDetails;
    /**
     * List of product options applied to the variant.
     */
    selectedOptions: SelectedOption[];
    /**
     * The product object that the product variant belongs to.
     */
    product: Product;
    /**
     * Whether or not the product requires shipping.
     */
    requiresShipping: boolean;
    /**
     * The selling plan associated with the merchandise.
     */
    sellingPlan?: SellingPlan;
}
export interface Product {
    /**
     * A globally-unique identifier.
     */
    id: string;
    /**
     * The product’s vendor name.
     */
    vendor: string;
    /**
     * A categorization that a product can be tagged with, commonly used for filtering and searching.
     */
    productType: string;
}
export interface ImageDetails {
    /**
     * The image URL.
     */
    url: string;
    /**
     * The alternative text for the image.
     */
    altText?: string;
}
export interface SelectedOption {
    /**
     * The name of the merchandise option.
     */
    name: string;
    /**
     * The value of the merchandise option.
     */
    value: string;
}
/**
 * A payment option presented to the buyer.
 */
export interface PaymentOption {
    /**
     * The type of the payment option.
     *
     * Shops can be configured to support many different payment options. Some options are only available to buyers in specific regions.
     *
     * | Type  | Description  |
     * |---|---|
     * | `creditCard`  |  A vaulted or manually entered credit card.  |
     * | `deferred`  |  A [deferred payment](https://help.shopify.com/en/manual/orders/deferred-payments), such as invoicing the buyer and collecting payment at a later time.  |
     * | `local`  |  A [local payment option](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market  |
     * | `manualPayment`  |  A manual payment option such as an in-person retail transaction.  |
     * | `offsite`  |  A payment processed outside of Shopify's checkout, excluding integrated wallets.  |
     * | `other`  |  Another type of payment not defined here.  |
     * | `paymentOnDelivery`  |  A payment that will be collected on delivery.  |
     * | `redeemable`  |  A redeemable payment option such as a gift card or store credit.  |
     * | `wallet`  |  An integrated wallet such as PayPal, Google Pay, Apple Pay, etc.  |
     * | `customOnsite` | A custom payment option that is processed through a checkout extension with a payments app. |
     */
    type: 'creditCard' | 'deferred' | 'local' | 'manualPayment' | 'offsite' | 'other' | 'paymentOnDelivery' | 'redeemable' | 'wallet' | 'customOnsite';
    /**
     * The unique handle for the payment option.
     *
     * This is not a globally unique identifier. It may be an identifier specific to the given checkout session or the current shop.
     */
    handle: string;
}
/**
 * A payment option selected by the buyer.
 */
export interface SelectedPaymentOption {
    /**
     * The unique handle referencing `PaymentOption.handle`.
     *
     * See [availablePaymentOptions](https://shopify.dev/docs/api/checkout-ui-extensions/apis/standardapi#properties-propertydetail-availablepaymentoptions).
     */
    handle: string;
}
export interface CartDiscountCode {
    /**
     * The code for the discount
     */
    code: string;
}
export type CartDiscountAllocation = CartCodeDiscountAllocation | CartAutomaticDiscountAllocation | CartCustomDiscountAllocation;
export interface CartDiscountAllocationBase {
    /**
     * The money amount that has been discounted from the order
     */
    discountedAmount: Money;
}
export interface CartCodeDiscountAllocation extends CartDiscountAllocationBase {
    /**
     * The code for the discount
     */
    code: string;
    /**
     * The type of the code discount
     */
    type: 'code';
}
export interface CartAutomaticDiscountAllocation extends CartDiscountAllocationBase {
    /**
     * The title of the automatic discount
     */
    title: string;
    /**
     * The type of the automatic discount
     */
    type: 'automatic';
}
export interface CartCustomDiscountAllocation extends CartDiscountAllocationBase {
    /**
     * The title of the custom discount
     */
    title: string;
    /**
     * The type of the custom discount
     */
    type: 'custom';
}
/**
 * Information about a customer who has previously purchased from this shop.
 *
 * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
 */
export interface OrderStatusCustomer {
    /**
     * Customer ID.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'gid://shopify/Customer/123'
     */
    id: string;
    /**
     * The email of the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    email?: string;
    /**
     * The phone number of the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    phone?: string;
    /**
     * The full name of the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    fullName?: string;
    /**
     * The first name of the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    firstName?: string;
    /**
     * The last name of the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    lastName?: string;
    /**
     * The image associated with the customer.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    image: ImageDetails;
    /**
     * Defines if the customer accepts marketing activities.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    acceptsMarketing: boolean;
    /**
     * The Store Credit Accounts owned by the customer and usable during the checkout process.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @private
     */
    storeCreditAccounts: StoreCreditAccount[];
}
export type CheckoutToken = string;
/**
 * Settings describing the behavior of the buyer's checkout.
 */
export interface CheckoutSettings {
    /**
     * The type of order that will be created once the buyer completes checkout.
     */
    orderSubmission: 'DRAFT_ORDER' | 'ORDER';
    /**
     * Represents the merchant configured payment terms.
     */
    paymentTermsTemplate?: PaymentTermsTemplate;
    /**
     * Settings describing the behavior of the shipping address.
     */
    shippingAddress: ShippingAddressSettings;
}
/**
 * Settings describing the behavior of the shipping address.
 */
export interface ShippingAddressSettings {
    /**
     * Describes whether the buyer can ship to any address during checkout.
     */
    isEditable: boolean;
}
/**
 * Represents the payment terms template object.
 */
export interface PaymentTermsTemplate {
    /**
     * A globally-unique ID.
     * @example 'gid://shopify/PaymentTermsTemplate/1'
     */
    id: string;
    /**
     * The name of the payment terms translated to the buyer's current language. See [localization.language](https://shopify.dev/docs/api/checkout-ui-extensions/apis/standardapi#properties-propertydetail-localization).
     */
    name: string;
    /**
     * The due date for net payment terms as a ISO 8601 formatted string `YYYY-MM-DDTHH:mm:ss.sssZ`.
     */
    dueDate?: string;
    /**
     * The number of days between the issued date and due date if using net payment terms.
     */
    dueInDays?: number;
}
/**
 * Information about a Store Credit Account.
 */
export interface StoreCreditAccount {
    /**
     * A globally-unique identifier.
     * @example 'gid://shopify/StoreCreditAccount/1'
     */
    id: string;
    /**
     * The current balance of the Store Credit Account.
     */
    balance: Money;
}
/**
 * Represents the delivery information and options available for one or
 * more cart lines.
 */
export interface DeliveryGroup {
    /**
     * The cart line references associated to the delivery group.
     */
    targetedCartLines: CartLineReference[];
    /**
     * The delivery options available for the delivery group.
     */
    deliveryOptions: DeliveryOption[];
    /**
     * The selected delivery option for the delivery group.
     */
    selectedDeliveryOption?: DeliveryOptionReference;
    /**
     * The type of the delivery group.
     */
    groupType: DeliveryGroupType;
    /**
     * Whether delivery is required for the delivery group.
     */
    isDeliveryRequired: boolean;
}
/**
 * The possible types of a delivery group.
 */
export type DeliveryGroupType = 'oneTimePurchase' | 'subscription';
/**
 * Represents a reference to a cart line.
 */
export interface CartLineReference {
    /**
     * The unique identifier of the referenced cart line.
     */
    id: string;
}
/**
 * Represents a reference to a delivery option.
 */
export interface DeliveryOptionReference {
    /**
     * The unique identifier of the referenced delivery option.
     */
    handle: string;
}
/**
 * Represents a base interface for a single delivery option.
 */
export interface DeliveryOption {
    /**
     * The unique identifier of the delivery option.
     */
    handle: string;
    /**
     * The title of the delivery option.
     */
    title?: string;
    /**
     * The description of the delivery option.
     */
    description?: string;
}
/**
 * Represents a delivery option that is a shipping option.
 */
export interface ShippingOption extends DeliveryOption {
    /**
     * The type of this delivery option.
     */
    type: 'shipping' | 'local';
    /**
     * Information about the carrier.
     */
    carrier: ShippingOptionCarrier;
    /**
     * The cost of the delivery.
     */
    cost: Money;
    /**
     * The cost of the delivery including discounts.
     */
    costAfterDiscounts: Money;
    /**
     * Information about the estimated delivery time.
     */
    deliveryEstimate: DeliveryEstimate;
}
export interface DeliveryEstimate {
    /**
     * The estimated time in transit for the delivery in seconds.
     */
    timeInTransit?: NumberRange;
}
export interface ShippingOptionCarrier {
    /**
     * The name of the carrier.
     */
    name?: string;
}
export interface PickupPointOption extends DeliveryOption {
    /**
     * The type of this delivery option.
     */
    type: 'pickupPoint';
    /**
     * Information about the carrier that ships to the pickup point.
     */
    carrier: PickupPointCarrier;
    /**
     * The cost to ship to this pickup point.
     */
    cost: Money;
    /**
     * The cost to ship to this pickup point including discounts.
     */
    costAfterDiscounts: Money;
    /**
     * The location details of the pickup point.
     */
    location: PickupPointLocation;
}
export interface PickupLocationOption extends DeliveryOption {
    /**
     * The type of this delivery option.
     */
    type: 'pickup';
    /**
     * The location details of the pickup location.
     */
    location: PickupLocation;
}
interface PickupLocation {
    /**
     * The name of the pickup location.
     */
    name?: string;
    /**
     * The address of the pickup location.
     */
    address: MailingAddress;
}
interface PickupPointLocation {
    /**
     * The name of the pickup point.
     */
    name?: string;
    /**
     * The unique identifier of the pickup point.
     */
    handle: string;
    /**
     * The address of the pickup point.
     */
    address: MailingAddress;
}
interface PickupPointCarrier {
    /**
     * The code identifying the carrier.
     */
    code?: string;
    /**
     * The name of the carrier.
     */
    name?: string;
}
export interface NumberRange {
    /**
     * The lower bound of the number range.
     */
    lower?: number;
    /**
     * The upper bound of the number range.
     */
    upper?: number;
}
/**
 * Information about an order that was placed.
 */
export interface Order {
    /**
     * A globally-unique identifier.
     * @example 'gid://shopify/Order/1'
     */
    id: string;
    /**
     * Unique identifier for the order that appears on the order.
     * @example '#1000'
     */
    name: string;
    /**
     * If cancelled, the time at which the order was cancelled.
     */
    cancelledAt?: string;
    /**
     * The date and time when the order was processed.
     * Processing happens after the checkout has completed, and indicates that the order is available in the admin.
     */
    processedAt?: string;
    /**
     * A randomly generated alpha-numeric identifier for the order.
     * For orders created in 2024 and onwards, the number will always be present. For orders created before that date, the number might not be present.
     */
    confirmationNumber?: string;
}
export {};
//# sourceMappingURL=order-status.d.ts.map