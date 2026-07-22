import { RemoteFragment } from '@remote-ui/core';
import { GlobalProps, Tone } from '../shared';
export interface BannerProps extends GlobalProps {
    /**
     * Message to display inside the banner
     */
    title?: string;
    /**
     * Adjusts the color and icon of the banner
     */
    tone?: Tone;
    /**
     * Whether or not the banner can be dismissed
     */
    dismissible?: boolean;
    /**
     * Function invoked when the banner is dismissed
     */
    onDismiss?: () => void;
    /**
     * Sets the Primary action button of the container. This component must be a button component.
     */
    primaryAction?: RemoteFragment;
    /**
     * Sets the Secondary action button of the container. This component must be a button component.
     */
    secondaryAction?: RemoteFragment;
}
export declare const Banner: "Banner" & {
    readonly type?: "Banner" | undefined;
    readonly props?: BannerProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Banner.d.ts.map