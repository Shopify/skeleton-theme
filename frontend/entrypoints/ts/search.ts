declare global {
  interface Window {
    Shopify: { routes: { root: string } };
  }
}

export {};

interface PredictiveItem {
  title: string;
  url: string;
  price?: string;
  image?: { url: string; alt?: string | null } | null;
}

interface PredictivePayload {
  resources?: {
    results?: {
      products?: PredictiveItem[];
      articles?: PredictiveItem[];
      pages?: PredictiveItem[];
    };
  };
}

function debounce<T extends (...args: never[]) => void>(fn: T, delay = 250): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

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

  const createResultNode = (item: PredictiveItem): HTMLLIElement => {
    const listItem = document.createElement('li');

    const link = document.createElement('a');
    link.href = item.url;
    link.className = 'flex items-center gap-3 rounded border px-2 py-2 hover:bg-gray-50';

    if (item.image?.url) {
      const image = document.createElement('img');
      image.src = item.image.url;
      image.alt = item.image.alt ?? item.title;
      image.className = 'h-10 w-10 object-cover';
      link.appendChild(image);
    }

    const title = document.createElement('span');
    title.className = 'text-sm';
    title.textContent = item.title;
    link.appendChild(title);

    listItem.appendChild(link);
    return listItem;
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
      fragment.appendChild(createResultNode(item));
    });
    list.appendChild(fragment);

    setPredictiveStatus(`${results.length} quick matches`);
    openPanel();
  };

  const fetchPredictiveResults = async (term: string): Promise<void> => {
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

    const url = `${window.Shopify.routes.root}search/suggest.json?q=${encodeURIComponent(term)}&resources[type]=product,page,article&resources[limit]=6&resources[options][unavailable_products]=last`;

    try {
      const response = await fetch(url, {
        signal: currentController.signal,
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!response.ok) {
        throw new Error('Predictive endpoint unavailable');
      }

      const payload = (await response.json()) as PredictivePayload;
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
    void fetchPredictiveResults(value.trim());
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
