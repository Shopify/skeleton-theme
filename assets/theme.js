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
  const button = form.querySelector("[data-add-to-bag]");
  const info = form.closest(".product__info");
  const price = info?.querySelector(".product__price [data-price]");
  const title = info?.querySelector("[data-variant-title]");

  form.addEventListener("change", (event) => {
    const option = event.target;
    if (option.name !== "id" || option.type !== "radio") return;

    if (price) price.textContent = option.dataset.price;
    if (title) title.textContent = option.dataset.title;

    const available = option.dataset.available === "true";
    if (button) {
      button.disabled = !available;
      button.textContent = available
        ? button.dataset.labelAvailable
        : button.dataset.labelSoldOut;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("variant", option.value);
    window.history.replaceState({}, "", url);
  });
});

/* Submit sort forms as soon as the selection changes. */
document.querySelectorAll("[data-auto-submit]").forEach((form) => {
  form.addEventListener("change", () => form.submit());
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
