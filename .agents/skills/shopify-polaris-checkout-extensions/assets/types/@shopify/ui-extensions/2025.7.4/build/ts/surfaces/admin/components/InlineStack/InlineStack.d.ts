import { AccessibilityRoleProps, GlobalProps, SizingProps, PaddingProps, GapProps, CrossAxisAlignment, MainAxisAlignment, AccessibilityLabelProps } from '../shared';
export interface InlineStackProps extends AccessibilityRoleProps, AccessibilityLabelProps, GapProps, GlobalProps, SizingProps, PaddingProps {
    /**
     * Position children along the main axis
     *
     * @defaultValue 'start'
     */
    inlineAlignment?: MainAxisAlignment;
    /**
     * Position children along the cross axis
     *
     * @defaultValue 'start'
     */
    blockAlignment?: CrossAxisAlignment;
}
export declare const InlineStack: "InlineStack" & {
    readonly type?: "InlineStack" | undefined;
    readonly props?: InlineStackProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=InlineStack.d.ts.map