import type { ScannerSubscriptionResult, ScannerSource } from '@shopify/ui-extensions/point-of-sale';
import { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
export type { ScannerSource, ScannerSubscriptionResult, ScannerApiContent, ScannerApi, } from '@shopify/ui-extensions/point-of-sale';
/**
 * A hook utilizing `useState` and the `useStatefulSubscribableScannerData` function to create a component state.
 * @returns this hook returns the latest scan result state which re-renders on change.
 */
export declare function useScannerDataSubscription(): ScannerSubscriptionResult;
/**
 * A hook utilizing the `makeStatefulSubscribable` function to allow multiple scanner subscriptions.
 * @returns StatefulRemoteSubscribable object with a scan result in it.
 */
export declare function useStatefulSubscribableScannerData(): StatefulRemoteSubscribable<ScannerSubscriptionResult>;
/**
 * A function destroying the subscriptions `useStatefulSubscribableScannerData` has.
 */
export declare function destroyStatefulSubscribableScannerData(): void;
/**
 * A hook utilizing `useState` and the `useStatefulSubscribableScannerData` function to create a component state.
 * @returns this hook returns the latest scan result state which re-renders on change.
 */
export declare function useScannerSourcesSubscription(): ScannerSource[];
/**
 * A hook utilizing the `makeStatefulSubscribable` function to allow multiple scanner subscriptions.
 * @returns StatefulRemoteSubscribable object with a scan result in it.
 */
export declare function useStatefulSubscribableScannerSources(): StatefulRemoteSubscribable<ScannerSource[]>;
/**
 * A function destroying the subscriptions `useStatefulSubscribableScannerData` has.
 */
export declare function destroyStatefulSubscribableScannerSources(): void;
//# sourceMappingURL=scanner-api.d.ts.map