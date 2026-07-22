import { Stepper as BaseStepper } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type StepperProps = ReactPropsFromRemoteComponentType<typeof BaseStepper>;
export declare const Stepper: "Stepper" & {
    readonly type?: "Stepper" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").StepperProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Stepper", import("@shopify/ui-extensions/src/surfaces/checkout").StepperProps, true>>;
//# sourceMappingURL=Stepper.d.ts.map