/**
 * The API for interacting with the announcement bar.
 */
export interface AnnouncementApi {
    announcement: Announcement;
}
interface Announcement {
    /**
     * Close the Announcement bar.
     */
    close(): void;
    /**
     * Listen for events from the announcement bar.
     */
    addEventListener(type: 'close', cb: () => void): void;
    /**
     * Remove a listener for events from the announcement bar.
     */
    removeEventListener(type: 'close', cb: () => void): void;
}
export {};
//# sourceMappingURL=announcement.d.ts.map