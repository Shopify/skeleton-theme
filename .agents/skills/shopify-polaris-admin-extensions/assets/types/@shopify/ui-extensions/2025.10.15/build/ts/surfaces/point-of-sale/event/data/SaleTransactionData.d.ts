import { BaseTransactionComplete } from '../../types/base-transaction-complete';
import { LineItem } from '../../types/cart';
/**
 * Defines the data structure for completed sale transactions.
 */
export interface SaleTransactionData extends BaseTransactionComplete {
    /**
     * The transaction type identifier, always 'Sale' for sale transactions.
     */
    transactionType: 'Sale';
    /**
     * The UUID of the draft checkout if the sale originated from a draft order.
     */
    draftCheckoutUuid?: string;
    /**
     * An array of line items included in the sale transaction.
     */
    lineItems: LineItem[];
}
//# sourceMappingURL=SaleTransactionData.d.ts.map