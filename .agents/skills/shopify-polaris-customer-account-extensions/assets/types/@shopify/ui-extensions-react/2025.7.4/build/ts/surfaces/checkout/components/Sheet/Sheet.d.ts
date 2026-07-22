import { Sheet as BaseSheet } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type SheetProps = ReactPropsFromRemoteComponentType<typeof BaseSheet>;
export declare const Sheet: "Sheet" & {
    readonly type?: "Sheet" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").SheetProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Sheet", import("@shopify/ui-extensions/src/surfaces/checkout").SheetProps, true>>;
//# sourceMappingURL=Sheet.d.ts.map