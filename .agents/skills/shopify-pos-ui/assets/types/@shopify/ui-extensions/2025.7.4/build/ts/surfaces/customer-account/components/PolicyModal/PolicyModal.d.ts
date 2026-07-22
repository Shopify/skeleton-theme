type PolicyType = 'refund';
export interface PolicyModalProps {
    /**
     * Whether the modal should be rendered.
     * Modal is a controlled component, so you must keep the state of the `open` prop yourself.
     */
    open: boolean;
    /**
     * Callback when either the close button, the backdrop, or the `escape` key is pressed.
     * `onClose` is only called while the modal is open and attempts to be closed,
     * not when it exits the viewport.
     * You’ll usually want to use this callback to set the `open` prop to `false`.
     */
    onClose: () => void;
    /**
     * A title rendered as a `Heading` at the top of the modal.
     */
    title: string;
    /**
     * Type of policy to render.
     */
    type: PolicyType;
}
export declare const PolicyModal: "PolicyModal" & {
    readonly type?: "PolicyModal" | undefined;
    readonly props?: PolicyModalProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=PolicyModal.d.ts.map