// ------------------------------
// Cart JS for CEC Merchandise Capstone
// ------------------------------

// ------------------------------
// Add item to cart
// ------------------------------
function addToCart(name, price, image) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}

// ------------------------------
// Display cart items
// ------------------------------
function displayCartItems() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("total-price");

    if (!cartContainer || !totalElement) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.innerText = "₱0.00";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <img src="${item.image}" width="50" height="50">
            <h3>${item.name}</h3>
            <p>Price: ₱${item.price.toFixed(2)}</p>

            <p>
            Quantity:
            <input type="number" id="qty-${index}" 
            value="${item.quantity}" 
            min="1"
            onchange="updateQuantity(${index})">
            </p>

            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartContainer.appendChild(div);

        total += item.price * item.quantity;

    });

    totalElement.innerText = `₱${total.toFixed(2)}`;
}

// ------------------------------
// Update quantity
// ------------------------------
function updateQuantity(index) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const input = document.getElementById(`qty-${index}`);

    let quantity = parseInt(input.value);

    if (isNaN(quantity) || quantity < 1) {
        alert("Quantity must be at least 1");
        input.value = cart[index].quantity;
        return;
    }

    cart[index].quantity = quantity;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCartItems();
}

// ------------------------------
// Remove item
// ------------------------------
function removeFromCart(index) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCartItems();
}

// ------------------------------
// Checkout
// ------------------------------
async function proceedToCheckout() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    try {

        const response = await fetch("http://localhost:5120/api/cart/checkout", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(cart)

        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
        }

        const data = await response.json();

        console.log("Backend response:", data);

        localStorage.setItem("checkoutCart", JSON.stringify(cart));
        localStorage.setItem("checkoutTotal", data.totalAmount);

        alert(`Order placed! Total: ₱${data.totalAmount}`);

        localStorage.removeItem("cart");

        window.location.href = "payout.html";

    } catch (error) {

        console.error("Checkout error:", error);

        alert("Checkout failed: " + error.message);

    }
}

// ------------------------------
// Load cart page
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {

    displayCartItems();

    const checkoutBtn = document.getElementById("checkout-button");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", proceedToCheckout);
    }

});