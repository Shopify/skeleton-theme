import type { GiftCardChange, GiftCardChangeResult } from '../api/checkout/checkout';
import type { AppliedGiftCard } from '../api/standard/standard';
import type { RenderExtensionTarget } from '../extension-targets';
/**
 * Returns the current gift cards applied to the cart, and automatically re-renders
 * your component if gift cards are added or removed.
 * @publicDocs
 */
export declare function useAppliedGiftCards<Target extends RenderExtensionTarget = RenderExtensionTarget>(): AppliedGiftCard[];
/**
 * Returns a function to add or remove gift cards.
 *
 * > Caution:
 * > See [security considerations](https://shopify.dev/docs/api/checkout-ui-extensions/configuration#network-access) if your extension retrieves gift card codes through a network call.
 * @publicDocs
 */
export declare function useApplyGiftCardChange<Target extends RenderExtensionTarget = RenderExtensionTarget>(): (change: GiftCardChange) => Promise<GiftCardChangeResult>;
//# sourceMappingURL=gift-cards.d.ts.map