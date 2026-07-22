import type { IdProps, DisclosureActivatorProps } from '../shared';
export interface SwitchProps extends IdProps, DisclosureActivatorProps {
    /**
     * An identifier for the field that is unique within the nearest
     * containing `Form` component.
     */
    name?: string;
    /**
     * Whether the switch is active.
     */
    checked?: boolean;
    /**
     * Visual content to use as the switch label.
     */
    label?: string;
    /**
     * Whether the switch is selected. This prop is an alias for `checked`,
     * and can be useful in form libraries that provide a normalized API for
     * dealing with both `boolean` and `string` values. If both `value` and
     * `checked` are set, `checked` takes precedence.
     */
    value?: boolean;
    /**
     * Whether the switch can be changed.
     */
    disabled?: boolean;
    /**
     * A label used for buyers using assistive technologies.
     */
    accessibilityLabel?: string;
    /**
     * A callback that is run whenever the switch is changed. This callback
     * is called with a boolean indicating whether the switch should now be
     * active or inactive. This component is [controlled](https://reactjs.org/docs/forms.html#controlled-components),
     * so you must store this value in state and reflect it back in the
     * `checked` or `value` props.
     */
    onChange?(value: boolean): void;
}
export declare const Switch: "Switch" & {
    readonly type?: "Switch" | undefined;
    /**
     * An identifier for the field that is unique within the nearest
     * containing `Form` component.
     */
    readonly props?: SwitchProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Switch.d.ts.map