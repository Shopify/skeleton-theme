/*
 * Interactive routine features: the skin quiz, the routine builder, the
 * "Your routine" section for returning visitors, "Your match" badges on
 * product cards, and recently viewed products.
 *
 * Product data and translated strings come from the JSON catalogue that
 * snippets/product-catalog-json.liquid renders, so this file never formats
 * prices or hardcodes copy. Personal state lives only in this browser's
 * localStorage. Every section it drives is server-rendered with `hidden`,
 * so the page reads normally without JavaScript.
 */
(() => {
  const source = document.getElementById("GlowVerveCatalog");
  if (!source) return;

  let catalog;
  try {
    catalog = JSON.parse(source.textContent);
  } catch {
    return;
  }

  const { products, strings } = catalog;
  const byHandle = new Map(products.map((product) => [product.handle, product]));
  const KEYS = {
    quiz: "glowverve:quiz",
    routine: "glowverve:routine",
    recent: "glowverve:recent",
  };

  /* ---------- helpers ---------- */

  const read = (key, fallback) => {
    try {
      const value = JSON.parse(window.localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  };

  const write = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Private mode or storage disabled: features still work for this visit. */
    }
  };

  /* Fill "[name]" placeholders in a translated string. */
  const format = (template, values) =>
    template.replace(/\[(\w+)\]/g, (match, key) => values[key] ?? match);

  const known = (handles) =>
    [...new Set(handles || [])].filter((handle) => byHandle.has(handle));

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const addToBag = async (handles) => {
    const items = known(handles)
      .map((handle) => byHandle.get(handle))
      .filter((product) => product.available && product.variantId)
      .map((product) => ({ id: product.variantId, quantity: 1 }));
    if (!items.length || !window.GlowVerve?.addToBag) return false;
    await window.GlowVerve.addToBag(items);
    return true;
  };

  const routineBadges = (product) => {
    const wrap = element("span", "mini-card__routine");
    if (product.am) wrap.append(element("span", "routine-badge routine-badge--am", strings.am));
    if (product.pm) wrap.append(element("span", "routine-badge routine-badge--pm", strings.pm));
    return wrap;
  };

  /* Compact product card used by the quiz result, "Your routine", and recently viewed. */
  const miniCard = (product, { note } = {}) => {
    const item = element("li", "mini-card");

    const media = element("a", "mini-card__media");
    media.href = product.url;
    media.tabIndex = -1;
    media.setAttribute("aria-hidden", "true");
    if (product.image) {
      const image = element("img");
      image.src = product.image;
      image.alt = "";
      image.loading = "lazy";
      image.width = 400;
      image.height = 500;
      media.append(image);
    }

    const body = element("div", "mini-card__body");
    if (product.claim) body.append(element("p", "product-card__claim", product.claim));
    const title = element("a", "mini-card__title", product.title);
    title.href = product.url;
    body.append(title, element("p", "mini-card__price", product.price), routineBadges(product));
    if (note) body.append(element("p", "mini-card__note", note));

    const button = element("button", "button button--outline button--full mini-card__add", strings.addToBag);
    button.type = "button";
    button.disabled = !product.available;
    button.addEventListener("click", async () => {
      button.setAttribute("aria-busy", "true");
      await addToBag([product.handle]);
      button.removeAttribute("aria-busy");
    });

    item.append(media, body, button);
    return item;
  };

  /* ---------- routine logic ---------- */

  const clashes = (a, b) => a.conflicts.includes(b.handle) || b.conflicts.includes(a.handle);

  const TIMES = ["am", "pm"];
  const OTHER = { am: "pm", pm: "am" };
  const titles = (list) => list.map((product) => product.title).join(", ");

  /*
   * Place each serum in the morning and/or evening routine so that no two
   * clashing serums share a routine:
   * 1. Serums that only belong to one time of day go first.
   * 2. Each flexible serum (AM & PM) takes every slot where nothing clashes.
   * 3. If it fits nowhere but the serums blocking a slot are themselves
   *    flexible and also used in the other slot, they give that slot up.
   * 4. Only when none of that works is it listed under "alternate days".
   * Each routine is then listed in layering order.
   */
  const planRoutine = (handles) => {
    const picked = known(handles)
      .map((handle) => byHandle.get(handle))
      .sort((a, b) => a.layer - b.layer);

    const slotsOf = (product) =>
      product.am === product.pm ? TIMES : TIMES.filter((time) => product[time]);
    const placed = { am: [], pm: [] };
    const alternate = [];
    const notes = [];
    const blockers = (product, time) => placed[time].filter((other) => clashes(product, other));

    const single = picked.filter((product) => slotsOf(product).length === 1);
    const flexible = picked.filter((product) => slotsOf(product).length === 2);

    single.forEach((product) => {
      const [time] = slotsOf(product);
      const blocking = blockers(product, time);
      if (blocking.length) {
        notes.push(format(strings.conflictAlternate, { first: product.title, second: titles(blocking) }));
      }
      placed[time].push(product);
    });

    flexible.forEach((product) => {
      const open = TIMES.filter((time) => !blockers(product, time).length);

      if (open.length === 2) {
        TIMES.forEach((time) => placed[time].push(product));
        return;
      }

      if (open.length === 1) {
        const [time] = open;
        placed[time].push(product);
        notes.push(
          format(strings.conflictMoved, {
            moved: product.title,
            time: strings[time],
            other: titles(blockers(product, OTHER[time])),
          }),
        );
        return;
      }

      /* No open slot: try freeing one from flexible serums that also sit in the other slot. */
      const freeable = TIMES.find((time) =>
        blockers(product, time).every(
          (other) => slotsOf(other).length === 2 && placed[OTHER[time]].includes(other),
        ),
      );
      if (freeable) {
        const moved = blockers(product, freeable);
        placed[freeable] = placed[freeable].filter((other) => !moved.includes(other));
        placed[freeable].push(product);
        notes.push(
          format(strings.conflictSplit, {
            first: titles(moved),
            first_time: strings[OTHER[freeable]],
            second: product.title,
            second_time: strings[freeable],
          }),
        );
        return;
      }

      /* Fits in neither routine: list it separately for alternate days. */
      notes.push(
        format(strings.conflictAlternate, {
          first: product.title,
          second: titles([...new Set([...blockers(product, "am"), ...blockers(product, "pm")])]),
        }),
      );
      alternate.push(product);
    });

    const byLayer = (a, b) => a.layer - b.layer;
    return { am: placed.am.sort(byLayer), pm: placed.pm.sort(byLayer), alternate, notes };
  };

  /* ---------- routine builder ---------- */

  const builder = document.querySelector("[data-routine-builder]");
  let setBuilderSelection = () => {};

  if (builder) {
    const picker = builder.querySelector("[data-builder-picker]");
    const amList = builder.querySelector("[data-builder-am]");
    const pmList = builder.querySelector("[data-builder-pm]");
    const notesList = builder.querySelector("[data-builder-notes]");
    const alternateBox = builder.querySelector("[data-builder-alternate]");
    const alternateList = alternateBox?.querySelector("ul");
    const addButton = builder.querySelector("[data-builder-add]");
    const shareButton = builder.querySelector("[data-builder-share]");
    const clearButton = builder.querySelector("[data-builder-clear]");
    const status = builder.querySelector("[data-builder-status]");
    const table = document.querySelector("[data-pairing-table]");

    const fromUrl = new URLSearchParams(window.location.search).get("routine");
    let selection = known(
      fromUrl ? fromUrl.split(",") : read(KEYS.routine, read(KEYS.quiz, {}).picks || []),
    );

    const chips = products
      .filter((product) => product.am || product.pm || product.layer)
      .map((product) => {
        const chip = element("button", "builder__chip");
        chip.type = "button";
        chip.dataset.handle = product.handle;
        chip.append(element("span", "builder__chip-title", product.title), routineBadges(product));
        chip.addEventListener("click", () => {
          selection = selection.includes(product.handle)
            ? selection.filter((handle) => handle !== product.handle)
            : [...selection, product.handle];
          render();
        });
        picker.append(chip);
        return chip;
      });

    const step = (text, className) => element("li", `builder__step ${className || ""}`.trim(), text);

    const serumStep = (product) => {
      const item = element("li", "builder__step builder__step--serum");
      const link = element("a", "", product.title);
      link.href = product.url;
      item.append(link);
      if (product.claim) item.append(element("span", "builder__step-claim", product.claim));
      return item;
    };

    const fill = (list, serums, time) => {
      list.replaceChildren(step(strings.cleanse, "builder__step--base"));
      if (serums.length) {
        serums.forEach((product) => list.append(serumStep(product)));
      } else {
        list.append(step(strings.emptySlot, "builder__step--empty"));
      }
      list.append(step(strings.moisturize, "builder__step--base"));
      if (time === "am") list.append(step(strings.spf, "builder__step--base builder__step--spf"));
    };

    const render = () => {
      chips.forEach((chip) => chip.setAttribute("aria-pressed", String(selection.includes(chip.dataset.handle))));
      const plan = planRoutine(selection);
      fill(amList, plan.am, "am");
      fill(pmList, plan.pm, "pm");
      notesList.replaceChildren(...plan.notes.map((note) => element("li", "builder__note", note)));
      if (alternateBox) {
        alternateList.replaceChildren(...plan.alternate.map(serumStep));
        alternateBox.hidden = plan.alternate.length === 0;
      }
      addButton.disabled = selection.length === 0;
      status.textContent = "";
      write(KEYS.routine, selection);
    };

    addButton.addEventListener("click", async () => {
      addButton.setAttribute("aria-busy", "true");
      addButton.textContent = strings.adding;
      const added = await addToBag(selection);
      addButton.removeAttribute("aria-busy");
      addButton.textContent = strings.addRoutine;
      if (added) status.textContent = strings.added;
    });

    shareButton.addEventListener("click", async () => {
      const url = new URL(window.location.href);
      url.search = "";
      url.hash = "regimen";
      if (selection.length) url.searchParams.set("routine", selection.join(","));
      try {
        await navigator.clipboard.writeText(url.toString());
        status.textContent = strings.copied;
      } catch {
        status.textContent = url.toString();
      }
    });

    clearButton.addEventListener("click", () => {
      selection = [];
      render();
    });

    setBuilderSelection = (handles) => {
      selection = known(handles);
      render();
    };

    builder.hidden = false;
    if (table) table.open = false;
    render();
  }

  /* ---------- recommendations ---------- */

  /*
   * Score each serum for the answers: only serums usable at the chosen time
   * of day qualify; concern match counts most, then sensitivity
   * (fragrance-free favoured, salicylic acid avoided). Returns up to three
   * serums that don't clash.
   */
  const recommend = ({ concern, sensitive, time }) => {
    const related = { pores: ["pores", "breakouts"] };
    const wanted = related[concern] || [concern];

    const scored = products
      .map((product) => {
        let score = 0;
        if (product.concerns.some((key) => wanted.includes(key))) score += 5;
        if (sensitive === "yes") {
          score += product.fragranceFree ? 1 : -1;
          if (product.salicylic) score -= 2;
        }
        return { product, score };
      })
      /* A serum that can't be used at the chosen time of day is never recommended. */
      .filter(({ product }) => product.available && (time !== "am" || product.am) && (time !== "pm" || product.pm))
      .sort((a, b) => b.score - a.score || a.product.layer - b.product.layer);

    const picks = [];
    const fits = (product) => !picks.some((picked) => clashes(picked, product));

    /* Up to two serums that target the concern... */
    scored
      .filter(({ score }) => score >= 3)
      .forEach(({ product }) => {
        if (picks.length < 2 && fits(product)) picks.push(product);
      });

    /* ...plus one hydrating or barrier serum to support them. */
    const support = scored.find(
      ({ product, score }) =>
        score > -2 &&
        !picks.includes(product) &&
        fits(product) &&
        product.concerns.some((key) => key === "hydration" || key === "barrier"),
    );
    if (support && picks.length < 3) picks.push(support.product);

    if (!picks.length && scored.length) picks.push(scored[0].product);
    return picks.map((product) => product.handle);
  };

  /* ---------- the Skin Lab (quiz) ---------- */

  const quiz = document.querySelector("[data-quiz]");
  let concernLabel = () => "";

  if (quiz) {
    const form = quiz.querySelector("[data-quiz-form]");
    const steps = [...quiz.querySelectorAll("[data-quiz-step]")];
    const back = quiz.querySelector("[data-quiz-back]");
    const next = quiz.querySelector("[data-quiz-next]");
    const error = quiz.querySelector("[data-quiz-error]");
    const result = quiz.querySelector("[data-quiz-result]");
    const list = quiz.querySelector("[data-quiz-list]");
    const note = quiz.querySelector("[data-quiz-note]");
    const addAll = quiz.querySelector("[data-quiz-add]");
    const flask = quiz.querySelector("[data-lab-flask]");
    const layers = [...quiz.querySelectorAll("[data-lab-layer]")];
    const bonds = quiz.querySelector("[data-lab-bonds]");
    const particles = quiz.querySelector("[data-lab-particles]");
    const status = quiz.querySelector("[data-lab-status]");
    const formula = quiz.querySelector("[data-lab-formula]");
    const code = quiz.querySelector("[data-lab-code]");
    const check = quiz.querySelector("[data-lab-check]");
    const labels = quiz.dataset;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, reduceMotion ? 0 : ms));

    let current = 0;
    let busy = false;
    let pointerChoice = false;

    concernLabel = (value) =>
      form.querySelector(`input[name="concern"][value="${value}"]`)
        ?.closest(".skin-lab__orb")
        ?.querySelector(".skin-lab__name")
        ?.textContent.trim() || "";

    /* What each answered step put in the flask: symbol, name and colour. */
    const pick = (input) => {
      const orb = input.closest(".skin-lab__orb");
      return {
        orb,
        symbol: orb.querySelector(".skin-lab__symbol").textContent.trim(),
        name: orb.querySelector(".skin-lab__name").textContent.trim(),
        color: orb.style.getPropertyValue("--orb-color").trim(),
      };
    };
    const chosen = () =>
      steps.map((step) => step.querySelector("input:checked")).map((input) => (input ? pick(input) : null));

    /* The flask, bonds and particles move into the active step's orbit. */
    const mountApparatus = (step) => {
      const orbit = step.querySelector(".skin-lab__orbs");
      orbit.prepend(bonds, flask, particles);
    };

    const updateFlask = () => {
      const elements = chosen();
      layers.forEach((layer, i) => {
        const item = elements[i];
        layer.classList.toggle("is-filled", Boolean(item));
        if (item) layer.style.setProperty("--layer-color", item.color);
      });
      const filled = elements.filter(Boolean);
      flask.style.setProperty("--level", String(filled.length / steps.length));
      flask.style.setProperty("--surface-color", filled.at(-1)?.color || "transparent");
      flask.classList.toggle("has-liquid", filled.length > 0);

      formula.replaceChildren(
        ...filled.map((item) => {
          const row = document.createElement("li");
          const chip = document.createElement("span");
          chip.className = "skin-lab__chip";
          chip.style.setProperty("--chip-color", item.color);
          chip.textContent = item.symbol;
          row.append(chip, document.createTextNode(item.name));
          return row;
        }),
      );
      if (!filled.length) status.textContent = labels.labelEmpty;
    };

    const show = (index) => {
      current = index;
      steps.forEach((fieldset, i) => (fieldset.hidden = i !== index));
      mountApparatus(steps[index]);
      steps[index].querySelector(".skin-lab__orbs").classList.remove("is-pouring");
      steps[index].querySelectorAll(".is-launched").forEach((orb) => orb.classList.remove("is-launched"));
      back.hidden = index === 0;
      next.textContent = index === steps.length - 1 ? next.dataset.labelFinish : next.dataset.labelNext;
      error.hidden = true;
      bonds.replaceChildren();
    };

    /* Draw a flowing bond from the chosen orb to the flask. */
    const drawBond = (orb, color) => {
      const box = bonds.getBoundingClientRect();
      const from = orb.querySelector(".skin-lab__tile").getBoundingClientRect();
      const to = flask.getBoundingClientRect();
      bonds.setAttribute("viewBox", `0 0 ${Math.round(box.width)} ${Math.round(box.height)}`);
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", (from.left + from.width / 2 - box.left).toFixed(1));
      line.setAttribute("y1", (from.top + from.height / 2 - box.top).toFixed(1));
      line.setAttribute("x2", (to.left + to.width / 2 - box.left).toFixed(1));
      line.setAttribute("y2", (to.top + to.height / 2 - box.top).toFixed(1));
      line.setAttribute("class", "skin-lab__bond");
      line.style.stroke = color;
      bonds.replaceChildren(line);
    };

    /* A drop of the element's colour flies from the orb into the flask. */
    const pour = async (orb, color) => {
      if (reduceMotion) return;
      const from = orb.querySelector(".skin-lab__tile").getBoundingClientRect();
      const to = flask.getBoundingClientRect();
      const drop = document.createElement("span");
      drop.className = "skin-lab__drop";
      drop.style.setProperty("--drop-color", color);
      drop.style.left = `${from.left + from.width / 2 - 10}px`;
      drop.style.top = `${from.top + from.height / 2 - 10}px`;
      document.body.append(drop);
      orb.classList.add("is-launched");
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height * 0.7 - (from.top + from.height / 2);
      await drop
        .animate(
          [
            { transform: "translate(0, 0) scale(1.6)" },
            { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 40}px) scale(1.1)`, offset: 0.6 },
            { transform: `translate(${dx}px, ${dy}px) scale(0.5)`, opacity: 0.4 },
          ],
          { duration: 650, easing: "cubic-bezier(0.4, 0, 0.6, 1)" },
        )
        .finished.catch(() => {});
      drop.remove();
    };

    const burst = () => {
      if (reduceMotion) return;
      const colors = chosen().filter(Boolean).map((item) => item.color);
      particles.replaceChildren(
        ...Array.from({ length: 20 }, (_, i) => {
          const dot = document.createElement("span");
          const angle = (i / 20) * Math.PI * 2;
          const distance = 90 + Math.random() * 70;
          dot.className = "skin-lab__particle";
          dot.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
          dot.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);
          dot.style.setProperty("--particle-color", colors[i % colors.length]);
          return dot;
        }),
      );
      setTimeout(() => particles.replaceChildren(), 1000);
    };

    const reasons = (product, answers) => {
      const wanted = answers.concern === "pores" ? ["pores", "breakouts"] : [answers.concern];
      const lines = [];
      if (product.concerns.some((key) => wanted.includes(key))) {
        lines.push(format(labels.labelTargets, { concern: concernLabel(answers.concern).toLowerCase() }));
      } else {
        lines.push(labels.labelSupport);
      }
      if (answers.sensitive === "yes" && product.fragranceFree) lines.push(strings.fragranceFree);
      return lines.join(" · ");
    };

    const showResult = (answers) => {
      const picks = known(answers.picks);
      list.replaceChildren(...picks.map((handle) => miniCard(byHandle.get(handle), { note: reasons(byHandle.get(handle), answers) })));
      note.textContent = answers.sensitive === "yes" ? strings.patchTest : "";
      code.textContent = chosen()
        .filter(Boolean)
        .map((item) => item.symbol)
        .join("·");
      check.textContent = picks.length > 1 ? labels.labelCompatible : "";
      addAll.onclick = () => addToBag(picks);
      status.textContent = labels.labelReady;
      result.hidden = false;
    };

    /* Re-check the saved answers so the flask and formula show on return visits. */
    const restore = (answers) => {
      ["concern", "sensitive", "time"].forEach((name) => {
        const input = form.querySelector(`input[name="${name}"][value="${answers[name]}"]`);
        if (input) input.checked = true;
      });
      show(steps.length - 1);
      updateFlask();
      showResult(answers);
    };

    const finish = async () => {
      const data = new FormData(form);
      const answers = { concern: data.get("concern"), sensitive: data.get("sensitive"), time: data.get("time") };
      answers.picks = recommend(answers);
      answers.at = Date.now();

      status.textContent = labels.labelBrewing;
      flask.classList.add("is-brewing");
      await wait(1050);
      flask.classList.remove("is-brewing");
      flask.classList.add("is-done");
      burst();
      setTimeout(() => flask.classList.remove("is-done"), 900);

      /* Let the shopper pick a different last answer and brew again. */
      const orbit = steps[current].querySelector(".skin-lab__orbs");
      orbit.classList.remove("is-pouring");
      orbit.querySelectorAll(".is-launched").forEach((orb) => orb.classList.remove("is-launched"));

      write(KEYS.quiz, answers);
      setBuilderSelection(answers.picks);
      showResult(answers);
      result.focus({ preventScroll: true });
      result.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
      personalize();
    };

    /* Commit the current step's choice: bond, pour, fill, then move on. */
    const advance = async () => {
      if (busy) return;
      const input = steps[current].querySelector("input:checked");
      if (!input) {
        error.hidden = false;
        return;
      }
      busy = true;
      error.hidden = true;
      const item = pick(input);
      steps[current].querySelector(".skin-lab__orbs").classList.add("is-pouring");
      drawBond(item.orb, item.color);
      await wait(250);
      await pour(item.orb, item.color);
      updateFlask();
      status.textContent = format(labels.labelAdded, { name: item.name });
      await wait(250);

      if (current < steps.length - 1) {
        show(current + 1);
        if (!pointerChoice) steps[current].querySelector("input")?.focus();
      } else {
        await finish();
      }
      busy = false;
    };

    /* A tap or click on an orb pours it straight in; keyboard users confirm with Next. */
    form.addEventListener("pointerdown", (event) => {
      pointerChoice = Boolean(event.target.closest(".skin-lab__orb"));
    });
    form.addEventListener("change", () => {
      if (pointerChoice) advance();
      pointerChoice = false;
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      advance();
    });

    back.addEventListener("click", () => {
      if (busy) return;
      steps[current].querySelectorAll("input").forEach((input) => (input.checked = false));
      const previous = Math.max(0, current - 1);
      steps[previous].querySelectorAll("input").forEach((input) => (input.checked = false));
      show(previous);
      updateFlask();
      status.textContent = labels.labelEmpty;
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest("[data-quiz-restart]")) return;
      form.reset();
      result.hidden = true;
      show(0);
      updateFlask();
    });

    /* Orbs lean toward a fine pointer, like ingredients drawn to a magnet. */
    if (finePointer && !reduceMotion) {
      let pointer = null;
      let frame = 0;
      const tick = () => {
        frame = 0;
        steps[current].querySelectorAll(".skin-lab__orb").forEach((orb) => {
          let x = 0;
          let y = 0;
          if (pointer) {
            const box = orb.getBoundingClientRect();
            const dx = pointer.x - (box.left + box.width / 2);
            const dy = pointer.y - (box.top + box.height / 2);
            const distance = Math.hypot(dx, dy);
            if (distance < 180 && distance > 1) {
              const pull = (1 - distance / 180) * 14;
              x = (dx / distance) * pull;
              y = (dy / distance) * pull;
            }
          }
          orb.style.setProperty("--mag-x", `${x.toFixed(1)}px`);
          orb.style.setProperty("--mag-y", `${y.toFixed(1)}px`);
        });
      };
      form.addEventListener("pointermove", (event) => {
        pointer = { x: event.clientX, y: event.clientY };
        if (!frame) frame = requestAnimationFrame(tick);
      });
      form.addEventListener("pointerleave", () => {
        pointer = null;
        if (!frame) frame = requestAnimationFrame(tick);
      });
    }

    show(0);
    updateFlask();
    const saved = read(KEYS.quiz, null);
    if (saved?.picks?.length) restore(saved);
    quiz.hidden = false;
  }

  /* ---------- personalization ---------- */

  function personalize() {
    const saved = read(KEYS.quiz, null);
    const picks = known(saved?.picks);

    document.querySelectorAll(".product-card[data-product-handle]").forEach((card) => {
      const media = card.querySelector(".product-card__media");
      const existing = card.querySelector(".badge--match");
      const isMatch = picks.includes(card.dataset.productHandle);
      if (isMatch && !existing && media) media.append(element("span", "badge badge--match", strings.match));
      if (!isMatch && existing) existing.remove();
    });

    const section = document.querySelector("[data-personal]");
    if (!section) return;
    if (!picks.length) {
      section.hidden = true;
      return;
    }
    const summary = section.querySelector("[data-personal-summary]");
    const label = concernLabel(saved.concern);
    if (summary && label) summary.textContent = label;
    section
      .querySelector("[data-personal-list]")
      .replaceChildren(...picks.map((handle) => miniCard(byHandle.get(handle))));
    section.hidden = false;
  }

  personalize();

  /* ---------- recently viewed ---------- */

  const productPage = document.querySelector("[data-product-page]");
  const currentHandle = productPage?.dataset.productPage;
  let recent = known(read(KEYS.recent, []));

  if (currentHandle && byHandle.has(currentHandle)) {
    recent = [currentHandle, ...recent.filter((handle) => handle !== currentHandle)].slice(0, 8);
    write(KEYS.recent, recent);
  }

  document.querySelectorAll("[data-recently-viewed]").forEach((section) => {
    const handles = recent.filter((handle) => handle !== currentHandle).slice(0, 4);
    if (!handles.length) return;
    section
      .querySelector("[data-recently-list]")
      .replaceChildren(...handles.map((handle) => miniCard(byHandle.get(handle))));
    section.hidden = false;
  });
})();
