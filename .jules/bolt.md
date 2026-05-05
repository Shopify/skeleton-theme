## 2024-05-24 - Liquid Snippet N+1 Overhead
**Learning:** Rendering snippets (e.g., `{% render 'image' %}`) inside `for` loops in Shopify Liquid introduces significant overhead due to parsing and scoping per iteration, effectively causing an N+1 rendering bottleneck for templates with many items like collections, search results, or large carts.
**Action:** Always inline simple HTML logic using native Liquid filters like `image_url` and `image_tag` instead of using snippet renders inside loops to improve template compilation and server response time.
## 2026-04-25 - Render for loop N+1 overhead\n**Learning:** Liquid processes a `for` loop with a `render` inside by parsing and scoping the snippet per iteration (N+1 overhead). It is better to use the native `{% render 'snippet' for array %}` syntax which parses the snippet once.\n**Action:** Use `{% render 'snippet' for array %}` to eliminate N+1 rendering overhead instead of `for` loops with `render` inside. Pre-filter arrays with `where` or `slice` beforehand to recreate loop conditions.
## 2026-05-01 - Add responsive image support via widths in image_tag
**Learning:** Supplying the `widths` attribute to `image_tag` automatically outputs the `srcset` attribute, which enables the browser to download the most appropriate size based on the user's screen width, saving bandwidth and improving performance.
**Action:** Always include the `widths` attribute inside `image_tag` to provide responsive image support.
## 2024-05-14 - Eager Load LCP Images
**Learning:** Hardcoding `loading: 'lazy'` inside loops for image galleries (like `{% for media in product.media %}`) is a common anti-pattern that causes the Largest Contentful Paint (LCP) element to be delayed, severely impacting Web Vitals. Liquid `forloop.first` can be used to conditionally apply `loading: 'eager'` and `fetchpriority: 'high'` to the first element instead.
**Action:** Always check image rendering loops to ensure the first item (often the LCP candidate) is eager-loaded while subsequent items remain lazy-loaded.
## 2026-05-18 - Optimize nested loops with contains operator
**Learning:** When matching items from a large array (like `product.tags`) against dynamic settings, using a nested loop (`{% for tag in product.tags %} {% for i in (1..10) %}`) results in O(M*N) iteration overhead. Liquid's `contains` operator (`product.tags contains setting_val`) provides a much faster O(N) lookup.
**Action:** Replace nested loops that merely check for array membership with a single loop and the native `contains` array operator to reduce iteration overhead.
