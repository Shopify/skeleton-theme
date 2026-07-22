import { Button as BaseButton } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ButtonProps = ReactPropsFromRemoteComponentType<typeof BaseButton>;
export declare const Button: "Button" & {
    readonly type?: "Button" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").ButtonProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Button", import("@shopify/ui-extensions/src/surfaces/checkout").ButtonProps, true>>;
//# sourceMappingURL=Button.d.ts.map