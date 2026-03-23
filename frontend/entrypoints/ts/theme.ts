import 'vite/modulepreload-polyfill';

document.addEventListener('DOMContentLoaded', () => {
  const hasCartDrawer = document.querySelector('[data-js="cart-drawer"]');
  const hasCartTrigger = document.querySelector('[data-js="cart-open"]');
  const hasSearchDrawer = document.querySelector('[data-js="search-drawer"]');
  const hasSearchTrigger = document.querySelector('[data-js="search-open"]');

  if (hasCartDrawer || hasCartTrigger) {
    void import('./cart/drawer').then(({ initCartDrawer }) => {
      initCartDrawer();
    });
  }

  if (hasSearchDrawer || hasSearchTrigger) {
    void import('./search/drawer').then(({ initSearchDrawer }) => {
      initSearchDrawer();
    });
  }
});
