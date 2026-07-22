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
import type {SkeletonParagraphProps$1} from './components-shared.d.ts';

/** @publicDocs */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: preact.Key;
    ref?: preact.Ref<TClass>;
    slot?: Lowercase<string>;
}

declare const tagName = "s-skeleton-paragraph";
/** @publicDocs */
export interface SkeletonParagraphProps extends SkeletonParagraphProps$1 {
}
/** @publicDocs */
export interface SkeletonParagraphElement extends SkeletonParagraphProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: SkeletonParagraphElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: SkeletonParagraphProps & BaseElementProps<SkeletonParagraphElement>;
        }
    }
}

export type { SkeletonParagraphElement, SkeletonParagraphProps };
