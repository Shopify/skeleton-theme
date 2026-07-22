export interface AdminPrintActionProps {
    /**
     * Sets the src URL of the preview and the document to print.
     * If not provided, the preview will show an empty state and the print button will be disabled.
     * HTML, PDFs and images are supported.
     */
    src?: string;
}
/**
 * AdminPrintAction is a component used by Admin Print Action extensions to configure a src document to preview and print.
 */
export declare const AdminPrintAction: "AdminPrintAction" & {
    readonly type?: "AdminPrintAction" | undefined;
    readonly props?: AdminPrintActionProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=AdminPrintAction.d.ts.map