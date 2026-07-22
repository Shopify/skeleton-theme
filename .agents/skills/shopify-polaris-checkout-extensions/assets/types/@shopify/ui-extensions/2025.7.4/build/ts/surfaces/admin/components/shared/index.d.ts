export interface GlobalProps {
    /**
     * A unique identifier for the element.
     */
    id?: string;
}
export interface InputProps<T> {
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
     * A unique identifier for the field.
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
     * Callback when the user has **finished editing** a field. Unlike `onChange`
     * callbacks you may be familiar with from React component libraries,
     * this callback is **not** run on every change to the input. Text fields are
     * “partially controlled” components, which means that while the user edits the
     * field, its state is controlled by the component. Once the user has signalled that
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
     * this delay can cause issues if a user types quickly, or if the user is using a
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
     * Callback when input is focused.
     */
    onFocus?(): void;
    /**
     * Callback when the user makes any changes in the field. As noted in the documentation
     * for `onChange`, you **must not** use this to update `value` — use the `onChange`
     * callback for that purpose. Use the `onInput` prop when you need to do something
     * as soon as the user makes a change, like clearing validation errors that apply to
     * the field as soon as the user begins making the necessary adjustments.
     *
     * This callback is called with the current value of the field.
     */
    onInput?(value: T): void;
    /**
     * A short hint that describes the expected value of the field.
     */
    placeholder?: string;
    /**
     * Whether the field is read-only.
     */
    readOnly?: boolean;
    /**
     * A default value to populate for uncontrolled components.
     */
    defaultValue?: string | string[];
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
    value?: T;
}
export interface FieldDecorationProps {
    /**
     * A value to be displayed immediately after the editable portion of the field.
     *
     * This is useful for displaying an implied part of the value, such as "@shopify.com", or "%".
     *
     * This cannot be edited by the user, and it isn't included in the value of the field.
     *
     * It may not be displayed until the user has interacted with the input.
     * For example, an inline label may take the place of the suffix until the user focuses the input.
     *
     * @default ''
     */
    suffix?: string;
}
export interface MinMaxLengthProps {
    /**
     * Specifies the maximum number of characters allowed.
     */
    maxLength?: number;
    /**
     * Specifies the min number of characters allowed.
     */
    minLength?: number;
}
export interface AccessibilityLabelProps {
    /**
     * A label that describes the purpose or contents of the element. When set, it will be announced
     * to users using assistive technologies and will provide them with more context. When set, any
     * children or `label` supplied will not be announced to screen readers.
     */
    accessibilityLabel?: string;
}
export interface AccessibilityRoleProps {
    /**
     * Sets the semantic meaning of the component’s content. When set,
     * the role will be used by assistive technologies to help users
     * navigate the page.
     *
     * @defaultValue 'generic'
     */
    accessibilityRole?: AccessibilityRole;
}
export type AccessibilityRole = 
/**
 * Used to indicate the primary content.
 *
 * In an HTML host, `main` will render a `<main>` element.
 * Learn more about the [`<main>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role) in the MDN web docs.
 */
'main'
/**
 * Used to indicate the component is a header.
 *
 * In an HTML host `header` will render a `<header>` element.
 * Learn more about the [`<header>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role) in the MDN web docs.
 */
 | 'header'
/**
 * Used to display information such as copyright information, navigation links, and privacy statements.
 *
 * In an HTML host `footer` will render a `<footer>` element.
 * Learn more about the [`<footer>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/contentinfo_role) in the MDN web docs.
 */
 | 'footer'
/**
 * Used to indicate a generic section.
 * Sections should always have a `Heading` or an accessible name provided in the `accessibilityLabel` property.
 *
 * In an HTML host `section` will render a `<section>` element.
 * Learn more about the [`<section>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role) in the MDN web docs.
 *
 */
 | 'section'
/**
 * Used to designate a supporting section that relates to the main content.
 *
 * In an HTML host `aside` will render an `<aside>` element.
 * Learn more about the [`<aside>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/complementary_role) in the MDN web docs.
 */
 | 'aside'
/**
 * Used to identify major groups of links used for navigating.
 *
 * In an HTML host `navigation` will render a `<nav>` element.
 * Learn more about the [`<nav>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role) in the MDN web docs.
 */
 | 'navigation'
/**
 * Used to identify a list of ordered items.
 *
 * In an HTML host `ordered-list` will render a `<ol>` element.
 * Learn more about the [`<ol>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role) in the MDN web docs.
 */
 | 'ordered-list'
/**
 * Used to identify an item inside a list of items.
 *
 * In an HTML host `list-item` will render a `<li>` element.
 * Learn more about the [`<li>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listitem_role) in the MDN web docs.
 */
 | 'list-item'
/**
 * Used to indicates the component acts as a divider that separates and distinguishes sections of content in a list of items.
 *
 * In an HTML host `list-item-separator` will render as `<li role="separator">`.
 * Learn more about the [`<li>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) and the [`separator` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role) in the MDN web docs.
 */
 | 'list-item-separator'
/**
 * Used to identify a list of unordered items.
 *
 * In an HTML host `unordered-list` will render a `<ul>` element.
 * Learn more about the [`<ul>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role) in the MDN web docs.
 */
 | 'unordered-list'
/**
 * Used to indicates the component acts as a divider that separates and distinguishes sections of content.
 *
 * In an HTML host `separator` will render as `<div role="separator">`.
 * Learn more about the [`separator` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role) in the MDN web docs.
 */
 | 'separator'
/**
 * Used to define a live region containing advisory information for the user that is not important enough to be an alert.
 *
 * In an HTML host `status` will render as `<div role="status">`.
 * Learn more about the [`status` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role) in the MDN web docs.
 */
 | 'status'
/**
 * Used for important, and usually time-sensitive, information.
 *
 * In an HTML host `alert` will render as `<div role="alert">`.
 * Learn more about the [`alert` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role) in the MDN web docs.
 */
 | 'alert'
/**
 * Used to create a nameless container element which has no semantic meaning on its own.
 *
 * In an HTML host `generic'` will render a `<div>` element.
 * Learn more about the [`generic` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/generic_role) in the MDN web docs.
 */
 | 'generic';
export type SpacingKeyword = 'none' | 'small' | 'base' | 'large';
export interface SizingProps {
    /**
     * Adjust the block size.
     *
     * - `number`: size in pixels.
     * - `` `${number}%` ``: size in percentages of the available space.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/block-size
     */
    blockSize?: number | `${number}%`;
    /**
     * Adjust the minimum block size.
     *
     * - `number`: size in pixels.
     * - `` `${number}%` ``: size in percentages of the available space.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size
     */
    minBlockSize?: number | `${number}%`;
    /**
     * Adjust the maximum block size.
     *
     * - `number`: size in pixels.
     * - `` `${number}%` ``: size in percentages of the available space.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size
     */
    maxBlockSize?: number | `${number}%`;
    /**
     * Adjust the inline size.
     *
     * - `number`: size in pixels.
     * - `` `${number}%` ``: size in percentages of the available space.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size
     */
    inlineSize?: number | `${number}%`;
    /**
     * Adjust the minimum inline size.
     *
     * - `number`: size in pixels.
     * - `` `${number}%` ``: size in percentages of the available space.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size
     */
    minInlineSize?: number | `${number}%`;
    /**
     * Adjust the maximum inline size.
     *
     * - `number`: size in pixels.
     * - `` `${number}%` ``: size in percentages of the available space.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/max-inline-size
     */
    maxInlineSize?: number | `${number}%`;
}
export interface PaddingProps {
    /**
     * Adjust the padding.
     *
     * To shorten the code, it is possible to specify all the padding for all edges of the box in one property.
     *
     * - `base` means block-start, inline-end, block-end and inline-start paddings are `base`.
     * - `base none` means block-start and block-end paddings are `base`, inline-start and inline-end paddings are `none`.
     * - `base none large` means block-start padding is `base`, inline-end padding is `none`, block-end padding is `large` and inline-start padding is `none`.
     * - `base none large small` means block-start padding is `base`, inline-end padding is `none`, block-end padding is `large` and inline-start padding is `small`.
     * - `true` applies a default padding that is appropriate for the component.
     *
     * Learn more about the 1-to-4-value syntax at https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box
     */
    padding?: MaybeAllBoxEdgesShorthandProperty<SpacingKeyword | boolean>;
    /**
     * Adjust the block-padding.
     *
     * - `base none` means block-start padding is `base`, block-end padding is `none`.
     */
    paddingBlock?: MaybeTwoBoxEdgesShorthandProperty<SpacingKeyword | boolean>;
    /**
     * Adjust the block-start padding.
     */
    paddingBlockStart?: SpacingKeyword | boolean;
    /**
     * Adjust the block-end padding.
     */
    paddingBlockEnd?: SpacingKeyword | boolean;
    /**
     * Adjust the inline padding.
     *
     * - `base none` means inline-start padding is `base`, inline-end padding is `none`.
     */
    paddingInline?: MaybeTwoBoxEdgesShorthandProperty<SpacingKeyword | boolean>;
    /**
     * Adjust the inline-start padding.
     */
    paddingInlineStart?: SpacingKeyword | boolean;
    /**
     * Adjust the inline-end padding.
     */
    paddingInlineEnd?: SpacingKeyword | boolean;
}
export type MaybeAllBoxEdgesShorthandProperty<T extends SpacingKeyword | boolean> = T | `${T} ${T}` | `${T} ${T} ${T}` | `${T} ${T} ${T} ${T}`;
export type MaybeTwoBoxEdgesShorthandProperty<T extends SpacingKeyword | boolean> = T | `${T} ${T}`;
export interface AutocompleteProps<AutocompleteField extends AnyAutocompleteField> {
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
     * Alternatively, you can provide value which describes the
     * specific data you would like to be entered into this field during autofill.
     *
     * @see Learn more about the set of {@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-detail-tokens|autocomplete values} supported in browsers.
     */
    autocomplete?: AutocompleteField | `${AutocompleteSection} ${AutocompleteField}` | `${AutocompleteGroup} ${AutocompleteField}` | `${AutocompleteSection} ${AutocompleteGroup} ${AutocompleteField}` | boolean;
}
/**
 * The “section” scopes the autocomplete data that should be inserted
 * to a specific area of the page.
 *
 * Commonly used when there are multiple fields with the same autocomplete needs
 * in the same page. For example: 2 shipping address forms in the same page.
 */
export type AutocompleteSection = `section-${string}`;
/**
 * The contact information group the autocomplete data should be sourced from.
 */
export type AutocompleteGroup = 'shipping' | 'billing';
/**
 * The contact information subgroup the autocomplete data should be sourced from.
 */
export type AutocompleteAddressGroup = 'fax' | 'home' | 'mobile' | 'pager';
export type AutocompleteFieldTelephoneAlias = 'tel' | 'telephone';
export type AutocompleteFieldBirthdayAlias = 'bday' | 'birthday';
export type AutocompleteFieldCreditCardAlias = 'cc' | 'credit-card';
export type AutocompleteFieldInstantMessageAlias = 'impp' | 'instant-message';
export type AutocompleteFieldSecurityCodeAlias = 'csc' | 'security-code';
export type AnyAutocompleteField = 'additional-name' | 'address-level1' | 'address-level2' | 'address-level3' | 'address-level4' | 'address-line1' | 'address-line2' | 'address-line3' | 'country-name' | 'country' | 'current-password' | 'email' | 'family-name' | 'given-name' | 'honorific-prefix' | 'honorific-suffix' | 'language' | 'name' | 'new-password' | 'nickname' | 'one-time-code' | 'organization-title' | 'organization' | 'photo' | 'postal-code' | 'sex' | 'street-address' | 'transaction-amount' | 'transaction-currency' | 'url' | 'username' | `${AutocompleteFieldBirthdayAlias}-day` | `${AutocompleteFieldBirthdayAlias}-month` | `${AutocompleteFieldBirthdayAlias}-year` | `${AutocompleteFieldBirthdayAlias}` | `${AutocompleteFieldCreditCardAlias}-additional-name` | `${AutocompleteFieldCreditCardAlias}-expiry-month` | `${AutocompleteFieldCreditCardAlias}-expiry-year` | `${AutocompleteFieldCreditCardAlias}-expiry` | `${AutocompleteFieldCreditCardAlias}-family-name` | `${AutocompleteFieldCreditCardAlias}-given-name` | `${AutocompleteFieldCreditCardAlias}-name` | `${AutocompleteFieldCreditCardAlias}-number` | `${AutocompleteFieldCreditCardAlias}-${AutocompleteFieldSecurityCodeAlias}` | `${AutocompleteFieldCreditCardAlias}-type` | `${AutocompleteAddressGroup} email` | `${AutocompleteFieldInstantMessageAlias}` | `${AutocompleteAddressGroup} ${AutocompleteFieldInstantMessageAlias}` | `${AutocompleteFieldTelephoneAlias}` | `${AutocompleteFieldTelephoneAlias}-area-code` | `${AutocompleteFieldTelephoneAlias}-country-code` | `${AutocompleteFieldTelephoneAlias}-extension` | `${AutocompleteFieldTelephoneAlias}-local-prefix` | `${AutocompleteFieldTelephoneAlias}-local-suffix` | `${AutocompleteFieldTelephoneAlias}-local` | `${AutocompleteFieldTelephoneAlias}-national` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-area-code` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-country-code` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-extension` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-local-prefix` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-local-suffix` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-local` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-national`;
export type TextAutocompleteField = Extract<AnyAutocompleteField, 'additional-name' | 'address-level1' | 'address-level2' | 'address-level3' | 'address-level4' | 'address-line1' | 'address-line2' | 'address-line3' | 'country-name' | 'country' | 'family-name' | 'given-name' | 'honorific-prefix' | 'honorific-suffix' | 'language' | 'name' | 'nickname' | 'one-time-code' | 'organization-title' | 'organization' | 'postal-code' | 'sex' | 'street-address' | 'transaction-currency' | 'username' | `${AutocompleteFieldCreditCardAlias}-name` | `${AutocompleteFieldCreditCardAlias}-given-name` | `${AutocompleteFieldCreditCardAlias}-additional-name` | `${AutocompleteFieldCreditCardAlias}-family-name` | `${AutocompleteFieldCreditCardAlias}-type`>;
/**
 * TODO:
 * Move these to their respective fields when they are implemented.
 */
export type MoneyAutocomplete = Extract<AnyAutocompleteField, 'transaction-amount'>;
export type DateAutocomplete = Extract<AnyAutocompleteField, `${AutocompleteFieldBirthdayAlias}` | `${AutocompleteFieldBirthdayAlias}-day` | `${AutocompleteFieldBirthdayAlias}-month` | `${AutocompleteFieldBirthdayAlias}-year` | `${AutocompleteFieldCreditCardAlias}-expiry` | `${AutocompleteFieldCreditCardAlias}-expiry-month` | `${AutocompleteFieldCreditCardAlias}-expiry-year`>;
export type PhoneAutocompleteField = Extract<AnyAutocompleteField, `${AutocompleteFieldTelephoneAlias}` | `${AutocompleteFieldTelephoneAlias}-area-code` | `${AutocompleteFieldTelephoneAlias}-country-code` | `${AutocompleteFieldTelephoneAlias}-extension` | `${AutocompleteFieldTelephoneAlias}-local-prefix` | `${AutocompleteFieldTelephoneAlias}-local-suffix` | `${AutocompleteFieldTelephoneAlias}-local` | `${AutocompleteFieldTelephoneAlias}-national` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-area-code` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-country-code` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-extension` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-local-prefix` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-local-suffix` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-local` | `${AutocompleteAddressGroup} ${AutocompleteFieldTelephoneAlias}-national`>;
export interface GapProps {
    /**
     * Adjust spacing between children
     */
    gap?: MaybeTwoBoxEdgesShorthandProperty<SpacingKeyword | boolean>;
    /**
     * Adjust spacing between elements in the block axis.
     *
     * Alias for `rowGap`
     */
    blockGap?: SpacingKeyword | boolean;
    /**
     * Adjust spacing between elements in the inline axis.
     *
     * Alias for `columnGap`
     */
    inlineGap?: SpacingKeyword | boolean;
    /**
     * Adjust spacing between children in the block axis
     */
    rowGap?: SpacingKeyword | boolean;
    /**
     * Adjust spacing between children in the inline axis
     */
    columnGap?: SpacingKeyword | boolean;
}
export type CrossAxisAlignment = 
/** Items are positioned at the beginning of the container's cross axis */
'start'
/** Items are positioned at the center of the container’s cross axis */
 | 'center'
/**	Items are positioned at the end of the container's cross axis */
 | 'end'
/** Items are positioned at the baseline of the container's cross axis */
 | 'baseline';
export type MainAxisAlignment = 
/** Align items at the start of the container's main axis */
'start'
/** Align items to the center of the container's main axis */
 | 'center'
/** Align items at the end of the container's main axis */
 | 'end'
/** Distribute items evenly across the container's main axis, where the first item is flush with the start, the last is flush with the end */
 | 'space-between'
/** Distribute items evenly across the container's main axis, with a half-size space on either end of the items */
 | 'space-around'
/** Distribute items evenly across the container's main axis, with items having equal space around them */
 | 'space-evenly';
export type SpaceScale = '0' | '025' | '05' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24' | '28' | '32';
export type SizeScale = 'small-300' | 'small-200' | 'small-100' | 'base' | 'large-100' | 'large-200' | 'large-300';
export type Tone = 'info' | 'success' | 'warning' | 'critical';
export interface AnchorProps {
    /**
     * The URL to link to.
     * If set, it will navigate to the location specified by `href` after executing the `onClick` callback.
     */
    href?: string;
    /**
     * Alias for `href`
     * If set, it will navigate to the location specified by `to` after executing the `onClick` callback.
     */
    to?: string;
    /**
     * Callback when a link is pressed. If `href` is set,
     * it will execute the callback and then navigate to the location specified by `href`.
     */
    onClick?(): void;
    /**
     * Alias for `onClick`
     * Callback when a link is pressed. If `href` is set,
     * it will execute the callback and then navigate to the location specified by `href`.
     */
    onPress?(): void;
}
export type BackgroundColorKeyword = 'transparent' | 'base' | 'subdued';
export interface BackgroundProps {
    /**
     * Adjust the background of the element.
     *
     * @default: 'transparent'
     */
    background?: BackgroundColorKeyword;
}
export interface NumberConstraintsProps {
    /**
     * The highest decimal or integer to be accepted for the field.
     * When used with `step` the value will round down to the max number.
     *
     * Note: a user will still be able to use the keyboard to input a number higher than
     * the max. It is up to the developer to add appropriate validation.
     */
    max?: number;
    /**
     * The lowest decimal or integer to be accepted for the field.
     * When used with `step` the value will round up to the min number.
     *
     * Note: a user will still be able to use the keyboard to input a number lower than
     * the min. It is up to the developer to add appropriate validation.
     *
     * @defaultValue 0
     */
    min?: number;
    /**
     * The amount the value can increase or decrease by. This can be an integer or decimal.
     * If a `max` or `min` is specified with `step` when increasing/decreasing the value
     * via the buttons, the final value will always round to the `max` or `min`
     * rather than the closest valid amount.
     *
     * @defaultValue 1
     */
    step?: number;
}
export interface Money {
    /**
     * A decimal money amount.
     */
    amount: number;
    /**
     * A currency.
     */
    currencyCode: CurrencyCode;
}
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AFN' | 'ALL' | 'DZD' | 'AOA' | 'ARS' | 'AMD' | 'AWG' | 'AUD' | 'BBD' | 'AZN' | 'BDT' | 'BSD' | 'BHD' | 'BIF' | 'BZD' | 'BMD' | 'BTN' | 'BAM' | 'BRL' | 'BOB' | 'BWP' | 'BND' | 'BGN' | 'MMK' | 'KHR' | 'CVE' | 'KYD' | 'XAF' | 'CLP' | 'CNY' | 'COP' | 'KMF' | 'CDF' | 'CRC' | 'HRK' | 'CZK' | 'DKK' | 'DOP' | 'XCD' | 'EGP' | 'ETB' | 'XPF' | 'FJD' | 'GMD' | 'GHS' | 'GTQ' | 'GYD' | 'GEL' | 'HTG' | 'HNL' | 'HKD' | 'HUF' | 'ISK' | 'INR' | 'IDR' | 'ILS' | 'IQD' | 'JMD' | 'JPY' | 'JEP' | 'JOD' | 'KZT' | 'KES' | 'KWD' | 'KGS' | 'LAK' | 'LVL' | 'LBP' | 'LSL' | 'LRD' | 'LTL' | 'MGA' | 'MKD' | 'MOP' | 'MWK' | 'MVR' | 'MXN' | 'MYR' | 'MUR' | 'MDL' | 'MAD' | 'MNT' | 'MZN' | 'NAD' | 'NPR' | 'ANG' | 'NZD' | 'NIO' | 'NGN' | 'NOK' | 'OMR' | 'PAB' | 'PKR' | 'PGK' | 'PYG' | 'PEN' | 'PHP' | 'PLN' | 'QAR' | 'RON' | 'RUB' | 'RWF' | 'WST' | 'SAR' | 'RSD' | 'SCR' | 'SGD' | 'SDG' | 'SYP' | 'ZAR' | 'KRW' | 'SSP' | 'SBD' | 'LKR' | 'SRD' | 'SZL' | 'SEK' | 'CHF' | 'TWD' | 'THB' | 'TZS' | 'TTD' | 'TND' | 'TRY' | 'TMT' | 'UGX' | 'UAH' | 'AED' | 'UYU' | 'UZS' | 'VUV' | 'VND' | 'XOF' | 'YER' | 'ZMW' | 'BYN' | 'BYR' | 'DJF' | 'ERN' | 'FKP' | 'GIP' | 'GNF' | 'IRR' | 'KID' | 'LYD' | 'MRU' | 'SLL' | 'SHP' | 'SOS' | 'STD' | 'STN' | 'TJS' | 'TOP' | 'VED' | 'VEF' | 'VES' | 'XXX';
export type TextOverflow = 'ellipsis';
export type FontStyle = 'italic' | 'normal';
export type TextAccessibilityRole = 
/**
 * Indicate the text is contact information. Typically used for addresses.
 */
'address'
/**
 * Indicate the text has been deleted. Typically used for discounted prices.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del
 */
 | 'deletion'
/**
 * Indicate the text is marked or highlighted and relevant to the buyer’s current action.
 * Typically used to indicate the characters that matched a search query.
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/mark_role
 */
 | 'mark'
/**
 * Indicate emphatic stress. Typically for words that have a stressed emphasis compared to surrounding text.
 *
 * In an HTML host, the text will be rendered in a `<em>` tag.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em
 */
 | 'emphasis'
/**
 * Indicate an offset from the normal prose of the text. Typically used to indicate
 * a foreign word, fictional character thoughts, or when the text refers to the definition of a word
 * instead of representing its semantic meaning.
 *
 * In an HTML host, the text will be rendered in a `<i>` tag.
 */
 | 'offset'
/**
 * Indicate strong importance, seriousness, or urgency.
 *
 * In an HTML host, the text will be rendered in a `<strong>` tag.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong
 */
 | 'strong';
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant
 */
export type FontVariantOptions = 
/**
 * The `font-variant-numeric` CSS property controls the usage of alternate glyphs for numbers, fractions, and ordinal markers.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
 */
'numeric'
/**
 * The `font-variant-caps` CSS property controls the use of alternate glyphs for capital letters.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-caps
 */
 | 'all-small-caps'
/**
 * Sets the value of the `font-variant-ligatures` as `none`,
 * and the values of the other longhand properties as `normal`, their initial value.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant#values
 */
 | 'none';
export type FontWeight = 'light-300' | 'light-200' | 'light-100' | 'light' | 'base' | 'normal' | 'bold' | 'bold-100' | 'bold-200' | 'bold-300';
export interface BaseTypographyProps {
    /** Size of the typography's font. */
    fontSize?: SizeScale;
    /**
     * Sets the weight of the font.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
     * */
    fontWeight?: FontWeight;
    /**
     * Set how hidden overflow content is signaled to users.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
     * */
    textOverflow?: TextOverflow;
    /**
     *  Use to emphasize a word or a group of words.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-style
     */
    fontStyle?: FontStyle;
}
//# sourceMappingURL=index.d.ts.map