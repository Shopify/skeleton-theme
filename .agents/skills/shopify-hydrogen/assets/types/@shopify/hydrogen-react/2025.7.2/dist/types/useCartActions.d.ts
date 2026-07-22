import { AttributeInput, CartBuyerIdentityInput, CartInput, CartLineInput, CartLineUpdateInput, CountryCode, LanguageCode, Cart as CartType, MutationCartDiscountCodesUpdateArgs, MutationCartNoteUpdateArgs } from './storefront-api-types.js';
import { PartialDeep } from 'type-fest';
type CartResponse = PartialDeep<CartType, {
    recurseIntoArrays: true;
}>;
/**
 * The `useCartActions` hook returns helper graphql functions for Storefront Cart API
 *
 * See [cart API graphql mutations](https://shopify.dev/api/storefront/2025-07/objects/Cart)
 */
export declare function useCartActions({ numCartLines, cartFragment, countryCode, languageCode, }: {
    /**  Maximum number of cart lines to fetch. Defaults to 250 cart lines. */
    numCartLines?: number;
    /** A fragment used to query the Storefront API's [Cart object](https://shopify.dev/api/storefront/2025-07/objects/cart) for all queries and mutations. A default value is used if no argument is provided. */
    cartFragment: string;
    /** The ISO country code for i18n. Default to `US` */
    countryCode?: CountryCode;
    /** The ISO language code for i18n. Default to `EN` */
    languageCode?: LanguageCode;
}): {
    cartFetch: (cartId: string) => Promise<import("./storefront-api-response.types.js").StorefrontApiResponseOkPartial<{
        cart: CartResponse;
    }>>;
    cartCreate: (cart: CartInput) => Promise<import("./storefront-api-response.types.js").StorefrontApiResponseOkPartial<{
        cartCreate: {
            cart: CartResponse;
        };
    }>>;
    cartLineAdd: (cartId: string, lines: CartLineInput[]) => Promise<import("./storefront-api-response.types.js").StorefrontApiResponseOkPartial<{
        cartLinesAdd: {
            cart: CartResponse;
        };
    }>>;
    cartLineUpdate: (cartId: string, lines: CartLineUpdateInput[]) => Promise<import("./storefront-api-response.types.js").StorefrontApiResponseOkPartial<{
        cartLinesUpdate: {
            cart: CartResponse;
        };
    }>>;
    cartLineRemove: (cartId: string, lines: string[]) => Promise<import("./storefront-api-response.types.js").StorefrontApiResponseOkPartial<{
        cartLinesRemove: {
            cart: CartResponse;
        };
    }>>;
    noteUpdate: (cartId: string, note: MutationCartNoteUpdateArgs["note"]) => Promise<import("./storefront-api-response.types.js").StorefrontApiResponseOkPartial<{
        cartNoteUpdate: {
            cart: CartResponse;
        };
    }>>;
    buyerIdentityUpdate: (cartId: string, buyerIdentity: CartBuyerIdentityInput) => Promise<import("./storefront-api-response.types.js").StorefrontApiResponseOkPartial<{
        cartBuyerIdentityUpdate: {
            cart: CartResponse;
        };
    }>>;
    cartAttributesUpdate: (cartId: string, attributes: AttributeInput[]) => Promise<import("./storefront-api-response.types.js").StorefrontApiResponseOkPartial<{
        cartAttributesUpdate: {
            cart: CartResponse;
        };
    }>>;
    discountCodesUpdate: (cartId: string, discountCodes: MutationCartDiscountCodesUpdateArgs["discountCodes"]) => Promise<import("./storefront-api-response.types.js").StorefrontApiResponseOkPartial<{
        cartDiscountCodesUpdate: {
            cart: CartResponse;
        };
    }>>;
    cartFragment: string;
};
export {};
