import { Menu as BaseMenu } from '@shopify/ui-extensions/customer-account';
import { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type MenuProps = ReactPropsFromRemoteComponentType<typeof BaseMenu>;
export declare const Menu: "Menu" & {
    readonly type?: "Menu" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/customer-account").MenuProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Menu", import("@shopify/ui-extensions/src/surfaces/customer-account").MenuProps, true>>;
//# sourceMappingURL=Menu.d.ts.map