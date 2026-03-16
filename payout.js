document.addEventListener("DOMContentLoaded", () => {

    const totalElement = document.getElementById("total-price");

    let total = localStorage.getItem("checkoutTotal");
    let cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];

    // Safety check
    if (!total || cart.length === 0) {
        alert("No checkout data found. Please checkout from cart first.");
        window.location.href = "cart.html";
        return;
    }

    totalElement.innerText = "₱" + parseFloat(total).toFixed(2);

    const paymentMethod = document.getElementById("payment-method");
    const codDetails = document.getElementById("cash-on-delivery-details");
    const eMoneyDetails = document.getElementById("e-money-details");

    paymentMethod.addEventListener("change", () => {

        codDetails.style.display = "none";
        eMoneyDetails.style.display = "none";

        if (paymentMethod.value === "cash-on-delivery") {
            codDetails.style.display = "block";
        }

        if (paymentMethod.value === "e-money") {
            eMoneyDetails.style.display = "block";
        }

    });

    const form = document.getElementById("payment-form");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const method = paymentMethod.value;
        const accountNumber = document.getElementById("e-money-account")?.value || "";
        const accountName = document.getElementById("account-name")?.value || "";

        if (!method) {
            alert("Please select payment method.");
            return;
        }

        const paymentData = {
            paymentMethod: method,
            accountNumber: accountNumber,
            cardName: accountName,
            cardNumber: "",
            totalAmount: Number(total),
            items: cart
        };

        try {

            const response = await fetch("http://localhost:5120/api/payment/process", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paymentData)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message);
                return;
            }

            alert(result.message);

            localStorage.removeItem("checkoutCart");
            localStorage.removeItem("checkoutTotal");

            window.location.href = "thankyou.html";

        } catch (error) {

            console.error("Payment error:", error);
            alert("Server connection failed");

        }

    });

});