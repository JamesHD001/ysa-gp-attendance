// login.js (INSTRUCTOR LOGIN ONLY)

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("instructor-username").value.trim();
    const password = document.getElementById("instructor-password").value.trim();
    const loginMessage = document.getElementById("login-message");

    let loggedIn = false;
    let instructorClass = "";

    for (let key in instructors) {
        if (
            instructors[key]["instructor-username"] === username &&
            instructors[key]["instructor-password"] === password
        ) {
            loggedIn = true;
            instructorClass = key;
            break;
        }
    }

    if (loggedIn) {
        localStorage.setItem("isInstructorLoggedIn", "true");
        localStorage.setItem("instructorClass", instructorClass);

        loginMessage.textContent = "Login successful. Redirecting...";
        loginMessage.style.color = "green";

        setTimeout(() => {
            window.location.href = "./instructors-dashboard.html";
        }, 800);
    } else {
        loginMessage.textContent = "Invalid instructor credentials";
        loginMessage.style.color = "red";
    }
});

function protectInstructorPage() {
    if (localStorage.getItem("isInstructorLoggedIn") !== "true") {
        window.location.href = "./instructors-login.html";
    }
}
function instructorLogout() {
    localStorage.removeItem("isInstructorLoggedIn");
    localStorage.removeItem("instructorClass");
    window.location.href = "./instructors-login.html";
}

