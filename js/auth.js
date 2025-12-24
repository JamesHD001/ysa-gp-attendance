const ADMIN_USER = "admin";
const ADMIN_PASS = "ysaGP2025";

function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "index.html";
    } else {
        error.textContent = "Invalid admin credentials";
    }
}

function logout() {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "login.html";
}

function protectPage() {
    if (localStorage.getItem("isAdminLoggedIn") !== "true") {
        window.location.href = "login.html";
    }
}
