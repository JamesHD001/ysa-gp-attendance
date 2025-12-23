// ==============================
// Weekly Attendance Logic
// ==============================

const STORAGE_KEY = "weeklyAttendance";

// Load existing records or empty array
function getWeeklyAttendance() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Save records back to storage
function saveWeeklyAttendance(records) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// Render records below the form
function renderAttendanceRecords() {
    const container = document.getElementById("attendanceRecords");
    const records = getWeeklyAttendance();

    if (!records.length) {
        container.innerHTML = "<p>No attendance records to show.</p>";
        return;
    }

    let html = `
        <table style="width:100%; border-collapse:collapse;">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Class</th>
                    <th>Attendance</th>
                </tr>
            </thead>
            <tbody>
    `;

    records.forEach(record => {
        html += `
            <tr>
                <td>${record.date}</td>
                <td>${record.classLabel}</td>
                <td>${record.count}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

// Handle form submission
document.getElementById("weeklyAttendanceForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const date = document.getElementById("attendance-date").value;
    const classSelect = document.getElementById("class-name");
    const className = classSelect.value;
    const classLabel = classSelect.options[classSelect.selectedIndex].text;
    const count = document.getElementById("attendance-count").value;

    if (!date || !className || count === "") {
        alert("Please complete all fields.");
        return;
    }

    const records = getWeeklyAttendance();

    records.push({
        date,
        className,
        classLabel,
        count: Number(count),
        savedAt: new Date().toISOString()
    });

    saveWeeklyAttendance(records);

    // Reset form
    document.getElementById("weeklyAttendanceForm").reset();

    // Show success message
    const msg = document.getElementById("successMsg");
    msg.style.display = "block";
    setTimeout(() => msg.style.display = "none", 3000);

    renderAttendanceRecords();
});

// Load records on page load
document.addEventListener("DOMContentLoaded", () => {
    renderAttendanceRecords();
});
