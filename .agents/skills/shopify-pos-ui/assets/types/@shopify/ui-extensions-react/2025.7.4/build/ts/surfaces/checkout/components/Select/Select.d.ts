import type { SelectOptionProps as BaseSelectOptionProps } from '@shopify/ui-extensions/checkout';
import { Select as BaseSelect } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type SelectProps = ReactPropsFromRemoteComponentType<typeof BaseSelect>;
export type SelectOptionProps = BaseSelectOptionProps;
export declare const Select: "Select" & {
    readonly type?: "Select" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").SelectProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Select", import("@shopify/ui-extensions/src/surfaces/checkout").SelectProps, true>>;
//# sourceMappingURL=Select.d.ts.map