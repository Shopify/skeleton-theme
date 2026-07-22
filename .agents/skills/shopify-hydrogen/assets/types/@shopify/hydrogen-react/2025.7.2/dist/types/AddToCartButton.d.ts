import { type CustomBaseButtonProps, type BaseButtonProps } from './BaseButton.js';
import * as React from 'react';
export interface AddToCartButtonPropsBase {
    /** An array of cart line attributes that belong to the item being added to the cart. */
    attributes?: {
        key: string;
        value: string;
    }[];
    /** The ID of the variant. */
    variantId?: string | null;
    /** The item quantity. */
    quantity?: number;
    /** The text that is announced by the screen reader when the item is being added to the cart. Used for accessibility purposes only and not displayed on the page. */
    accessibleAddingToCartLabel?: string;
    /** The selling plan ID of the subscription variant */
    sellingPlanId?: string;
}
export type AddToCartButtonProps<AsType extends React.ElementType = 'button'> = AddToCartButtonPropsBase & BaseButtonProps<AsType>;
/**
 * The `AddToCartButton` component renders a button that adds an item to the cart when pressed.
 * It must be a descendent of the `CartProvider` component.
 */
export declare function AddToCartButton<AsType extends React.ElementType = 'button'>(props: AddToCartButtonProps<AsType>): JSX.Element;
export interface AddToCartButtonPropsForDocs<AsType extends React.ElementType = 'button'> extends AddToCartButtonPropsBase, CustomBaseButtonProps<AsType> {
}
