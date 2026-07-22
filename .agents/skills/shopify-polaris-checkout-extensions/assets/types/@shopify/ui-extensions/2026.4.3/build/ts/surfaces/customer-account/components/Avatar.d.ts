import {BaseElementPropsWithChildren, IdProps, SizeKeyword} from './shared';

/**
 * An event listener typed to a specific HTML element, with a strongly typed `currentTarget`.
 */
export type CallbackEventListener<
  TTagName extends keyof HTMLElementTagNameMap,
  TEvent extends Event = Event,
> =
  | (EventListener & {
      (event: CallbackEvent<TTagName, TEvent>): void;
    })
  | null;

/**
 * The properties for the avatar component. An avatar displays a user or entity image with fallback initials when the image isn't available. Properties include `src` for the image URL, `initials` for the fallback text, `alt` for accessibility text, and `size` for controlling the avatar dimensions.
 */
export interface AvatarElementProps extends IdProps {
  /**
   * The initials to display in the avatar when no image is provided or fails to load. Typically one or two characters representing a person's first and last name initials, such as "JD" for John Doe.
   *
   * Characters beyond the first two might be truncated. Special characters, emojis, and non-Latin scripts might not render as expected.
   */
  initials?: string;

  /**
   * The URL or path to the avatar image. When provided, the image takes priority over `initials`. If the image fails to load or loads slowly, `initials` will be rendered as a fallback.
   */
  src?: string;

  /**
   * The size of the avatar image.
   *
   * - `'small'`: Small avatar, good for secondary contexts or tight layouts.
   * - `'large'`: Large avatar for emphasis or when the avatar is a focal point.
   * - `'base'`: Default size that works well in most contexts.
   * - `'small-200'`: Extra small avatar, suitable for compact displays or lists with many items.
   * - `'large-200'`: Extra large avatar for prominent display.
   *
   * @default 'base'
   */
  size?: Extract<
    SizeKeyword,
    'small-200' | 'small' | 'base' | 'large' | 'large-200'
  >;

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
 * The event handlers for the avatar component.
 */
export interface AvatarElementEvents {
  /**
   * A callback that's fired when the avatar image has loaded successfully.
   */
  onLoad?(event: Event): void;

  /**
   * A callback that's fired when the avatar image fails to load.
   */
  onError?(event: Event): void;
}

/**
 * The HTML element interface for the `s-avatar` custom element.
 */
export interface AvatarElement
  extends AvatarElementProps,
    Omit<HTMLElement, 'id'> {
  onload: AvatarElementEvents['onLoad'];
  onerror: AvatarElementEvents['onError'];
}

/**
 * The event listeners for the `s-avatar` custom element.
 */
export interface AvatarEvents {
  /**
   * A callback that's fired when the avatar image has loaded successfully.
   */
  load?: ((event: CallbackEventListener<typeof tagName>) => void) | null;

  /**
   * A callback that's fired when the avatar image fails to load.
   */
  error?: ((event: CallbackEventListener<typeof tagName>) => void) | null;
}

/**
 * The properties for the avatar component when it's used in JSX.
 */
export type AvatarProps = AvatarElementProps & AvatarElementEvents;

declare global {
  interface HTMLElementTagNameMap {
    ['s-avatar']: AvatarElement;
  }
}

declare module 'preact' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace createElement.JSX {
    interface IntrinsicElements {
      ['s-avatar']: BaseElementPropsWithChildren<AvatarElement> & AvatarProps;
    }
  }
}
