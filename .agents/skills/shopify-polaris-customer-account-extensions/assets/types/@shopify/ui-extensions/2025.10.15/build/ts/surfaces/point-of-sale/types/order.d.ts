import { LineItem } from './cart';
/**
 * Represents a refund applied to a line item, including when it was created and the quantity refunded.
 */
export interface LineItemRefund {
    /**
     * The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp when the refund was created and processed (for example, `"2024-05-15T14:30:00Z"`). This indicates when the refund was initiated and can be used for chronological sorting, refund history displays, or audit trails.
     */
    createdAt: string;
    /**
     * The number of units refunded in this refund transaction. This must be a positive integer representing how many items were returned to inventory or credited back to the customer. Multiple refunds can exist for the same line item if partial refunds were processed over time.
     */
    quantity: number;
}
/**
 * Represents a line item from an order, extending the base line item with current quantity and refund information.
 */
export interface OrderLineItem extends LineItem {
    /**
     * The current quantity of items that remain with the customer after accounting for refunds. This is calculated as the original `quantity` minus any refunded quantities. For example, if 5 items were ordered and 2 were refunded, `currentQuantity` would be `3`. This value reflects the net quantity the customer kept from this line item.
     */
    currentQuantity: number;
    /**
     * An array of all refund transactions applied to this line item, ordered chronologically. Each refund entry tracks when the refund occurred and how many units were refunded. Multiple entries indicate partial refunds processed over time. Returns `undefined` or empty array when no refunds have been applied to this line item.
     */
    refunds?: LineItemRefund[];
}
//# sourceMappingURL=order.d.ts.map