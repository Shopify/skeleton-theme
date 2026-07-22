import { ClipboardItem as BaseClipboardItem } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ClipboardItemProps = ReactPropsFromRemoteComponentType<typeof BaseClipboardItem>;
export declare const ClipboardItem: "ClipboardItem" & {
    readonly type?: "ClipboardItem" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").ClipboardItemProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"ClipboardItem", import("@shopify/ui-extensions/src/surfaces/checkout").ClipboardItemProps, true>>;
//# sourceMappingURL=ClipboardItem.d.ts.map