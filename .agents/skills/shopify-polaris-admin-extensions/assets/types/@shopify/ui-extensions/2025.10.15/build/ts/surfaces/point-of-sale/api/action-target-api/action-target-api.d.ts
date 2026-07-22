import { ScannerApi } from '../scanner-api/scanner-api';
import { StandardApi } from '../standard/standard-api';
export type ActionTargetApi<T> = {
    [key: string]: any;
} & {
    extensionPoint: T;
} & StandardApi<T> & ScannerApi;
//# sourceMappingURL=action-target-api.d.ts.map