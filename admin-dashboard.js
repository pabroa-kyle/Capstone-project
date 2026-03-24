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
    <td>${order.customerName}</td>
    <td>₱${order.totalAmount}</td>
    <td>${order.paymentMethod}</td>
    <td>${order.items.map(i => i.name + " x" + i.quantity).join(", ")}</td>
    <td>
        <select onchange="updateStatus(${index}, this.value)">
            <option ${order.status === "Pending" ? "selected" : ""}>Pending</option>
            <option ${order.status === "Completed" ? "selected" : ""}>Completed</option>
        </select>
    </td>
    <td>
        <button onclick="deleteOrder(${index})" style="background:red;color:white;">
            Delete
        </button>
    </td>
`;

      table.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

// UPDATE STATUS
async function updateStatus(index, status) {

    try {

        const response = await fetch("http://localhost:5120/api/admin/update-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                index: Number(index), // ✅ ensure number
                status: status
            })
        });

        const text = await response.text(); // 🔥 DEBUG
        console.log("Server response:", text);

        if (!response.ok) {
            throw new Error(text);
        }

        loadOrders();

    } catch (error) {

        console.error("Update error:", error);
        alert("Failed to update status");

    }
}

//Delete order

async function deleteOrder(index) {

    const confirmDelete = confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {

        const response = await fetch("http://localhost:5120/api/admin/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ index: index })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        alert(result.message);

        loadOrders(); // 🔄 refresh table

    } catch (error) {

        console.error("Delete error:", error);
        alert("Failed to delete order");

    }
}

// AUTO REFRESH EVERY 3 SECONDS
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
