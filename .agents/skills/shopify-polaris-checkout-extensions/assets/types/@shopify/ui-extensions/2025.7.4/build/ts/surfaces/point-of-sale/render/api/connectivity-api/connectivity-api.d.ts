import type { RemoteSubscribable } from '@remote-ui/async-subscription';
export type ConnectivityStateSeverity = 'Connected' | 'Disconnected';
/**
 * Represents the current Internet connectivity status of the device. Indicates whether the device is connected or disconnected from the Internet.
 */
export interface ConnectivityState {
    /**
     * Whether the device is connected to the Internet. Returns either `Connected` or `Disconnected` to indicate the current Internet connectivity status. Use for implementing connectivity-aware functionality, displaying connectivity indicators, or controlling network-dependent features.
     */
    internetConnected: ConnectivityStateSeverity;
}
export interface ConnectivityApiContent {
    /**
     * Creates a subscription to changes in connectivity. Provides an initial value and a callback to subscribe to value changes. Use for implementing connectivity-aware functionality and reactive connectivity handling.
     */
    subscribable: RemoteSubscribable<ConnectivityState>;
}
/**
 * The `ConnectivityApi` object provides access to current connectivity information and change notifications. Access these properties through `api.connectivity` to monitor network status.
 */
export interface ConnectivityApi {
    connectivity: ConnectivityApiContent;
}
//# sourceMappingURL=connectivity-api.d.ts.map