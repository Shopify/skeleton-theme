import { TextField as BaseTextField } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type TextFieldProps = ReactPropsFromRemoteComponentType<typeof BaseTextField>;
export declare const TextField: "TextField" & {
    readonly type?: "TextField" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").TextFieldProps<string> | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"TextField", import("@shopify/ui-extensions/src/surfaces/checkout").TextFieldProps<string>, true>>;
//# sourceMappingURL=TextField.d.ts.map