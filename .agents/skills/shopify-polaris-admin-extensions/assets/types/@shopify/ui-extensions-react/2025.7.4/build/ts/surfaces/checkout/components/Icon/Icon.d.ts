import { Icon as BaseIcon } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type { IconSource } from '@shopify/ui-extensions/checkout';
export type IconProps = ReactPropsFromRemoteComponentType<typeof BaseIcon>;
export declare const Icon: "Icon" & {
    readonly type?: "Icon" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").IconProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Icon", import("@shopify/ui-extensions/src/surfaces/checkout").IconProps, true>>;
//# sourceMappingURL=Icon.d.ts.map