type ShopPayButtonProps = ShopPayButtonStyleProps & ShopPayDomainProps & ShopPayChannelAttribution & (ShopPayVariantIds | ShopPayVariantAndQuantities);
type ShopPayButtonStyleProps = {
    /** A string of classes to apply to the `div` that wraps the Shop Pay button. */
    className?: string;
    /** A string that's applied to the [CSS custom property (variable)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) `--shop-pay-button-width` for the [Buy with Shop Pay component](https://shopify.dev/custom-storefronts/tools/web-components#buy-with-shop-pay-component). */
    width?: string;
};
type ShopPayDomainProps = {
    /** The domain of your Shopify storefront URL (eg: `your-store.myshopify.com`). */
    storeDomain?: string;
};
type ShopPayVariantIds = {
    /** An array of IDs of the variants to purchase with Shop Pay. This will only ever have a quantity of 1 for each variant. If you want to use other quantities, then use `variantIdsAndQuantities`. */
    variantIds: string[];
    /** An array of variant IDs and quantities to purchase with Shop Pay. */
    variantIdsAndQuantities?: never;
};
type ShopPayVariantAndQuantities = {
    /** An array of IDs of the variants to purchase with Shop Pay. This will only ever have a quantity of 1 for each variant. If you want to use other quantities, then use `variantIdsAndQuantities`. */
    variantIds?: never;
    /** An array of variant IDs and quantities to purchase with Shop Pay. */
    variantIdsAndQuantities: Array<{
        id: string;
        quantity: number;
    }>;
};
type ShopPayChannelAttribution = {
    /** A string that adds channel attribution to the order. Can be either `headless` or `hydrogen` */
    channel?: 'headless' | 'hydrogen';
};
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'shop-pay-button': {
                channel?: string;
                variants: string;
                'store-url': string;
            };
        }
    }
}
/**
 * The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout.
 * It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.
 * It relies on the `<ShopProvider>` context provider.
 */
export declare function ShopPayButton({ channel, variantIds, className, variantIdsAndQuantities, width, storeDomain: _storeDomain, }: ShopPayButtonProps): JSX.Element;
export declare const MissingStoreDomainErrorMessage = "You must pass a \"storeDomain\" prop to the \"ShopPayButton\" component, or wrap it in a \"ShopifyProvider\" component.";
export declare const InvalidPropsErrorMessage = "You must pass in \"variantIds\" in the form of [\"gid://shopify/ProductVariant/1\"]";
export declare const MissingPropsErrorMessage = "You must pass in either \"variantIds\" or \"variantIdsAndQuantities\" to ShopPayButton";
export declare const DoublePropsErrorMessage = "You must provide either a variantIds or variantIdsAndQuantities prop, but not both in the ShopPayButton component";
export declare const InvalidChannelErrorMessage = "Invalid channel attribution value. Must be either \"headless\" or \"hydrogen\"";
export {};
