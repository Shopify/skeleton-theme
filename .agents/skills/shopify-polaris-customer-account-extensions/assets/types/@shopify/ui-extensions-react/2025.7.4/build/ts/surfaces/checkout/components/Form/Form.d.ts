import { Form as BaseForm } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type FormProps = ReactPropsFromRemoteComponentType<typeof BaseForm>;
export declare const Form: "Form" & {
    readonly type?: "Form" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").FormProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Form", import("@shopify/ui-extensions/src/surfaces/checkout").FormProps, true>>;
//# sourceMappingURL=Form.d.ts.map