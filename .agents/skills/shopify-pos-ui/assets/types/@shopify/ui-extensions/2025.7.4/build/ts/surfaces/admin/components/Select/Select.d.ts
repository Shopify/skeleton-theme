export interface SelectProps {
    /**
     * Whether the select can be changed.
     */
    disabled?: boolean;
    /**
     * Indicate an error to the user. The field will be given a specific stylistic treatment
     * to communicate problems that have to be resolved immediately.
     */
    error?: string;
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
     * Callback when focus is removed.
     */
    onBlur?(): void;
    /**
     * A callback that is run whenever the selected option changes. This callback
     * is called with the string `value` of the selected `option`. This component
     * is [controlled](https://reactjs.org/docs/forms.html#controlled-components),
     * so you must store this value in state and reflect it back in the `value`
     * prop of the select.
     */
    onChange?(value: string): void;
    /**
     * Callback when input is focused.
     */
    onFocus?(): void;
    /**
     * The options a user can select from.
     *
     * When both `options` and children `Option` or `OptionGroup` are provided,
     * the options will be merged together, with the `options` property
     * taking precedence.
     */
    options: (OptionDescription | OptionGroupDescription)[];
    /**
     * A short hint that describes the expected value of the field.
     */
    placeholder?: string;
    /**
     * Whether the field is read-only.
     */
    readOnly?: boolean;
    /**
     * Whether the field needs a value. This requirement adds semantic value
     * to the field, but it will not cause an error to appear automatically.
     * If you want to present an error when this field is empty, you can do
     * so with the `error` prop.
     */
    required?: boolean;
    /**
     * The active option for the select. This should match to one of the
     * `value` properties in the `options` property or one of the `<Option>`.
     * When not set, the value will default to an empty string,
     * which will show the `placeholder` text as the "selected value".
     */
    value?: string;
}
export interface OptionProps {
    /**
     * Whether this option can be selected or not.
     */
    disabled?: boolean;
    /**
     * The value that will be passed to the select’s `onChange` callback
     * when this option is selected.
     */
    value: string;
}
export interface OptionGroupProps {
    /**
     * Whether the options within this group can be selected or not.
     */
    disabled?: boolean;
    /**
     * The user-facing label for this group of options.
     */
    label: string;
}
export interface OptionDescription {
    /**
     * Whether this option can be selected or not.
     */
    disabled?: boolean;
    /**
     * The user-facing label for this option.
     */
    label: string;
    /**
     * The value that will be passed to the select’s `onChange` callback
     * when this option is selected.
     */
    value: string;
}
export interface OptionGroupDescription {
    /**
     * Whether the options within this group can be selected or not.
     */
    disabled?: boolean;
    /**
     * The user-facing label for this group of options.
     */
    label: string;
    /**
     * The options a user can select from.
     */
    options?: OptionDescription[];
}
export declare const Select: "Select" & {
    readonly type?: "Select" | undefined;
    readonly props?: SelectProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Select.d.ts.map