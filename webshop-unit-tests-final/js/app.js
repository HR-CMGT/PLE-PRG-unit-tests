// app.js
import { ShoppingCart } from './cart.js';
import { Product } from './product.js';

// Product list with dummy data
const products = [
    new Product(1, "Wireless Headphones", 129.99, "🎧"),
    new Product(2, "Smart Watch", 199.50, "⌚"),
    new Product(3, "Mechanical Keyboard", 149.00, "⌨️"),
    new Product(4, "Gaming Mouse", 79.99, "🖱️"),
    new Product(5, "USB-C Hub", 45.00, "🔌"),
    new Product(6, "4K Monitor", 349.00, "🖥️")
];

const cart = new ShoppingCart();

// DOM Elements
const productListEl = document.getElementById('product-list');
const cartItemsEl = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const subtotalEl = document.getElementById('subtotal');
const discountRowEl = document.getElementById('discount-row');
const discountLabelEl = document.getElementById('discount-label');
const discountAmountEl = document.getElementById('discount-amount');
const totalEl = document.getElementById('total');
const discountCodeInput = document.getElementById('discount-code');
const applyDiscountBtn = document.getElementById('apply-discount-btn');
const discountMessageEl = document.getElementById('discount-message');

productListEl?.addEventListener('click', handleAddToCartClick);
cartItemsEl?.addEventListener('click', handleCartItemClick);
applyDiscountBtn?.addEventListener('click', handleDiscountClick);

/**
 * Formats a price to a Dutch currency format.
 * @param {number} price - The price to format.
 * @returns {string} - The formatted price.
 */
function formatPrice(price) {
    return `€${price.toFixed(2).replace('.', ',')}`;
}

/**
 * Renders the products to the DOM.
 */
function renderProducts() {
    const template = document.getElementById('product-card-template');
    productListEl.innerHTML = ''; // Clear current products

    products.forEach(product => {
        const clone = template?.content.cloneNode(true);
        clone.querySelector('.product-image').innerText = product.icon;
        clone.querySelector('.product-title').innerText = product.name;
        clone.querySelector('.product-price').innerText = formatPrice(product.price);
        clone.querySelector('.add-to-cart-btn').setAttribute('data-id', product.id.toString());
        productListEl.appendChild(clone);
    });
}

/**
 * Updates the cart UI.
 */
function updateCartUI() {
    const items = cart.getItems();

    // Update count
    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.innerText = totalQty.toString();

    // Render items
    if (items.length === 0) {
        cartItemsEl.innerHTML = '<p class="empty-cart-msg">Je winkelmandje is leeg.</p>';
    } else {
        const template = document.getElementById('cart-item-template');
        cartItemsEl.innerHTML = '';

        items.forEach(item => {
            const clone = template?.content.cloneNode(true);
            clone.querySelector('.cart-item-title').innerText = item.product.name;
            clone.querySelector('.cart-item-price').innerText = formatPrice(item.product.price);

            clone.querySelector('.minus-btn').setAttribute('data-id', item.product.id.toString());
            clone.querySelector('.cart-item-qty').innerText = item.quantity.toString();
            clone.querySelector('.plus-btn').setAttribute('data-id', item.product.id.toString());

            cartItemsEl.appendChild(clone);
        });
    }

    // Update totals
    subtotalEl.innerText = formatPrice(cart.getSubtotal());

    if (cart.discountStatus.active) {
        discountRowEl.style.display = 'flex';
        discountLabelEl.innerText = `${cart.discountStatus.code} (-${cart.discountStatus.percentage}%)`;
        discountAmountEl.innerText = `-${formatPrice(cart.getDiscountAmount())}`;
    } else {
        discountRowEl.style.display = 'none';
    }

    totalEl.innerText = formatPrice(cart.getTotal());
}

/**
 * Handles the click event for the add to cart button.
 * @param {Event} e - The click event.
 */
function handleAddToCartClick(e) {
    const target = /** @type {HTMLElement} */ (e.target);
    if (!target) return;

    if (target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(target.getAttribute('data-id') || '0');
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.addItem(product);
            updateCartUI();

            // Visual feedback
            const originalText = target.innerText;
            const originalBg = target.style.backgroundColor;
            target.innerText = "Toegevoegd!";
            target.style.backgroundColor = "var(--success-color)";
            setTimeout(() => {
                target.innerText = originalText;
                target.style.backgroundColor = originalBg;
            }, 1000);
        }
    }
}

/**
 * Handles the click event for the cart items.
 * @param {Event} e - The click event.
 */
function handleCartItemClick(e) {
    const target = /** @type {HTMLElement} */ (e.target);
    if (!target) return;

    if (target.classList.contains('minus-btn')) {
        const productId = parseInt(target.getAttribute('data-id') || '0');
        const product = products.find(p => p.id === productId);
        if (product) cart.decreaseQuantity(product);
        updateCartUI();
    } else if (target.classList.contains('plus-btn')) {
        const productId = parseInt(target.getAttribute('data-id') || '0');
        const product = products.find(p => p.id === productId);
        if (product) cart.increaseQuantity(product);
        updateCartUI();
    }
}

/**
 * Handles the click event for the discount button.
 * @param {Event} e - The click event.
 */
function handleDiscountClick(e) {
    const code = discountCodeInput.value.trim();
    if (!code) return;

    const result = cart.applyDiscountCode(code);

    discountMessageEl.innerText = result.message;
    discountMessageEl.className = `discount-message ${result.success ? 'success' : 'error'}`;

    if (result.success) {
        discountCodeInput.value = ''; // clear input on success
        updateCartUI();
    }
}

// Initialize
renderProducts();
updateCartUI();
