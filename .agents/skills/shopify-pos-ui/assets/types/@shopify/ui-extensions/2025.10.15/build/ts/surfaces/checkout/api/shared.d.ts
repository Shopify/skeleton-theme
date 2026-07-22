import type { CountryCode } from '../../../shared';
export interface ValidationError {
    /**
     * The error message to display to the buyer. Use this to explain what
     * went wrong and how to fix it.
     */
    message: string;
    /**
     * The checkout UI field that the error is associated with. When provided,
     * checkout highlights the matching field so the buyer knows where to fix
     * the issue. The value is `undefined` if the error isn't tied to a
     * specific field.
     *
     * @example '$.cart.deliveryGroups[0].deliveryAddress.countryCode'
     *
     * See the [supported targets](https://shopify.dev/docs/api/functions/reference/cart-checkout-validation/graphql#supported-targets)
     * for more information.
     */
    target?: string;
}
/**
 * A [selling plan](https://shopify.dev/docs/apps/build/purchase-options/subscriptions) represents a recurring or deferred purchasing option for a product, such as a subscription, pre-order, or try-before-you-buy plan. The merchant configures selling plans to define how and when the buyer is charged.
 */
export interface SellingPlan {
    /**
     * A globally-unique identifier for the selling plan in the format
     * `gid://shopify/SellingPlan/<id>`. Use this to reference the specific
     * selling plan associated with a line item.
     *
     * @example 'gid://shopify/SellingPlan/1'
     */
    id: string;
    /**
     * Whether purchasing through this selling plan results in multiple
     * deliveries. `true` for subscription plans with recurring fulfillment,
     * `false` for one-time pre-orders or try-before-you-buy plans.
     */
    recurringDeliveries: boolean;
}
export interface Attribute {
    /**
     * The identifier for the attribute. Each key must be unique within the
     * set of attributes on the cart or checkout. If you call
     * `applyAttributeChange()` with a key that already exists, then the
     * existing value is replaced.
     *
     * @example 'gift_wrapping'
     */
    key: string;
    /**
     * The value associated with the attribute key. This is a freeform string
     * that can store any information the buyer or app provides.
     *
     * Attribute values are always strings. To store structured data, serialize
     * it to JSON and parse it when reading.
     *
     * @example 'Please use red wrapping paper'
     */
    value: string;
}
export interface MailingAddress {
    /**
     * The buyer's full name, typically a combination of first and last name.
     * The value is `undefined` if the buyer didn't provide a name.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'John Doe'
     */
    name?: string;
    /**
     * The buyer's first name. Use this alongside `lastName` when you need to
     * display or process name parts separately. The value is `undefined` if
     * the buyer didn't provide a first name or the store doesn't collect
     * split names.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'John'
     */
    firstName?: string;
    /**
     * The buyer's last name. Use this alongside `firstName` when you need to
     * display or process name parts separately. The value is `undefined` if
     * the buyer didn't provide a last name or the store doesn't collect
     * split names.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'Doe'
     */
    lastName?: string;
    /**
     * The buyer's company name. The value is `undefined` if the buyer didn't
     * enter a company or the store doesn't collect company names.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'Shopify'
     */
    company?: string;
    /**
     * The first line of the street address, including the street number and
     * name. The value is `undefined` if the buyer hasn't entered an address yet.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example '151 O'Connor Street'
     */
    address1?: string;
    /**
     * The second line of the buyer's address, such as apartment number, suite,
     * or unit. The value is `undefined` if the buyer didn't provide a second
     * address line.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'Ground floor'
     */
    address2?: string;
    /**
     * The city, town, or village of the address. The value is `undefined` if
     * the buyer hasn't entered a city yet.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'Ottawa'
     */
    city?: string;
    /**
     * The postal code or ZIP code of the address, used for mail sorting and
     * delivery routing. The value is `undefined` if the buyer hasn't entered
     * one yet or the country doesn't use postal codes.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'K2P 2L8'
     */
    zip?: string;
    /**
     * The two-letter country code in [ISO 3166 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
     * format. The value is `undefined` if the buyer hasn't selected a country
     * yet.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'CA' for Canada.
     */
    countryCode?: CountryCode;
    /**
     * The province, state, prefecture, or region code of the address. The
     * format varies by country. The value is `undefined` if the buyer hasn't
     * selected one yet or the country doesn't have provinces.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'ON' for Ontario.
     */
    provinceCode?: string;
    /**
     * The phone number associated with the address, typically in international
     * format. The value is `undefined` if the buyer didn't provide a phone
     * number or the store doesn't collect phone numbers.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example '+1 613 111 2222'
     */
    phone?: string;
}
export interface ShippingAddress extends MailingAddress {
    /**
     * Controls whether the address is saved to the buyer's account. When
     * `true`, the address won't be saved and is only used for this checkout.
     * When `false` or `undefined`, the address might be saved to the buyer's
     * account for future use.
     */
    oneTimeUse?: boolean;
}
//# sourceMappingURL=shared.d.ts.map