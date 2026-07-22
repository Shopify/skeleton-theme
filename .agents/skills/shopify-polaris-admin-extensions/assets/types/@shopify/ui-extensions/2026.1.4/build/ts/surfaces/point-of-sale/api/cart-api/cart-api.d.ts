import type { ReadonlySignalLike } from '../../../../shared';
import type { Address, Cart, CartUpdateInput, Customer, CustomSale, SetLineItemDiscountInput, SetLineItemPropertiesInput, SetLineItemSellingPlanInput } from '../../types/cart';
/** @publicDocs */
export interface CartApi {
    cart: CartApiContent;
}
/**
 * Defines the type of discount applied at the cart level. Specifies whether the discount is percentage-based, fixed amount, or discount code redemption.
 */
export type CartDiscountType = 'Percentage' | 'FixedAmount' | 'Code';
/**
 * Defines the type of discount applied to individual line items. Specifies whether the discount is percentage-based or a fixed amount reduction.
 */
export type LineItemDiscountType = 'Percentage' | 'FixedAmount';
/**
 * The `CartApi` object provides access to cart management functionality and real-time cart state monitoring. Access these properties through `shopify.cart` to interact with the current POS cart.
 *
 * @publicDocs
 */
export interface CartApiContent {
    /**
     * Provides read-only access to the current cart state and allows subscribing to cart changes. The `value` property provides the current cart state, and `subscribe` allows listening to changes with improved performance and memory management.
     */
    current: ReadonlySignalLike<Cart>;
    /**
     * Perform a bulk update of the entire cart state including note, discounts, customer, line items, and properties. Returns the updated cart object after the operation completes with enhanced validation and error handling.
     *
     * @param cartState the cart state to set
     * @returns the updated cart
     */
    bulkCartUpdate(cartState: CartUpdateInput): Promise<Cart>;
    /**
     * Apply a cart-level discount with the specified type (`'Percentage'`, `'FixedAmount'`, or `'Code'`), title, and optional amount. For discount codes, omit the `amount` parameter. Enhanced validation ensures proper discount application.
     *
     * @param type the type of discount applied (example: 'Percentage')
     * @param title the title attributed with the discount
     * @param amount the percentage or fixed monetary amount deducted with the discount. Pass in `undefined` if using discount codes.
     */
    applyCartDiscount(type: CartDiscountType, title: string, amount?: string): Promise<void>;
    /**
     * Apply a discount code to the cart. The system will validate the code and apply the appropriate discount if the code is valid and applicable to the current cart contents with improved error messaging.
     *
     * @param code the code for the discount to add to the cart
     */
    addCartCodeDiscount(code: string): Promise<void>;
    /**
     * Remove the current cart-level discount. This only affects cart-level discounts and does not impact line item discounts or automatic discount eligibility.
     */
    removeCartDiscount(): Promise<void>;
    /**
     * Remove all discounts from both the cart and individual line items. Set `disableAutomaticDiscounts` to `true` to prevent automatic discounts from being reapplied after removal with enhanced discount allocation handling.
     *
     * @param disableAutomaticDiscounts Whether or not automatic discounts should be enabled after removing the discounts.
     */
    removeAllDiscounts(disableAutomaticDiscounts: boolean): Promise<void>;
    /**
     * Remove all line items and reset the cart to an empty state. This action can't be undone and will clear all cart contents including line items, discounts, properties, and selling plans.
     */
    clearCart(): Promise<void>;
    /**
     * Associate a customer with the current cart using the customer object containing the customer `ID`. This enables customer-specific pricing, discounts, and checkout features with enhanced customer data validation.
     *
     * @param customer the customer object to add to the cart
     */
    setCustomer(customer: Customer): Promise<void>;
    /**
     * Remove the currently associated customer from the cart, converting it back to a guest cart without customer-specific benefits or information while preserving cart contents.
     */
    removeCustomer(): Promise<void>;
    /**
     * Add a custom sale item to the cart with specified quantity, title, price, and taxable status. Returns the `UUID` of the created line item for future operations and property management.
     *
     * @param customSale the custom sale object to add to the cart
     * @returns {string} the UUID of the line item added
     */
    addCustomSale(customSale: CustomSale): Promise<string>;
    /**
     * Add a product variant to the cart by its numeric `ID` with the specified quantity. Returns the `UUID` of the newly added line item, or an empty string if the user dismissed an oversell guard modal. Throws an error if POS fails to add the line item due to validation or system errors.
     *
     * @param variantId the product variant's numeric ID to add to the cart
     * @param quantity the number of this variant to add to the cart
     * @returns {string} the UUID of the line item added, or the empty string if the user dismissed an oversell guard modal
     * @throws {Error} if POS fails to add the line item
     */
    addLineItem(variantId: number, quantity: number): Promise<string>;
    /**
     * Remove a specific line item from the cart using its `UUID`. The line item will be completely removed from the cart along with any associated discounts, properties, or selling plans.
     *
     * @param uuid the uuid of the line item that should be removed
     */
    removeLineItem(uuid: string): Promise<void>;
    /**
     * Add custom key-value properties to the cart for storing metadata, tracking information, or integration data. Properties are merged with existing cart properties with enhanced validation and conflict resolution.
     *
     * @param properties the custom key to value object to attribute to the cart
     */
    addCartProperties(properties: Record<string, string>): Promise<void>;
    /**
     * Remove specific cart properties by their keys. Only the specified property keys will be removed while other properties remain intact with improved error handling for non-existent keys.
     *
     * @param keys the collection of keys to be removed from the cart properties
     */
    removeCartProperties(keys: string[]): Promise<void>;
    /**
     * Add custom properties to a specific line item using its `UUID`. Properties are merged with existing line item properties for metadata storage and tracking with enhanced validation.
     *
     * @param uuid the uuid of the line item to which the properties should be stringd
     * @param properties the custom key to value object to attribute to the line item
     */
    addLineItemProperties(uuid: string, properties: Record<string, string>): Promise<void>;
    /**
     * Add properties to multiple line items simultaneously using an array of inputs containing line item `UUIDs` and their respective properties for efficient bulk operations with enhanced validation and error reporting.
     *
     * @param lineItemProperties the collection of custom line item properties to apply to their respective line items.
     */
    bulkAddLineItemProperties(lineItemProperties: SetLineItemPropertiesInput[]): Promise<void>;
    /**
     * Remove specific properties from a line item by `UUID` and property keys. Only the specified keys will be removed while other properties remain intact with improved error handling.
     *
     * @param uuid the uuid of the line item to which the properties should be removed
     * @param keys the collection of keys to be removed from the line item properties
     */
    removeLineItemProperties(uuid: string, keys: string[]): Promise<void>;
    /**
     * Apply a discount to a specific line item using its `UUID`. Specify the discount type (`'Percentage'` or `'FixedAmount'`), title, and amount value with improved discount allocation tracking.
     *
     * @param uuid the uuid of the line item that should receive a discount
     * @param type the type of discount applied (example: 'Percentage')
     * @param title the title attributed with the discount
     * @param amount the percentage or fixed monetary amount deducted with the discout
     */
    setLineItemDiscount(uuid: string, type: LineItemDiscountType, title: string, amount: string): Promise<void>;
    /**
     * Apply discounts to multiple line items simultaneously. Each input specifies the line item `UUID` and discount details for efficient bulk discount operations with enhanced validation and allocation tracking.
     *
     * @param lineItemDiscounts a map of discounts to add. They key is the uuid of the line item you want to add the discount to. The value is the discount input.
     */
    bulkSetLineItemDiscounts(lineItemDiscounts: SetLineItemDiscountInput[]): Promise<void>;
    /**
     * Set the attributed staff member for all line items in the cart using the staff `ID`. Pass `undefined` to clear staff attribution from all line items with enhanced staff validation and tracking.
     *
     * @param staffId the ID of the staff. Providing undefined will clear the attributed staff from all line items.
     */
    setAttributedStaff(staffId: number | undefined): Promise<void>;
    /**
     * Set the attributed staff member for a specific line item using the staff `ID` and line item `UUID`. Pass `undefined` as `staffId` to clear attribution from the line item with improved validation and error handling.
     *
     * @param staffId the ID of the staff. Providing undefined will clear the attributed staff on the line item.
     * @param lineItemUuid the UUID of the line item.
     */
    setAttributedStaffToLineItem(staffId: number | undefined, lineItemUuid: string): Promise<void>;
    /**
     * Remove all discounts from a specific line item identified by its `UUID`. This will clear any custom discounts applied to the line item while preserving discount allocation history.
     *
     * @param uuid the uuid of the line item whose discounts should be removed
     */
    removeLineItemDiscount(uuid: string): Promise<void>;
    /**
     * Add a new address to the customer associated with the cart. The customer must be present in the cart before adding addresses with enhanced address validation and formatting.
     *
     * @param address the address object to add to the customer in cart
     */
    addAddress(address: Address): Promise<void>;
    /**
     * Delete an existing address from the customer using the address `ID`. The customer must be present in the cart to perform this operation with improved error handling for invalid address `IDs`.
     *
     * @param addressId the address ID to delete
     */
    deleteAddress(addressId: number): Promise<void>;
    /**
     * Set a specific address as the default address for the customer using the address `ID`. The customer must be present in the cart to update the default address with enhanced validation.
     *
     * @param addressId the address ID to set as the default address
     */
    updateDefaultAddress(addressId: number): Promise<void>;
    /**
     * Add a selling plan to a line item in the cart using the line item `UUID`, selling plan `ID`, and selling plan name. Optionally provide delivery interval and interval count for improved performance, otherwise POS will fetch them after syncing the cart.
     *
     * @param uuid the uuid of the line item that should receive the selling plan
     * @param sellingPlanId the ID of the selling plan to add to the line item
     */
    addLineItemSellingPlan(input: SetLineItemSellingPlanInput): Promise<void>;
    /**
     * Remove the selling plan from a line item in the cart using the line item `UUID`. This will clear any subscription or recurring purchase configuration from the line item.
     *
     * @param uuid the uuid of the line item whose selling plan should be removed
     */
    removeLineItemSellingPlan(uuid: string): Promise<void>;
}
//# sourceMappingURL=cart-api.d.ts.map