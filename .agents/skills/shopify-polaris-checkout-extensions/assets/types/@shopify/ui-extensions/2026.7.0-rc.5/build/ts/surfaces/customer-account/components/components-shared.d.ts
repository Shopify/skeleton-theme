/** VERSION: 0.0.0 **/
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
export type ComponentChildren = any;
export type StringChildren = string;
export interface GlobalProps {
	/**
	 * A unique identifier for the element. Use this to reference the element in JavaScript, link labels to form controls, or target specific elements for styling or scripting.
	 */
	id?: string;
}
interface AbbreviationProps$1 extends GlobalProps {
	/**
	 * The abbreviated text content displayed within the abbreviation component. Pair with the `title` attribute to provide the full expansion for accessibility.
	 */
	children?: ComponentChildren;
	/**
	 * Defines the full expansion of the abbreviation or acronym. Helps user agents and users understand the meaning of the abbreviated text.
	 *
	 * Learn more about the [abbreviation element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr).
	 *
	 * @default ''
	 */
	title?: string;
}
export interface ActionSlots {
	/**
	 * The primary action to perform, provided as a button or link type element.
	 */
	primaryAction?: ComponentChildren;
	/**
	 * The secondary actions to perform, provided as button or link type elements.
	 */
	secondaryActions?: ComponentChildren;
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
	 * A method to programmatically hide the overlay and run any associated hide animations.
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
	 * Learn more about the [`newState`](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/newState) and [`oldState`](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/oldState) properties.
	 */
	onAfterToggle?: (event: ToggleEvent$1) => void;
	/**
	 * A callback fired immediately when the element state changes, before any animations.
	 *
	 * - If the element is transitioning from hidden to showing, the `oldState` property will be set to `closed` and the
	 *   `newState` property will be set to `open`.
	 * - If the element is transitioning from showing to hidden, then the `oldState` property will be set to `open` and the
	 *   `newState` will be `closed`.
	 *
	 * Learn more about the [`toggle` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/toggle_event), the [`newState` property](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/newState), and the [`oldState` property](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/oldState).
	 */
	onToggle?: (event: ToggleEvent$1) => void;
}
/**
 * The visibility state of a toggleable element.
 *
 * - `open`: The element is visible and showing its content.
 * - `closed`: The element is hidden and its content is not visible.
 */
export type ToggleState = "open" | "closed";
/**
 * The event data provided to toggle-related callbacks. Contains the previous and next visibility states of the element.
 */
interface ToggleEvent$1 extends Event {
	/**
	 * The visibility state of the element after the toggle occurred.
	 */
	readonly newState: ToggleState;
	/**
	 * The visibility state of the element before the toggle occurred.
	 */
	readonly oldState: ToggleState;
}
export interface ExtendableEvent extends Event {
	/**
	 * Provide a promise that signals the length, and eventual success or failure of actions relating to the event.
	 *
	 * This may be called many times, which adds promises to the event.
	 *
	 * However, this may only be called synchronously during the dispatch of the event.
	 * As in, you cannot call it after a `setTimeout` or microtask.
	 */
	waitUntil?: (promise: Promise<void>) => void;
}
interface AnnouncementProps$1 extends GlobalProps, ToggleEventProps {
	/**
	 * The content of the announcement.
	 */
	children?: ComponentChildren;
	/**
	 * A callback that fires when the announcement is dismissed by the user clicking the close button or by calling the `dismiss()` method programmatically.
	 */
	onDismiss?: (event: Event) => void;
	/**
	 * Method to programmatically dismiss the announcement.
	 */
	dismiss: () => void;
}
/**
 * The design system's size scale, used to control the dimensions of components like avatars, icons, and thumbnails. Values range from `"small-500"` (smallest) through `"base"` (standard) to `"large-500"` (largest). Not all components support every size — check the component's `size` property type for its available options.
 */
export type SizeKeyword = "small-500" | "small-400" | "small-300" | "small-200" | "small-100" | "small" | "base" | "large" | "large-100" | "large-200" | "large-300" | "large-400" | "large-500";
/**
 * Defines the color intensity or emphasis level for text and UI elements.
 *
 * - `subdued`: Deemphasized color for secondary text, supporting labels, and less critical interface elements.
 * - `base`: Primary color for body text, standard UI elements, and general content with good readability.
 * - `strong`: Emphasized color for headings, key labels, and interactive elements that need prominence.
 */
export type ColorKeyword = "subdued" | "base" | "strong";
export type BackgroundColorKeyword = "transparent" | ColorKeyword;
export interface BackgroundProps {
	/**
	 * The background color of the element.
	 *
	 * - `base`: The standard background color for general content areas.
	 * - `subdued`: A muted background for secondary or supporting content.
	 * - `transparent`: No background color (the default).
	 * - `strong`: An emphasized background for prominent sections.
	 *
	 * - `'transparent'`: No visible background.
	 * - `'subdued'`: A subtle, low-emphasis background.
	 * - `'base'`: The standard background color.
	 * - `'strong'`: A high-emphasis background for prominence.
	 *
	 * @default 'transparent'
	 */
	background?: BackgroundColorKeyword;
}
/**
 * Tone is a property for defining the color treatment of a component.
 *
 * A tone can apply a grouping of colors to a component. For example,
 * critical may have a specific text color and background color.
 *
 * In some cases, like for Banner, the tone may also affect the semantic and accessibility treatment of the component.
 *
 * @default 'auto'
 */
export type ToneKeyword = "auto" | "neutral" | "info" | "success" | "caution" | "warning" | "critical" | "accent" | "custom";
declare const privateIconArray: readonly [
	"adjust",
	"affiliate",
	"airplane",
	"alert-bubble",
	"alert-circle",
	"alert-diamond",
	"alert-location",
	"alert-octagon",
	"alert-octagon-filled",
	"alert-triangle",
	"alert-triangle-filled",
	"app-extension",
	"apps",
	"archive",
	"arrow-down",
	"arrow-down-circle",
	"arrow-down-right",
	"arrow-left",
	"arrow-left-circle",
	"arrow-right",
	"arrow-right-circle",
	"arrow-up",
	"arrow-up-circle",
	"arrow-up-right",
	"arrows-in-horizontal",
	"arrows-out-horizontal",
	"attachment",
	"automation",
	"backspace",
	"bag",
	"bank",
	"barcode",
	"battery-low",
	"bill",
	"blank",
	"blog",
	"bolt",
	"bolt-filled",
	"book",
	"book-open",
	"bug",
	"bullet",
	"business-entity",
	"button",
	"button-press",
	"calculator",
	"calendar",
	"calendar-check",
	"calendar-compare",
	"calendar-list",
	"calendar-time",
	"camera",
	"camera-flip",
	"caret-down",
	"caret-left",
	"caret-right",
	"caret-up",
	"cart",
	"cart-abandoned",
	"cart-discount",
	"cart-down",
	"cart-filled",
	"cart-sale",
	"cart-send",
	"cart-up",
	"cash-dollar",
	"cash-euro",
	"cash-pound",
	"cash-rupee",
	"cash-yen",
	"catalog-product",
	"categories",
	"channels",
	"chart-cohort",
	"chart-donut",
	"chart-funnel",
	"chart-histogram-first",
	"chart-histogram-first-last",
	"chart-histogram-flat",
	"chart-histogram-full",
	"chart-histogram-growth",
	"chart-histogram-last",
	"chart-histogram-second-last",
	"chart-horizontal",
	"chart-line",
	"chart-popular",
	"chart-stacked",
	"chart-vertical",
	"chat",
	"chat-new",
	"chat-referral",
	"check",
	"check-circle",
	"check-circle-filled",
	"checkbox",
	"chevron-down",
	"chevron-down-circle",
	"chevron-left",
	"chevron-left-circle",
	"chevron-right",
	"chevron-right-circle",
	"chevron-up",
	"chevron-up-circle",
	"circle",
	"circle-dashed",
	"clipboard",
	"clipboard-check",
	"clipboard-checklist",
	"clock",
	"clock-revert",
	"code",
	"code-add",
	"collection",
	"collection-featured",
	"collection-list",
	"collection-reference",
	"color",
	"color-none",
	"compass",
	"complete",
	"compose",
	"confetti",
	"connect",
	"content",
	"contract",
	"corner-pill",
	"corner-round",
	"corner-square",
	"credit-card",
	"credit-card-cancel",
	"credit-card-percent",
	"credit-card-reader",
	"credit-card-reader-chip",
	"credit-card-reader-tap",
	"credit-card-secure",
	"credit-card-tap-chip",
	"crop",
	"currency-convert",
	"cursor",
	"cursor-banner",
	"cursor-option",
	"data-presentation",
	"data-table",
	"database",
	"database-add",
	"database-connect",
	"delete",
	"delivered",
	"delivery",
	"desktop",
	"disabled",
	"disabled-filled",
	"discount",
	"discount-add",
	"discount-automatic",
	"discount-code",
	"discount-remove",
	"dns-settings",
	"dock-floating",
	"dock-side",
	"domain",
	"domain-landing-page",
	"domain-new",
	"domain-redirect",
	"download",
	"drag-drop",
	"drag-handle",
	"drawer",
	"duplicate",
	"edit",
	"email",
	"email-follow-up",
	"email-newsletter",
	"empty",
	"enabled",
	"enter",
	"envelope",
	"envelope-soft-pack",
	"eraser",
	"exchange",
	"exit",
	"export",
	"external",
	"eye-check-mark",
	"eye-dropper",
	"eye-dropper-list",
	"eye-first",
	"eyeglasses",
	"fav",
	"favicon",
	"file",
	"file-list",
	"filter",
	"filter-active",
	"flag",
	"flip-horizontal",
	"flip-vertical",
	"flower",
	"folder",
	"folder-add",
	"folder-down",
	"folder-remove",
	"folder-up",
	"food",
	"foreground",
	"forklift",
	"forms",
	"games",
	"gauge",
	"geolocation",
	"gift",
	"gift-card",
	"git-branch",
	"git-commit",
	"git-repository",
	"globe",
	"globe-asia",
	"globe-europe",
	"globe-lines",
	"globe-list",
	"graduation-hat",
	"grid",
	"hashtag",
	"hashtag-decimal",
	"hashtag-list",
	"heart",
	"hide",
	"hide-filled",
	"home",
	"home-filled",
	"icons",
	"identity-card",
	"image",
	"image-add",
	"image-alt",
	"image-explore",
	"image-magic",
	"image-none",
	"image-with-text-overlay",
	"images",
	"import",
	"in-progress",
	"incentive",
	"incoming",
	"incomplete",
	"info",
	"info-filled",
	"inheritance",
	"inventory",
	"inventory-edit",
	"inventory-list",
	"inventory-transfer",
	"inventory-updated",
	"iq",
	"key",
	"keyboard",
	"keyboard-filled",
	"keyboard-hide",
	"keypad",
	"label-printer",
	"language",
	"language-translate",
	"layout-block",
	"layout-buy-button",
	"layout-buy-button-horizontal",
	"layout-buy-button-vertical",
	"layout-column-1",
	"layout-columns-2",
	"layout-columns-3",
	"layout-footer",
	"layout-header",
	"layout-logo-block",
	"layout-popup",
	"layout-rows-2",
	"layout-section",
	"layout-sidebar-left",
	"layout-sidebar-right",
	"lightbulb",
	"link",
	"link-list",
	"list-bulleted",
	"list-bulleted-filled",
	"list-numbered",
	"live",
	"live-critical",
	"live-none",
	"location",
	"location-none",
	"lock",
	"map",
	"markets",
	"markets-euro",
	"markets-rupee",
	"markets-yen",
	"maximize",
	"measurement-size",
	"measurement-size-list",
	"measurement-volume",
	"measurement-volume-list",
	"measurement-weight",
	"measurement-weight-list",
	"media-receiver",
	"megaphone",
	"mention",
	"menu",
	"menu-filled",
	"menu-horizontal",
	"menu-vertical",
	"merge",
	"metafields",
	"metaobject",
	"metaobject-list",
	"metaobject-reference",
	"microphone",
	"minimize",
	"minus",
	"minus-circle",
	"mobile",
	"money",
	"money-none",
	"money-split",
	"moon",
	"nature",
	"note",
	"note-add",
	"notification",
	"order",
	"order-batches",
	"order-draft",
	"order-filled",
	"order-first",
	"order-fulfilled",
	"order-repeat",
	"order-unfulfilled",
	"orders-status",
	"organization",
	"outdent",
	"outgoing",
	"package",
	"package-cancel",
	"package-fulfilled",
	"package-on-hold",
	"package-reassign",
	"package-returned",
	"page",
	"page-add",
	"page-attachment",
	"page-clock",
	"page-down",
	"page-heart",
	"page-list",
	"page-reference",
	"page-remove",
	"page-report",
	"page-up",
	"pagination-end",
	"pagination-start",
	"paint-brush-flat",
	"paint-brush-round",
	"paper-check",
	"partially-complete",
	"passkey",
	"paste",
	"pause-circle",
	"payment",
	"payment-capture",
	"payout",
	"payout-dollar",
	"payout-euro",
	"payout-pound",
	"payout-rupee",
	"payout-yen",
	"person",
	"person-add",
	"person-exit",
	"person-filled",
	"person-list",
	"person-lock",
	"person-remove",
	"person-segment",
	"personalized-text",
	"phablet",
	"phone",
	"phone-in",
	"phone-out",
	"pin",
	"pin-remove",
	"plan",
	"play",
	"play-circle",
	"plus",
	"plus-circle",
	"plus-circle-down",
	"plus-circle-filled",
	"plus-circle-up",
	"point-of-sale",
	"point-of-sale-register",
	"price-list",
	"print",
	"product",
	"product-add",
	"product-cost",
	"product-filled",
	"product-list",
	"product-reference",
	"product-remove",
	"product-return",
	"product-unavailable",
	"profile",
	"profile-filled",
	"question-circle",
	"question-circle-filled",
	"receipt",
	"receipt-dollar",
	"receipt-euro",
	"receipt-folded",
	"receipt-paid",
	"receipt-pound",
	"receipt-refund",
	"receipt-rupee",
	"receipt-yen",
	"receivables",
	"redo",
	"referral-code",
	"refresh",
	"remove-background",
	"reorder",
	"replace",
	"replay",
	"reset",
	"return",
	"reward",
	"rocket",
	"rotate-left",
	"rotate-right",
	"sandbox",
	"save",
	"savings",
	"scan-qr-code",
	"search",
	"search-add",
	"search-list",
	"search-recent",
	"search-resource",
	"select",
	"send",
	"settings",
	"share",
	"shield-check-mark",
	"shield-none",
	"shield-pending",
	"shield-person",
	"shipping-label",
	"shipping-label-cancel",
	"shopcodes",
	"slideshow",
	"smiley-happy",
	"smiley-joy",
	"smiley-neutral",
	"smiley-sad",
	"social-ad",
	"social-post",
	"sort",
	"sort-ascending",
	"sort-descending",
	"sound",
	"sports",
	"star",
	"star-circle",
	"star-filled",
	"star-half",
	"star-list",
	"status",
	"status-active",
	"stop-circle",
	"store",
	"store-import",
	"store-managed",
	"store-online",
	"sun",
	"table",
	"table-masonry",
	"tablet",
	"target",
	"tax",
	"team",
	"text",
	"text-align-center",
	"text-align-left",
	"text-align-right",
	"text-block",
	"text-bold",
	"text-color",
	"text-font",
	"text-font-list",
	"text-grammar",
	"text-in-columns",
	"text-in-rows",
	"text-indent",
	"text-indent-remove",
	"text-italic",
	"text-quote",
	"text-title",
	"text-underline",
	"text-with-image",
	"theme",
	"theme-edit",
	"theme-store",
	"theme-template",
	"three-d-environment",
	"thumbs-down",
	"thumbs-up",
	"tip-jar",
	"toggle-off",
	"toggle-on",
	"transaction",
	"transaction-fee-add",
	"transaction-fee-dollar",
	"transaction-fee-euro",
	"transaction-fee-pound",
	"transaction-fee-rupee",
	"transaction-fee-yen",
	"transfer",
	"transfer-in",
	"transfer-internal",
	"transfer-out",
	"truck",
	"undo",
	"unknown-device",
	"unlock",
	"upload",
	"variant",
	"view",
	"viewport-narrow",
	"viewport-short",
	"viewport-tall",
	"viewport-wide",
	"wallet",
	"wand",
	"watch",
	"wifi",
	"work",
	"work-list",
	"wrench",
	"x",
	"x-circle",
	"x-circle-filled"
];
export type IconType = (typeof privateIconArray)[number];
/**
 * Like `Extract`, but ensures that the extracted type is a strict subtype of the input type.
 */
export type ExtractStrict<T, U extends T> = Extract<T, U>;
/**
 * Represents CSS shorthand properties that accept one to four values, following the [CSS shorthand syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box). Supports specifying values for all four sides: top, right, bottom, and left.
 *
 * - `T`: Single value that applies to all four sides.
 * - `${T} ${T}`: Two values for block axis (top/bottom) and inline axis (left/right).
 * - `${T} ${T} ${T}`: Three values for block-start (top), inline axis (left/right), and block-end (bottom).
 * - `${T} ${T} ${T} ${T}`: Four values for block-start (top), inline-end (right), block-end (bottom), and inline-start (left).
 */
export type MaybeAllValuesShorthandProperty<T extends string> = T | `${T} ${T}` | `${T} ${T} ${T}` | `${T} ${T} ${T} ${T}`;
/**
 * Represents CSS shorthand properties that accept one or two values. Supports specifying the same value for both dimensions or different values.
 *
 * - `T`: Single value that applies to both dimensions.
 * - `${T} ${T}`: Two values for block axis (vertical) and inline axis (horizontal).
 */
export type MaybeTwoValuesShorthandProperty<T extends string> = T | `${T} ${T}`;
/**
 * Makes a property responsive by allowing it to be set conditionally based on container query conditions. The value can be either a base value or a container query string.
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
export type optionalSpace = "" | " ";
interface BadgeProps$1 extends GlobalProps {
	/**
	 * The content of the Badge.
	 */
	children?: ComponentChildren;
	/**
	 * The semantic meaning and color treatment of the badge.
	 *
	 * @default 'auto'
	 */
	tone?: ToneKeyword;
	/**
	 * Controls the visual weight and emphasis of the badge.
	 *
	 * @default 'base'
	 */
	color?: ColorKeyword;
	/**
	 * An icon displayed inside the badge to provide additional visual context or reinforce the badge's meaning. Set to an empty string to display no icon.
	 *
	 * Always positioned relative to the text content. Independent positioning isn't supported.
	 *
	 * @default ''
	 */
	icon?: IconType | AnyString;
	/**
	 * The position of the icon relative to the badge text.
	 *
	 * - `start`: Places the icon before the text.
	 * - `end`: Places the icon after the text.
	 */
	iconPosition?: "start" | "end";
	/**
	 * The size of the badge.
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
	 * The `critical` tone creates an [assertive live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role) that is announced by screen readers immediately. The `neutral`, `info`, `success`, `warning`, and `caution` tones create an [informative live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role) that is announced by screen readers after the current message.
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
	 * - `auto`: The component’s initial value. The actual value depends on the component and context.
	 * - `none`: Hides the component from display and removes it from the accessibility tree, making it invisible to screen readers.
	 *
	 * Learn more about the [display property](https://developer.mozilla.org/en-US/docs/Web/CSS/display).
	 *
	 * @default 'auto'
	 */
	display?: MaybeResponsive<"auto" | "none">;
}
export interface AccessibilityRoleProps {
	/**
	 * The semantic meaning of the component's content. When set, assistive technologies use this role to help users navigate the page.
	 *
	 * @default 'generic'
	 */
	accessibilityRole?: AccessibilityRole;
}
/**
 * The semantic role of a component, used by assistive technologies to convey the element's purpose to users. Each role maps to a specific HTML element or ARIA role.
 *
 * - `main`: The primary content of the page.
 * - `header`: A page or section header.
 * - `footer`: Information such as copyright, navigation links, and privacy statements.
 * - `section`: A generic section that should have a heading or `accessibilityLabel`.
 * - `aside`: Supporting content related to the main content.
 * - `navigation`: A major group of navigation links.
 * - `ordered-list`: A list of ordered items.
 * - `list-item`: An item inside a list.
 * - `list-item-separator`: A divider between list items.
 * - `unordered-list`: A list of unordered items.
 * - `separator`: A divider that separates sections of content.
 * - `status`: A live region with advisory information that is not urgent.
 * - `alert`: Important, usually time-sensitive information.
 * - `generic`: A nameless container with no semantic meaning (renders a `<div>`).
 * - `presentation`: Strips semantic meaning while keeping visual styling. Synonym for `none`.
 * - `none`: Strips semantic meaning while keeping visual styling. Synonym for `presentation`.
 */
export type AccessibilityRole = 
/**
 * Used to indicate the primary content.
 *
 * In an HTML host, `main` will render a `<main>` element.
 * Learn more about the [`<main>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role) in the MDN web docs.
 */
"main"
/**
 * Used to indicate the component is a header.
 *
 * In an HTML host `header` will render a `<header>` element.
 * Learn more about the [`<header>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/banner_role) in the MDN web docs.
 */
 | "header"
/**
 * Used to display information such as copyright information, navigation links, and privacy statements.
 *
 * In an HTML host `footer` will render a `<footer>` element.
 * Learn more about the [`<footer>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/contentinfo_role) in the MDN web docs.
 */
 | "footer"
/**
 * Used to indicate a generic section.
 * Sections should always have a `Heading` or an accessible name provided in the `accessibilityLabel` property.
 *
 * In an HTML host `section` will render a `<section>` element.
 * Learn more about the [`<section>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role) in the MDN web docs.
 *
 */
 | "section"
/**
 * Used to designate a supporting section that relates to the main content.
 *
 * In an HTML host `aside` will render an `<aside>` element.
 * Learn more about the [`<aside>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/complementary_role) in the MDN web docs.
 */
 | "aside"
/**
 * Used to identify major groups of links used for navigating.
 *
 * In an HTML host `navigation` will render a `<nav>` element.
 * Learn more about the [`<nav>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role) in the MDN web docs.
 */
 | "navigation"
/**
 * Used to identify a list of ordered items.
 *
 * In an HTML host `ordered-list` will render a `<ol>` element.
 * Learn more about the [`<ol>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role) in the MDN web docs.
 */
 | "ordered-list"
/**
 * Used to identify an item inside a list of items.
 *
 * In an HTML host `list-item` will render a `<li>` element.
 * Learn more about the [`<li>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listitem_role) in the MDN web docs.
 */
 | "list-item"
/**
 * Used to indicates the component acts as a divider that separates and distinguishes sections of content in a list of items.
 *
 * In an HTML host `list-item-separator` will render as `<li role="separator">`.
 * Learn more about the [`<li>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) and the [`separator` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role) in the MDN web docs.
 */
 | "list-item-separator"
/**
 * Used to identify a list of unordered items.
 *
 * In an HTML host `unordered-list` will render a `<ul>` element.
 * Learn more about the [`<ul>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) and its [implicit role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role) in the MDN web docs.
 */
 | "unordered-list"
/**
 * Used to indicates the component acts as a divider that separates and distinguishes sections of content.
 *
 * In an HTML host `separator` will render as `<div role="separator">`.
 * Learn more about the [`separator` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role) in the MDN web docs.
 */
 | "separator"
/**
 * Used to define a live region containing advisory information for the user that is not important enough to be an alert.
 *
 * In an HTML host `status` will render as `<div role="status">`.
 * Learn more about the [`status` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role) in the MDN web docs.
 */
 | "status"
/**
 * Used for important, and usually time-sensitive, information.
 *
 * In an HTML host `alert` will render as `<div role="alert">`.
 * Learn more about the [`alert` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role) in the MDN web docs.
 */
 | "alert"
/**
 * Used to create a nameless container element which has no semantic meaning on its own.
 *
 * In an HTML host `generic'` will render a `<div>` element.
 * Learn more about the [`generic` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/generic_role) in the MDN web docs.
 */
 | "generic"
/**
 * Used to strip the semantic meaning of an element, but leave the visual styling intact.
 *
 * Synonym for `none`
 * Learn more about the [`presentation` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/presentation_role) in the MDN web docs.
 */
 | "presentation"
/**
 * Used to strip the semantic meaning of an element, but leave the visual styling intact.
 *
 * Synonym for `presentation`
 * Learn more about the [`none` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/none_role) in the MDN web docs.
 */
 | "none";
export interface AccessibilityVisibilityProps {
	/**
	 * Controls how the element is exposed to sighted users and to assistive technologies such as screen readers.
	 *
	 * - `visible`: The element is visible to all users (both sighted users and screen readers).
	 * - `hidden`: The element is visually visible but hidden from screen readers. Use this for decorative elements that don't provide meaningful information.
	 * - `exclusive`: The element is visually hidden but announced by screen readers. Use this for screen-reader-only content like skip links or additional context.
	 *
	 * @default 'visible'
	 */
	accessibilityVisibility?: "visible" | "hidden" | "exclusive";
}
export interface LabelAccessibilityVisibilityProps {
	/**
	 * Controls whether the label is visible to all users or only to screen readers.
	 *
	 * - `visible`: The label is shown to everyone.
	 * - `exclusive`: The label is visually hidden but still announced by screen readers.
	 *
	 * @default 'visible'
	 */
	labelAccessibilityVisibility?: ExtractStrict<AccessibilityVisibilityProps["accessibilityVisibility"], "visible" | "exclusive">;
}
/**
 * Defines the padding size for elements, using the standard size scale or `none` for no padding.
 *
 * - `SizeKeyword`: Standard padding sizes from the size scale for consistent spacing.
 * - `none`: No padding.
 */
export type PaddingKeyword = SizeKeyword | "none";
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
	paddingBlock?: MaybeResponsive<MaybeTwoValuesShorthandProperty<PaddingKeyword> | "">;
	/**
	 * The block-start padding (top in horizontal writing modes).
	 *
	 * Overrides the block-start value from `paddingBlock`.
	 *
	 * @default '' - meaning no override
	 */
	paddingBlockStart?: MaybeResponsive<PaddingKeyword | "">;
	/**
	 * The block-end padding (bottom in horizontal writing modes).
	 *
	 * Overrides the block-end value from `paddingBlock`.
	 *
	 * @default '' - meaning no override
	 */
	paddingBlockEnd?: MaybeResponsive<PaddingKeyword | "">;
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
	paddingInline?: MaybeResponsive<MaybeTwoValuesShorthandProperty<PaddingKeyword> | "">;
	/**
	 * The inline-start padding (left in LTR writing modes, right in RTL).
	 *
	 * Overrides the inline-start value from `paddingInline`.
	 *
	 * @default '' - meaning no override
	 */
	paddingInlineStart?: MaybeResponsive<PaddingKeyword | "">;
	/**
	 * The inline-end padding (right in LTR writing modes, left in RTL).
	 *
	 * Overrides the inline-end value from `paddingInline`.
	 *
	 * @default '' - meaning no override
	 */
	paddingInlineEnd?: MaybeResponsive<PaddingKeyword | "">;
}
/**
 * Represents size values in pixels, percentages, or zero.
 *
 * - `` `${number}px` ``: Absolute size in pixels for fixed dimensions (such as `100px`, `24px`).
 * - `` `${number}%` ``: Relative size as a percentage of the parent container (such as `50%`, `100%`).
 * - `0`: Zero size, equivalent to no dimension.
 */
export type SizeUnits = `${number}px` | `${number}%` | `0`;
/**
 * Represents size values that can also be set to `auto` for automatic sizing.
 *
 * - `SizeUnits`: Specific size values in pixels, percentages, or zero for precise control.
 * - `auto`: Automatically sizes based on content and layout constraints. Learn more about the [auto value](https://developer.mozilla.org/en-US/docs/Web/CSS/width#auto).
 */
export type SizeUnitsOrAuto = SizeUnits | "auto";
/**
 * Represents size values that can also be set to `none` to remove the size constraint.
 *
 * - `SizeUnits`: Specific size values in pixels, percentages, or zero for precise control.
 * - `none`: No size constraint, allowing unlimited growth. Learn more about the [none value](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width#none).
 */
export type SizeUnitsOrNone = SizeUnits | "none";
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
/**
 * The visual style of a border. Learn more about [border-style](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style).
 *
 * - `"none"`: No border is rendered.
 * - `"solid"`: A single continuous line.
 * - `"dashed"`: A series of short dashes.
 * - `"dotted"`: A series of round dots.
 * - `"auto"`: The border style is determined automatically based on the surface's design system.
 */
export type BorderStyleKeyword = "none" | "solid" | "dashed" | "dotted" | "auto";
/**
 * Defines the width of borders, using the standard size scale or `none` for no border.
 *
 * - `SizeKeyword`: Standard border widths from the size scale for consistent thickness.
 * - `none`: No border width (removes the border).
 */
export type BorderSizeKeyword = SizeKeyword | "none";
/**
 * The corner radius of a border, using the design system's `SizeKeyword` scale with additional options:
 *
 * - `"max"`: The maximum possible radius, creating a pill or circular shape.
 * - `"none"`: No rounding — corners are sharp (0 radius).
 */
export type BorderRadiusKeyword = SizeKeyword | "max" | "none";
/**
 * A shorthand string for specifying border properties. Accepts a size alone (`'base'`), size with color (`'base strong'`), or size with color and style (`'base strong dashed'`). Omitted values use their defaults.
 */
export type BorderShorthand = BorderSizeKeyword | `${BorderSizeKeyword} ${ColorKeyword}` | `${BorderSizeKeyword} ${ColorKeyword} ${BorderStyleKeyword}`;
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
	 * Supports [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) for specifying different widths per side:
	 * - One value: applies to all sides
	 * - Two values: applies to block sides (top/bottom) and inline sides (left/right) respectively
	 * - Three values: applies to block-start (top), inline sides (left/right), and block-end (bottom) respectively
	 * - Four values: applies to block-start (top), inline-end (right), block-end (bottom), and inline-start (left) respectively
	 *
	 * @default '' - meaning no override
	 */
	borderWidth?: MaybeAllValuesShorthandProperty<BorderSizeKeyword> | "";
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
	borderStyle?: MaybeAllValuesShorthandProperty<BorderStyleKeyword> | "";
	/**
	 * Controls the color of the border using the design system's color scale.
	 *
	 * When set, this overrides the color value specified in the `border` property.
	 * Choose from `subdued`, `base`, or `strong` to match the visual emphasis needed.
	 *
	 * @default '' - meaning no override
	 */
	borderColor?: ColorKeyword | "";
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
	 * The overflow behavior of the element.
	 *
	 * - `visible`: Content that extends beyond the container is visible.
	 * - `hidden`: Content that extends beyond the container is clipped and not scrollable.
	 *
	 * @default 'visible'
	 */
	overflow?: "hidden" | "visible";
}
export interface BaseBoxProps extends AccessibilityVisibilityProps, BackgroundProps, DisplayProps, SizingProps, PaddingProps, BorderProps, OverflowProps {
	/**
	 * The child elements to render inside the container.
	 */
	children?: ComponentChildren;
	/**
	 * A label announced by assistive technologies that describes the purpose or contents of the element. Only set this when the element's visible content doesn't provide enough context on its own.
	 */
	accessibilityLabel?: string;
}
export interface BaseBoxPropsWithRole extends BaseBoxProps, AccessibilityRoleProps {
}
interface BoxProps$1 extends BaseBoxPropsWithRole, GlobalProps {
}
export interface ButtonBehaviorProps extends InteractionProps, FocusEventProps {
	/**
	 * The behavioral type of the button component, which determines what action it performs when activated.
	 * - `'submit'`: Submits the nearest containing form.
	 * - `'button'`: Performs no default action, relying on the `click` event handler for behavior.
	 * - `'reset'`: Resets all fields in the nearest containing form to their default values.
	 *
	 * This property is ignored if `href` or `commandFor`/`command` is set.
	 *
	 * @default 'button'
	 */
	type?: "submit" | "button" | "reset";
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
	 * Whether the button is in a loading state, which replaces the button content with a loading indicator while a background action is being performed. This also disables the button.
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
	 * Specifies where to display the linked URL. Learn more about the [target attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).
	 *
	 * - `'auto'`: Opens the URL in the current frame or a new tab, depending on the context.
	 * - `'_blank'`: Opens the URL in a new tab or window.
	 *
	 * @implementation Surfaces can set specific rules on how they handle each URL.
	 * @implementation It’s expected that the behavior of `auto` is as `_self` except in specific cases.
	 * @implementation For example, a surface could decide to open cross-origin URLs in a new window (as `_blank`).
	 *
	 * @default 'auto'
	 */
	target?: "auto" | "_blank" | "_self" | "_parent" | "_top" | AnyString;
	/**
	 * A filename that causes the browser to treat the linked URL as a download. Download is only supported for same-origin URLs, or `blob:` and `data:` schemes. Learn more about the [download attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download).
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
	 *
	 * When both `commandFor` and `href` are set, `commandFor` takes precedence. The command runs and the link doesn't navigate.
	 */
	commandFor?: string;
	/**
	 * Sets the action the `commandFor` target should take when this component is activated. Available options:
	 *
	 * - `'--auto'`: Performs the default action appropriate for the target component.
	 * - `'--show'`: Displays the target component if it's currently hidden.
	 * - `'--hide'`: Conceals the target component from view.
	 * - `'--toggle'`: Alternates the target component between visible and hidden states.
	 * - `'--copy'`: Copies the target clipboard item.
	 *
	 * The supported actions vary by target component type. Learn more about the [`command` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command).
	 *
	 * @default '--auto'
	 */
	command?: "--auto" | "--show" | "--hide" | "--toggle" | "--copy";
	/**
	 * The ID of the component to show when users hover over or focus on this component. Pair with a target component that supports interest-based interactions. Learn more about the [interestFor attribute](https://open-ui.org/components/interest-invokers.explainer/#the-pitch-in-code).
	 */
	interestFor?: string;
}
export interface BaseClickableProps extends ButtonBehaviorProps, LinkBehaviorProps {
}
interface ButtonProps$1 extends GlobalProps, BaseClickableProps {
	/**
	 * A label that describes the purpose or content of the button for users of assistive technologies such as screen readers. Use this when the visible content alone doesn't provide enough context.
	 */
	accessibilityLabel?: string;
	/**
	 * The content displayed within the button component.
	 */
	children?: ComponentChildren;
	/**
	 * An icon displayed inside the button, typically positioned before the button text.
	 *
	 * @default ''
	 */
	icon?: IconType | AnyString;
	/**
	 * The inline width of the button component.
	 *
	 * - `'auto'`: The size depends on the surface and context.
	 * - `'fill'`: The button takes up 100% of the available inline size.
	 * - `'fit-content'`: The button takes up the minimum inline size required to fit its content.
	 *
	 * @default 'auto'
	 */
	inlineSize?: "auto" | "fill" | "fit-content";
	/**
	 * The visual style variant of the button component, which controls its prominence and emphasis.
	 *
	 * - `'auto'`: Automatically determined by the button's context.
	 * - `'primary'`: High-emphasis style for the main action.
	 * - `'secondary'`: Medium-emphasis style for supporting actions.
	 * - `'tertiary'`: Low-emphasis style for less prominent actions.
	 *
	 * @default 'auto'
	 */
	variant?: "auto" | "primary" | "secondary" | "tertiary";
	/**
	 * The semantic meaning and color treatment of the button.
	 *
	 * - `'auto'`: Automatically determined based on context.
	 * - `'neutral'`: General information without specific intent.
	 * - `'critical'`: Urgent problems or destructive actions.
	 *
	 * @default 'auto'
	 */
	tone?: ToneKeyword;
	/**
	 * The language of the button's text content. Use this when the button text is in a different language than the rest of the page, so assistive technologies can invoke the correct pronunciation. See the [reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) (`Subtag` label).
	 */
	lang?: string;
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
	 * A callback fired when the user has **finished editing** a field, such as when they blur the field or press Enter.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
	 */
	onChange?: (event: Event) => void;
	/**
	 * A callback fired when the user makes any changes in the field, such as typing a character.
	 *
	 * Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
	 */
	onInput?: (event: Event) => void;
	/**
	 * The current value for the field. If omitted, the field will be empty.
	 */
	value?: string;
	/**
	 * The initial value of the field when it first loads. Unlike `placeholder`, this is a real value that the user can edit and that gets submitted with the form. Once the user starts typing, their input replaces this value.
	 *
	 * @implementation `defaultValue` reflects to the `value` attribute.
	 */
	defaultValue?: string;
}
export interface MultipleInputProps extends BaseInputProps {
	/**
	 * A callback fired when the user has selected one or more options.
	 *
	 * Learn more about the [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event).
	 */
	onChange?: (event: Event) => void;
	/**
	 * A callback fired when the user selects or deselects options.
	 *
	 * Learn more about the [input event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
	 */
	onInput?: (event: Event) => void;
	/**
	 * An array of `value` attributes for the currently selected options.
	 *
	 * This is a convenience prop for setting the `selected` prop on child options.
	 *
	 * Form data captures the selected value strings only. Complex nested content inside choices is for display purposes and isn't included in form submissions.
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
	 * The value is always the file's name prefixed with "C:\fakepath\", which isn't the real path of the file.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#value
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
	files?: readonly File[];
}
export interface FieldErrorProps {
	/**
	 * An error message displayed below the field to indicate validation problems. When set, the field is styled with error indicators and the message is announced to screen readers.
	 */
	error?: string;
}
export interface BasicFieldProps extends FieldErrorProps, LabelAccessibilityVisibilityProps {
	/**
	 * Whether the field needs a value. This requirement adds semantic value
	 * to the field, but it will not cause an error to appear automatically.
	 * If you want to present an error when this field is empty, you can do
	 * so with the `error` property.
	 *
	 * @default false
	 */
	required?: boolean;
	/**
	 * The text displayed as the field label, which identifies the purpose of the field to users. This label is associated with the field for accessibility and helps users understand what information to provide.
	 */
	label?: string;
}
export interface FieldDetailsProps {
	/**
	 * Additional text to provide context or guidance for the field.
	 * This text is displayed along with the field and its label
	 * to offer more information or instructions to the user.
	 *
	 * This will also be exposed to screen reader users.
	 */
	details?: string;
}
export interface FieldProps extends BasicFieldProps, InputProps, FocusEventProps, FieldDetailsProps {
	/**
	 * The placeholder text displayed in the field when it's empty, providing a hint about the expected input format or value.
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
	 * A value to be displayed immediately after the editable portion of the field.
	 *
	 * This is useful for displaying an implied part of the value, such as "@shopify.com", or "%".
	 *
	 * This can't be edited by the user, and it isn't included in the value of the field.
	 *
	 * It may not be displayed until the user has interacted with the input.
	 * For example, an inline label may take the place of the suffix until the user focuses the input.
	 *
	 * @default ''
	 */
	suffix?: string;
	/**
	 * A value to be displayed immediately before the editable portion of the field.
	 *
	 * This is useful for displaying an implied part of the value, such as "https://" or "+353".
	 *
	 * This can't be edited by the user, and it isn't included in the value of the field.
	 *
	 * It may not be displayed until the user has interacted with the input.
	 * For example, an inline label may take the place of the prefix until the user focuses the input.
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
	 * Additional content to be displayed in the field.
	 * Commonly used to display an icon that activates a tooltip providing more information.
	 */
	accessory?: ComponentChildren;
}
export interface NumberConstraintsProps {
	/**
	 * The highest decimal or integer to be accepted for the field.
	 * When used with `step` the value will round down to the max number.
	 *
	 * Note: a user can still use the keyboard to input a number higher than the max. It's up to the developer to add appropriate validation.
	 *
	 * @default Infinity
	 */
	max?: number;
	/**
	 * The lowest decimal or integer to be accepted for the field.
	 * When used with `step` the value will round up to the min number.
	 *
	 * Note: a user can still use the keyboard to input a number lower than the min. It's up to the developer to add appropriate validation.
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
	 * - `'auto'`: The presence of the controls depends on the surface and context.
	 * - `'stepper'`: Displays buttons to increase or decrease the value by the stepping interval defined in the `step` property. Appropriate mouse and [keyboard interactions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/spinbutton_role#keyboard_interactions) to control the value are enabled.
	 * - `'none'`: No controls are displayed and users must input the value manually. Arrow keys and scroll wheels can’t be used either to avoid accidental changes.
	 *
	 * @default 'auto'
	 */
	controls?: "auto" | "stepper" | "none";
}
export interface MinMaxLengthProps {
	/**
	 * Specifies the maximum number of characters allowed.
	 *
	 * @default Infinity
	 */
	maxLength?: number;
	/**
	 * Specifies the minimum number of characters allowed.
	 *
	 * @default 0
	 */
	minLength?: number;
}
export interface BaseSelectableProps {
	/**
	 * A label used for users using assistive technologies like screen readers. When set, any children or `label` supplied will not be announced.
	 * This can also be used to display a control without a visual label, while still providing context to users using screen readers.
	 */
	accessibilityLabel?: string;
	/**
	 * Whether the control is disabled, preventing any user interaction.
	 *
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * The value used in form data when the control is checked.
	 */
	value?: string;
}
export interface BaseOptionProps extends BaseSelectableProps {
	/**
	 * Whether the control is currently selected.
	 *
	 * @default false
	 */
	selected?: boolean;
	/**
	 * Whether the control is selected by default.
	 *
	 * @implementation `defaultSelected` reflects to the `selected` attribute.
	 *
	 * @default false
	 */
	defaultSelected?: boolean;
}
export interface BaseCheckableProps extends BaseSelectableProps, InteractionProps {
	/**
	 * The text displayed as the control label, which identifies the purpose of the control to users. This label is associated with the control for accessibility.
	 */
	label?: string;
	/**
	 * Whether the control is currently checked.
	 *
	 * @default false
	 */
	checked?: boolean;
	/**
	 * Whether the control is checked by default.
	 *
	 * @implementation `defaultChecked` reflects to the `checked` attribute.
	 *
	 * @default false
	 */
	defaultChecked?: boolean;
	/**
	 * The name attribute for the control, used to identify its value when the form is submitted. Must be unique within the nearest containing form.
	 */
	name?: string;
	/**
	 * A callback that is run whenever the control is changed.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
	 */
	onChange?: (event: Event) => void;
	/**
	 * A callback that is run whenever the control is changed.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
	 */
	onInput?: (event: Event) => void;
}
interface CheckboxProps$1 extends GlobalProps, BaseCheckableProps, FieldErrorProps, FieldDetailsProps {
	/**
	 * Whether to display the checkbox in an indeterminate state (neither checked or unchecked).
	 *
	 * In terms of appearance, this takes priority over the `checked` prop.
	 * But this is purely a visual change.
	 * Whether the value is submitted along with a form is still down to the `checked` prop.
	 *
	 * If `indeterminate` has not been explicitly set, and the `indeterminate` state hasn't been modified by the user (via clicking),
	 * then `indeterminate` returns the value of `defaultIndeterminate`.
	 *
	 * @implementation The `indeterminate` property doesn't reflect to any attribute.
	 */
	indeterminate?: boolean;
	/**
	 * Whether the checkbox is in an `indeterminate` state by default.
	 *
	 * Similar to `defaultValue` and `defaultChecked`, this value applies until `indeterminate` is set, or user changes the state of the checkbox.
	 *
	 * @implementation `defaultIndeterminate` reflects to the `indeterminate` attribute.
	 *
	 * @default false
	 */
	defaultIndeterminate?: boolean;
	/**
	 * Whether the field needs a value. This requirement adds semantic value
	 * to the field, but it will not cause an error to appear automatically.
	 * If you want to present an error when this field is empty, you can do
	 * so with the `error` property.
	 *
	 * Adds semantic meaning for accessibility. Doesn't trigger automatic validation or display an error. Implement validation logic yourself and use the `error` prop to show results.
	 *
	 * @default false
	 */
	required?: boolean;
}
export interface ChipProps$1 {
	/**
	 * The text label displayed within the chip, which identifies the chip's value or category to users.
	 */
	children?: ComponentChildren;
	/**
	 * An optional graphic displayed at the start of the chip, such as an icon to visually reinforce the chip's label.
	 *
	 * @implementation Only `s-icon` is supported.
	 */
	graphic?: ComponentChildren;
	/**
	 * A label that describes the purpose or contents of the chip. It will be read to users using assistive technologies such as screen readers.
	 */
	accessibilityLabel?: string;
	/**
	 * The color emphasis level that controls visual intensity.
	 *
	 * - `subdued`: Deemphasized color for secondary text, supporting labels, and less critical interface elements.
	 * - `base`: Primary color for body text, standard UI elements, and general content with good readability.
	 * - `strong`: Higher-contrast color for text that needs more emphasis than `base`.
	 *
	 * @default 'base'
	 */
	color?: ColorKeyword;
}
interface ChipProps$1 extends ChipProps$1, GlobalProps {
}
interface ChoiceProps$1 extends GlobalProps, BaseOptionProps {
	/**
	 * Content to use as the choice label.
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
	 * Additional text to provide context or guidance for the input.
	 *
	 * This text is displayed along with the input and its label
	 * to offer more information or instructions to the user.
	 *
	 * @implementation this content should be linked to the input with an `aria-describedby` attribute.
	 */
	details?: ComponentChildren;
	/**
	 * Whether this choice is associated with the error state of the parent choice list. When `true`, the choice is visually marked as having an error.
	 *
	 * @default false
	 */
	error?: boolean;
	/**
	 * Additional text or elements displayed below the choice label, providing extra context or detail to help users make a selection.
	 */
	secondaryContent?: ComponentChildren;
	/**
	 * Content to display when the option is selected.
	 *
	 * This can be used to provide additional information or options related to the choice.
	 */
	selectedContent?: ComponentChildren;
}
interface ChoiceListProps$1 extends GlobalProps, Pick<BasicFieldProps, "label" | "labelAccessibilityVisibility" | "error">, MultipleInputProps, FieldDetailsProps {
	/**
	 * Whether multiple choices can be selected.
	 *
	 * @default false
	 */
	multiple?: boolean;
	/**
	 * The choices a user can select from.
	 *
	 * Accepts `Choice` components.
	 */
	children?: ComponentChildren;
	/**
	 * Whether the field is disabled, preventing any user interaction.
	 *
	 * `disabled` on any child choices is ignored when this is true.
	 *
	 * @default false
	 */
	disabled?: MultipleInputProps["disabled"];
	/**
	 * The variant of the choice grid.
	 *
	 * - `auto`: The variant is determined by the context.
	 * - `list`: The choices are displayed in a list.
	 * - `inline`: The choices are displayed on the inline axis.
	 * - `block`: The choices are displayed on the block axis.
	 * - `grid`: The choices are displayed in a grid.
	 *
	 * The selected content slot is supported only in the default (stacked) variant. `inline` and `grid` ignore it.
	 *
	 * @implementation The `block`, `inline` and `grid` variants are more suitable for button looking choices, but it's at the
	 * discretion of each surface.
	 *
	 * @default 'auto'
	 */
	variant?: "auto" | "list" | "inline" | "block" | "grid";
}
interface ClickableProps$1 extends GlobalProps, BaseBoxProps, BaseClickableProps {
	/**
	 * Disables the clickable, and indicates to assistive technology that the loading is in progress.
	 *
	 * This also disables the clickable.
	 */
	loading?: BaseClickableProps["loading"];
	/**
	 * Disables the clickable, meaning it cannot be clicked or receive focus.
	 *
	 * In this state, the `click` event will not fire.
	 * If the click event originates from a child element, the event will immediately stop propagating from this element.
	 *
	 * However, items within the clickable can still receive focus and be interacted with.
	 *
	 * This has no impact on the visual state by default,
	 * but developers are encouraged to style the clickable accordingly.
	 */
	disabled?: BaseClickableProps["disabled"];
	/**
	 * The language of the text content. Use this when the text is in a different language than the rest of the page, allowing assistive technologies such as screen readers to invoke the correct pronunciation.
	 *
	 * The value should be a valid language subtag from the [IANA language subtag registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).
	 *
	 * @default ''
	 */
	lang?: string;
}
interface ClickableChipProps$1 extends ChipProps$1, GlobalProps {
	/**
	 * A callback fired when the chip is clicked. Learn more about the [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event).
	 */
	onClick?: (event: Event) => void;
	/**
	 * The URL to link to. When set, the chip navigates to the specified location after the `click` event fires.
	 */
	href?: string;
	/**
	 * Whether the chip displays a remove button, allowing users to dismiss it. When `true`, clicking the remove button fires the `remove` event.
	 *
	 * @default false
	 */
	removable?: boolean;
	/**
	 * A callback fired when the chip is removed by the user clicking the remove button.
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
	 * When using the `removable` variant, keep `hidden` synced with your app state. If `hidden` isn't updated after the chip is removed, the chip can become permanently hidden.
	 *
	 * @default false
	 */
	hidden?: boolean;
	/**
	 * A callback fired when the chip has fully hidden after a removal animation.
	 *
	 * The `hidden` property will be `true` when this event fires.
	 *
	 * @implementation If implementations animate the hiding of the chip,
	 * this event must fire after the chip has fully hidden.
	 * We can add an `onHide` event in future if we want to provide a hook for the start of the animation.
	 */
	onAfterHide?: (event: Event) => void;
	/**
	 * Disables the chip, preventing all user interaction including clicks and removal. Disabled chips are visually dimmed to indicate they are not interactive.
	 *
	 * @default false
	 */
	disabled?: boolean;
}
interface ClipboardItemProps$1 extends GlobalProps {
	/**
	 * Plain text to be written to the clipboard.
	 *
	 * @default ''
	 */
	text?: string;
	/**
	 * Callback run when the copy to clipboard succeeds.
	 */
	onCopy?: (event: ClipboardEvent) => void;
	/**
	 * Callback run when the copy to clipboard fails.
	 */
	onCopyError?: (event: Event) => void;
}
export interface AutocompleteProps<AutocompleteField extends AnyAutocompleteField> {
	/**
	 * A hint about the intended content of the field for browser autofill.
	 *
	 * When set to `on` (the default), this property indicates that the field should support
	 * autofill, but you do not have any more semantic information on the intended
	 * contents.
	 *
	 * When set to `off`, you are indicating that this field contains sensitive
	 * information, or contents that are never saved, like one-time codes.
	 *
	 * Alternatively, you can provide value which describes the
	 * specific data you would like to be entered into this field during autofill.
	 *
	 * Learn more about the set of [autocomplete values](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-detail-tokens) supported in browsers.
	 *
	 * @default 'on'
	 */
	autocomplete?: AutocompleteField | `${AutocompleteSection} ${AutocompleteField}` | `${AutocompleteGroup} ${AutocompleteField}` | `${AutocompleteSection} ${AutocompleteGroup} ${AutocompleteField}` | "on" | "off";
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
export type AutocompleteGroup = "shipping" | "billing";
/**
 * The contact information subgroup the autocomplete data should be sourced from.
 */
export type AutocompleteAddressGroup = "fax" | "home" | "mobile" | "pager";
export type AnyAutocompleteField = "additional-name" | "address-level1" | "address-level2" | "address-level3" | "address-level4" | "address-line1" | "address-line2" | "address-line3" | "country-name" | "country" | "current-password" | "email" | "family-name" | "given-name" | "honorific-prefix" | "honorific-suffix" | "language" | "name" | "new-password" | "nickname" | "one-time-code" | "organization-title" | "organization" | "photo" | "postal-code" | "sex" | "street-address" | "transaction-amount" | "transaction-currency" | "url" | "username" | "bday-day" | "bday-month" | "bday-year" | "bday" | "cc-additional-name" | "cc-expiry-month" | "cc-expiry-year" | "cc-expiry" | "cc-family-name" | "cc-given-name" | "cc-name" | "cc-number" | "cc-csc" | "cc-type" | `${AutocompleteAddressGroup} email` | "impp" | `${AutocompleteAddressGroup} impp` | "tel" | "tel-area-code" | "tel-country-code" | "tel-extension" | "tel-local-prefix" | "tel-local-suffix" | "tel-local" | "tel-national" | `${AutocompleteAddressGroup} tel` | `${AutocompleteAddressGroup} tel-area-code` | `${AutocompleteAddressGroup} tel-country-code` | `${AutocompleteAddressGroup} tel-extension` | `${AutocompleteAddressGroup} tel-local-prefix` | `${AutocompleteAddressGroup} tel-local-suffix` | `${AutocompleteAddressGroup} tel-local` | `${AutocompleteAddressGroup} tel-national`;
export type TextAutocompleteField = ExtractStrict<AnyAutocompleteField, "additional-name" | "address-level1" | "address-level2" | "address-level3" | "address-level4" | "address-line1" | "address-line2" | "address-line3" | "country-name" | "country" | "family-name" | "given-name" | "honorific-prefix" | "honorific-suffix" | "language" | "name" | "nickname" | "one-time-code" | "organization-title" | "organization" | "postal-code" | "sex" | "street-address" | "transaction-currency" | "username" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-type">;
/**
 * The policy for which buyer consent is being collected. Used by the [consent checkbox](/docs/api/{API_NAME}/{API_VERSION}/web-components/forms/consent-checkbox) and [consent phone field](/docs/api/{API_NAME}/{API_VERSION}/web-components/forms/consent-phone-field) components to identify the type of marketing permission requested.
 * @publicDocs
 */
export type ConsentPolicy = "sms-marketing";
interface ConsentCheckboxProps$1 extends GlobalProps, CheckboxProps$1 {
	/**
	 * The policy for which user consent is being collected.
	 *
	 * Only `sms-marketing` is supported. Other consent policy types aren't available through this component.
	 */
	policy?: ConsentPolicy;
}
export type PhoneAutocompleteField = ExtractStrict<AnyAutocompleteField, "tel" | "tel-area-code" | "tel-country-code" | "tel-extension" | "tel-local-prefix" | "tel-local-suffix" | "tel-local" | "tel-national" | `${AutocompleteAddressGroup} tel` | `${AutocompleteAddressGroup} tel-area-code` | `${AutocompleteAddressGroup} tel-country-code` | `${AutocompleteAddressGroup} tel-extension` | `${AutocompleteAddressGroup} tel-local-prefix` | `${AutocompleteAddressGroup} tel-local-suffix` | `${AutocompleteAddressGroup} tel-local` | `${AutocompleteAddressGroup} tel-national`>;
interface PhoneFieldProps$1 extends GlobalProps, BaseTextFieldProps, Pick<FieldDecorationProps, "accessory">, AutocompleteProps<PhoneAutocompleteField> {
	/**
	 * The type of phone number to collect. Specific styling may be applied to each type to provide extra guidance to users. No additional validation is performed based on the type.
	 *
	 * Styling hint for the input keyboard. Doesn't validate the phone number format. Implement validation in your extension and use the `error` prop to show results.
	 *
	 * @default ''
	 */
	type?: "mobile" | "";
}
interface ConsentPhoneFieldProps$1 extends GlobalProps, PhoneFieldProps$1 {
	/**
	 * The policy for which user consent is being collected.
	 *
	 * Only `sms-marketing` is supported.
	 */
	policy?: ConsentPolicy;
}
interface DatePickerProps$1 extends GlobalProps, InputProps, FocusEventProps {
	/**
	 * Default month to display in `YYYY-MM` format.
	 *
	 * This value is used until `view` is set, either directly or as a result of user interaction.
	 *
	 * Defaults to the current month in the user's locale.
	 */
	defaultView?: string;
	/**
	 * Displayed month in `YYYY-MM` format.
	 *
	 * `onViewChange` is called when this value changes.
	 *
	 * Defaults to `defaultView`.
	 */
	view?: string;
	/**
	 * Called whenever the month to display changes.
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
	type?: "single" | "multiple" | "range";
	/**
	 * Restricts which dates the user can select. Accepts a comma-separated list of dates and date ranges. Whitespace is allowed after commas.
	 *
	 * The default `''` allows all dates.
	 *
	 * - Dates in `YYYY-MM-DD` format allow a single date.
	 * - Dates in `YYYY-MM` format allow a whole month.
	 * - Dates in `YYYY` format allow a whole year.
	 * - Ranges are expressed as `start--end`.
	 *     - Ranges are inclusive.
	 *     - If either `start` or `end` is omitted, the range is unbounded in that direction.
	 *     - If parts of the date are omitted for `start`, they are assumed to be the minimum possible value.
	 *       So `2024--` is equivalent to `2024-01-01--`.
	 *     - If parts of the date are omitted for `end`, they are assumed to be the maximum possible value.
	 *       So `--2024` is equivalent to `--2024-12-31`.
	 *     - Whitespace is allowed either side of `--`.
	 *
	 * Comma-separated list of allowed dates in `YYYY-MM-DD` format.
	 *
	 * @default ""
	 *
	 * @example
	 * `2024-02--2025` // allow any date from February 2024 to the end of 2025
	 * `2024-02--` // allow any date from February 2024 to the end of the month
	 * `2024-05-09, 2024-05-11` // allow only the 9th and 11th of May 2024
	 */
	allow?: string;
	/**
	 * Dates that cannot be selected. These subtract from `allow`.
	 *
	 * A comma-separated list of dates, date ranges. Whitespace is allowed after commas.
	 *
	 * The default `''` has no effect on `allow`.
	 *
	 * - Dates in `YYYY-MM-DD` format disallow a single date.
	 * - Dates in `YYYY-MM` format disallow a whole month.
	 * - Dates in `YYYY` format disallow a whole year.
	 * - Ranges are expressed as `start--end`.
	 *     - Ranges are inclusive.
	 *     - If either `start` or `end` is omitted, the range is unbounded in that direction.
	 *     - If parts of the date are omitted for `start`, they are assumed to be the minimum possible value.
	 *       So `2024--` is equivalent to `2024-01-01--`.
	 *     - If parts of the date are omitted for `end`, they are assumed to be the maximum possible value.
	 *       So `--2024` is equivalent to `--2024-12-31`.
	 *     - Whitespace is allowed either side of `--`.
	 *
	 * Comma-separated list of disallowed dates in `YYYY-MM-DD` format.
	 *
	 * @default ""
	 *
	 * @example
	 * `--2024-02` // disallow any date before February 2024
	 * `2024-05-09, 2024-05-11` // disallow the 9th and 11th of May 2024
	 */
	disallow?: string;
	/**
	 * Restricts which days of the week the user can select. Only dates that fall on an allowed day AND pass the `allow`/`disallow` filters are selectable. For example, setting `allowedDays` to `'mon, wed, fri'` with `allow` set to `'2024-06'` restricts selection to Mondays, Wednesdays, and Fridays in June 2024.
	 *
	 * A comma-separated list of days. Whitespace is allowed after commas.
	 *
	 * The default `''` has no effect on the result of `allow` and `disallow`.
	 *
	 * Days are `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`.
	 *
	 * @default ""
	 *
	 * @example
	 * 'saturday, sunday' // allow only weekends within the result of `allow` and `disallow`.
	 */
	allowDays?: string;
	/**
	 * Days of the week that cannot be selected. This subtracts from `allowDays`, and intersects with the result of `allow` and `disallow`.
	 *
	 * A comma-separated list of days. Whitespace is allowed after commas.
	 *
	 * The default `''` has no effect on `allowDays`.
	 *
	 * Days are `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`.
	 *
	 * @default ""
	 *
	 * @example
	 * 'saturday, sunday' // disallow weekends within the result of `allow` and `disallow`.
	 */
	disallowDays?: string;
	/**
	 * Default selected value.
	 *
	 * The default means no date is selected.
	 *
	 * If the provided value is invalid, no date is selected.
	 *
	 * - If `type="single"`, this is a date in `YYYY-MM-DD` format.
	 * - If `type="multiple"`, this is a comma-separated list of dates in `YYYY-MM-DD` format.
	 * - If `type="range"`, this is a range in `YYYY-MM-DD--YYYY-MM-DD` format. The range is inclusive.
	 *
	 * @default ""
	 */
	defaultValue?: string;
	/**
	 * Current selected value.
	 *
	 * The default means no date is selected.
	 *
	 * If the provided value is invalid, no date is selected.
	 *
	 * Otherwise:
	 *
	 * - If `type="single"`, this is a date in `YYYY-MM-DD` format.
	 * - If `type="multiple"`, this is a comma-separated list of dates in `YYYY-MM-DD` format.
	 * - If `type="range"`, this is a range in `YYYY-MM-DD--YYYY-MM-DD` format. The range is inclusive.
	 *
	 * Single dates use ISO 8601 format (`YYYY-MM-DD`); ranges use `YYYY-MM-DD--YYYY-MM-DD`. Locale-specific formats aren't supported.
	 *
	 * @default ""
	 */
	value?: string;
	/**
	 * Callback when any date is selected. Will fire before `onChange`.
	 */
	onInput?: (event: Event) => void;
	/**
	 * Callback when the `value` is changed. For `type="single"` and `type="multiple"`, this is the same as `onInput`.
	 *      For `type="range"`, this is only called when the range is completed by selecting the end date of the range.
	 */
	onChange?: (event: Event) => void;
}
interface DateFieldProps$1 extends GlobalProps, BaseTextFieldProps, Pick<DatePickerProps$1, "view" | "defaultView" | "value" | "defaultValue" | "allow" | "disallow" | "allowDays" | "disallowDays" | "onViewChange">, AutocompleteProps<DateAutocompleteField> {
	/**
	 * Callback when the field has an invalid date.
	 * This callback will be called, if the date typed is invalid or disabled.
	 *
	 * Dates that don’t exist or have formatting errors are considered invalid. Some examples of invalid dates are:
	 * - 2021-02-31: February doesn’t have 31 days
	 * - 2021-02-00: The day can’t be 00
	 *
	 * Disallowed dates are considered invalid.
	 *
	 * This callback fires only when the user finishes editing the date, right after the `change` callback.
	 * The field isn't validated on every change to the input. Once the user has finished editing the field (typically by blurring it), the field is validated and the callback fires if the value is invalid.
	 */
	onInvalid?: (event: Event) => void;
}
export type DateAutocompleteField = ExtractStrict<AnyAutocompleteField, "bday" | "bday-day" | "bday-month" | "bday-year" | "cc-expiry" | "cc-expiry-month" | "cc-expiry-year">;
interface DetailsProps$1 extends GlobalProps, ToggleEventProps {
	/**
	 * The content displayed within the details component, which creates a collapsible disclosure widget.
	 *
	 * Learn more about the [details element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details).
	 */
	children?: ComponentChildren;
	/**
	 * The `name` attribute for the element. Use this to create multiple named disclosure groups where only one can be open at a time.
	 *
	 * Learn more about [multiple named disclosure boxes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#multiple_named_disclosure_boxes).
	 */
	name?: string;
	/**
	 * Whether the element is currently open and showing its content. Use this for controlled behavior where you manage the open state yourself.
	 *
	 * @default false
	 */
	open?: boolean;
	/**
	 * Whether the element should be open when it first renders. Use this for uncontrolled behavior where the component manages its own open state after the initial render.
	 *
	 * @default false
	 */
	defaultOpen?: boolean;
	/**
	 * Sets the animation transition between the open and closed states.
	 *
	 * - `none`: Disables all transition animations.
	 * - `auto`: Uses the default transition animation.
	 *
	 * @default 'auto'
	 */
	toggleTransition?: "none" | "auto";
}
interface DividerProps$1 extends GlobalProps {
	/**
	 * The orientation of the divider, using [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values).
	 *
	 * - `inline`: A horizontal divider that separates content stacked vertically.
	 * - `block`: A vertical divider that separates content arranged horizontally.
	 *
	 * @default 'inline'
	 */
	direction?: "inline" | "block";
	/**
	 * The visual emphasis of the divider's color.
	 *
	 * - `subdued`: A lighter divider for subtle separation.
	 * - `base`: The standard divider color for most contexts.
	 * - `strong`: A darker divider for stronger visual separation.
	 *
	 * @default 'base'
	 */
	color?: ColorKeyword;
}
interface DropZoneProps$1 extends GlobalProps, FileInputProps, BasicFieldProps {
	/**
	 * A string representing the types of files that are accepted by the drop zone.
	 * This string is a comma-separated list of unique file type specifiers which can be one of the following:
	 * - A file extension starting with a period (".") character (such as .jpg, .pdf, .doc)
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
/**
 * Doesn't perform automatic format validation. Implement validation logic yourself and use the `error` prop to display results.
 */
interface EmailFieldProps$1 extends GlobalProps, BaseTextFieldProps, MinMaxLengthProps, AutocompleteProps<EmailAutocompleteField> {
}
export type EmailAutocompleteField = ExtractStrict<AnyAutocompleteField, "email" | `${AutocompleteAddressGroup} email`>;
interface FormProps$1 extends GlobalProps {
	/**
	 * The content of the form.
	 */
	children?: ComponentChildren;
	/**
	 * Whether the form is able to be submitted.
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
	 * A callback that is run when the form is submitted.
	 *
	 * Use `event.waitUntil` to signal how long it takes to save the data,
	 * and whether it was successful or not.
	 */
	onSubmit?: (event: ExtendableEvent) => void;
	/**
	 * A callback that is run when the form is reset.
	 */
	onReset?: (event: Event) => void;
}
/**
 * The amount of space between child elements.
 *
 * - `none`: No spacing.
 * - `small-500`: The smallest spacing.
 * - `small-400` / `small-300` / `small-200` / `small-100` / `small`: Progressively larger small spacings.
 * - `base`: The standard spacing for most use cases.
 * - `large` / `large-100` / `large-200` / `large-300` / `large-400` / `large-500`: Progressively larger spacings.
 */
export type SpacingKeyword = SizeKeyword | "none";
export interface GapProps {
	/**
	 * The spacing between child elements. A single value applies to both the inline and block axes. A pair of space-separated values (for example, `large-100 large-500`) sets the inline and block axes independently.
	 *
	 * @default 'none'
	 */
	gap?: MaybeResponsive<MaybeTwoValuesShorthandProperty<SpacingKeyword>>;
	/**
	 * The spacing between child elements along the block axis (vertical in horizontal writing modes). Overrides the block-axis value set by `gap`.
	 *
	 * @default '' - meaning no override
	 */
	rowGap?: MaybeResponsive<SpacingKeyword | "">;
	/**
	 * The spacing between child elements along the inline axis (horizontal in horizontal writing modes). Overrides the inline-axis value set by `gap`.
	 *
	 * @default '' - meaning no override
	 */
	columnGap?: MaybeResponsive<SpacingKeyword | "">;
}
export type BaselinePosition = "baseline" | "first baseline" | "last baseline";
export type ContentDistribution = "space-between" | "space-around" | "space-evenly" | "stretch";
export type ContentPosition = "center" | "start" | "end";
export type OverflowPosition = `unsafe ${ContentPosition}` | `safe ${ContentPosition}`;
/**
 * Controls the default inline-axis alignment for all items within a container. Learn more about [`justify-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items).
 */
export type JustifyItemsKeyword = "normal" | "stretch" | BaselinePosition | OverflowPosition | ContentPosition;
/**
 * Controls how all direct children are aligned along the cross axis. Learn more about [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
 */
export type AlignItemsKeyword = "normal" | "stretch" | BaselinePosition | OverflowPosition | ContentPosition;
/**
 * Controls how space is distributed between and around content items along the main axis of a flex container or the inline axis of a grid container. Learn more about [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
 */
export type JustifyContentKeyword = "normal" | ContentDistribution | OverflowPosition | ContentPosition;
/**
 * Controls the distribution of space between and around content items along the cross axis of a flex container or the block axis of a grid container. Learn more about [`align-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
 */
export type AlignContentKeyword = "normal" | BaselinePosition | ContentDistribution | OverflowPosition | ContentPosition;
interface GridProps$1 extends GlobalProps, BaseBoxPropsWithRole, GapProps {
	/**
	 * Defines the number and size of columns in the grid. Accepts any valid CSS [`grid-template-columns`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) value, such as `"1fr 2fr"` or `"repeat(3, 1fr)"`.
	 *
	 * @default 'none'
	 */
	gridTemplateColumns?: MaybeResponsive<string>;
	/**
	 * Defines the number and size of rows in the grid. Accepts any valid CSS [`grid-template-rows`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows) value, such as `"auto 1fr"` or `"repeat(2, 100px)"`.
	 *
	 * @default 'none'
	 */
	gridTemplateRows?: MaybeResponsive<string>;
	/**
	 * Aligns grid items along the inline (row) axis. Overrides the inline value of `placeItems`. Learn more about [`justify-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items).
	 *
	 * @default '' - meaning no override
	 */
	justifyItems?: MaybeResponsive<JustifyItemsKeyword | "">;
	/**
	 * Aligns grid items along the block (column) axis. Overrides the block value of `placeItems`. Learn more about [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
	 *
	 * @default '' - meaning no override
	 */
	alignItems?: MaybeResponsive<AlignItemsKeyword | "">;
	/**
	 * A shorthand for `justifyItems` and `alignItems` that sets both alignment axes at once. Learn more about [`place-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/place-items).
	 *
	 * @default 'normal normal'
	 */
	placeItems?: MaybeResponsive<`${AlignItemsKeyword} ${JustifyItemsKeyword}` | AlignItemsKeyword>;
	/**
	 * Controls how the grid's columns are distributed along the inline (row) axis when there is extra space. Overrides the inline value of `placeContent`. Learn more about [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
	 *
	 * @default '' - meaning no override
	 */
	justifyContent?: MaybeResponsive<JustifyContentKeyword | "">;
	/**
	 * Controls how the grid's rows are distributed along the block (column) axis when there is extra space. Overrides the block value of `placeContent`. Learn more about [`align-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
	 *
	 * @default '' - meaning no override
	 */
	alignContent?: MaybeResponsive<AlignContentKeyword | "">;
	/**
	 * A shorthand for `justifyContent` and `alignContent` that sets both distribution axes at once. Learn more about [`place-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/place-content).
	 *
	 * @default 'normal normal'
	 */
	placeContent?: MaybeResponsive<`${AlignContentKeyword} ${JustifyContentKeyword}` | AlignContentKeyword>;
}
interface GridItemProps$1 extends GlobalProps, BaseBoxPropsWithRole {
	/**
	 * The number of columns this item spans within the grid. Set to `auto` to let the grid determine placement automatically, or use `span {number}` to span a specific number of columns. Learn more about [`grid-column`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column).
	 *
	 * @default 'auto'
	 */
	gridColumn?: `span ${number}` | "auto";
	/**
	 * The number of rows this item spans within the grid. Set to `auto` to let the grid determine placement automatically, or use `span {number}` to span a specific number of rows. Learn more about [`grid-row`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row).
	 *
	 * @default 'auto'
	 */
	gridRow?: `span ${number}` | "auto";
}
export interface BaseTypographyProps {
	/**
	 * The color emphasis level that controls visual intensity.
	 *
	 * - `subdued`: Deemphasized color for secondary text, supporting labels, and less critical interface elements.
	 * - `base`: Primary color for body text, standard UI elements, and general content with good readability.
	 * - `strong`: Higher-contrast color for text that needs more emphasis than `base`.
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
	 * The rendering style for numbers in the font.
	 *
	 * - `auto`: Inherits the setting from the parent element.
	 * - `normal`: Uses the font's default numeric glyphs.
	 * - `tabular-nums`: Uses fixed-width numeric glyphs, ensuring numbers align vertically in tables or lists.
	 *
	 * Learn more about the [font-variant-numeric property](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric).
	 *
	 * @default 'auto'
	 */
	fontVariantNumeric?: "auto" | "normal" | "tabular-nums";
	/**
	 * The language of the text content. Use this when the text is in a different language than the rest of the page, allowing assistive technologies such as screen readers to invoke the correct pronunciation.
	 *
	 * The value should be a valid language subtag from the [IANA language subtag registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).
	 *
	 * It is recommended to combine it with the `dir` attribute to ensure the text is rendered correctly if the surrounding content’s direction is different.
	 *
	 * @default ''
	 */
	lang?: string;
	/**
	 * Indicates the directionality of the element’s text.
	 *
	 * - `ltr`: The languages written from left to right (such as English).
	 * - `rtl`: The languages written from right to left (such as Arabic).
	 * - `auto`: The user agent determines the direction based on the content.
	 * - `""`: The direction is inherited from parent elements (equivalent to not setting the attribute).
	 *
	 * Learn more about the [dir attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir).
	 *
	 * @default ''
	 */
	dir?: "ltr" | "rtl" | "auto" | "";
}
export interface BlockTypographyProps {
	/**
	 * The maximum number of lines to display before truncating the text content.
	 *
	 * Learn more about the [-webkit-line-clamp property](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp).
	 *
	 * @default Infinity - no truncation is applied
	 */
	lineClamp?: number;
}
interface HeadingProps$1 extends GlobalProps, AccessibilityVisibilityProps, BlockTypographyProps {
	/**
	 * The heading text displayed within the heading component, which provides a title or section header for content.
	 */
	children?: ComponentChildren;
	/**
	 * The semantic meaning of the component’s content. When set,
	 * the role will be used by assistive technologies to help users
	 * navigate the page.
	 *
	 * - `presentation`: Removes semantic meaning, making the element purely decorative and ignored by screen readers.
	 * - `none`: Completely hides the element and its content from assistive technologies.
	 *
	 * @default 'heading'
	 *
	 * @implementation The `heading` role doesn't need to be applied if
	 * the host applies it for you; for example, an HTML host rendering
	 * an `<h2>` element should not apply the `heading` role.
	 */
	accessibilityRole?: "heading" | ExtractStrict<AccessibilityRole, "presentation" | "none">;
}
/**
 * The shared properties for the icon component. An icon displays a graphical symbol with configurable appearance, color, and semantic meaning.
 */
interface IconProps$1 extends GlobalProps, Pick<InteractionProps, "interestFor"> {
	/**
	 * The semantic meaning and color treatment of the icon.
	 *
	 * - `'info'`: Informational content or helpful tips.
	 * - `'auto'`: Automatically determined based on context.
	 * - `'neutral'`: General information without specific intent.
	 * - `'success'`: Positive outcomes or successful states.
	 * - `'warning'`: Important warnings about potential issues.
	 * - `'critical'`: Urgent problems or destructive actions.
	 * - `'custom'`: Inherits a custom color from its parent element's CSS.
	 *
	 * @default 'auto'
	 */
	tone?: ToneKeyword;
	/**
	 * The color intensity of the icon. Use `'subdued'` for less intense, or `'base'` for standard coloring.
	 *
	 * @default 'base'
	 */
	color?: ColorKeyword;
	/**
	 * The size of the icon.
	 *
	 * - `'base'`: Default size that works well for most use cases.
	 * - `'small'`: Small icon for inline use within text or compact UI elements.
	 * - `'small-200'`: Extra small icon for the most compact contexts.
	 * - `'small-100'`: Small icon suitable for tight or dense layouts.
	 * - `'large'`: Large icon for emphasis or prominent display.
	 * - `'large-100'`: Extra large icon for maximum visual impact.
	 *
	 * @default 'base'
	 */
	size?: SizeKeyword;
	/**
	 * The icon to display. Can be any icon name from the icon library or a custom string identifier.
	 */
	type?: IconType | AnyString;
}
/**
 * The shared base properties for image-based components. These properties are common to all components that display images, including the image and product thumbnail components. Properties include `alt` for accessibility text, `src` for the image URL, `sizes` for responsive sizing hints, and `srcSet` for multiple image sources.
 */
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
	 * Learn more about the [src attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src).
	 */
	src?: string;
	/**
	 * A set of image sources and their width or pixel density descriptors. Learn more about the [srcset attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset). This overrides the `src` property.
	 */
	srcSet?: string;
}
/**
 * The shared properties for the image component. An image displays pictures with configurable sizing, loading behavior, and borders.
 */
interface ImageProps$1 extends GlobalProps, BaseImageProps, BorderProps {
	/**
	 * Sets the semantic meaning of the image content. When set,
	 * the role will be used by assistive technologies to help users
	 * navigate the page.
	 *
	 * - `'img'`: Identifies the element as an image that conveys meaningful information to users.
	 * - `'none'`: Completely hides the element and its content from assistive technologies.
	 * - `'presentation'`: Removes semantic meaning, making the image purely decorative and ignored by screen readers.
	 *
	 * @default 'img'
	 */
	accessibilityRole?: "img" | ExtractStrict<AccessibilityRole, "presentation" | "none">;
	/**
	 * The inline width (horizontal size) of the image.
	 *
	 * - `'fill'`: The image takes up 100% of the available inline space.
	 * - `'auto'`: The image is displayed at its natural size.
	 *
	 * Learn more about the [width attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#width).
	 *
	 * @default 'fill'
	 */
	inlineSize?: "fill" | "auto";
	/**
	 * The aspect ratio of the image.
	 *
	 * The rendering of the image will depend on the `inlineSize` value:
	 *
	 * - `inlineSize="fill"`: the aspect ratio will be respected and the image will take the necessary space.
	 * - `inlineSize="auto"`: the image will not render until it has loaded and the aspect ratio will be ignored.
	 *
	 * Learn more about the [aspect-ratio property](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio).
	 *
	 * @default '1/1'
	 */
	aspectRatio?: `${number}${optionalSpace}/${optionalSpace}${number}` | `${number}`;
	/**
	 * How the image should be resized to fit its container. The image is positioned in the center of the container. Learn more about the [object-fit property](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
	 *
	 * - `'contain'`: Fits the entire image within the container, preserving aspect ratio. May leave empty space.
	 * - `'cover'`: Fills the container while preserving aspect ratio, cropping the image if needed.
	 *
	 * @default 'contain'
	 */
	objectFit?: "contain" | "cover";
	/**
	 * Determines the loading behavior of the image:
	 * - `'eager'`: Immediately loads the image, irrespective of its position within the visible viewport.
	 * - `'lazy'`: Delays loading the image until it approaches a specified distance from the viewport.
	 *
	 * Learn more about the [loading attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading).
	 *
	 * @default 'eager'
	 */
	loading?: "eager" | "lazy";
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
	 * The semantic meaning and color treatment of the link.
	 *
	 * - `'auto'`: Automatically determined based on context.
	 * - `'neutral'`: Removes the default link color, inheriting the surrounding text style.
	 *
	 * @default 'auto'
	 */
	tone?: ToneKeyword;
	/**
	 * A label that describes the purpose or content of the link for users of assistive technologies such as screen readers.
	 */
	accessibilityLabel?: string;
	/**
	 * The language of the link's text content. Use this when the link text is in a different language than the rest of the page.
	 */
	lang?: string;
}
interface ListItemProps$1 extends GlobalProps {
	/**
	 * The content displayed within the list item, which represents a single entry in an ordered or unordered list.
	 */
	children?: ComponentChildren;
}
interface MapProps$1 extends GlobalProps, SizingProps {
	/**
	 * A valid API key for the map service provider. This key is required to load and render the map tiles. Obtain a key from a supported provider such as [Google Maps Platform](https://developers.google.com/maps/documentation/javascript/get-api-key).
	 */
	apiKey?: string;
	/**
	 * The latitude of the map's center point, in degrees. Valid values range from -90 (South Pole) to 90 (North Pole).
	 *
	 * @default 0
	 */
	latitude?: number;
	/**
	 * The longitude of the map's center point, in degrees. Valid values range from -180 (west) to 180 (east).
	 *
	 * @default 0
	 */
	longitude?: number;
	/**
	 * A label that describes the purpose or contents of the map for accessibility. When set, it will be announced to users using assistive technologies such as screen readers, providing context about what the map displays.
	 */
	accessibilityLabel?: string;
	/**
	 * The initial zoom level of the map. Valid values are numbers from 0 (fully zoomed out, world view) to 18 (fully zoomed in, street level).
	 *
	 * @default 4
	 */
	zoom?: number;
	/**
	 * The maximum zoom level the user can reach on the map. Valid values are numbers from 0 (world view) to 18 (street level). Use this to prevent users from zooming in beyond a useful level of detail.
	 *
	 * @default 18
	 */
	maxZoom?: number;
	/**
	 * The minimum zoom level the user can reach on the map. Valid values are numbers from 0 (world view) to 18 (street level). Use this to prevent users from zooming out beyond a useful level of context.
	 *
	 * @default 0
	 */
	minZoom?: number;
	/**
	 * A callback fired when the visible map boundaries change, such as after a pan or zoom completes.
	 */
	onBoundsChange?: (event: MapBoundsChangeEvent) => void;
	/**
	 * A callback fired when the map view changes, such as when the user pans or zooms. Provides the new center location and zoom level.
	 */
	onViewChange?: (event: MapViewChangeEvent) => void;
	/**
	 * A callback fired when the user clicks on the map. Provides the geographic location of the click.
	 */
	onClick?: (event: MapClickEvent) => void;
	/**
	 * A callback fired when the user double-clicks on the map. Provides the geographic location of the double-click.
	 */
	onDblClick?: (event: MapDblClickEvent) => void;
}
/**
 * A geographic coordinate pair representing a location on the map, defined by latitude and longitude values.
 */
interface Location$1 {
	/**
	 * The latitude of the location in degrees. Valid values range from -90 (South Pole) to 90 (North Pole).
	 */
	latitude?: number;
	/**
	 * The longitude of the location in degrees. Valid values range from -180 (west) to 180 (east).
	 */
	longitude?: number;
}
/**
 * The geographic boundaries of a visible map area, defined by its north-east and south-west corners. Used by `MapBoundsChangeEvent` to report the currently visible map region.
 */
export interface Bounds {
	/**
	 * The north-east corner of the bounded area, representing the top-right of the visible map region.
	 */
	northEast?: Location$1;
	/**
	 * The south-west corner of the bounded area, representing the bottom-left of the visible map region.
	 */
	southWest?: Location$1;
}
/**
 * The event data provided when the map view changes, such as after the user pans or zooms. Contains the new center location and zoom level.
 */
export interface MapViewChangeEvent extends Event {
	/**
	 * The geographic location of the new map center after the view change.
	 */
	location?: Location$1;
	/**
	 * The current zoom level of the map after the view change, as a number from 0 (world view) to 18 (street level).
	 */
	zoom?: number;
}
/**
 * The event data provided when the visible map boundaries change, such as after a pan or zoom completes. Contains the new geographic bounds of the visible area.
 */
export interface MapBoundsChangeEvent extends Event {
	/**
	 * The geographic boundaries of the currently visible map area, defined by its north-east and south-west corners.
	 */
	bounds?: Bounds;
}
/**
 * The event data provided when the user clicks on the map. Contains the geographic location of the click.
 */
export interface MapClickEvent extends Event {
	/**
	 * The geographic location on the map where the click occurred, as a latitude/longitude coordinate pair.
	 */
	location?: Location$1;
}
/**
 * The event data provided when the user double-clicks on the map. Contains the geographic location of the double-click.
 */
export interface MapDblClickEvent extends Event {
	/**
	 * The geographic location on the map where the double-click occurred, as a latitude/longitude coordinate pair.
	 */
	location?: Location$1;
}
interface MapMarkerProps$1 extends GlobalProps, InteractionProps, Pick<SizingProps, "blockSize" | "inlineSize"> {
	/**
	 * The latitude of the marker’s position in degrees. Valid values range from -90 (South Pole) to 90 (North Pole).
	 *
	 * @default 0
	 */
	latitude?: number;
	/**
	 * The longitude of the marker’s position in degrees. Valid values range from -180 (west) to 180 (east).
	 *
	 * @default 0
	 */
	longitude?: number;
	/**
	 * A label that describes the purpose or location of the marker for accessibility. When set, it will be announced to users using assistive technologies such as screen readers, providing context about what the marker represents.
	 */
	accessibilityLabel?: string;
	/**
	 * Whether the marker can be grouped into clusters when the map is zoomed out. Clustering helps reduce visual clutter when many markers are close together at low zoom levels.
	 *
	 * @default false
	 */
	clusterable?: boolean;
	/**
	 * A custom graphic element to use as the marker. If not provided, the map provider’s default marker pin is displayed.
	 */
	graphic?: ComponentChildren;
	/**
	 * A callback fired when the user clicks on the marker. This event does not propagate to the parent map — only the marker receives the click.
	 */
	onClick?: (event: Event) => void;
}
interface ModalProps$1 extends GlobalProps, BaseOverlayProps, BaseOverlayMethods, ActionSlots {
	/**
	 * A label that describes the purpose of the modal, announced by assistive technologies. When set, screen readers will use this label instead of the `heading` to describe the modal.
	 */
	accessibilityLabel?: string;
	/**
	 * A title that describes the content of the modal.
	 */
	heading?: string;
	/**
	 * Adjust the padding around the modal content.
	 *
	 * - `base`: Applies padding that is appropriate for the element.
	 * - `none`: Removes all padding from the element. This can be useful when elements inside the modal need to span to the edge of the modal. For example, a full-width image. In this case, rely on box with a padding of `base` to bring back the desired padding for the rest of the content.
	 *
	 * @default 'base'
	 */
	padding?: "base" | "none";
	/**
	 * Adjust the size of the modal.
	 *
	 * `max`: Expands the modal to its maximum size as defined by the host application, on both the horizontal and vertical axes.
	 *
	 * @default 'base'
	 */
	size?: SizeKeyword | "max";
	/**
	 * The content of the modal.
	 */
	children?: ComponentChildren;
}
interface MoneyFieldProps$1 extends GlobalProps, BaseTextFieldProps, NumberConstraintsProps, AutocompleteProps<MoneyAutocompleteField> {
}
export type MoneyAutocompleteField = ExtractStrict<AnyAutocompleteField, "transaction-amount">;
interface NumberFieldProps$1 extends GlobalProps, BaseTextFieldProps, AutocompleteProps<NumberAutocompleteField>, NumberConstraintsProps, FieldDecorationProps {
	/**
	 * Sets the virtual keyboard layout for the field.
	 *
	 * - `'decimal'`: A numeric keyboard with a decimal point, suitable for decimal numbers.
	 * - `'numeric'`: A numeric keyboard without a decimal point, suitable for integers.
	 *
	 * Learn more about the [inputMode attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).
	 *
	 * @default 'decimal'
	 */
	inputMode?: "decimal" | "numeric";
}
export type NumberAutocompleteField = ExtractStrict<AnyAutocompleteField, "one-time-code" | "cc-number" | "cc-csc">;
interface OptionProps$1 extends GlobalProps, BaseOptionProps {
	/**
	 * The content to use as the label.
	 */
	children?: ComponentChildren;
}
interface OrderedListProps$1 extends GlobalProps {
}
interface ParagraphProps$1 extends GlobalProps, BaseTypographyProps, BlockTypographyProps, AccessibilityVisibilityProps {
	/**
	 * The paragraph text content displayed within the paragraph component, which presents a block of related text with appropriate styling.
	 */
	children?: ComponentChildren;
	/**
	 * The semantic type and styling treatment for the paragraph content.
	 *
	 * Other presentation properties on `s-paragraph` override the default styling.
	 *
	 * @default 'paragraph'
	 */
	type?: ParagraphType;
}
export type ParagraphType = 
/**
 * A semantic type that indicates the text is a structural grouping of related content.
 *
 * In an HTML host, the text will be rendered in an `<p>` element. Learn more about the [p element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p).
 */
"paragraph"
/**
 * A semantic type that indicates the text is considered less important than the main content, but is still necessary for the reader to understand.
 *
 * It can be used for secondary content but also for disclaimers, terms and conditions, or legal information.
 *
 * Surfaces should apply a smaller font size than the default size.
 *
 * In an HTML host, the text will be rendered in a `<small>` element. Learn more about the [small element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small).
 */
 | "small";
interface PasswordFieldProps$1 extends GlobalProps, BaseTextFieldProps, MinMaxLengthProps, AutocompleteProps<PasswordAutocompleteField> {
}
export type PasswordAutocompleteField = ExtractStrict<AnyAutocompleteField, "new-password" | "current-password">;
/**
 * The shared properties for the payment icon component. A payment icon displays a recognizable icon for a payment method, such as Visa, Mastercard, or PayPal.
 */
interface PaymentIconProps$1 extends GlobalProps {
	/**
	 * The payment method to display. Specify a payment method name from the available set (for example, `'visa'`, `'mastercard'`, or `'paypal'`), or use an empty string to show no icon.
	 *
	 * @default ''
	 */
	type?: PaymentIconName | AnyString;
	/**
	 * A label that describes the payment icon for accessibility. When set, it will be announced to users using assistive technologies such as screen readers, providing context about which payment method the icon represents.
	 */
	accessibilityLabel?: string;
}
/**
 * The recognized payment method identifiers used by the `PaymentIcon` component. Each value maps to a branded icon for a specific payment provider, card network, digital wallet, or buy-now-pay-later service. Pass one of these names as the `type` property of `PaymentIcon` to display the corresponding icon — for example, `"visa"`, `"apple-pay"`, or `"afterpay"`.
 */
export type PaymentIconName = "abn" | "acima-leasing" | "acuotaz" | "ada" | "addi" | "adyen" | "aeropay" | "affin-bank" | "affirm" | "aftee" | "afterpay-paynl-version" | "afterpay" | "airtel-money" | "airteltigo-mobile-money" | "aktia" | "akulaku-paylater" | "akulaku" | "alandsbanken" | "alfamart" | "alfamidi" | "alipay-hk" | "alipay-paynl-version" | "alipay" | "alliance-bank" | "alma" | "aman" | "amazon" | "ambank" | "american-express" | "amex" | "ansa-stored-value" | "ansa" | "anyday" | "apecoin" | "aplazo" | "apple-pay" | "aqsat" | "arbitrum" | "arhaus" | "arvato" | "ashley-plcc" | "ask" | "astrapay" | "atm-bersama" | "atobaraidotcom" | "atome" | "atone" | "atrato" | "au-kantan-kessai" | "au-pay" | "authorize-net" | "avalanche" | "axs" | "bancnet" | "banco-azteca" | "bancomat" | "bancontact" | "bangkok-bank" | "bank-islam" | "bank-muamalat" | "bank-rakyat" | "barclays" | "base" | "bbva-cie" | "bc-card" | "bca-klikpay" | "bca" | "bdo" | "belfius" | "benefit" | "best-buy-card" | "biercheque-paynl-version" | "bigc" | "billease" | "biller-paynl-version" | "billie" | "billink-method" | "billink" | "bitcoin-cash" | "bitcoin" | "bizum" | "blik" | "bnbchain" | "bni" | "bnp" | "bogus-app-coin" | "bogus" | "boleto" | "boodil" | "boost" | "bpi" | "braintree" | "bread-pay" | "bread" | "bri-direct-debit" | "bri" | "brimo" | "bsi" | "bsn" | "bss" | "busd" | "careem-pay" | "cartes-bancaires" | "cash-app-pay" | "cash" | "cashew" | "cashinvoice-latin-america" | "catch-payments" | "cebuana" | "cembrapay" | "centi" | "cetelem" | "checkout-finance" | "chinabank" | "cimb-clicks" | "cimb" | "circle-k" | "citadele" | "citi-pay" | "clave-telered" | "clearpay" | "clerq" | "cleverpay" | "clip" | "cliq" | "codensa" | "coinsph" | "collector-bank" | "coop" | "coppel-pay" | "credit-agricole" | "credit-key" | "creditclick-paynl-version" | "credix" | "cuotas" | "d-barai" | "dai" | "daily-yamazaki" | "dan-dan" | "dana" | "danamon-online" | "dankort" | "danske-bank" | "dappmx" | "dash" | "daviplata" | "de-cadeaukaart" | "depay" | "deutsche-bank" | "dinacard" | "diners-club" | "direct-bank-transfer-latin-america" | "directa24" | "directpay" | "discover" | "divido" | "dnb" | "docomo-barai" | "dogecoin" | "dropp" | "duitnow" | "duologi" | "dwolla" | "easywallet" | "ebucks" | "echelon-financing" | "ecpay" | "edenred" | "efecty" | "eft-secure" | "eftpos-au" | "eghl" | "elo" | "elv" | "empty" | "enets" | "eos" | "epayments" | "epospay" | "eps" | "erste" | "escrowcom" | "esr-paymentslip-switzerland" | "ethereum" | "etihad-guest-pay" | "etika" | "ewallet-indonesia" | "ewallet-philippines" | "ewallet-southkorea" | "facebook-pay" | "fairstone-payments" | "fam" | "familymart" | "fantom" | "farmlands" | "fashion-giftcard-paynlversion" | "fashioncheque" | "favepay" | "fawry" | "finloup" | "fintecture" | "fintoc" | "flexiti" | "float-payments" | "flying-blue-plus" | "forbrugsforeningen" | "forsa" | "fortiva" | "fps" | "fpx" | "freecharge" | "freedompay" | "futurepay-mytab" | "gcash" | "generalfinancing" | "generic" | "genoapay" | "gezondheidsbon-paynl-version" | "giftcard" | "giropay" | "givacard" | "glbe-paypal" | "glbe-plus" | "gmo-atokara" | "gmo-bank-transfer" | "gmo-postpay" | "gmo-virtualaccount" | "gnosis" | "google-pay" | "google-wallet" | "gopay" | "grabpay" | "grailpay" | "gusd" | "hana-card" | "handelsbanken" | "happy-pay" | "hello-clever" | "heylight" | "hitrustpay-transfer" | "home-credit" | "hong-leong-bank" | "hong-leong-connect" | "hsbc" | "huis-tuin-cadeau" | "humm" | "hyper" | "hypercard" | "hypercash" | "hyundai-card" | "ibexpay" | "ideal" | "in3-via-ideal" | "in3" | "inbank" | "indomaret" | "ing-homepay" | "interac" | "ivy" | "iwocapay-pay-later" | "jcb" | "jenius" | "jko" | "jousto" | "kakao-pay" | "kakebaraidotcom" | "kasikornbank" | "kasssh" | "katapult" | "kb-card" | "kbc-cbc" | "kcp-credit-card" | "kfast" | "khqr" | "klarna-pay-later" | "klarna-pay-now" | "klarna-slice-it" | "klarna" | "knaken-settle" | "knet" | "koalafi" | "koin" | "krediidipank" | "kredivo" | "krungsri" | "krungthai-bank" | "kueski-pay" | "kunst-en-cultuur-cadeaukaart" | "kuwait-finance-house" | "land-bank" | "laser" | "latitude-creditline-au" | "latitude-gem-au" | "latitude-gem-nz" | "latitude-go-au" | "latitudepay" | "lawson" | "laybuy-heart" | "laybuy" | "lbc" | "lhv" | "line-pay" | "linkaja" | "linkpay" | "litecoin" | "lku" | "lloyds" | "lotte-card" | "lpb" | "luminor" | "lunch-check" | "lydia" | "mach" | "mada" | "maestro" | "mandiri" | "mash" | "master" | "mastercard" | "masterpass" | "maxima" | "maya-bank" | "maya" | "maybank-qrpay" | "maybank" | "maybankm2u" | "mb-way" | "mb" | "mcash" | "medicinos-bankas" | "meeza" | "mercado-credito" | "mercado-pago" | "merpay" | "meta-pay" | "metro-bank" | "military-starcard" | "minicuotas" | "ministop" | "mobicred" | "mobikwik" | "mobilepay" | "mode" | "mokka" | "momopay" | "mondido" | "monero" | "monzo" | "mpesa" | "mtn-mobile-money" | "multisafepay" | "mybank" | "myfatoorah" | "n26" | "naps" | "nationale-bioscoopbon" | "nationale-entertainmentcard" | "natwest" | "naver-pay" | "nelo" | "nequi" | "netbanking" | "neteller" | "nh-card" | "nordea" | "notyd" | "novuna" | "npatobarai" | "npkakebarai" | "oca" | "ocbc-bank" | "octo-clicks" | "octopus" | "offline-bank-transfer-latin-america" | "ola-money" | "omannet" | "omasp" | "oney" | "online-banking" | "online-banktransfer" | "op" | "opay" | "openpay" | "optimism" | "orange-mobile-money" | "overstock-citicobrand" | "overstock-citiplcc" | "ovo" | "oxxo" | "ozow" | "pagoefectivo" | "paid" | "paidy" | "palawa" | "palawan" | "pastpay" | "pay-after-delivery-instalments" | "pay-by-bank-us" | "pay-by-bank" | "pay-easy" | "pay-pay" | "paybylink" | "paycash" | "payco" | "payconiq" | "payd" | "payfast-instant-eft" | "payflex" | "payid" | "payitmonthly" | "payjustnow" | "paymark-online-eftpos" | "paymaya" | "payme" | "paynow-mbank" | "paynow" | "payoo-qr" | "payoo" | "paypal" | "payplan" | "paypo" | "payrexx-bank-transfer" | "payright" | "paysafecard-paynl-version" | "paysafecard" | "paysafecash" | "paysera" | "paysquad" | "paytm" | "payto" | "paytomorrow" | "payu" | "payzapp" | "pei" | "perlasfinance" | "permata" | "pf-pay" | "pivo" | "pix" | "podium-cadeaukaart" | "pointspay" | "poli" | "polygon" | "poppankki" | "postfinance-card" | "postfinance-efinance" | "postpay" | "powered-by-ansa-stored-value" | "powered-by-ansa" | "powerpay" | "pps" | "prepaysolutions" | "progressive-leasing" | "przelew24" | "przelewy24-paynl-version" | "przelewy24" | "pse" | "public-bank" | "publicbank-pbe" | "qasitli" | "qliro" | "qr-promptpay" | "qris" | "qrph" | "rabbit-line-pay" | "rabobank" | "rakuten-pay" | "rapid-transfer" | "ratepay" | "raty-pekao" | "rcbc" | "rcs" | "reka" | "resolve-pay" | "revolut" | "rhb-bank" | "rhb-now" | "rietumu" | "riverty-paynl-version" | "riverty" | "rupay" | "saastopankki" | "sadad" | "sam" | "samsung-card" | "samsung-pay" | "santander" | "satisfi" | "satispay" | "sbpl" | "scalapay" | "scream-truck-wallet" | "scream-truck" | "seb" | "seicomart" | "sepa-bank-transfer" | "sepa-direct-debit" | "sequra" | "seven-eleven" | "sezzle" | "shib" | "shinhan-card" | "shop-pay" | "shopeepay" | "shopify-pay" | "siam-commercial" | "siauliu-bankas" | "siirto" | "sika-fsa" | "sika-hsa" | "sika" | "simpl" | "simple-pay" | "sinpe-movil" | "sistecredito" | "skeps" | "skrill-digital-wallet" | "slice-fnbo" | "smartpay" | "snap-checkout" | "snapmint" | "societe-generale" | "sofort" | "softbank" | "solana-pay-helio" | "solana-pay" | "solana" | "souhoola" | "spankki" | "sparkasse" | "spei" | "splitit" | "spotii" | "spraypay" | "standard-chartered" | "stc-pay" | "stoov" | "store-credit" | "stripe" | "sunkus" | "super-payments" | "svea-b2b-faktura" | "svea-b2b-invoice" | "svea-checkout" | "svea-credit-account" | "svea-delbetalning" | "svea-faktura" | "svea-invoice" | "svea-lasku" | "svea-ostukonto" | "svea-part-payment" | "svea-yrityslasku" | "sveaeramaksu" | "swedbank" | "swiftpay" | "swish" | "swissbilling" | "sympl" | "synchrony-pay" | "synchrony" | "tabby" | "tabit" | "taly" | "tamara" | "tandympayment" | "tasa-cero" | "tbi-bank" | "tcf" | "tendopay" | "tensile" | "tesco-lotus" | "thanachart-bank" | "timepayment" | "tiptop" | "todopay" | "toss" | "touch-n-go" | "tpay" | "trevipay" | "truelayer" | "truemoney-pay" | "trustly" | "twig-pay" | "twint" | "twoinvoice" | "uae-visa" | "uangme" | "ubp" | "underpay" | "unionpay" | "unipay" | "uob-ez-pay" | "uob-thai" | "uob" | "upi" | "urbo" | "urpay" | "usdc" | "usdp" | "v-pay" | "valu" | "venmo" | "ventipay" | "venus-plcc" | "viabill" | "vipps" | "visa-electron" | "visa" | "volksbank" | "volt" | "vvv-cadeaukaart-paynl-version" | "vvv-giftcard" | "waave-pay-by-bank" | "wallet" | "walley" | "wbtc" | "webshop-giftcard" | "wechat-pay" | "wechat-paynl-version" | "wegetfinancing" | "whish-checkout" | "whish-pay" | "wise" | "wissel" | "world-chain" | "xrp" | "yape" | "yappy" | "ymobile" | "younited-pay" | "zalopay" | "zapper" | "zingala" | "zinia" | "zip" | "zoodpay" | "zulily-credit-card" | "zustaina";
interface PopoverProps$1 extends GlobalProps, BaseOverlayProps, BaseOverlayMethods, ToggleEventProps, SizingProps {
	/**
	 * The content displayed within the popover, which appears in an overlay positioned relative to its trigger element.
	 */
	children?: ComponentChildren;
}
interface PressButtonProps$1 extends GlobalProps, Pick<ButtonProps$1, "accessibilityLabel" | "children" | "icon" | "inlineSize" | "lang" | "tone" | "variant" | "disabled" | "loading" | "onClick" | "onBlur" | "onFocus"> {
	/**
	 * Whether the button is pressed.
	 *
	 * @default false
	 */
	pressed?: boolean;
	/**
	 * Whether the button is pressed by default.
	 *
	 * @default false
	 *
	 * @implementation `defaultPressed` reflects to the `pressed` attribute.
	 */
	defaultPressed?: boolean;
}
/**
 * The shared properties for the product thumbnail component. A product thumbnail displays a small preview image representing a product. Properties include `src` for the image URL, `alt` for accessibility text, `size` for controlling the thumbnail dimensions, and `totalItems` for displaying a quantity badge.
 */
interface ProductThumbnailProps$1 extends GlobalProps, BaseImageProps {
	/**
	 * The total number of items that the product thumbnail represents. When this value exceeds 1, the component displays a badge showing the count, useful for representing bundled products or quantities.
	 */
	totalItems?: number;
	/**
	 * The size of the product thumbnail image.
	 *
	 * - `'base'`: Default size that works well in most contexts.
	 * - `'small'`: Small thumbnail, good for secondary contexts or tight layouts.
	 * - `'small-100'`: Extra small thumbnail for compact displays or dense lists.
	 *
	 * @default 'base'
	 */
	size?: SizeKeyword;
	/**
	 * A callback fired when the product thumbnail image loads successfully. Learn more about the [load event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload).
	 */
	onLoad?: (event: Event) => void;
	/**
	 * A callback fired when the product thumbnail image fails to load. Learn more about the [error event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror).
	 */
	onError?: (event: Event) => void;
}
interface ProgressProps$1 extends GlobalProps {
	/**
	 * A label announced by assistive technologies that describes what is progressing. Use this to provide context about the ongoing task, such as "Loading order details" or "Uploading file".
	 */
	accessibilityLabel?: string;
	/**
	 * The semantic meaning and color treatment of the progress indicator.
	 *
	 * @default 'auto'
	 */
	tone?: ToneKeyword;
	/**
	 * How much of the task has been completed. Must be a valid floating point number between `0` and `max`, or between `0` and `1` if `max` is omitted. When no value is set, the progress bar is indeterminate, indicating an ongoing activity with no estimated completion time.
	 *
	 * Learn more about the [value attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#value).
	 */
	value?: number;
	/**
	 * The total amount of work the task requires. Must be a value greater than `0` and a valid floating point number.
	 *
	 * Learn more about the [max attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#max).
	 *
	 * @default 1
	 */
	max?: number;
}
/**
 * The shared properties for the QR code component. A QR code generates and displays a scannable matrix barcode from a given string. Properties include `content` for the data to encode, `size` for display dimensions, `border` for visual framing, and `logo` for branding.
 */
interface QRCodeProps$1 extends GlobalProps {
	/**
	 * Whether to display a border around the QR code.
	 *
	 * - `'base'`: Applies a standard border to frame the QR code.
	 * - `'none'`: Removes the border for seamless integration with the surrounding layout.
	 *
	 * @default 'base'
	 */
	border?: "base" | "none";
	/**
	 * The content to be encoded in the QR code, such as a URL, email address, or plain text. When scanned, the user's device will process this content — typically by opening a URL in a browser or prompting an action based on the content type.
	 */
	content?: string;
	/**
	 * The displayed size of the QR code.
	 *
	 * - `'base'`: The QR code is displayed at its default fixed size.
	 * - `'fill'`: The QR code takes up 100% of the available inline size, useful for responsive layouts.
	 *
	 * @default 'base'
	 */
	size?: "base" | "fill";
	/**
	 * A label that describes the purpose or contents of the QR code for accessibility. When set, it will be announced to users using assistive technologies such as screen readers.
	 *
	 * @default 'QR code' (translated to the user's locale)
	 */
	accessibilityLabel?: string;
	/**
	 * A callback fired when the conversion of `content` to a QR code fails. This can happen when the content is too long or contains unsupported characters.
	 */
	onError?: (event: Event) => void;
	/**
	 * The URL of an image to display in the center of the QR code, typically used for branding. The image should be small enough not to interfere with the QR code's scannability.
	 */
	logo?: string;
}
interface QueryContainerProps$1 extends GlobalProps {
	/**
	 * The child elements to render inside the query container.
	 */
	children?: ComponentChildren;
	/**
	 * A custom name for the container, used in [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/container-name) to target this container specifically. The value is added alongside the default name `s-default`.
	 *
	 * @default ''
	 */
	containerName?: string;
}
/**
 * The overflow behavior for a scrollable container axis.
 *
 * - `auto`: Content that exceeds the container is clipped and becomes scrollable.
 * - `hidden`: Content that exceeds the container is clipped and not scrollable.
 */
export type OverflowKeyword = "auto" | "hidden";
interface ScrollBoxProps$1 extends GlobalProps, Omit<BaseBoxPropsWithRole, "overflow"> {
	/**
	 * The overflow behavior of the scroll box, controlling whether content that exceeds the container is scrollable or clipped. Learn more about [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow).
	 *
	 * - `hidden`: Content is clipped and the element is not scrollable in that axis.
	 * - `auto`: Content is clipped and becomes scrollable in that axis.
	 *
	 * Supports 1-to-2-value syntax using flow-relative axes. Two values are ordered as `block inline` (for example, `hidden auto` clips vertically and scrolls horizontally).
	 *
	 * @default 'auto'
	 */
	overflow?: OverflowKeyword | `${OverflowKeyword} ${OverflowKeyword}`;
}
interface SectionProps$1 extends GlobalProps, ActionSlots {
	/**
	 * The child elements to render inside the section, typically the main content area below the heading.
	 */
	children?: ComponentChildren;
	/**
	 * A label announced by assistive technologies that describes the purpose of the section. When no `heading` property is provided, you **must** set `accessibilityLabel` so screen readers can identify the section.
	 */
	accessibilityLabel?: string;
	/**
	 * The heading text displayed at the top of the section to summarize its content.
	 */
	heading?: string;
	/**
	 * The padding applied to all edges of the section.
	 *
	 * - `base`: Applies context-appropriate padding. In some contexts this may result in no visible padding.
	 * - `none`: Removes all padding, allowing child elements to span the full width of the section. Use a Box with `base` padding to restore spacing for individual content areas.
	 *
	 * @default 'base'
	 */
	padding?: "base" | "none";
}
interface SelectProps$1 extends GlobalProps, AutocompleteProps<AnyAutocompleteField>, Pick<FieldDecorationProps, "icon">, Omit<FieldProps, "defaultValue">, FocusEventProps {
	/**
	 * The options a user can select from.
	 *
	 * Accepts `Option` and `OptionGroup` components.
	 */
	children?: ComponentChildren;
}
interface SheetProps$1 extends BaseOverlayProps, BaseOverlayMethods, ToggleEventProps, GlobalProps, ActionSlots {
	/**
	 * A label that describes the purpose of the sheet, announced by assistive technologies. When set, screen readers will use this label instead of the `heading` to describe the sheet.
	 */
	accessibilityLabel?: string;
	/**
	 * The content of the sheet.
	 */
	children?: ComponentChildren;
	/**
	 * Whether the sheet should be open when it first renders. Use sparingly — only when the user must interact with the sheet before proceeding (for example, a privacy consent prompt). Only takes effect on the initial render.
	 *
	 * @default false
	 */
	defaultOpen?: boolean;
	/**
	 * A title that describes the content of the sheet.
	 */
	heading?: string;
	/**
	 * Adjust the padding of all edges.
	 *
	 * - `base`: Applies padding that is appropriate for the element. This might result in no padding if Shopify determines that is the right design decision for a particular context.
	 * - `none`: Removes all padding from the element. This can be useful when elements inside the sheet need to span to the edge of the sheet. For example, a full-width image. In this case, rely on box with a padding of `base` to bring back the desired padding for the rest of the content.
	 *
	 * @default 'base'
	 */
	padding?: "base" | "none";
}
interface SkeletonParagraphProps$1 extends GlobalProps {
	/**
	 * The content to be used as a base for the skeleton. This content will be hidden when the skeleton is visible.
	 *
	 * This can be useful when the skeleton is representing a known piece of content which is part of a larger
	 * element that has not yet fully loaded.
	 *
	 * @implementation When `content` is specified, the visual skeleton should be the size of the content. The element should
	 * still be a block layout.
	 *
	 * @default ''
	 */
	content?: string;
}
interface SpinnerProps$1 extends GlobalProps {
	/**
	 * The size of the spinner icon.
	 *
	 * @default 'base'
	 */
	size?: SizeKeyword;
	/**
	 * A label that describes the purpose of the spinner for assistive technologies like screen readers. Provide an `accessibilityLabel` when there is no visible text that conveys a loading state.
	 */
	accessibilityLabel?: string;
}
interface StackProps$1 extends GlobalProps, BaseBoxPropsWithRole, GapProps {
	/**
	 * The child elements to render inside the stack.
	 */
	children?: ComponentChildren;
	/**
	 * The axis along which child elements are arranged, using [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values).
	 *
	 * - `block`: Children are stacked vertically (in horizontal writing modes). Content does not wrap.
	 * - `inline`: Children are arranged horizontally (in horizontal writing modes). Content wraps when it overflows.
	 *
	 * @default 'block'
	 */
	direction?: MaybeResponsive<"block" | "inline">;
	/**
	 * Controls how child elements are distributed along the main axis. Learn more about [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
	 *
	 * @default 'normal'
	 */
	justifyContent?: MaybeResponsive<JustifyContentKeyword>;
	/**
	 * Controls how child elements are aligned along the cross axis. Learn more about [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
	 *
	 * @default 'normal'
	 */
	alignItems?: MaybeResponsive<AlignItemsKeyword>;
	/**
	 * Controls how lines of content are distributed along the cross axis when there is extra space. Learn more about [`align-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
	 *
	 * @default 'normal'
	 */
	alignContent?: MaybeResponsive<AlignContentKeyword>;
}
interface SummaryProps$1 extends GlobalProps {
	/**
	 * The content displayed as the clickable label of the disclosure widget. This label is always visible and users interact with it to toggle the details content open or closed.
	 *
	 * Interactive content is disallowed. For example, you can use an `s-text` element for extra formatting but
	 * elements like buttons and fields are not allowed.
	 *
	 * Learn more about the [summary element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary).
	 *
	 * @implementation Surfaces may apply styling to this element. An icon suggesting the state (open or closed) of the
	 * details element is recommended.
	 *
	 * @implementation Surface may decide to warn when interactive elements are used.
	 */
	children?: ComponentChildren;
}
interface SwitchProps$1 extends GlobalProps, BaseCheckableProps, BasicFieldProps, FieldDetailsProps, FieldErrorProps {
}
interface TextProps$1 extends GlobalProps, AccessibilityVisibilityProps, BaseTypographyProps, DisplayProps, Pick<InteractionProps, "interestFor"> {
	/**
	 * The text content displayed within the text component, which applies semantic meaning and styling appropriate to the specified text type.
	 */
	children?: ComponentChildren;
	/**
	 * The semantic type and styling treatment for the text content.
	 *
	 * Other presentation properties on `s-text` override the default styling.
	 *
	 * @default 'generic'
	 */
	type?: TextType;
}
export type TextType = 
/**
 * A semantic type that indicates the text is contact information. Typically used for addresses.
 *
 * This must have `inline` layout (despite the default being `block` in HTML hosts).
 *
 * Surfaces may apply styling to this type.
 *
 * In an HTML host, the text will be rendered in an `<address>` element.
 *
 * @implementation vertical alignment should be `baseline` (`vertical-align: baseline`)
 *
 * Learn more about the [address element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address).
 */
"address"
/**
 * A semantic type that indicates the text is no longer accurate or no longer relevant. One such use-case is discounted prices.
 *
 * Surfaces should apply styling to this type to suggest its content no longer applies.
 *
 * In an HTML host, the text will be rendered in a `<s>` element. Learn more about the [s element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s).
 */
 | "redundant"
/**
 * A semantic type that indicates the text is marked or highlighted and relevant to the user’s current action.
 * One such use-case is to indicate the characters that matched a search query.
 *
 * Surfaces should apply styling to this type to draw attention to the content.
 *
 * In an HTML host, the text will be rendered in a `<mark>` element. Learn more about the [mark element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark).
 */
 | "mark"
/**
 * A semantic type that indicates emphatic stress. Typically for words that have a stressed emphasis compared to surrounding text.
 *
 * Surfaces should apply styling to this type to distinguish it from surrounding text. Italicization is a common choice, but not required.
 *
 * In an HTML host, the text will be rendered in an `<em>` element. Learn more about the [em element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em).
 */
 | "emphasis"
/**
 * A semantic type that indicates an offset from the normal prose of the text.
 *
 * Typically used to indicate a foreign word, fictional character thoughts, or when the text refers to the definition of a word instead of representing its semantic meaning.
 *
 * Surfaces should italicize this content by default.
 *
 * In an HTML host, the text will be rendered in a `<i>` tag. Learn more about the [i element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i).
 */
 | "offset"
/**
 * A semantic type that indicates strong importance, seriousness, or urgency.
 *
 * Surfaces should render this content bold by default.
 *
 * In an HTML host, the text will be rendered in a `<strong>` tag. Learn more about the [strong element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong).
 */
 | "strong"
/**
 * A semantic type that indicates the text is considered less important than the main content, but is still necessary for the reader to understand.
 *
 * It can be used for secondary content but also for disclaimers, terms and conditions, or legal information.
 *
 * Surfaces should apply a smaller font size than the default size.
 *
 * In an HTML host, the text will be rendered in a `<small>` element. Learn more about the [small element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small).
 */
 | "small"
/**
 * No additional semantics or styling is applied.
 *
 * Surfaces must not apply any default styling to this type.
 *
 * In an HTML host, the text will be rendered in a `<span>` tag. Learn more about the [span element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span).
 */
 | "generic";
interface TextAreaProps$1 extends GlobalProps, BaseTextFieldProps, MinMaxLengthProps, AutocompleteProps<TextAutocompleteField> {
	/**
	 * A number of visible text lines.
	 *
	 * @default 2
	 */
	rows?: number;
}
interface TextFieldProps$1 extends GlobalProps, BaseTextFieldProps, MinMaxLengthProps, AutocompleteProps<TextAutocompleteField>, FieldDecorationProps {
}
interface TimeProps$1 extends GlobalProps {
	/**
	 * The text content displayed within the time component, representing a human-readable date or time value.
	 */
	children?: ComponentChildren;
	/**
	 * The machine-readable date and/or time value for the element. Use this to provide a datetime string that browsers, search engines, and assistive technologies can parse for improved semantics and functionality.
	 *
	 * The value must be a [valid datetime string](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time#valid_datetime_values), such as `2024-01-15`, `14:30`, or `2024-01-15T14:30:00`.
	 *
	 * @default ''
	 */
	dateTime?: string;
}
interface TooltipProps$1 extends GlobalProps {
	/**
	 * The text or elements displayed inside the tooltip popup.
	 */
	children?: ComponentChildren;
}
interface UnorderedListProps$1 extends GlobalProps {
}
export interface URLFieldProps extends GlobalProps, BaseTextFieldProps, MinMaxLengthProps, AutocompleteProps<URLAutocompleteField> {
}
export type URLAutocompleteField = ExtractStrict<AnyAutocompleteField, "url" | "photo" | "impp" | `${AutocompleteAddressGroup} impp`>;


