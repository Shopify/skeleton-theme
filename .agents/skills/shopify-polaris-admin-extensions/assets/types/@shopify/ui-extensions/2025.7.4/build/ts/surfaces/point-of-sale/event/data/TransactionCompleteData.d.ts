import { BaseData } from './BaseData';
import type { SaleTransactionData } from './SaleTransactionData';
import type { ExchangeTransactionData } from './ExchangeTransactionData';
import type { ReturnTransactionData } from './ReturnTransactionData';
import type { ReprintReceiptData } from './ReprintReceiptData';
import { BaseApi } from './BaseApi';
/**
 * The data object provided to receipt targets containing transaction details.
 */
export interface TransactionCompleteData extends BaseData, BaseApi {
    /**
     * Provides access to persistent local storage methods for your POS UI extension. Use this to store, retrieve, and manage data that persists across sessions.
     */
    storage: BaseApi['storage'];
    /**
     * The transaction data, which can be one of the following types:
     * - `SaleTransactionData`: Defines the data structure for completed sale transactions.
     * - `ReturnTransactionData`: Defines the data structure for completed return transactions.
     * - `ExchangeTransactionData`: Defines the data structure for completed exchange transactions.
     */
    transaction: SaleTransactionData | ReturnTransactionData | ExchangeTransactionData;
}
/**
 * The data object provided to receipt targets containing transaction details and reprint information.
 */
export interface TransactionCompleteWithReprintData extends BaseData, BaseApi {
    /**
     * Provides access to persistent local storage methods for your POS UI extension. Use this to store, retrieve, and manage data that persists across sessions.
     */
    storage: BaseApi['storage'];
    /**
     * The transaction data, which can be one of the following types:
     * - `SaleTransactionData`: Defines the data structure for completed sale transactions.
     * - `ReturnTransactionData`: Defines the data structure for completed return transactions.
     * - `ExchangeTransactionData`: Defines the data structure for completed exchange transactions.
     * - `ReprintReceiptData`: Defines the data structure for receipt reprint requests.
     */
    transaction: SaleTransactionData | ReturnTransactionData | ExchangeTransactionData | ReprintReceiptData;
}
//# sourceMappingURL=TransactionCompleteData.d.ts.map