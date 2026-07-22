import type { PaymentMethodAttributesResult, PaymentMethodAttributesChange, PaymentMethodAttribute } from '@shopify/ui-extensions/checkout';
/**
 * Returns the proposed `paymentAttributes` applied to the checkout.
 */
export declare function usePaymentMethodAttributes(): PaymentMethodAttribute[] | undefined;
/**
 * Returns the values for the specified `paymentAttributes` applied to the checkout.
 *
 * @param keys - An array of attribute keys.
 */
export declare function usePaymentMethodAttributeValues(keys: string[]): (PaymentMethodAttribute['value'] | undefined)[];
/**
 * Returns a function to set payment method attributes.
 */
export declare function useApplyPaymentMethodAttributesChange(): (change: PaymentMethodAttributesChange) => Promise<PaymentMethodAttributesResult>;
//# sourceMappingURL=payment-method.d.ts.map