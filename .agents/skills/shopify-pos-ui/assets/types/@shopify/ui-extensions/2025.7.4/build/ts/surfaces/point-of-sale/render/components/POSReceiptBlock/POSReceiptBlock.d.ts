import { QRCode } from '../QRCode/QRCode';
import { Text } from '../Text/Text';
export interface POSReceiptBlockProps {
}
export type AllowedChildrenComponents = typeof Text | typeof QRCode;
export declare const POSReceiptBlock: "POSReceiptBlock" & {
    readonly type?: "POSReceiptBlock" | undefined;
    readonly props?: POSReceiptBlockProps | undefined;
    readonly children?: AllowedChildrenComponents | undefined;
};
//# sourceMappingURL=POSReceiptBlock.d.ts.map