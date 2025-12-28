function getAttendance() {
    return JSON.parse(localStorage.getItem("attendance")) || [];
}

function saveAttendance() {
    const date = document.getElementById("date").value;
    const name = document.getElementById("name").value;
    const status = document.getElementById("status").value;

    if (!date || !name) {
        alert("Please fill all fields");
        return;
    }

    const attendance = getAttendance();
    attendance.push({ date, name, status });
    localStorage.setItem("attendance", JSON.stringify(attendance));

    document.getElementById("name").value = "";
    loadToday();
}

function loadToday() {
    const list = document.getElementById("attendanceList");
    if (!list) return;

    list.innerHTML = "";
    const today = new Date().toISOString().split("T")[0];

    getAttendance().forEach(record => {
        if (record.date === today) {
            const li = document.createElement("li");
            li.textContent = `${record.name} - ${record.status}`;
            list.appendChild(li);
        }
    });
}

function loadAll(id) {
    const list = document.getElementById(id);
    if (!list) return;

    list.innerHTML = "";
    getAttendance().forEach(record => {
        const li = document.createElement("li");
        li.textContent = `${record.date} - ${record.name} (${record.status})`;
        list.appendChild(li);
    });
}

function loadSummary() {
    const summary = document.getElementById("summaryText");
    if (!summary) return;

    const attendance = getAttendance();
    summary.textContent = `Total Records: ${attendance.length}`;
}

window.onload = function () {
    loadToday();
    loadAll("weeklyList");
    loadAll("monthlyList");
    loadSummary();
};

function loadDashboardStats() {
    const records = JSON.parse(localStorage.getItem("attendance")) || [];
    const total = document.getElementById("totalRecords");
    if (total) {
        total.textContent = records.length;
    }
}

window.onload = function () {
    loadDashboardStats();
};

function getAttendance() {
    return JSON.parse(localStorage.getItem("attendance")) || [];
}

function saveAttendance() {
    const dateInput = document.getElementById("attendance-date");
    const nameInput = document.getElementById("attendance-name");
    const statusInput = document.getElementById("attendance-status");

    if (!dateInput || !nameInput || !statusInput) return;

    const date = dateInput.value;
    const name = nameInput.value.trim();
    const status = statusInput.value;

    if (!date || !name) {
        alert("Please enter a name and select a date.");
        return;
    }

    const attendance = getAttendance();

    attendance.push({
        date,
        name,
        status
    });

    localStorage.setItem("attendance", JSON.stringify(attendance));

    nameInput.value = "";
    loadTodayAttendance();
}

function loadTodayAttendance() {
    const list = document.getElementById("attendanceList");
    if (!list) return;

    list.innerHTML = "";
    const today = new Date().toISOString().split("T")[0];

    getAttendance().forEach(record => {
        if (record.date === today) {
            const li = document.createElement("li");
            li.textContent = `${record.name} — ${record.status}`;
            list.appendChild(li);
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("attendance-date");
    if (dateInput) {
        dateInput.value = new Date().toISOString().split("T")[0];
    }

    loadTodayAttendance();
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const backdrop = document.querySelector('.nav-backdrop');
    const navLinks = document.querySelectorAll('.nav a');

    if (!menuToggle || !nav || !backdrop) return;

    function closeMenu() {
        nav.classList.remove('active');
        backdrop.classList.remove('active');

        const icon = menuToggle.querySelector('svg');
        icon.setAttribute('data-lucide', 'menu');
        icon.style.transform = 'rotate(0deg)';
        lucide.createIcons();
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('active');
        backdrop.classList.toggle('active');

        const icon = menuToggle.querySelector('svg');
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';

        lucide.createIcons();
    });

    backdrop.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    lucide.createIcons();
});
