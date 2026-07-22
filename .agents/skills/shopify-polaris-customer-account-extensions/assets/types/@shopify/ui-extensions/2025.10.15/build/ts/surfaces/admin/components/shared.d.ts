/** VERSION: 1.25.0 **/

/* eslint-disable @typescript-eslint/ban-types */

/* eslint-disable @typescript-eslint/member-ordering */

/**
 * TODO: Update `any` type here after this is resolved
 * https://github.com/Shopify/ui-api-design/issues/139
 */
export type ComponentChildren = preact.ComponentChildren;
export type StringChildren = string;
export interface GlobalProps {
  /**
   * A unique identifier for the element.
   */
  id?: string;
}
export interface ActionProps {
  /**
   * The text to use as the Action modal’s title. If not provided, the name of the extension will be used.
   */
  heading?: string;
}
export interface ActionSlots {
  /**
   * The primary action element, typically a button or link component representing the main call-to-action.
   */
  primaryAction?: ComponentChildren;
  /**
   * The secondary action elements, typically button or link components representing alternative or supporting actions.
   */
  secondaryActions?: ComponentChildren;
}
interface AdminActionProps$1 extends GlobalProps, ActionProps, ActionSlots {
  /**
   * Whether the action is in a loading state, such as during initial page load or when the action is being opened.
   * When `true`, the action might be in an inert state that prevents user interaction.
   *
   * @default false
   */
  loading?: boolean;
}
interface AdminBlockProps$1 extends GlobalProps {
  /**
   * The text displayed as the block's title in the header. If not provided, the extension name will be used.
   */
  heading?: string;
  /**
   * The summary text displayed when the app block is collapsed. Summaries longer than 30 characters will be truncated.
   */
  collapsedSummary?: string;
}
interface AdminPrintActionProps$1 extends GlobalProps {
  /**
   * The source URL of the preview and the document to print.
   * If not provided, the preview will show an empty state and the print button will be disabled.
   * HTML, PDFs, and images are supported.
   */
  src?: string;
}
export interface BaseOverlayProps {
  /**
   * A callback fired immediately after the overlay is shown.
   */
  onShow?: (event: Event) => void;
  /**
   * A callback fired when the overlay is shown, after any show animations have completed.
   */
  onAfterShow?: (event: Event) => void;
  /**
   * A callback fired immediately after the overlay is hidden.
   */
  onHide?: (event: Event) => void;
  /**
   * A callback fired when the overlay is hidden, after any hide animations have completed.
   */
  onAfterHide?: (event: Event) => void;
}
/**
 * Shared interfaces for web component methods.
 *
 * Methods are required (not optional) because:
 * - Components implementing this interface must provide all methods
 * - Unlike props/attributes, methods are not rendered in HTML but are JavaScript APIs
 * - Consumers expect these methods to be consistently available on all instances
 */
export interface BaseOverlayMethods {
  /**
   * A method to programmatically show the overlay.
   *
   * @implementation This is a method to be called on the element and not a callback and should hence be camelCase
   */
  showOverlay: () => void;
  /**
   * A method to programmatically hide the overlay.
   *
   * @implementation This is a method to be called on the element and not a callback and should hence be camelCase
   */
  hideOverlay: () => void;
  /**
   * A method to programmatically toggle the visibility of the overlay.
   *
   * @implementation This is a method to be called on the element and not a callback and should hence be camelCase
   */
  toggleOverlay: () => void;
}
export interface FocusEventProps {
  /**
   * A callback fired when the element loses focus. Learn more about the [blur event](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
   */
  onBlur?: (event: FocusEvent) => void;
  /**
   * A callback fired when the element receives focus. Learn more about the [focus event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event).
   */
  onFocus?: (event: FocusEvent) => void;
}
export interface ToggleEventProps {
  /**
   * A callback fired when the element state changes, after any toggle animations have finished.
   *
   * - If the element transitioned from hidden to showing, the `oldState` property will be set to `closed` and the
   *   `newState` property will be set to `open`.
   * - If the element transitioned from showing to hidden, the `oldState` property will be set to `open` and the
   *   `newState` will be `closed`.
   *
   * Learn more about [ToggleEvent.newState](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/newState) and [ToggleEvent.oldState](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/oldState).
   */
  onAfterToggle?: (event: ToggleEvent$1) => void;
  /**
   * A callback fired immediately when the element state changes, before any animations.
   *
   * - If the element is transitioning from hidden to showing, the `oldState` property will be set to `closed` and the
   *   `newState` property will be set to `open`.
   * - If the element is transitioning from showing to hidden, then `oldState` property will be set to `open` and the
   *   `newState` will be `closed`.
   *
   * Learn more about the [toggle event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/toggle_event), [ToggleEvent.newState](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/newState), and [ToggleEvent.oldState](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/oldState).
   */
  onToggle?: (event: ToggleEvent$1) => void;
}
export type ToggleState = 'open' | 'closed';
interface ToggleEvent$1 extends Event {
  readonly newState: ToggleState;
  readonly oldState: ToggleState;
}
export interface ExtendableEvent extends Event {
  /**
   * A method that accepts a promise signaling the duration and eventual success or failure of actions relating to the event.
   *
   * This might be called multiple times to add promises to the event.
   *
   * However, this might only be called synchronously during the dispatch of the event.
   * As in, you cannot call it after a `setTimeout` or microtask.
   */
  waitUntil?: (promise: Promise<void>) => void;
}
export interface AggregateError<T extends Error> extends Error {
  errors: T[];
}
export interface AggregateErrorEvent<T extends Error> extends ErrorEvent {
  error: AggregateError<T>;
}
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
 * Defines the color intensity or emphasis level for text and UI elements.
 *
 * - `subdued`: Deemphasized color for secondary text, supporting labels, and less critical interface elements.
 * - `base`: Primary color for body text, standard UI elements, and general content with good readability.
 * - `strong`: Emphasized color for headings, key labels, and interactive elements that need prominence.
 *
 */
export type ColorKeyword = 'subdued' | 'base' | 'strong';
interface AvatarProps$1 extends GlobalProps {
  /**
   * The initials to display in the avatar when no image is provided or fails to load. Typically one or two characters representing a person's first and last name initials (e.g., "JD" for John Doe).
   */
  initials?: string;
  /**
   * The URL or path to the avatar image. When provided, the image takes priority over `initials`. If the image is not provided, fails to load, or loads slowly, `initials` will be rendered as a fallback.
   */
  src?: string;
  /**
   * A callback fired when the avatar image loads successfully. Learn more about the [load event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload).
   */
  onLoad?: (event: Event) => void;
  /**
   * A callback fired when the avatar image fails to load. Learn more about the [error event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror).
   */
  onError?: (event: Event) => void;
  /**
   * The size of the avatar. Available sizes range from `small-500` (smallest) to `large-500` (largest), with `base` providing the default medium size that works well in most contexts.
   *
   * @default 'base'
   */
  size?: SizeKeyword;
  /**
   * Alternative text that describes the avatar for accessibility.
   *
   * Provides a text description of the avatar for users with assistive technology
   * and serves as a fallback when the avatar fails to load. A well-written description
   * enables people with visual impairments to understand non-text content.
   *
   * When a screen reader encounters an avatar, it reads this description aloud.
   * When an avatar fails to load, this text displays on screen, helping all users
   * understand what content was intended.
   *
   * Learn more about [writing effective alt text](https://www.shopify.com/ca/blog/image-alt-text#4)
   * and the [alt attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt).
   */
  alt?: string;
}
/**
 * Defines the background color intensity or emphasis level for UI elements.
 *
 * - `transparent`: No background, allowing the underlying surface to show through.
 * - `ColorKeyword`: Applies color intensity levels (subdued, base, strong) to create spatial emphasis and containment.
 *
 */
export type BackgroundColorKeyword = 'transparent' | ColorKeyword;
export interface BackgroundProps {
  /**
   * The background color of the element. Use `transparent` for no background, or choose from `subdued`, `base`, or `strong` to apply varying levels of color intensity based on the component's `tone`.
   *
   * - `transparent`: No background, allowing the underlying surface to show through.
   * - `ColorKeyword`: Applies color intensity levels (subdued, base, strong) to create spatial emphasis and containment.
   *
   * @default 'transparent'
   */
  background?: BackgroundColorKeyword;
}
/**
 * Tone is a property for defining the color treatment of a component.
 *
 * A tone can apply a grouping of colors to a component. For example,
 * critical might have a specific text color and background color.
 *
 * In some cases, like for Banner, the tone might also affect the semantic and accessibility treatment of the component.
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
  'asterisk',
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
  'clock-list',
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
  'microphone-muted',
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
  'number-one',
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
  'phone-down',
  'phone-down-filled',
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
  'radio-control',
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
  'split',
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
  'variant-list',
  'video',
  'video-list',
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
export type IconType = (typeof privateIconArray)[number];
/**
 * Like `Extract`, but ensures that the extracted type is a strict subtype of the input type.
 */
export type ExtractStrict<T, U extends T> = Extract<T, U>;
/**
 * Represents CSS shorthand properties that accept one to four values.
 * Supports specifying values for all four sides: top, right, bottom, and left.
 *
 * - `T`: Single value that applies to all four sides.
 * - `${T} ${T}`: Two values for block axis (top/bottom) and inline axis (left/right).
 * - `${T} ${T} ${T}`: Three values for block-start (top), inline axis (left/right), and block-end (bottom).
 * - `${T} ${T} ${T} ${T}`: Four values for block-start (top), inline-end (right), block-end (bottom), and inline-start (left).
 */
export type MaybeAllValuesShorthandProperty<T extends string> =
  | T
  | `${T} ${T}`
  | `${T} ${T} ${T}`
  | `${T} ${T} ${T} ${T}`;
/**
 * Represents CSS shorthand properties that accept one or two values.
 * Supports specifying the same value for both dimensions or different values.
 *
 * - `T`: Single value that applies to both dimensions.
 * - `${T} ${T}`: Two values for block axis (vertical) and inline axis (horizontal).
 */
export type MaybeTwoValuesShorthandProperty<T extends string> = T | `${T} ${T}`;
/**
 * Makes a property responsive by allowing it to be set conditionally based on container query conditions.
 * The value can be either a base value or a container query string.
 *
 * - `T`: Base value that applies in all conditions.
 * - `@container${string}`: Container query string for conditional responsive styling based on container size.
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
 * This is purely to give the ability
 * to have a space or not in the string literal types.
 *
 * For example in the `aspectRatio` property, `16/9` and `16 / 9` are both valid.
 */
export type optionalSpace = '' | ' ';
interface BadgeProps$1 extends GlobalProps {
  /**
   * The text or elements displayed inside the badge component.
   */
  children?: ComponentChildren;
  /**
   * The semantic meaning and color treatment of the component.
   *
   * - `auto`: Automatically determined based on context.
   * - `neutral`: General information without specific intent.
   * - `info`: Informational content or helpful tips.
   * - `success`: Positive outcomes or successful states.
   * - `caution`: Advisory notices that need attention.
   * - `warning`: Important warnings about potential issues.
   * - `critical`: Urgent problems or destructive actions.
   *
   * @default 'auto'
   */
  tone?: ToneKeyword;
  /**
   * Controls the visual weight and emphasis of the badge.
   *
   * - `base`: Standard weight with moderate emphasis, suitable for most use cases.
   * - `strong`: Increased visual weight for higher emphasis and prominence.
   *
   * @default 'base'
   */
  color?: ColorKeyword;
  /**
   * An icon displayed inside the badge to provide additional visual context or reinforce the badge's meaning.
   * Accepts any icon name from the icon library or a custom string identifier.
   *
   * @default ''
   */
  icon?: IconType | AnyString;
  /**
   * The position of the icon relative to the badge text. Use `start` to place the icon before the text, or `end` to place it after.
   */
  iconPosition?: 'start' | 'end';
  /**
   * The size of the badge. Available sizes range from `small-500` (smallest) to `large-500` (largest), with `base` providing the default size.
   *
   * @default 'base'
   */
  size?: SizeKeyword;
}
interface BannerProps$1 extends GlobalProps, ActionSlots {
  /**
   * The heading text displayed at the top of the banner to summarize the message or alert.
   *
   * @default ''
   */
  heading?: string;
  /**
   * The main content displayed within the banner component, typically descriptive text or other elements providing details about the message or alert.
   */
  children?: ComponentChildren;
  /**
   * The semantic meaning and color treatment of the component. The banner is a live region and the type of status is dictated by the tone selected.
   *
   * - `auto`: Automatically determined based on context.
   * - `neutral`: General status information without emphasis.
   * - `info`: Informational content or helpful tips.
   * - `success`: Positive outcomes or successful states.
   * - `caution`: Situations that need attention but aren't urgent.
   * - `warning`: Important warnings about potential issues.
   * - `critical`: Urgent problems or destructive actions.
   *
   * The `critical` tone creates an [assertive live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role) that is announced by screen readers immediately. The `neutral`, `info`, `success`, `warning`, and `caution` tones create an [informative live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role) that is announced by screen readers after the current message.
   *
   * @default 'auto'
   */
  tone?: ToneKeyword;
  /**
   * Whether the banner content can be collapsed and expanded by the user. A collapsible banner conceals child elements initially, allowing the user to expand the banner to reveal them.
   *
   * @default false
   */
  collapsible?: boolean;
  /**
   * Whether the banner displays a close button that allows users to dismiss it.
   *
   * When the close button is pressed, the `dismiss` event will fire,
   * then `hidden` will be set to `true`,
   * any animation will complete,
   * and the `afterhide` event will fire.
   *
   * @default false
   */
  dismissible?: boolean;
  /**
   * A callback that fires when the banner is dismissed by the user clicking the close button.
   *
   * This doesn't fire when setting `hidden` manually.
   *
   * The `hidden` property is `false` when this event fires.
   */
  onDismiss?: (event: Event) => void;
  /**
   * A callback that fires when the banner has fully hidden, including after any hide animations have completed.
   *
   * The `hidden` property is `true` when this event fires.
   *
   * @implementation If implementations animate the hiding of the banner,
   * this event must fire after the banner has fully hidden.
   * We can add an `onHide` event in future if we want to provide a hook for the start of the animation.
   */
  onAfterHide?: (event: Event) => void;
  /**
   * Controls whether the banner is visible or hidden.
   *
   * When using a controlled component pattern and the banner is `dismissible`,
   * update this property to `true` when the `dismiss` event fires.
   *
   * You can hide the banner programmatically by setting this to `true` even if it's not `dismissible`.
   *
   * @default false
   */
  hidden?: boolean;
}
export interface DisplayProps {
  /**
   * Sets the outer display type of the component. The outer type sets a component’s participation in [flow layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flow_layout).
   *
   * - `auto`: the component’s initial value. The actual value depends on the component and context.
   * - `none`: hides the component from display and removes it from the accessibility tree, making it invisible to screen readers.
   *
   * Learn more about the [display property](https://developer.mozilla.org/en-US/docs/Web/CSS/display).
   *
   * @default 'auto'
   */
  display?: MaybeResponsive<'auto' | 'none'>;
}
export interface AccessibilityRoleProps {
  /**
   * Sets the semantic meaning of the component’s content. When set,
   * the role will be used by assistive technologies to help users
   * navigate the page.
   *
   * @implementation Although, in HTML hosts, this property changes the element used,
   * changing this property must not impact the visual styling of inside or outside of the box.
   *
   * @default 'generic'
   */
  accessibilityRole?: AccessibilityRole;
}
/**
 * Defines the semantic role of a component for assistive technologies like screen readers.
 *
 * Accessibility roles help users with disabilities understand the purpose and structure of content.
 * These roles map to HTML elements and ARIA roles, providing semantic meaning beyond visual presentation.
 *
 * Use these roles to:
 * - Improve navigation for screen reader users
 * - Provide semantic structure to your UI
 * - Ensure proper interpretation by assistive technologies
 *
 * Learn more about [ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) in the MDN web docs.
 *
 * - `main`: Indicates the primary content area of the page.
 * - `header`: Marks a component as a header containing introductory content or navigation.
 * - `footer`: Designates content containing information like copyright, navigation links, or privacy statements.
 * - `section`: Defines a generic thematic grouping of content that should have a heading or accessible label.
 * - `aside`: Marks supporting content that relates to but is separate from the main content.
 * - `navigation`: Identifies major groups of navigation links for moving around the site or page.
 * - `ordered-list`: Represents a list where the order of items is meaningful.
 * - `list-item`: Identifies an individual item within a list.
 * - `list-item-separator`: Acts as a visual and semantic divider between items in a list.
 * - `unordered-list`: Represents a list where the order of items is not meaningful.
 * - `separator`: Creates a divider that separates and distinguishes sections of content.
 * - `status`: Defines a live region for advisory information that is not urgent enough to be an alert.
 * - `alert`: Marks important, time-sensitive information that requires the user's immediate attention.
 * - `generic`: Creates a semantically neutral container element with no inherent meaning.
 * - `presentation`: Removes semantic meaning from an element while preserving its visual appearance.
 * - `none`: Synonym for `presentation`, removes semantic meaning while keeping visual styling.
 */
export type AccessibilityRole =
  /**
   * Used to indicate the primary content.
   *
   * In an HTML host, `main` will render a `<main>` element.
   * Learn more about the [`<main>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role) in the MDN web docs.
   */
  | 'main'
  /**
   * Used to indicate the component is a header.
   *
   * In an HTML host `header` will render a `<header>` element.
   * Learn more about the [`<header>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role) in the MDN web docs.
   */
  | 'header'
  /**
   * Used to display information such as copyright information, navigation links, and privacy statements.
   *
   * In an HTML host `footer` will render a `<footer>` element.
   * Learn more about the [`<footer>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/contentinfo_role) in the MDN web docs.
   */
  | 'footer'
  /**
   * Used to indicate a generic section.
   * Sections should always have a heading or an accessible name provided in the `accessibilityLabel` property.
   *
   * In an HTML host `section` will render a `<section>` element.
   * Learn more about the [`<section>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role) in the MDN web docs.
   *
   */
  | 'section'
  /**
   * Used to designate a supporting section that relates to the main content.
   *
   * In an HTML host `aside` will render an `<aside>` element.
   * Learn more about the [`<aside>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/complementary_role) in the MDN web docs.
   */
  | 'aside'
  /**
   * Used to identify major groups of links used for navigating.
   *
   * In an HTML host `navigation` will render a `<nav>` element.
   * Learn more about the [`<nav>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role) in the MDN web docs.
   */
  | 'navigation'
  /**
   * Used to identify a list of ordered items.
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
   * Used to indicates the component acts as a divider that separates and distinguishes sections of content in a list of items.
   *
   * In an HTML host `list-item-separator` will render as `<li role="separator">`.
   * Learn more about the [`<li>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) and the [`separator` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role) in the MDN web docs.
   */
  | 'list-item-separator'
  /**
   * Used to identify a list of unordered items.
   *
   * In an HTML host `unordered-list` will render a `<ul>` element.
   * Learn more about the [`<ul>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role) in the MDN web docs.
   */
  | 'unordered-list'
  /**
   * Used to indicates the component acts as a divider that separates and distinguishes sections of content.
   *
   * In an HTML host `separator` will render as `<div role="separator">`.
   * Learn more about the [`separator` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role) in the MDN web docs.
   */
  | 'separator'
  /**
   * Used to define a live region containing advisory information for the user that is not important enough to be an alert.
   *
   * In an HTML host `status` will render as `<div role="status">`.
   * Learn more about the [`status` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role) in the MDN web docs.
   */
  | 'status'
  /**
   * Used for important, and usually time-sensitive, information.
   *
   * In an HTML host `alert` will render as `<div role="alert">`.
   * Learn more about the [`alert` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role) in the MDN web docs.
   */
  | 'alert'
  /**
   * Used to create a nameless container element which has no semantic meaning on its own.
   *
   * In an HTML host `generic'` will render a `<div>` element.
   * Learn more about the [`generic` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/generic_role) in the MDN web docs.
   */
  | 'generic'
  /**
   * Used to strip the semantic meaning of an element, but leave the visual styling intact.
   *
   * Synonym for `none`
   * Learn more about the [`presentation` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/presentation_role) in the MDN web docs.
   */
  | 'presentation'
  /**
   * Used to strip the semantic meaning of an element, but leave the visual styling intact.
   *
   * Synonym for `presentation`
   * Learn more about the [`none` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/none_role) in the MDN web docs.
   */
  | 'none';
export interface AccessibilityVisibilityProps {
  /**
   * Controls the visibility of the element for both visual and assistive technology users.
   *
   * - `visible`: The element is visible to all users (both sighted users and screen readers).
   * - `hidden`: The element is visually visible but hidden from screen readers. Use this for decorative elements that don't provide meaningful information.
   * - `exclusive`: The element is visually hidden but announced by screen readers. Use this for screen-reader-only content like skip links or additional context.
   *
   * @default 'visible'
   */
  accessibilityVisibility?: 'visible' | 'hidden' | 'exclusive';
}
export interface LabelAccessibilityVisibilityProps {
  /**
   * Controls whether the label is visible to all users or only to screen readers.
   *
   * - `visible`: The label is shown to everyone (default).
   * - `exclusive`: The label is visually hidden but still announced by screen readers.
   *
   * Use `exclusive` when the surrounding context makes the label redundant visually,
   * but screen reader users still need it for clarity.
   *
   * @default 'visible'
   */
  labelAccessibilityVisibility?: ExtractStrict<
    AccessibilityVisibilityProps['accessibilityVisibility'],
    'visible' | 'exclusive'
  >;
}
/**
 * Defines the padding size for elements, using the standard size scale or `none` for no padding.
 *
 * - `SizeKeyword`: Standard padding sizes from the size scale for consistent spacing.
 * - `none`: No padding.
 */
export type PaddingKeyword = SizeKeyword | 'none';
export interface PaddingProps {
  /**
   * The padding applied to all edges of the component.
   *
   * Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) using flow-relative values:
   * - 1 value applies to all sides
   * - 2 values apply to block (top/bottom) and inline (left/right)
   * - 3 values apply to block-start (top), inline (left/right), and block-end (bottom)
   * - 4 values apply to block-start (top), inline-end (right), block-end (bottom), and inline-start (left)
   *
   * **Examples:** `base`, `large none`, `base large-100 base small`
   *
   * Use `auto` to inherit padding from the nearest container with removed padding.
   *
   * @default 'none'
   */
  padding?: MaybeResponsive<MaybeAllValuesShorthandProperty<PaddingKeyword>>;
  /**
   * The block-direction padding (top and bottom in horizontal writing modes).
   *
   * Accepts a single value for both sides or two space-separated values for block-start and block-end.
   *
   * **Example:** `large none` applies `large` to the top and `none` to the bottom.
   *
   * Overrides the block value from `padding`.
   *
   * @default '' - meaning no override
   */
  paddingBlock?: MaybeResponsive<
    MaybeTwoValuesShorthandProperty<PaddingKeyword> | ''
  >;
  /**
   * The block-start padding (top in horizontal writing modes).
   *
   * Overrides the block-start value from `paddingBlock`.
   *
   * @default '' - meaning no override
   */
  paddingBlockStart?: MaybeResponsive<PaddingKeyword | ''>;
  /**
   * The block-end padding (bottom in horizontal writing modes).
   *
   * Overrides the block-end value from `paddingBlock`.
   *
   * @default '' - meaning no override
   */
  paddingBlockEnd?: MaybeResponsive<PaddingKeyword | ''>;
  /**
   * The inline-direction padding (left and right in horizontal writing modes).
   *
   * Accepts a single value for both sides or two space-separated values for inline-start and inline-end.
   *
   * **Example:** `large none` applies `large` to the left and `none` to the right.
   *
   * Overrides the inline value from `padding`.
   *
   * @default '' - meaning no override
   */
  paddingInline?: MaybeResponsive<
    MaybeTwoValuesShorthandProperty<PaddingKeyword> | ''
  >;
  /**
   * The inline-start padding (left in LTR writing modes, right in RTL).
   *
   * Overrides the inline-start value from `paddingInline`.
   *
   * @default '' - meaning no override
   */
  paddingInlineStart?: MaybeResponsive<PaddingKeyword | ''>;
  /**
   * The inline-end padding (right in LTR writing modes, left in RTL).
   *
   * Overrides the inline-end value from `paddingInline`.
   *
   * @default '' - meaning no override
   */
  paddingInlineEnd?: MaybeResponsive<PaddingKeyword | ''>;
}
/**
 * Represents size values in pixels, percentages, or zero.
 *
 * - `${number}px`: Absolute size in pixels for fixed dimensions (such as `100px`, `24px`).
 * - `${number}%`: Relative size as a percentage of the parent container (such as `50%`, `100%`).
 * - `0`: Zero size, equivalent to no dimension.
 */
export type SizeUnits = `${number}px` | `${number}%` | `0`;
/**
 * Represents size values that can also be set to `auto` for automatic sizing.
 *
 * - `SizeUnits`: Specific size values in pixels, percentages, or zero for precise control.
 * - `auto`: Automatically sizes based on content and layout constraints.
 */
export type SizeUnitsOrAuto = SizeUnits | 'auto';
/**
 * Represents size values that can also be set to `none` to remove the size constraint.
 *
 * - `SizeUnits`: Specific size values in pixels, percentages, or zero for precise control.
 * - `none`: No size constraint, allowing unlimited growth.
 */
export type SizeUnitsOrNone = SizeUnits | 'none';
export interface SizingProps {
  /**
   * The block size of the element (height in horizontal writing modes). Learn more about the [block-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/block-size).
   *
   * - `SizeUnits`: Specific size values in pixels, percentages, or zero for precise control.
   * - `auto`: Automatically sizes based on content and layout constraints.
   *
   * @default 'auto'
   */
  blockSize?: MaybeResponsive<SizeUnitsOrAuto>;
  /**
   * The minimum block size of the element (minimum height in horizontal writing modes). Learn more about the [min-block-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size).
   *
   * @default '0'
   */
  minBlockSize?: MaybeResponsive<SizeUnits>;
  /**
   * The maximum block size of the element (maximum height in horizontal writing modes). Learn more about the [max-block-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size).
   *
   * @default 'none'
   */
  maxBlockSize?: MaybeResponsive<SizeUnitsOrNone>;
  /**
   * The inline size of the element (width in horizontal writing modes). Learn more about the [inline-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size).
   *
   * - `SizeUnits`: Specific size values in pixels, percentages, or zero for precise control.
   * - `auto`: Automatically sizes based on content and layout constraints.
   *
   * @default 'auto'
   */
  inlineSize?: MaybeResponsive<SizeUnitsOrAuto>;
  /**
   * The minimum inline size of the element (minimum width in horizontal writing modes). Learn more about the [min-inline-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size).
   *
   * @default '0'
   */
  minInlineSize?: MaybeResponsive<SizeUnits>;
  /**
   * The maximum inline size of the element (maximum width in horizontal writing modes). Learn more about the [max-inline-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/max-inline-size).
   *
   * @default 'none'
   */
  maxInlineSize?: MaybeResponsive<SizeUnitsOrNone>;
}
export type BorderStyleKeyword =
  | 'none'
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'auto';
/**
 * Defines the width of borders, using the standard size scale or `none` for no border.
 *
 * - `SizeKeyword`: Standard border widths from the size scale for consistent thickness.
 * - `none`: No border width (removes the border).
 */
export type BorderSizeKeyword = SizeKeyword | 'none';
export type BorderRadiusKeyword = SizeKeyword | 'max' | 'none';
/**
 * Represents a shorthand for defining a border. It can be a combination of size, optionally followed by color, optionally followed by style.
 */
export type BorderShorthand =
  | BorderSizeKeyword
  | `${BorderSizeKeyword} ${ColorKeyword}`
  | `${BorderSizeKeyword} ${ColorKeyword} ${BorderStyleKeyword}`;
export interface BorderProps {
  /**
   * Applies a border using shorthand syntax to specify width, color, and style in a single property.
   *
   * Accepts a size value, optionally followed by a color, optionally followed by a style.
   * Omitted values use defaults: color defaults to `base`, style defaults to `auto`.
   *
   * Individual properties (`borderWidth`, `borderStyle`, `borderColor`) can override values set here.
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
   * Controls the thickness of the border on all sides. When set, this overrides the width value specified in the `border` property.
   *
   * - `small`: Thin border for subtle definition.
   * - `small-100`: Extra thin border for minimal emphasis.
   * - `base`: Standard border width.
   * - `large`: Thick border for strong emphasis.
   * - `large-100`: Extra thick border for maximum prominence.
   * - `none`: No border.
   *
   * Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) for specifying different widths per side:
   * - One value: applies to all sides
   * - Two values: applies to block sides (top/bottom) and inline sides (left/right) respectively
   * - Three values: applies to block-start (top), inline sides (left/right), and block-end (bottom) respectively
   * - Four values: applies to block-start (top), inline-end (right), block-end (bottom), and inline-start (left) respectively
   *
   * @default '' - meaning no override
   */
  borderWidth?: MaybeAllValuesShorthandProperty<BorderSizeKeyword> | '';
  /**
   * Controls the visual style of the border on all sides, such as solid, dashed, or dotted.
   *
   * When set, this overrides the style value specified in the `border` property.
   *
   * Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) for specifying different styles per side:
   * - One value: applies to all sides
   * - Two values: applies to block sides (top/bottom) and inline sides (left/right) respectively
   * - Three values: applies to block-start (top), inline sides (left/right), and block-end (bottom) respectively
   * - Four values: applies to block-start (top), inline-end (right), block-end (bottom), and inline-start (left) respectively
   *
   * @default '' - meaning no override
   */
  borderStyle?: MaybeAllValuesShorthandProperty<BorderStyleKeyword> | '';
  /**
   * Controls the color of the border using the design system's color scale.
   *
   * When set, this overrides the color value specified in the `border` property.
   * Choose from `subdued`, `base`, or `strong` to match the visual emphasis needed.
   *
   * @default '' - meaning no override
   */
  borderColor?: ColorKeyword | '';
  /**
   * Controls the roundedness of the element's corners using the design system's radius scale.
   *
   * Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) using flow-relative values:
   * - One value: applies to all corners
   * - Two values: applies to start corners (top-left & bottom-right) and end corners (top-right & bottom-left) respectively
   * - Three values: applies to start-start (top-left), end corners (top-right & bottom-left), and end-end (bottom-right) respectively
   * - Four values: applies to start-start (top-left), start-end (top-right), end-end (bottom-right), and end-start (bottom-left) respectively
   *
   * Examples:
   * - `small-100`: All corners have `small-100` radius
   * - `small-100 none`: Top-left and bottom-right are `small-100`, top-right and bottom-left are `none`
   * - `small-100 none large-100`: Top-left is `small-100`, top-right and bottom-left are `none`, bottom-right is `large-100`
   * - `small-100 none large-100 base`: Each corner has its specified radius value
   *
   * @defaultValue 'none'
   */
  borderRadius?: MaybeAllValuesShorthandProperty<BorderRadiusKeyword>;
}
export interface OverflowProps {
  /**
   * Sets the overflow behavior of the element.
   *
   * - `visible`: the content that extends beyond the element’s container is visible.
   * - `hidden`: clips the content when it is larger than the element’s container.
   * The element will not be scrollable and the users will not be able
   * to access the clipped content by dragging or using a scroll wheel on a mouse.
   *
   * @default 'visible'
   */
  overflow?: 'hidden' | 'visible';
}
export interface BaseBoxProps
  extends AccessibilityVisibilityProps,
    BackgroundProps,
    DisplayProps,
    SizingProps,
    PaddingProps,
    BorderProps,
    OverflowProps {
  /**
   * The content of the box.
   */
  children?: ComponentChildren;
  /**
   * A label that describes the purpose or content of the component for assistive technologies like screen readers. Use this to provide additional context when the visible content alone doesn't clearly convey the component's purpose.
   */
  accessibilityLabel?: string;
}
export interface BaseBoxPropsWithRole
  extends BaseBoxProps,
    AccessibilityRoleProps {}
interface BoxProps$1 extends BaseBoxPropsWithRole, GlobalProps {}
export interface ButtonBehaviorProps extends InteractionProps, FocusEventProps {
  /**
   * The behavioral type of the button component, which determines what action it performs when activated.
   *
   * - `submit`: Submits the nearest containing form.
   * - `button`: Performs no default action, relying on the `onClick` handler for behavior.
   * - `reset`: Resets all fields in the nearest containing form to their default values.
   *
   * This property is ignored if `href` or `commandFor`/`command` is set.
   *
   * @default 'button'
   */
  type?: 'submit' | 'button' | 'reset';
  /**
   * A callback fired when the button is activated, before performing the action indicated by `type`. Learn more about the [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event).
   */
  onClick?: (event: Event) => void;
  /**
   * Whether the button is disabled, preventing it from being clicked or receiving focus.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the button is in a loading state, which replaces the button content with a loading indicator and disables interactions.
   *
   * @default false
   */
  loading?: boolean;
}
export interface LinkBehaviorProps extends InteractionProps, FocusEventProps {
  /**
   * The URL to navigate to when clicked. The `click` event fires first, then navigation occurs. If `commandFor` is also set, the command executes instead of navigation.
   */
  href?: string;
  /**
   * Specifies where to display the linked URL.
   *
   * Learn more about the [target attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).
   *
   * - `auto`: The target is automatically determined based on the origin of the URL.
   * - `_blank`: Opens the URL in a new window or tab.
   * - `_self`: Opens the URL in the same browsing context as the current one.
   * - `_parent`: Opens the URL in the parent browsing context of the current one. If there is no parent, behaves as `_self`.
   * - `_top`: Opens the URL in the topmost browsing context (the highest ancestor of the current one). If there is no ancestor, behaves as `_self`.
   *
   * @implementation Surfaces can set specific rules on how they handle each URL.
   * @implementation It’s expected that the behavior of `auto` is as `_self` except in specific cases.
   * @implementation For example, a surface could decide to open cross-origin URLs in a new window (as `_blank`).
   *
   * @default 'auto'
   */
  target?: 'auto' | '_blank' | '_self' | '_parent' | '_top' | AnyString;
  /**
   * A filename that causes the browser to treat the linked URL as a download. Downloads only work for same-origin URLs or the `blob:` and `data:` schemes. Learn more about the [download attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).
   */
  download?: string;
  /**
   * A callback fired when the link is activated, before navigating to the location specified by `href`. Learn more about the [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event).
   */
  onClick?: (event: Event) => void;
}
export interface InteractionProps {
  /**
   * The ID of the component to control when this component is activated. Pair with the `command` property to specify what action to perform on the target component. Learn more about the [`commandFor` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#commandfor).
   */
  commandFor?: string;
  /**
   * The action that the `commandFor` target should take when this component is activated. The supported actions vary by target component type.
   *
   * - `--auto`: Performs the default action appropriate for the target component.
   * - `--show`: Displays the target component if it's currently hidden.
   * - `--hide`: Conceals the target component from view.
   * - `--toggle`: Alternates the target component between visible and hidden states.
   * - `--copy`: Copies the content of the target `ClipboardItem` to the system clipboard.
   *
   * Learn more about the [command attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command).
   *
   * @default '--auto'
   */
  command?: '--auto' | '--show' | '--hide' | '--toggle' | '--copy';
  /**
   * The ID of the component to show when users hover over or focus on this component. Use this to connect interactive components to popovers or tooltips that provide additional context or information.
   */
  interestFor?: string;
}
export interface BaseClickableProps
  extends ButtonBehaviorProps,
    LinkBehaviorProps {}
interface ButtonProps$1 extends GlobalProps, BaseClickableProps {
  /**
   * A label that describes the purpose or content of the component for assistive technologies like screen readers. Use this to provide additional context when the visible content alone doesn't clearly convey the component's purpose.
   */
  accessibilityLabel?: string;
  /**
   * The content displayed within the button component.
   */
  children?: ComponentChildren;
  /**
   * An icon displayed inside the button, typically positioned before the button text.
   * Use icons to help users quickly identify the button's action or to improve scannability.
   * Accepts any icon name from the icon library or a custom string identifier.
   *
   * @default ''
   */
  icon?: IconType | AnyString;
  /**
   * The inline width (horizontal size) of the button component.
   *
   * - `auto`: The button size depends on the surface and context.
   * - `fill`: The button takes up 100% of the available inline space.
   * - `fit-content`: The button takes up only the space needed to fit its content.
   *
   * @default 'auto'
   */
  inlineSize?: 'auto' | 'fill' | 'fit-content';
  /**
   * The visual style variant of the button component, which controls its prominence and emphasis in the interface.
   *
   * @default 'auto' - the variant is automatically determined by the button's context
   */
  variant?: 'auto' | 'primary' | 'secondary' | 'tertiary';
  /**
   * The semantic meaning and color treatment of the component.
   *
   * - `critical`: Urgent problems or destructive actions.
   * - `auto`: Automatically determined based on context.
   * - `neutral`: General information without specific intent.
   *
   * @default 'auto'
   */
  tone?: ToneKeyword;
  /**
   * The language of the button's text content. Use this when the button text is in a different language than the rest of the page, allowing assistive technologies such as screen readers to invoke the correct pronunciation. See the [reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) ("subtag" label).
   */
  lang?: string;
}
interface ButtonGroupProps$1 extends GlobalProps, ActionSlots {
  /**
   * The content of the button group, typically a collection of button or link components.
   */
  children?: ComponentChildren;
  /**
   * The spacing between button elements within the group.
   *
   * @default 'base'
   */
  gap?: 'base' | 'none';
  /**
   * A label that describes the purpose or content of the component for assistive technologies like screen readers. Use this to provide additional context when the visible content alone doesn't clearly convey the component's purpose.
   *
   * @implementation Used as a hidden heading or an aria-label on the wrapping element.
   */
  accessibilityLabel?: string;
}
export interface BaseInputProps {
  /**
   * The name attribute for the field, used to identify the field's value when the form is submitted. Must be unique within the nearest containing form.
   */
  name?: string;
  /**
   * Whether the field is disabled, preventing any user interaction.
   *
   * @default false
   */
  disabled?: boolean;
}
export interface InputProps extends BaseInputProps {
  /**
   * A callback fired when the user has finished editing the field, such as when they blur the field or press Enter. Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
   */
  onChange?: (event: Event) => void;
  /**
   * A callback fired when the user makes any changes in the field, such as typing a character. Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
   */
  onInput?: (event: Event) => void;
  /**
   * The current value in the field. When setting this property programmatically, it updates the field's display value. When reading it, you get the user's current input.
   */
  value?: string;
  /**
   * The initial value of the field when it first loads. Unlike `placeholder`, this is a real value that the user can edit and that gets submitted with the form. After the user starts typing, their input replaces it. Changing this property after the field has loaded has no effect. To update the field value, use `value` instead.
   *
   * @implementation `defaultValue` reflects to the `value` attribute.
   */
  defaultValue?: string;
}
export interface MultipleInputProps extends BaseInputProps {
  /**
   * A callback fired when the user has selected one or more options. Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
   */
  onChange?: (event: Event) => void;
  /**
   * A callback fired when the user selects or deselects options. Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
   */
  onInput?: (event: Event) => void;
  /**
   * An array of `value` attributes for the currently selected options.
   *
   * When provided, this property automatically sets the `selected` state on child Option components that have matching `value` attributes. Options with values included in this array will be marked as selected, while others will be unselected.
   */
  values?: string[];
}
export interface FileInputProps extends BaseInputProps {
  /**
   * A callback fired when the user has finished selecting one or more files.
   */
  onChange?: (event: Event) => void;
  /**
   * A callback fired when the user makes any changes to the file selection.
   */
  onInput?: (event: Event) => void;
  /**
   * A string that represents the path to the selected file(s). If no file is selected yet, the value is an empty string ("").
   * When the user selected multiple files, the value represents the first file in the list of files they selected.
   * The value is always the file's name prefixed with "C:\fakepath\", which isn't the real path of the file. Learn more about the [file input value](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#value).
   *
   * @default ''
   */
  value?: string;
  /**
   * An array of File objects representing the files currently selected by the user.
   *
   * This property is read-only and cannot be directly modified.
   * To clear the selected files, set the `value` prop to an empty string or null.
   *
   * @default []
   */
  files?: ReadonlyArray<File>;
}
export interface FieldErrorProps {
  /**
   * An error message to display to the user. When set, the field will be styled with error indicators to communicate problems that need to be resolved immediately.
   */
  error?: string;
}
export interface BasicFieldProps
  extends FieldErrorProps,
    LabelAccessibilityVisibilityProps {
  /**
   * Whether the field requires a value before form submission. Displays a visual indicator and adds semantic meaning, but doesn't automatically validate or show errors. Use the `error` property to display validation messages.
   *
   * @default false
   */
  required?: boolean;
  /**
   * The text label displayed above or alongside the field to describe its purpose.
   */
  label?: string;
}
export interface FieldDetailsProps {
  /**
   * Additional helpful text displayed alongside the field to provide context, guidance, or instructions to the user. This content is accessible to both visual and screen reader users.
   */
  details?: string;
}
export interface FieldProps
  extends BasicFieldProps,
    InputProps,
    FocusEventProps,
    FieldDetailsProps {
  /**
   * The placeholder text displayed in the field when it's empty, providing a hint about the expected input format or value. Unlike `defaultValue`, this is a temporary value that disappears after the user starts typing.
   */
  placeholder?: string;
}
export interface BaseTextFieldProps extends FieldProps {
  /**
   * Whether the field is read-only and can't be edited. Read-only fields remain focusable and their content is announced by screen readers.
   *
   * @default false
   */
  readOnly?: boolean;
}
export interface FieldDecorationProps {
  /**
   * A non-editable text value displayed immediately after the editable portion of the field. This is useful for displaying an implied part of the value, such as `@shopify.com` or `%`.
   *
   * This text can't be edited by the user and is not included in the field's value. The suffix might not appear until the user interacts with the field. For example, an inline label might occupy the suffix position until the user focuses the field.
   *
   * @default ''
   */
  suffix?: string;
  /**
   * A non-editable text value displayed immediately before the editable portion of the field. This is useful for displaying an implied part of the value, such as `https://` or `+353`.
   *
   * This text can't be edited by the user and is not included in the field's value. The prefix might not appear until the user interacts with the field. For example, an inline label might occupy the prefix position until the user focuses the field.
   *
   * @default ''
   */
  prefix?: string;
  /**
   * The type of icon to be displayed in the field.
   *
   * @default ''
   */
  icon?: IconType | AnyString;
  /**
   * Additional interactive content displayed within the field.
   *
   * Accepts Button and Clickable components with text content only. Commonly used for actions like clearing the field or opening additional information.
   */
  accessory?: ComponentChildren;
}
export interface NumberConstraintsProps {
  /**
   * The highest decimal or integer value accepted for the field. When used with `step`, the value rounds down to the maximum number.
   *
   * Users can still type values higher than the maximum using the keyboard. Implement validation to enforce this constraint.
   *
   * @default Infinity
   */
  max?: number;
  /**
   * The lowest decimal or integer value accepted for the field. When used with `step`, the value rounds up to the minimum number.
   *
   * Users can still type values lower than the minimum using the keyboard. Implement validation to enforce this constraint.
   *
   * @default -Infinity
   */
  min?: number;
  /**
   * The amount the value can increase or decrease by. This can be an integer or decimal.
   * If a `max` or `min` is specified with `step` when increasing/decreasing the value
   * via the buttons, the final value will always round to the `max` or `min`
   * rather than the closest valid amount.
   *
   * @default 1
   */
  step?: number;
  /**
   * Sets the type of controls displayed in the field.
   *
   * - `stepper`: displays buttons to increase or decrease the value of the field by the stepping interval defined in the `step` property.
   * Appropriate mouse and [keyboard interactions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/spinbutton_role#keyboard_interactions) to control the value of the field are enabled.
   * - `none`: no controls are displayed and users must input the value manually. Arrow keys and scroll wheels can’t be used either to avoid accidental changes.
   * - `auto`: the presence of the controls depends on the surface and context.
   *
   * @default 'auto'
   */
  controls?: 'auto' | 'stepper' | 'none';
}
export interface MinMaxLengthProps {
  /**
   * The maximum number of characters allowed in the field.
   *
   * @default Infinity
   */
  maxLength?: number;
  /**
   * The minimum number of characters required in the field.
   *
   * @default 0
   */
  minLength?: number;
}
export interface BaseSelectableProps {
  /**
   * A label that describes the purpose or content of the component for assistive technologies like screen readers. Use this to provide additional context when the visible content alone doesn't clearly convey the component's purpose.
   */
  accessibilityLabel?: string;
  /**
   * Whether the control is disabled, preventing any user interaction.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * The value submitted with form data when the control is checked or selected.
   */
  value?: string;
}
export interface BaseOptionProps extends BaseSelectableProps {
  /**
   * Whether the option is currently selected.
   *
   * @default false
   */
  selected?: boolean;
  /**
   * Whether the option is selected by default when first rendered.
   *
   * @implementation `defaultSelected` reflects to the `selected` attribute.
   *
   * @default false
   */
  defaultSelected?: boolean;
}
export interface BaseCheckableProps
  extends BaseSelectableProps,
    InteractionProps {
  /**
   * The visual text label displayed alongside the control to describe its purpose.
   */
  label?: string;
  /**
   * Whether the control is currently checked (for checkboxes) or toggled on (for switches).
   *
   * @default false
   */
  checked?: boolean;
  /**
   * Whether the control is checked by default when first rendered.
   *
   * @implementation `defaultChecked` reflects to the `checked` attribute.
   *
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * The name attribute for the control, which must be unique within the nearest containing Form component. This name is used to identify the control's value when the form is submitted.
   */
  name?: string;
  /**
   * A callback fired when the control's value changes. Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
   */
  onChange?: (event: Event) => void;
  /**
   * A callback fired when the control's value changes. Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
   */
  onInput?: (event: Event) => void;
}
interface CheckboxProps$1
  extends GlobalProps,
    BaseCheckableProps,
    FieldErrorProps,
    FieldDetailsProps {
  /**
   * Whether the checkbox displays in an indeterminate state (neither checked nor unchecked), typically used to indicate partial selection in hierarchical lists.
   *
   * This visual state takes priority over the `checked` prop in appearance only.
   * The form submission value is still determined by the `checked` prop.
   *
   * If `indeterminate` has not been explicitly set and hasn't been modified by user interaction,
   * it returns the value of `defaultIndeterminate`.
   *
   * @implementation The `indeterminate` property doesn't reflect to any attribute.
   */
  indeterminate?: boolean;
  /**
   * Whether the checkbox is in an indeterminate state by default when first rendered.
   *
   * Similar to `defaultValue` and `defaultChecked`, this value applies until `indeterminate` is explicitly set or the user changes the checkbox state.
   *
   * @implementation `defaultIndeterminate` reflects to the `indeterminate` attribute.
   *
   * @default false
   */
  defaultIndeterminate?: boolean;
  /**
   * Whether the checkbox must be checked before form submission. This adds semantic meaning and typically displays a visual indicator, but does not automatically validate or show errors. Use the `error` property to display validation messages.
   *
   * @default false
   */
  required?: boolean;
}
export interface ChipProps$1 extends GlobalProps {
  /**
   * The text content displayed within the chip.
   */
  children?: ComponentChildren;
  /**
   * The graphic element (typically an icon) displayed inside the chip.
   *
   * @implementation Only `s-icon` is supported.
   */
  graphic?: ComponentChildren;
  /**
   * A label that describes the purpose or content of the component for assistive technologies like screen readers. Use this to provide additional context when the visible content alone doesn't clearly convey the component's purpose.
   */
  accessibilityLabel?: string;
  /**
   * The color intensity of the chip. Use `subdued` for less intense, `base` for standard, or `strong` for more intense coloring.
   *
   * @default 'base'
   */
  color?: ColorKeyword;
}
interface ChipProps$2 extends ChipProps$1, GlobalProps {}
interface ChoiceProps$1 extends GlobalProps, BaseOptionProps {
  /**
   * The content displayed as the choice label.
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
   * Additional helpful text displayed alongside the choice to provide context, guidance, or instructions to the user.
   *
   * @implementation this content should be linked to the input with an `aria-describedby` attribute.
   */
  details?: ComponentChildren;
  /**
   * Whether this choice should be associated with an error state from the parent ChoiceList.
   *
   * @default false
   */
  error?: boolean;
  /**
   * Secondary descriptive content displayed beneath the choice label.
   */
  secondaryContent?: ComponentChildren;
  /**
   * Content displayed when the choice is selected, useful for showing additional information or nested options related to this choice.
   */
  selectedContent?: ComponentChildren;
}
interface ChoiceListProps$1
  extends GlobalProps,
    Pick<BasicFieldProps, 'label' | 'labelAccessibilityVisibility' | 'error'>,
    MultipleInputProps,
    FieldDetailsProps {
  /**
   * Whether users can select multiple choices simultaneously (checkboxes) or only one choice at a time (radio buttons).
   *
   * @default false
   */
  multiple?: boolean;
  /**
   * The collection of Choice components that users can select from.
   */
  children?: ComponentChildren;
  /**
   * Whether the entire choice list is disabled, preventing any user interaction.
   *
   * When `true`, the `disabled` property on individual child Choice components is ignored.
   *
   * @default false
   */
  disabled?: MultipleInputProps['disabled'];
  /**
   * The layout variant for displaying the choices.
   *
   * - `auto`: The variant is automatically determined by the context.
   * - `list`: The choices are displayed in a vertical list.
   * - `inline`: The choices are arranged horizontally along the inline axis.
   * - `block`: The choices are arranged vertically along the block axis.
   * - `grid`: The choices are displayed in a grid layout.
   *
   * @implementation The `block`, `inline` and `grid` variants are more suitable for button-styled choices, but it's at the discretion of each surface.
   *
   * @default 'auto'
   */
  variant?: 'auto' | 'list' | 'inline' | 'block' | 'grid';
}
interface ClickableProps$1
  extends GlobalProps,
    BaseBoxProps,
    BaseClickableProps {
  /**
   * Whether the component is in a loading state, which indicates to assistive technology that an action is in progress and prevents interaction.
   */
  loading?: BaseClickableProps['loading'];
  /**
   * Whether the component is disabled, preventing clicks and focus. When disabled, the `click` event won't fire and click events from child elements stop propagating immediately. Interactive child elements can still receive focus and be interacted with. This doesn't apply visual styling by default. You should apply disabled styling as needed.
   */
  disabled?: BaseClickableProps['disabled'];
  /**
   * The language of the text content within the component. Useful when the text is in a different language than the rest of the page, allowing assistive technologies such as screen readers to invoke the correct pronunciation. See the [reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) ("subtag" label).
   *
   * @default ''
   */
  lang?: string;
}
interface ClickableChipProps$1
  extends ChipProps$1,
    GlobalProps,
    InteractionProps {
  /**
   * A callback fired when the chip is clicked.
   */
  onClick?: (event: Event) => void;
  /**
   * The URL to navigate to when clicked. The `click` event fires first, then navigation occurs. If `commandFor` is also set, the command executes instead of navigation.
   */
  href?: string;
  /**
   * Whether the chip displays a remove button for dismissal. When clicked, the `remove` callback fires.
   *
   * @default false
   */
  removable?: boolean;
  /**
   * A callback fired when the chip's remove button is clicked.
   */
  onRemove?: (event: Event) => void;
  /**
   * Whether the chip is hidden from view. When using controlled component pattern with `removable` chips, update this property when the `remove` event fires. For non-removable chips, manually toggle this property to show or hide the chip.
   *
   * @default false
   */
  hidden?: boolean;
  /**
   * Event handler when the chip has fully hidden.
   *
   * The `hidden` property will be `true` when this event fires.
   *
   * @implementation If implementations animate the hiding of the chip,
   * this event must fire after the chip has fully hidden.
   * We can add an `onHide` event in future if we want to provide a hook for the start of the animation.
   */
  onAfterHide?: (event: Event) => void;
  /**
   * Whether the chip is removable.
   *
   * @default false
   */
  removable?: boolean;
  /**
   * Callback when the chip is removed.
   */
  onRemove?: (event: Event) => void;
  /**
   * Determines whether the chip is hidden.
   *
   * If this property is being set on each framework render (as in 'controlled' usage),
   * and the chip is `removable`,
   * ensure you update app state for this property when the `remove` event fires.
   *
   * If the chip is not `removable`, it can still be hidden by setting this property.
   *
   * @default false
   */
  hidden?: boolean;
  /**
   * Event handler when the chip has fully hidden.
   *
   * The `hidden` property will be `true` when this event fires.
   *
   * @implementation If implementations animate the hiding of the chip,
   * this event must fire after the chip has fully hidden.
   * We can add an `onHide` event in future if we want to provide a hook for the start of the animation.
   */
  onAfterHide?: (event: Event) => void;
  /**
   * Disables the chip, disallowing any interaction.
   *
   * @default false
   */
  disabled?: boolean;
}
interface ColorPickerProps$1
  extends GlobalProps,
    Omit<InputProps, 'value' | 'defaultValue'> {
  /**
   * Whether to enable alpha (transparency) channel selection in the color picker, allowing users to choose semi-transparent colors.
   *
   * @default false
   */
  alpha?: boolean;
  /**
   * A callback that fires when the user finishes selecting a color. The value is always emitted in hexadecimal format: 8-value hex (`#RRGGBBAA`) when `alpha` is `true`, or 6-value hex (`#RRGGBB`) when `alpha` is `false`.
   */
  onChange?: InputProps['onChange'];
  /**
   * A callback that fires when the user makes any change to the color selection. The value is always emitted in hexadecimal format: 8-value hex (`#RRGGBBAA`) when `alpha` is `true`, or 6-value hex (`#RRGGBB`) when `alpha` is `false`.
   */
  onInput?: InputProps['onChange'];
  /**
   * The currently selected color value. Accepts multiple input formats:
   *
   * - Hex: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA` (three, four, six, or eight digits)
   * - RGB/RGBA: `rgb(255, 0, 0)` or `rgb(255 0 0)` (comma or space-separated)
   * - HSL/HSLA: `hsl(0, 100%, 50%)` or `hsl(0 100% 50%)`
   *
   * Returns an empty string if the value is invalid. The `onChange` handler always emits values in hex format.
   */
  value?: string;
  /**
   * The initial color value when the field first loads. Unlike `placeholder`, this is a real value that the user can edit and that gets submitted with the form. Once the user starts interacting, their input replaces it. Changing this property after the field has loaded has no effect. To update the field value at any time, use `value` instead.
   */
  defaultValue?: string;
}
export interface AutocompleteProps<
  AutocompleteField extends AnyAutocompleteField,
> {
  /**
   * Controls browser autofill behavior for the field.
   *
   * Basic values:
   * - `on` - Enables autofill without specifying content type (default)
   * - `off` - Disables autofill for sensitive data or one-time codes
   *
   * Specific field values describe the expected data type. You can optionally prefix these with:
   * - `section-${string}` - Scopes autofill to a specific form section (when multiple forms exist on the same page)
   * - `shipping` or `billing` - Indicates whether the data is for shipping or billing purposes
   * - Both section and group (for example, `section-primary shipping email`)
   *
   * Providing a specific autofill token helps browsers suggest more relevant saved data. Learn more about [autocomplete values](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-detail-tokens).
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
 * The “section” scopes the autocomplete data that should be inserted
 * to a specific area of the page.
 *
 * Commonly used when there are multiple fields with the same autocomplete needs
 * in the same page. For example: 2 shipping address forms in the same page.
 */
export type AutocompleteSection = `section-${string}`;
/**
 * The contact information group the autocomplete data should be sourced from.
 */
export type AutocompleteGroup = 'shipping' | 'billing';
/**
 * The contact information subgroup the autocomplete data should be sourced from.
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
 * Represents autocomplete values that are valid for text input fields.
 * This is a subset of `AnyAutocompleteField` containing only fields suitable for text-based inputs.
 *
 * Available values:
 * - `name` - Full name
 * - `given-name` - First name
 * - `additional-name` - Middle name
 * - `family-name` - Last name
 * - `nickname` - Nickname or handle
 * - `username` - Username for login
 * - `honorific-prefix` - Name prefix (Mr., Mrs., Dr.)
 * - `honorific-suffix` - Name suffix (Jr., Sr., III)
 * - `organization` - Company or organization name
 * - `organization-title` - Job title or position
 * - `address-line1` - Street address (first line)
 * - `address-line2` - Street address (second line)
 * - `address-line3` - Street address (third line)
 * - `address-level1` - State or province
 * - `address-level2` - City or town
 * - `address-level3` - District or locality
 * - `address-level4` - Neighborhood or suburb
 * - `street-address` - Complete street address (multi-line)
 * - `postal-code` - Postal or ZIP code
 * - `country` - Country code (US, CA, GB)
 * - `country-name` - Country name (United States, Canada)
 * - `language` - Preferred language
 * - `sex` - Gender or sex
 * - `one-time-code` - One-time codes for authentication
 * - `transaction-currency` - Currency code (USD, EUR, GBP)
 * - `cc-name` - Name on credit card
 * - `cc-given-name` - First name on credit card
 * - `cc-additional-name` - Middle name on credit card
 * - `cc-family-name` - Last name on credit card
 * - `cc-type` - Credit card type (Visa, Mastercard)
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
interface ColorFieldProps$1
  extends GlobalProps,
    Omit<BaseTextFieldProps, 'value' | 'defaultValue'> {
  /**
   * Whether to enable alpha (transparency) channel selection in the color picker, allowing users to choose semi-transparent colors.
   *
   * @default false
   */
  alpha?: boolean;
  /**
   * The currently selected color value. Accepts multiple input formats:
   *
   * - Hex: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA` (three, four, six, or eight digits)
   * - RGB/RGBA: `rgb(255, 0, 0)` or `rgb(255 0 0)` (comma or space-separated)
   * - HSL/HSLA: `hsl(0, 100%, 50%)` or `hsl(0 100% 50%)`
   *
   * Returns an empty string if the value is invalid. The `onChange` handler always emits values in hex format.
   */
  value?: string;
  /**
   * The initial color value when the field first loads. Unlike `placeholder`, this is a real value that the user can edit and that gets submitted with the form. Once the user starts interacting, their input replaces it. Changing this property after the field has loaded has no effect. To update the field value at any time, use `value` instead.
   */
  defaultValue?: string;
  autocomplete?: Extract<
    AutocompleteProps<never>['autocomplete'],
    'on' | 'off'
  >;
}
interface DatePickerProps$1 extends GlobalProps, InputProps, FocusEventProps {
  /**
   * The default month to display in `YYYY-MM` format. Used until the `view` callback is set by user interaction or programmatically. Defaults to the current month in the user's locale.
   */
  defaultView?: string;
  /**
   * The currently displayed month in `YYYY-MM` format. When changed, the `viewchange` callback is triggered. Defaults to `defaultView`.
   */
  view?: string;
  /**
   * A callback fired whenever the displayed month changes in the calendar.
   *
   * @param view The new month to display in `YYYY-MM` format.
   */
  onViewChange?: (view: string) => void;
  /**
   * The type of selection the date picker allows.
   *
   * - `single` allows selecting a single date.
   * - `multiple` allows selecting multiple non-contiguous dates.
   * - `range` allows selecting a single range of dates.
   *
   * @default "single"
   */
  type?: 'single' | 'multiple' | 'range';
  /**
   * Specifies which dates can be selected as a comma-separated list. An empty string (default) allows all dates.
   *
   * **Formats:**
   * - `YYYY-MM-DD`: Single date
   * - `YYYY-MM`: Whole month
   * - `YYYY`: Whole year
   * - `start--end`: Date range (inclusive, unbounded if start/end omitted)
   *
   * **Examples:**
   * - `2024-02--2025`: February 2024 through end of 2025
   * - `2024-05-09, 2024-05-11`: Only May 9th and 11th, 2024
   *
   * @default ""
   */
  allow?: string;
  /**
   * Specifies which dates can't be selected as a comma-separated list. These dates are excluded from those specified in `allow`. An empty string (default) has no effect.
   *
   * **Formats:**
   * - `YYYY-MM-DD`: Single date
   * - `YYYY-MM`: Whole month
   * - `YYYY`: Whole year
   * - `start--end`: Date range (inclusive, unbounded if start/end omitted)
   *
   * **Examples:**
   * - `--2024-02`: All dates before February 2024
   * - `2024-05-09, 2024-05-11`: May 9th and 11th, 2024
   *
   * @default ""
   */
  disallow?: string;
  /**
   * Specifies which days of the week can be selected as a comma-separated list. Further restricts dates from `allow` and `disallow`. An empty string (default) has no effect.
   *
   * **Valid days**: `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`
   *
   * **Example:** `saturday, sunday` (only weekends)
   *
   * @default ""
   */
  allowDays?: string;
  /**
   * Specifies which days of the week can't be selected as a comma-separated list. Excludes days from `allowDays` and intersects with `allow` and `disallow`. An empty string (default) has no effect.
   *
   * **Valid days**: `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`
   *
   * **Example:** `saturday, sunday` (no weekends)
   *
   * @default ""
   */
  disallowDays?: string;
  /**
   * The initially selected date(s) when the component first renders. An empty string means no date is initially selected.
   *
   * - Single date in `YYYY-MM-DD` format when `type` is set to `"single"`
   * - Date range in `YYYY-MM-DD--YYYY-MM-DD` format (inclusive) when `type` is set to `"range"`
   *
   * @default ""
   */
  defaultValue?: string;
  /**
   * The currently selected date(s). An empty string means no date is selected.
   *
   * - Single date in `YYYY-MM-DD` format when `type` is set to `"single"`
   * - Date range in `YYYY-MM-DD--YYYY-MM-DD` format (inclusive) when `type` is set to `"range"`
   *
   * @default ""
   */
  value?: string;
  /**
   * A callback fired when any date is selected, before `onChange`. When `type` is set to `"range"`, also fires when the first date is selected with a partial value formatted as `YYYY-MM-DD--`.
   */
  onInput?: (event: Event) => void;
  /**
   * A callback fired when the date selection is committed and complete, after `onInput`. When `type` is set to `"range"`, fires only when the range is completed by selecting the end date.
   */
  onChange?: (event: Event) => void;
}
interface DateFieldProps$1
  extends GlobalProps,
    Omit<BaseTextFieldProps, 'value' | 'defaultValue'>,
    Pick<
      DatePickerProps$1,
      | 'view'
      | 'defaultView'
      | 'allow'
      | 'disallow'
      | 'allowDays'
      | 'disallowDays'
      | 'onViewChange'
    >,
    AutocompleteProps<DateAutocompleteField> {
  /**
   * The initial date value when the field first renders, in `YYYY-MM-DD` format. An empty string means no date is initially selected.
   *
   * @default ""
   */
  defaultValue?: string;
  /**
   * The currently selected date in `YYYY-MM-DD` format. An empty string means no date is selected.
   *
   * @default ""
   */
  value?: string;
  /**
   * A callback fired when the user makes any changes in the field, including when selecting a date using the date picker popup. This fires before `onChange`.
   */
  onInput?: (event: Event) => void;
  /**
   * A callback fired when the user has finished editing the field, such as when they blur the field or complete a date selection. This fires after `onInput`.
   */
  onChange?: (event: Event) => void;
  /**
   * A callback fired when the field contains an invalid date, either because the typed date is malformed, doesn't exist (e.g., February 31st), or is disabled by the `allow`/`disallow` constraints.
   *
   * Dates that don’t exist or have formatting errors are considered invalid. Some examples of invalid dates are:
   * - 2021-02-31: February doesn’t have 31 days
   * - 2021-02-00: The day can’t be 00
   *
   * Disallowed dates are considered invalid.
   *
   * It’s important to note that this callback will be called only when the user **finishes editing** the date,
   * and it’s called right after the `onChange` callback.
   * The field is **not** validated on every change to the input. Once the buyer has signalled that
   * they have finished editing the field (typically, by blurring the field), the field gets validated and the callback is run if the value is invalid.
   */
  onInvalid?: (event: Event) => void;
}
/**
 * Represents autocomplete values that are valid for date input fields.
 * This is a subset of `AnyAutocompleteField` containing only fields suitable for date-based inputs.
 *
 * Available values:
 * - `bday` - Complete birthday date
 * - `bday-day` - Day component of a birthday (1-31)
 * - `bday-month` - Month component of a birthday (1-12)
 * - `bday-year` - Year component of a birthday (1990)
 * - `cc-expiry` - Complete credit card expiration date
 * - `cc-expiry-month` - Month component of a credit card expiration date (1-12)
 * - `cc-expiry-year` - Year component of a credit card expiration date (2025)
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
interface DividerProps$1 extends GlobalProps {
  /**
   * The orientation of the divider line, using [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values).
   *
   * - `inline`: Horizontal divider for separating vertically stacked content
   * - `block`: Vertical divider for separating horizontally arranged content
   *
   * @default 'inline'
   */
  direction?: 'inline' | 'block';
  /**
   * The visual prominence of the divider line.
   *
   * - `base`: Standard divider for most separations (default)
   * - `strong`: More prominent divider for major section breaks
   *
   * @default 'base'
   */
  color?: ColorKeyword;
}
interface DropZoneProps$1 extends GlobalProps, FileInputProps, BasicFieldProps {
  /**
   * A string representing the types of files that are accepted by the drop zone.
   * This string is a comma-separated list of unique file type specifiers which can be one of the following:
   * - A file extension starting with a period (".") character (e.g. .jpg, .pdf, .doc)
   * - A valid MIME type string with no extensions
   *
   * If omitted, all file types are accepted.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
   * @default ''
   */
  accept?: string;
  /**
   * A label that describes the purpose or contents of the item. When set,
   * it will be announced to buyers using assistive technologies and will
   * provide them with more context.
   */
  accessibilityLabel?: string;
  /**
   * Whether multiple files can be selected or dropped at once.
   *
   * @default false
   */
  multiple?: boolean;
  /**
   * Callback fired when rejected files are dropped.
   * Files are rejected based on the `accept` prop and are not added to `files`.
   */
  onDropRejected?: (event: Event) => void;
}
interface EmailFieldProps$1
  extends GlobalProps,
    BaseTextFieldProps,
    MinMaxLengthProps,
    AutocompleteProps<EmailAutocompleteField> {}
/**
 * Represents autocomplete values that are valid for email input fields.
 * This is a subset of `AnyAutocompleteField` containing only fields suitable for email inputs.
 *
 * Available values:
 * - `email` - Primary email address
 * - `home email` - Home email address
 * - `mobile email` - Mobile device email address
 * - `fax email` - Fax machine email address
 * - `pager email` - Pager device email address
 */
export type EmailAutocompleteField = ExtractStrict<
  AnyAutocompleteField,
  'email' | `${AutocompleteAddressGroup} email`
>;
interface FormProps$1 extends GlobalProps {
  /**
   * The form fields and content to be wrapped in the form element.
   */
  children?: ComponentChildren;
  /**
   * Whether the form can be submitted.
   *
   * When set to `true`, this will also disable the implicit submit behavior of the form.
   *
   * @default false
   *
   * @deprecated Prevent default within the onSubmit callback using a local state instead. Deprecated in v1.6.0
   * @private
   */
  disabled?: boolean;
  /**
   * A callback fired when the form is submitted.
   *
   * Use `event.waitUntil` to signal how long it takes to save the data
   * and whether the operation was successful.
   */
  onSubmit?: (event: ExtendableEvent) => void;
  /**
   * A callback fired when the form is reset, typically via a reset button.
   */
  onReset?: (event: Event) => void;
}
interface FunctionSettingsProps$1 extends GlobalProps, FormProps$1 {
  /**
   * An optional callback function that will be run by the admin when the user
   * commits their changes in the admin-rendered part of the function settings
   * experience. If `event.waitUntil` is called with a promise, the admin will wait for the
   * promise to resolve before committing any changes to Shopify’s servers. If
   * the promise rejects, the admin will abort the changes and display an error,
   * using the `message` property of the error you reject with.
   */
  onSubmit?: (event: ExtendableEvent) => void;
  /**
   * An optional callback function that will be run by the admin when
   * committing the changes to Shopify’s servers fails. The error event you receive includes
   * an `error` property that is an `AggregateError` object. This object includes
   * an array of errors that were caused by data your extension provided.
   * Network errors and user errors that are out of your control will not be reported here.
   *
   * In the `onError` callback, you should update your extension’s UI to
   * highlight the fields that caused the errors, and display the error messages
   * to the user.
   */
  onError?: (event: AggregateErrorEvent<FunctionSettingsError>) => void;
}
export interface FunctionSettingsError extends Error {
  /**
   * A unique identifier describing the “class” of error. These will match
   * the GraphQL error codes as closely as possible. For example the enums
   * returned by the `metafieldsSet` mutation. Learn more about [MetafieldsSetUserErrorCode](https://shopify.dev/docs/api/admin-graphql/latest/enums/MetafieldsSetUserErrorCode).
   */
  code: string;
  name: 'FunctionSettingsError';
}
export type SpacingKeyword = SizeKeyword | 'none';
export interface GapProps {
  /**
   * The spacing between child elements.
   *
   * A single value applies to both axes.
   * A pair of values (e.g., `large-100 large-500`) can be used to set the inline and block axes respectively.
   *
   * @default 'none'
   */
  gap?: MaybeResponsive<MaybeTwoValuesShorthandProperty<SpacingKeyword>>;
  /**
   * The spacing between elements along the block axis (vertical spacing in horizontal writing modes).
   *
   * This overrides the row value of `gap`.
   *
   * @default '' - meaning no override
   */
  rowGap?: MaybeResponsive<SpacingKeyword | ''>;
  /**
   * The spacing between elements along the inline axis (horizontal spacing in horizontal writing modes).
   *
   * This overrides the column value of `gap`.
   *
   * @default '' - meaning no override
   */
  columnGap?: MaybeResponsive<SpacingKeyword | ''>;
}
export type BaselinePosition = 'baseline' | 'first baseline' | 'last baseline';
export type ContentDistribution =
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch';
export type ContentPosition = 'center' | 'start' | 'end';
export type OverflowPosition =
  | `unsafe ${ContentPosition}`
  | `safe ${ContentPosition}`;
/**
 * Justify items defines the default justify-self for all items of the box, giving them all a default way of justifying each box along the appropriate axis. Learn more about the [justify-items property](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items).
 */
export type JustifyItemsKeyword =
  | 'normal'
  | 'stretch'
  | BaselinePosition
  | OverflowPosition
  | ContentPosition;
/**
 * Align items sets the align-self value on all direct children as a group. Learn more about the [align-items property](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
 */
export type AlignItemsKeyword =
  | 'normal'
  | 'stretch'
  | BaselinePosition
  | OverflowPosition
  | ContentPosition;
/**
 * Justify content defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container. Learn more about the [justify-content property](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
 */
export type JustifyContentKeyword =
  | 'normal'
  | ContentDistribution
  | OverflowPosition
  | ContentPosition;
/**
 *Align content sets the distribution of space between and around content items along a flexbox's cross axis, or a grid or block-level element's block axis. Learn more about the [align-content property](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
 */
export type AlignContentKeyword =
  | 'normal'
  | BaselinePosition
  | ContentDistribution
  | OverflowPosition
  | ContentPosition;
interface GridProps$1 extends GlobalProps, BaseBoxPropsWithRole, GapProps {
  /**
	  Define columns and specify their size. Learn more about the [grid-template-columns property](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns).
  
	  @default 'none'
	*/
  gridTemplateColumns?: MaybeResponsive<string>;
  /**
	  Define rows and specify their size. Learn more about the [grid-template-rows property](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows).
  
	  @default 'none'
	*/
  gridTemplateRows?: MaybeResponsive<string>;
  /**
	  Aligns the grid items along the inline (row) axis. Learn more about the [justify-items property](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items).
  
	  This overrides the inline value of `placeItems`.
  
	  @default '' - meaning no override
	*/
  justifyItems?: MaybeResponsive<JustifyItemsKeyword | ''>;
  /**
	  Aligns the grid items along the block (column) axis. Learn more about the [align-items property](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
  
	  This overrides the block value of `placeItems`.
  
	  @default '' - meaning no override
	*/
  alignItems?: MaybeResponsive<AlignItemsKeyword | ''>;
  /**
	  A shorthand property for `justify-items` and `align-items`. Learn more about the [place-items property](https://developer.mozilla.org/en-US/docs/Web/CSS/place-items).
  
	  @default 'normal normal'
	*/
  placeItems?: MaybeResponsive<
    `${AlignItemsKeyword} ${JustifyItemsKeyword}` | AlignItemsKeyword
  >;
  /**
	  Aligns the grid along the inline (row) axis. Learn more about the [justify-content property](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
  
	  This overrides the inline value of `placeContent`.
  
	  @default '' - meaning no override
	*/
  justifyContent?: MaybeResponsive<JustifyContentKeyword | ''>;
  /**
	  Aligns the grid along the block (column) axis. Learn more about the [align-content property](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
  
	  This overrides the block value of `placeContent`.
  
	  @default '' - meaning no override
	*/
  alignContent?: MaybeResponsive<AlignContentKeyword | ''>;
  /**
	  A shorthand property for `justify-content` and `align-content`. Learn more about the [place-content property](https://developer.mozilla.org/en-US/docs/Web/CSS/place-content).
  
	  @default 'normal normal'
	*/
  placeContent?: MaybeResponsive<
    `${AlignContentKeyword} ${JustifyContentKeyword}` | AlignContentKeyword
  >;
}
interface GridItemProps$1 extends GlobalProps, BaseBoxPropsWithRole {
  /**
   * The number of grid columns this item spans across. Learn more about the [grid-column property](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column).
   *
   * @default 'auto'
   */
  gridColumn?: `span ${number}` | 'auto';
  /**
   * The number of grid rows this item spans across. Learn more about the [grid-row property](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row).
   *
   * @default 'auto'
   */
  gridRow?: `span ${number}` | 'auto';
}
export interface BaseTypographyProps {
  /**
   * The color intensity of the text. Use `subdued` for less intense, `base` for standard, or `strong` for more intense coloring.
   *
   * @default 'base'
   */
  color?: ColorKeyword;
  /**
   * The semantic meaning and color treatment of the component.
   *
   * - `auto`: Automatically determined based on context.
   * - `neutral`: General information without specific intent.
   * - `info`: Informational content or helpful tips.
   * - `success`: Positive outcomes or successful states.
   * - `caution`: Advisory notices that need attention.
   * - `warning`: Important warnings about potential issues.
   * - `critical`: Urgent problems or destructive actions.
   * - `accent`: Highlighted or promotional content.
   * - `custom`: Custom styling controlled by your theme.
   *
   * @default 'auto'
   */
  tone?: ToneKeyword;
  /**
   * Set the numeric properties of the font. Learn more about the [font-variant-numeric property](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric).
   *
   * @default 'auto' - inherit from the parent element
   */
  fontVariantNumeric?: 'auto' | 'normal' | 'tabular-nums';
  /**
   * Indicate the text language. Useful when the text is in a different language than the rest of the page.
   * It will allow assistive technologies such as screen readers to invoke the correct pronunciation.
   * [Reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) ("subtag" label)
   *
   * It is recommended to combine it with the `dir` attribute to ensure the text is rendered correctly if the surrounding content’s direction is different.
   *
   * @default ''
   */
  lang?: string;
  /**
   * Indicates the directionality of the element’s text.
   *
   * - `""`: The direction is inherited from parent elements (equivalent to not setting the attribute).
   * - `auto`: The user agent determines the direction based on the content.
   * - `ltr`: The languages written from left to right (such as English).
   * - `rtl`: The languages written from right to left (such as Arabic).
   *
   * Learn more about the [dir attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir).
   *
   * @default ''
   */
  dir?: 'ltr' | 'rtl' | 'auto' | '';
}
export interface BlockTypographyProps {
  /**
   * Truncates the text content to the specified number of lines. Learn more about the [-webkit-line-clamp property](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp).
   *
   * @default Infinity - no truncation is applied
   */
  lineClamp?: number;
}
interface HeadingProps$1
  extends GlobalProps,
    AccessibilityVisibilityProps,
    BlockTypographyProps {
  /**
   * The content of the heading.
   */
  children?: ComponentChildren;
  /**
   * Sets the semantic meaning of the component’s content. When set,
   * the role will be used by assistive technologies to help users
   * navigate the page.
   *
   * - `heading`: defines the element as a heading to a page or section.
   * - `presentation`: the heading level will be stripped,
   * and will prevent the element’s implicit ARIA semantics from
   * being exposed to the accessibility tree.
   * - `none`: a synonym for the `presentation` role.
   *
   * @default 'heading'
   *
   * @implementation The `heading` role doesn't need to be applied if
   * the host applies it for you; for example, an HTML host rendering
   * an `<h2>` element should not apply the `heading` role.
   */
  accessibilityRole?:
    | 'heading'
    | ExtractStrict<AccessibilityRole, 'presentation' | 'none'>;
}
interface IconProps$1
  extends GlobalProps,
    Pick<InteractionProps, 'interestFor'> {
  /**
   * The semantic meaning and color treatment of the component.
   *
   * - `auto`: Automatically determined based on context.
   * - `neutral`: General information without specific intent.
   * - `info`: Informational content or helpful tips.
   * - `success`: Positive outcomes or successful states.
   * - `caution`: Advisory notices that need attention.
   * - `warning`: Important warnings about potential issues.
   * - `critical`: Urgent problems or destructive actions.
   *
   * @default 'auto'
   */
  tone?: ToneKeyword;
  /**
   * The color intensity of the icon. Use `subdued` for less intense, `base` for standard, or `strong` for more intense coloring.
   *
   * @default 'base'
   */
  color?: ColorKeyword;
  /**
   * The size of the icon. Available sizes range from `small-500` (smallest) to `large-500` (largest), with `base` providing the default size.
   *
   * @default 'base'
   */
  size?: SizeKeyword;
  /**
   * The icon to display. Can be any icon name from the icon library or a custom string identifier.
   */
  type?: IconType | AnyString;
}
export interface BaseImageProps {
  /**
   * Alternative text that describes the image for accessibility.
   *
   * Provides a text description of the image for users with assistive technology
   * and serves as a fallback when the image fails to load. A well-written description
   * enables people with visual impairments to understand non-text content.
   *
   * When a screen reader encounters an image, it reads this description aloud.
   * When an image fails to load, this text displays on screen, helping all users
   * understand what content was intended.
   *
   * Learn more about [writing effective alt text](https://www.shopify.com/ca/blog/image-alt-text#4)
   * and the [alt attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt).
   *
   * @default ''
   */
  alt?: string;
  /**
   * A set of media conditions and their corresponding sizes. Learn more about the [sizes attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes).
   */
  sizes?: string;
  /**
   * The image source (either a remote URL or a local file resource).
   *
   * When the image is loading or no `src` is provided, a placeholder is rendered.
   *
   * @implementation Surfaces may choose the style of the placeholder, but the space the image occupies should be
   * reserved, except in cases where the image area does not have a contextual inline or block size, which should be rare. Learn more about the [src attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src).
   */
  src?: string;
  /**
   * A set of image sources and their width or pixel density descriptors. Learn more about the [srcset attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset). This overrides the `src` property.
   */
  srcSet?: string;
}
interface ImageProps$1 extends GlobalProps, BaseImageProps, BorderProps {
  /**
   * Sets the semantic meaning of the component’s content. When set,
   * the role will be used by assistive technologies to help users
   * navigate the page.
   *
   * - `img`: Identifies the element as an image that conveys meaningful information to users.
   * - `presentation`: Removes semantic meaning, making the image purely decorative and ignored by screen readers.
   * - `none`: Completely hides the element and its content from assistive technologies.
   *
   * @default 'img'
   *
   * @implementation The `img` role doesn't need to be applied if
   * the host applies it for you; for example, an HTML host rendering
   * an `<img>` element should not apply the `img` role.
   */
  accessibilityRole?:
    | 'img'
    | ExtractStrict<AccessibilityRole, 'presentation' | 'none'>;
  /**
   * The inline width (horizontal size) of the image.
   *
   * - `fill`: The image takes up 100% of the available inline space.
   * - `auto`: The image is displayed at its natural size.
   *
   * Learn more about the [width attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#width).
   *
   * @default 'fill'
   */
  inlineSize?: 'fill' | 'auto';
  /**
   * The aspect ratio of the image.
   *
   * The rendering of the image will depend on the `inlineSize` value:
   *
   * - `inlineSize="fill"`: the aspect ratio will be respected and the image will take the necessary space.
   * - `inlineSize="auto"`: the image will not render until it has loaded and the aspect ratio will be ignored.
   *
   * For example, if the value is set as `50 / 100`, the getter returns `50 / 100`.
   * If the value is set as `0.5`, the getter returns `0.5 / 1`.
   *
   * Learn more about the [aspect-ratio property](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio).
   *
   * @default '1/1'
   */
  aspectRatio?:
    | `${number}${optionalSpace}/${optionalSpace}${number}`
    | `${number}`;
  /**
   * Determines how the content of the image is resized to fit its container.
   * The image is positioned in the center of the container. Learn more about the [object-fit property](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
   *
   * @default 'contain'
   */
  objectFit?: 'contain' | 'cover';
  /**
   * Determines the loading behavior of the image:
   * - `eager`: Immediately loads the image, irrespective of its position within the visible viewport.
   * - `lazy`: Delays loading the image until it approaches a specified distance from the viewport.
   *
   * Learn more about the [loading attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading).
   *
   * @default 'eager'
   */
  loading?: 'eager' | 'lazy';
  /**
   * A callback fired when the image loads successfully. Learn more about the [load event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload).
   */
  onLoad?: (event: Event) => void;
  /**
   * A callback fired when the image fails to load. Learn more about the [error event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror).
   */
  onError?: (event: Event) => void;
}
interface LinkProps$1 extends GlobalProps, LinkBehaviorProps {
  /**
   * The text or elements displayed as the link's content.
   */
  children?: ComponentChildren;
  /**
   * The semantic meaning and color treatment of the component.
   *
   * - `critical`: Urgent problems or destructive actions.
   * - `auto`: Automatically determined based on context.
   * - `neutral`: General information without specific intent.
   *
   * @default 'auto'
   */
  tone?: ToneKeyword;
  /**
   * A label that describes the purpose or content of the component for assistive technologies like screen readers. Use this to provide additional context when the visible content alone doesn't clearly convey the component's purpose.
   */
  accessibilityLabel?: string;
  /**
   * The language of the link's text content. Use this when the link text is in a different language than the rest of the page, allowing assistive technologies such as screen readers to invoke the correct pronunciation. See the [reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) ("subtag" label).
   */
  lang?: string;
}
interface ListItemProps$1 extends GlobalProps {
  /**
   * The content displayed within the list item.
   */
  children?: ComponentChildren;
}
interface MenuProps$1 extends GlobalProps {
  /**
   * A label that describes the purpose or content of the component for assistive technologies like screen readers. Use this to provide additional context when the visible content alone doesn't clearly convey the component's purpose.
   */
  accessibilityLabel?: string;
  /**
   * The collection of Button components displayed as menu actions. Only Button components are allowed as children, which can perform actions using `onClick` or link to other parts of the application using `href`. Any other component type will be ignored.
   */
  children?: ComponentChildren;
}
interface ModalProps$1
  extends GlobalProps,
    BaseOverlayProps,
    BaseOverlayMethods,
    ActionSlots {
  /**
   * A label that describes the purpose of the modal. When set,
   * it will be announced to users using assistive technologies and will
   * provide them with more context.
   *
   * This overrides the `heading` prop for screen readers.
   */
  accessibilityLabel?: string;
  /**
   * A title that describes the content of the modal.
   *
   */
  heading?: string;
  /**
   * Adjust the padding around the modal content.
   *
   * `base`: applies padding that is appropriate for the element.
   *
   * `none`: removes all padding from the element. This can be useful when elements inside the modal need to span
   * to the edge of the modal. For example, a full-width image. In this case, rely on box with a padding of 'base'
   * to bring back the desired padding for the rest of the content.
   *
   * @default 'base'
   */
  padding?: 'base' | 'none';
  /**
   * Adjust the size of the modal.
   *
   * `max`: expands the modal to its maximum size as defined by the host application, on both the horizontal and vertical axes.
   *
   * @default 'base'
   */
  size?: SizeKeyword | 'max';
  /**
   * The content of the modal.
   */
  children?: ComponentChildren;
}
interface MoneyFieldProps$1
  extends GlobalProps,
    BaseTextFieldProps,
    NumberConstraintsProps,
    AutocompleteProps<MoneyAutocompleteField> {}
export type MoneyAutocompleteField = ExtractStrict<
  AnyAutocompleteField,
  'transaction-amount'
>;
interface NumberFieldProps$1
  extends GlobalProps,
    BaseTextFieldProps,
    AutocompleteProps<NumberAutocompleteField>,
    NumberConstraintsProps,
    FieldDecorationProps {
  /**
   * Sets the virtual keyboard. Learn more about the [inputmode attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).
   *
   * @default 'decimal'
   */
  inputMode?: 'decimal' | 'numeric';
  /**
   * Callback when the user has **finished editing** a field, such as when they blur the field after changing the value.
   * Also fired after `onInput` on every step when using keyboard up and down arrows. Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
   */
  onChange?: (event: Event) => void;
  /**
   * A callback fired when the user makes any changes to the field value, including when using keyboard up/down arrows. This fires before `onChange`. Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
   */
  onInput?: (event: Event) => void;
}
/**
 * Represents autocomplete values that are valid for number input fields.
 * This is a subset of `AnyAutocompleteField` containing only fields suitable for numeric inputs.
 *
 * Available values:
 * - `one-time-code` - One-time codes for authentication (OTP, 2FA codes)
 * - `cc-number` - Credit card number
 * - `cc-csc` - Credit card security code (CVV/CVC)
 */
export type NumberAutocompleteField = ExtractStrict<
  AnyAutocompleteField,
  'one-time-code' | 'cc-number' | 'cc-csc'
>;
interface OptionProps$1 extends GlobalProps, BaseOptionProps {
  /**
   * The content to use as the label.
   */
  children?: ComponentChildren;
}
interface OptionGroupProps$1 extends GlobalProps {
  /**
   * Whether the options within this group can be selected or not.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * The label text displayed for this group of related options.
   */
  label?: string;
  /**
   * The collection of option components that users can select from within this group.
   */
  children?: ComponentChildren;
}
interface OrderedListProps$1 extends GlobalProps {}
interface PageProps$1 extends GlobalProps, ActionSlots {
  /**
   * The content of the page.
   */
  children?: ComponentChildren;
  /**
   * The main page heading
   */
  heading?: string;
  /**
   * The text to be used as subtitle.
   */
  subheading?: string;
  /**
   * Additional contextual information about the page.
   */
  accessory?: ComponentChildren;
  /**
   * The breadcrumb actions to perform, provided as link elements.
   */
  breadcrumbActions?: ComponentChildren;
  /**
   * The aside element is section of a page that contains content that is tangentially related to the content around the aside element, and which could be considered separate from that content.
   * Such sections are often represented as sidebars in printed typography.
   * @implementation surfaces built ontop of the web platform should implement this using the <aside> element https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
   */
  aside?: ComponentChildren;
  /**
   * The inline size of the page
   * - `base` corresponds to a set default inline size
   * - `large` full width with whitespace
   *
   * @default 'base'
   */
  inlineSize?: SizeKeyword;
}
interface ParagraphProps$1
  extends GlobalProps,
    BaseTypographyProps,
    BlockTypographyProps,
    AccessibilityVisibilityProps {
  /**
   * The text or elements displayed within the paragraph.
   */
  children?: ComponentChildren;
  /**
   * The semantic type of the paragraph, which provides meaning and default styling.
   *
   * Other presentation properties on the paragraph can override the default styling.
   *
   * @default 'paragraph'
   */
  type?: ParagraphType;
}
export type ParagraphType =
  /**
   * Indicates the text is a structural grouping of related content. In an HTML host, the text will be rendered in a `<p>` element. Learn more about the [p element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p).
   */
  | 'paragraph'
  /**
   * Indicates the text is considered less important than the main content but is still necessary for understanding. This can be used for secondary content, disclaimers, terms and conditions, or legal information.
   *
   * Surfaces should apply a smaller font size than the default. In an HTML host, the text will be rendered in a `<small>` element. Learn more about the [small element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small).
   */
  | 'small';
interface PasswordFieldProps$1
  extends GlobalProps,
    BaseTextFieldProps,
    MinMaxLengthProps,
    AutocompleteProps<PasswordAutocompleteField> {}
/**
 * Represents autocomplete values that are valid for password input fields.
 * This is a subset of `AnyAutocompleteField` containing only fields suitable for password inputs.
 *
 * Available values:
 * - `current-password` - Existing password for login or authentication
 * - `new-password` - New password when creating an account or changing password
 */
export type PasswordAutocompleteField = ExtractStrict<
  AnyAutocompleteField,
  'new-password' | 'current-password'
>;
interface PopoverProps$1
  extends GlobalProps,
    BaseOverlayProps,
    BaseOverlayMethods,
    ToggleEventProps,
    SizingProps {
  /**
   * The content of the popover.
   */
  children?: ComponentChildren;
}
interface QueryContainerProps$1 extends GlobalProps {
  /**
   * The content of the container.
   */
  children?: ComponentChildren;
  /**
   * An identifier for this container that you can reference in CSS container queries to apply styles based on this specific container's size.
   *
   * All QueryContainer components automatically receive a container name of `s-default`. You can omit the container name in your queries, so `@container (inline-size <= 300px)` is equivalent to `@container s-default (inline-size <= 300px)`.
   *
   * When you provide a custom `containerName`, it's added alongside `s-default`. For example, `containerName="product-card"` results in `s-default product-card` being set on the `container-name` CSS property, allowing you to target this container with `@container product-card (inline-size <= 300px)`.
   *
   * Learn more about the [container-name property](https://developer.mozilla.org/en-US/docs/Web/CSS/container-name).
   *
   * @default ''
   *
   * @implementation You must always have a CSS `container-name` of `s-default` for this component.
   */
  containerName?: string;
}
interface SectionProps$1 extends GlobalProps, ActionSlots {
  /**
   * The content of the section.
   */
  children?: ComponentChildren;
  /**
   * A label that describes the purpose or content of the component for assistive technologies like screen readers. Use this to provide additional context when the visible content alone doesn't clearly convey the component's purpose.
   */
  accessibilityLabel?: string;
  /**
   * The heading text displayed at the top of the section. This heading provides a title for the section's content and automatically uses the appropriate semantic heading level (h2, h3, h4) based on nesting depth to maintain proper document structure.
   */
  heading?: string;
  /**
   * The amount of padding applied to all edges of the section.
   *
   * - `base`: Applies standard padding appropriate for the section. Note that this might result in no padding if that's the right design decision for the context.
   * - `none`: Removes all padding, useful when content like images needs to extend to the section's edges. Use Box with `padding="base"` for individual content areas that need padding.
   *
   * @default 'base'
   */
  padding?: 'base' | 'none';
}
interface SelectProps$1
  extends GlobalProps,
    AutocompleteProps<AnyAutocompleteField>,
    Pick<FieldDecorationProps, 'icon'>,
    Omit<FieldProps, 'defaultValue'>,
    FocusEventProps {
  /**
   * The selectable options displayed in the dropdown list.
   *
   * Accepts Option components for individual selectable items, and OptionGroup components to organize related options into logical groups with labels.
   */
  children?: ComponentChildren;
}
interface SpinnerProps$1 extends GlobalProps {
  /**
   * The size of the spinner icon. Available sizes range from `small-500` (smallest) to `large-500` (largest), with `base` providing the default size.
   *
   * @default 'base'
   */
  size?: SizeKeyword;
  /**
   * A label that describes the purpose or content of the component for assistive technologies like screen readers. Use this to provide additional context when the visible content alone doesn't clearly convey the component's purpose.
   */
  accessibilityLabel?: string;
}
interface StackProps$1 extends GlobalProps, BaseBoxPropsWithRole, GapProps {
  /**
   * The elements arranged within the stack layout.
   */
  children?: ComponentChildren;
  /**
   * The axis along which child elements are arranged, using [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values).
   *
   * - `block`: Arranges children vertically (in horizontal writing modes). Content does not wrap.
   * - `inline`: Arranges children horizontally (in horizontal writing modes). Content wraps to the next line if needed.
   *
   * @default 'block'
   *
   * @implementation The content will wrap if the direction is 'inline', and not wrap if the direction is 'block'.
   */
  direction?: MaybeResponsive<'block' | 'inline'>;
  /**
   * Controls the distribution of children along the inline axis (horizontally in horizontal writing modes).
   *
   * Use this to position items along the primary axis of the stack - horizontally for inline stacks or vertically for block stacks when wrapped into multiple lines. Learn more about the [justify-content property](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
   *
   * @default 'normal'
   */
  justifyContent?: MaybeResponsive<JustifyContentKeyword>;
  /**
   * Controls the alignment of children along the block axis (vertically in horizontal writing modes).
   *
   * Use this to align items perpendicular to the stack direction - vertically for inline stacks or horizontally for block stacks. Learn more about the [align-items property](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
   *
   * @default 'normal'
   */
  alignItems?: MaybeResponsive<AlignItemsKeyword>;
  /**
   * Controls the distribution of lines along the block axis when content wraps into multiple lines.
   *
   * This property only affects stacks with wrapping content. For single-line stacks, use `alignItems` instead. Learn more about the [align-content property](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
   *
   * @default 'normal'
   */
  alignContent?: MaybeResponsive<AlignContentKeyword>;
}
interface SwitchProps$1
  extends GlobalProps,
    BaseCheckableProps,
    BasicFieldProps,
    FieldDetailsProps,
    FieldErrorProps {}
export interface PaginationProps {
  /**
   * Whether to use pagination controls.
   *
   * @default false
   */
  paginate?: boolean;
  /**
   * A callback fired when the previous page button is clicked.
   */
  onPreviousPage?: (event: Event) => void;
  /**
   * A callback fired when the next page button is clicked.
   */
  onNextPage?: (event: Event) => void;
  /**
   * Whether there's an additional page of data.
   *
   * @default false
   */
  hasNextPage?: boolean;
  /**
   * Whether there's a previous page of data.
   *
   * @default false
   */
  hasPreviousPage?: boolean;
  /**
   * Whether the table is in a loading state, such as during initial page load or when loading the next page in a paginated table.
   * When `true`, the table might be in an inert state that prevents user interaction.
   *
   * @default false
   */
  loading?: boolean;
}
interface TableProps$1 extends GlobalProps, PaginationProps {
  /**
   * The table structure defining headers and data rows.
   *
   * Accepts table header row (for column headers) and table body (for data rows) components. Structure your table with a table header row first, followed by table body.
   */
  children?: ComponentChildren;
  /**
   * Filter controls displayed above the table.
   *
   * Accepts input components like search field or select for filtering table data. These controls appear in a dedicated area above the table content.
   */
  filters?: ComponentChildren;
  /**
   * The layout variant of the table.
   *
   * - `list`: Always displays as a list layout.
   * - `table`: Always displays as a traditional table layout.
   * - `auto`: Automatically displays as a table on wide screens and as a list on narrow screens.
   *
   * @default 'auto'
   */
  variant?: 'list' | 'table' | 'auto';
}
interface TableBodyProps$1 extends GlobalProps {
  /**
   * The data rows displayed in the table body.
   *
   * Accepts TableRow components, with each row representing a single record or entry in the table.
   */
  children?: ComponentChildren;
}
interface TableCellProps$1 extends GlobalProps {
  /**
   * The data value displayed in this cell.
   *
   * Accepts text content or inline components representing the cell's data value.
   */
  children?: ComponentChildren;
}
/**
 * Represents the content designation for table columns when displayed in list variant on mobile devices.
 *
 * Available values:
 * - `primary` - The most important content. Only one column can have this designation.
 * - `secondary` - Supporting content displayed below primary. Only one column can have this designation.
 * - `kicker` - Small label displayed above primary content with less visual prominence. Only one column can have this designation.
 * - `inline` - Content displayed inline with primary content.
 * - `labeled` - Each column displays as a heading-content pair.
 */
export type ListSlotType =
  | 'primary'
  | 'secondary'
  | 'kicker'
  | 'inline'
  | 'labeled';
/**
 * Represents the format options for table headers that control styling and alignment of column content.
 *
 * Available values:
 * - `base`: Standard format for text columns
 * - `currency`: Right-aligned format for monetary values
 * - `numeric`: Right-aligned format for numeric values
 */
export type HeaderFormat = 'base' | 'currency' | 'numeric';
interface TableHeaderProps$1 extends GlobalProps {
  /**
   * The column heading text.
   *
   * This text labels the column in table variant and appears as a label for data in list variant.
   */
  children?: ComponentChildren;
  /**
   * The content designation for this column when the table displays in list variant on mobile devices.
   *
   * @default 'labeled'
   */
  listSlot?: ListSlotType;
  /**
   * The format of the column that controls styling and alignment of cell content.
   *
   * @default 'base'
   */
  format?: HeaderFormat;
}
interface TableHeaderRowProps$1 extends GlobalProps {
  /**
   * The column headers displayed in the table header row.
   *
   * Accepts TableHeader components, with each header defining a column and providing its label.
   */
  children?: ComponentChildren;
}
interface TableRowProps$1 extends GlobalProps {
  /**
   * The data cells displayed in this table row.
   *
   * Accepts TableCell components, with each cell containing a data value for the corresponding column.
   */
  children?: ComponentChildren;
  /**
   * The ID of an interactive element (e.g. `s-link`) in the row that will be the target of the click when the row is clicked.
   * This is the primary action for the row; it should not be used for secondary actions.
   *
   * This is a click-only affordance, and does not introduce any keyboard or screen reader affordances.
   * Which is why the target element must be in the table; so that keyboard and screen reader users can interact with it normally.
   *
   * @implementation no focus or keyboard affordances are introduced by this property. No aria attributes need to be added to the table row.
   * @implementation the row and/or delegate should have some affordance that indicates it is clickable. This may be a background color, a border, or a hover effect.
   */
  clickDelegate?: string;
}
interface TextProps$1
  extends GlobalProps,
    AccessibilityVisibilityProps,
    BaseTypographyProps,
    DisplayProps,
    Pick<InteractionProps, 'interestFor'> {
  /**
   * The text content or inline elements displayed within the component.
   */
  children?: ComponentChildren;
  /**
   * The semantic type of the text, which provides meaning and default styling.
   *
   * Other presentation properties on Text override the default styling.
   *
   * @default 'generic'
   */
  type?: TextType;
}
export type TextType =
  /**
   * Indicate the text is contact information. Typically used for addresses.
   *
   * This must have `inline` layout (despite the default being `block` in HTML hosts).
   *
   * Surfaces may apply styling to this type.
   *
   * In an HTML host, the text will be rendered in an `<address>` element. Learn more about the [address element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address).
   *
   * @implementation vertical alignment should be `baseline` (`vertical-align: baseline`)
   */
  | 'address'
  /**
   * Indicate the text is no longer accurate or no longer relevant. One such use-case is discounted prices.
   *
   * Surfaces should apply styling to this type to suggest its content no longer applies.
   *
   * In an HTML host, the text will be rendered in a `<s>` element. Learn more about the [s element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s).
   */
  | 'redundant'
  /**
   * Indicate the text is marked or highlighted and relevant to the user’s current action.
   * One such use-case is to indicate the characters that matched a search query.
   *
   * Surfaces should apply styling to this type to draw attention to the content.
   *
   * In an HTML host, the text will be rendered in a `<mark>` element. Learn more about the [mark element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark).
   */
  | 'mark'
  /**
   * Indicate emphatic stress. Typically for words that have a stressed emphasis compared to surrounding text.
   *
   * Surfaces should apply styling to this type to distinguish it from surrounding text. Italicization is a common choice, but not required.
   *
   * In an HTML host, the text will be rendered in an `<em>` element. Learn more about the [em element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em).
   */
  | 'emphasis'
  /**
   * Indicate an offset from the normal prose of the text. Typically used to indicate
   * a foreign word, fictional character thoughts, or when the text refers to the definition of a word
   * instead of representing its semantic meaning.
   *
   * Surfaces should italicize this content by default.
   *
   * In an HTML host, the text will be rendered in a `<i>` tag. Learn more about the [i element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i).
   */
  | 'offset'
  /**
   * Indicate strong importance, seriousness, or urgency.
   *
   * Surfaces should render this content bold by default.
   *
   * In an HTML host, the text will be rendered in a `<strong>` tag. Learn more about the [strong element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong).
   */
  | 'strong'
  /**
   * Indicates the text is considered less important than the main content, but is still necessary for the reader to understand.
   * It can be used for secondary content but also for disclaimers, terms and conditions, or legal information.
   *
   * Surfaces should apply a smaller font size than the default size.
   *
   * In an HTML host, the text will be rendered in a `<small>` element. Learn more about the [small element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small).
   */
  | 'small'
  /**
   * No additional semantics or styling is applied.
   *
   * Surfaces must not apply any default styling to this type.
   *
   * In an HTML host, the text will be rendered in a `<span>` tag. Learn more about the [span element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span).
   */
  | 'generic';
interface TextAreaProps$1
  extends GlobalProps,
    BaseTextFieldProps,
    MinMaxLengthProps,
    AutocompleteProps<TextAutocompleteField> {
  /**
   * The number of visible text lines displayed in the textarea, which controls its initial height.
   *
   * @default 2
   */
  rows?: number;
}
interface TextFieldProps$1
  extends GlobalProps,
    BaseTextFieldProps,
    MinMaxLengthProps,
    AutocompleteProps<TextAutocompleteField>,
    FieldDecorationProps {}
interface ThumbnailProps$1 extends GlobalProps, BaseImageProps {
  /**
   * A callback fired when the thumbnail image loads successfully. Learn more about the [load event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload).
   */
  onLoad?: (event: Event) => void;
  /**
   * A callback fired when the thumbnail image fails to load. Learn more about the [error event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror).
   */
  onError?: (event: Event) => void;
  /**
   * The size of the product thumbnail image. Available sizes range from `small-500` (smallest) to `large-500` (largest), with `base` providing the default size.
   *
   * @default 'base'
   */
  size?: SizeKeyword;
}
interface TooltipProps$1 extends GlobalProps {
  /**
   * The text or elements displayed inside the tooltip popup.
   */
  children?: ComponentChildren;
}
interface UnorderedListProps$1 extends GlobalProps {}
interface URLFieldProps$1
  extends GlobalProps,
    BaseTextFieldProps,
    MinMaxLengthProps,
    AutocompleteProps<URLAutocompleteField> {}
/**
 * Represents autocomplete values that are valid for URL input fields.
 * This is a subset of `AnyAutocompleteField` containing only fields suitable for URL inputs.
 *
 * Available values:
 * - `url` - General URL or web address
 * - `photo` - URL to a photo or image
 * - `impp` - Instant messaging protocol URL
 * - `home impp` - Home instant messaging protocol URL
 * - `mobile impp` - Mobile instant messaging protocol URL
 * - `fax impp` - Fax instant messaging protocol URL
 * - `pager impp` - Pager instant messaging protocol URL
 */
export type URLAutocompleteField = ExtractStrict<
  AnyAutocompleteField,
  'url' | 'photo' | 'impp' | `${AutocompleteAddressGroup} impp`
>;
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
   * The ref is not guaranteed by `React.ReactElement`. For compatibility with popular React libraries, this is defined as optional.
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
export interface RefObject<T> {
  current: T | null;
}
export type RefCallback<T> = (instance: T | null) => void;
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
  // Static members cannot reference class type parameters. This is not
  // supported in TypeScript. Reusing the same type arguments from `Component`
  // will lead to an impossible state where one cannot satisfy the type
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
type IconType$1 =
  | 'adjust'
  | 'affiliate'
  | 'airplane'
  | 'alert-bubble'
  | 'alert-circle'
  | 'alert-diamond'
  | 'alert-location'
  | 'alert-octagon'
  | 'alert-octagon-filled'
  | 'alert-triangle'
  | 'app-extension'
  | 'apps'
  | 'archive'
  | 'arrow-down'
  | 'arrow-down-circle'
  | 'arrow-left'
  | 'arrow-left-circle'
  | 'arrow-right'
  | 'arrow-right-circle'
  | 'arrow-up'
  | 'arrow-up-circle'
  | 'arrow-up-right'
  | 'arrows-in-horizontal'
  | 'arrows-out-horizontal'
  | 'asterisk'
  | 'attachment'
  | 'automation'
  | 'backspace'
  | 'bag'
  | 'bank'
  | 'barcode'
  | 'bill'
  | 'blank'
  | 'blog'
  | 'bolt'
  | 'bolt-filled'
  | 'book'
  | 'book-open'
  | 'bug'
  | 'bullet'
  | 'business-entity'
  | 'button'
  | 'button-press'
  | 'calculator'
  | 'calendar'
  | 'calendar-check'
  | 'calendar-compare'
  | 'calendar-list'
  | 'calendar-time'
  | 'camera'
  | 'camera-flip'
  | 'caret-down'
  | 'caret-left'
  | 'caret-right'
  | 'caret-up'
  | 'cart'
  | 'cart-abandoned'
  | 'cart-discount'
  | 'cart-down'
  | 'cart-sale'
  | 'cart-up'
  | 'cash-dollar'
  | 'cash-euro'
  | 'cash-pound'
  | 'cash-rupee'
  | 'cash-yen'
  | 'catalog-product'
  | 'categories'
  | 'channels'
  | 'chart-cohort'
  | 'chart-donut'
  | 'chart-funnel'
  | 'chart-histogram-first'
  | 'chart-histogram-first-last'
  | 'chart-histogram-flat'
  | 'chart-histogram-full'
  | 'chart-histogram-growth'
  | 'chart-histogram-last'
  | 'chart-histogram-second-last'
  | 'chart-horizontal'
  | 'chart-line'
  | 'chart-popular'
  | 'chart-stacked'
  | 'chart-vertical'
  | 'chat'
  | 'chat-new'
  | 'chat-referral'
  | 'check'
  | 'check-circle'
  | 'check-circle-filled'
  | 'checkbox'
  | 'chevron-down'
  | 'chevron-down-circle'
  | 'chevron-left'
  | 'chevron-left-circle'
  | 'chevron-right'
  | 'chevron-right-circle'
  | 'chevron-up'
  | 'chevron-up-circle'
  | 'circle'
  | 'circle-dashed'
  | 'clipboard'
  | 'clipboard-check'
  | 'clipboard-checklist'
  | 'clock'
  | 'clock-list'
  | 'clock-revert'
  | 'code'
  | 'code-add'
  | 'collection'
  | 'collection-featured'
  | 'collection-list'
  | 'collection-reference'
  | 'color'
  | 'color-none'
  | 'compass'
  | 'compose'
  | 'confetti'
  | 'connect'
  | 'content'
  | 'contract'
  | 'corner-pill'
  | 'corner-round'
  | 'corner-square'
  | 'credit-card'
  | 'credit-card-cancel'
  | 'credit-card-percent'
  | 'credit-card-reader'
  | 'credit-card-reader-chip'
  | 'credit-card-reader-tap'
  | 'credit-card-secure'
  | 'credit-card-tap-chip'
  | 'crop'
  | 'currency-convert'
  | 'cursor'
  | 'cursor-banner'
  | 'cursor-option'
  | 'data-presentation'
  | 'data-table'
  | 'database'
  | 'database-add'
  | 'database-connect'
  | 'delete'
  | 'delivery'
  | 'desktop'
  | 'disabled'
  | 'discount'
  | 'discount-add'
  | 'discount-code'
  | 'dns-settings'
  | 'dock-floating'
  | 'dock-side'
  | 'domain'
  | 'domain-landing-page'
  | 'domain-new'
  | 'domain-redirect'
  | 'download'
  | 'drag-drop'
  | 'drag-handle'
  | 'duplicate'
  | 'edit'
  | 'email'
  | 'email-follow-up'
  | 'email-newsletter'
  | 'enabled'
  | 'enter'
  | 'envelope'
  | 'envelope-soft-pack'
  | 'eraser'
  | 'exchange'
  | 'exit'
  | 'export'
  | 'external'
  | 'eye-check-mark'
  | 'eye-dropper'
  | 'eye-dropper-list'
  | 'eye-first'
  | 'eyeglasses'
  | 'favicon'
  | 'file'
  | 'file-list'
  | 'filter'
  | 'filter-active'
  | 'flag'
  | 'flip-horizontal'
  | 'flip-vertical'
  | 'flower'
  | 'folder'
  | 'folder-add'
  | 'folder-down'
  | 'folder-remove'
  | 'folder-up'
  | 'food'
  | 'foreground'
  | 'forklift'
  | 'forms'
  | 'games'
  | 'gauge'
  | 'gift-card'
  | 'git-branch'
  | 'git-commit'
  | 'git-repository'
  | 'globe'
  | 'globe-asia'
  | 'globe-europe'
  | 'globe-lines'
  | 'globe-list'
  | 'grid'
  | 'hashtag'
  | 'hashtag-decimal'
  | 'hashtag-list'
  | 'heart'
  | 'hide'
  | 'hide-filled'
  | 'home'
  | 'icons'
  | 'identity-card'
  | 'image'
  | 'image-add'
  | 'image-alt'
  | 'image-explore'
  | 'image-magic'
  | 'image-none'
  | 'image-with-text-overlay'
  | 'images'
  | 'import'
  | 'in-progress'
  | 'incentive'
  | 'incoming'
  | 'incomplete'
  | 'info'
  | 'inheritance'
  | 'inventory'
  | 'inventory-updated'
  | 'iq'
  | 'key'
  | 'keyboard'
  | 'keyboard-filled'
  | 'keyboard-hide'
  | 'label-printer'
  | 'language'
  | 'language-translate'
  | 'layout-block'
  | 'layout-buy-button'
  | 'layout-buy-button-horizontal'
  | 'layout-buy-button-vertical'
  | 'layout-column-1'
  | 'layout-columns-2'
  | 'layout-columns-3'
  | 'layout-footer'
  | 'layout-header'
  | 'layout-logo-block'
  | 'layout-popup'
  | 'layout-rows-2'
  | 'layout-section'
  | 'layout-sidebar-left'
  | 'layout-sidebar-right'
  | 'lightbulb'
  | 'link'
  | 'link-list'
  | 'list-bulleted'
  | 'list-numbered'
  | 'live'
  | 'location'
  | 'location-none'
  | 'lock'
  | 'map'
  | 'markets'
  | 'markets-euro'
  | 'markets-rupee'
  | 'markets-yen'
  | 'maximize'
  | 'measurement-size'
  | 'measurement-size-list'
  | 'measurement-volume'
  | 'measurement-volume-list'
  | 'measurement-weight'
  | 'measurement-weight-list'
  | 'media-receiver'
  | 'megaphone'
  | 'mention'
  | 'menu'
  | 'menu-horizontal'
  | 'menu-vertical'
  | 'merge'
  | 'metafields'
  | 'metaobject'
  | 'metaobject-list'
  | 'metaobject-reference'
  | 'microphone'
  | 'microphone-muted'
  | 'minimize'
  | 'minus'
  | 'minus-circle'
  | 'mobile'
  | 'money'
  | 'money-none'
  | 'moon'
  | 'nature'
  | 'note'
  | 'note-add'
  | 'notification'
  | 'number-one'
  | 'order'
  | 'order-batches'
  | 'order-draft'
  | 'order-first'
  | 'order-fulfilled'
  | 'order-repeat'
  | 'order-unfulfilled'
  | 'orders-status'
  | 'organization'
  | 'outdent'
  | 'outgoing'
  | 'package'
  | 'package-fulfilled'
  | 'package-on-hold'
  | 'package-returned'
  | 'page'
  | 'page-add'
  | 'page-attachment'
  | 'page-clock'
  | 'page-down'
  | 'page-heart'
  | 'page-list'
  | 'page-reference'
  | 'page-remove'
  | 'page-report'
  | 'page-up'
  | 'pagination-end'
  | 'pagination-start'
  | 'paint-brush-flat'
  | 'paint-brush-round'
  | 'paper-check'
  | 'passkey'
  | 'paste'
  | 'pause-circle'
  | 'payment'
  | 'payment-capture'
  | 'payout'
  | 'payout-dollar'
  | 'payout-euro'
  | 'payout-pound'
  | 'payout-rupee'
  | 'payout-yen'
  | 'person'
  | 'person-add'
  | 'person-exit'
  | 'person-list'
  | 'person-lock'
  | 'person-remove'
  | 'person-segment'
  | 'personalized-text'
  | 'phone'
  | 'phone-down'
  | 'phone-down-filled'
  | 'phone-in'
  | 'phone-out'
  | 'pin'
  | 'pin-remove'
  | 'plan'
  | 'play'
  | 'play-circle'
  | 'plus'
  | 'plus-circle'
  | 'plus-circle-down'
  | 'plus-circle-filled'
  | 'plus-circle-up'
  | 'point-of-sale'
  | 'price-list'
  | 'print'
  | 'product'
  | 'product-add'
  | 'product-cost'
  | 'product-list'
  | 'product-reference'
  | 'product-remove'
  | 'product-return'
  | 'product-unavailable'
  | 'profile'
  | 'profile-filled'
  | 'question-circle'
  | 'question-circle-filled'
  | 'radio-control'
  | 'receipt'
  | 'receipt-dollar'
  | 'receipt-euro'
  | 'receipt-paid'
  | 'receipt-pound'
  | 'receipt-refund'
  | 'receipt-rupee'
  | 'receipt-yen'
  | 'receivables'
  | 'redo'
  | 'referral-code'
  | 'refresh'
  | 'remove-background'
  | 'replace'
  | 'replay'
  | 'reset'
  | 'return'
  | 'reward'
  | 'rocket'
  | 'rotate-left'
  | 'rotate-right'
  | 'sandbox'
  | 'save'
  | 'search'
  | 'search-add'
  | 'search-list'
  | 'search-recent'
  | 'search-resource'
  | 'select'
  | 'send'
  | 'settings'
  | 'share'
  | 'shield-check-mark'
  | 'shield-none'
  | 'shield-pending'
  | 'shield-person'
  | 'shipping-label'
  | 'shopcodes'
  | 'slideshow'
  | 'smiley-happy'
  | 'smiley-joy'
  | 'smiley-neutral'
  | 'smiley-sad'
  | 'social-ad'
  | 'social-post'
  | 'sort'
  | 'sort-ascending'
  | 'sort-descending'
  | 'sound'
  | 'sports'
  | 'star'
  | 'star-filled'
  | 'star-list'
  | 'status'
  | 'status-active'
  | 'stop-circle'
  | 'store'
  | 'store-import'
  | 'store-managed'
  | 'store-online'
  | 'sun'
  | 'table'
  | 'table-masonry'
  | 'tablet'
  | 'target'
  | 'tax'
  | 'team'
  | 'text'
  | 'text-align-center'
  | 'text-align-left'
  | 'text-align-right'
  | 'text-block'
  | 'text-bold'
  | 'text-color'
  | 'text-font'
  | 'text-font-list'
  | 'text-grammar'
  | 'text-in-columns'
  | 'text-in-rows'
  | 'text-indent'
  | 'text-italic'
  | 'text-quote'
  | 'text-title'
  | 'text-underline'
  | 'text-with-image'
  | 'theme'
  | 'theme-edit'
  | 'theme-store'
  | 'theme-template'
  | 'three-d-environment'
  | 'thumbs-down'
  | 'thumbs-up'
  | 'tip-jar'
  | 'toggle-off'
  | 'toggle-on'
  | 'transaction'
  | 'transaction-fee-dollar'
  | 'transaction-fee-euro'
  | 'transaction-fee-pound'
  | 'transaction-fee-rupee'
  | 'transaction-fee-yen'
  | 'transfer'
  | 'transfer-in'
  | 'transfer-internal'
  | 'transfer-out'
  | 'undo'
  | 'unknown-device'
  | 'unlock'
  | 'upload'
  | 'variant'
  | 'variant-list'
  | 'video'
  | 'video-list'
  | 'view'
  | 'viewport-narrow'
  | 'viewport-short'
  | 'viewport-tall'
  | 'viewport-wide'
  | 'wallet'
  | 'wand'
  | 'watch'
  | 'wifi'
  | 'work'
  | 'work-list'
  | 'wrench'
  | 'x'
  | 'x-circle';
