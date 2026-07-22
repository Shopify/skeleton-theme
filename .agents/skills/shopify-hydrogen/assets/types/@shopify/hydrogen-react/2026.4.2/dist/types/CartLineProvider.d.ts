import { type ReactNode } from 'react';
import { ComponentizableCartLine, type CartLine } from './storefront-api-types.js';
import type { PartialDeep } from 'type-fest';
type CartLinePartialDeep = PartialDeep<CartLine | ComponentizableCartLine, {
    recurseIntoArrays: true;
}>;
export declare const CartLineContext: import("react").Context<CartLinePartialDeep | null>;
/**
 * The `useCartLine` hook provides access to the [CartLine object](https://shopify.dev/api/storefront/2026-04/objects/cartline) from the Storefront API. It must be a descendent of a `CartProvider` component.
 * @publicDocs
 */
export declare function useCartLine(): CartLinePartialDeep;
type CartLineProviderProps = {
    /** Any `ReactNode` elements. */
    children: ReactNode;
    /** A cart line object. */
    line: CartLinePartialDeep;
};
/**
 * The `CartLineProvider` component creates a context for using a cart line.
 * @publicDocs
 */
export declare function CartLineProvider({ children, line, }: CartLineProviderProps): JSX.Element;
export {};
