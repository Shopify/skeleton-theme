import { AccessibilityLabelProps } from '../shared';
export interface CheckboxProps extends AccessibilityLabelProps {
    /**
     * Whether the checkbox is active.
     */
    checked?: boolean;
    /**
     * Whether the checkbox can be changed.
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
     * Visual content to use as the checkbox label.
     */
    label?: string;
    /**
     * An identifier for the checkbox that is unique within the nearest
     * containing `Form` component.
     */
    name?: string;
    /**
     * A callback that is run whenever the checkbox is changed. This callback
     * is called with a boolean indicating whether the checkbox should now be
     * active or inactive. This component is [controlled](https://reactjs.org/docs/forms.html#controlled-components),
     * so you must store this value in state and reflect it back in the
     * `checked` or `value` props.
     */
    onChange?: (value: boolean) => void;
    /**
     * Whether the checkbox is active. This prop is an alias for `checked`,
     * and can be useful in form libraries that provide a normalized API for
     * dealing with both `boolean` and `string` values. If both `value` and
     * `checked` are set, `checked` takes precedence.
     */
    value?: boolean;
}
export declare const Checkbox: "Checkbox" & {
    readonly type?: "Checkbox" | undefined;
    readonly props?: CheckboxProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Checkbox.d.ts.map