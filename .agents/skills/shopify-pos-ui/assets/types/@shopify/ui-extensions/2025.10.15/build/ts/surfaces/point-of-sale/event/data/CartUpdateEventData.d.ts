import { BaseData } from './BaseData';
import { Cart } from '../../api';
import { BaseApi } from './BaseApi';
/**
 * The data object provided to cart update extension targets. Contains the current cart state along with device, session, and connectivity information. This data is passed to extensions whenever the cart changes, enabling real-time cart monitoring and cart-based business logic.
 */
export interface CartUpdateEventData extends BaseData, BaseApi {
    /**
     * The complete current `Cart` object containing all cart data including line items with products and quantities, pricing totals (subtotal, tax, grand total), associated customer information, applied discounts, custom properties, and editability state. This represents the cart's state at the moment the extension is triggered, reflecting all recent changes. The cart object is read-only in this context—modifications should be made through the Cart API methods.
     */
    cart: Cart;
}
//# sourceMappingURL=CartUpdateEventData.d.ts.map