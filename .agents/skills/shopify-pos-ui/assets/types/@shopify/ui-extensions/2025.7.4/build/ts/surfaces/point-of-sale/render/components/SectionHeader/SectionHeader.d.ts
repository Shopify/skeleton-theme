export interface SectionHeaderProps {
    /**
     * The title text displayed in the section header. Provide clear, descriptive text that accurately represents the content section below.
     */
    title: string;
    /**
     * An optional action button configuration to be displayed alongside the title. The `SectionHeader` must have a title for the action to work properly.
     */
    action?: {
        /**
         * The label text displayed on the action button. Use clear, descriptive labels like "Edit Settings" or "Add Item."
         */
        label: string;
        /**
         * A callback function executed when the action button is pressed. Use this to handle user interactions such as navigation or triggering specific actions.
         */
        onPress: () => void;
        /**
         * Controls whether the action button can be pressed. When `true`, the button is disabled and users can't interact with it.
         */
        disabled?: boolean;
    };
    /**
     * A boolean that controls whether the divider line under the `SectionHeader` should be hidden.
     */
    hideDivider?: boolean;
}
export declare const SectionHeader: "SectionHeader" & {
    readonly type?: "SectionHeader" | undefined;
    readonly props?: SectionHeaderProps | undefined;
    readonly children?: true | undefined; /**
     * An optional action button configuration to be displayed alongside the title. The `SectionHeader` must have a title for the action to work properly.
     */
};
//# sourceMappingURL=SectionHeader.d.ts.map