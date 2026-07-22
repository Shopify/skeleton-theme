/**
 * The `PrintApi` object provides properties for triggering document printing. Access these properties through `shopify.print` to initiate print operations with various document types.
 *
 * @publicDocs
 */
export interface PrintApiContent {
    /**
     * Triggers a print dialog for the specified document source. The `print()` method accepts either:
     *
     * • A relative path that will be appended to your app's [`application_url`](/docs/apps/build/cli-for-apps/app-configuration)
     *
     * • A full URL to your app's backend that will be used to return the document to print
     *
     * Returns a promise that resolves when content is ready and the native print dialog appears. Use for printing custom documents, receipts, labels, or reports.
     *
     * @param src the source URL of the content to print.
     * @returns Promise<void> that resolves when content is ready and native print dialog appears.
     */
    print(src: string): Promise<void>;
}
/** @publicDocs */
export interface PrintApi {
    print: PrintApiContent;
}
//# sourceMappingURL=print-api.d.ts.map