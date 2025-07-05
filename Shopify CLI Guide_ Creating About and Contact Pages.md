# Shopify CLI Guide: Creating About and Contact Pages

This guide outlines the steps to create dedicated About Us and Contact Us pages for your Shopify store using the Shopify CLI, bypassing the need for the online theme editor. This approach ensures version control and streamlined development workflows.

## 1. Understanding Shopify Theme Structure

Before diving into page creation, it's crucial to understand the core directories within your Shopify theme:

*   `templates/`: Contains the Liquid files that define the layout and structure of different page types (e.g., `page.liquid`, `product.liquid`, `collection.liquid`). When you create a new page in the Shopify admin, you select a template from this directory.
*   `sections/`: Contains reusable Liquid files that define distinct content blocks or features (e.g., `header.liquid`, `footer.liquid`, `featured-products.liquid`). These sections can be dynamically added, removed, and reordered within templates or directly in the theme customizer.
*   `snippets/`: Contains small, reusable Liquid files that can be included in templates or sections to avoid code repetition.
*   `assets/`: Stores static assets like images, stylesheets (`.css`, `.scss`), and JavaScript files (`.js`).
*   `config/`: Holds configuration files, including `settings_schema.json` (for theme settings) and `settings_data.json` (for saved theme settings).

For our purpose, we will primarily focus on the `templates/` and `sections/` directories.

## 2. Creating the About Us Page

To create an About Us page, you will need a new template file and potentially a new section file for specific content.

### Step 2.1: Create a New Page Template for About Us

1.  Navigate to the `templates/` directory within your cloned theme repository:
    ```bash
    cd skeleton-theme/templates/
    ```

2.  Create a new Liquid file named `page.about-us.liquid`. This naming convention (`page.your-custom-name.liquid`) is essential for Shopify to recognize it as a custom page template. You can start by copying the content of `page.liquid` as a base:
    ```bash
    cp page.json page.about-us.json
    ```
    *Note: The user's `page.json` file is a JSON template, not a liquid file. I will adjust the content to reflect this and provide guidance on how to use it.*




3.  Open `page.about-us.json` in your text editor. This file defines the sections that will be rendered on your About Us page. You can customize it to include specific sections relevant to your About Us content. A basic `page.about-us.json` might look like this:

    ```json
    {
      "sections": {
        "main": {
          "type": "main-page",
          "settings": {
          }
        },
        "about-us-content": {
          "type": "about-us-content",
          "settings": {
            "heading": "Our Story",
            "text": "Write your compelling story here."
          }
        }
      },
      "order": [
        "main",
        "about-us-content"
      ]
    }
    ```

    In this example, we are including a `main-page` section (which is likely a generic page content section) and a custom `about-us-content` section. You will need to create the `about-us-content.liquid` file in your `sections/` directory.

### Step 2.2: Create a New Section for About Us Content

1.  Navigate to the `sections/` directory:
    ```bash
    cd skeleton-theme/sections/
    ```

2.  Create a new Liquid file named `about-us-content.liquid`. This file will contain the actual content and structure for your About Us section. Here's a basic example:

    ```liquid
    <div class="about-us-section">
      <div class="page-width">
        <h2>{{ section.settings.heading }}</h2>
        <div class="rte">
          {{ section.settings.text }}
        </div>
      </div>
    </div>

    {% schema %}
    {
      "name": "About Us Content",
      "settings": [
        {
          "type": "text",
          "id": "heading",
          "label": "Heading",
          "default": "Our Story"
        },
        {
          "type": "richtext",
          "id": "text",
          "label": "Text",
          "default": "<p>Share your company's journey, mission, and values here.</p>"
        }
      ],
      "presets": [
        {
          "name": "About Us Content"
        }
      ]
    }
    {% endschema %}
    ```

    This section includes a heading and a rich text editor field, allowing you to easily manage the content from the Shopify theme customizer.

## 3. Creating the Contact Us Page

Similar to the About Us page, the Contact Us page will require a new template file and a section for the contact form.

### Step 3.1: Create a New Page Template for Contact Us

1.  Navigate to the `templates/` directory:
    ```bash
    cd skeleton-theme/templates/
    ```

2.  Create a new JSON file named `page.contact-us.json`. You can copy the content of `page.json` as a starting point:
    ```bash
    cp page.json page.contact-us.json
    ```

3.  Open `page.contact-us.json` in your text editor and modify it to include a contact form section. A typical `page.contact-us.json` might look like this:

    ```json
    {
      "sections": {
        "main": {
          "type": "main-page",
          "settings": {
          }
        },
        "contact-form": {
          "type": "contact-form",
          "settings": {
            "heading": "Contact Us"
          }
        }
      },
      "order": [
        "main",
        "contact-form"
      ]
    }
    ```

    Here, we are including a `main-page` section and a custom `contact-form` section. You will need to create the `contact-form.liquid` file in your `sections/` directory.

### Step 3.2: Create a New Section for the Contact Form

1.  Navigate to the `sections/` directory:
    ```bash
    cd skeleton-theme/sections/
    ```

2.  Create a new Liquid file named `contact-form.liquid`. This file will contain the HTML for your contact form. Shopify provides a built-in `form` tag that handles form submissions. Here's a basic example:

    ```liquid
    <div class="contact-form-section">
      <div class="page-width">
        <h2>{{ section.settings.heading }}</h2>
        {% form 'contact' %}

          {% if form.posted_successfully? %}
            <p class="form-success">Your message has been sent successfully!</p>
          {% endif %}

          {{ form.errors | default_errors }}

          <div class="form-field">
            <label for="ContactFormName">Name</label>
            <input type="text" id="ContactFormName" name="contact[name]" value="{% if form.name %}{{ form.name }}{% endif %}">
          </div>

          <div class="form-field">
            <label for="ContactFormEmail">Email</label>
            <input type="email" id="ContactFormEmail" name="contact[email]" value="{% if form.email %}{{ form.email }}{% endif %}" spellcheck="false" autocomplete="email" aria-required="true">
          </div>

          <div class="form-field">
            <label for="ContactFormPhone">Phone Number</label>
            <input type="tel" id="ContactFormPhone" name="contact[phone]">
          </div>

          <div class="form-field">
            <label for="ContactFormMessage">Message</label>
            <textarea rows="10" id="ContactFormMessage" name="contact[body]">{% if form.body %}{{ form.body }}{% endif %}</textarea>
          </div>

          <input type="submit" class="button" value="Send">

        {% endform %}
      </div>
    </div>

    {% schema %}
    {
      "name": "Contact Form",
      "settings": [
        {
          "type": "text",
          "id": "heading",
          "label": "Heading",
          "default": "Contact Us"
        }
      ],
      "presets": [
        {
          "name": "Contact Form"
        }
      ]
    }
    {% endschema %}
    ```

    This section provides a basic contact form with fields for name, email, phone, and message. The `{% form 'contact' %}` tag handles the submission and sends the email to your store's customer email address.

## 4. Uploading Changes to Shopify

After creating and modifying these files locally, you need to upload them to your Shopify store using the Shopify CLI.

1.  Navigate to the root directory of your theme:
    ```bash
    cd skeleton-theme/
    ```

2.  Run the following command to push your changes to your development theme:
    ```bash
    shopify theme push
    ```
    If you have multiple themes, you might need to specify the theme ID or name. You can also use `shopify theme push --allow-live` to push directly to your live theme (use with caution!).

## 5. Creating Pages in Shopify Admin

Once the files are pushed, you can create the actual pages in your Shopify admin:

1.  Go to your Shopify admin (`your-store.myshopify.com/admin`).
2.  Navigate to **Online Store > Pages**.
3.  Click **Add page**.
4.  For the About Us page:
    *   Set the **Title** to 

"About Us" (or similar).
    *   In the **Visibility** section, ensure it's visible.
    *   In the **Theme template** section, select `page.about-us` from the dropdown menu.
    *   Add your content using the rich text editor or by adding sections in the theme customizer.
    *   Click **Save**.

5.  For the Contact Us page:
    *   Set the **Title** to "Contact Us" (or similar).
    *   In the **Visibility** section, ensure it's visible.
    *   In the **Theme template** section, select `page.contact-us` from the dropdown menu.
    *   Click **Save**.

## 6. Customizing Pages in the Theme Editor

After creating the pages in the Shopify admin, you can further customize their content and layout using the Shopify theme editor (even though you are using CLI for development, the theme editor is still useful for content management and section reordering):

1.  Go to **Online Store > Themes**.
2.  Click **Customize** next to your current theme.
3.  Use the page selector at the top to navigate to your newly created About Us or Contact Us page.
4.  You can now add, remove, and reorder sections, and modify the content within the sections you created (e.g., the heading and text for your About Us content, or the heading for your Contact Form).

## 7. Adding Links to Navigation

Finally, you'll want to add links to your new pages in your store's navigation menu.

1.  Go to **Online Store > Navigation**.
2.  Select the menu you want to edit (e.g., 


"Main menu" or "Footer menu").
3.  Click **Add menu item**.
4.  In the **Link** field, search for and select your 


About Us" or "Contact Us" page.
5.  Click **Add**.
6.  Click **Save menu**.

By following these steps, you can effectively create and manage your About Us and Contact Us pages using the Shopify CLI for development and the Shopify admin for content management and navigation setup.

