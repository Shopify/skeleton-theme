import { StateMachine } from '@xstate/fsm';
import { Cart, CartMachineActionEvent, CartMachineContext, CartMachineEvent, CartMachineFetchResultEvent, CartMachineTypeState } from './cart-types.js';
import { CountryCode, Cart as CartType, LanguageCode } from './storefront-api-types.js';
import type { PartialDeep } from 'type-fest';
export declare function useCartAPIStateMachine({ numCartLines, onCartActionEntry, onCartActionOptimisticUI, onCartActionComplete, data: cart, cartFragment, countryCode, languageCode, }: {
    /**  Maximum number of cart lines to fetch. Defaults to 250 cart lines. */
    numCartLines?: number;
    /** A callback that is invoked just before a Cart API action executes. */
    onCartActionEntry?: (context: CartMachineContext, event: CartMachineActionEvent) => void;
    /** A callback that is invoked after executing the entry actions for optimistic UI changes.  */
    onCartActionOptimisticUI?: (context: CartMachineContext, event: CartMachineEvent) => Partial<CartMachineContext>;
    /** A callback that is invoked after a Cart API completes. */
    onCartActionComplete?: (context: CartMachineContext, event: CartMachineFetchResultEvent) => void;
    /** An object with fields that correspond to the Storefront API's [Cart object](https://shopify.dev/api/storefront/2025-07/objects/cart). */
    data?: PartialDeep<CartType, {
        recurseIntoArrays: true;
    }>;
    /** A fragment used to query the Storefront API's [Cart object](https://shopify.dev/api/storefront/2025-07/objects/cart) for all queries and mutations. A default value is used if no argument is provided. */
    cartFragment: string;
    /** The ISO country code for i18n. */
    countryCode?: CountryCode;
    /** The ISO language code for i18n. */
    languageCode?: LanguageCode;
}): readonly [StateMachine.State<CartMachineContext, CartMachineEvent, CartMachineTypeState>, (event: "CART_FETCH" | "CART_CREATE" | "CART_SET" | "CARTLINE_ADD" | "CARTLINE_REMOVE" | "CARTLINE_UPDATE" | "NOTE_UPDATE" | "BUYER_IDENTITY_UPDATE" | "CART_ATTRIBUTES_UPDATE" | "DISCOUNT_CODES_UPDATE" | "CART_COMPLETED" | "RESOLVE" | "ERROR" | CartMachineEvent) => void, StateMachine.Service<CartMachineContext, CartMachineEvent, CartMachineTypeState>];
export declare function cartFromGraphQL(cart: PartialDeep<CartType, {
    recurseIntoArrays: true;
}>): Cart;
