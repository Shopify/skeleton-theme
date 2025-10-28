/**
 * Main JavaScript entry point for Vite
 * This file is processed by Vite and outputs to assets/main.min.js
 */

// Import main CSS (includes TailwindCSS)
import './main.css';

/**
 * Initialize your JavaScript here
 */

console.log('Skeleton Theme with Vite + TailwindCSS v4 initialized');

/**
 * Example: Add interactive functionality
 */

// Mobile menu toggle example
const initMobileMenu = () => {
  const menuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
};

// Cart functionality example
const initCart = () => {
  // Add your cart logic here
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCart();
  });
} else {
  initMobileMenu();
  initCart();
}

/**
 * HMR (Hot Module Replacement) support
 * This enables hot reloading during development
 */
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('HMR update applied');
  });
}
