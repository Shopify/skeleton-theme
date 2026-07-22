/**
 * Specifies configuration options for displaying toast notifications. Controls the duration and display behavior of temporary notification messages.
 */
export interface ShowToastOptions {
    /**
     * The duration in milliseconds that the toast message should remain visible before automatically dismissing. If not specified, the toast will use the default system duration. Use shorter durations for simple confirmations and longer durations for important messages that users need time to read.
     */
    duration?: number;
}
export interface ToastApiContent {
    /**
     * Displays a toast notification with the specified text content. The message appears as a temporary overlay that automatically dismisses after the specified duration. Use for providing immediate user feedback, confirming actions, or communicating status updates without interrupting the user's workflow.
     *
     * @param content The text content to display.
     * @param options An object containing ShowToastOptions.
     */
    show: (content: string, options?: ShowToastOptions) => void;
}
/**
 * The `ToastApi` object provides methods for displaying temporary notification messages. Access these methods through `shopify.toast` to show user feedback and status updates.
 */
export interface ToastApi {
    toast: ToastApiContent;
}
//# sourceMappingURL=toast-api.d.ts.map