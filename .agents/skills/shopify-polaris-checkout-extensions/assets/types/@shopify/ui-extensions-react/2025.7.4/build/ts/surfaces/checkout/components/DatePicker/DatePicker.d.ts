import { DatePicker as BaseDatePicker } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type DatePickerProps = ReactPropsFromRemoteComponentType<typeof BaseDatePicker>;
export declare const DatePicker: "DatePicker" & {
    readonly type?: "DatePicker" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").DatePickerProps<import("@shopify/ui-extensions/src/surfaces/checkout").SelectedDate> | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"DatePicker", import("@shopify/ui-extensions/src/surfaces/checkout").DatePickerProps<import("@shopify/ui-extensions/src/surfaces/checkout").SelectedDate>, true>>;
//# sourceMappingURL=DatePicker.d.ts.map