(() => {
  const navToggle = document.querySelector('.site-nav-toggle');
  const navMenu = document.querySelector('.site-nav');
  const siteHeader = document.querySelector('.site-header');
  const mobileQuery = window.matchMedia('(max-width: 768px)');

  function updateMenuAccessibility() {
    if (!navMenu) return;

    const isOpen = navMenu.classList.contains('open');

    if (!mobileQuery.matches) {
      navMenu.setAttribute('aria-hidden', 'false');
      navToggle?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
      navMenu.classList.remove('anim-ready');
      siteHeader?.classList.remove('menu-open');
      return;
    }

    navMenu.setAttribute('aria-hidden', String(!isOpen));
    navToggle?.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('overflow-hidden', isOpen);
    siteHeader?.classList.toggle('menu-open', isOpen);
    navMenu.classList.add('anim-ready');
  }

  function closeMenu() {
    if (!navMenu || !navMenu.classList.contains('open')) return;

    navMenu.classList.remove('open');
    updateMenuAccessibility();
  }

  if (navToggle && navMenu) {
    updateMenuAccessibility();

    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      updateMenuAccessibility();
      document.body.classList.toggle('overflow-hidden', isOpen && mobileQuery.matches);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileQuery.matches && navMenu.classList.contains('open')) {
        closeMenu();
        navToggle.focus();
      }
    });

    siteHeader?.addEventListener('click', function (event) {
      if (event.target === siteHeader && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    window.addEventListener('resize', updateMenuAccessibility);
  }
})();
