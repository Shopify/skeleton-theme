export interface SectionProps {
    /**
     * A label used to describe the section that will be announced by assistive technologies.
     *
     * When no `heading` property is provided or included as a children of the Section, you **must** provide an
     * `accessibilityLabel` to describe the Section. This is important as it allows assistive technologies to provide
     * the right context to users.
     */
    accessibilityLabel?: string;
    /**
     * A title that describes the content of the section.
     */
    heading?: string;
    /**
     * Adjust the padding of all edges.
     *
     * `base`: applies padding that is appropriate for the element. Note that it may result in no padding if Shopify
     * believes this is the right design decision in a particular context.
     *
     * `none`: removes all padding from the element. This can be useful when elements inside the Section need to span
     * to the edge of the Section. For example, a full-width image. In this case, rely on `Box` or any other layout
     * element to bring back the desired padding for the rest of the content.
     *
     * @default "base"
     */
    padding?: 'base' | 'none';
}
export declare const Section: "Section" & {
    readonly type?: "Section" | undefined;
    readonly props?: SectionProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Section.d.ts.map