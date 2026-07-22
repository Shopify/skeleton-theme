import type { CountryCode } from '../../../shared';
export interface ValidationError {
    /**
     * Error message to be displayed to the buyer.
     */
    message: string;
    /**
     * The checkout UI field that the error is associated with.
     *
     * Example: `$.cart.deliveryGroups[0].deliveryAddress.countryCode`
     *
     * See the [supported targets](https://shopify.dev/docs/api/functions/reference/cart-checkout-validation/graphql#supported-targets)
     * for more information.
     */
    target?: string;
}
export interface SellingPlan {
    /**
     * A globally-unique identifier.
     * @example 'gid://shopify/SellingPlan/1'
     */
    id: string;
    /**
     * Whether purchasing the selling plan will result in multiple deliveries.
     */
    recurringDeliveries: boolean;
}
export interface Attribute {
    /**
     * The key for the attribute.
     */
    key: string;
    /**
     * The value for the attribute.
     */
    value: string;
}
export interface MailingAddress {
    /**
     * The buyer's full name.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'John Doe'
     */
    name?: string;
    /**
     * The buyer's first name.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'John'
     */
    firstName?: string;
    /**
     * The buyer's last name.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'Doe'
     */
    lastName?: string;
    /**
     * The buyer's company name.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 1 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'Shopify'
     */
    company?: string;
    /**
     * The first line of the buyer's address, including street name and number.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example '151 O'Connor Street'
     */
    address1?: string;
    /**
     * The second line of the buyer's address, like apartment number, suite, etc.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'Ground floor'
     */
    address2?: string;
    /**
     * The buyer's city.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'Ottawa'
     */
    city?: string;
    /**
     * The buyer's postal or ZIP code.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'K2P 2L8'
     */
    zip?: string;
    /**
     * The ISO 3166 Alpha-2 format for the buyer's country. Refer to https://www.iso.org/iso-3166-country-codes.html.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'CA' for Canada.
     */
    countryCode?: CountryCode;
    /**
     * The buyer's province code, such as state, province, prefecture, or region.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example 'ON' for Ontario.
     */
    provinceCode?: string;
    /**
     * The buyer's phone number.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires level 2 access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     *
     * @example '+1 613 111 2222'.
     */
    phone?: string;
}
export interface ShippingAddress extends MailingAddress {
    /**
     * Specifies whether the address should be saved to the buyer's account.
     */
    oneTimeUse?: boolean;
}
//# sourceMappingURL=shared.d.ts.map