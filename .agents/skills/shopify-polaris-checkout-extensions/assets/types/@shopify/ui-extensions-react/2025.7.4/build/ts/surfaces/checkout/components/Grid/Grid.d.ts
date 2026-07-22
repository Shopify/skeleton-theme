import { Grid as BaseGrid } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type GridProps = ReactPropsFromRemoteComponentType<typeof BaseGrid>;
export declare const Grid: "Grid" & {
    readonly type?: "Grid" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").GridProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Grid", import("@shopify/ui-extensions/src/surfaces/checkout").GridProps, true>>;
//# sourceMappingURL=Grid.d.ts.map