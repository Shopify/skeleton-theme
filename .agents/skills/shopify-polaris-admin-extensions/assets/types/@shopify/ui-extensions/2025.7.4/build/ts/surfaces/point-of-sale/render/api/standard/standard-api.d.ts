import { ConnectivityApi } from '../connectivity-api/connectivity-api';
import { DeviceApi } from '../device-api/device-api';
import { LocaleApi } from '../locale-api/locale-api';
import { SessionApi } from '../session-api/session-api';
import { ToastApi } from '../toast-api/toast-api';
import { ProductSearchApi } from '../product-search-api/product-search-api';
import { PrintApi } from '../print-api/print-api';
import { StorageApi } from '../storage-api/storage-api';
export type StandardApi<T> = {
    [key: string]: any;
} & {
    extensionPoint: T;
} & LocaleApi & ToastApi & SessionApi & PrintApi & ProductSearchApi & DeviceApi & ConnectivityApi & StorageApi;
//# sourceMappingURL=standard-api.d.ts.map