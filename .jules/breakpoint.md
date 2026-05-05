## $(date +%Y-%m-%d) - [Fix Swatches Layout Overflow]
**Learning:** Found a recurring layout issue pattern where fixed column grid layouts (e.g. `grid-template-columns: repeat(6, 1fr)`) fail to fit gracefully when content exceeds available width or when there is insufficient padding/gap on mobile, resulting in truncated items.
**Action:** Use a flexbox wrapper with `flex-wrap: wrap` and percentage-based `width` values calculated via `calc()` based on the column count and gap (e.g., `width: calc(16.666% - 5px)` for 6 columns) to allow seamless wrapping while maintaining layout integrity.
