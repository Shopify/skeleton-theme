export interface ToggleButtonProps {
    /**
     * A unique identifier for the toggle button.
     */
    id: string;
    /**
     * A label used for buyers using assistive technologies. When set, any
     * `children` supplied to this component will not be announced to screen reader users.
     */
    accessibilityLabel?: string;
    /**
     * Disables the button, disallowing any interaction.
     */
    disabled?: boolean;
    /**
     * Callback when button is pressed.
     */
    onPress?(): void;
}
/**
 * Options inside a `ToggleButtonGroup`.
 */
export declare const ToggleButton: "ToggleButton" & {
    readonly type?: "ToggleButton" | undefined;
    readonly props?: ToggleButtonProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=ToggleButton.d.ts.map