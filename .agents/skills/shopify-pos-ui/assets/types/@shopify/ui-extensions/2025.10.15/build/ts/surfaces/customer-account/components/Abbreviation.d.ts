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
import type {AbbreviationProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-abbreviation";
/** @publicDocs */
export interface AbbreviationProps extends Pick<AbbreviationProps$1, 'title' | 'id'> {
}
/** @publicDocs */
export interface AbbreviationElement extends AbbreviationProps, Omit<HTMLElement, 'id' | 'title'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: AbbreviationElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: AbbreviationProps & BaseElementPropsWithChildren<AbbreviationElement>;
        }
    }
}

export type { AbbreviationElement, AbbreviationProps };
