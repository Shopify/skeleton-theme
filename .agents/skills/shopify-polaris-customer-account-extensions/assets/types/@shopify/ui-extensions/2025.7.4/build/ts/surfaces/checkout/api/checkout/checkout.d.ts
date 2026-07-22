import type { Attribute, SellingPlan, MailingAddress, ShippingAddress } from '../shared';
/**
 * Removes a note
 */
export interface NoteRemoveChange {
    /**
     * The type of the `NoteRemoveChange` API.
     */
    type: 'removeNote';
}
/**
 * An Update to a note on the order.
 * for example, the buyer could request detailed packaging instructions in an order note
 */
export interface NoteUpdateChange {
    /**
     * The type of the `NoteUpdateChange` API.
     */
    type: 'updateNote';
    /**
     * The new value of the note.
     */
    note: string;
}
export type NoteChange = NoteRemoveChange | NoteUpdateChange;
export interface NoteChangeResultSuccess {
    /**
     * The type of the `NoteChangeResultSuccess` API.
     */
    type: 'success';
}
export interface NoteChangeResultError {
    /**
     * The type of the `NoteChangeResultError` API.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It is **not** localized, and therefore should not be presented directly
     * to the buyer.
     */
    message: string;
}
export type NoteChangeResult = NoteChangeResultSuccess | NoteChangeResultError;
/**
 * Updates an attribute on the order. If an attribute with the
 * provided key does not already exist, it gets created.
 */
export interface AttributeUpdateChange {
    /**
     * The type of the `AttributeUpdateChange` API.
     */
    type: 'updateAttribute';
    /**
     * Key of the attribute to add or update
     */
    key: string;
    /**
     * Value for the attribute to add or update
     */
    value: string;
}
/**
 * Removes an attribute on the order if an attribute with the
 * provided key already exists.
 */
export interface AttributeRemoveChange {
    /**
     * The type of the `AttributeRemoveChange` API.
     */
    type: 'removeAttribute';
    /**
     * Key of the attribute to remove
     */
    key: string;
}
export type AttributeChange = AttributeUpdateChange | AttributeRemoveChange;
/**
 * The returned result of a successful update to an attribute.
 */
export interface AttributeChangeResultSuccess {
    /**
     * The type of the `AttributeChangeResultSuccess` API.
     */
    type: 'success';
}
/**
 * The returned result of an unsuccessful update to an attribute
 * with a message detailing the type of error that occurred.
 */
export interface AttributeChangeResultError {
    /**
     * The type of the `AttributeChangeResultError` API.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It is **not** localized, and therefore should not be presented directly
     * to the buyer.
     */
    message: string;
}
export type AttributeChangeResult = AttributeChangeResultSuccess | AttributeChangeResultError;
export interface CartLineChangeResultSuccess {
    /**
     * Indicates that the line item was changed successfully.
     */
    type: 'success';
}
export interface CartLineChangeResultError {
    /**
     * Indicates that the line item was not changed successfully. Refer to the `message` property for details about the error.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It is **not** localized, and therefore should not be presented directly
     * to the buyer.
     */
    message: string;
}
export type CartLineChangeResult = CartLineChangeResultSuccess | CartLineChangeResultError;
export type CartLineChange = CartLineAddChange | CartLineRemoveChange | CartLineUpdateChange;
export interface CartLineAddChange {
    /**
     * An identifier for changes that add line items.
     */
    type: 'addCartLine';
    /**
     * The merchandise ID being added.
     * @example 'gid://shopify/ProductVariant/123'
     */
    merchandiseId: string;
    /**
     * The quantity of the merchandise being added.
     */
    quantity: number;
    /**
     * The attributes associated with the line item.
     */
    attributes?: Attribute[];
    /**
     * The identifier of the selling plan that the merchandise is being purchased
     * with.
     */
    sellingPlanId?: SellingPlan['id'];
}
export interface CartLineRemoveChange {
    /**
     * An identifier for changes that remove line items.
     */
    type: 'removeCartLine';
    /**
     * Line Item ID.
     * @example 'gid://shopify/CartLine/123'
     */
    id: string;
    /**
     * The quantity being removed for this line item.
     */
    quantity: number;
}
export interface CartLineUpdateChange {
    /**
     * An identifier for changes that update line items.
     */
    type: 'updateCartLine';
    /**
     * Line Item ID.
     * @example 'gid://shopify/CartLine/123'
     */
    id: string;
    /**
     * The new merchandise ID for the line item.
     * @example 'gid://shopify/ProductVariant/123'
     */
    merchandiseId?: string;
    /**
     * The new quantity for the line item.
     */
    quantity?: number;
    /**
     * The new attributes for the line item.
     */
    attributes?: Attribute[];
    /**
     * The identifier of the selling plan that the merchandise is being purchased
     * with or `null` to remove the the product from the selling plan.
     */
    sellingPlanId?: SellingPlan['id'] | null;
}
export type DiscountCodeChange = DiscountCodeAddChange | DiscountCodeRemoveChange;
export type DiscountCodeChangeResult = DiscountCodeChangeResultSuccess | DiscountCodeChangeResultError;
export interface DiscountCodeAddChange {
    /**
     * The type of the `DiscountCodeChange` API.
     */
    type: 'addDiscountCode';
    /**
     * The code for the discount (case-insensitive)
     */
    code: string;
}
export interface DiscountCodeRemoveChange {
    /**
     * The type of the `DiscountCodeChange` API.
     */
    type: 'removeDiscountCode';
    /**
     * The code for the discount (case-insensitive)
     */
    code: string;
}
export interface DiscountCodeChangeResultSuccess {
    /**
     * Indicates that the discount code change was applied successfully.
     */
    type: 'success';
}
export interface DiscountCodeChangeResultError {
    /**
     * Indicates that the discount code change failed.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It is **not** localized, and therefore should not be presented directly
     * to the buyer.
     */
    message: string;
}
export type GiftCardChange = GiftCardAddChange | GiftCardRemoveChange;
export type GiftCardChangeResult = GiftCardChangeResultSuccess | GiftCardChangeResultError;
export interface GiftCardAddChange {
    /**
     * The type of the `GiftCardChange` API.
     */
    type: 'addGiftCard';
    /**
     * Gift card code.
     */
    code: string;
}
export interface GiftCardRemoveChange {
    /**
     * The type of the `GiftCardChange` API.
     */
    type: 'removeGiftCard';
    /**
     * The full gift card code, or the last four digits of the code.
     */
    code: string;
}
export interface GiftCardChangeResultSuccess {
    /**
     * Indicates that the gift card change was applied successfully.
     */
    type: 'success';
}
export interface GiftCardChangeResultError {
    /**
     * Indicates that the gift card change failed.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It is **not** localized, and therefore should not be presented directly
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
/** Removes a cart metafield. */
export interface MetafieldRemoveCartChange {
    /**
     * The type of the `MetafieldRemoveChange` API.
     */
    type: 'removeCartMetafield';
    /**
     * The name of the metafield to remove.
     */
    key: string;
    /**
     * The namespace of the metafield to remove.
     */
    namespace: string;
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
     * The metafield’s information type.
     */
    valueType: 'integer' | 'string' | 'json_string';
}
/**
 * Updates a cart metafield. If a metafield with the
 * provided key and namespace does not already exist, it gets created.
 */
export interface MetafieldUpdateCartChange {
    /**
     * The type of the `MetafieldUpdateChange` API.
     */
    type: 'updateCartMetafield';
    metafield: {
        /** The name of the metafield to update. */
        key: string;
        /** The namespace of the metafield to add. */
        namespace: string;
        /** The new information to store in the metafield. */
        value: string;
        /**
         * The metafield’s information type.
         * See the [`metafields documentation`](https://shopify.dev/docs/apps/custom-data/metafields/types) for a list of supported types.
         */
        type: string;
    };
}
export type MetafieldChange = MetafieldRemoveChange | MetafieldUpdateChange | MetafieldRemoveCartChange | MetafieldUpdateCartChange;
export interface MetafieldChangeResultSuccess {
    /**
     * The type of the `MetafieldChangeResultSuccess` API.
     */
    type: 'success';
}
export interface MetafieldChangeResultError {
    /**
     * The type of the `MetafieldChangeResultError` API.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It is **not** localized, and therefore should not be presented directly
     * to the buyer.
     */
    message: string;
}
export type MetafieldChangeResult = MetafieldChangeResultSuccess | MetafieldChangeResultError;
export interface ShippingAddressUpdateChange {
    /**
     * The type of the `ShippingAddressUpdateChange` API.
     */
    type: 'updateShippingAddress';
    /**
     * Fields to update in the shipping address. You only need to provide
     * values for the fields you want to update — any fields you do not list
     * will keep their current values.
     */
    address: Partial<ShippingAddress>;
}
export type ShippingAddressChange = ShippingAddressUpdateChange;
/**
 * The returned result of a successful update to the shipping address.
 */
export interface ShippingAddressChangeResultSuccess {
    /**
     * The type of the `ShippingAddressChangeResultSuccess` API.
     */
    type: 'success';
    errors: null;
}
/**
 * An error corresponding to a particular field from a given change
 */
export interface ShippingAddressChangeFieldError {
    /**
     * field key from MailingAddress where the error occurred
     */
    field?: keyof MailingAddress;
    /**
     * A message that explains the error. This message is useful for debugging.
     * It is **not** localized, and therefore should not be presented directly
     * to the buyer.
     */
    message: string;
}
/**
 * The returned result of an update to the shipping address
 * with a messages detailing the type of errors that occurred.
 */
export interface ShippingAddressChangeResultError {
    /**
     * The type of the `ShippingAddressChangeResultError` API.
     */
    type: 'error';
    /**
     * The errors corresponding to particular fields from a given change
     */
    errors: ShippingAddressChangeFieldError[];
}
export type ShippingAddressChangeResult = ShippingAddressChangeResultSuccess | ShippingAddressChangeResultError;
export interface CheckoutApi {
    /**
     * Performs an update on an attribute attached to the cart and checkout. If
     * successful, this mutation results in an update to the value retrieved
     * through the [`attributes`](https://shopify.dev/docs/api/checkout-ui-extensions/apis/attributes#standardapi-propertydetail-attributes) property.
     *
     * > Note: This method will return an error if the [cart instruction](https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions#standardapi-propertydetail-instructions) `attributes.canUpdateAttributes` is false, or the buyer is using an accelerated checkout method, such as Apple Pay, Google Pay, or Meta Pay.
     */
    applyAttributeChange(change: AttributeChange): Promise<AttributeChangeResult>;
    /**
     * Performs an update on the merchandise line items. It resolves when the new
     * line items have been negotiated and results in an update to the value
     * retrieved through the
     * [`lines`](https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-lines#standardapi-propertydetail-lines)
     * property.
     *
     * > Note: This method will return an error if the [cart instruction](https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions#standardapi-propertydetail-instructions) `lines.canAddCartLine` is false, or the buyer is using an accelerated checkout method, such as Apple Pay, Google Pay, or Meta Pay.
     */
    applyCartLinesChange(change: CartLineChange): Promise<CartLineChangeResult>;
    /**
     * Performs an update on the discount codes.
     * It resolves when the new discount codes have been negotiated and results in an update
     * to the value retrieved through the [`discountCodes`](https://shopify.dev/docs/api/checkout-ui-extensions/apis/discounts#standardapi-propertydetail-discountcodes) property.
     *
     * > Caution:
     * > See [security considerations](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#network-access) if your extension retrieves discount codes through a network call.
     *
     * > Note: This method will return an error if the [cart instruction](https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions#standardapi-propertydetail-instructions) `discounts.canUpdateDiscountCodes` is false, or the buyer is using an accelerated checkout method, such as Apple Pay, Google Pay, or Meta Pay.
     */
    applyDiscountCodeChange(change: DiscountCodeChange): Promise<DiscountCodeChangeResult>;
    /**
     * Performs an update on the gift cards.
     * It resolves when gift card change have been negotiated and results in an update
     * to the value retrieved through the [`appliedGiftCards`](https://shopify.dev/docs/api/checkout-ui-extensions/apis/gift-cards#standardapi-propertydetail-appliedgiftcards) property.
     *
     * > Caution:
     * > See [security considerations](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#network-access) if your extension retrieves gift card codes through a network call.
     *
     * > Note: This method will return an error if the buyer is using an accelerated checkout method, such as Apple Pay, Google Pay, or Meta Pay.
     */
    applyGiftCardChange(change: GiftCardChange): Promise<GiftCardChangeResult>;
    /**
     * Performs an update on a piece of metadata attached to the checkout. If
     * successful, this mutation results in an update to the value retrieved
     * through the [`metafields`](https://shopify.dev/docs/api/checkout-ui-extensions/apis/metafields#standardapi-propertydetail-metafields) property.
     *
     * > Note: This method will return an error if the [cart instruction](https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions#standardapi-propertydetail-instructions) `metafields.canSetCartMetafields` is false, or the buyer is using an accelerated checkout method, such as Apple Pay, Google Pay, or Meta Pay.
     */
    applyMetafieldChange(change: MetafieldChange): Promise<MetafieldChangeResult>;
    /**
     * Performs an update on the note attached to the cart and checkout. If
     * successful, this mutation results in an update to the value retrieved
     * through the [`note`](https://shopify.dev/docs/api/checkout-ui-extensions/apis/note#standardapi-propertydetail-note) property.
     *
     * > Note: This method will return an error if the [cart instruction](https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions#standardapi-propertydetail-instructions) `notes.canUpdateNote` is false, or the buyer is using an accelerated checkout method, such as Apple Pay, Google Pay, or Meta Pay.
     */
    applyNoteChange(change: NoteChange): Promise<NoteChangeResult>;
    /**
     * @private
     */
    experimentalIsShopAppStyle?: boolean;
    /**
     * Performs an update of the shipping address. Shipping address changes will
     * completely overwrite the existing shipping address added by the user without
     * any prompts. If successful, this mutation results in an update to the value
     * retrieved through the `shippingAddress` property.
     *
     * > Note: This method will return an error if the [cart instruction](https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions#standardapi-propertydetail-instructions) `delivery.canSelectCustomAddress` is false, or the buyer is using an accelerated checkout method, such as Apple Pay, Google Pay, or Meta Pay.
     *
     * {% include /apps/checkout/privacy-icon.md %} Requires access to [protected customer data](/docs/apps/store/data-protection/protected-customer-data).
     */
    applyShippingAddressChange?(change: ShippingAddressChange): Promise<ShippingAddressChangeResult>;
}
//# sourceMappingURL=checkout.d.ts.map