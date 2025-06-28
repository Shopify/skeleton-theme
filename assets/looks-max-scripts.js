// Looks Max Store - Complete JavaScript Functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initAddToCart();
    initSmoothScrolling();
    initMobileMenu();
    initSearchFunctionality();
    initCartCounter();
    initProductHovers();
    initLazyLoading();
    
});

// Add to Cart Functionality with real Shopify integration
function initAddToCart() {
    console.log('Initializing add to cart functionality...');
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('ADD TO CART')) {
            console.log('Found ADD TO CART button:', button);
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Add to cart button clicked');
                
                const originalText = this.textContent;
                const originalClasses = this.className;
                
                // Change button state
                this.textContent = 'ADDING...';
                this.className = this.className.replace('bg-white text-black', 'bg-yellow-500 text-white');
                this.disabled = true;
                
                // Get product data from the form
                const form = this.closest('.add-to-cart-form');
                const variantId = form.querySelector('input[name="id"]').value;
                const quantityInput = form.closest('.product-card').querySelector('.qty-input');
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                
                console.log('Adding to cart:', { variantId, quantity });
                
                // Add to Shopify cart via AJAX
                fetch('/cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: variantId,
                        quantity: quantity
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Cart response:', data);
                    if (data.status) {
                        // Error occurred
                        console.error('Error adding to cart:', data.description);
                        this.textContent = 'ERROR';
                        this.className = this.className.replace('bg-yellow-500 text-white', 'bg-red-500 text-white');
                    } else {
                        // Success
                        this.textContent = 'ADDED!';
                        this.className = this.className.replace('bg-yellow-500 text-white', 'bg-green-500 text-white');
                        
                        // Update cart counter
                        updateCartCounter();
                        
                        // Show success animation
                        this.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            this.style.transform = 'scale(1)';
                        }, 150);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.textContent = 'ERROR';
                    this.className = this.className.replace('bg-yellow-500 text-white', 'bg-red-500 text-white');
                })
                .finally(() => {
                    // Reset button after 2 seconds
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.className = originalClasses;
                        this.disabled = false;
                    }, 2000);
                });
            });
        }
    });
}

// Update cart counter dynamically
function updateCartCounter() {
    console.log('Updating cart counter...');
    fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
            console.log('Cart data:', cart);
            const cartCounter = document.querySelector('a[href*="/cart"] span');
            if (cartCounter) {
                console.log('Updating cart counter from', cartCounter.textContent, 'to', cart.item_count);
                cartCounter.textContent = cart.item_count;
                
                // Add animation
                cartCounter.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartCounter.style.transform = 'scale(1)';
                }, 200);
            } else {
                console.log('Cart counter element not found');
            }
        })
        .catch(error => console.error('Error updating cart counter:', error));
}

// Initialize cart counter on page load
function initCartCounter() {
    updateCartCounter();
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'md:hidden p-2 text-gray-400 hover:text-white transition-colors';
    mobileMenuButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    `;
    
    const nav = document.querySelector('nav');
    const header = document.querySelector('header .flex');
    
    if (nav && header) {
        // Add mobile menu button
        header.appendChild(mobileMenuButton);
        
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'md:hidden absolute top-full left-0 right-0 bg-gray-900 border-t border-purple-900 hidden';
        mobileMenu.innerHTML = `
            <div class="px-4 py-6 space-y-4">
                <a href="#" class="block text-gray-300 hover:text-white transition-colors font-semibold heading-font">HOME</a>
                <a href="#" class="block text-gray-300 hover:text-white transition-colors font-semibold heading-font">CATEGORIES</a>
                <a href="#" class="block text-gray-300 hover:text-white transition-colors font-semibold heading-font">ABOUT</a>
                <a href="#" class="block text-gray-300 hover:text-white transition-colors font-semibold heading-font">CONTACT</a>
            </div>
        `;
        
        header.parentNode.appendChild(mobileMenu);
        
        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
} 