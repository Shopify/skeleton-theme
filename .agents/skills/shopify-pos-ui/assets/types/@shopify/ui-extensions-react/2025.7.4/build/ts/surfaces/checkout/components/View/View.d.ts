import { View as BaseView } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ViewProps = ReactPropsFromRemoteComponentType<typeof BaseView>;
export declare const View: "View" & {
    readonly type?: "View" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").ViewProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"View", import("@shopify/ui-extensions/src/surfaces/checkout").ViewProps, true>>;
//# sourceMappingURL=View.d.ts.map