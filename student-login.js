document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-form");

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const studentId = document.getElementById("student-id").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorEl = document.getElementById("error-message");

        errorEl.innerText = "";

        try {

            const response = await fetch("http://localhost:5120/api/student/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    studentId: studentId,
                    password: password
                })
            });

            // ✅ SAFELY HANDLE RESPONSE
            let data = {};
            try {
                data = await response.json();
            } catch {
                data = { message: "Invalid server response" };
            }

            if (!response.ok) {
                errorEl.innerText = data.message || "Login failed";
                return;
            }

            // ✅ SUCCESS
            alert("Login successful!");

            // 🔥 SAVE LOGIN STATE
            localStorage.setItem("studentLoggedIn", "true");

            // 🔥 SAVE STUDENT NAME (USED IN ORDERS)
            localStorage.setItem("studentName", studentId);

            // OPTIONAL: store full user object
            localStorage.setItem("studentData", JSON.stringify({
                id: studentId
            }));

            // ✅ REDIRECT
            window.location.href = "productPage.html";

        } catch (error) {

            console.error("Login error:", error);
            errorEl.innerText = "Server error. Make sure backend is running.";

        }

    });

});