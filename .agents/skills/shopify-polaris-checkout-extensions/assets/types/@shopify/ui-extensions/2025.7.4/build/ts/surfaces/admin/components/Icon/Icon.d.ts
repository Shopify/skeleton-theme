import { IconName } from './IconName';
import { AccessibilityLabelProps } from '../shared';
export interface IconProps extends AccessibilityLabelProps {
    /**
     * Set the color of the icon.
     *
     * - `inherit` will take the color value from its parent,
     * giving the link a monochrome appearance.
     *
     * @defaultValue 'inherit'
     */
    tone?: 'inherit' | 'critical';
    /** A unique identifier for the icon. */
    id?: string;
    /**
     * Adjusts the size of the icon.
     *
     * @defaultValue 'base'
     */
    size?: 'base'
    /**
     * `fill` will take the space available in the container and keep the icon's proportion.
     */
     | 'fill';
    /**
     * Specifies the name of the icon that will be displayed.
     */
    name: IconName;
}
export type { IconName };
export declare const Icon: "Icon" & {
    readonly type?: "Icon" | undefined;
    readonly props?: IconProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Icon.d.ts.map