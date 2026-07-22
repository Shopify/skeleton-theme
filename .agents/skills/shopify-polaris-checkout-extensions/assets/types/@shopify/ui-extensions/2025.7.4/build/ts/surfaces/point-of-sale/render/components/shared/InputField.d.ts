/**
 * Defines the configuration object for action buttons displayed below input fields to provide extra functionality.
 */
export interface InputAction {
    /**
     * The text displayed on the action button.
     */
    label: string;
    /**
     * A callback function executed when the action button is pressed.
     */
    onPress: () => void;
    /**
     * A boolean value that determines whether the action button can be pressed.
     */
    disabled?: boolean;
}
export interface InputProps {
    /**
     * Controls whether the field can be modified. When `true`, the field is disabled and users cannot edit its value.
     */
    disabled?: boolean;
    /**
     * An error message that indicates a problem to the user. The field is given specific stylistic treatment to communicate issues that must be resolved immediately.
     */
    error?: string;
    /**
     * The content to use as the field label that describes the text information being requested.
     */
    label: string;
    /**
     * A callback function executed when focus is removed from the field.
     */
    onBlur?: () => void;
    /**
     * A callback function executed when the user has finished editing the field, receiving the new text value as a parameter. You should update the `value` property in response to this callback.
     */
    onChange?: (value: string) => void;
    /**
     * A callback function executed when the field receives focus.
     */
    onFocus?: () => void;
    /**
     * A callback function executed immediately when the user makes any change in the field. Use this for real-time feedback, such as clearing validation errors as soon as the user begins making corrections. Don't use this to update the `value` property—the `onChange` callback is the appropriate handler for updating the field's value.
     */
    onInput?: (value: string) => void;
    /**
     * A short hint that describes the expected value of the field.
     */
    placeholder?: string;
    /**
     * A boolean that indicates whether the field needs a value for form submission or validation purposes.
     */
    required?: boolean;
    /**
     * The current text value for the field. If omitted, the field will be empty. You should update the `value` property in response to the `onChange` callback.
     */
    value?: string;
    /**
     * The label text displayed under the field that provides guidance or instructions to assist users.
     */
    helpText?: string;
    /**
     * A button configuration object displayed under the text field to provide extra functionality.
     */
    action?: InputAction;
    /**
     * The maximum number of characters allowed in the text field.
     */
    maxLength?: number;
}
//# sourceMappingURL=InputField.d.ts.map