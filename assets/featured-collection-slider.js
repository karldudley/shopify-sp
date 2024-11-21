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
        const cards = this.querySelectorAll('.slider-card');
        cards.forEach((card) => {
            card.style.height = height + 'px';
        });
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

document.addEventListener('DOMContentLoaded', function () {
    // Find all Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', function (e) {
            // Get the product ID from the data attribute
            const productId = this.getAttribute('data-product-id');
            addToCart(productId);
        });
    });

    function addToCart(productId) {
        const quantity = 1;
        const data = {
            items: [
                {
                    id: productId,
                    quantity: quantity,
                },
            ],
        };

        fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('Product added to cart!');
                updateCart();
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
            });
    }

    function updateCart() {
        fetch('/cart.js')
            .then((response) => response.json())
            .then((cart) => {
                console.log(cart);
            });
    }
});
