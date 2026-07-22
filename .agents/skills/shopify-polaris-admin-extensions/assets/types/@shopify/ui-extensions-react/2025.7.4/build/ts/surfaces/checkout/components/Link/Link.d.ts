import { Link as BaseLink } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type LinkProps = ReactPropsFromRemoteComponentType<typeof BaseLink>;
export declare const Link: "Link" & {
    readonly type?: "Link" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").LinkProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Link", import("@shopify/ui-extensions/src/surfaces/checkout").LinkProps, true>>;
//# sourceMappingURL=Link.d.ts.map