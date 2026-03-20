// ------------------------------
// Check if admin is logged in
// ------------------------------
if (localStorage.getItem("adminLoggedIn") !== "true") {
    alert("Access denied");
    window.location.href = "admin-login.html";
}

// ------------------------------
// Load orders from backend
// ------------------------------
async function loadOrders() {
    try {
        const response = await fetch("http://localhost:5120/api/admin/orders");

        if (!response.ok) throw new Error("Failed to load orders");

        const data = await response.json();

        const table = document.getElementById("orders-table");
        table.innerHTML = "";

        data.forEach((order, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>₱${order.totalAmount}</td>
                <td>${order.paymentMethod}</td>
                <td>${order.items.map(i => i.name + " x" + i.quantity).join(", ")}</td>
                <td>
                    <select onchange="updateStatus(${index}, this.value)">
                        <option ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option ${order.status === "Completed" ? "selected" : ""}>Completed</option>
                    </select>
                </td>
            `;

            table.appendChild(row);
        });

    } catch (error) {
        console.error(error);
    }
}

// ✅ UPDATE STATUS
async function updateStatus(index, status) {
    try {
        await fetch("http://localhost:5120/api/admin/update-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ index, status })
        });

        loadOrders(); // refresh

    } catch (error) {
        console.error(error);
    }
}

// ✅ AUTO REFRESH EVERY 3 SECONDS
setInterval(loadOrders, 3000);

// initial load
loadOrders();

// ------------------------------
// Logout
// ------------------------------
function logout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "adminLogIn.html";
}

// Load on start
loadOrders();