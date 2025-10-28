# 🚀 Quick Start Guide

## Setup (первый раз)

```bash
# 1. Установить зависимости
npm install

# 2. Собрать assets
npm run build

# 3. Запустить dev сервер
npm run dev
```

## Ежедневная разработка

```bash
npm run dev
```

Откроет:
- Vite: http://localhost:5173 (HMR)
- Shopify: URL из Shopify CLI

## Использование TailwindCSS

### В Liquid шаблонах

```liquid
<div class="container mx-auto px-4">
  <h1 class="text-4xl font-bold text-gray-900">
    {{ product.title }}
  </h1>
  <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    Add to Cart
  </button>
</div>
```

### Кастомные стили

В `src/main.css`:

```css
@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
  }
}
```

### Кастомизация темы

В `tailwind.config.ts`:

```ts
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1a73e8',
          secondary: '#fbbc04',
        }
      }
    }
  }
}
```

## Что где редактировать

| Файл | Назначение | HMR |
|------|------------|-----|
| `src/main.css` | Глобальные стили + Tailwind | ✅ Да (~300ms) |
| `src/main.js` | JavaScript логика | ✅ Да (~200ms) |
| `sections/*.liquid` | Shopify секции | ⚠️ Reload (~3s) |
| `snippets/*.liquid` | Многоразовые компоненты | ⚠️ Reload (~3s) |
| `tailwind.config.ts` | Настройки Tailwind | ⚠️ Restart needed |

## Перед деплоем

```bash
# 1. Собрать production assets
npm run build

# 2. Проверить что файлы созданы
ls -la assets/main.min.*

# 3. Запушить в Shopify
npm run shopify:push
```

## Полезные команды

```bash
# Только Vite dev server
npm run vite:dev

# Только Shopify preview
npm run shopify:dev

# Build production
npm run build

# Preview production build
npm run preview

# Pull theme from Shopify
npm run shopify:pull
```

## Troubleshooting

### CSS не обновляется
```bash
npm run build
# Перезагрузить страницу с Ctrl+Shift+R
```

### Vite не запускается
```bash
# Проверить что порт 5173 свободен
lsof -ti:5173 | xargs kill -9
npm run vite:dev
```

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

## Примеры компонентов

### Product Card

```liquid
<div class="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
  <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
    {{ product.featured_image | image_url: width: 500 | image_tag:
      class: 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
    }}
  </div>
  <div class="p-4">
    <h3 class="text-lg font-semibold text-gray-900 mb-2">
      {{ product.title }}
    </h3>
    <p class="text-gray-600 mb-4">
      {{ product.price | money }}
    </p>
    <button class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
      Add to Cart
    </button>
  </div>
</div>
```

### Modal/Dialog

```liquid
<dialog class="rounded-lg shadow-xl p-0 backdrop:bg-black/50">
  <div class="bg-white rounded-lg max-w-md p-6">
    <h2 class="text-2xl font-bold mb-4">Modal Title</h2>
    <p class="text-gray-600 mb-6">Modal content goes here...</p>
    <button class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
      Close
    </button>
  </div>
</dialog>
```

## Подробная документация

- [VITE_SETUP.md](./VITE_SETUP.md) - Полная настройка Vite
- [README.md](./README.md) - Общая документация темы

Happy coding! 🎉
