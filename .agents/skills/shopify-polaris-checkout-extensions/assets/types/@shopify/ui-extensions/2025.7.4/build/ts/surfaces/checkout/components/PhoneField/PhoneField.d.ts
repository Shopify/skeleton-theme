import type { RemoteFragment } from '@remote-ui/core';
import type { Autocomplete } from '../shared';
import type { IconSource } from '../Icon/Icon';
export interface PhoneFieldProps {
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
     * Indicate an error to the user. The field will be given a specific stylistic treatment
     * to communicate problems that have to be resolved immediately.
     */
    error?: string;
    /**
     * An icon to render at the start or end of the field.
     * It will render at the start by default.
     */
    icon?: IconSource | {
        source: IconSource;
        position?: 'start' | 'end';
    };
    /**
     * A unique identifier for the field. When no `id` is set,
     * a globally unique value will be used instead.
     */
    id?: string;
    /**
     * Content to use as the field label. This value is also used as the placeholder
     * when the field is empty.
     */
    label: string;
    /**
     * Specifies the maximum number of characters allowed.
     */
    maxLength?: number;
    /**
     * An identifier for the field that is unique within the nearest
     * containing `Form` component.
     */
    name?: string;
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
     * The current value for the field. If omitted, the field will be empty. You should
     * update this value in response to the `onChange` callback.
     */
    value?: string;
    /**
     * Callback when the buyer has **finished editing** a field or pressed the country dropdown.
     * Unlike `onChange` callbacks you may be familiar with from Polaris or other React component libraries,
     * this callback is **not** run on every change to the input. Phone fields are
     * “partially controlled” components, which means that while the buyer edits the
     * field, its state is controlled by the component. Once the buyer has signalled that
     * they have finished editing the field (typically, by blurring the field), `onChange`
     * is called if the input actually changed from the most recent `value` property. At
     * that point, you are expected to store this “committed value” in state, and reflect
     * it in the phone field’s `value` property.
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
     * This callback is called with the current formatted value of the field. If the value
     * of a field is the same as the current `value` prop provided to the field,
     * the `onChange` callback will not be run.
     */
    onChange?(value: string): void;
    /**
     * Callback when the user makes any changes in the field including selecting a country
     * in the dropdown. As noted in the documentation for `onChange`, you must not use
     * this to update `state` — use the `onChange` callback for that purpose.
     * Use the `onInput` prop when you need to do something as soon as the buyer makes a change,
     * like clearing validation errors that apply to the field as soon as the user begins
     * making the necessary adjustments.
     *
     * This callback is called with the current formatted value.
     */
    onInput?(value: string): void;
    /**
     * Callback when input is focused.
     */
    onFocus?(): void;
    /**
     * Callback when focus is removed.
     */
    onBlur?(): void;
}
/**
 * A PhoneField is an input field that merchants can type into optimized
 * for phone numbers with a country code base auto-formatting.
 * The country code is required for the initial render of the field but
 * it can be overriden later by the user either by selecting a country
 * in the country selection dropdown or by manually editing the country phone code
 * directly in the text field.
 */
export declare const PhoneField: "PhoneField" & {
    readonly type?: "PhoneField" | undefined;
    readonly props?: PhoneFieldProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=PhoneField.d.ts.map