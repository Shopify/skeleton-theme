import { changeCartLine } from '../utils/cart';
import {
  applySectionReplace,
  normalizeSectionsUrl,
} from '../utils/section-rendering';

export function initCartPage(): void {
  const root = document.querySelector<HTMLElement>('[data-js="cart-page"]');
  if (!root) return;

  const sectionId = root.dataset.sectionId;
  const sectionContextUrl = normalizeSectionsUrl(window.location.pathname);

  const itemsNode = root.querySelector<HTMLElement>('[data-js="cart-page-items"]');
  const emptyNode = root.querySelector<HTMLElement>('[data-js="cart-page-empty"]');
  const footerNode = root.querySelector<HTMLElement>('[data-js="cart-page-footer"]');
  const subtotalNode = root.querySelector<HTMLElement>('[data-js="cart-page-subtotal"]');
  const status = root.querySelector<HTMLElement>('[data-js="cart-page-status"]');
  const error = root.querySelector<HTMLElement>('[data-js="cart-page-error"]');
  const countNodes = document.querySelectorAll<HTMLElement>('[data-js="cart-count"]');

  if (!itemsNode || !emptyNode || !footerNode || !subtotalNode || !status || !error || !sectionId) return;

  let items: HTMLElement = itemsNode;
  let empty: HTMLElement = emptyNode;
  let footer: HTMLElement = footerNode;

  let isUpdating = false;
  let latestMutationId = 0;
  let queuedUpdate: { line: number; quantity: number } | null = null;

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

  const updateCount = (count: number): void => {
    countNodes.forEach((node) => {
      node.textContent = String(count);
      node.hidden = count < 1;
    });
  };

  const setLineLoading = (line: number, busy: boolean): void => {
    const row = items.querySelector<HTMLElement>(`[data-line="${line}"]`);
    if (!row) return;

    row.classList.toggle('animate-pulse', busy);

    const overlay = row.querySelector<HTMLElement>('[data-js="cart-page-line-overlay"]');
    if (!overlay) return;

    if (busy) {
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
    } else {
      overlay.classList.add('hidden');
      overlay.classList.remove('flex');
    }
  };

  const applySectionMarkup = (sectionHtml: string | null | undefined): boolean => {
    const result = applySectionReplace(sectionHtml, '[data-js="cart-page"]', [
      { key: 'items', current: items, selector: '[data-js="cart-page-items"]' },
      { key: 'empty', current: empty, selector: '[data-js="cart-page-empty"]' },
      { key: 'footer', current: footer, selector: '[data-js="cart-page-footer"]' },
    ]);

    if (!result.ok) return false;

    const nextItems = result.nodes.items;
    const nextEmpty = result.nodes.empty;
    const nextFooter = result.nodes.footer;
    if (!nextItems || !nextEmpty || !nextFooter) return false;

    items = nextItems;
    empty = nextEmpty;
    footer = nextFooter;

    return Boolean(footer.querySelector<HTMLElement>('[data-js="cart-page-subtotal"]'));
  };

  const updateFromSectionResponse = (sectionHtml: string | null | undefined): boolean => {
    return applySectionMarkup(sectionHtml);
  };

  const updateLine = async (line: number, quantity: number): Promise<void> => {
    const mutationId = ++latestMutationId;
    isUpdating = true;
    setBusy(true);
    setLineLoading(line, true);
    setError('');

    try {
      const cart = await changeCartLine(line, quantity, {
        sections: [sectionId],
        sectionsUrl: sectionContextUrl,
      });

      const sectionUpdated = updateFromSectionResponse(cart.sections?.[sectionId]);

      if (!sectionUpdated || mutationId !== latestMutationId) {
        throw new Error('Cart section rendering failed');
      }

      updateCount(cart.item_count);
      setStatus(quantity === 0 ? 'Item removed.' : 'Cart updated.');
    } catch {
      setError('Could not refresh cart UI. Please try again.');
      setStatus('Cart update failed.');
    } finally {
      if (mutationId === latestMutationId) {
        isUpdating = false;
        setBusy(false);
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
      queueLineUpdate(line, 0);
      return;
    }

    if (actionButton.dataset.js === 'cart-page-inc') {
      queueLineUpdate(line, currentQty + 1);
      return;
    }

    if (actionButton.dataset.js === 'cart-page-dec') {
      queueLineUpdate(line, Math.max(0, currentQty - 1));
    }
  });
}
