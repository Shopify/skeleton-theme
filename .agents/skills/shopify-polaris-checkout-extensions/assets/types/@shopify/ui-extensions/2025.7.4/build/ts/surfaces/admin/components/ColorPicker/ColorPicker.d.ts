export interface ColorPickerProps {
    /** ID for the element. */
    id?: string;
    /**
     * Allow user to select an alpha value.
     * @default false
     */
    allowAlpha?: boolean;
    /**
     * The `onChange` handler will emit the value in hex.
     * If the `allowAlpha` prop is `true`, `onChange` will emit an 8-value hex (#RRGGBBAA).
     * If the `allowAlpha` prop is `false`, `onChange` will emit a 6-value hex (#RRGGBB).
     */
    onChange?(value: string): void;
    /**
     * The currently selected color.
     *
     * Supported formats include:
     * - RGB @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb
     * - RGBA @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb
     * - Hex (3-value, 4-value, 6-value, 8-value) @see https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color
     *
     * For RGB and RGBA, both the legacy syntax (comma-separated) and modern syntax (space-separate) are supported.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb
     *
     * If the value is invalid, the component will select rgb(0, 0, 0).
     *
     * The `onChange` handler will emit the value in hex.
     * If the `allowAlpha` prop is `true`, `onChange` will emit an 8-value hex (#RRGGBBAA).
     * If the `allowAlpha` prop is `false`, `onChange` will emit a 6-value hex (#RRGGBB).
     */
    value?: string;
}
export declare const ColorPicker: "ColorPicker" & {
    readonly type?: "ColorPicker" | undefined;
    readonly props?: ColorPickerProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=ColorPicker.d.ts.map