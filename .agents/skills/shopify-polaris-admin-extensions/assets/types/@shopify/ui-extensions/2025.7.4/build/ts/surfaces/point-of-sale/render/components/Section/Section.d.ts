/**
 * Defines the configuration object for the action button displayed within the section header.
 */
export interface SectionHeaderAction {
    /**
     * The title text describing the action that will be displayed on the button.
     */
    title: string;
    /**
     * A callback function that is executed when the action button is pressed by the user.
     */
    onPress: () => void;
}
export interface SectionProps {
    /**
     * The title text displayed at the top of the section to describe its content.
     */
    title?: string;
    /**
     * An optional action configuration displayed in the top right of the section that can be triggered by user interaction.
     */
    action?: SectionHeaderAction;
}
export declare const Section: "Section" & {
    readonly type?: "Section" | undefined;
    readonly props?: SectionProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Section.d.ts.map