function loadLoggedInUser() {
    const role = localStorage.getItem("userRole");
    const displayName = localStorage.getItem("displayName");

    const userSpan = document.getElementById("loggedInUser");
    if (userSpan && displayName) {
        userSpan.textContent = displayName;
    }

    return role;
}

function hideAdminOnlyElements() {
    const role = localStorage.getItem("userRole");

    if (role === "leader") {
        document.querySelectorAll(".save-btn, #addStudentBtn")
            .forEach(el => el.style.display = "none");
    }
}
