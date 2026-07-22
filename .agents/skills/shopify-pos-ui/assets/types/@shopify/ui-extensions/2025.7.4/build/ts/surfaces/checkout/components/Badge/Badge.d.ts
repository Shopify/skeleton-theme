import type { Size, VisibilityProps } from '../shared';
import type { IconSource } from '../Icon/Icon';
type Tone = 'default' | 'critical' | 'subdued';
export interface BadgeProps extends VisibilityProps {
    /**
     * The tone of the badge being rendered. Indicates its level of importance,
     * where subdued provides the least emphasis, while critical indicates the highest level of urgency.
     *
     * @default 'default'
     */
    tone?: Tone;
    /**
     * The size of the badge being rendered.
     *
     * @default 'base'
     */
    size?: Extract<Size, 'base' | 'small'>;
    /**
     * A label that describes the purpose or contents of the element. When set,
     * it will announced to buyers using assistive technologies.
     */
    accessibilityLabel?: string;
    /**
     * The name of the icon to be displayed in the badge.
     */
    icon?: IconSource;
    /**
     * The position of the icon in relation to the text.
     *
     * @default 'start'
     */
    iconPosition?: 'start' | 'end';
}
/**
 * Use badges to highlight contextual information, like a label or a status, about an object. An object can be anything that has a status or label attributed to it.
 */
export declare const Badge: "Badge" & {
    readonly type?: "Badge" | undefined;
    readonly props?: BadgeProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=Badge.d.ts.map