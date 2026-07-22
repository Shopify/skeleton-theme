import type { RemoteFragment } from '@remote-ui/core';
export interface CustomerAccountActionProps {
    /**
     * Sets the title of the Action container.
     */
    title: string;
    /**
     * Sets the Primary action button of the container. This component must be a button component.
     */
    primaryAction?: RemoteFragment;
    /**
     * Sets the Secondary action button of the container. This component must be a button component.
     */
    secondaryAction?: RemoteFragment;
}
export declare const CustomerAccountAction: "CustomerAccountAction" & {
    readonly type?: "CustomerAccountAction" | undefined;
    readonly props?: CustomerAccountActionProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=CustomerAccountAction.d.ts.map