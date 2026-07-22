import { OrderStatusApi } from './order-status/order-status';
import { StandardApi } from './standard-api/standard-api';
import { CartLineItemApi } from './cart-line/cart-line-item';
/**
 * An event type that narrows the `currentTarget` to the specific HTML element associated with the custom element tag. This provides type-safe event handling in callback listeners.
 */
export type CallbackEvent<TTagName extends keyof HTMLElementTagNameMap, TEvent extends Event = Event> = TEvent & {
    currentTarget: HTMLElementTagNameMap[TTagName];
};
/**
 * A typed event listener for custom element events. The listener receives a `CallbackEvent` with the correct `currentTarget` type for the associated custom element tag.
 */
export type CallbackEventListener<TTagName extends keyof HTMLElementTagNameMap, TEvent extends Event = Event> = (EventListener & {
    (event: CallbackEvent<TTagName, TEvent>): void;
}) | null;
declare const buttonTagName = "s-button";
interface ButtonProps {
    /**
     * A label that describes the purpose or contents of the Button. It will be read to users using assistive technologies such as screen readers.
     *
     * Use this when using only an icon or the button text is not enough context
     * for users using assistive technologies.
     */
    accessibilityLabel?: string;
    /**
     * The ID of the component to control when this component is activated. Pair with the `command` property to specify what action to perform on the target component. Learn more about the [`commandFor` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#commandfor).
     */
    commandFor?: string;
    /**
     * Sets the action the `commandFor` target should take when this component is activated.
     *
     * - `--auto`: A default action for the target component.
     * - `--show`: Shows the target component.
     * - `--hide`: Hides the target component.
     * - `--toggle`: Toggles the target component.
     * - `--copy`: Copies the target clipboard item.
     *
     * Learn more about the [`command` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#command).
     *
     * @default '--auto'
     */
    command?: '--auto' | '--show' | '--hide' | '--toggle' | '--copy';
    /**
     * Disables the button, disallowing any interaction.
     *
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * The URL to link to.
     *
     * - If set, it will navigate to the location specified by `href` after executing the `onClick` callback.
     * - If a `commandFor` is set, the `command` will be executed instead of the navigation.
     */
    href?: string;
    /**
     * A unique identifier for the element.
     */
    id?: string;
    /**
     * Replaces content with a loading indicator.
     *
     * @defaultValue false
     */
    loading?: boolean;
    /**
     * Specifies where to display the linked URL.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target
     *
     * 'auto' - The target is automatically determined based on the origin of the URL. Surfaces can set specific rules on how they handle each URL.
     * It’s expected that the behavior of `auto` is as `_self` except in specific cases.
     * For example, a surface could decide to open cross-origin URLs in a new window (as `_blank`).
     *
     * @default 'auto'
     */
    target?: 'auto' | '_self' | '_blank';
    /**
     * Sets the tone of the Button, based on the intention of the information being conveyed.
     *
     * @default 'auto'
     */
    tone?: 'auto' | 'neutral' | 'critical';
    /**
     * The behavior of the button.
     *
     * - `'submit'`: Submits the nearest containing form.
     * - `'button'`: Performs no default action, relying on the `click` event handler for behavior.
     *
     * This property is ignored if the component supports `href` or `commandFor`/`command` and one of them is set.
     *
     * @default 'button'
     */
    type?: 'button' | 'submit';
    /**
     * Changes the visual appearance of the Button.
     *
     * @default 'auto' - the variant is automatically determined by the Button's context
     */
    variant?: 'auto' | 'primary' | 'secondary';
    /**
     * Callback when the button is activated.
     * This will be called before the action indicated by `type`.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
     */
    click?: ((event: CallbackEventListener<typeof buttonTagName>) => void) | null;
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_MetafieldsApi extends Pick<OrderStatusApi<any>, 'appMetafields' | 'metafields'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_AttributesApi extends Pick<OrderStatusApi<any>, 'attributes'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_BuyerIdentityApi extends Pick<OrderStatusApi<any>, 'buyerIdentity'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_CheckoutSettingsApi extends Pick<OrderStatusApi<any>, 'checkoutSettings'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_CostApi extends Pick<OrderStatusApi<any>, 'cost'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_LocalizationApi extends Pick<OrderStatusApi<any>, 'localization'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_DiscountsApi extends Pick<OrderStatusApi<any>, 'discountAllocations' | 'discountCodes'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_GiftCardsApi extends Pick<OrderStatusApi<any>, 'appliedGiftCards'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_NoteApi extends Pick<OrderStatusApi<any>, 'note'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_AddressApi extends Pick<OrderStatusApi<any>, 'shippingAddress' | 'billingAddress'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_ShopApi extends Pick<OrderStatusApi<any>, 'shop'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_RequireLoginApi extends Pick<OrderStatusApi<any>, 'requireLogin'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_AuthenticationStateApi extends Pick<OrderStatusApi<any>, 'authenticationState'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_CartLinesApi extends Pick<OrderStatusApi<any>, 'lines'> {
}
/**
 * The API object provided to `customer-account.order-status.cart-line-item.render-after` extension targets for interacting with individual cart line items.
 * @publicDocs
 */
export interface Docs_CartLineItem_CartLinesApi extends Pick<CartLineItemApi, 'target'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderStatus_OrderApi extends Pick<OrderStatusApi<any>, 'order'> {
}
/**
 * @publicDocs
 */
export interface Docs_Standard_ExtensionApi extends Pick<StandardApi<any>, 'extension'> {
}
/**
 * @publicDocs
 */
export interface Docs_Standard_AuthenticatedAccountApi extends Pick<StandardApi<any>, 'authenticatedAccount'> {
}
/**
 * @publicDocs
 */
export interface Docs_Standard_VersionApi extends Pick<StandardApi<any>, 'version'> {
}
/**
 * The base API object provided to this and other `customer-account` extension targets.
 * @publicDocs
 */
export interface Docs_Standard_LocalizationApi extends Pick<StandardApi<any>, 'localization' | 'i18n'> {
}
/**
 * The base API object provided to this and other `customer-account` extension targets.
 * @publicDocs
 */
export interface Docs_Standard_SessionTokenApi extends Pick<StandardApi<any>, 'sessionToken'> {
}
/**
 * The base API object provided to this and other `customer-account` extension targets.
 * @publicDocs
 */
export interface Docs_Standard_AnalyticsApi extends Pick<StandardApi<any>, 'analytics'> {
}
/**
 * The base API object provided to this and other `customer-account` extension targets.
 * @publicDocs
 */
export interface Docs_Standard_SettingsApi extends Pick<StandardApi, 'settings'> {
}
/**
 * The base API object provided to this and other `customer-account` extension targets.
 * @publicDocs
 */
export interface Docs_Standard_StorageApi extends Pick<StandardApi<any>, 'storage'> {
}
/**
 * The base API object provided to this and other `customer-account` extension targets.
 * @publicDocs
 */
export interface Docs_Standard_CustomerPrivacyApi extends Pick<StandardApi<any>, 'customerPrivacy' | 'applyTrackingConsentChange'> {
}
/**
 * The base API object provided to this and other `customer-account` extension targets.
 * @publicDocs
 */
export interface Docs_Standard_ToastApi extends Pick<StandardApi<any>, 'toast'> {
}
/**
 * The base API object provided to this and other `customer-account` extension targets.
 * @publicDocs
 */
export interface Docs_Standard_QueryApi extends Pick<StandardApi<any>, 'query'> {
}
/**
 * The base API object provided to this and other `customer-account` extension targets.
 * @publicDocs
 */
export interface Docs_StandardApi extends Omit<StandardApi<any>, 'router'> {
}
/**
 * @publicDocs
 */
export interface Docs_Page_Button_PrimaryAction extends Pick<ButtonProps, 'click' | 'loading' | 'disabled' | 'accessibilityLabel' | 'href' | 'command' | 'commandFor'> {
    /**
     * A label that describes the button's purpose to assistive technologies. Use this when the button text alone doesn't provide enough context.
     */
    accessibilityLabel?: ButtonProps['accessibilityLabel'];
    /**
     * A callback that fires when the button is activated, before the action indicated by `type`.
     */
    click?: ButtonProps['click'];
    /**
     * The action the `commandFor` target should take when this button is activated.
     *
     * - `--auto`: A default action for the target component.
     * - `--show`: Shows the target component.
     * - `--hide`: Hides the target component.
     * - `--toggle`: Toggles the target component.
     * - `--copy`: Copies the target ClipboardItem.
     *
     * @default '--auto'
     */
    command?: ButtonProps['command'];
    /**
     * The ID of the component to control when this component is activated. Pair with the `command` property to specify what action to perform on the target component. Learn more about the [`commandFor` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#commandfor).
     */
    commandFor?: ButtonProps['commandFor'];
    /**
     * Whether the button is disabled and non-interactive.
     *
     * @default false
     */
    disabled?: ButtonProps['disabled'];
    /**
     * The URL to navigate to when the button is activated. If a `commandFor` is set, the `command` is executed instead of the navigation.
     */
    href?: ButtonProps['href'];
    /**
     * Whether to replace the button content with a loading indicator.
     *
     * @default false
     */
    loading?: ButtonProps['loading'];
}
/**
 * @publicDocs
 */
export interface Docs_Page_Button_SecondaryAction extends Pick<ButtonProps, 'click' | 'loading' | 'disabled' | 'accessibilityLabel' | 'href' | 'command' | 'commandFor'> {
    /**
     * A label that describes the button's purpose to assistive technologies. Use this when the button text alone doesn't provide enough context.
     */
    accessibilityLabel?: ButtonProps['accessibilityLabel'];
    /**
     * A callback that fires when the button is activated, before the action indicated by `type`.
     */
    click?: ButtonProps['click'];
    /**
     * The action the `commandFor` target should take when this button is activated.
     *
     * - `--auto`: A default action for the target component.
     * - `--show`: Shows the target component.
     * - `--hide`: Hides the target component.
     * - `--toggle`: Toggles the target component.
     * - `--copy`: Copies the target ClipboardItem.
     *
     * @default '--auto'
     */
    command?: ButtonProps['command'];
    /**
     * The ID of the component to control when this component is activated. Pair with the `command` property to specify what action to perform on the target component. Learn more about the [`commandFor` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#commandfor).
     */
    commandFor?: ButtonProps['commandFor'];
    /**
     * Whether the button is disabled and non-interactive.
     *
     * @default false
     */
    disabled?: ButtonProps['disabled'];
    /**
     * The URL to navigate to when the button is activated. If a `commandFor` is set, the `command` is executed instead of the navigation.
     */
    href?: ButtonProps['href'];
    /**
     * Whether to replace the button content with a loading indicator.
     *
     * @default false
     */
    loading?: ButtonProps['loading'];
}
/**
 * @publicDocs
 */
export interface Docs_Page_Button_BreadcrumbAction extends Pick<ButtonProps, 'click' | 'href'> {
    /**
     * A label that describes the breadcrumb's destination to assistive technologies. Required because `children` passed to this button are discarded.
     */
    accessibilityLabel: ButtonProps['accessibilityLabel'];
    /**
     * A callback that fires when the breadcrumb is activated.
     */
    click?: ButtonProps['click'];
    /**
     * The URL to navigate to when the breadcrumb is activated.
     */
    href?: ButtonProps['href'];
}
/**
 * The menu component exclusively accepts button elements with restricted props as its children. The `tone` prop will always be set to monochrome by default.
 * @publicDocs
 */
export interface Docs_Menu_Button_Action extends Omit<ButtonProps, 'variant' | 'textDecoration' | 'inlineAlignment' | 'inlineSize' | 'size'> {
}
/**
 * @publicDocs
 */
export interface Docs_OrderActionMenu_Button extends Pick<ButtonProps, 'click' | 'loading' | 'disabled' | 'accessibilityLabel' | 'href' | 'tone'> {
    /**
     * Destination URL to link to.
     *
     * E.g. `extension:/` to navigate to the Full-page extension.
     */
    href: ButtonProps['href'];
}
/**
 * Supported props for Buttons used inside CustomerAccountAction slots.<br><br>`children` only support text.
 * @publicDocs
 */
export interface Docs_CustomerAccountAction_SlotButton extends Pick<ButtonProps, 'click' | 'loading' | 'disabled' | 'accessibilityLabel' | 'href' | 'command' | 'commandFor'> {
}
export {};
//# sourceMappingURL=docs.d.ts.map