type Level = 1 | 2 | 3 | 4 | 5 | 6;
export interface HeadingProps {
    /** A unique identifier for the field. */
    id?: string;
    /**
     * The visual size of the heading.
     *
     * There are no guarantee that the level set will render the same level in the HTML `<h*>` element.
     * The heading level that gets rendered is determined by the parent `HeadingGroup` or `Section` component.
     */
    size?: Level;
}
export declare const Heading: "Heading" & {
    readonly type?: "Heading" | undefined;
    readonly props?: HeadingProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=Heading.d.ts.map