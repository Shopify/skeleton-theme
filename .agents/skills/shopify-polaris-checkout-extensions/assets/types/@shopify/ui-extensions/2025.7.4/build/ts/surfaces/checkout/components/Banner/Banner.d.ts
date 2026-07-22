import type { IdProps, Status } from '../shared';
export interface BannerProps extends IdProps {
    /**
     * Banners have an optional title. Use a title to grab the buyer’s attention
     * with a short, concise message. Banners with no title should have child elements
     * to convey the banner’s purpose to the buyer.
     */
    title?: string;
    /**
     * Sets the status of the banner.
     *
     * @defaultValue 'info'
     */
    status?: Status;
    /**
     * Makes the content collapsible. A collapsible banner will conceal child
     * elements initially, but allow the user to expand the banner to see them.
     *
     * @defaultValue false
     */
    collapsible?: boolean;
    /**
     * Callback when banner is dismissed. This component is
     * [controlled](https://reactjs.org/docs/forms.html#controlled-components),
     * so you must manage the visibility of the banner in state by using
     * the onDismiss callback.
     */
    onDismiss?(): void;
}
/**
 * Use banners to communicate important messages to customers in a prominent way.
 */
export declare const Banner: "Banner" & {
    readonly type?: "Banner" | undefined;
    readonly props?: BannerProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Banner.d.ts.map