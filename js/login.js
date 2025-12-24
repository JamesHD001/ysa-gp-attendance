// login.js
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginMessage = document.getElementById("login-message");

    // Check if credentials match any instructor
    let loggedIn = false;

    for (let key in instructors) {
        if (instructors[key].username === username && instructors[key].password === password) {
            loggedIn = true;
            alert(`Welcome ${username}! You are now logged in as the ${key} class instructor.`);
            window.location.href = "instructors-dashboard.html";
            break;
        }
    }

    if (!loggedIn) {
        loginMessage.textContent = "Invalid username or password!";
        loginMessage.style.color = "red";
    } else {
        loginMessage.textContent = "";
    }
});
