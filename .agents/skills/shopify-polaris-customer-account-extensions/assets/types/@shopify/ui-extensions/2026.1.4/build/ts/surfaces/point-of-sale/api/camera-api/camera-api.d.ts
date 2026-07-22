/**
 * Specifies configuration options for capturing photos using the device camera.
 */
export interface CameraMediaOptions {
    /**
     * The camera that will be active when the camera interface first opens.
     * - `'user'`: The front-facing camera
     * - `'environment'`: The rear-facing camera
     * @defaultValue 'environment'
     */
    facingMode?: 'user' | 'environment';
    /**
     * The maximum width (1 to 1920) of the image in pixels. Resizes the image to this width if it is larger.
     * @defaultValue 1080
     */
    maxWidth?: number;
    /**
     * The maximum height (1 to 1920) of the image in pixels. Resizes the image to this height if it is larger.
     * @defaultValue 1080
     */
    maxHeight?: number;
    /**
     * The quality of the image returned.
     * Percentile value between 0 (lowest quality/highest compression) and 1 (highest quality/lowest compression).
     * @defaultValue 0.9
     */
    quality?: number;
}
/**
 * Represents the captured image and associated metadata returned by `shopify.camera.takePhoto()`.
 */
export interface CameraMediaResponse {
    /** The image data as base64 string. */
    base64: string;
    /** The width of the image in pixels. */
    width: number;
    /** The height of the image in pixels. */
    height: number;
    /** The file size of the image in bytes. */
    fileSize: number;
    /** The MIME type of the image. */
    type: string;
}
/**
 * The `CameraApi` object provides properties for capturing photos using the device camera. Access these properties through `shopify.camera` to take photos and retrieve image data with metadata.
 *
 * @publicDocs
 */
export interface CameraApiContent {
    /**
     * Launch the device's camera to take a photo.
     *
     * @param options the options for the camera media
     * @returns a promise that resolves with the captured image and metadata
     * @throws {Error} when camera permission is denied by the user
     * @throws {Error} when the user cancels the photo capture
     * @throws {Error} when the device has no available camera
     * @throws {Error} when the camera API is already in use
     */
    takePhoto: (options?: CameraMediaOptions) => Promise<CameraMediaResponse>;
}
/** @publicDocs */
export interface CameraApi {
    camera: CameraApiContent;
}
//# sourceMappingURL=camera-api.d.ts.map