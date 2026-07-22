import { Pressable as BasePressable } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type PressableProps = ReactPropsFromRemoteComponentType<typeof BasePressable>;
export declare const Pressable: "Pressable" & {
    readonly type?: "Pressable" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").PressableProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Pressable", import("@shopify/ui-extensions/src/surfaces/checkout").PressableProps, true>>;
//# sourceMappingURL=Pressable.d.ts.map