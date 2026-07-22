import { ChoiceList as BaseChoiceList } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ChoiceListProps = ReactPropsFromRemoteComponentType<typeof BaseChoiceList>;
export declare const ChoiceList: "ChoiceList" & {
    readonly type?: "ChoiceList" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").ChoiceListProps<string | string[]> | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"ChoiceList", import("@shopify/ui-extensions/src/surfaces/checkout").ChoiceListProps<string | string[]>, true>>;
//# sourceMappingURL=ChoiceList.d.ts.map