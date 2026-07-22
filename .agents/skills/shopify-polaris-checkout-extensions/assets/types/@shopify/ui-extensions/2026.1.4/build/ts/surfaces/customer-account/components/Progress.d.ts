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
import type {ProgressProps$1} from './components-shared.d.ts';

/** @publicDocs */
export interface BaseElementProps<TClass = HTMLElement> {
    key?: preact.Key;
    ref?: preact.Ref<TClass>;
    slot?: Lowercase<string>;
}

declare const tagName = "s-progress";
/** @publicDocs */
export interface ProgressElementProps extends Pick<ProgressProps$1, 'accessibilityLabel' | 'id' | 'max' | 'tone' | 'value'> {
    /**
     * A label announced by assistive technologies that describes what is progressing. Use this to provide context about the ongoing task, such as "Loading order details" or "Uploading file".
     */
    accessibilityLabel?: ProgressProps$1['accessibilityLabel'];
    /**
     * The total amount of work the task requires. Must be a value greater than `0` and a valid floating point number.
     *
     * Learn more about the [max attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#max).
     *
     * @default 1
     */
    max?: ProgressProps$1['max'];
    /**
     * The semantic meaning and color treatment of the progress indicator.
     *
     * - `auto`: Automatically determined based on context.
     * - `critical`: Indicates an urgent or error state requiring immediate attention.
     *
     * @default 'auto'
     */
    tone?: Extract<ProgressProps$1['tone'], 'auto' | 'critical'>;
    /**
     * How much of the task has been completed. Must be a valid floating point number between `0` and `max`, or between `0` and `1` if `max` is omitted. When no value is set, the progress bar is indeterminate, indicating an ongoing activity with no estimated completion time.
     *
     * Learn more about the [value attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#value).
     */
    value?: ProgressProps$1['value'];
}
/** @publicDocs */
export interface ProgressElement extends ProgressElementProps, Omit<HTMLElement, 'id'> {
}
/** @publicDocs */
export interface ProgressProps extends ProgressElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ProgressElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: ProgressProps & BaseElementProps<ProgressElement>;
        }
    }
}

export type { ProgressElement, ProgressElementProps, ProgressProps };
