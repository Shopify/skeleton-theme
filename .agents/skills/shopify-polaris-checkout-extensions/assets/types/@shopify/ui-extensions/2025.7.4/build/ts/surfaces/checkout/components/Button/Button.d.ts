import type { Appearance, ButtonAccessibilityRole, InlineAlignment, IdProps, OverlayActivatorProps, DisclosureActivatorProps, InteractionProps } from '../shared';
export interface ButtonProps extends OverlayActivatorProps, DisclosureActivatorProps, InteractionProps, IdProps {
    /**
     * The type of button that will be rendered. The visual presentation of the button type
     * is controlled by merchants through the Branding API.
     *
     *
     * `primary`: button used for main actions. For example: "Continue to next step".
     *
     * `secondary`: button used for secondary actions not blocking user progress. For example: "Download Shop app".
     *
     * `plain`: renders a button that visually looks like a link.
     *
     *
     * @defaultValue 'primary'
     */
    kind?: 'primary' | 'secondary' | 'plain';
    /**
     * Specify the color treatment of the Button.
     */
    appearance?: Extract<Appearance, 'monochrome' | 'critical'>;
    /**
     * Allows the button to submit a form.
     * @deprecated use `accessibilityRole="submit"` instead
     */
    submit?: boolean;
    /**
     * Destination URL to link to.
     */
    to?: string;
    /**
     * Specifies the inline alignment of the content.
     *
     * @defaultValue 'center'
     */
    inlineAlignment?: InlineAlignment;
    /**
     * Replaces content with a loading indicator.
     *
     * @defaultValue false
     */
    loading?: boolean;
    /**
     * Accessible label for the loading indicator when user prefers reduced motion. This value is
     * only used if `loading` is true.
     */
    loadingLabel?: string;
    /**
     * A label used for buyers using assistive technologies. When set, any
     * `children` supplied to this component will not be announced to screen reader users.
     */
    accessibilityLabel?: string;
    /**
     * The role of the button that will be rendered.
     *
     * `button`: renders a regular button.
     *
     * `submit`: renders a button that submits a form.
     *
     * @defaultValue 'button'
     */
    accessibilityRole?: ButtonAccessibilityRole;
    /**
     * Disables the button, disallowing any interaction.
     *
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * Callback that is run when the button is pressed.
     */
    onPress?(): void;
}
/**
 * Buttons are used for actions, such as “Add”, “Continue”, “Pay now”, or “Save”.
 */
export declare const Button: "Button" & {
    readonly type?: "Button" | undefined;
    readonly props?: ButtonProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Button.d.ts.map