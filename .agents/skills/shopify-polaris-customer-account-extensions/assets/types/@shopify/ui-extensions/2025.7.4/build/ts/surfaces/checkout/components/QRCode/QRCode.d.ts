import type { IdProps, BorderStyle } from '../shared';
export interface QRCodeProps extends IdProps {
    /**
     * The content to be encoded in the QR code, which can be any string such as a URL, email address, plain text, etc.
     * Specific string formatting can trigger actions on the user’s device when scanned, like opening geolocation
     * coordinates on a map, opening a preferred app or app store entry, preparing an email, text message, and more.
     */
    content?: string;
    /**
     * URL of an image to be displayed in the center of the QR code.
     * This is useful for branding or to indicate to the user what scanning the QR code will do.
     * By default, no image is displayed.
     */
    logo?: string;
    /**
     * The displayed size of the QR code.
     *
     * `fill`: the QR code will takes up 100% of the available inline-size and maintain a 1:1 aspect ratio.
     *
     * `auto`: the QR code will be displayed at its default size.
     *
     * @default 'auto'
     */
    size?: 'auto' | 'fill';
    /**
     * Adjust the border style.
     *
     * @default 'base'
     */
    border?: Extract<BorderStyle, 'none' | 'base'>;
    /**
     * A label that describes the purpose or contents of the QR code. When set,
     * it will be announced to users using assistive technologies and will
     * provide more context about what the QR code may do when scanned.
     *
     * @default 'QR code' (translated to the user’s locale)
     */
    accessibilityLabel?: string;
    /**
     * Invoked when the conversion of `content` to a QR code fails.
     * If an error occurs, the QR code and its child elements will not be displayed.
     */
    onError?: () => void;
}
export declare const QRCode: "QRCode" & {
    readonly type?: "QRCode" | undefined;
    readonly props?: QRCodeProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=QRCode.d.ts.map