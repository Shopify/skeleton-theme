/**
 * Specifies configuration options for navigation operations. Allows passing state data that persists across navigation transitions.
 * @publicDocs
 */
export interface NavigationNavigateOptions {
    /**
     * Developer-defined information to be stored in the associated `NavigationHistoryEntry` once the navigation is complete, retrievable using `getState()`. Use to pass data between navigation states or implement stateful navigation workflows.
     */
    state?: unknown;
}
/**
 * Represents a single entry in the navigation history stack. Contains the URL and unique identifier for tracking navigation state and implementing history-based navigation.
 * @publicDocs
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
 * The event object for the `currententrychange` event, which fires when `Navigation.currentEntry` has changed due to navigation within the extension modal. Use to access information about the previous navigation entry when responding to navigation changes.
 * @publicDocs
 */
export interface NavigationCurrentEntryChangeEvent {
    /**
     * The `NavigationHistoryEntry` that was navigated away from. Use to access the previous URL, key, or state when tracking navigation transitions or implementing breadcrumb-style navigation.
     */
    from: NavigationHistoryEntry;
}
/**
 * The `Navigation` object provides navigation controls for extension modals.
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
    /**
     * Registers an event listener for navigation events. The `currententrychange` event fires when the `currentEntry` property changes, such as when the user navigates to a different screen within the extension modal. Use to track navigation changes, update UI state based on the current location, or implement analytics for navigation patterns.
     * @param type - The event type to listen for. Currently only `'currententrychange'` is supported.
     * @param cb - The callback function invoked when the event fires. Receives a `NavigationCurrentEntryChangeEvent` containing the previous entry that was navigated away from.
     */
    addEventListener(type: 'currententrychange', cb: (event: NavigationCurrentEntryChangeEvent) => void): void;
    /**
     * Removes a previously registered event listener. The callback reference must match the one passed to `addEventListener`. Use to clean up event listeners when they are no longer needed, such as when a component unmounts or navigation tracking should be disabled.
     * @param type - The event type to remove the listener for. Currently only `'currententrychange'` is supported.
     * @param cb - The callback function to remove. Must be the same function reference that was passed to `addEventListener`.
     */
    removeEventListener(type: 'currententrychange', cb: (event: NavigationCurrentEntryChangeEvent) => void): void;
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