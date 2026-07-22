import type { ReadonlySignalLike } from '../../../../shared';
/**
 * The scanner source the POS device supports.
 * @publicDocs
 */
export type ScannerSource = 'camera' | 'external' | 'embedded';
/**
 * Represents the data from a scanner event. Contains the scanned string data and the hardware source that captured the scan.
 * @publicDocs
 */
export interface ScannerSubscriptionResult {
    /**
     * The string data from the last scanner event received. Contains the scanned barcode, QR code, or other scannable data. Returns `undefined` when no scan data is available. Use to process scanned content and implement scan-based business logic.
     */
    data?: string;
    /**
     * The scanning source from which the scan event came. Returns one of the following scanner types:
     *
     * • `'camera'` - Built-in device camera used for scanning
     * • `'external'` - External scanner hardware connected to the device
     * • `'embedded'` - Embedded scanner hardware built into the device
     */
    source?: ScannerSource;
}
/**
 * Represents the available scanner hardware sources on the device. Provides reactive access to the list of scanners that can be used for scanning operations.
 * @publicDocs
 */
export interface ScannerSources {
    /**
     * Current available scanner sources with subscription support. The `value` property provides current sources, and `subscribe` listens for changes. Use to monitor which scanners are available.
     */
    current: ReadonlySignalLike<ScannerSource[]>;
}
/**
 * Represents the scanner interface for accessing scan events and subscription management. Provides real-time access to scanned data through a reactive signal pattern.
 * @publicDocs
 */
export interface ScannerData {
    /**
     * Current available scanner sources with subscription support. The `value` property provides current sources, and `subscribe` listens for changes. Use to monitor which scanners are available.
     */
    current: ReadonlySignalLike<ScannerSubscriptionResult>;
}
/**
 * The `ScannerApi` object provides scan results and scanner controls.
 * @publicDocs
 */
export interface ScannerApiContent {
    /**
     * Access current scan data and subscribe to new scan events. Use to receive real-time scan results.
     */
    scannerData: ScannerData;
    /**
     * Access available scanner sources on the device. Use to check which scanners are available (camera, external, or embedded).
     */
    sources: ScannerSources;
    /**
     * Show the camera scanner.
     */
    showCameraScanner: () => void;
    /**
     * Hide the camera scanner.
     */
    hideCameraScanner: () => void;
}
/**
 * The `ScannerApi` object provides access to scanning functionality and scanner source information. Access these properties through `shopify.scanner` to monitor scan events and available scanner sources.
 * @publicDocs
 */
export interface ScannerApi {
    scanner: ScannerApiContent;
}
//# sourceMappingURL=scanner-api.d.ts.map