const ADMIN_USER = "admin";
const ADMIN_PASS = "ysaGP2025";

/* LOGIN */
function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.replace("index.html"); // prevents back-button issues
    } else {
        error.textContent = "Invalid admin credentials";
    }
}

/* LOGOUT */
function logout() {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.replace("login.html");
}

/* PAGE PROTECTION */
function protectPage() {
    const loggedIn = localStorage.getItem("isAdminLoggedIn");
    if (loggedIn !== "true") {
        window.location.replace("login.html");
    }
}
