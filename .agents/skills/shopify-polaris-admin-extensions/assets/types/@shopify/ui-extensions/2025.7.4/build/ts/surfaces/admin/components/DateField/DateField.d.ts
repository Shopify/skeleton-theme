import type { DatePickerProps } from '../DatePicker/DatePicker';
import type { TextFieldProps } from '../TextField/TextField';
export interface DateFieldProps extends Pick<TextFieldProps, 'label' | 'name' | 'id' | 'readOnly' | 'onFocus' | 'onInput' | 'onBlur' | 'onChange' | 'error' | 'value'>, Pick<DatePickerProps<string>, 'yearMonth' | 'defaultYearMonth' | 'disabled' | 'onYearMonthChange'> {
}
export declare const DateField: "DateField" & {
    readonly type?: "DateField" | undefined;
    readonly props?: DateFieldProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=DateField.d.ts.map