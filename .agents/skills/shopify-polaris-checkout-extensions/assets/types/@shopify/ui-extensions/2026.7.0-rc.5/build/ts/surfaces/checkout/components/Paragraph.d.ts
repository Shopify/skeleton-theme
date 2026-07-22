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
import type {ParagraphProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-paragraph";
/** @publicDocs */
export interface ParagraphElementProps extends Pick<ParagraphProps$1, 'accessibilityVisibility' | 'color' | 'dir' | 'id' | 'lang' | 'tone' | 'type'> {
    color?: Extract<ParagraphProps$1['color'], 'subdued' | 'base'>;
    tone?: Extract<ParagraphProps$1['tone'], 'auto' | 'info' | 'success' | 'warning' | 'critical' | 'neutral' | 'custom'>;
    /**
     * The semantic type and styling treatment for the paragraph content.
     *
     * Other presentation properties on `s-paragraph` override the default styling.
     *
     * - `paragraph`: A semantic type that indicates the text is a structural grouping of related content.
     * - `small`: A semantic type that indicates the text is considered less important than the main content, but is still necessary for the reader to understand.
     *
     * @default 'paragraph'
     */
    type?: Extract<ParagraphProps$1['type'], 'paragraph' | 'small'>;
}
export interface ParagraphElement extends ParagraphElementProps, Omit<HTMLElement, 'id' | 'dir' | 'lang'> {
}
export interface ParagraphProps extends ParagraphElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ParagraphElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: ParagraphProps & BaseElementPropsWithChildren<ParagraphElement>;
        }
    }
}

export type { ParagraphElement, ParagraphElementProps, ParagraphProps };
