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
import type {SectionProps$1} from './components-shared.d.ts';

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
 * @publicDocs
 */
export interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    children?: preact.ComponentChildren;
}

declare const tagName = "s-section";
/** @publicDocs */
export interface SectionElementProps extends Pick<SectionProps$1, 'accessibilityLabel' | 'heading' | 'id'> {
}
/** @publicDocs */
export interface SectionElement extends SectionElementProps, Omit<HTMLElement, 'id'> {
}
/** @publicDocs */
export interface SectionProps extends SectionElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: SectionElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: SectionProps & BaseElementPropsWithChildren<SectionElement>;
        }
    }
}

export type { SectionElement, SectionElementProps, SectionProps };
