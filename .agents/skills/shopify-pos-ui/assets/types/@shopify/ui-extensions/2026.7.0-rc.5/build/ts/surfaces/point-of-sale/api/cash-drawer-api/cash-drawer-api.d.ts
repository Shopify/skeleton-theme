/**
 * The `CashDrawerApi` object provides methods for controlling cash drawer hardware. Access these methods through `shopify.cashDrawer` to trigger cash drawer operations.
 * @publicDocs
 */
export interface CashDrawerApiContent {
    /**
     * Opens the connected cash drawer device. The drawer will automatically open if a compatible cash drawer is connected to the POS device. Use for manual cash drawer operations, implementing custom payment workflows, or providing explicit cash drawer access in register management interfaces.
     *
     * @returns Void
     */
    open(): Promise<void>;
}
/**
 * The `CashDrawerApi` object provides methods for controlling cash drawer hardware. Access these methods through `shopify.cashDrawer` to trigger cash drawer operations.
 * @publicDocs
 */
export interface CashDrawerApi {
    /**
     * The `CashDrawerApi` object provides methods for controlling cash drawer hardware. Access these methods through `shopify.cashDrawer` to trigger cash drawer operations.
     */
    cashDrawer: CashDrawerApiContent;
}
//# sourceMappingURL=cash-drawer-api.d.ts.map