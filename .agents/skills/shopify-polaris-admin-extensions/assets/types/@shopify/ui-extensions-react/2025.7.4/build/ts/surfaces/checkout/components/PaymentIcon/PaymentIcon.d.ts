import { PaymentIcon as BasePaymentIcon } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type { PaymentMethod } from '@shopify/ui-extensions/checkout';
export type PaymentIconProps = ReactPropsFromRemoteComponentType<typeof BasePaymentIcon>;
export declare const PaymentIcon: "PaymentIcon" & {
    readonly type?: "PaymentIcon" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").PaymentIconProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"PaymentIcon", import("@shopify/ui-extensions/src/surfaces/checkout").PaymentIconProps, true>>;
//# sourceMappingURL=PaymentIcon.d.ts.map