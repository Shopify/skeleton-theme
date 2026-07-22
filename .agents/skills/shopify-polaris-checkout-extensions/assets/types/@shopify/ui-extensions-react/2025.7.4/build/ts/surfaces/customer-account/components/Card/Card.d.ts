import { Card as BaseCard } from '@shopify/ui-extensions/customer-account';
import { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type CardProps = ReactPropsFromRemoteComponentType<typeof BaseCard>;
export declare const Card: "Card" & {
    readonly type?: "Card" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/customer-account").CardProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Card", import("@shopify/ui-extensions/src/surfaces/customer-account").CardProps, true>>;
//# sourceMappingURL=Card.d.ts.map