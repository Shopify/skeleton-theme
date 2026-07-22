import { ScrollView as BaseScrollView } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ScrollViewProps = ReactPropsFromRemoteComponentType<typeof BaseScrollView>;
export declare const ScrollView: "ScrollView" & {
    readonly type?: "ScrollView" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").ScrollViewProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"ScrollView", import("@shopify/ui-extensions/src/surfaces/checkout").ScrollViewProps, true>>;
//# sourceMappingURL=ScrollView.d.ts.map