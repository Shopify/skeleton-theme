import { ResourceItem as BaseResourceItem } from '@shopify/ui-extensions/customer-account';
import { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ResourceItemProps = ReactPropsFromRemoteComponentType<typeof BaseResourceItem>;
export declare const ResourceItem: "ResourceItem" & {
    readonly type?: "ResourceItem" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/customer-account").ResourceItemProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"ResourceItem", import("@shopify/ui-extensions/src/surfaces/customer-account").ResourceItemProps, true>>;
//# sourceMappingURL=ResourceItem.d.ts.map