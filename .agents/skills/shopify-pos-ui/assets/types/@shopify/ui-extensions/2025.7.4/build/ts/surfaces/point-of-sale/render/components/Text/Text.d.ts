/**
 * Defines the typography hierarchy options for text elements. Each variant provides specific sizing, weight, and styling appropriate for different content types.
 *
 * Available variants:
 * - `sectionHeader`: A section header variant for titles that organize and introduce content sections.
 * - `captionRegular`: A regular caption variant for supplementary text, labels, or secondary information.
 * - `captionRegularTall`: A taller caption variant with increased line height for improved readability in dense layouts.
 * - `captionMedium`: A medium-weight caption variant for slightly emphasized secondary text or important labels.
 * - `body`: The standard body text variant for primary content, descriptions, and general text.
 * - `headingSmall`: A small heading variant for subsection titles and secondary headings.
 * - `headingLarge`: A large heading variant for main section titles and primary headings.
 * - `display`: The largest display variant for prominent titles, hero text, or major interface elements.
 */
export type TextVariant = 'sectionHeader' | 'captionRegular' | 'captionRegularTall' | 'captionMedium' | 'body' | 'headingSmall' | 'headingLarge' | 'display';
/**
 * Defines the semantic color options for text elements. Each color conveys specific meaning and intent through visual styling.
 *
 * Available colors:
 * - `TextNeutral`: A neutral text color for general content that doesn't convey specific semantic meaning.
 * - `TextSubdued`: A subdued text color for secondary information, captions, or content that should be less prominent.
 * - `TextDisabled`: A disabled text color for inactive or unavailable content that users can't interact with.
 * - `TextWarning`: A warning text color for cautionary messages or content that requires user attention.
 * - `TextCritical`: A critical text color for errors, failures, or destructive actions that require immediate attention.
 * - `TextSuccess`: A success text color for positive outcomes, confirmations, or completed actions.
 * - `TextInteractive`: An interactive text color for clickable elements, links, or content that users can interact with.
 * - `TextHighlight`: A highlight text color for emphasized content that needs to stand out or draw special attention.
 */
export type ColorType = 'TextNeutral' | 'TextSubdued' | 'TextDisabled' | 'TextWarning' | 'TextCritical' | 'TextSuccess' | 'TextInteractive' | 'TextHighlight';
export interface TextProps {
    /**
     * The typography variant that determines the size, weight, and styling of the text within the design system hierarchy.
     */
    variant?: TextVariant;
    /**
     * The semantic color of the text that conveys meaning and intent through visual styling.
     */
    color?: ColorType;
}
export declare const Text: "Text" & {
    readonly type?: "Text" | undefined;
    readonly props?: TextProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Text.d.ts.map