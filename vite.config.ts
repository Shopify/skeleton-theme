import { defineConfig } from 'vite';
import shopify from '@shopify/vite-plugin-shopify';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    shopify({
      // Specify the entry points for your theme
      entryPoints: {
        main: 'src/main.js',
      },
      // Optionally specify a custom theme root (default: process.cwd())
      themeRoot: './',
      // Optionally specify a custom source code directory (default: '.')
      sourceCodeDir: 'src',
      // Specify which file extensions to watch and reload when changed
      additionalWatchPatterns: ['sections/**/*.liquid', 'snippets/**/*.liquid', 'layout/**/*.liquid', 'templates/**/*.liquid'],
    }),
    tailwindcss(),
  ],
  build: {
    // Generate manifest for production builds
    manifest: true,
    // Output directory for compiled assets
    outDir: 'assets',
    // Emit assets to the assets folder
    emptyOutDir: false,
    rollupOptions: {
      output: {
        // Customize output file names
        entryFileNames: '[name].min.js',
        chunkFileNames: '[name].min.js',
        assetFileNames: (assetInfo) => {
          // Keep CSS files with .min.css extension
          if (assetInfo.name?.endsWith('.css')) {
            return '[name].min.css';
          }
          return '[name][extname]';
        },
      },
    },
  },
  server: {
    // Vite dev server configuration
    port: 5173,
    strictPort: true,
    // Enable CORS for Shopify CLI
    cors: true,
  },
  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
