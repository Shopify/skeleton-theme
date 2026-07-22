import type { Money } from './money';
import type { TaxLine } from './tax-line';
/**
 * Represents a shipping charge applied to an order, including the price and applicable taxes.
 */
export interface ShippingLine {
    /**
     * The handle identifier for the shipping method.
     */
    handle?: string;
    /**
     * The price of the shipping as a Money object.
     */
    price: Money;
    /**
     * The display title of the shipping method.
     */
    title?: string;
    /**
     * An array of individual tax lines showing tax breakdown.
     */
    taxLines?: TaxLine[];
}
/**
 * Represents a calculated shipping line with specific shipping or retail method type.
 */
export interface CalculatedShippingLine extends ShippingLine {
    /**
     * The type identifier for calculated shipping. This is always `'Calculated'` to distinguish from custom shipping lines. Calculated shipping rates are determined by carrier APIs, zone-based rules, or automated shipping calculators.
     */
    type: 'Calculated';
    /**
     * The shipping method category indicating whether this is standard shipping delivery or in-store retail pickup:
     * - `'SHIPPING'`: Traditional carrier-based shipping where items are delivered to a customer address.
     * - `'RETAIL'`: In-store pickup or buy-online-pickup-in-store (BOPIS) where customers collect items at a physical location.
     */
    methodType: 'SHIPPING' | 'RETAIL';
}
/**
 * Represents a custom shipping line with merchant-defined shipping charges.
 */
export interface CustomShippingLine extends ShippingLine {
    /**
     * The type identifier for custom shipping. This is always `'Custom'` to distinguish from calculated shipping lines. Custom shipping rates are manually set by merchants rather than calculated by carrier APIs or automated systems.
     */
    type: 'Custom';
}
//# sourceMappingURL=shipping-line.d.ts.map