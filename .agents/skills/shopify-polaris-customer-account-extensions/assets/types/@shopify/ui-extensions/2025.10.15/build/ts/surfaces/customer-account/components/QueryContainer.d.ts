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
import type {QueryContainerProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-query-container";
/** @publicDocs */
export interface QueryContainerElementProps extends Pick<QueryContainerProps$1, 'containerName' | 'id'> {
}
/** @publicDocs */
export interface QueryContainerElement extends QueryContainerElementProps, Omit<HTMLElement, 'id'> {
}
/** @publicDocs */
export interface QueryContainerProps extends QueryContainerElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: QueryContainerElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: QueryContainerProps & BaseElementPropsWithChildren<QueryContainerElement>;
        }
    }
}

export type { QueryContainerElement, QueryContainerElementProps, QueryContainerProps };
