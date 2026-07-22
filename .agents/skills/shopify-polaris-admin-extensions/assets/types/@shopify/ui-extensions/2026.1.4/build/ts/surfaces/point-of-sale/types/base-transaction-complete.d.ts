import type { Customer, Discount } from './cart';
import type { Money } from './money';
import type { Payment } from './payment';
import type { ShippingLine } from './shipping-line';
import type { TaxLine } from './tax-line';
import type { TransactionType } from './transaction-type';
/**
 * Base interface for completed transaction data shared across all transaction types.
 */
export interface BaseTransactionComplete {
    /**
     * The transaction type identifier indicating which kind of transaction was completed (for example, `'Sale'` for new purchases, `'Return'` for refunds, `'Exchange'` for item swaps, `'Reprint'` for receipt reprints). This determines the transaction's business logic, receipt format, and inventory impact.
     */
    transactionType: TransactionType;
    /**
     * The unique numeric identifier for the Shopify order created by this transaction. This ID links the POS transaction to the order record in Shopify's system and can be used for order lookups, tracking, and API operations. Returns `undefined` for transactions that don't create orders (for example, reprints) or when order creation is pending.
     */
    orderId?: number;
    /**
     * The customer information if this transaction is associated with a customer account. Contains the customer ID for linking to customer records. Returns `undefined` for guest transactions where no customer was selected or when the transaction doesn't support customer association.
     */
    customer?: Customer;
    /**
     * An array of all discounts applied to this transaction, including cart-level discounts, automatic discounts, and discount codes. Each discount entry contains the discount amount, type, and description. Returns `undefined` or empty array when no discounts were applied. The sum of discount amounts reduces the final transaction total.
     */
    discounts?: Discount[];
    /**
     * The total tax amount charged on this transaction as a `Money` object. This is the sum of all tax lines and represents the combined tax from all applicable tax jurisdictions and rules. Tax calculations are based on the location, products, customer, and tax settings configured in Shopify.
     */
    taxTotal: Money;
    /**
     * The subtotal amount before taxes and after discounts are applied, as a `Money` object. This represents the sum of all line item prices (quantity × unit price) minus any discounts, but before tax is added. This is the taxable base amount for most tax calculations.
     */
    subtotal: Money;
    /**
     * The final total amount the customer pays for this transaction as a `Money` object. This includes all line items, shipping charges, taxes, and accounts for all discounts. This is the amount that must be tendered through payment methods. Calculated as: subtotal + taxTotal + shipping - discounts.
     */
    grandTotal: Money;
    /**
     * An array of all payment methods used to complete this transaction. Each payment entry specifies the payment type (for example, cash, credit card), amount tendered, and currency. Multiple entries indicate split payments where the customer paid using multiple methods (for example, part cash, part credit card). The sum of all payment amounts should equal or exceed the `grandTotal`.
     */
    paymentMethods: Payment[];
    /**
     * The remaining balance still owed on this transaction as a `Money` object. Typically `{amount: 0, currency: "USD"}` for fully paid transactions. A positive balance indicates partial payment or layaway scenarios. A negative balance indicates overpayment, where change should be returned to the customer. Calculated as: grandTotal minus sum of all payment amounts.
     */
    balanceDue: Money;
    /**
     * An array of shipping charges applied to this transaction. Each shipping line represents a shipping method with its price and associated taxes. Multiple entries can exist when different shipping methods apply to different items or when combining shipping with pickup. Returns `undefined` or empty array for transactions with no shipping charges (for example, in-store purchases, digital products).
     */
    shippingLines?: ShippingLine[];
    /**
     * An array of individual tax lines showing the detailed tax breakdown by jurisdiction and tax type. Each tax line represents a specific tax (for example, state tax, federal tax, VAT, GST) with its rate and calculated amount. Multiple tax lines can apply to a single transaction based on location, product taxability, and tax rules. Returns `undefined` or empty array for tax-exempt transactions or when detailed tax breakdown isn't available.
     */
    taxLines?: TaxLine[];
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp when the transaction was executed and completed (for example, `"2024-05-15T14:30:00Z"`). This marks the exact moment the transaction was finalized, payment was processed, and the order was created. Commonly used for transaction history, chronological sorting, reporting, audit trails, and synchronization with external systems.
     */
    executedAt: string;
    /**
     * The tip amount added to this transaction as a `Money` object. This represents the gratuity the customer chose to add on top of the grand total, typically for service-based businesses or hospitality transactions. Tipping can be enabled through POS settings and may be added as a percentage or fixed amount. Returns `undefined` when no tip was added or when tipping is not enabled for the transaction.
     */
    tipAmount?: Money;
}
//# sourceMappingURL=base-transaction-complete.d.ts.map