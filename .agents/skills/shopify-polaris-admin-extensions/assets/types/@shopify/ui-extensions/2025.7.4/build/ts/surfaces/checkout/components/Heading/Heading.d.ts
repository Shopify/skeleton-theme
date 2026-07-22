import type { InlineAlignment, AccessibilityRole } from '../shared';
type Level = 1 | 2 | 3 | 4;
export interface HeadingProps {
    /**
     * Unique identifier.
     * Typically used to make the heading a target that another component
     * can refer to in order to provide an alternative accessibility label.
     */
    id?: string;
    /**
     * The visual level of the heading. When not set, the heading will use
     * its “automatic” heading level, which is determined by the level of nesting
     * within ancestor `HeadingGroup`s. No matter what value you provide here,
     * the semantic level (e.g., how the heading contributes to the document outline)
     * is determined exclusively by the “automatic” heading level.
     */
    level?: Level;
    /**
     * Sets the semantic meaning of the component’s content. When set,
     * the role will be used by assistive technologies to help buyers
     * navigate the page.
     */
    accessibilityRole?: Extract<AccessibilityRole, 'presentation'>;
    /**
     * Align text along the main axis.
     */
    inlineAlignment?: InlineAlignment;
}
/**
 * Headings control the visual style of headings. Use headings to introduce major
 * sections, like Contact information, Shipping address, or Shipping method.
 *
 * Unlike HTML headings, you don’t explicitly specify the position of the heading in the
 * document outline. Nest headings within the heading group component to control
 * the document outline structure used by assistive technologies.
 */
export declare const Heading: "Heading" & {
    readonly type?: "Heading" | undefined;
    readonly props?: HeadingProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=Heading.d.ts.map