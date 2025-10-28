import type { Config } from 'tailwindcss';

export default {
  content: [
    './layout/**/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './templates/**/*.liquid',
    './blocks/**/*.liquid',
    './src/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      // Extend with custom design tokens
      colors: {
        // You can map Shopify theme settings to Tailwind colors
        // Example: 'primary': 'var(--color-foreground)',
      },
      fontFamily: {
        // Map Shopify fonts
        // 'primary': 'var(--font-primary--family)',
      },
      spacing: {
        // Custom spacing that matches Shopify theme settings
      },
    },
  },
  plugins: [],
  // Add prefix to avoid conflicts with existing CSS
  // Uncomment if you want to keep existing styles
  // prefix: 'tw-',
} satisfies Config;
