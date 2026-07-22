import type { IdProps, Spacing } from '../shared';
import type { MaybeResponsiveConditionalStyle } from '../../style/types';
export type Marker = 'none' | 'bullet' | 'number';
export interface ListProps extends IdProps {
    /**
     * Adjust spacing between list items
     *
     * @defaultValue 'base'
     */
    spacing?: MaybeResponsiveConditionalStyle<Spacing>;
    /**
     * Type of marker to display
     *
     * @defaultValue 'bullet'
     */
    marker?: Marker;
    /**
     * A label that describes the purpose or contents of the list. When set,
     * it will be announced to buyers using assistive technologies and will
     * provide them with more context.
     */
    accessibilityLabel?: string;
}
/**
 * Lists display a set of related content. Each list item usually begins with a bullet or a number.
 */
export declare const List: "List" & {
    readonly type?: "List" | undefined;
    readonly props?: ListProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=List.d.ts.map