import type { AddressAutocompleteSuggestApi, AddressAutocompleteSuggestOutput, AddressAutocompleteFormatSuggestionApi, AddressAutocompleteFormatSuggestionOutput, AddressAutocompleteStandardApi } from '../checkout';
import type { CartLineItemApi } from './api/cart-line/cart-line-item';
import type { CheckoutApi } from './api/checkout/checkout';
import type { OrderConfirmationApi } from './api/order-confirmation/order-confirmation';
import type { OrderStatusApi } from './api/order-status/order-status';
import type { PaymentOptionItemApi } from './api/payment/payment-option-item';
import type { PickupPointListApi } from './api/pickup/pickup-point-list';
import type { PickupLocationItemApi } from './api/pickup/pickup-location-item';
import type { PickupLocationListApi } from './api/pickup/pickup-location-list';
import type { RedeemableApi } from './api/redeemable/redeemable';
import type { StandardApi } from './api/standard/standard';
import type { ShippingOptionItemApi } from './api/shipping/shipping-option-item';
import type { ShippingOptionListApi } from './api/shipping/shipping-option-list';
import { AnnouncementApi } from './api/announcement/announcement';
import type { RenderExtension, RunnableExtension } from './extension';
import type { AnyComponent, AllowedComponents, AnyComponentExcept } from './shared';
/**
 * A UI extension will register for one or more extension targets using `shopify.extend()`.
 * An extension target in a UI extension is a plain JavaScript function.
 * This function receives some API for interacting with the application,
 * and is expected to return a value in a specific shape.
 * The input arguments and the output type are different
 * for each extension target.
 */
export interface RenderExtensionTargets {
    /**
     * A static extension target that is rendered immediately before any actions within each step.
     */
    'purchase.checkout.actions.render-before': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.actions.render-before'>, AnyComponent>;
    /**
     * A static extension target that is rendered immediately before any actions within each step.
     *
     * @deprecated Use `purchase.checkout.actions.render-before` instead.
     */
    'Checkout::Actions::RenderBefore': RenderExtension<CheckoutApi & StandardApi<'Checkout::Actions::RenderBefore'>, AnyComponent>;
    /**
     * A static extension target that is rendered after all line items.
     */
    'purchase.checkout.cart-line-list.render-after': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.cart-line-list.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered after all line items.
     *
     * @deprecated Use `purchase.checkout.cart-line-list.render-after` instead.
     */
    'Checkout::CartLines::RenderAfter': RenderExtension<CheckoutApi & StandardApi<'Checkout::CartLines::RenderAfter'> & OrderStatusApi, AnyComponent>;
    /**
     * A static extension target that renders on every line item, inside the details
     * under the line item properties element.
     */
    'purchase.checkout.cart-line-item.render-after': RenderExtension<CheckoutApi & CartLineItemApi & StandardApi<'purchase.checkout.cart-line-item.render-after'>, AnyComponent>;
    /**
     * A static extension target that renders on every line item, inside the details
     * under the line item properties element.
     *
     * @deprecated Use `purchase.checkout.cart-line-item.render-after` instead.
     */
    'Checkout::CartLineDetails::RenderAfter': RenderExtension<CheckoutApi & CartLineItemApi & StandardApi<'Checkout::CartLineDetails::RenderAfter'> & OrderStatusApi, AnyComponent>;
    /**
     * A static extension target that renders on every bundle line item, inside the details
     * under the line item properties element. It replaces the default bundle products rendering.
     * @private
     */
    'purchase.cart-line-item.line-components.render': RenderExtension<CartLineItemApi & StandardApi<'purchase.cart-line-item.line-components.render'>, AnyComponent>;
    /**
     * A static extension target that renders on every bundle line item, inside the details
     * under the line item properties element. It replaces the default bundle products rendering.
     *
     * @deprecated Use `purchase.cart-line-item.line-components.render` instead.
     * @private
     */
    'Checkout::CartLineDetails::RenderLineComponents': RenderExtension<CartLineItemApi & StandardApi<'Checkout::CartLineDetails::RenderLineComponents'>, AnyComponent>;
    /**
     * A static extension target that is rendered immediately after the contact form element.
     */
    'purchase.checkout.contact.render-after': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.contact.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered immediately after the contact form element.
     *
     * @deprecated Use `purchase.checkout.contact.render-after` instead.
     */
    'Checkout::Contact::RenderAfter': RenderExtension<CheckoutApi & StandardApi<'Checkout::Contact::RenderAfter'>, AnyComponent>;
    /**
     * A static extension target that is rendered after a purchase below the customer information.
     *
     * @deprecated Use `purchase.thank-you.customer-information.render-after` or
     * `customer-account.order-status.customer-information.render-after` from `@shopify/ui-extension/customer-account` instead.
     */
    'Checkout::CustomerInformation::RenderAfter': RenderExtension<OrderStatusApi & CheckoutApi & StandardApi<'Checkout::CustomerInformation::RenderAfter'>, AnyComponent>;
    /**
     * A static extension target that is rendered between the shipping address header
     * and shipping address form elements.
     */
    'purchase.checkout.delivery-address.render-before': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.delivery-address.render-before'>, AnyComponent>;
    /**
     * A static extension target that is rendered between the shipping address header
     * and shipping address form elements.
     *
     * @deprecated Use `purchase.checkout.delivery-address.render-before` instead.
     */
    'Checkout::DeliveryAddress::RenderBefore': RenderExtension<CheckoutApi & StandardApi<'Checkout::DeliveryAddress::RenderBefore'>, AnyComponent>;
    /**
     * A static extension target that is rendered after the shipping address form elements.
     */
    'purchase.checkout.delivery-address.render-after': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.delivery-address.render-after'>, AnyComponent>;
    /**
     * A [block extension target](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview#block-extension-targets) that isn't tied to a specific checkout section or feature.
     * Unlike static extension targets, block extension targets render where the merchant
     * sets them using the [checkout editor](https://shopify.dev/apps/checkout/test-ui-extensions#test-the-extension-in-the-checkout-editor).
     *
     * The [supported locations](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview#supported-locations) for block extension targets can be previewed during development
     * by [using a URL parameter](https://shopify.dev/docs/apps/checkout/best-practices/testing-ui-extensions#block-extension-targets).
     */
    'purchase.checkout.block.render': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.block.render'>, AnyComponent>;
    /**
     * A [block extension target](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview#block-extension-targets) that isn't tied to a specific checkout section or feature.
     * Unlike static extension targets, block extension targets render where the merchant
     * sets them using the [checkout editor](https://shopify.dev/apps/checkout/test-ui-extensions#test-the-extension-in-the-checkout-editor).
     *
     * The [supported locations](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview#supported-locations) for block extension targets can be previewed during development
     * by [using a URL parameter](https://shopify.dev/docs/apps/checkout/best-practices/testing-ui-extensions#block-extension-targets).
     *
     * @deprecated Use `purchase.checkout.block.render` instead.
     */
    'Checkout::Dynamic::Render': RenderExtension<CheckoutApi & OrderStatusApi & StandardApi<'Checkout::Dynamic::Render'>, AnyComponent>;
    /**
     * A [block extension target](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview#block-extension-targets) that renders exclusively on the **Thank you** page.
     * Unlike static extension targets, block extension targets render where the merchant
     * sets them using the [checkout editor](https://shopify.dev/apps/checkout/test-ui-extensions#test-the-extension-in-the-checkout-editor).
     *
     * The [supported locations](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview#supported-locations) for block extension targets can be previewed during development
     * by [using a URL parameter](https://shopify.dev/docs/apps/checkout/best-practices/testing-ui-extensions#block-extension-targets).
     *
     */
    'purchase.thank-you.block.render': RenderExtension<OrderConfirmationApi & StandardApi<'purchase.thank-you.block.render'>, AnyComponent>;
    /**
     * A [block extension target](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview#block-extension-targets) that renders exclusively on the **Thank you** page.
     * Unlike static extension targets, block extension targets render where the merchant
     * sets them using the [checkout editor](https://shopify.dev/apps/checkout/test-ui-extensions#test-the-extension-in-the-checkout-editor).
     *
     * The [supported locations](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview#supported-locations) for block extension targets can be previewed during development
     * by [using a URL parameter](https://shopify.dev/docs/apps/checkout/best-practices/testing-ui-extensions#block-extension-targets).
     *
     * @deprecated Use `purchase.thank-you.block.render` instead.
     */
    'Checkout::ThankYou::Dynamic::Render': RenderExtension<OrderConfirmationApi & StandardApi<'Checkout::ThankYou::Dynamic::Render'>, AnyComponent>;
    /**
     * A static extension target that renders on every line item, inside the details
     * under the line item properties element on the **Thank you** page.
     */
    'purchase.thank-you.cart-line-item.render-after': RenderExtension<OrderConfirmationApi & CartLineItemApi & StandardApi<'purchase.thank-you.cart-line-item.render-after'>, AnyComponent>;
    /**
     * A static extension target that renders on every line item, inside the details
     * under the line item properties element on the **Thank you** page.
     *
     * @deprecated Use `purchase.thank-you.cart-line-item.render-after` instead.
     */
    'Checkout::ThankYou::CartLineDetails::RenderAfter': RenderExtension<OrderConfirmationApi & CartLineItemApi & StandardApi<'Checkout::ThankYou::CartLineDetails::RenderAfter'>, AnyComponent>;
    /**
     * A static extension target that is rendered after all line items on the **Thank you** page.
     */
    'purchase.thank-you.cart-line-list.render-after': RenderExtension<OrderConfirmationApi & StandardApi<'purchase.thank-you.cart-line-list.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered after all line items on the **Thank you** page.
     *
     * @deprecated Use `purchase.thank-you.cart-line-list.render-after` instead.
     */
    'Checkout::ThankYou::CartLines::RenderAfter': RenderExtension<OrderConfirmationApi & StandardApi<'Checkout::ThankYou::CartLines::RenderAfter'>, AnyComponent>;
    /**
     * A static extension target that is rendered after a purchase below the customer information on the **Thank you** page.
     */
    'purchase.thank-you.customer-information.render-after': RenderExtension<OrderConfirmationApi & StandardApi<'purchase.thank-you.customer-information.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered after a purchase below the customer information on the **Thank you** page.
     *
     * @deprecated Use `purchase.thank-you.customer-information.render-after` instead.
     */
    'Checkout::ThankYou::CustomerInformation::RenderAfter': RenderExtension<OrderConfirmationApi & StandardApi<'Checkout::ThankYou::CustomerInformation::RenderAfter'>, AnyComponent>;
    /**
     * A static extension target that renders the gift card entry form fields after
     * the buyer ticks a box to use a gift card. This does not replace the
     * native gift card entry form which is rendered in a separate part of checkout.
     *
     * @private
     */
    'purchase.checkout.gift-card.render': RenderExtension<RedeemableApi & CheckoutApi & StandardApi<'purchase.checkout.gift-card.render'>, AnyComponentExcept<'Image' | 'Banner'>>;
    /**
     * A static extension target that renders the gift card entry form fields after
     * the buyer ticks a box to use a gift card. This does not replace the
     * native gift card entry form which is rendered in a separate part of checkout.
     *
     * @private
     * @deprecated Use `purchase.checkout.gift-card.render` instead.
     */
    'Checkout::GiftCard::Render': RenderExtension<RedeemableApi & CheckoutApi & StandardApi<'Checkout::GiftCard::Render'>, AnyComponentExcept<'Image' | 'Banner'>>;
    /**
     * A static extension target that renders the form fields for a payment method when selected by the buyer.
     *
     * @private
     */
    'purchase.checkout.payment-option-item.details.render': RenderExtension<PaymentOptionItemApi & CheckoutApi & StandardApi<'purchase.checkout.payment-option-item.details.render'>, AnyComponentExcept<'Image' | 'Banner'>>;
    /**
     * A static extension target that renders the form fields for a payment method when selected by the buyer.
     *
     * @private
     * @deprecated Use `purchase.checkout.payment-option-item.details.render` instead.
     */
    'Checkout::PaymentMethod::Render': RenderExtension<PaymentOptionItemApi & CheckoutApi & StandardApi<'Checkout::PaymentMethod::Render'>, AnyComponentExcept<'Image' | 'Banner'>>;
    /**
     * A static extension target that renders after the hosted fields of a credit card payment method.
     *
     * @private
     */
    'purchase.checkout.payment-option-item.hosted-fields.render-after': RenderExtension<PaymentOptionItemApi & CheckoutApi & StandardApi<'purchase.checkout.payment-option-item.hosted-fields.render-after'>, AnyComponent>;
    /**
     * A static extension target that renders after the hosted fields of a credit card payment method.
     * for a credit card payment method when selected by the buyer.
     *
     * @private
     * @deprecated Use `purchase.checkout.payment-option-item.hosted-fields.render-after` instead.
     */
    'Checkout::PaymentMethod::HostedFields::RenderAfter': RenderExtension<PaymentOptionItemApi & CheckoutApi & StandardApi<'Checkout::PaymentMethod::HostedFields::RenderAfter'>, AnyComponentExcept<'Image' | 'Banner'>>;
    /**
     * A static extension target that renders a form modal when a buyer selects the custom onsite payment method.
     *
     * @private
     */
    'purchase.checkout.payment-option-item.action-required.render': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.payment-option-item.action-required.render'>, AnyComponent>;
    /**
     * A static extension target that renders a form modal when a buyer selects the custom onsite payment method.
     *
     * @private
     * @deprecated Use `purchase.checkout.payment-option-item.action-required.render` instead.
     */
    'Checkout::PaymentMethod::RenderRequiredAction': RenderExtension<CheckoutApi & StandardApi<'Checkout::PaymentMethod::RenderRequiredAction'>, AnyComponent>;
    /**
     * A static extension target that renders between the payment heading and payment method list.
     *
     */
    'purchase.checkout.payment-method-list.render-before': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.payment-method-list.render-before'>, AnyComponent>;
    /**
     * A static extension target that renders below the list of payment methods.
     *
     */
    'purchase.checkout.payment-method-list.render-after': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.payment-method-list.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered in the order summary, before the discount form element.
     */
    'purchase.checkout.reductions.render-before': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.reductions.render-before'>, AnyComponent>;
    /**
     * A static extension target that is rendered in the order summary, before the discount form element.
     *
     * @deprecated Use `purchase.checkout.reductions.render-before` instead.
     */
    'Checkout::Reductions::RenderBefore': RenderExtension<CheckoutApi & StandardApi<'Checkout::Reductions::RenderBefore'>, AnyComponent>;
    /**
     * A static extension target that is rendered in the order summary, after the discount form
     * and discount tag elements.
     */
    'purchase.checkout.reductions.render-after': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.reductions.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered in the order summary, after the discount form
     * and discount tag elements.
     *
     * @deprecated Use `purchase.checkout.reductions.render-after` instead.
     */
    'Checkout::Reductions::RenderAfter': RenderExtension<CheckoutApi & StandardApi<'Checkout::Reductions::RenderAfter'>, AnyComponent>;
    /**
     * A static extension target that is rendered between the shipping method
     * header and shipping method options.
     */
    'purchase.checkout.shipping-option-list.render-before': RenderExtension<ShippingOptionListApi & CheckoutApi & StandardApi<'purchase.checkout.shipping-option-list.render-before'>, AnyComponent>;
    /**
     * A static extension target that is rendered between the shipping method
     * header and shipping method options.
     *
     * @deprecated Use `purchase.checkout.shipping-option-list.render-before` instead.
     */
    'Checkout::ShippingMethods::RenderBefore': RenderExtension<ShippingOptionListApi & CheckoutApi & StandardApi<'Checkout::ShippingMethods::RenderBefore'>, AnyComponent>;
    /**
     * A static extension target that is rendered after the shipping method
     * options.
     */
    'purchase.checkout.shipping-option-list.render-after': RenderExtension<ShippingOptionListApi & CheckoutApi & StandardApi<'purchase.checkout.shipping-option-list.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered after the shipping method
     * options.
     *
     * @deprecated Use `purchase.checkout.shipping-option-list.render-after` instead.
     */
    'Checkout::ShippingMethods::RenderAfter': RenderExtension<ShippingOptionListApi & CheckoutApi & StandardApi<'Checkout::ShippingMethods::RenderAfter'>, AnyComponent>;
    /**
     * A static extension target that is rendered before pickup location options.
     */
    'purchase.checkout.pickup-location-list.render-before': RenderExtension<PickupLocationListApi & CheckoutApi & StandardApi<'purchase.checkout.pickup-location-list.render-before'>, AnyComponent>;
    /**
     * A static extension target that is rendered before pickup location options.
     *
     * @deprecated Use `purchase.checkout.pickup-location-list.render-before` instead.
     */
    'Checkout::PickupLocations::RenderBefore': RenderExtension<PickupLocationListApi & CheckoutApi & StandardApi<'Checkout::PickupLocations::RenderBefore'>, AnyComponent>;
    /**
     * A static extension target that is rendered after pickup location options.
     */
    'purchase.checkout.pickup-location-list.render-after': RenderExtension<PickupLocationListApi & CheckoutApi & StandardApi<'purchase.checkout.pickup-location-list.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered after pickup location options.
     *
     * @deprecated Use `purchase.checkout.pickup-location-list.render-after` instead.
     */
    'Checkout::PickupLocations::RenderAfter': RenderExtension<PickupLocationListApi & CheckoutApi & StandardApi<'Checkout::PickupLocations::RenderAfter'>, AnyComponent>;
    /**
     * A static extension target that is rendered after the shipping method
     * details within the shipping method option list, for each option.
     */
    'purchase.checkout.shipping-option-item.render-after': RenderExtension<ShippingOptionItemApi & CheckoutApi & StandardApi<'purchase.checkout.shipping-option-item.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered after the shipping method
     * details within the shipping method option list, for each option.
     *
     * @deprecated Use `purchase.checkout.shipping-option-item.render-after` instead.
     */
    'Checkout::ShippingMethodDetails::RenderAfter': RenderExtension<ShippingOptionItemApi & CheckoutApi & StandardApi<'Checkout::ShippingMethodDetails::RenderAfter'>, AnyComponent>;
    /**
     * A static extension target that is rendered under the shipping method
     * within the shipping method option list, for each option.
     */
    'purchase.checkout.shipping-option-item.details.render': RenderExtension<ShippingOptionItemApi & CheckoutApi & StandardApi<'purchase.checkout.shipping-option-item.details.render'>, AnyComponent>;
    /**
     * A static extension target that is rendered under the shipping method
     * within the shipping method option list, for each option.
     *
     * @deprecated Use `purchase.checkout.shipping-option-item.details.render` instead.
     */
    'Checkout::ShippingMethodDetails::RenderExpanded': RenderExtension<ShippingOptionItemApi & CheckoutApi & StandardApi<'Checkout::ShippingMethodDetails::RenderExpanded'>, AnyComponent>;
    /**
     * A static extension target that is rendered immediately before the pickup points.
     */
    'purchase.checkout.pickup-point-list.render-before': RenderExtension<PickupPointListApi & CheckoutApi & StandardApi<'purchase.checkout.pickup-point-list.render-before'>, AnyComponent>;
    /**
     * A static extension target that is rendered immediately before the pickup points.
     *
     * @deprecated Use `purchase.checkout.pickup-point-list.render-before` instead.
     */
    'Checkout::PickupPoints::RenderBefore': RenderExtension<PickupPointListApi & CheckoutApi & StandardApi<'Checkout::PickupPoints::RenderBefore'>, AnyComponent>;
    /**
     * A static extension target that is rendered immediately after the pickup points.
     */
    'purchase.checkout.pickup-point-list.render-after': RenderExtension<PickupPointListApi & CheckoutApi & StandardApi<'purchase.checkout.pickup-point-list.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered immediately after the pickup points.
     *
     * @deprecated Use `purchase.checkout.pickup-point-list.render-after` instead.
     */
    'Checkout::PickupPoints::RenderAfter': RenderExtension<PickupPointListApi & CheckoutApi & StandardApi<'Checkout::PickupPoints::RenderAfter'>, AnyComponent>;
    /**
     * A static extension target that is rendered after the pickup location
     * details within the local pickup option list, for each option.
     */
    'purchase.checkout.pickup-location-option-item.render-after': RenderExtension<PickupLocationItemApi & CheckoutApi & StandardApi<'purchase.checkout.pickup-location-option-item.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered below the header.
     */
    'purchase.checkout.header.render-after': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.header.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered below the footer.
     */
    'purchase.checkout.footer.render-after': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.footer.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered on top of the checkout page as an overlay.
     * It is positioned in the bottom right corner of the screen.
     */
    'purchase.checkout.chat.render': RenderExtension<CheckoutApi & StandardApi<'purchase.checkout.chat.render'>, AllowedComponents<'Chat'>>;
    /**
     * A static extension target that is rendered below the header on the **Thank you** page.
     */
    'purchase.thank-you.header.render-after': RenderExtension<OrderConfirmationApi & StandardApi<'purchase.thank-you.header.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered below the footer on the **Thank you** page.
     */
    'purchase.thank-you.footer.render-after': RenderExtension<OrderConfirmationApi & StandardApi<'purchase.thank-you.footer.render-after'>, AnyComponent>;
    /**
     * A static extension target that is rendered on top of the **Thank you page** as an overlay.
     * It is positioned in the bottom right corner of the screen.
     */
    'purchase.thank-you.chat.render': RenderExtension<OrderConfirmationApi & StandardApi<'purchase.thank-you.chat.render'>, AllowedComponents<'Chat'>>;
    /**
     * A static extension target that is rendered on top of the **Thank you page** as a dismissable announcement.
     */
    'purchase.thank-you.announcement.render': RenderExtension<OrderConfirmationApi & StandardApi<'purchase.thank-you.announcement.render'> & AnnouncementApi, AnyComponent>;
}
export interface RunnableExtensionTargets {
    /**
     * An extension target that provides address autocomplete suggestions. These suggestions are shown to buyers as they
     * interact with address forms during checkout.
     *
     * It must return a list of address suggestions. If a formatted address is provided with each suggestion, it will be
     * used to auto-populate the fields in the address form when the buyer selects a suggestion.
     *
     * This target does not support rendering UI components.
     */
    'purchase.address-autocomplete.suggest': RunnableExtension<AddressAutocompleteStandardApi<'purchase.address-autocomplete.suggest'> & AddressAutocompleteSuggestApi, AddressAutocompleteSuggestOutput>;
    /**
     * An extension target that formats the selected address suggestion provided by a
     * `purchase.address-autocomplete.suggest` target. This address is used to auto-populate the fields in the address
     * form.
     *
     * It must return a formatted address.
     *
     * This target does not support rendering UI components.
     */
    'purchase.address-autocomplete.format-suggestion': RunnableExtension<AddressAutocompleteStandardApi<'purchase.address-autocomplete.format-suggestion'> & AddressAutocompleteFormatSuggestionApi, AddressAutocompleteFormatSuggestionOutput>;
}
export type ExtensionTargets = RenderExtensionTargets & RunnableExtensionTargets;
export type ExtensionTarget = keyof ExtensionTargets;
export type AvailableExtensionDefinitions<Api> = RenderExtension<Api, any> | RunnableExtension<Api, any>;
/**
 * For a given extension target, returns the value that is expected to be
 * returned by that extension target’s callback type.
 */
export type ReturnTypeForExtension<Target extends keyof ExtensionTargets> = ReturnType<ExtensionTargets[Target]>;
/**
 * For a given extension target, returns the tuple of arguments that would
 * be provided to that extension target’s callback type.
 */
export type ArgumentsForExtension<Target extends keyof ExtensionTargets> = Parameters<ExtensionTargets[Target]>;
/**
 * For a given extension target, returns the type of the API that the
 * extension will receive at runtime.
 */
export type ApiForExtension<Target extends ExtensionTarget> = ExtractedApiFromExtensionDefinition<ExtensionTargets[Target]>;
type ExtractedApiFromExtensionDefinition<T> = T extends AvailableExtensionDefinitions<infer Api> ? Api : never;
/**
 * A union type containing all of the extension targets that follow the pattern of
 * accepting a [`@remote-ui/core` `RemoteRoot`](https://github.com/Shopify/remote-dom/tree/remote-ui/packages/core)
 * and an additional `api` argument, and using those arguments to render
 * UI.
 */
export type RenderExtensionTarget = keyof RenderExtensionTargets;
/**
 * A mapping of each “render extension” name to its callback type.
 */
export type RenderExtensions = {
    [Target in RenderExtensionTarget]: RenderExtensionTargets[Target];
};
type ExtractedAllowedComponentsFromRenderExtension<T> = T extends RenderExtension<any, infer Components> ? Components : never;
/**
 * @deprecated Use `ExtractedApiFromExtensionDefinition` instead.
 */
type ExtractedApiFromRenderExtension<T> = T extends RenderExtension<infer Api, any> ? Api : never;
/**
 * Deprecated. Use `ApiForExtension` instead.
 *
 * For a given rendering extension target, returns the type of the API that the
 * extension will receive at runtime. This API type is the second argument to
 * the callback for that extension target. The first callback for all of the rendering
 * extension targets each receive a `RemoteRoot` object.
 *
 * @deprecated  Use `ApiForExtension` instead.
 */
export type ApiForRenderExtension<Target extends keyof RenderExtensions> = ExtractedApiFromRenderExtension<RenderExtensions[Target]>;
/**
 * For a given rendering extension target, returns the UI components that the
 * extension target supports.
 */
export type AllowedComponentsForRenderExtension<Target extends keyof RenderExtensions> = ExtractedAllowedComponentsFromRenderExtension<RenderExtensions[Target]>;
export type RunnableExtensionTarget = keyof RunnableExtensionTargets;
export type RunnableExtensions = {
    [Target in RunnableExtensionTarget]: RunnableExtensionTargets[Target];
};
export {};
//# sourceMappingURL=targets.d.ts.map