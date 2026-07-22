import { POSBlockProps } from '@shopify/ui-extensions/point-of-sale';
export declare const POSBlock: "POSBlock" & {
    readonly type?: "POSBlock" | undefined;
    readonly props?: POSBlockProps | undefined;
    readonly children?: true | undefined;
} & {
    readonly type?: ("POSBlock" & {
        readonly type?: "POSBlock" | undefined;
        readonly props?: POSBlockProps | undefined;
        readonly children?: true | undefined;
    }) | undefined;
    readonly props?: POSBlockProps | undefined;
    readonly children?: ("POSBlockRow" & {
        readonly type?: "POSBlockRow" | undefined;
        readonly props?: import("@shopify/ui-extensions/point-of-sale").POSBlockRowProps | undefined;
        readonly children?: true | undefined;
    } & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"POSBlockRow", import("@shopify/ui-extensions/point-of-sale").POSBlockRowProps, true>>) | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"POSBlock" & {
    readonly type?: "POSBlock" | undefined;
    readonly props?: POSBlockProps | undefined;
    readonly children?: true | undefined;
}, POSBlockProps, "POSBlockRow" & {
    readonly type?: "POSBlockRow" | undefined;
    readonly props?: import("@shopify/ui-extensions/point-of-sale").POSBlockRowProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"POSBlockRow", import("@shopify/ui-extensions/point-of-sale").POSBlockRowProps, true>>>>;
//# sourceMappingURL=POSBlock.d.ts.map