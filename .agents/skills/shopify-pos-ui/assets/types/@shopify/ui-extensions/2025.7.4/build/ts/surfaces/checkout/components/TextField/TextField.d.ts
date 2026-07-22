import type { RemoteFragment } from '@remote-ui/core';
import type { Autocomplete } from '../shared';
import type { IconSource } from '../Icon/Icon';
type Type = 'text' | 'email' | 'number' | 'telephone';
export interface TextFieldProps<T extends string | number | undefined> {
    /**
     * A unique identifier for the field. When no `id` is set,
     * a globally unique value will be used instead.
     */
    id?: string;
    /**
     * An icon to render at the start or end of the field.
     * It will render at the start by default.
     */
    icon?: IconSource | {
        source: IconSource;
        position?: 'start' | 'end';
    };
    /**
     * An identifier for the field that is unique within the nearest
     * containing `Form` component.
     */
    name?: string;
    /**
     * Content to use as the field label. This value is also used as the placeholder
     * when the field is empty.
     */
    label: string;
    /**
     * Text content to render before the value.
     */
    prefix?: string;
    /**
     * Text content to render at the end of the text field.
     */
    suffix?: string;
    /**
     * Any content to render at the end of the text field. Commonly used
     * to display an icon that opens a tooltip providing more information about the field.
     */
    accessory?: string | RemoteFragment;
    /**
     * A detailed description for screen readers.
     */
    accessibilityDescription?: string;
    /**
     * The current value for the field. If omitted, the field will be empty. You should
     * update this value in response to the `onChange` callback.
     */
    value?: T;
    /**
     * In rare cases, like the PhoneField component, we completely control state.
     * In those cases, there is never a difference between the `value` prop of the field
     * and the current value in the field, and so this component never considers the
     * field to have changed. Use the `controlledValue` prop to provide the value that
     * should be shown to the buyer in those circumstances, but where the `value` prop
     * will continue to be used as the comparison value to determine whether the field
     * has changed. This value will usually be set to the last committed, unformatted value
     * for the controlled input.
     */
    controlledValue?: T;
    /**
     * The content type a buyer will enter into the field. This type is used to provide
     * semantic value to the field and, where possible, will provide the buyer with
     * a better editing experience for the content type.
     *
     * Note that the type property does not change the way the text field’s value will
     * be provided in `onChange` or `onInput`; a text field with a type of `'number'`
     * will still provide the exact user entry, as a string, to those callbacks. The
     * type also does not perform any form of automatic validation. If you want to
     * perform validation, use the `error` property.
     */
    type?: Type;
    /**
     * Whether the field needs a value. This requirement adds semantic value
     * to the field, but it will not cause an error to appear automatically.
     * If you want to present an error when this field is empty, you can do
     * so with the `error` prop.
     */
    required?: boolean;
    /**
     * Indicate an error to the user. The field will be given a specific stylistic treatment
     * to communicate problems that have to be resolved immediately.
     */
    error?: string;
    /**
     * Whether the field supports multiple lines of input.
     * Set a `number` to define the default lines of the input.
     */
    multiline?: boolean | number;
    /**
     * A hint as to the intended content of the field.
     *
     * When set to `true`, this property indicates that the field should support
     * autofill, but you do not have any more semantic information on the intended
     * contents.
     *
     * When set to `false`, you are indicating that this field contains sensitive
     * information, or contents that are never saved, like one-time codes.
     *
     * Alternatively, you can provide an `Autocomplete` object, which describes the
     * specific data you would like to be entered into this field during autofill.
     */
    autocomplete?: Autocomplete | boolean;
    /**
     * Whether the field can be modified.
     */
    disabled?: boolean;
    /**
     * Whether the field is read-only.
     */
    readonly?: boolean;
    /**
     * Specifies the maximum number of characters allowed.
     */
    maxLength?: number;
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
    onChange?(value: T): void;
    /**
     * Callback when the user makes any changes in the field. As noted in the documentation
     * for `onChange`, you must not use this to update `state` — use the `onChange`
     * callback for that purpose. Use the `onInput` prop when you need to do something
     * as soon as the buyer makes a change, like clearing validation errors that apply to
     * the field as soon as the user begins making the necessary adjustments.
     *
     * This callback is called with the current value of the field.
     */
    onInput?(value: T): void;
}
/**
 * Use a text field to get text input from a customer.
 */
export declare const TextField: "TextField" & {
    readonly type?: "TextField" | undefined;
    readonly props?: TextFieldProps<string> | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=TextField.d.ts.map