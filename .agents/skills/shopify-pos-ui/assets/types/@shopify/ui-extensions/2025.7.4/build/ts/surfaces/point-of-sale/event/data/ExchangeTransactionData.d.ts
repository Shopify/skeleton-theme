import { BaseTransactionComplete } from '../../types/base-transaction-complete';
import { LineItem } from '../../types/cart';
/**
 * Defines the data structure for completed exchange transactions.
 */
export interface ExchangeTransactionData extends BaseTransactionComplete {
    /**
     * The transaction type identifier, always 'Sale' for sale transactions.
     */
    transactionType: 'Exchange';
    /**
     * The return ID for the completed return transaction.
     */
    returnId?: number;
    /**
     * The exchange ID if the return is part of an exchange transaction.
     */
    exchangeId?: number;
    /**
     * An array of line items added to the customer in the exchange.
     */
    lineItemsAdded: LineItem[];
    /**
     * An array of line items removed from the customer in the exchange.
     */
    lineItemsRemoved: LineItem[];
}
//# sourceMappingURL=ExchangeTransactionData.d.ts.map