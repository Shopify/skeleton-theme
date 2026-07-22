import type { Model3d } from './storefront-api-types.js';
import type { PartialDeep } from 'type-fest';
import type { ModelViewerElement } from '@google/model-viewer/lib/model-viewer.js';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': PartialDeep<ModelViewerElement, {
                recurseIntoArrays: true;
            }>;
        }
    }
}
type ModelViewerProps = Omit<PartialDeep<JSX.IntrinsicElements['model-viewer'], {
    recurseIntoArrays: true;
}>, 'src'> & ModelViewerBaseProps;
type ModelViewerBaseProps = {
    /** An object with fields that correspond to the Storefront API's [Model3D object](https://shopify.dev/api/storefront/2025-07/objects/model3d). */
    data: PartialDeep<Model3d, {
        recurseIntoArrays: true;
    }>;
    /** The callback to invoke when the 'error' event is triggered. Refer to [error in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-loading-events-error). */
    onError?: (event: Event) => void;
    /** The callback to invoke when the `load` event is triggered. Refer to [load in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-loading-events-load). */
    onLoad?: (event: Event) => void;
    /** The callback to invoke when the 'preload' event is triggered. Refer to [preload in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-loading-events-preload). */
    onPreload?: (event: Event) => void;
    /** The callback to invoke when the 'model-visibility' event is triggered. Refer to [model-visibility in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-loading-events-modelVisibility). */
    onModelVisibility?: (event: Event) => void;
    /** The callback to invoke when the 'progress' event is triggered. Refer to [progress in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-loading-events-progress). */
    onProgress?: (event: Event) => void;
    /** The callback to invoke when the 'ar-status' event is triggered. Refer to [ar-status in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-augmentedreality-events-arStatus). */
    onArStatus?: (event: Event) => void;
    /** The callback to invoke when the 'ar-tracking' event is triggered. Refer to [ar-tracking in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-augmentedreality-events-arTracking). */
    onArTracking?: (event: Event) => void;
    /** The callback to invoke when the 'quick-look-button-tapped' event is triggered. Refer to [quick-look-button-tapped in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-augmentedreality-events-quickLookButtonTapped). */
    onQuickLookButtonTapped?: (event: Event) => void;
    /** The callback to invoke when the 'camera-change' event is triggered. Refer to [camera-change in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-stagingandcameras-events-cameraChange). */
    onCameraChange?: (event: Event) => void;
    /** The callback to invoke when the 'environment-change' event is triggered. Refer to [environment-change in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-lightingandenv-events-environmentChange).  */
    onEnvironmentChange?: (event: Event) => void;
    /**  The callback to invoke when the 'play' event is triggered. Refer to [play in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-animation-events-play). */
    onPlay?: (event: Event) => void;
    /**  The callback to invoke when the 'pause' event is triggered. Refer to [pause in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-animation-events-pause). */
    onPause?: (event: Event) => void;
    /** The callback to invoke when the 'scene-graph-ready' event is triggered. Refer to [scene-graph-ready in the <model-viewer> documentation](https://modelviewer.dev/docs/index.html#entrydocs-scenegraph-events-sceneGraphReady). */
    onSceneGraphReady?: (event: Event) => void;
};
/**
 * The `ModelViewer` component renders a 3D model (with the `model-viewer` custom element) for
 * the Storefront API's [Model3d object](https://shopify.dev/api/storefront/reference/products/model3d).
 *
 * The `model-viewer` custom element is lazily downloaded through a dynamically-injected `<script type="module">` tag when the `<ModelViewer />` component is rendered
 *
 * ModelViewer is using version `1.21.1` of the `@google/model-viewer` library.
 */
export declare function ModelViewer(props: ModelViewerProps): JSX.Element | null;
export {};
