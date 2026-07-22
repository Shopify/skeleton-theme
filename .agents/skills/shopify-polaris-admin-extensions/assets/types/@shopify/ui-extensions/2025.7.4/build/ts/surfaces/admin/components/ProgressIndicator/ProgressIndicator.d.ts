import { GlobalProps, SizeScale, AccessibilityLabelProps } from '../shared';
export interface ProgressIndicatorProps extends GlobalProps, AccessibilityLabelProps {
    /**
     * The size of the component.
     */
    size: SizeScale;
    /**
     * Set the color of the progress indicator.
     *
     * - `inherit` will take the color value from its parent,
     * giving the progress indicator a monochrome appearance.
     *
     * @defaultValue 'default'
     */
    tone?: 'inherit' | 'default';
    /**
     * Style of the progress indicator
     * @default 'spinner'
     */
    variant?: 'spinner';
}
export declare const ProgressIndicator: "ProgressIndicator" & {
    readonly type?: "ProgressIndicator" | undefined;
    readonly props?: ProgressIndicatorProps | undefined;
    /**
     * The size of the component.
     */
    readonly children?: true | undefined;
};
//# sourceMappingURL=ProgressIndicator.d.ts.map