import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  {
    ignores: ['assets/**', 'node_modules/**', '.shopify/**', '.agents/**', '.claude/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    commaDangle: 'always-multiline',
    braceStyle: '1tbs',
  }),
  {
    files: ['vite.config.js'],
    languageOptions: {
      globals: { process: 'readonly' },
    },
  },
);
