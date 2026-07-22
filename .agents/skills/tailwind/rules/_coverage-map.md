# Tailwind CSS Coverage Map

Canonical source: https://tailwindcss.com/docs (v4.2)

This map links Tailwind docs sections to this skill's rule files.

## Core Concepts

- Styling with utility classes: https://tailwindcss.com/docs/styling-with-utility-classes -> `core-utility-model.md`
- Adding custom styles: https://tailwindcss.com/docs/adding-custom-styles -> `core-custom-styles.md`
- Theme variables: https://tailwindcss.com/docs/theme -> `core-theme-variables.md`
- Colors: https://tailwindcss.com/docs/colors -> `core-theme-variables.md`
- Hover, focus, and other states: https://tailwindcss.com/docs/hover-focus-and-other-states -> `core-responsive-and-states.md`
- Responsive design: https://tailwindcss.com/docs/responsive-design -> `core-responsive-and-states.md`
- Dark mode: https://tailwindcss.com/docs/dark-mode -> `a11y-and-dark-mode.md`, `core-responsive-and-states.md`
- Functions and directives: https://tailwindcss.com/docs/functions-and-directives -> `core-custom-styles.md`
- Detecting classes in source files: https://tailwindcss.com/docs/detecting-classes-in-source-files -> `perf-purging-and-scanning.md`

## Installation

- Vite: https://tailwindcss.com/docs/installation/using-vite -> `core-utility-model.md`
- PostCSS: https://tailwindcss.com/docs/installation/using-postcss -> `core-utility-model.md`
- Framework guides: https://tailwindcss.com/docs/installation/framework-guides -> `core-utility-model.md`

## Accessibility

- forced-color-adjust: https://tailwindcss.com/docs/forced-color-adjust -> `a11y-and-dark-mode.md`

## Figma Workflow (first-party)

- `figma-to-theme-workflow.md` — not from official Tailwind docs; Display Studio workflow for Figma → `@theme`
- Template files: `figma-tokens/colors.css`, `typography.css`, `spacing.css`, `radius-shadows.css`, `breakpoints.css`

## Notes

- Tailwind v4 replaced `tailwind.config.js` with CSS-native `@theme` — v3 config patterns are no longer valid.
- `@theme` variables compile to `:root` CSS custom properties; utility classes are generated from them.
- Update rules when Tailwind releases breaking changes to `@theme` namespaces or directive syntax.
