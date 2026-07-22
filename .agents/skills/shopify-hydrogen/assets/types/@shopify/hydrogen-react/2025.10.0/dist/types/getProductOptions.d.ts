import type { Product, ProductOption, ProductOptionValue, ProductVariant, SelectedOption } from './storefront-api-types';
export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
type ProductOptionValueState = {
    variant: ProductVariant;
    handle: string;
    variantUriQuery: string;
    selected: boolean;
    exists: boolean;
    available: boolean;
    isDifferentProduct: boolean;
};
type MappedProductOptionValue = ProductOptionValue & ProductOptionValueState;
/**
 * Converts the product option into an Object\<key, value\> for building query params
 * For example, a selected product option of
 *  [
 *    \{
 *      name: 'Color',
 *      value: 'Red',
 *    \},
 *    \{
 *      name: 'Size',
 *      value: 'Medium',
 *    \}
 *  ]
 * Would return
 *  \{
 *    Color: 'Red',
 *    Size: 'Medium',
 *  \}
 */
export declare function mapSelectedProductOptionToObject(options: Pick<SelectedOption, 'name' | 'value'>[]): Record<string, string>;
export type MappedProductOptions = Omit<ProductOption, 'optionValues'> & {
    optionValues: MappedProductOptionValue[];
};
export declare function checkProductParam(product: RecursivePartial<Product>, checkAll?: boolean): Product;
/**
 * Finds all the variants provided by adjacentVariants, options.optionValues.firstAvailableVariant,
 * and selectedOrFirstAvailableVariant and return them in a single array
 */
export declare function getAdjacentAndFirstAvailableVariants(product: RecursivePartial<Product>): ProductVariant[];
/**
 * Returns a product options array with its relevant information
 * about the variant
 */
export declare function getProductOptions(product: RecursivePartial<Product>): MappedProductOptions[];
export {};
