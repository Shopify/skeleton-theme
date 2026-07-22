import { BaseTransactionComplete } from '../../types/base-transaction-complete';
import { LineItem } from '../../types/cart';
/**
 * Defines the data structure for completed return transactions.
 */
export interface ReturnTransactionData extends BaseTransactionComplete {
    /**
     * The transaction type identifier, always 'Sale' for sale transactions.
     */
    transactionType: 'Return';
    /**
     * The refund ID if a refund was issued for the return.
     */
    refundId?: number;
    /**
     * The return ID for the completed return transaction.
     */
    returnId?: number;
    /**
     * The exchange ID if the return is part of an exchange transaction.
     */
    exchangeId?: number;
    /**
     * An array of line items included in the sale transaction.
     */
    lineItems: LineItem[];
}
//# sourceMappingURL=ReturnTransactionData.d.ts.map