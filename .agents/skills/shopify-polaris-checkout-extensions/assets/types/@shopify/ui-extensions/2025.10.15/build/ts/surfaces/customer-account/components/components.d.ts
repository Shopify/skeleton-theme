/** VERSION: 0.0.0 **/
/* eslint-disable import-x/extensions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable line-comment-position */
/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable no-var */
/* eslint-disable import-x/namespace */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="DOM" />
/**
 * TODO: Update `any` type here after this is resolved
 * https://github.com/Shopify/ui-api-design/issues/139
 * @publicDocs
 */
export type ComponentChildren = any;
/** @publicDocs */
export type StringChildren = string;
/** @publicDocs */
export interface GlobalProps {
	/**
	 * A unique identifier for the element.
	 */
	id?: string;
}
interface AbbreviationProps$1 extends GlobalProps {
	/**
	 * The content of the abbreviation or acronym.
	 */
	children?: ComponentChildren;
	/**
	 * Defines the full expansion of the abbreviation or acronym.
	 *
	 * Helps user agents and users understand the meaning of the abbreviated text.
	 *
	 * @default ''
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr
	 */
	title?: string;
}
/** @publicDocs */
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
/** @publicDocs */
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
 * @publicDocs
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
/** @publicDocs */
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
/** @publicDocs */
export interface ToggleEventProps {
	/**
	 * A callback fired when the element state changes, after any toggle animations have finished.
	 *
	 * - If the element transitioned from hidden to showing, the `oldState` property will be set to `closed` and the
	 *   `newState` property will be set to `open`.
	 * - If the element transitioned from showing to hidden, the `oldState` property will be set to `open` and the
	 *   `newState` will be `closed`.
	 *
	 * Learn more about [`newState` property](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/newState) and [`oldState` property](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/oldState).
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
	 * Learn more about the [`toggle` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/toggle_event), [`newState` property](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/newState), and [`oldState` property](https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent/oldState).
	 */
	onToggle?: (event: ToggleEvent$1) => void;
}
/** @publicDocs */
export type ToggleState = "open" | "closed";
interface ToggleEvent$1 extends Event {
	readonly newState: ToggleState;
	readonly oldState: ToggleState;
}
/** @publicDocs */
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
	 * Callback fired when the announcement is dismissed by the user
	 * (either via the built-in dismiss button or programmatically).
	 */
	onDismiss?: (event: Event) => void;
	/**
	 * Method to programmatically dismiss the announcement.
	 */
	dismiss: () => void;
}
/**
 * The design system's size scale, used to control the dimensions of components like avatars, icons, and thumbnails. Values range from `"small-500"` (smallest) through `"base"` (standard) to `"large-500"` (largest). Not all components support every size — check the component's `size` property type for its available options.
 * @publicDocs
 */
export type SizeKeyword = "small-500" | "small-400" | "small-300" | "small-200" | "small-100" | "small" | "base" | "large" | "large-100" | "large-200" | "large-300" | "large-400" | "large-500";
/**
 * Defines the color intensity or emphasis level for text and UI elements.
 *
 * - `subdued`: Deemphasized color for secondary text, supporting labels, and less critical interface elements.
 * - `base`: Primary color for body text, standard UI elements, and general content with good readability.
 * - `strong`: Emphasized color for headings, key labels, and interactive elements that need prominence.
 * @publicDocs
 */
export type ColorKeyword = "subdued" | "base" | "strong";
/** @publicDocs */
export type BackgroundColorKeyword = "transparent" | ColorKeyword;
/** @publicDocs */
export interface BackgroundProps {
	/**
	 * Adjust the background of the element.
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
 * @publicDocs
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
/** @publicDocs */
export type IconType = (typeof privateIconArray)[number];
/**
 * Like `Extract`, but ensures that the extracted type is a strict subtype of the input type.
 * @publicDocs
 */
export type ExtractStrict<T, U extends T> = Extract<T, U>;
/**
 * Represents CSS shorthand properties that accept one to four values, following the [CSS shorthand syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box). Supports specifying values for all four sides: top, right, bottom, and left.
 *
 * - `T`: Single value that applies to all four sides.
 * - `${T} ${T}`: Two values for block axis (top/bottom) and inline axis (left/right).
 * - `${T} ${T} ${T}`: Three values for block-start (top), inline axis (left/right), and block-end (bottom).
 * - `${T} ${T} ${T} ${T}`: Four values for block-start (top), inline-end (right), block-end (bottom), and inline-start (left).
 * @publicDocs
 */
export type MaybeAllValuesShorthandProperty<T extends string> = T | `${T} ${T}` | `${T} ${T} ${T}` | `${T} ${T} ${T} ${T}`;
/**
 * Represents CSS shorthand properties that accept one or two values. Supports specifying the same value for both dimensions or different values.
 *
 * - `T`: Single value that applies to both dimensions.
 * - `${T} ${T}`: Two values for block axis (vertical) and inline axis (horizontal).
 * @publicDocs
 */
export type MaybeTwoValuesShorthandProperty<T extends string> = T | `${T} ${T}`;
/**
 * Makes a property responsive by allowing it to be set conditionally based on container query conditions. The value can be either a base value or a container query string.
 *
 * - `T`: Base value that applies in all conditions.
 * - `@container${string}`: Container query string for conditional responsive styling based on container size.
 * @publicDocs
 */
export type MaybeResponsive<T> = T | `@container${string}`;
/**
 * Prevents widening string literal types in a union to `string`.
 * @example
 * type PropName = 'foo' | 'bar' | string
 * //   ^? string
 * type PropName = 'foo' | 'bar' | (string & {})
 * //   ^? 'foo' | 'bar' | (string & {})
 * @publicDocs
 */
export type AnyString = string & {};
/**
 * This is purely to give the ability
 * to have a space or not in the string literal types.
 *
 * For example in the `aspectRatio` property, `16/9` and `16 / 9` are both valid.
 * @publicDocs
 */
export type optionalSpace = "" | " ";
interface BadgeProps$1 extends GlobalProps {
	/**
	 * The content of the Badge.
	 */
	children?: ComponentChildren;
	/**
	 * Sets the tone of the Badge, based on the intention of the information being conveyed.
	 *
	 * @default 'auto'
	 */
	tone?: ToneKeyword;
	/**
	 * Modify the color to be more or less intense.
	 *
	 * @default 'base'
	 */
	color?: ColorKeyword;
	/**
	 * The type of icon to be displayed in the badge.
	 *
	 * @default ''
	 */
	icon?: IconType | AnyString;
	/**
	 * The position of the icon in relation to the text.
	 */
	iconPosition?: "start" | "end";
	/**
	 * Adjusts the size.
	 *
	 * @default 'base'
	 */
	size?: SizeKeyword;
}
interface BannerProps$1 extends GlobalProps, ActionSlots {
	/**
	 * The title of the banner.
	 *
	 * @default ''
	 */
	heading?: string;
	/**
	 * The content of the Banner.
	 */
	children?: ComponentChildren;
	/**
	 * Sets the tone of the Banner, based on the intention of the information being conveyed.
	 *
	 * The banner is a live region and the type of status will be dictated by the Tone selected.
	 *
	 * - `critical` creates an [assertive live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role) that is announced by screen readers immediately.
	 * - `neutral`, `info`, `success`, `warning` and `caution` creates an [informative live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role) that is announced by screen readers after the current message.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
	 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role
	 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role
	 *
	 * @default 'auto'
	 */
	tone?: ToneKeyword;
	/**
	 * Makes the content collapsible.
	 * A collapsible banner will conceal child elements initially, but allow the user to expand the banner to see them.
	 *
	 * @default false
	 */
	collapsible?: boolean;
	/**
	 * Determines whether the close button of the banner is present.
	 *
	 * When the close button is pressed, the `dismiss` event will fire,
	 * then `hidden` will be true,
	 * any animation will complete,
	 * and the `afterhide` event will fire.
	 *
	 * @default false
	 */
	dismissible?: boolean;
	/**
	 * Event handler when the banner is dismissed by the user.
	 *
	 * This does not fire when setting `hidden` manually.
	 *
	 * The `hidden` property will be `false` when this event fires.
	 */
	onDismiss?: (event: Event) => void;
	/**
	 * Event handler when the banner has fully hidden.
	 *
	 * The `hidden` property will be `true` when this event fires.
	 *
	 * @implementation If implementations animate the hiding of the banner,
	 * this event must fire after the banner has fully hidden.
	 * We can add an `onHide` event in future if we want to provide a hook for the start of the animation.
	 */
	onAfterHide?: (event: Event) => void;
	/**
	 * Determines whether the banner is hidden.
	 *
	 * If this property is being set on each framework render (as in 'controlled' usage),
	 * and the banner is `dismissible`,
	 * ensure you update app state for this property when the `dismiss` event fires.
	 *
	 * If the banner is not `dismissible`, it can still be hidden by setting this property.
	 *
	 * @default false
	 */
	hidden?: boolean;
}
/** @publicDocs */
export interface DisplayProps {
	/**
	 * Sets the outer display type of the component. The outer type sets a component’s participation in [flow layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flow_layout).
	 *
	 * - `auto`: the component’s initial value. The actual value depends on the component and context.
	 * - `none`: hides the component from display and removes it from the accessibility tree, making it invisible to screen readers.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
	 * @default 'auto'
	 */
	display?: MaybeResponsive<"auto" | "none">;
}
/** @publicDocs */
export interface AccessibilityRoleProps {
	/**
	 * The semantic meaning of the component’s content. When set, assistive technologies use this role to help users navigate the page.
	 *
	 * @default 'generic'
	 */
	accessibilityRole?: AccessibilityRole;
}
/**
 * The semantic role of a component, used by assistive technologies to convey the element’s purpose to users. Each role maps to a specific HTML element or ARIA role.
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
 * @publicDocs
 */
export type AccessibilityRole =
/**
 * The primary content of the page. Learn more about the [`<main>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main).
 */
"main"
/**
 * A page or section header. Learn more about the [`<header>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header).
 */
 | "header"
/**
 * Information such as copyright, navigation links, and privacy statements. Learn more about the [`<footer>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer).
 */
 | "footer"
/**
 * A generic section that should have a heading or `accessibilityLabel`. Learn more about the [`<section>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section).
 */
 | "section"
/**
 * Supporting content related to the main content. Learn more about the [`<aside>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside).
 */
 | "aside"
/**
 * A major group of navigation links. Learn more about the [`<nav>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav).
 */
 | "navigation"
/**
 * A list of ordered items. Learn more about the [`<ol>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol).
 */
 | "ordered-list"
/**
 * An item inside a list. Learn more about the [`<li>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li).
 */
 | "list-item"
/**
 * A divider between list items. Learn more about the [`separator` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role).
 */
 | "list-item-separator"
/**
 * A list of unordered items. Learn more about the [`<ul>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul).
 */
 | "unordered-list"
/**
 * A divider that separates sections of content. Learn more about the [`separator` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role).
 */
 | "separator"
/**
 * A live region with advisory information that is not urgent. Learn more about the [`status` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role).
 */
 | "status"
/**
 * Important, usually time-sensitive information. Learn more about the [`alert` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role).
 */
 | "alert"
/**
 * A nameless container with no semantic meaning (renders a `<div>`). Learn more about the [`generic` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/generic_role).
 */
 | "generic"
/**
 * Strips semantic meaning while keeping visual styling. Synonym for `none`. Learn more about the [`presentation` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/presentation_role).
 */
 | "presentation"
/**
 * Strips semantic meaning while keeping visual styling. Synonym for `presentation`. Learn more about the [`none` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/none_role).
 */
 | "none";
/** @publicDocs */
export interface AccessibilityVisibilityProps {
	/**
	 * Changes the visibility of the element.
	 *
	 * - `visible`: the element is visible to all users.
	 * - `hidden`: the element is removed from the accessibility tree but remains visible.
	 * - `exclusive`: the element is visually hidden but remains in the accessibility tree.
	 *
	 * @default 'visible'
	 */
	accessibilityVisibility?: "visible" | "hidden" | "exclusive";
}
/** @publicDocs */
export interface LabelAccessibilityVisibilityProps {
	/**
	 * Changes the visibility of the component's label.
	 *
	 * - `visible`: the label is visible to all users.
	 * - `exclusive`: the label is visually hidden but remains in the accessibility tree.
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
 * @publicDocs
 */
export type PaddingKeyword = SizeKeyword | "none";
/** @publicDocs */
export interface PaddingProps {
	/**
	 * Adjust the padding of all edges.
	 *
	 * [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) is
	 * supported. Note that, contrary to the CSS, it uses flow-relative values and the order is:
	 *
	 * - 4 values: `block-start inline-end block-end inline-start`
	 * - 3 values: `block-start inline block-end`
	 * - 2 values: `block inline`
	 *
	 * For example:
	 * - `large` means block-start, inline-end, block-end and inline-start paddings are `large`.
	 * - `large none` means block-start and block-end paddings are `large`, inline-start and inline-end paddings are `none`.
	 * - `large none large` means block-start padding is `large`, inline-end padding is `none`, block-end padding is `large` and inline-start padding is `none`.
	 * - `large none large small` means block-start padding is `large`, inline-end padding is `none`, block-end padding is `large` and inline-start padding is `small`.
	 *
	 * A padding value of `auto` will use the default padding for the closest container that has had its usual padding removed.
	 *
	 * @default 'none'
	 */
	padding?: MaybeResponsive<MaybeAllValuesShorthandProperty<PaddingKeyword>>;
	/**
	 * Adjust the block-padding.
	 *
	 * - `large none` means block-start padding is `large`, block-end padding is `none`.
	 *
	 * This overrides the block value of `padding`.
	 *
	 * @default '' - meaning no override
	 */
	paddingBlock?: MaybeResponsive<MaybeTwoValuesShorthandProperty<PaddingKeyword> | "">;
	/**
	 * Adjust the block-start padding.
	 *
	 * This overrides the block-start value of `paddingBlock`.
	 *
	 * @default '' - meaning no override
	 */
	paddingBlockStart?: MaybeResponsive<PaddingKeyword | "">;
	/**
	 * Adjust the block-end padding.
	 *
	 * This overrides the block-end value of `paddingBlock`.
	 *
	 * @default '' - meaning no override
	 */
	paddingBlockEnd?: MaybeResponsive<PaddingKeyword | "">;
	/**
	 * Adjust the inline padding.
	 *
	 * - `large none` means inline-start padding is `large`, inline-end padding is `none`.
	 *
	 * This overrides the inline value of `padding`.
	 *
	 * @default '' - meaning no override
	 */
	paddingInline?: MaybeResponsive<MaybeTwoValuesShorthandProperty<PaddingKeyword> | "">;
	/**
	 * Adjust the inline-start padding.
	 *
	 * This overrides the inline-start value of `paddingInline`.
	 *
	 * @default '' - meaning no override
	 */
	paddingInlineStart?: MaybeResponsive<PaddingKeyword | "">;
	/**
	 * Adjust the inline-end padding.
	 *
	 * This overrides the inline-end value of `paddingInline`.
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
 * @publicDocs
 */
export type SizeUnits = `${number}px` | `${number}%` | `0`;
/**
 * Represents size values that can also be set to `auto` for automatic sizing.
 *
 * - `SizeUnits`: Specific size values in pixels, percentages, or zero for precise control.
 * - `auto`: Automatically sizes based on content and layout constraints. Learn more about the [auto value](https://developer.mozilla.org/en-US/docs/Web/CSS/width#auto).
 * @publicDocs
 */
export type SizeUnitsOrAuto = SizeUnits | "auto";
/**
 * Represents size values that can also be set to `none` to remove the size constraint.
 *
 * - `SizeUnits`: Specific size values in pixels, percentages, or zero for precise control.
 * - `none`: No size constraint, allowing unlimited growth. Learn more about the [none value](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width#none).
 * @publicDocs
 */
export type SizeUnitsOrNone = SizeUnits | "none";
/** @publicDocs */
export interface SizingProps {
	/**
	 * Adjust the block size.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/block-size
	 *
	 * @default 'auto'
	 */
	blockSize?: MaybeResponsive<SizeUnitsOrAuto>;
	/**
	 * Adjust the minimum block size.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size
	 *
	 * @default '0'
	 */
	minBlockSize?: MaybeResponsive<SizeUnits>;
	/**
	 * Adjust the maximum block size.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size
	 *
	 * @default 'none'
	 */
	maxBlockSize?: MaybeResponsive<SizeUnitsOrNone>;
	/**
	 * Adjust the inline size.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size
	 *
	 * @default 'auto'
	 */
	inlineSize?: MaybeResponsive<SizeUnitsOrAuto>;
	/**
	 * Adjust the minimum inline size.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size
	 *
	 * @default '0'
	 */
	minInlineSize?: MaybeResponsive<SizeUnits>;
	/**
	 * Adjust the maximum inline size.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/max-inline-size
	 *
	 * @default 'none'
	 */
	maxInlineSize?: MaybeResponsive<SizeUnitsOrNone>;
}
/**
 * The visual style of a border. Learn more about [border-style](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style).
 *
 * - `none`: No border is rendered.
 * - `solid`: A single continuous line.
 * - `dashed`: A series of short dashes.
 * - `dotted`: A series of round dots.
 * - `auto`: The border style is determined automatically based on the surface's design system.
 * @publicDocs
 */
export type BorderStyleKeyword = "none" | "solid" | "dashed" | "dotted" | "auto";
/**
 * Defines the width of borders, using the standard size scale or `none` for no border.
 *
 * - `SizeKeyword`: Standard border widths from the size scale for consistent thickness.
 * - `none`: No border width (removes the border).
 * @publicDocs
 */
export type BorderSizeKeyword = SizeKeyword | "none";
/**
 * The corner radius of a border, using the design system's `SizeKeyword` scale with additional options:
 *
 * - `max`: The maximum possible radius, creating a pill or circular shape.
 * - `none`: No rounding — corners are sharp (0 radius).
 * @publicDocs
 */
export type BorderRadiusKeyword = SizeKeyword | "max" | "none";
/**
 * Represents a shorthand for defining a border. It can be a combination of size, optionally followed by color, optionally followed by style.
 * @publicDocs
 */
export type BorderShorthand = BorderSizeKeyword | `${BorderSizeKeyword} ${ColorKeyword}` | `${BorderSizeKeyword} ${ColorKeyword} ${BorderStyleKeyword}`;
/** @publicDocs */
export interface BorderProps {
	/**
	 * Set the border via the shorthand property.
	 *
	 * This can be a size, optionally followed by a color, optionally followed by a style.
	 *
	 * If the color is not specified, it will be `base`.
	 *
	 * If the style is not specified, it will be `auto`.
	 *
	 * Values can be overridden by `borderWidth`, `borderStyle`, and `borderColor`.
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
	 * Set the width of the border.
	 *
	 * If set, it takes precedence over the `border` property's width.
	 *
	 * Like CSS, up to 4 values can be specified.
	 *
	 * If one value is specified, it applies to all sides.
	 *
	 * If two values are specified, they apply to the block sides and inline sides respectively.
	 *
	 * If three values are specified, they apply to the block-start, both inline sides, and block-end respectively.
	 *
	 * If four values are specified, they apply to the block-start, block-end, inline-start, and inline-end sides respectively.
	 *
	 * @default '' - meaning no override
	 */
	borderWidth?: MaybeAllValuesShorthandProperty<BorderSizeKeyword> | "";
	/**
	 * Set the style of the border.
	 *
	 * If set, it takes precedence over the `border` property's style.
	 *
	 * Like CSS, up to 4 values can be specified.
	 *
	 * If one value is specified, it applies to all sides.
	 *
	 * If two values are specified, they apply to the block sides and inline sides respectively.
	 *
	 * If three values are specified, they apply to the block-start, both inline sides, and block-end respectively.
	 *
	 * If four values are specified, they apply to the block-start, block-end, inline-start, and inline-end sides respectively.
	 *
	 * @default '' - meaning no override
	 */
	borderStyle?: MaybeAllValuesShorthandProperty<BorderStyleKeyword> | "";
	/**
	 * Set the color of the border.
	 *
	 * If set, it takes precedence over the `border` property's color.
	 *
	 * @default '' - meaning no override
	 */
	borderColor?: ColorKeyword | "";
	/**
	 * Set the radius of the border.
	 *
	 * [1-to-4-value syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#edges_of_a_box) is
	 * supported. Note that, contrary to the CSS, it uses flow-relative values and the order is:
	 *
	 * - 4 values: `start-start start-end end-end end-start`
	 * - 3 values: `start-start (start-end & end-start) start-end`
	 * - 2 values: `(start-start & end-end) (start-end & end-start)`
	 *
	 * For example:
	 * - `small-100` means start-start, start-end, end-end and end-start border radii are `small-100`.
	 * - `small-100 none` means start-start and end-end border radii are `small-100`, start-end and end-start border radii are `none`.
	 * - `small-100 none large-100` means start-start border radius is `small-100`, start-end border radius is `none`, end-end border radius is `large-100` and end-start border radius is `none`.
	 * - `small-100 none large-100 small-100` means start-start border radius is `small-100`, start-end border radius is `none`, end-end border radius is `large-100` and end-start border radius is `small-100`.
	 *
	 * @defaultValue 'none'
	 */
	borderRadius?: MaybeAllValuesShorthandProperty<BorderRadiusKeyword>;
}
/** @publicDocs */
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
/** @publicDocs */
export interface BaseBoxProps extends AccessibilityVisibilityProps, BackgroundProps, DisplayProps, SizingProps, PaddingProps, BorderProps, OverflowProps {
	/**
	 * The content of the Box.
	 */
	children?: ComponentChildren;
	/**
	 * A label that describes the purpose or contents of the element.
	 * When set, it will be announced to users using assistive technologies and will provide them with more context.
	 *
	 * Only use this when the element's content is not enough context for users using assistive technologies.
	 */
	accessibilityLabel?: string;
}
/** @publicDocs */
export interface BaseBoxPropsWithRole extends BaseBoxProps, AccessibilityRoleProps {
}
interface BoxProps$1 extends BaseBoxPropsWithRole, GlobalProps {
}
/** @publicDocs */
export interface ButtonBehaviorProps extends InteractionProps, FocusEventProps {
	/**
	 * The behavioral type of the button component, which determines what action it performs when activated.
	 *
	 * - `submit`: Used to indicate the component acts as a submit button, meaning it submits the closest form.
	 * - `button`: Used to indicate the component acts as a button, meaning it has no default action.
	 * - `reset`: Used to indicate the component acts as a reset button, meaning it resets the closest form (returning fields to their default values).
	 *
	 * This property is ignored if the component supports `href` or `commandFor`/`command` and one of them is set.
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
	 * Whether the button is in a loading state, which replaces the button content with a loading indicator while a background action is being performed.
	 *
	 * This also disables the button.
	 *
	 * @default false
	 */
	loading?: boolean;
}
/** @publicDocs */
export interface LinkBehaviorProps extends InteractionProps, FocusEventProps {
	/**
	 * The URL to navigate to when clicked. The `click` event fires first, then navigation occurs.
	 *
	 * - If set, it will navigate to the location specified by `href` after executing the `click` event.
	 * - If a `commandFor` is set, the `command` will be executed instead of the navigation.
	 */
	href?: string;
	/**
	 * Specifies where to display the linked URL.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target
	 *
	 * 'auto': The target is automatically determined based on the origin of the URL.
	 *
	 * @implementation Surfaces can set specific rules on how they handle each URL.
	 * @implementation It’s expected that the behavior of `auto` is as `_self` except in specific cases.
	 * @implementation For example, a surface could decide to open cross-origin URLs in a new window (as `_blank`).
	 *
	 * @default 'auto'
	 */
	target?: "auto" | "_blank" | "_self" | "_parent" | "_top" | AnyString;
	/**
	 * Causes the browser to treat the linked URL as a download with the string being the file name.
	 * Download only works for same-origin URLs or the `blob:` and `data:` schemes.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download
	 */
	download?: string;
	/**
	 * A callback fired when the link is activated, before navigating to the location specified by `href`. Learn more about the [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event).
	 */
	onClick?: (event: Event) => void;
}
/** @publicDocs */
export interface InteractionProps {
	/**
	 * The ID of the component to control when this component is activated. Pair with the `command` property to specify what action to perform on the target component. Learn more about the [`commandFor` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#commandfor).
	 */
	commandFor?: string;
	/**
	 * Sets the action the `commandFor` target should take when this component is activated. Learn more about the [`command` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command).
	 *
	 * See the documentation of particular components for the actions they support.
	 *
	 * - `--auto`: a default action for the target component.
	 * - `--show`: shows the target component.
	 * - `--hide`: hides the target component.
	 * - `--toggle`: toggles the target component.
	 * - `--copy`: copies the target ClipboardItem.
	 *
	 * @default '--auto'
	 */
	command?: "--auto" | "--show" | "--hide" | "--toggle" | "--copy";
	/**
	 * The ID of the component to show when users hover over or focus on this component. Use this to connect interactive components to popovers or tooltips that provide additional context or information.
	 */
	interestFor?: string;
}
/** @publicDocs */
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
	 * - `auto`: the size of the button depends on the surface and context.
	 * - `fill`: the button takes up 100% of the available inline size.
	 * - `fit-content`: the button will take up the minimum inline-size required to fit its content.
	 *
	 * @default 'auto'
	 */
	inlineSize?: "auto" | "fill" | "fit-content";
	/**
	 * The visual style variant of the button component, which controls its prominence and emphasis.
	 *
	 * @default 'auto' - the variant is automatically determined by the button's context
	 */
	variant?: "auto" | "primary" | "secondary" | "tertiary";
	/**
	 * The semantic meaning and color treatment of the button.
	 *
	 * @default 'auto'
	 */
	tone?: ToneKeyword;
	/**
	 * The language of the button's text content. Use this when the button text is in a different language than the rest of the page, so assistive technologies can invoke the correct pronunciation.
	 * [Reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) ("subtag" label)
	 */
	lang?: string;
}
/** @publicDocs */
export interface BaseInputProps {
	/**
	 * An identifier for the field that is unique within the nearest containing form.
	 */
	name?: string;
	/**
	 * Disables the field, disallowing any interaction.
	 *
	 * @default false
	 */
	disabled?: boolean;
}
/** @publicDocs */
export interface InputProps extends BaseInputProps {
	/**
	 * Callback when the user has **finished editing** a field, for example, once they have blurred the field.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
	 */
	onChange?: (event: Event) => void;
	/**
	 * Callback when the user makes any changes in the field.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
	 */
	onInput?: (event: Event) => void;
	/**
	 * The current value for the field. If omitted, the field will be empty.
	 */
	value?: string;
	/**
	 * The default value for the field.
	 *
	 * @implementation `defaultValue` reflects to the `value` attribute.
	 */
	defaultValue?: string;
}
/** @publicDocs */
export interface MultipleInputProps extends BaseInputProps {
	/**
	 * Callback when the user has selected option(s).
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
	 */
	onChange?: (event: Event) => void;
	/**
	 * Callback when the user has selected option(s).
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
	 */
	onInput?: (event: Event) => void;
	/**
	 * An array of `value` attributes for the currently selected options.
	 *
	 * This is a convenience prop for setting the `selected` prop on child options.
	 */
	values?: string[];
}
/** @publicDocs */
export interface FileInputProps extends BaseInputProps {
	/**
	 * Callback when the user has **finished selecting** a file or files.
	 */
	onChange?: (event: Event) => void;
	/**
	 * Callback when the user makes any changes in the file selection.
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
/** @publicDocs */
export interface FieldErrorProps {
	/**
	 * Indicate an error to the user. The field will be given a specific stylistic treatment
	 * to communicate problems that have to be resolved immediately.
	 */
	error?: string;
}
/** @publicDocs */
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
	 * Content to use as the field label.
	 */
	label?: string;
}
/** @publicDocs */
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
/** @publicDocs */
export interface FieldProps extends BasicFieldProps, InputProps, FocusEventProps, FieldDetailsProps {
	/**
	 * A short hint that describes the expected value of the field.
	 */
	placeholder?: string;
}
/** @publicDocs */
export interface BaseTextFieldProps extends FieldProps {
	/**
	 * The field cannot be edited by the user. It is focusable will be announced by screen readers.
	 *
	 * @default false
	 */
	readOnly?: boolean;
}
/** @publicDocs */
export interface FieldDecorationProps {
	/**
	 * A value to be displayed immediately after the editable portion of the field.
	 *
	 * This is useful for displaying an implied part of the value, such as "@shopify.com", or "%".
	 *
	 * This cannot be edited by the user, and it isn't included in the value of the field.
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
	 * This cannot be edited by the user, and it isn't included in the value of the field.
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
/** @publicDocs */
export interface NumberConstraintsProps {
	/**
	 * The highest decimal or integer to be accepted for the field.
	 * When used with `step` the value will round down to the max number.
	 *
	 * Note: a user will still be able to use the keyboard to input a number higher than
	 * the max. It is up to the developer to add appropriate validation.
	 *
	 * @default Infinity
	 */
	max?: number;
	/**
	 * The lowest decimal or integer to be accepted for the field.
	 * When used with `step` the value will round up to the min number.
	 *
	 * Note: a user will still be able to use the keyboard to input a number lower than
	 * the min. It is up to the developer to add appropriate validation.
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
	controls?: "auto" | "stepper" | "none";
}
/** @publicDocs */
export interface MinMaxLengthProps {
	/**
	 * Specifies the maximum number of characters allowed.
	 *
	 * @default Infinity
	 */
	maxLength?: number;
	/**
	 * Specifies the min number of characters allowed.
	 *
	 * @default 0
	 */
	minLength?: number;
}
/** @publicDocs */
export interface BaseSelectableProps {
	/**
	 * A label used for users using assistive technologies like screen readers. When set, any children or `label` supplied will not be announced.
	 * This can also be used to display a control without a visual label, while still providing context to users using screen readers.
	 */
	accessibilityLabel?: string;
	/**
	 * Disables the control, disallowing any interaction.
	 *
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * The value used in form data when the control is checked.
	 */
	value?: string;
}
/** @publicDocs */
export interface BaseOptionProps extends BaseSelectableProps {
	/**
	 * Whether the control is active.
	 *
	 * @default false
	 */
	selected?: boolean;
	/**
	 * Whether the control is active by default.
	 *
	 * @implementation `defaultSelected` reflects to the `selected` attribute.
	 *
	 * @default false
	 */
	defaultSelected?: boolean;
}
/** @publicDocs */
export interface BaseCheckableProps extends BaseSelectableProps, InteractionProps {
	/**
	 * Visual content to use as the control label.
	 */
	label?: string;
	/**
	 * Whether the control is active.
	 *
	 * @default false
	 */
	checked?: boolean;
	/**
	 * Whether the control is active by default.
	 *
	 * @implementation `defaultChecked` reflects to the `checked` attribute.
	 *
	 * @default false
	 */
	defaultChecked?: boolean;
	/**
	 * An identifier for the control that is unique within the nearest
	 * containing `Form` component.
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
	 * @default false
	 */
	required?: boolean;
}
/** @publicDocs */
export interface ChipProps$1 {
	/**
	 * The content of the chip.
	 */
	children?: ComponentChildren;
	/**
	 * The graphic to display inside of the chip.
	 *
	 * @implementation Only `s-icon` is supported.
	 */
	graphic?: ComponentChildren;
	/**
	 * A label that describes the purpose or contents of the chip. It will be read to users using assistive technologies such as screen readers.
	 */
	accessibilityLabel?: string;
	/**
	 * Modify the color to be more or less intense.
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
	 * Set to `true` to associate a choice with the error passed to `ChoiceList`
	 *
	 * @default false
	 */
	error?: boolean;
	/**
	 * Secondary content for a choice.
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
	 * Disables the field, disallowing any interaction.
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
	 * In this state, `click` won’t fire.
	 * If the click event originates from a child element, the event will immediately stop propagating from this element.
	 *
	 * However, items within the clickable can still receive focus and be interacted with.
	 *
	 * This has no impact on the visual state by default,
	 * but developers are encouraged to style the clickable accordingly.
	 */
	disabled?: BaseClickableProps["disabled"];
	/**
	 * The language of the button's text content. Use this when the button text is in a different language than the rest of the page, so assistive technologies can invoke the correct pronunciation.
	 * [Reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) ("subtag" label)
	 *
	 * @default ''
	 */
	lang?: string;
}
interface ClickableChipProps$1 extends ChipProps$1, GlobalProps {
	/**
	 * Callback when the chip is clicked.
	 */
	onClick?: (event: Event) => void;
	/**
	 * The URL to navigate to when clicked. The `click` event fires first, then navigation occurs.
	 *
	 * - If set, it will navigate to the location specified by `href` after executing the `click` event.
	 */
	href?: string;
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
/** @publicDocs */
export interface AutocompleteProps<AutocompleteField extends AnyAutocompleteField> {
	/**
	 * A hint as to the intended content of the field.
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
	 * @see Learn more about the set of {@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-detail-tokens|autocomplete values} supported in browsers.
	 *
	 * @default 'tel' for PhoneField
	 * @default 'email' for EmailField
	 * @default 'url' for URLField
	 * @default 'on' for everything else
	 */
	autocomplete?: AutocompleteField | `${AutocompleteSection} ${AutocompleteField}` | `${AutocompleteGroup} ${AutocompleteField}` | `${AutocompleteSection} ${AutocompleteGroup} ${AutocompleteField}` | "on" | "off";
}
/**
 * The “section” scopes the autocomplete data that should be inserted
 * to a specific area of the page.
 *
 * Commonly used when there are multiple fields with the same autocomplete needs
 * in the same page. For example: 2 shipping address forms in the same page.
 * @publicDocs
 */
export type AutocompleteSection = `section-${string}`;
/**
 * The contact information group the autocomplete data should be sourced from.
 * @publicDocs
 */
export type AutocompleteGroup = "shipping" | "billing";
/**
 * The contact information subgroup the autocomplete data should be sourced from.
 * @publicDocs
 */
export type AutocompleteAddressGroup = "fax" | "home" | "mobile" | "pager";
/** @publicDocs */
export type AnyAutocompleteField = "additional-name" | "address-level1" | "address-level2" | "address-level3" | "address-level4" | "address-line1" | "address-line2" | "address-line3" | "country-name" | "country" | "current-password" | "email" | "family-name" | "given-name" | "honorific-prefix" | "honorific-suffix" | "language" | "name" | "new-password" | "nickname" | "one-time-code" | "organization-title" | "organization" | "photo" | "postal-code" | "sex" | "street-address" | "transaction-amount" | "transaction-currency" | "url" | "username" | "bday-day" | "bday-month" | "bday-year" | "bday" | "cc-additional-name" | "cc-expiry-month" | "cc-expiry-year" | "cc-expiry" | "cc-family-name" | "cc-given-name" | "cc-name" | "cc-number" | "cc-csc" | "cc-type" | `${AutocompleteAddressGroup} email` | "impp" | `${AutocompleteAddressGroup} impp` | "tel" | "tel-area-code" | "tel-country-code" | "tel-extension" | "tel-local-prefix" | "tel-local-suffix" | "tel-local" | "tel-national" | `${AutocompleteAddressGroup} tel` | `${AutocompleteAddressGroup} tel-area-code` | `${AutocompleteAddressGroup} tel-country-code` | `${AutocompleteAddressGroup} tel-extension` | `${AutocompleteAddressGroup} tel-local-prefix` | `${AutocompleteAddressGroup} tel-local-suffix` | `${AutocompleteAddressGroup} tel-local` | `${AutocompleteAddressGroup} tel-national`;
/** @publicDocs */
export type TextAutocompleteField = ExtractStrict<AnyAutocompleteField, "additional-name" | "address-level1" | "address-level2" | "address-level3" | "address-level4" | "address-line1" | "address-line2" | "address-line3" | "country-name" | "country" | "family-name" | "given-name" | "honorific-prefix" | "honorific-suffix" | "language" | "name" | "nickname" | "one-time-code" | "organization-title" | "organization" | "postal-code" | "sex" | "street-address" | "transaction-currency" | "username" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-type">;
/** @publicDocs */
export type ConsentPolicy = "sms-marketing";
interface ConsentCheckboxProps$1 extends GlobalProps, CheckboxProps$1 {
	/**
	 * The policy for which user consent is being collected for.
	 *
	 * `sms-marketing`: Represents the policy for SMS marketing consent.
	 */
	policy?: ConsentPolicy;
}
/** @publicDocs */
export type PhoneAutocompleteField = ExtractStrict<AnyAutocompleteField, "tel" | "tel-area-code" | "tel-country-code" | "tel-extension" | "tel-local-prefix" | "tel-local-suffix" | "tel-local" | "tel-national" | `${AutocompleteAddressGroup} tel` | `${AutocompleteAddressGroup} tel-area-code` | `${AutocompleteAddressGroup} tel-country-code` | `${AutocompleteAddressGroup} tel-extension` | `${AutocompleteAddressGroup} tel-local-prefix` | `${AutocompleteAddressGroup} tel-local-suffix` | `${AutocompleteAddressGroup} tel-local` | `${AutocompleteAddressGroup} tel-national`>;
interface PhoneFieldProps$1 extends GlobalProps, BaseTextFieldProps, Pick<FieldDecorationProps, "accessory">, AutocompleteProps<PhoneAutocompleteField> {
	/**
	 * The type of number to collect.
	 *
	 * Specific style may be applied to each type to provide extra guidance to users. Note that no extra validation is performed based on the type.
	 *
	 * @default '' meaning no specific kind of phone number
	 */
	type?: "mobile" | "";
}
interface ConsentPhoneFieldProps$1 extends GlobalProps, PhoneFieldProps$1 {
	/**
	 * The policy for which user consent is being collected for.
	 *
	 * `sms-marketing`: Represents the policy for SMS marketing consent.
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
	 * @default ""
	 *
	 * @example
	 * `--2024-02` // disallow any date before February 2024
	 * `2024-05-09, 2024-05-11` // disallow the 9th and 11th of May 2024
	 */
	disallow?: string;
	/**
	 * Restricts which days of the week the user can select. These intersect with the result of `allow` and `disallow`.
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
	 * It’s important to note that this callback will be called only when the user **finishes editing** the date,
	 * and it’s called right after the `onChange` callback.
	 * The field is **not** validated on every change to the input. Once the buyer has signalled that
	 * they have finished editing the field (typically, by blurring the field), the field gets validated and the callback is run if the value is invalid.
	 */
	onInvalid?: (event: Event) => void;
}
/** @publicDocs */
export type DateAutocompleteField = ExtractStrict<AnyAutocompleteField, "bday" | "bday-day" | "bday-month" | "bday-year" | "cc-expiry" | "cc-expiry-month" | "cc-expiry-year">;
interface DetailsProps$1 extends GlobalProps, ToggleEventProps {
	/**
	 * The content of the details.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
	 */
	children?: ComponentChildren;
	/**
	 * Name of the element.
	 *
	 * This can be used to create multiple named disclosure boxes that where only one can be open at a time.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#multiple_named_disclosure_boxes
	 */
	name?: string;
	/**
	 * Whether the element is open.
	 *
	 * This does not reflect to any attribute.
	 *
	 * @default false
	 */
	open?: boolean;
	/**
	 * Indicates whether the element should be open by default.
	 *
	 * This reflects to the `open` attribute.
	 *
	 * @default false
	 */
	defaultOpen?: boolean;
	/**
	 * Sets the transition between the two states.
	 *
	 * @default 'auto'
	 */
	toggleTransition?: "none" | "auto";
}
interface DividerProps$1 extends GlobalProps {
	/**
	 * Specify the direction of the divider. This uses [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values).
	 *
	 * @default 'inline'
	 */
	direction?: "inline" | "block";
	/**
	 * Modify the color to be more or less intense.
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
interface EmailFieldProps$1 extends GlobalProps, BaseTextFieldProps, MinMaxLengthProps, AutocompleteProps<EmailAutocompleteField> {
}
/** @publicDocs */
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
/** @publicDocs */
export type SpacingKeyword = SizeKeyword | "none";
/** @publicDocs */
export interface GapProps {
	/**
	 * Adjust spacing between elements.
	 *
	 * A single value applies to both axes.
	 * A pair of values (eg `large-100 large-500`) can be used to set the inline and block axes respectively.
	 *
	 * @default 'none'
	 */
	gap?: MaybeResponsive<MaybeTwoValuesShorthandProperty<SpacingKeyword>>;
	/**
	 * Adjust spacing between elements in the block axis.
	 *
	 * This overrides the row value of `gap`.
	 *
	 * @default '' - meaning no override
	 */
	rowGap?: MaybeResponsive<SpacingKeyword | "">;
	/**
	 * Adjust spacing between elements in the inline axis.
	 *
	 * This overrides the column value of `gap`.
	 *
	 * @default '' - meaning no override
	 */
	columnGap?: MaybeResponsive<SpacingKeyword | "">;
}
/** @publicDocs */
export type BaselinePosition = "baseline" | "first baseline" | "last baseline";
/** @publicDocs */
export type ContentDistribution = "space-between" | "space-around" | "space-evenly" | "stretch";
/** @publicDocs */
export type ContentPosition = "center" | "start" | "end";
/** @publicDocs */
export type OverflowPosition = `unsafe ${ContentPosition}` | `safe ${ContentPosition}`;
/**
 * Justify items defines the default justify-self for all items of the box, giving them all a default way of justifying each box along the appropriate axis.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
 * @publicDocs
 */
export type JustifyItemsKeyword = "normal" | "stretch" | BaselinePosition | OverflowPosition | ContentPosition;
/**
 * Align items sets the align-self value on all direct children as a group.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
 * @publicDocs
 */
export type AlignItemsKeyword = "normal" | "stretch" | BaselinePosition | OverflowPosition | ContentPosition;
/**
 * Justify content defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
 * @publicDocs
 */
export type JustifyContentKeyword = "normal" | ContentDistribution | OverflowPosition | ContentPosition;
/**
 *Align content sets the distribution of space between and around content items along a flexbox's cross axis, or a grid or block-level element's block axis.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
 * @publicDocs
 */
export type AlignContentKeyword = "normal" | BaselinePosition | ContentDistribution | OverflowPosition | ContentPosition;
interface GridProps$1 extends GlobalProps, BaseBoxPropsWithRole, GapProps {
	/**
	  Define columns and specify their size.
  
	  @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
	  @default 'none'
	*/
	gridTemplateColumns?: MaybeResponsive<string>;
	/**
	  Define rows and specify their size.
  
	  @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows
	  @default 'none'
	*/
	gridTemplateRows?: MaybeResponsive<string>;
	/**
	  Aligns the grid items along the inline (row) axis.
  
	  This overrides the inline value of `placeItems`.
  
	  @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
	  @default '' - meaning no override
	*/
	justifyItems?: MaybeResponsive<JustifyItemsKeyword | "">;
	/**
	  Aligns the grid items along the block (column) axis.
  
	  This overrides the block value of `placeItems`.
  
	  @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
	  @default '' - meaning no override
	*/
	alignItems?: MaybeResponsive<AlignItemsKeyword | "">;
	/**
	  A shorthand property for `justify-items` and `align-items`.
  
	  @see https://developer.mozilla.org/en-US/docs/Web/CSS/place-items
	  @default 'normal normal'
	*/
	placeItems?: MaybeResponsive<`${AlignItemsKeyword} ${JustifyItemsKeyword}` | AlignItemsKeyword>;
	/**
	  Aligns the grid along the inline (row) axis.
  
	  This overrides the inline value of `placeContent`.
  
	  @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
	  @default '' - meaning no override
	*/
	justifyContent?: MaybeResponsive<JustifyContentKeyword | "">;
	/**
	  Aligns the grid along the block (column) axis.
  
	  This overrides the block value of `placeContent`.
  
	  @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
	  @default '' - meaning no override
	*/
	alignContent?: MaybeResponsive<AlignContentKeyword | "">;
	/**
	  A shorthand property for `justify-content` and `align-content`.
  
	  @see https://developer.mozilla.org/en-US/docs/Web/CSS/place-content
	  @default 'normal normal'
	*/
	placeContent?: MaybeResponsive<`${AlignContentKeyword} ${JustifyContentKeyword}` | AlignContentKeyword>;
}
interface GridItemProps$1 extends GlobalProps, BaseBoxPropsWithRole {
	/**
	 * Number of columns the item will span across
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
	 *
	 * @default 'auto'
	 */
	gridColumn?: `span ${number}` | "auto";
	/**
	 * Number of rows the item will span across
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
	 *
	 * @default 'auto'
	 */
	gridRow?: `span ${number}` | "auto";
}
/** @publicDocs */
export interface BaseTypographyProps {
	/**
	 * Modify the color to be more or less intense.
	 *
	 * @default 'base'
	 */
	color?: ColorKeyword;
	/**
	 * Sets the tone of the component, based on the intention of the information being conveyed.
	 *
	 * @default 'auto'
	 */
	tone?: ToneKeyword;
	/**
	 * Set the numeric properties of the font.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
	 *
	 * @default 'auto' - inherit from the parent element
	 */
	fontVariantNumeric?: "auto" | "normal" | "tabular-nums";
	/**
	 * The language of the button's text content. Use this when the button text is in a different language than the rest of the page, so assistive technologies can invoke the correct pronunciation.
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
	 * - `ltr`: languages written from left to right (such as English)
	 * - `rtl`: languages written from right to left (such as Arabic)
	 * - `auto`: the user agent determines the direction based on the content
	 * - `''`: direction is inherited from parent elements (equivalent to not setting the attribute)
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir
	 *
	 * @default ''
	 */
	dir?: "ltr" | "rtl" | "auto" | "";
}
/** @publicDocs */
export interface BlockTypographyProps {
	/**
	 * Truncates the text content to the specified number of lines.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
	 *
	 * @default Infinity - no truncation is applied
	 */
	lineClamp?: number;
}
interface HeadingProps$1 extends GlobalProps, AccessibilityVisibilityProps, BlockTypographyProps {
	/**
	 * The content of the Heading.
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
	 * @implementation The `heading` role doesn’t need to be applied if
	 * the host applies it for you; for example, an HTML host rendering
	 * an `<h2>` element should not apply the `heading` role.
	 */
	accessibilityRole?: "heading" | ExtractStrict<AccessibilityRole, "presentation" | "none">;
}
interface IconProps$1 extends GlobalProps, Pick<InteractionProps, "interestFor"> {
	/**
	 * Sets the tone of the icon, based on the intention of the information being conveyed.
	 *
	 * - `'auto'`: Inherits the tone from its parent context.
	 * - `'neutral'`: Standard, non-semantic color for general-purpose icons.
	 * - `'info'`: Informational content.
	 * - `'success'`: Positive outcomes or confirmations.
	 * - `'warning'`: Cautionary messages or alerts.
	 * - `'critical'`: Errors, destructive actions, or urgent warnings.
	 * - `'custom'`: Inherits a custom color from its parent element's CSS.
	 *
	 * @default 'auto'
	 */
	tone?: ToneKeyword;
	/**
	 * The color emphasis of the icon.
	 *
	 * - `'base'`: Standard color intensity.
	 * - `'subdued'`: A lighter, less prominent appearance.
	 *
	 * @default 'base'
	 */
	color?: ColorKeyword;
	/**
	 * Adjusts the size of the icon.
	 *
	 * - `'small-200'`: Extra extra small.
	 * - `'small-100'`: Extra small.
	 * - `'small'`: Small.
	 * - `'base'`: Standard size.
	 * - `'large'`: Large.
	 * - `'large-100'`: Extra large.
	 *
	 * @default 'base'
	 */
	size?: SizeKeyword;
	/**
	 * The type of icon to display. You can specify an icon name from the available icon set, or use an empty string to show no icon.
	 */
	type?: IconType | AnyString;
}
/** @publicDocs */
export interface BaseImageProps {
	/**
	 * Alternative text that describes the image for screen readers. This text should convey the meaning or content of the image to users who can't see it.
	 *
	 * @default `''`
	 */
	alt?: string;
	/**
	 * The sizes of the image at different viewport widths. Use this with `srcSet` to tell the browser which image to load (for example, `'(max-width: 320px) 280px, 640px'`).
	 */
	sizes?: string;
	/**
	 * The URL of the image to display. You can provide an absolute or relative URL pointing to the image file. When the image is loading or no `src` is provided, a placeholder is rendered in its place.
	 */
	src?: string;
	/**
	 * A set of source images with different sizes for responsive loading. Use this to provide multiple image sizes for different screen resolutions (for example, `'image-320w.jpg 320w, image-640w.jpg 640w'`). This overrides the `src` property when the browser can match a suitable source.
	 */
	srcSet?: string;
}
interface ImageProps$1 extends GlobalProps, BaseImageProps, BorderProps {
	/**
	 * Sets the semantic meaning of the image content. When set, the role will be used by assistive technologies to help users navigate the page.
	 *
	 * - `'img'`: Identifies the element as an image that conveys meaningful information to users.
	 * - `'none'`: Completely hides the element and its content from assistive technologies.
	 * - `'presentation'`: Removes semantic meaning, making the image purely decorative and ignored by screen readers.
	 *
	 * @default 'img'
	 */
	accessibilityRole?: "img" | ExtractStrict<AccessibilityRole, "presentation" | "none">;
	/**
	 * The displayed inline width of the image.
	 *
	 * - `'fill'`: The image takes up 100% of the available inline size.
	 * - `'auto'`: The image is displayed at its natural size.
	 *
	 * @default 'fill'
	 */
	inlineSize?: "fill" | "auto";
	/**
	 * The aspect ratio of the image as a width-to-height ratio (for example, `'16/9'` or `'1'`). This helps prevent layout shifts while the image loads.
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
	 * When the image should be loaded.
	 *
	 * - `'eager'`: Loads the image immediately.
	 * - `'lazy'`: Defers loading until the image is near the viewport.
	 *
	 * @default 'eager'
	 */
	loading?: "eager" | "lazy";
	/**
	 * A callback that's fired when the image has loaded successfully.
	 */
	onLoad?: (event: Event) => void;
	/**
	 * A callback that's fired when the image fails to load.
	 */
	onError?: (event: Event) => void;
}
interface LinkProps$1 extends GlobalProps, LinkBehaviorProps {
	/**
	 * The content of the link.
	 */
	children?: ComponentChildren;
	/**
	 * Sets the tone of the link, based on the intention of the information being conveyed.
	 *
	 * @default 'auto'
	 */
	tone?: ToneKeyword;
	/**
	 * A label that describes the purpose or contents of the link. It will be read to users using assistive technologies such as screen readers.
	 *
	 * Use this when using only an icon or the content of the link is not enough context
	 * for users using assistive technologies.
	 */
	accessibilityLabel?: string;
	/**
	 * The language of the button's text content. Use this when the button text is in a different language than the rest of the page, so assistive technologies can invoke the correct pronunciation.
	 * [Reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) ("subtag" label)
	 */
	lang?: string;
}
interface ListItemProps$1 extends GlobalProps {
	/**
	 * The content of the ListItem.
	 */
	children?: ComponentChildren;
}
interface MapProps$1 extends GlobalProps, SizingProps {
	/**
	 * A valid API key for the map service provider.
	 */
	apiKey?: string;
	/**
	 * The latitude of the map's center point, in degrees.
	 *
	 * @default 0
	 */
	latitude?: number;
	/**
	 * The longitude of the map's center point, in degrees.
	 *
	 * @default 0
	 */
	longitude?: number;
	/**
	 * A label that describes the purpose or contents of the map. When set, it will be announced to users using assistive technologies.
	 */
	accessibilityLabel?: string;
	/**
	 * The initial zoom level of the map. Valid values are numbers from 0 to 18.
	 *
	 * @default 4
	 */
	zoom?: number;
	/**
	 * The maximum zoom level the user can reach on the map. Valid values are numbers from 0 to 18.
	 *
	 * @default 18
	 */
	maxZoom?: number;
	/**
	 * The minimum zoom level the user can reach on the map. Valid values are numbers from 0 to 18.
	 *
	 * @default 0
	 */
	minZoom?: number;
	/**
	 * A callback that's fired when the visible map boundaries change.
	 */
	onBoundsChange?: (event: MapBoundsChangeEvent) => void;
	/**
	 * A callback that's fired when the map view changes, such as when the user pans or zooms.
	 */
	onViewChange?: (event: MapViewChangeEvent) => void;
	/**
	 * A callback that's fired when the user clicks on the map.
	 */
	onClick?: (event: MapClickEvent) => void;
	/**
	 * A callback that's fired when the user double-clicks on the map.
	 */
	onDblClick?: (event: MapDblClickEvent) => void;
}
/**
 * A geographic coordinate pair representing a location on the map.
 */
interface Location$1 {
	/**
	 * The latitude of the location in degrees.
	 */
	latitude?: number;
	/**
	 * The longitude of the location in degrees.
	 */
	longitude?: number;
}
/**
 * The geographic boundaries of a visible map area.
 * @publicDocs
 */
export interface Bounds {
	/**
	 * The north-east corner of the bounded area.
	 */
	northEast?: Location$1;
	/**
	 * The south-west corner of the bounded area.
	 */
	southWest?: Location$1;
}
/**
 * The event data for map view changes.
 * @publicDocs
 */
export interface MapViewChangeEvent extends Event {
	/**
	 * The geographic location of the new map center.
	 */
	location?: Location$1;
	/**
	 * The current zoom level of the map after the view change.
	 */
	zoom?: number;
}
/**
 * The event data for map bounds changes.
 * @publicDocs
 */
export interface MapBoundsChangeEvent extends Event {
	/**
	 * The geographic boundaries of the visible map area after the change.
	 */
	bounds?: Bounds;
}
/**
 * The event data for map click events.
 * @publicDocs
 */
export interface MapClickEvent extends Event {
	/**
	 * The geographic location of the click.
	 */
	location?: Location$1;
}
/**
 * The event data for map double-click events.
 * @publicDocs
 */
export interface MapDblClickEvent extends Event {
	/**
	 * The geographic location of the double-click.
	 */
	location?: Location$1;
}
interface MapMarkerProps$1 extends GlobalProps, InteractionProps, Pick<SizingProps, "blockSize" | "inlineSize"> {
	/**
	 * The latitude of the marker location, in degrees.
	 *
	 * @default 0
	 */
	latitude?: number;
	/**
	 * The longitude of the marker location, in degrees.
	 *
	 * @default 0
	 */
	longitude?: number;
	/**
	 * A label that describes the purpose of the marker. When set, it will be announced to users using assistive technologies.
	 */
	accessibilityLabel?: string;
	/**
	 * Whether the marker can be grouped into clusters when zoomed out.
	 *
	 * @default false
	 */
	clusterable?: boolean;
	/**
	 * The graphic to use as the marker. If unset, the default marker from the map provider is used.
	 */
	graphic?: ComponentChildren;
	/**
	 * A callback that's fired when the marker is clicked. This does not trigger a click event on the map.
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
/** @publicDocs */
export type MoneyAutocompleteField = ExtractStrict<AnyAutocompleteField, "transaction-amount">;
interface NumberFieldProps$1 extends GlobalProps, BaseTextFieldProps, AutocompleteProps<NumberAutocompleteField>, NumberConstraintsProps, FieldDecorationProps {
	/**
	 * Sets the virtual keyboard.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
	 * @default 'decimal'
	 */
	inputMode?: "decimal" | "numeric";
}
/** @publicDocs */
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
	 * The content of the Text.
	 */
	children?: ComponentChildren;
	/**
	 * Provide semantic meaning and default styling to the paragraph.
	 *
	 * Other presentation properties on `s-paragraph` override the default styling.
	 *
	 * @default 'paragraph'
	 */
	type?: ParagraphType;
}
/** @publicDocs */
export type ParagraphType = 
/**
 * Indicate the text is a structural grouping of related content.
 *
 * In an HTML host, the text will be rendered in an `<p>` element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
 */
"paragraph"
/**
 * Indicates the text is considered less important than the main content, but is still necessary for the reader to understand.
 * It can be used for secondary content but also for disclaimers, terms and conditions, or legal information.
 *
 * Surfaces should apply a smaller font size than the default size.
 *
 * In an HTML host, the text will be rendered in a `<small>` element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
 */
 | "small";
interface PasswordFieldProps$1 extends GlobalProps, BaseTextFieldProps, MinMaxLengthProps, AutocompleteProps<PasswordAutocompleteField> {
}
/** @publicDocs */
export type PasswordAutocompleteField = ExtractStrict<AnyAutocompleteField, "new-password" | "current-password">;
interface PaymentIconProps$1 extends GlobalProps {
	/**
	 * The name of the payment method icon to display.
	 *
	 * @default ''
	 */
	type?: PaymentIconName | AnyString;
	/**
	 * A label that describes the purpose or contents of the payment icon. When set, it will be announced to users using assistive technologies.
	 */
	accessibilityLabel?: string;
}
/** @publicDocs */
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
interface ProductThumbnailProps$1 extends GlobalProps, BaseImageProps {
	/**
	 * The quantity badge displayed on the product thumbnail.
	 */
	totalItems?: number;
	/**
	 * Adjusts the size of the product thumbnail image.
	 *
	 * - `'small-200'`: Extra extra small.
	 * - `'small-100'`: Extra small.
	 * - `'small'`: Small.
	 * - `'base'`: Standard size.
	 * - `'large'`: Large.
	 * - `'large-100'`: Extra large.
	 *
	 * @default 'base'
	 */
	size?: SizeKeyword;
	/**
	 * A callback that's fired when the thumbnail image has loaded successfully.
	 */
	onLoad?: (event: Event) => void;
	/**
	 * A callback that's fired when the thumbnail image fails to load.
	 */
	onError?: (event: Event) => void;
}
interface ProgressProps$1 extends GlobalProps {
	/**
	 * A label that describes the purpose of the progress. When set,
	 * it will be announced to users using assistive technologies and will
	 * provide them with more context.
	 *
	 * Use it to provide context of what is progressing.
	 */
	accessibilityLabel?: string;
	/**
	 * Sets the tone of the progress, based on the intention of the information being conveyed.
	 *
	 * @default 'auto'
	 */
	tone?: ToneKeyword;
	/**
	 * Specifies how much of the task has been completed.
	 *
	 * It must be a valid floating point number between `0` and `max`, or between `0` and `1` if `max` is omitted.
	 * If there is no value attribute, the progress bar is indeterminate;
	 * this indicates that an activity is ongoing with no indication of how long it is expected to take.
	 *
	 * @implementation Surfaces should apply styling to cover that indeterminate state.
	 * @implementation In a HTML host, you can customize the progress animation via the :indeterminate pseudo-class.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#value
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate#progress_bar
	 */
	value?: number;
	/**
	 * This attribute describes how much work the task indicated by the progress element requires.
	 *
	 * The `max` attribute, if present, must have a value greater than `0` and be a valid floating point number.
	 *
	 * @default 1
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#max
	 */
	max?: number;
}
interface QRCodeProps$1 extends GlobalProps {
	/**
	 * The border style of the QR code.
	 *
	 * - `'base'`: Applies a standard border.
	 * - `'none'`: Removes the border.
	 *
	 * @default 'base'
	 */
	border?: "base" | "none";
	/**
	 * The data to encode in the QR code. This can be any string, such as a URL, email address, or plain text. When scanned, specific string formats can trigger device actions like opening a link, preparing an email, or launching an app.
	 */
	content?: string;
	/**
	 * The displayed size of the QR code.
	 *
	 * - `'fill'`: The QR code takes up 100% of the available inline size and maintains a 1:1 aspect ratio.
	 * - `'base'`: The QR code is displayed at its default size.
	 *
	 * @default 'base'
	 */
	size?: "base" | "fill";
	/**
	 * A label that describes the purpose or contents of the QR code. When set, it will be announced to users using assistive technologies.
	 *
	 * @default 'QR code' (translated to the user's locale)
	 */
	accessibilityLabel?: string;
	/**
	 * A callback that's fired when the conversion of `content` to a QR code fails. If an error occurs, the QR code and its child elements will not be displayed.
	 */
	onError?: (event: Event) => void;
	/**
	 * URL of an image to display in the center of the QR code, typically used for branding or to indicate what scanning the code will do.
	 */
	logo?: string;
}
interface QueryContainerProps$1 extends GlobalProps {
	/**
	 * The content of the container.
	 */
	children?: ComponentChildren;
	/**
	 * The name of the container, which can be used in your container queries to target this container specifically.
	 *
	 * We place the container name of `s-default` on every container. Because of this, it is not required to add a `containerName` identifier in your queries. For example, a `@container (inline-size <= 300px) none, auto` query is equivalent to `@container s-default (inline-size <= 300px) none, auto`.
	 *
	 * Any value set in `containerName` will be set alongside alongside `s-default`. For example, `containerName="my-container-name"` will result in a value of `s-default my-container-name` set on the `container-name` CSS property of the rendered HTML.
	 *
	 * @default ''
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/container-name
	 *
	 * @implementation You must always have a CSS `container-name` of `s-default` for this component.
	 */
	containerName?: string;
}
/** @publicDocs */
export type OverflowKeyword = "auto" | "hidden";
interface ScrollBoxProps$1 extends GlobalProps, Omit<BaseBoxPropsWithRole, "overflow"> {
	/**
	 * Sets the overflow behavior of the element.
	 *
	 * - `hidden`: clips the content when it is larger than the element’s container and the element will not be scrollable in that axis.
	 * - `auto`: clips the content when it is larger than the element’s container and make it scrollable in that axis.
	 *
	 * 1-to-2-value syntax is supported but note that, contrary to the CSS, it uses flow-relative values and the order is:
	 *
	 * - 2 values: `block inline`
	 *
	 * @default 'auto'
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
	 */
	overflow?: OverflowKeyword | `${OverflowKeyword} ${OverflowKeyword}`;
}
interface SectionProps$1 extends GlobalProps, ActionSlots {
	/**
	 * The content of the section.
	 */
	children?: ComponentChildren;
	/**
	 * A label used to describe the section that will be announced by assistive technologies.
	 *
	 * When no `heading` property is provided or included as a child of the section, you **must** provide an
	 * `accessibilityLabel` to describe the section. This is important as it allows assistive technologies to provide
	 * the right context to users.
	 */
	accessibilityLabel?: string;
	/**
	 * A title displayed at the top of the section. When provided, it serves as both a visible heading and the accessible name for the section. If omitted, you must provide an `accessibilityLabel` instead.
	 */
	heading?: string;
	/**
	 * Adjust the padding of all edges.
	 *
	 * - `base`: applies padding that is appropriate for the element. Note that it may result in no padding if
	 * this is the right design decision in a particular context.
	 * - `none`: removes all padding from the element. This can be useful when elements inside the section need to span
	 * to the edge of the section. For example, a full-width image. In this case, rely on `s-box` with a padding of 'base'
	 * to bring back the desired padding for the rest of the content.
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
	 * - `base`: Applies padding that is appropriate for the element. Note that it may result in no padding if Shopify believes this is the right design decision in a particular context.
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
	 * Adjusts the size of the spinner icon.
	 *
	 * @default 'base'
	 */
	size?: SizeKeyword;
	/**
	 * A label that describes the purpose of the progress. When set,
	 * it will be announced to users using assistive technologies and will
	 * provide them with more context. Providing an `accessibilityLabel` is
	 * recommended if there is no accompanying text describing that something
	 * is loading.
	 */
	accessibilityLabel?: string;
}
interface StackProps$1 extends GlobalProps, BaseBoxPropsWithRole, GapProps {
	/**
	 * The content of the Stack.
	 */
	children?: ComponentChildren;
	/**
	 * Sets how the children are placed within the Stack. This uses [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values).
	 *
	 * @default 'block'
	 *
	 * @implementation the content will wrap if the direction is 'inline', and not wrap if the direction is 'block'
	 */
	direction?: MaybeResponsive<"block" | "inline">;
	/**
	 * Aligns the Stack along the main axis.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
	 * @default 'normal'
	 */
	justifyContent?: MaybeResponsive<JustifyContentKeyword>;
	/**
	 * Aligns the Stack's children along the cross axis.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
	 * @default 'normal'
	 */
	alignItems?: MaybeResponsive<AlignItemsKeyword>;
	/**
	 * Aligns the Stack along the cross axis.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
	 * @default 'normal'
	 */
	alignContent?: MaybeResponsive<AlignContentKeyword>;
}
interface SummaryProps$1 extends GlobalProps {
	/**
	 * The content to use as the label.
	 *
	 * Interactive content is disallowed. For example, you can use a `<Text>` element for extra formatting but
	 * elements like buttons and fields are not allowed.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
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
	 * The content of the Text.
	 */
	children?: ComponentChildren;
	/**
	 * Provide semantic meaning and default styling to the text.
	 *
	 * Other presentation properties on Text override the default styling.
	 *
	 * @default 'generic'
	 */
	type?: TextType;
}
/** @publicDocs */
export type TextType = 
/**
 * Indicate the text is contact information. Typically used for addresses.
 *
 * This must have `inline` layout (despite the default being `block` in HTML hosts).
 *
 * Surfaces may apply styling to this type.
 *
 * In an HTML host, the text will be rendered in an `<address>` element.
 *
 * @implementation vertical alignment should be `baseline` (`vertical-align: baseline`)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
 */
"address"
/**
 * Indicate the text is no longer accurate or no longer relevant. One such use-case is discounted prices.
 *
 * Surfaces should apply styling to this type to suggest its content no longer applies.
 *
 * In an HTML host, the text will be rendered in a `<s>` element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
 */
 | "redundant"
/**
 * Indicate the text is marked or highlighted and relevant to the user’s current action.
 * One such use-case is to indicate the characters that matched a search query.
 *
 * Surfaces should apply styling to this type to draw attention to the content.
 *
 * In an HTML host, the text will be rendered in a `<mark>` element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
 */
 | "mark"
/**
 * Indicate emphatic stress. Typically for words that have a stressed emphasis compared to surrounding text.
 *
 * Surfaces should apply styling to this type to distinguish it from surrounding text. Italicization is a common choice, but not required.
 *
 * In an HTML host, the text will be rendered in an `<em>` element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em
 */
 | "emphasis"
/**
 * Indicate an offset from the normal prose of the text. Typically used to indicate
 * a foreign word, fictional character thoughts, or when the text refers to the definition of a word
 * instead of representing its semantic meaning.
 *
 * Surfaces should italicize this content by default.
 *
 * In an HTML host, the text will be rendered in a `<i>` tag.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
 */
 | "offset"
/**
 * Indicate strong importance, seriousness, or urgency.
 *
 * Surfaces should render this content bold by default.
 *
 * In an HTML host, the text will be rendered in a `<strong>` tag.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong
 */
 | "strong"
/**
 * Indicates the text is considered less important than the main content, but is still necessary for the reader to understand.
 * It can be used for secondary content but also for disclaimers, terms and conditions, or legal information.
 *
 * Surfaces should apply a smaller font size than the default size.
 *
 * In an HTML host, the text will be rendered in a `<small>` element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
 */
 | "small"
/**
 * No additional semantics or styling is applied.
 *
 * Surfaces must not apply any default styling to this type.
 *
 * In an HTML host, the text will be rendered in a `<span>` tag.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
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
	 * The content of the Time.
	 */
	children?: ComponentChildren;
	/**
	 * Set the time and/or date of the element.
	 *
	 * It must be a [valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time#valid_datetime_values).
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#valid_datetime_values
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
/** @publicDocs */
export interface URLFieldProps extends GlobalProps, BaseTextFieldProps, MinMaxLengthProps, AutocompleteProps<URLAutocompleteField> {
}
/** @publicDocs */
export type URLAutocompleteField = ExtractStrict<AnyAutocompleteField, "url" | "photo" | "impp" | `${AutocompleteAddressGroup} impp`>;




type ReducedAlignContentKeyword = Extract<AlignContentKeyword, 'normal' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'center' | 'start' | 'end'>;
type ReducedAlignItemsKeyword = Extract<AlignItemsKeyword, 'normal' | 'stretch' | 'baseline' | 'center' | 'start' | 'end'>;
type ReducedJustifyContentKeyword = Extract<JustifyContentKeyword, 'normal' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'center' | 'start' | 'end'>;
type ReducedJustifyItemsKeyword = Extract<JustifyItemsKeyword, 'normal' | 'stretch' | 'baseline' | 'center' | 'start' | 'end'>;
type ReducedBorderSizeKeyword = Extract<BorderSizeKeyword, 'none' | 'base' | 'large' | 'large-100' | 'large-200'>;
type ReducedColorKeyword = Extract<ColorKeyword, 'base'>;
type BorderShorthand = ReducedBorderSizeKeyword | `${ReducedBorderSizeKeyword} ${ReducedColorKeyword}` | `${ReducedBorderSizeKeyword} ${ReducedColorKeyword} ${BorderStyleKeyword}`;
/**
 * The base properties for elements that don't have children, providing essential attributes like keys and refs for component management.
 */
interface BaseElementProps<TClass = HTMLElement> {
    /**
     * A unique identifier for this element within its parent. Used by the rendering engine for efficient reconciliation when lists change.
     */
    key?: preact.Key;
    /**
     * A reference to the underlying DOM element, typically created using `useRef()`. This allows you to access and manipulate the DOM element directly in your component logic.
     */
    ref?: preact.Ref<TClass>;
    /**
     * Assigns this element to a named slot in a parent component that uses slot-based composition patterns.
     */
    slot?: Lowercase<string>;
}
/**
 * The base properties for elements that have children, extending `BaseElementProps` with children support.
 */
interface BaseElementPropsWithChildren<TClass = HTMLElement> extends BaseElementProps<TClass> {
    /**
     * The child elements to render within this component.
     */
    children?: preact.ComponentChildren;
}
/**
 * The complete list of [icon names](https://github.com/Shopify/ui-api-design/blob/main/packages/ui-api-design/src/components/Icon/Icon.ts#L10) available in checkout and customer account surfaces. These icons are drawn from Shopify's design system and cover common UI patterns like navigation, status indicators, actions, and commerce concepts.
 *
 * @see https://github.com/Shopify/ui-api-design/blob/main/packages/ui-api-design/src/components/Icon/Icon.ts#L10
 */
declare const CHECKOUT_AVAILABLE_ICONS: readonly ["alert-circle", "alert-triangle-filled", "alert-triangle", "arrow-down", "arrow-left", "arrow-right", "arrow-up-right", "arrow-up", "bag", "bullet", "calendar", "camera", "caret-down", "cart", "cash-dollar", "categories", "check-circle", "check", "chevron-down", "chevron-left", "chevron-right", "chevron-up", "circle", "clipboard", "clock", "credit-card", "delete", "delivered", "delivery", "disabled", "discount", "edit", "email", "empty", "external", "filter", "geolocation", "gift-card", "globe", "grid", "image", "info-filled", "info", "list-bulleted", "location", "lock", "map", "menu-horizontal", "menu-vertical", "menu", "minus", "mobile", "note", "order", "organization", "plus", "profile", "question-circle-filled", "question-circle", "reorder", "reset", "return", "savings", "search", "settings", "star-filled", "star-half", "star", "store", "truck", "upload", "x-circle-filled", "x-circle", "x"];
type ReducedIconTypes = (typeof CHECKOUT_AVAILABLE_ICONS)[number];

declare const tagName$Z = "s-abbreviation";
interface AbbreviationProps extends Pick<AbbreviationProps$1, 'title' | 'id'> {
}
interface AbbreviationElement extends AbbreviationProps, Omit<HTMLElement, 'id' | 'title'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$Z]: AbbreviationElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$Z]: AbbreviationProps & BaseElementPropsWithChildren<AbbreviationElement>;
        }
    }
}

declare const tagName$Y = "s-announcement";
interface AnnouncementEvents extends Pick<AnnouncementProps$1, 'onAfterToggle' | 'onDismiss' | 'onToggle'> {
}
interface AnnouncementElement extends AnnouncementMethods, Omit<HTMLElement, 'id' | 'ontoggle'> {
    onaftertoggle?: AnnouncementEvents['onAfterToggle'];
    ondismiss?: AnnouncementEvents['onDismiss'];
    ontoggle?: AnnouncementEvents['onToggle'];
}
interface AnnouncementProps extends AnnouncementEvents {
}
interface AnnouncementMethods {
    dismiss: () => void;
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$Y]: AnnouncementElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$Y]: AnnouncementProps & BaseElementPropsWithChildren<AnnouncementElement>;
        }
    }
}

declare const tagName$X = "s-badge";
interface BadgeProps extends Pick<BadgeProps$1, 'color' | 'icon' | 'iconPosition' | 'id' | 'size' | 'tone'> {
    size?: Extract<BadgeProps$1['size'], 'small' | 'small-100' | 'base'>;
    tone?: Extract<BadgeProps$1['tone'], 'auto' | 'neutral' | 'critical'>;
    color?: Extract<BadgeProps$1['color'], 'base' | 'subdued'>;
    icon?: '' | ReducedIconTypes;
}
interface BadgeElement extends BadgeProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$X]: BadgeElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$X]: BadgeProps & BaseElementPropsWithChildren<BadgeElement>;
        }
    }
}

declare const tagName$W = "s-banner";
interface BannerElementProps extends Pick<BannerProps$1, 'collapsible' | 'dismissible' | 'heading' | 'hidden' | 'id' | 'tone'> {
    tone?: Extract<BannerProps$1['tone'], 'auto' | 'info' | 'success' | 'warning' | 'critical'>;
}
interface BannerEvents extends Pick<BannerProps$1, 'onAfterHide' | 'onDismiss'> {
}
interface BannerElement extends BannerElementProps, Omit<HTMLElement, 'id' | 'title' | 'hidden'> {
    onafterhide: BannerEvents['onAfterHide'];
    ondismiss: BannerEvents['onDismiss'];
}
interface BannerProps extends BannerElementProps, BannerEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$W]: BannerElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$W]: BannerProps & BaseElementPropsWithChildren<BannerElement>;
        }
    }
}

declare const tagName$V = "s-box";
interface BoxProps extends Pick<BoxProps$1, 'accessibilityLabel' | 'accessibilityRole' | 'accessibilityVisibility' | 'background' | 'blockSize' | 'border' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'display' | 'id' | 'inlineSize' | 'maxBlockSize' | 'maxInlineSize' | 'minBlockSize' | 'minInlineSize' | 'overflow' | 'padding' | 'paddingBlock' | 'paddingBlockEnd' | 'paddingBlockStart' | 'paddingInline' | 'paddingInlineEnd' | 'paddingInlineStart'> {
    background?: Extract<BoxProps$1['background'], 'transparent' | 'subdued' | 'base'>;
    border?: BorderShorthand;
    borderWidth?: MaybeAllValuesShorthandProperty<ReducedBorderSizeKeyword> | '';
    borderRadius?: MaybeAllValuesShorthandProperty<Extract<BoxProps$1['borderRadius'], 'none' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'max'>>;
}
interface BoxElement extends BoxProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$V]: BoxElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$V]: BoxProps & BaseElementPropsWithChildren<BoxElement>;
        }
    }
}

declare const tagName$U = "s-button";
interface ButtonElementProps extends Pick<ButtonProps$1, 'accessibilityLabel' | 'command' | 'commandFor' | 'disabled' | 'href' | 'id' | 'inlineSize' | 'interestFor' | 'loading' | 'target' | 'tone' | 'type' | 'variant'> {
    target?: Extract<ButtonProps$1['target'], 'auto' | '_blank'>;
    tone?: Extract<ButtonProps$1['tone'], 'auto' | 'neutral' | 'critical'>;
    type?: Extract<ButtonProps$1['type'], 'submit' | 'button'>;
    variant?: Extract<ButtonProps$1['variant'], 'auto' | 'primary' | 'secondary'>;
}
interface ButtonEvents extends Pick<ButtonProps$1, 'onClick'> {
}
interface ButtonElement extends ButtonElementProps, Omit<HTMLElement, 'id' | 'onclick'> {
    onclick: ButtonEvents['onClick'];
}
interface ButtonProps extends ButtonElementProps, ButtonEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$U]: ButtonElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$U]: ButtonProps & BaseElementPropsWithChildren<ButtonElement>;
        }
    }
}

declare const tagName$T = "s-checkbox";
interface CheckboxElementProps extends Pick<CheckboxProps$1, 'accessibilityLabel' | 'checked' | 'command' | 'commandFor' | 'defaultChecked' | 'disabled' | 'error' | 'id' | 'label' | 'name' | 'required' | 'value'> {
    command?: Extract<CheckboxProps$1['command'], '--auto' | '--show' | '--hide' | '--toggle'>;
}
interface CheckboxEvents extends Pick<CheckboxProps$1, 'onChange'> {
}
interface CheckboxElement extends CheckboxElementProps, Omit<HTMLElement, 'id' | 'onchange'> {
    onchange: CheckboxEvents['onChange'];
}
interface CheckboxProps extends CheckboxElementProps, CheckboxEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$T]: CheckboxElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$T]: CheckboxProps & BaseElementProps<CheckboxElement>;
        }
    }
}

declare const tagName$S = "s-chip";
interface ChipElementProps extends Pick<ChipProps$1, 'accessibilityLabel' | 'id'> {
}
interface ChipProps extends ChipElementProps {
}
interface ChipElement extends ChipProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$S]: ChipElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$S]: ChipProps & BaseElementPropsWithChildren<ChipElement>;
        }
    }
}

declare const tagName$R = "s-choice";
interface ChoiceProps extends Pick<ChoiceProps$1, 'accessibilityLabel' | 'defaultSelected' | 'disabled' | 'id' | 'selected' | 'error' | 'value'> {
}
interface ChoiceElement extends ChoiceProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$R]: ChoiceElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$R]: ChoiceProps & BaseElementPropsWithChildren<ChoiceElement>;
        }
    }
}

declare const tagName$Q = "s-choice-list";
interface ChoiceListElementProps extends Pick<ChoiceListProps$1, 'disabled' | 'error' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'multiple' | 'name' | 'values' | 'variant'> {
}
interface ChoiceListEvents extends Pick<ChoiceListProps$1, 'onChange'> {
}
interface ChoiceListElement extends ChoiceListElementProps, Omit<HTMLElement, 'id' | 'onchange'> {
    onchange: ChoiceListEvents['onChange'];
}
interface ChoiceListProps extends ChoiceListElementProps, ChoiceListEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$Q]: ChoiceListElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$Q]: ChoiceListProps & BaseElementPropsWithChildren<ChoiceListElement>;
        }
    }
}

declare const tagName$P = "s-clickable";
interface ClickableElementProps extends Pick<ClickableProps$1, 'accessibilityLabel' | 'accessibilityVisibility' | 'background' | 'blockSize' | 'border' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'command' | 'commandFor' | 'disabled' | 'display' | 'href' | 'id' | 'inlineSize' | 'interestFor' | 'lang' | 'loading' | 'maxBlockSize' | 'maxInlineSize' | 'minBlockSize' | 'minInlineSize' | 'overflow' | 'padding' | 'paddingBlock' | 'paddingBlockEnd' | 'paddingBlockStart' | 'paddingInline' | 'paddingInlineEnd' | 'paddingInlineStart' | 'target' | 'type'> {
    background?: Extract<ClickableProps$1['background'], 'transparent' | 'subdued' | 'base'>;
    border?: BorderShorthand;
    borderWidth?: MaybeAllValuesShorthandProperty<ReducedBorderSizeKeyword> | '';
    borderRadius?: MaybeAllValuesShorthandProperty<Extract<ClickableProps$1['borderRadius'], 'none' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'max'>>;
    target?: Extract<ClickableProps$1['target'], 'auto' | '_blank'>;
    type?: Extract<ClickableProps$1['type'], 'submit' | 'button'>;
}
interface ClickableEvents extends Pick<ClickableProps$1, 'onBlur' | 'onClick' | 'onFocus'> {
}
interface ClickableElement extends ClickableElementProps, Omit<HTMLElement, 'id' | 'lang' | 'onblur' | 'onclick' | 'onfocus'> {
    onblur: ClickableEvents['onBlur'];
    onclick: ClickableEvents['onClick'];
    onfocus: ClickableEvents['onFocus'];
}
interface ClickableProps extends ClickableElementProps, ClickableEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$P]: ClickableElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$P]: ClickableProps & BaseElementPropsWithChildren<ClickableElement>;
        }
    }
}

declare const tagName$O = "s-clickable-chip";
interface ClickableChipElementProps extends Pick<ClickableChipProps$1, 'accessibilityLabel' | 'disabled' | 'hidden' | 'href' | 'id' | 'removable'> {
}
interface ClickableChipEvents extends Pick<ClickableChipProps$1, 'onAfterHide' | 'onClick' | 'onRemove'> {
}
interface ClickableChipElement extends ClickableChipElementProps, Omit<HTMLElement, 'id' | 'hidden' | 'onclick'> {
    onafterhide: ClickableChipEvents['onAfterHide'];
    onclick: ClickableChipEvents['onClick'];
    onremove: ClickableChipEvents['onRemove'];
}
interface ClickableChipProps extends ClickableChipElementProps, ClickableChipEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$O]: ClickableChipElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$O]: ClickableChipProps & BaseElementPropsWithChildren<ClickableChipElement>;
        }
    }
}

declare const tagName$N = "s-clipboard-item";
interface ClipboardItemElementProps extends Pick<ClipboardItemProps$1, 'id' | 'text'> {
}
interface ClipboardItemEvents extends Pick<ClipboardItemProps$1, 'onCopy' | 'onCopyError'> {
}
interface ClipboardItemElement extends ClipboardItemElementProps, Omit<HTMLElement, 'id' | 'oncopy'> {
    oncopy: ClipboardItemEvents['onCopy'];
    oncopyerror: ClipboardItemEvents['onCopyError'];
}
interface ClipboardItemProps extends ClipboardItemElementProps, ClipboardItemEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$N]: ClipboardItemElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$N]: ClipboardItemProps & BaseElementProps<ClipboardItemElement>;
        }
    }
}

declare const tagName$M = "s-consent-checkbox";
interface ConsentCheckboxElementProps extends Pick<ConsentCheckboxProps$1, 'accessibilityLabel' | 'checked' | 'command' | 'commandFor' | 'defaultChecked' | 'disabled' | 'error' | 'id' | 'label' | 'name' | 'policy' | 'value'> {
    command?: Extract<ConsentCheckboxProps$1['command'], '--auto' | '--show' | '--hide' | '--toggle'>;
}
interface ConsentCheckboxEvents extends Pick<CheckboxEvents, 'onChange'> {
}
interface ConsentCheckboxElement extends ConsentCheckboxElementProps, Omit<HTMLElement, 'id' | 'onchange'> {
    onchange: ConsentCheckboxEvents['onChange'];
}
interface ConsentCheckboxProps extends ConsentCheckboxElementProps, ConsentCheckboxEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$M]: ConsentCheckboxElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$M]: ConsentCheckboxProps & BaseElementProps<ConsentCheckboxElement>;
        }
    }
}

declare const tagName$L = "s-phone-field";
interface PhoneFieldElementProps extends Pick<PhoneFieldProps$1, 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'name' | 'readOnly' | 'required' | 'value' | 'type'> {
    /**
     * @deprecated Use `label` instead.
     * @private
     */
    placeholder?: string;
}
interface PhoneFieldEvents extends Pick<PhoneFieldProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
interface PhoneFieldElement extends PhoneFieldElementProps, Omit<HTMLElement, 'id' | 'onblur' | 'onchange' | 'onfocus' | 'oninput' | 'prefix'> {
    onblur: PhoneFieldEvents['onBlur'];
    onchange: PhoneFieldEvents['onChange'];
    onfocus: PhoneFieldEvents['onFocus'];
    oninput: PhoneFieldEvents['onInput'];
}
interface PhoneFieldProps extends PhoneFieldElementProps, PhoneFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$L]: PhoneFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$L]: PhoneFieldProps & BaseElementPropsWithChildren<PhoneFieldElement>;
        }
    }
}

declare const tagName$K = "s-consent-phone-field";
interface ConsentPhoneFieldElementProps extends Pick<ConsentPhoneFieldProps$1, 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'name' | 'policy' | 'readOnly' | 'required' | 'type' | 'value'> {
    /**
     * @deprecated Use `label` instead.
     * @private
     */
    placeholder?: string;
}
interface ConsentPhoneFieldEvents extends Pick<PhoneFieldEvents, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
interface ConsentPhoneFieldElement extends ConsentPhoneFieldElementProps, Omit<ConsentPhoneFieldEvents, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
    onblur: ConsentPhoneFieldEvents['onBlur'];
    onchange: ConsentPhoneFieldEvents['onChange'];
    onfocus: ConsentPhoneFieldEvents['onFocus'];
    oninput: ConsentPhoneFieldEvents['onInput'];
}
interface ConsentPhoneFieldProps extends ConsentPhoneFieldElementProps, ConsentPhoneFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$K]: ConsentPhoneFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$K]: ConsentPhoneFieldProps & BaseElementPropsWithChildren<ConsentPhoneFieldElement>;
        }
    }
}

declare const tagName$J = "s-date-field";
interface DateFieldElementProps extends Pick<DateFieldProps$1, 'allow' | 'allowDays' | 'autocomplete' | 'defaultValue' | 'defaultView' | 'disabled' | 'disallow' | 'disallowDays' | 'error' | 'id' | 'label' | 'name' | 'readOnly' | 'required' | 'value' | 'view'> {
    /**
     * @deprecated Use `label` instead.
     * @private
     */
    placeholder?: string;
}
interface DateFieldEvents extends Pick<DateFieldProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput' | 'onInvalid' | 'onViewChange'> {
}
interface DateFieldElement extends DateFieldElementProps, Omit<DateFieldEvents, 'onBlur' | 'onChange' | 'onFocus' | 'onInput' | 'onInvalid' | 'onViewChange'>, Omit<HTMLElement, 'id' | 'inputMode' | 'onblur' | 'onchange' | 'onfocus' | 'oninput' | 'oninvalid' | 'prefix'> {
    onblur: DateFieldEvents['onBlur'];
    onchange: DateFieldEvents['onChange'];
    onfocus: DateFieldEvents['onFocus'];
    oninput: DateFieldEvents['onInput'];
    oninvalid: DateFieldEvents['onInvalid'];
    onviewchange: DateFieldEvents['onViewChange'];
}
interface DateFieldProps extends DateFieldElementProps, DateFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$J]: DateFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$J]: DateFieldProps & BaseElementProps<DateFieldElement>;
        }
    }
}

declare const tagName$I = "s-date-picker";
interface DatePickerElementProps extends Pick<DatePickerProps$1, 'allow' | 'allowDays' | 'defaultValue' | 'defaultView' | 'disabled' | 'disallow' | 'disallowDays' | 'id' | 'name' | 'type' | 'value' | 'view'> {
}
interface DatePickerEvents extends Pick<DatePickerProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput' | 'onViewChange'> {
}
interface DatePickerElement extends DatePickerElementProps, Omit<DatePickerEvents, 'onBlur' | 'onChange' | 'onFocus' | 'onInput' | 'onViewChange'>, Omit<HTMLElement, 'id' | 'onblur' | 'onchange' | 'onfocus' | 'oninput'> {
    onblur: DatePickerEvents['onBlur'];
    onchange: DatePickerEvents['onChange'];
    onfocus: DatePickerEvents['onFocus'];
    oninput: DatePickerEvents['onInput'];
    onviewchange: DatePickerEvents['onViewChange'];
}
interface DatePickerProps extends DatePickerElementProps, DatePickerEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$I]: DatePickerElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$I]: DatePickerProps & BaseElementProps<DatePickerElement>;
        }
    }
}

declare const tagName$H = "s-details";
interface DetailsElementProps extends Pick<DetailsProps$1, 'defaultOpen' | 'id' | 'open' | 'toggleTransition'> {
}
interface DetailsEvents extends Pick<DetailsProps$1, 'onToggle' | 'onAfterToggle'> {
}
interface DetailsElement extends Omit<HTMLElement, 'ontoggle' | 'id'> {
    ontoggle: DetailsEvents['onToggle'];
    onaftertoggle: DetailsEvents['onAfterToggle'];
}
interface DetailsProps extends DetailsElementProps, DetailsEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$H]: DetailsElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$H]: DetailsProps & BaseElementPropsWithChildren<DetailsElement>;
        }
    }
}

declare const tagName$G = "s-divider";
interface DividerProps extends Pick<DividerProps$1, 'direction' | 'id'> {
}
interface DividerElement extends DividerProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$G]: DividerElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$G]: DividerProps & BaseElementPropsWithChildren<DividerElement>;
        }
    }
}

declare const tagName$F = "s-drop-zone";
interface DropZoneElementProps extends Pick<DropZoneProps$1, 'accept' | 'accessibilityLabel' | 'disabled' | 'error' | 'id' | 'label' | 'multiple' | 'name' | 'required' | 'value'> {
}
interface DropZoneEvents extends Pick<DropZoneProps$1, 'onDropRejected' | 'onInput' | 'onChange'> {
}
interface DropZoneElement extends DropZoneElementProps, Omit<HTMLElement, 'id' | 'oninput' | 'onchange'> {
    ondroprejected: DropZoneEvents['onDropRejected'];
    oninput: DropZoneEvents['onInput'];
    onchange: DropZoneEvents['onChange'];
}
interface DropZoneProps extends DropZoneElementProps, DropZoneEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$F]: DropZoneElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$F]: DropZoneProps & BaseElementProps<DropZoneElement>;
        }
    }
}

declare const tagName$E = "s-email-field";
interface EmailFieldElementProps extends Pick<EmailFieldProps$1, 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'maxLength' | 'minLength' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'name' | 'readOnly' | 'required' | 'value'> {
    /**
     * @deprecated Use `label` instead.
     * @private
     */
    placeholder?: string;
}
interface EmailFieldEvents extends Pick<EmailFieldProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
interface EmailFieldElement extends EmailFieldElementProps, Omit<HTMLElement, 'id' | 'onblur' | 'onchange' | 'onfocus' | 'oninput' | 'prefix'> {
    onblur: EmailFieldEvents['onBlur'];
    onchange: EmailFieldEvents['onChange'];
    onfocus: EmailFieldEvents['onFocus'];
    oninput: EmailFieldEvents['onInput'];
}
interface EmailFieldProps extends EmailFieldElementProps, EmailFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$E]: EmailFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$E]: EmailFieldProps & BaseElementPropsWithChildren<EmailFieldElement>;
        }
    }
}

declare const tagName$D = "s-form";
interface FormElementProps extends Pick<FormProps$1, 'disabled' | 'id'> {
}
interface FormEvents extends Pick<FormProps$1, 'onSubmit'> {
    /**
     * A callback that is run when the form is submitted.
     */
    onSubmit?: () => void;
}
interface FormElement extends FormElementProps, Omit<HTMLElement, 'id' | 'onsubmit'> {
    onsubmit: FormEvents['onSubmit'];
}
interface FormProps extends FormElementProps, FormEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$D]: FormElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$D]: FormProps & BaseElementPropsWithChildren<FormElement>;
        }
    }
}

declare const tagName$C = "s-grid-item";
interface GridItemProps extends Pick<GridItemProps$1, 'accessibilityLabel' | 'accessibilityRole' | 'accessibilityVisibility' | 'background' | 'blockSize' | 'border' | 'borderColor' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'display' | 'gridColumn' | 'gridRow' | 'id' | 'inlineSize' | 'maxBlockSize' | 'maxInlineSize' | 'minBlockSize' | 'minInlineSize' | 'overflow' | 'padding' | 'paddingBlock' | 'paddingBlockEnd' | 'paddingBlockStart' | 'paddingInline' | 'paddingInlineEnd' | 'paddingInlineStart'> {
    background?: Extract<GridItemProps$1['background'], 'transparent' | 'subdued' | 'base'>;
    border?: BorderShorthand;
    borderColor?: ReducedColorKeyword | '';
    borderWidth?: MaybeAllValuesShorthandProperty<ReducedBorderSizeKeyword> | '';
    borderRadius?: MaybeAllValuesShorthandProperty<Extract<GridItemProps$1['borderRadius'], 'none' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'max'>>;
}
interface GridItemElement extends GridItemProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$C]: GridItemElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$C]: GridItemProps & BaseElementPropsWithChildren<GridItemElement>;
        }
    }
}

declare const tagName$B = "s-grid";
interface GridProps extends Pick<GridProps$1, 'accessibilityLabel' | 'accessibilityRole' | 'accessibilityVisibility' | 'alignContent' | 'alignItems' | 'background' | 'blockSize' | 'border' | 'borderColor' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'columnGap' | 'display' | 'gap' | 'gridTemplateColumns' | 'gridTemplateRows' | 'id' | 'inlineSize' | 'justifyContent' | 'justifyItems' | 'maxBlockSize' | 'maxInlineSize' | 'minBlockSize' | 'minInlineSize' | 'overflow' | 'padding' | 'paddingBlock' | 'paddingBlockEnd' | 'paddingBlockStart' | 'paddingInline' | 'paddingInlineEnd' | 'paddingInlineStart' | 'placeContent' | 'placeItems' | 'rowGap'> {
    alignContent?: MaybeResponsive<ReducedAlignContentKeyword | ''>;
    alignItems?: MaybeResponsive<ReducedAlignItemsKeyword | ''>;
    background?: Extract<GridProps$1['background'], 'transparent' | 'subdued' | 'base'>;
    border?: BorderShorthand;
    borderColor?: ReducedColorKeyword | '';
    borderWidth?: MaybeAllValuesShorthandProperty<ReducedBorderSizeKeyword> | '';
    borderRadius?: MaybeAllValuesShorthandProperty<Extract<GridProps$1['borderRadius'], 'none' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'max'>>;
    justifyContent?: MaybeResponsive<ReducedJustifyContentKeyword | ''>;
    justifyItems?: MaybeResponsive<ReducedJustifyItemsKeyword | ''>;
    placeContent?: MaybeResponsive<`${ReducedAlignContentKeyword} ${ReducedJustifyContentKeyword}` | ReducedAlignContentKeyword>;
    placeItems?: MaybeResponsive<`${ReducedAlignItemsKeyword} ${ReducedJustifyItemsKeyword}` | ReducedAlignItemsKeyword>;
}
interface GridElement extends GridProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$B]: GridElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$B]: GridProps & BaseElementPropsWithChildren<GridElement>;
        }
    }
}

declare const tagName$A = "s-heading";
interface HeadingProps extends Pick<HeadingProps$1, 'accessibilityRole' | 'id'> {
}
interface HeadingElement extends HeadingProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$A]: HeadingElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$A]: HeadingProps & BaseElementPropsWithChildren<HeadingElement>;
        }
    }
}

declare const tagName$z = "s-icon";
interface IconProps extends Pick<IconProps$1, 'id' | 'size' | 'tone' | 'type'> {
    tone?: Extract<IconProps$1['tone'], 'auto' | 'neutral' | 'info' | 'success' | 'warning' | 'critical' | 'custom'>;
    size?: Extract<IconProps$1['size'], 'small-200' | 'small-100' | 'small' | 'base' | 'large' | 'large-100'>;
    type?: '' | ReducedIconTypes;
}
interface IconElement extends IconProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$z]: IconElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$z]: IconProps & BaseElementProps<IconElement>;
        }
    }
}

declare const tagName$y = "s-image";
interface ImageProps extends Pick<ImageProps$1, 'accessibilityRole' | 'alt' | 'aspectRatio' | 'border' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'id' | 'inlineSize' | 'loading' | 'objectFit' | 'sizes' | 'src' | 'srcSet'> {
    border?: BorderShorthand;
    borderWidth?: MaybeAllValuesShorthandProperty<ReducedBorderSizeKeyword> | '';
    borderRadius?: MaybeAllValuesShorthandProperty<Extract<ImageProps$1['borderRadius'], 'none' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'max'>>;
}
interface ImageElement extends ImageProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$y]: ImageElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$y]: ImageProps & BaseElementProps<ImageElement>;
        }
    }
}

declare const tagName$x = "s-link";
interface LinkElementProps extends Pick<LinkProps$1, 'accessibilityLabel' | 'command' | 'commandFor' | 'href' | 'id' | 'interestFor' | 'lang' | 'target' | 'tone'> {
    target?: Extract<LinkProps$1['target'], 'auto' | '_blank'>;
    tone?: Extract<LinkProps$1['tone'], 'auto' | 'neutral'>;
}
interface LinkEvents extends Pick<LinkProps$1, 'onClick'> {
}
interface LinkElement extends LinkElementProps, Omit<HTMLElement, 'id' | 'lang' | 'onclick'> {
    onclick: LinkEvents['onClick'];
}
interface LinkProps extends LinkElementProps, LinkEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$x]: LinkElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$x]: LinkProps & BaseElementPropsWithChildren<LinkElement>;
        }
    }
}

declare const tagName$w = "s-list-item";
interface ListItemProps extends Pick<ListItemProps$1, 'id'> {
}
interface ListItemElement extends ListItemProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$w]: ListItemElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$w]: ListItemProps & BaseElementPropsWithChildren<ListItemElement>;
        }
    }
}

declare const tagName$v = "s-map-marker";
interface MapMarkerElementProps extends Pick<MapMarkerProps$1, 'accessibilityLabel' | 'blockSize' | 'command' | 'commandFor' | 'clusterable' | 'inlineSize' | 'latitude' | 'longitude'> {
    /**
     * Sets the action the `commandFor` target should take when this component is activated. Learn more about the [`command` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command).
     *
     * - `--auto`: a default action for the target component.
     * - `--show`: shows the target component.
     * - `--hide`: hides the target component.
     * - `--toggle`: toggles the target component.
     *
     * @default '--auto'
     */
    command?: Extract<MapMarkerProps$1['command'], '--auto' | '--show' | '--hide' | '--toggle'>;
    /**
     * The ID of the component to control when this component is activated. Pair with the `command` property to specify what action to perform on the target component. Learn more about the [`commandFor` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#commandfor).
     */
    commandFor?: MapMarkerProps$1['commandFor'];
}
interface MapMarkerEvents extends Pick<MapMarkerProps$1, 'onClick'> {
}
interface MapMarkerElement extends MapMarkerElementProps, Omit<HTMLElement, 'id' | 'onclick'> {
    onclick: MapMarkerEvents['onClick'];
}
interface MapMarkerProps extends MapMarkerElementProps, MapMarkerEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$v]: MapMarkerElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$v]: MapMarkerProps & BaseElementPropsWithChildren<MapMarkerElement>;
        }
    }
}

declare const tagName$u = "s-map";
interface MapElementProps extends Pick<MapProps$1, 'accessibilityLabel' | 'apiKey' | 'blockSize' | 'id' | 'inlineSize' | 'latitude' | 'longitude' | 'maxBlockSize' | 'maxInlineSize' | 'maxZoom' | 'minBlockSize' | 'minInlineSize' | 'minZoom' | 'zoom'> {
}
interface MapEvents extends Pick<MapProps$1, 'onBoundsChange' | 'onClick' | 'onDblClick' | 'onViewChange'> {
}
interface MapElement extends MapElementProps, Omit<HTMLElement, 'id' | 'onclick' | 'ondblclick'> {
    onboundschange: MapEvents['onBoundsChange'];
    onclick: MapEvents['onClick'];
    ondblclick: MapEvents['onDblClick'];
    onviewchange: MapEvents['onViewChange'];
}
interface MapProps extends MapElementProps, MapEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$u]: MapElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$u]: MapProps & BaseElementPropsWithChildren<MapElement>;
        }
    }
}

declare const tagName$t = "s-modal";
interface ModalElementProps extends Pick<ModalProps$1, 'accessibilityLabel' | 'heading' | 'id' | 'padding' | 'size'> {
    /**
     * The size of the modal.
     *
     * - `'base'`: The default size, suitable for most use cases.
     * - `'small'`: A compact modal for simple confirmations or short messages.
     * - `'small-100'`: The smallest modal size.
     * - `'large'`: A large modal for complex content or forms.
     * - `'large-100'`: The largest fixed-size modal, providing maximum room for content.
     * - `'max'`: Expands the modal to its maximum size as defined by the host application, on both the horizontal and vertical axes.
     *
     * @default 'base'
     */
    size?: Extract<ModalProps$1['size'], 'small-100' | 'small' | 'base' | 'large-100' | 'large' | 'max'>;
}
interface ModalEvents extends Pick<ModalProps$1, 'onAfterHide' | 'onAfterShow' | 'onHide' | 'onShow'> {
}
interface ModalElementMethods extends Pick<ModalProps$1, 'hideOverlay'> {
}
interface ModalElement extends ModalElementProps, ModalElementMethods, Omit<HTMLElement, 'id'> {
    onafterhide: ModalEvents['onAfterHide'];
    onaftershow: ModalEvents['onAfterShow'];
    onhide: ModalEvents['onHide'];
    onshow: ModalEvents['onShow'];
}
interface ModalProps extends ModalElementProps, ModalEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$t]: ModalElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$t]: ModalProps & BaseElementPropsWithChildren<ModalElement>;
        }
    }
}

declare const tagName$s = "s-money-field";
interface MoneyFieldElementProps extends Pick<MoneyFieldProps$1, 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'max' | 'min' | 'name' | 'readOnly' | 'required' | 'step' | 'value'> {
}
interface MoneyFieldEvents extends Pick<MoneyFieldProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
interface MoneyFieldElement extends MoneyFieldElementProps {
    onblur: MoneyFieldEvents['onBlur'];
    onchange: MoneyFieldEvents['onChange'];
    onfocus: MoneyFieldEvents['onFocus'];
    oninput: MoneyFieldEvents['onInput'];
}
interface MoneyFieldProps extends MoneyFieldElementProps, MoneyFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$s]: MoneyFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$s]: MoneyFieldProps & BaseElementProps<MoneyFieldElement>;
        }
    }
}

declare const tagName$r = "s-number-field";
interface NumberFieldElementProps extends Pick<NumberFieldProps$1, 'autocomplete' | 'controls' | 'defaultValue' | 'disabled' | 'error' | 'icon' | 'inputMode' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'max' | 'min' | 'name' | 'prefix' | 'readOnly' | 'required' | 'step' | 'suffix' | 'value'> {
    icon?: IconProps['type'];
    /**
     * @deprecated Use `label` instead.
     * @private
     */
    placeholder?: string;
}
interface NumberFieldEvents extends Pick<NumberFieldProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
interface NumberFieldElement extends NumberFieldElementProps, Omit<HTMLElement, 'id' | 'inputMode' | 'onblur' | 'onchange' | 'onfocus' | 'oninput' | 'prefix'> {
    onblur: NumberFieldEvents['onBlur'];
    onchange: NumberFieldEvents['onChange'];
    onfocus: NumberFieldEvents['onFocus'];
    oninput: NumberFieldEvents['onInput'];
}
interface NumberFieldProps extends NumberFieldElementProps, NumberFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$r]: NumberFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$r]: NumberFieldProps & BaseElementPropsWithChildren<NumberFieldElement>;
        }
    }
}

declare const tagName$q = "s-option";
interface OptionProps extends Pick<OptionProps$1, 'accessibilityLabel' | 'defaultSelected' | 'disabled' | 'id' | 'selected' | 'value'> {
}
interface OptionElement extends OptionProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$q]: OptionElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$q]: OptionProps & BaseElementPropsWithChildren<OptionElement>;
        }
    }
}

declare const tagName$p = "s-ordered-list";
interface OrderedListProps extends OrderedListProps$1 {
}
interface OrderedListElement extends OrderedListProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$p]: OrderedListElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$p]: OrderedListProps & BaseElementPropsWithChildren<OrderedListElement>;
        }
    }
}

declare const tagName$o = "s-paragraph";
interface ParagraphProps extends Pick<ParagraphProps$1, 'accessibilityVisibility' | 'color' | 'dir' | 'id' | 'lang' | 'tone' | 'type'> {
    color?: Extract<ParagraphProps$1['color'], 'subdued' | 'base'>;
    tone?: Extract<ParagraphProps$1['tone'], 'auto' | 'info' | 'success' | 'warning' | 'critical' | 'neutral' | 'custom'>;
}
interface ParagraphElement extends ParagraphProps, Omit<HTMLElement, 'id' | 'dir' | 'lang'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$o]: ParagraphElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$o]: ParagraphProps & BaseElementPropsWithChildren<ParagraphElement>;
        }
    }
}

declare const tagName$n = "s-password-field";
interface PasswordFieldElementProps extends Pick<PasswordFieldProps$1, 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'maxLength' | 'minLength' | 'name' | 'readOnly' | 'required' | 'value'> {
}
interface PasswordFieldEvents extends Pick<PasswordFieldProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
interface PasswordFieldElement extends PasswordFieldProps, Omit<HTMLElement, 'id' | 'inputMode' | 'onblur' | 'onchange' | 'onfocus' | 'oninput' | 'prefix'> {
    onblur: PasswordFieldEvents['onBlur'];
    onchange: PasswordFieldEvents['onChange'];
    onfocus: PasswordFieldEvents['onFocus'];
    oninput: PasswordFieldEvents['onInput'];
}
interface PasswordFieldProps extends PasswordFieldElementProps, PasswordFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$n]: PasswordFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$n]: PasswordFieldProps & BaseElementPropsWithChildren<PasswordFieldElement>;
        }
    }
}

declare const tagName$m = "s-payment-icon";
interface PaymentIconProps extends PaymentIconProps$1 {
}
interface PaymentIconElement extends PaymentIconProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$m]: PaymentIconElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$m]: PaymentIconProps & BaseElementProps<PaymentIconElement>;
        }
    }
}

declare const tagName$l = "s-popover";
interface PopoverElementProps extends Pick<PopoverProps$1, 'id'> {
    /**
     * The block size of the popover (height in horizontal writing modes). Learn more about the [block-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/block-size).
     *
     * @default 'auto'
     */
    blockSize?: SizeUnitsOrAuto;
    /**
     * The inline size of the popover (width in horizontal writing modes). Learn more about the [inline-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size).
     *
     * @default 'auto'
     */
    inlineSize?: SizeUnitsOrAuto;
    /**
     * The maximum block size of the popover. Constrains the popover's height to prevent it from exceeding this value. Learn more about the [max-block-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size).
     *
     * @default 'none'
     */
    maxBlockSize?: SizeUnitsOrNone;
    /**
     * The maximum inline size of the popover. Constrains the popover's width to prevent it from exceeding this value. Learn more about the [max-inline-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/max-inline-size).
     *
     * @default 'none'
     */
    maxInlineSize?: SizeUnitsOrNone;
    /**
     * The minimum block size of the popover. Ensures the popover maintains at least this height. Learn more about the [min-block-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size).
     *
     * @default '0'
     */
    minBlockSize?: SizeUnits;
    /**
     * The minimum inline size of the popover. Ensures the popover maintains at least this width. Learn more about the [min-inline-size property](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size).
     *
     * @default '0'
     */
    minInlineSize?: SizeUnits;
}
interface PopoverEvents extends Pick<PopoverProps$1, 'onHide' | 'onShow'> {
}
interface PopoverElement extends Omit<PopoverProps, 'onHide' | 'onShow'>, Omit<HTMLElement, 'id'> {
    onhide: PopoverProps['onHide'];
    onshow: PopoverProps['onShow'];
}
interface PopoverProps extends PopoverElementProps, PopoverEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$l]: PopoverElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$l]: PopoverProps & BaseElementPropsWithChildren<PopoverElement>;
        }
    }
}

declare const tagName$k = "s-press-button";
interface PressButtonElementProps extends Pick<PressButtonProps$1, 'accessibilityLabel' | 'id' | 'inlineSize' | 'lang' | 'disabled' | 'loading' | 'pressed' | 'defaultPressed'> {
}
interface PressButtonEvents extends Pick<PressButtonProps$1, 'onClick' | 'onBlur' | 'onFocus'> {
}
interface PressButtonElement extends PressButtonElementProps, Omit<HTMLElement, 'children' | 'lang' | 'id' | 'onblur' | 'onclick' | 'onfocus'> {
    onblur: PressButtonEvents['onBlur'];
    onclick: PressButtonEvents['onClick'];
    onfocus: PressButtonEvents['onFocus'];
}
interface PressButtonProps extends PressButtonElementProps, PressButtonEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$k]: PressButtonElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$k]: PressButtonProps & BaseElementPropsWithChildren<PressButtonElement>;
        }
    }
}

declare const tagName$j = "s-product-thumbnail";
interface ProductThumbnailProps extends Pick<ProductThumbnailProps$1, 'alt' | 'size' | 'sizes' | 'src' | 'srcSet' | 'totalItems'> {
    size?: Extract<ProductThumbnailProps$1['size'], 'small-100' | 'small' | 'base'>;
}
interface ProductThumbnailElement extends ProductThumbnailProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$j]: ProductThumbnailElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$j]: ProductThumbnailProps & BaseElementProps<ProductThumbnailElement>;
        }
    }
}

declare const tagName$i = "s-progress";
interface ProgressProps extends Pick<ProgressProps$1, 'accessibilityLabel' | 'id' | 'max' | 'tone' | 'value'> {
    tone?: Extract<ProgressProps$1['tone'], 'auto' | 'critical'>;
}
interface ProgressElement extends ProgressProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$i]: ProgressElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$i]: ProgressProps & BaseElementProps<ProgressElement>;
        }
    }
}

declare const tagName$h = "s-qr-code";
interface QRCodeElementProps extends QRCodeProps$1 {
}
interface QRCodeEvents extends Pick<QRCodeProps$1, 'onError'> {
}
interface QRCodelement extends QRCodeElementProps, Omit<HTMLElement, 'id' | 'onerror'> {
    onerror: QRCodeEvents['onError'];
}
interface QRCodeProps extends QRCodeElementProps, QRCodeEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$h]: QRCodelement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$h]: QRCodeProps & BaseElementProps<QRCodelement>;
        }
    }
}

declare const tagName$g = "s-query-container";
interface QueryContainerElementProps extends Pick<QueryContainerProps$1, 'containerName' | 'id'> {
}
interface QueryContainerElement extends QueryContainerElementProps, Omit<HTMLElement, 'id'> {
}
interface QueryContainerProps extends QueryContainerElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$g]: QueryContainerElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$g]: QueryContainerProps & BaseElementPropsWithChildren<QueryContainerElement>;
        }
    }
}

declare const tagName$f = "s-scroll-box";
interface ScrollBoxProps extends Pick<ScrollBoxProps$1, 'accessibilityLabel' | 'accessibilityRole' | 'accessibilityVisibility' | 'background' | 'blockSize' | 'border' | 'borderColor' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'display' | 'id' | 'inlineSize' | 'maxBlockSize' | 'maxInlineSize' | 'minBlockSize' | 'minInlineSize' | 'overflow' | 'padding' | 'paddingBlock' | 'paddingBlockEnd' | 'paddingBlockStart' | 'paddingInline' | 'paddingInlineEnd' | 'paddingInlineStart'> {
    background?: Extract<ScrollBoxProps$1['background'], 'transparent' | 'subdued' | 'base'>;
    border?: BorderShorthand;
    borderColor?: ReducedColorKeyword | '';
    borderRadius?: MaybeAllValuesShorthandProperty<Extract<ScrollBoxProps$1['borderRadius'], 'none' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'max'>>;
    borderWidth?: MaybeAllValuesShorthandProperty<ReducedBorderSizeKeyword> | '';
}
interface ScrollBoxElement extends ScrollBoxProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$f]: ScrollBoxElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$f]: ScrollBoxProps & BaseElementPropsWithChildren<ScrollBoxElement>;
        }
    }
}

declare const tagName$e = "s-section";
interface SectionProps extends Pick<SectionProps$1, 'accessibilityLabel' | 'heading' | 'id'> {
}
interface SectionElement extends SectionProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$e]: SectionElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$e]: SectionProps & BaseElementPropsWithChildren<SectionElement>;
        }
    }
}

declare const tagName$d = "s-select";
interface SelectElementProps extends Pick<SelectProps$1, 'autocomplete' | 'disabled' | 'error' | 'id' | 'label' | 'name' | 'placeholder' | 'required' | 'value'> {
}
interface SelectEvents extends Pick<SelectProps$1, 'onBlur' | 'onChange' | 'onFocus'> {
}
interface SelectElement extends SelectElementProps, Omit<HTMLElement, 'id' | 'onblur' | 'onchange' | 'onfocus'> {
    onblur: SelectEvents['onBlur'];
    onchange: SelectEvents['onChange'];
    onfocus: SelectEvents['onFocus'];
}
interface SelectProps extends SelectElementProps, SelectEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$d]: SelectElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$d]: SelectProps & BaseElementPropsWithChildren<SelectElement>;
        }
    }
}

declare const tagName$c = "s-sheet";
interface SheetElementProps extends Pick<SheetProps$1, 'defaultOpen' | 'heading' | 'id'> {
    /**
     * A label that describes the purpose of the sheet, announced by assistive technologies. When set, screen readers will use this label instead of the `heading` to describe the sheet.
     */
    accessibilityLabel?: string;
}
interface SheetEvents extends Pick<SheetProps$1, 'onAfterHide' | 'onAfterShow' | 'onHide' | 'onShow'> {
}
interface SheetElementMethods extends Pick<SheetProps$1, 'hideOverlay'> {
}
interface SheetElement extends SheetElementProps, SheetElementMethods, Omit<HTMLElement, 'id'> {
    afterhide: SheetEvents['onAfterHide'];
    aftershow: SheetEvents['onAfterShow'];
    onhide: SheetEvents['onHide'];
    onshow: SheetEvents['onShow'];
    onafterhide: SheetEvents['onAfterHide'];
    onaftershow: SheetEvents['onAfterShow'];
}
interface SheetProps extends SheetElementProps, SheetEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$c]: SheetElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$c]: SheetProps & BaseElementPropsWithChildren<SheetElement>;
        }
    }
}

declare const tagName$b = "s-skeleton-paragraph";
interface SkeletonParagraphProps extends SkeletonParagraphProps$1 {
}
interface SkeletonParagraphElement extends SkeletonParagraphProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$b]: SkeletonParagraphElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$b]: SkeletonParagraphProps & BaseElementProps<SkeletonParagraphElement>;
        }
    }
}

declare const tagName$a = "s-spinner";
interface SpinnerProps extends SpinnerProps$1 {
    size?: Extract<SpinnerProps$1['size'], 'small-100' | 'small' | 'base' | 'large' | 'large-100'>;
}
interface SpinnerElement extends SpinnerProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$a]: SpinnerElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$a]: SpinnerProps & BaseElementProps<SpinnerElement>;
        }
    }
}

declare const tagName$9 = "s-stack";
interface StackProps extends Pick<StackProps$1, 'accessibilityLabel' | 'accessibilityRole' | 'alignContent' | 'alignItems' | 'background' | 'blockSize' | 'border' | 'borderRadius' | 'borderStyle' | 'borderWidth' | 'columnGap' | 'direction' | 'display' | 'gap' | 'id' | 'inlineSize' | 'justifyContent' | 'maxBlockSize' | 'maxInlineSize' | 'minBlockSize' | 'minInlineSize' | 'overflow' | 'padding' | 'paddingBlock' | 'paddingBlockEnd' | 'paddingBlockStart' | 'paddingInline' | 'paddingInlineEnd' | 'paddingInlineStart' | 'rowGap'> {
    accessibilityRole?: Extract<StackProps$1['accessibilityRole'], 'main' | 'header' | 'footer' | 'section' | 'aside' | 'navigation' | 'ordered-list' | 'list-item' | 'list-item-separator' | 'unordered-list' | 'separator' | 'status' | 'alert' | 'generic' | 'none'>;
    background?: Extract<StackProps$1['background'], 'transparent' | 'subdued' | 'base'>;
    border?: BorderShorthand;
    borderWidth?: MaybeAllValuesShorthandProperty<ReducedBorderSizeKeyword> | '';
    borderRadius?: MaybeAllValuesShorthandProperty<Extract<StackProps$1['borderRadius'], 'none' | 'small-100' | 'small' | 'base' | 'large' | 'large-100' | 'max'>>;
    alignContent?: MaybeResponsive<Extract<StackProps$1['alignContent'], 'normal' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'center' | 'start' | 'end'>>;
    alignItems?: MaybeResponsive<Extract<StackProps$1['alignItems'], 'normal' | 'stretch' | 'center' | 'start' | 'end'>>;
    justifyContent?: MaybeResponsive<Extract<StackProps$1['justifyContent'], 'normal' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'center' | 'start' | 'end'>>;
}
interface StackElement extends StackProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$9]: StackElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$9]: StackProps & BaseElementPropsWithChildren<StackElement>;
        }
    }
}

declare const tagName$8 = "s-summary";
interface SummaryProps extends Pick<SummaryProps$1, 'id'> {
}
interface SummaryElement extends SummaryProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$8]: SummaryElement;
    }
}
declare module 'preact' {
    interface BaseProps {
        children?: preact.ComponentChildren;
        slot?: Lowercase<string>;
    }
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$8]: SummaryProps & BaseProps;
        }
    }
}

declare const tagName$7 = "s-switch";
interface SwitchElementProps extends Pick<SwitchProps$1, 'accessibilityLabel' | 'checked' | 'command' | 'commandFor' | 'defaultChecked' | 'disabled' | 'id' | 'label' | 'name' | 'value'> {
    command?: Extract<SwitchProps$1['command'], '--auto' | '--show' | '--hide' | '--toggle'>;
}
interface SwitchEvents extends Pick<SwitchProps$1, 'onChange'> {
}
interface SwitchElement extends SwitchElementProps, Omit<HTMLElement, 'id' | 'onchange'> {
    onchange: SwitchEvents['onChange'];
}
interface SwitchProps extends SwitchElementProps, SwitchEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$7]: SwitchElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$7]: SwitchProps & BaseElementProps<SwitchElement>;
        }
    }
}

declare const tagName$6 = "s-text-area";
interface TextAreaElementProps extends Pick<TextAreaProps$1, 'id' | 'label' | 'name' | 'required' | 'value' | 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'readOnly' | 'rows' | 'maxLength' | 'minLength' | 'labelAccessibilityVisibility'> {
    /**
     * @deprecated Use `label` instead.
     * @private
     */
    placeholder?: string;
}
interface TextAreaEvents extends Pick<TextAreaProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
interface TextAreaElement extends TextAreaElementProps, Omit<HTMLElement, 'id' | 'onblur' | 'onchange' | 'onfocus' | 'oninput'> {
    onblur: TextAreaEvents['onBlur'];
    onchange: TextAreaEvents['onChange'];
    onfocus: TextAreaEvents['onFocus'];
    oninput: TextAreaEvents['onInput'];
}
interface TextAreaProps extends TextAreaElementProps, TextAreaEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$6]: TextAreaElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$6]: TextAreaProps & BaseElementProps<TextAreaElement>;
        }
    }
}

declare const tagName$5 = "s-text-field";
interface TextFieldElementProps extends Pick<TextFieldProps$1, 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'icon' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'maxLength' | 'minLength' | 'name' | 'prefix' | 'readOnly' | 'required' | 'suffix' | 'value'> {
    icon?: IconProps['type'];
    /**
     * @deprecated Use `label` instead.
     * @private
     */
    placeholder?: string;
}
interface TextFieldEvents extends Pick<TextFieldProps$1, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
interface TextFieldElement extends TextFieldElementProps, Omit<HTMLElement, 'id' | 'onblur' | 'onchange' | 'onfocus' | 'oninput' | 'prefix'> {
    onblur: TextFieldEvents['onBlur'];
    onchange: TextFieldEvents['onChange'];
    onfocus: TextFieldEvents['onFocus'];
    oninput: TextFieldEvents['onInput'];
}
interface TextFieldProps extends TextFieldElementProps, TextFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$5]: TextFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$5]: TextFieldProps & BaseElementPropsWithChildren<TextFieldElement>;
        }
    }
}

declare const tagName$4 = "s-text";
interface TextProps extends Pick<TextProps$1, 'accessibilityVisibility' | 'color' | 'dir' | 'display' | 'id' | 'lang' | 'tone' | 'type'> {
    color?: Extract<TextProps$1['color'], 'subdued' | 'base'>;
    tone?: Extract<TextProps$1['tone'], 'auto' | 'neutral' | 'info' | 'success' | 'warning' | 'critical' | 'custom'>;
    type?: Extract<TextProps$1['type'], 'address' | 'redundant' | 'mark' | 'emphasis' | 'offset' | 'small' | 'strong' | 'generic'>;
}
interface TextElement extends TextProps, Omit<HTMLElement, 'id' | 'dir' | 'lang'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$4]: TextElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$4]: TextProps & BaseElementPropsWithChildren<TextElement>;
        }
    }
}

declare const tagName$3 = "s-time";
interface TimeProps extends Pick<TimeProps$1, 'dateTime' | 'id'> {
}
interface TimeElement extends TimeProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$3]: TimeElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$3]: TimeProps & BaseElementPropsWithChildren<TimeElement>;
        }
    }
}

declare const tagName$2 = "s-tooltip";
interface TooltipElementProps extends Pick<TooltipProps$1, 'id'> {
}
interface TooltipElement extends TooltipElementProps {
}
interface TooltipProps extends TooltipElementProps {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$2]: TooltipElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$2]: TooltipProps & BaseElementPropsWithChildren<TooltipElement>;
        }
    }
}

declare const tagName$1 = "s-unordered-list";
interface UnorderedListProps extends UnorderedListProps$1 {
}
interface UnorderedListElement extends UnorderedListProps, Omit<HTMLElement, 'id'> {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName$1]: UnorderedListElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName$1]: UnorderedListProps & BaseElementPropsWithChildren<UnorderedListElement>;
        }
    }
}

declare const tagName = "s-url-field";
interface UrlFieldElementProps extends Pick<URLFieldProps, 'autocomplete' | 'defaultValue' | 'disabled' | 'error' | 'id' | 'label' | 'labelAccessibilityVisibility' | 'maxLength' | 'minLength' | 'name' | 'readOnly' | 'required' | 'value'> {
}
interface UrlFieldEvents extends Pick<URLFieldProps, 'onBlur' | 'onChange' | 'onFocus' | 'onInput'> {
}
interface UrlFieldElement extends UrlFieldElementProps, Omit<HTMLElement, 'id' | 'onblur' | 'onchange' | 'onfocus' | 'oninput' | 'prefix'> {
    onblur: UrlFieldEvents['onBlur'];
    onchange: UrlFieldEvents['onChange'];
    onfocus: UrlFieldEvents['onFocus'];
    oninput: UrlFieldEvents['onInput'];
}
interface UrlFieldProps extends UrlFieldElementProps, UrlFieldEvents {
}
declare global {
    interface HTMLElementTagNameMap {
        [tagName]: UrlFieldElement;
    }
}
declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicElements {
            [tagName]: UrlFieldProps & BaseElementPropsWithChildren<UrlFieldElement>;
        }
    }
}

export type { AbbreviationProps, AnnouncementProps, BadgeProps, BannerProps, BoxProps, ButtonProps, CheckboxProps, ChipProps, ChoiceListProps, ChoiceProps, ClickableChipProps, ClickableProps, ClipboardItemProps, ConsentCheckboxProps, ConsentPhoneFieldProps, DateFieldProps, DatePickerProps, DetailsProps, DividerProps, DropZoneProps, EmailFieldProps, FormProps, GridItemProps, GridProps, HeadingProps, IconProps, ImageProps, LinkProps, ListItemProps, MapMarkerProps, MapProps, ModalProps, MoneyFieldProps, NumberFieldProps, OptionProps, OrderedListProps, ParagraphProps, PasswordFieldProps, PaymentIconProps, PhoneFieldProps, PopoverProps, PressButtonProps, ProductThumbnailProps, ProgressProps, QRCodeProps, QueryContainerProps, ScrollBoxProps, SectionProps, SelectProps, SheetProps, SkeletonParagraphProps, SpinnerProps, StackProps, SummaryProps, SwitchProps, TextAreaProps, TextFieldProps, TextProps, TimeProps, TooltipProps, UnorderedListProps, UrlFieldProps };
