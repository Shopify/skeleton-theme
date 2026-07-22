import { Money, type MoneyPropsBase } from './Money.js';
interface CartCostPropsBase {
    /** A string type that defines the type of cost needed. Valid values: `total`, `subtotal`, `tax`, or `duty`. */
    amountType?: 'total' | 'subtotal' | 'tax' | 'duty';
    /** Any `ReactNode` elements. */
    children?: React.ReactNode;
}
type CartCostProps = Omit<React.ComponentProps<typeof Money>, 'data'> & CartCostPropsBase;
/**
 * The `CartCost` component renders a `Money` component with the cost associated with the `amountType` prop.
 * If no `amountType` prop is specified, then it defaults to `totalAmount`.
 * Depends on `useCart()` and must be a child of `<CartProvider/>`
 */
export declare function CartCost(props: CartCostProps): JSX.Element | null;
export interface CartCostPropsForDocs<AsType extends React.ElementType = 'div'> extends Omit<MoneyPropsBase<AsType>, 'data'>, CartCostPropsBase {
}
export {};
