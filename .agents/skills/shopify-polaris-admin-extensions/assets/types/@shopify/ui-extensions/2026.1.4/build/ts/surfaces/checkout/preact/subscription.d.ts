import type { SubscribableSignalLike } from '../shared';
/**
 * Subscribes to the special wrapper type that all "changeable" values in the
 * checkout use. This hook extracts the most recent value from that object,
 * and subscribes to update the value when changes occur in the checkout.
 *
 * > Note:
 * > As of version 2025-10, you no longer need this hook. When you access `.value`
 * > (instead of `.current`) on subscribable properties, Preact will automatically
 * > re-render as `.value` changes.
 * @publicDocs
 */
export declare function useSubscription<Value>(subscription: SubscribableSignalLike<Value>): Value;
//# sourceMappingURL=subscription.d.ts.map