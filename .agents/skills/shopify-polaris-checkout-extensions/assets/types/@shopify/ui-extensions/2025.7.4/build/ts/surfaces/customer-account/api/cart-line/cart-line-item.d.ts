import type { StatefulRemoteSubscribable } from '@remote-ui/async-subscription';
import { CartLine } from '../order-status/order-status';
export interface CartLineItemApi {
    /**
     * The cart line the extension is attached to.
     */
    target: StatefulRemoteSubscribable<CartLine>;
}
//# sourceMappingURL=cart-line-item.d.ts.map