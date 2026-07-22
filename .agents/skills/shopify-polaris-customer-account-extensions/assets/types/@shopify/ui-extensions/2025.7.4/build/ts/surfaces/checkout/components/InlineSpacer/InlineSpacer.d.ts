import type { MaybeResponsiveConditionalStyle } from '../../style/types';
import type { IdProps, Spacing } from '../shared';
export interface InlineSpacerProps extends IdProps {
    /**
     * Adjust size of the spacer
     *
     * @defaultValue 'base'
     **/
    spacing?: MaybeResponsiveConditionalStyle<Exclude<Spacing, 'none'>>;
}
/**
 * InlineSpacer is used to create empty inline space, typically when variable spacing
 * is needed between multiple elements.
 *
 * Note that you should favor InlineStack when spacing between all elements is the same.
 */
export declare const InlineSpacer: "InlineSpacer" & {
    readonly type?: "InlineSpacer" | undefined;
    readonly props?: InlineSpacerProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=InlineSpacer.d.ts.map