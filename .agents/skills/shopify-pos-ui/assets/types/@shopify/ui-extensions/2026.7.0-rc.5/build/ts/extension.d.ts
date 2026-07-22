/**
 * Defines the structure of a render extension, which displays UI in the Shopify admin.
 */
export interface RenderExtension<Api, ComponentsSet extends string> {
    /**
     * The API object providing access to extension capabilities, data, and methods. The specific API type depends on the extension target and determines what functionality is available to your extension, such as authentication, storage, data access, and GraphQL querying.
     */
    api: Api;
    /**
     * The set of UI components available for rendering your extension. This defines which Polaris components and custom components can be used to build your extension's interface. The available components vary by extension target.
     */
    components: ComponentsSet;
    /**
     * The render function output. Your extension's render function should return void or a Promise that resolves to void. Use this to perform any necessary setup, rendering, or async operations when your extension loads.
     */
    output: void | Promise<void>;
}
/**
 * Defines the structure of a runnable extension, which executes logic and returns data without rendering UI.
 */
export interface RunnableExtension<Api, Output> {
    /**
     * The API object providing access to extension capabilities and methods. The specific API type depends on the extension target and determines what functionality is available to your extension.
     */
    api: Api;
    /**
     * The function output. Your extension function should return the expected output type or a Promise that resolves to that type. The output type is determined by your specific extension target and use case.
     */
    output: Output | Promise<Output>;
}
//# sourceMappingURL=extension.d.ts.map