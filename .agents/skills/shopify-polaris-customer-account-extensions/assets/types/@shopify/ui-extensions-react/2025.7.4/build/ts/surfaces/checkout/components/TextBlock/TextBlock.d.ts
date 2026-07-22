import { TextBlock as BaseTextBlock } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type TextBlockProps = ReactPropsFromRemoteComponentType<typeof BaseTextBlock>;
export declare const TextBlock: "TextBlock" & {
    readonly type?: "TextBlock" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").TextBlockProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"TextBlock", import("@shopify/ui-extensions/src/surfaces/checkout").TextBlockProps, true>>;
//# sourceMappingURL=TextBlock.d.ts.map