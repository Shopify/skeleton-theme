import type { AccessibilityLabelProps, SizeScale, Tone } from '../shared';
import { IconName } from '../Icon/IconName';
interface BadgeBaseProps extends AccessibilityLabelProps {
    /**
     * Adjusts the color of the badge.
     */
    tone?: Tone;
    /**
     * Adjusts the size of the badge.
     */
    size?: Extract<SizeScale, 'small-100' | 'base'>;
}
interface BadgeIconProps {
    /**
     * Adds an icon to the badge.
     */
    icon: IconName;
    /**
     * Adjusts the position of the icon within the badge. Requires `icon` to be set.
     *
     * @defaultValue 'start'
     */
    iconPosition?: 'start' | 'end';
}
interface BadgeNoIconProps {
    icon?: never;
    iconPosition?: never;
}
export type BadgeProps = BadgeBaseProps & (BadgeIconProps | BadgeNoIconProps);
export declare const Badge: "Badge" & {
    readonly type?: "Badge" | undefined;
    readonly props?: BadgeProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=Badge.d.ts.map