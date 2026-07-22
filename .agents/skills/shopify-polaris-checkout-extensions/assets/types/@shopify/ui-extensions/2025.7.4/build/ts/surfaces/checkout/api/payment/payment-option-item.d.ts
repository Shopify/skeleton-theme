import type { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
export type PaymentMethodAttributesResult = PaymentMethodAttributesResultSuccess | PaymentMethodAttributesResultError;
export interface PaymentMethodAttributesResultSuccess {
    /**
     * Indicates that the payment method attributes were set successfully.
     */
    type: 'success';
}
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
 */
export interface PaymentMethodAttribute {
    key: string;
    value: string | number | boolean;
}
export type PaymentMethodAttributesChange = PaymentMethodAttributesUpdateChange;
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
export interface PaymentOptionItemApi {
    /**
     * Sets the attributes of the related payment method.
     */
    applyPaymentMethodAttributesChange(change: PaymentMethodAttributesChange): Promise<PaymentMethodAttributesResult>;
    paymentMethodAttributes?: StatefulRemoteSubscribable<PaymentMethodAttribute[] | undefined>;
    bankIdNumber?: StatefulRemoteSubscribable<string | undefined>;
}
//# sourceMappingURL=payment-option-item.d.ts.map