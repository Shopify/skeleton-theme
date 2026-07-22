import type { ConnectivityState } from '@shopify/ui-extensions/point-of-sale';
import { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
/**
 * A hook utilizing `useState` and the `useStatefulSubscribableConnectivity` function to create a component state.
 * @returns this hook returns the latest Connectivity state which re-renders on change.
 */
export declare function useConnectivitySubscription(): ConnectivityState;
/**
 * A hook utilizing the `makeStatefulSubscribable` function to allow multiple Connectivity subscriptions.
 * @returns StatefulRemoteSubscribable object with a Connectivity in it.
 */
export declare function useStatefulSubscribableConnectivity(): StatefulRemoteSubscribable<ConnectivityState>;
/**
 * A function destroying the subscriptions `useStatefulSubscribableConnectivity` has.
 */
export declare function destroyStatefulSubscribableConnectivity(): void;
//# sourceMappingURL=connectivity-api.d.ts.map