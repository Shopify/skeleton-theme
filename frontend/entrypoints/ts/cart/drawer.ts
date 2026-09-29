/**
 * Cart drawer (minicart): hydrates `[data-js="cart-drawer"]` via a
 * single-section fetch (`?section_id=cart-drawer`) every time it opens, and
 * on qty/remove mutations morphs only the `cart-items`/`cart-empty`/
 * `cart-subtotal` sub-targets in place via `applySectionReplace`. Configures
 * the standard `Shopify.actions.openCart`/`updateCart` actions so PDP/PLP
 * add-to-cart (and any external app/agent calling the same actions) open and
 * refresh this drawer instead of falling back to a full page reload.
 *
 * Backed by the native `<dialog>` element: focus trap, ESC-to-close and
 * focus restore on close are handled by the browser, not manual JS.
 */
import { changeCartLine } from '../utils/cart';
import { applySectionReplace, fetchSingleSectionHtml, normalizeSectionsUrl } from '../utils/section-rendering';

export function initCartDrawer(): void {
  const drawerRoot = document.querySelector<HTMLDialogElement>('[data-js="cart-drawer"]');
  if (!drawerRoot) return;

  const panelRoot = drawerRoot.querySelector<HTMLElement>('[data-js="cart-drawer-panel"]');
  const closeButtonRoot = drawerRoot.querySelector<HTMLButtonElement>('[data-js="cart-close"]');
  const itemsContainer = drawerRoot.querySelector<HTMLElement>('[data-js="cart-items"]');
  const emptyState = drawerRoot.querySelector<HTMLElement>('[data-js="cart-empty"]');
  const subtotal = drawerRoot.querySelector<HTMLElement>('[data-js="cart-subtotal"]');
  const statusRoot = drawerRoot.querySelector<HTMLElement>('[data-js="cart-drawer-status"]');
  const errorRoot = drawerRoot.querySelector<HTMLElement>('[data-js="cart-drawer-error"]');
  const countNodes = document.querySelectorAll<HTMLElement>('[data-js="cart-count"]');

  if (!panelRoot || !closeButtonRoot || !itemsContainer || !emptyState || !subtotal || !statusRoot || !errorRoot) {
    return;
  }

  const drawer = drawerRoot;
  const panel = panelRoot;
  const closeButton = closeButtonRoot;
  const status = statusRoot;
  const error = errorRoot;
  const sectionContextUrl = normalizeSectionsUrl(window.location.pathname);
  const triggers = document.querySelectorAll<HTMLAnchorElement>('[data-js="cart-open"]');

  let isUpdating = false;
  let latestMutationId = 0;
  let queuedUpdate: { line: number; quantity: number } | null = null;

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

  const updateCount = (count: number): void => {
    countNodes.forEach((node) => {
      node.textContent = String(count);
      node.hidden = count < 1;
    });
  };

  const countItemsFromDrawerMarkup = (): number => {
    const qtyNodes = itemsContainer.querySelectorAll<HTMLElement>('[data-js="cart-qty-value"]');
    return Array.from(qtyNodes).reduce((sum, node) => {
      const qty = Number(node.textContent ?? '0');
      return sum + (Number.isFinite(qty) ? qty : 0);
    }, 0);
  };

  const setLineLoading = (line: number, busy: boolean): void => {
    const row = itemsContainer.querySelector<HTMLElement>(`[data-line="${line}"]`);
    if (!row) return;

    row.classList.toggle('animate-pulse', busy);

    const lineOverlay = row.querySelector<HTMLElement>('[data-js="cart-drawer-line-overlay"]');
    if (!lineOverlay) return;

    if (busy) {
      lineOverlay.classList.remove('hidden');
      lineOverlay.classList.add('flex');
    } else {
      lineOverlay.classList.add('hidden');
      lineOverlay.classList.remove('flex');
    }
  };

  const applyDrawerSectionMarkup = (sectionHtml: string | null | undefined): boolean => {
    const result = applySectionReplace(sectionHtml, '[data-js="cart-drawer"]', [
      { key: 'items', current: itemsContainer, selector: '[data-js="cart-items"]' },
      { key: 'empty', current: emptyState, selector: '[data-js="cart-empty"]' },
      { key: 'subtotal', current: subtotal, selector: '[data-js="cart-subtotal"]' },
    ]);

    if (!result.ok) return false;

    updateCount(countItemsFromDrawerMarkup());
    return true;
  };

  const refresh = async (): Promise<void> => {
    setError('');

    try {
      const sectionHtml = await fetchSingleSectionHtml('cart-drawer', sectionContextUrl);
      const sectionUpdated = applyDrawerSectionMarkup(sectionHtml);
      if (!sectionUpdated) {
        throw new Error('Drawer section rendering failed');
      }
    } catch {
      setError('Could not load your cart right now. Please try again.');
      setStatus('Cart load failed.');
    }
  };

  const updateLine = async (line: number, quantity: number): Promise<void> => {
    const mutationId = ++latestMutationId;
    isUpdating = true;
    setError('');
    setBusyState(true);
    setLineLoading(line, true);

    try {
      const cart = await changeCartLine(line, quantity, {
        sections: ['cart-drawer'],
        sectionsUrl: sectionContextUrl,
      });

      const sectionUpdated = applyDrawerSectionMarkup(cart.sections?.['cart-drawer']);

      if (!sectionUpdated || mutationId !== latestMutationId) {
        throw new Error('Drawer section rendering failed');
      }

      updateCount(cart.item_count);
      setStatus(quantity === 0 ? 'Item removed.' : 'Cart updated.');
    } catch {
      setError('Could not refresh cart UI. Please try again.');
      setStatus('Cart update failed.');
    } finally {
      if (mutationId === latestMutationId) {
        isUpdating = false;
        setBusyState(false);
        setLineLoading(line, false);
        if (queuedUpdate) {
          void flushQueuedUpdates();
        }
      }
    }
  };

  const flushQueuedUpdates = async (): Promise<void> => {
    if (isUpdating) return;

    while (queuedUpdate) {
      const nextUpdate = queuedUpdate;
      queuedUpdate = null;
      await updateLine(nextUpdate.line, nextUpdate.quantity);
    }
  };

  const queueLineUpdate = (line: number, quantity: number): void => {
    queuedUpdate = { line, quantity };
    void flushQueuedUpdates();
  };

  function openDrawer(): void {
    if (drawer.open) return;
    triggers.forEach(button => button.setAttribute('aria-expanded', 'true'));
    document.body.style.overflow = 'hidden';
    drawer.showModal();
    void refresh();
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openDrawer();
    });
    trigger.setAttribute('aria-expanded', 'false');
  });

  closeButton.addEventListener('click', () => drawer.close());

  drawer.addEventListener('close', () => {
    triggers.forEach(button => button.setAttribute('aria-expanded', 'false'));
    document.body.style.overflow = '';
  });

  if (window.Shopify?.actions) {
    window.Shopify.actions.openCart.configure({
      handler: async () => openDrawer(),
    });

    window.Shopify.actions.updateCart.configure({
      eventTarget: () => drawer,
      handler: async (defaultHandler) => {
        const result = await defaultHandler();
        await refresh();
        return result;
      },
    });
  }

  drawer.addEventListener('click', (event) => {
    if (event.target === drawer) {
      drawer.close();
      return;
    }

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
      queueLineUpdate(line, 0);
      return;
    }

    if (actionButton.dataset.js === 'cart-qty-inc') {
      queueLineUpdate(line, currentQty + 1);
      return;
    }

    if (actionButton.dataset.js === 'cart-qty-dec') {
      queueLineUpdate(line, Math.max(0, currentQty - 1));
    }
  });
}
