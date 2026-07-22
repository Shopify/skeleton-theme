import type { SubscribableSignalLike } from '../../shared';
import type { CartLine } from '../standard/standard';
/** @publicDocs */
export interface CartLineItemApi {
    /**
     * The cart line that this extension is attached to. Use this to read the
     * line item's merchandise, quantity, cost, and attributes.
     *
     * Available only on the corresponding item target. Shipping option item
     * targets expose shipping option properties; pickup location item targets
     * expose pickup location properties.
     *
     * > Note: Until version `2023-04`, this property was a `ReadonlySignalLike<PresentmentCartLine>`.
     */
    target: SubscribableSignalLike<CartLine>;
}
//# sourceMappingURL=cart-line-item.d.ts.map