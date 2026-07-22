import type { RenderExtensionTarget, ApiForExtension } from '../extension-targets';
/**
 * Returns the full API object that was passed in to your extension when it was created.
 * Depending on the extension target, this object can contain different properties.
 *
 * For example, the `purchase.checkout.cart-line-item.render-after` extension target will return the [CartLineDetailsApi](https://shopify.dev/docs/api/checkout-ui-extensions/apis/cartlinedetailsapi) object.
 * Other targets may only have access to the [StandardApi](https://shopify.dev/docs/api/checkout-ui-extensions/apis/standardapi) object,
 * which contains a basic set of properties about the checkout.
 *
 * For a full list of the API available to each extension target, see the [ExtensionTargets type](https://shopify.dev/docs/api/checkout-ui-extensions/apis/extensiontargets).
 *
 * > Note:
 * > As of version 2025-10, you no longer need this hook. The full API object is accessible via
 * > the global `shopify` object.
 * @publicDocs
 */
export declare function useApi<Target extends RenderExtensionTarget = RenderExtensionTarget>(_target?: Target): ApiForExtension<Target>;
/**
 * Returns the full API object that was passed in to your extension when it was created.
 * Depending on the extension target, this object can contain different properties.
 *
 * For example, the `purchase.checkout.cart-line-item.render-after` extension target will return the [CartLineDetailsApi](https://shopify.dev/docs/api/checkout-ui-extensions/apis/cartlinedetailsapi) object.
 * Other targets may only have access to the [StandardApi](https://shopify.dev/docs/api/checkout-ui-extensions/apis/standardapi) object,
 * which contains a basic set of properties about the checkout.
 *
 * For a full list of the API available to each extension target, see the [ExtensionTargets type](https://shopify.dev/docs/api/checkout-ui-extensions/apis/extensiontargets).
 *
 * > Caution: This is deprecated, use `useApi` instead.
 *
 * @deprecated This is deprecated, use `useApi` instead.
 * @publicDocs
 */
export declare function useExtensionApi<Target extends RenderExtensionTarget = RenderExtensionTarget>(): ApiForExtension<Target>;
//# sourceMappingURL=api.d.ts.map