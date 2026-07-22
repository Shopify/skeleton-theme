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
import type {SummaryProps$1} from './components-shared.d.ts';

declare const tagName = "s-summary";
/** @publicDocs */
export interface SummaryProps extends Pick<SummaryProps$1, 'id'> {
}
/** @publicDocs */
export interface SummaryElement extends SummaryProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: SummaryElement;
    }
}
declare module 'preact' {
    interface BaseProps {
        children?: preact.ComponentChildren;
        slot?: Lowercase<string>;
    }
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: SummaryProps & BaseProps;
        }
    }
}

export type { SummaryElement, SummaryProps };
