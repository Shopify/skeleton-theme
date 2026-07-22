import type { Navigation } from './api/navigation-api/navigation-api';
import type { ShopifyEventMap } from './events';
/**
 * The `shopify` global provides APIs that are available to all POS extensions
 * without needing to access them through the target's `api` argument.
 *
 * @publicDocs
 */
export interface ShopifyGlobal {
}
/**
 * Background-only extension of `ShopifyGlobal`. Adds host-event listener APIs
 * that are only valid from the session-lifetime background target
 * (`pos.app.ready.data`). Non-background targets see the narrower
 * `ShopifyGlobal` and cannot type-check calls to these methods.
 *
 * @publicDocs
 */
export interface BackgroundShopifyGlobal extends ShopifyGlobal {
    /**
     * Register a listener for a POS host event. Listeners are fire-and-forget:
     * their return values are ignored, and their errors are caught without
     * affecting the host or other listeners.
     */
    addEventListener<K extends keyof ShopifyEventMap>(type: K, listener: (event: ShopifyEventMap[K]) => void): void;
    /**
     * Remove a listener previously registered with `addEventListener`. The
     * `listener` reference must match the one used to register.
     */
    removeEventListener<K extends keyof ShopifyEventMap>(type: K, listener: (event: ShopifyEventMap[K]) => void): void;
}
declare global {
    const navigation: Navigation;
    const shopify: ShopifyGlobal;
}
//# sourceMappingURL=globals.d.ts.map