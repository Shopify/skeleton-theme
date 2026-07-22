import type { LineItem } from '../../types/cart';
/**
 * The `CartLineItemApi` object provides access to the current line item. Access this property through `api.cartLineItem` to interact with the current line item context.
 * @publicDocs
 */
export interface CartLineItemApi {
    /**
     * The selected line item in the merchant's current cart. Provides complete line item data including product information, pricing, discounts, properties, and metadata. Use for displaying item details and implementing item-specific functionality.
     */
    cartLineItem: LineItem;
}
//# sourceMappingURL=cart-line-item-api.d.ts.map