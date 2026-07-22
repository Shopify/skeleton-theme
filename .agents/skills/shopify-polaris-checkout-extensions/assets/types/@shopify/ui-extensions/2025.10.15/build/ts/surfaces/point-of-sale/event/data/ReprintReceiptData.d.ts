import { BaseTransactionComplete } from '../../types/base-transaction-complete';
import { LineItem } from '../../types/cart';
import { OrderLineItem } from '../../types/order';
/**
 * Defines the data structure for receipt reprint requests.
 */
export interface ReprintReceiptData extends BaseTransactionComplete {
    /**
     * The transaction type identifier, always 'Reprint' for reprint transactions.
     */
    transactionType: 'Reprint';
    /**
     * An array of line items included in the transaction.
     */
    lineItems: OrderLineItem[];
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
     * An array of line items added to the customer in the exchange.
     */
    lineItemsAdded?: LineItem[];
    /**
     * An array of line items removed from the customer in the exchange.
     */
    lineItemsRemoved?: LineItem[];
}
//# sourceMappingURL=ReprintReceiptData.d.ts.map