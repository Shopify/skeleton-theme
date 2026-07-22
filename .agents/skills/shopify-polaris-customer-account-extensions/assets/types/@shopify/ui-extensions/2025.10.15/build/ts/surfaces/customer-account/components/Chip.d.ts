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
import type {ChipProps$1} from './components-shared.d.ts';

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

declare const tagName = "s-chip";
/** @publicDocs */
export interface ChipElementProps extends Pick<ChipProps$1, 'accessibilityLabel' | 'id'> {
}
/** @publicDocs */
export interface ChipElementSlots {
    /**
     * The graphic to display inside of the chip.
     *
     * Only `s-icon` element and its `type` attribute are supported.
     */
    graphic?: HTMLElement;
}
/** @publicDocs */
export interface ChipProps extends ChipElementProps {
}
/** @publicDocs */
export interface ChipElement extends ChipProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ChipElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: ChipProps & BaseElementPropsWithChildren<ChipElement>;
        }
    }
}

export type { ChipElement, ChipElementProps, ChipElementSlots, ChipProps };
