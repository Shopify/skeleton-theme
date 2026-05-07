## 2024-05-07 - Add aria-hidden to decorative icons
**Learning:** Found instances where material symbols (like `expand_more` in select dropdowns) were missing `aria-hidden="true"`, causing screen readers to improperly announce them as the ligature text.
**Action:** Ensure all decorative `<span class="material-symbols-outlined">` elements are accompanied by `aria-hidden="true"` when placed next to visually meaningful text or inputs.
