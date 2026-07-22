/**
 * The `ToastApi` object provides properties for displaying temporary notification messages. Access these properties through `shopify.toast` to show user feedback and status updates.
 *
 * @publicDocs
 */
export interface ToastApiContent {
    /**
     * Displays a toast notification with the specified text content. The message appears as a temporary overlay that automatically dismisses after the specified duration. Use for providing immediate user feedback, confirming actions, or communicating status updates without interrupting the user's workflow.
     *
     * @param content The text content to display.
     */
    show: (content: string) => void;
}
/** @publicDocs */
export interface ToastApi {
    toast: ToastApiContent;
}
//# sourceMappingURL=toast-api.d.ts.map