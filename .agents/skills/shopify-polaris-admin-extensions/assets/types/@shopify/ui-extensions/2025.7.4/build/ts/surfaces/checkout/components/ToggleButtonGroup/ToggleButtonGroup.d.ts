export interface ToggleButtonGroupProps<T extends string> {
    /**
     * An id of the selected button.
     */
    value: T;
    /**
     * Whether the button group is disabled.
     */
    disabled?: boolean;
    /**
     * A callback that is run whenever one of the buttons is pressed. This callback
     * is called with a string or array of strings indicating the ids of buttons
     * that should now be selected. When this component is
     * [controlled](https://reactjs.org/docs/forms.html#controlled-components),
     * you must store this value in state and reflect it back in the `value` prop.
     */
    onChange(value: T): void;
}
/**
 * `ToggleButtonGroup` allows you to make a single choice out of the number of options provided.
 * This is similar to the `ChoiceList` component, but without controls such as checkbox or radio button.
 * You can utilize our layout components to arrange `ToggleButtonGroup`.
 */
export declare const ToggleButtonGroup: "ToggleButtonGroup" & {
    readonly type?: "ToggleButtonGroup" | undefined;
    readonly props?: ToggleButtonGroupProps<string> | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=ToggleButtonGroup.d.ts.map