import { Tag as BaseTag } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type TagProps = ReactPropsFromRemoteComponentType<typeof BaseTag>;
export declare const Tag: "Tag" & {
    readonly type?: "Tag" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").TagProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Tag", import("@shopify/ui-extensions/src/surfaces/checkout").TagProps, true>>;
//# sourceMappingURL=Tag.d.ts.map