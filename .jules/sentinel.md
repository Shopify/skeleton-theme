## 2024-05-18 - [Missing noreferrer in target="_blank" links]
**Vulnerability:** Some external links using `target="_blank"` only had `rel="noopener"`, omitting `noreferrer`.
**Learning:** While `noopener` prevents the new page from accessing the `window.opener` object, omitting `noreferrer` can still leak the Referer header (which may contain sensitive information in the URL) to the external site, posing a privacy risk. Both should always be used together for external links.
**Prevention:** Always use `rel="noopener noreferrer"` when using `target="_blank"`. Added this to the project's coding conventions check.

## 2024-05-24 - [Reflected XSS in Liquid Localized Strings]
**Vulnerability:** Unsanitized user input (`search.terms`) was passed to Shopify translation strings ending in `_html`.
**Learning:** Shopify localizations with keys ending in `_html` output raw HTML directly, ignoring standard escaping if the parameters are not pre-escaped.
**Prevention:** Always use the `escape` filter on user input before passing it as arguments to `_html` translation keys (e.g., `{% assign escaped_terms = search.terms | escape %}`).

## 2024-05-25 - [Reflected XSS in Shopify Form Variables]
**Vulnerability:** Unsanitized user input (`form.author`, `form.email`, `form.body`) was output directly in `sections/article.liquid`.
**Learning:** In Shopify Liquid templates, user inputs like form variables are not auto-escaped. Outputting them dynamically back to the user inside HTML tags or attributes can lead to Reflected XSS.
**Prevention:** Always apply the `escape` filter (e.g., `{{ form.field | escape }}`) when outputting form variables dynamically back to the user to prevent Reflected XSS.
## 2024-05-25 - [Reflected XSS in Form Variables]
**Vulnerability:** Unsanitized user input (`form.author`, `form.email`, `form.body`) was being directly outputted back to the user in `sections/article.liquid`.
**Learning:** If a form submission fails and the form is re-rendered to show validation errors to the user, directly rendering the previous inputs (`value="{{ form.author }}"`) opens the application up to a reflected XSS vulnerability.
**Prevention:** Always use the `escape` filter when outputting user input dynamically back to the user inside HTML tags or attributes (e.g., `{{ form.author | escape }}`).

## 2024-05-25 - [Reflected XSS in Article Author via Localized String]
**Vulnerability:** Unsanitized variable `article.author` was passed to a Shopify translation string ending in `_html` in `sections/article.liquid` and `sections/blog.liquid`.
**Learning:** Shopify localizations with keys ending in `_html` output raw HTML directly. If unescaped variables are passed as arguments to these translations, they become vulnerable to Reflected XSS.
**Prevention:** Always use the `escape` filter on user input or dynamic properties like `article.author` before passing them as arguments to `_html` translation keys (e.g., `{% assign escaped_author = article.author | escape %}`).
