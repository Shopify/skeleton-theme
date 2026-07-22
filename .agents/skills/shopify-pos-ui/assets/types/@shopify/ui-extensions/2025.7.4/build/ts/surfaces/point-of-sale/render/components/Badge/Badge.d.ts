export type BadgeVariant = 'neutral' | 'critical' | 'warning' | 'success' | 'highlight';
export type BadgeStatus = 'empty' | 'partial' | 'complete';
export interface BadgeProps {
    /**
     * The text content displayed within the badge. Keep this concise and descriptive to clearly communicate status or category information. Examples include "Paid," "Pending," "Out of Stock," or "VIP Customer."
     */
    text: string;
    /**
     * Controls the visual styling and semantic meaning of the badge. Available options:
     * - `'neutral'` - Gray styling for general status information that doesn't require emphasis. Use for general status updates and standard information.
     * - `'critical'` - Red styling for errors, failures, and urgent issues requiring immediate action. Use for urgent issues that need immediate merchant attention.
     * - `'warning'` - Orange styling for important notices that require merchant awareness. Use for situations that need attention but aren't critical.
     * - `'success'` - Green styling for positive states, completed actions, and successful operations. Use for positive outcomes and successful processes.
     * - `'highlight'` - Bright styling for featured content, promotions, or emphasized information. Use for featured content that should stand out.
     */
    variant: BadgeVariant;
    /**
     * Displays a circular status indicator alongside the badge text. This property is deprecated as of POS 10.0.0 and should not be used in new implementations. Available options: Use the `variant` property instead to convey status information in new implementations.
     * - `'empty'` - Shows an empty circle indicator
     * - `'partial'` - Shows a partially filled circle indicator
     * - `'complete'` - Shows a completely filled circle indicator
     *
     * @deprecated No longer supported as of POS 10.0.0.
     */
    status?: BadgeStatus;
}
export declare const Badge: "Badge" & {
    readonly type?: "Badge" | undefined;
    readonly props?: BadgeProps | undefined;
    readonly children?: true | undefined;
};
//# sourceMappingURL=Badge.d.ts.map