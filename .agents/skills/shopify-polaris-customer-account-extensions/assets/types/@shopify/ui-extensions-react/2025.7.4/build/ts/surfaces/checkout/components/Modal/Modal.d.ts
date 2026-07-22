import { Modal as BaseModal } from '@shopify/ui-extensions/checkout';
import type { ReactPropsFromRemoteComponentType } from '@remote-ui/react';
export type ModalProps = ReactPropsFromRemoteComponentType<typeof BaseModal>;
export declare const Modal: "Modal" & {
    readonly type?: "Modal" | undefined;
    readonly props?: import("@shopify/ui-extensions/src/surfaces/checkout").ModalProps | undefined;
    readonly children?: true | undefined;
} & import("@remote-ui/react").ReactComponentTypeFromRemoteComponentType<import("@remote-ui/types").RemoteComponentType<"Modal", import("@shopify/ui-extensions/src/surfaces/checkout").ModalProps, true>>;
//# sourceMappingURL=Modal.d.ts.map