import type { SubscribableSignalLike } from '../../shared';
/** @publicDocs */
export type PaymentMethodAttributesResult = PaymentMethodAttributesResultSuccess | PaymentMethodAttributesResultError;
/** @publicDocs */
export interface PaymentMethodAttributesResultSuccess {
    /**
     * Indicates that the payment method attributes were set successfully.
     */
    type: 'success';
}
/** @publicDocs */
export interface PaymentMethodAttributesResultError {
    /**
     * Indicates that the payment method attributes were not set successfully.
     */
    type: 'error';
    /**
     * A message that explains the error. This message is useful for debugging.
     * It is **not** localized, and therefore should not be presented directly
     * to the buyer.
     */
    message: string;
}
/**
 * A key-value pair that represents an attribute of a payment method.
 * @publicDocs
 */
export interface PaymentMethodAttribute {
    key: string;
    value: string | number | boolean;
}
/** @publicDocs */
export type PaymentMethodAttributesChange = PaymentMethodAttributesUpdateChange;
/** @publicDocs */
export interface PaymentMethodAttributesUpdateChange {
    /**
     * The type of the `PaymentMethodAttributesChange` API.
     */
    type: 'updatePaymentMethodAttributes';
    /**
     * The payment method attributes
     */
    attributes: PaymentMethodAttribute[];
}
/** @publicDocs */
export interface PaymentOptionItemApi {
    /**
     * Sets the attributes of the related payment method.
     */
    applyPaymentMethodAttributesChange(change: PaymentMethodAttributesChange): Promise<PaymentMethodAttributesResult>;
    paymentMethodAttributes?: SubscribableSignalLike<PaymentMethodAttribute[] | undefined>;
    bankIdNumber?: SubscribableSignalLike<string | undefined>;
}
//# sourceMappingURL=payment-option-item.d.ts.map