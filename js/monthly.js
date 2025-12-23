// // monthly.js
// // GitHub Copilot

// (function () {
//     // Utility
//     const el = id => document.getElementById(id);
//     const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

//     // State
//     let viewYear, viewMonth; // month: 0-11

//     // Elements (optional - script tolerates missing elements)
//     const prevBtn = el('prevMonth');
//     const nextBtn = el('nextMonth');
//     const monthLabel = el('monthLabel');
//     const container = el('attendanceContainer') || el('attendanceTableContainer') || document.body;
//     const addForm = el('addForm');
//     const studentInput = el('studentName');
//     const clearBtn = el('clearMonth');
//     const exportBtn = el('exportCsv');
//     const importInput = el('importFile');

//     // Storage keys
//     const keyFor = (y,m) => `attendance_${y}_${m}`;

//     // Init view to current month
//     const now = new Date();
//     viewYear = now.getFullYear();
//     viewMonth = now.getMonth();

//     // Load/save
//     function loadMonth(y,m){
//         const raw = localStorage.getItem(keyFor(y,m));
//         return raw ? JSON.parse(raw) : [];
//     }
//     function saveMonth(y,m,data){
//         localStorage.setItem(keyFor(y,m), JSON.stringify(data));
//     }
//     function clearMonth(y,m){
//         localStorage.removeItem(keyFor(y,m));
//     }

//     // Days count
//     function daysInMonth(y,m){ return new Date(y,m+1,0).getDate(); }

//     // Render table
//     function render(){
//         const days = daysInMonth(viewYear, viewMonth);
//         const data = loadMonth(viewYear, viewMonth); // array of {name, statuses: {1:true,...}}
//         // Ensure container is defined
//         if(!container) return;

//         // Update month label
//         if(monthLabel) monthLabel.textContent = `${monthNames[viewMonth]} ${viewYear}`;

//         // Build table
//         const table = document.createElement('table');
//         table.className = 'attendance-table';
//         // header
//         const thead = document.createElement('thead');
//         const hrow = document.createElement('tr');
//         const nameTh = document.createElement('th');
//         nameTh.textContent = 'Name';
//         hrow.appendChild(nameTh);
//         for(let d=1; d<=days; d++){
//             const th = document.createElement('th');
//             th.textContent = d;
//             hrow.appendChild(th);
//         }
//         const actionsTh = document.createElement('th');
//         actionsTh.textContent = 'Actions';
//         hrow.appendChild(actionsTh);
//         thead.appendChild(hrow);
//         table.appendChild(thead);

//         // body
//         const tbody = document.createElement('tbody');
//         data.forEach((row, rowIndex) => {
//             const tr = document.createElement('tr');
//             const nameTd = document.createElement('td');
//             nameTd.textContent = row.name;
//             tr.appendChild(nameTd);
//             for(let d=1; d<=days; d++){
//                 const td = document.createElement('td');
//                 td.dataset.day = d;
//                 td.dataset.row = rowIndex;
//                 td.className = row.statuses && row.statuses[d] ? 'present' : 'absent';
//                 td.style.cursor = 'pointer';
//                 td.addEventListener('click', () => {
//                     // toggle
//                     row.statuses = row.statuses || {};
//                     row.statuses[d] = !row.statuses[d];
//                     td.className = row.statuses[d] ? 'present' : 'absent';
//                     saveMonth(viewYear, viewMonth, data);
//                 });
//                 tr.appendChild(td);
//             }
//             const actTd = document.createElement('td');
//             const del = document.createElement('button');
//             del.textContent = 'Remove';
//             del.addEventListener('click', () => {
//                 data.splice(rowIndex,1);
//                 saveMonth(viewYear, viewMonth, data);
//                 render();
//             });
//             actTd.appendChild(del);
//             tr.appendChild(actTd);

//             tbody.appendChild(tr);
//         });

//         // If no students, show placeholder
//         if(data.length === 0){
//             const tr = document.createElement('tr');
//             const td = document.createElement('td');
//             td.colSpan = days + 2;
//             td.textContent = 'No students. Add one to begin.';
//             td.style.textAlign = 'center';
//             tr.appendChild(td);
//             tbody.appendChild(tr);
//         }

//         table.appendChild(tbody);

//         // Replace container content with table
//         container.innerHTML = '';
//         container.appendChild(table);
//     }

//     // Navigation
//     function goto(year, month){
//         viewYear = year;
//         viewMonth = month;
//         render();
//     }
//     function prev(){
//         if(viewMonth === 0){ viewMonth = 11; viewYear--; } else viewMonth--;
//         render();
//     }
//     function next(){
//         if(viewMonth === 11){ viewMonth = 0; viewYear++; } else viewMonth++;
//         render();
//     }

//     // Add student
//     function addStudent(name){
//         if(!name) return;
//         const data = loadMonth(viewYear, viewMonth);
//         data.push({ name: name.trim(), statuses: {} });
//         saveMonth(viewYear, viewMonth, data);
//         render();
//     }

//     // Export CSV
//     function exportCSV(){
//         const data = loadMonth(viewYear, viewMonth);
//         const days = daysInMonth(viewYear, viewMonth);
//         const rows = [];
//         const header = ['Name'];
//         for(let d=1; d<=days; d++) header.push(String(d));
//         rows.push(header.join(','));
//         data.forEach(r => {
//             const cols = [ `"${r.name.replace(/"/g,'""')}"` ];
//             for(let d=1; d<=days; d++){
//                 cols.push(r.statuses && r.statuses[d] ? '1' : '0');
//             }
//             rows.push(cols.join(','));
//         });
//         const csv = rows.join('\n');
//         const blob = new Blob([csv], {type: 'text/csv'});
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `attendance_${viewYear}_${viewMonth+1}.csv`;
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         URL.revokeObjectURL(url);
//     }

//     // Import CSV (simple format exported above)
//     function importCSV(text){
//         const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
//         if(lines.length < 1) return;
//         const header = lines[0].split(',');
//         const days = header.length - 1;
//         const data = [];
//         for(let i=1;i<lines.length;i++){
//             const cols = splitCSVLine(lines[i]);
//             const name = cols[0] ? cols[0].replace(/^"(.*)"$/, '$1') : `Student ${i}`;
//             const statuses = {};
//             for(let d=1; d<=days; d++){
//                 statuses[d] = (cols[d] && cols[d].trim() === '1');
//             }
//             data.push({ name, statuses });
//         }
//         saveMonth(viewYear, viewMonth, data);
//         render();
//     }

//     // Minimal CSV splitter handling quoted values
//     function splitCSVLine(line){
//         const res = [];
//         let cur = '', inQuote = false;
//         for(let i=0;i<line.length;i++){
//             const ch = line[i];
//             if(ch === '"'){ inQuote = !inQuote; cur += ch; }
//             else if(ch === ',' && !inQuote){ res.push(cur); cur=''; }
//             else cur += ch;
//         }
//         res.push(cur);
//         return res;
//     }

//     // Wire events if elements exist
//     if(prevBtn) prevBtn.addEventListener('click', prev);
//     if(nextBtn) nextBtn.addEventListener('click', next);
//     if(addForm){
//         addForm.addEventListener('submit', e => {
//             e.preventDefault();
//             const name = studentInput ? studentInput.value : '';
//             if(!name) return;
//             addStudent(name);
//             if(studentInput) studentInput.value = '';
//         });
//     }
//     if(clearBtn){
//         clearBtn.addEventListener('click', () => {
//             if(confirm('Clear all attendance for this month?')){
//                 clearMonth(viewYear, viewMonth);
//                 render();
//             }
//         });
//     }
//     if(exportBtn) exportBtn.addEventListener('click', exportCSV);
//     if(importInput){
//         importInput.addEventListener('change', e => {
//             const f = e.target.files && e.target.files[0];
//             if(!f) return;
//             const reader = new FileReader();
//             reader.onload = () => importCSV(reader.result || '');
//             reader.readAsText(f);
//             importInput.value = '';
//         });
//     }

//     // Keyboard: left/right to change month
//     document.addEventListener('keydown', e => {
//         if(e.key === 'ArrowLeft') prev();
//         if(e.key === 'ArrowRight') next();
//     });

//     // Initial render
//     render();

//     // Expose for console debugging (optional)
//     window.AttendanceMonthly = {
//         goto, prev, next, render, addStudent, exportCSV, importCSV, loadMonth, saveMonth
//     };
// })();