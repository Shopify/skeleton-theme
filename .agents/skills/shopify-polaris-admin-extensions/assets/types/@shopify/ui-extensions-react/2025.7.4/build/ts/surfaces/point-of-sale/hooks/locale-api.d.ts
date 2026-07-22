import { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
/**
 * A hook utilizing `useState` and the `useStatefulSubscribableLocale` function to create a component state.
 * @returns this hook returns the latest Locale state which re-renders on change.
 */
export declare function useLocaleSubscription(): string;
/**
 * A hook utilizing the `makeStatefulSubscribable` function to allow multiple Locale subscriptions.
 * @returns StatefulRemoteSubscribable object with a Locale in it.
 */
export declare function useStatefulSubscribableLocale(): StatefulRemoteSubscribable<string>;
/**
 * A function destroying the subscriptions `useStatefulSubscribableCart` has.
 */
export declare function destroyStatefulSubscribableLocale(): void;
//# sourceMappingURL=locale-api.d.ts.map