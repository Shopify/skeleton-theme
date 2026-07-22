import type { Autocomplete } from '../shared';
export interface SelectOptionProps {
    /**
     * The value that will be passed to the select’s `onChange` callback
     * when this option is selected.
     */
    value: string;
    /**
     * The buyer-facing label for this option.
     */
    label: string;
    /**
     * Whether this option can be selected or not.
     */
    disabled?: boolean;
}
export interface SelectProps {
    /**
     * A unique identifier for the field. When no `id` is set,
     * a globally unique value will be used instead.
     */
    id?: string;
    /**
     * Content to use as the field label.
     */
    label: string;
    /**
     * An identifier for the field that is unique within the nearest
     * containing `Form` component.
     */
    name?: string;
    /**
     * The active option for the select. This should match to one of the
     * `value` properties in the `options` prop. When not set,
     * the value will default to an empty string, which will show the
     * `placeholder` text as the "selected value".
     */
    value?: string;
    /**
     * The options a buyer can select from.
     */
    options: SelectOptionProps[];
    /**
     * A short hint that describes the expected value of the field when no value is set.
     */
    placeholder?: string;
    /**
     * Whether the field needs a value. This requirement adds semantic value
     * to the field, but it will not cause an error to appear automatically.
     * If you want to present an error when this field is empty, you can do
     * so with the `error` prop.
     */
    required?: boolean;
    /**
     * Whether the select can be changed.
     */
    disabled?: boolean;
    /**
     * Whether the field is read only.
     */
    readonly?: boolean;
    /**
     * Indicate an error to the user. The field will be given a specific stylistic treatment
     * to communicate problems that have to be resolved immediately.
     */
    error?: string;
    /**
     * A hint as to the intended content of the field.
     *
     * When set to `true`, this property indicates that the field should support
     * autofill, but you do not have any more semantic information on the intended
     * contents.
     *
     * When set to `false`, you are indicating that this field contains sensitive
     * information, or contents that are never saved, like one-time codes. Note that
     * it is impossible to prevent autocomplete in some browsers, so do not depend on
     * its absence.
     *
     * Alternatively, you can provide an `Autocomplete` object, which describes the
     * specific data you would like to be entered into this field during autocomplete.
     */
    autocomplete?: Autocomplete | boolean;
    /**
     * Callback when focus is removed.
     */
    onBlur?(): void;
    /**
     * Callback when input is focused.
     */
    onFocus?(): void;
    /**
     * A callback that is run whenever the selected option changes. This callback
     * is called with the string `value` of the selected `option`. This component
     * is [controlled](https://reactjs.org/docs/forms.html#controlled-components),
     * so you must store this value in state and reflect it back in the `value`
     * prop of the select.
     */
    onChange?(value: string): void;
}
/**
 * Selects let buyers choose one option from an options menu. Consider select
 * when you have 4 or more options, to avoid cluttering the interface.
 */
export declare const Select: "Select" & {
    readonly type?: "Select" | undefined;
    readonly props?: SelectProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Select.d.ts.map