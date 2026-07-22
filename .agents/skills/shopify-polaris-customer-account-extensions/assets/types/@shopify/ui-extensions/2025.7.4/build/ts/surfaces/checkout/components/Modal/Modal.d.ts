import type { RemoteFragment } from '@remote-ui/core';
export interface ModalProps {
    /**
     * A unique identifier for the Modal. When no `id` is set,
     * a globally unique value will be used instead.
     */
    id?: string;
    /**
     * Callback when the modal is closed. That is when either the close button, the backdrop,
     * or the `escape` key are pressed.
     */
    onClose?: () => void;
    /**
     * Callback when the modal is opened. This is called at the beginning of the transition
     * that opens the modal.
     */
    onOpen?: () => void;
    /**
     * A title rendered at the top of the modal.
     */
    title?: string;
    /**
     * A label to describe the purpose of the modal that is announced by screen readers.
     * If not set, it will use the value of `title`.
     */
    accessibilityLabel?: string;
    /**
     * Adds a default spacing around both header (which holds the `title`) and content of the modal.
     */
    padding?: boolean;
    /**
     * Adjust the size of the Modal.
     *
     * `max`: expands the Modal to its maximum size, on both the horizontal and vertical axes.
     *
     * @default 'auto'
     */
    size?: 'small' | 'auto' | 'large' | 'max';
    /**
     * The primary action to perform, provided as a `Button` component.
     * The property allows only one button to be rendered.
     */
    primaryAction?: RemoteFragment;
    /**
     * The secondary action to perform, provided as a `Button` component.
     * The property allows only one button to be rendered.
     */
    secondaryActions?: RemoteFragment;
}
/**
 * Modals are a special type of overlay that shift focus towards a specific action/set of information
 * before the main flow can proceed.
 * They must be specified inside the `overlay` prop of an activator component (`Button`, `Link` or `Pressable`).
 *
 * The library automatically applies the [WAI-ARIA Dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) to both the activator and the modal content.
 */
export declare const Modal: "Modal" & {
    readonly type?: "Modal" | undefined;
    readonly props?: ModalProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Modal.d.ts.map