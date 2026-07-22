export interface QRCodeProps {
    /**
     * The content to be encoded in the QR code. Can be any string such as a URL, email address, plain text, phone number, or formatted data. Specific string formatting can trigger actions on the user's device when scanned, like opening apps, preparing messages, or navigating to locations.
     */
    value: string;
}
export declare const QRCode: "QRCode" & {
    readonly type?: "QRCode" | undefined;
    readonly props?: QRCodeProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=QRCode.d.ts.map