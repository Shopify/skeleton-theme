export interface DateRange {
    /** First day (inclusive) of the selected range */
    start?: DateString;
    /** Last day (inclusive) of the selected range */
    end?: DateString;
}
export declare enum Day {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
export type DayString = keyof typeof Day;
export type DateString = string;
/** A year/month string using the simplified ISO 8601 format (`YYYY-MM`) */
type YearMonthString = string;
export type YearMonth = {
    year: number;
    month: number;
} | YearMonthString;
export type SelectedDate = DateString | DateString[] | DateRange;
export type DisabledDate = DateString | DateRange | DayString;
export interface DatePickerProps<T extends SelectedDate> {
    /**
     * [Controlled](https://reactjs.org/docs/forms.html#controlled-components) year and month to display.
     * Use in combination with `onYearMonthChange`.
     * Makes year/month navigation controlled.
     */
    yearMonth?: YearMonth;
    /**
     * Default [uncontrolled](https://reactjs.org/docs/forms.html#controlled-components) year and month to display.
     * Ignored when year/month navigation is controlled.
     */
    defaultYearMonth?: YearMonth;
    /**
     * Disabled dates, days, and/or ranges, or the date picker.
     * Unbound range disables all dates either from `start` date or to `end` date.
     * `true` disables the date picker.
     */
    disabled?: DisabledDate[] | boolean;
    /**
     * Whether the date picker is read-only.
     */
    readOnly?: boolean;
    /**
     * A date, an array of dates, or a range object with `start` and/or `end` keys indicating the selected dates.
     * When a range is set, dates between the boundaries will be selected.
     */
    selected: T;
    /**
     * A callback that is run whenever a date is selected or unselected. This callback
     * is called with a string, an array of strings or a range object representing the selected dates.
     * This component is [controlled](https://reactjs.org/docs/forms.html#controlled-components),
     * so you must store these values in state and reflect it back in the
     * `selected` props.
     */
    onChange?(selected: T): void;
    /**
     * A callback that is run whenever the month is changed. This callback
     * is called with an object indicating the year/month the UI should change to.
     * When year/month navigation is controlled you must store these values in state and
     * reflect it back in the `yearMonth` prop.
     */
    onYearMonthChange?(yearMonth: {
        year: number;
        month: number;
    }): void;
}
/**
 * The DatePicker component is a calendar picker UI that allows users to select a single date or a date range.
 */
export declare const DatePicker: "DatePicker" & {
    readonly type?: "DatePicker" | undefined;
    readonly props?: DatePickerProps<SelectedDate> | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=DatePicker.d.ts.map