import { AccessibilityRoleProps, GlobalProps, SizingProps, PaddingProps, GapProps, CrossAxisAlignment, MainAxisAlignment, AccessibilityLabelProps } from '../shared';
export interface BlockStackProps extends AccessibilityRoleProps, AccessibilityLabelProps, Pick<GapProps, 'gap' | 'blockGap' | 'rowGap'>, GlobalProps, SizingProps, PaddingProps {
    /**
  
    /**
     * Position children along the main axis
     *
     * @defaultValue 'start'
     */
    inlineAlignment?: CrossAxisAlignment;
    /**
     * Position children along the cross axis
     *
     * @defaultValue 'start'
     */
    blockAlignment?: MainAxisAlignment;
}
export declare const BlockStack: "BlockStack" & {
    readonly type?: "BlockStack" | undefined;
    readonly props?: BlockStackProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=BlockStack.d.ts.map