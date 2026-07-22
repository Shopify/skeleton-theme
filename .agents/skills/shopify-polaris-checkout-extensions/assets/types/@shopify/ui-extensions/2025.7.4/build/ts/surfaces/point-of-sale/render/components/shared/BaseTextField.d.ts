export interface BaseTextFieldProps {
    /**
     * The title text displayed for the text field.
     */
    title?: string;
    /**
     * The initial text value to populate the text field with when it first renders.
     */
    initialValue?: string;
    /**
     * A placeholder hint displayed when the text field is empty.
     */
    placeholder?: string;
    /**
     * Controls the validation state of the current value in the text field. When `false`, indicates invalid input.
     */
    isValid?: boolean;
    /**
     * An error message to display to the user when validation fails.
     */
    errorMessage?: string;
    /**
     * A callback function executed every time the text field value changes, receiving the new value as a parameter.
     */
    onChangeText?: (value: string) => void;
}
//# sourceMappingURL=BaseTextField.d.ts.map