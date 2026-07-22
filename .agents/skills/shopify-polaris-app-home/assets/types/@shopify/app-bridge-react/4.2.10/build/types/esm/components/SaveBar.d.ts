
import { ReactNode, LegacyRef } from 'react';
import { UISaveBarAttributes } from '@shopify/app-bridge-types';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ui-save-bar': UISaveBarAttributes & {
                ref?: LegacyRef<UISaveBarElement | null>;
            };
        }
    }
}
export interface SaveBarProps extends Omit<UISaveBarAttributes, 'children'> {
    /**
     * Whether the saveBar is open or not
     *
     * @defaultValue false
     */
    open?: boolean;
    /**
     * Callback that is called when the saveBar is opened
     */
    onShow?(): void;
    /**
     * Callback that is called when the saveBar is closed
     */
    onHide?(): void;
    children?: ReactNode;
}
/**
 * This component is a wrapper around the App Bridge `ui-save-bar` element.
 * It is used to display a contextual save bar to signal dirty state in the app.
 *
 * @see {@link https://shopify.dev/docs/api/app-bridge-library/react-components/save-bar}
 */
export declare const SaveBar: React.ForwardRefExoticComponent<SaveBarProps & React.RefAttributes<UISaveBarElement>>;
//# sourceMappingURL=SaveBar.d.ts.map