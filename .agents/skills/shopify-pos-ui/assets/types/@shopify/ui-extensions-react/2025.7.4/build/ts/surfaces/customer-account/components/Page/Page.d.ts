import { Page as BasePage } from '@shopify/ui-extensions/customer-account';
import { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type PageProps = ReactPropsFromRemoteComponentType<typeof BasePage>;
export declare const Page: "Page" & {
    readonly type?: "Page" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/customer-account").PageProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Page", import("@shopify/ui-extensions/src/surfaces/customer-account").PageProps, true>>;
//# sourceMappingURL=Page.d.ts.map