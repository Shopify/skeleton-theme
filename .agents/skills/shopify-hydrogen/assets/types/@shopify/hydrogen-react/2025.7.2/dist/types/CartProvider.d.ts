import { CartBuyerIdentityInput, CountryCode, LanguageCode, Cart as CartType } from './storefront-api-types.js';
import { CartWithActions } from './cart-types.js';
import { PartialDeep } from 'type-fest';
export declare const CartContext: import("react").Context<CartWithActions | null>;
/**
 * The `useCart` hook provides access to the cart object. It must be a descendent of a `CartProvider` component.
 */
export declare function useCart(): CartWithActions;
type CartProviderProps = {
    /** Any `ReactNode` elements. */
    children: React.ReactNode;
    /**  Maximum number of cart lines to fetch. Defaults to 250 cart lines. */
    numCartLines?: number;
    /** A callback that is invoked when the process to create a cart begins, but before the cart is created in the Storefront API. */
    onCreate?: () => void;
    /** A callback that is invoked when the process to add a line item to the cart begins, but before the line item is added to the Storefront API. */
    onLineAdd?: () => void;
    /** A callback that is invoked when the process to remove a line item to the cart begins, but before the line item is removed from the Storefront API. */
    onLineRemove?: () => void;
    /** A callback that is invoked when the process to update a line item in the cart begins, but before the line item is updated in the Storefront API. */
    onLineUpdate?: () => void;
    /** A callback that is invoked when the process to add or update a note in the cart begins, but before the note is added or updated in the Storefront API. */
    onNoteUpdate?: () => void;
    /** A callback that is invoked when the process to update the buyer identity begins, but before the buyer identity is updated in the Storefront API. */
    onBuyerIdentityUpdate?: () => void;
    /** A callback that is invoked when the process to update the cart attributes begins, but before the attributes are updated in the Storefront API. */
    onAttributesUpdate?: () => void;
    /** A callback that is invoked when the process to update the cart discount codes begins, but before the discount codes are updated in the Storefront API. */
    onDiscountCodesUpdate?: () => void;
    /** A callback that is invoked when the process to create a cart completes */
    onCreateComplete?: () => void;
    /** A callback that is invoked when the process to add a line item to the cart completes */
    onLineAddComplete?: () => void;
    /** A callback that is invoked when the process to remove a line item to the cart completes */
    onLineRemoveComplete?: () => void;
    /** A callback that is invoked when the process to update a line item in the cart completes */
    onLineUpdateComplete?: () => void;
    /** A callback that is invoked when the process to add or update a note in the cart completes */
    onNoteUpdateComplete?: () => void;
    /** A callback that is invoked when the process to update the buyer identity completes */
    onBuyerIdentityUpdateComplete?: () => void;
    /** A callback that is invoked when the process to update the cart attributes completes */
    onAttributesUpdateComplete?: () => void;
    /** A callback that is invoked when the process to update the cart discount codes completes */
    onDiscountCodesUpdateComplete?: () => void;
    /** An object with fields that correspond to the Storefront API's [Cart object](https://shopify.dev/api/storefront/2025-07/objects/cart). */
    data?: PartialDeep<CartType, {
        recurseIntoArrays: true;
    }>;
    /** A fragment used to query the Storefront API's [Cart object](https://shopify.dev/api/storefront/2025-07/objects/cart) for all queries and mutations. A default value is used if no argument is provided. */
    cartFragment?: string;
    /** A customer access token that's accessible on the server if there's a customer login. */
    customerAccessToken?: CartBuyerIdentityInput['customerAccessToken'];
    /** The ISO country code for i18n. */
    countryCode?: CountryCode;
    /** The ISO language code for i18n. */
    languageCode?: LanguageCode;
};
/**
 * The `CartProvider` component synchronizes the state of the Storefront API Cart and a customer's cart,
 * and allows you to more easily manipulate the cart by adding, removing, and updating it.
 * It could be placed at the root of your app so that your whole app is able to use the `useCart()` hook anywhere.
 *
 * There are props that trigger when a call to the Storefront API is made, such as `onLineAdd={}` when a line is added to the cart.
 * There are also props that trigger when a call to the Storefront API is completed, such as `onLineAddComplete={}` when the fetch request for adding a line to the cart completes.
 *
 * The `CartProvider` component must be a descendant of the `ShopifyProvider` component.
 */
export declare function CartProvider({ children, numCartLines, onCreate, onLineAdd, onLineRemove, onLineUpdate, onNoteUpdate, onBuyerIdentityUpdate, onAttributesUpdate, onDiscountCodesUpdate, onCreateComplete, onLineAddComplete, onLineRemoveComplete, onLineUpdateComplete, onNoteUpdateComplete, onBuyerIdentityUpdateComplete, onAttributesUpdateComplete, onDiscountCodesUpdateComplete, data: cart, cartFragment, customerAccessToken, countryCode, languageCode, }: CartProviderProps): JSX.Element;
/**
 * Check for storage availability function obtained from
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 */
export declare function storageAvailable(type: 'localStorage' | 'sessionStorage'): boolean;
export {};
