import { ListItem as BaseListItem } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ListItemProps = ReactPropsFromRemoteComponentType<typeof BaseListItem>;
export declare const ListItem: "ListItem" & {
    readonly type?: "ListItem" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").ListItemProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"ListItem", import("@shopify/ui-extensions/src/surfaces/checkout").ListItemProps, true>>;
//# sourceMappingURL=ListItem.d.ts.map