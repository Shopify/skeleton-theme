import type { IdProps } from '../shared';
export interface MapPopoverProps extends IdProps {
    /**
     * Callback to run when the Popover is closed.
     */
    onClose?(): void;
    /**
     * Callback to run when the Popover is opened.
     */
    onOpen?(): void;
}
/**
 * Use the `MapPopover` component to provide additional details about a single geographic location such as a shipping address or package pickup location.
 */
export declare const MapPopover: "MapPopover" & {
    readonly type?: "MapPopover" | undefined;
    readonly props?: MapPopoverProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=MapPopover.d.ts.map