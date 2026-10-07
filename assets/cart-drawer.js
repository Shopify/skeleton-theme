(() => {
  const cartDrawerContainer = document.querySelector('.cart-drawer-container');
  const cartDrawer = cartDrawerContainer ? cartDrawerContainer.querySelector('.cart-drawer') : null;

  // Close the cart drawer
  const closeCartDrawer = () => {
    if (cartDrawerContainer) {
      cartDrawerContainer.classList.remove('active');
    }
    document.body.classList.remove('overflow-hidden');
  };

  if (cartDrawerContainer) {
    cartDrawerContainer.addEventListener('click', (event) => {
      if (event.target === cartDrawerContainer) {
        closeCartDrawer();
      }
    });
  }

  const closeButton = document.querySelector('.cart-drawer-close');

  if (closeButton) {
    closeButton.addEventListener('click', closeCartDrawer);
  }

  const fetchOptions = {
    cache: 'no-store',
    credentials: 'same-origin',
  };

  // Refresh the cart drawer contents
  const refreshCartDrawer = async () => {
    try {
      const response = await fetch('/?sections=cart-drawer', fetchOptions);
      if (!response.ok) throw new Error('Unable to refresh cart drawer.');

      const data = await response.json();
      const sectionHtml = data['cart-drawer'];

      if (!sectionHtml || !cartDrawerContainer) return;

      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(sectionHtml, 'text/html');
      const refreshedDrawer = parsedHtml.querySelector('.cart-drawer-container');

      if (refreshedDrawer) {
        cartDrawerContainer.innerHTML = refreshedDrawer.innerHTML;
        const refreshedCloseButton = cartDrawerContainer.querySelector('.cart-drawer-close');
        if (refreshedCloseButton) {
          refreshedCloseButton.addEventListener('click', closeCartDrawer);
        }
        return;
      }

      const refreshedCartDrawer = parsedHtml.querySelector('.cart-drawer');
      if (refreshedCartDrawer && cartDrawer) {
        cartDrawer.innerHTML = refreshedCartDrawer.innerHTML;
        const refreshedCloseButton = cartDrawer.querySelector('.cart-drawer-close');
        if (refreshedCloseButton) {
          refreshedCloseButton.addEventListener('click', closeCartDrawer);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Refresh the cart item counts displayed in the UI
  const refreshCartCounts = async () => {
    try {
      const response = await fetch('/cart.js', fetchOptions);
      if (!response.ok) throw new Error('Unable to refresh cart count.');

      const cart = await response.json();
      const updateTargets = document.querySelectorAll('.cart-item-count');

      updateTargets.forEach((target) => {
        target.textContent = cart.item_count;
        if (cart.item_count > 0) {
          target.classList.remove('hidden');
        } else {
          target.classList.add('hidden');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const cartDrawerContents = document.querySelector('.cart-drawer-contents');
  const queuedQuantityUpdates = new Map();
  let queuedQuantityTimer = null;

  // Queue a quantity update for a specific cart item
  const queueQuantityUpdate = (itemKey, nextQuantity) => {
    const normalizedQuantity = Math.max(0, Number.isFinite(nextQuantity) ? Number(nextQuantity) : 0);
    queuedQuantityUpdates.set(itemKey, normalizedQuantity);

    if (queuedQuantityTimer) {
      clearTimeout(queuedQuantityTimer);
    }

    queuedQuantityTimer = setTimeout(() => {
      flushQueuedQuantityUpdates();
    }, 1000);
  };

  // Flush all queued quantity updates to the server
  const flushQueuedQuantityUpdates = async () => {
    if (!queuedQuantityUpdates.size) return;

    const queuedUpdates = Array.from(queuedQuantityUpdates.entries());
    queuedQuantityUpdates.clear();

    const body = new URLSearchParams();
    const linePrices = [];

    queuedUpdates.forEach(([itemKey, quantity]) => {
      body.append(`updates[${itemKey}]`, String(quantity));

      const cartItem = document
        .querySelector(`.cart-drawer-item [data-key="${itemKey}"]`)
        ?.closest('.cart-drawer-item');
      const linePrice = cartItem ? cartItem.querySelector('.cart-drawer-item-line-price') : null;

      if (linePrice) {
        linePrice.classList.add('is-loading');
        linePrice.setAttribute('aria-busy', 'true');
        linePrices.push(linePrice);
      }
    });

    try {
      const response = await fetch('/cart/update.js', {
        ...fetchOptions,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body,
      });

      if (!response.ok) {
        throw new Error('Unable to update quantities.');
      }

      await refreshCartDrawer();
      await refreshCartCounts();
    } catch (error) {
      console.error(error);
      alert('There was a problem updating the cart. Please try again.');
    } finally {
      linePrices.forEach((price) => {
        price.classList.remove('is-loading');
        price.removeAttribute('aria-busy');
      });
    }
  };

  // Handle click events within the cart drawer, including removing items and updating quantities
  if (cartDrawerContainer) {
    cartDrawerContainer.addEventListener('click', async (event) => {
      const removeButton = event.target.closest('.cart-drawer-item-remove');

      if (removeButton) {
        const itemKey = removeButton.dataset.key;
        const cartItem = removeButton.closest('.cart-drawer-item');
        const linePrice = cartItem ? cartItem.querySelector('.cart-drawer-item-line-price') : null;

        if (linePrice) {
          linePrice.classList.add('is-loading');
          linePrice.setAttribute('aria-busy', 'true');
        }

        try {
          const response = await fetch('/cart/update.js', {
            ...fetchOptions,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: new URLSearchParams({
              [`updates[${itemKey}]`]: 0,
            }),
          });

          if (!response.ok) {
            throw new Error('Unable to remove item.');
          }

          await refreshCartDrawer();
          await refreshCartCounts();
        } catch (error) {
          console.error(error);
          if (linePrice) {
            linePrice.classList.remove('is-loading');
            linePrice.removeAttribute('aria-busy');
          }
          alert('There was a problem removing this item. Please try again.');
        }

        return;
      }

      const button = event.target.closest('.cart-drawer-item-qty-button');

      if (!button) return;

      const itemKey = button.dataset.key;
      const delta = Number(button.dataset.delta);
      const quantityContainer = button.closest('.cart-drawer-item-quantity');
      const quantityValue = quantityContainer
        ? quantityContainer.querySelector('.cart-drawer-item-quantity-value')
        : null;
      const currentQuantity = quantityValue ? Number(quantityValue.value || 0) : 0;
      const lastQueuedQuantity = queuedQuantityUpdates.has(itemKey)
        ? Number(queuedQuantityUpdates.get(itemKey))
        : currentQuantity;
      const updatedQuantity = Math.max(0, lastQueuedQuantity + delta);

      if (quantityValue) {
        quantityValue.value = String(updatedQuantity);
      }

      queueQuantityUpdate(itemKey, updatedQuantity);
    });
  }

  // Handle change events for quantity inputs within the cart drawer
  document.addEventListener('change', (event) => {
    const quantityInput = event.target.closest('.cart-drawer-item-quantity-value');

    if (!quantityInput) return;

    const cartItem = quantityInput.closest('.cart-drawer-item');
    const itemKey = cartItem ? cartItem.querySelector('[data-key]')?.dataset?.key : null;
    if (!itemKey) return;

    const parsedValue = Number(quantityInput.value || 0);
    const updatedQuantity = Math.max(0, Number.isFinite(parsedValue) ? parsedValue : 0);
    quantityInput.value = String(updatedQuantity);

    const linePrice = cartItem ? cartItem.querySelector('.cart-drawer-item-line-price') : null;

    if (linePrice) {
      linePrice.classList.add('is-loading');
      linePrice.setAttribute('aria-busy', 'true');
    }

    queueQuantityUpdate(itemKey, updatedQuantity);
  });

  const productForm = document.querySelector('.product-form');

  // Handle the submission of the product form to add items to the cart
  if (productForm) {
    productForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitButton = productForm.querySelector('.product-buy-button');

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add('button-loading');
      }

      try {
        const variantSelect = productForm.querySelector('[name="id"]');
        const quantityInput = productForm.querySelector('[name="quantity"]');
        const selectedVariantId = variantSelect ? Number(variantSelect.value) : null;
        const requestedQuantity = quantityInput ? Number(quantityInput.value) : 1;

        const requestBody = {
          items: [
            {
              id: selectedVariantId,
              quantity: requestedQuantity,
            },
          ],
        };
        const response = await fetch('/cart/add.js', {
          ...fetchOptions,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Unable to add item to cart.');
        }

        await refreshCartDrawer();
        await refreshCartCounts();

        const activeDrawer = document.querySelector('.cart-drawer-container');

        if (activeDrawer) {
          activeDrawer.classList.add('active');
          document.body.classList.add('overflow-hidden');
        }

        if (submitButton) {
          submitButton.classList.remove('button-loading');
          submitButton.disabled = false;
        }
      } catch (error) {
        console.error(error);

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.value = originalButtonText;
        }

        alert('There was a problem adding this item to the cart. Please try again.');
      }
    });
  }

  const cartToggle = document.querySelector('.cart-toggle');

  // Handle the click event for the cart toggle button to open/close the cart drawer
  if (cartToggle) {
    cartToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const drawer = document.querySelector('.cart-drawer-container');

      if (drawer) {
        drawer.classList.toggle('active');
        document.querySelector('body').classList.toggle('overflow-hidden');
      }
    });
  }
})();
