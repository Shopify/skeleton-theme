/** VERSION: undefined **/
/* eslint-disable import-x/extensions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable line-comment-position */
/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable no-var */
/* eslint-disable import-x/namespace */
/**
 * TODO: Update `any` type here after this is resolved
 * https://github.com/Shopify/ui-api-design/issues/139
 */
/**
 * Represents any valid child content that can be rendered within a component.
 */
export type ComponentChildren = any;
/**
 * Represents text-only child content.
 */
export type StringChildren = string;
/**
 * Properties that are available on all components.
 */
export interface GlobalProps {
  /**
   * A unique identifier for the element within the document. This ID is used for multiple purposes: targeting the element from JavaScript code, creating relationships between elements (using `commandFor`, `interestFor`, ARIA attributes), linking labels to form controls, enabling fragment navigation with URL anchors (for example, `#section-id`), and applying element-specific styles. The ID must be unique across the entire page—duplicate IDs will cause unexpected behavior and accessibility issues. IDs are case-sensitive and should only contain letters, digits, hyphens, and underscores.
   */
  id?: string;
}
/**
 * Provides slots for primary and secondary action elements.
 */
export interface ActionSlots {
  /**
   * The primary action element to display, typically a button or clickable link representing the most important action available in the current context. This action aligns with the user's primary goal or the main purpose of the interface (for example, "Save changes", "Checkout", "Add to cart", "Submit order"). The primary action receives visual emphasis through styling to draw user attention. Only one primary action is displayed to maintain clear focus on the main call-to-action.
   */
  primaryAction?: ComponentChildren;
  /**
   * Secondary action elements to display, typically button or clickable link elements representing alternative or supporting actions that are less important than the primary action (for example, "Cancel", "Save draft", "Skip", "Learn more"). Secondary actions receive less visual prominence than the primary action to maintain clear hierarchy. Multiple secondary actions can be provided and are displayed together, often in a different visual style or position than the primary action. The order of actions in the array may affect their display order depending on the component.
   */
  secondaryActions?: ComponentChildren;
}
/**
 * Properties for overlay lifecycle callbacks.
 */
export interface BaseOverlayProps {
  /**
   * Called when the overlay begins to appear, immediately after `showOverlay()` is called or the `hidden` property changes to `false`, but before any show animations start. The element may not be visible yet. Common operations include initializing overlay content, fetching data needed for display, setting focus on the first interactive element, or tracking analytics events. Layout calculations should be avoided here as the element may not have final dimensions yet.
   */
  onShow?: (event: Event) => void;
  /**
   * Called after the overlay is fully visible and all show animations have completed. At this point, the overlay is completely rendered with final dimensions and positioning. Common operations include focusing specific elements after animations complete, measuring rendered content dimensions, triggering secondary animations, or initializing interactive features that depend on final layout. This is the safest point for DOM measurements and layout-dependent operations.
   */
  onAfterShow?: (event: Event) => void;
  /**
   * Called when the overlay begins to hide, immediately after `hideOverlay()` is called or the `hidden` property changes to `true`, but before any hide animations start. The element is still visible. Common operations include cleanup tasks, saving overlay state before it disappears, canceling pending requests, or preparing for the post-hide state. This is the last opportunity to interact with the visible overlay before animations begin.
   */
  onHide?: (event: Event) => void;
  /**
   * Called after the overlay is completely hidden and all hide animations have finished. The element is no longer visible or interactive. Common operations include final cleanup, focusing the element that triggered the overlay, navigating to another view, freeing resources, or performing operations that should only occur after the overlay is completely dismissed. Post-dismissal navigation or state updates that would be jarring during animations are appropriate here.
   */
  onAfterHide?: (event: Event) => void;
}
/**
 * Methods for controlling overlay visibility. These methods are required (not optional) because:
 * - Components implementing this interface must provide all methods
 * - Unlike props/attributes, methods aren't rendered in HTML but are JavaScript APIs
 * - Consumers expect these methods to be consistently available on all instances
 */
export interface BaseOverlayMethods {
  /**
   * Programmatically displays the overlay element. When called, the overlay becomes visible and triggers any associated `onShow` and `onAfterShow` callbacks. This method opens modals, dialogs, or other overlay components in response to user actions or application state changes.
   *
   * @implementation This is a method to be called on the element and not a callback and should hence be camelCase
   */
  showOverlay: () => void;
  /**
   * Programmatically hides the overlay element. When called, the overlay becomes hidden and triggers any associated `onHide` and `onAfterHide` callbacks. This method closes modals, dismisses dialogs, or hides overlay components programmatically without requiring user interaction.
   *
   * @implementation This is a method to be called on the element and not a callback and should hence be camelCase
   */
  hideOverlay: () => void;
  /**
   * Programmatically toggles the overlay's visibility state. If currently visible, the overlay will be hidden; if currently hidden, it will be shown. This triggers the appropriate show/hide callbacks based on the resulting state. This method enables toggle buttons or cyclic visibility controls.
   *
   * @implementation This is a method to be called on the element and not a callback and should hence be camelCase
   */
  toggleOverlay: () => void;
}
/**
 * Properties for focus event callbacks.
 */
export interface FocusEventProps {
  /**
   * Called when focus is removed from the element, either by the user moving to another field (tabbing, clicking elsewhere) or programmatically using `blur()`. This event fires before `onChange` for modified fields. The event contains information about which element is receiving focus next (`relatedTarget`). Common operations include triggering validation, saving in-progress changes, hiding related UI elements like autocomplete dropdowns, or tracking field interaction analytics. A common pattern is validating and showing errors on blur to avoid disrupting users while they're still typing. Learn more about [blur events on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
   */
  onBlur?: (event: FocusEvent) => void;
  /**
   * Called when the element receives focus through user interaction (clicking, tabbing) or programmatic methods like `focus()`. This event fires before any input occurs. The event contains information about which element previously had focus (`relatedTarget`). Common operations include showing helper text, highlighting the active field, displaying related UI like autocomplete suggestions, preselecting content, or tracking which fields users interact with. A common pattern is clearing errors on focus to provide a fresh start when users re-attempt input after validation failure. Learn more about [focus events on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
   */
  onFocus?: (event: FocusEvent) => void;
}
/**
 * Defines the available size options for icons using a semantic scale. Provides granular control over icon dimensions from compact inline sizes to prominent display sizes.
 */
export type SizeKeyword =
  | 'small-500'
  | 'small-400'
  | 'small-300'
  | 'small-200'
  | 'small-100'
  | 'small'
  | 'base'
  | 'large'
  | 'large-100'
  | 'large-200'
  | 'large-300'
  | 'large-400'
  | 'large-500';
/**
 * Defines the available color intensity options for icons. Controls the visual prominence and contrast of icon elements within the interface.
 */
export type ColorKeyword = 'subdued' | 'base' | 'strong';
/**
 * A background color keyword including transparent option.
 */
export type BackgroundColorKeyword = 'transparent' | ColorKeyword;
/**
 * Properties for controlling the background color of an element.
 */
export interface BackgroundProps {
  /**
   * Sets the background color intensity of the element. Controls how the element stands out from its surroundings.
   *
   * @default 'transparent'
   */
  background?: BackgroundColorKeyword;
}
/**
 * Defines the semantic tone options for icons. Controls the color and visual emphasis based on the information type and importance being communicated.
 *
 * @default 'auto'
 */
export type ToneKeyword =
  | 'auto'
  | 'neutral'
  | 'info'
  | 'success'
  | 'caution'
  | 'warning'
  | 'critical'
  | 'accent'
  | 'custom';
declare const privateIconArray: readonly [
  'adjust',
  'affiliate',
  'airplane',
  'alert-bubble',
  'alert-circle',
  'alert-diamond',
  'alert-location',
  'alert-octagon',
  'alert-octagon-filled',
  'alert-triangle',
  'alert-triangle-filled',
  'app-extension',
  'apps',
  'archive',
  'arrow-down',
  'arrow-down-circle',
  'arrow-down-right',
  'arrow-left',
  'arrow-left-circle',
  'arrow-right',
  'arrow-right-circle',
  'arrow-up',
  'arrow-up-circle',
  'arrow-up-right',
  'arrows-in-horizontal',
  'arrows-out-horizontal',
  'attachment',
  'automation',
  'backspace',
  'bag',
  'bank',
  'barcode',
  'battery-low',
  'bill',
  'blank',
  'blog',
  'bolt',
  'bolt-filled',
  'book',
  'book-open',
  'bug',
  'bullet',
  'business-entity',
  'button',
  'button-press',
  'calculator',
  'calendar',
  'calendar-check',
  'calendar-compare',
  'calendar-list',
  'calendar-time',
  'camera',
  'camera-flip',
  'caret-down',
  'caret-left',
  'caret-right',
  'caret-up',
  'cart',
  'cart-abandoned',
  'cart-discount',
  'cart-down',
  'cart-filled',
  'cart-sale',
  'cart-send',
  'cart-up',
  'cash-dollar',
  'cash-euro',
  'cash-pound',
  'cash-rupee',
  'cash-yen',
  'catalog-product',
  'categories',
  'channels',
  'chart-cohort',
  'chart-donut',
  'chart-funnel',
  'chart-histogram-first',
  'chart-histogram-first-last',
  'chart-histogram-flat',
  'chart-histogram-full',
  'chart-histogram-growth',
  'chart-histogram-last',
  'chart-histogram-second-last',
  'chart-horizontal',
  'chart-line',
  'chart-popular',
  'chart-stacked',
  'chart-vertical',
  'chat',
  'chat-new',
  'chat-referral',
  'check',
  'check-circle',
  'check-circle-filled',
  'checkbox',
  'chevron-down',
  'chevron-down-circle',
  'chevron-left',
  'chevron-left-circle',
  'chevron-right',
  'chevron-right-circle',
  'chevron-up',
  'chevron-up-circle',
  'circle',
  'circle-dashed',
  'clipboard',
  'clipboard-check',
  'clipboard-checklist',
  'clock',
  'clock-revert',
  'code',
  'code-add',
  'collection',
  'collection-featured',
  'collection-list',
  'collection-reference',
  'color',
  'color-none',
  'compass',
  'complete',
  'compose',
  'confetti',
  'connect',
  'content',
  'contract',
  'corner-pill',
  'corner-round',
  'corner-square',
  'credit-card',
  'credit-card-cancel',
  'credit-card-percent',
  'credit-card-reader',
  'credit-card-reader-chip',
  'credit-card-reader-tap',
  'credit-card-secure',
  'credit-card-tap-chip',
  'crop',
  'currency-convert',
  'cursor',
  'cursor-banner',
  'cursor-option',
  'data-presentation',
  'data-table',
  'database',
  'database-add',
  'database-connect',
  'delete',
  'delivered',
  'delivery',
  'desktop',
  'disabled',
  'disabled-filled',
  'discount',
  'discount-add',
  'discount-automatic',
  'discount-code',
  'discount-remove',
  'dns-settings',
  'dock-floating',
  'dock-side',
  'domain',
  'domain-landing-page',
  'domain-new',
  'domain-redirect',
  'download',
  'drag-drop',
  'drag-handle',
  'drawer',
  'duplicate',
  'edit',
  'email',
  'email-follow-up',
  'email-newsletter',
  'empty',
  'enabled',
  'enter',
  'envelope',
  'envelope-soft-pack',
  'eraser',
  'exchange',
  'exit',
  'export',
  'external',
  'eye-check-mark',
  'eye-dropper',
  'eye-dropper-list',
  'eye-first',
  'eyeglasses',
  'fav',
  'favicon',
  'file',
  'file-list',
  'filter',
  'filter-active',
  'flag',
  'flip-horizontal',
  'flip-vertical',
  'flower',
  'folder',
  'folder-add',
  'folder-down',
  'folder-remove',
  'folder-up',
  'food',
  'foreground',
  'forklift',
  'forms',
  'games',
  'gauge',
  'geolocation',
  'gift',
  'gift-card',
  'git-branch',
  'git-commit',
  'git-repository',
  'globe',
  'globe-asia',
  'globe-europe',
  'globe-lines',
  'globe-list',
  'graduation-hat',
  'grid',
  'hashtag',
  'hashtag-decimal',
  'hashtag-list',
  'heart',
  'hide',
  'hide-filled',
  'home',
  'home-filled',
  'icons',
  'identity-card',
  'image',
  'image-add',
  'image-alt',
  'image-explore',
  'image-magic',
  'image-none',
  'image-with-text-overlay',
  'images',
  'import',
  'in-progress',
  'incentive',
  'incoming',
  'incomplete',
  'info',
  'info-filled',
  'inheritance',
  'inventory',
  'inventory-edit',
  'inventory-list',
  'inventory-transfer',
  'inventory-updated',
  'iq',
  'key',
  'keyboard',
  'keyboard-filled',
  'keyboard-hide',
  'keypad',
  'label-printer',
  'language',
  'language-translate',
  'layout-block',
  'layout-buy-button',
  'layout-buy-button-horizontal',
  'layout-buy-button-vertical',
  'layout-column-1',
  'layout-columns-2',
  'layout-columns-3',
  'layout-footer',
  'layout-header',
  'layout-logo-block',
  'layout-popup',
  'layout-rows-2',
  'layout-section',
  'layout-sidebar-left',
  'layout-sidebar-right',
  'lightbulb',
  'link',
  'link-list',
  'list-bulleted',
  'list-bulleted-filled',
  'list-numbered',
  'live',
  'live-critical',
  'live-none',
  'location',
  'location-none',
  'lock',
  'map',
  'markets',
  'markets-euro',
  'markets-rupee',
  'markets-yen',
  'maximize',
  'measurement-size',
  'measurement-size-list',
  'measurement-volume',
  'measurement-volume-list',
  'measurement-weight',
  'measurement-weight-list',
  'media-receiver',
  'megaphone',
  'mention',
  'menu',
  'menu-filled',
  'menu-horizontal',
  'menu-vertical',
  'merge',
  'metafields',
  'metaobject',
  'metaobject-list',
  'metaobject-reference',
  'microphone',
  'minimize',
  'minus',
  'minus-circle',
  'mobile',
  'money',
  'money-none',
  'money-split',
  'moon',
  'nature',
  'note',
  'note-add',
  'notification',
  'order',
  'order-batches',
  'order-draft',
  'order-filled',
  'order-first',
  'order-fulfilled',
  'order-repeat',
  'order-unfulfilled',
  'orders-status',
  'organization',
  'outdent',
  'outgoing',
  'package',
  'package-cancel',
  'package-fulfilled',
  'package-on-hold',
  'package-reassign',
  'package-returned',
  'page',
  'page-add',
  'page-attachment',
  'page-clock',
  'page-down',
  'page-heart',
  'page-list',
  'page-reference',
  'page-remove',
  'page-report',
  'page-up',
  'pagination-end',
  'pagination-start',
  'paint-brush-flat',
  'paint-brush-round',
  'paper-check',
  'partially-complete',
  'passkey',
  'paste',
  'pause-circle',
  'payment',
  'payment-capture',
  'payout',
  'payout-dollar',
  'payout-euro',
  'payout-pound',
  'payout-rupee',
  'payout-yen',
  'person',
  'person-add',
  'person-exit',
  'person-filled',
  'person-list',
  'person-lock',
  'person-remove',
  'person-segment',
  'personalized-text',
  'phablet',
  'phone',
  'phone-in',
  'phone-out',
  'pin',
  'pin-remove',
  'plan',
  'play',
  'play-circle',
  'plus',
  'plus-circle',
  'plus-circle-down',
  'plus-circle-filled',
  'plus-circle-up',
  'point-of-sale',
  'point-of-sale-register',
  'price-list',
  'print',
  'product',
  'product-add',
  'product-cost',
  'product-filled',
  'product-list',
  'product-reference',
  'product-remove',
  'product-return',
  'product-unavailable',
  'profile',
  'profile-filled',
  'question-circle',
  'question-circle-filled',
  'receipt',
  'receipt-dollar',
  'receipt-euro',
  'receipt-folded',
  'receipt-paid',
  'receipt-pound',
  'receipt-refund',
  'receipt-rupee',
  'receipt-yen',
  'receivables',
  'redo',
  'referral-code',
  'refresh',
  'remove-background',
  'reorder',
  'replace',
  'replay',
  'reset',
  'return',
  'reward',
  'rocket',
  'rotate-left',
  'rotate-right',
  'sandbox',
  'save',
  'savings',
  'scan-qr-code',
  'search',
  'search-add',
  'search-list',
  'search-recent',
  'search-resource',
  'select',
  'send',
  'settings',
  'share',
  'shield-check-mark',
  'shield-none',
  'shield-pending',
  'shield-person',
  'shipping-label',
  'shipping-label-cancel',
  'shopcodes',
  'slideshow',
  'smiley-happy',
  'smiley-joy',
  'smiley-neutral',
  'smiley-sad',
  'social-ad',
  'social-post',
  'sort',
  'sort-ascending',
  'sort-descending',
  'sound',
  'sports',
  'star',
  'star-circle',
  'star-filled',
  'star-half',
  'star-list',
  'status',
  'status-active',
  'stop-circle',
  'store',
  'store-import',
  'store-managed',
  'store-online',
  'sun',
  'table',
  'table-masonry',
  'tablet',
  'target',
  'tax',
  'team',
  'text',
  'text-align-center',
  'text-align-left',
  'text-align-right',
  'text-block',
  'text-bold',
  'text-color',
  'text-font',
  'text-font-list',
  'text-grammar',
  'text-in-columns',
  'text-in-rows',
  'text-indent',
  'text-indent-remove',
  'text-italic',
  'text-quote',
  'text-title',
  'text-underline',
  'text-with-image',
  'theme',
  'theme-edit',
  'theme-store',
  'theme-template',
  'three-d-environment',
  'thumbs-down',
  'thumbs-up',
  'tip-jar',
  'toggle-off',
  'toggle-on',
  'transaction',
  'transaction-fee-add',
  'transaction-fee-dollar',
  'transaction-fee-euro',
  'transaction-fee-pound',
  'transaction-fee-rupee',
  'transaction-fee-yen',
  'transfer',
  'transfer-in',
  'transfer-internal',
  'transfer-out',
  'truck',
  'undo',
  'unknown-device',
  'unlock',
  'upload',
  'variant',
  'view',
  'viewport-narrow',
  'viewport-short',
  'viewport-tall',
  'viewport-wide',
  'wallet',
  'wand',
  'watch',
  'wifi',
  'work',
  'work-list',
  'wrench',
  'x',
  'x-circle',
  'x-circle-filled',
];
/**
 * A valid icon identifier from the available icon set.
 */
export type IconType = (typeof privateIconArray)[number];
/**
 * Like `Extract`, but ensures that the extracted type is a strict subtype of the input type.
 */
export type ExtractStrict<T, U extends T> = Extract<T, U>;
/**
 * A utility type for properties that support [1-to-4-value shorthand syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Shorthand_properties#edges_of_a_box).
 */
export type MaybeAllValuesShorthandProperty<T extends string> =
  | T
  | `${T} ${T}`
  | `${T} ${T} ${T}`
  | `${T} ${T} ${T} ${T}`;
/**
 * Defines a shorthand property that accepts either a single value or two space-separated values for directional properties like padding and spacing.
 */
export type MaybeTwoValuesShorthandProperty<T extends string> = T | `${T} ${T}`;
/**
 * A utility type for values that can be responsive using container queries.
 */
export type MaybeResponsive<T> = T | `@container${string}`;
/**
 * Prevents widening string literal types in a union to `string`.
 * @example
 * type PropName = 'foo' | 'bar' | string
 * //   ^? string
 * type PropName = 'foo' | 'bar' | (string & {})
 * //   ^? 'foo' | 'bar' | (string & {})
 */
export type AnyString = string & {};
/**
 * A utility type that allows optional spacing in string literal values.
 *
 * For example, in the `aspectRatio` property, `16/9` and `16 / 9` are both valid.
 */
export type optionalSpace = '' | ' ';
export interface BadgeProps extends GlobalProps {
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
  /**
   * The semantic tone of the badge, based on the intention of the information being conveyed. Badges rely on the tone system for semantic meaning, so using custom styling may not clearly convey meaning to merchants.
   *
   * @default 'auto'
   */
  tone?: ToneKeyword;
  /**
   * The color intensity of the badge. Controls how prominent or subtle the badge appears within the interface.
   *
   * @default 'base'
   */
  color?: ColorKeyword;
  /**
   * The icon identifier specifying which icon to display within the badge. Accepts any valid icon name from the icon set.
   *
   * @default ''
   */
  icon?: IconType | AnyString;
  /**
   * The position of the icon relative to the badge text content:
   * - `'start'`: Icon appears before the text
   * - `'end'`: Icon appears after the text
   */
  iconPosition?: 'start' | 'end';
  /**
   * Adjusts the size of the badge and its icon. Available sizes range from `'small-500'` (smallest) through `'base'` (default) to `'large-500'` (largest), allowing you to match badge size to your interface hierarchy.
   *
   * @default 'base'
   */
  size?: SizeKeyword;
}
export interface BannerProps extends GlobalProps, ActionSlots {
  /**
   * The title text displayed prominently at the top of the banner. This is the only property for text content—body text content isn't supported. You can't place `<s-text>` or other text elements as children.
   *
   * @default ''
   */
  heading?: string;
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
  /**
   * Sets the visual appearance and accessibility behavior of the banner. The tone determines both the color scheme and how screen readers announce the banner. Available options:
   * - `'auto'` - Lets the system automatically choose the appropriate tone based on context.
   * - `'success'` - Green styling for positive outcomes and successful operations. Creates an informative live region for screen readers.
   * - `'info'` - Blue styling for general information and neutral updates. Creates an informative live region for screen readers.
   * - `'warning'` - Orange styling for important notices that require attention. Creates an informative live region for screen readers.
   * - `'critical'` - Red styling for errors and urgent issues requiring immediate action. Creates an assertive live region that is announced immediately by screen readers.
   *
   * Learn more about [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions), [alert role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role), and [status role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role) on MDN.
   *
   * @default 'auto'
   */
  tone?: ToneKeyword;
  /**
   * Whether the banner content can be collapsed and expanded. When `true`, the banner displays a collapse/expand toggle control and child elements are initially hidden. Users can click the toggle to reveal or hide the content. Typically applied to lengthy banners or supplementary information that users can choose to view. Collapsed state persists during the component lifecycle but resets on re-render.
   *
   * @default false
   */
  collapsible?: boolean;
  /**
   * Whether a close button is displayed in the banner. When `true`, a close (X) button appears allowing users to permanently dismiss the banner. Once dismissed, the banner triggers the `onDismiss` callback and remains hidden until the component is re-rendered or the `hidden` property is changed. Typically applied to non-critical notifications or messages that users can choose to dismiss after reading.
   *
   * @default false
   */
  dismissible?: boolean;
  /**
   * Called when the user dismisses the banner by clicking the close (X) button. This only fires for user-initiated dismissals through the UI close button, not when the banner is hidden programmatically using the `hidden` property. The callback fires after the user clicks but before hide animations begin. Common operations include tracking dismissal metrics, saving user preferences to avoid showing the banner again, performing cleanup when banners are dismissed, or triggering follow-up actions. The banner remains in the DOM after dismissal (just hidden) until re-rendered—complete removal requires controlling rendering at the component level based on dismissal state.
   */
  onDismiss?: (event: Event) => void;
  /**
   * Called after the element is fully hidden and all hide animations have completed.
   *
   * @implementation If implementations animate the hiding of the banner,
   * this event must fire after the banner has fully hidden.
   * We can add an `onHide` event in future if we want to provide a hook for the start of the animation.
   */
  onAfterHide?: (event: Event) => void;
  /**
   * Whether the banner is visible or hidden. When set to `true`, the banner is completely hidden from view and removed from the accessibility tree, meaning screen readers won't announce it. Changing this value triggers hide/show animations if configured. Unlike temporary dismissal with the close button, this property provides programmatic control for conditional visibility based on application state, user permissions, or other dynamic conditions.
   *
   * @default false
   */
  hidden?: boolean;
}
/**
 * Properties for controlling the display behavior of an element.
 */
export interface DisplayProps {
  /**
   * Sets the outer display type controlling the element's participation in flow layout. When set to `'none'`, the element is completely removed from both the visual layout and the accessibility tree—it takes up no space and screen readers ignore it entirely, as if it doesn't exist in the DOM. This is different from `hidden` which may keep some accessibility tree presence. The element's `children` and event listeners remain in memory. The value `'auto'` (default) applies normal display behavior. Learn more about the [CSS display property on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/display).
   *
   * @default 'auto'
   */
  display?: MaybeResponsive<'auto' | 'none'>;
}
/**
 * Properties for defining the semantic role of an element for assistive technologies.
 */
export interface AccessibilityRoleProps {
  /**
   * Sets the semantic role for assistive technologies. Helps screen reader users navigate and understand page structure.
   *
   * @implementation Although, in HTML hosts, this property changes the element used,
   * changing this property must not impact the visual styling of inside or outside of the box.
   *
   * @default 'generic'
   */
  accessibilityRole?: AccessibilityRole;
}
export type AccessibilityRole =
  /**
   * Used to indicate the primary content area of the page.
   *
   * In an HTML host, `main` will render a `<main>` element.
   * Learn more about the [`<main>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role) in the MDN web docs.
   */
  | 'main'
  /**
   * Used to indicate the element is a header section.
   *
   * In an HTML host `header` will render a `<header>` element.
   * Learn more about the [`<header>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role) in the MDN web docs.
   */
  | 'header'
  /**
   * Used to display footer information such as copyright information, navigation links, and privacy statements.
   *
   * In an HTML host `footer` will render a `<footer>` element.
   * Learn more about the [`<footer>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/contentinfo_role) in the MDN web docs.
   */
  | 'footer'
  /**
   * Used to indicate a thematic grouping of content.
   * Sections should always have a heading or an accessible name provided in the `accessibilityLabel` property.
   *
   * In an HTML host `section` will render a `<section>` element.
   * Learn more about the [`<section>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role) in the MDN web docs.
   *
   */
  | 'section'
  /**
   * Used to designate a supporting section that is tangentially related to the main content.
   *
   * In an HTML host `aside` will render an `<aside>` element.
   * Learn more about the [`<aside>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/complementary_role) in the MDN web docs.
   */
  | 'aside'
  /**
   * Used to identify navigation link groups used for navigating through the site or page.
   *
   * In an HTML host `navigation` will render a `<nav>` element.
   * Learn more about the [`<nav>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role) in the MDN web docs.
   */
  | 'navigation'
  /**
   * Used to identify a list where items have a meaningful order or sequence.
   *
   * In an HTML host `ordered-list` will render a `<ol>` element.
   * Learn more about the [`<ol>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role) in the MDN web docs.
   */
  | 'ordered-list'
  /**
   * Used to identify an item inside a list of items.
   *
   * In an HTML host `list-item` will render a `<li>` element.
   * Learn more about the [`<li>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listitem_role) in the MDN web docs.
   */
  | 'list-item'
  /**
   * Used to indicate the component acts as a divider that separates and distinguishes sections of content in a list of items.
   *
   * In an HTML host `list-item-separator` will render as `<li role="separator">`.
   * Learn more about the [`<li>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) and the [`separator` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role) in the MDN web docs.
   */
  | 'list-item-separator'
  /**
   * Used to identify a list where item order has no significance.
   *
   * In an HTML host `unordered-list` will render a `<ul>` element.
   * Learn more about the [`<ul>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role) in the MDN web docs.
   */
  | 'unordered-list'
  /**
   * Used to indicate the component acts as a divider that separates and distinguishes sections of content.
   *
   * In an HTML host `separator` will render as `<div role="separator">`.
   * Learn more about the [`separator` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role) in the MDN web docs.
   */
  | 'separator'
  /**
   * Used to define a live region containing advisory information for the user that isn't important enough to be an alert.
   *
   * In an HTML host `status` will render as `<div role="status">`.
   * Learn more about the [`status` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role) in the MDN web docs.
   */
  | 'status'
  /**
   * Used for important and usually time-sensitive information that requires immediate attention.
   *
   * In an HTML host `alert` will render as `<div role="alert">`.
   * Learn more about the [`alert` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role) in the MDN web docs.
   */
  | 'alert'
  /**
   * Used to create a container element with no specific semantic meaning.
   *
   * In an HTML host `generic'` will render a `<div>` element.
   * Learn more about the [`generic` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/generic_role) in the MDN web docs.
   */
  | 'generic'
  /**
   * Used to remove semantic meaning from an element while preserving its visual styling.
   *
   * Synonym for `none`
   * Learn more about the [`presentation` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/presentation_role) in the MDN web docs.
   */
  | 'presentation'
  /**
   * Used to remove semantic meaning from an element while preserving its visual styling.
   *
   * Synonym for `presentation`
   * Learn more about the [`none` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/none_role) in the MDN web docs.
   */
  | 'none';
/**
 * Properties for controlling visibility to assistive technologies.
 */
export interface AccessibilityVisibilityProps {
  /**
   * Controls visibility for assistive technologies:
   * - `'visible'`: Announced normally by screen readers
   * - `'hidden'`: Hidden from screen readers while remaining visually visible
   * - `'exclusive'`: Only this element is announced to screen readers, hiding other content
   *
   * @default 'visible'
   */
  accessibilityVisibility?: 'visible' | 'hidden' | 'exclusive';
}
/**
 * Properties for controlling the visibility of field labels to screen readers.
 */
export interface LabelAccessibilityVisibilityProps {
  /**
   * Controls whether the label is announced to screen readers:
   * - `'visible'`: Label is announced normally by screen readers
   * - `'exclusive'`: Only the label is announced, hiding other related content from screen readers
   *
   * @default 'visible'
   */
  labelAccessibilityVisibility?: ExtractStrict<
    AccessibilityVisibilityProps['accessibilityVisibility'],
    'visible' | 'exclusive'
  >;
}
/**
 * Defines the available padding size options using a semantic scale. Provides consistent spacing values that align with the POS design system.
 */
export type PaddingKeyword = SizeKeyword | 'none';
/**
 * Properties for controlling the padding (internal spacing) of an element.
 */
export interface PaddingProps {
  /**
   * The padding applied to all edges of the container. Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Shorthand_properties#edges_of_a_box) using flow-relative values in the order:
   *
   * - 4 values: `block-start inline-end block-end inline-start`
   * - 3 values: `block-start inline block-end`
   * - 2 values: `block inline`
   *
   * For example:
   *
   * - `large` means block-start, inline-end, block-end and inline-start paddings are `large`.
   * - `large none` means block-start and block-end paddings are `large`, inline-start and inline-end paddings are `none`.
   * - `large none large` means block-start padding is `large`, inline-end padding is `none`, block-end padding is `large` and inline-start padding is `none`.
   * - `large none large small` means block-start padding is `large`, inline-end padding is `none`, block-end padding is `large` and inline-start padding is `small`.
   *
   * An `auto` value inherits the default padding from the closest container that has removed its usual padding.
   *
   * @default 'none'
   */
  padding?: MaybeResponsive<MaybeAllValuesShorthandProperty<PaddingKeyword>>;
  /**
   * The block-axis padding for the container. Overrides the block value of the `padding` property.
   *
   * @default '' - meaning no override
   */
  paddingBlock?: MaybeResponsive<
    MaybeTwoValuesShorthandProperty<PaddingKeyword> | ''
  >;
  /**
   * The block-start padding for the container. Overrides the block-start value of the `paddingBlock` property.
   *
   * @default '' - meaning no override
   */
  paddingBlockStart?: MaybeResponsive<PaddingKeyword | ''>;
  /**
   * The block-end padding for the container. Overrides the block-end value of the `paddingBlock` property.
   *
   * @default '' - meaning no override
   */
  paddingBlockEnd?: MaybeResponsive<PaddingKeyword | ''>;
  /**
   * The inline-axis padding for the container. Supports two-value syntax where `large none` sets inline-start to `large` and inline-end to `none`. Overrides the inline value of the `padding` property.
   *
   * @default '' - meaning no override
   */
  paddingInline?: MaybeResponsive<
    MaybeTwoValuesShorthandProperty<PaddingKeyword> | ''
  >;
  /**
   * The inline-start padding for the container. Overrides the inline-start value of the `paddingInline` property.
   *
   * @default '' - meaning no override
   */
  paddingInlineStart?: MaybeResponsive<PaddingKeyword | ''>;
  /**
   * The inline-end padding for the container. Overrides the inline-end value of the `paddingInline` property.
   *
   * @default '' - meaning no override
   */
  paddingInlineEnd?: MaybeResponsive<PaddingKeyword | ''>;
}
/**
 * Defines exact size measurements without automatic or unconstrained options. Limited to specific pixel values, percentages, or zero.
 */
export type SizeUnits = `${number}px` | `${number}%` | `0`;
/**
 * Defines size values that can be specified as exact measurements or automatic sizing. Supports pixel values, percentages, zero, or automatic sizing based on content.
 */
export type SizeUnitsOrAuto = SizeUnits | 'auto';
/**
 * Defines size values that can be specified as exact measurements or no constraint. Supports pixel values, percentages, zero, or no maximum limit.
 */
export type SizeUnitsOrNone = SizeUnits | 'none';
/**
 * Properties for controlling the dimensions of an element.
 */
export interface SizingProps {
  /**
   * The block size of the container. Auto automatically sizes based on the container's children.
   *
   * @default 'auto'
   */
  blockSize?: MaybeResponsive<SizeUnitsOrAuto>;
  /**
   * The minimum block size constraint for the container.
   *
   * @default '0'
   */
  minBlockSize?: MaybeResponsive<SizeUnits>;
  /**
   * The maximum block size constraint for the container.
   *
   * @default 'none'
   */
  maxBlockSize?: MaybeResponsive<SizeUnitsOrNone>;
  /**
   * The inline size of the container. Auto automatically sizes based on the container's children.
   *
   * @default 'auto'
   */
  inlineSize?: MaybeResponsive<SizeUnitsOrAuto>;
  /**
   * The minimum inline size constraint for the container.
   *
   * @default '0'
   */
  minInlineSize?: MaybeResponsive<SizeUnits>;
  /**
   * The maximum inline size constraint for the container.
   *
   * @default 'none'
   */
  maxInlineSize?: MaybeResponsive<SizeUnitsOrNone>;
}
/**
 * A border line style keyword.
 */
export type BorderStyleKeyword =
  | 'none'
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'auto';
/**
 * A border thickness keyword.
 */
export type BorderSizeKeyword = SizeKeyword | 'none';
/**
 * A border radius keyword including maximum rounding option.
 */
export type BorderRadiusKeyword = SizeKeyword | 'max' | 'none';
/**
 * Represents a shorthand for defining a border. It can be a combination of size, optionally followed by color, optionally followed by style.
 */
export type BorderShorthand =
  | BorderSizeKeyword
  | `${BorderSizeKeyword} ${ColorKeyword}`
  | `${BorderSizeKeyword} ${ColorKeyword} ${BorderStyleKeyword}`;
/**
 * Properties for controlling the border styling of an element.
 */
export interface BorderProps {
  /**
   * Sets the border style, width, and color using shorthand syntax. Accepts a size keyword, optionally followed by a color keyword, optionally followed by a style keyword.
   *
   * @example
   * // The following are equivalent:
   * <Box border="large-100 strong dashed" />
   * <Box borderWidth="large-100" borderColor="strong" borderStyle="dashed" />
   *
   * @default 'none' - equivalent to `none base auto`.
   */
  border?: BorderShorthand;
  /**
   * Sets the thickness of the border using size keywords. Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) for specifying different widths per edge.
   *
   * @default '' - meaning no override
   */
  borderWidth?: MaybeAllValuesShorthandProperty<BorderSizeKeyword> | '';
  /**
   * Sets the line style of the border. Controls the visual pattern of the border lines (for example, solid, dashed, dotted). Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) for specifying different styles per edge.
   *
   * @default '' - meaning no override
   */
  borderStyle?: MaybeAllValuesShorthandProperty<BorderStyleKeyword> | '';
  /**
   * Sets the color intensity of the border. Controls how prominent the border appears.
   *
   * @default '' - meaning no override
   */
  borderColor?: ColorKeyword | '';
  /**
   * Sets the corner rounding radius of the border. Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) for specifying different radii per corner.
   *
   * @defaultValue 'none'
   */
  borderRadius?: MaybeAllValuesShorthandProperty<BorderRadiusKeyword>;
}
/**
 * Properties for controlling overflow behavior when content exceeds container bounds.
 */
export interface OverflowProps {
  /**
   * Controls how the container handles content that exceeds its dimensions:
   * - `'visible'`: Content extends beyond the container's boundaries without clipping or scrolling. Overflow content is fully visible and may overlap other elements. This is the default behavior and works well for containers that should expand to fit their content naturally.
   * - `'hidden'`: Content that exceeds the container is clipped and hidden from view—users can't see or access the overflow content. No scrollbars appear. Typically applied to intentionally limit visible content, create masked effects, or prevent content from breaking layouts. Hidden content may include important information users can't access.
   * - `'auto'`: Only available in some components like scroll box. Adds scrollbars automatically when content exceeds the container, allowing users to scroll to view overflow content. Scrollbars only appear when needed. Commonly applied to scrollable regions, content lists, or containers where users should access all content but space is limited.
   *
   * The choice depends on layout needs: `'visible'` for flexible layouts, `'hidden'` for strict boundaries, `'auto'` for user-controlled scrolling. Setting overflow establishes a new block formatting context, which affects layout behaviors like margin collapsing and positioning.
   *
   * @default 'visible'
   */
  overflow?: 'hidden' | 'visible';
}
/**
 * Base properties for box-like container elements.
 */
export interface BaseBoxProps
  extends AccessibilityVisibilityProps,
    BackgroundProps,
    DisplayProps,
    SizingProps,
    PaddingProps,
    BorderProps,
    OverflowProps {
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
  /**
   * A text label that describes the purpose, function, or contents of the element for users of assistive technologies like screen readers. This label is announced by screen readers but isn't visually displayed. Typically applied when an element doesn't have visible text that adequately describes it, such as icon-only buttons, image carousels, or complex interactive regions. The label is concise yet descriptive (for example, "Close modal", "Product image carousel", "Shopping cart with 3 items"). If the element already has clear visible labels or headings, this property may be unnecessary. For form fields, the `label` property is both visible and accessible.
   */
  accessibilityLabel?: string;
}
/**
 * Base properties for box-like container elements with semantic role support.
 */
export interface BaseBoxPropsWithRole
  extends BaseBoxProps,
    AccessibilityRoleProps {}
/**
 * Properties for button-like interactive elements with form-related behavior.
 */
export interface ButtonBehaviorProps extends InteractionProps, FocusEventProps {
  /**
   * The semantic meaning of the button action within a form context:
   * - `'button'`: A standard button with no default form behavior
   * - `'submit'`: Submits the containing form when activated
   * - `'reset'`: Resets the containing form to its initial values when activated
   *
   * @default 'button'
   */
  type?: 'submit' | 'button' | 'reset';
  /**
   * Called when the element is clicked or activated. Learn more about [click events on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event).
   */
  onClick?: (event: Event) => void;
  /**
   * Whether the field is disabled, preventing user interaction. Use when the field is temporarily unavailable due to application state, permissions, or dependencies.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Indicates whether the button action is currently in progress. When `true`, replaces all button content with a loading spinner and prevents additional clicks to avoid duplicate submissions. The button remains visually enabled but unresponsive to interaction. Set to `true` when starting an async operation (for example, API call, navigation) and back to `false` when the operation completes or fails. This provides user feedback during long-running operations and prevents race conditions from multiple rapid clicks. Custom loading indicators or partial content updates aren't supported.
   *
   * @default false
   */
  loading?: boolean;
}
/**
 * Properties for link-like interactive elements with navigation behavior.
 */
export interface LinkBehaviorProps extends InteractionProps, FocusEventProps {
  /**
   * The URL to navigate to when the element is clicked or activated. Supports absolute URLs (for example, `https://shopify.com`), relative URLs (for example, `/products`), and anchor links (for example, `#section-id`). Navigation is triggered after the `onClick` event completes, allowing navigation to be canceled by preventing the default event action. The actual navigation behavior depends on the `target` property—same page, new tab, or external navigation. For security, browsers may block navigation to certain protocols or untrusted origins. Commonly applied to create navigational links, external resource links, or in-app routing.
   */
  href?: string;
  /**
   * Specifies where to display the linked URL:
   * - `'auto'`: The target is automatically determined based on the origin of the URL (typically behaves as `'_self'` but surfaces may handle cross-origin URLs differently)
   * - `'_blank'`: Opens the URL in a new tab or window
   * - `'_self'`: Opens the URL in the same browsing context
   * - `'_parent'`: Opens the URL in the parent browsing context
   * - `'_top'`: Opens the URL in the topmost browsing context
   * - Custom string: Any other valid target name
   *
   * Learn more about the [`target` attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).
   *
   * @implementation Surfaces can set specific rules on how they handle each URL.
   * @implementation It's expected that the behavior of `auto` is as `_self` except in specific cases.
   * @implementation For example, a surface could decide to open cross-origin URLs in a new window (as `_blank`).
   *
   * @default 'auto'
   */
  target?: 'auto' | '_blank' | '_self' | '_parent' | '_top' | AnyString;
  /**
   * Treats the link as a file download instead of navigation. When set, clicking the link downloads the resource at the `href` URL rather than navigating to it. The value becomes the suggested filename shown in the download dialog or used by the browser's default save behavior (for example, `download="receipt.pdf"` saves as "receipt.pdf"). If the value is an empty string, the browser determines the filename from the URL or server headers. This only works for same-origin URLs (your app's domain) or `blob:` and `data:` URLs for security reasons—cross-origin URLs will navigate normally. Commonly applied to generate and download reports, receipts, CSV exports, or any file that should be saved rather than displayed. Learn more about the [`download` attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).
   */
  download?: string;
  /**
   * Called when the element is clicked or activated. Learn more about [click events on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event).
   */
  onClick?: (event: Event) => void;
}
/**
 * Properties for controlling interactions between elements using commands.
 */
export interface InteractionProps {
  /**
   * The ID of the target element that should respond when this element is clicked or activated. This creates a relationship where clicking this control (button, clickable) triggers an action on another element in the DOM. The target element must have a matching `id` attribute. Use with the `command` property to specify what action should occur (show, hide, toggle). This enables declarative element control without writing custom click handlers, improving accessibility and reducing JavaScript. Common use cases include: opening modals from buttons, toggling content visibility, showing/hiding sidebars, or controlling overlay states. If both `commandFor` and `onClick` are present, both will execute—the command action occurs first, then the click handler. Learn more about [`commandfor` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#commandfor).
   */
  commandFor?: string;
  /**
   * The action to perform on the target element specified by `commandFor`:
   * - `'--auto'`: Execute the target element's default action (typically show for overlays, or the element's primary interaction)
   * - `'--show'`: Make the target element visible by calling its `showOverlay()` method or setting appropriate visibility properties
   * - `'--hide'`: Hide the target element by calling its `hideOverlay()` method or setting appropriate visibility properties
   * - `'--toggle'`: Switch the target element's visibility state—if visible, hide it; if hidden, show it
   * - `'--copy'`: Copy content to the clipboard (requires the target to be a compatible element with copy functionality)
   *
   * The command executes when this element is clicked, before any `onClick` handlers fire. If the target element doesn't support the specified command, the action may fail silently. Learn more about [button commands on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command).
   *
   * @default '--auto'
   */
  command?: '--auto' | '--show' | '--hide' | '--toggle' | '--copy';
  /**
   * The ID of a target element that should respond to hover and focus events on this element, creating an "interest" relationship. When the user hovers over or focuses this element, the target element receives corresponding interest events, allowing it to preview or prepare content. This is useful for implementing tooltip-like previews, image zoom on hover, showing additional details before clicking, or loading content speculatively when the user shows interest. The target element must have a matching `id` and listen for interest events. Unlike `commandFor` which responds to clicks, this responds to hover and focus, providing earlier user intent signals.
   */
  interestFor?: string;
}
/**
 * Combined properties for elements that can behave as both buttons and links.
 */
export interface BaseClickableProps
  extends ButtonBehaviorProps,
    LinkBehaviorProps {}
export interface ButtonProps extends GlobalProps, BaseClickableProps {
  /**
   * A label that describes the purpose or contents of the element. Announced to users with assistive technologies such as screen readers to provide context.
   */
  accessibilityLabel?: string;
  /**
   * The child elements to render within this component. button content must be plain text.
   */
  children?: ComponentChildren;
  /**
   * The icon identifier specifying which icon to display. Accepts any valid icon name from the icon set.
   *
   * @default ''
   */
  icon?: IconType | AnyString;
  /**
   * Controls how the element's width adapts to its container and content.
   *
   * @default 'auto'
   */
  inlineSize?: 'auto' | 'fill' | 'fit-content';
  /**
   * Changes the visual appearance and prominence of the button:
   * - `'auto'`: The variant is automatically determined by context
   * - `'primary'`: Creates a prominent call-to-action button with high visual emphasis for the most important action on a screen
   * - `'secondary'`: Provides a less prominent button appearance for supporting actions and secondary interactions
   * - `'tertiary'`: Provides the least prominent button appearance for tertiary or optional actions
   *
   * @default 'auto'
   */
  variant?: 'auto' | 'primary' | 'secondary' | 'tertiary';
  /**
   * Sets the tone of the button, based on the intention of the information being conveyed.
   *
   * - `'auto'` - Automatically determines the appropriate tone based on context.
   * - `'neutral'` - The standard tone for general actions and interactions.
   * - `'caution'` - Indicates actions that require careful consideration.
   * - `'warning'` - Alerts users to potential issues or important information.
   * - `'critical'` - Used for destructive actions like deleting or removing content.
   *
   * @default 'auto'
   */
  tone?: ToneKeyword;
  /**
   * Indicates the language of the text content. Useful when text is in a different language than the rest of the page, allowing assistive technologies to invoke correct pronunciation. [Reference of language subtag values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).
   */
  lang?: string;
}
/**
 * Base properties for all form input elements.
 */
export interface BaseInputProps {
  /**
   * An identifier for the field that is unique within the nearest containing form. This name is used as the key when the form data is submitted. If omitted, the field's value won't be included in form submissions. Meaningful names describe the data being collected (for example, `"email"`, `"quantity"`, `"customer-note"`).
   */
  name?: string;
  /**
   * Whether the field is disabled, preventing any user interaction. When `true`, the field can't receive focus, be edited, or be interacted with. Disabled fields are visually dimmed, excluded from form submission, and announced as disabled to screen readers. Typically set when a field is temporarily unavailable due to application state, permissions, or dependencies on other fields.
   *
   * @default false
   */
  disabled?: boolean;
}
/**
 * Properties for controlled form input elements with value and change callbacks.
 */
export interface InputProps extends BaseInputProps {
  /**
   * Called when the user has committed a value change, typically triggered when the field loses focus (blur) after the value has been modified. Unlike `onInput`, this fires only once after editing is complete, not during typing. The event contains the finalized value. Common operations include validation, saving data, or triggering actions that should occur after the user finishes editing rather than during typing. For controlled components, the `value` prop should be updated in this callback. This is ideal for expensive operations like API calls that shouldn't happen on every keystroke. Learn more about [change events on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
   */
  onChange?: (event: Event) => void;
  /**
   * Called immediately when the user makes any change to the field value. Fires on every keystroke, paste, or other input modification before the field loses focus. The event contains the current field value. Common operations include real-time validation, character counting, formatting input as users type, or implementing autocomplete/search-as-you-type features. For controlled components, the `value` prop should be updated in this callback to keep state in sync. Expensive operations should be avoided here as this fires frequently during typing. Learn more about [input events on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
   */
  onInput?: (event: Event) => void;
  /**
   * The current value of the field. When provided, this creates a controlled component where this value must be updated in response to user input using `onChange` or `onInput` callbacks. The format and valid values depend on the specific field type. If both `value` and `defaultValue` are provided, `value` takes precedence.
   */
  value?: string;
  /**
   * The default value used when the field is first rendered. Only applies if no `value` prop is provided, creating an uncontrolled component where the browser manages the field state internally. After initial render, the component handles its own state and the current value can be read from the DOM.
   *
   * @implementation `defaultValue` reflects to the `value` attribute.
   */
  defaultValue?: string;
}
/**
 * Properties for form inputs that support multiple selections.
 */
export interface MultipleInputProps extends BaseInputProps {
  /**
   * Called when the user has finished editing the field, typically triggered on blur after the value has changed. Learn more about [change events on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
   */
  onChange?: (event: Event) => void;
  /**
   * Called when the user makes any change to the field value. Fires on each keystroke or interaction. Learn more about [input events on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
   */
  onInput?: (event: Event) => void;
  /**
   * An array containing the values of currently selected options in a multi-select choice list. When provided, this creates a controlled component where this array must be updated in response to user selections using the `onChange` callback. The array contains the `value` properties of selected child choice components. For single-select lists (`multiple={false}`), this array contains zero or one items. For multi-select lists, it can contain multiple items. This is a convenience property that automatically sets the `selected` state on matching child choices based on their `value` properties. When a choice's value appears in this array, it's automatically marked as selected. The array should be updated immutably in callbacks (creating new arrays rather than mutating existing ones).
   */
  values?: string[];
}
/**
 * Properties for displaying field validation errors.
 */
export interface FieldErrorProps {
  /**
   * An error message to display when the field contains invalid data or fails validation. When set, the field receives error styling (typically a red border and error icon) and the message appears below the field to guide users toward fixing the issue. The error is announced to screen readers for accessibility. The error is cleared by setting this to an empty string or `undefined`. Errors are typically displayed after validation fails, usually on blur or form submission.
   */
  error?: string;
}
/**
 * Basic properties for form fields including labels, validation requirements, and error states.
 */
export interface BasicFieldProps
  extends FieldErrorProps,
    LabelAccessibilityVisibilityProps {
  /**
   * Whether the field must have a value before form submission. When `true`, the field is marked as required (typically with an asterisk), announced as required to screen readers, and triggers browser validation on form submit. This property adds semantic meaning but doesn't prevent submission on its own—validation logic must be implemented and the `error` property used to display validation messages.
   *
   * @default false
   */
  required?: boolean;
  /**
   * The text label that describes what information the field is requesting from the user. Labels are always visible (unlike placeholders which disappear on input) and are announced by screen readers, making them critical for accessibility. Labels typically appear above or beside the field and remain visible while the user interacts with the field. Clear, concise labels describe the expected input (for example, "Email address", "Quantity", "Customer note").
   */
  label?: string;
}
/**
 * Properties for adding supplementary help text to form fields.
 */
export interface FieldDetailsProps {
  /**
   * Supplementary help text that provides additional context, instructions, or constraints for the field. This text typically appears below the label in a smaller, subdued style and remains visible at all times (unlike placeholders). Screen readers announce this text along with the label to provide complete field context. Common content includes format requirements (for example, "Use YYYY-MM-DD format"), character limits (for example, "Maximum 500 characters"), helpful hints (for example, "This will be shown on the receipt"), or clarifying instructions (for example, "Leave blank to use default shipping address"). Information already in the label or placeholder shouldn't be duplicated here.
   */
  details?: string;
}
/**
 * Complete properties for standard form fields including value, label, placeholder, validation, and callbacks.
 */
export interface FieldProps
  extends BasicFieldProps,
    InputProps,
    FocusEventProps,
    FieldDetailsProps {
  /**
   * A short hint that provides guidance about the expected value or format of the field. Displayed when the field is empty and disappears once the user starts typing. Placeholders should supplement the label, not replace it—a `label` should always be provided as well since placeholders may not be accessible to all screen readers. Common placeholder content includes format examples (for example, "YYYY-MM-DD"), helpful hints (for example, "Leave blank for default"), or clarifying expected input (for example, "Enter SKU or product name").
   */
  placeholder?: string;
}
/**
 * Base properties for text-based input fields including placeholder and read-only state.
 */
export interface BaseTextFieldProps extends FieldProps {
  /**
   * Whether the field can be edited. When `true`, the field is focusable and announced by screen readers but can't be modified by the user. Unlike `disabled`, read-only fields can still receive focus, be copied, and participate in form submission. Typically applied to calculated values, reference information, or data that users need to see and interact with but shouldn't change.
   *
   * @default false
   */
  readOnly?: boolean;
}
/**
 * Properties for adding decorative elements like icons, prefixes, suffixes, and accessories to form fields.
 */
export interface FieldDecorationProps {
  /**
   * Static text displayed immediately after the editable portion of the field, typically inside the field border. This text is non-interactive and purely decorative—users can't edit it and it's not included in the field's value when submitted. The suffix remains visible at all times, even when the field is empty. Common uses include domain suffixes (for example, "@shopify.com" for email fields), units of measurement (for example, "kg", "%", "USD"), or clarifying context (for example, "/month" for subscription pricing). Choose between suffix and prefix based on natural reading order for your use case.
   *
   * @default ''
   */
  suffix?: string;
  /**
   * Static text displayed immediately before the editable portion of the field, typically inside the field border. This text is non-interactive and purely decorative—users can't edit it and it's not included in the field's value when submitted. The prefix remains visible at all times, even when the field is empty. Common uses include currency symbols (for example, "$", "€", "£"), protocol indicators (for example, "https://"), measurement prefixes (for example, "#", "@"), or fixed identifiers. The prefix helps users understand the expected format without consuming characters from maxLength limits.
   *
   * @default ''
   */
  prefix?: string;
  /**
   * The icon identifier specifying which icon to display in the field, typically positioned at the start of the field before the input area. The icon is decorative and helps users quickly identify the field's purpose through visual recognition. The icon is announced to screen readers along with the field's accessible name. Use icons that clearly communicate the field's purpose (for example, search icon for search fields, calendar icon for date fields, lock icon for password fields). The icon doesn't affect the field's functionality but improves visual recognition and scannability in forms. Avoid using both icon and prefix simultaneously as this can create visual clutter.
   *
   * @default ''
   */
  icon?: IconType | AnyString;
  /**
   * Additional interactive content displayed within the field, typically positioned at the end of the field after the input area. Only text-only button and clickable components are supported—no icons or complex content. Use the `slot="accessory"` attribute to place elements here. Common uses include action buttons (for example, "Copy" button, "Generate" button, "Clear" button), toggle visibility controls (for example, "Show password" button), or quick actions related to the field (for example, "Paste from clipboard"). The accessory must not interfere with the field's primary input functionality. Ensure sufficient contrast and touch target sizes for mobile usability.
   */
  accessory?: ComponentChildren;
}
/**
 * Properties for defining numeric value constraints and controls.
 */
export interface NumberConstraintsProps {
  /**
   * The highest decimal or integer value that the field accepts. When used with `stepper` controls, the increment button becomes disabled at this value and attempting to increment rounds down to max. When users type values using keyboard, they can enter numbers above max—browser validation will flag these as invalid but won't prevent entry, so validation should be implemented in `onChange` or before form submission. Commonly applied to enforce business rules like maximum quantities, price caps, or valid ranges. Setting to `Infinity` (default) removes the upper limit.
   *
   * @default Infinity
   */
  max?: number;
  /**
   * The lowest decimal or integer value that the field accepts. When used with `stepper` controls, the decrement button becomes disabled at this value and attempting to decrement rounds up to min. When users type values using keyboard, they can enter numbers below min—browser validation will flag these as invalid but won't prevent entry, so validation should be implemented in `onChange` or before form submission. Commonly applied to enforce business rules like minimum quantities, prevent negative values, or define valid ranges. Setting to `-Infinity` (default) removes the lower limit.
   *
   * @default -Infinity
   */
  min?: number;
  /**
   * The increment/decrement amount for adjusting the numeric value. Determines how much the value changes when users click stepper buttons or press keyboard arrow keys (up/down). For example, `step="0.01"` allows currency precision, `step="5"` for quantities in increments of 5, or `step="0.25"` for quarter-hour time intervals. The browser may also use this for validation, flagging values that aren't valid steps from the `min` value. Decimals are supported unless using `stepper` controls which only accept integers.
   *
   * @default 1
   */
  step?: number;
  /**
   * The type of controls displayed for the field:
   *
   * - `'auto'` - An automatic setting where the presence of controls depends on the surface and context. The system determines the most appropriate control type based on the usage scenario.
   * - `'stepper'` - Displays increment (+) and decrement (-) buttons for adjusting the numeric value. When `stepper` controls are enabled, the field behavior is constrained: it accepts only integer values, always contains a value (never empty), and automatically validates against `min` and `max` bounds. The `label`, `details`, `placeholder`, `error`, `required`, and `inputMode` properties aren't supported with `stepper` controls.
   * - `'none'` - A control type with no visible controls where users must input the value manually using the keyboard.
   *
   * @default 'auto'
   */
  controls?: 'auto' | 'stepper' | 'none';
}
/**
 * Properties for defining minimum and maximum character length constraints on text inputs.
 */
export interface MinMaxLengthProps {
  /**
   * The maximum number of characters allowed in the text field. The browser prevents users from typing or pasting beyond this limit—additional characters are automatically truncated. The character count includes all characters (letters, numbers, spaces, special characters). This provides immediate feedback by blocking input rather than showing validation errors. Commonly applied to enforce hard limits like database column sizes, API constraints, or UX requirements. Often combined with character counter displays to show remaining space (for example, "45/100 characters").
   *
   * @default Infinity
   */
  maxLength?: number;
  /**
   * The minimum number of characters required for the field value to be considered valid. Unlike `maxLength`, this doesn't prevent users from entering fewer characters—instead, browser validation marks the field as invalid if the value is too short. Validation typically occurs on form submission or blur. The field can be empty unless also marked `required`. Commonly applied to ensure sufficient input quality, such as minimum password lengths, meaningful descriptions, or codes with fixed lengths. The `error` property can be combined with this to display user-friendly validation messages.
   *
   * @default 0
   */
  minLength?: number;
}
/**
 * Base properties for selectable options including value, disabled state, and accessibility labels.
 */
export interface BaseSelectableProps {
  /**
   * A label that describes the purpose or contents of the element. Announced to users with assistive technologies such as screen readers to provide context.
   */
  accessibilityLabel?: string;
  /**
   * Whether the field is disabled, preventing user interaction. Use when the field is temporarily unavailable due to application state, permissions, or dependencies.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * The unique value associated with this selectable option. This value is what gets submitted with forms when the option is selected, and is used to identify which options are selected in the parent choice list's `values` array. The value should be unique among siblings within the same choice list to avoid selection ambiguity. When a choice is selected, this value appears in form data and in the parent's `values` array. Use meaningful, stable values that identify the choice semantically (for example, `"small"`, `"express-shipping"`, `"agree-to-terms"`) rather than display text which may change or be localized. The value isn't displayed to users—use the choice's `children` or label for visible text.
   */
  value?: string;
}
/**
 * Properties for individual options within choice lists, including selection state management.
 */
export interface BaseOptionProps extends BaseSelectableProps {
  /**
   * Whether the choice control is currently active or selected. This creates a controlled component—this value must be updated in response to user interactions using `onChange` handlers. When `true`, the choice appears selected with appropriate visual styling and is included in form submissions. If both `selected` and `defaultSelected` are provided, `selected` takes precedence.
   *
   * @default false
   */
  selected?: boolean;
  /**
   * Whether the control is selected by default when first rendered. This creates an uncontrolled component where the browser manages selection state internally after the initial render. The component handles selection internally without requiring updates using callbacks.
   *
   * @implementation `defaultSelected` reflects to the `selected` attribute.
   *
   * @default false
   */
  defaultSelected?: boolean;
}
/**
 * Properties for a single choice option including label, details, selection state, and additional content.
 */
export interface ChoiceProps extends GlobalProps, BaseOptionProps {
  /**
   * The label content for the choice option.
   *
   * @implementation (StringChildren) The label is produced by extracting and
   * concatenating the text nodes from the provided content; any markup or
   * element structure is ignored.
   *
   * @implementation (ComponentChildren) Behaves as a slot: any elements passed
   * are rendered as the label content (subject to surface constraints); there
   * is no coercion to a string.
   */
  children?: ComponentChildren | StringChildren;
  /**
   * Additional text or content that provides context or guidance for the choice option. Displayed alongside the option label to offer more information or instructions to the user. Also exposed to screen reader users.
   *
   * @implementation this content should be linked to the input with an `aria-describedby` attribute.
   */
  details?: ComponentChildren;
  /**
   * An error state indicator for the choice option. When `true`, the option will be given specific stylistic treatment to communicate validation issues.
   *
   * @default false
   */
  error?: boolean;
  /**
   * The additional content displayed alongside the primary choice label. Useful for providing supplementary information or context.
   */
  secondaryContent?: ComponentChildren;
  /**
   * The content displayed only when the option is selected. Useful for showing additional details or confirmation information.
   */
  selectedContent?: ComponentChildren;
}
/**
 * Properties for a list of choice options with support for single or multiple selection modes.
 */
export interface ChoiceListProps
  extends GlobalProps,
    Pick<BasicFieldProps, 'label' | 'labelAccessibilityVisibility' | 'error'>,
    MultipleInputProps,
    FieldDetailsProps {
  /**
   * Whether multiple choices can be selected simultaneously. When `true`, users can select multiple options and the `values` array will contain all selected values. When `false`, only one option can be selected at a time and selecting a new option automatically deselects the previous one.
   *
   * @default false
   */
  multiple?: boolean;
  /**
   * The child elements to render within this component. Within choice list, use only choice components as children. Other component types can't be used as options within the choice list.
   */
  children?: ComponentChildren;
  /**
   * Whether the field is disabled, preventing user interaction. Use when the field is temporarily unavailable due to application state, permissions, or dependencies.
   *
   * @default false
   */
  disabled?: MultipleInputProps['disabled'];
  /**
   * Controls the visual layout and presentation style of the choice options:
   * - `'auto'`: The layout is automatically determined based on context
   * - `'list'`: Displays choices in a vertical list format
   * - `'inline'`: Displays choices in a horizontal inline format
   * - `'block'`: Displays choices as block-level button-like elements
   * - `'grid'`: Displays choices in a grid layout
   *
   * @implementation The `block`, `inline` and `grid` variants are more suitable for button looking choices, but it's at the
   * discretion of each surface.
   *
   * @default 'auto'
   */
  variant?: 'auto' | 'list' | 'inline' | 'block' | 'grid';
}
export interface ClickableProps
  extends GlobalProps,
    BaseBoxProps,
    BaseClickableProps {
  /**
   * Indicates whether the action is currently in progress. When `true`, typically displays a loading indicator and may disable interaction.
   */
  loading?: BaseClickableProps['loading'];
  /**
   * Whether the element is disabled, preventing user interaction. Use when temporarily unavailable due to application state, permissions, or dependencies. Child elements can still receive focus and be interacted with.
   */
  disabled?: BaseClickableProps['disabled'];
  /**
   * Specifies the language of text content using an [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) language tag (for example, `"en"` for English, `"fr"` for French, `"es-MX"` for Mexican Spanish, `"zh-Hans"` for Simplified Chinese). This enables assistive technologies to use correct pronunciation and language-specific text rendering.
   *
   * @default ''
   */
  lang?: string;
}
/**
 * Properties for enabling browser autocomplete functionality on form fields.
 */
export interface AutocompleteProps<
  AutocompleteField extends AnyAutocompleteField,
> {
  /**
   * Specifies the type of data expected in the field to enable browser autocomplete functionality. When set to a specific field type (for example, `'email'`, `'name'`, `'address-line1'`), browsers offer suggestions from previously entered or saved information, improving data entry speed and accuracy. Set to `'on'` to enable generic autocomplete without specifying data type. Set to `'off'` to disable autocomplete entirely for sensitive fields (for example, one-time codes, PINs, credit card security codes). The browser respects user preferences and privacy settings, so autocomplete suggestions may not always appear even when enabled. Prefix field types with section identifiers (`section-shipping`) or groups (`billing`, `shipping`) to disambiguate when multiple similar fields exist on the same page. Accepts standard [HTML autocomplete tokens per the WHATWG specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-detail-tokens).
   *
   * @default 'tel' for PhoneField
   * @default 'email' for EmailField
   * @default 'url' for URLField
   * @default 'on' for everything else
   */
  autocomplete?:
    | AutocompleteField
    | `${AutocompleteSection} ${AutocompleteField}`
    | `${AutocompleteGroup} ${AutocompleteField}`
    | `${AutocompleteSection} ${AutocompleteGroup} ${AutocompleteField}`
    | 'on'
    | 'off';
}
/**
 * A section prefix that scopes the autocomplete data to a specific area of the page.
 *
 * Commonly used when there are multiple fields with the same autocomplete needs
 * in the same page. For example: 2 shipping address forms in the same page.
 */
export type AutocompleteSection = `section-${string}`;
/**
 * The contact information category that autocomplete data should be sourced from.
 */
export type AutocompleteGroup = 'shipping' | 'billing';
/**
 * The contact information subcategory that autocomplete data should be sourced from.
 */
export type AutocompleteAddressGroup = 'fax' | 'home' | 'mobile' | 'pager';
export type AnyAutocompleteField =
  | 'additional-name'
  | 'address-level1'
  | 'address-level2'
  | 'address-level3'
  | 'address-level4'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'country-name'
  | 'country'
  | 'current-password'
  | 'email'
  | 'family-name'
  | 'given-name'
  | 'honorific-prefix'
  | 'honorific-suffix'
  | 'language'
  | 'name'
  | 'new-password'
  | 'nickname'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'photo'
  | 'postal-code'
  | 'sex'
  | 'street-address'
  | 'transaction-amount'
  | 'transaction-currency'
  | 'url'
  | 'username'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'bday'
  | 'cc-additional-name'
  | 'cc-expiry-month'
  | 'cc-expiry-year'
  | 'cc-expiry'
  | 'cc-family-name'
  | 'cc-given-name'
  | 'cc-name'
  | 'cc-number'
  | 'cc-csc'
  | 'cc-type'
  | `${AutocompleteAddressGroup} email`
  | 'impp'
  | `${AutocompleteAddressGroup} impp`
  | 'tel'
  | 'tel-area-code'
  | 'tel-country-code'
  | 'tel-extension'
  | 'tel-local-prefix'
  | 'tel-local-suffix'
  | 'tel-local'
  | 'tel-national'
  | `${AutocompleteAddressGroup} tel`
  | `${AutocompleteAddressGroup} tel-area-code`
  | `${AutocompleteAddressGroup} tel-country-code`
  | `${AutocompleteAddressGroup} tel-extension`
  | `${AutocompleteAddressGroup} tel-local-prefix`
  | `${AutocompleteAddressGroup} tel-local-suffix`
  | `${AutocompleteAddressGroup} tel-local`
  | `${AutocompleteAddressGroup} tel-national`;
/**
 * Autocomplete field types applicable to text input fields.
 */
export type TextAutocompleteField = ExtractStrict<
  AnyAutocompleteField,
  | 'additional-name'
  | 'address-level1'
  | 'address-level2'
  | 'address-level3'
  | 'address-level4'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'country-name'
  | 'country'
  | 'family-name'
  | 'given-name'
  | 'honorific-prefix'
  | 'honorific-suffix'
  | 'language'
  | 'name'
  | 'nickname'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'postal-code'
  | 'sex'
  | 'street-address'
  | 'transaction-currency'
  | 'username'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-type'
>;
/**
 * Properties for an interactive date picker component with single, multiple, or range selection modes.
 */
export interface DatePickerProps
  extends GlobalProps,
    InputProps,
    FocusEventProps {
  /**
   * The default month to display in `YYYY-MM` format when the picker is first shown.
   *
   * This value is used until `view` is set, either directly or as a result of user interaction.
   *
   * Defaults to the current month in the user's locale.
   */
  defaultView?: string;
  /**
   * The currently displayed month in `YYYY-MM` format. Controls which month is visible in the date picker.
   */
  view?: string;
  /**
   * Called when the visible month displayed in the date picker changes, either through user navigation (clicking next/previous month buttons) or programmatic updates to the `view` property. The callback receives the new month as a string in `YYYY-MM` format (for example, `"2024-05"`). Common operations include tracking which month users are viewing, loading month-specific data (like availability or pricing), syncing the view with external state, or implementing custom navigation controls. For controlled date pickers, the `view` property should be updated in this callback to keep the displayed month in sync with application state. The callback fires after the month has changed but before the new month's dates are fully rendered, making it well-suited for triggering data fetches.
   */
  onViewChange?: (view: string) => void;
  /**
   * Controls the selection mode of the date picker:
   * - `'single'`: Allows selecting one date
   * - `'multiple'`: Allows selecting multiple individual dates
   * - `'range'`: Allows selecting a continuous range of dates
   *
   * @default "single"
   */
  type?: 'single' | 'multiple' | 'range';
  /**
   * Specifies allowed date values or ranges for selection. Uses ISO date format (YYYY-MM-DD) or partial dates (YYYY-MM, YYYY). Supports range syntax with `--` separator and comma-separated values.
   *
   * @default ""
   *
   * @example
   * `2024-02--2025` // allow any date from February 2024 to the end of 2025
   * `2024-02--` // allow any date from February 2024 onwards
   * `2024-05-09, 2024-05-11` // allow only the 9th and 11th of May 2024
   */
  allow?: string;
  /**
   * Specifies disallowed date values or ranges that can't be selected. Uses ISO date format (YYYY-MM-DD) or partial dates (YYYY-MM, YYYY). Supports range syntax with `--` separator and comma-separated values. Takes precedence over `allow`.
   *
   * @default ""
   *
   * @example
   * `--2024-02` // disallow any date before February 2024
   * `2024-05-09, 2024-05-11` // disallow the 9th and 11th of May 2024
   */
  disallow?: string;
  /**
   * Specifies which days of the week can be selected. Accepts comma-separated day names (case-insensitive). Further restricts dates within the result of `allow` and `disallow`.
   *
   * @default ""
   *
   * @example
   * 'saturday, sunday' // allow only weekends
   * 'monday, wednesday, friday' // allow only specific weekdays
   */
  allowDays?: string;
  /**
   * Specifies which days of the week can't be selected. Accepts comma-separated day names (case-insensitive). Further restricts dates within the result of `allow` and `disallow`.
   *
   * @default ""
   *
   * @example
   * 'saturday, sunday' // disallow weekends
   * 'monday' // disallow Mondays
   */
  disallowDays?: string;
  /**
   * The default date value used when the field is first rendered, in ISO date format (YYYY-MM-DD, for example, `"2024-05-15"`). An empty string means no default date. For date ranges, use comma-separated dates. Only applies if no `value` prop is provided.
   *
   * @default ""
   */
  defaultValue?: string;
  /**
   * The currently selected date value in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format (`YYYY-MM-DD`, for example, `"2024-05-15"`). An empty string means no date is selected. For date ranges, use comma-separated dates (for example, `"2024-05-15,2024-05-20"`). Other date formats require conversion before setting this property. The selection mode (`type` property) is inferred from the value format: single date for one value, multiple dates for comma-separated values without a range, and range for two comma-separated dates when `type` is set to 'range'.
   *
   * @default ""
   */
  value?: string;
  /**
   * Called when the user makes any change to the field value. Fires on each keystroke or interaction.
   */
  onInput?: (event: Event) => void;
  /**
   * Called when the user has finished editing the field, typically triggered on blur after the value has changed.
   */
  onChange?: (event: Event) => void;
}
/**
 * Properties for a text-based date input field with validation and autocomplete support.
 */
export interface DateFieldProps
  extends GlobalProps,
    BaseTextFieldProps,
    Pick<
      DatePickerProps,
      | 'view'
      | 'defaultView'
      | 'value'
      | 'defaultValue'
      | 'allow'
      | 'disallow'
      | 'allowDays'
      | 'disallowDays'
      | 'onViewChange'
    >,
    AutocompleteProps<DateAutocompleteField> {
  /**
   * Called when the user enters an invalid value. Fires after change validation fails.
   */
  onInvalid?: (event: Event) => void;
}
/**
 * Autocomplete field types applicable to date input fields.
 */
export type DateAutocompleteField = ExtractStrict<
  AnyAutocompleteField,
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'cc-expiry'
  | 'cc-expiry-month'
  | 'cc-expiry-year'
>;
/**
 * Properties for a spinner-style date selector with increment/decrement controls.
 */
export interface DateSpinnerProps
  extends GlobalProps,
    Pick<
      DatePickerProps,
      'defaultValue' | 'value' | 'onInput' | 'onChange' | 'onBlur' | 'onFocus'
    > {
  /**
   * The default date value used when the field is first rendered, in ISO date format (YYYY-MM-DD, for example, `"2024-05-15"`). An empty string means no default date. Only applies if no `value` prop is provided.
   *
   * @default ""
   */
  defaultValue?: string;
  /**
   * The currently selected date value in ISO date format (YYYY-MM-DD, for example, `"2024-05-15"`). An empty string means no date is selected.
   *
   * @default ""
   */
  value?: string;
  /**
   * Called when the user makes any change to the field value. Fires on each keystroke or interaction.
   */
  onInput?: (event: Event) => void;
  /**
   * Called when the user has finished editing the field, typically triggered on blur after the value has changed. Date validation occurs when the user finishes editing (on blur), rather than on every keystroke.
   */
  onChange?: (event: Event) => void;
}
/**
 * Properties for a visual divider line that separates content sections.
 */
export interface DividerProps extends GlobalProps {
  /**
   * The direction of the divider using [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values). An inline divider runs horizontally across the content flow, while a block divider runs vertically along the content flow.
   *
   * Available options:
   * - `'inline'`: A horizontal divider that runs perpendicular to the text direction, creating separation between vertically stacked content sections.
   * - `'block'`: A vertical divider that runs parallel to the text direction, creating separation between horizontally arranged content sections.
   *
   * @default 'inline'
   */
  direction?: 'inline' | 'block';
  /**
   * The color intensity of the divider. Controls how prominent or subtle the divider appears.
   *
   * @default 'base'
   */
  color?: ColorKeyword;
}
/**
 * Properties for an email address input field with validation and autocomplete support.
 */
export interface EmailFieldProps
  extends GlobalProps,
    BaseTextFieldProps,
    MinMaxLengthProps,
    AutocompleteProps<EmailAutocompleteField> {}
/**
 * Autocomplete field types applicable to email input fields.
 */
export type EmailAutocompleteField = ExtractStrict<
  AnyAutocompleteField,
  'email' | `${AutocompleteAddressGroup} email`
>;
/**
 * A spacing size keyword including the option for no spacing.
 */
export type SpacingKeyword = SizeKeyword | 'none';
/**
 * Properties for controlling the spacing between child elements in a container.
 */
export interface GapProps {
  /**
   * The spacing between child elements. A single value applies to both axes. Two values (for example, `large-100 large-500`) set the block axis (first value) and inline axis (second value) respectively.
   *
   * @default 'none'
   */
  gap?: MaybeResponsive<MaybeTwoValuesShorthandProperty<SpacingKeyword>>;
  /**
   * The spacing between child elements along the block axis (typically vertical). Overrides the block axis value from `gap`.
   *
   * @default '' - meaning no override
   */
  rowGap?: MaybeResponsive<SpacingKeyword | ''>;
  /**
   * The spacing between child elements along the inline axis (typically horizontal). Overrides the inline axis value from `gap`.
   *
   * @default '' - meaning no override
   */
  columnGap?: MaybeResponsive<SpacingKeyword | ''>;
}
/**
 * A baseline alignment position keyword.
 */
export type BaselinePosition = 'baseline' | 'first baseline' | 'last baseline';
/**
 * A content distribution strategy keyword for spacing.
 */
export type ContentDistribution =
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch';
/**
 * A content position alignment keyword.
 */
export type ContentPosition = 'center' | 'start' | 'end';
/**
 * A content position with optional overflow safety modifier.
 */
export type OverflowPosition =
  | `unsafe ${ContentPosition}`
  | `safe ${ContentPosition}`;
/**
 * A type that defines how children are aligned along the cross axis.
 * Sets the align-self value on all direct children as a group. Learn more about [`align-items` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
 */
export type AlignItemsKeyword =
  | 'normal'
  | 'stretch'
  | BaselinePosition
  | OverflowPosition
  | ContentPosition;
/**
 * A type that defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. Learn more about [`justify-content` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
 */
export type JustifyContentKeyword =
  | 'normal'
  | ContentDistribution
  | OverflowPosition
  | ContentPosition;
/**
 * A type that defines the distribution of space between and around content items along a flexbox's cross axis, or a grid or block-level element's block axis. Learn more about [`align-content` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
 */
export type AlignContentKeyword =
  | 'normal'
  | BaselinePosition
  | ContentDistribution
  | OverflowPosition
  | ContentPosition;
/**
 * Base properties for text styling and appearance.
 */
export interface BaseTypographyProps {
  /**
   * The color intensity of the text. Controls how prominent or subtle the text appears within the interface.
   *
   * @default 'base'
   */
  color?: ColorKeyword;
  /**
   * The semantic tone of the text, based on the intention of the information being conveyed. Affects color and styling to communicate meaning.
   *
   * @default 'auto'
   */
  tone?: ToneKeyword;
  /**
   * Controls how numbers are displayed in the text:
   * - `'auto'`: Inherits the setting from the parent element.
   * - `'normal'`: Uses the default number rendering for the font.
   * - `'tabular-nums'`: Uses fixed-width numbers for better alignment in tables and lists.
   *
   * Learn more about [`font-variant-numeric` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric).
   *
   * @default 'auto'
   */
  fontVariantNumeric?: 'auto' | 'normal' | 'tabular-nums';
  /**
   * Specifies the language of text content using an [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) language tag (for example, `"en"` for English, `"fr"` for French, `"es-MX"` for Mexican Spanish, `"zh-Hans"` for Simplified Chinese). This enables assistive technologies to use correct pronunciation and language-specific text rendering.
   *
   * @default ''
   */
  lang?: string;
  /**
   * Indicates the directionality of the element's text:
   * - `ltr`: languages written from left to right (for example, English).
   * - `rtl`: languages written from right to left (for example, Arabic).
   * - `auto`: the user agent determines the direction based on the content.
   * - `''`: direction is inherited from parent elements (equivalent to not setting the attribute).
   *
   * Learn more about the [`dir` attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir).
   *
   * @default ''
   */
  dir?: 'ltr' | 'rtl' | 'auto' | '';
}
/**
 * Properties for controlling multi-line text behavior and truncation.
 */
export interface BlockTypographyProps {
  /**
   * Limits the text content to a specified number of visible lines. When text exceeds this limit, it's truncated and an ellipsis (`…`) appears at the end of the last visible line to indicate more content exists. The truncation happens automatically based on the container's width, font size, and line height—narrow containers or large fonts will show fewer words per line. For example, `lineClamp={3}` allows maximum three lines of text regardless of total content length. Users can't access the hidden text unless an expansion mechanism (like a "Read more" button) or tooltip is provided. Commonly applied to maintain consistent layout heights in cards, lists, or grids where varying text lengths would disrupt visual alignment. Common values include 1-2 for titles/labels, 2-3 for descriptions, and 4-6 for preview text. The actual text content remains in the DOM and is accessible to screen readers (full text is announced), search engines, and selection—only the visual display is truncated. Learn more about [`line-clamp` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp).
   *
   * @default Infinity - no truncation is applied
   */
  lineClamp?: number;
}
/**
 * Properties for heading text elements with semantic structure and line clamping.
 */
export interface HeadingProps
  extends GlobalProps,
    AccessibilityVisibilityProps,
    BlockTypographyProps {
  /**
   * The child elements to render within this component. Use plain text or simple inline elements only for heading content. Rich text format isn't supported.
   */
  children?: ComponentChildren;
  /**
   * Sets the semantic role for assistive technologies. Helps screen reader users navigate and understand page structure.
   *
   * @default 'heading'
   *
   * @implementation The `heading` role doesn't need to be applied if
   * the host applies it for you; for example, an HTML host rendering
   * an `<h2>` element shouldn't apply the `heading` role.
   */
  accessibilityRole?:
    | 'heading'
    | ExtractStrict<AccessibilityRole, 'presentation' | 'none'>;
}
/**
 * Properties for icon elements including type, size, color, and tone.
 */
export interface IconProps
  extends GlobalProps,
    Pick<InteractionProps, 'interestFor'> {
  /**
   * Sets the tone of the icon, based on the intention of the information being conveyed.
   *
   * @default 'auto'
   */
  tone?: ToneKeyword;
  /**
   * Modify the color to be more or less intense. Use `'subdued'` for secondary icons, `'base'` for standard visibility, or `'strong'` for emphasized icons that need to stand out.
   *
   * @default 'base'
   */
  color?: ColorKeyword;
  /**
   * Adjusts the size of the icon. Available sizes range from `'small-500'` (smallest) through `'base'` (default) to `'large-500'` (largest), allowing you to match icon size to your interface hierarchy.
   *
   * @default 'base'
   */
  size?: SizeKeyword;
  /**
   * The type of icon to display.
   */
  type?: IconType | AnyString;
}
/**
 * Base properties for image elements including source URLs and alternative text.
 */
export interface BaseImageProps {
  /**
   * Alternative text that describes the image content for users who can't see the image. This text is announced by screen readers, displayed when images fail to load or are blocked, and used by search engines for image indexing. Write concise, descriptive alt text that conveys the image's purpose and content (for example, "Product photo of blue running shoes" not "image" or "photo"). For decorative images that don't convey information, use an empty string (`alt=""`) to hide them from screen readers. For images containing text, include that text in the alt description. For complex images like charts or diagrams, consider providing a longer description elsewhere and summarizing in alt text. Alt text is required for accessibility compliance and should describe what users would miss if they couldn't see the image. Learn more about [`alt` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt).
   *
   * @default `''`
   */
  alt?: string;
  /**
   * Defines the image sizes for different viewport widths to help the browser select the optimal image from `srcSet`. This is a comma-separated list of media conditions and corresponding sizes (for example, `"(max-width: 600px) 480px, 800px"`). The browser uses this with `srcSet` to determine which image variant to download based on the device's screen size and pixel density, improving performance by loading appropriately-sized images. For example, mobile devices receive smaller images while desktops get larger, higher-resolution versions. When `srcSet` provides multiple image sizes, `sizes` tells the browser the rendered size at different viewport widths. If omitted, the browser assumes `100vw` (full viewport width). This only affects which image is selected, not how it's displayed—use CSS or `inlineSize` for display sizing. Learn more about [`sizes` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes).
   */
  sizes?: string;
  /**
   * The image source URL (remote URL or local file resource). When loading or no src is provided, a placeholder is rendered. Ensure URLs are properly formatted and properly formatted.
   *
   * @implementation Surfaces may choose the style of the placeholder, but the space the image occupies should be
   * reserved, except in cases where the image area doesn't have a contextual inline or block size, which should be rare.
   */
  src?: string;
  /**
   * A set of image source URLs with descriptors for responsive image selection. Provides multiple image variants at different widths or pixel densities, allowing browsers to choose the most appropriate image for the user's device and screen. Format: comma-separated list of `URL descriptor` pairs where descriptors are either width (`w`) or pixel density (`x`). For example: `"small.jpg 480w, medium.jpg 800w, large.jpg 1200w"` for different widths, or `"standard.jpg 1x, retina.jpg 2x"` for different pixel densities. The browser considers the device's screen size, resolution, network speed, and user preferences when selecting which image to download. This improves performance (smaller images on mobile) and quality (high-DPI images on retina displays). When used with `sizes`, enables fully responsive images. The `src` property serves as fallback for browsers that don't support `srcSet`. Learn more about [img srcset on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset).
   */
  srcSet?: string;
}
/**
 * Properties for image elements including size, aspect ratio, loading behavior, and border styling.
 */
export interface ImageProps extends GlobalProps, BaseImageProps, BorderProps {
  /**
   * Sets the semantic role for assistive technologies. Helps screen reader users navigate and understand page structure.
   *
   * @default 'img'
   *
   * @implementation The `img` role doesn't need to be applied if
   * the host applies it for you; for example, an HTML host rendering
   * an `<img>` element shouldn't apply the `img` role.
   */
  accessibilityRole?:
    | 'img'
    | ExtractStrict<AccessibilityRole, 'presentation' | 'none'>;
  /**
   * Controls the displayed width of the image. Choose based on your layout requirements. For mobile interfaces, consider using `'fill'` with defined container dimensions to ensure consistent image display, as dynamic container heights can cause layout inconsistencies in scrollable views.
   *
   * - `'auto'` - Displays the image at its natural size. The image will not render until it has loaded, and the aspect ratio will be ignored. Use for images where maintaining original dimensions is important.
   * - `'fill'` - Makes the image take up 100% of the available inline size. The aspect ratio will be respected and the image will take the necessary space. Use for responsive layouts and flexible image containers.
   *
   * @default 'fill'
   */
  inlineSize?: 'fill' | 'auto';
  /**
   * The aspect ratio of the image, expressed as width divided by height.
   *
   * The rendering of the image will depend on the `inlineSize` value:
   *
   * - `inlineSize="fill"`: the aspect ratio will be respected and the image will take the necessary space.
   * - `inlineSize="auto"`: the image won't render until it has loaded and the aspect ratio will be ignored.
   *
   * For example, if the value is set as `50 / 100`, the getter returns `50 / 100`.
   * If the value is set as `0.5`, the getter returns `0.5 / 1`.
   *
   * @default '1/1'
   */
  aspectRatio?:
    | `${number}${optionalSpace}/${optionalSpace}${number}`
    | `${number}`;
  /**
   * Controls how the image content is resized within its container.
   *
   * - `'contain'` - Scales the image to fit within the container while maintaining aspect ratio. The entire image will be visible, but there may be empty space. Use when showing the complete image is important.
   * - `'cover'` - Scales the image to fill the entire container while maintaining aspect ratio. Parts of the image may be cropped. Use when filling the container completely is more important than showing the entire image.
   *
   * @default 'contain'
   */
  objectFit?: 'contain' | 'cover';
  /**
   * Controls when the browser should begin loading the image resource:
   * - `'eager'`: Loads the image immediately when the page loads, regardless of whether it's visible in the viewport. The image downloads in parallel with other page resources. Typically applied to above-the-fold images, critical product photos, or images that will definitely be viewed. This ensures images are ready when needed but increases initial page load bandwidth.
   * - `'lazy'`: Defers image loading until the image is approaching the viewport (typically a few hundred pixels before becoming visible). The browser only downloads the image when the user is likely to see it soon. Commonly applied to below-the-fold images, gallery images, or images in scrollable lists. This improves initial page load performance and saves bandwidth for images users may never scroll to. The browser maintains a buffer distance so images load before users reach them, preventing visible loading delays.
   *
   * Lazy loading is most effective for pages with many images, long scrollable content, or mobile users on limited bandwidth. Modern browsers support native lazy loading—older browsers ignore this and load eagerly. Learn more about [`loading` on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading).
   *
   * @default 'eager'
   */
  loading?: 'eager' | 'lazy';
  /**
   * Called when the image finishes loading successfully and is ready to display. This fires after the browser has downloaded the image data and decoded it, but may fire before the image is actually painted to the screen. Common operations include hiding loading indicators, triggering dependent actions that require the image (like image processing), tracking image load metrics, or executing layout operations that depend on image dimensions. For performance tracking, timestamps between navigation start and this callback can be compared. Cached images may trigger this callback synchronously (immediately), so both async and sync invocation should be handled in code. This won't fire if the image fails to load—`onError` fires for failures. Learn more about [`onload` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload).
   */
  onLoad?: (event: Event) => void;
  /**
   * Called when the image fails to load due to network errors, invalid URLs, unsupported formats, [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) issues, or server errors (for example, 404, 500). The event contains limited error details for security reasons—the browser console provides specific failure reasons. Common operations include displaying fallback images (`event.target.src = 'fallback.jpg'`), showing error messages to users, logging failures for monitoring, hiding broken image icons, or providing alternative content when images are unavailable. A common pattern involves attempting to load a fallback image, and if that fails too, hiding the image container entirely. For critical images like product photos, a placeholder SVG or icon may be shown instead of a broken image indicator. This callback doesn't fire for images that are blocked by browser content policies or ad blockers. Learn more about [`onerror` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror).
   */
  onError?: (event: Event) => void;
}
/**
 * Properties for modal overlay dialogs including size, padding, actions, and lifecycle callbacks.
 */
export interface ModalProps
  extends GlobalProps,
    BaseOverlayProps,
    BaseOverlayMethods,
    ActionSlots {
  /**
   * A text label that describes the purpose, function, or contents of the element for users of assistive technologies like screen readers. This label is announced by screen readers but isn't visually displayed. Typically applied when an element doesn't have visible text that adequately describes it, such as icon-only buttons, image carousels, or complex interactive regions. The label is concise yet descriptive (for example, "Close modal", "Product image carousel", "Shopping cart with 3 items"). If the element already has clear visible labels or headings, this property may be unnecessary. For form fields, the `label` property is both visible and accessible.
   */
  accessibilityLabel?: string;
  /**
   * The title text displayed prominently in the modal's header section. This heading identifies the modal's purpose and provides context for the modal's content. When provided along with action buttons, creates a full modal header with title and actions. If both `heading` and actions (`primaryAction`/`secondaryActions`) are omitted, the modal renders without a header section entirely, starting directly with the modal content. The heading is automatically announced by screen readers when the modal opens. Clear, descriptive headings immediately communicate the modal's purpose (for example, "Confirm deletion", "Edit product details", "Select payment method").
   */
  heading?: string;
  /**
   * The padding applied to all edges of the modal content.
   *
   * @default 'base'
   */
  padding?: 'base' | 'none';
  /**
   * Controls the display size of the modal:
   * - Size keywords (for example, `'small'`, `'base'`, `'large'`): Fixed size options.
   * - `'max'`: The modal expands to fill the maximum available space.
   *
   * @default 'base'
   */
  size?: SizeKeyword | 'max';
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
}
/**
 * Properties for numeric input fields with validation, constraints, and optional stepper controls.
 */
export interface NumberFieldProps
  extends GlobalProps,
    BaseTextFieldProps,
    AutocompleteProps<NumberAutocompleteField>,
    NumberConstraintsProps,
    FieldDecorationProps {
  /**
   * The virtual keyboard layout that the field displays for numeric input. This property isn't supported when using `stepper` controls.
   *
   * - `'decimal'` - A keyboard layout that includes decimal point support for entering fractional numbers, prices, or measurements with decimal precision.
   * - `'numeric'` - A keyboard layout optimized for integer-only entry without decimal point support, ideal for quantities, counts, or whole number values.
   *
   * @default 'decimal'
   */
  inputMode?: 'decimal' | 'numeric';
}
/**
 * Autocomplete field types applicable to number input fields.
 */
export type NumberAutocompleteField = ExtractStrict<
  AnyAutocompleteField,
  'one-time-code' | 'cc-number' | 'cc-csc'
>;
/**
 * Properties for page-level layouts including header, breadcrumbs, actions, and sidebar content.
 */
export interface PageProps extends GlobalProps, ActionSlots {
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
  /**
   * The main title text displayed prominently in the page header's title area. This heading identifies the page's primary purpose and provides context for all page content. When provided along with action buttons or breadcrumbs, creates a complete page header with navigation and actions. If both `heading` and all header elements (`primaryAction`, `secondaryActions`, `breadcrumbActions`, `accessory`) are omitted, the page renders without a header section, starting directly with page content. The heading is typically the largest text on the page and helps users understand where they are in the application. Clear, descriptive headings identify the page's purpose (for example, "Product catalog", "Customer details", "Order #1234").
   */
  heading?: string;
  /**
   * Secondary descriptive text displayed directly below the main heading in a smaller, subdued style. Provides additional context, status information, or supplementary details about the page without overwhelming the primary heading. Common content includes page descriptions ("Manage your product inventory"), status indicators ("Last updated 2 hours ago"), record counts ("145 products"), or contextual metadata. The subheading is optional and typically applied when additional context genuinely helps users understand the page. Brevity is important as it competes with the main heading for attention.
   */
  subheading?: string;
  /**
   * Additional content displayed in the header area, typically action buttons or clickable text elements that complement the primary and secondary actions. Only button and clickable components with text content are supported in this slot. Elements must use the `slot="accessory"` attribute to be placed in this area. Commonly displays contextual actions like "View history", "Export data", or status indicators.
   */
  accessory?: ComponentChildren;
  /**
   * Navigation breadcrumb links displayed in the page header as a series of link elements showing the hierarchical path to the current page. Breadcrumbs help users understand their location within the app structure and provide quick navigation to parent pages (for example, "Home > Products > Electronics > Smartphones"). Each breadcrumb item is typically a clickable link except the current page, which may be displayed as plain text or a disabled link.
   */
  breadcrumbActions?: ComponentChildren;
  /**
   * The content to display in the page's sidebar area. This area contains content that is tangentially related to the main content, such as navigation menus, contextual help, related links, or supplementary information. Elements placed here must use the `slot="aside"` attribute. The sidebar content is visually separated from the main content and may be positioned differently depending on the layout (typically to the side of the main content).
   *
   * @implementation surfaces built ontop of the web platform should implement this using the <aside> element https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
   */
  aside?: ComponentChildren;
  /**
   * Controls the maximum width of the page content.
   *
   * @default 'base'
   */
  inlineSize?: SizeKeyword;
}
/**
 * Properties for POS-specific content blocks with optional heading and secondary actions.
 */
export interface POSBlockProps
  extends GlobalProps,
    Pick<ActionSlots, 'secondaryActions'> {
  /**
   * The title text displayed in the block's header section, identifying the purpose or content of this block. When provided along with `secondaryActions`, creates a block header with both title and action buttons. If both `heading` and `secondaryActions` are omitted, the block renders without a header, starting directly with the block's child content. Blocks are typically used to organize related content within a page into distinct, titled sections. Clear, descriptive headings identify the block's content type (for example, "Recent orders", "Quick actions", "Customer information").
   */
  heading?: string;
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
  /**
   * The secondary actions to perform, provided as button or link type elements.
   */
  secondaryActions?: ComponentChildren;
}
/**
 * Properties for QR code elements including content, size, border, and optional logo.
 */
export interface QRCodeProps extends GlobalProps {
  /**
   * Controls whether a border is displayed around the QR code.
   *
   * @default 'base'
   */
  border?: 'base' | 'none';
  /**
   * The content to be encoded in the QR code. This can be any string such as a URL, email address, plain text, or other data. Specific string formatting can trigger actions on the user's device when scanned, like opening geolocation coordinates on a map, opening a preferred app or app store entry, preparing an email, text message, and more.
   */
  content?: string;
  /**
   * Controls the display size of the QR code:
   * - `'base'`: Fixed size QR code
   * - `'fill'`: QR code expands to fill available space
   *
   * @default 'base'
   */
  size?: 'base' | 'fill';
  /**
   * A label that describes the purpose or contents of the element. Announced to users with assistive technologies such as screen readers to provide context.
   *
   * @default 'QR code' (translated to the user's locale)
   */
  accessibilityLabel?: string;
  /**
   * Called when the resource fails to load.
   */
  onError?: (event: Event) => void;
  /**
   * The URL of an image to be displayed in the center of the QR code.
   * This is useful for branding or to indicate to the user what scanning the QR code will do.
   * By default, no image is displayed.
   */
  logo?: string;
}
/**
 * Properties for scroll-related event callbacks and edge detection.
 */
export interface ScrollEventProps {
  /**
   * Called when scrolling reaches or moves away from any edge of the scrollable container.
   *
   * Provides information about which edges are currently reached:
   * - `inline: 'start'` - at the inline-start edge (typically left in LTR)
   * - `inline: 'end'` - at the inline-end edge (typically right in LTR)
   * - `block: 'start'` - at the block-start edge (typically top)
   * - `block: 'end'` - at the block-end edge (typically bottom)
   * - `null` - not at that edge
   */
  onScrollToEdge?: (
    inline: 'start' | 'end' | null,
    block: 'start' | 'end' | null,
  ) => void;
  /**
   * The threshold distance from each edge at which `onScrollToEdge` triggers. Percentage values are relative to the scrollable content's size in that axis. Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) in the order:
   * - 4 values: `block-start inline-end block-end inline-start`
   * - 3 values: `block-start inline block-end`
   * - 2 values: `block inline`
   * - 1 value: applies to all edges
   *
   * For example:
   * - `48px` - triggers 48px from all edges
   * - `48px 0` - triggers 48px from block edges, 0px from inline edges
   * - `48px 0 48px 10%` - custom distance for each edge
   *
   * Learn more about [`scrollMargin` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/scrollMargin).
   *
   * @default '0'
   */
  scrollMargin?: MaybeAllValuesShorthandProperty<SizeUnits>;
}
/**
 * An overflow behavior keyword.
 */
export type OverflowKeyword = 'auto' | 'hidden';
/**
 * Properties for scrollable container elements with overflow control and scroll event detection.
 */
export interface ScrollBoxProps
  extends GlobalProps,
    ScrollEventProps,
    Omit<BaseBoxPropsWithRole, 'overflow'> {
  /**
   * Sets overflow behavior when content exceeds container dimensions. Use `'auto'` for scrolling or `'hidden'` to clip content. Learn more about [CSS overflow on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow).
   *
   * @default 'auto'
   */
  overflow?: OverflowKeyword | `${OverflowKeyword} ${OverflowKeyword}`;
}
/**
 * Properties for search input fields with text validation and autocomplete support.
 */
export interface SearchFieldProps
  extends GlobalProps,
    BaseTextFieldProps,
    MinMaxLengthProps,
    AutocompleteProps<SearchAutocompleteField> {}
/**
 * Autocomplete field types applicable to search input fields (same as text fields).
 */
export type SearchAutocompleteField = TextAutocompleteField;
/**
 * Properties for content sections with optional heading and actions.
 */
export interface SectionProps extends GlobalProps, ActionSlots {
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
  /**
   * A text label that describes the purpose, function, or contents of the element for users of assistive technologies like screen readers. This label is announced by screen readers but isn't visually displayed. Typically applied when an element doesn't have visible text that adequately describes it, such as icon-only buttons, image carousels, or complex interactive regions. The label is concise yet descriptive (for example, "Close modal", "Product image carousel", "Shopping cart with 3 items"). If the element already has clear visible labels or headings, this property may be unnecessary. For form fields, the `label` property is both visible and accessible.
   */
  accessibilityLabel?: string;
  /**
   * The title text displayed in the section's header, identifying the thematic grouping or purpose of the section's content. Sections represent thematic groups of content, and the heading helps users understand what the section contains. When provided along with action buttons, creates a section header with both title and actions. If both `heading` and `secondaryActions` are omitted, the section renders without a header, though sections generally have headings for accessibility—screen readers rely on headings to help users navigate page structure. Descriptive headings clearly identify the section's content (for example, "Order summary", "Shipping details", "Payment options").
   */
  heading?: string;
  /**
   * The padding applied to all edges of the section content.
   *
   * @default 'base'
   */
  padding?: 'base' | 'none';
}
/**
 * Properties for flexible layout containers with directional flow and alignment control.
 */
export interface StackProps
  extends GlobalProps,
    BaseBoxPropsWithRole,
    GapProps {
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
  /**
   * The direction in which children are laid out using logical properties:
   * - `'block'`: Vertical arrangement along the block axis (typically top to bottom) without wrapping
   * - `'inline'`: Horizontal arrangement along the inline axis (typically left to right) with automatic wrapping when space is insufficient
   *
   * @default 'block'
   *
   * @implementation the content will wrap if the direction is 'inline', and not wrap if the direction is 'block'
   */
  direction?: MaybeResponsive<'block' | 'inline'>;
  /**
   * Controls the distribution and alignment of children along the main axis (the axis defined by the `direction` property). Learn more about [`justify-content` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
   *
   * @default 'normal'
   */
  justifyContent?: MaybeResponsive<JustifyContentKeyword>;
  /**
   * Controls the alignment of individual children along the cross axis (perpendicular to the main axis). Learn more about [`align-items` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
   *
   * @default 'normal'
   */
  alignItems?: MaybeResponsive<AlignItemsKeyword>;
  /**
   * Controls the distribution of space between and around lines of wrapped content along the cross axis. Learn more about [`align-content` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
   *
   * @default 'normal'
   */
  alignContent?: MaybeResponsive<AlignContentKeyword>;
}
/**
 * Properties for inline text elements with semantic meaning and styling options.
 */
export interface TextProps
  extends GlobalProps,
    AccessibilityVisibilityProps,
    BaseTypographyProps,
    DisplayProps,
    Pick<InteractionProps, 'interestFor'> {
  /**
   * The child elements to render within this component.
   */
  children?: ComponentChildren;
  /**
   * The semantic meaning of the text, which may affect its default styling and how screen readers announce it. Other presentation properties can override the default styling.
   *
   * @default 'generic'
   */
  type?: TextType;
}
export type TextType =
  /**
   * Indicates that the text is contact information. Typically used for addresses.
   *
   * This must have `inline` layout (despite the default being `block` in HTML hosts).
   *
   * Surfaces may apply styling to this type.
   *
   * In an HTML host, the text will be rendered in an `<address>` element. Learn more about the [`address` element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address).
   *
   * @implementation vertical alignment should be `baseline` (`vertical-align: baseline`)
   */
  | 'address'
  /**
   * Indicates that the text is no longer accurate or no longer relevant. One such use-case is discounted prices.
   *
   * Surfaces should apply styling to this type to suggest its content no longer applies.
   *
   * In an HTML host, the text will be rendered in a `<s>` element. Learn more about the [`s` element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s).
   */
  | 'redundant'
  /**
   * Indicates that the text is marked or highlighted and relevant to the user's current action.
   * One such use-case is to indicate the characters that matched a search query.
   *
   * Surfaces should apply styling to this type to draw attention to the content.
   *
   * In an HTML host, the text will be rendered in a `<mark>` element. Learn more about the [`mark` element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark).
   */
  | 'mark'
  /**
   * Indicates emphatic stress. Typically for words that have a stressed emphasis compared to surrounding text.
   *
   * Surfaces should apply styling to this type to distinguish it from surrounding text. Italicization is a common choice, but not required.
   *
   * In an HTML host, the text will be rendered in an `<em>` element. Learn more about the [`em` element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em).
   */
  | 'emphasis'
  /**
   * Indicates an offset from the normal prose of the text. Typically used to indicate
   * a foreign word, fictional character thoughts, or when the text refers to the definition of a word
   * instead of representing its semantic meaning.
   *
   * Surfaces should italicize this content by default.
   *
   * In an HTML host, the text will be rendered in a `<i>` tag. Learn more about the [`i` element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i).
   */
  | 'offset'
  /**
   * Indicates strong importance, seriousness, or urgency.
   *
   * Surfaces should render this content bold by default.
   *
   * In an HTML host, the text will be rendered in a `<strong>` tag. Learn more about the [`strong` element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong).
   */
  | 'strong'
  /**
   * Indicates that the text is considered less important than the main content, but is still necessary for the reader to understand.
   * It can be used for secondary content but also for disclaimers, terms and conditions, or legal information.
   *
   * Surfaces should apply a smaller font size than the default size.
   *
   * In an HTML host, the text will be rendered in a `<small>` element. Learn more about the [`small` element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small).
   */
  | 'small'
  /**
   * Indicates that no additional semantics or styling is applied.
   *
   * Surfaces must not apply any default styling to this type.
   *
   * In an HTML host, the text will be rendered in a `<span>` tag. Learn more about the [`span` element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span).
   */
  | 'generic';
/**
 * Properties for multi-line text input areas with character length constraints and autocomplete support.
 */
export interface TextAreaProps
  extends GlobalProps,
    BaseTextFieldProps,
    MinMaxLengthProps,
    AutocompleteProps<TextAutocompleteField> {
  /**
   * The number of visible text lines that determines the initial height of the text area. Each row represents one line of text at the current font size. When users enter more content than fits in the specified rows, the text area becomes scrollable vertically, allowing access to overflow content. The text area doesn't auto-expand beyond this height. For example, `rows={3}` displays three lines of text at once. Use smaller values (2-3) for brief inputs like comments or notes, larger values (5-10) for substantial text entry like descriptions or feedback. This only sets initial height—users can resize the text area if the browser/surface allows it. The actual pixel height depends on font size and line height.
   *
   * @default 2
   */
  rows?: number;
}
/**
 * Properties for single-line text input fields with decorations, constraints, and autocomplete support.
 */
export interface TextFieldProps
  extends GlobalProps,
    BaseTextFieldProps,
    MinMaxLengthProps,
    AutocompleteProps<TextAutocompleteField>,
    FieldDecorationProps {}
/**
 * Properties for clickable tile elements with heading, subheading, and optional count indicator.
 */
export interface TileProps
  extends GlobalProps,
    Pick<BaseClickableProps, 'onClick' | 'disabled'> {
  /**
   * The primary title text that describes the tile's purpose or action. Clear, action-oriented language immediately communicates what the tile does (for example, "Apply loyalty discount", "Add popular item").
   *
   * @default ''
   */
  heading?: string;
  /**
   * Supporting text displayed below the heading that provides additional context or dynamic information. Common content includes cart totals, eligibility requirements, current status, or helpful details that complement the heading.
   *
   * @default ''
   */
  subheading?: string;
  /**
   * A numeric indicator displayed within the tile, typically used for counts, notifications, or step numbers. When provided, the indicator appears inside the tile. Intended for small integers—larger values may be clamped, truncated, or abbreviated by the system.
   */
  itemCount?: number;
  /**
   * Sets the visual tone of the tile based on the intention of the information being conveyed. Use `'accent'` to highlight important or primary actions, `'neutral'` for standard actions, or `'auto'` (default) to let the system determine the appropriate tone based on context.
   *
   * @default 'auto'
   */
  tone?: ExtractStrict<ToneKeyword, 'auto' | 'neutral' | 'accent'>;
}
/**
 * Properties for an interactive time picker component with allow/disallow time ranges.
 */
export interface TimePickerProps
  extends GlobalProps,
    InputProps,
    FocusEventProps {
  /**
   * Specifies allowed time values or ranges for selection. Uses 24-hour format (HH:mm or HH:mm:ss). Supports range syntax with `--` separator and comma-separated values.
   *
   * @default ''
   *
   * @example
   * `09:00--10:00, 13:00--14:00` - allows selecting times within these ranges based on step value
   * `12:00--` - allows selecting `12:00` and all times after it
   */
  allow?: string;
  /**
   * Specifies disallowed time values or ranges that can't be selected. Uses 24-hour format (HH:mm or HH:mm:ss). Supports range syntax with `--` separator and comma-separated values. Takes precedence over `allow`.
   *
   * @default ''
   *
   * @example
   * `09:00--10:00, 13:00--14:00` - disallows selecting times within these ranges
   */
  disallow?: string;
  /**
   * The default time value used when the field is first rendered, in 24-hour format with leading zeros (HH:mm:ss format, for example, `"09:05:00"`). An empty string means no default time. Only applies if no `value` prop is provided.
   *
   * @default ''
   */
  defaultValue?: string;
  /**
   * The currently selected time value in 24-hour format with leading zeros (HH:mm:ss format, for example, `"00:00:00"`, `"09:05:00"`, `"23:59:00"`, `"14:03:30"`). An empty string means no time is selected. This follows the [HTML time input value format](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#value).
   *
   * @default ''
   */
  value?: string;
  /**
   * The increment step between selectable time values, specified in seconds. For example, `60` for one-minute intervals or `3600` for one-hour intervals.
   *
   * @default 60
   */
  step?: number;
}
/**
 * Properties for a text-based time input field with validation and time range constraints.
 */
export interface TimeFieldProps
  extends GlobalProps,
    BaseTextFieldProps,
    Pick<
      TimePickerProps,
      'value' | 'defaultValue' | 'allow' | 'disallow' | 'step'
    > {
  /**
   * Called when the user enters an invalid value. Fires after change validation fails.
   */
  onInvalid?: (event: Event) => void;
  /**
   * The currently selected time value in 24-hour format with leading zeros (HH:mm:ss format, for example, `"00:00:00"`, `"09:05:00"`, `"23:59:00"`, `"14:03:30"`). An empty string means no time is selected.
   */
  value?: string;
  /**
   * The default time value used when the field is first rendered, in 24-hour format with leading zeros (HH:mm:ss format, for example, `"09:05:00"`). An empty string means no default time. Only applies if no `value` prop is provided.
   */
  defaultValue?: string;
}
//
// Preact Virtual DOM
// -----------------------------------
export interface VNode<P = {}> {
  type: ComponentType<P> | string;
  props: P & {
    children: ComponentChildren$1;
  };
  key: Key;
  /**
   * ref isn't guaranteed by React.ReactElement, for compatibility reasons
   * with popular react libs we define it as optional too
   */
  ref?: Ref<any> | null;
  /**
   * The time this `vnode` started rendering. Will only be set when
   * the devtools are attached.
   * Default value: `0`
   */
  startTime?: number;
  /**
   * The time that the rendering of this `vnode` was completed. Will only be
   * set when the devtools are attached.
   * Default value: `-1`
   */
  endTime?: number;
}
//
// Preact Component interface
// -----------------------------------
export type Key = string | number | any;
export type RefObject<T> = {
  current: T | null;
};
export type RefCallback<T> = (instance: T | null) => void | (() => void);
export type Ref<T> = RefObject<T> | RefCallback<T> | null;
export type ComponentChild =
  | VNode<any>
  | object
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined;
type ComponentChildren$1 = ComponentChild[] | ComponentChild;
export interface Attributes {
  key?: Key | undefined;
  jsx?: boolean | undefined;
}
export interface ErrorInfo {
  componentStack?: string;
}
export type RenderableProps<P, RefType = any> = P &
  Readonly<
    Attributes & {
      children?: ComponentChildren$1;
      ref?: Ref<RefType>;
    }
  >;
export type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
export interface FunctionComponent<P = {}> {
  (props: RenderableProps<P>, context?: any): ComponentChildren$1;
  displayName?: string;
  defaultProps?: Partial<P> | undefined;
}
export interface ComponentClass<P = {}, S = {}> {
  new (props: P, context?: any): Component<P, S>;
  displayName?: string;
  defaultProps?: Partial<P>;
  contextType?: Context<any>;
  getDerivedStateFromProps?(
    props: Readonly<P>,
    state: Readonly<S>,
  ): Partial<S> | null;
  getDerivedStateFromError?(error: any): Partial<S> | null;
}
export interface Component<P = {}, S = {}> {
  componentWillMount?(): void;
  componentDidMount?(): void;
  componentWillUnmount?(): void;
  getChildContext?(): object;
  componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
  shouldComponentUpdate?(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
    nextContext: any,
  ): boolean;
  componentWillUpdate?(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
    nextContext: any,
  ): void;
  getSnapshotBeforeUpdate?(oldProps: Readonly<P>, oldState: Readonly<S>): any;
  componentDidUpdate?(
    previousProps: Readonly<P>,
    previousState: Readonly<S>,
    snapshot: any,
  ): void;
  componentDidCatch?(error: any, errorInfo: ErrorInfo): void;
}
declare abstract class Component<P, S> {
  constructor(props?: P, context?: any);
  static displayName?: string;
  static defaultProps?: any;
  static contextType?: Context<any>;
  // Static members can't reference class type parameters. This isn't
  // supported in TypeScript. Reusing the same type arguments from `Component`
  // will lead to an impossible state where one can't satisfy the type
  // constraint under no circumstances, see #1356.In general type arguments
  // seem to be a bit buggy and not supported well at the time of this
  // writing with TS 3.3.3333.
  static getDerivedStateFromProps?(
    props: Readonly<object>,
    state: Readonly<object>,
  ): object | null;
  static getDerivedStateFromError?(error: any): object | null;
  state: Readonly<S>;
  props: RenderableProps<P>;
  context: any;
  base?: Element | Text;
  // From https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e836acc75a78cf0655b5dfdbe81d69fdd4d8a252/types/react/index.d.ts#L402
  // // We MUST keep setState() as a unified signature because it allows proper checking of the method return type.
  // // See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18365#issuecomment-351013257
  setState<K extends keyof S>(
    state:
      | ((
          prevState: Readonly<S>,
          props: Readonly<P>,
        ) => Pick<S, K> | Partial<S> | null)
      | (Pick<S, K> | Partial<S> | null),
    callback?: () => void,
  ): void;
  forceUpdate(callback?: () => void): void;
  abstract render(
    props?: RenderableProps<P>,
    state?: Readonly<S>,
    context?: any,
  ): ComponentChildren$1;
}
//
// Context
// -----------------------------------
export interface Consumer<T>
  extends FunctionComponent<{
    children: (value: T) => ComponentChildren$1;
  }> {}
export interface Provider<T>
  extends FunctionComponent<{
    value: T;
    children?: ComponentChildren$1;
  }> {}
export interface Context<T> extends Provider<T> {
  Consumer: Consumer<T>;
  Provider: Provider<T>;
  displayName?: string;
}
