import { LoginWithShop as BaseLoginWithShop } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type LoginWithShopProps = ReactPropsFromRemoteComponentType<typeof BaseLoginWithShop>;
export declare const LoginWithShop: "LoginWithShop" & {
    readonly type?: "LoginWithShop" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").LoginWithShopProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"LoginWithShop", import("@shopify/ui-extensions/src/surfaces/checkout").LoginWithShopProps, true>>;
//# sourceMappingURL=LoginWithShop.d.ts.map