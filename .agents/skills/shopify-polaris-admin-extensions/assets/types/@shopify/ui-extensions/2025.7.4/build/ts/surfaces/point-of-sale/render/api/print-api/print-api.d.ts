/**
 * Access the print API for printing functionality
 */
export interface PrintApiContent {
    /**
     * Triggers a print dialog for the specified document source. The `print()` method accepts either:
     *
     * - A relative path that will be appended to your app's [application_url](/docs/apps/build/cli-for-apps/app-configuration)
     * - A full URL to your app's backend that will be used to return the document to print
     *
     * Returns a promise that resolves when content is ready and the native print dialog appears. Use for printing custom documents, receipts, labels, or reports.
     */
    print(src: string): Promise<void>;
}
/**
 * The `PrintApi` object provides methods for triggering document printing. Access these methods through `api.print` to initiate print operations with various document types.
 */
export interface PrintApi {
    /**
     * Provides access to print functionality for triggering the native print dialog with custom documents.
     */
    print: PrintApiContent;
}
//# sourceMappingURL=print-api.d.ts.map