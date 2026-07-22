import { type HydrogenImageProps } from './Image.js';
import { Video } from './Video.js';
import { ExternalVideo } from './ExternalVideo.js';
import { ModelViewer } from './ModelViewer.js';
import type { MediaEdge as MediaEdgeType } from './storefront-api-types.js';
import type { PartialDeep } from 'type-fest';
import type { ModelViewerElement } from '@google/model-viewer/lib/model-viewer.js';
type BaseProps = React.HTMLAttributes<HTMLImageElement | HTMLVideoElement | HTMLIFrameElement | ModelViewerElement>;
export interface MediaFileProps extends BaseProps {
    /** An object with fields that correspond to the Storefront API's [Media object](https://shopify.dev/api/storefront/reference/products/media). */
    data: PartialDeep<MediaEdgeType['node'], {
        recurseIntoArrays: true;
    }>;
    /** The options for the `Image`, `Video`, `ExternalVideo`, or `ModelViewer` components. */
    mediaOptions?: MediaOptions;
}
type MediaOptions = {
    /** Props that will only apply when an `<Image />` is rendered */
    image?: Omit<HydrogenImageProps, 'data'>;
    /** Props that will only apply when a `<Video />` is rendered */
    video?: Omit<React.ComponentProps<typeof Video>, 'data'>;
    /** Props that will only apply when an `<ExternalVideo />` is rendered */
    externalVideo?: Omit<React.ComponentProps<typeof ExternalVideo>['options'], 'data'>;
    /** Props that will only apply when a `<ModelViewer />` is rendered */
    modelViewer?: Omit<typeof ModelViewer, 'data'>;
};
/**
 * The `MediaFile` component renders the media for the Storefront API's
 * [Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image`, a
 * `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `__typename` of the `data` prop.
 */
export declare function MediaFile({ data, mediaOptions, ...passthroughProps }: MediaFileProps): JSX.Element | null;
export {};
