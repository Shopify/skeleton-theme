import { CartInput } from './storefront-api-types.js';
import { Cart } from './cart-types.js';
import type { StorefrontApiResponseOkPartial } from './storefront-api-response.types.js';
export declare function useCartFetch(): <ReturnDataGeneric>({ query, variables, }: {
    query: string;
    variables: Record<string, unknown>;
}) => Promise<StorefrontApiResponseOkPartial<ReturnDataGeneric>>;
export declare function useInstantCheckout(): {
    cart: Cart | undefined;
    checkoutUrl: Cart['checkoutUrl'];
    error: string | undefined;
    createInstantCheckout: (cartInput: CartInput) => Promise<void>;
};
