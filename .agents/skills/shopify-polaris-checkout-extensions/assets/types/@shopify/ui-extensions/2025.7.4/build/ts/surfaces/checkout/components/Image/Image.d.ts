import type { MaybeConditionalStyle, MaybeResponsiveConditionalStyle, ResolutionCondition, ViewportSizeCondition, AtLeastOne } from '../../style/types';
import type { AccessibilityRole, BorderProps, CornerProps, Fit, IdProps } from '../shared';
export interface ImageProps extends BorderProps, CornerProps, IdProps {
    /**
     * The URL of the image. Supports the `resolution` and `viewportInlineSize` conditional styles only.
     */
    source: Required<MaybeConditionalStyle<string, AtLeastOne<ViewportSizeCondition & ResolutionCondition>>>;
    /**
     * An alternative text description that describe the image for the reader to
     * understand what it is about. It is extremely useful for both buyers using
     * assistive technology and sighted buyers. A well written `description`
     * provides people with visual impairments the ability to participate in
     * consuming non-text content. When a screen readers encounters an `Image`,
     * the description is read and announced aloud. If an image fails to load,
     * potentially due to a poor connection, the `description` is displayed on
     * screen instead. This has the benefit of letting a sighted buyer know an
     * image was meant to load here, but as an alternative, they’re still able to
     * consume the text content. Read
     * [considerations when writing alternative text](https://ux.shopify.com/considerations-when-writing-alt-text-a9c1985a8204)
     * to learn more.
     *
     * @defaultValue ''
     */
    accessibilityDescription?: string;
    /**
     * Indicates how the browser should load the image, either eager or lazy.
     *
     * Uses native browser behavior and is not supported by all browsers.
     * If no value is provided then the image is loaded immediately, regardless of
     * whether or not the image is currently within the visible viewport.
     */
    loading?: Loading;
    /**
     * Displays the image at the specified aspect ratio (fills the width of the
     * parent container and sets the height accordingly) and creates an invisible
     * placeholder to prevent content jumping when the image loads. Use along
     * with `fit` if the specified aspect ratio does not match the intrinsic
     * aspect ratio to prevent the image from stretching.
     */
    aspectRatio?: number;
    /**
     * Indicates how the image fits in its frame.
     * Use if the image is not displayed at its intrinsic size to maintain
     * the aspect ratio.
     */
    fit?: MaybeResponsiveConditionalStyle<Fit>;
    /**
     * Sets the semantic meaning of the component’s content. When set,
     * the role will be used by assistive technologies to help buyers
     * navigate the page.
     */
    accessibilityRole?: Extract<AccessibilityRole, 'decorative'>;
}
type Loading = 
/**
 * Image is loaded immediately, regardless of whether or not the image is currently within the visible viewport.
 */
'eager'
/**
 * Image is loaded when it’s within the visible viewport.
 */
 | 'lazy';
/**
 * Image is used for large format, responsive images.
 */
export declare const Image: "Image" & {
    readonly type?: "Image" | undefined;
    readonly props?: ImageProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=Image.d.ts.map