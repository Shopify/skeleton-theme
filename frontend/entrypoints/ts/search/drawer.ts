import { debounce, fetchPredictiveSearchHtml } from '../utils/predictive-search';
import { applySectionReplace } from '../utils/section-rendering';

export function initSearchDrawer(): void {
  const drawerNode = document.querySelector<HTMLDialogElement>('[data-js="search-drawer"]');
  if (!drawerNode) return;

  const panel = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-panel"]');
  const closeButton = drawerNode.querySelector<HTMLButtonElement>('[data-js="search-close"]');
  const form = drawerNode.querySelector<HTMLFormElement>('[data-js="search-drawer-form"]');
  const input = drawerNode.querySelector<HTMLInputElement>('[data-js="search-drawer-input"]');
  const status = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-status"]');
  const error = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-error"]');
  const loader = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-loader"]');
  const empty = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-empty"]');
  const groups = drawerNode.querySelector<HTMLElement>('[data-js="search-drawer-groups"]');

  if (!panel || !closeButton || !form || !input || !status || !error || !loader || !empty || !groups) {
    return;
  }

  const drawer = drawerNode;
  const inputField = input;

  const triggers = document.querySelectorAll<HTMLAnchorElement>('[data-js="search-open"]');

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
    groups.hidden = true;
    empty.hidden = false;
    empty.textContent = message;
  };

  function openDrawer(): void {
    if (drawer.open) return;
    triggers.forEach(button => button.setAttribute('aria-expanded', 'true'));
    document.body.style.overflow = 'hidden';
    setExpanded(true);
    drawer.showModal();
    inputField.focus();
  }

  drawer.addEventListener('close', () => {
    activeController?.abort();
    activeController = null;

    triggers.forEach(button => button.setAttribute('aria-expanded', 'false'));
    document.body.style.overflow = '';
    setExpanded(false);
    setBusy(false);
  });

  const runPredictiveSearch = async (term: string): Promise<void> => {
    if (!drawer.open) return;

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
      const html = await fetchPredictiveSearchHtml(term, activeController.signal);

      if (requestId !== latestRequestId) {
        return;
      }

      const result = applySectionReplace(html, '[data-js="predictive-search-results"]', [
        { key: 'groups', current: groups, selector: '[data-js="predictive-search-groups"]' },
        { key: 'empty', current: empty, selector: '[data-js="predictive-search-empty"]', required: false },
      ]);

      if (!result.ok) {
        throw new Error('Predictive search rendering failed');
      }

      const total = groups.querySelectorAll('li').length;
      setStatus(total > 0 ? `${total} quick matches` : 'No quick matches.');
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
      openDrawer();
    });
  });

  closeButton.addEventListener('click', () => drawer.close());

  drawer.addEventListener('click', (event) => {
    if (event.target === drawer) {
      drawer.close();
    }
  });

  inputField.addEventListener('input', () => {
    onInput(inputField.value);
  });

  form.addEventListener('submit', () => {
    drawer.close();
  });
}
