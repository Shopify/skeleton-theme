import type { RunnableExtension, RenderExtension } from '../../extension';
import type { ActionExtensionApi, BlockExtensionApi, PrintActionExtensionApi, ProductDetailsConfigurationApi, ProductVariantDetailsConfigurationApi, OrderRoutingRuleApi, ValidationSettingsApi, PurchaseOptionsCardConfigurationApi, DiscountFunctionSettingsApi, CustomerSegmentTemplateApi, CustomerSegmentTemplate, StandardApi, IntentRenderApi } from './api';
import { ShouldRenderApi, ShouldRenderOutput } from './api/should-render/should-render';
import type { BlockExtensionComponents } from './components/BlockExtensionComponents';
import type { ActionExtensionComponents } from './components/ActionExtensionComponents';
import type { PrintActionExtensionComponents } from './components/PrintActionExtensionComponents';
import type { FunctionSettingsComponents } from './components/FunctionSettingsComponents';
import type { FormExtensionComponents } from './components/FormExtensionComponents';
/**
 * Maps extension target identifiers to their corresponding extension types. Each target represents a specific location or context in the Shopify admin where extensions can render or execute. Use these targets to define where your extension appears and what capabilities it has access to.
 *
 * @publicDocs
 */
export interface ExtensionTargets {
    /**
     * A runnable target that provides [customer segment templates](/docs/apps/build/marketing-analytics/customer-segments/build-a-template-extension) in the [customer segment editor](https://help.shopify.com/manual/customers/customer-segmentation/create-customer-segments). Use this target to provide pre-built segment templates that merchants can use as starting points for creating targeted customer groups based on custom criteria.
     */
    'admin.customers.segmentation-templates.data': RunnableExtension<CustomerSegmentTemplateApi<'admin.customers.segmentation-templates.data'>, {
        templates: CustomerSegmentTemplate[];
    }>;
    /**
     * A block target that displays inline content within the product details page. Use this to show product-specific information, tools, or actions directly on the product page.
     */
    'admin.product-details.block.render': RenderExtension<BlockExtensionApi<'admin.product-details.block.render'>, BlockExtensionComponents>;
    /**
     * A block target that displays inline content within the order details page. Use this to show order-specific information, fulfillment tools, or custom order actions.
     */
    'admin.order-details.block.render': RenderExtension<BlockExtensionApi<'admin.order-details.block.render'>, BlockExtensionComponents>;
    /**
     * A function settings target that appears when merchants create or edit a discount powered by your discount function, allowing them to configure function-specific settings. Use this to build custom configuration interfaces for discount function parameters.
     */
    'admin.discount-details.function-settings.render': RenderExtension<DiscountFunctionSettingsApi<'admin.discount-details.function-settings.render'>, FunctionSettingsComponents>;
    /**
     * A block target that displays inline content within the customer details page. Use this to show customer-specific information, loyalty data, or custom customer actions.
     */
    'admin.customer-details.block.render': RenderExtension<BlockExtensionApi<'admin.customer-details.block.render'>, BlockExtensionComponents>;
    /**
     * A block target that displays inline content within the collection details page. Use this to show collection analytics, bulk product operations, or collection-specific tools.
     */
    'admin.collection-details.block.render': RenderExtension<BlockExtensionApi<'admin.collection-details.block.render'>, BlockExtensionComponents>;
    /**
     * A block target that displays inline content within the draft order details page. Use this to show custom pricing calculations, special order handling tools, or order-specific information.
     */
    'admin.draft-order-details.block.render': RenderExtension<BlockExtensionApi<'admin.draft-order-details.block.render'>, BlockExtensionComponents>;
    /**
     * A block target that displays inline content within the abandoned checkout details page. Use this to show cart recovery tools, abandonment analysis, or customer re-engagement options.
     */
    'admin.abandoned-checkout-details.block.render': RenderExtension<BlockExtensionApi<'admin.abandoned-checkout-details.block.render'>, BlockExtensionComponents>;
    /**
     * A block target that displays inline content within the catalog details page. Use this to show catalog-specific settings, market information, or synchronization tools.
     */
    'admin.catalog-details.block.render': RenderExtension<BlockExtensionApi<'admin.catalog-details.block.render'>, BlockExtensionComponents>;
    /**
     * A block target that displays inline content within the company details page. Use this to show B2B customer information, credit limits, or company-specific data.
     */
    'admin.company-details.block.render': RenderExtension<BlockExtensionApi<'admin.company-details.block.render'>, BlockExtensionComponents>;
    /**
     * A block target that displays inline content within the company location details page. Use this to show location-specific information, shipping preferences, or location management tools.
     */
    'admin.company-location-details.block.render': RenderExtension<BlockExtensionApi<'admin.company-location-details.block.render'>, BlockExtensionComponents>;
    /**
     * A block target that displays inline content within the gift card details page. Use this to show gift card balance tracking, usage history, or custom gift card metadata.
     */
    'admin.gift-card-details.block.render': RenderExtension<BlockExtensionApi<'admin.gift-card-details.block.render'>, BlockExtensionComponents>;
    /**
     * A block target that displays inline content within the product variant details page. Use this to show variant-specific data, inventory tools, or variant configuration options.
     */
    'admin.product-variant-details.block.render': RenderExtension<BlockExtensionApi<'admin.product-variant-details.block.render'>, BlockExtensionComponents>;
    /**
     * A block target that provides custom reordering functionality on the product details page. Use this to help merchants rearrange product data.
     */
    'admin.product-details.reorder.render': RenderExtension<BlockExtensionApi<'admin.product-details.reorder.render'>, BlockExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the product details page. Use this to create workflows for processing products, syncing data, or integrating with external systems.
     */
    'admin.product-details.action.render': RenderExtension<ActionExtensionApi<'admin.product-details.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the catalog details page. Use this to create workflows for catalog management, market synchronization, or data exports.
     */
    'admin.catalog-details.action.render': RenderExtension<ActionExtensionApi<'admin.catalog-details.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the company details page. Use this to create workflows for B2B customer management, credit operations, or company data synchronization.
     */
    'admin.company-details.action.render': RenderExtension<ActionExtensionApi<'admin.company-details.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the gift card details page. Use this to create workflows for gift card processing, balance adjustments, or custom gift card operations.
     */
    'admin.gift-card-details.action.render': RenderExtension<ActionExtensionApi<'admin.gift-card-details.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the order details page. Use this to create workflows for order processing, fulfillment operations, or external system integrations.
     */
    'admin.order-details.action.render': RenderExtension<ActionExtensionApi<'admin.order-details.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the customer details page. Use this to create workflows for customer data management, loyalty operations, or CRM integrations.
     */
    'admin.customer-details.action.render': RenderExtension<ActionExtensionApi<'admin.customer-details.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears from the **Use segment** button on the customer segment details page. Use this to create workflows for marketing campaigns, email operations, or segment-based actions.
     */
    'admin.customer-segment-details.action.render': RenderExtension<ActionExtensionApi<'admin.customer-segment-details.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the product index page. Use this to create workflows for product management, catalog operations, or inventory synchronization.
     */
    'admin.product-index.action.render': RenderExtension<ActionExtensionApi<'admin.product-index.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the order index page. Use this to create workflows for order management, reporting, or fulfillment operations.
     */
    'admin.order-index.action.render': RenderExtension<ActionExtensionApi<'admin.order-index.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the customer index page. Use this to create workflows for customer management, marketing operations, or bulk data processing.
     */
    'admin.customer-index.action.render': RenderExtension<ActionExtensionApi<'admin.customer-index.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the discount index page. Use this to create workflows for discount management, promotional operations, or bulk discount updates.
     */
    'admin.discount-index.action.render': RenderExtension<ActionExtensionApi<'admin.discount-index.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the collection details page. Use this to create workflows for collection management, product operations, or merchandising tools.
     */
    'admin.collection-details.action.render': RenderExtension<ActionExtensionApi<'admin.collection-details.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the collection index page. Use this to create workflows for collection management, bulk operations, or catalog organization.
     */
    'admin.collection-index.action.render': RenderExtension<ActionExtensionApi<'admin.collection-index.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the abandoned checkout details page. Use this to create workflows for cart recovery, customer engagement, or checkout analysis.
     */
    'admin.abandoned-checkout-details.action.render': RenderExtension<ActionExtensionApi<'admin.abandoned-checkout-details.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the product variant details page. Use this to create workflows for variant management, inventory operations, or data synchronization.
     */
    'admin.product-variant-details.action.render': RenderExtension<ActionExtensionApi<'admin.product-variant-details.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the draft order details page. Use this to create workflows for draft order processing, custom pricing, or order preparation tools.
     */
    'admin.draft-order-details.action.render': RenderExtension<ActionExtensionApi<'admin.draft-order-details.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the draft order index page. Use this to create workflows for draft order management, bulk operations, or order conversion tools.
     */
    'admin.draft-order-index.action.render': RenderExtension<ActionExtensionApi<'admin.draft-order-index.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the discount details page. Use this to create workflows for discount management, promotion analysis, or discount synchronization.
     */
    'admin.discount-details.action.render': RenderExtension<ActionExtensionApi<'admin.discount-details.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the actions menu inside the order fulfilled card, visible only on orders fulfilled by your app. Use this to create workflows for fulfillment operations, tracking updates, or post-fulfillment actions.
     */
    'admin.order-fulfilled-card.action.render': RenderExtension<ActionExtensionApi<'admin.order-fulfilled-card.action.render'>, ActionExtensionComponents>;
    /**
     * A selection action target that appears in the **More actions** menu on the product index page when multiple products are selected. Use this to create workflows for bulk product operations, batch updates, or mass data processing.
     */
    'admin.product-index.selection-action.render': RenderExtension<ActionExtensionApi<'admin.product-index.selection-action.render'>, ActionExtensionComponents>;
    /**
     * A selection action target that appears in the **More actions** menu on the order index page when multiple orders are selected. Use this to create workflows for bulk order operations, batch fulfillment, or mass order processing.
     */
    'admin.order-index.selection-action.render': RenderExtension<ActionExtensionApi<'admin.order-index.selection-action.render'>, ActionExtensionComponents>;
    /**
     * A selection action target that appears in the **More actions** menu on the customer index page when multiple customers are selected. Use this to create workflows for bulk customer operations, mass email campaigns, or batch data updates.
     */
    'admin.customer-index.selection-action.render': RenderExtension<ActionExtensionApi<'admin.customer-index.selection-action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **More actions** menu on the discount index page when multiple discounts are selected. Use this to create workflows for bulk discount operations or batch data updates.
     */
    'admin.discount-index.selection-action.render': RenderExtension<ActionExtensionApi<'admin.discount-index.selection-action.render'>, ActionExtensionComponents>;
    /**
     * A selection action target that appears in the **More actions** menu on the draft order index page when multiple draft orders are selected. Use this to create workflows for bulk draft order operations, batch conversions, or mass order processing.
     */
    'admin.draft-order-index.selection-action.render': RenderExtension<ActionExtensionApi<'admin.draft-order-index.selection-action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **Purchase Options** card on the product details page when a selling plan group is present. Use this to create workflows for subscription management, selling plan configuration, or purchase option operations.
     */
    'admin.product-purchase-option.action.render': RenderExtension<PurchaseOptionsCardConfigurationApi<'admin.product-purchase-option.action.render'>, ActionExtensionComponents>;
    /**
     * An action target that appears in the **Purchase Options** card on the product variant details page when a selling plan group is present. Use this to create workflows for variant-specific subscription management, selling plan configuration, or purchase option operations.
     */
    'admin.product-variant-purchase-option.action.render': RenderExtension<PurchaseOptionsCardConfigurationApi<'admin.product-variant-purchase-option.action.render'>, ActionExtensionComponents>;
    /**
     * A print action target that appears in the **Print** menu on the order details page. Use this to generate custom documents such as packing slips, shipping labels, or invoices.
     */
    'admin.order-details.print-action.render': RenderExtension<PrintActionExtensionApi<'admin.order-details.print-action.render'>, PrintActionExtensionComponents>;
    /**
     * A print action target that appears in the **Print** menu on the product details page. Use this to generate custom documents such as product labels, barcode sheets, or specification sheets.
     */
    'admin.product-details.print-action.render': RenderExtension<PrintActionExtensionApi<'admin.product-details.print-action.render'>, PrintActionExtensionComponents>;
    /**
     * A print action target that appears in the **Print** menu on the order index page when multiple orders are selected. Use this to generate batch documents such as combined packing slips, shipping manifests, or bulk invoices.
     */
    'admin.order-index.selection-print-action.render': RenderExtension<PrintActionExtensionApi<'admin.order-index.selection-print-action.render'>, PrintActionExtensionComponents>;
    /**
     * A print action target that appears in the **Print** menu on the product index page when multiple products are selected. Use this to generate batch documents such as combined product labels, barcode sheets, or catalog pages.
     */
    'admin.product-index.selection-print-action.render': RenderExtension<PrintActionExtensionApi<'admin.product-index.selection-print-action.render'>, PrintActionExtensionComponents>;
    /**
     * A configuration target that renders product configuration settings for [product bundles](/docs/apps/build/product-merchandising/bundles/product-configuration-extension/add-merchant-config-ui) and customizable products on the product details page. Use this to define bundle component selections, customization options, or product configuration rules.
     */
    'admin.product-details.configuration.render': RenderExtension<ProductDetailsConfigurationApi<'admin.product-details.configuration.render'>, BlockExtensionComponents>;
    /**
     * A configuration target that renders product variant configuration settings for [product bundles](/docs/apps/build/product-merchandising/bundles/product-configuration-extension/add-merchant-config-ui) and customizable products on the product variant details page. Use this to define variant-specific bundle components, customization options, or configuration rules.
     */
    'admin.product-variant-details.configuration.render': RenderExtension<ProductVariantDetailsConfigurationApi<'admin.product-variant-details.configuration.render'>, BlockExtensionComponents>;
    /**
     * A function settings target that renders within order routing settings, allowing merchants to configure order routing rule functions.
     * @private
     */
    'admin.settings.internal-order-routing-rule.render': RenderExtension<OrderRoutingRuleApi<'admin.settings.internal-order-routing-rule.render'>, FunctionSettingsComponents>;
    /**
     * A function settings target that renders within order routing settings, allowing merchants to configure order routing rule functions. Use this to build custom configuration interfaces for order routing function parameters.
     */
    'admin.settings.order-routing-rule.render': RenderExtension<OrderRoutingRuleApi<'admin.settings.order-routing-rule.render'>, FunctionSettingsComponents>;
    /**
     * A function settings target that renders within a validation's add and edit views, allowing merchants to configure validation function settings. Use this to build custom configuration interfaces for validation function parameters and rules.
     */
    'admin.settings.validation.render': RenderExtension<ValidationSettingsApi<'admin.settings.validation.render'>, FunctionSettingsComponents>;
    /**
     * A non-rendering target that controls whether the product details action appears in the **More actions** menu. Use this to conditionally show or hide your action based on product properties, user permissions, or external data.
     */
    'admin.product-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.product-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the catalog details action appears in the **More actions** menu. Use this to conditionally show or hide your action based on catalog properties, user permissions, or external data.
     */
    'admin.catalog-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.catalog-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the company details action appears in the **More actions** menu. Use this to conditionally show or hide your action based on company properties, user permissions, or external data.
     */
    'admin.company-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.company-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the gift card details action appears in the **More actions** menu. Use this to conditionally show or hide your action based on gift card properties, user permissions, or external data.
     */
    'admin.gift-card-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.gift-card-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the order details action appears in the **More actions** menu. Use this to conditionally show or hide your action based on order properties, fulfillment status, or external data.
     */
    'admin.order-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.order-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the customer details action appears in the **More actions** menu. Use this to conditionally show or hide your action based on customer properties, user permissions, or external data.
     */
    'admin.customer-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.customer-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the customer segment details action appears from the **Use segment** button. Use this to conditionally show or hide your action based on segment properties, user permissions, or external data.
     */
    'admin.customer-segment-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.customer-segment-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the product index action appears in the **More actions** menu. Use this to conditionally show or hide your action based on user permissions, store configuration, or external data.
     */
    'admin.product-index.action.should-render': RunnableExtension<ShouldRenderApi<'admin.product-index.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the order index action appears in the **More actions** menu. Use this to conditionally show or hide your action based on user permissions, store configuration, or external data.
     */
    'admin.order-index.action.should-render': RunnableExtension<ShouldRenderApi<'admin.order-index.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the customer index action appears in the **More actions** menu. Use this to conditionally show or hide your action based on user permissions, store configuration, or external data.
     */
    'admin.customer-index.action.should-render': RunnableExtension<ShouldRenderApi<'admin.customer-index.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the discount index action appears in the **More actions** menu. Use this to conditionally show or hide your action based on user permissions, store configuration, or external data.
     */
    'admin.discount-index.action.should-render': RunnableExtension<ShouldRenderApi<'admin.discount-index.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the collection details action appears in the **More actions** menu. Use this to conditionally show or hide your action based on collection properties, user permissions, or external data.
     */
    'admin.collection-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.collection-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the collection index action appears in the **More actions** menu. Use this to conditionally show or hide your action based on user permissions, store configuration, or external data.
     */
    'admin.collection-index.action.should-render': RunnableExtension<ShouldRenderApi<'admin.collection-index.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the abandoned checkout details action appears in the **More actions** menu. Use this to conditionally show or hide your action based on checkout properties, user permissions, or external data.
     */
    'admin.abandoned-checkout-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.abandoned-checkout-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the product variant details action appears in the **More actions** menu. Use this to conditionally show or hide your action based on variant properties, user permissions, or external data.
     */
    'admin.product-variant-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.product-variant-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the draft order details action appears in the **More actions** menu. Use this to conditionally show or hide your action based on draft order properties, user permissions, or external data.
     */
    'admin.draft-order-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.draft-order-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the draft order index action appears in the **More actions** menu. Use this to conditionally show or hide your action based on user permissions, store configuration, or external data.
     */
    'admin.draft-order-index.action.should-render': RunnableExtension<ShouldRenderApi<'admin.draft-order-index.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the discount details action appears in the **More actions** menu. Use this to conditionally show or hide your action based on discount properties, user permissions, or external data.
     */
    'admin.discount-details.action.should-render': RunnableExtension<ShouldRenderApi<'admin.discount-details.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the order fulfilled card action appears in the actions menu. Use this to conditionally show or hide your action based on fulfillment properties, user permissions, or external data.
     */
    'admin.order-fulfilled-card.action.should-render': RunnableExtension<ShouldRenderApi<'admin.order-fulfilled-card.action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the product index selection action appears in the **More actions** menu. Use this to conditionally show or hide your bulk action based on selection criteria, user permissions, or external data.
     */
    'admin.product-index.selection-action.should-render': RunnableExtension<ShouldRenderApi<'admin.product-index.selection-action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the order index selection action appears in the **More actions** menu. Use this to conditionally show or hide your bulk action based on selection criteria, user permissions, or external data.
     */
    'admin.order-index.selection-action.should-render': RunnableExtension<ShouldRenderApi<'admin.order-index.selection-action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the customer index selection action appears in the **More actions** menu. Use this to conditionally show or hide your bulk action based on selection criteria, user permissions, or external data.
     */
    'admin.customer-index.selection-action.should-render': RunnableExtension<ShouldRenderApi<'admin.customer-index.selection-action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the discount index selection action appears in the **More actions** menu. Use this to conditionally show or hide your bulk action based on selection criteria, user permissions, or external data.
     */
    'admin.discount-index.selection-action.should-render': RunnableExtension<ShouldRenderApi<'admin.discount-index.selection-action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the draft order index selection action appears in the **More actions** menu. Use this to conditionally show or hide your bulk action based on selection criteria, user permissions, or external data.
     */
    'admin.draft-order-index.selection-action.should-render': RunnableExtension<ShouldRenderApi<'admin.draft-order-index.selection-action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the order details print action appears in the **Print** menu. Use this to conditionally show or hide your print action based on order properties, user permissions, or external data.
     */
    'admin.order-details.print-action.should-render': RunnableExtension<ShouldRenderApi<'admin.order-details.print-action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the product details print action appears in the **Print** menu. Use this to conditionally show or hide your print action based on product properties, user permissions, or external data.
     */
    'admin.product-details.print-action.should-render': RunnableExtension<ShouldRenderApi<'admin.product-details.print-action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the order index selection print action appears in the **Print** menu. Use this to conditionally show or hide your bulk print action based on selection criteria, user permissions, or external data.
     */
    'admin.order-index.selection-print-action.should-render': RunnableExtension<ShouldRenderApi<'admin.order-index.selection-print-action.should-render'>, ShouldRenderOutput>;
    /**
     * A non-rendering target that controls whether the product index selection print action appears in the **Print** menu. Use this to conditionally show or hide your bulk print action based on selection criteria, user permissions, or external data.
     */
    'admin.product-index.selection-print-action.should-render': RunnableExtension<ShouldRenderApi<'admin.product-index.selection-print-action.should-render'>, ShouldRenderOutput>;
    /**
     * A runnable target that enables your app to expose data to [Sidekick](/docs/apps/build/sidekick/build-app-data). Use this target to register tools that Sidekick can invoke to search your app's data and answer merchant questions.
     */
    'admin.app.tools.data': RunnableExtension<StandardApi<'admin.app.tools.data'>, undefined>;
    /**
     * Renders an admin extension for handling app intents.
     */
    'admin.app.intent.render': RenderExtension<IntentRenderApi<'admin.app.intent.render'>, FormExtensionComponents>;
}
/**
 * A string literal union of all valid extension target identifiers. Use this type to specify where your admin UI extension should render, such as `admin.product-details.block.render` for a block on product details pages or `admin.order-details.action.render` for an action on order details pages. The target determines the extension's location, available APIs, and UI components.
 */
export type ExtensionTarget = keyof ExtensionTargets;
//# sourceMappingURL=extension-targets.d.ts.map