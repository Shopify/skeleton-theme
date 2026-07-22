/**
 * Defines the structure and configuration options for individual segments within the `SegmentedControl` component.
 */
export interface Segment {
    /**
     * The unique identifier for the segment used for selection tracking and callback identification.
     */
    id: string;
    /**
     * The text label displayed on the segment that users see and interact with.
     */
    label: string;
    /**
     * Whether the segment is disabled and non-interactive.
     */
    disabled: boolean;
}
export interface SegmentedControlProps {
    /**
     * An array of segment objects that define the available options in the segmented control.
     */
    segments: Segment[];
    /**
     * The id of the currently selected segment that determines which option is visually highlighted.
     */
    selected: string;
    /**
     * A callback function executed when a segment is selected, receiving the selected segment's id as a parameter.
     */
    onSelect: (id: string) => void;
}
export declare const SegmentedControl: "SegmentedControl" & {
    readonly type?: "SegmentedControl" | undefined;
    readonly props?: SegmentedControlProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=SegmentedControl.d.ts.map