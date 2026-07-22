/**
 * The available payment method types for POS transactions.
 */
export type PaymentMethod = 'Cash' | 'Custom' | 'CreditCard' | 'CardPresentRefund' | 'StripeCardPresentRefund' | 'GiftCard' | 'StripeCreditCard' | 'ShopPay' | 'StoreCredit' | 'Unknown';
/**
 * Represents a payment applied to a transaction, including the amount, currency, and payment method type.
 */
export interface Payment {
    /**
     * The payment amount.
     */
    amount: number;
    /**
     * The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code associated with the location currently active on POS.
     */
    currency: string;
    /**
     * The payment method type.
     */
    type: PaymentMethod;
}
//# sourceMappingURL=payment.d.ts.map