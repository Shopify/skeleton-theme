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
import type {ClickableProps$1,BorderSizeKeyword, BorderStyleKeyword,ColorKeyword,MaybeAllValuesShorthandProperty} from './components-shared.d.ts';

/**
 * The subset of border size values available for this component.
 *
 * - `base`: Standard border width.
 * - `large`: Thick border for strong emphasis.
 * - `large-100`: Extra thick border for maximum prominence.
 * - `large-200`: The thickest available border.
 * - `none`: No border.
 */
export type ReducedBorderSizeKeyword = Extract<BorderSizeKeyword, 'none' | 'base' | 'large' | 'large-100' | 'large-200'>;
/**
 * The subset of border color values available for this component.
 *
 * - `base`: The standard border color for most contexts.
 */
export type ReducedColorKeyword = Extract<ColorKeyword, 'base'>;
/**
 * A shorthand type for specifying border properties. Accepts a border size, or a combination of size and color, or size, color, and style.
 */
export type BorderShorthand = ReducedBorderSizeKeyword | `${ReducedBorderSizeKeyword} ${ReducedColorKeyword}` | `${ReducedBorderSizeKeyword} ${ReducedColorKeyword} ${BorderStyleKeyword}`;
/**
 * Used when an element does not have children.
 */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: preact.Key;
    ref?: preact.Ref<TClass>;
    slot?: Lowercase<string>;
}
/**
 * Used when an element has children.
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    children?: preact.ComponentChildren;
}
/**
 * An event type that narrows the `currentTarget` to the specific HTML element associated with the custom element tag. This provides type-safe event handling in callback listeners.
 */
export type CallbackEvent<TTagName extends keyof HTMLElementTagNameMap, TEvent extends Event = Event> = TEvent & {
    currentTarget: HTMLElementTagNameMap[TTagName];
};
/**
 * A typed event listener for custom element events. The listener receives a `CallbackEvent` with the correct `currentTarget` type for the associated custom element tag.
 */
export type CallbackEventListener<TTagName extends keyof HTMLElementTagNameMap, TData = object> = (EventListener & {
    (event: CallbackEvent<TTagName, Event> & TData): void;
}) | null;

declare const tagName = "s-clickable";
/** @publicDocs */
export interface ClickableElementProps extends Pick<ClickableProps$1, 'accessibilityLabel' | 'accessibilityVisibility' | 'background' | 'blockSize' | 'border' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'command' | 'commandFor' | 'disabled' | 'display' | 'href' | 'id' | 'inlineSize' | 'interestFor' | 'lang' | 'loading' | 'maxBlockSize' | 'maxInlineSize' | 'minBlockSize' | 'minInlineSize' | 'overflow' | 'padding' | 'paddingBlock' | 'paddingBlockEnd' | 'paddingBlockStart' | 'paddingInline' | 'paddingInlineEnd' | 'paddingInlineStart' | 'target' | 'type'> {
    background?: Extract<ClickableProps$1['background'], 'transparent' | 'subdued' | 'base'>;
    border?: BorderShorthand;
    borderWidth?: MaybeAllValuesShorthandProperty<ReducedBorderSizeKeyword> | '';
    borderRadius?: MaybeAllValuesShorthandProperty<Extract<ClickableProps$1['borderRadius'], 'none' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'max'>>;
    target?: Extract<ClickableProps$1['target'], 'auto' | '_blank'>;
    /**
     * The behavioral type of the clickable component, which determines what action it performs when activated.
     *
     * - `submit`: Submits the nearest containing form.
     * - `button`: Performs no default action, relying on the `click` event handler for behavior.
     *
     * This property is ignored if `href` or `commandFor`/`command` is set.
     *
     * @default 'button'
     */
    type?: Extract<ClickableProps$1['type'], 'submit' | 'button'>;
}
export interface ClickableEvents extends Pick<ClickableProps$1, 'onBlur' | 'onClick' | 'onFocus'> {
}
/** @publicDocs */
export interface ClickableElementEvents {
    /**
     * A callback fired when the component loses focus.
     *
     * Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
     */
    blur?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the component is clicked. This will be called before the action indicated by `type`.
     *
     * Learn more about the [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event).
     */
    click?: CallbackEventListener<typeof tagName>;
    /**
     * A callback fired when the component receives focus.
     *
     * Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
     */
    focus?: CallbackEventListener<typeof tagName>;
}
export interface ClickableElement extends ClickableElementProps, Omit<HTMLElement, 'id' | 'lang' | 'onblur' | 'onclick' | 'onfocus'> {
    onblur: ClickableEvents['onBlur'];
    onclick: ClickableEvents['onClick'];
    onfocus: ClickableEvents['onFocus'];
}
export interface ClickableProps extends ClickableElementProps, ClickableEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ClickableElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: ClickableProps & BaseElementPropsWithChildren<ClickableElement>;
        }
    }
}

export type { ClickableElement, ClickableElementEvents, ClickableElementProps, ClickableEvents, ClickableProps };
