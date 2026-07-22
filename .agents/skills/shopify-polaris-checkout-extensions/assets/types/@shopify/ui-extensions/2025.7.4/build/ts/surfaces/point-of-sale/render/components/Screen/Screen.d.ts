export interface ScreenPresentationProps {
    /**
     * Displays the screen from the bottom as a sheet presentation when true during navigation. The text label displayed on the secondary action button in the screen's action bar.
     */
    sheet?: boolean;
}
export interface SecondaryActionProps {
    /**
     * The text label displayed on the secondary action button in the screen's action bar.
     */
    text: string;
    /**
     * A callback function triggered when the secondary action button is pressed by the user.
     */
    onPress: () => void;
    /**
     * Whether the secondary action button can be tapped and is interactive.
     */
    isEnabled?: boolean;
}
export interface ScreenProps {
    /**
     * The unique identifier used to identify this screen as a destination in the navigation stack.
     */
    name: string;
    /**
     * The title text of the screen that will be displayed in the UI header.
     */
    title: string;
    /**
     * A boolean that displays a loading indicator when `true`. Set this during asynchronous tasks and return to `false` when data becomes available.
     */
    isLoading?: boolean;
    /**
     * The presentation configuration that dictates how the screen will be displayed when navigated to.
     */
    presentation?: ScreenPresentationProps;
    /**
     * The configuration for a secondary action button displayed on the screen header.
     */
    secondaryAction?: SecondaryActionProps;
    /**
     * A callback function triggered when the screen is navigated to in the navigation stack.
     */
    onNavigate?: () => void;
    /**
     * A callback function triggered when the user navigates back from this screen. Runs after the screen is unmounted.
     */
    onNavigateBack?: () => void;
    /**
     * A callback function that allows you to override the default back navigation action. Runs when the screen is mounted.
     */
    overrideNavigateBack?: () => void;
    /**
     * A callback function triggered when the navigation event completes and the screen receives parameters passed during navigation.
     */
    onReceiveParams?: (params: any) => void;
}
export declare const Screen: "Screen" & {
    readonly type?: "Screen" | undefined;
    readonly props?: ScreenProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Screen.d.ts.map