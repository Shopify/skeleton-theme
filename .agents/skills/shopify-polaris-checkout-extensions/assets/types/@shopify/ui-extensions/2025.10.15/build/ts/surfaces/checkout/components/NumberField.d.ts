/** VERSION: 0.0.0 **/
/* eslint-disable import-x/extensions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable line-comment-position */
/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable no-var */
/* eslint-disable import-x/namespace */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
import type {IconProps$1, NumberFieldProps$1} from './components-shared.d.ts';

/** @publicDocs */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: preact.Key;
    ref?: preact.Ref<TClass>;
    slot?: Lowercase<string>;
}
/**
 * Used when an element has children.
 * @publicDocs
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    children?: preact.ComponentChildren;
}
/**
 * Used as the single source of truth for checkout icon types.
 *
 * @see https://github.com/Shopify/ui-api-design/blob/main/packages/ui-api-design/src/components/Icon/Icon.ts#L10
 */
declare const CHECKOUT_AVAILABLE_ICONS: readonly ["alert-circle", "alert-triangle-filled", "alert-triangle", "arrow-down", "arrow-left", "arrow-right", "arrow-up-right", "arrow-up", "bag", "bullet", "calendar", "camera", "caret-down", "cart", "cash-dollar", "categories", "check-circle", "check", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "circle", "clipboard", "clock", "credit-card", "delete", "delivered", "delivery", "disabled", "discount", "edit", "email", "empty", "external", "filter", "geolocation", "gift-card", "globe", "grid", "image", "info-filled", "info", "list-bulleted", "location", "lock", "map", "menu-horizontal", "menu-vertical", "menu", "minus", "mobile", "note", "order", "organization", "plus", "profile", "question-circle-filled", "question-circle", "reorder", "reset", "return", "savings", "search", "settings", "star-filled", "star-half", "star", "store", "truck", "upload", "x-circle-filled", "x-circle", "x"];
/** @publicDocs */
export type ReducedIconTypes = (typeof CHECKOUT_AVAILABLE_ICONS)[number];
/**
 * An event type that narrows the `currentTarget` to the specific HTML element associated with the custom element tag. This provides type-safe event handling in callback listeners.
 * @publicDocs
 */
export type CallbackEvent<TTagName extends keyof HTMLElementTagNameMap, TEvent extends Event = Event> = TEvent & {
    currentTarget: HTMLElementTagNameMap[TTagName];
};
/**
 * A typed event listener for custom element events. The listener receives a `CallbackEvent` with the correct `currentTarget` type for the associated custom element tag.
 * @publicDocs
 */
export type CallbackEventListener<TTagName extends keyof HTMLElementTagNameMap, TData = object> = (EventListener & {
    (event: CallbackEvent<TTagName, Event> & TData): void;
}) | null;

declare const tagName$1 = "s-icon";
/** @publicDocs */
export interface IconProps extends Pick<IconProps$1, 'id' | 'size' | 'tone' | 'type'> {
    tone?: Extract<IconProps$1['tone'], 'auto' | 'neutral' | 'info' | 'success' | 'warning' | 'critical' | 'custom'>;
    size?: Extract<IconProps$1['size'], 'small-200' | 'small-100' | 'small' | 'base' | 'large' | 'large-100'>;
    type?: '' | ReducedIconTypes;
}
/** @publicDocs */
export interface IconElement extends IconProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$1]: IconElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$1]: IconProps & BaseElementProps<IconElement>;
        }
    }
}

declare const tagName = "s-number-field";
/** @publicDocs */
export interface NumberFieldElementProps extends Pick<NumberFieldProps$1, 'autocomplete' | 'controls' | 'defaultValue' | 'disabled' | 'error' | 'icon' | 'inputMode' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'max' | 'min' | 'name' | 'prefix' | 'readOnly' | 'required' | 'step' | 'suffix' | 'value'> {
    icon?: IconProps['type'];
    /**
     * @deprecated Use `label` instead.
     * @private
     */
    placeholder?: string;
}
/** @publicDocs */
export interface NumberFieldEvents extends Pick<NumberFieldProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
/** @publicDocs */
export interface NumberFieldElementEvents {
    /**
<<<<<<< HEAD
     * A callback fired when the element loses focus. Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
     */
    blur?: CallbackEventListener<typeof tagName>;
    /**
     * Callback when the user has **finished editing** a field, for example, once they have blurred the field.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
     */
    change?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the element receives focus. Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
=======
     * A callback fired when the number field value changes.
     *
     * Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
     */
    change?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the user inputs data into the number field.
>>>>>>> 8763c703b (Improve Forms component descriptions to match admin quality)
     *
     * Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
     */
    input?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the number field loses focus.
     *
     * Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
     */
    blur?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the number field receives focus.
     *
     * Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
     */
    focus?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface NumberFieldElementSlots {
    /**
     * Additional interactive content displayed within the field.
     *
     * Accepts button and clickable components with text content only. Other component types or complex layouts are not supported.
     */
    accessory?: HTMLElement;
}
/** @publicDocs */
export interface NumberFieldElement extends NumberFieldElementProps, Omit<HTMLElement, 'id' | 'inputMode' | 'onblur' | 'onchange' | 'onfocus' | 'oninput' | 'prefix'> {
    onblur: NumberFieldEvents['onBlur'];
    onchange: NumberFieldEvents['onChange'];
    onfocus: NumberFieldEvents['onFocus'];
    oninput: NumberFieldEvents['onInput'];
}
/** @publicDocs */
export interface NumberFieldProps extends NumberFieldElementProps, NumberFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: NumberFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: NumberFieldProps & BaseElementPropsWithChildren<NumberFieldElement>;
        }
    }
}

export type { NumberFieldElement, NumberFieldElementEvents, NumberFieldElementProps, NumberFieldElementSlots, NumberFieldEvents, NumberFieldProps };
