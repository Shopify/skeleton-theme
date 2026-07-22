import type { StandardApi, ActionApi, ActionTargetApi, CartApi, CartLineItemApi, CustomerApi, DraftOrderApi, ProductApi, OrderApi } from './api';
import type { RenderExtension } from './extension';
import type { Components } from './shared';
import type { AnyComponentBuilder } from '../../shared';
import type { TransactionCompleteWithReprintData } from './event/data/TransactionCompleteData';
import { StorageApi } from './render/api/storage-api/storage-api';
type SmartGridComponents = AnyComponentBuilder<Pick<Components, 'Tile'>>;
type ActionComponents = AnyComponentBuilder<Pick<Components, 'Button'>>;
type ReceiptComponents = AnyComponentBuilder<Pick<Components, 'POSReceiptBlock' | 'Text' | 'QRCode'>>;
type BasicComponents = AnyComponentBuilder<Omit<Components, 'Tile'>>;
type BlockComponents = AnyComponentBuilder<Pick<Components, 'Badge' | 'Button' | 'DatePicker' | 'Dialog' | 'Icon' | 'Image' | 'POSBlock' | 'POSBlockRow' | 'Stack' | 'Text' | 'TimePicker'>>;
export interface ExtensionTargets {
    /**
     * Renders a single interactive tile component on the POS home screen's smart grid. The tile appears once during home screen initialization and remains persistent until navigation occurs. Use this target for high-frequency actions, status displays, or entry points to workflows that merchants need daily.
     *
     * Extensions at this target can dynamically update properties like enabled state and badge values in response to cart changes or device conditions. Tiles typically invoke `api.action.presentModal()` to launch the companion modal for complete workflows.
     */
    'pos.home.tile.render': RenderExtension<StandardApi<'pos.home.tile.render'> & ActionApi & CartApi, SmartGridComponents>;
    /**
     * Renders a full-screen modal interface launched from smart grid tiles. The modal appears when users tap a companion tile. Use this target for complete workflow experiences that require more space and functionality than the tile interface provides, such as multi-step processes, detailed information displays, or complex user interactions.
     *
     * Extensions at this target support full navigation hierarchies with multiple screens, scroll views, and interactive components to handle sophisticated workflows.
     */
    'pos.home.modal.render': RenderExtension<ActionTargetApi<'pos.home.modal.render'> & CartApi, BasicComponents>;
    /**
     * Renders a single interactive button component as a menu item in the post-return action menu. Use this target for post-return operations like generating return receipts, processing restocking workflows, or collecting return feedback.
     *
     * Extensions at this target can access the order identifier through the Order API to perform return-specific operations. Menu items typically invoke `api.action.presentModal()` to launch the companion modal for complete post-return workflows.
     */
    'pos.return.post.action.menu-item.render': RenderExtension<StandardApi<'pos.return.post.action.menu-item.render'> & ActionApi & OrderApi, ActionComponents>;
    /**
     * Renders a full-screen modal interface launched from post-return menu items. Use this target for complex post-return workflows that require forms, multi-step processes, or detailed information displays beyond what a simple button can provide.
     *
     * Extensions at this target have access to order data through the Order API and support workflows with multiple screens, navigation, and interactive components.
     */
    'pos.return.post.action.render': RenderExtension<ActionTargetApi<'pos.return.post.action.render'> & OrderApi, BasicComponents>;
    /**
     * Renders a custom information section within the post-return screen. Use this target for displaying supplementary return data like completion status, refund confirmations, or follow-up workflows alongside standard return details.
     *
     * Extensions at this target appear as persistent blocks within the post-return interface and support interactive elements that can launch modal workflows using `api.action.presentModal()` for more complex post-return operations.
     */
    'pos.return.post.block.render': RenderExtension<StandardApi<'pos.return.post.block.render'> & OrderApi & ActionApi, BlockComponents>;
    /**
     * Renders a single interactive button component as a menu item in the post-exchange action menu. Use this target for post-exchange operations like generating exchange receipts, processing restocking workflows, or collecting exchange feedback.
     *
     * Extensions at this target can access the order identifier through the Order API to perform exchange-specific operations. Menu items typically invoke `api.action.presentModal()` to launch the companion modal for complete post-exchange workflows.
     */
    'pos.exchange.post.action.menu-item.render': RenderExtension<StandardApi<'pos.exchange.post.action.menu-item.render'> & ActionApi & OrderApi, ActionComponents>;
    /**
     * Renders a full-screen modal interface launched from post-exchange menu items. Use this target for complex post-exchange workflows that require forms, multi-step processes, or detailed information displays beyond what a simple button can provide.
     *
     * Extensions at this target have access to order data through the Order API and support workflows with multiple screens, navigation, and interactive components.
     */
    'pos.exchange.post.action.render': RenderExtension<ActionTargetApi<'pos.exchange.post.action.render'> & OrderApi, BasicComponents>;
    /**
     * Renders a custom information section within the post-exchange screen. Use this target for displaying supplementary exchange data like completion status, payment adjustments, or follow-up workflows alongside standard exchange details.
     *
     * Extensions at this target appear as persistent blocks within the post-exchange interface and support interactive elements that can launch modal workflows using `api.action.presentModal()` for more complex post-exchange operations.
     */
    'pos.exchange.post.block.render': RenderExtension<StandardApi<'pos.exchange.post.block.render'> & OrderApi & ActionApi, BlockComponents>;
    /**
     * Renders a single interactive button component as a menu item in the post-purchase action menu. Use this target for post-purchase operations like sending receipts, collecting customer feedback, or launching follow-up workflows after completing a sale.
     *
     * Extensions at this target can access the order identifier through the Order API to perform purchase-specific operations. Menu items typically invoke `api.action.presentModal()` to launch the companion modal for complete post-purchase workflows.
     */
    'pos.purchase.post.action.menu-item.render': RenderExtension<StandardApi<'pos.purchase.post.action.menu-item.render'> & ActionApi & OrderApi, ActionComponents>;
    /**
     * Renders a full-screen modal interface launched from post-purchase menu items. Use this target for complex post-purchase workflows that require forms, multi-step processes, or detailed information displays beyond what a simple button can provide.
     *
     * Extensions at this target have access to order data through the Order API and support workflows with multiple screens, navigation, and interactive components.
     */
    'pos.purchase.post.action.render': RenderExtension<ActionTargetApi<'pos.purchase.post.action.render'> & OrderApi, BasicComponents>;
    /**
     * Renders a custom information section within the post-purchase screen. Use this target for displaying supplementary purchase data like completion status, customer feedback prompts, or next-step workflows alongside standard purchase details.
     *
     * Extensions at this target appear as persistent blocks within the post-purchase interface and support interactive elements that can launch modal workflows using `api.action.presentModal()` for more complex post-purchase operations.
     */
    'pos.purchase.post.block.render': RenderExtension<StandardApi<'pos.purchase.post.block.render'> & OrderApi & ActionApi, BlockComponents>;
    /**
     * Renders a single interactive button component as a menu item in the product details action menu. Use this target for product-specific operations like inventory adjustments, product analytics, or integration with external product management systems.
     *
     * Extensions at this target can access the product identifier through the Product API to perform product-specific operations. Menu items typically invoke `api.action.presentModal()` to launch the companion modal for complete product workflows.
     */
    'pos.product-details.action.menu-item.render': RenderExtension<StandardApi<'pos.product-details.action.menu-item.render'> & ActionApi & CartApi & ProductApi, ActionComponents>;
    /**
     * Renders a full-screen modal interface launched from product details menu items. Use this target for complex product workflows that require forms, multi-step processes, or detailed information displays beyond what a simple button can provide.
     *
     * Extensions at this target have access to product and cart data through the Product API and support workflows with multiple screens, navigation, and interactive components.
     */
    'pos.product-details.action.render': RenderExtension<ActionTargetApi<'pos.product-details.action.render'> & CartApi & ProductApi, BasicComponents>;
    /**
     * Renders a custom information section within the product details screen. Use this target for displaying supplementary product data like detailed specifications, inventory status, or related product recommendations alongside standard product details.
     *
     * Extensions at this target appear as persistent blocks within the product details interface and support interactive elements that can launch modal workflows using `api.action.presentModal()` for more complex product operations.
     */
    'pos.product-details.block.render': RenderExtension<StandardApi<'pos.product-details.block.render'> & CartApi & ProductApi & ActionApi, BlockComponents>;
    /**
     * Renders a single interactive button component as a menu item in the order details action menu. Use this target for order-specific operations like reprints, refunds, exchanges, or launching fulfillment workflows.
     *
     * Extensions at this target can access the order identifier through the Order API to perform order-specific operations. Menu items typically invoke `api.action.presentModal()` to launch the companion modal for complete order workflows.
     */
    'pos.order-details.action.menu-item.render': RenderExtension<StandardApi<'pos.order-details.action.menu-item.render'> & ActionApi & CartApi & OrderApi, ActionComponents>;
    /**
     * Renders a full-screen modal interface launched from order details menu items. Use this target for complex order workflows that require forms, multi-step processes, or detailed information displays beyond what a simple button can provide.
     *
     * Extensions at this target have access to order data through the Order API and support workflows with multiple screens, navigation, and interactive components.
     */
    'pos.order-details.action.render': RenderExtension<ActionTargetApi<'pos.order-details.action.render'> & CartApi & OrderApi, BasicComponents>;
    /**
     * Renders a custom information section within the order details screen. Use this target for displaying supplementary order data like fulfillment status, tracking numbers, or custom order analytics alongside standard order details.
     *
     * Extensions at this target appear as persistent blocks within the order details interface and support interactive elements that can launch modal workflows using `api.action.presentModal()` for more complex order operations.
     */
    'pos.order-details.block.render': RenderExtension<StandardApi<'pos.order-details.block.render'> & CartApi & OrderApi & ActionApi, BlockComponents>;
    /**
     * Renders a single interactive button component as a menu item in the draft order details action menu. Use this target for draft order-specific operations like sending invoices, updating payment status, or launching custom workflow processes for pending orders.
     *
     * Extensions at this target can access draft order information including order ID, name, and associated customer through the Draft Order API. Menu items typically invoke `api.action.presentModal()` to launch the companion modal for complete draft order workflows.
     */
    'pos.draft-order-details.action.menu-item.render': RenderExtension<StandardApi<'pos.draft-order-details.action.menu-item.render'> & ActionApi & CartApi & DraftOrderApi, ActionComponents>;
    /**
     * Renders a full-screen modal interface launched from draft order details menu items. Use this target for complex draft order workflows that require forms, multi-step processes, or detailed information displays beyond what a simple button can provide.
     *
     * Extensions at this target have access to draft order data through the Draft Order API and support workflows with multiple screens, navigation, and interactive components.
     */
    'pos.draft-order-details.action.render': RenderExtension<ActionTargetApi<'pos.draft-order-details.action.render'> & DraftOrderApi & CartApi, BasicComponents>;
    /**
     * Renders a custom information section within the draft order details screen. Use this target for displaying supplementary order information like processing status, payment status, or workflow indicators alongside standard draft order details.
     *
     * Extensions at this target appear as persistent blocks within the draft order interface and support interactive elements that can launch modal workflows using `api.action.presentModal()` for more complex draft order operations.
     */
    'pos.draft-order-details.block.render': RenderExtension<StandardApi<'pos.draft-order-details.block.render'> & ActionApi & CartApi & DraftOrderApi, BlockComponents>;
    /**
     * Renders a single interactive button component as a menu item in the customer details action menu. Use this target for customer-specific operations like applying customer discounts, processing loyalty redemptions, or launching profile update workflows.
     *
     * Extensions at this target can access the customer identifier through the Customer API to perform customer-specific operations. Menu items typically invoke `api.action.presentModal()` to launch the companion modal for complete customer workflows.
     */
    'pos.customer-details.action.menu-item.render': RenderExtension<StandardApi<'pos.customer-details.action.menu-item.render'> & ActionApi & CartApi & CustomerApi, ActionComponents>;
    /**
     * Renders a full-screen modal interface launched from customer details menu items. Use this target for complex customer workflows that require forms, multi-step processes, or detailed information displays beyond what a simple button can provide.
     *
     * Extensions at this target have access to customer data through the Customer API and support workflows with multiple screens, navigation, and interactive components.
     */
    'pos.customer-details.action.render': RenderExtension<ActionTargetApi<'pos.customer-details.action.render'> & CartApi & CustomerApi, BasicComponents>;
    /**
     * Renders a custom information section within the customer details screen. Use this target for displaying supplementary customer data like loyalty status, points balance, or personalized information alongside standard customer details.
     *
     * Extensions at this target appear as persistent blocks within the customer details interface and support interactive elements that can launch modal workflows using `api.action.presentModal()` for more complex customer operations.
     */
    'pos.customer-details.block.render': RenderExtension<StandardApi<'pos.customer-details.block.render'> & CartApi & CustomerApi & ActionApi, BlockComponents>;
    /**
     * Renders a single interactive button component as a menu item in the cart line item action menu. Use this target for item-specific operations like applying discounts, adding custom properties, or launching verification workflows for individual cart items.
     *
     * Extensions at this target can access detailed line item information including title, quantity, price, discounts, properties, and product metadata through the Cart Line Item API. Menu items typically invoke `api.action.presentModal()` to launch the companion modal for complete workflows.
     */
    'pos.cart.line-item-details.action.menu-item.render': RenderExtension<StandardApi<'pos.cart.line-item-details.action.menu-item.render'> & ActionApi & CartApi & CartLineItemApi, ActionComponents>;
    /**
     * Renders a full-screen modal interface launched from cart line item menu items. Use this target for complex line item workflows that require forms, multi-step processes, or detailed information displays beyond what a simple button can provide.
     *
     * Extensions at this target have access to detailed line item data through the Cart Line Item API and support workflows with multiple screens, navigation, and interactive components.
     */
    'pos.cart.line-item-details.action.render': RenderExtension<ActionTargetApi<'pos.cart.line-item-details.action.render'> & ActionApi & CartApi & CartLineItemApi, BasicComponents>;
    /**
     * Renders a custom section in the footer of printed receipts. Use this target for adding contact details, return policies, social media links, or customer engagement elements like survey links or marketing campaigns at the bottom of receipts.
     *
     * Extensions at this target appear in the receipt footer area and support limited components optimized for print formatting, including text content for information display.
     */
    'pos.receipt-footer.block.render': RenderExtension<{
        [key: string]: any;
    } & StorageApi & TransactionCompleteWithReprintData, ReceiptComponents>;
    /**
     * Renders a custom section in the header of printed receipts. Use this target for adding custom branding, logos, promotional messages, or store-specific information at the top of receipts.
     *
     * Extensions at this target appear in the receipt header area and support limited components optimized for print formatting, including text content for information display.
     */
    'pos.receipt-header.block.render': RenderExtension<{
        [key: string]: any;
    } & StorageApi & TransactionCompleteWithReprintData, ReceiptComponents>;
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
//# sourceMappingURL=targets.d.ts.map