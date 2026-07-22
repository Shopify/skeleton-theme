export interface NavigationApiContent {
    /**
     * Navigate to a route in current navigation tree. Pushes the specified screen if it isn't present in the navigation tree, goes back to a created screen otherwise. Use for implementing multi-screen workflows with parameter passing between screens.
     */
    navigate(screenName: string, params?: any): void;
    /**
     * Pops the currently shown screen from the navigation stack. Use for implementing back navigation, returning to previous screens, or programmatically navigating backward in multi-screen workflows.
     */
    pop(): void;
    /**
     * Dismisses the extension modal completely. Use for closing the modal when workflows are complete, cancelled, or when users need to return to the main POS interface.
     */
    dismiss(): void;
}
/**
 * The `NavigationApi` object provides screen-based navigation functionality for modal interfaces. Access these methods through `api.navigation` to manage screen navigation and modal dismissal.
 */
export interface NavigationApi {
    navigation: NavigationApiContent;
}
//# sourceMappingURL=navigation-api.d.ts.map