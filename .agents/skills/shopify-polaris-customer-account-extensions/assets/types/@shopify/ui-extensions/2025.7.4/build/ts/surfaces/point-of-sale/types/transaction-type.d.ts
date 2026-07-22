/**
 * The types of transactions that can be processed in POS:
 * - `'Sale'`: A new sale transaction where a customer purchases products or services. This creates a new order and processes payment. The most common transaction type in POS operations.
 * - `'Return'`: A return transaction where a customer returns previously purchased items for a refund. This credits back payment to the customer and returns items to inventory.
 * - `'Exchange'`: An exchange transaction where a customer returns items and simultaneously purchases replacement items. This combines return and sale operations in a single transaction, often with a price adjustment.
 * - `'Reprint'`: A receipt reprint operation where an existing transaction's receipt is reprinted. No new transaction is created—this only regenerates the receipt document for an existing sale, return, or exchange.
 */
export type TransactionType = 'Sale' | 'Return' | 'Exchange' | 'Reprint';
//# sourceMappingURL=transaction-type.d.ts.map