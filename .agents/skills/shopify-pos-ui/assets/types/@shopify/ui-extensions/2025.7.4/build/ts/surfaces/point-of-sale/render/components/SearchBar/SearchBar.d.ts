export interface SearchBarProps {
    /**
     * The initial text value displayed in the search bar when first rendered. This differs from placeholder text which appears when the field is empty.
     */
    initialValue?: string;
    /**
     * A callback function executed whenever the text value changes, receiving the new text value as a parameter for real-time search or filtering.
     */
    onTextChange?: (value: string) => void;
    /**
     * A callback function executed when the search button is tapped, receiving the current search text as a parameter.
     */
    onSearch: (value: string) => void;
    /**
     * A callback function executed when the search input field receives focus.
     */
    onFocus?: () => void;
    /**
     * A callback function executed when focus is removed from the search input field.
     */
    onBlur?: () => void;
    /**
     * A boolean that determines whether the text can be changed by user input.
     */
    editable?: boolean;
    /**
     * The placeholder text displayed in the search bar when no text is entered, providing guidance about what users can search for.
     */
    placeholder?: string;
}
export declare const SearchBar: "SearchBar" & {
    readonly type?: "SearchBar" | undefined;
    readonly props?: SearchBarProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=SearchBar.d.ts.map