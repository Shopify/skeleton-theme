/*
 * Small progressive enhancements. Every page works without this file:
 * forms submit normally, accordions are native <details>, and the mobile
 * menu is a <details> drawer.
 */

/* Quantity steppers next to a number input. */
document.addEventListener("click", (event) => {
  const step = event.target.closest("[data-quantity-step]");
  if (!step) return;

  const input = step.parentElement.querySelector("input[type='number']");
  if (!input) return;

  const min = Number(input.min || 0);
  const next = Number(input.value || 0) + Number(step.dataset.quantityStep);
  input.value = Math.max(min, next);
  input.dispatchEvent(new Event("change", { bubbles: true }));
});

/* Keep the price, size label, and add-to-bag button in sync with the chosen variant. */
document.querySelectorAll("[data-product-form]").forEach((form) => {
  const info = form.closest(".product__info") ?? form;
  /* The main button and the sticky mobile bar both carry these hooks. */
  const buttons = info.querySelectorAll("[data-add-to-bag]");
  const prices = info.querySelectorAll("[data-price]");
  const title = info.querySelector("[data-variant-title]");

  form.addEventListener("change", (event) => {
    const option = event.target;
    if (option.name !== "id" || option.type !== "radio") return;

    prices.forEach((price) => (price.textContent = option.dataset.price));
    if (title) title.textContent = option.dataset.title;

    const available = option.dataset.available === "true";
    buttons.forEach((button) => {
      button.disabled = !available;
      button.textContent = available
        ? button.dataset.labelAvailable
        : button.dataset.labelSoldOut;
    });

    const url = new URL(window.location.href);
    url.searchParams.set("variant", option.value);
    window.history.replaceState({}, "", url);
  });
});

/* Submit sort forms as soon as the selection changes. */
document.querySelectorAll("[data-auto-submit]").forEach((form) => {
  form.addEventListener("change", () => {
    /* Leave blank fields (such as an empty price box) out of the URL. */
    form.querySelectorAll("input").forEach((input) => {
      if (input.value === "") input.disabled = true;
    });
    form.submit();
  });
});

/*
 * Product descriptions are written as an intro followed by labelled
 * sections ("Key Benefits:", "How to Use:", ...), each label on its own
 * bold line. Lift every labelled section into its own accordion so the
 * page reads like a clinical fact sheet.
 */
document.querySelectorAll("[data-accordionize]").forEach((description) => {
  const host = description.closest(".accordion");
  if (!host) return;

  const isLabel = (node) =>
    node.tagName === "P" &&
    node.children.length === 1 &&
    node.firstElementChild.tagName === "STRONG" &&
    node.textContent.trim().endsWith(":");

  /* Sections the page already shows from structured product data. */
  const skip = (description.dataset.skipSections || "")
    .split(",")
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);

  const labels = [...description.children].filter(isLabel);
  let anchor = host;

  labels.forEach((label) => {
    const name = label.textContent.trim().replace(/:$/, "");
    const skipped = skip.includes(name.toLowerCase());
    const details = document.createElement("details");
    details.className = "accordion";

    const summary = document.createElement("summary");
    summary.textContent = name;

    const body = document.createElement("div");
    body.className = "accordion__content rte";

    let sibling = label.nextElementSibling;
    while (sibling && !isLabel(sibling)) {
      const next = sibling.nextElementSibling;
      body.append(sibling);
      sibling = next;
    }

    label.remove();
    if (skipped) return;

    details.append(summary, body);
    anchor.after(details);
    anchor = details;
  });
});

/*
 * Slide-out bag. The drawer markup is server-rendered (blocks/cart-drawer)
 * and refreshed from templates/cart.drawer.liquid, so prices and copy are
 * always formatted by Liquid. Add-to-bag forms post to the Ajax cart and
 * open the drawer instead of navigating to the cart page.
 */
const drawer = document.querySelector("[data-cart-drawer]");

if (drawer) {
  const content = drawer.querySelector("[data-cart-drawer-content]");
  const { cartUrl, cartAddUrl, cartChangeUrl, errorMessage } = drawer.dataset;
  let pending;

  const showError = (message) => {
    const error = content.querySelector("[data-cart-error]");
    if (!error) return;
    error.textContent = message || errorMessage;
    error.hidden = false;
  };

  const refresh = async () => {
    pending?.abort();
    pending = new AbortController();
    const url = new URL(cartUrl, window.location.origin);
    url.searchParams.set("view", "drawer");

    const response = await fetch(url, { signal: pending.signal });
    if (!response.ok) throw new Error(response.statusText);
    content.innerHTML = await response.text();

    const count = content.querySelector("[data-cart-count]")?.dataset.cartCount;
    if (count !== undefined) {
      document
        .querySelectorAll("[data-cart-count-label]")
        .forEach((label) => (label.textContent = count));
    }
  };

  const open = () => {
    if (!drawer.open) drawer.showModal();
  };

  const close = () => drawer.close();

  /* Post JSON or form data to an Ajax cart endpoint, then re-render the drawer. */
  const update = async (endpoint, body) => {
    drawer.setAttribute("aria-busy", "true");
    let message = null;

    try {
      const response = await fetch(`${endpoint}.js`, {
        method: "POST",
        headers: body instanceof FormData
          ? { Accept: "application/json" }
          : { Accept: "application/json", "Content-Type": "application/json" },
        body: body instanceof FormData ? body : JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        message = data.description || data.message || errorMessage;
      }

      await refresh();
    } catch (error) {
      if (error.name === "AbortError") return;
      message = errorMessage;
    } finally {
      drawer.removeAttribute("aria-busy");
    }

    if (message) showError(message);
  };

  document.addEventListener("submit", async (event) => {
    const form = event.target;
    if (!form.matches("form[action$='/cart/add']")) return;

    event.preventDefault();
    const submitter = event.submitter;
    submitter?.setAttribute("aria-busy", "true");
    if (submitter) submitter.disabled = true;

    await update(cartAddUrl, new FormData(form));

    submitter?.removeAttribute("aria-busy");
    if (submitter) submitter.disabled = false;
    open();
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-cart-drawer-open]")) {
      event.preventDefault();
      open();
      refresh().catch(() => {});
      return;
    }

    if (event.target.closest("[data-cart-drawer-close]")) {
      close();
      return;
    }

    const line = event.target.closest("[data-cart-line]");
    if (line && drawer.contains(line)) {
      update(cartChangeUrl, {
        line: Number(line.dataset.cartLine),
        quantity: Number(line.dataset.cartQuantity),
      });
    }
  });

  /* Clicking the backdrop (the dialog itself, outside the panel) closes it. */
  drawer.addEventListener("click", (event) => {
    if (event.target === drawer) close();
  });

  /* Lets other scripts (routine builder, quiz) add several items at once. */
  window.GlowVerve = window.GlowVerve || {};
  window.GlowVerve.addToBag = async (items) => {
    await update(cartAddUrl, { items });
    open();
  };
}

/*
 * Predictive search. The header search panel is a <details> with a normal
 * GET form; as the shopper types, server-rendered results are fetched from
 * templates/search.predictive.liquid and swapped into a live region.
 */
document.querySelectorAll("[data-predictive-search]").forEach((root) => {
  const input = root.querySelector("input[name='q']");
  const results = root.querySelector("[data-predictive-results]");
  const { searchUrl } = root.dataset;
  let controller;
  let timer;

  /*
   * Open and focus in the same click so the first keystrokes land in the
   * input; waiting for the async "toggle" event drops fast typing.
   */
  root.querySelector("summary").addEventListener("click", (event) => {
    event.preventDefault();
    root.open = !root.open;
    if (root.open) input.focus();
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      root.open = false;
      root.querySelector("summary").focus();
    }
  });

  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const terms = input.value.trim();
      controller?.abort();

      if (terms.length < 2) {
        results.innerHTML = "";
        return;
      }

      controller = new AbortController();
      const url = new URL(searchUrl, window.location.origin);
      url.searchParams.set("q", terms);
      url.searchParams.set("type", "product");
      url.searchParams.set("options[prefix]", "last");
      url.searchParams.set("view", "predictive");

      root.setAttribute("aria-busy", "true");
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (response.ok) results.innerHTML = await response.text();
      } catch (error) {
        if (error.name !== "AbortError") results.innerHTML = "";
      } finally {
        root.removeAttribute("aria-busy");
      }
    }, 200);
  });
});

/* Close the search panel when clicking anywhere outside it. */
document.addEventListener("click", (event) => {
  document.querySelectorAll("[data-predictive-search][open]").forEach((root) => {
    if (!root.contains(event.target)) root.open = false;
  });
});

/*
 * Sticky add-to-bag bar on small screens: shown once the main button has
 * scrolled out of view above the viewport.
 */
const stickyBar = document.querySelector("[data-sticky-atc]");
const mainButton = document.querySelector("[data-product-form] [data-add-to-bag]");

if (stickyBar && mainButton && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    const past = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    stickyBar.classList.toggle("is-visible", past);
  }).observe(mainButton);
}

/* Mobile product gallery: keep the dot indicator in step with the swipe position. */
document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const dots = gallery.parentElement.querySelectorAll("[data-gallery-dots] > *");
  if (dots.length < 2) return;

  let frame;
  gallery.addEventListener("scroll", () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const slide = gallery.firstElementChild?.getBoundingClientRect().width || 1;
      const index = Math.round(gallery.scrollLeft / slide);
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    });
  }, { passive: true });
});

/* Filter dropdowns: only one open at a time; clicking outside closes them. */
document.addEventListener("toggle", (event) => {
  const facet = event.target;
  if (!facet.matches?.("[data-facet]") || !facet.open) return;
  document.querySelectorAll("[data-facet][open]").forEach((other) => {
    if (other !== facet) other.open = false;
  });
}, true);

document.addEventListener("click", (event) => {
  document.querySelectorAll("[data-facet][open]").forEach((facet) => {
    if (!facet.contains(event.target)) facet.open = false;
  });
});
