import { changeCartLine, getCart, type CartItem, type CartResponse } from '../utils/cart';

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

export function initCartPage(): void {
  const root = document.querySelector<HTMLElement>('[data-js="cart-page"]');
  if (!root) return;

  const items = root.querySelector<HTMLElement>('[data-js="cart-page-items"]');
  const empty = root.querySelector<HTMLElement>('[data-js="cart-page-empty"]');
  const footer = root.querySelector<HTMLElement>('[data-js="cart-page-footer"]');
  const subtotal = root.querySelector<HTMLElement>('[data-js="cart-page-subtotal"]');
  const status = root.querySelector<HTMLElement>('[data-js="cart-page-status"]');
  const error = root.querySelector<HTMLElement>('[data-js="cart-page-error"]');
  const countNodes = document.querySelectorAll<HTMLElement>('[data-js="cart-count"]');

  if (!items || !empty || !footer || !subtotal || !status || !error) return;

  const fallbackUrl = '/cart';
  let isUpdating = false;

  const setStatus = (message: string): void => {
    status.textContent = message;
  };

  const setError = (message: string): void => {
    error.textContent = message;
  };

  const setBusy = (busy: boolean): void => {
    root.setAttribute('aria-busy', String(busy));
    root.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
      if (button.type !== 'submit') {
        button.disabled = busy;
      }
    });
  };

  const render = (cart: CartResponse): void => {
    const currency = cart.currency || root.dataset.currency || 'USD';
    const hasItems = cart.item_count > 0;

    countNodes.forEach((node) => {
      node.textContent = String(cart.item_count);
      node.hidden = cart.item_count < 1;
    });

    empty.hidden = hasItems;
    items.hidden = !hasItems;
    footer.hidden = !hasItems;
    subtotal.textContent = formatMoney(cart.total_price, currency);

    if (!hasItems) {
      items.innerHTML = '';
      setStatus('Your cart is empty.');
      return;
    }

    items.innerHTML = cart.items
      .map((item, index) => {
        const imageUrl = getImageUrl(item);
        const title = escapeHtml(getItemTitle(item));
        const variantTitle = item.variant_title ? escapeHtml(item.variant_title) : '';

        return `
          <li class="grid grid-cols-[80px_1fr] gap-3 border-b pb-3" data-line="${index + 1}">
            <a href="${item.url}" class="block h-20 w-20 overflow-hidden border">
              ${imageUrl ? `<img src="${imageUrl}" alt="${title}" class="h-full w-full object-cover">` : ''}
            </a>
            <div class="space-y-2">
              <a href="${item.url}" class="font-medium">${title}</a>
              ${variantTitle ? `<p class="text-sm opacity-70">${variantTitle}</p>` : ''}
              <div class="flex items-center gap-2">
                <button type="button" data-js="cart-page-dec" data-line="${index + 1}" class="h-8 w-8 border" aria-label="Decrease quantity">-</button>
                <span data-js="cart-page-qty" class="min-w-6 text-center">${item.quantity}</span>
                <button type="button" data-js="cart-page-inc" data-line="${index + 1}" class="h-8 w-8 border" aria-label="Increase quantity">+</button>
                <button type="button" data-js="cart-page-remove" data-line="${index + 1}" class="ml-auto underline">Remove</button>
              </div>
              <p>${formatMoney(lineTotal(item), currency)}</p>
            </div>
          </li>
        `;
      })
      .join('');
  };

  const refresh = async (): Promise<void> => {
    try {
      const cart = await getCart();
      render(cart);
    } catch {
      setError('Could not load cart data. Reloading...');
      window.location.assign(fallbackUrl);
    }
  };

  const updateLine = async (line: number, quantity: number): Promise<void> => {
    if (isUpdating) return;

    isUpdating = true;
    setBusy(true);
    setError('');
    setStatus('Updating cart...');

    try {
      const cart = await changeCartLine(line, quantity);
      render(cart);
      setStatus(quantity === 0 ? 'Item removed.' : 'Cart updated.');
    } catch {
      setError('Could not update cart. Please try again.');
      setStatus('Cart update failed.');
    } finally {
      isUpdating = false;
      setBusy(false);
    }
  };

  root.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const actionButton = target.closest<HTMLButtonElement>(
      '[data-js="cart-page-dec"], [data-js="cart-page-inc"], [data-js="cart-page-remove"]',
    );

    if (!actionButton) return;

    const line = Number(actionButton.dataset.line);
    if (!line) return;

    const row = items.querySelector<HTMLElement>(`[data-line="${line}"]`);
    const quantityNode = row?.querySelector<HTMLElement>('[data-js="cart-page-qty"]');
    const currentQty = Number(quantityNode?.textContent ?? '1');

    if (actionButton.dataset.js === 'cart-page-remove') {
      void updateLine(line, 0);
      return;
    }

    if (actionButton.dataset.js === 'cart-page-inc') {
      void updateLine(line, currentQty + 1);
      return;
    }

    if (actionButton.dataset.js === 'cart-page-dec') {
      void updateLine(line, Math.max(0, currentQty - 1));
    }
  });

  void refresh();
}
