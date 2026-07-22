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
import type {BadgeProps$1} from './components-shared.d.ts';

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
 * The available icon types for checkout components. This is the single source of truth for checkout icon names.
 */
declare const CHECKOUT_AVAILABLE_ICONS: readonly ["alert-circle", "alert-triangle-filled", "alert-triangle", "arrow-down", "arrow-left", "arrow-right", "arrow-up-right", "arrow-up", "bag", "bullet", "calendar", "camera", "caret-down", "cart", "cash-dollar", "categories", "check-circle", "check-circle-filled", "check", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "circle", "clipboard", "clock", "credit-card", "delete", "delivered", "delivery", "disabled", "discount", "edit", "email", "empty", "external", "filter", "geolocation", "gift-card", "globe", "grid", "image", "info-filled", "info", "list-bulleted", "location", "lock", "map", "menu-horizontal", "menu-vertical", "menu", "minus", "mobile", "note", "order", "organization", "plus", "profile", "question-circle-filled", "question-circle", "reorder", "reset", "return", "savings", "search", "settings", "star-filled", "star-half", "star", "store", "truck", "upload", "x-circle-filled", "x-circle", "x"];
/**
 * The subset of icon types available in checkout and customer account surfaces. This is a narrowed set from the full Shopify icon library, containing only the icons supported in these contexts.
 * @publicDocs
 */
export type ReducedIconTypes = (typeof CHECKOUT_AVAILABLE_ICONS)[number];

declare const tagName = "s-badge";
/** @publicDocs */
export interface BadgeElementProps extends Pick<BadgeProps$1, 'color' | 'icon' | 'iconPosition' | 'id' | 'size' | 'tone'> {
    /**
     * The size of the badge.
     *
     * - `base`: The default size, suitable for most use cases.
     * - `small`: A smaller badge for compact layouts.
     * - `small-100`: The smallest badge for tight spaces or dense lists.
     *
     * @default 'base'
     */
    size?: Extract<BadgeProps$1['size'], 'small' | 'small-100' | 'base'>;
    /**
     * The semantic meaning and color treatment of the badge.
     *
     * - `auto`: Automatically determined based on context.
     * - `neutral`: General information without specific intent.
     * - `critical`: Urgent problems or destructive actions.
     *
     * @default 'auto'
     */
    tone?: Extract<BadgeProps$1['tone'], 'auto' | 'neutral' | 'critical'>;
    /**
     * Controls the visual weight and emphasis of the badge.
     *
     * - `base`: Standard weight with moderate emphasis, suitable for most use cases.
     * - `subdued`: Reduced visual weight for less prominent or secondary badges.
     *
     * @default 'base'
     */
    color?: Extract<BadgeProps$1['color'], 'base' | 'subdued'>;
    /**
     * An icon displayed inside the badge to provide additional visual context or reinforce the badge's meaning. Set to an empty string to display no icon.
     *
     * @default ''
     */
    icon?: '' | ReducedIconTypes;
    /**
     * The position of the icon relative to the badge text.
     *
     * - `start`: Places the icon before the text.
     * - `end`: Places the icon after the text.
     */
    iconPosition?: BadgeProps$1['iconPosition'];
}
/** @publicDocs */
export interface BadgeElement extends BadgeElementProps, Omit<HTMLElement, 'id'> {
}
/** @publicDocs */
export interface BadgeProps extends BadgeElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: BadgeElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: BadgeProps & BaseElementPropsWithChildren<BadgeElement>;
        }
    }
}

export type { BadgeElement, BadgeElementProps, BadgeProps };
