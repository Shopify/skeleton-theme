import type { RemoteFragment } from '@remote-ui/core';
export interface ChoiceProps {
    /**
     * A unique identifier for the choice.
     */
    id: string;
    /**
     * Whether the choice can be changed.
     */
    disabled?: boolean;
    /**
     * A label used for buyers using assistive technologies. When set, any
     * `children` supplied to this component will not be announced to screen reader users.
     */
    accessibilityLabel?: string;
    /**
     * Additional content to be revealed when selected.
     */
    details?: string | RemoteFragment;
    /**
     * The primary content for a choice.
     * Rendered below `<label>`.
     */
    primaryContent?: string | RemoteFragment;
    /**
     * The secondary label content for a choice in a `group` ChoiceList.
     * Ignored in `base` [variant](/docs/api/checkout-ui-extensions/components/forms/choicelist#choicelistprops-propertydetail-value).
     * Rendered on the opposite side to <label> and `primaryContent`.
     */
    secondaryContent?: string | RemoteFragment;
    /**
     * The tertiary label content for a choice in a `group` ChoiceList.
     * Ignored in `base` [variant](/docs/api/checkout-ui-extensions/components/forms/choicelist#choicelistprops-propertydetail-value).
     * Rendered below `primaryContent` and `secondaryContent`.
     */
    tertiaryContent?: string | RemoteFragment;
}
/**
 * Options inside a `ChoiceList`.
 * The wrapping `ChoiceList` component will dictate if the choice renders as radio buttons or checkboxes.
 * `children` are rendered inside <label>.
 */
export declare const Choice: "Choice" & {
    readonly type?: "Choice" | undefined;
    readonly props?: ChoiceProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Choice.d.ts.map