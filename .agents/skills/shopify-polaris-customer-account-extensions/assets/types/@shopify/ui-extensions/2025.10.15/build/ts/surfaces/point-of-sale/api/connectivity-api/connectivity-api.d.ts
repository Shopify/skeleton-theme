import type { ReadonlySignalLike } from '../../../../shared';
export type ConnectivityStateSeverity = 'Connected' | 'Disconnected';
/**
 * Represents the current Internet connectivity status of the device. Indicates whether the device is connected or disconnected from the Internet.
 */
export interface ConnectivityState {
    /**
     * The Internet connection status of the POS device.
     */
    internetConnected: ConnectivityStateSeverity;
}
/**
 * The `ConnectivityApi` object provides properties for monitoring network connectivity. Access these properties through `api.connectivity` to check connection status and subscribe to connectivity changes.
 *
 * @publicDocs
 */
export interface ConnectivityApiContent {
    /**
     * Provides read-only access to the current connectivity state and allows subscribing to connectivity changes. Use for implementing connectivity-aware functionality and reactive connectivity handling.
     */
    current: ReadonlySignalLike<ConnectivityState>;
}
/**
 * The `ConnectivityApi` object provides access to current connectivity information and change notifications. Access these properties through `shopify.connectivity` to monitor network status.
 */
export interface ConnectivityApi {
    connectivity: ConnectivityApiContent;
}
//# sourceMappingURL=connectivity-api.d.ts.map