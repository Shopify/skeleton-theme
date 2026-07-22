import { QRCode as BaseQRCode } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type QRCodeProps = ReactPropsFromRemoteComponentType<typeof BaseQRCode>;
export declare const QRCode: "QRCode" & {
    readonly type?: "QRCode" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").QRCodeProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"QRCode", import("@shopify/ui-extensions/src/surfaces/checkout").QRCodeProps, true>>;
//# sourceMappingURL=QRCode.d.ts.map