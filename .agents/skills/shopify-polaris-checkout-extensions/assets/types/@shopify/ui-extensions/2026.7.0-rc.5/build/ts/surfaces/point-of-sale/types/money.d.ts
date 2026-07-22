/**
 * Represents a monetary amount with currency information.
 * @publicDocs
 */
export interface Money {
    /**
     * The monetary amount as a number.
     */
    amount: number;
    /**
     * The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code associated with the location currently active on POS.
     */
    currency: string;
}
/**
 * Represents a monetary amount as a string with explicit currency code.
 * @publicDocs
 */
export interface MoneyV2 {
    /**
     * The monetary amount as a string.
     */
    amount: string;
    /**
     * The ISO currency code (for example, USD, CAD).
     */
    currencyCode: string;
}
//# sourceMappingURL=money.d.ts.map