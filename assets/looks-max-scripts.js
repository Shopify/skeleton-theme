// Looks Max Store - Complete JavaScript Functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initAddToCart();
    initQuantityControls();
    initSmoothScrolling();
    initMobileMenu();
    initSearchFunctionality();
    initCartCounter();
    initProductHovers();
    initLazyLoading();
    
});

// Add to Cart Functionality
function initAddToCart() {
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('ADD TO CART')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const originalText = this.textContent;
                const originalClasses = this.className;
                
                // Change button state
                this.textContent = 'ADDED!';
                this.className = this.className.replace('bg-white text-black', 'bg-green-500 text-white');
                this.disabled = true;
                
                // Add product to cart (you'll need to integrate with Shopify cart)
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h5').textContent;
                const productPrice = productCard.querySelector('.price-highlight').textContent;
                const quantity = parseInt(productCard.querySelector('.w-16').textContent);
                
                // Log for debugging (replace with actual cart integration)
                console.log('Added to cart:', {
                    name: productName,
                    price: productPrice,
                    quantity: quantity
                });
                
                // Update cart counter
                updateCartCounter(quantity);
                
                // Show success animation
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.className = originalClasses;
                    this.disabled = false;
                }, 2000);
            });
        }
    });
}

// Quantity Control Functionality
function initQuantityControls() {
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent === '+' || button.textContent === '-') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const quantitySpan = button.textContent === '+' ? 
                    button.previousElementSibling : 
                    button.nextElementSibling;
                
                let quantity = parseInt(quantitySpan.textContent);
                
                if (button.textContent === '+') {
                    quantity++;
                    // Add animation
                    quantitySpan.style.transform = 'scale(1.1)';
                } else if (quantity > 1) {
                    quantity--;
                    // Add animation
                    quantitySpan.style.transform = 'scale(0.9)';
                }
                
                quantitySpan.textContent = quantity;
                
                // Reset animation
                setTimeout(() => {
                    quantitySpan.style.transform = 'scale(1)';
                }, 150);
            });
        }
    });
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