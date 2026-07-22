import type { CheckoutToken, RenderExtensionTarget } from '@shopify/ui-extensions/checkout';
/**
 * A stable id that represents the current checkout.
 *
 * Matches the `token` field in the [WebPixel checkout payload](https://shopify.dev/docs/api/pixels/customer-events#checkout)
 * and the `checkout_token` field in the [Admin REST API Order resource](https://shopify.dev/docs/api/admin-rest/unstable/resources/order#resource-object).
 */
export declare function useCheckoutToken<Target extends RenderExtensionTarget = RenderExtensionTarget>(): CheckoutToken | undefined;
//# sourceMappingURL=checkout-token.d.ts.map