import { BaseTransactionComplete } from '../../types/base-transaction-complete';
import { OrderLineItem } from '../../types/order';
/**
 * Defines the data structure for receipt reprint requests.
 */
export interface ReprintReceiptData extends BaseTransactionComplete {
    /**
     * The transaction type identifier, always 'Sale' for sale transactions.
     */
    transactionType: 'Reprint';
    /**
     * An array of line items included in the sale transaction.
     */
    lineItems: OrderLineItem[];
}
//# sourceMappingURL=ReprintReceiptData.d.ts.map