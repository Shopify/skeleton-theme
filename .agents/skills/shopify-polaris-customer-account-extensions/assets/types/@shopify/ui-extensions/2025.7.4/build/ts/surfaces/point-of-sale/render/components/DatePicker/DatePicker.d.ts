export interface DatePickerProps {
    /**
     * The currently selected date value. Defaults to the current date when not specified.
     *
     * @defaultValue The current time
     */
    selected?: string;
    /**
     * A callback function executed when the user selects a date, receiving the selected date string as a parameter.
     */
    onChange?(selected: string): void;
    /**
     * A tuple that controls the visible state of the picker and provides a callback to set visibility to false when the dialog closes. The first element is the current visibility state, and the second is a setter function.
     */
    visibleState: [boolean, (visible: boolean) => void];
    /**
     * The display mode for the date picker.
     * - `inline`: A calendar-style interface that displays a full month view where users can tap specific dates. Provides visual context about weekdays, month structure, and date relationships.
     * - `spinner`: A spinner-style selector with scrollable columns for month, day, and year. Offers a more compact interface suitable for constrained spaces or when calendar context isn't necessary.
     *
     * @defaultValue 'inline'
     */
    inputMode?: 'inline' | 'spinner';
}
export declare const DatePicker: "DatePicker" & {
    readonly type?: "DatePicker" | undefined;
    readonly props?: DatePickerProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=DatePicker.d.ts.map