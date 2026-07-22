import type { MaybeResponsiveConditionalStyle } from '../../style/types';
import type { IdProps, Spacing } from '../shared';
export interface BlockSpacerProps extends IdProps {
    /**
     * Adjust size of the spacer
     *
     * @defaultValue 'base'
     **/
    spacing?: MaybeResponsiveConditionalStyle<Spacing>;
}
/**
 * BlockSpacer is used to create empty block space, typically when variable spacing
 * is needed between multiple elements.
 *
 * Note that you should favor BlockStack when spacing between all elements is the same.
 */
export declare const BlockSpacer: "BlockSpacer" & {
    readonly type?: "BlockSpacer" | undefined;
    readonly props?: BlockSpacerProps | undefined;
    readonly children?: false | undefined;
};
//# sourceMappingURL=BlockSpacer.d.ts.map