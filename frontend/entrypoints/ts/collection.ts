import { addToCart } from './utils/cart';
import { emitCartOpen, emitCartUpdated } from './utils/cart-events';
import { getDialogFocusables, handleDialogKeyDown } from './utils/dialog';

const ROOT_SELECTOR = '[data-js="collection-root"]';

interface CollectionView {
  root: HTMLElement;
  sectionId: string;
  controls: HTMLFormElement | null;
  products: HTMLElement | null;
  paginationWrap: HTMLElement | null;
  loadStatus: HTMLElement | null;
  status: HTMLElement | null;
  error: HTMLElement | null;
  filtersOpenButton: HTMLButtonElement | null;
  filtersDrawer: HTMLElement | null;
  filtersPanel: HTMLElement | null;
}

function queryView(root: HTMLElement): CollectionView {
  return {
    root,
    sectionId: root.dataset.sectionId ?? '',
    controls: root.querySelector<HTMLFormElement>('[data-js="collection-controls"]'),
    products: root.querySelector<HTMLElement>('[data-js="collection-products"]'),
    paginationWrap: root.querySelector<HTMLElement>('[data-js="collection-pagination-wrap"]'),
    loadStatus: root.querySelector<HTMLElement>('[data-js="collection-load-status"]'),
    status: root.querySelector<HTMLElement>('[data-js="collection-status"]'),
    error: root.querySelector<HTMLElement>('[data-js="collection-error"]'),
    filtersOpenButton: root.querySelector<HTMLButtonElement>('[data-js="collection-filters-open"]'),
    filtersDrawer: root.querySelector<HTMLElement>('[data-js="collection-filters-drawer"]'),
    filtersPanel: root.querySelector<HTMLElement>('[data-js="collection-filters-panel"]'),
  };
}

function setStatus(view: CollectionView, message: string): void {
  if (view.status) {
    view.status.textContent = message;
  }
}

function setLoadStatus(view: CollectionView, message: string): void {
  if (view.loadStatus) {
    view.loadStatus.textContent = message;
  }
}

function setError(view: CollectionView, message: string): void {
  if (view.error) {
    view.error.textContent = message;
  }
}

function setBusy(view: CollectionView, busy: boolean): void {
  view.root.setAttribute('aria-busy', String(busy));
}

async function runQuickBuy(button: HTMLButtonElement, fallbackUrl: string): Promise<void> {
  const variantId = Number(button.dataset.variantId ?? '');
  if (!variantId) {
    if (fallbackUrl) {
      window.location.assign(fallbackUrl);
    }
    return;
  }

  const idleLabel = button.dataset.labelIdle ?? 'Quick buy';
  const loadingLabel = button.dataset.labelLoading ?? 'Adding...';
  const successLabel = button.dataset.labelSuccess ?? 'Added';
  const errorLabel = button.dataset.labelError ?? 'Try again';

  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  button.textContent = loadingLabel;

  try {
    await addToCart(variantId, 1);
    emitCartUpdated({ itemCountDelta: 1 });
    emitCartOpen();

    button.textContent = successLabel;
    window.setTimeout(() => {
      button.textContent = idleLabel;
      button.disabled = false;
      button.setAttribute('aria-busy', 'false');
    }, 1200);
  } catch {
    button.textContent = errorLabel;

    window.setTimeout(() => {
      button.textContent = idleLabel;
      button.disabled = false;
      button.setAttribute('aria-busy', 'false');
    }, 1500);
  }
}

function toUrl(pathOrUrl: string): URL {
  return new URL(pathOrUrl, window.location.origin);
}

function buildSectionRequestUrl(targetUrl: URL, sectionId: string): string {
  const requestUrl = new URL(targetUrl.toString());
  requestUrl.searchParams.set('section_id', sectionId);
  return `${requestUrl.pathname}${requestUrl.search}`;
}

function serializeControls(form: HTMLFormElement): URL {
  const actionUrl = toUrl(form.action || window.location.href);
  const params = new URLSearchParams();
  const data = new FormData(form);

  data.forEach((value, key) => {
    const stringValue = String(value).trim();
    if (stringValue.length > 0) {
      params.append(key, stringValue);
    }
  });

  actionUrl.search = params.toString();
  return actionUrl;
}

function parseCollectionRoot(html: string): HTMLElement | null {
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  return parsed.querySelector<HTMLElement>(ROOT_SELECTOR);
}

document.addEventListener('DOMContentLoaded', () => {
  const initialRoot = document.querySelector<HTMLElement>(ROOT_SELECTOR);
  if (!initialRoot) return;

  let activeRoot: HTMLElement = initialRoot;

  let activeView = queryView(activeRoot);
  if (!activeView.sectionId) return;

  let activeRequestId = 0;
  let activeController: AbortController | null = null;
  let filtersOpen = false;
  let filtersLastFocused: HTMLElement | null = null;

  const syncActiveView = (nextRoot: HTMLElement): void => {
    activeRoot = nextRoot;
    activeView = queryView(nextRoot);

    if (filtersOpen && activeView.filtersDrawer) {
      activeView.filtersDrawer.dataset.open = 'true';
      activeView.filtersOpenButton?.setAttribute('aria-expanded', 'true');
    }
  };

  const openFiltersDrawer = (trigger?: HTMLElement): void => {
    if (!activeView.filtersDrawer) return;

    filtersOpen = true;
    filtersLastFocused = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);

    activeView.filtersDrawer.dataset.open = 'true';
    activeView.filtersOpenButton?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    const focusables = activeView.filtersPanel ? getDialogFocusables(activeView.filtersPanel) : [];
    focusables[0]?.focus();
  };

  const closeFiltersDrawer = (): void => {
    if (!activeView.filtersDrawer || !filtersOpen) return;

    filtersOpen = false;

    activeView.filtersDrawer.dataset.open = 'false';
    activeView.filtersOpenButton?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    filtersLastFocused?.focus();
  };

  const fetchNextRoot = async (targetUrl: URL, requestId: number): Promise<HTMLElement> => {
    activeController?.abort();
    activeController = new AbortController();

    const response = await fetch(buildSectionRequestUrl(targetUrl, activeView.sectionId), {
      signal: activeController.signal,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      throw new Error('Collection section request failed');
    }

    const html = await response.text();
    if (requestId !== activeRequestId) {
      throw new DOMException('Stale collection request', 'AbortError');
    }

    const nextRoot = parseCollectionRoot(html);
    if (!nextRoot) {
      throw new Error('Collection section parse failed');
    }

    return nextRoot;
  };

  const replaceView = async (targetUrl: URL, pushHistory: boolean): Promise<void> => {
    const requestId = ++activeRequestId;

    setBusy(activeView, true);
    setError(activeView, '');
    setStatus(activeView, 'Loading products...');

    try {
      const nextRoot = await fetchNextRoot(targetUrl, requestId);
      activeRoot.replaceWith(nextRoot);
      syncActiveView(nextRoot);

      if (pushHistory) {
        window.history.pushState({ source: 'collection-replace' }, '', `${targetUrl.pathname}${targetUrl.search}`);
      }

      setStatus(activeView, 'Products updated.');
      setLoadStatus(activeView, '');
    } catch (errorValue) {
      if (errorValue instanceof DOMException && errorValue.name === 'AbortError') {
        return;
      }

      setError(activeView, 'Could not update collection right now. Please try again.');
      setStatus(activeView, 'Collection update failed.');
    } finally {
      if (requestId === activeRequestId) {
        setBusy(activeView, false);
      }
    }
  };

  const appendProducts = async (nextUrlValue: string): Promise<void> => {
    const nextUrl = toUrl(nextUrlValue);
    const requestId = ++activeRequestId;

    setBusy(activeView, true);
    setError(activeView, '');
    setLoadStatus(activeView, 'Loading more products...');

    try {
      const nextRoot = await fetchNextRoot(nextUrl, requestId);
      const nextView = queryView(nextRoot);

      if (!activeView.products || !nextView.products || !activeView.paginationWrap || !nextView.paginationWrap) {
        throw new Error('Collection append targets missing');
      }

      const fragment = document.createDocumentFragment();
      nextView.products.querySelectorAll<HTMLElement>('[data-js="collection-product-card"]').forEach((card) => {
        fragment.appendChild(card);
      });
      activeView.products.appendChild(fragment);
      activeView.paginationWrap.replaceWith(nextView.paginationWrap);
      activeView.paginationWrap = nextView.paginationWrap;

      window.history.pushState({ source: 'collection-append' }, '', `${nextUrl.pathname}${nextUrl.search}`);

      setLoadStatus(activeView, 'More products loaded.');
      setStatus(activeView, 'Collection updated.');
    } catch (errorValue) {
      if (errorValue instanceof DOMException && errorValue.name === 'AbortError') {
        return;
      }

      setError(activeView, 'Could not load more products. Please try again.');
      setLoadStatus(activeView, 'Load more failed.');
    } finally {
      if (requestId === activeRequestId) {
        setBusy(activeView, false);
      }
    }
  };

  const onRootClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;

    const filtersOpenButton = target.closest<HTMLButtonElement>('[data-js="collection-filters-open"]');
    if (filtersOpenButton) {
      event.preventDefault();
      openFiltersDrawer(filtersOpenButton);
      return;
    }

    const filtersCloseButton = target.closest<HTMLButtonElement>('[data-js="collection-filters-close"]');
    if (filtersCloseButton) {
      event.preventDefault();
      closeFiltersDrawer();
      return;
    }

    const filtersOverlay = target.closest<HTMLElement>('[data-js="collection-filters-overlay"]');
    if (filtersOverlay) {
      event.preventDefault();
      closeFiltersDrawer();
      return;
    }

    const quickBuyButton = target.closest<HTMLButtonElement>('[data-js="collection-quick-buy"]');
    if (quickBuyButton) {
      event.preventDefault();
      if (quickBuyButton.disabled) return;

      const fallbackUrl = quickBuyButton.dataset.productUrl ?? '';
      void runQuickBuy(quickBuyButton, fallbackUrl);
      return;
    }

    const loadMoreButton = target.closest<HTMLButtonElement>('[data-js="collection-load-more"]');
    if (loadMoreButton) {
      event.preventDefault();
      const nextUrl = loadMoreButton.dataset.nextUrl;
      if (!nextUrl || loadMoreButton.disabled) return;

      loadMoreButton.disabled = true;
      loadMoreButton.setAttribute('aria-busy', 'true');
      void appendProducts(nextUrl).finally(() => {
        loadMoreButton.disabled = false;
        loadMoreButton.setAttribute('aria-busy', 'false');
      });
      return;
    }

    const clearLink = target.closest<HTMLAnchorElement>('[data-js="collection-clear"]');
    if (clearLink) {
      event.preventDefault();
      void replaceView(toUrl(clearLink.href), true);
      return;
    }

    const filterRemoveLink = target.closest<HTMLAnchorElement>('[data-js="collection-filter-remove"]');
    if (filterRemoveLink) {
      event.preventDefault();
      void replaceView(toUrl(filterRemoveLink.href), true);
      return;
    }

    const paginationLink = target.closest<HTMLAnchorElement>('[data-js="collection-default-pagination"] a');
    if (paginationLink) {
      event.preventDefault();
      void replaceView(toUrl(paginationLink.href), true);
    }
  };

  const onRootChange = (event: Event): void => {
    const target = event.target as HTMLElement;
    const field = target.closest<HTMLInputElement | HTMLSelectElement>('input, select');
    if (!field || !activeView.controls) return;

    activeView.controls.requestSubmit();
  };

  const onRootSubmit = (event: Event): void => {
    const form = event.target as HTMLFormElement;
    if (!form.matches('[data-js="collection-controls"]')) return;

    event.preventDefault();
    void replaceView(serializeControls(form), true);
  };

  const onDocumentKeyDown = (event: KeyboardEvent): void => {
    if (!filtersOpen || !activeView.filtersPanel) return;
    handleDialogKeyDown(event, activeView.filtersPanel, closeFiltersDrawer);
  };

  document.addEventListener('keydown', onDocumentKeyDown);

  document.addEventListener('click', (event) => {
    if (!activeRoot.contains(event.target as Node)) return;
    onRootClick(event);
  });

  document.addEventListener('change', (event) => {
    if (!activeRoot.contains(event.target as Node)) return;
    onRootChange(event);
  });

  document.addEventListener('submit', (event) => {
    if (!activeRoot.contains(event.target as Node)) return;
    onRootSubmit(event);
  });

  window.addEventListener('popstate', () => {
    void replaceView(toUrl(window.location.href), false);
  });
});
