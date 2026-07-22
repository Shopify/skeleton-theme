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
import type {SpinnerProps$1} from './components-shared.d.ts';

/** @publicDocs */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: preact.Key;
    ref?: preact.Ref<TClass>;
    slot?: Lowercase<string>;
}

declare const tagName = "s-spinner";
/** @publicDocs */
export interface SpinnerElementProps extends SpinnerProps$1 {
    /**
     * A label that describes the purpose of the spinner for assistive technologies like screen readers. Provide an `accessibilityLabel` when there is no visible text that conveys a loading state.
     */
    accessibilityLabel?: SpinnerProps$1['accessibilityLabel'];
    /**
     * The size of the spinner icon.
     *
     * - `base`: The default size, suitable for most use cases.
     * - `small`: A compact size for secondary loading states.
     * - `small-100`: The smallest size for tight spaces or inline indicators.
     * - `large`: A larger size for more prominent loading states.
     * - `large-100`: The largest size for full-page or section-level loading indicators.
     *
     * @default 'base'
     */
    size?: Extract<SpinnerProps$1['size'], 'small-100' | 'small' | 'base' | 'large' | 'large-100'>;
}
/** @publicDocs */
export interface SpinnerElement extends SpinnerElementProps, Omit<HTMLElement, 'id'> {
}
/** @publicDocs */
export interface SpinnerProps extends SpinnerElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: SpinnerElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: SpinnerProps & BaseElementProps<SpinnerElement>;
        }
    }
}

export type { SpinnerElement, SpinnerElementProps, SpinnerProps };
