document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-form");

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const studentId = document.getElementById("student-id").value;
        const password = document.getElementById("password").value;

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

            const data = await response.json();

            if (!response.ok) {
                document.getElementById("error-message").innerText = data.message;
                return;
            }

            alert("Login successful!");

            localStorage.setItem("studentLoggedIn", "true");

            window.location.href = "productPage.html";

        } catch (error) {

            console.error(error);
            document.getElementById("error-message").innerText = "Server error";

        }

    });

});