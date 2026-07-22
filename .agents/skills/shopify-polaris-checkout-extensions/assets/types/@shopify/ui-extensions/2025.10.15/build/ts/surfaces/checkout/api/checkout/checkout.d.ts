import type { Attribute, SellingPlan, MailingAddress, ShippingAddress } from '../shared';
/**
 * Clears the buyer's note from the checkout. Pass this to `applyNoteChange()` to remove any existing note.
 */
export interface NoteRemoveChange {
    /**
     * Identifies this as a note removal. Set this when creating a change to clear the buyer's note.
     */
    type: 'removeNote';
}
/**
 * Sets or replaces the buyer's note on the checkout. Pass this to `applyNoteChange()` to update the note.
 */
export interface NoteUpdateChange {
    /**
     * Identifies this as a note update. Set this when creating a change to set or replace the buyer's note.
     */
    type: 'updateNote';
    /**
     * The text to set as the buyer's note. This replaces any existing note entirely rather than appending to it.
     */
    note: string;
}
/**
 * The input for `applyNoteChange()`. Pass either a `NoteUpdateChange` (with `type: 'updateNote'`) to set the note or a `NoteRemoveChange` (with `type: 'removeNote'`) to clear it.
 */
export type NoteChange = NoteRemoveChange | NoteUpdateChange;
/**
 * The result of a successful note change. The `type` property is `'success'`.
 */
export interface NoteChangeResultSuccess {
    /**
     * Indicates that the note change was applied successfully.
     */
    type: 'success';
}
/**
 * The result of a failed note change. Check the `message` property for details about what went wrong.
 */
export interface NoteChangeResultError {
    /**
     * Indicates that the note change couldn't be applied. Check the `message` property for details.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It isn't localized and shouldn't be displayed to the buyer.
     *
     * Render your own localized error text rather than displaying this message
     * to the buyer.
     */
    message: string;
}
/**
 * The result of calling `applyNoteChange()`. Use the `type` property to determine whether the change succeeded or failed.
 */
export type NoteChangeResult = NoteChangeResultSuccess | NoteChangeResultError;
/**
 * Updates an attribute on the cart and checkout. If an attribute with the
 * provided key doesn't already exist, then it gets created.
 */
export interface AttributeUpdateChange {
    /**
     * Identifies this as an attribute update or creation. Set this when creating a change to add or replace an attribute value.
     */
    type: 'updateAttribute';
    /**
     * The key of the attribute to add or update. If an attribute with this key
     * already exists, then its value is replaced.
     */
    key: string;
    /**
     * The new value for the attribute.
     */
    value: string;
}
/**
 * Removes an attribute from the checkout. Pass this to `applyAttributeChange()` to delete an attribute by key. If the key doesn't exist, then the change has no effect.
 */
export interface AttributeRemoveChange {
    /**
     * Identifies this as an attribute removal. Set this when creating a change to delete an attribute by key.
     */
    type: 'removeAttribute';
    /**
     * The key of the attribute to remove.
     */
    key: string;
}
/**
 * The input for `applyAttributeChange()`. Pass either an `AttributeUpdateChange` (with `type: 'updateAttribute'`) to set the attribute or an `AttributeRemoveChange` (with `type: 'removeAttribute'`) to delete it.
 */
export type AttributeChange = AttributeUpdateChange | AttributeRemoveChange;
/**
 * The result of a successful attribute change. The `type` property is `'success'`.
 */
export interface AttributeChangeResultSuccess {
    /**
     * Indicates that the attribute change was applied successfully.
     */
    type: 'success';
}
/**
 * The result of a failed attribute change. Check the `message` property for details about what went wrong.
 */
export interface AttributeChangeResultError {
    /**
     * Indicates that the attribute change couldn't be applied. Check the `message` property for details.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It isn't localized and shouldn't be displayed to the buyer.
     */
    message: string;
}
/**
 * The result of calling `applyAttributeChange()`. Use the `type` property to determine whether the change succeeded or failed.
 */
export type AttributeChangeResult = AttributeChangeResultSuccess | AttributeChangeResultError;
/**
 * The result of a successful cart line change. The `type` property is `'success'`.
 */
export interface CartLineChangeResultSuccess {
    /**
     * Indicates that the cart line change was applied successfully.
     */
    type: 'success';
}
/**
 * The result of a failed cart line change. Check the `message` property for details about what went wrong.
 */
export interface CartLineChangeResultError {
    /**
     * Indicates that the line item wasn't changed successfully. Refer to the `message` property for details about the error.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It isn't localized and shouldn't be displayed to the buyer.
     *
     * Render your own localized error text rather than displaying this message
     * to the buyer.
     */
    message: string;
}
/**
 * The result of calling `applyCartLinesChange()`. Use the `type` property to determine whether the change succeeded or failed.
 */
export type CartLineChangeResult = CartLineChangeResultSuccess | CartLineChangeResultError;
/**
 * The input for `applyCartLinesChange()`. Use the `type` property to specify the operation.
 *
 * - `CartLineAddChange` (`type: 'addCartLine'`): Adds a new line item to the cart.
 * - `CartLineRemoveChange` (`type: 'removeCartLine'`): Removes an existing line item.
 * - `CartLineUpdateChange` (`type: 'updateCartLine'`): Updates an existing line item's quantity, variant, or attributes.
 */
export type CartLineChange = CartLineAddChange | CartLineRemoveChange | CartLineUpdateChange;
/**
 * Adds a new line item to the cart. Pass this to `applyCartLinesChange()` to add a product variant with a specified quantity and optional attributes.
 */
export interface CartLineAddChange {
    /**
     * Identifies this as a line item addition. Set this when creating a change to add a new product to the cart.
     */
    type: 'addCartLine';
    /**
     * The globally-unique identifier of the product variant to add.
     * @example 'gid://shopify/ProductVariant/123'
     */
    merchandiseId: string;
    /**
     * The number of items to add. Must be a positive integer.
     */
    quantity: number;
    /**
     * Custom key-value attributes to attach to the new line item.
     */
    attributes?: Attribute[];
    /**
     * The identifier of the [selling plan](https://shopify.dev/docs/apps/build/purchase-options/subscriptions) to associate with this line item, such as a subscription or pre-order plan.
     */
    sellingPlanId?: SellingPlan['id'];
    /**
     * The parent cart line to associate the new item with, identified by either `lineId` or `merchandiseId`. Use this when adding child items to a bundle.
     */
    parent?: {
        lineId: string;
    } | {
        merchandiseId: string;
    };
}
/**
 * Removes an existing line item from the cart. Pass this to `applyCartLinesChange()` to remove a specified quantity of a line item.
 */
export interface CartLineRemoveChange {
    /**
     * Identifies this as a line item removal. Set this when creating a change to remove a product from the cart.
     */
    type: 'removeCartLine';
    /**
     * The unique identifier of the cart line to remove. Look up the current ID from `lines` before calling, because cart line IDs aren't stable.
     * @example 'gid://shopify/CartLine/123'
     */
    id: string;
    /**
     * The number of items to remove from this line.
     */
    quantity: number;
}
/**
 * Updates an existing line item in the cart. Pass this to `applyCartLinesChange()` to change a line item's quantity, variant, selling plan, or attributes.
 */
export interface CartLineUpdateChange {
    /**
     * Identifies this as a line item update. Set this when creating a change to modify a line item's quantity, variant, or attributes.
     */
    type: 'updateCartLine';
    /**
     * The unique identifier of the cart line to update. Look up the current ID from `lines` before calling, because cart line IDs aren't stable.
     * @example 'gid://shopify/CartLine/123'
     */
    id: string;
    /**
     * The new product variant to swap in for this line item. Only provide this if you want to change the variant.
     * @example 'gid://shopify/ProductVariant/123'
     */
    merchandiseId?: string;
    /**
     * The new quantity for this line item. Only provide this if you want to change the quantity.
     */
    quantity?: number;
    /**
     * The new custom key-value attributes for this line item. Replaces all existing attributes when provided.
     */
    attributes?: Attribute[];
    /**
     * The [selling plan](https://shopify.dev/docs/apps/build/purchase-options/subscriptions) to associate with this line item. Pass `null` to remove the item from its current selling plan.
     */
    sellingPlanId?: SellingPlan['id'] | null;
    /**
     * The parent cart line to associate this item with. Use this when updating the parent relationship for bundled items.
     */
    parent?: {
        lineId: string;
    } | {
        merchandiseId: string;
    };
}
/**
 * The input for `applyDiscountCodeChange()`. Pass either a `DiscountCodeAddChange` (with `type: 'addDiscountCode'`) to apply a code or a `DiscountCodeRemoveChange` (with `type: 'removeDiscountCode'`) to remove it.
 */
export type DiscountCodeChange = DiscountCodeAddChange | DiscountCodeRemoveChange;
/**
 * The result of calling `applyDiscountCodeChange()`. Use the `type` property to determine whether the change succeeded or failed.
 */
export type DiscountCodeChangeResult = DiscountCodeChangeResultSuccess | DiscountCodeChangeResultError;
/**
 * Applies a discount code to the checkout. Pass this to `applyDiscountCodeChange()` to add a code.
 */
export interface DiscountCodeAddChange {
    /**
     * Identifies this as a discount code addition. Set this when creating a change to apply a discount code to the checkout.
     */
    type: 'addDiscountCode';
    /**
     * The discount code to apply. Codes are case-insensitive.
     */
    code: string;
}
/**
 * Removes a discount code from the checkout. Pass this to `applyDiscountCodeChange()` to remove a code.
 */
export interface DiscountCodeRemoveChange {
    /**
     * Identifies this as a discount code removal. Set this when creating a change to remove a discount code from the checkout.
     */
    type: 'removeDiscountCode';
    /**
     * The discount code to remove. Codes are case-insensitive.
     */
    code: string;
}
/**
 * The result of a successful discount code change. The `type` property is `'success'`.
 */
export interface DiscountCodeChangeResultSuccess {
    /**
     * Indicates that the discount code change was applied successfully.
     */
    type: 'success';
}
/**
 * The result of a failed discount code change. Check the `message` property for details about what went wrong.
 */
export interface DiscountCodeChangeResultError {
    /**
     * Indicates that the discount code change couldn't be applied. Check the `message` property for details.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It isn't localized and shouldn't be displayed to the buyer.
     */
    message: string;
}
/**
 * The input for `applyGiftCardChange()`. Pass either a `GiftCardAddChange` (with `type: 'addGiftCard'`) to apply a gift card or a `GiftCardRemoveChange` (with `type: 'removeGiftCard'`) to remove it.
 */
export type GiftCardChange = GiftCardAddChange | GiftCardRemoveChange;
/**
 * The result of calling `applyGiftCardChange()`. Use the `type` property to determine whether the change succeeded or failed.
 */
export type GiftCardChangeResult = GiftCardChangeResultSuccess | GiftCardChangeResultError;
/**
 * Applies a gift card to the checkout. Pass this to `applyGiftCardChange()` to add a gift card.
 */
export interface GiftCardAddChange {
    /**
     * Identifies this as a gift card addition. Set this when creating a change to apply a gift card to the checkout.
     */
    type: 'addGiftCard';
    /**
     * The full gift card code to apply to the checkout.
     */
    code: string;
}
/**
 * Removes a gift card from the checkout. Pass this to `applyGiftCardChange()` to remove a gift card.
 */
export interface GiftCardRemoveChange {
    /**
     * Identifies this as a gift card removal. Set this when creating a change to remove a gift card from the checkout.
     */
    type: 'removeGiftCard';
    /**
     * The gift card code to remove. You can pass either the full code or
     * just the last four characters.
     */
    code: string;
}
/**
 * The result of a successful gift card change. The `type` property is `'success'`.
 */
export interface GiftCardChangeResultSuccess {
    /**
     * Indicates that the gift card change was applied successfully.
     */
    type: 'success';
}
/**
 * The result of a failed gift card change. Check the `message` property for details about what went wrong.
 */
export interface GiftCardChangeResultError {
    /**
     * Indicates that the gift card change couldn't be applied. Check the `message` property for details.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It isn't localized and shouldn't be displayed to the buyer.
     *
     * Render your own localized error text rather than displaying this message
     * to the buyer.
     */
    message: string;
}
/** Removes a metafield. */
export interface MetafieldRemoveChange {
    /**
     * The type of the `MetafieldRemoveChange` API.
     */
    type: 'removeMetafield';
    /**
     * The name of the metafield to remove.
     */
    key: string;
    /**
     * The namespace of the metafield to remove.
     */
    namespace: string;
}
/** Removes a cart [metafield](https://shopify.dev/docs/apps/build/custom-data/metafields). Pass this to `applyMetafieldChange()` to delete a metafield by key and namespace. */
export interface MetafieldRemoveCartChange {
    /**
     * Identifies this as a cart metafield removal. Set this when creating a change to delete an existing metafield by key and namespace.
     */
    type: 'removeCartMetafield';
    /**
     * The name of the metafield to remove.
     */
    key: string;
    /**
     * The namespace of the metafield to remove.
     */
    namespace?: string;
}
/**
 * Updates a metafield. If a metafield with the
 * provided key and namespace does not already exist, it gets created.
 */
export interface MetafieldUpdateChange {
    /**
     * The type of the `MetafieldUpdateChange` API.
     */
    type: 'updateMetafield';
    /** The name of the metafield to update. */
    key: string;
    /** The namespace of the metafield to add. */
    namespace: string;
    /** The new information to store in the metafield. */
    value: string | number;
    /**
     * The metafield's information type.
     */
    valueType: 'integer' | 'string' | 'json_string';
}
/**
 * Creates or updates a cart [metafield](https://shopify.dev/docs/apps/build/custom-data/metafields). Pass this to `applyMetafieldChange()` to set a metafield value. If a metafield with the provided key and namespace doesn't already exist, then it gets created.
 */
export interface MetafieldUpdateCartChange {
    /**
     * Identifies this as a cart metafield creation or update. Set this when creating a change to set a metafield value.
     */
    type: 'updateCartMetafield';
    /**
     * The metafield data to set on the cart. If a metafield with this key and namespace already exists, then its value is replaced.
     */
    metafield: {
        /** The name of the metafield to update. */
        key: string;
        /** The namespace of the metafield to update. */
        namespace?: string;
        /** The new information to store in the metafield. */
        value: string;
        /**
         * The metafield's information type.
         * See the [metafield types documentation](https://shopify.dev/docs/apps/build/custom-data/metafields/list-of-data-types) for a list of supported types.
         */
        type: string;
    };
}
/**
 * The input for `applyMetafieldChange()`. Use the `type` property to specify the operation.
 *
 * - `MetafieldRemoveCartChange` (`type: 'removeCartMetafield'`): Removes an existing cart [metafield](https://shopify.dev/docs/apps/build/custom-data/metafields).
 * - `MetafieldUpdateCartChange` (`type: 'updateCartMetafield'`): Creates or updates a cart metafield.
 * - `MetafieldRemoveChange` (`type: 'removeMetafield'`) - Removes an existing metafield.
 * - `MetafieldUpdateChange` (`type: 'updateMetafield'`) - Creates or updates a metafield.
 */
export type MetafieldChange = MetafieldRemoveChange | MetafieldUpdateChange | MetafieldRemoveCartChange | MetafieldUpdateCartChange;
/**
 * The result of a successful metafield change. The `type` property is `'success'`.
 */
export interface MetafieldChangeResultSuccess {
    /**
     * Indicates that the metafield change was applied successfully.
     */
    type: 'success';
}
/**
 * The result of a failed metafield change. Check the `message` property for details about what went wrong.
 */
export interface MetafieldChangeResultError {
    /**
     * Indicates that the metafield change couldn't be applied. Check the `message` property for details.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It isn't localized and shouldn't be displayed to the buyer.
     *
     * Render your own localized error text rather than displaying this message
     * to the buyer.
     */
    message: string;
}
/**
 * The result of calling `applyMetafieldChange()`. Use the `type` property to determine whether the change succeeded or failed.
 */
export type MetafieldChangeResult = MetafieldChangeResultSuccess | MetafieldChangeResultError;
/**
 * Updates the buyer's shipping address on the checkout. Pass this to `applyShippingAddressChange()` to modify specific address fields without replacing the entire address.
 */
export interface ShippingAddressUpdateChange {
    /**
     * Identifies this as a shipping address update. This is the only supported change type for `applyShippingAddressChange()`.
     */
    type: 'updateShippingAddress';
    /**
     * Fields to update in the shipping address. You only need to provide
     * values for the fields you want to update. Any fields you don't list
     * keep their current values.
     */
    address: Partial<ShippingAddress>;
}
/**
 * The input for `applyShippingAddressChange()`. Currently only supports `ShippingAddressUpdateChange` (with `type: 'updateShippingAddress'`).
 */
export type ShippingAddressChange = ShippingAddressUpdateChange;
/**
 * The result of a successful shipping address change. The `type` property is `'success'` and `errors` is `null`.
 */
export interface ShippingAddressChangeResultSuccess {
    /**
     * Indicates that the shipping address change was applied successfully.
     */
    type: 'success';
    /**
     * Always `null` for a successful address change. Present so that you can
     * check `result.errors` without narrowing the union type first.
     */
    errors: null;
}
/**
 * An error corresponding to a particular field from a given change. Use the `field` property to determine which address field caused the error.
 */
export interface ShippingAddressChangeFieldError {
    /**
     * The `MailingAddress` field that caused the error, such as `'countryCode'` or `'zip'`. The value is `undefined` if the error isn't specific to a single field.
     */
    field?: keyof MailingAddress;
    /**
     * A message that explains the error. This message is useful for debugging.
     * It isn't localized and shouldn't be displayed to the buyer.
     */
    message: string;
}
/**
 * The result of a failed shipping address change. Check the `errors` array for field-level details about what went wrong.
 */
export interface ShippingAddressChangeResultError {
    /**
     * Indicates that the shipping address change couldn't be applied. Check the `errors` array for field-level details.
     */
    type: 'error';
    /**
     * The list of field-level errors that prevented the address change. Each entry identifies which address field failed and why.
     */
    errors: ShippingAddressChangeFieldError[];
}
/**
 * The result of calling `applyShippingAddressChange()`. Use the `type` property to determine whether the change succeeded or failed. On failure, the `errors` array contains field-level details.
 */
export type ShippingAddressChangeResult = ShippingAddressChangeResultSuccess | ShippingAddressChangeResultError;
/**
 * Methods for modifying the checkout, including cart lines, discount codes, gift cards, metafields, notes, attributes, and the shipping address. Each method returns a promise that resolves with a result indicating success or failure.
 */
/** @publicDocs */
export interface CheckoutApi {
    /**
     * Updates or removes an attribute on the cart and checkout. On success, the
     * [`attributes`](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/attributes#properties-propertydetail-attributes) property updates to reflect the change.
     *
     * > Note: This method returns an error if the [cart instruction](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/cart-instructions#properties-propertydetail-instructions) `attributes.canUpdateAttributes` is false, or the buyer is using an accelerated checkout method, such as Apple Pay or Google Pay.
     */
    applyAttributeChange(change: AttributeChange): Promise<AttributeChangeResult>;
    /**
     * Adds, removes, or updates line items in the cart. The returned promise resolves when the change has been applied by the server, and the [`lines`](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/cart-lines#properties-propertydetail-lines) property updates with the new state.
     *
     * Accepts a single change per call. To make multiple changes, call this
     * method separately for each one.
     *
     * > Note: This method returns an error if the [cart instruction](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/cart-instructions#properties-propertydetail-instructions) `lines.canAddCartLine` is false, or the buyer is using an accelerated checkout method, such as Apple Pay or Google Pay.
     */
    applyCartLinesChange(change: CartLineChange): Promise<CartLineChangeResult>;
    /**
     * Adds or removes a discount code on the checkout. The returned promise resolves when the change has been applied by the server, and the [`discountCodes`](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/discounts#properties-propertydetail-discountcodes) property updates with the new state.
     *
     * > Caution:
     * > See [security considerations](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/configuration#network-access) if your extension retrieves discount codes through a network call.
     *
     * > Note: This method returns an error if the [cart instruction](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/cart-instructions#properties-propertydetail-instructions) `discounts.canUpdateDiscountCodes` is false, or the buyer is using an accelerated checkout method, such as Apple Pay or Google Pay.
     */
    applyDiscountCodeChange(change: DiscountCodeChange): Promise<DiscountCodeChangeResult>;
    /**
     * Adds or removes a gift card from the checkout. The returned promise resolves when the change has been applied by the server, and the [`appliedGiftCards`](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/gift-cards#properties-propertydetail-appliedgiftcards) property updates with the new state.
     *
     * Unlike other write operations, gift card changes aren't gated by a cart
     * instruction flag.
     *
     * > Caution:
     * > See [security considerations](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/configuration#network-access) if your extension retrieves gift card codes through a network call.
     *
     * > Note: This method returns an error if the buyer is using an accelerated checkout method, such as Apple Pay or Google Pay.
     */
    applyGiftCardChange(change: GiftCardChange): Promise<GiftCardChangeResult>;
    /**
     * Creates, updates, or removes a metafield on the checkout. On success, the
     * [`metafields`](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/metafields#properties-propertydetail-metafields) property updates to reflect the change.
     *
     * > Note: This method returns an error if the [cart instruction](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/cart-instructions#properties-propertydetail-instructions) `metafields.canSetCartMetafields` is false, or the buyer is using an accelerated checkout method, such as Apple Pay or Google Pay.
     */
    applyMetafieldChange(change: MetafieldChange): Promise<MetafieldChangeResult>;
    /**
     * Sets or removes the buyer's note on the checkout. On success, the
     * [`note`](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/note#properties-propertydetail-note)
     * property updates to reflect the change.
     *
     * > Note: This method returns an error if the [cart instruction](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/cart-instructions#properties-propertydetail-instructions) `notes.canUpdateNote` is false, or the buyer is using an accelerated checkout method, such as Apple Pay or Google Pay.
     */
    applyNoteChange(change: NoteChange): Promise<NoteChangeResult>;
    /**
     * @private
     */
    experimentalIsShopAppStyle?: boolean;
    /**
     * Updates the buyer's shipping address on the checkout. The provided fields
     * are merged into the existing address without prompting the buyer. On success,
     * the `shippingAddress` property updates to reflect the change.
     *
     * > Note: This method returns an error if the [cart instruction](https://shopify.dev/docs/api/checkout-ui-extensions/{API_VERSION}/apis/cart-instructions#properties-propertydetail-instructions) `delivery.canSelectCustomAddress` is false, or the buyer is using an accelerated checkout method, such as Apple Pay or Google Pay.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](https://shopify.dev/docs/apps/store/data-protection/protected-customer-data).
     */
    applyShippingAddressChange?(change: ShippingAddressChange): Promise<ShippingAddressChangeResult>;
}
//# sourceMappingURL=checkout.d.ts.map