class FlickityCarousel extends HTMLElement {
    async connectedCallback() {
        // Ensure Flickity is loaded
        if (typeof Flickity === 'undefined') {
            await this.waitForFlickity();
        }
        // Get data attributes
        const autoPlay = this.dataset.autoplay;
        const autoPlaySpeed = this.dataset.speed;
        const pauseAutoPlayOnHover = this.dataset.pause;
        console.log(autoPlay, autoPlaySpeed, pauseAutoPlayOnHover);

        // Set up Flickity options
        const options = {
            cellAlign: 'left',
            contain: true,
            wrapAround: true,
            prevNextButtons: false,
        };
        if (autoPlay == 'true') {
            options.autoPlay = parseInt(autoPlaySpeed) * 1000;
            options.pauseAutoPlayOnHover = pauseAutoPlayOnHover == 'true';
        }
        // Initialize Flickity
        new Flickity(this, options);

        // Update the height of all cards to match the viewport
        const height = this.offsetHeight;
        this.querySelector('.slider-card').style.height = height + 'px';
    }
    waitForFlickity() {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (typeof Flickity !== 'undefined') {
                    clearInterval(interval);
                    resolve();
                }
            }, 50);
        });
    }
}

// Define the custom element
customElements.define('flickity-carousel', FlickityCarousel);
