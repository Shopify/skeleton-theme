export interface RadioButtonListProps {
    /**
     * An array of string values representing the radio button options available for selection.
     */
    items: string[];
    /**
     * A callback function executed when a radio list item is selected, receiving the selected item string as a parameter. You must update the `initialSelectedItem` property in response to this callback to reflect the new selection.
     */
    onItemSelected: (item: string) => void;
    /**
     * The name of the currently selected item. You control the selection by setting this property and updating it when `onItemSelected` fires.
     */
    initialSelectedItem?: string;
    /**
     * A boolean that determines whether the initially selected item renders at the top of the list, automatically scrolling to show the selected option.
     */
    initialOffsetToShowSelectedItem?: boolean;
}
export declare const RadioButtonList: "RadioButtonList" & {
    readonly type?: "RadioButtonList" | undefined;
    readonly props?: RadioButtonListProps | undefined; /**
     * A callback function executed when a radio list item is selected, receiving the selected item string as a parameter. You must update the `initialSelectedItem` property in response to this callback to reflect the new selection.
     */
    readonly children?: true | undefined;
};
//# sourceMappingURL=RadioButtonList.d.ts.map