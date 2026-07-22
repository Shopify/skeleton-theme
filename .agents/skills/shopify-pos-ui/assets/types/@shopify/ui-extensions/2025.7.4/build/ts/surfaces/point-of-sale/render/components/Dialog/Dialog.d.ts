export type DialogType = 'default' | 'alert' | 'error' | 'destructive';
export interface DialogProps {
    /**
     * The text displayed in the title of the dialog. This should be concise and clearly communicate the purpose or action being confirmed.
     */
    title: string;
    /**
     * The text displayed in the body of the dialog. Use this to provide additional context, instructions, or details about the action being confirmed.
     */
    content?: string;
    /**
     * The text displayed on the primary action button of the dialog. Use clear, action-oriented language like "Delete," "Confirm," "Save," or "Continue."
     */
    actionText: string;
    /**
     * The text displayed on the secondary action button, typically used for "Cancel," "Go Back," or alternative actions. Only displayed when `showSecondaryAction` is `true`.
     */
    secondaryActionText?: string;
    /**
     * Controls whether a secondary action button is displayed alongside the primary action. Set to `true` to show both buttons, `false` to show only the primary action.
     */
    showSecondaryAction?: boolean;
    /**
     * Determines the dialog's visual appearance and semantic meaning. Available options:
     * - `'default'` - Standard styling for general-purpose dialogs and confirmations
     * - `'alert'` - Warning styling for important notices that require attention
     * - `'error'` - Error styling for critical issues and failure notifications
     * - `'destructive'` - Destructive styling for actions that can't be undone, like deletions
     */
    type?: DialogType;
    /**
     * Callback function executed when the primary action button is pressed. This should handle the main action the dialog is confirming or requesting.
     */
    onAction: () => void;
    /**
     * The callback function executed when the secondary action button is pressed. Typically used to cancel the dialog or provide an alternative action path.
     */
    onSecondaryAction?: () => void;
    /**
     * Controls whether the dialog is displayed or hidden. Set to `true` to show the dialog, `false` to hide it. Use this to manage dialog visibility based on user interactions or application state.
     */
    isVisible: boolean;
}
export declare const Dialog: "Dialog" & {
    readonly type?: "Dialog" | undefined;
    readonly props?: DialogProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Dialog.d.ts.map