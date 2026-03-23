import { changeCartLine } from '../utils/cart';
import {
  applySectionReplace,
  fetchSingleSectionHtml,
  normalizeSectionsUrl,
} from '../utils/section-rendering';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

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
  const status = statusRoot;
  const error = errorRoot;
  const sectionContextUrl = normalizeSectionsUrl(window.location.pathname);
  const triggers = document.querySelectorAll<HTMLAnchorElement>('[data-js="cart-open"]');

  let itemsContainer: HTMLElement = itemsContainerRoot;
  let emptyState: HTMLElement = emptyStateRoot;
  let subtotal: HTMLElement = subtotalRoot;

  let isOpen = false;
  let isUpdating = false;
  let latestMutationId = 0;
  let queuedUpdate: { line: number; quantity: number } | null = null;
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

    const nextItems = result.nodes.items;
    const nextEmpty = result.nodes.empty;
    const nextSubtotal = result.nodes.subtotal;
    if (!nextItems || !nextEmpty || !nextSubtotal) return false;

    itemsContainer = nextItems;
    emptyState = nextEmpty;
    subtotal = nextSubtotal;
    updateCount(countItemsFromDrawerMarkup());

    return true;
  };

  const updateFromSectionResponse = (sectionHtml: string | null | undefined): boolean => {
    return applyDrawerSectionMarkup(sectionHtml);
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

      const sectionUpdated = updateFromSectionResponse(cart.sections?.['cart-drawer']);

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
    triggers.forEach((button) => button.setAttribute('aria-expanded', 'true'));
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
    triggers.forEach((button) => button.setAttribute('aria-expanded', 'false'));
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeyDown);

    if (lastFocused) {
      lastFocused.focus();
    }
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openDrawer(trigger);
    });
    trigger.setAttribute('aria-expanded', 'false');
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
