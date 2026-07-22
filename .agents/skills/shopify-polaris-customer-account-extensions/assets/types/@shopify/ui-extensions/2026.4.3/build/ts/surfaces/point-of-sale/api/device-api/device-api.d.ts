/**
 * The `DeviceApi` object provides device details and capabilities.
 * @publicDocs
 */
export interface DeviceApiContent {
    /**
     * The name of the device as configured by the merchant or system. Use for displaying device information in interfaces, logging, or support contexts where device identification is helpful.
     */
    name: string;
    /**
     * A short, unique identifier for the device, assigned by Shopify.
     */
    registerName: string;
    /**
     * Retrieves the unique string identifier for the device. Returns a promise that resolves to the device ID. Use for device-specific data storage, analytics tracking, or implementing device-based permissions and configurations.
     * Note: While Shopify POS attempts to maintain a stable identifier, it is not guaranteed to be permanent and may change.
     */
    getDeviceId(): Promise<string>;
    /**
     * Determines whether the device is a tablet form factor. Returns a promise that resolves to `true` for tablets, `false` for other device types. Use for implementing responsive design, optimizing touch targets, or providing device-appropriate user experiences.
     */
    isTablet(): Promise<boolean>;
}
/**
 * The `DeviceApi` object provides access to device information and capabilities. Access these properties and methods through `shopify.device` to retrieve device details and check device characteristics.
 * @publicDocs
 */
export interface DeviceApi {
    device: DeviceApiContent;
}
//# sourceMappingURL=device-api.d.ts.map