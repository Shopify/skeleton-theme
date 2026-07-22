import type { RemoteFragment } from '@remote-ui/core';
import { LinkProps } from '../shared-checkout-components';
export interface ResourceItemProps extends Pick<LinkProps, 'accessibilityLabel' | 'to' | 'onPress'> {
    /**
     * The action grouping for the item, provided as buttons.
     */
    action?: RemoteFragment;
    /**
     * Label for the action grouping. If a label is not provided, default text is used.
     *
     * @defaultValue "More actions"
     */
    actionLabel?: string;
    /**
     * Accessibility label for the action grouping. If an accessibility label is not provided,
     * default text is used.
     *
     * @defaultValue "More actions"
     */
    actionAccessibilityLabel?: string;
    /**
     * Indicates that the item is in a loading state.
     *
     * When `true`, the item shows loading indicators for the UI elements that it is owns.
     * The item is not responsible for the loading indicators of any content that is passed as `children`.
     *
     * @defaultValue false
     */
    loading?: boolean;
}
export declare const ResourceItem: "ResourceItem" & {
    readonly type?: "ResourceItem" | undefined;
    readonly props?: ResourceItemProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=ResourceItem.d.ts.map