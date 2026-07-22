import { AdminAction as BaseAdminAction } from '@shopify/ui-extensions/admin';
import { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export declare const AdminAction: "AdminAction" & {
    readonly type?: "AdminAction" | undefined;
    readonly props?: import("@shopify/ui-extensions/admin").AdminActionProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"AdminAction", import("@shopify/ui-extensions/admin").AdminActionProps, true>>;
export type AdminActionProps = ReactPropsFromRemoteComponentType<typeof BaseAdminAction>;
//# sourceMappingURL=AdminAction.d.ts.map