import type { MaybeResponsiveConditionalStyle } from '../../style/types';
import type { DisclosureOpen } from '../shared';
export interface DisclosureProps {
    /**
     * For uncontrolled disclosure components, the default `open` state on the initial render.
     *
     * It's possible to specify a boolean value, a string value, or an array of string values:
     *
     * - `true` will expand all content
     * - `false` will collapse all content
     * - `string` will expand the content with the matching `id`
     * - `string[]` will expand the content with the matching `id`s
     */
    defaultOpen?: MaybeResponsiveConditionalStyle<DisclosureOpen | undefined>;
    /**
     * For controlled disclosure components, the open state. The `open` prop should be used
     * along with `onToggle` to create a controlled disclosure component.
     */
    open?: DisclosureOpen;
    /**
     * Callback fired when the open state of the disclosure changes.
     */
    onToggle?(open: string[]): void;
    /**
     * Set to 'none' to disable the default transition animation.
     */
    transition?: 'none';
}
/**
 * Disclosure is an optionally controlled component used to put long sections of information
 * under content blocks that users can expand or collapse by pressing an activator.
 * The activator can be specified as children using an action component (`Button`, `Link` or `Pressable`)
 * or `Checkbox` component.
 * The content blocks can be specified as children inside a structure component (`View`, `InlineLayout`,
 * `BlockStack`, `Grid`, etc.).
 *
 * The library automatically applies the [WAI-ARIA Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) to both the activator and the toggled content.
 */
export declare const Disclosure: "Disclosure" & {
    readonly type?: "Disclosure" | undefined;
    readonly props?: DisclosureProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Disclosure.d.ts.map