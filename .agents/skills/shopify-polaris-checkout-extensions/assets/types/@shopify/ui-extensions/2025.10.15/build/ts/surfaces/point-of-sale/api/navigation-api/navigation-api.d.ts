/**
 * Specifies configuration options for navigation operations. Allows passing state data that persists across navigation transitions.
 */
export interface NavigationNavigateOptions {
    /**
     * Developer-defined information to be stored in the associated `NavigationHistoryEntry` once the navigation is complete, retrievable using `getState()`. Use to pass data between navigation states or implement stateful navigation workflows.
     */
    state?: unknown;
}
/**
 * Represents a single entry in the navigation history stack. Contains the URL and unique identifier for tracking navigation state and implementing history-based navigation.
 */
export interface NavigationHistoryEntry {
    /**
     * A unique, UA-generated value that represents the history entry's slot in the entries list rather than the entry itself. Use for tracking navigation history or implementing navigation-based logic.
     */
    key: string;
    /**
     * The URL of this history entry. Returns `null` if no URL is associated with the entry. Use for URL-based navigation logic, deep-linking, or displaying current location information.
     */
    url: string | null;
    /**
     * Returns a clone of the available state associated with this history entry. Use to retrieve navigation state data that was passed during navigation or to implement state-based navigation logic.
     */
    getState(): unknown;
}
/**
 * The global `navigation` object provides web-standard navigation functionality. Access these properties directly through the global `navigation` object to manage navigation within modal interfaces.
 *
 * @publicDocs
 */
export interface Navigation {
    /**
     * Navigates to a specific URL, updating any provided state in the history entries list. Returns a promise that resolves when navigation is complete. Use for programmatic navigation between screens, implementing custom navigation controls, or deep-linking to specific modal states.
     */
    navigate: (url: string, options?: NavigationNavigateOptions) => Promise<void>;
    /**
     * Returns a `NavigationHistoryEntry` object representing the location the user is currently navigated to. Use to access current URL, navigation state, or implement navigation-aware functionality based on the current location.
     */
    currentEntry: NavigationHistoryEntry;
    /**
     * Navigates to the previous entry in the history list. Use for implementing back buttons, breadcrumb navigation, or allowing users to return to previous screens in multi-step workflows.
     */
    back(): void;
}
/**
 * The global `window` object provides control over the extension modal lifecycle. Access these properties and methods directly through the global `window` object to manage the modal interface programmatically.
 * @publicDocs
 */
export interface Window {
    /**
     * Closes the extension screen and dismisses the modal interface. Use to programmatically close the modal after completing a workflow, canceling an operation, or when user action is no longer required. This provides the same behavior as the user dismissing the modal through the UI.
     */
    close(): void;
}
//# sourceMappingURL=navigation-api.d.ts.map