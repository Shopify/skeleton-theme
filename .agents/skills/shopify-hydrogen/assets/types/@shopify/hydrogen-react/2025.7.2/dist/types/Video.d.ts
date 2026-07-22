import { type HTMLAttributes } from 'react';
import { shopifyLoader } from './Image.js';
import type { Video as VideoType } from './storefront-api-types.js';
import type { PartialDeep } from 'type-fest';
export interface VideoProps {
    /** An object with fields that correspond to the Storefront API's [Video object](https://shopify.dev/api/storefront/2025-07/objects/video). */
    data: PartialDeep<VideoType, {
        recurseIntoArrays: true;
    }>;
    /** An object of image size options for the video's `previewImage`. Uses `shopifyImageLoader` to generate the `poster` URL. */
    previewImageOptions?: Parameters<typeof shopifyLoader>[0];
    /** Props that will be passed to the `video` element's `source` children elements. */
    sourceProps?: HTMLAttributes<HTMLSourceElement> & {
        'data-testid'?: string;
    };
}
/**
 * The `Video` component renders a `video` for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).
 */
export declare const Video: import("react").ForwardRefExoticComponent<Omit<import("react").ClassAttributes<HTMLVideoElement> & import("react").VideoHTMLAttributes<HTMLVideoElement> & VideoProps, "ref"> & import("react").RefAttributes<HTMLVideoElement>>;
