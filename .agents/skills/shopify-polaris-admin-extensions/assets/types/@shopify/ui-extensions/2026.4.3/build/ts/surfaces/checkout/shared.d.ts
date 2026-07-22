import type { ReadonlySignalLike } from '../../shared';
/**
 * The list of supported components.
 * As of October 1st, 2025, this is a subset of the components that will be available in the 2025-10 stable release.
 */
export declare const SUPPORTED_COMPONENTS: readonly ["Abbreviation", "Announcement", "Badge", "Banner", "Box", "Button", "Chat", "Checkbox", "Chip", "Choice", "ChoiceList", "Clickable", "ClickableChip", "ClipboardItem", "ConsentCheckbox", "ConsentPhoneField", "DateField", "DatePicker", "Details", "Divider", "DropZone", "EmailField", "Form", "Grid", "GridItem", "Heading", "Icon", "Image", "Link", "ListItem", "Map", "MapMarker", "Modal", "MoneyField", "NumberField", "Option", "OrderedList", "Paragraph", "PasswordField", "PaymentIcon", "PhoneField", "Popover", "PressButton", "ProductThumbnail", "Progress", "QueryContainer", "QRCode", "ScrollBox", "Section", "Select", "Sheet", "SkeletonParagraph", "Spinner", "Stack", "Summary", "Switch", "Text", "TextArea", "TextField", "Time", "Tooltip", "UnorderedList", "UrlField"];
export type ThankYouComponent = 'Announcement';
/** @publicDocs */
export type AnyComponent = (typeof SUPPORTED_COMPONENTS)[number];
/**
 * The list of supported components.
 * As of October 1st, 2025, this is a subset of the components that will be available in the 2025-10 stable release.
 */
export type AnyCheckoutComponent = Exclude<AnyComponent, ThankYouComponent>;
export type AnyThankYouComponent = (typeof SUPPORTED_COMPONENTS)[number];
export type AllowedComponents<Allowed extends AnyComponent> = Allowed;
export type AnyCheckoutComponentExcept<Except extends AnyCheckoutComponent> = Exclude<AnyCheckoutComponent, Except>;
/**
 * Represents a reactive signal interface that provides both immediate value access and subscription-based updates. Enables real-time synchronization with changing data through the observer pattern. This interface extends `ReadonlySignalLike` with deprecated fields that are still supported for backwards compatibility.
 */
export interface SubscribableSignalLike<T> extends ReadonlySignalLike<T> {
    /**
     * The current value of the signal. Equivalent to `.value`, accessing this property
     * subscribes to changes when used in a reactive context.
     *
     * @deprecated Use `.value` instead.
     */
    readonly current: T;
    /**
     * Cleans up the subscription and releases any resources held by this signal. After calling
     * `destroy()`, the signal stops receiving updates from the main thread.
     *
     * @deprecated No longer needed. Use [Preact Signals](https://preactjs.com/guide/v10/signals) to manage reactive state instead.
     */
    destroy(): Promise<void>;
}
//# sourceMappingURL=shared.d.ts.map