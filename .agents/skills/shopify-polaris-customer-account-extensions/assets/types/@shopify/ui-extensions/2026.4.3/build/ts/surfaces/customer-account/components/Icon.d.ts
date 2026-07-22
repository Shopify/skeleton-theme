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
import type {IconProps$1} from './components-shared.d.ts';

/**
 * The base properties for elements that don't have children, providing essential attributes like keys and refs for component management.
 */
export interface BaseElementProps<TClass = HTMLElement> {
    /**
     * A unique identifier for this element within its parent. Used by the rendering engine for efficient reconciliation when lists change.
     */
    key?: preact.Key;
    /**
     * A reference to the underlying DOM element, typically created using `useRef()`. This allows you to access and manipulate the DOM element directly in your component logic.
     */
    ref?: preact.Ref<TClass>;
    /**
     * Assigns this element to a named slot in a parent component that uses slot-based composition patterns.
     */
    slot?: Lowercase<string>;
}
/**
 * The complete list of [icon names](https://github.com/Shopify/ui-api-design/blob/main/packages/ui-api-design/src/components/Icon/Icon.ts#L10) available in checkout and customer account surfaces. These icons are drawn from Shopify's design system and cover common UI patterns like navigation, status indicators, actions, and commerce concepts.
 */
declare const CHECKOUT_AVAILABLE_ICONS: readonly ["alert-circle", "alert-triangle-filled", "alert-triangle", "arrow-down", "arrow-left", "arrow-right", "arrow-up-right", "arrow-up", "bag", "bullet", "calendar", "camera", "caret-down", "cart", "cash-dollar", "categories", "check-circle", "check-circle-filled", "check", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "circle", "clipboard", "clock", "credit-card", "delete", "delivered", "delivery", "disabled", "discount", "edit", "email", "empty", "external", "filter", "geolocation", "gift-card", "globe", "grid", "image", "info-filled", "info", "list-bulleted", "location", "lock", "map", "menu-horizontal", "menu-vertical", "menu", "minus", "mobile", "note", "order", "organization", "plus", "profile", "question-circle-filled", "question-circle", "reorder", "reset", "return", "savings", "search", "settings", "star-filled", "star-half", "star", "store", "truck", "upload", "x-circle-filled", "x-circle", "x"];
/**
 * The subset of icon types available in checkout and customer account surfaces. This is a narrowed set from the full Shopify icon library, containing only the icons supported in these contexts.
 */
export type ReducedIconTypes = (typeof CHECKOUT_AVAILABLE_ICONS)[number];

declare const tagName = "s-icon";
/** @publicDocs */
export interface IconElementProps extends Pick<IconProps$1, 'id' | 'size' | 'tone' | 'type'> {
    /**
     * The semantic meaning and color treatment of the icon.
     *
     * - `'info'`: Informational content or helpful tips.
     * - `'auto'`: Automatically determined based on context.
     * - `'neutral'`: General information without specific intent.
     * - `'success'`: Positive outcomes or successful states.
     * - `'warning'`: Important warnings about potential issues.
     * - `'critical'`: Urgent problems or destructive actions.
     * - `'custom'`: Inherits a custom color from its parent element's CSS.
     *
     * @default 'auto'
     */
    tone?: Extract<IconProps$1['tone'], 'auto' | 'neutral' | 'info' | 'success' | 'warning' | 'critical' | 'custom'>;
    /**
     * The size of the icon.
     *
     * - `'base'`: Default size that works well for most use cases.
     * - `'small'`: Small icon for inline use within text or compact UI elements.
     * - `'small-200'`: Extra small icon for the most compact contexts.
     * - `'small-100'`: Small icon suitable for tight or dense layouts.
     * - `'large'`: Large icon for emphasis or prominent display.
     * - `'large-100'`: Extra large icon for maximum visual impact.
     *
     * @default 'base'
     */
    size?: Extract<IconProps$1['size'], 'small-200' | 'small-100' | 'small' | 'base' | 'large' | 'large-100'>;
    /**
     * The type of icon that will be displayed. You can specify an icon name from the available icon set, or use an empty string to show no icon.
     */
    type?: '' | ReducedIconTypes;
}
/**
 * The HTML element interface for the `s-icon` custom element.
 */
export interface IconElement extends IconElementProps, Omit<HTMLElement, 'id'> {
}
/**
 * The properties for the icon component when it's used in JSX.
 */
export interface IconProps extends IconElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: IconElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: IconProps & BaseElementProps<IconElement>;
        }
    }
}

export type { IconElement, IconElementProps, IconProps };
