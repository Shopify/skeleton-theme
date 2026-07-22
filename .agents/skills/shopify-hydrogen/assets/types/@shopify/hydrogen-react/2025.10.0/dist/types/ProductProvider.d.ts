import type { SelectedOption as SelectedOptionType, Product, ProductVariant as ProductVariantType, ProductVariantConnection, SellingPlan as SellingPlanType, SellingPlanAllocation as SellingPlanAllocationType, SellingPlanGroup as SellingPlanGroupType, SellingPlanGroupConnection } from './storefront-api-types.js';
import type { PartialDeep } from 'type-fest';
type InitialVariantId = ProductVariantType['id'] | null;
interface ProductProviderProps {
    /** A Storefront API [Product object](https://shopify.dev/api/storefront/reference/products/product). */
    data: PartialDeep<Product, {
        recurseIntoArrays: true;
    }>;
    /** A `ReactNode` element. */
    children: React.ReactNode;
    /**
     * The initially selected variant.
     * The following logic applies to `initialVariantId`:
     * 1. If `initialVariantId` is provided, then it's used even if it's out of stock.
     * 2. If `initialVariantId` is provided but is `null`, then no variant is used.
     * 3. If nothing is passed to `initialVariantId` then the first available / in-stock variant is used.
     * 4. If nothing is passed to `initialVariantId` and no variants are in stock, then the first variant is used.
     */
    initialVariantId?: InitialVariantId;
}
/**
 * `<ProductProvider />` is a context provider that enables use of the `useProduct()` hook.
 *
 * It helps manage selected options and variants for a product.
 */
export declare function ProductProvider({ children, data: product, initialVariantId: explicitVariantId, }: ProductProviderProps): JSX.Element;
/**
 * Provides access to the context value provided by `<ProductProvider />`. Must be a descendent of `<ProductProvider />`.
 */
export declare function useProduct(): ProductHookValue;
export interface OptionWithValues {
    name: SelectedOptionType['name'];
    values: SelectedOptionType['value'][];
}
type UseProductObjects = {
    /** The raw product from the Storefront API */
    product: Product;
    /** An array of the variant `nodes` from the `VariantConnection`. */
    variants: ProductVariantType[];
    variantsConnection?: ProductVariantConnection;
    /** An array of the product's options and values. */
    options: OptionWithValues[];
    /** The selected variant. */
    selectedVariant?: ProductVariantType | null;
    selectedOptions: SelectedOptions;
    /** The selected selling plan. */
    selectedSellingPlan?: SellingPlanType;
    /** The selected selling plan allocation. */
    selectedSellingPlanAllocation?: SellingPlanAllocationType;
    /** The selling plan groups. */
    sellingPlanGroups?: (Omit<SellingPlanGroupType, 'sellingPlans'> & {
        sellingPlans: SellingPlanType[];
    })[];
    sellingPlanGroupsConnection?: SellingPlanGroupConnection;
};
type UseProductFunctions = {
    /** A callback to set the selected variant to the variant passed as an argument. */
    setSelectedVariant: (variant: PartialDeep<ProductVariantType, {
        recurseIntoArrays: true;
    }> | null) => void;
    /** A callback to set the selected option. */
    setSelectedOption: (name: SelectedOptionType['name'], value: SelectedOptionType['value']) => void;
    /** A callback to set multiple selected options at once. */
    setSelectedOptions: (options: SelectedOptions) => void;
    /** A callback to set the selected selling plan to the one passed as an argument. */
    setSelectedSellingPlan: (sellingPlan: PartialDeep<SellingPlanType, {
        recurseIntoArrays: true;
    }>) => void;
    /** A callback that returns a boolean indicating if the option is in stock. */
    isOptionInStock: (name: SelectedOptionType['name'], value: SelectedOptionType['value']) => boolean;
};
type ProductHookValue = PartialDeep<UseProductObjects, {
    recurseIntoArrays: true;
}> & UseProductFunctions;
export type SelectedOptions = {
    [key: string]: string;
};
export {};
