export interface DatePickerProps<T extends Selected> {
    /**
     * [Controlled](https://reactjs.org/docs/forms.html#controlled-components) year and month to display.
     * Use in combination with `onYearMonthChange`.
     * Makes year/month navigation [controlled](https://reactjs.org/docs/forms.html#controlled-components).
     */
    yearMonth?: {
        year: Year;
        month: Month;
    } | YearMonthString;
    /**
     * Default [uncontrolled](https://reactjs.org/docs/forms.html#controlled-components) year and month to display.
     * Ignored when year/month navigation is [controlled](https://reactjs.org/docs/forms.html#controlled-components).
     */
    defaultYearMonth?: {
        year: Year;
        month: Month;
    } | YearMonthString;
    /**
     * Disabled dates, days, and/or ranges, or the date picker.
     * Unbound range disables all dates either from `start` date or to `end` date.
     * `true` disables the date picker.
     */
    disabled?: Disabled | Disabled[] | boolean;
    /**
     * Whether the date picker is read-only.
     */
    readOnly?: boolean;
    /**
     * A date, an array of dates, or a range object with `start` and/or `end` keys indicating the selected dates.
     * When a range is set, dates between the boundaries will be selected.
     * Passed `undefined` or `string` allows user to select a single date,
     * an empty array or an array of dates allows selecting multiple dates,
     * an empty object or a Range object allows selecting a range of dates.
     */
    selected?: T;
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
        year: Year;
        month: Month;
    }): void;
}
/**
 * A date string using the simplified ISO 8601 format (`YYYY-MM-DD`)
 */
export type DateString = string;
/**
 * A year/month string using the simplified ISO 8601 format (`YYYY-MM`)
 */
export type YearMonthString = string;
/**
 * Month in 1-12 range
 */
export type Month = number;
export type Year = number;
export type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
export type Selected = DateString | DateString[] | Range;
export type Disabled = DateString | Range | Day;
export interface Range {
    /**
     * First day (inclusive) of the selected range
     */
    start?: DateString;
    /**
     * Last day (inclusive) of the selected range
     */
    end?: DateString;
}
export declare const DatePicker: "DatePicker" & {
    readonly type?: "DatePicker" | undefined;
    readonly props?: DatePickerProps<Selected> | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=DatePicker.d.ts.map