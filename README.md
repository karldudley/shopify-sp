# Flickity Carousel for Shopify

This project integrates a Flickity carousel into a Shopify store, providing a dynamic, customizable slider to showcase products.

## Features

-   Fully responsive carousel for desktop and mobile views.
-   Customizable Flickity options, such as autoplay and pause on hover.
-   Dynamically renders product details (image, title, description, and flavour) from Shopify collections data and metafields.
-   "Add to Cart" functionality with:
    -   Real-time cart updates.
    -   Toast notifications for successful additions.

## Installation

1. **Add Flickity Library**

    - Download the Flickity JavaScript and CSS files from [Flickity](https://flickity.metafizzy.co/).
    - Upload these files to your Shopify theme under `Assets`.

2. **Include Flickity in Your Theme**

    - Reference the files in your theme's `theme.liquid` or specific template files:
        ```html
        {{ 'flickity.min.css' | asset_url | stylesheet_tag }}
        <script src="{{ 'flickity.pkgd.min.js' | asset_url }}"></script>
        ```

3. **Add the Carousel Section**

    - Add the `featured-collection-slider.liquid` file to your Shopify theme under `sections`.
    - Add the `featured-collection-slider.css` file to your Shopify theme under `assets`.
    - Add the `featured-collection-slider.js` file to your Shopify theme under `assets`.

## Usage

-   Go to your Shopify admin, and add the **Feature Collection Slider** section to your desired page.
-   Configure the section settings, such as:
    -   **Heading**: The title displayed above the carousel.
    -   **Collection**: Choose a collection to display products.
    -   **Autoplay Settings**: Set autoplay speed and pause-on-hover.
    -   **Margin Settings**: Set margins above and below the setcion.

## Customization

-   **Styles**: Modify styles in your theme's CSS file to match your store’s design.

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
