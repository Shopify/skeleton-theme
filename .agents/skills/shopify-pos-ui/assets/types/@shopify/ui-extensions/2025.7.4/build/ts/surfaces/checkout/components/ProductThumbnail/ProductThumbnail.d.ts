import type { MaybeConditionalStyle, ResolutionCondition } from '../../style/types';
import type { Size } from '../shared';
export interface ProductThumbnailProps {
    /**
     * An alternative text description that describe the image for the reader to
     * understand what it is about. It is extremely useful for both users using
     * assistive technology and sighted users. A well written description
     * provides people with visual impairments the ability to participate in
     * consuming non-text content. When a screen readers encounters an `Image`,
     * the description is read and announced aloud. If an image fails to load,
     * potentially due to a poor connection, the description is displayed on
     * screen instead. This has the benefit of letting a sighted buyer know an
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
    alt?: string;
    /**
     * An alternative text description that describe the image for the reader to
     * understand what it is about. It is extremely useful for both users using
     * assistive technology and sighted users. A well written description
     * provides people with visual impairments the ability to participate in
     * consuming non-text content. When a screen readers encounters an `Image`,
     * the description is read and announced aloud. If an image fails to load,
     * potentially due to a poor connection, the description is displayed on
     * screen instead. This has the benefit of letting a sighted buyer know an
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
    accessibilityLabel?: string;
    /**
     * The image source (either a remote URL or a local file resource).
     *
     * A `src` property is available as an alias for this for compatibility with the HTML
     * specification. When both are specified, `source` takes precedence.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src
     */
    source?: MaybeConditionalStyle<string, ResolutionCondition>;
    /**
     * The image source (either a remote URL or a local file resource).
     *
     * This property is available as an alias for `source` for compatibility with the HTML
     * specification. When both are specified, `source` takes precedence.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src
     */
    src?: MaybeConditionalStyle<string, ResolutionCondition>;
    /**
     * Decorates the product thumbnail with the quantity of the product.
     */
    badge?: number;
    /**
     * Adjusts the size the product thumbnail image.
     *
     * @defaultValue 'base'
     */
    size?: Extract<Size, 'base' | 'small'>;
}
export declare const ProductThumbnail: "ProductThumbnail" & {
    readonly type?: "ProductThumbnail" | undefined;
    readonly props?: ProductThumbnailProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=ProductThumbnail.d.ts.map