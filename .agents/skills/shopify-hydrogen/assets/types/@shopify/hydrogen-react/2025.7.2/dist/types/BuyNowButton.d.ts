import { type BaseButtonProps, type CustomBaseButtonProps } from './BaseButton.js';
interface BuyNowButtonPropsBase {
    /** The item quantity. Defaults to 1. */
    quantity?: number;
    /** The ID of the variant. */
    variantId: string;
    /** The selling plan ID of the subscription variant */
    sellingPlanId?: string;
    /** An array of cart line attributes that belong to the item being added to the cart. */
    attributes?: {
        key: string;
        value: string;
    }[];
}
type BuyNowButtonProps<AsType extends React.ElementType = 'button'> = BuyNowButtonPropsBase & BaseButtonProps<AsType>;
/**
 * The `BuyNowButton` component renders a button that adds an item to the cart and redirects the customer to checkout.
 * Must be a child of a `CartProvider` component.
 */
export declare function BuyNowButton<AsType extends React.ElementType = 'button'>(props: BuyNowButtonProps<AsType>): JSX.Element;
export interface BuyNowButtonPropsForDocs<AsType extends React.ElementType = 'button'> extends BuyNowButtonPropsBase, CustomBaseButtonProps<AsType> {
}
export {};
