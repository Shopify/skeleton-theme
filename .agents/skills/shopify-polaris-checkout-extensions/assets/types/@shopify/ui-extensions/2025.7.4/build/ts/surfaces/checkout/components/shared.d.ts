import type { RemoteFragment } from '@remote-ui/core';
import type { MaybeConditionalStyle, MaybeResponsiveConditionalStyle } from '../style/types';
/**
 * A descriptor for selecting the data a field would like to receive during
 * autocomplete. This attribute is modeled off of a limited set of the autocomplete
 * values supported in browsers.
 *
 * @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-detail-tokens
 */
export interface Autocomplete {
    /**
     * The contact information “group” the autocomplete data should be sourced from.
     */
    group?: AutocompleteGroup;
    /**
     * The type of data that should be inserted into a field supporting autocomplete.
     */
    field: AutocompleteField;
}
export type AutocompleteGroup = 'shipping' | 'billing';
export type AutocompleteField = 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'honorific-suffix' | 'nickname' | 'username' | 'new-password' | 'current-password' | 'one-time-code' | 'organization-title' | 'organization' | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3' | 'address-level4' | 'address-level3' | 'address-level2' | 'address-level1' | 'country' | 'country-name' | 'postal-code' | 'credit-card-name' | 'credit-card-given-name' | 'credit-card-additional-name' | 'credit-card-family-name' | 'credit-card-number' | 'credit-card-expiry' | 'credit-card-expiry-month' | 'credit-card-expiry-year' | 'credit-card-security-code' | 'credit-card-type' | 'transaction-currency' | 'transaction-amount' | 'language' | 'birthday' | 'birthday-day' | 'birthday-month' | 'birthday-year' | 'sex' | 'url' | 'photo' | 'telephone' | 'telephone-country-code' | 'telephone-national' | 'telephone-area-code' | 'telephone-local' | 'telephone-local-prefix' | 'telephone-local-suffix' | 'telephone-extension' | 'email' | 'instant-message' | 'home telephone' | 'home telephone-country-code' | 'home telephone-national' | 'home telephone-area-code' | 'home telephone-local' | 'home telephone-local-prefix' | 'home telephone-local-suffix' | 'home telephone-extension' | 'home email' | 'home instant-message' | 'work telephone' | 'work telephone-country-code' | 'work telephone-national' | 'work telephone-area-code' | 'work telephone-local' | 'work telephone-local-prefix' | 'work telephone-local-suffix' | 'work telephone-extension' | 'work email' | 'work instant-message' | 'mobile telephone' | 'mobile telephone-country-code' | 'mobile telephone-national' | 'mobile telephone-area-code' | 'mobile telephone-local' | 'mobile telephone-local-prefix' | 'mobile telephone-local-suffix' | 'mobile telephone-extension' | 'mobile email' | 'mobile instant-message' | 'fax telephone' | 'fax telephone-country-code' | 'fax telephone-national' | 'fax telephone-area-code' | 'fax telephone-local' | 'fax telephone-local-prefix' | 'fax telephone-local-suffix' | 'fax telephone-extension' | 'fax email' | 'fax instant-message' | 'pager telephone' | 'pager telephone-country-code' | 'pager telephone-national' | 'pager telephone-area-code' | 'pager telephone-local' | 'pager telephone-local-prefix' | 'pager telephone-local-suffix' | 'pager telephone-extension' | 'pager email' | 'pager instant-message';
export type Breakpoint = 'base' | 'extraSmall' | 'small' | 'medium' | 'large';
export type Display = 'none' | 'auto' | 'inline' | 'block';
export type ShorthandProperty<T> = [T, T] | [T, T, T, T];
export type MaybeShorthandProperty<T> = T | ShorthandProperty<T>;
/** @deprecated These values are deprecated and will eventually be removed.
 * Use CornerRadius instead
 */
export type BorderRadius = 'base' | 'tight' | 'loose' | 'fullyRounded' | 'none';
export type BorderStyle = 'base' | 'dashed' | 'dotted' | 'none';
export type BorderWidth = 'base' | 'medium' | 'thick';
export type CornerRadius = 'base' | 'small' | 'large' | 'fullyRounded' | 'none' | CornerRadiusDeprecated;
/** @deprecated These values are deprecated and will eventually be removed.
 * Use the new values.
 *
 * `tight`: `small`
 * `loose`: `large`
 */
export type CornerRadiusDeprecated = 'tight' | 'loose';
export interface BackgroundProps {
    /**
     * Adjust the background.
     *
     * @defaultValue 'transparent'
     */
    background?: MaybeConditionalStyle<Background>;
    /**
     * Sets one or multiple responsive background images.
     */
    backgroundImage?: MaybeConditionalStyle<string>;
    /**
     * Indicates if the background image should scale its container without cropping
     * and stretching, or scale as large as possible to fill the container and stretching if necessary.
     */
    backgroundFit?: BackgroundFit;
    /**
     * Sets the initial position of the background image.
     *
     * @defaultValue 'center'
     */
    backgroundPosition?: BackgroundPosition;
    /**
     * Sets how background image are repeated.
     *
     * @defaultValue 'noRepeat'
     */
    backgroundRepeat?: BackgroundRepeat;
}
export interface BorderProps {
    /**
     * Adjust the border style.
     *
     * To shorten the code, it is possible to specify all the border style properties in one property.
     *
     * For example:
     *
     * - `base` means blockStart, inlineEnd, blockEnd and inlineStart border styles are `base`
     *
     * - `['base', 'none']` means blockStart and blockEnd border styles are `base`, inlineStart and inlineEnd border styles are `none`
     *
     * - `['base', 'none', 'dotted', 'base']` means blockStart border style is `base`, inlineEnd border style is `none`, blockEnd border style is `dotted` and  blockStart border style is `base`
     */
    border?: MaybeResponsiveConditionalStyle<MaybeShorthandProperty<BorderStyle>>;
    /**
     * Adjust the border width.
     *
     * To shorten the code, it is possible to specify all the border width properties in one property.
     *
     * For example:
     *
     * - `base` means blockStart, inlineEnd, blockEnd and inlineStart border widths are `base`
     *
     * - `['base', 'medium']` means blockStart and blockEnd border widths are `base`, inlineStart and inlineEnd border widths are `medium`
     *
     * - `['base', 'medium', 'medium', 'base']` means blockStart border width is `base`, inlineEnd border width is `medium`, blockEnd border width is `medium` and  blockStart border width is `base`
     */
    borderWidth?: MaybeResponsiveConditionalStyle<MaybeShorthandProperty<BorderWidth>>;
}
export interface CornerProps {
    /**
     * @private
     *
     * Adjust the border radius.
     *
     * Provide a single value to apply the same border radius to all four corners, two values to apply different border radii to opposing corners, or four values to apply different border radii to each individual corner.
     *
     * For example:
     *
     * - `base` means all 4 border radii are `base`
     *
     * - `['base', 'none']` means the StartStart and EndEnd border radii are `base`, StartEnd and EndStart border radii are `none`.
     *    When the context’s language direction is left to right, StartStart and EndEnd borders are the top left and bottom right borders
     *    while StartEnd and EndStart borders are the top right and bottom left borders.
     *
     * - `['base', 'none', 'small', 'base']` means StartStart border radius is `base`, StartEnd border radius is `none`, EndEnd border radius is `small` and  EndStart border radius is `base`
     */
    borderRadius?: MaybeResponsiveConditionalStyle<MaybeShorthandProperty<CornerRadius>>;
    /**
     * Adjust the corner radius.
     *
     * Provide a single value to apply the same corner radius to all four corners, two values to apply different corner radii to opposing corners, or four values to apply different corner radii to each individual corner.
     *
     * For example:
     *
     * - `base` means all 4 corner radii are `base`
     *
     * - `['base', 'none']` means the StartStart and EndEnd corner radii are `base`, StartEnd and EndStart corner radii are `none`.
     *    When the context’s language direction is left to right, StartStart and EndEnd corners are the top left and bottom right corners
     *    while StartEnd and EndStart corners are the top right and bottom left corners.
     *
     * - `['base', 'none', 'small', 'base']` means StartStart corner radius is `base`, StartEnd corner radius is `none`, EndEnd corner radius is `small` and  EndStart corner radius is `base`
     *
     * A `borderRadius` alias is available for this property. When both are specified, `cornerRadius` takes precedence.
     */
    cornerRadius?: MaybeResponsiveConditionalStyle<MaybeShorthandProperty<CornerRadius>>;
}
export interface SizingProps {
    /**
     * Adjust the maximum block size.
     *
     * `number`: size in pixels.
     *
     * `` `${number}%` ``: size in percentages.
     *
     * `fill`: takes all the available space.
     *
     * See [MDN explanation of maxBlockSize](https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size).
     */
    maxBlockSize?: MaybeResponsiveConditionalStyle<number | `${number}%` | 'fill'>;
    /**
     * Adjust the maximum inline size.
     *
     * `number`: size in pixels.
     *
     * `` `${number}%` ``: size in percentages.
     *
     * `fill`: takes all the available space.
     *
     * See [MDN explanation of maxInlineSize](https://developer.mozilla.org/en-US/docs/Web/CSS/max-inline-size).
     */
    maxInlineSize?: MaybeResponsiveConditionalStyle<number | `${number}%` | 'fill'>;
    /**
     * Adjust the minimum inline size.
     *
     * `number`: size in pixels.
     *
     * `` `${number}%` ``: size in percentages.
     *
     * `fill`: takes all the available space.\
     *
     * See [MDN explanation of minInlineSize](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size).
     */
    minInlineSize?: MaybeResponsiveConditionalStyle<number | `${number}%` | 'fill'>;
    /**
     * Adjust the block size.
     *
     * `number`: size in pixels.
     *
     * `` `${number}%` ``: size in percentages.
     *
     * `fill`: takes all the available space.
     *
     * See [MDN explanation of minBlockSize](https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size).
     */
    minBlockSize?: MaybeResponsiveConditionalStyle<number | `${number}%` | 'fill'>;
}
export interface SpacingProps {
    /**
     * Adjust the padding.
     *
     * To shorten the code, it is possible to specify all the padding properties in one property.
     *
     *
     * Examples:
     *
     * - `base` means blockStart, inlineEnd, blockEnd and inlineStart paddings are `base`
     *
     * - [`base`, `none`] means blockStart and blockEnd paddings are `base`, inlineStart and inlineEnd paddings are `none`
     *
     * - [`base`, `none`, `loose`, `tight`] means blockStart padding is `base`, inlineEnd padding is `none`, blockEnd padding is `loose` and blockStart padding is `tight`
     */
    padding?: MaybeResponsiveConditionalStyle<MaybeShorthandProperty<Spacing>>;
}
export type AccessibilityRole = 
/** Used to indicate the primary content. */
'main'
/** Used to indicate the component is a header. */
 | 'header'
/** Used to display information such as copyright information, navigation links, and privacy statements. */
 | 'footer'
/** Used to indicate a generic section. */
 | 'section'
/** Used to designate a supporting section that relates to the main content. */
 | 'complementary'
/** Used to identify major groups of links used for navigating. */
 | 'navigation'
/** Used to identify a list of ordered items. */
 | 'orderedList'
/** Used to identify an item inside a list of items. */
 | 'listItem'
/** Used to identify a list of unordered items. */
 | 'unorderedList'
/** Used to indicates the component acts as a divider that separates and distinguishes sections of content. */
 | 'separator'
/** Used to define a live region containing advisory information for the user that is not important enough to be an alert. */
 | 'status'
/** Used for important, and usually time-sensitive, information. */
 | 'alert'
/** Used to indicate that an image is decorative and should be hidden from assistive technologies. */
 | 'decorative'
/** Used to strip the semantic meaning of an element, but leave the visual styling intact. */
 | 'presentation';
export type NonPresentationalAccessibilityRole = 
/** Used to indicate the primary content. */
'main'
/** Used to indicate the component is a header. */
 | 'header'
/** Used to display information such as copyright information, navigation links, and privacy statements. */
 | 'footer'
/** Used to indicate a generic section. */
 | 'section'
/** Used to designate a supporting section that relates to the main content. */
 | 'complementary'
/** Used to identify major groups of links used for navigating. */
 | 'navigation'
/** Used to identify a list of ordered items. */
 | 'orderedList'
/** Used to identify an item inside a list of items. */
 | 'listItem'
/** Used to identify a list of unordered items. */
 | 'unorderedList'
/** Used to indicates the component acts as a divider that separates and distinguishes sections of content. */
 | 'separator'
/** Used to define a live region containing advisory information for the user that is not important enough to be an alert. */
 | 'status'
/** Used for important, and usually time-sensitive, information. */
 | 'alert';
export type ViewLikeAccessibilityRole = NonPresentationalAccessibilityRole | [NonPresentationalAccessibilityRole, NonPresentationalAccessibilityRole];
export type ButtonAccessibilityRole = 'button' | 'submit';
export type TextAccessibilityRole = 
/**
 * Indicate the text is contact information. Typically used for addresses.
 */
'address'
/**
 * Indicate the text has been deleted. Typically used for discounted prices.
 */
 | 'deletion'
/**
 * Indicate the text is marked or highlighted and relevant to the buyer’s current action.
 * Typically used to indicate the characters that matched a search query.
 */
 | 'marking'
/**
 * Indicate the text is an abbreviation or acronym. Use the `for` option to
 * provide a description of the abbreviation.
 */
 | {
    type: 'abbreviation';
    for?: string;
}
/**
 * Override the text directionality. Typically used for email and phone numbers.
 */
 | {
    type: 'directional-override';
    direction: 'ltr' | 'rtl';
}
/**
 * Indicate the text is a date, a time or a duration. Use the `machineReadable` option
 * to help browsers, tools or software understand the human-readable date. The valid
 * format for `machineReadable` can be found here:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#Valid_datetime_Values
 */
 | {
    type: 'datetime';
    machineReadable?: string;
}
/**
 * Indicate emphatic stress. Typically for words that have a stressed emphasis compared to surrounding text.
 *
 * In an HTML host, the text will be rendered in a `<em>` tag.
 */
 | 'stress'
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
 */
 | 'strong';
export type Status = 
/**
 * Use to convey general information or actions that aren’t critical or tied to
 * a particular action.
 */
'info'
/**
 * Use rarely, only if you need additional visual confirmation that a
 * non-standard action has been completed successfully, for example adding an
 * item to an order as an upsell.
 */
 | 'success'
/**
 * Use to display information that needs attention or that customers should
 * take action on. Seeing these banners can be stressful for customers so be
 * cautious about using them. Should not block progress to next step.
 */
 | 'warning'
/**
 * Use to communicate problems that have to be resolved immediately for
 * customers to complete a task. For example, using a different payment method
 * if card details couldn't be processed. Seeing these banners can be stressful
 * for customers so be cautious about using them.
 */
 | 'critical';
export type Size = 'extraSmall' | 'small' | 'base' | 'large' | 'extraLarge' | 'fill';
export type Spacing = 'none' | 'extraTight' | 'tight' | 'base' | 'loose' | 'extraLoose';
export type Alignment = 'start' | 'center' | 'end';
export type InlineAlignment = 'start' | 'center' | 'end';
export type BlockAlignment = Alignment | 'baseline';
export type Background = 'transparent' | 'base' | 'subdued';
export type BackgroundFit = 'cover' | 'contain';
export type BackgroundPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';
export type BackgroundRepeat = 'repeat' | 'noRepeat';
export type Appearance = 
/** Takes the default color for the element set within the theme*/
'base'
/** Conveys emphasis and draws attention to the element.*/
 | 'accent'
/** Conveys that the element is decorative. It takes the `decorative` color set within the theme.*/
 | 'decorative'
/**
 * Conveys that the element is pressable, hoverable or otherwise interactive.
 * @deprecated Use `accent` instead.
 */
 | 'interactive'
/** Conveys a subdued or disabled state for the element.*/
 | 'subdued'
/** Conveys that the element is informative or has information.*/
 | 'info'
/** Convey a successful interaction.*/
 | 'success'
/** Convey something needs attention or an action needs to be taken.*/
 | 'warning'
/** Conveys a problem has arisen.*/
 | 'critical'
/** Takes the color of its parent.*/
 | 'monochrome';
export type Direction = 'inline' | 'block';
export type Fit = 
/**
 * Image maintains its aspect ratio while fitting within the frame.
 */
'cover'
/**
 * Image maintains its aspect ratio while filling the frame.
 * If the image is larger than the frame, then it will be cropped.
 */
 | 'contain';
export type GridItemSize = 'auto' | 'fill' | number | `${number}fr` | `${number}%`;
export type Columns = GridItemSize[] | GridItemSize;
export type Rows = GridItemSize[] | GridItemSize;
/**
 * Use to emphasize a word or a group of words.
 */
export type Emphasis = 
/**
 * Set the text in italic.
 *
 * Combine with an `accessibilityRole` of `offset` or `stress`
 * to add more meaning to the text.
 */
'italic'
/**
 * Set the text in bold.
 *
 * Combine with an `accessibilityRole` of `strong`
 * to add more meaning to the text.
 */
 | 'bold';
/**
 * Takes a base type (Base) and a list of accepted combinations of
 * its properties (AcceptedCombinations) and returns a new type
 * that only allows the properties listed in AcceptedCombinations
 * to be used together.
 *
 * Example:
 *
 * We want to accept either aspectRatio or width and height on a type,
 * but not both simultaneously:
 *
 * type BaseDimensions = {
 *   aspectRatio: number,
 *   height: number,
 *   width: number,
 * };
 *
 * type OneDimension = MultiPick<BaseDimensions, ['height' | 'width', 'aspectRatio']>;
 *
 * The OneDimension type would be equivalent to:
 *
 * {
 *   aspectRatio?: number,
 *   height?: never,
 *   width?: never,
 * } | {
 *   aspectRatio?: never,
 *   height?: number,
 *   width?: number,
 * }
 */
export type MultiPick<Base, AcceptedCombinations extends (keyof Base)[]> = {
    [Combination in keyof AcceptedCombinations]: {
        [Accepted in AcceptedCombinations[Combination] as Accepted extends keyof Base ? Accepted : never]?: Accepted extends keyof Base ? Base[Accepted] : never;
    } & {
        [NotAccepted in Exclude<keyof Base, AcceptedCombinations[Combination]>]?: never;
    };
}[number];
export type Visibility = 'hidden';
export type AccessibilityVisibility = 'hidden';
export interface VisibilityProps {
    /**
     * Changes the visibility of the element.
     *
     * `hidden` visually hides the component while keeping it accessible
     * to assistive technology, such as screen readers.
     * Hidden elements don't take any visual space contrary to CSS visibility: hidden;
     */
    visibility?: Visibility;
    /**
     * Changes the visibility of the element to assistive technologies.
     *
     * `hidden` hides the component from assistive technology (for example,
     * a screen reader) but remains visually visible.
     */
    accessibilityVisibility?: AccessibilityVisibility;
}
export interface OverlayActivatorProps {
    /**
     * An overlay component to render when the user interacts with the component.
     */
    overlay?: RemoteFragment;
}
export interface DisclosureActivatorProps {
    /**
     * The component's identifier whose visibility will be toggled when this component is actioned.
     */
    toggles?: string;
}
export type DisclosureOpen = boolean | string | string[];
export type Opacity = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
export type TextSize = Extract<Size, 'extraSmall' | 'small' | 'base' | 'large' | 'extraLarge'> | 'medium';
export interface IdProps {
    /**
     * A unique identifier for the component.
     */
    id?: string;
}
export interface InteractionProps {
    /**
     * ID of a component that should respond to activations (e.g. clicks) on this pressable.
     *
     * See `activateAction` for how to control the behavior of the target.
     *
     */
    activateTarget?: string;
    /**
     * Sets the action the `activateTarget` should take when this pressable is activated.
     *
     * Supported actions by component:
     *
     * | Component     | Supported Actions | Default ('auto')  |
     * |---------------|-------------------|-------------------|
     * | [`ClipboardItem`](https://shopify.dev/docs/api/checkout-ui-extensions/latest/clipboarditem) | 'copy'            | 'copy'            |
     *
     * @default 'auto' - a default action for the target component.
     */
    activateAction?: 'auto' | 'copy';
}
//# sourceMappingURL=shared.d.ts.map