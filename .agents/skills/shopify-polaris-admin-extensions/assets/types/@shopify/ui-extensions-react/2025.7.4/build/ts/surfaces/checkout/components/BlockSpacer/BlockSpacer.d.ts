import { BlockSpacer as BaseBlockSpacer } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type BlockSpacerProps = Omit<ReactPropsFromRemoteComponentType<typeof BaseBlockSpacer>, 'children'>;
export declare const BlockSpacer: "BlockSpacer" & {
    readonly type?: "BlockSpacer" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").BlockSpacerProps | undefined;
    readonly children?: false | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"BlockSpacer", import("@shopify/ui-extensions/src/surfaces/checkout").BlockSpacerProps, false>>;
//# sourceMappingURL=BlockSpacer.d.ts.map