import type { Alignment, Direction, IdProps, Size } from '../shared';
export interface DividerProps extends IdProps {
    /**
     * Use to create dividers with varying widths.
     *
     * @defaultValue 'small'
     */
    size?: Extract<Size, 'small' | 'base' | 'large' | 'extraLarge'>;
    /**
     * Use to specify direction of divider.
     *
     * @defaultValue 'inline'
     */
    direction?: Direction;
    /**
     * Use to specify alignment of contents of divider.
     *
     * @defaultValue 'center'
     */
    alignment?: Alignment;
}
/**
 * A divider separates content and represents a thematic break between elements.
 */
export declare const Divider: "Divider" & {
    readonly type?: "Divider" | undefined;
    readonly props?: DividerProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Divider.d.ts.map