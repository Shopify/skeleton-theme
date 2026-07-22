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
import type {TextProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-text";
/** @publicDocs */
export interface TextElementProps extends Pick<TextProps$1, 'accessibilityVisibility' | 'color' | 'dir' | 'display' | 'id' | 'lang' | 'tone' | 'type'> {
    color?: Extract<TextProps$1['color'], 'subdued' | 'base'>;
    tone?: Extract<TextProps$1['tone'], 'auto' | 'neutral' | 'info' | 'success' | 'warning' | 'critical' | 'custom'>;
    /**
     * The semantic type and styling treatment for the text content.
     *
     * Other presentation properties on `s-text` override the default styling.
     *
     * - `address`: A semantic type that indicates the text is contact information. Typically used for addresses.
     * - `redundant`: A semantic type that indicates the text is no longer accurate or no longer relevant.
     * - `mark`: A semantic type that indicates the text is marked or highlighted.
     * - `emphasis`: A semantic type that indicates emphatic stress.
     * - `offset`: A semantic type that indicates an offset from the normal prose.
     * - `strong`: A semantic type that indicates strong importance, seriousness, or urgency.
     * - `small`: A semantic type that indicates less important text.
     * - `generic`: No additional semantics or styling is applied.
     *
     * @default 'generic'
     */
    type?: Extract<TextProps$1['type'], 'address' | 'redundant' | 'mark' | 'emphasis' | 'offset' | 'strong' | 'small' | 'generic'>;
}
/** @publicDocs */
export interface TextElement extends TextElementProps, Omit<HTMLElement, 'id' | 'dir' | 'lang'> {
}
/** @publicDocs */
export interface TextProps extends TextElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: TextElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: TextProps & BaseElementPropsWithChildren<TextElement>;
        }
    }
}

export type { TextElement, TextElementProps, TextProps };
