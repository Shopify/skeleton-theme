import { BlockStack as BaseBlockStack } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type BlockStackProps = ReactPropsFromRemoteComponentType<typeof BaseBlockStack>;
export declare const BlockStack: "BlockStack" & {
    readonly type?: "BlockStack" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").BlockStackProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"BlockStack", import("@shopify/ui-extensions/src/surfaces/checkout").BlockStackProps, true>>;
//# sourceMappingURL=BlockStack.d.ts.map