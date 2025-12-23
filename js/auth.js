const ADMIN_USER = "admin";
const ADMIN_PASS = "ysaGP2025";

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
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
    const loggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!loggedIn) {
        window.location.href = "index.html";
    }
}
