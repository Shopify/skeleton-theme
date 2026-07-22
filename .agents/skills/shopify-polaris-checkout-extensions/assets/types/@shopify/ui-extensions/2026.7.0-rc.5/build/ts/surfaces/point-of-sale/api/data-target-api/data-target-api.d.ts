import { CartApi } from '../cart-api/cart-api';
import { ConnectivityApi } from '../connectivity-api/connectivity-api';
import { DeviceApi } from '../device-api/device-api';
import { ExtensionApi } from '../extension-api/extension-api';
import { LocaleApi } from '../locale-api/locale-api';
import { ProductSearchApi } from '../product-search-api/product-search-api';
import { SessionApi } from '../session-api/session-api';
import { StorageApi } from '../storage-api/storage-api';
import type { I18n } from '../../../../api';
/**
 * API surface for non-rendering data extension targets.
 * @publicDocs
 */
export type DataTargetApi<T> = {
    /**
     * @deprecated Use `extension.target` instead.
     */
    extensionPoint: T;
    i18n: I18n;
} & ExtensionApi<T> & SessionApi & StorageApi & LocaleApi & ConnectivityApi & DeviceApi & ProductSearchApi & CartApi;
//# sourceMappingURL=data-target-api.d.ts.map