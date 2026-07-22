import type { RenderExtension, RunnableExtension } from '../../extension';
import type { Components } from './shared';
import type { StandardApi, CustomerSegmentTemplateApi, ActionExtensionApi, BlockExtensionApi, PrintActionExtensionApi, ProductDetailsConfigurationApi, ProductVariantDetailsConfigurationApi, OrderRoutingRuleApi, ValidationSettingsApi, DiscountFunctionSettingsApi } from './api';
import { AnyComponentBuilder } from '../../shared';
import { PurchaseOptionsCardConfigurationApi } from './api/purchase-options-card-action/purchase-options-card-action';
import { ShouldRenderApi } from './api/should-render/should-render';
interface ShouldRenderOutput {
    display: boolean;
}
type CustomerSegmentTemplateComponent = AnyComponentBuilder<Pick<Components, 'CustomerSegmentTemplate' | 'InternalCustomerSegmentTemplate'>>;
type OrderRoutingComponents = AnyComponentBuilder<Pick<Components, 'InternalLocationList'>>;
/**
 * See the [list of available components](/docs/api/admin-extensions/components).
 */
type AllComponents = AnyComponentBuilder<Omit<Components, 'CustomerSegmentTemplate' | 'InternalCustomerSegmentTemplate' | 'InternalLocationList'>>;
export interface ExtensionTargets {
    /**
     * @private
     */
    Playground: RenderExtension<StandardApi<'Playground'>, AllComponents>;
    /**
     * Renders a [`CustomerSegmentTemplate`](/docs/api/admin-extensions/components/customersegmenttemplate) in the [customer segment editor](https://help.shopify.com/en/manual/customers/customer-segmentation/customer-segments).
     */
    'admin.customers.segmentation-templates.render': RenderExtension<CustomerSegmentTemplateApi<'admin.customers.segmentation-templates.render'>, CustomerSegmentTemplateComponent>;
    /**
     * Renders an admin block in the product details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.product-details.block.render': RenderExtension<BlockExtensionApi<'admin.product-details.block.render'>, AllComponents>;
    /**
     * Renders an admin block in the order details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.order-details.block.render': RenderExtension<BlockExtensionApi<'admin.order-details.block.render'>, AllComponents>;
    /**
     * Renders an admin block in the discount details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.discount-details.function-settings.render': RenderExtension<DiscountFunctionSettingsApi<'admin.discount-details.function-settings.render'>, AllComponents>;
    /**
     * Renders an admin block in the customer details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.customer-details.block.render': RenderExtension<BlockExtensionApi<'admin.customer-details.block.render'>, AllComponents>;
    /**
     * Renders an admin block in the collection details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.collection-details.block.render': RenderExtension<BlockExtensionApi<'admin.collection-details.block.render'>, AllComponents>;
    /**
     * Renders an admin block in the draft order details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.draft-order-details.block.render': RenderExtension<BlockExtensionApi<'admin.draft-order-details.block.render'>, AllComponents>;
    /**
     * Renders an admin block in the abandoned checkout details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.abandoned-checkout-details.block.render': RenderExtension<BlockExtensionApi<'admin.abandoned-checkout-details.block.render'>, AllComponents>;
    /**
     * Renders an admin block in the catalog details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.catalog-details.block.render': RenderExtension<BlockExtensionApi<'admin.catalog-details.block.render'>, AllComponents>;
    /**
     * Renders an admin block in the company details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.company-details.block.render': RenderExtension<BlockExtensionApi<'admin.company-details.block.render'>, AllComponents>;
    /**
     * Renders an admin block in the company location details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.company-location-details.block.render': RenderExtension<BlockExtensionApi<'admin.company-location-details.block.render'>, AllComponents>;
    /**
     * Renders an admin block in the gift card details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.gift-card-details.block.render': RenderExtension<BlockExtensionApi<'admin.gift-card-details.block.render'>, AllComponents>;
    /**
     * Renders an admin block in the product variant details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.product-variant-details.block.render': RenderExtension<BlockExtensionApi<'admin.product-variant-details.block.render'>, AllComponents>;
    /**
     * Renders an admin block in the product details page.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.product-details.reorder.render': RenderExtension<BlockExtensionApi<'admin.product-details.reorder.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the product details page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.product-details.action.render': RenderExtension<ActionExtensionApi<'admin.product-details.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the catalog details page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.catalog-details.action.render': RenderExtension<ActionExtensionApi<'admin.catalog-details.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the company details page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.company-details.action.render': RenderExtension<ActionExtensionApi<'admin.company-details.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the gift card details page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.gift-card-details.action.render': RenderExtension<ActionExtensionApi<'admin.gift-card-details.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the order details page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.order-details.action.render': RenderExtension<ActionExtensionApi<'admin.order-details.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the customer details page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.customer-details.action.render': RenderExtension<ActionExtensionApi<'admin.customer-details.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the customer segment details page. Open this extension from the "Use segment" button.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.customer-segment-details.action.render': RenderExtension<ActionExtensionApi<'admin.customer-segment-details.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the product index page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.product-index.action.render': RenderExtension<ActionExtensionApi<'admin.product-index.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the order index page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.order-index.action.render': RenderExtension<ActionExtensionApi<'admin.order-index.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the customer index page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.customer-index.action.render': RenderExtension<ActionExtensionApi<'admin.customer-index.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the discount index page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.discount-index.action.render': RenderExtension<ActionExtensionApi<'admin.discount-index.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the collection details page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.collection-details.action.render': RenderExtension<ActionExtensionApi<'admin.collection-details.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the collection index page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.collection-index.action.render': RenderExtension<ActionExtensionApi<'admin.collection-index.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the abandoned checkout page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.abandoned-checkout-details.action.render': RenderExtension<ActionExtensionApi<'admin.abandoned-checkout-details.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the product variant details page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.product-variant-details.action.render': RenderExtension<ActionExtensionApi<'admin.product-variant-details.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the draft order details page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.draft-order-details.action.render': RenderExtension<ActionExtensionApi<'admin.draft-order-details.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the draft orders page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.draft-order-index.action.render': RenderExtension<ActionExtensionApi<'admin.draft-order-index.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the discount details page. Open this extension from the "More Actions" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.discount-details.action.render': RenderExtension<ActionExtensionApi<'admin.discount-details.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the order fulfilled card. Open this extension from the "3-dot" menu inside the order fulfilled card.
     * Note: This extension will only be visible on orders which were fulfilled by your app.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.order-fulfilled-card.action.render': RenderExtension<ActionExtensionApi<'admin.order-fulfilled-card.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the product index page when multiple resources are selected. Open this extension from the "More Actions"  menu of the resource list. The resource ids are available to this extension at runtime.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.product-index.selection-action.render': RenderExtension<ActionExtensionApi<'admin.product-index.selection-action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the order index page when multiple resources are selected. Open this extension from the "More Actions"  menu of the resource list. The resource ids are available to this extension at runtime.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.order-index.selection-action.render': RenderExtension<ActionExtensionApi<'admin.order-index.selection-action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the customer index page when multiple resources are selected. Open this extension from the "More Actions" menu of the resource list. The resource ids are available to this extension at runtime.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.customer-index.selection-action.render': RenderExtension<ActionExtensionApi<'admin.customer-index.selection-action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the draft order page when multiple resources are selected. Open this extension from the "3-dot" menu.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.draft-order-index.selection-action.render': RenderExtension<ActionExtensionApi<'admin.draft-order-index.selection-action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the product details page when a selling plan group is present. Open this extension from the "Purchase Options card".
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.product-purchase-option.action.render': RenderExtension<PurchaseOptionsCardConfigurationApi<'admin.product-purchase-option.action.render'>, AllComponents>;
    /**
     * Renders an admin action extension in the product variant details page when a selling plan group is present. Open this extension from the "Purchase Options card".
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.product-variant-purchase-option.action.render': RenderExtension<PurchaseOptionsCardConfigurationApi<'admin.product-variant-purchase-option.action.render'>, AllComponents>;
    /**
     * Renders an admin print action extension in the order index page when multiple resources are selected. Open this extension from the "Print" menu of the resource list. The resource ids are available to this extension at runtime.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.order-details.print-action.render': RenderExtension<PrintActionExtensionApi<'admin.order-details.print-action.render'>, AllComponents>;
    /**
     * Renders an admin print action extension in the product index page when multiple resources are selected. Open this extension from the "Print" menu of the resource list. The resource ids are available to this extension at runtime.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.product-details.print-action.render': RenderExtension<PrintActionExtensionApi<'admin.product-details.print-action.render'>, AllComponents>;
    /**
     * Renders an admin print action extension in the order index page when multiple resources are selected. Open this extension from the "Print" menu of the resource list. The resource ids are available to this extension at runtime.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.order-index.selection-print-action.render': RenderExtension<PrintActionExtensionApi<'admin.order-index.selection-print-action.render'>, AllComponents>;
    /**
     * Renders an admin print action extension in the product index page when multiple resources are selected. Open this extension from the "Print" menu of the resource list. The resource ids are available to this extension at runtime.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.product-index.selection-print-action.render': RenderExtension<PrintActionExtensionApi<'admin.product-index.selection-print-action.render'>, AllComponents>;
    /**
     * Renders Product Configuration on product details and product variant details
     *
     * See the [tutorial](/docs/apps/selling-strategies/bundles/product-config) for more information
     */
    'admin.product-details.configuration.render': RenderExtension<ProductDetailsConfigurationApi<'admin.product-details.configuration.render'>, AllComponents>;
    /**
     * Renders Product Configuration on product details and product variant details
     *
     * See the [tutorial](/docs/apps/selling-strategies/bundles/product-config) for more information
     */
    'admin.product-variant-details.configuration.render': RenderExtension<ProductVariantDetailsConfigurationApi<'admin.product-variant-details.configuration.render'>, AllComponents>;
    /**
     * Renders Order Routing Rule Configuration on order routing settings.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.settings.internal-order-routing-rule.render': RenderExtension<OrderRoutingRuleApi<'admin.settings.internal-order-routing-rule.render'>, AllComponents | OrderRoutingComponents>;
    'admin.settings.order-routing-rule.render': RenderExtension<OrderRoutingRuleApi<'admin.settings.order-routing-rule.render'>, AllComponents>;
    /**
     * Renders Validation Settings within a given validation's add and edit views.
     *
     * See the [list of available components](/docs/api/admin-extensions/components).
     */
    'admin.settings.validation.render': RenderExtension<ValidationSettingsApi<'admin.settings.validation.render'>, AllComponents>;
    /**
     * Controls the render state of an admin action extension in the product details page. Open this extension from the "More Actions" menu.
     */
    'admin.product-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.product-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the catalog details page. Open this extension from the "More Actions" menu.
     */
    'admin.catalog-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.catalog-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the company details page. Open this extension from the "More Actions" menu.
     */
    'admin.company-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.company-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the gift card details page. Open this extension from the "More Actions" menu.
     */
    'admin.gift-card-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.gift-card-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the order details page. Open this extension from the "More Actions" menu.
     */
    'admin.order-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.order-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the customer details page. Open this extension from the "More Actions" menu.
     */
    'admin.customer-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.customer-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the customer segment details page. Open this extension from the "Use segment" button.
     */
    'admin.customer-segment-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.customer-segment-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the product index page. Open this extension from the "More Actions" menu.
     */
    'admin.product-index.action.should-render': RunnableExtension<ShouldRenderApi<'admin.product-index.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the order index page. Open this extension from the "More Actions" menu.
     */
    'admin.order-index.action.should-render': RunnableExtension<ShouldRenderApi<'admin.order-index.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the customer index page. Open this extension from the "More Actions" menu.
     */
    'admin.customer-index.action.should-render': RunnableExtension<ShouldRenderApi<'admin.customer-index.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the discount index page. Open this extension from the "More Actions" menu.
     */
    'admin.discount-index.action.should-render': RunnableExtension<ShouldRenderApi<'admin.discount-index.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the collection details page. Open this extension from the "More Actions" menu.
     */
    'admin.collection-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.collection-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the collection index page. Open this extension from the "More Actions" menu.
     */
    'admin.collection-index.action.should-render': RunnableExtension<ShouldRenderApi<'admin.collection-index.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the abandoned checkout page. Open this extension from the "More Actions" menu.
     */
    'admin.abandoned-checkout-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.abandoned-checkout-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the product variant details page. Open this extension from the "More Actions" menu.
     */
    'admin.product-variant-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.product-variant-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the draft order details page. Open this extension from the "More Actions" menu.
     */
    'admin.draft-order-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.draft-order-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the draft orders page. Open this extension from the "More Actions" menu.
     */
    'admin.draft-order-index.action.should-render': RunnableExtension<ShouldRenderApi<'admin.draft-order-index.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the discount details page. Open this extension from the "More Actions" menu.
     */
    'admin.discount-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.discount-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the order fulfilled card. Open this extension from the "3-dot" menu inside the order fulfilled card.
     * Note: This extension will only be visible on orders which were fulfilled by your app.
     */
    'admin.order-fulfilled-card.action.should-render': RunnableExtension<ShouldRenderApi<'admin.order-fulfilled-card.action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the product index page when multiple resources are selected. Open this extension from the "More Actions"  menu of the resource list. The resource ids are available to this extension at runtime.
     */
    'admin.product-index.selection-action.should-render': RunnableExtension<ShouldRenderApi<'admin.product-index.selection-action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the order index page when multiple resources are selected. Open this extension from the "More Actions"  menu of the resource list. The resource ids are available to this extension at runtime.
     */
    'admin.order-index.selection-action.should-render': RunnableExtension<ShouldRenderApi<'admin.order-index.selection-action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the customer index page when multiple resources are selected. Open this extension from the "More Actions" menu of the resource list. The resource ids are available to this extension at runtime.
     */
    'admin.customer-index.selection-action.should-render': RunnableExtension<ShouldRenderApi<'admin.customer-index.selection-action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin action extension in the draft order page when multiple resources are selected. Open this extension from the "3-dot" menu.
     */
    'admin.draft-order-index.selection-action.should-render': RunnableExtension<ShouldRenderApi<'admin.draft-order-index.selection-action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin print action extension in the order index page when multiple resources are selected. Open this extension from the "Print" menu of the resource list. The resource ids are available to this extension at runtime.
     */
    'admin.order-details.print-action.should-render': RunnableExtension<ShouldRenderApi<'admin.order-details.print-action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin print action extension in the product index page when multiple resources are selected. Open this extension from the "Print" menu of the resource list. The resource ids are available to this extension at runtime.
     */
    'admin.product-details.print-action.should-render': RunnableExtension<ShouldRenderApi<'admin.product-details.print-action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin print action extension in the order index page when multiple resources are selected. Open this extension from the "Print" menu of the resource list. The resource ids are available to this extension at runtime.
     */
    'admin.order-index.selection-print-action.should-render': RunnableExtension<ShouldRenderApi<'admin.order-index.selection-print-action.should-render'>, ShouldRenderOutput>;
    /**
     * Controls the render state of an admin print action extension in the product index page when multiple resources are selected. Open this extension from the "Print" menu of the resource list. The resource ids are available to this extension at runtime.
     */
    'admin.product-index.selection-print-action.should-render': RunnableExtension<ShouldRenderApi<'admin.product-index.selection-print-action.should-render'>, ShouldRenderOutput>;
}
export type ExtensionTarget = keyof ExtensionTargets;
export type ExtensionForExtensionTarget<T extends ExtensionTarget> = ExtensionTargets[T];
/**
 * For a given extension target, returns the value that is expected to be
 * returned by that extension target’s callback type.
 */
export type ReturnTypeForExtension<ID extends keyof ExtensionTargets> = ReturnType<ExtensionTargets[ID]>;
/**
 * For a given extension target, returns the tuple of arguments that would
 * be provided to that extension target’s callback type.
 */
export type ArgumentsForExtension<ID extends keyof ExtensionTargets> = Parameters<ExtensionTargets[ID]>;
/**
 * A union type containing all of the extension targets that follow the pattern of
 * accepting a [`@remote-ui/core` `RemoteRoot`](https://github.com/Shopify/remote-dom/tree/remote-ui/packages/core)
 * and an additional `api` argument, and using those arguments to render
 * UI.
 */
export type RenderExtensionTarget = {
    [ID in keyof ExtensionTargets]: ExtensionTargets[ID] extends RenderExtension<any, any> ? ID : never;
}[keyof ExtensionTargets];
/**
 * A mapping of each “render extension” name to its callback type.
 */
export type RenderExtensions = {
    [ID in RenderExtensionTarget]: ExtensionTargets[ID];
};
type ExtractedApiFromRenderExtension<T> = T extends RenderExtension<infer Api, any> ? Api : never;
type ExtractedAllowedComponentsFromRenderExtension<T> = T extends RenderExtension<any, infer Components> ? Components : never;
/**
 * For a given rendering extension target, returns the type of the API that the
 * extension will receive at runtime. This API type is the second argument to
 * the callback for that extension target. The first callback for all of the rendering
 * extension targets each receive a `RemoteRoot` object.
 */
export type ApiForRenderExtension<ID extends keyof RenderExtensions> = ExtractedApiFromRenderExtension<RenderExtensions[ID]>;
/**
 * For a given rendering extension target, returns the UI components that the
 * extension target supports.
 */
export type AllowedComponentsForRenderExtension<ID extends keyof RenderExtensions> = ExtractedAllowedComponentsFromRenderExtension<RenderExtensions[ID]>;
export {};
//# sourceMappingURL=extension-targets.d.ts.map