import { handleDialogKeyDown } from '../utils/dialog';
import { createPredictiveResultItem, debounce, fetchPredictiveResults } from '../utils/predictive-search';
import type { PredictiveItem } from '../utils/predictive-search';

interface SearchGroup {
  title: string;
  items: PredictiveItem[];
}

function createGroupNode(group: SearchGroup): HTMLElement {
  const wrapper = document.createElement('section');
  const heading = document.createElement('h3');
  heading.className = 'mb-2 text-xs font-semibold uppercase tracking-wide opacity-70';
  heading.textContent = group.title;

  const list = document.createElement('ul');
  list.className = 'space-y-1';
  group.items.forEach((item) => {
    list.appendChild(createPredictiveResultItem(item));
  });

  wrapper.appendChild(heading);
  wrapper.appendChild(list);
  return wrapper;
}

export function initSearchDrawer(): void {
  const drawerNode = document.querySelector<HTMLElement>('[data-js="search-drawer"]');
  if (!drawerNode) return;

  const overlay = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-overlay"]');
  const panel = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-panel"]');
  const closeButton = drawerNode.querySelector<HTMLButtonElement>('[data-js="search-close"]');
  const form = drawerNode.querySelector<HTMLFormElement>('[data-js="search-drawer-form"]');
  const input = drawerNode.querySelector<HTMLInputElement>('[data-js="search-drawer-input"]');
  const status = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-status"]');
  const error = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-error"]');
  const loader = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-loader"]');
  const empty = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-empty"]');
  const groups = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-groups"]');

  if (!overlay || !panel || !closeButton || !form || !input || !status || !error || !loader || !empty || !groups) {
    return;
  }

  const drawer = drawerNode;
  const inputField = input;

  const triggers = document.querySelectorAll<HTMLAnchorElement>('[data-js="search-open"]');

  let isOpen = false;
  let lastFocused: HTMLElement | null = null;
  let activeController: AbortController | null = null;
  let latestRequestId = 0;

  const setStatus = (message: string): void => {
    status.textContent = message;
  };

  const setError = (message: string): void => {
    error.textContent = message;
  };

  const setBusy = (busy: boolean): void => {
    panel.setAttribute('aria-busy', String(busy));
    if (busy) {
      loader.classList.remove('hidden');
      loader.classList.add('flex');
    } else {
      loader.classList.add('hidden');
      loader.classList.remove('flex');
    }
  };

  const setExpanded = (expanded: boolean): void => {
    inputField.setAttribute('aria-expanded', String(expanded));
  };

  const clearResults = (message: string): void => {
    groups.replaceChildren();
    empty.textContent = message;
    empty.classList.remove('hidden');
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (!isOpen) return;
    handleDialogKeyDown(event, panel, closeDrawer);
  };

  function openDrawer(trigger?: HTMLElement): void {
    if (isOpen) return;
    isOpen = true;
    lastFocused = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);

    drawer.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    triggers.forEach(button => button.setAttribute('aria-expanded', 'true'));
    document.body.style.overflow = 'hidden';
    setExpanded(true);
    document.addEventListener('keydown', onKeyDown);

    inputField.focus();
  }

  function closeDrawer(): void {
    if (!isOpen) return;
    isOpen = false;

    activeController?.abort();
    activeController = null;

    drawer.hidden = true;
    drawer.setAttribute('aria-hidden', 'true');
    triggers.forEach(button => button.setAttribute('aria-expanded', 'false'));
    document.body.style.overflow = '';
    setExpanded(false);
    setBusy(false);
    document.removeEventListener('keydown', onKeyDown);

    if (lastFocused) {
      lastFocused.focus();
    }
  }

  const renderGroups = (resultGroups: SearchGroup[]): void => {
    groups.replaceChildren();

    if (resultGroups.length === 0) {
      clearResults('No quick matches. Press Enter for full results.');
      setStatus('No quick matches.');
      return;
    }

    const fragment = document.createDocumentFragment();
    resultGroups.forEach((group) => {
      fragment.appendChild(createGroupNode(group));
    });
    groups.appendChild(fragment);

    empty.classList.add('hidden');

    const total = resultGroups.reduce((sum, group) => sum + group.items.length, 0);
    setStatus(`${total} quick matches`);
  };

  const runPredictiveSearch = async (term: string): Promise<void> => {
    if (!isOpen) return;

    if (term.length < 2) {
      activeController?.abort();
      activeController = null;
      setError('');
      setStatus('Type at least 2 characters.');
      setBusy(false);
      clearResults('Start typing to see quick results.');
      return;
    }

    activeController?.abort();
    activeController = new AbortController();
    const requestId = ++latestRequestId;

    setBusy(true);
    setError('');
    setStatus('Searching...');

    try {
      const payload = await fetchPredictiveResults(term, activeController.signal);

      if (requestId !== latestRequestId) {
        return;
      }

      const resultGroups: SearchGroup[] = [];
      const products = payload.resources?.results?.products ?? [];
      const pages = payload.resources?.results?.pages ?? [];
      const articles = payload.resources?.results?.articles ?? [];

      if (products.length > 0) {
        resultGroups.push({ title: 'Products', items: products.slice(0, 6) });
      }

      if (pages.length > 0) {
        resultGroups.push({ title: 'Pages', items: pages.slice(0, 6) });
      }

      if (articles.length > 0) {
        resultGroups.push({ title: 'Articles', items: articles.slice(0, 6) });
      }

      renderGroups(resultGroups);
    } catch (errorValue) {
      if (errorValue instanceof DOMException && errorValue.name === 'AbortError') {
        return;
      }

      if (requestId !== latestRequestId) {
        return;
      }

      clearResults('Quick results unavailable. Press Enter for full results.');
      setError('Predictive search is unavailable. Full search still works.');
      setStatus('Predictive search unavailable.');
    } finally {
      if (requestId === latestRequestId) {
        setBusy(false);
      }
    }
  };

  const onInput = debounce((value: string) => {
    void runPredictiveSearch(value.trim());
  });

  triggers.forEach((trigger) => {
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openDrawer(trigger);
    });
  });

  closeButton.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  inputField.addEventListener('input', () => {
    onInput(inputField.value);
  });

  form.addEventListener('submit', () => {
    closeDrawer();
  });
}
