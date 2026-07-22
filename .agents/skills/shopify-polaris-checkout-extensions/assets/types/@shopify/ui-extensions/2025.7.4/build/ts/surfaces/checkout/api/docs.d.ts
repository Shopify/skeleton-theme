import type { StandardApi } from './standard/standard';
import type { CheckoutApi } from './checkout/checkout';
import type { CartLineItemApi } from './cart-line/cart-line-item';
import type { OrderStatusApi } from './order-status/order-status';
/**
 * These types are used to generate the documentation for the API and decipher which properties are available for which APIs.
 * If you are adding a new property and you'd like it to be documented in the API section, then you'll need to specify the property in the appropriate interface below.
 *
 * Note: These are not exported as part of the package, they are only used for documentation purposes.
 */
export interface Docs_Standard_AddressApi extends Pick<StandardApi, 'shippingAddress' | 'billingAddress'> {
}
export interface Docs_Checkout_AddressApi extends Pick<CheckoutApi, 'applyShippingAddressChange'> {
}
export interface Docs_Standard_AttributesApi extends Pick<StandardApi, 'attributes'> {
}
export interface Docs_Checkout_AttributesApi extends Pick<CheckoutApi, 'applyAttributeChange'> {
}
export interface Docs_Standard_BuyerIdentityApi extends Pick<StandardApi, 'buyerIdentity'> {
}
export interface Docs_Standard_BuyerJourneyApi extends Pick<StandardApi, 'buyerJourney'> {
}
export interface Docs_Standard_CartInstructionsApi extends Pick<StandardApi, 'instructions'> {
}
export interface Docs_Standard_CartLinesApi extends Pick<StandardApi, 'lines'> {
}
export interface Docs_Checkout_CartLinesApi extends Pick<CheckoutApi, 'applyCartLinesChange'> {
}
export interface Docs_CartLineItem_CartLinesApi extends Pick<CartLineItemApi, 'target'> {
}
export interface Docs_Standard_CostApi extends Pick<StandardApi, 'cost'> {
}
export interface Docs_Standard_LocalizationApi extends Pick<StandardApi, 'i18n' | 'localization'> {
}
export interface Docs_Standard_LocalizedFieldsApi extends Pick<StandardApi, 'localizedFields'> {
}
export interface Docs_Standard_MetafieldsApi extends Pick<StandardApi, 'appMetafields' | 'metafields'> {
}
export interface Docs_Checkout_MetafieldsApi extends Pick<CheckoutApi, 'applyMetafieldChange'> {
}
export interface Docs_Standard_DeliveryApi extends Pick<StandardApi, 'deliveryGroups'> {
}
export interface Docs_Standard_CheckoutTokenApi extends Pick<StandardApi, 'checkoutToken'> {
}
export interface Docs_Standard_ExtensionMetaApi extends Pick<StandardApi, 'extension'> {
}
export interface Docs_Standard_CheckoutSettingsApi extends Pick<StandardApi, 'checkoutSettings'> {
}
export interface Docs_Standard_ShopApi extends Pick<StandardApi, 'shop'> {
}
export interface Docs_Standard_NoteApi extends Pick<StandardApi, 'note'> {
}
export interface Docs_Checkout_NoteApi extends Pick<CheckoutApi, 'applyNoteChange'> {
}
export interface Docs_OrderStatus_OrderApi extends Pick<OrderStatusApi, 'order'> {
}
export interface Docs_Standard_PaymentOptionsApi extends Pick<StandardApi, 'availablePaymentOptions' | 'selectedPaymentOptions'> {
}
export interface Docs_Standard_GiftCardsApi extends Pick<StandardApi, 'appliedGiftCards'> {
}
export interface Docs_Checkout_GiftCardsApi extends Pick<CheckoutApi, 'applyGiftCardChange'> {
}
export interface Docs_Standard_DiscountsApi extends Pick<StandardApi, 'discountAllocations' | 'discountCodes'> {
}
export interface Docs_Checkout_DiscountsApi extends Pick<CheckoutApi, 'applyDiscountCodeChange'> {
}
export interface Docs_Standard_SessionTokenApi extends Pick<StandardApi, 'sessionToken'> {
}
export interface Docs_Standard_SettingsApi extends Pick<StandardApi, 'settings'> {
}
export interface Docs_Standard_StorageApi extends Pick<StandardApi, 'storage'> {
}
export interface Docs_Standard_QueryApi extends Pick<StandardApi, 'query'> {
}
export interface Docs_Standard_AnalyticsApi extends Pick<StandardApi, 'analytics'> {
}
export interface Docs_Standard_CustomerPrivacyApi extends Pick<StandardApi, 'customerPrivacy' | 'applyTrackingConsentChange'> {
}
export interface Docs_Standard_Ui extends Pick<StandardApi, 'ui'> {
}
//# sourceMappingURL=docs.d.ts.map