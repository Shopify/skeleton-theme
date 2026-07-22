import { CartLine } from '../order-status/order-status';
import { SubscribableSignalLike } from '../shared';
/**
 * @publicDocs
 */
export interface CartLineItemApi {
    /**
     * The cart line that this extension is attached to. Use this to read the line item's merchandise, quantity, cost, and attributes.
     */
    target: SubscribableSignalLike<CartLine>;
}
//# sourceMappingURL=cart-line-item.d.ts.map