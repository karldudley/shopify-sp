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
    // Find elements
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.querySelector('.cart-count-bubble span');
    const toastContainer = document.getElementById('toast-container');

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', function (e) {
            const variantId = this.getAttribute('data-variant-id');
            addToCart(variantId);
        });
    });

    function addToCart(variantId) {
        const quantity = 1;
        const data = {
            id: variantId,
            quantity: quantity,
        };

        fetch(`${window.Shopify.routes.root}cart/add.js`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                updateCartIcon();
                showToast('Product added to cart!');
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
                showToast('Failed to add product to cart.', true);
            });
    }

    function updateCartIcon() {
        fetch('/cart.js')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((cart) => {
                if (cartCountElement) {
                    cartCountElement.textContent = cart.item_count; // Update cart count
                }
            })
            .catch((error) => {
                console.error('Error updating cart icon:', error);
            });
    }

    function showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        if (isError) {
            toast.style.backgroundColor = '#d9534f'; // Red for errors
        }
        toast.textContent = message;
        toastContainer.appendChild(toast);

        // Trigger the animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove the toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300); // Allow animation to finish
        }, 3000);
    }
});
