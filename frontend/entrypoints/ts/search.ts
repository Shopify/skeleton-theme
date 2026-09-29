import { debounce, fetchPredictiveSearchHtml } from './utils/predictive-search';
import { applySectionReplace } from './utils/section-rendering';

export {};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector<HTMLElement>('[data-js="search-root"]');
  if (!root) return;

  const input = root.querySelector<HTMLInputElement>('[data-js="search-input"]');
  const panel = root.querySelector<HTMLElement>('[data-js="predictive-results"]');
  const groups = root.querySelector<HTMLElement>('[data-js="predictive-search-groups"]');
  const empty = root.querySelector<HTMLElement>('[data-js="predictive-search-empty"]');
  const predictiveStatus = root.querySelector<HTMLElement>('[data-js="predictive-status"]');
  const searchStatus = root.querySelector<HTMLElement>('[data-js="search-status"]');
  if (!input || !panel || !groups || !empty || !predictiveStatus || !searchStatus) return;

  let currentController: AbortController | null = null;

  const setSearchStatus = (message: string): void => {
    searchStatus.textContent = message;
  };

  const setPredictiveStatus = (message: string): void => {
    predictiveStatus.textContent = message;
  };

  const closePanel = (): void => {
    panel.hidden = true;
    input.setAttribute('aria-expanded', 'false');
  };

  const openPanel = (): void => {
    panel.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  };

  const clearResults = (message: string): void => {
    groups.hidden = true;
    empty.hidden = false;
    empty.textContent = message;
  };

  const fetchAndRender = async (term: string): Promise<void> => {
    if (term.length < 2) {
      closePanel();
      setPredictiveStatus('');
      return;
    }

    currentController?.abort();
    currentController = new AbortController();

    setPredictiveStatus('Searching...');
    setSearchStatus('Predictive search active');
    openPanel();

    try {
      const html = await fetchPredictiveSearchHtml(term, currentController.signal);

      const result = applySectionReplace(html, '[data-js="predictive-search-results"]', [
        { key: 'groups', current: groups, selector: '[data-js="predictive-search-groups"]' },
        { key: 'empty', current: empty, selector: '[data-js="predictive-search-empty"]', required: false },
      ]);

      if (!result.ok) {
        throw new Error('Predictive search rendering failed');
      }

      const total = groups.querySelectorAll('li').length;
      setPredictiveStatus(total > 0 ? `${total} quick matches` : 'No quick matches. Press Enter for full results.');
      openPanel();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;

      closePanel();
      setPredictiveStatus('');
      setSearchStatus('Predictive search unavailable. Full search still works.');
    }
  };

  const onInput = debounce((value: string) => {
    void fetchAndRender(value.trim());
  });

  input.addEventListener('input', () => {
    onInput(input.value);
  });

  input.addEventListener('focus', () => {
    if (!groups.hidden) {
      openPanel();
    }
  });

  root.addEventListener('focusout', () => {
    window.setTimeout(() => {
      const focused = document.activeElement;
      if (focused && root.contains(focused)) return;
      closePanel();
    }, 100);
  });

  clearResults('Start typing to see quick results.');
});
