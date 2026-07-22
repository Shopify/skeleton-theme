export interface ImageGroupProps {
    /**
     * Changes the layout of the images.
     *
     * @default "grid"
     */
    variant?: 'grid' | 'inline-stack';
    /**
     * A label that describes the purpose or contents of the image group. When set,
     * it will be announced to users using assistive technologies and will
     * provide them with more context.
     */
    accessibilityLabel?: string;
    /**
     * Indicates that the image group is in a loading state.
     *
     * When `true`, the image group show a loading indicator.
     *
     * @defaultValue false
     */
    loading?: boolean;
    /**
     * Indicates the total number of items that could be displayed in the image group. It is used to determine the remaining number to show when all the available image slots have been filled.
     */
    totalItems?: number;
}
export declare const ImageGroup: "ImageGroup" & {
    readonly type?: "ImageGroup" | undefined;
    readonly props?: ImageGroupProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=ImageGroup.d.ts.map