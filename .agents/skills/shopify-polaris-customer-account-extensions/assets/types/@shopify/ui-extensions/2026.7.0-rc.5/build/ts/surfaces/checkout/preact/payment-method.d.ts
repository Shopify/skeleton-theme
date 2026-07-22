import type { PaymentMethodAttribute, PaymentMethodAttributesChange, PaymentMethodAttributesResult } from '../api/payment/payment-option-item';
/**
 * Returns the proposed `paymentAttributes` applied to the checkout.
 * @publicDocs
 */
export declare function usePaymentMethodAttributes(): PaymentMethodAttribute[] | undefined;
/**
 * Returns the values for the specified `paymentAttributes` applied to the checkout.
 *
 * @param keys - An array of attribute keys.
 * @publicDocs
 */
export declare function usePaymentMethodAttributeValues(keys: string[]): (PaymentMethodAttribute['value'] | undefined)[];
/**
 * Returns a function to set payment method attributes.
 * @publicDocs
 */
export declare function useApplyPaymentMethodAttributesChange(): (change: PaymentMethodAttributesChange) => Promise<PaymentMethodAttributesResult>;
//# sourceMappingURL=payment-method.d.ts.map