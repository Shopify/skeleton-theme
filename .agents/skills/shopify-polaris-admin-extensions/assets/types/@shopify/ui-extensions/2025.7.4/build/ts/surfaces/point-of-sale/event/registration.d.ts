export interface ExtensionRegistrationFunction<ExtensionPoints> {
    <Target extends keyof ExtensionPoints>(target: Target, callback: ExtensionPoints[Target]): ExtensionPoints[Target];
}
export declare function createExtensionRegistrationFunction<ExtensionPoints>(): ExtensionRegistrationFunction<ExtensionPoints>;
//# sourceMappingURL=registration.d.ts.map