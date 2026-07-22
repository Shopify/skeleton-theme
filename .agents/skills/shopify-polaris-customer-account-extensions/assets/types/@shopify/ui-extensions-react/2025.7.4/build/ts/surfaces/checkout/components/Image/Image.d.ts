import { Image as BaseImage } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ImageProps = ReactPropsFromRemoteComponentType<typeof BaseImage>;
export declare const Image: "Image" & {
    readonly type?: "Image" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").ImageProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Image", import("@shopify/ui-extensions/src/surfaces/checkout").ImageProps, true>>;
//# sourceMappingURL=Image.d.ts.map