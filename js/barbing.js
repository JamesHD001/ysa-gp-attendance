const tableBody = document.getElementById("attendanceTableBody");
const addStudentBtn = document.getElementById("addStudentBtn");

let students = JSON.parse(localStorage.getItem("barbingStudents")) || [];

function renderTable() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td contenteditable="true">${student.name}</td>
            <td contenteditable="true">${student.phone}</td>
            <td>
                <select>
                    <option ${student.membership === "--Select Membership--" ? "selected" : ""}>--Select Membership--</option>
                    <option ${student.membership === "Member" ? "selected" : ""}>Member</option>
                    <option ${student.membership === "Non-Member" ? "selected" : ""}>Non-Member</option>
                </select>
            </td>
            <td contenteditable="true">${student.ward}</td>
            <td>
                <select>
                    <option ${student.byu === "--Select Status--" ? "selected" : ""}>--Select Status--</option>
                    <option ${student.byu === "Yes" ? "selected" : ""}>Yes</option>
                    <option ${student.byu === "No" ? "selected" : ""}>No</option>
                </select>
            </td>
            <td>
                <select class="status-select">
                    <option ${student.status === "--Select Status--" ? "selected" : ""}>--Select Status--</option>
                    <option ${student.status === "Present" ? "selected" : ""}>Present</option>
                    <option ${student.status === "Absent" ? "selected" : ""}>Absent</option>
                </select>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

addStudentBtn.addEventListener("click", () => {
    students.push({
        name: "Enter Student's Full Name",
        phone: "Enter Student's Phone Number",
        membership: "--Select Membership--",
        ward: "Ward Name Or Location",
        byu: "--Select Status--",
        status: "--Select Status--"
    });

    renderTable();
});

document.querySelector(".save-btn").addEventListener("click", () => {
    const rows = tableBody.querySelectorAll("tr");

    students = [...rows].map(row => {
        const cells = row.querySelectorAll("td");

        return {
            name: cells[1].innerText.trim(),
            phone: cells[2].innerText.trim(),
            membership: cells[3].querySelector("select").value,
            ward: cells[4].innerText.trim(),
            byu: cells[5].querySelector("select").value,
            status: cells[6].querySelector("select").value
        };
    });

    localStorage.setItem("barbingStudents", JSON.stringify(students));
    alert("Attendance saved successfully");
});

renderTable();
