import { CountryCode } from './country-code';
import { TaxLine } from './tax-line';
import { DiscountAllocation } from './discount-allocation';
/**
 * Represents the shopping cart state, including line items, pricing, customer information, and applied discounts. Provides comprehensive access to all cart data and operations.
 */
export interface Cart {
    /**
     * Indicates whether the cart is currently editable. An `undefined` value should be treated as `true` for backward compatibility. Use this to determine if cart modification operations are allowed.
     */
    editable?: boolean;
    /**
     * The subtotal amount of the cart before taxes and discounts, formatted as a currency string.
     */
    subtotal: string;
    /**
     * The total tax amount for the cart, formatted as a currency string.
     */
    taxTotal: string;
    /**
     * The final total amount including all items, taxes, and discounts, formatted as a currency string.
     */
    grandTotal: string;
    /**
     * The cart note to set during bulk update. Replaces existing note or sets new note if none exists. Set to `undefined` to remove current note.
     */
    note?: string;
    /**
     * The cart-level discount to apply during bulk update. Replaces existing cart discount. Set to `undefined` to remove current discount.
     */
    cartDiscount?: Discount;
    /**
     * An array of cart-level discounts to apply during bulk update. Replaces all existing cart discounts with the provided array.
     */
    cartDiscounts: Discount[];
    /**
     * The customer to associate with the cart during bulk update. Replaces existing customer or converts guest cart to customer cart.
     */
    customer?: Customer;
    /**
     * An array of line items to set during bulk update. Completely replaces existing cart contents—removes all current items and adds the provided ones.
     */
    lineItems: LineItem[];
    /**
     * The custom key-value properties to apply to the line item. Merged with existing properties—duplicate keys overwrite existing values.
     */
    properties: Record<string, string>;
}
/**
 * Specifies the parameters for updating cart information. Includes options for modifying customer data, notes, references, and other cart-level metadata.
 */
export interface CartUpdateInput {
    /**
     * The cart note to set during bulk update. Replaces existing note or sets new note if none exists. Set to `undefined` to remove current note.
     */
    note?: string;
    /**
     * The cart-level discount to apply during bulk update. Replaces existing cart discount. Set to `undefined` to remove current discount.
     */
    cartDiscount?: Discount;
    /**
     * An array of cart-level discounts to apply during bulk update. Replaces all existing cart discounts with the provided array.
     */
    cartDiscounts: Discount[];
    /**
     * The customer to associate with the cart during bulk update. Replaces existing customer or converts guest cart to customer cart.
     */
    customer?: Customer;
    /**
     * An array of line items to set during bulk update. Completely replaces existing cart contents—removes all current items and adds the provided ones.
     */
    lineItems: LineItem[];
    /**
     * The custom key-value properties to apply to the line item. Merged with existing properties—duplicate keys overwrite existing values.
     */
    properties: Record<string, string>;
}
/**
 * Represents basic customer identification information. Contains the customer ID for linking to detailed customer data and enabling customer-specific features.
 */
export interface Customer {
    /**
     * The unique numeric identifier for the customer in Shopify's system. This ID is consistent across all Shopify systems and APIs. Used to link this customer reference to the full customer record with complete profile information. Commonly used for customer lookups, applying customer-specific pricing or discounts, linking orders to customer accounts, or integrating with customer management systems.
     */
    id: number;
}
/**
 * Represents an individual item in the shopping cart. Contains product information, pricing, quantity, discounts, and customization details for a single cart entry.
 */
export interface LineItem {
    /**
     * The unique identifier for this line item within the cart. Use for line item-specific operations like updates, removals, or property modifications.
     */
    uuid: string;
    /**
     * The unit price of the line item. Returns 'undefined' for custom sales without set prices. Use for pricing calculations and displays.
     */
    price?: number;
    /**
     * The quantity of this item in the cart. Always a positive integer. Use for quantity displays, calculations, and inventory management.
     */
    quantity: number;
    /**
     * The display title of the line item. Returns 'undefined' for items without titles. Use for customer-facing displays and cart item identification.
     */
    title?: string;
    /**
     * The product variant 'ID' this line item represents. Returns 'undefined' for custom sales or non-variant items. Use for variant-specific operations and product details.
     */
    variantId?: number;
    /**
     * The product 'ID' this line item represents. Returns 'undefined' for custom sales or non-product items. Use for product-specific operations and linking to product details.
     */
    productId?: number;
    /**
     * An array of discounts applied to this line item. Empty array if no discounts are active. Use for displaying line item savings and discount details.
     */
    discounts: Discount[];
    /**
     * An array of discount allocations applied to this line item, providing detailed breakdown of how discounts are distributed. Returns 'undefined' if no allocations exist. Use for enhanced discount tracking and reporting.
     */
    discountAllocations?: DiscountAllocation[];
    /**
     * Determines whether this line item is subject to tax calculations. Use for tax computation, compliance, and pricing displays.
     */
    taxable: boolean;
    /**
     * An array of tax lines applied to this line item, containing tax amounts and rates. Use for detailed tax reporting and compliance.
     */
    taxLines: TaxLine[];
    /**
     * The Stock Keeping Unit (SKU) identifier for this line item. Returns 'undefined' if no SKU is configured. Use for inventory tracking and product identification.
     */
    sku?: string;
    /**
     * The vendor or brand name for this line item. Returns 'undefined' if no vendor is set. Use for vendor-specific displays and organization.
     */
    vendor?: string;
    /**
     * The custom key-value properties attached to this line item. Empty object if no properties are set. Use for metadata, customization options, or integration data.
     */
    properties: {
        [key: string]: string;
    };
    /**
     * Determines whether this line item is a gift card. Gift cards have special handling requirements and business logic. Use for implementing gift card-specific workflows.
     */
    isGiftCard: boolean;
    /**
     * The staff member 'ID' attributed to this line item. Returns 'undefined' if no staff attribution is set. Use for commission tracking and performance analytics.
     */
    attributedUserId?: number;
    /**
     * Determines whether this line item requires a selling plan (subscription) to be purchased. Returns 'undefined' if selling plan information is unavailable. Use for implementing subscription-based product handling.
     */
    requiresSellingPlan?: boolean;
    /**
     * Determines whether this line item has selling plan groups (subscription options) available. Returns 'undefined' if selling plan information is unavailable. Use for displaying subscription options.
     */
    hasSellingPlanGroups?: boolean;
    /**
     * The currently selected selling plan for this line item. Returns 'undefined' if no selling plan is applied. Contains selling plan details including 'ID', name, and delivery intervals. Use for subscription management and recurring purchase functionality.
     */
    sellingPlan?: SellingPlan;
    /**
     * Bundle components for this line item. Only present for [product bundles](/docs/apps/build/product-merchandising/bundles). Each component represents an individual item within the bundle with its own tax information.
     */
    components?: LineItemComponent[];
}
/**
 * Represents a component of a [product bundle](/docs/apps/build/product-merchandising/bundles) line item. Bundle components contain the individual items that make up a bundle, each with their own pricing and tax information.
 */
export interface LineItemComponent {
    /**
     * The display name for the custom sale item. Appears on receipts and in cart displays. Should be descriptive and customer-friendly.
     */
    title?: string;
    /**
     * The quantity of the custom sale item. Must be a positive integer. Use for quantity-based pricing and inventory management.
     */
    quantity: number;
    /**
     * The price for the custom sale item as currency string. Must be a valid positive amount. Use for non-catalog items and custom pricing.
     */
    price?: number;
    /**
     * Determines whether the custom sale item is taxable. Set to `true` to apply tax calculations, `false` to exempt from taxes.
     */
    taxable: boolean;
    /**
     * An array of tax lines applied to this component.
     */
    taxLines: TaxLine[];
    /**
     * The unique numeric identifier for the product variant this component represents, if applicable.
     */
    variantId?: number;
    /**
     * The unique numeric identifier for the product this component represents, if applicable.
     */
    productId?: number;
}
/**
 * Represents a selling plan (subscription) associated with a line item, containing delivery schedule and plan identification details.
 */
export interface SellingPlan {
    /**
     * The unique identifier of the selling plan.
     */
    id: number;
    /**
     * The name of the POS device.
     */
    name: string;
    /**
     * The fingerprint of the applied selling plan within this cart session. Provided by POS. Not available during refund / exchanges.
     */
    digest?: string;
    /**
     * The interval of the selling plan. (DAY, WEEK, MONTH, YEAR).
     */
    deliveryInterval?: string;
    /**
     * The number of intervals between deliveries.
     */
    deliveryIntervalCount?: number;
}
/**
 * Represents a discount applied to a cart or transaction, including amount and description.
 */
export interface Discount {
    /**
     * The discount value to apply. For `'Percentage'` type, this represents the percentage value (For example, "10" for 10% off). For `'FixedAmount'` type, this represents the fixed monetary amount to deduct from the line item price. Commonly used for discount calculations and displaying the discount value to merchants.
     */
    amount: number;
    /**
     * The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code associated with the location currently active on POS.
     */
    currency?: string;
    /**
     * A human-readable description of the discount shown to merchants and customers. This typically includes the discount name, promotion details, or discount code (for example, "SUMMER2024", "10% off entire order", "Buy 2 Get 1 Free"). Returns `undefined` when no description is provided.
     */
    discountDescription?: string;
    /**
     * The [discount type](https://help.shopify.com/en/manual/discounts/discount-types) applied to this line item. Can be either `'Percentage'` for percentage-based discounts or `'FixedAmount'` for fixed monetary amount discounts. This determines how the discount amount is calculated and displayed.
     */
    type?: string;
}
/**
 * Specifies the parameters for adding custom properties to line items. Properties are key-value pairs used for storing metadata, tracking information, or integration data.
 */
export interface SetLineItemPropertiesInput {
    /**
     * The target line item `UUID` for selling plan assignment. Must match an existing line item in the cart.
     */
    lineItemUuid: string;
    /**
     * The custom key-value properties to apply to the line item. Merged with existing properties—duplicate keys overwrite existing values.
     */
    properties: Record<string, string>;
}
/**
 * Specifies the parameters for applying discounts to individual line items. Includes the discount type, value, and reason for audit and reporting purposes.
 */
export interface SetLineItemDiscountInput {
    /**
     * The target line item `UUID` for selling plan assignment. Must match an existing line item in the cart.
     */
    lineItemUuid: string;
    /**
     * The discount details to apply to the line item. Contains title, type (`'Percentage'` or `'FixedAmount'`), and amount value.
     */
    lineItemDiscount: LineItemDiscount;
}
/**
 * Represents a discount applied to an individual line item in the cart.
 */
export interface LineItemDiscount {
    /**
     * The display name for the custom sale item. Appears on receipts and in cart displays. Should be descriptive and customer-friendly.
     */
    title: string;
    /**
     * The discount type.
     */
    type: 'Percentage' | 'FixedAmount';
    /**
     * The percentage or fixed amount for the discount.
     */
    amount: string;
}
/**
 * Represents a custom sale item that is not associated with a product in the catalog. Includes pricing, taxation, and descriptive information for manually created line items.
 */
export interface CustomSale {
    /**
     * The quantity of the custom sale item. Must be a positive integer. Use for quantity-based pricing and inventory management.
     */
    quantity: number;
    /**
     * The display name for the custom sale item. Appears on receipts and in cart displays. Should be descriptive and customer-friendly.
     */
    title: string;
    /**
     * The price for the custom sale item as currency string. Must be a valid positive amount. Use for non-catalog items and custom pricing.
     */
    price: string;
    /**
     * Determines whether the custom sale item is taxable. Set to `true` to apply tax calculations, `false` to exempt from taxes.
     */
    taxable: boolean;
}
/**
 * Represents physical address information for customer shipping and billing. Contains standard address fields including street, city, region, postal code, and country data.
 */
export interface Address {
    /**
     * The primary street address line. Required for most shipping and billing operations. Should contain street number and name.
     */
    address1?: string;
    /**
     * The secondary address line for apartment, suite, or unit information. Optional field for additional address details.
     */
    address2?: string;
    /**
     * The city name for the address. Required for shipping calculations and location-based services.
     */
    city?: string;
    /**
     * The company name associated with the address. Optional field for business customers and B2B transactions.
     */
    company?: string;
    /**
     * The first name for the address contact. Used for personalized shipping labels and customer communication.
     */
    firstName?: string;
    /**
     * The last name for the address contact. Required for complete customer identification and shipping labels.
     */
    lastName?: string;
    /**
     * The phone number for the address contact. Used for delivery notifications, shipping updates, and customer communication.
     */
    phone?: string;
    /**
     * The province or state name for the address. Required for regional shipping rates and tax calculations.
     */
    province?: string;
    /**
     * The country name for the address. Required for international shipping, tax calculations, and compliance.
     */
    country?: string;
    /**
     * The postal or ZIP code for the address. Required for accurate shipping rates and location-based services.
     */
    zip?: string;
    /**
     * The full name for the address contact. Use when first and last names are combined or unavailable as separate fields.
     */
    name?: string;
    /**
     * The standardized province or state code. Use for precise regional identification and automated shipping calculations.
     */
    provinceCode?: string;
    /**
     * The standardized country code (ISO format). Use for precise country identification and international shipping operations.
     */
    countryCode?: CountryCode;
}
/**
 * Specifies the parameters for assigning selling plans to line items. Used to add subscription or purchase option configurations to products.
 */
export interface SetLineItemSellingPlanInput {
    /**
     * The target line item `UUID` for selling plan assignment. Must match an existing line item in the cart.
     */
    lineItemUuid: string;
    /**
     * The selling plan `ID` to apply to the line item. Must be a valid selling plan available for the product.
     */
    sellingPlanId: number;
    /**
     * The selling plan name for display purposes. Required for proper selling plan display in the cart.
     */
    sellingPlanName?: string;
}
//# sourceMappingURL=cart.d.ts.map