import { changeCartLine, getCart, type CartItem, type CartResponse } from '../utils/cart';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatMoney(cents: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
    }).format(cents / 100);
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency}`;
  }
}

function getImageUrl(item: CartItem): string | null {
  return item.image ?? item.featured_image?.url ?? null;
}

function getItemTitle(item: CartItem): string {
  return item.product_title ?? item.title ?? 'Product';
}

function lineTotal(item: CartItem): number {
  return item.final_line_price ?? item.line_price ?? 0;
}

export function initCartDrawer(): void {
  const drawerRoot = document.querySelector<HTMLElement>('[data-js="cart-drawer"]');
  if (!drawerRoot) return;

  const overlayRoot = drawerRoot.querySelector<HTMLElement>('[data-js="cart-drawer-overlay"]');
  const panelRoot = drawerRoot.querySelector<HTMLElement>('[data-js="cart-drawer-panel"]');
  const closeButtonRoot = drawerRoot.querySelector<HTMLButtonElement>('[data-js="cart-close"]');
  const itemsContainerRoot = drawerRoot.querySelector<HTMLElement>('[data-js="cart-items"]');
  const emptyStateRoot = drawerRoot.querySelector<HTMLElement>('[data-js="cart-empty"]');
  const subtotalRoot = drawerRoot.querySelector<HTMLElement>('[data-js="cart-subtotal"]');
  const statusRoot = drawerRoot.querySelector<HTMLElement>('[data-js="cart-drawer-status"]');
  const errorRoot = drawerRoot.querySelector<HTMLElement>('[data-js="cart-drawer-error"]');
  const countNodes = document.querySelectorAll<HTMLElement>('[data-js="cart-count"]');

  if (
    !overlayRoot ||
    !panelRoot ||
    !closeButtonRoot ||
    !itemsContainerRoot ||
    !emptyStateRoot ||
    !subtotalRoot ||
    !statusRoot ||
    !errorRoot
  ) {
    return;
  }

  const drawer = drawerRoot;
  const overlay = overlayRoot;
  const panel = panelRoot;
  const closeButton = closeButtonRoot;
  const itemsContainer = itemsContainerRoot;
  const emptyState = emptyStateRoot;
  const subtotal = subtotalRoot;
  const status = statusRoot;
  const error = errorRoot;

  const fallbackUrl = drawer.dataset.cartUrl ?? '/cart';

  let isOpen = false;
  let isUpdating = false;
  let lastFocused: HTMLElement | null = null;

  const setStatus = (message: string): void => {
    status.textContent = message;
  };

  const setError = (message: string): void => {
    error.textContent = message;
  };

  const setBusyState = (busy: boolean): void => {
    panel.setAttribute('aria-busy', String(busy));
    drawer.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
      const isCloseButton = button.dataset.js === 'cart-close';
      if (!isCloseButton) {
        button.disabled = busy;
      }
    });
  };

  const renderItems = (cart: CartResponse): void => {
    const currency = cart.currency || drawer.dataset.currency || 'USD';
    const isEmpty = cart.item_count === 0;

    countNodes.forEach((node) => {
      node.textContent = String(cart.item_count);
      node.hidden = cart.item_count < 1;
    });

    subtotal.textContent = formatMoney(cart.total_price, currency);

    if (isEmpty) {
      itemsContainer.innerHTML = '';
      emptyState.hidden = false;
      setStatus('Your cart is empty.');
      return;
    }

    emptyState.hidden = true;
    itemsContainer.innerHTML = cart.items
      .map((item, index) => {
        const imageUrl = getImageUrl(item);
        const itemTitle = escapeHtml(getItemTitle(item));
        const variantTitle = item.variant_title ? escapeHtml(item.variant_title) : '';

        return `
          <li class="grid grid-cols-[64px_1fr] gap-3 border-b py-3" data-line="${index + 1}">
            <a href="${item.url}" class="block h-16 w-16 overflow-hidden border">
              ${
                imageUrl
                  ? `<img src="${imageUrl}" alt="${itemTitle}" class="h-full w-full object-cover">`
                  : ''
              }
            </a>
            <div class="space-y-2">
              <a href="${item.url}" class="block text-sm font-medium">${itemTitle}</a>
              ${variantTitle ? `<p class="text-xs opacity-70">${variantTitle}</p>` : ''}
              <div class="flex items-center gap-2">
                <button type="button" data-js="cart-qty-dec" data-line="${index + 1}" aria-label="Decrease quantity" class="h-8 w-8 border">-</button>
                <span class="min-w-6 text-center text-sm" data-js="cart-qty-value">${item.quantity}</span>
                <button type="button" data-js="cart-qty-inc" data-line="${index + 1}" aria-label="Increase quantity" class="h-8 w-8 border">+</button>
                <button type="button" data-js="cart-remove" data-line="${index + 1}" class="ml-auto text-sm underline">Remove</button>
              </div>
              <p class="text-sm">${formatMoney(lineTotal(item), currency)}</p>
            </div>
          </li>
        `;
      })
      .join('');
  };

  const refresh = async (): Promise<void> => {
    setError('');

    try {
      const cart = await getCart();
      renderItems(cart);
    } catch {
      setError('Could not load your cart. Redirecting to cart page...');
      window.location.assign(fallbackUrl);
    }
  };

  const updateLine = async (line: number, quantity: number): Promise<void> => {
    if (isUpdating) return;
    isUpdating = true;
    setError('');
    setStatus('Updating cart...');
    setBusyState(true);

    try {
      const cart = await changeCartLine(line, quantity);
      renderItems(cart);
      setStatus(quantity === 0 ? 'Item removed.' : 'Cart updated.');
    } catch {
      setError('Could not update cart. Please try again.');
      setStatus('Cart update failed.');
    } finally {
      isUpdating = false;
      setBusyState(false);
    }
  };

  const focusables = (): HTMLElement[] =>
    Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
    );

  const onKeyDown = (event: KeyboardEvent): void => {
    if (!isOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer();
      return;
    }

    if (event.key !== 'Tab') return;

    const nodes = focusables();
    if (nodes.length === 0) return;

    const first = nodes[0];
    const last = nodes[nodes.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  function openDrawer(trigger?: HTMLElement): void {
    if (isOpen) return;
    isOpen = true;
    lastFocused = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);

    drawer.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    closeButton.focus();
    void refresh();
  }

  function closeDrawer(): void {
    if (!isOpen) return;
    isOpen = false;

    drawer.hidden = true;
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeyDown);

    if (lastFocused) {
      lastFocused.focus();
    }
  }

  document.querySelectorAll<HTMLAnchorElement>('[data-js="cart-open"]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openDrawer(trigger);
    });
  });

  closeButton.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const actionButton = target.closest<HTMLButtonElement>(
      '[data-js="cart-qty-dec"], [data-js="cart-qty-inc"], [data-js="cart-remove"]',
    );

    if (!actionButton) return;

    const line = Number(actionButton.dataset.line);
    if (!line) return;

    const row = itemsContainer.querySelector<HTMLElement>(`[data-line="${line}"]`);
    const quantityNode = row?.querySelector<HTMLElement>('[data-js="cart-qty-value"]');
    const currentQty = Number(quantityNode?.textContent ?? '1');

    if (actionButton.dataset.js === 'cart-remove') {
      void updateLine(line, 0);
      return;
    }

    if (actionButton.dataset.js === 'cart-qty-inc') {
      void updateLine(line, currentQty + 1);
      return;
    }

    if (actionButton.dataset.js === 'cart-qty-dec') {
      void updateLine(line, Math.max(0, currentQty - 1));
    }
  });

  void refresh();
}
