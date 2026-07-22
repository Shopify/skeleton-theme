import { AccessibilityLabelProps, InputProps } from '../shared';
export interface ChoiceProps extends AccessibilityLabelProps, Pick<InputProps<string>, 'disabled' | 'label' | 'id' | 'readOnly' | 'error'> {
    /**
     * Whether the choice is checked or not
     */
    checked?: boolean;
}
export interface ChoiceListProps extends Pick<InputProps<string | string[]>, 'value' | 'name' | 'onChange' | 'disabled' | 'error' | 'readOnly' | 'defaultValue'> {
    choices?: ChoiceProps[];
    /**
     * Whether to allow selection of multiple choices
     */
    multiple?: boolean;
}
export declare const ChoiceList: "ChoiceList" & {
    readonly type?: "ChoiceList" | undefined;
    readonly props?: ChoiceListProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=ChoiceList.d.ts.map