import { StandardComponents } from './components/StandardComponents';
import { CartLineItemApi } from './api/cart-line/cart-line-item';
import type { OrderStatusApi } from './api/order-status/order-status';
import type { RenderExtension } from '../../extension';
import { StandardApi, CompanyLocationApi, OrderApi, FulfillmentApi, ReturnApi } from './api/standard-api/standard-api';
/**
 * A UI extension will register for one or more extension targets using `shopify.extend()`.
 * An extension target in a UI extension is a plain JavaScript function.
 * This function receives some API for interacting with the application,
 * and is expected to return a value in a specific shape.
 * The input arguments and the output type are different
 * for each extension target.
 */
export interface ExtensionTargets extends OrderStatusExtensionTargets, CustomerAccountExtensionTargets {
}
export type ExtensionTarget = keyof ExtensionTargets;
export interface OrderStatusExtensionTargets {
    /**
     * A [dynamic extension target](https://shopify.dev/docs/api/customer-account-ui-extensions/extension-targets-overview#dynamic-extension-targets) that renders exclusively on the **Order status** page.
     * Unlike static extension targets, dynamic extension targets render where the merchant
     * sets them using the [checkout editor](https://shopify.dev/apps/checkout/test-ui-extensions#test-the-extension-in-the-checkout-editor).
     *
     * The [placements](https://shopify.dev/docs/api/customer-account-ui-extensions/extension-targets-overview#placements) for dynamic extension targets can be previewed during development
     * by [using a URL parameter](https://shopify.dev/docs/apps/checkout/best-practices/testing-ui-extensions#dynamic-extension-targets).
     */
    'customer-account.order-status.block.render': RenderExtension<OrderStatusApi<'customer-account.order-status.block.render'> & StandardApi<'customer-account.order-status.block.render'>, StandardComponents>;
    'customer-account.order-status.announcement.render': RenderExtension<OrderStatusApi<'customer-account.order-status.announcement.render'> & StandardApi<'customer-account.order-status.announcement.render'>, StandardComponents>;
    /**
     * A static extension target that renders on every line item, inside the details
     * under the line item properties element on the **Order status** page.
     */
    'customer-account.order-status.cart-line-item.render-after': RenderExtension<CartLineItemApi & OrderStatusApi<'customer-account.order-status.cart-line-item.render-after'> & StandardApi<'customer-account.order-status.cart-line-item.render-after'>, StandardComponents>;
    /**
     * A static extension target that is rendered after all line items on the **Order status** page.
     */
    'customer-account.order-status.cart-line-list.render-after': RenderExtension<OrderStatusApi<'customer-account.order-status.cart-line-list.render-after'> & StandardApi<'customer-account.order-status.cart-line-list.render-after'>, StandardComponents>;
    'customer-account.order-status.return-details.render-after': RenderExtension<OrderStatusApi<'customer-account.order-status.return-details.render-after'> & StandardApi<'customer-account.order-status.return-details.render-after'> & ReturnApi, StandardComponents>;
    'customer-account.order-status.fulfillment-details.render-after': RenderExtension<OrderStatusApi<'customer-account.order-status.fulfillment-details.render-after'> & StandardApi<'customer-account.order-status.fulfillment-details.render-after'> & FulfillmentApi, StandardComponents>;
    'customer-account.order-status.unfulfilled-items.render-after': RenderExtension<OrderStatusApi<'customer-account.order-status.unfulfilled-items.render-after'> & StandardApi<'customer-account.order-status.unfulfilled-items.render-after'>, StandardComponents>;
    'customer-account.order-status.payment-details.render-after': RenderExtension<OrderStatusApi<'customer-account.order-status.payment-details.render-after'> & StandardApi<'customer-account.order-status.payment-details.render-after'>, StandardComponents>;
    /**
     * A static extension target that is rendered after a purchase below the customer information on the **Order status** page.
     */
    'customer-account.order-status.customer-information.render-after': RenderExtension<OrderStatusApi<'customer-account.order-status.cart-line-list.render-after'> & StandardApi<'customer-account.order-status.cart-line-list.render-after'>, StandardComponents>;
    'customer-account.order.page.render': RenderExtension<OrderStatusApi<'customer-account.order.page.render'> & StandardApi<'customer-account.order.page.render'>, StandardComponents>;
}
export type OrderStatusExtensionTarget = keyof OrderStatusExtensionTargets;
export type RenderCustomerAccountFullPageExtensionTarget = 'customer-account.page.render' | 'customer-account.order.page.render';
export interface CustomerAccountExtensionTargets {
    'customer-account.page.render': RenderExtension<StandardApi<'customer-account.page.render'>, StandardComponents>;
    'customer-account.order-index.block.render': RenderExtension<StandardApi<'customer-account.order-index.block.render'>, StandardComponents>;
    'customer-account.order-index.announcement.render': RenderExtension<StandardApi<'customer-account.order-index.announcement.render'>, StandardComponents>;
    'customer-account.profile.block.render': RenderExtension<StandardApi<'customer-account.profile.block.render'>, StandardComponents>;
    'customer-account.profile.announcement.render': RenderExtension<StandardApi<'customer-account.profile.announcement.render'>, StandardComponents>;
    'customer-account.profile.addresses.render-after': RenderExtension<StandardApi<'customer-account.profile.addresses.render-after'>, StandardComponents>;
    'customer-account.footer.render-after': RenderExtension<StandardApi<'customer-account.footer.render-after'>, StandardComponents>;
    /**
     *  @experimental This is experimental and shouldn't be used until its not.
     */
    'customer-account.profile.payment.render-after': RenderExtension<StandardApi<'customer-account.profile.payment.render-after'>, StandardComponents>;
    'customer-account.profile.company-details.render-after': RenderExtension<StandardApi<'customer-account.profile.company-details.render-after'>, StandardComponents>;
    'customer-account.profile.company-location-addresses.render-after': RenderExtension<StandardApi<'customer-account.profile.company-location-addresses.render-after'> & CompanyLocationApi, StandardComponents>;
    'customer-account.profile.company-location-payment.render-after': RenderExtension<StandardApi<'customer-account.profile.company-location-payment.render-after'> & CompanyLocationApi, StandardComponents>;
    'customer-account.profile.company-location-staff.render-after': RenderExtension<StandardApi<'customer-account.profile.company-location-staff.render-after'> & CompanyLocationApi, StandardComponents>;
    'customer-account.order.action.menu-item.render': RenderExtension<StandardApi & OrderApi, StandardComponents>;
    'customer-account.order.action.render': RenderExtension<StandardApi & ActionExtensionApi & OrderApi, StandardComponents>;
}
export type CustomerAccountExtensionTarget = keyof CustomerAccountExtensionTargets;
/**
 * A union type containing all of the extension targets that follow the pattern of
 * accepting a [`@remote-ui/core` `RemoteRoot`](https://github.com/Shopify/remote-dom/tree/remote-ui/packages/core)
 * and an additional `api` argument, and using those arguments to render
 * UI.
 */
export type RenderExtensionTarget = {
    [Target in keyof ExtensionTargets]: ExtensionTargets[Target] extends RenderExtension<any, any> ? Target : never;
}[keyof ExtensionTargets];
/**
 * A union type containing the extension targets on **Order status** page that follow the pattern of
 * accepting a [`@remote-ui/core` `RemoteRoot`](https://github.com/Shopify/remote-dom/tree/remote-ui/packages/core)
 * and an additional `api` argument, and using those arguments to render
 * UI.
 */
export type RenderOrderStatusExtensionTarget = {
    [Target in keyof OrderStatusExtensionTargets]: OrderStatusExtensionTargets[Target] extends RenderExtension<any, any> ? Target : never;
}[keyof OrderStatusExtensionTargets];
/**
 * A union type containing the extension targets on customer account except **Order status** page that follow the pattern of
 * accepting a [`@remote-ui/core` `RemoteRoot`](https://github.com/Shopify/remote-dom/tree/remote-ui/packages/core)
 * and an additional `api` argument, and using those arguments to render
 * UI.
 */
export type RenderCustomerAccountExtensionTarget = {
    [Target in keyof CustomerAccountExtensionTargets]: CustomerAccountExtensionTargets[Target] extends RenderExtension<any, any> ? Target : never;
}[keyof CustomerAccountExtensionTargets];
/**
 * A mapping of each “render extension” name to its callback type.
 */
export type RenderExtensions = {
    [Target in RenderExtensionTarget]: ExtensionTargets[Target];
};
type ExtractedApiFromRenderExtension<T> = T extends RenderExtension<infer Api, any> ? Api : never;
type ExtractedAllowedComponentsFromRenderExtension<T> = T extends RenderExtension<any, infer Components> ? Components : never;
/**
 * For a given rendering extension target, returns the type of the API that the
 * extension will receive at runtime. This API type is the second argument to
 * the callback for that extension target. The first callback for all of the rendering
 * extension targets each receive a `RemoteRoot` object.
 */
export type ApiForRenderExtension<Target extends keyof RenderExtensions> = ExtractedApiFromRenderExtension<RenderExtensions[Target]>;
/**
 * For a given rendering extension target, returns the UI components that the
 * extension target supports.
 */
export type AllowedComponentsForRenderExtension<Target extends keyof RenderExtensions> = ExtractedAllowedComponentsFromRenderExtension<RenderExtensions[Target]>;
export interface ActionExtensionApi {
    close(): void;
}
/**
 * For a given extension target, returns the type of the API that the
 * extension will receive at runtime.
 */
export type ApiForExtension<Target extends keyof ExtensionTargets> = ExtractedApiFromExtension<ExtensionTargets[Target]>;
type ExtractedApiFromExtension<T> = T extends RenderExtension<any, any> ? ExtractedApiFromRenderExtension<T> : never;
export {};
//# sourceMappingURL=extension-targets.d.ts.map