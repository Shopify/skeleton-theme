
import { ReactNode, LegacyRef } from 'react';
import { UIModalAttributes } from '@shopify/app-bridge-types';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ui-modal': UIModalAttributes & {
                ref?: LegacyRef<UIModalElement | null>;
            };
        }
    }
}
export interface ModalProps extends Omit<UIModalAttributes, 'children'> {
    /**
     * Whether the modal is open or not
     *
     * @defaultValue false
     */
    open?: boolean;
    /**
     * Callback that is called when the modal is opened
     */
    onShow?(): void;
    /**
     * Callback that is called when the modal is closed
     */
    onHide?(): void;
    children?: ReactNode;
}
/**
 * This component is a wrapper around the App Bridge `ui-modal` element.
 * It is used to display an overlay that prevents interaction with the
 * rest of the app until dismissed.
 *
 * @see {@link https://shopify.dev/docs/api/app-bridge-library/react-components/modal}
 */
export declare const Modal: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<UIModalElement>>;
//# sourceMappingURL=Modal.d.ts.map