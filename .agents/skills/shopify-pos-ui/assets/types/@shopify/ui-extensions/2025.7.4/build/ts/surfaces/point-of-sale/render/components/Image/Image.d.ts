export type ImageSize = 's' /** A small image size. Use for thumbnails, compact layouts, or when minimal space is available for image display. */ | 'm' /** A medium image size. Use for secondary content, list items, or compact interface elements where space is moderately constrained. */ | 'l' /** A large image size (default). Provides optimal visibility and balance for most interface elements, product displays, and standard image content. */ | 'xl' /** An extra large image size. Use for hero images, featured content, or when maximum visual impact and detail visibility are needed. */;
/**
 * Defines how images are resized and positioned within their containers. Controls image scaling, cropping, and aspect ratio handling.
 *
 * Available resize modes:
 * - `center`: Centers the image within its container without scaling. The image maintains its original size and is positioned in the center, potentially leaving empty space or being cropped if the container is smaller.
 * - `contain`: Scales the image to fit entirely within the container while maintaining aspect ratio. The entire image will be visible, but there may be empty space if the aspect ratios don't match.
 * - `cover`: Scales the image to fill the entire container while maintaining aspect ratio. Parts of the image may be cropped if the aspect ratios don't match, but the container will be completely filled.
 * - `repeat`: Repeats the image to fill the container. The image maintains its original size and is tiled both horizontally and vertically to cover the entire container area.
 * - `stretch`: Stretches the image to fill the container completely, potentially distorting the aspect ratio. The image will fill the entire container but may appear stretched or compressed.
 */
export type FillResizeMode = 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
export interface ImageProps {
    /**
     * The source of the image to be displayed. Provide a valid URL to a remote image or a local file resource. When no `src` is provided or the image is loading, a placeholder will be rendered.
     */
    src?: string;
    /**
     * The size or fill behavior of the image. Use `ImageSize` values (`'s'`, `'m'`, `'l'`, `'xl'`) for fixed dimensions, or `FillResizeMode` values (`'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`) to control how the image fills its container.
     *
     * @default 'l'
     */
    size?: ImageSize | FillResizeMode;
}
export declare const Image: "Image" & {
    readonly type?: "Image" | undefined;
    readonly props?: ImageProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Image.d.ts.map