import { GridItem as BaseGridItem } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type GridItemProps = ReactPropsFromRemoteComponentType<typeof BaseGridItem>;
export declare const GridItem: "GridItem" & {
    readonly type?: "GridItem" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").GridItemProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"GridItem", import("@shopify/ui-extensions/src/surfaces/checkout").GridItemProps, true>>;
//# sourceMappingURL=GridItem.d.ts.map