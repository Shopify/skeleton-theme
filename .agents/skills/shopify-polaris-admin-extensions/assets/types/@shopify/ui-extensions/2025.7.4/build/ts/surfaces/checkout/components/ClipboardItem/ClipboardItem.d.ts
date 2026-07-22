import type { IdProps } from '../shared';
export interface ClipboardItemProps extends IdProps {
    /**
     * Plain text to be written to the clipboard.
     *
     * @default ''
     */
    text?: string;
    /**
     * Callback run when the copy to clipboard succeeds.
     */
    onCopy?: () => void;
    /**
     * Callback run when the copy to clipboard fails.
     */
    onCopyError?: () => void;
}
/**
 * Enables clipboard functionality when its `id` is referenced by the `activateTarget` property of a `Button`, `Pressable`, or `Link` component.
 *
 * When activated, it copies the text to the clipboard and displays a `Tooltip` confirmation.
 *
 * ClipboardItem` is a non-rendering component.
 */
export declare const ClipboardItem: "ClipboardItem" & {
    readonly type?: "ClipboardItem" | undefined;
    readonly props?: ClipboardItemProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=ClipboardItem.d.ts.map