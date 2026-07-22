import { createPredictiveResultItem, debounce, fetchPredictiveResults } from './utils/predictive-search';
import type { PredictiveItem } from './utils/predictive-search';

export {};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector<HTMLElement>('[data-js="search-root"]');
  if (!root) return;

  const input = root.querySelector<HTMLInputElement>('[data-js="search-input"]');
  const panel = root.querySelector<HTMLElement>('[data-js="predictive-results"]');
  const list = root.querySelector<HTMLElement>('[data-js="predictive-list"]');
  const predictiveStatus = root.querySelector<HTMLElement>('[data-js="predictive-status"]');
  const searchStatus = root.querySelector<HTMLElement>('[data-js="search-status"]');
  if (!input || !panel || !list || !predictiveStatus || !searchStatus) return;

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

  const renderResults = (results: PredictiveItem[]): void => {
    list.replaceChildren();

    if (results.length === 0) {
      setPredictiveStatus('No quick matches. Press Enter for full results.');
      openPanel();
      return;
    }

    const fragment = document.createDocumentFragment();
    results.forEach((item) => {
      fragment.appendChild(createPredictiveResultItem(item));
    });
    list.appendChild(fragment);

    setPredictiveStatus(`${results.length} quick matches`);
    openPanel();
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
      const payload = await fetchPredictiveResults(term, currentController.signal);
      const products = payload.resources?.results?.products ?? [];
      const pages = payload.resources?.results?.pages ?? [];
      const articles = payload.resources?.results?.articles ?? [];

      renderResults([...products, ...pages, ...articles].slice(0, 6));
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
    if (list.children.length > 0) {
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
});
