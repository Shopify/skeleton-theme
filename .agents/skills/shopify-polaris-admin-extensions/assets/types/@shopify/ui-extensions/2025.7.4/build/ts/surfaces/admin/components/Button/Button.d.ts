import type { AccessibilityRole, AnchorProps } from '../shared';
export type ButtonProps = ButtonBaseProps | ButtonAnchorProps;
interface CommonProps {
    /**
     * A label that describes the purpose or contents of the Button. It will be read to users using assistive technologies such as screen readers.
     *
     * Use this when using only an icon or the button text is not enough context
     * for users using assistive technologies.
     */
    accessibilityLabel?: string;
    /**
     * A unique identifier for the button.
     */
    id?: string;
    /**
     * Disables the button, disallowing any interaction.
     */
    disabled?: boolean;
    /**
     * Changes the visual appearance of the Button.
     */
    variant?: 'primary' | 'secondary' | 'tertiary';
    /**
     * Sets the color treatment of the Button.
     */
    tone?: 'default' | 'critical';
    /**
     * Indicate the text language. Useful when the text is in a different language than the rest of the page.
     * It will allow assistive technologies such as screen readers to invoke the correct pronunciation.
     * [Reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) ("subtag" label)
     */
    language?: string;
    /**
     * Alias for `language`
     */
    lang?: string;
    /**
     * Callback when a link is pressed. If `href` is set,
     * it will execute the callback and then navigate to the location specified by `href`.
     */
    onClick?(): void;
    /**
     * Alias for `onClick`
     * Callback when a button is pressed. If `href` is set,
     * it will execute the callback and then navigate to the location specified by `href`.
     */
    onPress?(): void;
    /**
     * Callback when focus is removed.
     */
    onBlur?(): void;
    /**
     * Callback when input is focused.
     */
    onFocus?(): void;
}
interface ButtonBaseProps extends CommonProps {
    /**
     * Sets the semantic meaning of the component’s content. When set,
     * the role will be used by assistive technologies to help users
     * navigate the page.
     */
    accessibilityRole?: Extract<AccessibilityRole, 'submit' | 'button' | 'reset'>;
}
interface ButtonAnchorProps extends CommonProps {
    /**
     * The URL to link to.
     * If set, it will navigate to the location specified by `href` after executing the `onClick` callback.
     */
    href: AnchorProps['href'];
    /**
     * Alias for `href`
     * If set, it will navigate to the location specified by `to` after executing the `onClick` callback.
     */
    to?: AnchorProps['href'];
    /**
     * Tells browsers to download the linked resource instead of navigating to it.
     * Optionally accepts filename value to rename file.
     */
    download?: boolean | string;
    /**
     * Specifies where to display the linked URL
     * @default '_self'
     */
    target?: '_blank' | '_self';
    /**
     * Callback when a link is pressed. If `href` is set,
     * it will execute the callback and then navigate to the location specified by `href`.
     */
    onClick?: AnchorProps['onClick'];
    /**
     * Alias for `onClick`
     * Callback when a link is pressed. If `href` is set,
     * it will execute the callback and then navigate to the location specified by `href`.
     */
    onPress?: AnchorProps['onClick'];
}
export declare const Button: "Button" & {
    readonly type?: "Button" | undefined;
    readonly props?: ButtonProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=Button.d.ts.map