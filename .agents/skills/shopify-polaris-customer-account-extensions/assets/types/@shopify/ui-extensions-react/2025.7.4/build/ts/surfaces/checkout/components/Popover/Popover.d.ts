import { Popover as BasePopover } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type PopoverProps = ReactPropsFromRemoteComponentType<typeof BasePopover>;
export declare const Popover: "Popover" & {
    readonly type?: "Popover" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").PopoverProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Popover", import("@shopify/ui-extensions/src/surfaces/checkout").PopoverProps, true>>;
//# sourceMappingURL=Popover.d.ts.map