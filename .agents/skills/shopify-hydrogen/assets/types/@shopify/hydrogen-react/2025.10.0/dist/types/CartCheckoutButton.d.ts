import { ReactNode } from 'react';
import { type BaseButtonProps, type CustomBaseButtonProps } from './BaseButton.js';
type ChildrenProps = {
    /** A `ReactNode` element. */
    children: ReactNode;
};
type CartCheckoutButtonProps = Omit<BaseButtonProps<'button'>, 'onClick'> & ChildrenProps;
/**
 * The `CartCheckoutButton` component renders a button that redirects to the checkout URL for the cart.
 * It must be a descendent of a `CartProvider` component.
 */
export declare function CartCheckoutButton(props: CartCheckoutButtonProps): JSX.Element;
export interface CartCheckoutButtonPropsForDocs<AsType extends React.ElementType = 'button'> extends Omit<CustomBaseButtonProps<AsType>, 'onClick'> {
}
export {};
