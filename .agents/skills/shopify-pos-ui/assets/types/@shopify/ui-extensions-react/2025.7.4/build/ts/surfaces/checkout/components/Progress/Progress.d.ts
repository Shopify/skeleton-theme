import { Progress as BaseProgress } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ProgressProps = ReactPropsFromRemoteComponentType<typeof BaseProgress>;
export declare const Progress: "Progress" & {
    readonly type?: "Progress" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").ProgressProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Progress", import("@shopify/ui-extensions/src/surfaces/checkout").ProgressProps, true>>;
//# sourceMappingURL=Progress.d.ts.map