class FlickityCarousel extends HTMLElement {
    connectedCallback() {
        // Initialize Flickity
        new Flickity(this, {
            cellAlign: 'left',
            contain: true,
            wrapAround: true,
            autoPlay: 1000,
        });
    }
}

// Define the custom element
customElements.define('flickity-carousel', FlickityCarousel);
