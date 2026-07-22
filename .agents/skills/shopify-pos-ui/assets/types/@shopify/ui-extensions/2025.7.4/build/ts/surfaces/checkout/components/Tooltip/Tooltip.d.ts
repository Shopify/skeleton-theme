import type { IdProps } from '../shared';
export interface TooltipProps extends IdProps {
}
/**
 * Tooltips are floating labels that briefly explain the function of a user interface element.
 * They must be specified inside the `overlay` prop of an activator component.
 * Currently, activator components are `Button`, `Link`, and `Pressable`.
 *
 * The library automatically applies the [WAI-ARIA Tooltip Widget pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) to both the activator and the tooltip content.
 * Expect screen readers to read the tooltip content when the user focuses the activator.
 */
export declare const Tooltip: "Tooltip" & {
    readonly type?: "Tooltip" | undefined;
    readonly props?: TooltipProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Tooltip.d.ts.map