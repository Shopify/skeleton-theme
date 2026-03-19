import 'vite/modulepreload-polyfill';

document.addEventListener('DOMContentLoaded', () => {
  const hasCartDrawer = document.querySelector('[data-js="cart-drawer"]');
  const hasCartTrigger = document.querySelector('[data-js="cart-open"]');
  if (!hasCartDrawer && !hasCartTrigger) return;

  void import('./cart/drawer').then(({ initCartDrawer }) => {
    initCartDrawer();
  });
});
