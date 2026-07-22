import { Choice as BaseChoice } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ChoiceProps = ReactPropsFromRemoteComponentType<typeof BaseChoice>;
export declare const Choice: "Choice" & {
    readonly type?: "Choice" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").ChoiceProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Choice", import("@shopify/ui-extensions/src/surfaces/checkout").ChoiceProps, true>>;
//# sourceMappingURL=Choice.d.ts.map