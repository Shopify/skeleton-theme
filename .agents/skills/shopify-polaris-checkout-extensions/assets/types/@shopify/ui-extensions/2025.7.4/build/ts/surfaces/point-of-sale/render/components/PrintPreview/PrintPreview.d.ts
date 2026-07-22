export interface PrintPreviewProps {
    /**
     * The source URL of the content to preview for printing. Must be either a relative path appended to your app's [`application_url`](/docs/apps/build/cli-for-apps/app-configuration) or a full URL to your app's backend that returns the document.
     */
    src: string;
}
export declare const PrintPreview: "PrintPreview" & {
    readonly type?: "PrintPreview" | undefined;
    readonly props?: PrintPreviewProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=PrintPreview.d.ts.map