import type { DatePickerProps, SelectedDate } from '../DatePicker/DatePicker';
import type { TextFieldProps } from '../TextField/TextField';
export interface DateFieldProps extends Pick<TextFieldProps<string>, 'label' | 'error' | 'name' | 'id' | 'readonly' | 'onFocus' | 'onInput' | 'onBlur' | 'onChange' | 'value'>, Pick<DatePickerProps<SelectedDate>, 'yearMonth' | 'defaultYearMonth' | 'disabled' | 'onYearMonthChange'> {
    /**
     * Callback when the field has an invalid date.
     * This callback will be called, if the date typed is invalid or disabled.
     *
     * Dates that don’t exist or have formatting errors are considered invalid. Some examples of invalid dates are:
     * - 2021-02-31: February doesn’t have 31 days
     * - 2021-02-00: The day can’t be 00
     *
     * Dates and ranges specified in the `disabled` property are considered disabled dates.
     * If the `disabled` property is `2021-06-14`, and the user types `2021-06-14`,
     * this callback will be called as this date is disabled.
     *
     * Note that this will be called only when the user **finishes editing** the date,
     * after the `onChange` callback.
     * The field is **not** validated on every change to the input. Once the buyer has signalled that
     * they have finished editing the field (typically, by blurring the field), the field gets validated and the callback is run if the value is invalid.
     */
    onInvalid?(): void;
}
/**
 * The DateField component is used to collect date information from buyers.
 * It also provides the ability to display a DatePicker UI, which allows users to select dates with ease.
 */
export declare const DateField: "DateField" & {
    readonly type?: "DateField" | undefined;
    readonly props?: DateFieldProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=DateField.d.ts.map