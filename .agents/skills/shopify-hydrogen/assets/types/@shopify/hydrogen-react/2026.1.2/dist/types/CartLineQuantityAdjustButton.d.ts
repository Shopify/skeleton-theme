import { type BaseButtonProps } from './BaseButton.js';
interface CartLineQuantityAdjustButtonBaseProps {
    /** The adjustment for a cart line's quantity. Valid values: `increase` (default), `decrease`, or `remove`. */
    adjust?: 'increase' | 'decrease' | 'remove';
}
type CartLineQuantityAdjustButtonProps<AsType extends React.ElementType = 'button'> = BaseButtonProps<AsType> & CartLineQuantityAdjustButtonBaseProps;
/**
 * The `<CartLineQuantityAdjustButton />` component renders a button that adjusts the cart line's quantity when pressed.
 *
 * It must be a descendent of `<CartLineProvider/>` and `<CartProvider/>`.
 */
export declare function CartLineQuantityAdjustButton<AsType extends React.ElementType = 'button'>(props: CartLineQuantityAdjustButtonProps<AsType>): JSX.Element;
export {};
