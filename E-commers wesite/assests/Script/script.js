function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
}

// Add event listener to the "Cart" link in the navigation
const cartToggleLink = document.getElementById('cart-toggle');
cartToggleLink.addEventListener('click', toggleCart);

const cart = [];

// Function to calculate the total amount due
function calculateTotal() {
    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
    return totalAmount.toFixed(2);
}

// Function to update the cart and total amount
function updateCart() {
    const cartContainer = document.querySelector('.cart');
    const totalAmountElement = document.querySelector('.total-amount');

    // Clear previous cart items
    cartContainer.innerHTML = '';

    // Add current cart items
    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price">$${item.price.toFixed(2)}</span>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Update total amount
    totalAmountElement.textContent = `$${calculateTotal()}`;
}

// Add event listener for 'Add to Cart' buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const productName = product.querySelector('.product-name').textContent;
        const productPrice = parseFloat(product.querySelector('.product-price').textContent.replace('$', ''));
        
        // Add the item to the cart
        cart.push({ name: productName, price: productPrice });
        
        // Update the cart and total amount
        updateCart();
    });
});

// Handle form submission for payment
const checkoutForm = document.getElementById('checkout-form');
checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // You can add code here to handle payment processing, validation, etc.
    // For simplicity, we'll just log a success message.
    console.log('Payment submitted successfully.');
    // Clear the cart after successful payment (you may want to implement a more sophisticated logic here).
    cart.length = 0;
    updateCart();
});