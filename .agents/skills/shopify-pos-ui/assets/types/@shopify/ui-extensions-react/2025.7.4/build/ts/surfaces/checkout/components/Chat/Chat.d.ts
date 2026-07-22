import { Chat as BaseChat } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ChatProps = ReactPropsFromRemoteComponentType<typeof BaseChat>;
export declare const Chat: "Chat" & {
    readonly type?: "Chat" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").ChatProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Chat", import("@shopify/ui-extensions/src/surfaces/checkout").ChatProps, true>>;
//# sourceMappingURL=Chat.d.ts.map