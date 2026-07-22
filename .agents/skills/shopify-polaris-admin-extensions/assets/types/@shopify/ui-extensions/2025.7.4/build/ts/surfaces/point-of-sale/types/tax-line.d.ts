import type { Money } from './money';
/**
 * Represents a tax line applied to an item or transaction.
 */
export interface TaxLine {
    /**
     * The title or name of the tax.
     */
    title: string;
    /**
     * The tax amount as a Money object.
     */
    price: Money;
    /**
     * The tax rate as a decimal number.
     */
    rate: number;
    /**
     * The unique identifier for this tax line.
     */
    uuid?: string;
    /**
     * The range of tax rates if applicable.
     */
    rateRange?: {
        min: number;
        max: number;
    };
    /**
     * Whether this tax is currently enabled.
     */
    enabled?: boolean;
}
//# sourceMappingURL=tax-line.d.ts.map