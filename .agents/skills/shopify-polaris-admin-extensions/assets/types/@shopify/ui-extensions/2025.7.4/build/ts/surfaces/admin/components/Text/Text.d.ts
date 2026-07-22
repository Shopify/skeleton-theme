import type { FontWeight, TextOverflow, FontVariantOptions, FontStyle, TextAccessibilityRole } from '../shared';
export interface TextProps {
    /** A unique identifier for the field. */
    id?: string;
    /**
     * Sets the weight (or boldness) of the font.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
     * */
    fontWeight?: FontWeight;
    /**
     * Set how hidden overflow content is signaled to users.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
     * */
    textOverflow?: TextOverflow;
    /**
     * Set all the variants for a font with a shorthand property.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant
     */
    fontVariant?: FontVariantOptions | FontVariantOptions[];
    /**
     *  Use to emphasize a word or a group of words.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-style
     */
    fontStyle?: FontStyle;
    /**
     * Provide semantic meaning to content and improve support for assistive technologies.
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
     */
    accessibilityRole?: TextAccessibilityRole;
}
export declare const Text: "Text" & {
    readonly type?: "Text" | undefined;
    readonly props?: TextProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Text.d.ts.map