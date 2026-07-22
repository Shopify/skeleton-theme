import type { Cart } from '@shopify/ui-extensions/point-of-sale';
import type { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
/**
 * A hook for checking if the cart has been determined to be editable.
 *
 * This hook is stateful and can be used to trigger a re-render when the value of this editable state changes.
 *
 * If the cart's `editable` property is not set, defaults to `true`.
 *
 * @returns true if the cart is editable, false otherwise.
 */
export declare const useCartEditable: () => boolean;
/**
 * A hook utilizing `useState` and the `useStatefulSubscribableCart` function to create a component state.
 * @returns this hook returns the latest Cart state which re-renders on change.
 */
export declare function useCartSubscription(): Cart;
/**
 * A hook utilizing the `makeStatefulSubscribable` function to allow multiple Cart subscriptions.
 * @returns StatefulRemoteSubscribable object with a Cart in it.
 */
export declare function useStatefulSubscribableCart(): StatefulRemoteSubscribable<Cart>;
/**
 * A function destroying the subscriptions `useStatefulSubscribableCart` has.
 */
export declare function destroyStatefulSubscribableCart(): void;
//# sourceMappingURL=cart-api.d.ts.map