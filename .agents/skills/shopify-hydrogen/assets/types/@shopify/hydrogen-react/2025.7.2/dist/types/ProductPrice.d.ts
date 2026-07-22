import type { Product } from './storefront-api-types.js';
import { type MoneyProps, type MoneyPropsBase } from './Money.js';
import type { PartialDeep } from 'type-fest';
export interface ProductPriceProps {
    /** A Storefront API [Product object](https://shopify.dev/api/storefront/reference/products/product). */
    data: PartialDeep<Product, {
        recurseIntoArrays: true;
    }>;
    /** The type of price. Valid values: `regular` (default) or `compareAt`. */
    priceType?: 'regular' | 'compareAt';
    /** The type of value. Valid values: `min` (default), `max` or `unit`. */
    valueType?: 'max' | 'min' | 'unit';
    /** The ID of the variant. */
    variantId?: string;
}
/**
 * The `ProductPrice` component renders a `Money` component with the product
 * [`priceRange`](https://shopify.dev/api/storefront/reference/products/productpricerange)'s `maxVariantPrice` or `minVariantPrice`, for either the regular price or compare at price range.
 */
export declare function ProductPrice<ComponentGeneric extends React.ElementType = 'div'>(props: ProductPriceProps & Omit<MoneyProps<ComponentGeneric>, 'data' | 'measurement'>): JSX.Element | null;
export interface ProductPricePropsForDocs<AsType extends React.ElementType = 'div'> extends Omit<MoneyPropsBase<AsType>, 'data' | 'measurement'>, ProductPriceProps {
}
