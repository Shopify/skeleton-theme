export type ButtonType = 'primary' | 'basic' | 'destructive'
/** @deprecated No longer supported as of POS 10.0.0. */
 | 'plain';
export interface ButtonProps {
    /**
     * The text set on the button. When using a button for action (menu item) targets, the title will be ignored. The text on the menu item will be the extension's description.
     */
    title?: string;
    /**
     * The type of button to render. Determines the appearance of the button.
     * - `'primary'` - Creates a prominent call-to-action button with high visual emphasis for the most important action on a screen
     * - `'basic'` - Provides a standard button appearance for secondary actions and general interactions
     * - `'destructive'` - Displays a warning-styled button for actions that delete, remove, or cause irreversible changes
     * - `'plain'` - Deprecated as of POS 10.0.0. Using this option will automatically default to `'basic`'
     */
    type?: ButtonType;
    /**
     * The callback that's executed when the user taps the button.
     */
    onPress?: () => void;
    /**
     * Whether the button can be tapped.
     */
    isDisabled?: boolean;
    /**
     * Whether the button is displaying an animated loading state.
     */
    isLoading?: boolean;
}
export declare const Button: "Button" & {
    readonly type?: "Button" | undefined;
    readonly props?: ButtonProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Button.d.ts.map