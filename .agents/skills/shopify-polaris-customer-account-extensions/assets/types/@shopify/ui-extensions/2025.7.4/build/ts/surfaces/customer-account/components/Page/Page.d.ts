import type { RemoteFragment } from '@remote-ui/core';
export interface PageProps {
    /**
     * The text to be used as title.
     */
    title: string;
    /**
     * The text to be used as subtitle.
     */
    subtitle?: string;
    /**
     * The action grouping, provided as button(s), that is placed in the primary position of the page.
     */
    primaryAction?: RemoteFragment;
    /**
     * Label for the primary action grouping. If a label is not provided, default text is used.
     *
     * @defaultValue "More actions"
     */
    primaryActionLabel?: string;
    /**
     * Accessibility label for the primary action grouping. If an accessibility label is not provided,
     * default text is used.
     *
     * @defaultValue "More actions"
     */
    primaryActionAccessibilityLabel?: string;
    /**
     * The action grouping, provided as button(s), that is placed in the secondary position of the page.
     */
    secondaryAction?: RemoteFragment;
    /**
     * Indicates that the page is in a loading state.
     *
     * When `true`, the page shows loading indicators for the UI elements that it is owns.
     * The page is not responsible for the loading indicators of any content that is passed as `children`.
     *
     * @defaultValue false
     */
    loading?: boolean;
}
export declare const Page: "Page" & {
    readonly type?: "Page" | undefined;
    readonly props?: PageProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Page.d.ts.map