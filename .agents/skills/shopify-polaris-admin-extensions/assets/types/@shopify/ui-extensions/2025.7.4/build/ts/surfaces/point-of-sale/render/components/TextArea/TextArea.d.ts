import type { InputProps } from '../shared/InputField';
export interface TextAreaProps extends InputProps {
    /**
     * The initial number of visible text lines to be displayed. Maximum of 8 lines.
     */
    rows?: number;
}
export declare const TextArea: "TextArea" & {
    readonly type?: "TextArea" | undefined;
    readonly props?: TextAreaProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=TextArea.d.ts.map