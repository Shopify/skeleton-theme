import type { IconSource } from '../Icon/Icon';
export interface StepperProps {
    /**
     * A detailed description for screen readers.
     */
    accessibilityDescription?: string;
    /**
     * Whether the field can be modified.
     */
    disabled?: boolean;
    /**
     * Indicate an error to the user. The field will be given a specific stylistic treatment
     * to communicate problems that have to be resolved immediately.
     */
    error?: string;
    /**
     * Content to use as the field label. This value is also used as the placeholder
     * when the field is empty.
     */
    label: string;
    /**
     * An icon to render at the start of the field.
     */
    icon?: IconSource;
    /**
     * A unique identifier for the field. When no `id` is set,
     * a globally unique value will be used instead.
     */
    id?: string;
    /**
     * The highest decimal or integer to be accepted for the stepper field.
     * When used with `step` the value will round down to the max number.
     * Note: a buyer will still be able to use the keyboard to input a number higher than
     * the max. It is up to the developer to add appropriate validation.
     */
    max?: number;
    /**
     * The lowest decimal or integer to be accepted for the stepper field.
     * When used with `step` the value will round up to the min number.
     * Note: a buyer will still be able to use the keyboard to input a number lower than
     * the min. It is up to the developer to add appropriate validation.
     *
     * @defaultValue 0
     */
    min?: number;
    /**
     * An identifier for the field that is unique within the nearest
     * containing `Form` component.
     */
    name?: string;
    /**
     * Text content to render before the value.
     */
    prefix?: string;
    /**
     * Whether the field is read-only.
     */
    readonly?: boolean;
    /**
     * Whether the field needs a value. This requirement adds semantic value
     * to the field, but it will not cause an error to appear automatically.
     * If you want to present an error when this field is empty, you can do
     * so with the `error` prop.
     */
    required?: boolean;
    /**
     * The amount the value can increase or decrease by. This can be an integer or decimal.
     * If a `max` or `min` is specified with `step` when increasing/decreasing the value
     * via the stepper buttons the final value will always round to the `max` or `min`
     * rather than the closest valid amount.
     *
     * @defaultValue 1
     */
    step?: number;
    /**
     * The current value for the field. If omitted, the field will be empty. You should
     * update this value in response to the `onChange` callback.
     */
    value?: number | undefined;
    /**
     * Callback when input is focused.
     */
    onFocus?(): void;
    /**
     * Callback when focus is removed.
     */
    onBlur?(): void;
    /**
     * Callback when the buyer has **finished editing** a field. Unlike `onChange`
     * callbacks you may be familiar with from Polaris or other React component libraries,
     * this callback is **not** run on every change to the input. Text fields are
     * “partially controlled” components, which means that while the buyer edits the
     * field, its state is controlled by the component. Once the buyer has signalled that
     * they have finished editing the field (typically, by blurring the field), `onChange`
     * is called if the input actually changed from the most recent `value` property. At
     * that point, you are expected to store this “committed value” in state, and reflect
     * it in the text field’s `value` property.
     *
     * This state management model is important given how UI Extensions are rendered. UI Extension components
     * run on a separate thread from the UI, so they can’t respond to input synchronously.
     * A pattern popularized by [controlled React components](https://reactjs.org/docs/forms.html#controlled-components)
     * is to have the component be the source of truth for the input `value`, and update
     * the `value` on every user input. The delay in responding to events from a UI
     * extension is only a few milliseconds, but attempting to strictly store state with
     * this delay can cause issues if a user types quickly, or if the buyer is using a
     * lower-powered device. Having the UI thread take ownership for “in progress” input,
     * and only synchronizing when the user is finished with a field, avoids this risk.
     *
     * It can still sometimes be useful to be notified when the user makes any input in
     * the field. If you need this capability, you can use the `onInput` prop. However,
     * never use that property to create tightly controlled state for the `value`.
     *
     * This callback is called with the current value of the field. If the value of a field
     * is the same as the current `value` prop provided to the field, the `onChange` callback
     * will not be run.
     */
    onChange?(value: number | undefined): void;
    /**
     * Callback when the user makes any changes in the field. As noted in the documentation
     * for `onChange`, you **must not** use this to update `state` — use the `onChange`
     * callback for that purpose. Use the `onInput` prop when you need to do something
     * as soon as the buyer makes a change, like clearing validation errors that apply to
     * the field as soon as the user begins making the necessary adjustments.
     *
     * This callback is called with the current value of the field.
     */
    onInput?(value: number | undefined): void;
}
/**
 * Use a stepper to increase or decrease a value, like changing the quantity from 1 to 2.
 */
export declare const Stepper: "Stepper" & {
    readonly type?: "Stepper" | undefined;
    readonly props?: StepperProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Stepper.d.ts.map