import { CustomerAccountAction as BaseCustomerAccountAction } from '@shopify/ui-extensions/customer-account';
import { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type CustomerAccountActionProps = ReactPropsFromRemoteComponentType<typeof BaseCustomerAccountAction>;
export declare const CustomerAccountAction: "CustomerAccountAction" & {
    readonly type?: "CustomerAccountAction" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/customer-account").CustomerAccountActionProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"CustomerAccountAction", import("@shopify/ui-extensions/src/surfaces/customer-account").CustomerAccountActionProps, true>>;
//# sourceMappingURL=CustomerAccountAction.d.ts.map