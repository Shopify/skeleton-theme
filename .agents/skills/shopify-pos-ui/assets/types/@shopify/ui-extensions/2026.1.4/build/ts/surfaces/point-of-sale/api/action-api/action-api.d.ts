/**
 * The `ActionApi` object provides properties for presenting modal interfaces. Access these properties through `shopify.action` to launch full-screen modal experiences.
 *
 * @publicDocs
 */
export interface ActionApiContent {
    /**
     * Presents the corresponding action (modal) target on top of the current view as a full-screen modal. For example, calling this method from `pos.purchase.post.action.menu-item.render` presents `pos.purchase.post.action.render`. Use to launch detailed workflows, complex forms, or multi-step processes that require more screen space than simple components provide.
     */
    presentModal(): void;
}
/** @publicDocs */
export interface ActionApi {
    action: ActionApiContent;
}
//# sourceMappingURL=action-api.d.ts.map