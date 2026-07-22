/**
 * The `CashDrawerApi` object provides properties for controlling cash drawer hardware. Access these properties through `shopify.cashDrawer` to trigger cash drawer operations.
 *
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
/** @publicDocs */
export interface CashDrawerApi {
    cashDrawer: CashDrawerApiContent;
}
//# sourceMappingURL=cash-drawer-api.d.ts.map