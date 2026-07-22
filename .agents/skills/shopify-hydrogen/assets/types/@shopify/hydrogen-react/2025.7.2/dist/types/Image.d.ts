import * as React from 'react';
import type { PartialDeep } from 'type-fest';
import type { Image as ImageType } from './storefront-api-types.js';
type SrcSetOptions = {
    /** The number of sizes to generate */
    intervals: number;
    /** The smallest image size */
    startingWidth: number;
    /** The increment by which to increase for each size, in pixels */
    incrementSize: number;
    /** The size used for placeholder fallback images */
    placeholderWidth: number;
};
export type LoaderParams = {
    /** The base URL of the image */
    src?: ImageType['url'];
    /** The URL param that controls width */
    width?: number;
    /** The URL param that controls height */
    height?: number;
    /** The URL param that controls the cropping region */
    crop?: Crop;
};
export type Loader = (params: LoaderParams) => string;
type Crop = 'center' | 'top' | 'bottom' | 'left' | 'right';
export type HydrogenImageProps = React.ComponentPropsWithRef<'img'> & HydrogenImageBaseProps;
type HydrogenImageBaseProps = {
    /** The aspect ratio of the image, in the format of `width/height`.
     *
     * @example
     * ```
     * <Image data={productImage} aspectRatio="4/5" />
     * ```
     */
    aspectRatio?: string;
    /** The crop position of the image.
     *
     * @remarks
     * In the event that AspectRatio is set, without specifying a crop,
     * the Shopify CDN won't return the expected image.
     *
     * @defaultValue `center`
     */
    crop?: Crop;
    /** Data mapping to the [Storefront API `Image`](https://shopify.dev/docs/api/storefront/2025-07/objects/Image) object. Must be an Image object.
     *
     * @example
     * ```
     * import {IMAGE_FRAGMENT, Image} from '@shopify/hydrogen';
     *
     * export const IMAGE_QUERY = `#graphql
     * ${IMAGE_FRAGMENT}
     * query {
     *   product {
     *     featuredImage {
     *       ...Image
     *     }
     *   }
     * }`
     *
     * <Image
     *   data={productImage}
     *   sizes="(min-width: 45em) 50vw, 100vw"
     *   aspectRatio="4/5"
     * />
     * ```
     *
     * Image: {@link https://shopify.dev/api/storefront/reference/common-objects/image}
     */
    data?: PartialDeep<ImageType, {
        recurseIntoArrays: true;
    }>;
    /** A function that returns a URL string for an image.
     *
     * @remarks
     * By default, this uses Shopify’s CDN {@link https://cdn.shopify.com/} but you can provide
     * your own function to use a another provider, as long as they support URL based image transformations.
     */
    loader?: Loader;
    /** An optional prop you can use to change the default srcSet generation behaviour */
    srcSetOptions?: SrcSetOptions;
};
/**
 * A Storefront API GraphQL fragment that can be used to query for an image.
 */
export declare const IMAGE_FRAGMENT = "#graphql\n  fragment Image on Image {\n    altText\n    url\n    width\n    height\n  }\n";
/**
 * Hydrogen’s Image component is a wrapper around the HTML image element.
 * It supports the same props as the HTML `img` element, but automatically
 * generates the srcSet and sizes attributes for you. For most use cases,
 * you’ll want to set the `aspectRatio` prop to ensure the image is sized
 * correctly.
 *
 * @remarks
 * - `decoding` is set to `async` by default.
 * - `loading` is set to `lazy` by default.
 * - `alt` will automatically be set to the `altText` from the Storefront API if passed in the `data` prop
 * - `src` will automatically be set to the `url` from the Storefront API if passed in the `data` prop
 *
 * @example
 * A responsive image with a 4:5 aspect ratio:
 * ```
 * <Image
 *   data={product.featuredImage}
 *   aspectRatio="4/5"
 *   sizes="(min-width: 45em) 40vw, 100vw"
 * />
 * ```
 * @example
 * A fixed size image:
 * ```
 * <Image
 *   data={product.featuredImage}
 *   width={100}
 *   height={100}
 * />
 * ```
 *
 * {@link https://shopify.dev/docs/api/hydrogen-react/components/image}
 */
export declare const Image: React.ForwardRefExoticComponent<Omit<HydrogenImageProps, "ref"> & React.RefAttributes<HTMLImageElement>>;
export declare function shopifyLoader({ src, width, height, crop }: LoaderParams): string;
/**
 * This function generates a srcSet for Shopify images.
 * @param src - The source URL of the image, e.g. https://cdn.shopify.com/static/sample-images/garnished.jpeg
 * @param sizesArray - An array of objects containing the `width`, `height`, and `crop` of the image, e.g. [\{width: 200, height: 200, crop: 'center'\}, \{width: 400, height: 400, crop: 'center'\}]
 * @param loader - A function that takes a Shopify image URL and returns a Shopify image URL with the correct query parameters
 * @returns A srcSet for Shopify images, e.g. 'https://cdn.shopify.com/static/sample-images/garnished.jpeg?width=200&height=200&crop=center 200w, https://cdn.shopify.com/static/sample-images/garnished.jpeg?width=400&height=400&crop=center 400w'
 */
export declare function generateSrcSet(src?: string, sizesArray?: Array<{
    width?: number;
    height?: number;
    crop?: Crop;
}>, loader?: Loader): string;
/**
 * This function generates an array of sizes for Shopify images, for both fixed and responsive images.
 * @param width - The CSS width of the image
 * @param intervals - The number of intervals to generate
 * @param startingWidth - The starting width of the image
 * @param incrementSize - The size of each interval
 * @returns An array of widths
 */
export declare function generateImageWidths(width: string | number | undefined, intervals: number, startingWidth: number, incrementSize: number): number[];
/**
 * Simple utility function to convert an aspect ratio CSS string to a decimal, currently only supports values like `1/1`, not `0.5`, or `auto`
 * @param aspectRatio - The aspect ratio of the image, e.g. `1/1`
 * @returns The aspect ratio as a number, e.g. `0.5`
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio}
 */
export declare function parseAspectRatio(aspectRatio?: string): number | undefined;
export declare function generateSizes(imageWidths?: number[], aspectRatio?: string, crop?: Crop, sourceDimensions?: {
    width?: number;
    height?: number;
}): {
    width: number;
    height: number | undefined;
    crop: Crop;
}[] | undefined;
export {};
