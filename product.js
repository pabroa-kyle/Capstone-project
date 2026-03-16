// Add an item to the cart (button element passed as 'btn')
function addToCart(productName, price, image, btn) {
    // Find the select inside the same product card
    const productCard = btn.closest(".product-card");
    const sizeSelect = productCard.querySelector(".uniformSize");
    const size = sizeSelect ? sizeSelect.value : "";

    if (!size && sizeSelect) { // only show alert if product has size
        alert("Please select a size first.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if exact product with same size exists
    const existingItem = cart.find(
        (item) => item.name === productName && item.size === size
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            size: size,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName}${size ? " (" + size + ")" : ""} has been added to the cart.`);
    displayCartItems();
}

// Display cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartItemsContainer || !totalPriceElement) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "cart-item";

            div.innerHTML = `
                <img src="${item.image}" width="50" height="50" alt="${item.name}">
                <h3>${item.name}${item.size ? " (" + item.size + ")" : ""}</h3>
                <p>Price: ₱${item.price.toFixed(2)}</p>
                <p>
                    Quantity:
                    <input type="number" id="qty-${index}" value="${item.quantity}" min="1"
                    onchange="updateQuantity(${index})">
                </p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;

            cartItemsContainer.appendChild(div);
            total += item.price * item.quantity;
        });
    }

    totalPriceElement.innerText = `₱${total.toFixed(2)}`;
}

// Update quantity
function updateQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const input = document.getElementById(`qty-${index}`);
    let quantity = parseInt(input.value);

    if (isNaN(quantity) || quantity < 1) {
        alert("Quantity must be at least 1.");
        input.value = cart[index].quantity;
        return;
    }

    cart[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Remove item
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before proceeding.");
        return;
    }

    localStorage.setItem("checkoutCart", JSON.stringify(cart));
    window.location.href = "checkout.html";
}

// Initialize cart display
document.addEventListener("DOMContentLoaded", displayCartItems);

// Optional: attach checkout button if exists
const checkoutBtn = document.getElementById("checkout-button");
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", proceedToCheckout);
}