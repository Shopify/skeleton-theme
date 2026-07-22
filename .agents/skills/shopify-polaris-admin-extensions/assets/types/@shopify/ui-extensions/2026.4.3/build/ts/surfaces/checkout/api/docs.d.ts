import type { StandardApi } from './standard/standard';
import type { CheckoutApi } from './checkout/checkout';
import type { CartLineItemApi } from './cart-line/cart-line-item';
/** @publicDocs */
export interface Docs_Standard_AddressApi extends Pick<StandardApi, 'shippingAddress' | 'billingAddress'> {
}
/** @publicDocs */
export interface Docs_Checkout_AddressApi extends Pick<CheckoutApi, 'applyShippingAddressChange'> {
}
/** @publicDocs */
export interface Docs_Standard_AttributesApi extends Pick<StandardApi, 'attributes'> {
}
/** @publicDocs */
export interface Docs_Checkout_AttributesApi extends Pick<CheckoutApi, 'applyAttributeChange'> {
}
/** @publicDocs */
export interface Docs_Standard_BuyerIdentityApi extends Pick<StandardApi, 'buyerIdentity'> {
}
/** @publicDocs */
export interface Docs_Standard_BuyerJourneyApi extends Pick<StandardApi, 'buyerJourney'> {
}
/** @publicDocs */
export interface Docs_Standard_CartInstructionsApi extends Pick<StandardApi, 'instructions'> {
}
/** @publicDocs */
export interface Docs_Standard_CartLinesApi extends Pick<StandardApi, 'lines'> {
}
/** @publicDocs */
export interface Docs_Checkout_CartLinesApi extends Pick<CheckoutApi, 'applyCartLinesChange'> {
}
/** @publicDocs */
export interface Docs_CartLineItem_CartLinesApi extends Pick<CartLineItemApi, 'target'> {
}
/** @publicDocs */
export interface Docs_Standard_CostApi extends Pick<StandardApi, 'cost'> {
}
/** @publicDocs */
export interface Docs_Standard_LocalizationApi extends Pick<StandardApi, 'i18n' | 'localization'> {
}
/** @publicDocs */
export interface Docs_Standard_LocalizedFieldsApi extends Pick<StandardApi, 'localizedFields'> {
}
/** @publicDocs */
export interface Docs_Standard_MetafieldsApi extends Pick<StandardApi, 'appMetafields'> {
}
/** @publicDocs */
export interface Docs_Checkout_MetafieldsApi extends Pick<CheckoutApi, 'applyMetafieldChange'> {
}
/** @publicDocs */
export interface Docs_Standard_DeliveryApi extends Pick<StandardApi, 'deliveryGroups'> {
}
/** @publicDocs */
export interface Docs_Standard_CheckoutTokenApi extends Pick<StandardApi, 'checkoutToken'> {
}
/** @publicDocs */
export interface Docs_Standard_ExtensionMetaApi extends Pick<StandardApi, 'extension'> {
}
/** @publicDocs */
export interface Docs_Standard_CheckoutSettingsApi extends Pick<StandardApi, 'checkoutSettings'> {
}
/** @publicDocs */
export interface Docs_Standard_ShopApi extends Pick<StandardApi, 'shop'> {
}
/** @publicDocs */
export interface Docs_Standard_NoteApi extends Pick<StandardApi, 'note'> {
}
/** @publicDocs */
export interface Docs_Checkout_NoteApi extends Pick<CheckoutApi, 'applyNoteChange'> {
}
/** @publicDocs */
export interface Docs_Standard_PaymentOptionsApi extends Pick<StandardApi, 'availablePaymentOptions' | 'selectedPaymentOptions'> {
}
/** @publicDocs */
export interface Docs_Standard_GiftCardsApi extends Pick<StandardApi, 'appliedGiftCards'> {
}
/** @publicDocs */
export interface Docs_Checkout_GiftCardsApi extends Pick<CheckoutApi, 'applyGiftCardChange'> {
}
/** @publicDocs */
export interface Docs_Standard_DiscountsApi extends Pick<StandardApi, 'discountAllocations' | 'discountCodes'> {
}
/** @publicDocs */
export interface Docs_Checkout_DiscountsApi extends Pick<CheckoutApi, 'applyDiscountCodeChange'> {
}
/** @publicDocs */
export interface Docs_Standard_SessionTokenApi extends Pick<StandardApi, 'sessionToken'> {
}
/** @publicDocs */
export interface Docs_Standard_SettingsApi extends Pick<StandardApi, 'settings'> {
}
/** @publicDocs */
export interface Docs_Standard_StorageApi extends Pick<StandardApi, 'storage'> {
}
/** @publicDocs */
export interface Docs_Standard_QueryApi extends Pick<StandardApi, 'query'> {
}
/** @publicDocs */
export interface Docs_Standard_AnalyticsApi extends Pick<StandardApi, 'analytics'> {
}
/** @publicDocs */
export interface Docs_Standard_CustomerPrivacyApi extends Pick<StandardApi, 'customerPrivacy' | 'applyTrackingConsentChange'> {
}
//# sourceMappingURL=docs.d.ts.map