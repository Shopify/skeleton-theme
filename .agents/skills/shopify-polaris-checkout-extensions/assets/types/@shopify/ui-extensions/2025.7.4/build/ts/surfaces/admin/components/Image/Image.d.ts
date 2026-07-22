import type { AccessibilityRole } from '../shared';
export type ImageProps = (ImageAccessibilityLabelProp | ImageAltProp) & (ImageSourceProp | ImageSrcProp) & ImageBaseProps;
interface ImageBaseProps {
    /**
     * Sets the semantic meaning of the component’s content. When set,
     * the role will be used by assistive technologies to help users
     * navigate the page.
     */
    accessibilityRole?: Extract<AccessibilityRole, 'decorative'>;
    /**
     * Defines a unique identifier which must be unique in the whole document.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
     */
    id?: string;
    /**
     * Determines the loading behavior of the image:
     * - `eager`: Immediately loads the image, irrespective of its position within the visible viewport.
     * - `lazy`: Delays loading the image until it approaches a specified distance from the viewport.
     *
     * @defaultValue `eager`
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading
     */
    loading?: 'eager' | 'lazy';
    /**
     * Invoked when load completes successfully.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload
     */
    onLoad?(): void;
    /**
     * Invoked on load error.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
     */
    onError?(): void;
}
interface ImageAccessibilityLabelProp {
    /**
     * An alternative text description that describe the image for the reader to
     * understand what it is about. It is extremely useful for both users using
     * assistive technology and sighted users. A well written `description`
     * provides people with visual impairments the ability to participate in
     * consuming non-text content. When a screen readers encounters an `Image`,
     * the description is read and announced aloud. If an image fails to load,
     * potentially due to a poor connection, the `description` is displayed on
     * screen instead. This has the benefit of letting a sighted user know an
     * image was meant to load here, but as an alternative, they’re still able to
     * consume the text content. Read
     * [considerations when writing alternative text](https://ux.shopify.com/considerations-when-writing-alt-text-a9c1985a8204)
     * to learn more.
     *
     * An `alt` property is available as an alias for this for compatibility with the HTML
     * specification. When both are specified, `accessibilityLabel` takes precedence.
     *
     * @defaultValue `''`
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt
     */
    accessibilityLabel: string;
    alt?: never;
}
interface ImageAltProp {
    /**
     * An alternative text description that describe the image for the reader to
     * understand what it is about. It is extremely useful for both users using
     * assistive technology and sighted users. A well written `description`
     * provides people with visual impairments the ability to participate in
     * consuming non-text content. When a screen readers encounters an `Image`,
     * the description is read and announced aloud. If an image fails to load,
     * potentially due to a poor connection, the `description` is displayed on
     * screen instead. This has the benefit of letting a sighted user know an
     * image was meant to load here, but as an alternative, they’re still able to
     * consume the text content. Read
     * [considerations when writing alternative text](https://ux.shopify.com/considerations-when-writing-alt-text-a9c1985a8204)
     * to learn more.
     *
     * This property is an alias for `accessibilityLabel` for compatibility with the HTML
     * specification. When both are specified `accessibilityLabel` takes precedence.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt
     */
    alt: string;
    accessibilityLabel?: never;
}
interface ImageSrcProp {
    /**
     * The image source (either a remote URL or a local file resource; blob URLs are not currently supported).
     *
     * This property is available as an alias for `source` for compatibility with the HTML
     * specification. When both are specified, `source` takes precedence.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src
     */
    src: string;
    source?: never;
}
interface ImageSourceProp {
    /**
     * The image source (either a remote URL or a local file resource; blob URLs are not currently supported).
     *
     * A `src` property is available as an alias for this for compatibility with the HTML
     * specification. When both are specified, `source` takes precedence.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src
     */
    source: string;
    src?: never;
}
export declare const Image: "Image" & {
    readonly type?: "Image" | undefined;
    readonly props?: ImageProps | undefined;
    readonly children?: true | undefined;
};
export {};
//# sourceMappingURL=Image.d.ts.map