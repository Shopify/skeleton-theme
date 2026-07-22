import { List as BaseList } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ListProps = ReactPropsFromRemoteComponentType<typeof BaseList>;
export declare const List: "List" & {
    readonly type?: "List" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").ListProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"List", import("@shopify/ui-extensions/src/surfaces/checkout").ListProps, true>>;
//# sourceMappingURL=List.d.ts.map