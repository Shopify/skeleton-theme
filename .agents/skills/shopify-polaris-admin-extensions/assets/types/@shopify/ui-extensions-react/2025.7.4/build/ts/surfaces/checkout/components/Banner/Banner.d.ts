import { Banner as BaseBanner } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type BannerProps = ReactPropsFromRemoteComponentType<typeof BaseBanner>;
export declare const Banner: "Banner" & {
    readonly type?: "Banner" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").BannerProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Banner", import("@shopify/ui-extensions/src/surfaces/checkout").BannerProps, true>>;
//# sourceMappingURL=Banner.d.ts.map