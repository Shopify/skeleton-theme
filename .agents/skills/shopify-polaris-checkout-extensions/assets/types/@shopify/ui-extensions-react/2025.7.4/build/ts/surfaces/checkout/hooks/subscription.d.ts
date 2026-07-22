import type { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
/**
 * Subscribes to the special wrapper type that all “changeable” values in the
 * checkout use. This hook extracts the most recent value from that object,
 * and subscribes to update the value when changes occur in the checkout.
 *
 * > Note:
 * > You generally shouldn’t need to use this directly, as there are dedicated hooks
 * > for accessing the current value of each individual resource in the checkout.
 */
export declare function useSubscription<Value>(subscription: StatefulRemoteSubscribable<Value>): Value;
//# sourceMappingURL=subscription.d.ts.map