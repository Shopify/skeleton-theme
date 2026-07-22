import { CameraApi } from '../camera-api/camera-api';
import { ConnectivityApi } from '../connectivity-api/connectivity-api';
import { DeviceApi } from '../device-api/device-api';
import { LocaleApi } from '../locale-api/locale-api';
import { SessionApi } from '../session-api/session-api';
import { ToastApi } from '../toast-api/toast-api';
import { ProductSearchApi } from '../product-search-api/product-search-api';
import { PrintApi } from '../print-api/print-api';
import { StorageApi } from '../storage-api/storage-api';
import { PinPadApi } from '../pin-pad-api';
import type { I18n } from '../../../../api';
export type StandardApi<T> = {
    [key: string]: any;
} & {
    extensionPoint: T;
    i18n: I18n;
} & LocaleApi & ToastApi & SessionApi & PrintApi & ProductSearchApi & DeviceApi & ConnectivityApi & StorageApi & PinPadApi & CameraApi;
//# sourceMappingURL=standard-api.d.ts.map