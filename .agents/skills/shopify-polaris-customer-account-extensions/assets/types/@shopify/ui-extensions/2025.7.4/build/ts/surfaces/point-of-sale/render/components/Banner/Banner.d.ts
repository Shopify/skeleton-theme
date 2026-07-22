export type BannerVariant = 'confirmation' | 'alert' | 'error' | 'information';
export interface BannerProps {
    /**
     * The title text displayed prominently on the banner. This should be concise and clearly communicate the main message or purpose of the banner to merchants.
     */
    title: string;
    /**
     * Controls the visual styling and semantic meaning of the banner. Available options:
     * - `'confirmation'` - Green styling for positive outcomes, successful operations, and completed actions
     * - `'alert'` - Orange styling for important notices and situations that require merchant attention
     * - `'error'` - Red styling for critical errors, failures, and urgent issues requiring immediate action
     * - `'information'` - Blue styling for general information, neutral updates, and helpful tips
     */
    variant: BannerVariant;
    /**
     * The text displayed on the action button within the banner. This provides a clear call-to-action for merchants to address the banner's message. Default is `'Dismiss'` if not specified.
     *
     * @defaultValue 'Dismiss'
     */
    action?: string;
    /**
     * The callback function executed when the banner or its action button is pressed. Use this to handle user interactions such as dismissing the banner, navigating to relevant screens, or triggering specific actions. Default behavior dismisses the banner if not specified.
     *
     * @defaultValue Callback which dismisses the banner
     */
    onPress?: () => void;
    /**
     * Determines whether the action button is visible on the banner. When set to `true`, the action button is hidden, creating a display-only banner. When `false`, the action button is shown with the specified action text. Default is `true` (action button hidden).
     *
     * @defaultValue true
     */
    hideAction?: boolean;
    /**
     * Controls the visibility state of the banner. When set to `true`, the banner is displayed. When `false`, it's hidden. Use this to programmatically show or hide banners based on application state or user interactions.
     */
    visible: boolean;
}
export declare const Banner: "Banner" & {
    readonly type?: "Banner" | undefined;
    readonly props?: BannerProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Banner.d.ts.map