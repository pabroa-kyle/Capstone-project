document.getElementById("login-form").addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:5120/api/admin/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                password: password
            })

        });

        const data = await response.json();

        if (!response.ok) {
            document.getElementById("error-message").innerText = data.message;
            return;
        }

        alert("Login successful!");

        // Save login state
        localStorage.setItem("adminLoggedIn", "true");

        // Redirect to admin dashboard
        window.location.href = "admin-page.html";

    } catch (error) {

        console.error(error);
        document.getElementById("error-message").innerText = "Server error";

    }

});