import { Storage } from '../../../types/storage';
/**
 * The Storage API provides persistent local storage for POS UI extensions, allowing you to store, retrieve, and manage extension data
 * that persists across user sessions, device restarts, and extension target state changes. Access these methods through `api.storage`.
 */
export interface StorageApi {
    /**
     * Provides access to the persistent local storage methods for storing and retrieving extension data.
     */
    storage: Storage;
}
//# sourceMappingURL=storage-api.d.ts.map