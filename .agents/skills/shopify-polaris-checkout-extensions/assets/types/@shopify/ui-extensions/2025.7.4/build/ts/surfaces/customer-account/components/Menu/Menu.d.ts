import type { IdProps } from '../shared';
export interface MenuProps extends IdProps {
    /**
     * A label to describe the purpose of the menu that is announced by screen readers.
     */
    accessibilityLabel?: string;
    /**
     * Callback to run when the Menu is opened
     */
    onOpen?: () => void;
    /**
     * Callback to run when the Menu is closed
     */
    onClose?: () => void;
}
export declare const Menu: "Menu" & {
    readonly type?: "Menu" | undefined;
    readonly props?: MenuProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Menu.d.ts.map