function setLoadStatus(message: string): void {
  const status = document.querySelector<HTMLElement>('[data-js="collection-load-status"]');
  if (!status) return;
  status.textContent = message;
}

function resolveNextButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>('[data-js="collection-load-more"]');
}

async function onLoadMoreClick(button: HTMLButtonElement): Promise<void> {
  const nextUrl = button.dataset.nextUrl;
  if (!nextUrl || button.disabled) return;

  button.disabled = true;
  setLoadStatus('Loading more products...');

  try {
    const response = await fetch(nextUrl, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to load next collection page');
    }

    const html = await response.text();
    const parsed = new DOMParser().parseFromString(html, 'text/html');
    const incomingProducts = parsed.querySelector<HTMLElement>('[data-js="collection-products"]');
    const currentProducts = document.querySelector<HTMLElement>('[data-js="collection-products"]');

    if (!incomingProducts || !currentProducts) {
      throw new Error('Could not parse collection products');
    }

    incomingProducts.querySelectorAll<HTMLElement>('[data-js="collection-product-card"]').forEach((card) => {
      currentProducts.appendChild(card);
    });

    const incomingButton = parsed.querySelector<HTMLButtonElement>('[data-js="collection-load-more"]');
    if (incomingButton?.dataset.nextUrl) {
      button.dataset.nextUrl = incomingButton.dataset.nextUrl;
      button.disabled = false;
      setLoadStatus('More products loaded.');
      return;
    }

    button.remove();
    setLoadStatus('All products loaded.');
  } catch {
    button.disabled = false;
    setLoadStatus('Could not load more products. Please try again.');
  }
}

function bindSortControl(): void {
  const controls = document.querySelector<HTMLFormElement>('[data-js="collection-controls"]');
  const sort = document.querySelector<HTMLSelectElement>('[data-js="collection-sort"]');
  if (!controls || !sort) return;

  sort.addEventListener('change', () => {
    controls.requestSubmit();
  });
}

function bindLoadMoreControl(): void {
  const button = resolveNextButton();
  if (!button) return;

  button.addEventListener('click', () => {
    void onLoadMoreClick(button);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector<HTMLElement>('[data-js="collection-root"]');
  if (!root) return;

  bindSortControl();
  bindLoadMoreControl();
});
