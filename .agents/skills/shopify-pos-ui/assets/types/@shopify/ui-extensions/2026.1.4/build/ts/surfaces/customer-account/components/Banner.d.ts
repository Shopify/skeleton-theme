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
import type {BannerProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-banner";
/** @publicDocs */
export interface BannerElementProps extends Pick<BannerProps$1, 'collapsible' | 'dismissible' | 'heading' | 'hidden' | 'id' | 'tone'> {
    /**
     * Whether the banner content can be collapsed and expanded by the user. A collapsible banner conceals child elements initially, allowing the user to expand the banner to reveal them.
     *
     * @default false
     */
    collapsible?: BannerProps$1['collapsible'];
    /**
     * Whether the banner displays a close button that allows users to dismiss it.
     *
     * When the close button is pressed, the `dismiss` event will fire,
     * then `hidden` will be set to `true`,
     * any animation will complete,
     * and the `afterhide` event will fire.
     *
     * @default false
     */
    dismissible?: BannerProps$1['dismissible'];
    /**
     * The heading text displayed at the top of the banner to summarize the message or alert.
     *
     * @default ''
     */
    heading?: BannerProps$1['heading'];
    /**
     * Controls whether the banner is visible or hidden.
     *
     * When using a controlled component pattern and the banner is `dismissible`,
     * update this property to `true` when the `dismiss` event fires.
     *
     * You can hide the banner programmatically by setting this to `true` even if it's not `dismissible`.
     *
     * @default false
     */
    hidden?: BannerProps$1['hidden'];
    /**
     * The semantic meaning and color treatment of the component. The banner is a live region and the type of status is dictated by the tone selected.
     *
     * - `info`: Informational content or helpful tips.
     * - `auto`: Automatically determined based on context.
     * - `success`: Positive outcomes or successful states.
     * - `warning`: Important warnings about potential issues.
     * - `critical`: Urgent problems or destructive actions.
     *
     * The `critical` tone creates an [assertive live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role) that is announced by screen readers immediately. The `info`, `success`, and `warning` tones create an [informative live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role) that is announced by screen readers after the current message.
     *
     * @default 'auto'
     */
    tone?: Extract<BannerProps$1['tone'], 'auto' | 'info' | 'success' | 'warning' | 'critical'>;
}
/** @publicDocs */
export interface BannerEvents extends Pick<BannerProps$1, 'onAfterHide' | 'onDismiss'> {
}
/** @publicDocs */
export interface BannerElementEvents {
    /**
     * A callback that fires when the banner has fully hidden, including after any hide animations have completed.
     *
     * The `hidden` property is `true` when this event fires.
     */
    afterhide?: CallbackEventListener<typeof tagName>;
    /**
     * A callback that fires when the banner is dismissed by the user clicking the close button.
     *
     * This doesn't fire when setting `hidden` manually.
     *
     * The `hidden` property is `false` when this event fires.
     */
    dismiss?: CallbackEventListener<typeof tagName>;
}
/** @publicDocs */
export interface BannerElement extends BannerElementProps, Omit<HTMLElement, 'id' | 'title' | 'hidden'> {
    onafterhide: BannerEvents['onAfterHide'];
    ondismiss: BannerEvents['onDismiss'];
}
/** @publicDocs */
export interface BannerProps extends BannerElementProps, BannerEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: BannerElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: BannerProps & BaseElementPropsWithChildren<BannerElement>;
        }
    }
}

export type { BannerElement, BannerElementEvents, BannerElementProps, BannerEvents, BannerProps };
