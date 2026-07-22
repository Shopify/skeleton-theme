import type { Appearance, OverlayActivatorProps, DisclosureActivatorProps, InteractionProps } from '../shared';
export interface LinkProps extends OverlayActivatorProps, DisclosureActivatorProps, InteractionProps {
    /**
     * Destination to navigate to. You must provide either this property, `onPress`,
     * or both.
     */
    to?: string;
    /**
     * Open the link in a new window or tab. If the link points to a domain other than your Storefront, it will always open in a new tab.
     */
    external?: boolean;
    /**
     * Unique identifier.
     *
     * Typically used as a target for another component’s controls
     * to associate an accessible label with an action.
     */
    id?: string;
    /**
     * Indicate the text language. Useful when the text is in a different language than the rest of the page.
     * It will allow assistive technologies such as screen readers to invoke the correct pronunciation.
     * [Reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) ("subtag" label)
     */
    language?: string;
    /**
     * A label used for buyers using assistive technologies. When set, any
     * `children` supplied to this component will not be announced to screen reader users.
     */
    accessibilityLabel?: string;
    /**
     * Specify the color of the link.
     * `monochrome` will take the color of its parent.
     */
    appearance?: Extract<Appearance, 'monochrome'>;
    /**
     * Callback when pressed. If `to` is set, it will execute the callback and
     * then navigate to the location specified by `to`.
     */
    onPress?(): void;
}
/**
 * Link makes text interactive so customers can perform an action, such as navigating to another location.
 */
export declare const Link: "Link" & {
    readonly type?: "Link" | undefined;
    readonly props?: LinkProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Link.d.ts.map