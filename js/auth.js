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

function protectClassPage(requiredClass) {
    const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
    const isInstructor = localStorage.getItem("isInstructorLoggedIn") === "true";
    const instructorClass = localStorage.getItem("instructorClass");

    if (isAdmin) return; // Admin can access everything

    if (!isInstructor || instructorClass !== requiredClass) {
        alert("Access denied. You are not assigned to this class.");
        window.location.href = "./instructors-dashboard.html";
    }
}

function hideAdminOnlyElements() {
    const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";

    if (!isAdmin) {
        document.querySelectorAll(".admin-only").forEach(el => {
            el.style.display = "none";
        });
    }
}

function protectClassPage(requiredClass) {
    const role = localStorage.getItem("userRole");

    // Admin can access all classes
    if (role === "admin") return;

    // Instructor can only access their class
    if (role === "instructor") {
        const instructorClass = localStorage.getItem("instructorClass");
        if (instructorClass !== requiredClass) {
            alert("Access denied: You are not assigned to this class.");
            window.location.href = "./instructors-dashboard.html";
        }
        return;
    }

    // Leaders or others (future)
    if (role !== "leader") {
        window.location.href = "./instructors-login.html";
    }
}

function hideAdminOnlyElements() {
    const role = localStorage.getItem("userRole");

    if (role === "leader") {
        document.querySelectorAll(".save-btn, #addStudentBtn")
            .forEach(el => el.style.display = "none");
    }
}
