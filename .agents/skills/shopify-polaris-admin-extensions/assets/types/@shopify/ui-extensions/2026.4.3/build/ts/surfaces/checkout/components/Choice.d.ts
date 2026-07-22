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
import type {ChoiceProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-choice";
/** @publicDocs */
export interface ChoiceElementProps extends Pick<ChoiceProps$1, 'accessibilityLabel' | 'defaultSelected' | 'disabled' | 'id' | 'selected' | 'error' | 'value'> {
}
/** @publicDocs */
export interface ChoiceElementSlots {
    /**
     * Additional text to provide context or guidance for the input.
     *
     * This text is displayed along with the input and its label
     * to offer more information or instructions to the user.
     *
     * @implementation this content should be linked to the input with an `aria-describedby` attribute.
     */
    details?: HTMLElement;
    /**
     * Secondary content for a choice.
     */
    secondaryContent?: HTMLElement;
    /**
     * Content to display when the option is selected.
     *
     * This can be used to provide additional information or options related to the choice.
     */
    selectedContent?: HTMLElement;
}
export interface ChoiceElement extends ChoiceElementProps, Omit<HTMLElement, 'id'> {
}
export interface ChoiceProps extends ChoiceElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ChoiceElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: ChoiceProps & BaseElementPropsWithChildren<ChoiceElement>;
        }
    }
}

export type { ChoiceElement, ChoiceElementProps, ChoiceElementSlots, ChoiceProps };
