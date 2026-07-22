export interface TimePickerProps {
    /**
     * The currently selected time value. Defaults to the current time when not specified.
     *
     * @defaultValue The current time.
     */
    selected?: string;
    /**
     * A callback for changes.
     */
    onChange?(selected: string): void;
    /**
     * A tuple that controls the visible state of the picker and provides a callback to set visibility to false when the dialog closes. The first element is the current visibility state, and the second is a setter function.
     */
    visibleState: [boolean, (visible: boolean) => void];
    /**
     * Whether the clock displays in 24-hour format instead of 12-hour format. This property only affects Android devices.
     *
     * @defaultValue false
     */
    is24Hour?: boolean;
    /**
     * The display mode for the time picker.
     * - `inline`: A clock-style interface that displays an analog or digital clock where users can tap to select specific times. Provides visual context about time relationships. Only available on Android devices—iOS always uses spinner mode.
     * - `spinner`: A spinner-style selector with scrollable columns for hours, minutes, and optionally seconds. Offers a more compact interface suitable for all devices and is the only mode supported on iOS.
     *
     * @defaultValue 'inline'
     */
    inputMode?: 'inline' | 'spinner';
}
export declare const TimePicker: "TimePicker" & {
    readonly type?: "TimePicker" | undefined;
    readonly props?: TimePickerProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=TimePicker.d.ts.map