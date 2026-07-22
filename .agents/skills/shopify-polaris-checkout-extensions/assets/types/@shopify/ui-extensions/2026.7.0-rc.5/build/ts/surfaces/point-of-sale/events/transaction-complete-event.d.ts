import type { Customer, Discount, LineItem } from '../types/cart';
import type { Money } from '../types/money';
import type { Payment } from '../types/payment';
import type { ShippingLine } from '../types/shipping-line';
import type { TaxLine } from '../types/tax-line';
/**
 * Shared fields on every transaction-complete event, available regardless of
 * `transactionType`.
 */
interface BaseTransactionCompleteEvent extends Event {
    /**
     * The transaction type identifier indicating which kind of transaction was completed (for example, `'Sale'` for new purchases, `'Return'` for refunds, `'Exchange'` for item swaps). Narrow on this field to access transaction-type-specific properties.
     */
    readonly transactionType: 'Sale' | 'Return' | 'Exchange';
    /**
     * The unique numeric identifier for the Shopify order created by this transaction. This ID links the POS transaction to the order record in Shopify's system and can be used for order lookups, tracking, and API operations. Returns `undefined` when order creation is pending.
     */
    readonly orderId?: number;
    /**
     * The customer information if this transaction is associated with a customer account. Contains the customer ID for linking to customer records. Returns `undefined` for guest transactions where no customer was selected or when the transaction doesn't support customer association.
     */
    readonly customer?: Customer;
    /**
     * An array of all discounts applied to this transaction, including cart-level discounts, automatic discounts, and discount codes. Each discount entry contains the discount amount, type, and description. Empty when no discounts were applied. The sum of discount amounts reduces the final transaction total.
     */
    readonly discounts: Discount[];
    /**
     * The total tax amount charged on this transaction as a `Money` object. This is the sum of all tax lines and represents the combined tax from all applicable tax jurisdictions and rules. Tax calculations are based on the location, products, customer, and tax settings configured in Shopify.
     */
    readonly taxTotal: Money;
    /**
     * The subtotal amount before taxes and after discounts are applied, as a `Money` object. This represents the sum of all line item prices (quantity × unit price) minus any discounts, but before tax is added. This is the taxable base amount for most tax calculations.
     */
    readonly subtotal: Money;
    /**
     * The final total amount the customer pays for this transaction as a `Money` object. This includes all line items, shipping charges, taxes, and accounts for all discounts. This is the amount that must be tendered through payment methods. Calculated as: subtotal + taxTotal + shipping - discounts.
     */
    readonly grandTotal: Money;
    /**
     * An array of all payment methods used to complete this transaction. Each payment entry specifies the payment type (for example, cash, credit card), amount tendered, and currency. Multiple entries indicate split payments where the customer paid using multiple methods (for example, part cash, part credit card). The sum of all payment amounts should equal or exceed the `grandTotal`.
     */
    readonly paymentMethods: Payment[];
    /**
     * The remaining balance still owed on this transaction as a `Money` object. Typically zero for fully paid transactions. A positive balance indicates partial payment or layaway scenarios. A negative balance indicates overpayment, where change should be returned to the customer. Calculated as: grandTotal minus sum of all payment amounts.
     */
    readonly balanceDue: Money;
    /**
     * An array of shipping charges applied to this transaction. Each shipping line represents a shipping method with its price and associated taxes. Multiple entries can exist when different shipping methods apply to different items or when combining shipping with pickup. Empty for transactions with no shipping charges (for example, in-store purchases, digital products).
     */
    readonly shippingLines: ShippingLine[];
    /**
     * An array of individual tax lines showing the detailed tax breakdown by jurisdiction and tax type. Each tax line represents a specific tax (for example, state tax, federal tax, VAT, GST) with its rate and calculated amount. Multiple tax lines can apply to a single transaction based on location, product taxability, and tax rules. Empty for tax-exempt transactions or when detailed tax breakdown isn't available.
     */
    readonly taxLines: TaxLine[];
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp when the transaction was executed and completed (for example, `"2024-05-15T14:30:00Z"`). This marks the exact moment the transaction was finalized, payment was processed, and the order was created. Commonly used for transaction history, chronological sorting, reporting, audit trails, and synchronization with external systems.
     */
    readonly executedAt: string;
    /**
     * The tip amount added to this transaction as a `Money` object. This represents the gratuity the customer chose to add on top of the grand total, typically for service-based businesses or hospitality transactions. Tipping can be enabled through POS settings and may be added as a percentage or fixed amount. Returns `undefined` when no tip was added or when tipping is not enabled for the transaction.
     */
    readonly tipAmount?: Money;
}
/**
 * Dispatched when a sale transaction completes.
 */
interface SaleCompleteEvent extends BaseTransactionCompleteEvent {
    readonly transactionType: 'Sale';
    /**
     * The UUID of the draft order's checkout. Set when the sale originated from
     * a draft order; `undefined` otherwise.
     */
    readonly draftCheckoutUuid?: string;
    /**
     * An array of line items included in the sale transaction.
     */
    readonly lineItems: LineItem[];
}
/**
 * Dispatched when a return transaction completes.
 */
interface ReturnCompleteEvent extends BaseTransactionCompleteEvent {
    readonly transactionType: 'Return';
    /**
     * The refund ID. `undefined` when the return did not issue a refund
     * (for example, store-credit-only returns).
     */
    readonly refundId?: number;
    /**
     * The return ID for the completed return transaction.
     */
    readonly returnId?: number;
    /**
     * The exchange ID when this return is the gift-card side of an exchange;
     * `undefined` for standalone returns.
     */
    readonly exchangeId?: number;
    /**
     * An array of line items included in the return transaction.
     */
    readonly lineItems: LineItem[];
}
/**
 * Dispatched when an exchange transaction completes.
 */
interface ExchangeCompleteEvent extends BaseTransactionCompleteEvent {
    readonly transactionType: 'Exchange';
    /**
     * The exchange ID linking the return and sale sides of the exchange.
     */
    readonly exchangeId: number;
    /**
     * The return-side ID. `undefined` when the exchange has no return side.
     */
    readonly returnId?: number;
    /**
     * An array of line items added to the customer in the exchange.
     */
    readonly lineItemsAdded: LineItem[];
    /**
     * An array of line items removed from the customer in the exchange.
     */
    readonly lineItemsRemoved: LineItem[];
}
/**
 * Dispatched when a sale, return, or exchange transaction completes.
 *
 * Narrow on `transactionType` to access per-type fields.
 *
 * @example
 * ```ts
 * shopify.addEventListener('transactioncomplete', (event) => {
 *   if (event.transactionType === 'Sale') {
 *     console.log(event.lineItems, event.draftCheckoutUuid);
 *   }
 *   console.log(event.orderId, event.grandTotal);
 * });
 * ```
 * @publicDocs
 */
export type TransactionCompleteEvent = SaleCompleteEvent | ReturnCompleteEvent | ExchangeCompleteEvent;
export {};
//# sourceMappingURL=transaction-complete-event.d.ts.map