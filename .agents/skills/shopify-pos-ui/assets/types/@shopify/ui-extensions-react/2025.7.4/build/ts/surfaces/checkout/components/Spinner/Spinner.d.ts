import { Spinner as BaseSpinner } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type SpinnerProps = ReactPropsFromRemoteComponentType<typeof BaseSpinner>;
export declare const Spinner: "Spinner" & {
    readonly type?: "Spinner" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").SpinnerProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Spinner", import("@shopify/ui-extensions/src/surfaces/checkout").SpinnerProps, true>>;
//# sourceMappingURL=Spinner.d.ts.map